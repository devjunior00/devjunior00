/* Conservatório de Sopros — instrumentos, transposição, dedilhados e posições */
(function () {
  'use strict';
  const M = window.Musica;

  const INSTRUMENTOS = {
    alto: {
      id: 'alto', nome: 'Saxofone alto', nomeMin: 'saxofone alto', curto: 'Sax alto', tom: 'Mi♭', tomInt: 'E♭', familia: 'palheta', sub: 'sax', timbre: 'sax',
      transp: { l: 5, s: 9 }, clave: 'treble',
      transpTexto: 'soa uma 6ª maior abaixo do que está escrito',
      exemploTransp: 'Dó escrito soa Mi♭ de concerto',
      faixa: ['Bb3', 'F#6'], conf: { iniciante: ['D4', 'C5'], basico: ['C4', 'C6'], intermediario: ['Bb3', 'F6'], avancado: ['Bb3', 'F#6'] },
      afinar: { escrita: 'F#5', obs: 'Muitos saxofonistas afinam no Fá♯ escrito (Lá de concerto) ou no Dó escrito (Mi♭ de concerto). Ajuste empurrando ou puxando a boquilha no tudel.' },
      primeiraEscala: 'C', bocal: 'boquilha',
    },
    soprano: {
      id: 'soprano', nome: 'Saxofone soprano', nomeMin: 'saxofone soprano', curto: 'Sax soprano', tom: 'Si♭', tomInt: 'B♭', familia: 'palheta', sub: 'sax', timbre: 'sax',
      transp: { l: 1, s: 2 }, clave: 'treble',
      transpTexto: 'soa uma 2ª maior abaixo do que está escrito',
      exemploTransp: 'Dó escrito soa Si♭ de concerto',
      faixa: ['Bb3', 'F#6'], conf: { iniciante: ['D4', 'C5'], basico: ['C4', 'C6'], intermediario: ['Bb3', 'F6'], avancado: ['Bb3', 'F#6'] },
      afinar: { escrita: 'B4', obs: 'Afine no Si escrito (Lá de concerto) ou no Dó escrito (Si♭ de concerto). O soprano é muito sensível à embocadura: confira várias notas, não só uma.' },
      primeiraEscala: 'C', bocal: 'boquilha',
    },
    clarinete: {
      id: 'clarinete', nome: 'Clarinete em Si♭', nomeMin: 'clarinete em Si♭', curto: 'Clarinete', tom: 'Si♭', tomInt: 'B♭', familia: 'palheta', sub: 'clarinete', timbre: 'clarinete',
      transp: { l: 1, s: 2 }, clave: 'treble',
      transpTexto: 'soa uma 2ª maior abaixo do que está escrito',
      exemploTransp: 'Dó escrito soa Si♭ de concerto',
      faixa: ['E3', 'C6'], conf: { iniciante: ['E3', 'Bb4'], basico: ['E3', 'G5'], intermediario: ['E3', 'C6'], avancado: ['E3', 'C6'] },
      afinar: { escrita: 'C5', obs: 'Afine no Dó escrito do registro clarim (Si♭ de concerto) e confira o Sol solto (garganta). Ajuste puxando o barrilete; se a diferença for entre registros, ajuste também a junta do meio.' },
      primeiraEscala: 'C', bocal: 'boquilha',
    },
    trompete: {
      id: 'trompete', nome: 'Trompete em Si♭', nomeMin: 'trompete em Si♭', curto: 'Trompete', tom: 'Si♭', tomInt: 'B♭', familia: 'metal', sub: 'trompete', timbre: 'trompete',
      transp: { l: 1, s: 2 }, clave: 'treble',
      transpTexto: 'soa uma 2ª maior abaixo do que está escrito',
      exemploTransp: 'Dó escrito soa Si♭ de concerto',
      faixa: ['F#3', 'C6'], conf: { iniciante: ['C4', 'C5'], basico: ['G3', 'E5'], intermediario: ['F#3', 'A5'], avancado: ['F#3', 'C6'] },
      afinar: { escrita: 'C5', obs: 'Afine no Dó do 3º espaço (Si♭ de concerto) com a bomba geral (bomba de afinação principal). Depois confira Sol (2ª linha) e o Dó grave.' },
      primeiraEscala: 'C', bocal: 'bocal',
    },
    trombone: {
      id: 'trombone', nome: 'Trombone de vara', nomeMin: 'trombone de vara', curto: 'Trombone', tom: 'Dó (afinado em Si♭)', tomInt: 'C', familia: 'metal', sub: 'trombone', timbre: 'trombone',
      transp: { l: 0, s: 0 }, clave: 'bass',
      transpTexto: 'na clave de Fá, lê em sons reais (não transpõe)',
      exemploTransp: 'Dó escrito soa Dó',
      faixa: ['E2', 'F5'], conf: { iniciante: ['Bb2', 'Bb3'], basico: ['F2', 'D4'], intermediario: ['E2', 'G4'], avancado: ['E2', 'F5'] },
      afinar: { escrita: 'Bb3', obs: 'Afine o Si♭ na 1ª posição e o Fá (1ª posição) com a bomba de afinação. As demais notas se corrigem com a vara, ouvindo.' },
      primeiraEscala: 'Bb', bocal: 'bocal',
    },
  };

  // instrumentos extras (apenas para o transpositor)
  const OUTROS = {
    C: { id: 'C', nome: 'Instrumento em Dó (piano, flauta, violino, voz)', transp: { l: 0, s: 0 } },
    tenor: { id: 'tenor', nome: 'Sax tenor (Si♭, soa 9ª maior abaixo)', transp: { l: 8, s: 14 } },
    baritono: { id: 'baritono', nome: 'Sax barítono (Mi♭, soa 13ª maior abaixo)', transp: { l: 12, s: 21 } },
    trompa: { id: 'trompa', nome: 'Trompa em Fá (soa 5ª justa abaixo)', transp: { l: 4, s: 7 } },
    clarone: { id: 'clarone', nome: 'Clarone em Si♭ (clave de Sol, soa 9ª maior abaixo)', transp: { l: 8, s: 14 } },
    tromboneBb: { id: 'tromboneBb', nome: 'Trombone em Si♭ na clave de Sol (soa 9ª maior abaixo)', transp: { l: 8, s: 14 } },
    violao: { id: 'violao', nome: 'Violão/guitarra (soa uma 8ª abaixo)', transp: { l: 7, s: 12 } },
  };

  // ---------- SAXOFONE (alto e soprano têm o mesmo dedilhado escrito) ----------
  // chaves: O (oitava), 1 2 3 4 5 6, bis, gs (Sol♯), csL (Dó♯ grave), b (Si grave), bb (Si♭ grave),
  // ebR (Mi♭ grave), cR (Dó grave), sC (Dó lateral), sBb (Si♭ lateral), sE (Mi agudo lateral),
  // pD pEb pF (chaves de palma), fF (Fá de frente), fs (Fá♯ agudo)
  const SAX_BASE = {
    'Bb': [['1', '2', '3', '4', '5', '6', 'bb']],
    'B': [['1', '2', '3', '4', '5', '6', 'b']],
    'C': [['1', '2', '3', '4', '5', '6', 'cR']],
    'C#': [['1', '2', '3', '4', '5', '6', 'csL']],
    'D': [['1', '2', '3', '4', '5', '6']],
    'Eb': [['1', '2', '3', '4', '5', '6', 'ebR']],
    'E': [['1', '2', '3', '4', '5']],
    'F': [['1', '2', '3', '4']],
    'F#': [['1', '2', '3', '5'], ['1', '2', '3', '6'], 'alternativo com o dedo 6: útil em trinados Fá–Fá♯ (afinação um pouco diferente)'],
    'G': [['1', '2', '3']],
    'G#': [['1', '2', '3', 'gs']],
    'A': [['1', '2']],
    'Bb4': [['1', 'bis'], ['1', '4'], '“1 e 1”: dedo 1 + dedo 4. Útil quando há Fá♯/Si natural por perto', ['1', '2', 'sBb'], 'Si♭ lateral: útil em passagens cromáticas'],
    'B4': [['1']],
    'C5': [['2'], ['1', 'sC'], 'Dó lateral: útil para trinado Si–Dó e passagens cromáticas'],
    'C#5': [[]],
  };
  function saxDedilhado(n) {
    const m = M.midi(n);
    const nome = M.deMidi(m, n.a < 0 || [70, 82, 75, 87, 63, 58].includes(m));
    const k = nome.l + (nome.a === 1 ? '#' : nome.a === -1 ? 'b' : '');
    const tab = {
      58: 'Bb', 59: 'B', 60: 'C', 61: 'C#', 62: 'D', 63: 'Eb', 64: 'E', 65: 'F', 66: 'F#', 67: 'G', 68: 'G#', 69: 'A',
      70: 'Bb4', 71: 'B4', 72: 'C5', 73: 'C#5',
    };
    void k;
    let base, oit = false, extra = '';
    if (m >= 58 && m <= 73) base = SAX_BASE[tab[m]];
    else if (m >= 74 && m <= 85) {
      // registro médio: mesmo dedilhado de uma oitava abaixo + chave de oitava
      const b = SAX_BASE[tab[m - 12]] || [[]];
      base = b; oit = true;
      if (m === 74) extra = 'Ré médio: confira se a chave de oitava do tudel está funcionando (é a do corpo que abre aqui).';
    } else if (m === 86) base = [['pD']];
    else if (m === 87) base = [['pD', 'pEb']];
    else if (m === 88) base = [['pD', 'pEb', 'sE']];
    else if (m === 89) base = [['pD', 'pEb', 'sE', 'pF'], ['fF', '1'], 'Fá de frente: chave na frente, acima do dedo 1; útil saindo do Ré/Mi agudo'];
    else if (m === 90) base = [['pD', 'pEb', 'sE', 'pF', 'fs'], [], ''];
    else return null;
    if (m >= 86) oit = true;
    const principal = base[0].slice();
    if (oit) principal.unshift('O');
    const alts = [];
    for (let i = 1; i < base.length; i += 2) {
      if (!Array.isArray(base[i]) || !base[i].length) continue;
      const a = base[i].slice(); if (oit) a.unshift('O');
      alts.push({ k: a, nota: base[i + 1] || '' });
    }
    let obs = extra;
    if (m === 90) obs = 'Fá♯ agudo: só em saxofones com chave de Fá♯ agudo (a maioria dos modelos atuais). Sem essa chave existe dedilhado alternativo, que varia de modelo para modelo.';
    if (m === 73) obs = 'Dó♯ médio: nenhuma chave pressionada. É a nota mais instável do sax: mantenha o apoio de ar e a garganta aberta.';
    if (m === 58 || m === 59) obs = 'Em muitos saxofones a chave de Dó grave fecha junto automaticamente; algumas tabelas indicam também o mínimo direito no Dó grave. Teste no seu instrumento qual soa melhor.';
    if (m === 85) obs = 'Dó♯ agudo: só a chave de oitava. Tende a soar abafado; abra bem a garganta.';
    return { k: principal, alts, obs };
  }

  // ---------- CLARINETE (sistema Boehm, notas escritas) ----------
  // T (furo do polegar), R (chave de registro), 1 2 3 4 5 6 (furos/anéis), A (chave de Lá), Gs (chave de Sol♯),
  // mínimo esquerdo: lCs (Dó♯/Sol♯), lE (Mi/Si), lF (Fá/Dó), lFs (Fá♯/Dó♯)
  // mínimo direito: rE (Mi/Si), rF (Fá/Dó), rFs (Fá♯/Dó♯), rAb (Sol♯/Ré♯)
  // chaves laterais (trinado) da mão direita, numeradas de cima para baixo: s1 s2 s3 s4
  let CLARINETE = null; // preenchido abaixo

  // ---------- TROMPETE (pistos) ----------
  const TROMPETE = {
    54: ['123'], 55: ['13'], 56: ['23'], 57: ['12'], 58: ['1'], 59: ['2'], 60: ['0'],
    61: ['123'], 62: ['13'], 63: ['23'], 64: ['12', '3'], 65: ['1'], 66: ['2'], 67: ['0'],
    68: ['23'], 69: ['12', '3'], 70: ['1'], 71: ['2'], 72: ['0'],
    73: ['12'], 74: ['1', '13'], 75: ['2', '23'], 76: ['0', '12'],
    77: ['1'], 78: ['2'], 79: ['0', '13'], 80: ['23'], 81: ['12'], 82: ['1'], 83: ['2'], 84: ['0'],
  };
  const TROMPETE_OBS = {
    54: 'Fá♯ grave (1-2-3): naturalmente alto. Estenda a bomba do 3º pisto (gatilho).',
    55: 'Sol grave (1-3): naturalmente alto. Estenda um pouco a bomba do 3º pisto.',
    61: 'Dó♯ (1-2-3): muito alto. Use o gatilho do 3º pisto (empurre a bomba para fora).',
    62: 'Ré (1-3): alto. Use o gatilho do 3º pisto ou o do 1º.',
    64: 'Mi (1-2): o 3º pisto sozinho é alternativa, mas costuma ficar mais baixo.',
    76: 'Mi agudo (0): tende a ficar um pouco baixo; ouça e ajuste com o lábio.',
    83: 'Si agudo: alternativa (1-2) existe em alguns instrumentos.',
  };

  // ---------- TROMBONE (posições da vara, sons reais) ----------
  const TROMBONE = {
    40: [7], 41: [6], 42: [5], 43: [4], 44: [3], 45: [2], 46: [1],
    47: [7], 48: [6], 49: [5], 50: [4], 51: [3], 52: [2, 7], 53: [1, 6],
    54: [5], 55: [4], 56: [3], 57: [2, 6], 58: [1, 5],
    59: [4], 60: [3, 6], 61: [2, 5], 62: [1, 4], 63: [3], 64: [2], 65: [1, 6],
    66: [3, 5], 67: [2, 4], 68: [3, 1], 69: [2], 70: [1, 3], 71: [2, 4], 72: [1, 3], 73: [2], 74: [1, 4],
    75: [3], 76: [2], 77: [1],
  };
  const TROMBONE_OBS = {
    46: 'Si♭ grave na 1ª posição: a nota de referência do trombone.',
    59: 'Si (4ª): a 5ª parcial é um pouco baixa; ajuste a vara levemente para dentro.',
    62: 'Ré (1ª ou 4ª): na 1ª soa um pouco baixo — puxe a vara um pouco para dentro, se possível, ou pense a nota mais alta.',
    68: 'Lá♭ médio: a 7ª parcial (1ª posição) é bem baixa. Prefira a 3ª posição.',
    74: 'Ré agudo: 1ª posição (ligeiramente baixo) ou 4ª.',
  };

  // ---------- diagramas SVG ----------
  const COR = 'var(--tinta)';
  function circ(x, y, r, on, rot) {
    return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${on ? 'var(--acento)' : 'var(--papel)'}" stroke="${COR}" stroke-width="1.6"/>${rot ? `<text x="${x}" y="${y + 3.5}" text-anchor="middle" font-size="9" fill="${on ? 'var(--papel)' : 'var(--sutil)'}">${rot}</text>` : ''}</g>`;
  }
  function chave(x, y, w, h, on, rot, lado) {
    const tx = lado === 'e' ? x - 4 : x + w + 4, anc = lado === 'e' ? 'end' : 'start';
    const fs = 10;
    return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) / 2}" fill="${on ? 'var(--acento)' : 'var(--papel)'}" stroke="${COR}" stroke-width="1.4"/>${rot ? `<text x="${tx}" y="${y + h / 2 + 3.5}" text-anchor="${anc}" font-size="${fs}" fill="var(--sutil)">${rot}</text>` : ''}</g>`;
  }

  function svgSax(k) {
    const on = (c) => k.includes(c);
    let s = '<svg viewBox="-62 0 330 330" class="diag" role="img" aria-label="Diagrama de dedilhado do saxofone">';
    s += `<line x1="100" y1="40" x2="100" y2="300" stroke="var(--linha)" stroke-width="10" stroke-linecap="round"/>`;
    // chave de oitava (polegar)
    s += chave(18, 30, 26, 12, on('O'), 'oitava', 'd').replace('text-anchor="start"', 'text-anchor="start"');
    // palma
    s += chave(132, 22, 22, 11, on('pD'), 'Ré palma', 'd');
    s += chave(140, 38, 22, 11, on('pEb'), 'Mi♭ palma', 'd');
    s += chave(132, 54, 22, 11, on('pF'), 'Fá palma', 'd');
    // fá de frente
    s += chave(88, 50, 24, 9, on('fF'), 'Fá frente', 'd').replace(`x="116"`, `x="116"`);
    // mão esquerda
    s += circ(100, 75, 13, on('1'), '1');
    s += chave(93, 92, 14, 8, on('bis'), 'bis', 'd');
    s += circ(100, 112, 13, on('2'), '2');
    s += circ(100, 142, 13, on('3'), '3');
    // mínimo esquerdo
    s += chave(30, 132, 24, 11, on('gs'), 'Sol♯', 'e');
    s += chave(30, 148, 24, 11, on('csL'), 'Dó♯ gr.', 'e');
    s += chave(30, 164, 24, 11, on('b'), 'Si gr.', 'e');
    s += chave(30, 180, 24, 11, on('bb'), 'Si♭ gr.', 'e');
    // mão direita
    s += circ(100, 200, 13, on('4'), '4');
    s += circ(100, 230, 13, on('5'), '5');
    s += circ(100, 260, 13, on('6'), '6');
    // laterais (palma da mão direita)
    s += chave(140, 186, 10, 22, on('sE'), 'Mi agudo', 'd');
    s += chave(140, 214, 10, 22, on('sC'), 'Dó lat.', 'd');
    s += chave(140, 242, 10, 22, on('sBb'), 'Si♭ lat.', 'd');
    // mínimo direito
    s += chave(64, 286, 26, 11, on('ebR'), 'Mi♭ gr.', 'e');
    s += chave(64, 302, 26, 11, on('cR'), 'Dó gr.', 'e');
    // fá# agudo
    s += chave(120, 284, 22, 10, on('fs'), 'Fá♯ ag.', 'd');
    s += `<text x="100" y="14" text-anchor="middle" font-size="9" fill="var(--sutil)">mão esquerda (em cima)</text>`;
    s += `<text x="100" y="326" text-anchor="middle" font-size="9" fill="var(--sutil)">mão direita (embaixo)</text>`;
    return s + '</svg>';
  }

  function svgClarinete(k) {
    const on = (c) => k.includes(c);
    let s = '<svg viewBox="-62 0 330 350" class="diag" role="img" aria-label="Diagrama de dedilhado do clarinete">';
    s += `<line x1="100" y1="30" x2="100" y2="300" stroke="var(--linha)" stroke-width="10" stroke-linecap="round"/>`;
    s += circ(36, 70, 11, on('T'), 'P');
    s += chave(28, 46, 22, 10, on('R'), 'registro', 'e');
    s += chave(118, 40, 22, 10, on('A'), 'Lá', 'd');
    s += chave(118, 56, 22, 10, on('Gs'), 'Sol♯', 'd');
    s += circ(100, 82, 12, on('1'), '1');
    s += circ(100, 112, 12, on('2'), '2');
    s += circ(100, 142, 12, on('3'), '3');
    s += chave(30, 150, 22, 10, on('lFs'), 'Fá♯/Dó♯', 'e');
    s += chave(30, 164, 22, 10, on('lE'), 'Mi/Si', 'e');
    s += chave(30, 178, 22, 10, on('lF'), 'Fá/Dó', 'e');
    s += chave(30, 136, 22, 10, on('lCs'), 'Dó♯/Sol♯', 'e');
    s += chave(140, 104, 9, 14, on('s1'), 'lat. 1', 'd');
    s += chave(140, 122, 9, 14, on('s2'), 'lat. 2', 'd');
    s += chave(140, 140, 9, 14, on('s3'), 'lat. 3', 'd');
    s += chave(140, 158, 9, 14, on('s4'), 'lat. 4 (Mi♭/Si♭)', 'd');
    s += circ(100, 200, 12, on('4'), '4');
    s += circ(100, 230, 12, on('5'), '5');
    s += circ(100, 260, 12, on('6'), '6');
    s += chave(120, 276, 22, 10, on('rAb'), 'Sol♯/Ré♯', 'd');
    s += chave(120, 290, 22, 10, on('rF'), 'Fá/Dó', 'd');
    s += chave(120, 304, 22, 10, on('rE'), 'Mi/Si', 'd');
    s += chave(120, 318, 22, 10, on('rFs'), 'Fá♯/Dó♯', 'd');
    s += `<text x="100" y="16" text-anchor="middle" font-size="9" fill="var(--sutil)">mão esquerda (em cima) · P = polegar</text>`;
    s += `<text x="100" y="346" text-anchor="middle" font-size="9" fill="var(--sutil)">mão direita (embaixo)</text>`;
    return s + '</svg>';
  }

  function svgTrompete(v) {
    let s = '<svg viewBox="0 0 220 120" class="diag" role="img" aria-label="Pistos do trompete">';
    [1, 2, 3].forEach((p, i) => {
      const on = v.includes(String(p));
      s += `<rect x="${30 + i * 60}" y="22" width="40" height="70" rx="20" fill="${on ? 'var(--acento)' : 'var(--papel)'}" stroke="${COR}" stroke-width="2"/>`;
      s += `<text x="${50 + i * 60}" y="64" text-anchor="middle" font-size="18" font-weight="700" fill="${on ? 'var(--papel)' : 'var(--tinta)'}">${p}</text>`;
    });
    s += `<text x="110" y="112" text-anchor="middle" font-size="10" fill="var(--sutil)">${v === '0' ? 'nenhum pisto (solto)' : 'pistos pressionados: ' + v.split('').join('-')}</text>`;
    return s + '</svg>';
  }

  function svgTrombone(pos) {
    const p = pos[0];
    let s = '<svg viewBox="0 0 320 120" class="diag" role="img" aria-label="Posição da vara do trombone">';
    s += `<line x1="22" y1="50" x2="298" y2="50" stroke="var(--linha)" stroke-width="8" stroke-linecap="round"/>`;
    for (let i = 1; i <= 7; i++) {
      const x = 22 + (i - 1) * 46;
      const ativo = i === p, alt = pos.slice(1).includes(i);
      s += `<line x1="${x}" y1="36" x2="${x}" y2="64" stroke="var(--sutil)" stroke-width="1"/>`;
      s += `<circle cx="${x}" cy="50" r="${ativo ? 13 : alt ? 10 : 6}" fill="${ativo ? 'var(--acento)' : alt ? 'var(--papel)' : 'var(--papel)'}" stroke="${ativo || alt ? 'var(--acento)' : COR}" stroke-width="${alt ? 2.5 : 1.5}" ${alt ? 'stroke-dasharray="3 2"' : ''}/>`;
      s += `<text x="${x}" y="${ativo ? 55 : 90}" text-anchor="middle" font-size="${ativo ? 14 : 14}" font-weight="700" fill="${ativo ? 'var(--papel)' : 'var(--tinta)'}">${i}</text>`;
    }
    s += `<text x="8" y="20" font-size="13" fill="var(--sutil)">vara fechada</text><text x="312" y="20" text-anchor="end" font-size="13" fill="var(--sutil)">estendida</text>`;
    s += `<text x="160" y="114" text-anchor="middle" font-size="13" fill="var(--sutil)">${p}ª posição${pos.length > 1 ? ' · alternativa: ' + pos.slice(1).map((x) => x + 'ª').join(', ') : ''}</text>`;
    return s + '</svg>';
  }

  const NOMES_CHAVE = {
    O: 'chave de oitava (polegar esq.)', bis: 'chave bis', gs: 'Sol♯ (mínimo esq.)', csL: 'Dó♯ grave (mínimo esq.)', b: 'Si grave (mínimo esq.)', bb: 'Si♭ grave (mínimo esq.)',
    ebR: 'Mi♭ grave (mínimo dir.)', cR: 'Dó grave (mínimo dir.)', sC: 'Dó lateral', sBb: 'Si♭ lateral', sE: 'Mi agudo lateral', pD: 'Ré de palma', pEb: 'Mi♭ de palma', pF: 'Fá de palma',
    fF: 'Fá de frente', fs: 'Fá♯ agudo', T: 'polegar (furo)', R: 'chave de registro', A: 'chave de Lá', Gs: 'chave de Sol♯ (garganta)', lE: 'Mi/Si (mínimo esq.)', lF: 'Fá/Dó (mínimo esq.)',
    lFs: 'Fá♯/Dó♯ (mínimo esq.)', lCs: 'Dó♯/Sol♯ (mínimo esq.)', rFs: 'Fá♯/Dó♯ (mínimo dir.)', rE: 'Mi/Si (mínimo dir.)', rF: 'Fá/Dó (mínimo dir.)', rAb: 'Sol♯/Ré♯ (mínimo dir.)',
    s1: 'lateral 1', s2: 'lateral 2', s3: 'lateral 3', s4: 'lateral 4 (Mi♭/Si♭)',
    fT: 'polegar (chave de Si)', fTb: 'polegar (alavanca de Si♭)', fGs: 'Sol♯ (mínimo esq.)', fEb: 'Mi♭ (mínimo dir.)', fCs: 'Dó♯ grave (mínimo dir.)', fC: 'Dó grave (mínimo dir.)', fTr1: 'trinado de Ré', fTr2: 'trinado de Ré♯',
  };
  const descChaves = (k) => (k.length ? k.map((c) => NOMES_CHAVE[c] || ('dedo ' + c)).join(' + ') : 'nenhuma chave (todas soltas)');

  // devolve {svg, texto, alts[], obs}
  function dedilhado(inst, notaEscrita) {
    const m = M.midi(notaEscrita);
    if (inst.sub === 'sax') {
      const d = saxDedilhado(notaEscrita); if (!d) return null;
      return { svg: svgSax(d.k), k: d.k, texto: descChaves(d.k), alts: d.alts.map((a) => ({ svg: svgSax(a.k), k: a.k, texto: descChaves(a.k), nota: a.nota })), obs: d.obs };
    }
    if (inst.sub === 'clarinete') {
      const d = CLARINETE && CLARINETE[m]; if (!d) return null;
      return { svg: svgClarinete(d.k), k: d.k, texto: descChaves(d.k), alts: (d.alts || []).map((a) => ({ svg: svgClarinete(a.k), k: a.k, texto: descChaves(a.k), nota: a.nota })), obs: d.obs || '' };
    }
    if (inst.sub === 'flauta') {
      const d = FLAUTA && FLAUTA.dedilhado(m); if (!d) return null;
      return { svg: FLAUTA.svg(d.k), k: d.k, texto: descChaves(d.k), alts: d.alts.map((a) => ({ svg: FLAUTA.svg(a.k), k: a.k, texto: descChaves(a.k), nota: a.nota })), obs: d.obs };
    }
    if (inst.sub === 'trompete') {
      const d = TROMPETE[m]; if (!d) return null;
      return { svg: svgTrompete(d[0]), k: d[0], texto: d[0] === '0' ? 'solto (0)' : d[0].split('').join('-'), alts: d.slice(1).map((v) => ({ svg: svgTrompete(v), texto: v.split('').join('-'), nota: 'alternativa' })), obs: TROMPETE_OBS[m] || '' };
    }
    if (inst.sub === 'trombone') {
      const d = TROMBONE[m]; if (!d) return null;
      return { svg: svgTrombone(d), k: d, texto: d[0] + 'ª posição', alts: [], obs: TROMBONE_OBS[m] || '' };
    }
    return null;
  }

  function registrarClarinete(tab) { CLARINETE = tab; }
  let FLAUTA = null;
  function registrarFlauta(f) { FLAUTA = f; }

  Object.values(INSTRUMENTOS).forEach((i) => { i.grave = i.clave === 'bass'; });
  window.Inst = { INSTRUMENTOS, OUTROS, dedilhado, registrarClarinete, registrarFlauta, svgTrompete, svgTrombone, svgSax, svgClarinete, descChaves };
})();
