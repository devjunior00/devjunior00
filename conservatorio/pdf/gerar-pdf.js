// Gera o PDF do livro de um instrumento. Uso: node gerar-pdf.js <url-base> <instrumento> <saida.pdf>
const { chromium } = require('playwright');
(async () => {
  const [base, inst, saida, extra] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ colorScheme: 'light' });
  const erros = []; p.on('pageerror', (e) => erros.push(e.message));
  await p.goto(`${base}/livro.html?inst=${inst}${extra ? '&' + extra : ''}`, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.LIVRO_PRONTO === true, null, { timeout: 120000 });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1500);
  const nome = await p.evaluate(() => window.App.inst().nome);
  const rodape = `<div style="width:100%;font:8px Figtree,sans-serif;color:#5A6273;padding:0 14mm;display:flex;justify-content:space-between"><span>Conservatório de Sopros · ${nome}</span><span class="pageNumber"></span></div>`;
  await p.pdf({ path: saida, format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<div></div>', footerTemplate: rodape, margin: { top: '15mm', bottom: '17mm', left: '14mm', right: '14mm' } });
  console.log('PDF gerado:', saida, erros.length ? 'erros: ' + erros.join(' | ') : 'sem erros');
  await b.close();
})();
