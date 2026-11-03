/* Conservatório de Sopros — Método de Leitura de Partitura (saxofone alto, notas escritas).
   24 lições progressivas; cada uma com notas novas, figura nova e estudos de leitura gerados
   a partir das notas e ritmos já aprendidos (exercícios originais deste curso). */
(function () {
  'use strict';
  const M = window.Musica;

  // gerador pseudoaleatório com semente (os estudos saem sempre iguais)
  function rng(seed) { let a = seed >>> 0; return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // células rítmicas (em semicolcheias; negativo = pausa). Cada lição libera algumas.
  const CEL = {
    sb: [16], m: [8], m_p: [-8], sm: [4], sm_p: [-4], mp: [12], col: [2, 2], smp_c: [6, 2], c_smp: [2, 6], sc: [1, 1, 1, 1], c_sc: [2, 1, 1], sc_c: [1, 1, 2],
    sinc: [2, 4, 2], contra: [-2, 2], cp_sc: [3, 1], ter: [4 / 3, 4 / 3, 4 / 3], c6: [2, 2, 2], c6b: [4, 2], c6c: [6],
  };

  // estudo: notas permitidas (ordem crescente), células, compasso, tonalidade, nota final
  function estudo(seed, o) {
    const r = rng(seed);
    const [num, den] = o.compasso.split('/').map(Number);
    const barra = num * (16 / den);
    const pool = o.notas.slice().sort((a, b) => M.midi(M.parse(a)) - M.midi(M.parse(b)));
    const fim = o.final || pool[0];
    let idx = Math.max(0, pool.indexOf(o.inicio || fim));
    const toks = [];
    const nComp = o.compassos || 8;
    for (let c = 0; c < nComp; c++) {
      let resto = barra;
      if (c === nComp - 1) {
        // último compasso: termina na nota final, longa
        const fi = pool.indexOf(fim);
        if ((barra === 16 || barra === 12 && den === 4) && r() < 0.6) { toks.push(pool[Math.min(pool.length - 1, fi + 1)] + ':4'); resto -= 4; }
        const longa = [16, 12, 8, 6, 4].find((d) => d <= resto);
        toks.push(fim + ':' + longa); resto -= longa;
        if (resto > 0) toks.push('r:' + resto);
        break;
      }
      let guarda = 0;
      while (resto > 0 && guarda++ < 40) {
        const cand = o.celulas.map((k) => CEL[k]).filter((cel) => cel.reduce((a, b) => a + Math.abs(b), 0) <= resto + 0.001);
        if (!cand.length) { toks.push(pool[idx] + ':' + resto); resto = 0; break; }
        const cel = cand[Math.floor(r() * cand.length)];
        cel.forEach((d) => {
          if (d < 0) { toks.push('r:' + -d); return; }
          const passo = Math.floor(r() * (2 * (o.salto || 1) + 1)) - (o.salto || 1);
          idx = Math.min(pool.length - 1, Math.max(0, idx + passo));
          toks.push(pool[idx] + ':' + +d.toFixed(3));
        });
        resto -= cel.reduce((a, b) => a + Math.abs(b), 0);
      }
    }
    return toks.join(' ');
  }

  const N = (s) => s.split(' ');
  const LICOES = [
    { t: 'A pauta, a clave de Sol e as três primeiras notas', novas: N('B4 A4 G4'), notas: N('B4 A4 G4'), cel: ['sb', 'm'], comp: '4/4', tom: 'C', fim: 'G4', bpm: 60,
      txt: `<p>A <b>pauta</b> (pentagrama) tem 5 linhas e 4 espaços, contados <b>de baixo para cima</b>. A <b>clave de Sol</b>, no começo da pauta, “enrola” na 2ª linha: ali é o <b>Sol</b>. A partir dele, cada linha e cada espaço é a nota seguinte: subindo, Sol (2ª linha) → Lá (2º espaço) → Si (3ª linha).</p>
        <p><b>Duração:</b> a <b>semibreve</b> (bola aberta, sem haste) dura <b>4 tempos</b>; a <b>mínima</b> (bola aberta com haste) dura <b>2 tempos</b>. Compasso <b>4/4</b>: cada compasso tem 4 tempos; as <b>barras</b> separam os compassos.</p>
        <p><b>Como ler cada estudo:</b> (1) diga o nome das notas em voz alta; (2) bata o ritmo contando “1, 2, 3, 4”; (3) toque com metrônomo, sem parar; (4) só repita depois de chegar ao fim.</p>` },
    { t: 'Dó médio, a semínima e as pausas', novas: N('C5'), notas: N('G4 A4 B4 C5'), cel: ['sb', 'm', 'sm', 'sm_p', 'm_p'], comp: '4/4', tom: 'C', fim: 'G4', bpm: 66,
      txt: `<p><b>Dó</b> fica no 3º espaço (dedo 2 sozinho). A <b>semínima</b> (bola preenchida com haste) dura <b>1 tempo</b>. Cada figura tem uma <b>pausa</b> de mesmo valor: a pausa de semibreve é um retângulo pendurado na 4ª linha; a de mínima, um retângulo sentado na 3ª linha; a de semínima, um “raio”. Na pausa, conte e prepare a próxima nota — e respire, se precisar.</p>
        <p>Atenção à troca <b>Si → Dó</b> (dedo 1 sai, dedo 2 entra ao mesmo tempo) e <b>Dó → Lá</b>.</p>` },
    { t: 'Mão direita: Fá e Mi · compasso 3/4 · mínima pontuada', novas: N('F4 E4'), notas: N('E4 F4 G4 A4 B4 C5'), cel: ['m', 'sm', 'mp', 'sm_p'], comp: '3/4', tom: 'C', fim: 'E4', bpm: 66,
      txt: `<p><b>Fá</b> fica no 1º espaço (1-2-3 + indicador direito) e <b>Mi</b> na 1ª linha (1-2-3 + indicador e médio direitos). Os dedos da mão direita ficam sempre encostados nas chaves.</p>
        <p><b>Compasso 3/4:</b> 3 tempos por compasso (valsa, muitos hinos). Conte “<b>1</b>-2-3”, com o 1 mais forte. O <b>ponto de aumento</b> ao lado da nota soma metade do valor: <b>mínima pontuada = 3 tempos</b>.</p>` },
    { t: 'Ré e Dó graves · ligadura de valor', novas: N('D4 C4'), notas: N('C4 D4 E4 F4 G4 A4 B4 C5'), cel: ['m', 'sm', 'mp', 'sb', 'sm_p'], comp: '4/4', tom: 'C', fim: 'C4', bpm: 66,
      txt: `<p><b>Ré</b> fica logo abaixo da pauta (todos os 6 dedos) e <b>Dó grave</b> na 1ª linha suplementar inferior (6 dedos + mínimo direito na chave de Dó). Notas graves pedem <b>garganta aberta (“ô”), ar quente e constante e nada de morder</b>.</p>
        <p><b>Linha suplementar:</b> pequena linha que estende a pauta para cima ou para baixo. <b>Ligadura de valor:</b> curva unindo duas notas <b>iguais</b>: toque só a primeira e some as durações (é assim que uma nota atravessa a barra de compasso).</p>` },
    { t: 'A chave de oitava: Ré e Mi agudos · colcheias', novas: N('D5 E5'), notas: N('C4 D4 E4 F4 G4 A4 B4 C5 D5 E5'), cel: ['m', 'sm', 'col', 'sm_p'], comp: '4/4', tom: 'C', fim: 'C5', bpm: 60,
      txt: `<p><b>Ré</b> (4ª linha) e <b>Mi</b> (4º espaço) do registro médio têm o mesmo dedilhado do Ré e do Mi graves, <b>mais a chave de oitava</b> (polegar esquerdo). A troca <b>Dó (dedo 2) → Ré (todos + oitava)</b> é a mais difícil do sax: treine-a lentamente, ligada.</p>
        <p><b>Colcheia</b>: metade de um tempo; duas colcheias juntas (unidas por uma barra) = 1 tempo. Conte “<b>1</b>-e-<b>2</b>-e-<b>3</b>-e-<b>4</b>-e”.</p>` },
    { t: 'Fá e Sol agudos · compasso 2/4 · anacruse', novas: N('F5 G5'), notas: N('D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5'), cel: ['m', 'sm', 'col', 'sm_p'], comp: '2/4', tom: 'C', fim: 'C5', bpm: 72,
      txt: `<p><b>Fá</b> (5ª linha) e <b>Sol</b> (acima da pauta) agudos: mesmos dedos do Fá e do Sol de baixo, com a chave de oitava. Ar mais rápido (vogal “i” por dentro), sem apertar.</p>
        <p><b>2/4:</b> dois tempos por compasso — marchas, dobrados, samba, frevo. <b>Anacruse:</b> nota(s) antes do primeiro tempo forte; a frase começa “no ar”. O último compasso costuma completar o tempo da anacruse.</p>` },
    { t: 'Fá sustenido e a armadura de clave (Sol maior)', novas: N('F#4 F#5'), notas: N('D4 E4 F#4 G4 A4 B4 C5 D5 E5 F#5 G5'), cel: ['m', 'sm', 'col', 'mp'], comp: '4/4', tom: 'G', fim: 'G4', bpm: 72,
      txt: `<p>O <b>sustenido (♯)</b> sobe meio tom. <b>Fá♯</b> = 1-2-3 + médio direito (dedo 5). Quando o ♯ aparece no começo da pauta, na linha do Fá, é a <b>armadura de clave</b>: <b>todo Fá da música é Fá♯</b>, em qualquer oitava. Essa armadura indica <b>Sol maior</b> (ou Mi menor).</p>
        <p>Antes de tocar, diga em voz alta: “Sol maior, todo Fá é sustenido”.</p>` },
    { t: 'Si bemol, a armadura de Fá maior e o bequadro', novas: N('Bb4'), notas: N('C4 D4 E4 F4 G4 A4 Bb4 C5 D5 E5 F5'), cel: ['m', 'sm', 'col', 'mp', 'sm_p'], comp: '3/4', tom: 'F', fim: 'F4', bpm: 72,
      txt: `<p>O <b>bemol (♭)</b> abaixa meio tom. <b>Si♭</b> = dedo 1 + chave <b>bis</b> (a pequena entre o 1 e o 2) — ou “1 e 1” (dedo 1 + indicador direito). Com o ♭ na linha do Si, a armadura indica <b>Fá maior</b> (ou Ré menor).</p>
        <p><b>Acidente ocorrente</b> (escrito junto da nota) vale até o fim do compasso, naquela altura. O <b>bequadro (♮)</b> cancela o acidente e volta à nota natural.</p>` },
    { t: 'Semínima pontuada e colcheia', novas: [], notas: N('D4 E4 F#4 G4 A4 B4 C5 D5 E5'), cel: ['smp_c', 'sm', 'm', 'col'], comp: '4/4', tom: 'G', fim: 'G4', bpm: 66,
      txt: `<p><b>Semínima pontuada</b> = 1 tempo e meio. Quase sempre vem seguida de uma <b>colcheia</b> (meio tempo), formando o padrão “<b>taaa</b>-ta” que aparece em incontáveis hinos e canções. Conte em colcheias: a semínima pontuada começa no “1” e dura “1-e-2”; a colcheia cai no “e” do 2.</p>` },
    { t: 'Lá, Si e Dó agudos · ritornelo e casas 1 e 2', novas: N('A5 B5 C6'), notas: N('G4 A4 B4 C5 D5 E5 F5 G5 A5 B5 C6'), cel: ['m', 'sm', 'col', 'smp_c'], comp: '4/4', tom: 'C', fim: 'C5', bpm: 72,
      txt: `<p><b>Lá</b> (1ª linha suplementar superior), <b>Si</b> e <b>Dó</b> agudos: dedos do Lá, Si e Dó médios + chave de oitava. Mantenha o som redondo; não feche a garganta.</p>
        <p><b>Ritornelo</b> (barras com dois pontos: 𝄆 … 𝄇): repita o trecho. <b>Casas 1 e 2:</b> na primeira vez toque a casa 1; na repetição, pule-a e vá direto para a casa 2. Siga o caminho com o dedo antes de tocar.</p>` },
    { t: 'Semicolcheias', novas: [], notas: N('C4 D4 E4 F4 G4 A4 B4 C5 D5'), cel: ['sm', 'col', 'sc', 'c_sc', 'sc_c'], comp: '2/4', tom: 'C', fim: 'C4', bpm: 56,
      txt: `<p><b>Semicolcheia</b> = ¼ de tempo: quatro formam 1 tempo (duas barras unindo as hastes). Conte “<b>1</b>-i-e-a, <b>2</b>-i-e-a”. Combinações comuns: colcheia + 2 semicolcheias (“ta-ti-ti”) e 2 semicolcheias + colcheia (“ti-ti-ta”).</p>
        <p>Leia devagar: a velocidade vem depois da precisão. Língua leve (“tu”), ar constante.</p>` },
    { t: 'Compasso 6/8', novas: [], notas: N('D4 E4 F#4 G4 A4 B4 C5 D5'), cel: ['c6', 'c6b', 'c6c'], comp: '6/8', tom: 'G', fim: 'G4', bpm: 54,
      txt: `<p>No <b>6/8</b> a colcheia é a unidade, mas o compasso se sente em <b>2 tempos</b>, cada um com 3 colcheias: “<b>1</b>-2-3 <b>4</b>-5-6”. Figuras típicas: 3 colcheias; semínima + colcheia (“taa-ta”); semínima pontuada (o tempo inteiro). O metrônomo marca a semínima pontuada.</p>` },
    { t: 'Síncope e contratempo', novas: [], notas: N('C4 D4 E4 F4 G4 A4 B4 C5 D5 E5'), cel: ['sinc', 'contra', 'sm', 'col'], comp: '2/4', tom: 'C', fim: 'C5', bpm: 60,
      txt: `<p><b>Síncope:</b> nota que começa num tempo fraco e se prolonga pelo forte — o famoso “ta-<b>taa</b>-ta” (colcheia–semínima–colcheia) do samba e do choro. A semínima do meio <b>não</b> é repetida no tempo: ela atravessa.</p><p><b>Contratempo:</b> pausa no tempo, nota no “e” — “(pausa)-ta, (pausa)-ta”. Bata o pé no tempo e toque entre as batidas.</p>` },
    { t: 'Dó♯, Mi♭ e Sol♯ · Ré maior e Mi♭ maior', novas: N('C#5 Eb4 G#4'), notas: N('D4 E4 F#4 G4 A4 B4 C#5 D5 E5'), cel: ['sm', 'col', 'smp_c', 'm'], comp: '4/4', tom: 'D', fim: 'D4', bpm: 66,
      txt: `<p><b>Dó♯ médio</b> (nenhum dedo) — a nota mais instável do sax: apoio firme. <b>Mi♭</b> grave (6 dedos + mínimo direito). <b>Sol♯</b> (1-2-3 + mínimo esquerdo).</p>
        <p><b>Ré maior</b>: 2 sustenidos (Fá♯ e Dó♯). <b>Mi♭ maior</b>: 3 bemóis (Si♭, Mi♭, Lá♭). Ordem dos sustenidos: <b>Fá Dó Sol Ré Lá Mi Si</b>; dos bemóis: <b>Si Mi Lá Ré Sol Dó Fá</b>.</p>`, extra: { notas: N('Eb4 F4 G4 Ab4 Bb4 C5 D5 Eb5'), tom: 'Eb', fim: 'Eb4' } },
    { t: 'Notas mais graves: Si♭, Si e Dó♯ graves', novas: N('Bb3 B3 C#4'), notas: N('Bb3 B3 C4 C#4 D4 E4 F4 G4'), cel: ['m', 'sm', 'sb'], comp: '4/4', tom: 'C', fim: 'C4', bpm: 60,
      txt: `<p><b>Si♭ grave</b> (6 dedos + mínimo esquerdo no Si♭), <b>Si grave</b> (mínimo esquerdo no Si) e <b>Dó♯ grave</b> (mínimo esquerdo no Dó♯). Ficam na 2ª linha suplementar inferior e abaixo dela. O mínimo esquerdo “rola” entre as chaves, sem levantar. Ar quente, muita garganta, zero mordida.</p>` },
    { t: 'Dinâmicas e articulações na partitura', novas: [], notas: N('C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5'), cel: ['sm', 'col', 'm', 'smp_c'], comp: '4/4', tom: 'C', fim: 'C5', bpm: 72,
      txt: `<p><b>Dinâmicas:</b> <i>pp</i> pianíssimo, <i>p</i> piano, <i>mp</i>, <i>mf</i>, <i>f</i> forte, <i>ff</i>; &lt; crescendo, &gt; diminuendo. <b>Articulações:</b> curva sobre notas diferentes = <b>legato</b> (só a 1ª com língua); ponto = <b>staccato</b> (curto); traço = <b>tenuto</b> (valor inteiro, língua suave); &gt; = <b>acento</b>; ^ = <b>marcato</b>.</p>
        <p>Toque cada estudo três vezes: tudo ligado; tudo staccato; e alternando 2 ligadas + 2 soltas. Depois aplique um plano dinâmico (comece <i>p</i>, cresça até o compasso 6, diminua no fim).</p>` },
    { t: 'Tercinas (quiálteras)', novas: [], notas: N('D4 E4 F#4 G4 A4 B4 C5 D5'), cel: ['ter', 'sm', 'col'], comp: '2/4', tom: 'G', fim: 'G4', bpm: 60,
      txt: `<p><b>Tercina:</b> 3 notas no lugar de 2, marcadas com um “3”. Uma tercina de colcheias ocupa 1 tempo. Conte “<b>tri</b>-pli-ce” em cada tempo. É a base do swing do jazz e do blues e do 12/8 das baladas gospel.</p>` },
    { t: 'Armaduras com 3 e 4 acidentes · tonalidades menores', novas: N('G#5 Ab4'), notas: N('E4 F#4 G#4 A4 B4 C#5 D5 E5'), cel: ['sm', 'col', 'smp_c', 'm'], comp: '4/4', tom: 'A', fim: 'A4', bpm: 72,
      txt: `<p><b>Lá maior</b> (3♯: Fá, Dó, Sol), <b>Mi maior</b> (4♯), <b>Lá♭ maior</b> (4♭). Cada armadura maior tem uma <b>relativa menor</b> uma 3ª menor abaixo (Lá maior ↔ Fá♯ menor). Para saber se a música é maior ou menor, olhe a <b>última nota</b> e o início: se termina na relativa menor e aparece a sensível com acidente (ex.: Mi♯ em Fá♯ menor), é menor.</p>`, extra: { notas: N('F4 G4 Ab4 Bb4 C5 Db5 Eb5 F5'), tom: 'Ab', fim: 'Ab4' } },
    { t: 'Notas de palma: Ré, Mi♭, Mi e Fá agudos', novas: N('D6 Eb6 E6 F6'), notas: N('G5 A5 B5 C6 D6 E6 F6'), cel: ['m', 'sm', 'sb', 'mp'], comp: '4/4', tom: 'C', fim: 'C6', bpm: 60,
      txt: `<p>Acima do Dó♯ agudo entram as <b>chaves de palma</b> da mão esquerda: <b>Ré</b> (palma do Ré), <b>Mi♭</b> (+ palma do Mi♭), <b>Mi</b> (+ chave lateral do Mi, mão direita), <b>Fá</b> (+ palma do Fá). Ficam acima da 2ª e 3ª linhas suplementares. Garganta aberta, ar rápido, sem morder — e confira a afinação: tendem a subir.</p>` },
    { t: 'Leitura cromática em todas as tonalidades', novas: N('Db5 Gb4 D#5'), notas: N('C4 C#4 D4 Eb4 E4 F4 F#4 G4 G#4 A4 Bb4 B4 C5'), cel: ['sm', 'col', 'm'], comp: '4/4', tom: 'C', fim: 'C4', bpm: 66, salto: 2,
      txt: `<p>Na música real, acidentes ocorrentes aparecem o tempo todo: cromatismos, notas de passagem, modulações. Regras: (1) o acidente vale até a barra, naquela altura; (2) na dúvida, a partitura pode trazer acidentes de precaução; (3) notas <b>enarmônicas</b> (Dó♯ = Ré♭) têm o mesmo dedilhado, mas o nome depende da tonalidade.</p>
        <p>Leia primeiro <b>só os acidentes</b> de cada compasso, depois toque.</p>` },
    { t: 'Compassos irregulares e mudanças de compasso', novas: [], notas: N('D4 E4 F#4 G4 A4 B4 C#5 D5 E5'), cel: ['sm', 'col', 'm'], comp: '5/4', tom: 'D', fim: 'D4', bpm: 80,
      txt: `<p><b>5/4</b> = 3+2 ou 2+3 tempos (“Take Five”). <b>7/8</b> = 2+2+3, 2+3+2 ou 3+2+2 colcheias. Conte os <b>grupos</b>: “1-2-3 1-2”. Em mudanças de compasso no meio da música, a colcheia normalmente mantém o mesmo valor.</p>`, extra: { comp: '7/8', cel: ['col', 'c6', 'c6b'] } },
    { t: 'Leitura à primeira vista: método profissional', novas: [], notas: N('C4 D4 E4 F4 G4 A4 Bb4 B4 C5 D5 E5 F5 G5 A5'), cel: ['sm', 'col', 'smp_c', 'sinc', 'sc', 'c_sc', 'm'], comp: '4/4', tom: 'F', fim: 'F4', bpm: 80, salto: 2,
      txt: `<p><b>Antes de tocar (30 segundos):</b> tonalidade; compasso; andamento e caráter; estrutura (repetições, D.S., Coda); ritmos difíceis; notas extremas e acidentes; dinâmicas e respirações.</p>
        <p><b>Durante:</b> nunca pare; mantenha o pulso; olhe um compasso à frente; se errar, siga. <b>Depois:</b> anote os erros e não repita mais de duas vezes — senão vira estudo, não leitura. Faça uma leitura nova <b>todo dia</b>.</p>
        <p><b>Sinais de caminho:</b> D.C. (volta ao início), D.S. 𝄋 (volta ao sinal), al Fine (até “Fine”), al Coda 𝄌 (salta para a Coda).</p>` },
    { t: 'Ler partes em Dó: transposição à primeira vista', novas: [], notas: N('C4 D4 E4 F4 G4 A4 B4 C5'), cel: ['sm', 'col', 'm', 'smp_c'], comp: '4/4', tom: 'C', fim: 'C4', bpm: 66,
      txt: `<p>Na igreja e na banda, muitas vezes só existe a partitura <b>em Dó</b> (voz, piano, hinário de coral). Para tocar com o sax alto, leia <b>uma 6ª maior acima</b> — ou, mais fácil de pensar, <b>uma 3ª menor abaixo</b> e acerte a oitava — e troque a armadura: <b>+3 sustenidos ou −3 bemóis</b>. Ex.: hino em Fá maior (1♭) → você lê em Ré maior (2♯).</p>
        <p><b>Truque da clave de Fá:</b> para partes em Dó na clave de Sol, ler as notas “como se fosse clave de Fá” dá o nome certo (uma 3ª abaixo), bastando ajustar a armadura e a oitava. Os estudos abaixo estão em Dó (concerto): leia transpondo e toque.</p>` },
    { t: 'Hinários a quatro vozes e partituras de conjunto', novas: [], notas: N('E4 F#4 G4 A4 B4 C5 D5 E5'), cel: ['m', 'sm', 'mp'], comp: '4/4', tom: 'G', fim: 'G4', bpm: 66,
      txt: `<p>Hinários com música (como os da Harpa Cristã e da CCB) vêm em <b>quatro vozes (SATB)</b>: <b>soprano e contralto</b> na pauta de clave de Sol (soprano com hastes para cima, contralto para baixo); <b>tenor e baixo</b> na clave de Fá. Marque a lápis qual voz você toca e siga só ela.</p>
        <p>Em partituras de banda e orquestra: procure sua parte (“Alto Sax 1”, “Sax alto em Mi♭”), confira se ela já está transposta (deve estar), marque respirações, cortes e repetições combinadas no ensaio. Leia também a pauta do colega ao lado para ouvir a harmonia.</p>` },
  ];

  function nomeNota(s) { const n = M.parse(s); return M.nomeBR(n) + n.o; }

  // monta o HTML de uma lição (usada no livro)
  function licaoHTML(i, H) {
    const L = LICOES[i];
    const ests = [];
    for (let k = 0; k < 6; k++) {
      const ex = L.extra && k >= 4 ? Object.assign({}, L, L.extra) : L;
      const comp = ex.comp;
      const txt = estudo(1000 * (i + 1) + k * 37, { notas: ex.notas, celulas: ex.cel, compasso: comp, final: ex.fim, inicio: ex.fim, compassos: 8, salto: ex.salto || 1 });
      ests.push(H.pauta({ tipo: 'notas', notas: txt, tom: ex.tom, compasso: comp, titulo: `Estudo ${i + 1}.${k + 1}${ex !== L ? ' · ' + M.nomeBR(M.parse(ex.tom + '4')) + ' maior' : ''}${comp !== L.comp ? ' · ' + comp : ''}`, bpm: L.bpm, porLinha: 4 }));
    }
    const ritmo = estudo(77 * (i + 3), { notas: ['B4'], celulas: L.cel, compasso: L.comp, final: 'B4', compassos: 8 });
    return `<article class="aula-livro leitura-licao"><header class="cab-aula"><span class="rotulo">Método de leitura · lição ${i + 1} de ${LICOES.length}</span><h1><span class="num-aula">L${i + 1}</span> ${L.t}</h1></header>
      <section><h2><span class="n">01</span>O que é</h2>${L.txt}</section>
      ${L.novas.length ? `<section><h2><span class="n">02</span>Notas novas</h2>${H.dedos(window.App.inst(), L.novas)}</section>` : ''}
      <section><h2><span class="n">${L.novas.length ? '03' : '02'}</span>Leitura rítmica</h2><p class="peq">Bata palmas (ou toque numa nota só) contando em voz alta. Andamento: ♩ = ${L.bpm}.</p>${H.pauta({ tipo: 'ritmo', ritmo: ritmo.split(' ').map((t) => { const [n, d] = t.split(':'); return n === 'r' ? '-' + d : d; }).join(' '), compasso: L.comp, titulo: 'Ritmo' })}</section>
      <section><h2><span class="n">${L.novas.length ? '04' : '03'}</span>Estudos de leitura</h2><p class="peq">Notas desta lição: ${L.notas.map(nomeNota).join(' · ')}. Para cada estudo: diga as notas, bata o ritmo, toque com metrônomo a ♩ = ${L.bpm} sem parar. Suba até ♩ = ${L.bpm + 24}.</p>${ests.join('')}</section>
      <section><h2><span class="n">${L.novas.length ? '05' : '04'}</span>Está pronto quando</h2><ul class="checks"><li>☐ Digo o nome de qualquer nota da lição em menos de 2 segundos.</li><li>☐ Bato o ritmo sem errar, contando em voz alta.</li><li>☐ Toco os 6 estudos sem parar a ♩ = ${L.bpm + 12}.</li><li>☐ Leio um estudo que nunca vi (peça a alguém para escolher) sem parar o pulso.</li></ul></section>
    </article>`;
  }

  window.MetodoLeitura = { LICOES, estudo, licaoHTML };
})();
