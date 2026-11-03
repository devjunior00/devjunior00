/* Conservatório de Sopros — motor de teoria musical
   Notas grafadas (letra + acidente + oitava), escalas, acordes,
   transposição por instrumento e geração de partitura em ABC. */
(function () {
  'use strict';

  const LETRAS = 'CDEFGAB';
  const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const SOLF = { C: 'Dó', D: 'Ré', E: 'Mi', F: 'Fá', G: 'Sol', A: 'Lá', B: 'Si' };
  const ACID = { '-2': '𝄫', '-1': '♭', '0': '', '1': '♯', '2': '𝄪' };

  // ---------- notas grafadas ----------
  // nota = { l: 'E', a: -1, o: 4 }  (Mi♭4)
  function parse(s) {
    const m = /^([A-Ga-g])(##|bb|#|b|x)?(-?\d)?$/.exec(String(s).trim());
    if (!m) throw new Error('nota inválida: ' + s);
    const a = { '#': 1, '##': 2, x: 2, b: -1, bb: -2 }[m[2]] || 0;
    return { l: m[1].toUpperCase(), a, o: m[3] === undefined ? 4 : +m[3] };
  }
  const midi = (n) => (n.o + 1) * 12 + PC[n.l] + n.a;
  const pc = (n) => (((PC[n.l] + n.a) % 12) + 12) % 12;

  function deMidi(m, bemol) {
    const nomes = bemol
      ? [['C', 0], ['D', -1], ['D', 0], ['E', -1], ['E', 0], ['F', 0], ['G', -1], ['G', 0], ['A', -1], ['A', 0], ['B', -1], ['B', 0]]
      : [['C', 0], ['C', 1], ['D', 0], ['D', 1], ['E', 0], ['F', 0], ['F', 1], ['G', 0], ['G', 1], ['A', 0], ['A', 1], ['B', 0]];
    const [l, a] = nomes[((m % 12) + 12) % 12];
    return { l, a, o: Math.floor(m / 12) - 1 };
  }

  // transpõe uma nota grafada por um intervalo {l: passos de letra, s: semitons}
  function transpor(n, iv) {
    const li = LETRAS.indexOf(n.l) + iv.l;
    const l = LETRAS[((li % 7) + 7) % 7];
    const alvo = midi(n) + iv.s;
    // oitava pela letra
    let o = n.o + Math.floor(li / 7);
    let a = alvo - ((o + 1) * 12 + PC[l]);
    return { l, a, o };
  }

  const nomeInt = (n) => n.l + (ACID[n.a] || '');
  const nomeBR = (n) => SOLF[n.l] + (ACID[n.a] || '');
  const nomeComp = (n) => nomeBR(n) + ' (' + nomeInt(n) + ')';
  const nomeOit = (n) => nomeBR(n) + n.o;

  // ---------- tonalidades ----------
  const T_MAIORES = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
  const CICLO = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
  const CICLO_MENOR = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

  // tipos de escala: [semitons, passo de letra]
  const ESCALAS = {
    maior: { nome: 'Maior (jônio)', g: [[0, 0], [2, 1], [4, 2], [5, 3], [7, 4], [9, 5], [11, 6]], ref: 'maior' },
    menorNat: { nome: 'Menor natural (eólio)', g: [[0, 0], [2, 1], [3, 2], [5, 3], [7, 4], [8, 5], [10, 6]], ref: 'menor' },
    menorHarm: { nome: 'Menor harmônica', g: [[0, 0], [2, 1], [3, 2], [5, 3], [7, 4], [8, 5], [11, 6]], ref: 'menor' },
    menorMel: { nome: 'Menor melódica (sobe melódica, desce natural)', g: [[0, 0], [2, 1], [3, 2], [5, 3], [7, 4], [9, 5], [11, 6]], desce: [[0, 0], [2, 1], [3, 2], [5, 3], [7, 4], [8, 5], [10, 6]], ref: 'menor' },
    menorMelJazz: { nome: 'Menor melódica (jazz: igual subindo e descendo)', g: [[0, 0], [2, 1], [3, 2], [5, 3], [7, 4], [9, 5], [11, 6]], ref: 'menor' },
    dorico: { nome: 'Dórico', g: [[0, 0], [2, 1], [3, 2], [5, 3], [7, 4], [9, 5], [10, 6]], ref: 'menor' },
    frigio: { nome: 'Frígio', g: [[0, 0], [1, 1], [3, 2], [5, 3], [7, 4], [8, 5], [10, 6]], ref: 'menor' },
    lidio: { nome: 'Lídio', g: [[0, 0], [2, 1], [4, 2], [6, 3], [7, 4], [9, 5], [11, 6]], ref: 'maior' },
    mixolidio: { nome: 'Mixolídio', g: [[0, 0], [2, 1], [4, 2], [5, 3], [7, 4], [9, 5], [10, 6]], ref: 'maior' },
    locrio: { nome: 'Lócrio', g: [[0, 0], [1, 1], [3, 2], [5, 3], [6, 4], [8, 5], [10, 6]], ref: 'menor' },
    pentaMaior: { nome: 'Pentatônica maior', g: [[0, 0], [2, 1], [4, 2], [7, 4], [9, 5]], ref: 'maior' },
    pentaMenor: { nome: 'Pentatônica menor', g: [[0, 0], [3, 2], [5, 3], [7, 4], [10, 6]], ref: 'menor' },
    blues: { nome: 'Blues (menor)', g: [[0, 0], [3, 2], [5, 3], [6, 4], [7, 4], [10, 6]], ref: 'menor' },
    bluesMaior: { nome: 'Blues maior', g: [[0, 0], [2, 1], [3, 2], [4, 2], [7, 4], [9, 5]], ref: 'maior' },
    bebopDom: { nome: 'Bebop dominante', g: [[0, 0], [2, 1], [4, 2], [5, 3], [7, 4], [9, 5], [10, 6], [11, 6]], ref: 'maior' },
    dimTS: { nome: 'Diminuta (tom–semitom)', g: [[0, 0], [2, 1], [3, 2], [5, 3], [6, 4], [8, 5], [9, 5], [11, 6]], ref: 'menor' },
    dimST: { nome: 'Diminuta dominante (semitom–tom)', g: [[0, 0], [1, 1], [3, 1], [4, 2], [6, 3], [7, 4], [9, 5], [10, 6]], ref: 'maior' },
    tonsInteiros: { nome: 'Tons inteiros (aumentada)', g: [[0, 0], [2, 1], [4, 2], [6, 3], [8, 4], [10, 6]], ref: 'maior' },
    cromatica: { nome: 'Cromática', g: null, ref: 'maior' },
  };

  const ARPEJOS = {
    M: { nome: 'Tríade maior', g: [[0, 0], [4, 2], [7, 4]], cifra: '' },
    m: { nome: 'Tríade menor', g: [[0, 0], [3, 2], [7, 4]], cifra: 'm' },
    dim: { nome: 'Tríade diminuta', g: [[0, 0], [3, 2], [6, 4]], cifra: '°' },
    aum: { nome: 'Tríade aumentada', g: [[0, 0], [4, 2], [8, 4]], cifra: '+' },
    M7: { nome: 'Sétima maior (7M)', g: [[0, 0], [4, 2], [7, 4], [11, 6]], cifra: '7M' },
    d7: { nome: 'Dominante (7)', g: [[0, 0], [4, 2], [7, 4], [10, 6]], cifra: '7' },
    m7: { nome: 'Menor com sétima (m7)', g: [[0, 0], [3, 2], [7, 4], [10, 6]], cifra: 'm7' },
    m7b5: { nome: 'Meio-diminuto (m7♭5)', g: [[0, 0], [3, 2], [6, 4], [10, 6]], cifra: 'm7(♭5)' },
    dim7: { nome: 'Diminuto (°7)', g: [[0, 0], [3, 2], [6, 4], [9, 6]], cifra: '°7' },
    m7M: { nome: 'Menor com 7M', g: [[0, 0], [3, 2], [7, 4], [11, 6]], cifra: 'm(7M)' },
  };

  // nota grafada a partir de tônica + grau
  function grau(t, sem, passo) {
    return transpor(t, { l: passo, s: sem });
  }

  function escalaGrafada(t, tipo, desc) {
    const def = ESCALAS[tipo];
    if (!def.g) {
      const out = [];
      for (let i = 0; i < 12; i++) out.push(deMidi(midi(t) + i, false));
      return out;
    }
    return (desc && def.desce ? def.desce : def.g).map(([s, p]) => grau(t, s, p));
  }

  // armadura: mapa letra -> acidente, a partir de uma tônica maior grafada
  function armaduraMaior(t) {
    const m = {};
    ESCALAS.maior.g.forEach(([s, p]) => { const n = grau(t, s, p); m[n.l] = n.a; });
    return m;
  }
  function contaAcidentes(arm) { return Object.values(arm).reduce((x, a) => x + Math.abs(a), 0); }

  // relativa maior de uma tônica com referência menor
  function tonicaMaiorDe(t, ref) { return ref === 'menor' ? grau(t, 3, 2) : t; }

  // escolhe grafia enarmônica com menos acidentes (para tonalidades transpostas)
  function simplificaTonica(t, ref) {
    const maior = tonicaMaiorDe(t, ref);
    const arm = armaduraMaior(maior);
    if (contaAcidentes(arm) <= 6 && Math.abs(maior.a) <= 1) return t;
    const alt = deMidi(midi(t), t.a > 0 || (t.a === 0 && maior.a > 0));
    // tenta as duas grafias e escolhe a mais simples
    const cands = [deMidi(midi(t), true), deMidi(midi(t), false), t];
    let melhor = t, mc = 99;
    cands.forEach((c) => {
      const mm = tonicaMaiorDe(c, ref);
      const n = contaAcidentes(armaduraMaior(mm)) + (Math.abs(mm.a) > 1 ? 50 : 0);
      if (n < mc) { mc = n; melhor = c; }
    });
    void alt;
    return melhor;
  }

  function nomeArmadura(arm) {
    const s = Object.entries(arm).filter(([, a]) => a > 0).length;
    const b = Object.entries(arm).filter(([, a]) => a < 0).length;
    if (!s && !b) return 'sem acidentes';
    return s ? s + ' sustenido' + (s > 1 ? 's' : '') : b + ' bemol' + (b > 1 ? '' : '');
  }
  function plural(n, a, b) { return n + ' ' + (n === 1 ? a : b); }
  function descArmadura(t) {
    const arm = armaduraMaior(t);
    const ordemS = 'FCGDAEB', ordemB = 'BEADGCF';
    const s = [...ordemS].filter((l) => arm[l] > 0);
    const b = [...ordemB].filter((l) => arm[l] < 0);
    if (s.length) return plural(s.length, 'sustenido', 'sustenidos') + ' (' + s.map((l) => SOLF[l] + '♯').join(', ') + ')';
    if (b.length) return plural(b.length, 'bemol', 'bemóis') + ' (' + b.map((l) => SOLF[l] + '♭').join(', ') + ')';
    return 'nenhum acidente';
  }
  void nomeArmadura;

  // ---------- instrumentos: transposição ----------
  // intervalo da nota de concerto para a nota escrita
  function concertoParaEscrita(n, inst) { return transpor(n, inst.transp); }
  function escritaParaConcerto(n, inst) { return transpor(n, { l: -inst.transp.l, s: -inst.transp.s }); }

  // tonalidade escrita a partir da tonalidade de concerto (com simplificação enarmônica)
  function tomEscrito(tConcerto, ref, inst) {
    const bruto = concertoParaEscrita(tConcerto, inst);
    const simp = simplificaTonica(bruto, ref);
    // intervalo efetivo para transpor as notas da melodia
    const dl = LETRAS.indexOf(simp.l) - LETRAS.indexOf(tConcerto.l);
    const iv = { l: ((dl % 7) + 7) % 7, s: inst.transp.s };
    // ajusta passo de letra para coerência com semitons (ex.: +9 semitons ≈ 5 letras)
    const esperado = Math.round(inst.transp.s * 7 / 12);
    while (iv.l < esperado - 3) iv.l += 7;
    while (iv.l > esperado + 3) iv.l -= 7;
    return { tonica: simp, iv };
  }

  // ---------- partitura ABC ----------
  function abcNota(n) {
    let s = n.l;
    if (n.o >= 5) { s = s.toLowerCase(); s += "'".repeat(n.o - 5); }
    else s += ','.repeat(4 - n.o);
    return s;
  }
  const ABC_ACC = { '-2': '__', '-1': '_', '0': '=', '1': '^', '2': '^^' };
  const ABC_DUR = (d) => (d === 1 ? '' : String(d));

  // notas: [{n: nota|null (pausa), d: duração em semicolcheias, t?: ligadura, x?: texto}]
  function abc(opts) {
    const o = Object.assign({ compasso: '4/4', clave: 'treble', titulo: '', bpm: 0 }, opts);
    const [num, den] = o.compasso.split('/').map(Number);
    const barra = num * (16 / den);
    const composto = den === 8 && num % 3 === 0;
    const tempo = composto ? 6 : 16 / den;
    const tMaior = o.tonicaMaior || { l: 'C', a: 0, o: 4 };
    const arm = armaduraMaior(tMaior);
    let k = nomeInt(tMaior).replace('♯', '#').replace('♭', 'b');
    let out = 'X:1\n';
    if (o.titulo) out += 'T:' + o.titulo + '\n';
    out += 'M:' + o.compasso + '\nL:1/16\n';
    if (o.bpm) out += 'Q:1/4=' + o.bpm + '\n';
    out += 'K:' + k + (o.clave === 'bass' ? ' clef=bass' : '') + '\n';
    const anac = o.anacruse ? barra - o.anacruse : 0;
    let pos = anac, med = {}, linha = '', compassos = 0, tupla = 0;
    const porLinha = o.porLinha || 4;
    const notas = [];
    // divide notas que atravessam a barra
    o.notas.forEach((x) => {
      let d = x.d, primeira = true;
      while (d > 0) {
        const resto = barra - (pos % barra);
        const parte = Math.min(d, resto);
        notas.push(Object.assign({}, x, { d: parte, liga: d - parte > 0 && x.n ? true : x.t, cont: !primeira }));
        d -= parte; pos += parte; primeira = false;
        if (Math.abs(pos - Math.round(pos)) < 0.01) pos = Math.round(pos);
        if (Math.abs(d) < 0.01) d = 0;
      }
    });
    pos = anac;
    notas.forEach((x, i) => {
      if (x.x && !x.cont) linha += '"' + x.x + '"';
      if (x.txt && !x.cont) linha += '"^' + x.txt + '"';
      if (x.antes) linha += x.antes;
      if (x.n) {
        const chave = x.n.l + x.n.o;
        const atual = chave in med ? med[chave] : arm[x.n.l];
        let pre = '';
        if (x.n.a !== atual || x.forca) { pre = ABC_ACC[x.n.a]; med[chave] = x.n.a; }
        const ter = Math.abs(x.d - 4 / 3) < 0.01;
        if (ter && tupla === 0) linha += '(3';
        linha += pre + abcNota(x.n) + (ter ? '2' : ABC_DUR(x.d)) + (x.liga ? '-' : '');
        tupla = ter ? (tupla + 1) % 3 : 0;
      } else {
        const ter = Math.abs(x.d - 4 / 3) < 0.01;
        if (ter && tupla === 0) linha += '(3';
        linha += 'z' + (ter ? '2' : ABC_DUR(x.d));
        tupla = ter ? (tupla + 1) % 3 : 0;
      }
      pos += x.d;
      if (Math.abs(pos - Math.round(pos)) < 0.01) pos = Math.round(pos);
      const fimTempo = pos % tempo === 0;
      if (pos % barra === 0) {
        compassos++;
        med = {};
        const ultimo = i === notas.length - 1;
        linha += ultimo ? ' |]' : ' |';
        if (compassos % porLinha === 0 && !ultimo) linha += '\n';
        else linha += ' ';
      } else if (fimTempo || x.d >= tempo) linha += ' ';
    });
    if (pos % barra !== 0) linha += ' |]';
    return out + linha.trim() + '\n';
  }

  // ---------- melodias ----------
  // formato compacto: "E4:4 E4:4 F4:4 G4:4 | r:8" (duração em semicolcheias; r = pausa)
  function melodia(txt) {
    return txt.split(/\s+/).filter((t) => t && t !== '|').map((t) => {
      const [n, d] = t.split(':');
      return { n: n === 'r' ? null : parse(n), d: +(d || 4) };
    });
  }

  // transpõe melodia de concerto para o instrumento
  function melodiaPara(notasConcerto, tConcerto, ref, inst) {
    const { tonica, iv } = tomEscrito(tConcerto, ref, inst);
    return {
      tonica,
      tonicaMaior: tonicaMaiorDe(tonica, ref),
      notas: notasConcerto.map((x) => Object.assign({}, x, { n: x.n ? transpor(x.n, iv) : null })),
    };
  }

  // ---------- geração de exercícios ----------
  function oitavaInicial(t, faixa) {
    // menor oitava em que a tônica cabe na faixa
    let n = Object.assign({}, t, { o: 1 });
    while (midi(n) < faixa[0]) n.o++;
    return n;
  }

  function sequenciaEscala(tEscrita, tipo, oitavas, faixa) {
    const def = ESCALAS[tipo];
    const base = oitavaInicial(tEscrita, faixa);
    const sobe = [];
    for (let o = 0; o < oitavas; o++) {
      const t = Object.assign({}, base, { o: base.o + o });
      escalaGrafada(t, tipo, false).forEach((n) => sobe.push(n));
    }
    const topo = Object.assign({}, base, { o: base.o + oitavas });
    sobe.push(topo);
    let desce = [];
    if (def.desce) {
      for (let o = oitavas - 1; o >= 0; o--) {
        const t = Object.assign({}, base, { o: base.o + o });
        const g = escalaGrafada(t, tipo, true);
        desce = desce.concat(g.slice().reverse());
      }
    } else if (!def.g) {
      // cromática: desce com bemóis
      for (let m = midi(topo) - 1; m >= midi(base); m--) desce.push(deMidi(m, true));
    } else {
      desce = sobe.slice(0, -1).reverse();
    }
    const todas = sobe.concat(desce);
    const ok = todas.every((n) => midi(n) >= faixa[0] && midi(n) <= faixa[1]);
    return { notas: todas, ok, sobe };
  }

  // padrões sobre a escala (graus 0-indexados dentro da escala subindo)
  const PADROES = {
    reta: { nome: 'Escala reta (sobe e desce)' },
    tercas: { nome: 'Por terças (1-3, 2-4, 3-5…)', p: [0, 2], passo: 1 },
    quartas: { nome: 'Por quartas (1-4, 2-5…)', p: [0, 3], passo: 1 },
    quintas: { nome: 'Por quintas (1-5, 2-6…)', p: [0, 4], passo: 1 },
    sextas: { nome: 'Por sextas (1-6, 2-7…)', p: [0, 5], passo: 1 },
    grupos4: { nome: 'Grupos de 4 (1234, 2345…)', p: [0, 1, 2, 3], passo: 1 },
    p1235: { nome: 'Padrão 1-2-3-5', p: [0, 1, 2, 4], passo: 1 },
    triades: { nome: 'Tríades diatônicas (1-3-5, 2-4-6…)', p: [0, 2, 4], passo: 1 },
    tetrades: { nome: 'Tétrades diatônicas (1-3-5-7…)', p: [0, 2, 4, 6], passo: 1 },
  };

  function aplicaPadrao(sobe, padrao) {
    const P = PADROES[padrao];
    if (!P || !P.p) return null;
    const mx = Math.max(...P.p), n = sobe.length;
    const subida = [];
    for (let i = 0; i + mx <= n - 1; i += P.passo) P.p.forEach((k) => subida.push(sobe[i + k]));
    const desc = [];
    for (let i = n - 1; i - mx >= 0; i -= P.passo) P.p.forEach((k) => desc.push(sobe[i - k]));
    return subida.concat(desc, [sobe[0]]);
  }

  function arpejo(t, tipo, inversao) {
    const g = ARPEJOS[tipo].g.map(([s, p]) => grau(t, s, p));
    const inv = inversao || 0;
    const notas = g.slice(inv).concat(g.slice(0, inv).map((n) => Object.assign({}, n, { o: n.o + 1 })));
    return notas;
  }

  // frequência
  const freq = (m, la = 440) => la * Math.pow(2, (m - 69) / 12);
  function deFreq(f, la = 440) {
    const m = 69 + 12 * Math.log2(f / la);
    const r = Math.round(m);
    return { midi: r, cents: Math.round((m - r) * 100) };
  }

  window.Musica = {
    LETRAS, PC, SOLF, ACID, parse, midi, pc, deMidi, transpor, nomeInt, nomeBR, nomeComp, nomeOit,
    T_MAIORES, CICLO, CICLO_MENOR, ESCALAS, ARPEJOS, grau, escalaGrafada, armaduraMaior, descArmadura,
    tonicaMaiorDe, simplificaTonica, concertoParaEscrita, escritaParaConcerto, tomEscrito, abc, melodia,
    melodiaPara, sequenciaEscala, PADROES, aplicaPadrao, arpejo, freq, deFreq, abcNota,
  };
})();
