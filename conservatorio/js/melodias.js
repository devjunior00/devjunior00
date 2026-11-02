/* Melodias de domínio público e exercícios originais deste app.
   As notas estão escritas em uma tonalidade de referência; o app transpõe
   para a leitura de cada instrumento (trombone: uma 9ª maior abaixo, clave de Fá). */
(function () {
  'use strict';
  const M = window.Musica;

  // token "C7" (entre aspas) = cifra aplicada à nota seguinte
  function ler(txt) {
    const out = []; let cifra = null;
    txt.split(/\s+/).forEach((t) => {
      if (!t || t === '|') return;
      if (t[0] === '"') { cifra = t.replace(/"/g, ''); return; }
      const [n, d] = t.split(':');
      out.push({ n: n === 'r' ? null : M.parse(n), d: +(d || 4), cifra });
      cifra = null;
    });
    return out;
  }

  const MELODIAS = {
    brilha: {
      titulo: 'Brilha, Brilha Estrelinha', fonte: 'Melodia francesa do séc. XVIII (“Ah! vous dirai-je, maman”) — domínio público', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'iniciante',
      notas: 'C4:4 C4:4 G4:4 G4:4 A4:4 A4:4 G4:8 F4:4 F4:4 E4:4 E4:4 D4:4 D4:4 C4:8 G4:4 G4:4 F4:4 F4:4 E4:4 E4:4 D4:8 G4:4 G4:4 F4:4 F4:4 E4:4 E4:4 D4:8 C4:4 C4:4 G4:4 G4:4 A4:4 A4:4 G4:8 F4:4 F4:4 E4:4 E4:4 D4:4 D4:4 C4:8',
    },
    ode: {
      titulo: 'Ode à Alegria', fonte: 'L. van Beethoven, 9ª Sinfonia (1824) — domínio público', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'iniciante',
      notas: 'E4:4 E4:4 F4:4 G4:4 G4:4 F4:4 E4:4 D4:4 C4:4 C4:4 D4:4 E4:4 E4:6 D4:2 D4:8 E4:4 E4:4 F4:4 G4:4 G4:4 F4:4 E4:4 D4:4 C4:4 C4:4 D4:4 E4:4 D4:6 C4:2 C4:8 D4:4 D4:4 E4:4 C4:4 D4:4 E4:2 F4:2 E4:4 C4:4 D4:4 E4:2 F4:2 E4:4 D4:4 C4:4 D4:4 G3:8 E4:4 E4:4 F4:4 G4:4 G4:4 F4:4 E4:4 D4:4 C4:4 C4:4 D4:4 E4:4 D4:6 C4:2 C4:8',
    },
    santos: {
      titulo: 'When the Saints Go Marching In', fonte: 'Spiritual tradicional afro-americano — domínio público', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'basico',
      notas: 'r:4 "C" C4:4 E4:4 F4:4 G4:16 r:4 C4:4 E4:4 F4:4 "G7" G4:16 r:4 "C" C4:4 E4:4 F4:4 G4:8 E4:8 C4:8 E4:8 "G7" D4:16 r:4 E4:4 E4:4 D4:4 "C" C4:12 C4:4 "C7" E4:8 G4:8 "F" G4:4 F4:12 r:4 "C" E4:4 F4:4 G4:4 E4:8 "G7" C4:4 D4:4 "C" C4:16',
    },
    graca: {
      titulo: 'Amazing Grace (Preciosa Graça)', fonte: 'Melodia “New Britain”, tradicional norte-americana (séc. XIX) — domínio público', compasso: '3/4', tom: 'F', ref: 'maior', nivel: 'basico', anacruse: 4,
      notas: 'C4:4 "F" F4:8 A4:2 F4:2 "F7" A4:8 G4:4 "Bb" F4:8 D4:4 "F" C4:8 C4:4 F4:8 A4:2 F4:2 "C" A4:8 G4:2 A4:2 C5:12 C5:8 A4:4 "F" C5:8 A4:2 F4:2 "F7" A4:8 G4:4 "Bb" F4:8 D4:4 "F" C4:8 C4:4 F4:8 A4:2 F4:2 "C7" A4:8 G4:4 "F" F4:12 F4:8',
    },
    coral: {
      titulo: 'Coral da Manhã', fonte: 'Exercício original deste app (melodia em estilo de hino)', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'iniciante',
      notas: '"C" C4:8 E4:4 G4:4 "F" A4:8 "C" G4:8 "F" F4:4 E4:4 "G" D4:4 F4:4 "C" E4:16 "C" E4:8 G4:4 C5:4 "G" B4:8 "Am" A4:8 "F" G4:4 F4:4 "G" E4:4 D4:4 "C" C4:16',
    },
    blues: {
      titulo: 'Blues da Escola', fonte: 'Exercício original deste app — blues de 12 compassos', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'intermediario', swing: true,
      notas: '"C7" C4:2 Eb4:2 F4:2 F#4:2 G4:4 r:4 Bb4:4 G4:4 r:8 C4:2 Eb4:2 F4:2 F#4:2 G4:4 r:4 Bb4:4 G4:4 E4:4 r:4 "F7" F4:2 Ab4:2 Bb4:2 B4:2 C5:4 r:4 Eb5:4 C5:4 r:8 "C7" C4:2 Eb4:2 F4:2 F#4:2 G4:4 r:4 Bb4:4 G4:4 r:8 "G7" D5:4 B4:4 G4:4 F4:4 "F7" C5:4 A4:4 F4:4 Eb4:4 "C7" C4:2 Eb4:2 E4:2 G4:2 C5:4 Bb4:4 "G7" G4:4 F4:2 D4:2 B3:4 r:4',
    },
    iiVI: {
      titulo: 'Estudo II–V–I nº 1', fonte: 'Exercício original deste app — arpejos e notas-guia', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'intermediario', swing: true,
      notas: '"Dm7" D4:2 F4:2 A4:2 C5:2 E5:4 C5:4 "G7" B4:2 D5:2 F5:2 D5:2 B4:2 G4:2 F4:4 "C7M" E4:2 G4:2 B4:2 D5:2 C5:8 r:16',
    },
    guia: {
      titulo: 'Linha de notas-guia (3ªs e 7ªs)', fonte: 'Exercício original deste app', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'intermediario',
      notas: '"Dm7" F4:8 C5:8 "G7" B4:8 F4:8 "C7M" E4:8 B4:8 "A7" C#5:8 G4:8 "Dm7" F4:8 C5:8 "G7" B4:8 F4:8 "C7M" E4:16',
    },
    resposta: {
      titulo: 'Pergunta e resposta', fonte: 'Exercício original deste app', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'basico',
      notas: '"C" E4:4 G4:4 A4:4 G4:4 E4:8 r:8 "F" F4:4 A4:4 C5:4 A4:4 "C" G4:8 r:8 "C" E4:4 G4:4 A4:4 G4:4 E4:8 r:8 "G7" D4:4 F4:4 G4:4 B4:4 "C" C5:8 r:8',
    },
    contracanto: {
      titulo: 'Contracanto em notas longas', fonte: 'Exercício original deste app — para acompanhar a voz em louvor', compasso: '4/4', tom: 'C', ref: 'maior', nivel: 'intermediario',
      notas: '"C" G4:16 "G/B" G4:8 F4:8 "Am" E4:16 "F" F4:8 A4:8 "C/G" G4:16 "G" D5:8 B4:8 "C" C5:16 r:16',
    },
  };

  // transpõe cifra (raiz e baixo) pelo mesmo intervalo da melodia
  function transporCifra(c, iv) {
    if (!c) return c;
    const t = (s) => {
      const m = /^([A-G])(#|b)?(.*)$/.exec(s);
      if (!m) return s;
      const n = M.transpor({ l: m[1], a: m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0, o: 4 }, iv);
      return M.nomeInt(n) + m[3];
    };
    const [a, b] = c.split('/');
    return t(a) + (b ? '/' + t(b) : '');
  }

  // devolve {tonica, tonicaMaior, notas} em leitura do instrumento
  function paraInstrumento(id, inst) {
    const mel = MELODIAS[id];
    const notas = ler(mel.notas);
    const ton = M.parse(mel.tom + '4');
    let iv = { l: 0, s: 0 };
    if (inst.clave === 'bass') iv = { l: -8, s: -14 };
    // se sair da extensão do instrumento, sobe uma oitava
    const [lo, hi] = inst.faixa.map((x) => M.midi(M.parse(x)));
    const alturas = notas.filter((x) => x.n).map((x) => M.midi(M.transpor(x.n, iv)));
    if (Math.min(...alturas) < lo && Math.max(...alturas) + 12 <= hi) iv = { l: iv.l + 7, s: iv.s + 12 };
    const tonica = M.transpor(ton, iv);
    return {
      mel, tonica, anacruse: mel.anacruse || 0, tonicaMaior: M.tonicaMaiorDe(tonica, mel.ref),
      notas: notas.map((x) => ({ n: x.n ? M.transpor(x.n, iv) : null, d: x.d, x: x.cifra ? transporCifra(x.cifra, iv) : null })),
    };
  }

  window.Melodias = { MELODIAS, ler, paraInstrumento, transporCifra };
})();
