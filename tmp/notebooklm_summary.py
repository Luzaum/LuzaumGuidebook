import sys
import os
import json
from pathlib import Path

# Add the package to sys.path
sys.path.append(r"C:\Users\Resgate\AppData\Local\Programs\Python\Python313\Lib\site-packages")

try:
    from notebooklm_mcp.auth import load_cached_tokens
    from notebooklm_mcp.api_client import NotebookLMClient
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)

def main():
    tokens = load_cached_tokens()
    if not tokens:
        print("Error: No cached tokens found.")
        return

    print("Initializing NotebookLM Client...")
    client = NotebookLMClient(cookies=tokens.cookies, csrf_token=tokens.csrf_token, session_id=tokens.session_id)
    
    # 1. Read the walkthrough
    walkthrough_path = r"c:\Users\Resgate\.gemini\antigravity\brain\6f846518-133f-4b8e-9411-ae54a42f026c\walkthrough.md"
    try:
        with open(walkthrough_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading walkthrough: {e}")
        return

    # 2. Check for existing notebook
    print("Listing notebooks...")
    try:
        notebooks = client.list_notebooks()
    except Exception as e:
        print(f"Error listing notebooks: {e}")
        return

    target_nb = None
    for nb in notebooks:
        if "Vetius" in nb.title or "Neurologia" in nb.title:
            target_nb = nb
            break
    
    if not target_nb:
        print("Creating new notebook: Vetius - Neurologia Project Summary")
        try:
            target_nb = client.create_notebook("Vetius - Neurologia Project Summary")
        except Exception as e:
            print(f"Error creating notebook: {e}")
            return
    
    if target_nb:
        print(f"Using notebook: {target_nb.title} ({target_nb.id})")
        print("Adding source...")
        try:
            result = client.add_text_source(target_nb.id, content, title="Resumo do Projeto - NeuroVet")
            if result:
                print(f"Successfully added source: {result.get('title')} (ID: {result.get('id')})")
                print(f"Notebook URL: https://notebooklm.google.com/notebook/{target_nb.id}")
            else:
                print("Failed to add source (returned None).")
        except Exception as e:
            print(f"Error adding source: {e}")
    else:
        print("Failed to find or create notebook.")

if __name__ == "__main__":
    main()
