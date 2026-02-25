// server.js
import http from "http";

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) {
    console.error("DEEPSEEK_API_KEY não encontrado no ambiente.");
    process.exit(1);
}

function json(res, status, data) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

async function deepseekChat(prompt) {
    const r = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
        }),
    });

    if (!r.ok) {
        const text = await r.text();
        throw new Error(`DeepSeek HTTP ${r.status}: ${text}`);
    }

    const data = await r.json();
    return data?.choices?.[0]?.message?.content ?? "";
}

const server = http.createServer(async (req, res) => {
    if (req.method === "POST" && req.url === "/tools/deepseek_chat") {
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", async () => {
            try {
                const { prompt } = JSON.parse(body || "{}");
                if (!prompt) return json(res, 400, { error: "prompt obrigatório" });
                const out = await deepseekChat(prompt);
                return json(res, 200, { output: out });
            } catch (e) {
                return json(res, 500, { error: String(e?.message || e) });
            }
        });
        return;
    }

    // healthcheck
    if (req.method === "GET" && req.url === "/health") {
        return json(res, 200, { ok: true });
    }

    return json(res, 404, { error: "not found" });
});

server.listen(8787, () => console.log("DeepSeek MCP server on http://localhost:8787"));
