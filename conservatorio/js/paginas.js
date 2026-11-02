/* Conservatório de Sopros — telas: escolha do instrumento, ferramentas, gospel, leitura de partitura */
(function () {
  'use strict';
  const M = window.Musica, A = window.Audio2, IN = window.Inst, V = window.Visual, C = window.Curso, Ferr = window.Ferr;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // posição da nota na pauta (linha/espaço) — usada no cartão da nota e no treino de leitura
  function posicao(n, clave) {
    const ref = clave === 'bass' ? 2 * 7 + 4 : 4 * 7 + 2; // Sol2 (1ª linha, clave de Fá) ou Mi4 (1ª linha, clave de Sol)
    const p = n.o * 7 + M.LETRAS.indexOf(n.l) - ref;
    if (p >= 0 && p <= 8) return p % 2 === 0 ? `${p / 2 + 1}ª linha` : `${(p + 1) / 2}º espaço`;
    if (p < 0) { const k = -p; return k % 2 === 0 ? `${k / 2}ª linha suplementar inferior` : (k === 1 ? 'espaço abaixo da pauta' : `abaixo da ${(k - 1) / 2}ª linha suplementar inferior`); }
    const k = p - 8; return k % 2 === 0 ? `${k / 2}ª linha suplementar superior` : (k === 1 ? 'espaço acima da pauta' : `acima da ${(k - 1) / 2}ª linha suplementar superior`);
  }
  V.posicao = posicao;

  const TAGS = {
    alto: 'O som mais versátil dos sopros — do culto ao jazz, do choro à sala de concerto.',
    soprano: 'Brilho e doçura numa linha reta. Pede precisão e devolve beleza.',
    clarinete: 'Do grave aveludado ao agudo cristalino: o instrumento de Mozart e de Abel Ferreira.',
    flauta: 'O sopro mais antigo da música, com a técnica mais refinada.',
    trompete: 'A voz do anúncio e da celebração: brilho, potência e lirismo.',
    trombone: 'Profundidade e calor. A vara canta e o naipe ganha alma.',
  };

  // ======================= ESCOLHA DO INSTRUMENTO =======================
  Ferr.inicio = (el, ctx) => {
    el.innerHTML = `<div class="vista"><section class="escolha-cab">
        <span class="rotulo">Conservatório de Sopros</span>
        <h1>Qual instrumento <em>vai ser o seu?</em></h1>
        <p>Escolha e comece do começo: como montar, como soprar, como ler. Siga no seu ritmo até o nível profissional — com partituras transpostas, dedilhados desenhados, ferramentas de estudo e um professor para tirar dúvidas.</p>
      </section>
      <section class="escolha">${Object.values(IN.INSTRUMENTOS).map((I) => `
        <button class="inst-card ${ctx.inst.id === I.id && ctx.E.escolhido ? 'atual' : ''}" type="button" data-escolher="${I.id}">
          <div class="inst-arte">${V.ilustracao(I.sub === 'sax' ? (I.id === 'soprano' ? 'soprano' : 'sax') : I.sub)}</div>
          <div class="inst-txt"><b>${esc(I.nome)}</b><span class="chip ouro">${I.transp.s ? 'em ' + I.tom : 'em Dó'} · clave de ${I.grave ? 'Fá' : 'Sol'}</span><p>${TAGS[I.id]}</p>
          <span class="inst-cta">${ctx.inst.id === I.id && ctx.E.escolhido ? 'Continuar →' : 'Começar →'}</span></div>
        </button>`).join('')}</section>
      <p class="peq sutil" style="text-align:center">Dá para trocar de instrumento a qualquer momento pelo botão no topo. O progresso de cada aula fica guardado.</p></div>`;
    $$('[data-escolher]', el).forEach((b) => (b.onclick = () => ctx.escolher(b.dataset.escolher)));
  };

  // ======================= CENTRAL DE FERRAMENTAS =======================
  const ICONES = {
    afinador: '<path d="M12 3v18M7 8l5-5 5 5M5 14h14" />', metronomo: '<path d="M8 21h8l-2-17h-4zM12 14l5-9" />', dedilhado: '<circle cx="12" cy="5" r="2"/><circle cx="12" cy="11" r="2"/><circle cx="12" cy="17" r="2"/>',
    escalas: '<path d="M4 18l4-4 4 2 4-6 4-4" />', transpositor: '<path d="M4 8h14l-3-3M20 16H6l3 3" />', ouvido: '<path d="M8 15a5 5 0 1 1 8-4c0 3-3 3-3 6a3 3 0 0 1-5 2" />',
    rotina: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M10 2h4" />', avaliacao: '<path d="M5 20V10M12 20V4M19 20v-7" />', repertorio: '<path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2zM6 18a2 2 0 0 1 2-2h10" />',
    leitura: '<path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm11-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />',
  };
  const ico = (k) => `<svg viewBox="0 0 24 24" class="ico" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONES[k] || ''}</svg>`;
  window.Visual.ico = ico; window.Visual.ICONES = ICONES;
  Ferr.ferramentas = (el, { inst }) => {
    const I = inst;
    const lista = [
      ['afinador', 'Afinador', 'Mostra a nota escrita e a real. Analisa gravações: afinação e estabilidade de cada nota.'],
      ['metronomo', 'Metrônomo', 'Compassos, subdivisões e treino progressivo que sobe o andamento sozinho.'],
      ['dedilhado', I.sub === 'trombone' ? 'Posições da vara' : I.sub === 'trompete' ? 'Pistos' : 'Dedilhados', 'Cada nota na pauta, com o desenho de onde pôr os dedos e as alternativas.'],
      ['escalas', 'Escalas e arpejos', 'Qualquer escala, modo, arpejo ou padrão, já transposto e dentro da extensão.'],
      ['leitura', 'Ler partitura', 'Anatomia da partitura e treino de leitura de notas, com o dedilhado de cada uma.'],
      ['transpositor', 'Transpositor', 'Notas, cifras e tonalidades entre instrumentos em Dó, Si♭, Mi♭ e Fá.'],
      ['ouvido', 'Treino auditivo', 'Intervalos, acordes, escalas, ditados e afinação: alto ou baixo?'],
      ['rotina', 'Rotina de estudo', 'Sessões guiadas de 20 a 120 minutos, com cronômetro e histórico.'],
      ['avaliacao', 'Avaliação', 'Notas de 0 a 10 em 14 critérios, semanais a semestrais, com gráfico.'],
      ['repertorio', 'Repertório', 'Métodos, estudos e peças por nível, do iniciante ao profissional.'],
    ];
    el.innerHTML = `<div class="vista"><div class="ferr-cab"><span class="rotulo">${esc(I.nome)}</span><h1>Ferramentas de estudo</h1><p>Tudo o que um músico usa todos os dias, ajustado ao seu instrumento.</p></div>
      <div class="hub">${lista.map(([id, t, d]) => `<a class="hub-card" href="#${id}">${ico(id)}<div><b>${t}</b><p>${d}</p></div></a>`).join('')}</div></div>`;
  };

  // ======================= GOSPEL =======================
  const VOZ_SUG = { flauta: 's', soprano: 's', clarinete: 's', trompete: 's', alto: 'a', trombone: 't' };
  Ferr.gospel = (el, { inst, E }) => {
    const I = inst;
    const aulas = C.modulos.find((m) => m.n === 13).aulas;
    let voz = VOZ_SUG[I.id] || 's';
    el.innerHTML = `<div class="vista">
      <section class="gospel-cab"><span class="rotulo">Música na igreja</span><h1>Gospel, hinos e <em>orquestra</em></h1>
        <p>Tocar na igreja é servir: melodia fiel para a congregação cantar, introduções que chamam o louvor, contracantos que abraçam a voz, solos com começo, ápice e resolução — e, quando é a hora, silêncio. Aqui estão as aulas e os exercícios para a Assembleia de Deus, a Congregação Cristã no Brasil e a música gospel em geral.</p></section>
      <section class="hub">${aulas.map((a) => { const au = C.aulas[a]; const ok = E.aulas[a] && E.aulas[a].ok; return `<a class="hub-card" href="#aula-${a}"><span class="aula-num">${a.replace('-', '.')}</span><div><b>${esc(au.titulo)}</b><p>${ok ? '✓ aprovada' : esc(au.tempo || '')}</p></div></a>`; }).join('')}</section>
      <section class="cartao pilha"><div class="linha" style="justify-content:space-between"><h2>Coral a quatro vozes</h2><div class="seg" id="g-voz">${['s', 'a', 't', 'b'].map((v) => `<button type="button" data-v="${v}" aria-pressed="${v === voz}">${window.Melodias.NOME_VOZ[v]}</button>`).join('')}</div></div>
        <p class="peq sutil">Formato SATB dos hinários: soprano e contralto na clave de Sol, tenor e baixo na clave de Fá. A parte já vem transposta para o ${esc(I.nomeMin)} e na oitava que cabe no instrumento. Sugestão de voz para você: <b>${window.Melodias.NOME_VOZ[VOZ_SUG[I.id] || 's']}</b> (siga sempre o seu regente ou encarregado).</p>
        <div id="g-coral"></div></section>
      <section class="grade">
        <div class="cartao pilha"><h3>Assembleia de Deus</h3><p>A <b>Harpa Cristã</b> é o hinário oficial das Assembleias de Deus no Brasil: 1ª edição no Recife (1922), 640 hinos na edição ampliada (1999). Hinos com estrofes e coro; bandas, orquestras e conjuntos. Prepare introdução, final e 2ª voz para os hinos mais cantados.</p><a class="btn sec peq" href="#aula-13-5">Abrir a aula</a></div>
        <div class="cartao pilha"><h3>Congregação Cristã no Brasil</h3><p>Hinário <b>Hinos de Louvores e Súplicas a Deus nº 5</b> (480 hinos, em uso desde 2013), em quatro vozes, com edições em Dó, Fá, Mi♭ e Si♭. Orquestra conduzida pelo encarregado; ensino gratuito nos GEM.</p><a class="btn sec peq" href="#aula-13-6">Abrir a aula</a></div>
        <div class="cartao pilha"><h3>Louvor contemporâneo</h3><p>Com teclado, guitarra, baixo e bateria: introduções, respostas nos espaços da voz, contracantos em notas longas e solos com arco dramático — emoção sem exagero.</p><a class="btn sec peq" href="#aula-13-2">Contracantos e respostas</a></div>
      </section></div>`;
    const coral = () => { $('#g-coral').innerHTML = window.H.pauta({ tipo: 'mel', id: 'coral4', voz, bpm: 66 }); window.renderPautas($('#g-coral')); $$('#g-voz [data-v]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === voz)); };
    $('#g-voz').onclick = (e) => { const b = e.target.closest('[data-v]'); if (b) { voz = b.dataset.v; coral(); } };
    coral();
  };

  // ======================= LER PARTITURA =======================
  const ANATOMIA = {
    abc: 'X:1\nT:Coral da Manhã\nC:Exercício original\nM:4/4\nL:1/4\nQ:"Moderato" 1/4=88\nK:G\n!mf! G A (B G) | A2 G2 |: B .c .d B | c2 B2 :| !p! A G F A | !fermata!G4 |]\n',
    abcGrave: 'X:1\nT:Coral da Manhã\nC:Exercício original\nM:4/4\nL:1/4\nQ:"Moderato" 1/4=88\nK:G clef=bass\n!mf! G, A, (B, G,) | A,2 G,2 |: B, .C .D B, | C2 B,2 :| !p! A, G, F, A, | !fermata!G,4 |]\n',
  };
  const LEGENDA = (I) => [
    ['Título e autor', 'No alto da página. Ajudam a achar gravações e o estilo.'],
    ['Andamento', '“Moderato, ♩ = 88”: a velocidade. Ajuste o metrônomo antes de começar.'],
    [`Clave de ${I.grave ? 'Fá' : 'Sol'}`, I.grave ? 'O símbolo no começo da pauta. A 4ª linha (entre os dois pontos) é Fá.' : 'O símbolo no começo da pauta. A 2ª linha (onde a clave “enrola”) é Sol.'],
    ['Armadura de clave', 'Um sustenido na linha do Fá: todo Fá da música é Fá♯ (tonalidade de Sol maior).'],
    ['Fórmula de compasso', '4/4: quatro tempos por compasso, a semínima vale um tempo.'],
    ['Dinâmicas', 'mf (meio forte) no começo, p (piano) no fim.'],
    ['Barras de compasso', 'Dividem a música em compassos de 4 tempos.'],
    ['Ligadura de expressão', 'A curva sobre duas notas diferentes: toque ligado, só a primeira com a língua.'],
    ['Ritornelo', 'As barras com dois pontos: repita o trecho entre elas.'],
    ['Staccato', 'Os pontos sobre as notas: notas curtas e leves.'],
    ['Fermata', 'O “olho” sobre a última nota: sustente além do valor.'],
    ['Barra final', 'Fina + grossa: fim da música.'],
  ];
  const NIVEIS_LEIT = {
    1: { nome: 'Notas na pauta', d: 'linhas e espaços, sem acidentes' }, 2: { nome: 'Linhas suplementares', d: 'até 2 linhas acima e abaixo' },
    3: { nome: 'Com acidentes', d: 'sustenidos e bemóis' }, 4: { nome: 'Toda a extensão', d: 'as notas do seu instrumento' },
  };
  Ferr.leitura = (el, { inst, E, salvar }) => {
    const I = inst;
    E.leitura = E.leitura || {};
    const reg = (E.leitura[I.clave] = E.leitura[I.clave] || { a: 0, t: 0, rec: 0 });
    const st = { nivel: 1, nota: null, acc: 0, seq: 0, resp: false, relogio: 0, timer: null, pts: 0 };
    el.innerHTML = `<div class="vista">
      <div class="ferr-cab"><span class="rotulo">Leitura musical · clave de ${I.grave ? 'Fá' : 'Sol'}</span><h1>Ler partitura</h1>
        <p>Ler música é como ler um texto: primeiro as letras (notas), depois as palavras (ritmos e frases), depois o sentido (expressão). Comece pela anatomia da partitura e treine a leitura de notas todos os dias — 5 minutos bastam.</p></div>
      <section class="cartao pilha"><h2>Anatomia de uma partitura</h2>
        ${window.H.pauta({ tipo: 'abc', abc: ANATOMIA.abc, abcGrave: ANATOMIA.abcGrave, titulo: 'Leia da esquerda para a direita, de cima para baixo' })}
        <ol class="legenda">${LEGENDA(I).map(([t, d]) => `<li><b>${t}.</b> ${d}</li>`).join('')}</ol>
        <p class="peq">Aprofunde nas aulas: ${[['3-2', 'pentagrama, claves e notas'], ['3-5', 'sua primeira partitura completa'], ['4-1', 'figuras e pausas'], ['4-2', 'compasso e metrônomo'], ['5-3', 'armaduras'], ['7-1', 'dinâmica e expressão'], ['7-3', 'leitura à primeira vista']].map(([a, t]) => `<a href="#aula-${a}">${a.replace('-', '.')} ${t}</a>`).join(' · ')}</p></section>
      <section class="cartao pilha" id="treino-leitura">
        <div class="linha" style="justify-content:space-between"><h2>Treino de leitura de notas</h2><span class="chip" id="lt-placar"></span></div>
        <div class="seg" id="lt-niv">${Object.entries(NIVEIS_LEIT).map(([k, v]) => `<button type="button" data-n="${k}" aria-pressed="${+k === 1}" title="${v.d}">${v.nome}</button>`).join('')}</div>
        <div class="leitura-palco"><div class="leitura-pauta" id="lt-pauta"></div>
          <div class="pilha" style="gap:10px">
            <div class="seg peq" id="lt-acc" hidden><button type="button" data-a="-1" aria-pressed="false">♭ bemol</button><button type="button" data-a="0" aria-pressed="true">♮ natural</button><button type="button" data-a="1" aria-pressed="false">♯ sustenido</button></div>
            <div class="teclas-nota" id="lt-teclas">${['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((l) => `<button type="button" data-l="${l}"><b>${M.SOLF[l]}</b><small>${l}</small></button>`).join('')}</div>
            <div class="linha"><button class="btn sec peq" type="button" id="lt-pular">Outra nota</button><button class="btn sec peq" type="button" id="lt-relogio">⏱ Desafio de 60 segundos</button></div>
          </div></div>
        <div id="lt-resp"></div>
      </section></div>`;
    window.renderPautas(el);
    const [lo, hi] = I.faixa.map((x) => M.midi(M.parse(x)));
    function sorteia() {
      const base = I.grave ? ['G2', 'A3'] : ['E4', 'F5'];
      let ini = M.parse(base[0]), fim = M.parse(base[1]);
      const cand = [];
      const d0 = ini.o * 7 + M.LETRAS.indexOf(ini.l), d1 = fim.o * 7 + M.LETRAS.indexOf(fim.l);
      const ext = st.nivel >= 2 ? 5 : 0;
      for (let d = d0 - ext; d <= d1 + ext; d++) {
        const n = { l: M.LETRAS[((d % 7) + 7) % 7], a: 0, o: Math.floor(d / 7) };
        if (st.nivel === 4) { const m = M.midi(n); if (m < lo || m > hi) continue; }
        cand.push(n);
      }
      if (st.nivel === 4) { // toda a extensão do instrumento
        for (let m = lo; m <= hi; m++) { const n = M.deMidi(m, Math.random() < 0.5); if (!cand.some((c) => c.l === n.l && c.o === n.o && c.a === n.a)) cand.push(n); }
      }
      let n;
      do { n = Object.assign({}, cand[Math.floor(Math.random() * cand.length)]); } while (st.nota && n.l === st.nota.l && n.o === st.nota.o && n.a === st.nota.a);
      if (st.nivel === 3 && Math.random() < 0.5) n.a = Math.random() < 0.5 ? -1 : 1;
      return n;
    }
    function nova() {
      st.nota = sorteia(); st.resp = false; st.acc = 0;
      $('#lt-acc').hidden = st.nivel < 3;
      $$('#lt-acc [data-a]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.a === '0'));
      $('#lt-resp').innerHTML = '';
      const abc = M.abc({ notas: [{ n: st.nota, d: 16, forca: st.nota.a !== 0 }], clave: I.clave, compasso: '4/4' }).replace('M:4/4\n', 'M:none\n').replace(' |]', '');
      if (window.ABCJS) window.ABCJS.renderAbc($('#lt-pauta'), abc, { responsive: 'resize', foregroundColor: 'currentColor', staffwidth: 150, scale: 1.6, paddingtop: 10, paddingbottom: 10 });
      $('#lt-pauta').classList.add('abc');
    }
    function placar() { $('#lt-placar').textContent = st.timer ? `⏱ ${st.relogio}s · ${st.pts} acertos` : `${reg.a}/${reg.t} · sequência ${st.seq} · recorde ${reg.rec}`; }
    function responde(l) {
      if (st.resp || !st.nota) return;
      st.resp = true;
      const n = st.nota, ok = l === n.l && st.acc === n.a;
      reg.t++; if (ok) { reg.a++; st.seq++; st.pts++; reg.rec = Math.max(reg.rec, st.seq); } else st.seq = 0;
      salvar();
      const d = IN.dedilhado(I, n), c = M.escritaParaConcerto(n, I), m = M.midi(n);
      A.tocarSequencia([{ midi: m - I.transp.s, d: 8 }], 60);
      $('#lt-resp').innerHTML = `<div class="aviso ${ok ? 'ok' : 'vinho'}"><b>${ok ? 'Isso!' : 'Quase.'}</b> Esta nota é <b>${M.nomeBR(n)}${n.o}</b> (${M.nomeInt(n)}${n.o}) — ${posicao(n, I.clave)}.${I.transp.s ? ` No ${esc(I.nomeMin)} ela soa ${M.nomeBR(c)}.` : ''}</div>` +
        (d && m >= lo && m <= hi && !st.timer ? window.H.dedos(I, [M.nomeInt(n).replace('♯', '#').replace('♭', 'b') + n.o]) : '');
      window.renderPautas($('#lt-resp'));
      placar();
      if (st.timer) setTimeout(nova, ok ? 350 : 1100);
    }
    $('#lt-teclas').onclick = (e) => { const b = e.target.closest('[data-l]'); if (b) { if (st.resp && !st.timer) nova(); else responde(b.dataset.l); } };
    $('#lt-acc').onclick = (e) => { const b = e.target.closest('[data-a]'); if (!b) return; st.acc = +b.dataset.a; $$('#lt-acc [data-a]').forEach((x) => x.setAttribute('aria-pressed', x === b)); };
    $('#lt-niv').onclick = (e) => { const b = e.target.closest('[data-n]'); if (!b) return; st.nivel = +b.dataset.n; $$('#lt-niv [data-n]').forEach((x) => x.setAttribute('aria-pressed', x === b)); nova(); };
    $('#lt-pular').onclick = nova;
    $('#lt-relogio').onclick = () => {
      if (st.timer) return;
      st.relogio = 60; st.pts = 0; A.ac();
      st.timer = setInterval(() => { st.relogio--; placar(); if (st.relogio <= 0) { clearInterval(st.timer); st.timer = null; $('#lt-resp').innerHTML = `<div class="aviso ok"><b>Tempo!</b> ${st.pts} notas certas em 60 segundos. Meta do iniciante: 15; intermediário: 30; profissional: 45 ou mais.</div>`; placar(); } }, 1000);
      nova(); placar();
    };
    window.Ferr._limpar(() => { if (st.timer) clearInterval(st.timer); });
    nova(); placar();
  };

  // ======================= AULA 3.5 =======================
  C.aula({
    id: '3-5', titulo: 'Sua primeira partitura completa', tempo: '30 min + 5 min por dia',
    obj: 'Ler uma partitura inteira, reconhecendo todos os elementos, e tocá-la do começo ao fim sem parar.',
    apr: ['Os elementos de uma partitura, na ordem de leitura', 'O caminho da música (repetições)', 'Ler antes de tocar', 'Treino diário de leitura de notas'],
    teo: (I, H) => `<p>Uma partitura se lê como um livro: da esquerda para a direita, de cima para baixo. Antes de tocar, o músico “varre” a página em busca das informações que valem para a música inteira: título, andamento, clave, armadura e compasso. Depois, compasso por compasso, lê notas, ritmos e sinais de expressão.</p>
      ${H.pauta({ tipo: 'abc', abc: ANATOMIA.abc, abcGrave: ANATOMIA.abcGrave, titulo: 'Coral da Manhã (exercício original)' })}
      <ol class="legenda">${LEGENDA(I).map(([t, d]) => `<li><b>${t}.</b> ${d}</li>`).join('')}</ol>`,
    pra: (I) => `<ol><li>Leia a partitura em voz alta: “Sol maior, quatro por quatro, moderato…”.</li><li>Diga o nome das notas no ritmo, sem tocar.</li><li>Toque devagar (♩ = 60), respeitando ligadura, staccato e dinâmicas; repita o trecho do ritornelo.</li><li>Termine com a fermata.</li></ol><p>Depois, use o <a href="#leitura">treino de leitura de notas</a> 5 minutos por dia: ele mostra a nota na ${I.grave ? 'clave de Fá' : 'clave de Sol'} e, quando você responde, desenha ${I.sub === 'trombone' ? 'a posição da vara' : I.sub === 'trompete' ? 'os pistos' : 'onde pôr os dedos'}.</p>`,
    exs: [
      { nome: 'Varredura em voz alta', dur: '5 min', obj: 'Hábito de ler antes de tocar.', passos: ['Pegue 3 partituras diferentes.', 'Para cada uma, diga: tonalidade, compasso, andamento, repetições, dinâmica inicial.'], crit: 'Faz a varredura em menos de 30 segundos.' },
      { nome: 'Coral da Manhã completo', dur: '10 min', bpm: 60, obj: 'Tocar lendo.', passos: ['Siga os 4 passos acima.', 'Toque com o caminho completo (com a repetição).'], crit: 'Do começo ao fim, sem parar, com todos os sinais.' },
      { nome: 'Treino de leitura', dur: '5 min/dia', obj: 'Ler notas rápido.', passos: ['Aba Ler partitura → treino de leitura, nível 1 e depois 2.', 'Faça o desafio de 60 segundos e anote o resultado.'], crit: '15 notas certas em 60 segundos no nível 2.' },
    ],
    err: [['Começar a tocar sem olhar armadura e compasso.', 'A varredura de 30 segundos evita metade dos erros.'], ['Esquecer a repetição.', 'Siga o caminho com o dedo antes de tocar.'], ['Escrever o nome de todas as notas na partitura.', 'Treine a leitura de verdade; anote só o que for realmente difícil, a lápis.']],
    tempo: '30 minutos e 5 minutos diários de treino de leitura.',
    crit: ['Explico cada elemento da partitura de exemplo.', 'Toco o Coral da Manhã do começo ao fim com a repetição.', 'Faço 15 acertos em 60 segundos no treino de leitura (nível 2).'],
    quiz: [
      { p: 'O que se olha primeiro numa partitura nova?', o: ['a última nota', 'andamento, clave, armadura e compasso', 'o nome do editor', 'nada, começa a tocar'], c: 1 },
      { p: 'Um sustenido na armadura vale…', o: ['só no primeiro compasso', 'para toda a música', 'só uma vez', 'para a nota seguinte'], c: 1 },
      { p: 'O ritornelo (barras com dois pontos) indica…', o: ['fim da música', 'repetir o trecho', 'tocar mais forte', 'trocar de clave'], c: 1 },
      { p: 'Os pontos sobre as notas indicam…', o: ['aumentar a duração', 'staccato (notas curtas)', 'fermata', 'repetição'], c: 1 },
    ],
    tarefa: 'Faça o desafio de 60 segundos todos os dias e anote o número de acertos.',
  });
})();
