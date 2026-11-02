/* Conservatório de Sopros — ferramentas: afinador, metrônomo, dedilhados, escalas,
   transpositor, treino auditivo, rotina, avaliação e repertório */
(function () {
  'use strict';
  const M = window.Musica, A = window.Audio2, IN = window.Inst;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cab = (rot, tit, txt) => `<div class="ferr-cab"><span class="rotulo">${rot}</span><h1>${tit}</h1>${txt ? `<p>${txt}</p>` : ''}</div>`;
  const notasFaixa = (I) => { const [a, b] = I.faixa.map((x) => M.midi(M.parse(x))); const r = []; for (let m = a; m <= b; m++) r.push(m); return r; };
  const nomeEscrita = (m, bemol) => M.deMidi(m, bemol);
  let limpeza = [];
  const Ferr = {
    sair() { limpeza.forEach((f) => { try { f(); } catch (e) { /* ignora */ } }); limpeza = []; },
  };

  // ======================= AFINADOR =======================
  Ferr.afinador = (el, { inst }) => {
    const I = inst;
    let la = 440;
    el.innerHTML = `<div class="vista">${cab('Afinador', 'Afinador e análise de gravação', `Mostra a nota <b>escrita</b> para o ${esc(I.nomeMin)}${I.transp.s ? ` e a nota real (de concerto). Lembre: ${esc(I.exemploTransp)}.` : '.'}`)}
      <div class="grade">
        <div class="cartao mostrador" style="grid-column:1/-1">
          <span class="rotulo">Nota escrita</span>
          <div class="grande" id="af-nota">—</div>
          <div class="sutil" id="af-conc">Toque uma nota longa</div>
          <div class="agulha"><svg viewBox="0 0 420 60" aria-hidden="true">
            <rect x="0" y="26" width="420" height="8" rx="4" fill="var(--linha)"/>
            <rect x="189" y="22" width="42" height="16" rx="4" fill="var(--ok-suave)"/>
            ${[-50, -25, 0, 25, 50].map((c) => `<line x1="${210 + c * 4}" y1="14" x2="${210 + c * 4}" y2="46" stroke="var(--sutil)" stroke-width="${c ? 1 : 2}"/><text x="${210 + c * 4}" y="58" text-anchor="middle" font-size="10" fill="var(--sutil)">${c > 0 ? '+' + c : c}</text>`).join('')}
            <circle id="af-ponteiro" cx="210" cy="30" r="9" fill="var(--sutil)"/>
          </svg></div>
          <div class="num" id="af-cents">— cents · — Hz</div>
          <div class="linha"><button class="btn ouro" type="button" id="af-mic">Ligar microfone</button>
            <label class="peq">Lá = <input type="number" id="af-la" value="440" min="430" max="450" style="width:72px"> Hz</label></div>
          <p class="peq sutil" id="af-msg" style="text-align:center;max-width:60ch"></p>
        </div>
        <div class="cartao pilha">
          <h3>Analisar uma gravação</h3>
          <p class="peq">Grave no celular uma nota longa, uma escala ou um trecho (sem acompanhamento) e envie o arquivo. O app mede a afinação de cada nota, a estabilidade e a duração. Ele não avalia timbre: para isso, ouça a gravação com atenção ou pergunte ao professor.</p>
          <input type="file" id="af-arq" accept="audio/*">
          <div id="af-res"></div>
        </div>
        <div class="cartao pilha">
          <h3>Nota de referência</h3>
          <p class="peq">Toque junto com o som de referência e ouça os <b>batimentos</b> (uma ondulação no som). Quanto mais lentos, mais perto da afinação. Sem batimentos = afinado.</p>
          <div class="linha"><select id="af-ref">${notasFaixa(I).map((m) => { const n = nomeEscrita(m, [1, 3, 6, 8, 10].includes(m % 12) && I.transp.s !== 0 ? false : true); return `<option value="${m}" ${M.midi(M.parse(I.afinar.escrita)) === m ? 'selected' : ''}>${M.nomeBR(n)}${n.o} escrito</option>`; }).join('')}</select>
          <select id="af-int"><option value="0">só a nota</option><option value="7">nota + 5ª</option><option value="12">nota + 8ª</option><option value="4">nota + 3ª maior</option></select></div>
          <div class="linha"><button class="btn" type="button" id="af-drone">▶ Ligar referência</button><button class="btn sec" type="button" id="af-drone-off">■ Parar</button></div>
          <p class="peq sutil">${esc(I.afinar.obs)}</p>
        </div>
      </div></div>`;
    const nota = $('#af-nota'), conc = $('#af-conc'), cents = $('#af-cents'), pont = $('#af-ponteiro');
    $('#af-la').onchange = (e) => { la = +e.target.value || 440; };
    let suav = null;
    function mostra(r) {
      if (!r || r.clareza < 0.85) return;
      const d = M.deFreq(r.f, la);
      suav = suav == null || Math.abs(suav - d.cents) > 40 ? d.cents : suav * 0.7 + d.cents * 0.3;
      const escrita = d.midi + I.transp.s;
      const n = nomeEscrita(escrita, false), c = nomeEscrita(d.midi, true);
      nota.textContent = M.nomeBR(n) + n.o;
      conc.textContent = I.transp.s ? 'som real: ' + M.nomeBR(c) + c.o : 'som real';
      const cc = Math.round(suav);
      cents.textContent = (cc > 0 ? '+' : '') + cc + ' cents · ' + r.f.toFixed(1) + ' Hz';
      pont.setAttribute('cx', 210 + Math.max(-50, Math.min(50, cc)) * 4);
      pont.setAttribute('fill', Math.abs(cc) <= 5 ? 'var(--ok)' : Math.abs(cc) <= 15 ? 'var(--acento)' : 'var(--alerta)');
    }
    let ligado = false;
    $('#af-mic').onclick = async () => {
      if (ligado) { A.micDesliga(); ligado = false; $('#af-mic').textContent = 'Ligar microfone'; return; }
      try {
        await A.micLiga(mostra); ligado = true; $('#af-mic').textContent = 'Desligar microfone';
        $('#af-msg').textContent = 'Toque notas longas, em volume médio, a cerca de 1 metro do aparelho.';
      } catch (e) {
        $('#af-msg').innerHTML = 'O microfone não está disponível nesta janela. Use a análise de gravação ao lado: grave no celular e envie o arquivo. (Se abrir este app direto pelo navegador, a partir do repositório, o microfone ao vivo funciona.)';
      }
    };
    limpeza.push(() => { A.micDesliga(); A.droneDesliga(); });
    $('#af-drone').onclick = () => {
      const m = +$('#af-ref').value - I.transp.s, iv = +$('#af-int').value;
      const fs = [M.freq(m, la)]; if (iv) fs.push(M.freq(m + iv, la));
      A.droneLiga(fs);
    };
    $('#af-drone-off').onclick = () => A.droneDesliga();
    $('#af-arq').onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      const res = $('#af-res'); res.innerHTML = '<p class="sutil">Analisando…</p>';
      try {
        const { pontos, duracao } = await A.analisaArquivo(f);
        res.innerHTML = relatorio(pontos, duracao, I, la);
      } catch (err) { res.innerHTML = '<p class="aviso vinho">Não foi possível ler este arquivo. Tente MP3, M4A ou WAV.</p>'; }
    };
  };

  function relatorio(pontos, duracao, I, la) {
    // agrupa em notas: quadros consecutivos com a mesma nota mais próxima
    const segs = []; let atual = null;
    pontos.forEach((p) => {
      if (!p.f) { atual = null; return; }
      const d = M.deFreq(p.f, la);
      if (atual && atual.midi === d.midi) { atual.c.push(d.cents); atual.fim = p.t; }
      else { atual = { midi: d.midi, c: [d.cents], ini: p.t, fim: p.t }; segs.push(atual); }
    });
    const notas = segs.filter((s) => s.fim - s.ini >= 0.25);
    if (!notas.length) return '<p class="aviso">Não encontrei notas sustentadas. Grave mais perto do microfone, sem acompanhamento, e com notas de pelo menos meio segundo.</p>';
    const linhas = notas.slice(0, 40).map((s) => {
      const media = s.c.reduce((a, b) => a + b, 0) / s.c.length;
      const dp = Math.sqrt(s.c.reduce((a, b) => a + (b - media) ** 2, 0) / s.c.length);
      const n = nomeEscrita(s.midi + I.transp.s, false);
      const sit = Math.abs(media) <= 10 ? '<span class="chip ok">afinada</span>' : media > 0 ? '<span class="chip vinho">alta</span>' : '<span class="chip vinho">baixa</span>';
      return [M.nomeBR(n) + n.o, (s.fim - s.ini).toFixed(1) + ' s', `<span class="num">${media > 0 ? '+' : ''}${media.toFixed(0)}</span>`, `<span class="num">${dp.toFixed(0)}</span>`, sit];
    });
    const todas = notas.flatMap((s) => s.c);
    const mediaAbs = todas.reduce((a, b) => a + Math.abs(b), 0) / todas.length;
    // gráfico de desvio no tempo
    const W = 600, Hh = 140;
    let path = '';
    pontos.forEach((p) => {
      if (!p.f) return;
      const d = M.deFreq(p.f, la);
      const x = (p.t / duracao) * W, y = Hh / 2 - Math.max(-50, Math.min(50, d.cents)) * (Hh / 110);
      path += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="${Math.abs(d.cents) <= 10 ? 'var(--ok)' : 'var(--alerta)'}"/>`;
    });
    return `<div class="pilha">
      <div class="linha"><span class="chip">${notas.length} notas</span><span class="chip">${duracao.toFixed(1)} s</span><span class="chip ${mediaAbs <= 10 ? 'ok' : 'vinho'}">desvio médio ${mediaAbs.toFixed(0)} cents</span></div>
      <div class="grafico"><svg viewBox="0 0 ${W} ${Hh + 16}" role="img" aria-label="Desvio de afinação ao longo da gravação">
        <rect x="0" y="${Hh / 2 - 10 * (Hh / 110)}" width="${W}" height="${20 * (Hh / 110)}" fill="var(--ok-suave)"/>
        <line x1="0" y1="${Hh / 2}" x2="${W}" y2="${Hh / 2}" stroke="var(--sutil)" stroke-width="1"/>
        <text x="4" y="12" font-size="10" fill="var(--sutil)">+50 cents</text><text x="4" y="${Hh - 2}" font-size="10" fill="var(--sutil)">−50 cents</text>
        ${path}<text x="${W}" y="${Hh + 14}" text-anchor="end" font-size="10" fill="var(--sutil)">${duracao.toFixed(1)} s</text></svg></div>
      ${window.H.tabela(['Nota escrita', 'Duração', 'Desvio médio', 'Oscilação', ''], linhas)}
      <p class="peq sutil"><b>Desvio médio:</b> distância da afinação (100 cents = 1 semitom). Até ±10 é bom; até ±5 é excelente. <b>Oscilação:</b> o quanto a altura balança dentro da nota (desvio padrão). Abaixo de 5 é estável; acima de 12 indica apoio de ar ou embocadura instáveis (ou vibrato, se intencional).</p></div>`;
  }

  // ======================= METRÔNOMO =======================
  const ANDAMENTOS = [[40, 'Grave/Largo'], [60, 'Larghetto'], [66, 'Adagio'], [76, 'Andante'], [108, 'Moderato'], [120, 'Allegro moderato'], [168, 'Allegro'], [200, 'Presto'], [999, 'Prestissimo']];
  const nomeAndamento = (b) => ANDAMENTOS.find(([l]) => b < l)[1];
  Ferr.metronomo = (el) => {
    const Met = A.Met;
    el.innerHTML = `<div class="vista">${cab('Metrônomo', 'Metrônomo', 'Estude devagar e limpo; acelere só quando acertar três vezes seguidas. O treino progressivo sobe o andamento sozinho a cada tantos compassos.')}
      <div class="grade">
        <div class="cartao mostrador" style="grid-column:1/-1">
          <div class="bpm-grande" id="mt-bpm">${Met.bpm}</div><div class="sutil" id="mt-nome">${nomeAndamento(Met.bpm)}</div>
          <input type="range" id="mt-rng" min="30" max="260" value="${Met.bpm}" aria-label="Andamento">
          <div class="linha" style="justify-content:center">
            <button class="btn sec peq" data-d="-10">−10</button><button class="btn sec peq" data-d="-1">−1</button>
            <button class="btn ouro" id="mt-play" type="button">▶ Iniciar</button>
            <button class="btn sec peq" data-d="1">+1</button><button class="btn sec peq" data-d="10">+10</button></div>
          <div class="batidas" id="mt-bat"></div>
          <button class="btn sec peq" id="mt-tap" type="button">Toque aqui no ritmo (tap)</button>
        </div>
        <div class="cartao pilha">
          <h3>Compasso</h3>
          <div class="linha"><label class="campo">Tempos por compasso<select id="mt-tempos">${[2, 3, 4, 5, 6, 7].map((n) => `<option ${n === Met.tempos ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
          <label class="campo">Subdivisão<select id="mt-sub"><option value="1">nenhuma</option><option value="2">colcheias (2)</option><option value="3">tercinas (3)</option><option value="4">semicolcheias (4)</option></select></label></div>
          <label class="linha" style="font-weight:500"><input type="checkbox" id="mt-acento" checked> acentuar o 1º tempo</label>
          <p class="peq sutil">Compasso composto (6/8): use 2 tempos com subdivisão em 3. Para treinar contratempo, conte os cliques como “e” e toque entre eles.</p>
        </div>
        <div class="cartao pilha">
          <h3>Treino progressivo</h3>
          <div class="linha"><label class="campo">Subir<select id="mt-passo"><option value="0">desligado</option><option value="2">+2 BPM</option><option value="4" selected>+4 BPM</option><option value="8">+8 BPM</option></select></label>
          <label class="campo">a cada<select id="mt-cada"><option value="2">2 compassos</option><option value="4" selected>4 compassos</option><option value="8">8 compassos</option></select></label>
          <label class="campo">até<input type="number" id="mt-max" value="120" min="40" max="260"></label></div>
          <p class="peq sutil">Repita o trecho em laço. Quando errar, pare, volte 8 BPM e recomece. Anote o andamento máximo limpo na aba Escalas.</p>
        </div>
      </div></div>`;
    const set = (b) => { Met.bpm = Math.max(30, Math.min(260, b)); $('#mt-bpm').textContent = Met.bpm; $('#mt-nome').textContent = nomeAndamento(Met.bpm); $('#mt-rng').value = Met.bpm; };
    const bat = () => { $('#mt-bat').innerHTML = Array.from({ length: Met.tempos }, () => '<i></i>').join(''); };
    bat();
    $('#mt-rng').oninput = (e) => set(+e.target.value);
    $$('[data-d]', el).forEach((b) => (b.onclick = () => set(Met.bpm + +b.dataset.d)));
    $('#mt-tempos').onchange = (e) => { Met.tempos = +e.target.value; bat(); };
    $('#mt-sub').onchange = (e) => { Met.sub = +e.target.value; };
    $('#mt-acento').onchange = (e) => { Met.acento = e.target.checked; };
    const treino = () => { const p = +$('#mt-passo').value; Met.treino = p ? { passo: p, cada: +$('#mt-cada').value, max: +$('#mt-max').value } : null; };
    ['mt-passo', 'mt-cada', 'mt-max'].forEach((id) => ($('#' + id).onchange = treino));
    treino();
    Met.aoMudarBpm = (b) => set(b);
    Met.aoTempo = (t) => { const is = $$('#mt-bat i'); is.forEach((x, i) => { x.className = i === t ? 'on' + (t === 0 && Met.acento ? ' forte' : '') : ''; }); };
    $('#mt-play').onclick = () => { if (Met.ligado) { Met.parar(); $('#mt-play').textContent = '▶ Iniciar'; } else { treino(); Met.iniciar(); $('#mt-play').textContent = '■ Parar'; } };
    if (Met.ligado) $('#mt-play').textContent = '■ Parar';
    let taps = [];
    $('#mt-tap').onclick = () => { const t = performance.now(); taps = taps.filter((x) => t - x < 3000); taps.push(t); if (taps.length > 1) { const d = (taps[taps.length - 1] - taps[0]) / (taps.length - 1); set(Math.round(60000 / d)); } };
    limpeza.push(() => { Met.parar(); Met.aoTempo = null; Met.aoMudarBpm = null; Met.treino = null; });
  };

  // ======================= DEDILHADOS =======================
  Ferr.dedilhado = (el, { inst }) => {
    const I = inst;
    const titulo = I.sub === 'trombone' ? 'Posições da vara' : I.sub === 'trompete' ? 'Pistos do trompete' : 'Dedilhados';
    const notas = notasFaixa(I);
    const bemol = I.sub === 'trombone' || I.sub === 'trompete';
    let sel = M.midi(M.parse(I.transp.s ? 'C5' : 'Bb2'));
    if (I.sub === 'clarinete') sel = M.midi(M.parse('C4'));
    el.innerHTML = `<div class="vista">${cab(I.nome, titulo, I.sub === 'trombone'
      ? 'Notas reais na clave de Fá. A 1ª posição é a vara toda fechada; cada posição seguinte abaixa meio tom. Quase toda nota tem mais de uma posição: escolha a que deixa a vara mais perto da próxima nota.'
      : `Todas as notas são <b>escritas</b> (como aparecem na partitura do ${esc(I.nomeMin)}). Toque uma nota para ver ${I.sub === 'trompete' ? 'os pistos' : 'o diagrama'} e as alternativas.`)}
      <div class="cartao pilha"><span class="rotulo">Escolha a nota</span><div class="tecla-notas" id="dd-notas">${notas.map((m) => { const n = nomeEscrita(m, bemol); return `<button class="btn peq sec" type="button" data-m="${m}">${M.nomeBR(n)}<sub>${n.o}</sub></button>`; }).join('')}</div></div>
      <div class="grade" id="dd-det"></div>
      <div class="cartao pilha"><div class="linha" style="justify-content:space-between"><h3>Tabela completa</h3><span class="peq sutil">da nota mais grave à mais aguda</span></div><div class="dedos-grade" id="dd-tab"></div></div></div>`;
    function det() {
      const n = nomeEscrita(sel, bemol), d = IN.dedilhado(I, n);
      $$('#dd-notas [data-m]').forEach((b) => b.classList.toggle('ouro', +b.dataset.m === sel));
      const c = M.escritaParaConcerto(n, I);
      if (!d) { $('#dd-det').innerHTML = '<p>Sem dedilhado registrado.</p>'; return; }
      const enarm = nomeEscrita(sel, !bemol);
      $('#dd-det').innerHTML = `<div class="cartao pilha" style="align-items:center">
          <span class="rotulo">${I.transp.s ? 'Nota escrita' : 'Nota'}</span><h2>${M.nomeBR(n)}${n.o}${enarm.l !== n.l ? ` <span class="sutil" style="font-size:.7em">= ${M.nomeBR(enarm)}${enarm.o}</span>` : ''}</h2>
          ${I.transp.s ? `<span class="sutil">soa ${M.nomeBR(c)}${c.o} (${M.nomeInt(c)}${c.o}) de concerto</span>` : ''}
          <div style="width:100%;max-width:${I.sub === 'trombone' || I.sub === 'trompete' ? 380 : 320}px">${d.svg}</div>
          <p style="text-align:center"><b>${esc(d.texto)}</b></p>
          <button class="btn peq" type="button" id="dd-ouvir">▶ Ouvir</button></div>
        <div class="cartao pilha"><div class="pauta" id="dd-pauta"></div>
          ${d.obs ? `<p class="aviso">${esc(d.obs)}</p>` : ''}
          ${d.alts.length ? `<h3>Alternativas</h3><div class="dedos-grade">${d.alts.map((a) => `<figure class="pilha" style="margin:0;align-items:center">${a.svg}<figcaption class="peq"><b>${esc(a.texto)}</b>${a.nota ? '<br><span class="sutil">' + esc(a.nota) + '</span>' : ''}</figcaption></figure>`).join('')}</div>` : ''}</div>`;
      const abc = M.abc({ notas: [{ n, d: 16 }], clave: I.clave, compasso: '4/4' });
      if (window.ABCJS) window.ABCJS.renderAbc($('#dd-pauta'), abc, { responsive: 'resize', foregroundColor: 'currentColor', staffwidth: 200 });
      $('#dd-pauta').classList.add('abc');
      $('#dd-ouvir').onclick = () => A.tocarSequencia([{ midi: sel - I.transp.s, d: 12 }], 60);
    }
    $('#dd-notas').onclick = (e) => { const b = e.target.closest('[data-m]'); if (b) { sel = +b.dataset.m; det(); } };
    $('#dd-tab').innerHTML = notas.map((m) => { const n = nomeEscrita(m, bemol), d = IN.dedilhado(I, n); return d ? `<figure class="cartao" style="margin:0;padding:10px;display:flex;flex-direction:column;align-items:center;gap:4px;box-shadow:none"><b>${M.nomeBR(n)}${n.o}</b>${d.svg}<figcaption class="peq sutil" style="text-align:center">${esc(d.texto)}</figcaption></figure>` : ''; }).join('');
    det();
  };

  // ======================= ESCALAS E ARPEJOS =======================
  const TONICAS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
  Ferr.escalas = (el, { inst, E, salvar }) => {
    const I = inst;
    E.escalas = E.escalas || {};
    const reg = (E.escalas[I.id] = E.escalas[I.id] || {});
    const st = { modo: 'escala', ton: I.transp.s ? 'C' : 'Bb', ref: 'escrita', escala: 'maior', acorde: 'M', inv: 0, padrao: 'reta', oit: 1, dur: 4, bpm: 60 };
    el.innerHTML = `<div class="vista">${cab('Técnica', 'Escalas e arpejos', `Gera qualquer escala, modo, arpejo ou padrão já transposto para a leitura do ${esc(I.nomeMin)}, dentro da extensão do instrumento.`)}
      <div class="cartao pilha">
        <div class="linha" style="align-items:flex-end">
          <label class="campo">Tipo<select id="es-modo"><option value="escala">Escala / modo</option><option value="arpejo">Arpejo</option></select></label>
          <label class="campo">Tônica<select id="es-ton">${TONICAS.map((t) => `<option value="${t}" ${t === st.ton ? 'selected' : ''}>${M.nomeBR(M.parse(t + '4'))} (${M.nomeInt(M.parse(t + '4'))})</option>`).join('')}</select></label>
          ${I.transp.s ? `<label class="campo">A tônica é<select id="es-ref"><option value="escrita">nota escrita</option><option value="concerto">nota de concerto</option></select></label>` : ''}
          <label class="campo" id="es-c-esc">Escala<select id="es-esc">${Object.entries(M.ESCALAS).map(([k, d]) => `<option value="${k}">${d.nome}</option>`).join('')}</select></label>
          <label class="campo" id="es-c-arp" hidden>Acorde<select id="es-arp">${Object.entries(M.ARPEJOS).map(([k, d]) => `<option value="${k}">${d.nome}</option>`).join('')}</select></label>
          <label class="campo" id="es-c-inv" hidden>Inversão<select id="es-inv"><option value="0">fundamental</option><option value="1">1ª inversão</option><option value="2">2ª inversão</option><option value="3">3ª inversão (tétrades)</option></select></label>
          <label class="campo" id="es-c-pad">Padrão<select id="es-pad">${Object.entries(M.PADROES).map(([k, d]) => `<option value="${k}">${d.nome}</option>`).join('')}</select></label>
          <label class="campo">Oitavas<select id="es-oit"><option>1</option><option>2</option></select></label>
          <label class="campo">Figura<select id="es-dur"><option value="8">mínimas</option><option value="4" selected>semínimas</option><option value="2">colcheias</option><option value="1">semicolcheias</option></select></label>
        </div>
        <div id="es-pauta"></div>
        <div class="linha"><label class="peq">Meu andamento máximo limpo (♩): <input type="number" id="es-max" min="30" max="300" style="width:80px"></label><button class="btn peq" type="button" id="es-salvar">Registrar</button><span class="peq sutil" id="es-salvo"></span></div>
      </div>
      <div class="cartao pilha"><div class="linha" style="justify-content:space-between"><h3>Progresso nas 12 tonalidades</h3><span class="peq sutil">andamento máximo limpo registrado (semínima), por escala</span></div><div id="es-mapa"></div></div></div>`;
    function chave() { return st.modo + ':' + st.ton + ':' + (st.modo === 'escala' ? st.escala + ':' + st.padrao : st.acorde + ':' + st.inv) + ':' + st.dur; }
    function desenha() {
      $('#es-c-esc').hidden = st.modo !== 'escala'; $('#es-c-pad').hidden = st.modo !== 'escala';
      $('#es-c-arp').hidden = st.modo !== 'arpejo'; $('#es-c-inv').hidden = st.modo !== 'arpejo';
      const cfg = st.modo === 'escala'
        ? { tipo: 'escala', tonica: st.ton + '4', concerto: st.ref === 'concerto', escala: st.escala, padrao: st.padrao, oitavas: st.oit, dur: st.dur, bpm: st.bpm, porLinha: st.dur <= 2 ? 3 : 4 }
        : { tipo: 'arpejo', tonica: st.ton + '4', concerto: st.ref === 'concerto', acorde: st.acorde, inversao: st.inv, dur: st.dur, bpm: st.bpm };
      $('#es-pauta').innerHTML = window.H.pauta(cfg);
      window.renderPautas($('#es-pauta'));
      $('#es-max').value = reg[chave()] || '';
      mapa();
    }
    function mapa() {
      const tipos = [['maior', 'Maior'], ['menorNat', 'Menor nat.'], ['menorHarm', 'Menor harm.'], ['menorMel', 'Menor mel.'], ['pentaMenor', 'Pent. menor'], ['blues', 'Blues']];
      $('#es-mapa').innerHTML = window.H.tabela(['Tônica', ...tipos.map((t) => t[1])], TONICAS.map((t) => [M.nomeBR(M.parse(t + '4')), ...tipos.map(([k]) => {
        const vals = Object.entries(reg).filter(([c]) => c.startsWith('escala:' + t + ':' + k + ':')).map(([, v]) => v);
        const mx = vals.length ? Math.max(...vals) : 0;
        return mx ? `<span class="chip ${mx >= 120 ? 'ok' : 'ouro'} num">${mx}</span>` : '<span class="sutil">—</span>';
      })]));
    }
    const liga = (id, k, num) => { const x = $('#' + id); if (x) x.onchange = (e) => { st[k] = num ? +e.target.value : e.target.value; desenha(); }; };
    liga('es-modo', 'modo'); liga('es-ton', 'ton'); liga('es-ref', 'ref'); liga('es-esc', 'escala'); liga('es-arp', 'acorde'); liga('es-inv', 'inv', 1); liga('es-pad', 'padrao'); liga('es-oit', 'oit', 1); liga('es-dur', 'dur', 1);
    $('#es-salvar').onclick = () => { const vv = +$('#es-max').value; if (!vv) return; reg[chave()] = vv; salvar(); $('#es-salvo').textContent = 'Registrado.'; mapa(); };
    desenha();
  };

  // ======================= TRANSPOSITOR =======================
  const BR = { 'dó': 'C', 'do': 'C', 'ré': 'D', 're': 'D', 'mi': 'E', 'fá': 'F', 'fa': 'F', 'sol': 'G', 'lá': 'A', 'la': 'A', 'si': 'B' };
  function lerToken(t) {
    const m = /^(dó|do|ré|re|mi|fá|fa|sol|lá|la|si|[A-Ga-g])(##|bb|#|b|♯|♭|x)?(.*)$/i.exec(t);
    if (!m) return null;
    let l = m[1].toLowerCase(); l = BR[l] || l.toUpperCase();
    const a = { '#': 1, '♯': 1, '##': 2, x: 2, b: -1, '♭': -1, bb: -2 }[m[2]] || 0;
    return { n: { l, a, o: 4 }, resto: m[3], br: !!BR[m[1].toLowerCase()] && m[1].length > 1 };
  }
  function simplifica(n) {
    if (Math.abs(n.a) <= 1 && !(n.l === 'E' && n.a === 1) && !(n.l === 'B' && n.a === 1) && !(n.l === 'F' && n.a === -1) && !(n.l === 'C' && n.a === -1)) return n;
    return M.deMidi(M.midi(n), n.a < 0);
  }
  Ferr.transpositor = (el, { inst }) => {
    const I = inst;
    const todos = Object.assign({}, IN.OUTROS, IN.INSTRUMENTOS);
    el.innerHTML = `<div class="vista">${cab('Transposição', 'Transpositor', 'Converta notas, cifras ou tonalidades entre instrumentos. Digite separado por espaços: <span class="num">C D E F#</span>, <span class="num">Dó Ré Mi♭</span> ou cifras <span class="num">Am7 D7 G7M</span>.')}
      <div class="grade">
        <div class="cartao pilha">
          <label class="campo">De (a parte que você tem)<select id="tr-de">${Object.values(todos).map((x) => `<option value="${x.id}" ${x.id === 'C' ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select></label>
          <label class="campo">Para (quem vai ler)<select id="tr-para">${Object.values(todos).map((x) => `<option value="${x.id}" ${x.id === I.id ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select></label>
          <label class="campo">Notas, cifras ou tonalidade<input type="text" id="tr-in" value="C F G7 Am Dm7 G7 C"></label>
          <div id="tr-out" class="pilha"></div>
        </div>
        <div class="cartao pilha"><h3>Tabela de tonalidades: ${esc(I.nome)}</h3><div id="tr-tab"></div></div>
      </div>
      <div class="cartao pilha"><h3>Como transpor à mão</h3>
        <ol><li>Descubra o intervalo de transposição de cada instrumento (quanto ele soa abaixo do escrito): sax alto 6ª maior, instrumentos em Si♭ 2ª maior, sax tenor 9ª maior, trompa 5ª justa.</li>
        <li>Da parte em Dó para o seu instrumento, <b>suba</b> esse intervalo. Do seu instrumento para Dó, <b>desça</b>.</li>
        <li>Transponha primeiro a <b>armadura</b> (tonalidade), depois cada nota mantendo a mesma distância de letras (Dó→Lá no sax alto: 6 letras: C D E F G A).</li>
        <li>Revise acidentes ocorrentes: um ♮ pode virar ♯ ou ♭ conforme a nova armadura.</li>
        <li>Confira a extensão: se a melodia ficar grave ou aguda demais, mude de oitava.</li></ol></div></div>`;
    function calc() {
      const de = todos[$('#tr-de').value], para = todos[$('#tr-para').value];
      const iv = { l: para.transp.l - de.transp.l, s: para.transp.s - de.transp.s };
      const toks = $('#tr-in').value.trim().split(/\s+/).filter(Boolean);
      const out = toks.map((t) => {
        const r = lerToken(t); if (!r) return '?';
        const [raiz, baixo] = (r.resto.includes('/') ? [r.resto.split('/')[0], r.resto.split('/')[1]] : [r.resto, null]);
        let n = simplifica(M.transpor(r.n, iv));
        let s = (r.br ? M.nomeBR(n) : M.nomeInt(n)) + raiz;
        if (baixo) { const b = lerToken(baixo); if (b) { const nb = simplifica(M.transpor(b.n, iv)); s += '/' + (r.br ? M.nomeBR(nb) : M.nomeInt(nb)); } }
        return s;
      });
      const semis = ((iv.s % 12) + 12) % 12;
      $('#tr-out').innerHTML = `<span class="rotulo">Resultado para ${esc(para.nome)}</span><p style="font-family:var(--f-titulo);font-size:1.5rem;font-weight:700">${esc(out.join('  '))}</p>
        <p class="peq sutil">${iv.s === 0 ? 'Mesma escrita (só pode mudar a oitava).' : `Intervalo: ${iv.s > 0 ? 'subir' : 'descer'} ${Math.abs(iv.s)} semitons (${semis} na mesma oitava).`}</p>`;
    }
    ['tr-de', 'tr-para'].forEach((id) => ($('#' + id).onchange = calc));
    $('#tr-in').oninput = calc;
    calc();
    $('#tr-tab').innerHTML = window.H.tabela(['Concerto', 'Escrito para você', 'Armadura escrita'], M.CICLO.map((t) => {
      const tc = M.parse(t + '4'), r = M.tomEscrito(tc, 'maior', I);
      return [M.nomeBR(tc) + ' maior', `<b>${M.nomeBR(r.tonica)} maior</b>`, M.descArmadura(r.tonica)];
    }));
  };

  // ======================= TREINO AUDITIVO =======================
  const INTERVALOS = [[1, '2ª menor', 'Tubarão (tema); Für Elise (Mi–Ré♯)'], [2, '2ª maior', '“Parabéns pra você” (Pa-ra-béns)'], [3, '3ª menor', 'Greensleeves (início)'], [4, '3ª maior', 'When the Saints (Oh, when)'], [5, '4ª justa', 'Marcha nupcial de Wagner; “Lá vem a noiva”'], [6, 'Trítono', 'Maria (West Side Story); Os Simpsons (abertura)'], [7, '5ª justa', 'Brilha, brilha estrelinha (Bri-lha)'], [8, '6ª menor', 'The Entertainer (Mi–Dó, descendo a nota-alvo)'], [9, '6ª maior', 'My Bonnie Lies Over the Ocean'], [10, '7ª menor', 'Somewhere (There’s a place) – West Side Story'], [11, '7ª maior', 'Over the rainbow, 1ª e 3ª notas (aprox.); procure ouvir resolvendo na 8ª'], [12, '8ª justa', 'Somewhere Over the Rainbow (Some-where)']];
  const ACORDES_OUV = { M: [0, 4, 7], m: [0, 3, 7], dim: [0, 3, 6], aum: [0, 4, 8], M7: [0, 4, 7, 11], d7: [0, 4, 7, 10], m7: [0, 3, 7, 10], m7b5: [0, 3, 6, 10], dim7: [0, 3, 6, 9] };
  const ESC_OUV = ['maior', 'menorNat', 'menorHarm', 'menorMelJazz', 'dorico', 'mixolidio', 'lidio', 'frigio', 'pentaMaior', 'pentaMenor', 'blues'];
  Ferr.ouvido = (el, { E, salvar, inst }) => {
    E.ouvido = E.ouvido || {};
    const st = { modo: 'intervalos', dir: 'sobe', nivel: 'todos', resp: null, q: null, ditado: [] };
    el.innerHTML = `<div class="vista">${cab('Percepção', 'Treino auditivo', 'Ouça, cante por dentro e só então responda. Use fones de ouvido. Repita o som quantas vezes precisar — o objetivo é reconhecer, não adivinhar.')}
      <div class="cartao pilha">
        <div class="linha"><label class="campo">Exercício<select id="ov-modo"><option value="intervalos">Intervalos</option><option value="acordes">Acordes</option><option value="escalas">Escalas e modos</option><option value="graus">Ditado melódico (graus)</option><option value="ritmo">Ditado rítmico</option><option value="afinacao">Afinação: alto ou baixo?</option></select></label>
        <label class="campo" id="ov-c-dir">Direção<select id="ov-dir"><option value="sobe">ascendente</option><option value="desce">descendente</option><option value="harm">harmônico (junto)</option></select></label>
        <label class="campo" id="ov-c-niv">Nível<select id="ov-niv"><option value="basico">básico</option><option value="todos" selected>completo</option></select></label></div>
        <div class="linha"><button class="btn ouro" type="button" id="ov-novo">Nova questão</button><button class="btn sec" type="button" id="ov-rep">▶ Repetir som</button><span class="chip" id="ov-placar"></span></div>
        <div id="ov-q" class="pilha"></div>
      </div>
      <div class="cartao pilha"><h3>Músicas de referência para intervalos</h3>${window.H.tabela(['Intervalo', 'Semitons', 'Referência (ascendente)'], INTERVALOS.map(([s, n, r]) => [n, `<span class="num">${s}</span>`, r]))}
      <p class="peq sutil">Crie suas próprias referências com músicas que você conhece bem (hinos, louvores). Referência pessoal fixa melhor que lista decorada.</p></div></div>`;
    const placar = () => { const p = E.ouvido[st.modo] || { a: 0, t: 0 }; $('#ov-placar').textContent = `${p.a}/${p.t} acertos neste exercício${p.t ? ' · ' + Math.round((p.a / p.t) * 100) + '%' : ''}`; };
    function registra(ok) { const p = (E.ouvido[st.modo] = E.ouvido[st.modo] || { a: 0, t: 0 }); p.t++; if (ok) p.a++; salvar(); placar(); }
    const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    function toca() {
      const q = st.q; if (!q) return;
      if (q.tipo === 'iv') { if (st.dir === 'harm') A.tocarAcorde([q.base, q.base + q.s], 1.6); else A.tocarSequencia([{ midi: q.base, d: 4 }, { midi: st.dir === 'sobe' ? q.base + q.s : q.base - q.s, d: 6 }], 70); }
      else if (q.tipo === 'ac') A.tocarAcorde(q.notas, 2.2, q.arp);
      else if (q.tipo === 'esc') A.tocarSequencia(q.notas.map((m) => ({ midi: m, d: 2 })), 90);
      else if (q.tipo === 'gr') A.tocarSequencia([{ midi: q.ref, d: 4 }, { midi: q.ref + 4, d: 4 }, { midi: q.ref + 7, d: 4 }, { midi: q.ref + 12, d: 4 }, { midi: null, d: 8 }].concat(q.notas.map((m) => ({ midi: m, d: 4 }))), 80);
      else if (q.tipo === 'rt') { const ev = [{ midi: 84, d: 4 }, { midi: 84, d: 4 }, { midi: 84, d: 4 }, { midi: 84, d: 4 }].concat(q.op[q.c].split(' ').map((x) => ({ midi: x.startsWith('-') ? null : 72, d: Math.abs(+x) }))); A.tocarSequencia(ev, 72); }
      else if (q.tipo === 'af') A.tocarSequencia([{ midi: q.base, d: 6 }, { midi: null, d: 2 }], 60), setTimeout(() => { const c = A.ac(); A.tocarNota(M.freq(q.base) * Math.pow(2, q.c / 1200), c.currentTime + 0.05, 1.2); }, 900);
    }
    function nova() {
      st.resp = null;
      const box = $('#ov-q');
      const base = r(55, 67);
      if (st.modo === 'intervalos') {
        const lista = st.nivel === 'basico' ? [2, 4, 5, 7, 12] : INTERVALOS.map((x) => x[0]);
        const s = lista[r(0, lista.length - 1)];
        st.q = { tipo: 'iv', base, s, c: s, ops: lista.map((x) => [x, INTERVALOS.find((i) => i[0] === x)[1]]) };
      } else if (st.modo === 'acordes') {
        const lista = st.nivel === 'basico' ? ['M', 'm', 'dim', 'aum'] : Object.keys(ACORDES_OUV);
        const k = lista[r(0, lista.length - 1)];
        st.q = { tipo: 'ac', notas: ACORDES_OUV[k].map((x) => base - 5 + x), arp: false, c: k, ops: lista.map((x) => [x, M.ARPEJOS[x].nome]) };
      } else if (st.modo === 'escalas') {
        const lista = st.nivel === 'basico' ? ['maior', 'menorNat', 'menorHarm', 'pentaMaior'] : ESC_OUV;
        const k = lista[r(0, lista.length - 1)];
        const t = M.deMidi(base - 2, true);
        const sobe = M.escalaGrafada(t, k).map(M.midi).concat([M.midi(t) + 12]);
        st.q = { tipo: 'esc', notas: sobe, c: k, ops: lista.map((x) => [x, M.ESCALAS[x].nome]) };
      } else if (st.modo === 'graus') {
        const n = st.nivel === 'basico' ? 3 : 5, ref = r(57, 64);
        const graus = [0, 2, 4, 5, 7, 9, 11];
        const seq = [0]; for (let i = 1; i < n; i++) { let g; do { g = r(0, 6); } while (Math.abs(g - seq[i - 1]) > (st.nivel === 'basico' ? 2 : 4)); seq.push(g); }
        st.q = { tipo: 'gr', ref, seq, notas: seq.map((g) => ref + graus[g]), c: seq.join(',') };
        st.ditado = [];
      } else if (st.modo === 'ritmo') {
        const banco = ['4 4 4 4', '8 4 4', '4 2 2 4 4', '2 2 2 2 4 4', '6 2 4 4', '4 -4 4 4', '2 2 4 2 2 4', '1 1 1 1 4 4 4', '4 1 1 2 4 4', '3 1 3 1 4 4', '2 4 2 4 4', '12 4'];
        const ops = []; while (ops.length < 3) { const x = banco[r(0, banco.length - 1)]; if (!ops.includes(x)) ops.push(x); }
        st.q = { tipo: 'rt', op: ops, c: r(0, 2) };
      } else if (st.modo === 'afinacao') {
        const d = (st.nivel === 'basico' ? [-30, -20, 20, 30] : [-15, -10, -6, 6, 10, 15])[r(0, st.nivel === 'basico' ? 3 : 5)];
        st.q = { tipo: 'af', base, c: d };
      }
      desenhaQ(box);
      toca();
    }
    function desenhaQ(box) {
      const q = st.q;
      const fim = (ok, txt) => { registra(ok); st.resp = true; box.insertAdjacentHTML('beforeend', `<p class="aviso ${ok ? 'ok' : 'vinho'}">${ok ? '✓ Correto.' : '✗ ' + txt}</p>`); };
      if (q.tipo === 'gr') {
        box.innerHTML = `<p>Primeiro soa o arpejo da tonalidade (Dó–Mi–Sol–Dó relativo). Depois, a melodia de ${q.seq.length} notas — a primeira é sempre o 1º grau. Clique nos graus na ordem.</p>
          <div class="linha">${['1 (Dó)', '2 (Ré)', '3 (Mi)', '4 (Fá)', '5 (Sol)', '6 (Lá)', '7 (Si)'].map((g, i) => `<button class="btn sec" type="button" data-g="${i}">${g}</button>`).join('')}</div><p class="num" id="ov-dit">Sua resposta: </p>`;
        $$('[data-g]', box).forEach((b) => (b.onclick = () => {
          if (st.resp) return;
          st.ditado.push(+b.dataset.g); $('#ov-dit').textContent = 'Sua resposta: ' + st.ditado.map((g) => g + 1).join(' – ');
          if (st.ditado.length === q.seq.length) { const ok = st.ditado.join(',') === q.c; fim(ok, 'Era: ' + q.seq.map((g) => g + 1).join(' – ')); }
        }));
        return;
      }
      if (q.tipo === 'rt') {
        box.innerHTML = '<p>Quatro cliques agudos marcam o pulso. Depois vem um compasso de ritmo. Qual partitura corresponde?</p><div class="grade" id="ov-rops"></div>';
        q.op.forEach((o, i) => {
          const d = document.createElement('button'); d.className = 'opc'; d.type = 'button'; d.style.flexDirection = 'column';
          d.innerHTML = `<b>${String.fromCharCode(97 + i)})</b><div class="abc" style="width:100%;color:var(--tinta)"></div>`;
          $('#ov-rops').appendChild(d);
          const notas = o.split(' ').map((x) => ({ n: x.startsWith('-') ? null : M.parse('B4'), d: Math.abs(+x) }));
          if (window.ABCJS) window.ABCJS.renderAbc(d.querySelector('.abc'), M.abc({ notas, compasso: '4/4' }), { responsive: 'resize', foregroundColor: 'currentColor', staffwidth: 260 });
          d.onclick = () => { if (st.resp) return; d.classList.add(i === q.c ? 'certa' : 'errada'); fim(i === q.c, 'Era a opção ' + String.fromCharCode(97 + q.c) + '.'); };
        });
        return;
      }
      if (q.tipo === 'af') {
        box.innerHTML = '<p>Ouça a nota de referência e, depois, a segunda nota. A segunda está mais alta ou mais baixa?</p><div class="linha"><button class="btn sec" type="button" data-af="1">Mais alta (sustenida)</button><button class="btn sec" type="button" data-af="-1">Mais baixa (bemolizada)</button></div>';
        $$('[data-af]', box).forEach((b) => (b.onclick = () => { if (st.resp) return; const ok = Math.sign(q.c) === +b.dataset.af; fim(ok, `Estava ${q.c > 0 ? 'alta' : 'baixa'} (${q.c > 0 ? '+' : ''}${q.c} cents).`); if (ok) box.lastElementChild.textContent += ` Diferença: ${q.c > 0 ? '+' : ''}${q.c} cents.`; }));
        return;
      }
      box.innerHTML = `<p>${q.tipo === 'iv' ? 'Que intervalo é este?' : q.tipo === 'ac' ? 'Que acorde é este?' : 'Que escala é esta?'}</p><div class="grade" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr))">${q.ops.map(([k, n]) => `<button class="opc" type="button" data-k="${k}">${esc(n)}</button>`).join('')}</div>`;
      $$('[data-k]', box).forEach((b) => (b.onclick = () => {
        if (st.resp) return;
        const ok = String(q.c) === b.dataset.k; b.classList.add(ok ? 'certa' : 'errada');
        const certo = q.ops.find(([k]) => String(k) === String(q.c));
        if (!ok) $$('[data-k]', box).find((x) => x.dataset.k === String(q.c)).classList.add('certa');
        fim(ok, 'Era: ' + certo[1] + '.');
        if (q.tipo === 'ac' && !ok) { q.arp = true; }
      }));
    }
    const mostra = () => { $('#ov-c-dir').hidden = st.modo !== 'intervalos'; placar(); $('#ov-q').innerHTML = '<p class="sutil">Clique em “Nova questão”.</p>'; st.q = null; };
    $('#ov-modo').onchange = (e) => { st.modo = e.target.value; mostra(); };
    $('#ov-dir').onchange = (e) => { st.dir = e.target.value; };
    $('#ov-niv').onchange = (e) => { st.nivel = e.target.value; };
    $('#ov-novo').onclick = nova;
    $('#ov-rep').onclick = toca;
    mostra();
    void inst;
  };

  // ======================= ROTINA DE ESTUDO =======================
  function blocosRotina(min, nivel, I) {
    const metal = I.familia === 'metal';
    const B = {
      resp: ['Respiração e aquecimento', metal ? 'Respiração 4-4-8 (inspira 4, segura 4, solta 8) × 4; buzz no bocal em sirenes suaves.' : 'Respiração 4-4-8 × 4; sopro em “sss” contínuo; notas na boquilha sozinha (ou boquilha + barrilete, no clarinete).', 'Ar contínuo, sem tensão nos ombros; som de bocal/boquilha estável.'],
      longas: ['Notas longas', nivel === 'iniciante' ? 'Uma nota por respiração, ♩ = 60, 4 tempos cada, nas notas que você já domina.' : 'Notas longas em crescendo–diminuendo (pp → ff → pp), 8 tempos, ♩ = 60, por toda a extensão estudada.', 'Altura parada no afinador (±10 cents) do início ao fim da nota.'],
      afin: ['Afinação', 'Nota de referência (aba Afinador): toque junto e elimine os batimentos. Confira 5 notas no afinador.', 'Batimentos eliminados em até 3 segundos.'],
      art: ['Articulação', nivel === 'iniciante' ? 'Uma nota, 4 semínimas por respiração com “tu”, ♩ = 60.' : 'Escala em staccato, legato e tenuto; grupos de 4 colcheias com “tu-tu-tu-tu”.' + (nivel === 'avancado' ? ' Dupla articulação (tu-ku) e tripla (tu-tu-ku).' : ''), 'Início das notas limpo, sem “ataque de garganta” nem atraso.'],
      esc: ['Escalas e arpejos', nivel === 'iniciante' ? 'As notas novas da aula, subindo e descendo devagar.' : nivel === 'intermediario' ? 'Escala do dia (siga o ciclo das quintas) maior e menores, com arpejo; padrão por terças.' : 'Escala do dia em todos os padrões; arpejos de tétrades; escala cromática em toda a extensão.', 'Sem erros em 3 repetições seguidas no andamento escolhido.'],
      tec: [metal ? 'Flexibilidade labial' : 'Técnica', metal ? 'Ligaduras labiais entre harmônicos (mesma posição/pistos), devagar.' : (nivel === 'avancado' ? 'Harmônicos (overtones), estudo técnico do método do momento, passagens difíceis em laço.' : 'Mudanças de dedos difíceis em laço (ex.: passagem de registro), 10 repetições lentas.'), 'Passagem limpa a ♩ = 60 antes de acelerar.'],
      leit: ['Leitura à primeira vista', 'Um trecho novo por dia (hinário, método, apostila). Antes de tocar: armadura, compasso, ritmo e saltos (30 s de varredura). Toque sem parar.', 'Pulso mantido do início ao fim, mesmo com erros.'],
      ouv: ['Percepção', 'Aba Treino auditivo: intervalos ou ditado melódico.', 'Acerto acima de 80% no nível escolhido.'],
      rep: ['Repertório', 'Peça ou música em estudo: trechos difíceis primeiro, depois do início ao fim.', 'Uma passada inteira gravada, sem parar.'],
      impro: ['Improvisação', nivel === 'iniciante' ? 'Pergunta e resposta com 3 notas sobre um acorde (drone na aba Afinador).' : 'Improviso sobre playback (blues, II–V–I ou louvor). Grave e ouça.', 'Frases com começo, meio e fim; respirações entre as frases.'],
      rev: ['Revisão e registro', 'Ouça a gravação do dia, anote 1 acerto e 1 problema. Registre o tempo de estudo.', 'Anotação feita.'],
    };
    const pesos = {
      20: { resp: 3, longas: 5, art: 3, esc: 4, rep: 3, rev: 2 },
      30: { resp: 3, longas: 6, afin: 2, art: 4, esc: 6, leit: 3, rep: 4, rev: 2 },
      45: { resp: 4, longas: 7, afin: 3, art: 5, esc: 8, tec: 5, leit: 4, rep: 7, rev: 2 },
      60: { resp: 5, longas: 8, afin: 3, art: 6, esc: 10, tec: 6, leit: 5, ouv: 4, rep: 8, impro: 3, rev: 2 },
      90: { resp: 6, longas: 10, afin: 4, art: 8, esc: 14, tec: 10, leit: 8, ouv: 6, rep: 14, impro: 7, rev: 3 },
      120: { resp: 7, longas: 12, afin: 5, art: 10, esc: 18, tec: 14, leit: 10, ouv: 8, rep: 20, impro: 12, rev: 4 },
    }[min];
    return Object.entries(pesos).map(([k, m]) => ({ k, min: m, nome: B[k][0], como: B[k][1], crit: B[k][2] }));
  }
  Ferr.rotina = (el, { inst, E, salvar }) => {
    const I = inst;
    const st = { min: 30, nivel: 'iniciante', ativo: -1, resta: 0, timer: null };
    el.innerHTML = `<div class="vista">${cab('Método de estudo diário', 'Rotina de estudo', 'Cada bloco tem objetivo e critério. Não toque horas sem rumo: siga os blocos, registre e compare semana a semana. Faça pausas de 5 minutos a cada 25–30 minutos (lábios descansam e a qualidade sobe).')}
      <div class="cartao pilha">
        <div class="linha"><label class="campo">Duração<select id="ro-min">${[20, 30, 45, 60, 90, 120].map((m) => `<option ${m === 30 ? 'selected' : ''}>${m}</option>`).join('')}</select></label>
        <label class="campo">Nível<select id="ro-niv"><option value="iniciante">iniciante</option><option value="intermediario">intermediário</option><option value="avancado">avançado</option></select></label>
        <div class="linha" style="margin-left:auto"><button class="btn ouro" type="button" id="ro-ini">▶ Iniciar sessão guiada</button><button class="btn sec" type="button" id="ro-reg">Registrar sem cronômetro</button></div></div>
        <div id="ro-timer" class="mostrador" hidden></div>
        <div id="ro-lista"></div>
      </div>
      <div class="cartao pilha"><h3>Histórico</h3><div id="ro-hist"></div></div></div>`;
    function lista() {
      const bl = blocosRotina(st.min, st.nivel, I);
      $('#ro-lista').innerHTML = bl.map((b, i) => `<div class="bloco-rotina ${i === st.ativo ? 'ativo' : ''}"><div class="min">${b.min}<span class="sutil peq"> min</span></div><div class="pilha" style="gap:2px"><b>${esc(b.nome)}</b><span>${esc(b.como)}</span><span class="peq sutil">Critério: ${esc(b.crit)}</span></div></div>`).join('');
      return bl;
    }
    function hist() {
      const dias = {};
      E.sessoes.forEach((s) => { const d = new Date(s.data).toLocaleDateString('pt-BR'); dias[d] = (dias[d] || 0) + s.min; });
      const ult = []; for (let i = 13; i >= 0; i--) { const d = new Date(Date.now() - i * 864e5); ult.push([d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), dias[d.toLocaleDateString('pt-BR')] || 0]); }
      const mx = Math.max(60, ...ult.map((x) => x[1]));
      const W = 560, Hh = 120, bw = W / 14;
      $('#ro-hist').innerHTML = `<div class="grafico"><svg viewBox="0 0 ${W} ${Hh + 30}" role="img" aria-label="Minutos estudados nos últimos 14 dias">
        ${[0, 0.5, 1].map((f) => `<line x1="0" x2="${W}" y1="${Hh - f * Hh + 4}" y2="${Hh - f * Hh + 4}" stroke="var(--linha)"/><text x="${W}" y="${Hh - f * Hh}" text-anchor="end" font-size="10" fill="var(--sutil)">${Math.round(mx * f)} min</text>`).join('')}
        ${ult.map(([d, m], i) => `<rect x="${i * bw + 6}" y="${Hh - (m / mx) * Hh + 4}" width="${bw - 12}" height="${(m / mx) * Hh}" rx="3" fill="${i === 13 ? 'var(--vinho)' : 'var(--acento)'}"/><text x="${i * bw + bw / 2}" y="${Hh + 22}" text-anchor="middle" font-size="9" fill="var(--sutil)">${d}</text>`).join('')}
        </svg></div><p class="peq sutil">Total nos últimos 14 dias: <b class="num">${ult.reduce((a, x) => a + x[1], 0)}</b> minutos. Constância vale mais que volume: 30 minutos todo dia rendem mais que 3 horas no sábado.</p>`;
    }
    lista(); hist();
    $('#ro-min').onchange = (e) => { st.min = +e.target.value; lista(); };
    $('#ro-niv').onchange = (e) => { st.nivel = e.target.value; lista(); };
    const registrar = (min) => { E.sessoes.push({ data: Date.now(), min, rotina: st.min, inst: I.id }); salvar(); hist(); };
    $('#ro-reg').onclick = () => { registrar(st.min); $('#ro-reg').textContent = 'Registrado ✓'; };
    function tick() {
      const bl = blocosRotina(st.min, st.nivel, I);
      st.resta--;
      if (st.resta <= 0) {
        A.tocarNota(880, 0, 0.3, 0.3, 'puro');
        st.ativo++;
        if (st.ativo >= bl.length) { clearInterval(st.timer); st.timer = null; registrar(st.min); $('#ro-timer').innerHTML = '<h2>Sessão concluída</h2><p>Registrada no histórico. Ouça sua gravação e anote 1 acerto e 1 problema.</p>'; st.ativo = -1; lista(); $('#ro-ini').textContent = '▶ Iniciar sessão guiada'; return; }
        st.resta = bl[st.ativo].min * 60; lista();
      }
      const b = bl[st.ativo];
      $('#ro-timer').innerHTML = `<span class="rotulo">Bloco ${st.ativo + 1} de ${bl.length}</span><h2>${esc(b.nome)}</h2><div class="bpm-grande">${Math.floor(st.resta / 60)}:${String(st.resta % 60).padStart(2, '0')}</div><p style="text-align:center;max-width:60ch">${esc(b.como)}</p><button class="btn sec peq" type="button" id="ro-pula">Próximo bloco →</button>`;
      $('#ro-pula').onclick = () => { st.resta = 1; tick(); };
    }
    $('#ro-ini').onclick = () => {
      if (st.timer) { clearInterval(st.timer); st.timer = null; st.ativo = -1; $('#ro-timer').hidden = true; $('#ro-ini').textContent = '▶ Iniciar sessão guiada'; lista(); return; }
      A.ac();
      st.ativo = 0; st.resta = blocosRotina(st.min, st.nivel, I)[0].min * 60 + 1; $('#ro-timer').hidden = false; $('#ro-ini').textContent = '■ Encerrar sessão';
      lista(); tick(); st.timer = setInterval(tick, 1000);
    };
    limpeza.push(() => { if (st.timer) clearInterval(st.timer); });
  };

  // ======================= AVALIAÇÃO =======================
  const CRITERIOS = [
    ['afinacao', 'Afinação', 'Notas no centro (afinador ±10 cents), ajustes rápidos ao ouvir.'],
    ['sonoridade', 'Sonoridade', 'Som cheio, estável, sem ar escapando, igual em toda a extensão.'],
    ['respiracao', 'Respiração', 'Inspiração rápida e silenciosa, frases completas, apoio constante.'],
    ['embocadura', 'Embocadura', 'Firme sem morder/apertar; resistência para 30+ minutos.'],
    ['articulacao', 'Articulação', 'Ataques limpos; staccato, legato e acentos distintos.'],
    ['digitacao', 'Digitação / vara', 'Dedos (ou vara) precisos, leves e sincronizados com a língua.'],
    ['leitura', 'Leitura', 'Lê notas e ritmos na tonalidade sem parar; primeira vista segura.'],
    ['ritmo', 'Ritmo', 'Pulso firme com metrônomo; subdivisão correta; síncopes no lugar.'],
    ['percepcao', 'Percepção', 'Reconhece intervalos, acordes e tira melodias de ouvido.'],
    ['tecnica', 'Técnica', 'Escalas e arpejos limpos, em todas as tonalidades e andamentos-alvo.'],
    ['interpretacao', 'Interpretação', 'Dinâmica, fraseado, estilo e respeito aos sinais da partitura.'],
    ['musicalidade', 'Musicalidade', 'Toca com intenção, conduz frases, ouve o conjunto.'],
    ['improvisacao', 'Improvisação', 'Frases coerentes com a harmonia; motivos desenvolvidos.'],
    ['repertorio', 'Repertório', 'Quantidade e nível de peças prontas para tocar em público.'],
  ];
  const FAIXAS = [['0–2', 'Não executa ou executa com erros constantes.'], ['3–4', 'Executa com muitos erros; precisa parar com frequência.'], ['5–6', 'Executa com erros ocasionais, em andamento reduzido.'], ['7–8', 'Executa bem, com poucos erros e controle consciente.'], ['9–10', 'Executa com segurança e naturalidade, em nível de apresentação.']];
  const ROTEIRO = {
    semanal: 'Grave: 1 nota longa de 8 tempos, a escala da semana subindo e descendo, e 8 compassos da peça em estudo. Analise a gravação na aba Afinador.',
    mensal: 'Grave: notas longas em 3 registros, 3 escalas (maior, menor harmônica e uma nova) com arpejos, um estudo técnico e uma música completa. Faça 20 questões no treino auditivo.',
    trimestral: 'Mini-recital: 2 músicas contrastantes (uma lenta e uma rápida), 1 leitura à primeira vista, escalas sorteadas entre as já estudadas. Toque para alguém e peça uma opinião honesta.',
    semestral: 'Prova completa: todas as escalas do nível, 1 estudo de método publicado, 1 peça de repertório, leitura à primeira vista, ditado melódico e um improviso de 2 minutos. Compare com a gravação do semestre anterior.',
  };
  Ferr.avaliacao = (el, { inst, E, salvar }) => {
    const I = inst;
    const st = { tipo: 'semanal', notas: Object.fromEntries(CRITERIOS.map(([k]) => [k, 5])) };
    el.innerHTML = `<div class="vista">${cab('Acompanhamento', 'Avaliação periódica', 'Dê notas de 0 a 10 com base em uma gravação, não na memória. Seja honesto: a nota serve para guiar o estudo, não para agradar.')}
      <div class="grade">
        <div class="cartao pilha" style="grid-column:1/-1">
          <div class="linha"><label class="campo">Tipo<select id="av-tipo"><option value="semanal">Semanal</option><option value="mensal">Mensal</option><option value="trimestral">Trimestral</option><option value="semestral">Semestral</option></select></label><p class="peq aviso" id="av-rot" style="flex:1;min-width:240px"></p></div>
          <div id="av-crit"></div>
          <label class="campo">Observações (o que melhorou, o que travou)<textarea id="av-obs"></textarea></label>
          <div class="linha"><button class="btn ouro" type="button" id="av-salvar">Salvar avaliação</button><span class="peq sutil" id="av-ok"></span></div>
        </div>
        <div class="cartao pilha"><h3>Critérios das notas</h3>${window.H.tabela(['Nota', 'Significado'], FAIXAS)}</div>
        <div class="cartao pilha"><h3>Evolução da média</h3><div id="av-graf"></div></div>
      </div>
      <div class="cartao pilha"><h3>Avaliações registradas — ${esc(I.nome)}</h3><div id="av-hist"></div></div></div>`;
    const rot = () => { $('#av-rot').innerHTML = '<b>Roteiro:</b> ' + ROTEIRO[st.tipo]; };
    rot();
    $('#av-tipo').onchange = (e) => { st.tipo = e.target.value; rot(); };
    $('#av-crit').innerHTML = CRITERIOS.map(([k, n, d]) => `<div class="crit"><div><b>${n}</b><br><span class="peq sutil">${d}</span></div><input type="range" min="0" max="10" value="5" data-k="${k}" aria-label="${n}"><b class="num" id="av-v-${k}">5</b></div>`).join('');
    $$('#av-crit [data-k]').forEach((r) => (r.oninput = () => { st.notas[r.dataset.k] = +r.value; $('#av-v-' + r.dataset.k).textContent = r.value; }));
    function hist() {
      const lista = E.avaliacoes.filter((a) => a.inst === I.id);
      if (!lista.length) { $('#av-hist').innerHTML = '<p class="sutil">Nenhuma avaliação ainda. Faça a primeira hoje para ter um ponto de partida.</p>'; $('#av-graf').innerHTML = '<p class="sutil">O gráfico aparece a partir da 2ª avaliação.</p>'; return; }
      const med = (a) => Object.values(a.notas).reduce((x, y) => x + y, 0) / Object.values(a.notas).length;
      const ult = lista[lista.length - 1], ant = lista[lista.length - 2];
      $('#av-hist').innerHTML = window.H.tabela(['Critério', 'Atual', 'Anterior', 'Variação'], CRITERIOS.map(([k, n]) => {
        const a = ult.notas[k], b = ant ? ant.notas[k] : null, dv = b == null ? '' : a - b;
        return [n, `<b class="num">${a}</b>`, b == null ? '—' : `<span class="num">${b}</span>`, dv === '' ? '—' : `<span class="chip ${dv > 0 ? 'ok' : dv < 0 ? 'vinho' : ''} num">${dv > 0 ? '+' : ''}${dv}</span>`];
      })) + `<p class="peq sutil">Últimas: ${lista.slice(-6).reverse().map((a) => `${new Date(a.data).toLocaleDateString('pt-BR')} (${a.tipo}) média ${med(a).toFixed(1)}`).join(' · ')}</p>
        <p class="peq">Foco sugerido: <b>${CRITERIOS.filter(([k]) => ult.notas[k] === Math.min(...Object.values(ult.notas))).map((c) => c[1]).join(', ')}</b> — o critério mais baixo trava os outros.</p>`;
      if (lista.length < 2) { $('#av-graf').innerHTML = '<p class="sutil">O gráfico aparece a partir da 2ª avaliação.</p>'; return; }
      const W = 480, Hh = 140, pts = lista.slice(-12);
      const x = (i) => 24 + (i / (pts.length - 1)) * (W - 48), y = (vv) => 10 + (1 - vv / 10) * Hh;
      $('#av-graf').innerHTML = `<div class="grafico"><svg viewBox="0 0 ${W} ${Hh + 30}" role="img" aria-label="Média das avaliações">
        ${[0, 5, 10].map((vv) => `<line x1="20" x2="${W}" y1="${y(vv)}" y2="${y(vv)}" stroke="var(--linha)"/><text x="16" y="${y(vv) + 4}" text-anchor="end" font-size="10" fill="var(--sutil)">${vv}</text>`).join('')}
        <path d="M${pts.map((a, i) => `${x(i)},${y(med(a))}`).join(' L')} L${x(pts.length - 1)},${y(0)} L${x(0)},${y(0)} Z" fill="var(--acento-suave)"/>
        <polyline points="${pts.map((a, i) => `${x(i)},${y(med(a))}`).join(' ')}" fill="none" stroke="var(--acento)" stroke-width="2.5"/>
        ${pts.map((a, i) => `<circle cx="${x(i)}" cy="${y(med(a))}" r="${i === pts.length - 1 ? 5 : 3}" fill="${i === pts.length - 1 ? 'var(--vinho)' : 'var(--acento)'}"/>`).join('')}
        <text x="${x(pts.length - 1)}" y="${y(med(pts[pts.length - 1])) - 10}" text-anchor="end" font-size="11" font-weight="700" fill="var(--tinta)">${med(pts[pts.length - 1]).toFixed(1)}</text>
        <text x="${x(0)}" y="${Hh + 28}" font-size="10" fill="var(--sutil)">${new Date(pts[0].data).toLocaleDateString('pt-BR')}</text><text x="${x(pts.length - 1)}" y="${Hh + 28}" text-anchor="end" font-size="10" fill="var(--sutil)">${new Date(pts[pts.length - 1].data).toLocaleDateString('pt-BR')}</text></svg></div>`;
    }
    $('#av-salvar').onclick = () => {
      E.avaliacoes.push({ data: Date.now(), tipo: st.tipo, inst: I.id, notas: Object.assign({}, st.notas), obs: $('#av-obs').value });
      salvar(); $('#av-ok').textContent = 'Avaliação salva.'; hist();
    };
    hist();
  };

  // ======================= REPERTÓRIO =======================
  Ferr.repertorio = (el, { inst, E, salvar }) => {
    const I = inst;
    E.rep = E.rep || {};
    const marc = (E.rep[I.id] = E.rep[I.id] || {});
    const R = window.Repertorio;
    const lista = R.para(I);
    const NIV = ['iniciante', 'basico', 'intermediario', 'intAvancado', 'avancado', 'profissional'];
    const NOME = { iniciante: 'Iniciante', basico: 'Básico', intermediario: 'Intermediário', intAvancado: 'Intermediário avançado', avancado: 'Avançado', profissional: 'Profissional' };
    const st = { tipo: 'todos' };
    el.innerHTML = `<div class="vista">${cab('Repertório e estudos', 'Repertório progressivo', `Métodos, estudos e peças reais para ${esc(I.nomeMin)}, por nível. Os títulos são referências para você procurar a edição publicada (respeite os direitos autorais: compre ou use bibliotecas). Exercícios criados por este app estão marcados como “original”.`)}
      <div class="linha" id="rp-filtro">${['todos', 'método', 'estudo', 'peça', 'jazz', 'brasileira', 'gospel'].map((t) => `<button class="btn peq ${t === 'todos' ? '' : 'sec'}" type="button" data-t="${t}">${t}</button>`).join('')}</div>
      <div id="rp-lista" class="grade"></div>
      <div class="cartao pilha"><h3>Como estudar uma peça nova</h3><ol>
        <li><b>Ouça</b> duas ou três gravações de referência antes de tocar.</li><li><b>Analise:</b> tonalidade, forma (A–B–A…), trechos difíceis, respirações.</li>
        <li><b>Divida</b> em trechos de 4–8 compassos. Comece pelos difíceis.</li><li><b>Metrônomo lento</b> (60% do andamento final); suba 4 BPM por dia quando estiver limpo.</li>
        <li><b>Junte</b> os trechos; toque do início ao fim sem parar.</li><li><b>Interprete:</b> dinâmicas, articulação de estilo, fraseado.</li><li><b>Grave</b> e corrija. Depois, toque para alguém.</li></ol></div></div>`;
    function desenha() {
      $$('#rp-filtro [data-t]').forEach((b) => b.classList.toggle('sec', b.dataset.t !== st.tipo));
      $('#rp-lista').innerHTML = NIV.map((n) => {
        const it = lista.filter((x) => x.n === n && (st.tipo === 'todos' || x.t === st.tipo));
        if (!it.length) return '';
        return `<div class="cartao pilha"><span class="nivel">${NOME[n]}</span><div>${it.map((x) => {
          const k = x.titulo; const s = marc[k] || '';
          return `<div class="rep-item"><div><b>${esc(x.titulo)}</b><br><span class="peq sutil">${esc(x.autor)}${x.obs ? ' · ' + esc(x.obs) : ''}</span></div>
            <div class="pilha" style="gap:4px;align-items:flex-end"><span class="chip ${x.t === 'gospel' ? 'vinho' : x.t === 'método' || x.t === 'estudo' ? 'ouro' : ''}">${esc(x.t)}</span>
            <select data-rk="${esc(k)}" aria-label="Situação" style="font-size:.8rem;padding:3px 6px"><option value="" ${!s ? 'selected' : ''}>—</option><option value="estudando" ${s === 'estudando' ? 'selected' : ''}>estudando</option><option value="pronto" ${s === 'pronto' ? 'selected' : ''}>pronto</option></select></div></div>`;
        }).join('')}</div></div>`;
      }).join('');
      $$('[data-rk]', el).forEach((s) => (s.onchange = () => { marc[s.dataset.rk] = s.value; salvar(); }));
    }
    $('#rp-filtro').onclick = (e) => { const b = e.target.closest('[data-t]'); if (b) { st.tipo = b.dataset.t; desenha(); } };
    desenha();
  };

  window.Ferr = Ferr;
})();
