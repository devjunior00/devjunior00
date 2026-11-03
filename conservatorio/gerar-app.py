# Gera app.html (versão para abrir fora do Claude, ex.: GitHub Pages) a partir de index.html.
import pathlib
aqui = pathlib.Path(__file__).parent
corpo = (aqui / 'index.html').read_text(encoding='utf-8').replace('<meta charset="utf-8">\n', '', 1)
cab = '''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%2310131A'/%3E%3Ctext x='50' y='68' font-size='56' text-anchor='middle' fill='%23D9A441'%3E%E2%99%AA%3C/text%3E%3C/svg%3E">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
'''
(aqui / 'app.html').write_text(cab + corpo + '\n</body>\n</html>\n', encoding='utf-8')
print('app.html gerado')

# app-completo.html: um arquivo só, com todos os scripts embutidos (abre em serviços que não carregam arquivos separados)
import re
html = (aqui / 'app.html').read_text(encoding='utf-8')
def embute(m):
    src = m.group(1)
    if src.startswith('http'):
        caminho = aqui / 'vendor' / src.rsplit('/', 1)[-1]
    else:
        caminho = aqui / src
    codigo = caminho.read_text(encoding='utf-8').replace('</script', '<\\/script')
    return '<script>\n' + codigo + '\n</script>'
completo = re.sub(r'<script src="([^"]+)"></script>', embute, html)
(aqui / 'app-completo.html').write_text(completo, encoding='utf-8')
print('app-completo.html gerado')
