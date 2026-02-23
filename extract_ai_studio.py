"""
Extrai codigo do AI Studio via CDP com suppressed origin
"""
import json, time, base64, socket

PAGE_ID = "3394DE5B8CF4ED2B13DA20059218D222"

def http_get(host, port, path):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, port))
    req = f"GET {path} HTTP/1.1\r\nHost: {host}:{port}\r\nConnection: close\r\n\r\n"
    s.send(req.encode())
    resp = b""
    while True:
        chunk = s.recv(4096)
        if not chunk: break
        resp += chunk
    s.close()
    # pegar body
    body = resp.split(b"\r\n\r\n", 1)
    return body[1].decode("utf-8", errors="replace") if len(body) > 1 else ""

def ws_connect_raw(host, port, path, page_id):
    """Conectar via WebSocket raw, sem Origin header"""
    import hashlib, base64, os
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(15)
    s.connect((host, port))
    
    # WebSocket handshake manual sem Origin (ou com Origin vazio)
    key = base64.b64encode(os.urandom(16)).decode()
    handshake = (
        f"GET {path} HTTP/1.1\r\n"
        f"Host: {host}:{port}\r\n"
        f"Upgrade: websocket\r\n"
        f"Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        f"Sec-WebSocket-Version: 13\r\n"
        f"\r\n"
    )
    s.send(handshake.encode())
    
    # Ler resposta do handshake
    resp = b""
    while b"\r\n\r\n" not in resp:
        resp += s.recv(1024)
    
    if b"101" not in resp:
        raise Exception(f"Handshake falhou: {resp[:200]}")
    
    print("WebSocket conectado!")
    return s

def ws_send_frame(s, data):
    """Enviar frame WebSocket (texto, sem mascaramento - para testes)"""
    payload = data.encode("utf-8")
    length = len(payload)
    
    # Frame: FIN + opcode texto (0x81), sem mascara - ERRO: servidor espera sem mascara do lado cliente
    # Na verdade cliente DEVE mascarar
    import os
    mask_key = os.urandom(4)
    masked = bytes([b ^ mask_key[i % 4] for i, b in enumerate(payload)])
    
    header = bytearray([0x81])  # FIN + text
    if length < 126:
        header.append(0x80 | length)  # MASK bit + length
    elif length < 65536:
        header.append(0x80 | 126)
        header += length.to_bytes(2, 'big')
    else:
        header.append(0x80 | 127)
        header += length.to_bytes(8, 'big')
    
    header += mask_key
    s.send(bytes(header) + masked)

def ws_recv_frame(s):
    """Receber frame WebSocket"""
    s.settimeout(10)
    
    # Ler header
    header = b""
    while len(header) < 2:
        header += s.recv(2 - len(header))
    
    fin = (header[0] & 0x80) != 0
    opcode = header[0] & 0x0F
    masked = (header[1] & 0x80) != 0
    length = header[1] & 0x7F
    
    if length == 126:
        ext = b""
        while len(ext) < 2: ext += s.recv(2 - len(ext))
        length = int.from_bytes(ext, 'big')
    elif length == 127:
        ext = b""
        while len(ext) < 8: ext += s.recv(8 - len(ext))
        length = int.from_bytes(ext, 'big')
    
    if masked:
        mask = b""
        while len(mask) < 4: mask += s.recv(4 - len(mask))
    
    payload = b""
    while len(payload) < length:
        chunk = s.recv(min(4096, length - len(payload)))
        if not chunk: break
        payload += chunk
    
    if masked:
        payload = bytes([b ^ mask[i % 4] for i, b in enumerate(payload)])
    
    if opcode == 8:  # close
        return None
    
    return payload.decode("utf-8", errors="replace")

def cdp_eval(s, expr, call_id=1, timeout=20):
    msg = json.dumps({
        "id": call_id,
        "method": "Runtime.evaluate",
        "params": {
            "expression": expr,
            "returnByValue": True,
            "awaitPromise": True,
            "timeout": 15000
        }
    })
    ws_send_frame(s, msg)
    
    end = time.time() + timeout
    while time.time() < end:
        try:
            resp = ws_recv_frame(s)
            if resp:
                data = json.loads(resp)
                if data.get("id") == call_id:
                    res = data.get("result", {}).get("result", {})
                    exc = data.get("result", {}).get("exceptionDetails")
                    if exc:
                        print(f"  Excecao JS: {exc.get('text')} {exc.get('exception',{}).get('description','')[:100]}")
                    return res.get("value")
        except socket.timeout:
            continue
        except Exception as e:
            print(f"  Recv error: {e}")
            break
    return None

def cdp_screenshot(s, call_id=99):
    msg = json.dumps({
        "id": call_id,
        "method": "Page.captureScreenshot",
        "params": {"format": "jpeg", "quality": 75}
    })
    ws_send_frame(s, msg)
    end = time.time() + 15
    while time.time() < end:
        try:
            resp = ws_recv_frame(s)
            if resp:
                data = json.loads(resp)
                if data.get("id") == call_id:
                    return data.get("result", {}).get("data")
        except socket.timeout:
            continue
        except: break
    return None

def main():
    HOST, PORT = "localhost", 9222
    path = f"/devtools/page/{PAGE_ID}"
    
    print("Tentando conexao WebSocket raw (sem Origin header)...")
    try:
        ws = ws_connect_raw(HOST, PORT, path, PAGE_ID)
    except Exception as e:
        print(f"Falha na conexao: {e}")
        return
    
    print("Verificando estado da pagina...")
    state = cdp_eval(ws, "JSON.stringify({title:document.title,url:location.href})", call_id=1)
    if state:
        ps = json.loads(state)
        print(f"  Titulo: {ps.get('title')}")
        print(f"  URL: {ps.get('url')}")
        
        if "accounts.google.com" in ps.get("url","") or "signin" in ps.get("url",""):
            print("\nATENCAO: Pagina de login! Esta instancia do Opera GX nao tem sessao.")
            print("Para funcionar, precisamos usar o perfil principal do Opera GX (ja logado)")
            ws.close()
            return
    
    # Aguardar carregamento
    print("Aguardando 8 segundos para o AI Studio carregar...")
    time.sleep(8)
    
    # Screenshot
    print("\nCapturando screenshot...")
    shot = cdp_screenshot(ws, call_id=2)
    if shot:
        with open("aistudio_shot.jpg","wb") as f:
            f.write(base64.b64decode(shot))
        print(f"  Salvo: aistudio_shot.jpg")
    
    # Extrair estrutura
    print("\nExtraindo app code...")
    result = cdp_eval(ws, r"""
    (function(){
        var r = {url: location.href, title: document.title, editors: [], iframes: [], textareas: []};
        // Monaco global
        if(window.monaco && window.monaco.editor){
            var eds = window.monaco.editor.getEditors();
            r.editors = eds.map(function(e){ return {src:'monaco', val: e.getValue().substring(0,100000)}; });
        }
        // Textareas
        Array.from(document.querySelectorAll('textarea')).forEach(function(t){
            if(t.value && t.value.length > 20) r.textareas.push({id:t.id, val: t.value.substring(0,50000)});
        });
        // iframes
        Array.from(document.querySelectorAll('iframe')).forEach(function(f){
            var html = '';
            try{ if(f.contentDocument) html = f.contentDocument.documentElement.outerHTML.substring(0,50000); } catch(e){ html='cors'; }
            r.iframes.push({src: f.src.substring(0,200), html: html});
        });
        // CodeMirror
        var cm = document.querySelector('.CodeMirror');
        if(cm && cm.CodeMirror) r.cm = cm.CodeMirror.getValue().substring(0,100000);
        // view-lines do Monaco
        var vl = document.querySelector('.view-lines');
        if(vl) r.viewLines = vl.innerText.substring(0,100000);
        return JSON.stringify(r);
    })()
    """, call_id=3, timeout=30)
    
    if result:
        try:
            data = json.loads(result)
            print(f"  URL: {data.get('url','?')}")
            print(f"  iframes: {len(data.get('iframes',[]))}")
            print(f"  textareas: {len(data.get('textareas',[]))}")
            print(f"  editors: {len(data.get('editors',[]))}")
            
            # Salvar tudo
            with open("aistudio_extracted.json","w",encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print("  Salvo em aistudio_extracted.json")
            
            # Tentar extrair codigo principal
            code = ""
            if data.get("editors"):
                code = data["editors"][0].get("val","")
                print(f"  Monaco editor code ({len(code)} chars): {code[:200]}")
            elif data.get("cm"):
                code = data["cm"]
                print(f"  CodeMirror code ({len(code)} chars): {code[:200]}")
            elif data.get("viewLines"):
                code = data["viewLines"]
                print(f"  ViewLines code ({len(code)} chars): {code[:200]}")
            elif data.get("textareas"):
                code = data["textareas"][0].get("val","")
                print(f"  Textarea code ({len(code)} chars): {code[:200]}")
            
            # Verificar iframes
            for i, ff in enumerate(data.get("iframes",[])):
                print(f"  iframe[{i}] src={ff.get('src','')[:80]}, html={len(ff.get('html',''))} chars")
                if ff.get("html") and ff["html"] != "cors" and len(ff["html"]) > 200:
                    with open(f"aistudio_iframe_{i}.html","w",encoding="utf-8") as f:
                        f.write(ff["html"])
                    print(f"    -> Salvo em aistudio_iframe_{i}.html")
                    if not code:
                        code = ff["html"]
            
            if code:
                with open("aistudio_app_code.html","w",encoding="utf-8") as f:
                    f.write(code)
                print(f"\nCodigo principal salvo em aistudio_app_code.html ({len(code)} chars)")
            else:
                print("\nNao foi possivel extrair codigo.")
        except Exception as e:
            print(f"  Erro ao processar resultado: {e}")
            print(f"  Raw: {result[:500]}")
    else:
        print("  Sem resultado.")
    
    ws.close()
    print("Concluido!")

if __name__ == "__main__":
    main()
