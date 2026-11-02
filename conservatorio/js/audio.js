/* Conservatório de Sopros — áudio: síntese, metrônomo, nota de referência e detecção de altura */
(function () {
  'use strict';
  let ctx = null;
  function ac() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // timbres aproximados: o clarinete usa onda quadrada (predomínio de harmônicos ímpares)
  const TIMBRES = {
    sax: { onda: 'sawtooth', filtro: 2200, q: 2, ataque: 0.04 },
    clarinete: { onda: 'square', filtro: 1800, q: 1, ataque: 0.03 },
    trompete: { onda: 'sawtooth', filtro: 3200, q: 4, ataque: 0.03 },
    trombone: { onda: 'sawtooth', filtro: 1400, q: 3, ataque: 0.05 },
    puro: { onda: 'sine', filtro: 8000, q: 0.5, ataque: 0.01 },
  };
  let timbreAtual = 'sax';
  let saida = null;
  function master() {
    const c = ac();
    if (!saida) { saida = c.createGain(); saida.gain.value = 0.5; saida.connect(c.destination); }
    return saida;
  }

  function tocarNota(freq, inicio, dur, vol = 0.25, timbre) {
    const c = ac(); if (!c) return;
    const t = TIMBRES[timbre || timbreAtual] || TIMBRES.sax;
    const o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
    o.type = t.onda; o.frequency.value = freq;
    f.type = 'lowpass'; f.frequency.value = t.filtro; f.Q.value = t.q;
    const t0 = inicio || c.currentTime;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + t.ataque);
    g.gain.setValueAtTime(vol, t0 + Math.max(t.ataque, dur - 0.06));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(f); f.connect(g); g.connect(master());
    o.start(t0); o.stop(t0 + dur + 0.02);
    return o;
  }

  let tocando = [];
  function parar() { tocando.forEach((o) => { try { o.stop(); } catch (e) { /* já parado */ } }); tocando = []; }

  // eventos: [{midi|null, d (semicolcheias)}], bpm de semínima
  function tocarSequencia(eventos, bpm, aoTerminar) {
    const c = ac(); if (!c) return;
    parar();
    const s16 = 60 / bpm / 4;
    let t = c.currentTime + 0.08;
    eventos.forEach((e) => {
      const d = e.d * s16;
      if (e.midi != null) tocando.push(tocarNota(window.Musica.freq(e.midi), t, d * 0.95));
      t += d;
    });
    if (aoTerminar) setTimeout(aoTerminar, (t - c.currentTime) * 1000);
    return t - c.currentTime;
  }

  function tocarAcorde(midis, dur = 1.6, arpejado = false) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + 0.05;
    midis.forEach((m, i) => tocando.push(tocarNota(window.Musica.freq(m), t + (arpejado ? i * 0.45 : 0), dur, 0.16, 'puro')));
  }

  // ---------- nota de referência (drone) ----------
  let drone = null;
  function droneLiga(freqs) {
    const c = ac(); if (!c) return;
    droneDesliga();
    const g = c.createGain(); g.gain.value = 0.0001; g.connect(master());
    g.gain.exponentialRampToValueAtTime(0.18, c.currentTime + 0.3);
    const os = freqs.map((f) => {
      const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f; o.connect(g); o.start(); return o;
    });
    drone = { g, os };
  }
  function droneDesliga() {
    if (!drone) return;
    const c = ac(); const d = drone; drone = null;
    d.g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.2);
    setTimeout(() => d.os.forEach((o) => o.stop()), 300);
  }

  // ---------- metrônomo (agendamento antecipado) ----------
  const Met = {
    bpm: 72, tempos: 4, sub: 1, acento: true, ligado: false, aoTempo: null,
    treino: null, // {passo, cada}
    _prox: 0, _n: 0, _timer: null, _compassos: 0,
    iniciar() {
      const c = ac(); if (!c) return;
      if (this.ligado) return;
      this.ligado = true; this._n = 0; this._compassos = 0; this._prox = c.currentTime + 0.1;
      this._timer = setInterval(() => this._agenda(), 25);
    },
    parar() { this.ligado = false; clearInterval(this._timer); },
    _clique(t, forte, sub) {
      const c = ctx; const o = c.createOscillator(), g = c.createGain();
      o.frequency.value = forte ? 1600 : sub ? 700 : 1000;
      g.gain.setValueAtTime(forte ? 0.5 : sub ? 0.12 : 0.3, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      o.connect(g); g.connect(master()); o.start(t); o.stop(t + 0.06);
    },
    _agenda() {
      const c = ctx;
      while (this._prox < c.currentTime + 0.12) {
        const porTempo = this.sub, idx = this._n;
        const tempo = Math.floor(idx / porTempo) % this.tempos;
        const ehTempo = idx % porTempo === 0;
        this._clique(this._prox, ehTempo && tempo === 0 && this.acento, !ehTempo);
        if (ehTempo && this.aoTempo) {
          const atraso = (this._prox - c.currentTime) * 1000, b = this.bpm;
          setTimeout(() => this.aoTempo && this.aoTempo(tempo, b), Math.max(0, atraso));
        }
        this._n++;
        if (ehTempo && tempo === this.tempos - 1 && (idx % porTempo === 0)) { /* último tempo */ }
        if (this._n % (porTempo * this.tempos) === 0) {
          this._compassos++;
          if (this.treino && this._compassos % this.treino.cada === 0) {
            this.bpm = Math.min(this.treino.max || 300, this.bpm + this.treino.passo);
            if (this.aoMudarBpm) this.aoMudarBpm(this.bpm);
          }
        }
        this._prox += 60 / this.bpm / porTempo;
      }
    },
  };

  // ---------- detecção de altura (YIN simplificado) ----------
  function detectaAltura(buf, sr) {
    const n = buf.length;
    let rms = 0; for (let i = 0; i < n; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / n);
    if (rms < 0.01) return null;
    const maxTau = Math.min(Math.floor(sr / 60), Math.floor(n / 2));
    const minTau = Math.floor(sr / 1500);
    const d = new Float32Array(maxTau);
    for (let tau = minTau; tau < maxTau; tau++) {
      let s = 0;
      for (let i = 0; i < n - maxTau; i++) { const x = buf[i] - buf[i + tau]; s += x * x; }
      d[tau] = s;
    }
    // diferença normalizada cumulativa
    let soma = 0; const cm = new Float32Array(maxTau); cm[minTau] = 1;
    for (let tau = minTau; tau < maxTau; tau++) { soma += d[tau]; cm[tau] = soma ? d[tau] * (tau - minTau + 1) / soma : 1; }
    let tauE = -1;
    for (let tau = minTau + 1; tau < maxTau - 1; tau++) {
      if (cm[tau] < 0.15) { while (tau + 1 < maxTau && cm[tau + 1] < cm[tau]) tau++; tauE = tau; break; }
    }
    if (tauE < 0) return null;
    const a = cm[tauE - 1], b = cm[tauE], c2 = cm[tauE + 1];
    const den = a + c2 - 2 * b;
    const ajuste = den ? (a - c2) / (2 * den) : 0;
    return { f: sr / (tauE + ajuste), rms, clareza: 1 - b };
  }

  // microfone ao vivo
  let mic = null;
  async function micLiga(aoLer) {
    const c = ac();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('sem-api');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    const src = c.createMediaStreamSource(stream);
    const an = c.createAnalyser(); an.fftSize = 4096; src.connect(an);
    const buf = new Float32Array(an.fftSize);
    let vivo = true;
    (function laco() {
      if (!vivo) return;
      an.getFloatTimeDomainData(buf);
      aoLer(detectaAltura(buf, c.sampleRate));
      requestAnimationFrame(laco);
    })();
    mic = { parar() { vivo = false; stream.getTracks().forEach((t) => t.stop()); } };
    return mic;
  }
  function micDesliga() { if (mic) { mic.parar(); mic = null; } }

  // análise de gravação (arquivo enviado pelo aluno)
  async function analisaArquivo(arquivo) {
    const c = ac();
    const dados = await arquivo.arrayBuffer();
    const audio = await c.decodeAudioData(dados);
    const ch = audio.getChannelData(0), sr = audio.sampleRate;
    const janela = 2048, passo = Math.floor(sr * 0.05);
    const pontos = [];
    for (let i = 0; i + janela < ch.length; i += passo) {
      const r = detectaAltura(ch.subarray(i, i + janela), sr);
      pontos.push({ t: i / sr, f: r ? r.f : null, rms: r ? r.rms : 0 });
    }
    return { pontos, duracao: audio.duration };
  }

  window.Audio2 = {
    ac, tocarNota, tocarSequencia, tocarAcorde, parar, droneLiga, droneDesliga, Met, detectaAltura,
    micLiga, micDesliga, analisaArquivo,
    setTimbre(t) { timbreAtual = TIMBRES[t] ? t : 'sax'; },
  };
})();
