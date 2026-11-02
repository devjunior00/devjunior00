/* Conservatório de Sopros — aplicação: estado, navegação, curso, aulas e professor */
(function () {
  'use strict';
  const M = window.Musica, A = window.Audio2, IN = window.Inst, C = window.Curso;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------------- estado ----------------
  const CHAVE = 'conservatorio-sopros-v1';
  const novo = () => ({ inst: 'alto', aulas: {}, criterios: {}, quiz: {}, sessoes: [], avaliacoes: [], ouvido: {}, ultimaAula: null, atualizado: 0 });
  let E = novo();
  try { const s = localStorage.getItem(CHAVE); if (s) E = Object.assign(novo(), JSON.parse(s)); } catch (e) { /* armazenamento indisponível */ }
  let nuvem = null, gravando = false, pendente = false, timerNuvem = null;

  function salvar() {
    E.atualizado = Date.now();
    E.sessoes = E.sessoes.slice(-400);
    E.avaliacoes = E.avaliacoes.slice(-120);
    try { localStorage.setItem(CHAVE, JSON.stringify(E)); } catch (e) { /* ignora */ }
    if (nuvem) { clearTimeout(timerNuvem); timerNuvem = setTimeout(gravaNuvem, 1500); }
  }
  async function gravaNuvem() {
    if (!nuvem) return;
    if (gravando) { pendente = true; return; }
    gravando = true;
    try { await nuvem.set(JSON.parse(JSON.stringify(E))); } catch (e) { /* tenta na próxima alteração */ }
    gravando = false;
    if (pendente) { pendente = false; gravaNuvem(); }
  }
  async function iniciaNuvem() {
    try {
      if (!window.claude || !window.claude.use) return;
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return;
      const id = await user.id();
      if (!id) return;
      const ref = db.doc('data/users/' + id + '/conservatorio');
      const snap = await ref.get();
      nuvem = ref;
      if (snap.exists) {
        const r = snap.data();
        if ((r.atualizado || 0) > (E.atualizado || 0)) {
          E = Object.assign(novo(), JSON.parse(JSON.stringify(r)));
          try { localStorage.setItem(CHAVE, JSON.stringify(E)); } catch (e) { /* ignora */ }
          desenhaTopo(); rota();
        } else if ((E.atualizado || 0) > (r.atualizado || 0)) gravaNuvem();
      } else if (E.atualizado) gravaNuvem();
      const sel = $('#status-nuvem'); if (sel) sel.textContent = 'Progresso salvo na sua conta';
    } catch (e) { /* segue só com armazenamento local */ }
  }

  const inst = () => IN.INSTRUMENTOS[E.inst] || IN.INSTRUMENTOS.alto;

  // ---------------- helpers para o conteúdo ----------------
  const H = {
    por(I, m) {
      if (I.id in m) return m[I.id];
      if (I.sub in m) return m[I.sub];
      if (I.familia in m) return m[I.familia];
      return m.todos != null ? m.todos : '';
    },
    pauta(cfg) { return `<div class="pauta" data-cfg="${esc(JSON.stringify(cfg))}"></div>`; },
    tabela(cab, linhas) {
      return `<div class="tabela-wrap"><table><thead><tr>${cab.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${linhas.map((l) => `<tr>${l.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    },
    met(bpm, rot) { return `<button class="btn peq sec" data-met="${bpm}" type="button">♩ = <span class="num">${bpm}</span>${rot ? ' · ' + rot : ''}</button>`; },
    // nome da nota escrita + som real
    nota(I, s) {
      const n = M.parse(s), c = M.escritaParaConcerto(n, I);
      return I.transp.s ? `${M.nomeBR(n)} escrito (soa ${M.nomeBR(c)})` : M.nomeBR(n);
    },
    dedos(I, lista) {
      return `<div class="dedos-grade">${lista.map((s) => {
        const n = M.parse(s), d = IN.dedilhado(I, n);
        if (!d) return '';
        return `<figure class="cartao" style="padding:10px;margin:0;display:flex;flex-direction:column;gap:6px;align-items:center"><b>${M.nomeBR(n)}${n.o}</b>${d.svg}<figcaption class="peq sutil" style="text-align:center">${esc(d.texto)}</figcaption></figure>`;
      }).join('')}</div>`;
    },
    link(rota, txt) { return `<a href="#${rota}">${txt}</a>`; },
    escrita(I) { return I.transp.s ? 'escrita' : 'real'; },
  };
  window.H = H;

  // ---------------- topo ----------------
  const ABAS = [
    ['curso', 'Curso'], ['afinador', 'Afinador'], ['metronomo', 'Metrônomo'], ['dedilhado', I_ABA()], ['escalas', 'Escalas e arpejos'],
    ['transpositor', 'Transpositor'], ['ouvido', 'Treino auditivo'], ['rotina', 'Rotina de estudo'], ['avaliacao', 'Avaliação'],
    ['repertorio', 'Repertório'], ['professor', 'Professor'],
  ];
  function I_ABA() { return 'Dedilhados'; }

  function desenhaTopo() {
    const I = inst();
    $('#instrs').innerHTML = Object.values(IN.INSTRUMENTOS).map((x) =>
      `<button class="instr" type="button" data-inst="${x.id}" aria-pressed="${x.id === I.id}">${x.curto} <small>${x.tomInt === 'C' ? 'Dó' : x.tom}</small></button>`).join('');
    $('#marca-inst').textContent = I.nomeMin + (I.sub === 'sax' ? ' em ' + I.tom : '');
    const aba = (location.hash.slice(1) || 'curso').split('-')[0];
    $('#abas').innerHTML = ABAS.map(([id, nome]) => {
      const n = id === 'dedilhado' ? (I.sub === 'trombone' ? 'Posições' : I.sub === 'trompete' ? 'Pistos' : 'Dedilhados') : nome;
      return `<a class="aba" href="#${id}" ${(aba === id || (aba === 'aula' && id === 'curso')) ? 'aria-current="page"' : ''}>${n}</a>`;
    }).join('');
    A.setTimbre(I.timbre);
  }
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-inst]');
    if (b) { E.inst = b.dataset.inst; salvar(); desenhaTopo(); rota(); return; }
    const m = ev.target.closest('[data-met]');
    if (m) { metronomoRapido(+m.dataset.met, m); }
  });

  // metrônomo rápido dentro das aulas
  let metBtn = null;
  function metronomoRapido(bpm, btn) {
    if (A.Met.ligado && metBtn === btn) { A.Met.parar(); btn.classList.remove('ouro'); metBtn = null; return; }
    A.Met.parar(); if (metBtn) metBtn.classList.remove('ouro');
    A.Met.bpm = bpm; A.Met.tempos = 4; A.Met.sub = 1; A.Met.treino = null; A.Met.aoTempo = null;
    A.Met.iniciar(); btn.classList.add('ouro'); metBtn = btn;
  }

  // ---------------- partituras ----------------
  function geraPauta(cfg, I) {
    const faixa = I.faixa.map((x) => M.midi(M.parse(x)));
    let notas = [], tonicaMaior = { l: 'C', a: 0, o: 4 }, titulo = cfg.titulo || '', info = '', anacruse = 0;
    const dur = cfg.dur || 4;
    if (cfg.tipo === 'escala' || cfg.tipo === 'arpejo') {
      let t = M.parse(cfg.tonica || (I.primeiraEscala + '4'));
      if (cfg.concerto) t = M.concertoParaEscrita(t, I);
      if (cfg.tipo === 'escala') {
        const def = M.ESCALAS[cfg.escala || 'maior'];
        t = M.simplificaTonica(t, def.ref);
        let oit = cfg.oitavas || 1;
        let s = M.sequenciaEscala(t, cfg.escala || 'maior', oit, faixa);
        if (!s.ok && oit > 1) { oit = 1; s = M.sequenciaEscala(t, cfg.escala || 'maior', 1, faixa); }
        let seq = s.notas;
        if (cfg.padrao && cfg.padrao !== 'reta') seq = M.aplicaPadrao(s.sobe, cfg.padrao) || seq;
        notas = seq.map((n) => ({ n, d: dur }));
        tonicaMaior = M.tonicaMaiorDe(t, def.ref);
        if (['pentaMenor', 'blues'].includes(cfg.escala)) tonicaMaior = M.grau(t, 3, 2);
        if (['dimTS', 'dimST', 'tonsInteiros', 'cromatica', 'bebopDom', 'bluesMaior', 'pentaMaior'].includes(cfg.escala)) tonicaMaior = t;
        if (['dorico', 'frigio', 'locrio'].includes(cfg.escala)) tonicaMaior = M.grau(t, { dorico: -2, frigio: -4, locrio: 1 }[cfg.escala], { dorico: -1, frigio: -2, locrio: 1 }[cfg.escala]);
        if (cfg.escala === 'lidio') tonicaMaior = M.grau(t, -5, -3);
        if (cfg.escala === 'mixolidio') tonicaMaior = M.grau(t, 5, 3);
        if (cfg.escala === 'menorHarm' || cfg.escala === 'menorMel' || cfg.escala === 'menorMelJazz') tonicaMaior = M.grau(t, 3, 2);
        titulo = titulo || (M.nomeBR(t) + ' — ' + def.nome.toLowerCase() + (cfg.padrao && cfg.padrao !== 'reta' ? ' · ' + M.PADROES[cfg.padrao].nome.toLowerCase() : ''));
        info = tomInfo(t, I);
        if (!s.ok) info += ' · parte desta escala está fora da extensão; toque a oitava que couber';
      } else {
        const base = Object.assign({}, t);
        while (M.midi(base) < faixa[0]) base.o++;
        const ar = M.arpejo(base, cfg.acorde || 'M', cfg.inversao || 0);
        const sobe = ar.concat([Object.assign({}, ar[0], { o: ar[0].o + 1 })]);
        const seq = sobe.concat(sobe.slice(0, -1).reverse());
        notas = seq.map((n) => ({ n, d: dur }));
        tonicaMaior = cfg.acorde === 'M' || cfg.acorde === 'M7' || cfg.acorde === 'd7' || cfg.acorde === 'aum' ? t : M.grau(t, 3, 2);
        titulo = titulo || ('Arpejo de ' + M.nomeBR(t) + M.ARPEJOS[cfg.acorde || 'M'].cifra + ' — ' + M.ARPEJOS[cfg.acorde || 'M'].nome.toLowerCase());
        info = tomInfo(t, I);
      }
    } else if (cfg.tipo === 'mel') {
      const r = window.Melodias.paraInstrumento(cfg.id, I);
      notas = r.notas; tonicaMaior = r.tonicaMaior; anacruse = r.anacruse;
      titulo = r.mel.titulo; info = r.mel.fonte + ' · ' + tomInfo(r.tonica, I, r.mel.ref);
      cfg = Object.assign({ compasso: r.mel.compasso, bpm: r.mel.swing ? 100 : 80, swing: r.mel.swing }, cfg);
    } else if (cfg.tipo === 'notas') {
      notas = M.melodia(cfg.notas);
      tonicaMaior = M.parse((cfg.tom || 'C') + '4');
    } else if (cfg.tipo === 'ritmo') {
      const p = I.clave === 'bass' ? M.parse('D3') : M.parse('B4');
      notas = cfg.ritmo.split(/\s+/).filter(Boolean).map((x) => ({ n: x.startsWith('-') ? null : p, d: Math.abs(parseFloat(x)) }));
    }
    const abc = M.abc({ notas, tonicaMaior, compasso: cfg.compasso || '4/4', clave: I.clave, anacruse, porLinha: cfg.porLinha || 4 });
    return { abc, notas, titulo, info, bpm: cfg.bpm || 72 };
  }
  function tomInfo(t, I, ref) {
    const c = M.escritaParaConcerto(t, I);
    if (!I.transp.s) return 'tom: ' + M.nomeBR(t) + (ref === 'menor' ? ' menor' : '');
    return 'escrito em ' + M.nomeBR(t) + ' · soa ' + M.nomeBR(c) + ' (concerto)';
  }

  function renderPautas(raiz) {
    const I = inst();
    $$('.pauta', raiz).forEach((el) => {
      let cfg; try { cfg = JSON.parse(el.dataset.cfg); } catch (e) { return; }
      const p = geraPauta(cfg, I);
      el.innerHTML = `<div class="pauta-cab"><div class="pilha" style="gap:0"><b>${esc(p.titulo)}</b>${p.info ? `<span class="peq sutil">${esc(p.info)}</span>` : ''}</div>
        <div class="pauta-ctl"><button class="btn peq" type="button" data-tocar>▶ Ouvir</button><button class="btn peq sec" type="button" data-parar>■</button>
        <label class="peq sutil">♩ = <input type="number" min="30" max="240" value="${p.bpm}" data-bpm aria-label="Andamento"></label></div></div><div class="abc"></div>`;
      const alvo = $('.abc', el);
      if (window.ABCJS) {
        try { window.ABCJS.renderAbc(alvo, p.abc, { responsive: 'resize', staffwidth: 680, paddingleft: 0, paddingright: 0, foregroundColor: 'currentColor', add_classes: true }); } catch (e) { alvo.textContent = 'Não foi possível desenhar a partitura.'; }
      } else alvo.innerHTML = `<pre class="peq">${esc(p.abc)}</pre><p class="peq sutil">A biblioteca de partituras não carregou (sem internet?). O texto acima está em notação ABC.</p>`;
      $('[data-tocar]', el).onclick = () => {
        const bpm = +$('[data-bpm]', el).value || 72;
        const ev = [];
        p.notas.forEach((x, i) => {
          let d = x.d;
          if (cfg.swing && d === 2) d = i % 2 === 0 ? 2.67 : 1.33;
          ev.push({ midi: x.n ? M.midi(x.n) - I.transp.s : null, d });
        });
        A.tocarSequencia(ev, bpm);
      };
      $('[data-parar]', el).onclick = () => A.parar();
    });
  }
  window.renderPautas = renderPautas;
  window.geraPauta = geraPauta;

  // ---------------- curso: início ----------------
  const NIVEIS = { iniciante: 'Iniciante', basico: 'Básico', intermediario: 'Intermediário', intAvancado: 'Intermediário avançado', avancado: 'Avançado', profissional: 'Profissional' };

  function minutosSemana() {
    const lim = Date.now() - 7 * 864e5;
    return E.sessoes.filter((s) => s.data >= lim).reduce((a, s) => a + (s.min || 0), 0);
  }
  function diasSeguidos() {
    const dias = new Set(E.sessoes.map((s) => new Date(s.data).toDateString()));
    let n = 0; const d = new Date();
    if (!dias.has(d.toDateString())) d.setDate(d.getDate() - 1);
    while (dias.has(d.toDateString())) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function proximaAula() {
    for (const m of C.modulos) for (const id of m.aulas) if (!(E.aulas[id] && E.aulas[id].ok)) return C.aulas[id];
    return null;
  }

  function vistaCurso(el) {
    const I = inst();
    const total = Object.keys(C.aulas).length, feitas = Object.values(E.aulas).filter((x) => x.ok).length;
    const prox = proximaAula();
    const ult = E.avaliacoes.filter((a) => a.inst === I.id).slice(-1)[0];
    const media = ult ? (Object.values(ult.notas).reduce((a, b) => a + b, 0) / Object.values(ult.notas).length).toFixed(1) : '—';
    const dc = M.parse(I.transp.s ? 'C4' : 'Bb2');
    const sc = M.escritaParaConcerto(dc, I);
    el.innerHTML = `<div class="vista">
      <section class="abertura">
        <div class="pilha" style="gap:16px;justify-content:center">
          <span class="rotulo">${esc(I.nome)} · curso completo em 16 módulos</span>
          <h1>Do primeiro som <em>ao palco</em>.</h1>
          <p style="max-width:58ch">Teoria desde a origem, técnica com critérios de aprovação, harmonia, ouvido, improvisação, estilos e prática de igreja. Cada aula traz explicação, prática no instrumento, exercícios com metrônomo, erros comuns, teste e tarefa. Você só avança quando domina o conteúdo.</p>
          <div class="linha">${prox ? `<a class="btn ouro" href="#aula-${prox.id}">${feitas ? 'Continuar' : 'Começar'}: ${esc(prox.titulo)}</a>` : '<span class="chip ok">Curso concluído</span>'}<a class="btn sec" href="#rotina">Rotina de hoje</a></div>
          <span class="peq sutil" id="status-nuvem">${nuvem ? 'Progresso salvo na sua conta' : 'Progresso salvo neste navegador'}</span>
        </div>
        <div class="cartao transp-card">
          <span class="rotulo">Transposição do seu instrumento</span>
          ${I.transp.s ? `<div class="transp-par"><div><div class="nota">${M.nomeBR(dc)}</div><span class="peq sutil">você lê</span></div><div class="seta">→</div><div><div class="nota">${M.nomeBR(sc)}</div><span class="peq sutil">o público ouve</span></div></div>
          <p class="peq">O ${esc(I.nomeMin)} é um instrumento transpositor em ${I.tom}: ${esc(I.transpTexto)}. ${esc(I.exemploTransp)}. Para tocar junto com piano, teclado ou violão, a parte precisa estar escrita para ${I.tom}.</p>`
            : `<div class="transp-par"><div><div class="nota">${M.nomeBR(dc)}</div><span class="peq sutil">você lê</span></div><div class="seta">=</div><div><div class="nota">${M.nomeBR(sc)}</div><span class="peq sutil">o público ouve</span></div></div>
          <p class="peq">O trombone de vara é afinado em Si♭ (a série harmônica da 1ª posição é de Si♭), mas na clave de Fá lê em sons reais: não transpõe. Em algumas bandas e igrejas a parte vem em Si♭ na clave de Sol, soando uma 9ª maior abaixo — o módulo 3 ensina a ler as duas.</p>`}
          ${H.pauta({ tipo: 'notas', notas: I.transp.s ? 'C4:4 D4:4 E4:4 F4:4 G4:16' : 'Bb2:4 C3:4 D3:4 Eb3:4 F3:16', tom: I.transp.s ? 'C' : 'Bb', titulo: 'Primeiras cinco notas' + (I.transp.s ? ' (escritas)' : ''), bpm: 72 })}
        </div>
      </section>
      <section class="stats cartao">
        <div class="stat"><span class="rotulo">Aulas aprovadas</span><b>${feitas}<span class="sutil">/${total}</span></b></div>
        <div class="stat"><span class="rotulo">Estudo · 7 dias</span><b>${minutosSemana()}<span class="sutil"> min</span></b></div>
        <div class="stat"><span class="rotulo">Dias seguidos</span><b>${diasSeguidos()}</b></div>
        <div class="stat"><span class="rotulo">Última avaliação</span><b>${media}</b></div>
      </section>
      <section class="cartao">
        <div class="linha" style="justify-content:space-between"><h2>Os 16 módulos</h2><span class="peq sutil">Sem prazos artificiais: cada aula tem critérios de aprovação.</span></div>
        <div>${C.modulos.map((m, i) => {
          const fe = m.aulas.filter((a) => E.aulas[a] && E.aulas[a].ok).length;
          const antOk = i === 0 || C.modulos[i - 1].aulas.every((a) => E.aulas[a] && E.aulas[a].ok);
          return `<div class="modulo"><div class="mnum">${m.n}</div><div class="pilha" style="gap:4px">
            <div class="linha" style="gap:8px"><span class="nivel">${NIVEIS[m.nivel]}</span>${!antOk ? '<span class="chip">recomendado concluir o anterior</span>' : ''}${fe === m.aulas.length ? '<span class="chip ok">concluído</span>' : ''}</div>
            <h3>${esc(m.titulo)}</h3><p class="peq sutil">${esc(m.desc)}</p>
            <div class="barra" style="max-width:320px"><i style="width:${(fe / m.aulas.length) * 100}%"></i></div>
            <div class="aulas">${m.aulas.map((a) => { const au = C.aulas[a]; const ok = E.aulas[a] && E.aulas[a].ok; return `<a class="aula-link ${ok ? 'feita' : ''}" href="#aula-${a}"><span class="marca-ok">${ok ? '✓' : ''}</span>${esc(au.id.replace('-', '.'))} · ${esc(au.titulo)}<small>${esc(au.tempo || '')}</small></a>`; }).join('')}</div>
          </div></div>`;
        }).join('')}</div>
      </section></div>`;
    renderPautas(el);
  }

  // ---------------- aula ----------------
  const SECOES = [
    ['obj', 'Objetivo principal'], ['apr', 'O que você vai aprender'], ['teo', 'Explicação teórica'], ['pra', 'Aplicação prática no instrumento'],
    ['ex', 'Exemplos musicais'], ['exs', 'Exercícios passo a passo'], ['met', 'Exercícios com metrônomo'], ['err', 'Erros comuns e como corrigir'],
    ['tempo', 'Tempo recomendado de estudo'], ['crit', 'Critério de aprovação'], ['quiz', 'Teste de aprendizagem'], ['tarefa', 'Tarefa para a próxima aula'],
  ];
  const v = (x, I) => (typeof x === 'function' ? x(I, H) : x);

  function vistaAula(el, id) {
    const I = inst();
    const a = C.aulas[id];
    if (!a) { el.innerHTML = '<div class="vista"><p>Aula não encontrada. <a href="#curso">Voltar ao curso</a></p></div>'; return; }
    E.ultimaAula = id; salvar();
    const mod = C.modulos.find((m) => m.n === a.mod);
    const ids = C.modulos.flatMap((m) => m.aulas), pos = ids.indexOf(id);
    const ant = ids[pos - 1], prox = ids[pos + 1];
    const crit = v(a.crit, I) || [];
    const marcados = E.criterios[id] || [];
    const quiz = v(a.quiz, I) || [];
    const resp = E.quiz[id] || {};
    const status = E.aulas[id];
    const blocos = {
      obj: `<p>${v(a.obj, I)}</p>`,
      apr: `<ul>${(v(a.apr, I) || []).map((x) => `<li>${x}</li>`).join('')}</ul>`,
      teo: v(a.teo, I),
      pra: v(a.pra, I),
      ex: v(a.ex, I),
      exs: (v(a.exs, I) || []).map((x, i) => `<div class="exercicio"><h4><span class="n">${i + 1}</span>${x.nome}</h4>
        <div class="meta">${x.dur ? `<span class="chip">⏱ ${x.dur}</span>` : ''}${x.bpm ? `<span class="chip ouro">♩ = ${x.bpm}</span>` : ''}</div>
        ${x.obj ? `<p><b>Objetivo:</b> ${x.obj}</p>` : ''}${x.passos ? `<ol>${x.passos.map((p) => `<li>${p}</li>`).join('')}</ol>` : ''}${x.extra || ''}
        ${x.crit ? `<p class="peq"><b>Está pronto quando:</b> ${x.crit}</p>` : ''}</div>`).join(''),
      met: (() => {
        const lista = v(a.met, I) || [];
        if (!lista.length) return '';
        return `<p class="peq sutil">Toque o botão para ligar e desligar o metrônomo. Suba o andamento só depois de três execuções seguidas sem erro.</p>` + H.tabela(['Exercício', 'Início', 'Meta', 'Como subir'], lista.map((m) => [m[0], H.met(m[1]), H.met(m[2]), m[3] || '+4 BPM por dia, se limpo']));
      })(),
      err: (v(a.err, I) || []).map(([e, c]) => `<div class="erro-par"><div><span class="rotulo">Erro</span><p>${e}</p></div><div><span class="rotulo">Como corrigir</span><p>${c}</p></div></div>`).join(''),
      tempo: `<p>${v(a.tempo, I)}</p>`,
      crit: `<p class="peq sutil">Marque somente o que você realmente conseguiu fazer (grave-se para conferir).</p>` + crit.map((c, i) => `<label class="linha" style="align-items:flex-start;gap:10px;font-weight:500"><input type="checkbox" data-crit="${i}" ${marcados[i] ? 'checked' : ''}> <span>${c}</span></label>`).join(''),
      quiz: quiz.map((q, i) => `<div class="quiz-q" data-q="${i}"><b>${i + 1}. ${q.p}</b>${q.o.map((o, j) => {
          const r = resp[i];
          const cls = r == null ? '' : j === q.c ? 'certa' : j === r ? 'errada' : '';
          return `<button type="button" class="opc ${cls}" data-o="${j}" ${r != null ? 'disabled' : ''}>${String.fromCharCode(97 + j)}) ${o}</button>`;
        }).join('')}${resp[i] != null ? `<p class="explica">${resp[i] === q.c ? '✓ Correto. ' : '✗ Resposta certa: ' + String.fromCharCode(97 + q.c) + '. '}${q.e || ''}</p>` : ''}</div>`).join('') +
        `<div class="linha" style="margin-top:8px"><span class="chip" id="placar"></span><button class="btn peq sec" type="button" id="refazer">Refazer teste</button></div>`,
      tarefa: `<p>${v(a.tarefa, I)}</p>`,
    };
    const ativas = SECOES.filter(([k]) => blocos[k] && blocos[k].trim());
    el.innerHTML = `<div class="vista"><div class="aula">
      <nav class="indice" aria-label="Seções da aula"><span class="rotulo" style="padding:0 8px 6px">Nesta aula</span>${ativas.map(([k, t], i) => `<a href="#aula-${id}" data-ir="${k}">${i + 1}. ${t}</a>`).join('')}</nav>
      <article class="texto">
        <header class="cab-aula">
          <a href="#curso" class="peq">← Módulo ${mod.n} · ${esc(mod.titulo)}</a>
          <span class="rotulo">Aula ${id.replace('-', '.')} · ${NIVEIS[mod.nivel]} · ${esc(I.nome)}</span>
          <h1>${esc(a.titulo)}</h1>
          ${status && status.ok ? `<span class="chip ok">Aprovada em ${new Date(status.data).toLocaleDateString('pt-BR')}</span>` : ''}
        </header>
        ${ativas.map(([k, t], i) => `<section id="s-${k}"><h2><span class="n">${String(i + 1).padStart(2, '0')}</span>${t}</h2>${blocos[k]}</section>`).join('')}
        <section class="cartao" id="aprovar"></section>
        <nav class="navaula">${ant ? `<a class="btn sec" href="#aula-${ant}">← ${esc(C.aulas[ant].titulo)}</a>` : '<span></span>'}${prox ? `<a class="btn" href="#aula-${prox}">${esc(C.aulas[prox].titulo)} →</a>` : ''}</nav>
      </article></div></div>`;
    renderPautas(el);
    $$('[data-ir]', el).forEach((x) => x.addEventListener('click', (ev) => { ev.preventDefault(); const s = $('#s-' + x.dataset.ir); if (s) s.scrollIntoView({ behavior: 'smooth' }); }));

    function placar() {
      const certas = quiz.filter((q, i) => resp[i] === q.c).length, resp_ = Object.keys(resp).length;
      const pl = $('#placar'); if (pl) pl.textContent = `${certas}/${quiz.length} corretas${resp_ < quiz.length ? ' · ' + (quiz.length - resp_) + ' sem resposta' : ''}`;
      return quiz.length ? certas / quiz.length : 1;
    }
    function painelAprovacao() {
      const nota = placar();
      const todos = crit.every((c, i) => (E.criterios[id] || [])[i]);
      const pode = nota >= 0.8 && todos;
      const ok = E.aulas[id] && E.aulas[id].ok;
      $('#aprovar').innerHTML = `<div class="pilha"><span class="rotulo">Aprovação</span>
        <p>${ok ? 'Aula aprovada. Revise os exercícios na rotina de estudo para manter o nível.' : pode ? 'Você atingiu os critérios. Registre a aprovação para seguir.' : 'Para aprovar: acertar pelo menos 80% do teste e cumprir todos os critérios práticos.'}</p>
        <div class="linha"><span class="chip ${nota >= 0.8 ? 'ok' : ''}">Teste: ${Math.round(nota * 100)}%</span><span class="chip ${todos ? 'ok' : ''}">Critérios: ${(E.criterios[id] || []).filter(Boolean).length}/${crit.length}</span>
        ${ok ? '<button class="btn peq sec" type="button" id="desaprovar">Desfazer aprovação</button>' : `<button class="btn ouro" type="button" id="aprova" ${pode ? '' : 'disabled'}>Registrar aprovação</button>`}</div></div>`;
      const b = $('#aprova'); if (b) b.onclick = () => { E.aulas[id] = { ok: true, data: Date.now(), nota: Math.round(nota * 100), inst: I.id }; salvar(); vistaAula(el, id); };
      const d = $('#desaprovar'); if (d) d.onclick = () => { delete E.aulas[id]; salvar(); vistaAula(el, id); };
    }
    $$('[data-crit]', el).forEach((cb) => cb.addEventListener('change', () => {
      const arr = E.criterios[id] || []; arr[+cb.dataset.crit] = cb.checked; E.criterios[id] = arr; salvar(); painelAprovacao();
    }));
    $$('.quiz-q', el).forEach((q) => q.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-o]'); if (!b) return;
      const i = +q.dataset.q; resp[i] = +b.dataset.o; E.quiz[id] = resp; salvar();
      const y = window.scrollY; vistaAula(el, id); window.scrollTo(0, y);
    }));
    const rf = $('#refazer'); if (rf) rf.onclick = () => { delete E.quiz[id]; salvar(); const y = window.scrollY; vistaAula(el, id); window.scrollTo(0, y); };
    painelAprovacao();
  }

  // ---------------- professor (Claude) ----------------
  let conversa = [];
  async function vistaProfessor(el) {
    const I = inst();
    el.innerHTML = `<div class="vista"><div class="ferr-cab"><span class="rotulo">Professor</span><h1>Pergunte ao professor</h1>
      <p>Tire dúvidas de técnica, teoria, repertório ou peça uma correção. O professor sabe qual instrumento você escolheu (${esc(I.nome)}) e em que aula você está.</p></div>
      <div class="cartao chat" id="chat"><p class="sutil" id="chat-estado">Conectando…</p></div>
      <form id="form-prof" class="pilha"><textarea id="pergunta" placeholder="Ex.: Meu som fica soprado nas notas graves. O que eu faço?"></textarea>
      <div class="linha"><button class="btn ouro" type="submit">Perguntar</button><button class="btn sec" type="button" id="limpar-chat">Nova conversa</button></div></form></div>`;
    let sample = null;
    try { if (window.claude && window.claude.use) sample = await window.claude.use('sample'); } catch (e) { sample = null; }
    const chat = $('#chat');
    const desenha = () => {
      chat.innerHTML = conversa.length ? conversa.map((m) => `<div class="msg ${m.role === 'user' ? 'eu' : 'prof'}">${esc(m.content)}</div>`).join('')
        : `<p class="sutil">${sample ? 'Faça sua primeira pergunta. Respostas honestas e técnicas, sem elogio vazio.' : 'O professor por IA funciona quando este app é aberto no Claude. Fora dele, use as aulas e as ferramentas normalmente.'}</p>`;
    };
    desenha();
    $('#limpar-chat').onclick = () => { conversa = []; desenha(); };
    $('#form-prof').onsubmit = async (ev) => {
      ev.preventDefault();
      const txt = $('#pergunta').value.trim(); if (!txt || !sample) return;
      $('#pergunta').value = '';
      conversa.push({ role: 'user', content: txt });
      conversa.push({ role: 'assistant', content: 'Pensando…' });
      desenha();
      const aula = E.ultimaAula && C.aulas[E.ultimaAula];
      const sistema = `Você é um professor particular exigente, didático e paciente de ${I.nome} (instrumento ${I.transp.s ? 'transpositor em ' + I.tom + ', ' + I.transpTexto : 'em Dó, clave de Fá'}). Responda em português do Brasil. Nunca confunda dedilhados ou transposições com outros instrumentos. Avalie com honestidade, sem elogios sem fundamento. Quando sugerir exercícios, dê objetivo, duração, andamento (BPM) e critério para saber se melhorou. Diferencie exercícios criados por você de estudos publicados; não invente atribuições a autores de métodos. ${aula ? 'O aluno está na aula "' + aula.titulo + '".' : ''} Aulas aprovadas: ${Object.values(E.aulas).filter((x) => x.ok).length}.`;
      const msgs = conversa.slice(0, -1).map((m, i) => (i === 0 ? { role: 'user', content: sistema + '\n\nPergunta do aluno: ' + m.content } : m));
      try {
        const r = await sample(msgs, { onText: ({ text }) => { conversa[conversa.length - 1].content = text; desenha(); } });
        conversa[conversa.length - 1].content = r.text;
      } catch (e) {
        conversa[conversa.length - 1].content = e && e.code === 'rate_limited' ? 'Muitas perguntas seguidas. Aguarde um minuto e tente de novo.' : 'Não consegui responder agora. Tente de novo em instantes.';
      }
      desenha();
    };
  }

  // ---------------- rotas ----------------
  function rota() {
    A.droneDesliga && A.droneDesliga();
    if (window.Ferr && window.Ferr.sair) window.Ferr.sair();
    const h = location.hash.slice(1) || 'curso';
    const el = $('#app');
    desenhaTopo();
    if (h.startsWith('aula-')) vistaAula(el, h.slice(5));
    else if (h === 'professor') vistaProfessor(el);
    else if (window.Ferr && window.Ferr[h]) window.Ferr[h](el, { E, inst: inst(), salvar, H, esc });
    else vistaCurso(el);
    if (!h.startsWith('aula-') || !rota._mesmaAula) window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', rota);
  window.App = { estado: () => E, salvar, inst, rota };
  rota();
  iniciaNuvem();
})();
