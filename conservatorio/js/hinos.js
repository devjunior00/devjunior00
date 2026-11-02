/* Conservatório de Sopros — Meus hinos: o aluno copia (ou fotografa) um hino do próprio hinário
   e o app transpõe para o seu instrumento, toca e mostra os dedilhados. */
(function () {
  'use strict';
  const M = window.Musica, A = window.Audio2, Ferr = window.Ferr;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const ORIGENS = {
    C: { nome: 'Dó (som real: hinário para coral, órgão, teclado, flauta, violino)', transp: { l: 0, s: 0 } },
    Bb: { nome: 'Si♭ (clarinete, sax soprano/tenor, trompete)', transp: { l: 1, s: 2 } },
    Eb: { nome: 'Mi♭ (sax alto, sax barítono)', transp: { l: 5, s: 9 } },
    F: { nome: 'Fá (trompa)', transp: { l: 4, s: 7 } },
  };
  const HINARIOS = { harpa: 'Harpa Cristã', ccb: 'Hinos de Louvores e Súplicas a Deus (CCB)', outro: 'Outro hinário' };
  const TONS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'];
  const FIG = [[16, 'semibreve', '𝅝'], [8, 'mínima', '𝅗𝅥'], [4, 'semínima', '♩'], [2, 'colcheia', '♪'], [1, 'semicolcheia', '𝅘𝅥𝅯']];

  // exemplo em domínio público
  const EXEMPLOS = [{
    id: 'ex-noite', exemplo: true, titulo: 'Noite Feliz (Stille Nacht)', numero: '', hinario: 'outro', autor: 'Franz Gruber, 1818 — domínio público', origem: 'C', clave: 'treble', compasso: '6/8', tom: 'C', anacruse: 0, bpm: 60,
    notas: 'G4:3 A4:1 G4:2 E4:6 G4:3 A4:1 G4:2 E4:6 D5:4 D5:2 B4:6 C5:4 C5:2 G4:6 A4:4 A4:2 C5:3 B4:1 A4:2 G4:3 A4:1 G4:2 E4:6 A4:4 A4:2 C5:3 B4:1 A4:2 G4:3 A4:1 G4:2 E4:6 D5:4 D5:2 F5:3 D5:1 B4:2 C5:6 E5:6 C5:3 G4:1 E4:2 G4:3 F4:1 D4:2 C4:12',
  }];

  function lista(E) { return (E.hinos || []).concat(EXEMPLOS); }
  function acha(E, id) { return lista(E).find((h) => h.id === id); }

  // converte o hino copiado para a leitura do instrumento
  function paraInstrumento(h, I) {
    const ori = ORIGENS[h.origem] || ORIGENS.C;
    const notasOri = M.melodia(h.notas || '');
    const volta = { l: -ori.transp.l, s: -ori.transp.s };
    const tOri = M.parse(h.tom + '4');
    const tc = M.transpor(tOri, volta);
    const conc = notasOri.map((x) => ({ n: x.n ? M.transpor(x.n, volta) : null, d: x.d }));
    const r = M.tomEscrito(tc, 'maior', I);
    const [lo, hi] = ((I.conf && I.conf.intermediario) || I.faixa).map((x) => M.midi(M.parse(x)));
    let melhor = null;
    [0, 12, -12, 24, -24].forEach((k) => {
      const iv = { l: r.iv.l + 7 * Math.sign(k) * Math.abs(k / 12), s: r.iv.s + k };
      const alt = conc.filter((x) => x.n).map((x) => M.midi(M.transpor(x.n, iv)));
      if (!alt.length) { if (!melhor) melhor = { iv, fora: 0, k }; return; }
      const fora = alt.filter((m) => m < lo || m > hi).length;
      if (!melhor || fora < melhor.fora || (fora === melhor.fora && melhor.k !== 0 && Math.abs(k) < Math.abs(melhor.k))) melhor = { iv, fora, k };
    });
    const tonica = M.transpor(tc, melhor.iv);
    return { tonica, tonicaMaior: tonica, concerto: tc, oitava: melhor.k, notas: conc.map((x) => ({ n: x.n ? M.transpor(x.n, melhor.iv) : null, d: x.d })) };
  }

  // usado pelo gerador de partituras do app
  function gera(id, I) {
    const E = window.App.estado();
    const h = acha(E, id); if (!h) return null;
    const r = paraInstrumento(h, I);
    const info = (I.transp.s ? `escrito em ${M.nomeBR(r.tonica)} maior para ${I.nomeMin} · soa ${M.nomeBR(r.concerto)} maior` : `${M.nomeBR(r.tonica)} maior`) + (r.oitava ? ` · ${r.oitava > 0 ? 'uma oitava acima' : 'uma oitava abaixo'} para caber no instrumento` : '');
    return { notas: r.notas, tonicaMaior: r.tonicaMaior, titulo: (h.numero ? h.numero + ' · ' : '') + h.titulo, info, compasso: h.compasso, anacruse: h.anacruse || 0, bpm: h.bpm || 72 };
  }

  // ======================= TELA =======================
  Ferr.hinos = (el, ctx) => {
    const { E, salvar, inst } = ctx, I = inst;
    E.hinos = E.hinos || [];
    let atual = null; // hino em edição
    const st = { dur: 4, ponto: false, acc: 'auto', oit: 4 };

    function telaLista() {
      el.innerHTML = `<div class="vista">
        <div class="ferr-cab"><span class="rotulo">Harpa Cristã · CCB · outros hinários</span><h1>Meus hinos</h1>
          <p>Copie o hino do seu hinário — ou fotografe a página e deixe o professor ler — e o app mostra a partitura <b>transposta para o ${esc(I.nomeMin)}</b>, toca a melodia e desenha onde pôr os dedos em cada nota. Os hinos ficam guardados só para você.</p></div>
        <div class="linha"><button class="btn ouro grande" type="button" id="hn-novo">+ Copiar um hino</button></div>
        <div class="hub">${lista(E).map((h) => `<button class="hub-card hino-item" type="button" data-h="${esc(h.id)}"><span class="aula-num">${esc(h.numero || '♪')}</span><div><b>${esc(h.titulo || 'Sem título')}</b><p>${esc(HINARIOS[h.hinario] || '')}${h.exemplo ? ' · exemplo' : ''} · ${esc(h.compasso)} · ${M.melodia(h.notas || '').length} notas</p></div></button>`).join('')}</div>
        <div class="cartao pilha"><h3>Por que os hinos não vêm prontos?</h3><p class="peq">O hinário da Congregação Cristã no Brasil é da própria igreja, que não autoriza gravações nem reprodução dos hinos; a Harpa Cristã é editada pela CPAD. Por respeito a isso, o app não traz os hinos desses hinários — mas transforma o <b>seu</b> hinário numa partitura interativa para estudo pessoal. O exemplo “Noite Feliz” é de domínio público.</p></div></div>`;
      $('#hn-novo').onclick = () => editar(null);
      $$('[data-h]', el).forEach((b) => (b.onclick = () => ver(b.dataset.h)));
    }

    function ver(id) {
      const h = acha(E, id); if (!h) return telaLista();
      const r = paraInstrumento(h, I);
      const distintas = [];
      r.notas.forEach((x) => { if (x.n) { const s = x.n.l + (x.n.a === 1 ? '#' : x.n.a === -1 ? 'b' : x.n.a === 2 ? '##' : x.n.a === -2 ? 'bb' : '') + x.n.o; if (!distintas.includes(s)) distintas.push(s); } });
      distintas.sort((a, b) => M.midi(M.parse(a)) - M.midi(M.parse(b)));
      el.innerHTML = `<div class="vista">
        <a href="#hinos" class="peq" id="hn-volta">← Meus hinos</a>
        <div class="ferr-cab"><span class="rotulo">${esc(HINARIOS[h.hinario] || '')}${h.numero ? ' · nº ' + esc(h.numero) : ''}</span><h1>${esc(h.titulo)}</h1>${h.autor ? `<p class="sutil">${esc(h.autor)}</p>` : ''}</div>
        ${window.H.pauta({ tipo: 'hino', id: h.id })}
        <p class="peq sutil">Copiado de uma partitura em ${esc(ORIGENS[h.origem].nome.split(' (')[0])}${h.voz ? ' · voz: ' + esc(h.voz) : ''}. Confira sempre com o seu hinário: o que vale é a partitura original.</p>
        <section class="cartao pilha"><h2>${I.sub === 'trombone' ? 'Posições' : I.sub === 'trompete' ? 'Pistos' : 'Dedilhados'} das notas deste hino</h2>
          <p class="peq sutil">Da mais grave para a mais aguda. Treine as notas difíceis antes de tocar o hino inteiro.</p>${window.H.dedos(I, distintas)}</section>
        <section class="cartao pilha"><h3>Como estudar este hino</h3><ol>
          <li>Leia: tonalidade, compasso, anacruse, respirações.</li><li>Cante a melodia (ou ouça no botão ▶).</li>
          <li>Toque devagar (♩ = 60), frase por frase; depois junte.</li><li>Suba até o andamento do culto. Toque a introdução (última frase) e o final com <i>rit.</i></li>
          <li>Se for a 4 vozes, estude também a voz vizinha da sua: isso afina o ouvido.</li></ol></section>
        ${h.exemplo ? '' : '<div class="linha"><button class="btn sec" type="button" id="hn-edita">Editar</button><button class="btn sec" type="button" id="hn-apaga">Apagar</button><span id="hn-conf"></span></div>'}</div>`;
      window.renderPautas(el); voltaLinks(); window.scrollTo(0, 0);
      const ed = $('#hn-edita'); if (ed) ed.onclick = () => editar(h);
      const ap = $('#hn-apaga');
      if (ap) ap.onclick = () => {
        $('#hn-conf').innerHTML = '<span class="peq">Apagar mesmo? </span><button class="btn peq" type="button" id="hn-sim">Sim, apagar</button>';
        $('#hn-sim').onclick = () => { E.hinos = E.hinos.filter((x) => x.id !== h.id); salvar(); telaLista(); };
      };
    }

    function editar(h) {
      atual = h ? JSON.parse(JSON.stringify(h)) : { id: 'h' + Date.now().toString(36), titulo: '', numero: '', hinario: 'harpa', origem: 'C', clave: 'treble', compasso: '4/4', tom: 'C', anacruse: 0, bpm: 72, voz: '', notas: '' };
      if (h && h.exemplo) { atual.id = 'h' + Date.now().toString(36); delete atual.exemplo; }
      st.oit = atual.clave === 'bass' ? 3 : 4;
      el.innerHTML = `<div class="vista">
        <a href="#hinos" class="peq">← Meus hinos</a>
        <div class="ferr-cab"><span class="rotulo">Copiar hino</span><h1>${h ? 'Editar hino' : 'Copiar um hino'}</h1>
          <p>Copie a partitura <b>exatamente como está no seu hinário</b> (mesma clave, armadura e notas). O app faz a transposição para o ${esc(I.nomeMin)} depois.</p></div>
        <section class="cartao pilha" id="hn-foto-box" hidden><h3>Ler pela foto</h3>
          <p class="peq">Fotografe a página do hinário bem de frente, com boa luz. O professor lê a melodia e preenche as notas para você <b>conferir</b> — leitura por foto pode errar, revise nota por nota.</p>
          <div class="linha"><label class="campo">Qual pauta/voz ler?<select id="hn-foto-voz"><option value="soprano">soprano (melodia)</option><option value="contralto">contralto</option><option value="tenor">tenor</option><option value="baixo">baixo</option><option value="a única pauta">pauta única</option></select></label><input type="file" id="hn-foto" accept="image/*"></div><p class="peq sutil" id="hn-foto-msg"></p></section>
        <section class="cartao pilha">
          <div class="grade" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))">
            <label class="campo">Título<input type="text" id="hn-titulo" value="${esc(atual.titulo)}" placeholder="Ex.: hino 15"></label>
            <label class="campo">Número<input type="text" id="hn-numero" value="${esc(atual.numero)}"></label>
            <label class="campo">Hinário<select id="hn-hinario">${Object.entries(HINARIOS).map(([k, v]) => `<option value="${k}" ${atual.hinario === k ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
            <label class="campo">A partitura que copio é em<select id="hn-origem">${Object.entries(ORIGENS).map(([k, v]) => `<option value="${k}" ${atual.origem === k ? 'selected' : ''}>${v.nome}</option>`).join('')}</select></label>
            <label class="campo">Clave da pauta<select id="hn-clave"><option value="treble" ${atual.clave === 'treble' ? 'selected' : ''}>clave de Sol</option><option value="bass" ${atual.clave === 'bass' ? 'selected' : ''}>clave de Fá</option></select></label>
            <label class="campo">Armadura<select id="hn-tom">${TONS.map((t) => { const n = M.parse(t + '4'); return `<option value="${t}" ${atual.tom === t ? 'selected' : ''}>${M.nomeBR(n)} maior / ${M.nomeBR(M.grau(n, 9, 5))} menor — ${M.descArmadura(n).split(' (')[0]}</option>`; }).join('')}</select></label>
            <label class="campo">Compasso<select id="hn-compasso">${['2/4', '3/4', '4/4', '6/8', '2/2', '3/8', '9/8', '12/8'].map((c) => `<option ${atual.compasso === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
            <label class="campo">Anacruse (tempo antes do 1º compasso)<select id="hn-anac">${[[0, 'não tem'], [2, '½ tempo'], [4, '1 tempo'], [6, '1½ tempo'], [8, '2 tempos'], [12, '3 tempos']].map(([v, t]) => `<option value="${v}" ${+atual.anacruse === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
            <label class="campo">Voz (opcional)<input type="text" id="hn-voz" value="${esc(atual.voz || '')}" placeholder="soprano, contralto…"></label>
            <label class="campo">Andamento ♩<input type="number" id="hn-bpm" value="${atual.bpm || 72}" min="30" max="200"></label>
          </div></section>
        <section class="cartao pilha">
          <div class="linha" style="justify-content:space-between"><h3>Notas</h3><span class="chip" id="hn-cont"></span></div>
          <div class="pauta"><div class="abc" id="hn-prev"></div></div>
          <div class="pilha" style="gap:10px">
            <div class="seg" id="hn-dur">${FIG.map(([d, n, s]) => `<button type="button" data-d="${d}" aria-pressed="${d === st.dur}" title="${n}">${s} ${n}</button>`).join('')}<button type="button" data-ponto aria-pressed="false" title="ponto de aumento">• ponto</button></div>
            <div class="seg" id="hn-acc"><button type="button" data-a="auto" aria-pressed="true">pela armadura</button><button type="button" data-a="-1" aria-pressed="false">♭</button><button type="button" data-a="0" aria-pressed="false">♮</button><button type="button" data-a="1" aria-pressed="false">♯</button></div>
            <div class="linha"><span class="peq">Oitava:</span><button class="btn peq sec" type="button" id="hn-oit-m">▼</button><b class="num" id="hn-oit"></b><button class="btn peq sec" type="button" id="hn-oit-p">▲</button><span class="peq sutil" id="hn-oit-dica"></span></div>
            <div class="teclas-nota" id="hn-teclas">${['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((l) => `<button type="button" data-l="${l}"><b>${M.SOLF[l]}</b><small>${l}</small></button>`).join('')}</div>
            <div class="linha"><button class="btn sec" type="button" id="hn-pausa">𝄽 Pausa</button><button class="btn sec" type="button" id="hn-volta1">⌫ Apagar última</button><button class="btn sec" type="button" id="hn-ouvir">▶ Ouvir</button></div>
          </div>
          <details><summary class="peq">Ver/editar como texto</summary><p class="peq sutil">Formato: nota+oitava:duração em semicolcheias (semínima = 4). Pausa = r. Ex.: <span class="num">G4:4 A4:4 B4:8 r:4</span></p><textarea id="hn-txt"></textarea></details>
        </section>
        <div class="linha"><button class="btn ouro grande" type="button" id="hn-salvar">Salvar hino</button><a class="btn sec" href="#hinos">Cancelar</a><span class="peq sutil" id="hn-msg"></span></div></div>`;
      const campos = ['titulo', 'numero', 'hinario', 'origem', 'clave', 'tom', 'compasso', 'anac', 'voz', 'bpm'];
      function lerCampos() {
        atual.titulo = $('#hn-titulo').value.trim(); atual.numero = $('#hn-numero').value.trim(); atual.hinario = $('#hn-hinario').value;
        atual.origem = $('#hn-origem').value; atual.clave = $('#hn-clave').value; atual.tom = $('#hn-tom').value; atual.compasso = $('#hn-compasso').value;
        atual.anacruse = +$('#hn-anac').value; atual.voz = $('#hn-voz').value.trim(); atual.bpm = +$('#hn-bpm').value || 72;
      }
      function tokens() { return (atual.notas || '').split(/\s+/).filter(Boolean); }
      function prev() {
        let notas = []; try { notas = M.melodia(atual.notas || ''); } catch (e) { notas = []; }
        $('#hn-cont').textContent = notas.length + ' notas';
        $('#hn-oit').textContent = st.oit; $('#hn-oit-dica').textContent = `(Dó${st.oit} = ${st.oit === 4 ? 'Dó central' : st.oit < 4 ? 'abaixo do Dó central' : 'acima do Dó central'})`;
        const abc = M.abc({ notas: notas.length ? notas : [{ n: null, d: 16 }], tonicaMaior: M.parse(atual.tom + '4'), compasso: atual.compasso, clave: atual.clave, anacruse: atual.anacruse });
        if (window.ABCJS) window.ABCJS.renderAbc($('#hn-prev'), abc, { responsive: 'resize', staffwidth: 680, foregroundColor: 'currentColor' });
        if (document.activeElement !== $('#hn-txt')) $('#hn-txt').value = atual.notas || '';
      }
      campos.forEach((c) => { const x = $('#hn-' + c); x.onchange = () => { lerCampos(); if (c === 'clave') st.oit = atual.clave === 'bass' ? 3 : 4; prev(); }; });
      $('#hn-dur').onclick = (e) => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.hasAttribute('data-ponto')) { st.ponto = !st.ponto; b.setAttribute('aria-pressed', st.ponto); return; }
        st.dur = +b.dataset.d; $$('#hn-dur [data-d]').forEach((x) => x.setAttribute('aria-pressed', x === b));
      };
      $('#hn-acc').onclick = (e) => { const b = e.target.closest('[data-a]'); if (!b) return; st.acc = b.dataset.a; $$('#hn-acc [data-a]').forEach((x) => x.setAttribute('aria-pressed', x === b)); };
      $('#hn-oit-m').onclick = () => { st.oit = Math.max(1, st.oit - 1); prev(); };
      $('#hn-oit-p').onclick = () => { st.oit = Math.min(7, st.oit + 1); prev(); };
      const dur = () => Math.round(st.dur * (st.ponto ? 1.5 : 1)) || 1;
      const add = (t) => { atual.notas = tokens().concat([t]).join(' '); prev(); };
      $('#hn-teclas').onclick = (e) => {
        const b = e.target.closest('[data-l]'); if (!b) return;
        const l = b.dataset.l;
        const a = st.acc === 'auto' ? (M.armaduraMaior(M.parse(atual.tom + '4'))[l] || 0) : +st.acc;
        const s = l + (a === 1 ? '#' : a === -1 ? 'b' : '') + st.oit;
        add(s + ':' + dur());
        const m = M.midi(M.parse(s)) - (ORIGENS[atual.origem].transp.s); A.tocarSequencia([{ midi: m, d: 4 }], 90);
        if (st.acc !== 'auto') { st.acc = 'auto'; $$('#hn-acc [data-a]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.a === 'auto')); }
        if (st.ponto) { st.ponto = false; $('#hn-dur [data-ponto]').setAttribute('aria-pressed', 'false'); }
      };
      $('#hn-pausa').onclick = () => add('r:' + dur());
      $('#hn-volta1').onclick = () => { atual.notas = tokens().slice(0, -1).join(' '); prev(); };
      $('#hn-txt').oninput = (e) => { atual.notas = e.target.value.trim(); try { M.melodia(atual.notas); $('#hn-msg').textContent = ''; prev(); } catch (err) { $('#hn-msg').textContent = 'Texto com nota inválida: ' + err.message.replace('nota inválida: ', ''); } };
      $('#hn-ouvir').onclick = () => { try { const t = ORIGENS[atual.origem].transp.s; A.tocarSequencia(M.melodia(atual.notas).map((x) => ({ midi: x.n ? M.midi(x.n) - t : null, d: x.d })), +$('#hn-bpm').value || 72); } catch (e) { /* texto inválido */ } };
      $('#hn-salvar').onclick = () => {
        lerCampos();
        try { if (!M.melodia(atual.notas).length) throw new Error('vazio'); } catch (e) { $('#hn-msg').textContent = 'Coloque pelo menos uma nota.'; return; }
        if (!atual.titulo) atual.titulo = atual.numero ? 'Hino ' + atual.numero : 'Hino sem título';
        const i = E.hinos.findIndex((x) => x.id === atual.id);
        if (i >= 0) E.hinos[i] = atual; else E.hinos.push(atual);
        salvar(); ver(atual.id);
      };
      prev(); voltaLinks(); window.scrollTo(0, 0);
      fotoPrepara();
    }

    async function fotoPrepara() {
      let sample = null;
      try { if (window.claude && window.claude.use) sample = await window.claude.use('sample'); } catch (e) { sample = null; }
      if (!sample) return;
      let lim = null; try { lim = await sample.limits(); } catch (e) { lim = null; }
      if (!lim || !lim.images) return;
      const box = $('#hn-foto-box'); if (!box) return;
      box.hidden = false;
      $('#hn-foto').accept = lim.images.mediaTypes ? lim.images.mediaTypes.join(',') : 'image/*';
      $('#hn-foto').onchange = async (e) => {
        const f = e.target.files[0]; if (!f) return;
        const msg = $('#hn-foto-msg'); msg.textContent = 'Lendo a partitura…';
        const voz = $('#hn-foto-voz').value;
        const pedido = `A imagem é a foto de uma página de hinário com partitura, enviada por um estudante para estudo pessoal. Transcreva SOMENTE a melodia da pauta/voz "${voz}", do início ao fim do hino (sem repetir estrofes), exatamente como está escrita (mesma clave, armadura e oitava).
Responda apenas com JSON neste formato:
{"titulo": "título ou número visível, ou vazio", "numero": "número do hino, se houver", "clave": "treble" ou "bass", "armadura": tônica MAIOR correspondente à armadura usando uma destas: ${TONS.join(', ')}, "compasso": "ex. 4/4", "anacruse": duração da anacruse em semicolcheias (0 se não houver), "notas": "tokens separados por espaço no formato LetraAcidenteOitava:duração, com duração em semicolcheias (semibreve 16, mínima 8, semínima 4, colcheia 2, semicolcheia 1, pontuadas somam metade), acidente # ou b só quando a nota soa alterada (considerando a armadura e os acidentes do compasso), pausa r:duração. Dó central = C4.", "duvidas": "trechos ilegíveis ou incertos, em português"}
Não invente notas: se algo estiver ilegível, indique em "duvidas".`;
        try {
          const r = await sample.json(pedido, { images: [f], modelTier: 'complex' });
          if (!r || !r.notas) throw new Error('sem notas');
          M.melodia(r.notas);
          Object.assign(atual, { titulo: r.titulo || atual.titulo, numero: r.numero || atual.numero, clave: r.clave === 'bass' ? 'bass' : 'treble', tom: TONS.includes(r.armadura) ? r.armadura : atual.tom, compasso: r.compasso || atual.compasso, anacruse: +r.anacruse || 0, notas: r.notas, voz: voz === 'a única pauta' ? '' : voz });
          const salvo = Object.assign({}, atual);
          editar(salvo);
          const m2 = $('#hn-msg'); if (m2) m2.innerHTML = `<b>Leitura feita.</b> Confira nota por nota com o hinário antes de salvar.${r.duvidas ? ' Dúvidas: ' + esc(r.duvidas) : ''}`;
        } catch (err) {
          msg.textContent = err && err.code === 'rate_limited' ? 'Muitas leituras seguidas. Aguarde um minuto.' : 'Não consegui ler esta foto. Tente uma foto mais nítida e de frente, ou copie as notas pelo teclado.';
        }
      };
    }

    function voltaLinks() { $$('a[href="#hinos"]', el).forEach((a) => (a.onclick = (e) => { e.preventDefault(); telaLista(); window.scrollTo(0, 0); })); }
    const alvo = (location.hash.split('-')[1] || '');
    if (alvo && acha(E, alvo)) ver(alvo); else telaLista();
  };

  window.Hinos = { gera, paraInstrumento, EXEMPLOS };
})();
