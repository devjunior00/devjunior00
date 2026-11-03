/* Conservatório de Sopros — gera o livro (PDF) completo de um instrumento a partir do conteúdo do curso.
   Uso: livro.html?inst=alto  → monta tudo em #livro e define window.LIVRO_PRONTO = true. */
(function () {
  'use strict';
  const M = window.Musica, IN = window.Inst, C = window.Curso, H = window.H, V = window.Visual, F = window.Ferr;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const params = new URLSearchParams(location.search);
  const id = params.get('inst') || 'alto';
  const E = window.App.estado();
  E.inst = id; E.escolhido = true;
  const I = IN.INSTRUMENTOS[id];
  const v = (x) => (typeof x === 'function' ? x(I, H) : x);
  const NIVEIS = { iniciante: 'Iniciante', basico: 'Básico', intermediario: 'Intermediário', intAvancado: 'Intermediário avançado', avancado: 'Avançado', profissional: 'Profissional' };
  const SECOES = [['obj', 'Objetivo principal'], ['apr', 'O que você vai aprender'], ['teo', 'Explicação teórica'], ['pra', 'Aplicação prática no saxofone'], ['ex', 'Exemplos musicais'],
    ['exs', 'Exercícios passo a passo'], ['met', 'Exercícios com metrônomo'], ['err', 'Erros comuns e como corrigir'], ['tempo', 'Tempo recomendado de estudo'], ['crit', 'Critério de aprovação'], ['quiz', 'Teste de aprendizagem'], ['tarefa', 'Tarefa para a próxima aula']];
  const gabarito = [];
  const ARTE = I.id === 'soprano' ? 'soprano' : I.sub;
  const L = (s) => s.replace(/<a [^>]*>(.*?)<\/a>/g, '$1'); // links viram texto

  function aula(idA, num) {
    const base = C.aulas[idA];
    const a = Object.assign({}, base, ((C.sobre || {})[I.id] || {})[idA] || {});
    const mod = C.modulos.find((m) => m.n === a.mod);
    const quiz = v(a.quiz) || [];
    gabarito.push([idA, a.titulo, quiz]);
    const b = {
      obj: `<p>${v(a.obj)}</p>`,
      apr: `<ul>${(v(a.apr) || []).map((x) => `<li>${x}</li>`).join('')}</ul>`,
      teo: v(a.teo) + (idA === '1-2' ? `<div class="ilustra-grande">${V.ilustracao(ARTE, { rotulos: true })}</div>` : ''),
      pra: v(a.pra), ex: v(a.ex),
      exs: (v(a.exs) || []).map((x, i) => `<div class="exercicio"><h4><span class="n">${i + 1}</span>${x.nome}</h4><div class="meta">${x.dur ? `<span class="chip">⏱ ${x.dur}</span>` : ''}${x.bpm ? `<span class="chip ouro">♩ = ${x.bpm}</span>` : ''}</div>${x.obj ? `<p><b>Objetivo:</b> ${x.obj}</p>` : ''}${x.passos ? `<ol>${x.passos.map((p) => `<li>${p}</li>`).join('')}</ol>` : ''}${x.extra || ''}${x.crit ? `<p class="peq"><b>Está pronto quando:</b> ${x.crit}</p>` : ''}</div>`).join(''),
      met: (() => { const l = v(a.met) || []; return l.length ? H.tabela(['Exercício', 'Comece em', 'Meta', 'Como subir'], l.map((m) => [m[0], `♩ = ${m[1]}`, `♩ = ${m[2]}`, m[3] || '+4 BPM por dia, se limpo'])) + '<p class="peq sutil">Suba o andamento só depois de três execuções seguidas sem erro. Errou? Volte 8 BPM.</p>' : ''; })(),
      err: (v(a.err) || []).map(([e, c]) => `<div class="erro-par"><div><span class="rotulo">Erro</span><p>${e}</p></div><div><span class="rotulo">Como corrigir</span><p>${c}</p></div></div>`).join(''),
      tempo: `<p>${v(a.tempo)}</p>`,
      crit: `<ul class="checks">${(v(a.crit) || []).map((c) => `<li>☐ ${c}</li>`).join('')}</ul><p class="peq sutil">Aprovação: todos os critérios cumpridos (confira gravando-se) e pelo menos 80% de acerto no teste.</p>`,
      quiz: quiz.map((q, i) => `<div class="quiz-q"><b>${i + 1}. ${q.p}</b><ol type="a">${q.o.map((o) => `<li>${o}</li>`).join('')}</ol></div>`).join('') + '<p class="peq sutil">Respostas no gabarito, no final do livro.</p>',
      tarefa: `<p>${v(a.tarefa)}</p>`,
    };
    const ativas = SECOES.filter(([k]) => b[k] && String(b[k]).trim());
    return `<article class="aula-livro" id="aula-${idA}">
      <header class="cab-aula"><span class="rotulo">Módulo ${mod.n} · ${esc(mod.titulo)} · ${NIVEIS[mod.nivel]}</span><h1><span class="num-aula">${idA.replace('-', '.')}</span> ${esc(a.titulo)}</h1></header>
      ${ativas.map(([k, t], i) => `<section><h2><span class="n">${String(i + 1).padStart(2, '0')}</span>${t}</h2>${L(b[k])}</section>`).join('')}
    </article>`;
  }

  // ---------- partes do livro ----------
  const total = Object.keys(C.aulas).length;
  const hoje = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const capa = `<section class="capa">
    <div class="capa-arte">${V.ilustracao(ARTE)}</div>
    <div class="capa-txt"><span class="rotulo">Conservatório de Sopros</span><h1>${esc(I.nome)}</h1><p class="capa-sub">Do primeiro sopro <em>ao palco</em></p>
      <p>Curso completo em 16 módulos e ${total} aulas — do iniciante ao profissional. Teoria desde a origem, leitura de partitura, técnica, harmonia, percepção, improvisação, estilos, música gospel e preparação profissional, tudo escrito para o saxofone alto em Mi♭.</p>
      <p class="peq sutil">Edição de ${hoje}</p></div></section>`;

  const comoUsar = `<section class="pagina"><h1>Como usar este livro</h1>
    <p>Este livro é um curso de conservatório organizado para você estudar sozinho ou com um professor. Ele segue uma regra simples: <b>o progresso depende do domínio, não do tempo</b>. Não há prazos: há critérios.</p>
    <h3>Cada aula tem doze partes</h3>${H.tabela(['Parte', 'Para que serve'], [['Objetivo', 'o que você deve conseguir fazer ao final'], ['O que vai aprender', 'os tópicos da aula'], ['Explicação teórica', 'o conceito, desde a origem'], ['Aplicação prática', 'como aquilo vira som no saxofone alto, com partituras e dedilhados'], ['Exemplos', 'músicas e gravações de referência'], ['Exercícios', 'passo a passo, com duração e critério'], ['Metrônomo', 'andamento inicial, meta e como subir'], ['Erros comuns', 'o que costuma dar errado e como corrigir'], ['Tempo de estudo', 'quanto dedicar'], ['Critério de aprovação', 'a lista do que você precisa cumprir'], ['Teste', 'perguntas para conferir a teoria (gabarito no final)'], ['Tarefa', 'o que fazer antes da próxima aula']])}
    <h3>Regras de ouro do estudo</h3><ol>
      <li><b>Grave-se.</b> O celular é seu melhor professor: ouça cada gravação com a partitura na mão.</li>
      <li><b>Metrônomo sempre.</b> Comece onde você não erra; suba 4 BPM a cada três execuções limpas; errou, volte 8.</li>
      <li><b>Notas longas todos os dias</b>, por toda a vida. Elas constroem som, afinação e apoio.</li>
      <li><b>Pouco e todo dia</b> vale mais que muito de vez em quando. 30 minutos diários rendem mais que 3 horas no sábado.</li>
      <li><b>Não avance sem os critérios.</b> Base fraca vira problema lá na frente.</li>
      <li><b>Ouça os grandes.</b> Você só produz o som que consegue imaginar.</li></ol>
    <h3>Sobre a transposição</h3><p>O saxofone alto é um instrumento <b>em Mi♭</b>: ele soa uma 6ª maior abaixo do que está escrito. Quando você toca o <b>Dó escrito</b>, sai o <b>Mi♭ de concerto</b>. Todas as partituras deste livro já estão escritas para o sax alto; quando aparece “soa…”, é o som real, que o piano ou o teclado precisa tocar para soar igual.</p>
    <h3>Símbolos</h3><p>⏱ duração do exercício · ♩ = andamento em batidas por minuto · ☐ critério a cumprir · “Exercício original” = criado para este curso; obras citadas de outros autores são referências — compre as edições publicadas.</p></section>`;

  const plano = `<section class="pagina"><h1>Plano de formação</h1><p>Os 16 módulos, do zero ao nível profissional. Os níveis indicam a etapa da formação; avance quando cumprir os critérios de todas as aulas do módulo.</p>
    ${H.tabela(['Nível', 'Módulo', 'Conteúdo'], C.modulos.map((m) => [NIVEIS[m.nivel], `<b>${m.n}. ${esc(m.titulo)}</b>`, esc(m.desc)]))}
    <h3>Quanto tempo leva?</h3><p>Depende do seu estudo diário e do domínio de cada aula. Como referência, com 45–60 minutos por dia: os módulos 1–4 costumam levar de 3 a 6 meses; 5–6, mais 4 a 8 meses; 7–11, de 1 a 2 anos; 12–16 são a formação de toda a vida musical. Não compare seu ritmo com o de ninguém: compare suas gravações de hoje com as do mês passado.</p></section>`;

  const sumario = `<section class="pagina"><h1>Sumário</h1><div class="sumario">${C.modulos.map((m) => `<div class="sum-mod"><b>${m.n}. ${esc(m.titulo)}</b> <span class="sutil">· ${NIVEIS[m.nivel]}</span><ol>${m.aulas.map((a) => `<li><span class="num">${a.replace('-', '.')}</span> ${esc(C.aulas[a].titulo)}</li>`).join('')}</ol></div>`).join('')}
    <div class="sum-mod"><b>Apêndices</b><ol><li>A · Tabela completa de dedilhados</li><li>B · Escalas nas 12 tonalidades</li><li>C · Arpejos nas 12 tonalidades</li><li>D · Transposição</li><li>E · Rotinas de estudo</li><li>F · Fichas de avaliação</li><li>G · Repertório</li><li>H · Melodias do curso</li><li>I · Referências de intervalos</li><li>J · Gabarito dos testes</li></ol></div></div></section>`;

  // A — dedilhados
  const [lo, hi] = I.faixa.map((x) => M.midi(M.parse(x)));
  const notasExt = []; for (let m = lo; m <= hi; m++) { const n = M.deMidi(m, [70, 82, 75, 87, 63, 58].includes(m)); notasExt.push(n.l + (n.a === 1 ? '#' : n.a === -1 ? 'b' : '') + n.o); }
  const altern = notasExt.map((s) => { const n = M.parse(s), d = IN.dedilhado(I, n); return d && d.alts.length ? `<div class="alt-linha"><b>${M.nomeBR(n)}${n.o}</b> — alternativas: ${d.alts.map((a) => `<span>${esc(a.texto)}${a.nota ? ' <i class="sutil">(' + esc(a.nota) + ')</i>' : ''}</span>`).join('; ')}</div>` : ''; }).join('');
  const obsList = notasExt.map((s) => { const n = M.parse(s), d = IN.dedilhado(I, n); return d && d.obs ? `<li><b>${M.nomeBR(n)}${n.o}:</b> ${esc(d.obs)}</li>` : ''; }).join('');
  const apA = `<section class="apendice"><h1>Apêndice A · Tabela completa de dedilhados</h1><p>Todas as notas <b>escritas</b> do saxofone alto, do Si♭ grave ao Fá♯ agudo. Em cada cartão: a nota na pauta, o nome, a posição na pauta, o som real (de concerto), o desenho das chaves (em dourado, as que você aperta) e a explicação em palavras.</p>
    <div class="legenda-chaves">${V.ilustracao(ARTE, { rotulos: true })}<div><h3>Como ler o diagrama</h3><ul><li>Círculos <b>1, 2, 3</b>: indicador, médio e anelar da mão esquerda (em cima).</li><li>Círculos <b>4, 5, 6</b>: indicador, médio e anelar da mão direita (embaixo).</li><li><b>Oitava</b>: polegar esquerdo, atrás do sax.</li><li><b>Palma (Ré, Mi♭, Fá)</b>: base do indicador e palma da mão esquerda.</li><li><b>Laterais</b> (Mi agudo, Dó, Si♭): lateral da mão direita.</li><li><b>Mínimo esquerdo</b>: Sol♯, Dó♯, Si e Si♭ graves. <b>Mínimo direito</b>: Mi♭ e Dó graves.</li></ul></div></div>
    ${H.dedos(I, notasExt)}<h3>Dedilhados alternativos</h3>${altern}<h3>Observações por nota</h3><ul>${obsList}</ul></section>`;

  // B — escalas
  const TON = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
  const MEN = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Bb', 'F', 'C', 'G', 'D'];
  const esc2 = (tipo, lista, oit, dur) => lista.map((t) => H.pauta({ tipo: 'escala', escala: tipo, tonica: t + '4', oitavas: oit, dur, porLinha: 4 })).join('');
  const apB = `<section class="apendice"><h1>Apêndice B · Escalas nas 12 tonalidades</h1><p>Escritas para o saxofone alto, seguindo o ciclo das quintas. Cada uma mostra a tonalidade escrita e o som de concerto. Estude de memória, com metrônomo, em semínimas, depois colcheias (meta: ♩ = 120). Quando a escala de duas oitavas não cabe na extensão, aparece em uma oitava.</p>
    <h2>Escalas maiores (2 oitavas quando possível)</h2>${esc2('maior', TON, 2, 2)}
    <h2>Escalas menores harmônicas</h2>${esc2('menorHarm', MEN, 1, 2)}
    <h2>Escalas menores melódicas (sobe melódica, desce natural)</h2>${esc2('menorMel', MEN, 1, 2)}
    <h2>Pentatônicas menores</h2>${esc2('pentaMenor', MEN, 1, 2)}
    <h2>Escalas blues</h2>${esc2('blues', MEN, 1, 2)}
    <h2>Escala cromática em toda a extensão</h2>${H.pauta({ tipo: 'escala', escala: 'cromatica', tonica: 'Bb3', oitavas: 2, dur: 2, porLinha: 4 })}
    <h2>Escala maior por terças e em grupos de 4 (Dó escrito)</h2>${H.pauta({ tipo: 'escala', escala: 'maior', tonica: 'C4', padrao: 'tercas', dur: 2 })}${H.pauta({ tipo: 'escala', escala: 'maior', tonica: 'C4', padrao: 'grupos4', dur: 2 })}</section>`;

  // C — arpejos
  const apC = `<section class="apendice"><h1>Apêndice C · Arpejos nas 12 tonalidades</h1><p>Tríade maior, tríade menor (da relativa) e acorde de sétima da dominante (V7) de cada tonalidade maior, escritos para o sax alto.</p>
    ${TON.map((t, i) => `<div class="trio"><h3>${M.nomeBR(M.parse(t + '4'))} maior · ${M.nomeBR(M.parse(MEN[i] + '4'))} menor</h3>${H.pauta({ tipo: 'arpejo', acorde: 'M', tonica: t + '4', dur: 2 })}${H.pauta({ tipo: 'arpejo', acorde: 'm', tonica: MEN[i] + '4', dur: 2 })}${H.pauta({ tipo: 'arpejo', acorde: 'd7', tonica: M.nomeInt(M.grau(M.parse(t + '4'), 7, 4)).replace('♯', '#').replace('♭', 'b') + '4', dur: 2 })}</div>`).join('')}</section>`;

  // D — transposição
  const conc = ['C4', 'C#4', 'D4', 'Eb4', 'E4', 'F4', 'F#4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'].map(M.parse);
  const apD = `<section class="apendice"><h1>Apêndice D · Transposição</h1>
    <h3>Notas: concerto → sax alto</h3>${H.tabela(['Som de concerto (piano, voz, flauta)', 'Você lê no sax alto'], conc.map((n) => [M.nomeComp(n), `<b>${M.nomeComp(M.concertoParaEscrita(n, I))}</b>`]))}
    <h3>Tonalidades: concerto → sax alto</h3>${H.tabela(['Concerto', 'Escrito para o sax alto', 'Armadura escrita'], M.CICLO.map((t) => { const tc = M.parse(t + '4'), r = M.tomEscrito(tc, 'maior', I); return [M.nomeBR(tc) + ' maior', `<b>${M.nomeBR(r.tonica)} maior</b>`, M.descArmadura(r.tonica)]; }))}
    <h3>Regras rápidas</h3><ul><li><b>De Dó (piano, voz, hinário de coral) para o sax alto:</b> suba uma 6ª maior (ou desça uma 3ª menor e acerte a oitava). Armadura: <b>+3 sustenidos</b> (ou −3 bemóis).</li><li><b>Do sax alto para Dó:</b> desça uma 6ª maior (ou suba uma 3ª menor). Armadura: −3 sustenidos (ou +3 bemóis).</li><li><b>De instrumentos em Si♭</b> (sax tenor, trompete, clarinete) <b>para o alto:</b> suba uma 5ª justa (ou desça uma 4ª justa). Armadura: +1 sustenido.</li><li><b>Cifras transpõem também:</b> C7 no teclado = A7 para você.</li></ul></section>`;

  // E — rotinas
  const blocos = F._dados.blocosRotina;
  const apE = `<section class="apendice"><h1>Apêndice E · Rotinas de estudo</h1><p>Modelos de 20 a 120 minutos para três níveis. Cada bloco tem objetivo e critério. Faça pausas de 5 minutos a cada 25–30 minutos: os lábios descansam e a qualidade sobe.</p>
    ${['iniciante', 'intermediario', 'avancado'].map((n) => `<h2>Nível ${n === 'iniciante' ? 'iniciante' : n === 'intermediario' ? 'intermediário' : 'avançado'}</h2>${[20, 30, 45, 60, 90, 120].map((min) => `<h3>${min} minutos</h3>${H.tabela(['Min', 'Bloco', 'Como fazer', 'Critério'], blocos(min, n, I).map((b) => [`<b>${b.min}</b>`, b.nome, b.como, b.crit]))}`).join('')}`).join('')}</section>`;

  // F — avaliação
  const D = F._dados;
  const apF = `<section class="apendice"><h1>Apêndice F · Fichas de avaliação</h1><p>Avalie-se com base em <b>gravações</b>, nunca de memória. Notas de 0 a 10; seja honesto — a nota serve para guiar o estudo.</p>
    <h3>O que significa cada nota</h3>${H.tabela(['Nota', 'Significado'], D.FAIXAS)}
    <h3>Roteiros</h3>${H.tabela(['Avaliação', 'O que gravar e fazer'], Object.entries(D.ROTEIRO).map(([k, t]) => [k[0].toUpperCase() + k.slice(1), t]))}
    ${['Semanal', 'Mensal', 'Trimestral', 'Semestral'].map((tp) => `<div class="ficha"><h3>Ficha ${tp.toLowerCase()} · data: ____/____/______</h3>${H.tabela(['Critério', 'O que observar', 'Nota (0–10)', 'Anterior', 'Observação'], D.CRITERIOS.map(([, n, d]) => [`<b>${n}</b>`, d, '', '', '']))}<p>Média: ______ · Foco da próxima etapa (o critério mais baixo): ______________________________</p></div>`).join('')}</section>`;

  // G — repertório
  const R = window.Repertorio.para(I);
  const apG = `<section class="apendice"><h1>Apêndice G · Repertório progressivo</h1><p>Métodos, estudos e peças reais para o saxofone alto, por nível. São referências: procure as edições publicadas (compre ou use bibliotecas). Itens marcados como “original” foram criados para este curso.</p>
    ${Object.entries(NIVEIS).map(([k, n]) => { const it = R.filter((x) => x.n === k); return it.length ? `<h3>${n}</h3>${H.tabela(['Tipo', 'Título', 'Autor / observação'], it.map((x) => [x.t, `<b>${esc(x.titulo)}</b>`, esc(x.autor) + (x.obs ? ' — ' + esc(x.obs) : '')]))}` : ''; }).join('')}
    <h3>Como estudar uma peça nova</h3><ol><li>Ouça duas ou três gravações de referência.</li><li>Analise: tonalidade, forma, trechos difíceis, respirações.</li><li>Divida em trechos de 4–8 compassos; comece pelos difíceis.</li><li>Metrônomo a 60% do andamento final; +4 BPM por dia quando limpo.</li><li>Junte os trechos; toque do início ao fim sem parar.</li><li>Interprete: dinâmica, articulação de estilo, fraseado.</li><li>Grave, corrija e toque para alguém.</li></ol></section>`;

  // H — melodias
  const mel = ['brilha', 'ode', 'coral', 'santos', 'graca', 'resposta', 'blues', 'iiVI', 'guia', 'contracanto'].map((m) => H.pauta({ tipo: 'mel', id: m, porLinha: 4 })).join('') +
    ['s', 'a', 't', 'b'].map((vz) => H.pauta({ tipo: 'mel', id: 'coral4', voz: vz })).join('') + H.pauta({ tipo: 'hino', id: 'ex-noite' });
  const apH = `<section class="apendice"><h1>Apêndice H · Melodias do curso</h1><p>Todas as melodias usadas nas aulas, escritas para o sax alto: domínio público e exercícios originais. O coral a quatro vozes está em Fá maior de concerto; cada voz aparece escrita para o sax alto.</p>${mel}</section>`;

  // I — intervalos
  const apI = `<section class="apendice"><h1>Apêndice I · Referências de intervalos</h1><p>Associe cada intervalo a uma música que você conhece. Melhor ainda: troque as referências por hinos e louvores que você canta — referência pessoal fixa melhor.</p>${H.tabela(['Intervalo', 'Semitons', 'Referência (ascendente)'], D.INTERVALOS.map(([s, n, r]) => [n, s, r]))}</section>`;

  const conteudo = [capa, comoUsar, plano, sumario];
  C.modulos.forEach((m) => {
    conteudo.push(`<section class="abre-modulo"><span class="rotulo">${NIVEIS[m.nivel]}</span><div class="mod-num">${m.n}</div><h1>${esc(m.titulo)}</h1><p>${esc(m.desc)}</p><ol>${m.aulas.map((a) => `<li>${a.replace('-', '.')} · ${esc(C.aulas[a].titulo)}</li>`).join('')}</ol></section>`);
    m.aulas.forEach((a) => conteudo.push(aula(a)));
  });
  const apJ = `<section class="apendice"><h1>Apêndice J · Gabarito dos testes</h1><div class="gabarito">${gabarito.map(([a, t, q]) => `<div><b>${a.replace('-', '.')} ${esc(t)}</b><ol>${q.map((x) => `<li>${String.fromCharCode(97 + x.c)}) ${x.o[x.c]}${x.e ? ' — <span class="sutil">' + x.e + '</span>' : ''}</li>`).join('')}</ol></div>`).join('')}</div></section>`;
  conteudo.push(apA, apB, apC, apD, apE, apF, apG, apH, apI, apJ);

  document.querySelector('.topo').remove();
  const bar = document.getElementById('barra'); if (bar) bar.remove();
  document.getElementById('app').hidden = true;
  const livro = document.createElement('div');
  livro.id = 'livro';
  livro.innerHTML = conteudo.join('');
  document.body.appendChild(livro);
  window.renderPautas(livro);
  window.LIVRO_PRONTO = true;
})();
