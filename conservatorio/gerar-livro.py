# Gera livro.html (versão de impressão do curso, usada para o PDF) a partir de app.html.
import pathlib
aqui = pathlib.Path(__file__).parent
html = (aqui / 'app.html').read_text(encoding='utf-8')
html = html.replace('<html lang="pt-BR">', '<html lang="pt-BR" data-theme="light">', 1)
css = '''<style>
@page { size: A4; margin: 15mm 14mm 17mm; }
html, body { background: #fff !important; }
body { font-size: 10.4pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
#livro { padding: 0; }
#livro section, #livro article { box-shadow: none; }
#livro button, #livro .pauta-ctl, #livro [data-met] { display: none !important; }
#livro .cartao, #livro .pauta, #livro .nota-card, #livro .exercicio { box-shadow: none; }
#livro h1 { font-size: 22pt; margin: 0 0 6pt; }
#livro h2 { font-size: 13.5pt; display: flex; gap: 8pt; align-items: baseline; margin: 14pt 0 6pt; break-after: avoid; }
#livro h2 .n { font-family: var(--f-dados); font-size: 9pt; color: var(--acento-texto); }
#livro h3 { font-size: 12pt; margin: 12pt 0 4pt; break-after: avoid; }
#livro h4 { margin: 0; }
#livro p { margin: 0 0 5pt; }
#livro ul, #livro ol { margin: 2pt 0 6pt; padding-left: 1.3em; }
#livro li { margin: 1pt 0; }
#livro table { font-size: 9pt; }
#livro th, #livro td { padding: 4pt 6pt; }
#livro tr, #livro .pauta, #livro .nota-card, #livro .exercicio, #livro .erro-par, #livro .quiz-q, #livro .trio, #livro .aviso, #livro .alt-linha { break-inside: avoid; }
#livro .pauta { margin: 6pt 0; padding: 6pt 8pt; }
#livro .exercicio { margin: 6pt 0; padding: 8pt 10pt; gap: 3pt; }
#livro .erro-par { margin: 5pt 0; }
#livro .quiz-q { padding: 4pt 0; border-top: 1px solid var(--linha); }
#livro .quiz-q ol { margin: 2pt 0 0; }
#livro .cartoes-nota { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8pt; }
#livro .nota-card { padding: 6pt; gap: 4pt; }
#livro .nota-card .nota-dedos .diag { max-width: 200px; }
#livro .nota-id b { font-size: 14pt; }
#livro .dedos-txt { font-size: 8.4pt; }
#livro .nota-mini { width: 70px; }
#livro .nota-id { font-size: 8.4pt; }
#livro .ilustra-grande { max-width: 300px; }
.aula-livro, .apendice, .pagina, .abre-modulo { break-before: page; }
.aula-livro .cab-aula { border-bottom: 2px solid var(--acento); padding-bottom: 6pt; margin-bottom: 4pt; }
.num-aula { font-family: var(--f-dados); font-size: 14pt; color: var(--acento-texto); margin-right: 6pt; }
.capa { height: 262mm; display: grid; grid-template-rows: 1fr auto; gap: 18pt; padding: 10mm 6mm; background: radial-gradient(circle at 50% 30%, var(--acento-suave), #fff 65%); border-radius: 14pt; }
.capa-arte { display: grid; place-items: center; } .capa-arte .ilustra { width: 62%; }
.capa-txt { display: flex; flex-direction: column; gap: 8pt; }
.capa-txt h1 { font-size: 40pt !important; }
.capa-sub { font-family: var(--f-titulo); font-size: 22pt; } .capa-sub em { color: var(--acento-texto); }
.abre-modulo { height: 250mm; display: flex; flex-direction: column; justify-content: center; gap: 10pt; padding: 0 10mm; }
.abre-modulo .mod-num { font-family: var(--f-titulo); font-size: 96pt; line-height: 1; color: var(--acento-texto); }
.abre-modulo h1 { font-size: 30pt !important; }
.abre-modulo ol { list-style: none; padding: 0; font-size: 11.5pt; }
.sumario { column-count: 2; column-gap: 12mm; font-size: 9.3pt; }
.sum-mod { break-inside: avoid; margin-bottom: 8pt; } .sum-mod ol { list-style: none; padding: 0; margin: 2pt 0 0; } .sum-mod .num { font-family: var(--f-dados); color: var(--acento-texto); margin-right: 4pt; }
.legenda-chaves { display: grid; grid-template-columns: 200px 1fr; gap: 14pt; align-items: center; break-inside: avoid; margin: 8pt 0; }
.gabarito { column-count: 2; column-gap: 10mm; font-size: 8.6pt; } .gabarito > div { break-inside: avoid; margin-bottom: 6pt; } .gabarito ol { margin: 1pt 0 0; }
.checks { list-style: none; padding-left: 0 !important; }
.ficha { break-inside: avoid; margin-top: 10pt; } .ficha td { height: 16pt; }
.trio h3 { margin-top: 8pt; }
.abre-parte { break-before: page; height: 250mm; display: flex; flex-direction: column; justify-content: center; gap: 12pt; padding: 0 12mm; background: radial-gradient(circle at 20% 30%, var(--acento-suave), #fff 60%); border-radius: 14pt; }
.abre-parte h1 { font-size: 38pt !important; }
.abre-parte p { font-size: 13pt; max-width: 60ch; }
.sumario h3 { column-span: all; margin-top: 10pt; }
</style>'''
html = html.replace('</head>', css + '\n</head>', 1)
html = html.replace('<script src="js/app.js"></script>', '<script src="js/app.js"></script>\n<script src="js/leitura-metodo.js"></script>\n<script src="js/livro.js"></script>', 1)
(aqui / 'livro.html').write_text(html, encoding='utf-8')
print('livro.html gerado')
