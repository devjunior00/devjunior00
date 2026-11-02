/* Flauta transversal (sistema Boehm): dedilhados (conferidos com The Woodwind Fingering Guide),
   diagrama e as partes das aulas que mudam para a flauta. */
(function () {
  'use strict';
  const IN = window.Inst, C = window.Curso;

  IN.INSTRUMENTOS.flauta = {
    id: 'flauta', nome: 'Flauta transversal', nomeMin: 'flauta transversal', curto: 'Flauta', tom: 'Dó', tomInt: 'C', familia: 'flauta', sub: 'flauta', timbre: 'flauta',
    transp: { l: 0, s: 0 }, clave: 'treble', grave: false,
    transpTexto: 'lê em sons reais (não transpõe)', exemploTransp: 'Dó escrito soa Dó',
    faixa: ['C4', 'C7'], conf: { iniciante: ['D4', 'D5'], basico: ['C4', 'G5'], intermediario: ['C4', 'C6'], avancado: ['C4', 'C7'] }, afinar: { escrita: 'A4', obs: 'Afine no Lá (2º espaço) e confira o Lá agudo (Lá5). Para corrigir, puxe ou empurre a cabeça da flauta no corpo: puxar abaixa, empurrar sobe. Não gire a coroa da cabeça: ela posiciona a rolha interna.' },
    primeiraEscala: 'C', bocal: 'cabeça',
  };
  // ordem dos botões de instrumento
  const ord = ['alto', 'soprano', 'clarinete', 'flauta', 'trompete', 'trombone'];
  const novo = {}; ord.forEach((k) => { novo[k] = IN.INSTRUMENTOS[k]; });
  Object.keys(IN.INSTRUMENTOS).forEach((k) => delete IN.INSTRUMENTOS[k]);
  Object.assign(IN.INSTRUMENTOS, novo);

  // ---------- dedilhados (notas reais = escritas) ----------
  const LH = ['fT', '1', '2', '3'], RH = ['4', '5', '6'];
  const D = {
    60: [[...LH, ...RH, 'fC']], 61: [[...LH, ...RH, 'fCs']], 62: [[...LH, ...RH]], 63: [[...LH, ...RH, 'fEb']],
    64: [[...LH, '4', '5', 'fEb']], 65: [[...LH, '4', 'fEb']], 66: [[...LH, '6', 'fEb']], 67: [[...LH, 'fEb']], 68: [[...LH, 'fGs', 'fEb']],
    69: [['fT', '1', '2', 'fEb']], 70: [['fT', '1', '4', 'fEb'], ['fTb', '1', 'fEb'], 'Polegar de Si♭: mais fácil em tonalidades com Si♭ e sem Si natural'],
    71: [['fT', '1', 'fEb']], 72: [['1', 'fEb']], 73: [['fEb']],
    74: [['fT', '2', '3', ...RH]], 75: [['fT', '2', '3', ...RH, 'fEb']],
    86: [['fT', '2', '3', 'fEb']], 87: [['fT', '1', '2', '3', 'fGs', ...RH, 'fEb']], 88: [['fT', '1', '2', '4', '5', 'fEb']], 89: [['fT', '1', '3', '4', 'fEb']],
    90: [['fT', '1', '3', '6', 'fEb']], 91: [['1', '2', '3', 'fEb']], 92: [['2', '3', 'fGs', 'fEb']], 93: [['fT', '2', '4', 'fEb']],
    94: [['fT', '4', 'fTr1']], 95: [['fT', '1', '3', 'fTr2']], 96: [['1', '2', '3', 'fGs', '4']],
  };
  // 2ª oitava (Mi5–Dó♯6): mesmos dedilhados da 1ª, com mais velocidade de ar
  for (let m = 76; m <= 85; m++) D[m] = D[m - 12];
  const OBS = {
    60: 'Dó grave: o mínimo direito aperta o rolete de Dó. Exige ar lento, quente e lábios relaxados.',
    62: 'Ré grave: mínimo direito solto (é uma das poucas notas sem a chave de Mi♭).',
    72: 'Dó médio: polegar solto e só o indicador esquerdo. Mantenha a flauta firme nos três apoios.',
    73: 'Dó♯ médio: quase todos os dedos soltos — a nota mais instável da flauta. Tende a ser alta e fina; ajuste rolando a flauta levemente para dentro.',
    74: 'Ré médio: o indicador esquerdo sai (funciona como furo de ventilação). Mínimo direito solto.',
    75: 'Mi♭ médio: como o Ré, mais a chave de Mi♭.',
    76: '2ª oitava: os dedilhados repetem os da 1ª; mude a direção e a velocidade do ar, não a força.',
    86: 'Terceira oitava: dedilhados próprios. Ar rápido e abertura pequena, sem apertar os lábios.',
    96: 'Dó agudo (Dó7): em flautas com pé de Si existe a chave “gizmo”, que facilita esta nota.',
  };
  function dedilhadoFlauta(m) {
    const d = D[m]; if (!d) return null;
    const alts = []; for (let i = 1; i < d.length; i += 2) alts.push({ k: d[i], nota: d[i + 1] || '' });
    return { k: d[0], alts, obs: OBS[m] || (m >= 76 && m <= 85 ? OBS[76] : m > 86 ? OBS[86] : '') };
  }

  const COR = 'var(--tinta)';
  function circ(x, y, r, on, rot) { return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${on ? 'var(--acento)' : 'var(--papel)'}" stroke="${COR}" stroke-width="1.6"/>${rot ? `<text x="${x}" y="${y + 3.5}" text-anchor="middle" font-size="9" fill="${on ? 'var(--papel)' : 'var(--sutil)'}">${rot}</text>` : ''}</g>`; }
  function ch(x, y, w, h, on, rot, lado) {
    const tx = lado === 'e' ? x - 4 : x + w + 4, anc = lado === 'e' ? 'end' : 'start';
    return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) / 2}" fill="${on ? 'var(--acento)' : 'var(--papel)'}" stroke="${COR}" stroke-width="1.4"/>${rot ? `<text x="${tx}" y="${y + h / 2 + 3.5}" text-anchor="${anc}" font-size="10" fill="var(--sutil)">${rot}</text>` : ''}</g>`;
  }
  function svgFlauta(k) {
    const on = (c) => k.includes(c);
    let s = '<svg viewBox="-62 0 330 330" class="diag" role="img" aria-label="Diagrama de dedilhado da flauta">';
    s += '<line x1="100" y1="30" x2="100" y2="290" stroke="var(--linha)" stroke-width="10" stroke-linecap="round"/>';
    s += ch(30, 56, 24, 11, on('fT'), 'polegar (Si)', 'e');
    s += ch(34, 72, 20, 9, on('fTb'), 'Si♭', 'e');
    s += circ(100, 62, 13, on('1'), '1');
    s += circ(100, 96, 13, on('2'), '2');
    s += circ(100, 130, 13, on('3'), '3');
    s += ch(30, 140, 24, 11, on('fGs'), 'Sol♯', 'e');
    s += circ(100, 178, 13, on('4'), '4');
    s += ch(140, 192, 10, 18, on('fTr1'), 'trinado Ré', 'd');
    s += circ(100, 212, 13, on('5'), '5');
    s += ch(140, 226, 10, 18, on('fTr2'), 'trinado Ré♯', 'd');
    s += circ(100, 246, 13, on('6'), '6');
    s += ch(126, 272, 24, 10, on('fEb'), 'Mi♭', 'd');
    s += ch(126, 286, 24, 10, on('fCs'), 'Dó♯ grave', 'd');
    s += ch(126, 300, 24, 10, on('fC'), 'Dó grave', 'd');
    s += '<text x="100" y="16" text-anchor="middle" font-size="10" fill="var(--sutil)">mão esquerda (perto do bocal)</text>';
    s += '<text x="100" y="326" text-anchor="middle" font-size="10" fill="var(--sutil)">mão direita (perto do pé)</text>';
    return s + '</svg>';
  }
  IN.registrarFlauta({ dedilhado: dedilhadoFlauta, svg: svgFlauta });

  // ---------- conteúdo específico da flauta (substitui campos das aulas) ----------
  const F = {};
  F['1-1'] = {
    teo: '<p>A flauta transversal é um dos instrumentos mais antigos da humanidade. Na Europa, a <b>flauta barroca</b> (traverso), de madeira e com uma só chave, foi o instrumento de Hotteterre, Quantz e Bach. O instrumento moderno é obra do alemão <b>Theobald Boehm</b> (1794–1881): em 1847 ele criou a flauta cilíndrica de metal, com cabeça parabólica e grandes furos cobertos por chaves — o mesmo sistema usado até hoje.</p><p>A flauta é um instrumento de <b>madeira</b> mesmo sendo de metal, porque pertence à família dos sopros de “aresta”: <b>não tem palheta nem bocal de vibração</b>. O som nasce quando o jato de ar, saindo dos lábios, bate na borda oposta do orifício de embocadura e se divide (como soprar na boca de uma garrafa). O tubo é aberto nas duas pontas, por isso a flauta “oitava” com facilidade: o mesmo dedilhado, com ar mais rápido, sobe uma oitava.</p>',
    pra: () => window.H.tabela(['Instrumento', 'Afinação', 'Soa em relação ao escrito', 'Uso típico'], [
      ['Flautim (piccolo)', 'Dó', 'uma 8ª acima', 'banda, orquestra, frevo, marchas'], ['<b>Flauta em Dó</b>', 'Dó', 'como escrito', 'a mais comum: orquestra, igreja, choro, música popular'],
      ['Flauta contralto', 'Sol', '4ª justa abaixo', 'grupos de flautas, trilhas'], ['Flauta baixo', 'Dó', 'uma 8ª abaixo', 'grupos de flautas']]) + '<p>Você vai estudar a <b>flauta em Dó</b>: ela lê a nota real, como o piano. O flautim usa os mesmos dedilhados.</p>',
    ex: '<p>Ouça e compare: <b>Jean-Pierre Rampal</b> e <b>Emmanuel Pahud</b> (erudito), <b>Altamiro Carrilho</b> e <b>Pixinguinha</b> (choro), <b>Patápio Silva</b> (“Primeiro Amor”), <b>Hubert Laws</b> (jazz), e “Syrinx” de Debussy para flauta solo. Anote como o som muda do grave (aveludado) ao agudo (brilhante).</p>',
    quiz: [
      { p: 'Quem criou o sistema da flauta moderna?', o: ['Adolphe Sax', 'Theobald Boehm', 'Johann Denner', 'Hyacinthe Klosé'], c: 1, e: 'Boehm, em 1847, com a flauta cilíndrica de metal.' },
      { p: 'Como nasce o som da flauta?', o: ['De uma palheta', 'Da vibração dos lábios no bocal', 'Do jato de ar batendo na borda do orifício', 'Das chaves'], c: 2 },
      { p: 'A flauta em Dó…', o: ['transpõe uma 2ª abaixo', 'lê em sons reais', 'soa uma 8ª acima', 'lê na clave de Fá'], c: 1 },
      { p: 'O flautim (piccolo) soa…', o: ['uma 8ª acima do escrito', 'como escrito', 'uma 5ª abaixo', 'uma 8ª abaixo'], c: 0 },
    ],
  };
  F['1-2'] = {
    teo: () => window.H.tabela(['Parte', 'Função'], [
      ['Cabeça (bocal)', 'Tem o porta-lábio e o orifício de embocadura. É a parte que mais define o som.'], ['Coroa e rolha', 'A coroa fecha a ponta da cabeça e posiciona a rolha interna. Não gire a coroa: muda a afinação de todo o instrumento.'],
      ['Corpo', 'Tem as chaves das duas mãos.'], ['Pé', 'As chaves do mínimo direito (Mi♭, Dó♯ e Dó graves; pé de Si tem também o Si grave).'],
      ['Sapatilhas', 'Vedam os furos; muito delicadas.'], ['Furos abertos (modelo francês)', 'Algumas flautas têm chaves furadas; para começar, o modelo de chaves fechadas é mais fácil.'],
    ]) + '<div class="ilustra-grande">' + window.Visual.ilustracao('flauta', { rotulos: true }) + '</div>',
    pra: '<ol><li>Segure cada parte pelas áreas <b>sem chaves</b> (o cano liso da cabeça e as pontas do corpo e do pé).</li><li>Encaixe a cabeça no corpo girando de leve, sem forçar.</li><li><b>Alinhe</b> o orifício de embocadura com o centro das chaves do corpo (ou levemente para dentro, conforme seu professor).</li><li>Encaixe o pé girando; alinhe a haste do pé com o centro da última chave do corpo, para o mínimo direito alcançar o Mi♭ com conforto.</li><li><b>Postura:</b> a flauta fica apoiada em três pontos — o queixo (porta-lábio), a base do indicador esquerdo e o polegar direito (por baixo, entre o indicador e o médio). O mínimo direito fica quase sempre na chave de Mi♭: isso dá estabilidade. Cabeça reta, a flauta para a direita, levemente inclinada para baixo, braços soltos e ombros baixos.</li></ol>',
    err: [['Segurar pelas chaves ao montar.', 'Gire pelas partes lisas: chaves tortas causam vazamentos difíceis de achar.'], ['Girar a coroa da cabeça.', 'Ela posiciona a rolha; se mexeu, peça ao técnico para conferir com a vareta de limpeza (que tem uma marca).'], ['Levantar o ombro direito e entortar o pescoço.', 'A flauta vem até o queixo; os braços ficam soltos e o pescoço reto.']],
    quiz: [
      { p: 'Quais são os três pontos de apoio da flauta?', o: ['dois polegares e o queixo', 'queixo, base do indicador esquerdo e polegar direito', 'só as duas mãos', 'ombro, queixo e mão direita'], c: 1 },
      { p: 'O que a coroa da cabeça faz?', o: ['afina girando', 'posiciona a rolha interna; não deve ser girada', 'é enfeite', 'abre o furo'], c: 1 },
      { p: 'Onde fica o mínimo direito na maior parte das notas?', o: ['solto', 'na chave de Mi♭', 'no rolete de Dó', 'no corpo'], c: 1 },
    ],
  };
  F['1-3'] = {
    teo: '<p>A umidade do sopro e a gordura das mãos são os maiores inimigos da flauta: as <b>sapatilhas</b> absorvem água, incham e passam a vazar, e o metal mancha. Sem limpeza, notas que antes saíam fáceis começam a falhar, e você culpa sua técnica por um problema mecânico.</p><p><b>Revisão preventiva:</b> uma vez por ano com um técnico especializado em flauta (ou sempre que notar os sinais abaixo).</p>',
    pra: () => `<h4>Depois de cada estudo</h4><ul><li>Desmonte. Passe a <b>vareta de limpeza</b> com um pano fino de algodão ou microfibra por dentro do corpo, do pé e da cabeça (na cabeça, só até a rolha, sem empurrar).</li><li>Limpe as partes externas e o porta-lábio com pano macio e seco.</li><li>Se uma sapatilha estiver grudando, use papel próprio para sapatilhas, sem talco e sem puxar com força.</li></ul><h4>Nunca</h4><ul><li>Não use produtos de polir prata nas chaves: eles escorrem para as sapatilhas.</li><li>Não lubrifique o encaixe das partes com graxa; mantenha-o limpo.</li></ul>${window.H.tabela(['Sintoma', 'Causa provável'], [['Notas graves não saem', 'vazamento nas sapatilhas do pé ou do corpo inferior; encaixes desalinhados'], ['Ré e Mi♭ médios falham', 'vazamento na chave do indicador esquerdo ou na de Sol♯'], ['Chave lenta para voltar', 'mola fraca ou mecanismo sujo'], ['Afinação toda estranha de repente', 'coroa girada (rolha fora do lugar)']])}`,
    err: [['Guardar a flauta molhada.', 'Sempre passe a vareta com pano. A umidade presa destrói as sapatilhas.'], ['Comer ou tomar refrigerante antes de tocar.', 'Escove os dentes ou enxágue a boca; açúcar e resíduos vão para dentro da flauta.'], ['Tentar consertar molas e chaves.', 'Deixe com o técnico; o mecanismo da flauta é muito preciso.']],
    quiz: [
      { p: 'Como se limpa a flauta por dentro?', o: ['com água corrente', 'com a vareta e um pano fino após cada estudo', 'com álcool', 'não precisa'], c: 1 },
      { p: 'Produto de polir prata nas chaves…', o: ['é recomendado toda semana', 'deve ser evitado, porque estraga as sapatilhas', 'melhora o som', 'afina a flauta'], c: 1 },
      { p: 'A afinação mudou toda de repente. O que conferir?', o: ['a palheta', 'se a coroa foi girada (posição da rolha)', 'o bocal de metal', 'a correia'], c: 1 },
    ],
  };
  F['1-4'] = {
    obj: 'Entender o que muda o som da flauta e escolher o instrumento certo para o seu nível e objetivo.',
    apr: ['Cabeça: a parte mais importante', 'Chaves fechadas × furadas', 'Pé de Dó × pé de Si', 'Sol alinhado × desalinhado e mecanismo de Mi', 'Quando trocar de flauta'],
    teo: '<p>Na flauta não há boquilha nem palheta: <b>a cabeça é o “equipamento”</b>. O corte do orifício de embocadura e o material da cabeça (alpaca, prata, ouro) influenciam a resposta e o timbre mais que qualquer outra parte.</p>' + '<ul><li><b>Chaves fechadas (plateau):</b> mais fáceis para começar. <b>Furadas (francesas):</b> exigem dedos bem centrados; permitem glissandos e técnicas modernas.</li><li><b>Pé de Dó</b> (desce até o Dó4) ou <b>pé de Si</b> (desce até o Si3 e costuma ter a chave “gizmo” que facilita o Dó7).</li><li><b>Sol desalinhado (offset G):</b> a chave do anelar esquerdo fica fora da linha — mais ergonômico, recomendado para mãos pequenas.</li><li><b>Mecanismo de Mi (split E):</b> facilita o Mi agudo (Mi6).</li></ul>',
    pra: () => window.H.tabela(['Nível', 'O que procurar'], [['Começo', 'flauta de estudante de marca reconhecida, chaves fechadas, Sol desalinhado, pé de Dó, cabeça de prata ou alpaca bem revisada'], ['Intermediário', 'cabeça de prata maciça, chaves furadas (opcional), mecanismo de Mi'], ['Avançado/profissional', 'flauta toda de prata (ou ouro na cabeça), pé de Si, cabeça escolhida tocando várias']]) + '<p class="aviso">Regra de ouro: <b>equipamento não substitui técnica</b>. Mais importante que a marca é a flauta estar <b>revisada e sem vazamentos</b>. Teste sempre tocando o Dó grave em piano.</p>',
    exs: [{ nome: 'Teste do Dó grave', dur: '10 min', obj: 'Saber se a flauta veda bem.', passos: ['Toque o Dó grave (Dó4) em piano.', 'Desça cromaticamente do Sol4 ao Dó4 ligado.', 'Se as notas graves não saem suaves, verifique vazamento com o técnico.'], crit: 'Dó grave sai em piano sem esforço.' }, { nome: 'Conheça sua flauta', dur: '10 min', obj: 'Saber o que você tem.', passos: ['Anote marca, modelo, tipo de chaves, pé, Sol alinhado ou não.', 'Pesquise o material da cabeça.'], crit: 'Ficha completa da sua flauta.' }],
    err: [['Comprar flauta muito barata sem revisão.', 'Vazamentos tornam o aprendizado frustrante. Prefira uma usada de boa marca, revisada.'], ['Chaves furadas cedo demais.', 'Comece com chaves fechadas ou com tampões nos furos.']],
    crit: ['Sei as características da minha flauta.', 'Meu Dó grave sai em piano.'],
    quiz: [{ p: 'Qual parte mais influencia o som da flauta?', o: ['o pé', 'a cabeça (corte e material)', 'as molas', 'o estojo'], c: 1 }, { p: 'Para começar, o mais indicado é…', o: ['chaves furadas e pé de Si', 'chaves fechadas, Sol desalinhado, pé de Dó', 'flautim', 'flauta baixo'], c: 1 }, { p: 'O pé de Si permite…', o: ['tocar o Si3 e facilita o Dó7 (gizmo)', 'tocar mais forte', 'transpor', 'nada'], c: 0 }],
    tarefa: 'Faça a ficha da sua flauta e o teste do Dó grave. Na próxima aula: afinação e transposição.',
  };
  F['1-5'] = {
    obj: 'Entender que a flauta lê em sons reais, saber como conversar com instrumentos transpositores e afinar a flauta.',
    teo: '<p>A flauta em Dó é um instrumento <b>não transpositor</b>: a nota escrita é a nota que soa, como no piano, no violino e na voz. Por isso você pode ler direto partituras de canto, teclado e hinários em Dó.</p><p>Mesmo assim, você precisa entender transposição, porque vai tocar com saxofones, clarinetes e trompetes. Para soar o mesmo Si♭ que você, o trompete e o clarinete leem <b>Dó</b>, o sax alto lê <b>Sol</b>. O maestro fala em “Si♭ de concerto” para não haver confusão. O <b>flautim</b> lê como a flauta, mas soa uma oitava acima.</p>',
    pra: () => `<h4>Afinação diária</h4><ol><li>Toque 2–3 minutos para aquecer.</li><li>Com o <a href="#afinador">afinador</a>, toque o Lá (2º espaço) e depois o Lá agudo.</li><li>Ponteiro à esquerda (baixo): <b>empurre</b> a cabeça para dentro do corpo, poucos milímetros. Ponteiro à direita (alto): <b>puxe</b> a cabeça para fora.</li><li>Confira o alinhamento do orifício depois de mexer.</li></ol><p>Durante a música, a flauta se afina também <b>rolando</b> o instrumento: rolar para dentro (cobrindo mais o orifício) abaixa; rolar para fora sobe. Use para pequenos ajustes; a cabeça é para o ajuste geral.</p>`,
    exs: [{ nome: 'Conversa com transpositores', dur: '15 min', obj: 'Saber o que os colegas leem.', passos: ['Escreva Si♭, Fá, Mi♭ e Dó de concerto.', 'Ao lado, o que o trompete/clarinete (Si♭) e o sax alto (Mi♭) leem.', 'Confira na aba Transpositor.'], crit: 'Acerta 12 de 12.' }, { nome: 'Afinação em três dias', dur: '5 min/dia', obj: 'Hábito.', passos: ['Afine pelo Lá.', 'Anote a posição da cabeça (uma pequena marca de lápis no tubo ajuda).'], crit: 'Afina em menos de 1 minuto.' }],
    err: [['Girar a coroa para afinar.', 'Afine puxando ou empurrando a cabeça no corpo.'], ['Corrigir tudo rolando a flauta.', 'Rolar muda também o timbre; use para ajustes finos.'], ['Afinar com a flauta fria.', 'Aqueça antes: o ar quente sobe a afinação.']],
    quiz: [{ p: 'A flauta em Dó…', o: ['transpõe uma 2ª', 'lê em sons reais', 'lê na clave de Fá', 'soa uma 8ª acima'], c: 1 }, { p: 'A flauta está baixa no afinador. Você…', o: ['puxa a cabeça para fora', 'empurra a cabeça para dentro', 'gira a coroa', 'sopra mais forte'], c: 1 }, { p: 'Para soar o seu Si♭, o trompete lê…', o: ['Si♭', 'Dó', 'Sol', 'Fá'], c: 1 }, { p: 'Rolar a flauta para dentro…', o: ['sobe a afinação', 'abaixa a afinação', 'não muda nada', 'muda a oitava'], c: 1 }],
    tarefa: 'Toque a melodia de um hino direto do hinário (em Dó) e confira as notas com o teclado. Na próxima aula: o primeiro som.',
  };
  F['1-6'] = {
    obj: 'Produzir um som estável primeiro só na cabeça da flauta e depois no instrumento montado.',
    apr: ['Som na cabeça da flauta', 'Direção do ar e abertura dos lábios', 'Primeiras notas: Si, Lá e Sol', 'Como evitar som soprado'],
    teo: '<p>Na flauta, o som nasce quando o jato de ar bate na <b>borda oposta</b> do orifício de embocadura. Não há palheta: tudo depende da <b>direção</b> do ar, do <b>tamanho da abertura</b> dos lábios e da <b>velocidade</b> do ar. Por isso o primeiro desafio é encontrar o ângulo certo — é normal levar alguns dias.</p>',
    pra: () => `<ol><li><b>Só a cabeça:</b> apoie o porta-lábio no queixo, com o lábio inferior cobrindo cerca de <b>1/4 a 1/3</b> do orifício. Lábios relaxados, formando uma abertura pequena e oval no centro, como para dizer “pu”.</li><li>Sopre um ar firme e fino em direção à borda oposta (imagine soprar uma bolinha para frente). Gire a cabeça um pouco para dentro e para fora até o som aparecer limpo.</li><li>Com a ponta da cabeça <b>aberta</b> sai uma nota aguda; <b>tampando com a palma</b>, uma nota mais grave. Tente as duas.</li><li>Monte a flauta. Primeiras notas: <b>Si</b>, <b>Lá</b> e <b>Sol</b> (só a mão esquerda, com o mínimo direito na chave de Mi♭).</li></ol>${window.H.dedos(window.App.inst(), ['B4', 'A4', 'G4'])}`,
    exs: [{ nome: 'Cabeça da flauta', dur: '5 min', bpm: 60, obj: 'Encontrar o ângulo.', passos: ['4 tempos de som, 4 de pausa.', 'Alterne ponta aberta e tampada.', '8 repetições.'], crit: 'Som limpo (pouco ar sobrando) em 6 de 8 tentativas.' }, { nome: 'Si, Lá, Sol', dur: '10 min', bpm: 60, obj: 'Primeiras notas.', passos: ['Cada nota 4 tempos, descanse 4.', 'Desça Si–Lá–Sol e suba de volta.', '5 vezes.'], crit: 'Três notas sem falhar em 4 de 5 sequências.' }],
    met: [['Nota longa de 4 tempos + 4 de pausa', 60, 60, 'mantenha 60 nesta fase']],
    err: [['Som com muito ar (soprado).', 'A abertura está grande ou o ar está indo para dentro do orifício. Diminua a abertura e direcione o ar mais para a frente.'], ['Tontura.', 'Normal no começo: a flauta gasta muito ar. Descanse entre as notas.'], ['Apertar a flauta contra o queixo e sorrir.', 'Apoio leve; lábios relaxados, cantos sem puxar para trás.']],
    crit: ['A cabeça da flauta soa limpa, aberta e tampada.', 'Toco Si, Lá e Sol sem falhar.', 'Toco sem sorrir e sem apertar o queixo.'],
    quiz: [{ p: 'Quanto do orifício o lábio inferior cobre?', o: ['nada', 'cerca de 1/4 a 1/3', 'metade ou mais', 'todo'], c: 1 }, { p: 'Som soprado costuma vir de…', o: ['palheta dura', 'abertura grande ou ar mal direcionado', 'pouca pressão no queixo', 'flauta nova'], c: 1 }, { p: 'As primeiras notas costumam ser…', o: ['Dó grave e Ré grave', 'Si, Lá e Sol (mão esquerda)', 'notas agudas', 'Dó♯ médio'], c: 1 }],
    tarefa: 'Toque Si, Lá e Sol todos os dias, gravando 30 segundos. Na próxima aula (módulo 2): respiração.',
  };
  F['2-1'] = { pra: '<p>Na flauta, a respiração é ainda mais exigente: boa parte do ar não entra no instrumento (passa por cima do orifício). Por isso a flauta pede <b>inspirações rápidas e frequentes</b> e muito controle. Ar fraco = som fino e notas que caem de oitava.</p><p>Inspire pelos cantos da boca sem tirar o porta-lábio do queixo, rápido e silencioso, com a garganta aberta (vogal “ô”).</p>' };
  F['2-2'] = {
    obj: 'Formar uma embocadura relaxada e flexível, com abertura pequena e ar bem direcionado.',
    teo: '<ul><li><b>Porta-lábio:</b> apoiado logo abaixo do lábio inferior, no queixo.</li><li><b>Lábio inferior:</b> cobre cerca de 1/4 a 1/3 do orifício.</li><li><b>Abertura:</b> pequena, oval e no centro dos lábios. Lábios relaxados (“pu”), cantos sem puxar.</li><li><b>Direção do ar:</b> o jato vai para a borda oposta. Para o agudo, o ar fica mais rápido e a abertura um pouco menor, com o lábio superior levemente para a frente; para o grave, ar mais lento e quente, direcionado um pouco para baixo.</li><li><b>Mandíbula:</b> solta; ela ajuda a mudar a direção do ar.</li></ul><p>A flauta não pede “força” de embocadura como os metais: pede <b>flexibilidade</b> e controle fino.</p>',
    pra: () => '<p>Use um espelho. Toque uma nota média e observe: a abertura fica no centro? os cantos estão relaxados? o queixo não aperta o porta-lábio?</p><p><b>Teste da direção:</b> toque Sol4 e, sem mudar os dedos, aumente a velocidade do ar e aproxime o lábio superior: deve sair o Sol5 (oitava). Volte. É o exercício básico de flexibilidade da flauta.</p>' + window.H.pauta({ tipo: 'notas', notas: 'G4:8 G5:8 G4:8 G5:8 A4:8 A5:8 A4:8 A5:8 B4:8 B5:8 B4:16', tom: 'C', titulo: 'Oitavas com o mesmo dedilhado', bpm: 60 }),
    exs: [{ nome: 'Oitavas', dur: '5 min', bpm: 60, obj: 'Flexibilidade e direção do ar.', passos: ['Sol, Lá e Si em oitavas, com o mesmo dedilhado.', 'Sem levantar a flauta nem apertar o queixo.'], crit: 'Oitavas limpas e afinadas a ♩ = 60.' }, { nome: 'Abertura no espelho', dur: '5 min', obj: 'Abertura centrada.', passos: ['Nota longa observando a abertura.', 'Diminua a abertura até o som ficar mais focado.'], crit: 'Som focado, sem ar sobrando.' }, { nome: 'Resistência', dur: '10 min', obj: 'Controle sem tensão.', passos: ['1 minuto de notas longas, 1 de descanso.', '5 ciclos.'], crit: '5 ciclos sem tensão nos lábios.' }],
    err: [['Sorrir (cantos para trás).', 'Lábios ficam finos e o som estridente. Relaxe os cantos (“pu”).'], ['Apertar o porta-lábio contra o queixo.', 'Apoio leve, só o necessário para estabilizar.'], ['Abertura grande.', 'Som soprado e pouca resistência: abertura pequena, ar rápido.'], ['Levantar a cabeça para o agudo.', 'Mude a direção do ar com os lábios e a mandíbula, não com o pescoço.']],
    crit: ['Toco oitavas com o mesmo dedilhado a ♩ = 60.', 'Minha abertura fica centrada no espelho.', 'Completo 5 ciclos sem tensão.'],
    quiz: [{ p: 'Para o agudo na flauta…', o: ['apertar os lábios com força', 'ar mais rápido e abertura um pouco menor', 'levantar a cabeça', 'soprar menos'], c: 1 }, { p: 'Os cantos da boca devem ficar…', o: ['puxados para trás', 'relaxados, sem sorrir', 'inflados', 'mordendo'], c: 1 }, { p: 'O que se treina com oitavas de mesmo dedilhado?', o: ['dedos', 'direção e velocidade do ar', 'leitura', 'ritmo'], c: 1 }],
  };
  F['2-4'] = {
    teo: '<p><b>Articulação</b> é a forma de iniciar, ligar e separar as notas. O ar está sempre pronto (apoio) e a língua funciona como uma válvula que <b>libera</b> o ar.</p><p><b>Onde a língua toca (flauta):</b> a ponta da língua toca logo atrás dos dentes de cima (ou no limite com a gengiva), como ao dizer “tu” ou “du”. Muitos flautistas usam um toque ainda mais à frente, quase nos lábios, para um ataque bem leve — experimente. Evite o ataque de garganta (“hu”).</p><p>Na flauta, a <b>dupla articulação</b> (“tu-ku”) é técnica básica e será estudada cedo (aula 6.2).</p>',
    err: [['Ataque de garganta (sem língua).', 'Treine sempre com “tu”: língua posicionada e ar pressionado atrás dela.'], ['Língua batendo com força.', 'Toque leve: a língua só “desencosta”.'], ['Mexer o queixo a cada nota.', 'Só a língua se mexe; o porta-lábio fica parado.']],
    quiz: [{ p: 'Qual a função da língua no ataque?', o: ['Empurrar o ar', 'Liberar o ar que já está pressionado', 'Fechar a garganta', 'Mover a flauta'], c: 1 }, { p: 'Onde a ponta da língua toca na flauta?', o: ['numa palheta', 'atrás dos dentes de cima', 'no céu da boca, lá atrás', 'no porta-lábio'], c: 1 }, { p: 'Que sílaba dá um ataque mais suave?', o: ['“tu”', '“du”', '“ku”', '“hu”'], c: 1 }],
  };
  F['3-1'] = { pra: '<p>Faça um teste com cada parâmetro: toque a mesma nota (1) grave e aguda — na flauta, o mesmo dedilhado com ar mais rápido sobe uma oitava; (2) curta e longa; (3) piano e forte; (4) com som “escuro” (vogal “ô”) e “claro” (vogal “i”).</p>' };
  F['3-3'] = {
    teo: '<p>Na flauta, as primeiras notas são da <b>mão esquerda</b>: <b>Si</b> (polegar + 1), <b>Lá</b> (polegar + 1 + 2) e <b>Sol</b> (polegar + 1 + 2 + 3), sempre com o <b>mínimo direito na chave de Mi♭</b>. Depois vêm Fá (+ indicador direito), Mi (+ indicador e médio) e Ré (todos, mínimo solto). Dedos curvos, a polpa centrada nas chaves.</p>',
    pra: () => window.H.dedos(window.App.inst(), ['B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C5']) + window.H.pauta({ tipo: 'notas', notas: 'B4:8 A4:8 G4:8 F4:8 E4:16 F4:8 G4:8 A4:8 B4:8 r:16', tom: 'C', titulo: 'Cinco notas: descer e subir', bpm: 60 }),
    err: [['Esquecer o mínimo direito no Mi♭.', 'Sem ele a flauta fica instável e algumas notas desafinam.'], ['Dedos esticados e tensos.', 'Dedos curvos, como segurando uma bola; movimentos pequenos.'], ['Polegar direito “empurrando” a flauta.', 'O polegar apoia por baixo, sem força.']],
    quiz: [{ p: 'O Si (3ª linha) na flauta é…', o: ['só o dedo 1', 'polegar + dedo 1 (+ mínimo no Mi♭)', '1-2-3', 'nenhum dedo'], c: 1 }, { p: 'O mínimo direito fica…', o: ['sempre solto', 'na chave de Mi♭ na maioria das notas', 'no rolete de Dó', 'no pé'], c: 1 }, { p: 'Ao trocar de nota em legato, o som deve…', o: ['parar um instante', 'continuar sem buraco', 'ter acento', 'ficar mais forte'], c: 1 }],
  };
  F['3-4'] = {
    apr: ['Extensão: Dó4 a Dó7', 'As três oitavas da flauta', 'Ré e Mi♭ médios (ventilação)', 'Notas alternativas'],
    teo: '<p><b>Extensão (até o nível avançado):</b> Dó4 a Dó7 (com pé de Si, até o Si3). A flauta lê em sons reais.</p><p><b>1ª oitava</b> (Dó4–Dó♯5): ar lento e quente. <b>2ª oitava</b> (Ré5–Dó♯6): a maior parte dos dedilhados repete a 1ª, com ar mais rápido; o <b>Ré5 e o Mi♭5 tiram o indicador esquerdo</b>, que funciona como ventilação. <b>3ª oitava</b> (Ré6–Dó7): dedilhados próprios, que usam harmônicos — estude devagar com a tabela.</p><p><b>Notas alternativas:</b> o Si♭ tem três formas (polegar de Si♭, “1 e 1” com o indicador direito, ou a alavanca de trinado); escolha conforme as notas vizinhas.</p>',
    pra: () => '<p>Use a aba <a href="#dedilhado">Dedilhados</a> como tabela completa e estude a extensão por regiões, 1–2 notas novas por semana.</p>' + window.H.pauta({ tipo: 'escala', escala: 'cromatica', tonica: 'C4', oitavas: 1, dur: 4, titulo: 'Escala cromática de uma oitava', bpm: 60 }) + window.H.pauta({ tipo: 'notas', notas: 'C5:8 D5:8 C5:8 D5:8 C#5:8 D5:8 C#5:8 Eb5:8 C5:4 C#5:4 D5:4 Eb5:4 E5:16', tom: 'C', titulo: 'Passagem Dó–Dó♯–Ré médios (a troca mais difícil da flauta)', bpm: 50 }),
    exs: [{ nome: 'Uma nota nova por vez', dur: '10 min/dia', obj: 'Ampliar a extensão.', passos: ['Escolha a próxima nota (grave ou aguda).', 'Notas longas nela.', 'Ligue-a às vizinhas.'], crit: 'Nota afinada (±15 cents) e com som parecido com as vizinhas.' }, { nome: 'Passagem Dó♯–Ré', dur: '10 min/dia', bpm: 50, obj: 'Dominar a troca difícil.', passos: ['Exercício desta aula, ligado.', '10 repetições lentas.', 'Suba 4 BPM por dia.'], crit: '10 repetições limpas a ♩ = 80.' }, { nome: 'Cromática', dur: '5 min/dia', bpm: 60, obj: 'Todas as notas.', passos: ['Cromática de 1 oitava, depois de 2.'], crit: 'Cromática de 1 oitava a ♩ = 100 em colcheias.' }],
    err: [['Apertar e soprar forte no agudo.', 'Ar rápido e abertura pequena, sem força; a nota “flutua”.'], ['Grave que sobe de oitava sozinho.', 'Ar mais lento, quente, direcionado um pouco para baixo; abertura um pouco maior.'], ['Esquecer de tirar o indicador no Ré e Mi♭ médios.', 'Treine a passagem Dó♯–Ré isolada.']],
    quiz: [{ p: 'No Ré5 e Mi♭5, o indicador esquerdo…', o: ['fica abaixado', 'sai (ventilação)', 'aperta a chave de Sol♯', 'tanto faz'], c: 1 }, { p: 'A 2ª oitava da flauta…', o: ['usa sempre dedilhados novos', 'repete a maioria dos dedilhados da 1ª com ar mais rápido', 'não existe', 'usa chave de oitava'], c: 1 }, { p: 'O Dó♯ médio tende a…', o: ['ser baixo e estável', 'ser alto e instável', 'não sair', 'ser igual ao Ré'], c: 1 }],
  };
  F['6-2'] = { teo: '<p>A língua simples tem limite de velocidade. A <b>dupla articulação</b> alterna a ponta da língua (“tu”) com o meio/fundo da língua no céu da boca (“ku”); a <b>tripla</b> usa “tu-tu-ku” ou “tu-ku-tu”.</p><p>Na flauta, dupla e tripla são técnicas essenciais, presentes em todos os métodos (Taffanel e Gaubert, Altès) e em muito repertório. O segredo é deixar o “ku” <b>igual ao “tu”</b>.</p>' };
  F['6-5'] = {
    obj: 'Desenvolver flexibilidade (harmônicos e oitavas) e sincronização entre dedos e língua.',
    apr: ['Harmônicos com o dedilhado do Dó grave', 'Flexibilidade de oitavas', 'Sincronização dedos–língua', 'Dedos relaxados em velocidade'],
    teo: '<p><b>Harmônicos:</b> com o dedilhado do Dó grave, sem mudar os dedos, é possível tocar Dó4, Dó5, Sol5, Dó6, Mi6… só mudando a direção e a velocidade do ar. É o exercício central de sonoridade e flexibilidade da flauta (presente em Moyse e Trevor Wye).</p><p><b>Sincronização:</b> os dedos se movem exatamente quando a língua solta a nota. <b>Relaxamento:</b> velocidade vem de movimentos curtos e dedos soltos.</p>',
    pra: () => window.H.pauta({ tipo: 'notas', notas: 'C4:8 C5:8 G5:8 C5:8 C4:8 C5:8 G5:8 C6:8 G5:8 C5:8 C4:16', tom: 'C', titulo: 'Harmônicos sobre o Dó grave (mesmo dedilhado o tempo todo)', bpm: 60 }) + window.H.pauta({ tipo: 'escala', escala: 'maior', tonica: 'C4', padrao: 'grupos4', dur: 1, titulo: 'Velocidade: grupos de 4 em semicolcheias', bpm: 60 }),
    exs: [{ nome: 'Harmônicos', dur: '10 min/dia', bpm: 60, obj: 'Flexibilidade e som.', passos: ['Exemplo desta aula, devagar.', 'Depois sobre Dó♯ e Ré graves.'], crit: 'Troca de harmônico limpa a ♩ = 72.' }, { nome: 'Ritmos pontuados', dur: '5 min/dia', bpm: 60, obj: 'Sincronização.', passos: ['Escala em semicolcheias em longa-curta e curta-longa.', 'Volte ao ritmo igual.'], crit: 'Ritmo igual mais limpo depois dos pontuados.' }],
    met: [['Harmônicos', 60, 92], ['Grupos de 4 em semicolcheias', 60, 108]],
    err: [['Apertar os lábios para subir de harmônico.', 'Mude direção e velocidade do ar, com abertura menor, sem força.'], ['Dedos levantando muito.', 'Movimentos mínimos.'], ['Estudar rápido sempre.', '80% devagar e perfeito, 20% testando velocidade.']],
    crit: ['Toco pelo menos 4 harmônicos sobre o Dó grave.', 'Toco grupos de 4 em semicolcheias a ♩ = 100.'],
    quiz: [{ p: 'No exercício de harmônicos…', o: ['os dedos mudam a cada nota', 'os dedos ficam iguais; muda o ar', 'só se toca forte', 'usa-se a chave de oitava'], c: 1 }, { p: 'Qual a principal inimiga da velocidade?', o: ['a partitura', 'a tensão', 'o metrônomo', 'a cabeça da flauta'], c: 1 }],
  };
  F['10-1'] = {
    teo: '<p>O <b>timbre</b> da flauta depende da direção do ar, do tamanho e da forma da abertura, da cobertura do orifício e do espaço interno da boca e da garganta (vogais). Abertura focada + garganta aberta (“ô”) = som cheio e redondo; cobrir mais o orifício escurece; descobrir clareia.</p><p><b>Projeção</b> vem do foco do jato de ar, não do volume. O livro <i>De la sonorité</i> de Marcel Moyse é a referência clássica de estudo de som (notas longas descendo cromaticamente, igualando o timbre).</p>',
    pra: () => window.H.pauta({ tipo: 'notas', notas: 'B4:16 Bb4:16 A4:16 Ab4:16 G4:16', tom: 'C', titulo: 'Notas longas descendo cromaticamente, igualando o som (inspirado no método de Moyse)', bpm: 60 }),
  };
  F['10-2'] = {
    apr: ['Vibrato de ar (diafragma e garganta)', 'Vibrato medido', 'Cores: whistle tones, frullato, cobrir e descobrir', 'Quando usar e quando não usar'],
    teo: '<p><b>Vibrato na flauta</b> é feito com o <b>ar</b>: pequenas pulsações de pressão vindas do apoio e da garganta (como “ha-ha-ha” sem som). É parte do som erudito da flauta desde o século XX e muito usado também na música popular. Comece medido, devagar, e depois deixe-o natural.</p><p><b>Cores:</b> <i>whistle tones</i> (sons de assobio, quase sem ar), <i>frullato</i> (“trrr” com a língua), cobrir/descobrir o orifício para escurecer/clarear, e harmônicos.</p>',
    exs: [{ nome: 'Vibrato medido', dur: '10 min/dia', bpm: 72, obj: 'Controle.', passos: ['2, 3 e 4 pulsações por tempo.', 'Sem desafinar a nota.'], crit: 'Pulsações regulares nos três ritmos.' }, { nome: 'Whistle tones', dur: '5 min/dia', obj: 'Controle fino do ar.', passos: ['Dedilhado de Mi grave, ar mínimo, lábios bem relaxados.', 'Procure os assobios agudos.'], crit: 'Consegue sustentar um whistle tone.' }],
    quiz: [{ p: 'O vibrato da flauta é feito principalmente com…', o: ['a mandíbula', 'o ar (apoio e garganta)', 'os dedos', 'a vara'], c: 1 }, { p: '“Vibrato tardio” é…', o: ['vibrato atrasado do ritmo', 'começar sem vibrato e acrescentá-lo depois', 'vibrato rápido', 'não usar vibrato'], c: 1 }],
  };
  F['10-3'] = { teo: () => '<p>Nenhum instrumento é perfeitamente afinado. Na flauta, as tendências mais comuns são:</p>' + window.H.tabela(['Região', 'Tendência', 'Correção'], [['1ª oitava em piano', 'baixa', 'ar mais rápido, rolar levemente para fora'], ['3ª oitava em forte', 'alta', 'rolar levemente para dentro, abertura menor'], ['Dó♯5 e Dó♯6', 'altos e instáveis', 'rolar para dentro; dedilhados de correção'], ['Diminuendo', 'a nota cai', 'mantenha a velocidade do ar; diminua a abertura']]) + '<p><b>Em conjunto:</b> afine com a referência do grupo e use a afinação justa nos acordes (aula 9.4): 3ª maior um pouco mais baixa, 3ª menor um pouco mais alta.</p>' };
  F['11-4'] = { teo: () => '<p><b>Aproximação</b>, <b>enclosure</b>, <b>escala bebop</b> e <b>outside</b> são os recursos de linguagem estudados nesta aula. Solos de flauta para transcrever: <b>Hubert Laws</b>, <b>Herbie Mann</b>, <b>Altamiro Carrilho</b> (choro), <b>Pixinguinha</b> (gravações de flauta), <b>Hermeto Pascoal</b>. Ouça também saxofonistas e trompetistas: a linguagem do jazz se aprende em todos os instrumentos.</p>' };
  F['12-2'] = { teo: () => window.H.tabela(['Efeito', 'O que é', 'Como fazer na flauta'], [['Bend', 'curvar a nota', 'rolar a flauta para dentro e baixar a mandíbula'], ['Fall', 'cair no final', 'cromática rápida descendente ou bend'], ['Growl', 'som rouco', 'cantar ao mesmo tempo que toca'], ['Frullato', 'som vibrado', '“trrr” com a língua'], ['Ghost notes', 'notas quase sem som', 'pouco ar, dedos leves']]) + '<p><b>Soul, funk e pop</b> com flauta: Hubert Laws, Herbie Mann, e as flautas da música popular brasileira (Banda Black Rio, Hermeto Pascoal).</p>' };
  F['12-4'] = { teo: '<p>A flauta tem um dos repertórios mais ricos: <b>Barroco</b> (Bach — Sonatas e Partita BWV 1013; Telemann — 12 Fantasias), <b>Clássico</b> (Mozart — Concertos em Sol K. 313 e em Ré K. 314), <b>Romântico e francês</b> (Fauré — Fantaisie; Chaminade — Concertino), <b>Moderno</b> (Debussy — Syrinx; Poulenc — Sonata; Ibert — Concerto; Prokofiev — Sonata Op. 94). No Brasil: Villa-Lobos (Bachianas nº 6, para flauta e fagote), Patápio Silva, Joaquim Callado.</p><p>A escola francesa (Taffanel, Gaubert, Moyse, Rampal) definiu o som erudito moderno da flauta.</p>' };
  F['13-4'] = { teo: '<p><b>Arranjo simples:</b> introdução – 1ª estrofe com melodia – 2ª estrofe com contracanto – interlúdio – modulação – último refrão com a melodia uma oitava acima – final.</p><p><b>Harmonização a 2 vozes:</b> 2ª voz uma 3ª ou 6ª abaixo da melodia, ajustada às notas do acorde.</p><p><b>Transpor hinários:</b> a flauta lê em Dó, então pode tocar direto dos hinários para coral e teclado (voz de soprano, ou contralto uma oitava acima, conforme a extensão).</p><p><b>Com a banda:</b> fique fora da região da voz e do teclado; no agudo a flauta se destaca com pouco volume.</p>' };
  F['14-2'] = { teo: '<p>Os métodos publicados são referências: compre as edições ou use bibliotecas. Para flauta: <b>Rubank Elementary Method</b>, <b>Altès — Méthode</b>, <b>Taffanel e Gaubert — Méthode complète</b> (com os 17 Grandes Exercícios Diários), <b>Trevor Wye — Practice Book for the Flute</b>, <b>Marcel Moyse — De la sonorité</b>, estudos de <b>Köhler</b>, <b>Berbiguier</b> e <b>Andersen</b>.</p>' };

  C.sobre = C.sobre || {};
  C.sobre.flauta = F;

  // repertório da flauta
  const R = window.Repertorio.R;
  [
    ['iniciante', 'método', 'Rubank Elementary Method — Flute or Piccolo', 'A. C. Petersen'], ['iniciante', 'método', 'Essential Elements for Band — Flauta, Livro 1', 'Hal Leonard'],
    ['basico', 'método', 'Méthode de flûte', 'Henry Altès'], ['basico', 'estudo', 'Practice Book for the Flute (vols. 1–6)', 'Trevor Wye', 'som, técnica, articulação, afinação'],
    ['basico', 'peça', 'Dança dos Espíritos Bem-Aventurados (Orfeu)', 'C. W. Gluck'], ['intermediario', 'estudo', 'De la sonorité', 'Marcel Moyse'],
    ['intermediario', 'estudo', '18 Études', 'A. B. Berbiguier'], ['intermediario', 'peça', 'Sicilienne (arr.)', 'Gabriel Fauré'],
    ['intermediario', 'brasileira', 'Flor Amorosa', 'Joaquim Callado'], ['intAvancado', 'método', 'Méthode complète de flûte (17 Grands exercices journaliers)', 'P. Taffanel e P. Gaubert'],
    ['intAvancado', 'estudo', '24 Études, Op. 33', 'Joachim Andersen'], ['intAvancado', 'peça', 'Concerto em Sol, K. 313', 'W. A. Mozart'],
    ['intAvancado', 'brasileira', 'Primeiro Amor', 'Patápio Silva'], ['avancado', 'peça', 'Syrinx', 'Claude Debussy'], ['avancado', 'peça', 'Sonata', 'Francis Poulenc'],
    ['avancado', 'peça', 'Fantaisie, Op. 79', 'Gabriel Fauré'], ['avancado', 'peça', 'Concertino, Op. 107', 'Cécile Chaminade'], ['avancado', 'peça', '12 Fantasias para flauta solo', 'G. P. Telemann'],
    ['profissional', 'peça', 'Partita em lá menor, BWV 1013', 'J. S. Bach'], ['profissional', 'peça', 'Sonata, Op. 94', 'Sergei Prokofiev'], ['profissional', 'peça', 'Concerto', 'Jacques Ibert'],
    ['avancado', 'brasileira', 'Bachianas Brasileiras nº 6 (flauta e fagote)', 'Heitor Villa-Lobos'], ['intAvancado', 'jazz', 'Gravações de Hubert Laws', 'referência de flauta no jazz e soul'],
  ].forEach(([n, t, titulo, autor, obs]) => R.push({ p: 'flauta', n, t, titulo, autor, obs }));
})();
