/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Motor Completo de Áudio v2:
   - 5 Temas Originais Dinâmicos (+ suporte a faixas externas MP3/WAV/Lyria)
   - Ambiente de Chuva Sintetizado em Web Audio (Pink Noise Filtrado)
   - Efeitos Sonoros em Camadas (SFX)
   - Voz Expressiva PT-BR da Aurora & Narração com Fila por Frases (anti-trava
     Chromium 15s), Keep-Alive, voiceschanged assíncrono e Indicador Ao Vivo
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  const AudioEngine = {};

  let ctx = null;
  let bgmMasterGain = null;
  let sfxMasterGain = null;
  let ambienceMasterGain = null;
  let rainSourceNode = null;
  let rainActive = false;

  let bgmTimer = null;
  let currentTrackId = null;
  let stepIndex = 0;
  let isUnlocked = false;
  let lastHoverSfxAt = 0;
  let customAudioEl = null;
  let customAudioTrackId = null;
  const missingCustomTracks = {};

  // Estado da Voz / TTS
  let speechSeq = 0;
  let speakingNow = false;
  let speechKeepAliveTimer = null;
  let lastSpokenText = "";
  let cachedVoices = [];
  const voiceChangeListeners = [];
  const speakingListeners = [];

  // Caminhos opcionais caso o jogador coloque faixas geradas externamente (Lyria / MP3 / WAV)
  const CUSTOM_BGM_PATHS = {
    sakura_day: "midias/audio/bgm_sakura_day.mp3",
    cafe_bossa: "midias/audio/bgm_cafe_bossa.mp3",
    midnight_404: "midias/audio/bgm_midnight_404.mp3",
    velvet_heat: "midias/audio/bgm_velvet_heat.mp3",
    dark_chess: "midias/audio/bgm_dark_chess.mp3"
  };

  function getSettings() {
    const st = (AG.state && AG.state.settings) || {};
    return {
      soundEnabled: st.soundEnabled !== false,
      hoverSfx: st.hoverSfx !== false,
      sfxVolume: typeof st.sfxVolume === "number" ? st.sfxVolume : 70,
      bgmEnabled: st.bgmEnabled !== false,
      bgmVolume: typeof st.bgmVolume === "number" ? st.bgmVolume : 45,
      bgmMode: st.bgmMode || "auto",
      ambienceEnabled: st.ambienceEnabled !== false,
      voiceEnabled: st.voiceEnabled !== false,
      voiceAutoPlay: st.voiceAutoPlay !== false,
      voiceReadNarration: st.voiceReadNarration === true,
      voiceVolume: typeof st.voiceVolume === "number" ? st.voiceVolume : 85,
      voiceRate: typeof st.voiceRate === "number" ? st.voiceRate : 1.0,
      voicePitch: typeof st.voicePitch === "number" ? st.voicePitch : 1.0,
      voiceName: st.voiceName || ""
    };
  }

  function ensureContext() {
    if (typeof window === "undefined") return null;
    if (!ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      try {
        ctx = new Ctx();
        bgmMasterGain = ctx.createGain();
        sfxMasterGain = ctx.createGain();
        ambienceMasterGain = ctx.createGain();
        bgmMasterGain.connect(ctx.destination);
        sfxMasterGain.connect(ctx.destination);
        ambienceMasterGain.connect(ctx.destination);
        ambienceMasterGain.gain.value = 0;
      } catch (e) {
        return null;
      }
    }
    if (ctx && ctx.state === "suspended") {
      try { ctx.resume(); } catch (e) {}
    }
    syncGains();
    return ctx;
  }

  function ensureRainNode() {
    if (!ctx || !ambienceMasterGain || rainSourceNode) return;
    if (typeof ctx.createBuffer !== "function" || typeof ctx.createBufferSource !== "function") return;
    try {
      const sampleRate = ctx.sampleRate || 44100;
      const length = sampleRate * 3;
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      // Pink noise suave (Paul Kellet filter) — som realista de chuva na vidraça
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
        b6 = white * 0.115926;
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 1150;

      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 240;

      src.connect(lowpass);
      lowpass.connect(highpass);
      highpass.connect(ambienceMasterGain);
      src.start(0);
      rainSourceNode = src;
    } catch (e) {}
  }

  function syncAmbience() {
    const st = getSettings();
    const s = AG.state || {};
    const shouldRain = Boolean(
      isUnlocked &&
      st.ambienceEnabled &&
      st.bgmEnabled &&
      s.weather === "chuva_noturna" &&
      s.mode === "simulator"
    );
    rainActive = shouldRain;

    if (!ctx || !ambienceMasterGain) return;
    if (shouldRain) ensureRainNode();

    const target = shouldRain ? Math.max(0.02, Math.min(1, st.bgmVolume / 100)) * 0.16 : 0;
    try {
      ambienceMasterGain.gain.setTargetAtTime(target, ctx.currentTime, 0.25);
    } catch (e) {
      ambienceMasterGain.gain.value = target;
    }
  }

  function syncGains() {
    const st = getSettings();
    const bgmGainVal = st.bgmEnabled ? Math.max(0, Math.min(1, st.bgmVolume / 100)) * 0.24 : 0;
    const sfxGainVal = st.soundEnabled ? Math.max(0, Math.min(1, st.sfxVolume / 100)) : 0;

    if (ctx && bgmMasterGain) {
      try {
        bgmMasterGain.gain.setTargetAtTime(bgmGainVal, ctx.currentTime, 0.08);
      } catch (e) {
        bgmMasterGain.gain.value = bgmGainVal;
      }
    }
    if (ctx && sfxMasterGain) {
      try {
        sfxMasterGain.gain.setTargetAtTime(sfxGainVal, ctx.currentTime, 0.03);
      } catch (e) {
        sfxMasterGain.gain.value = sfxGainVal;
      }
    }
    if (customAudioEl) {
      customAudioEl.volume = st.bgmEnabled ? Math.max(0, Math.min(1, st.bgmVolume / 100)) * 0.65 : 0;
      if (!st.bgmEnabled && !customAudioEl.paused) {
        try { customAudioEl.pause(); } catch (e) {}
      } else if (st.bgmEnabled && isUnlocked && customAudioEl.paused) {
        try { customAudioEl.play().catch(() => {}); } catch (e) {}
      }
    }
    syncAmbience();
  }

  // ==========================================================================
  // 1. COMPOSIÇÕES ORIGINAIS DINÂMICAS (5 TEMAS DE VISUAL NOVEL LO-FI)
  // ==========================================================================
  function midiToFreq(m) {
    return 440 * Math.pow(2, (m - 69) / 12);
  }

  const BGM_TRACKS = {
    // 1. Dia / Menu / Corredor diurno — Lo-Fi Sakura nostálgico (Fmaj7 -> Em7 -> Dm9 -> Cmaj7)
    sakura_day: {
      label: "Sakura Afternoon (Dia & Menu)",
      stepMs: 740,
      chords: [
        [53, 60, 64, 69], // Fmaj7
        [52, 59, 62, 67], // Em7
        [50, 57, 60, 64], // Dm9
        [48, 55, 59, 64]  // Cmaj7
      ],
      melody: [76, null, 74, 72, 74, null, 72, 69, 72, null, 74, 76, 79, null, 76, 72],
      wave: "triangle",
      cutoff: 1350,
      pulseBeat: false
    },
    // 2. Café Sakura & Praça — Bossa Lo-Fi aconchegante (Dmaj7 -> Bm7 -> Em9 -> A13)
    cafe_bossa: {
      label: "Café Sakura Bossa (Café & Praça)",
      stepMs: 680,
      chords: [
        [50, 57, 61, 66], // Dmaj7
        [47, 54, 57, 62], // Bm7
        [52, 59, 62, 66], // Em9
        [45, 52, 55, 61]  // A13
      ],
      melody: [78, null, 76, 73, 74, null, 71, 69, 74, null, 76, 78, 81, null, 76, 73],
      wave: "triangle",
      cutoff: 1480,
      pulseBeat: false,
      bossaBass: true
    },
    // 3. Madrugada no 4º Andar — Rhodes suave & íntimo (Bmaj7 -> G#m7 -> Emaj7 -> F#6)
    midnight_404: {
      label: "Madrugada no 404 (Noite & Chuva)",
      stepMs: 860,
      chords: [
        [47, 54, 58, 63], // Bmaj7
        [44, 51, 54, 59], // G#m7
        [40, 47, 51, 56], // Emaj7
        [42, 49, 54, 58]  // F#6
      ],
      melody: [73, null, 71, 66, null, 68, 71, null, 75, null, 73, 71, 68, null, 66, null],
      wave: "sine",
      cutoff: 980,
      pulseBeat: false
    },
    // 4. Clima Quente & Cena Íntima 18+ — Velvet minor-9th sensual + pulso suave
    velvet_heat: {
      label: "Velvet Heat (Química & Íntimo)",
      stepMs: 920,
      chords: [
        [48, 55, 58, 62, 63], // Cm9
        [44, 51, 55, 60, 63], // Abmaj7
        [41, 48, 51, 55, 60], // Fm9
        [43, 50, 53, 59, 62]  // G7(9)
      ],
      melody: [74, null, 72, null, 70, 67, null, null, 72, null, 75, 74, 70, null, 67, null],
      wave: "sine",
      cutoff: 820,
      pulseBeat: true
    },
    // 5. Duelo Psicológico / Rota Sombria — Noir misterioso
    dark_chess: {
      label: "Xadrez do 4º Andar (Sombrio)",
      stepMs: 780,
      chords: [
        [50, 57, 60, 64], // Dm9
        [46, 53, 57, 62], // Bbmaj7
        [43, 50, 53, 58], // Gm7
        [45, 52, 55, 61]  // A7
      ],
      melody: [77, null, 76, 74, null, 73, 74, null, 70, null, 69, 67, 69, null, 64, null],
      wave: "triangle",
      cutoff: 900,
      pulseBeat: false
    }
  };

  AudioEngine.BGM_TRACK_OPTIONS = [
    { id: "auto", label: "Automática (muda com o clima e a cena)" },
    { id: "sakura_day", label: BGM_TRACKS.sakura_day.label },
    { id: "cafe_bossa", label: BGM_TRACKS.cafe_bossa.label },
    { id: "midnight_404", label: BGM_TRACKS.midnight_404.label },
    { id: "velvet_heat", label: BGM_TRACKS.velvet_heat.label },
    { id: "dark_chess", label: BGM_TRACKS.dark_chess.label }
  ];

  function playPadChord(notes, durationSec, cutoff, waveType) {
    if (!ctx || !bgmMasterGain) return;
    const now = ctx.currentTime;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(cutoff, now);
    filter.Q.value = 0.8;
    filter.connect(bgmMasterGain);

    notes.forEach((midi, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = idx === 0 ? "sine" : waveType;
      osc.frequency.setValueAtTime(midiToFreq(midi), now);
      osc.detune.setValueAtTime(idx % 2 === 0 ? -4 : 4, now);

      const amp = idx === 0 ? 0.24 : 0.11;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(amp, now + 0.16);
      g.gain.exponentialRampToValueAtTime(0.0008, now + durationSec);

      osc.connect(g);
      g.connect(filter);
      osc.start(now);
      osc.stop(now + durationSec + 0.05);
    });
  }

  function playBellNote(midi, durationSec) {
    if (!ctx || !bgmMasterGain || !midi) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(midiToFreq(midi), now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.09, now + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0008, now + durationSec);
    osc.connect(g);
    g.connect(bgmMasterGain);
    osc.start(now);
    osc.stop(now + durationSec + 0.04);
  }

  function playBossaPluck(midi) {
    if (!ctx || !bgmMasterGain || !midi) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(midiToFreq(midi - 12), now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.14, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.32);
    osc.connect(g);
    g.connect(bgmMasterGain);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  function playVelvetPulse() {
    if (!ctx || !bgmMasterGain) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(68, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.18);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.18, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.22);
    osc.connect(g);
    g.connect(bgmMasterGain);
    osc.start(now);
    osc.stop(now + 0.24);
  }

  function stopSynthLoop() {
    if (bgmTimer) {
      clearInterval(bgmTimer);
      bgmTimer = null;
    }
  }

  function stopCustomAudio() {
    if (customAudioEl) {
      try { customAudioEl.pause(); } catch (e) {}
      customAudioEl = null;
      customAudioTrackId = null;
    }
  }

  function startSynthTrack(trackId) {
    const track = BGM_TRACKS[trackId] || BGM_TRACKS.sakura_day;
    stopSynthLoop();
    stepIndex = 0;

    const tick = () => {
      const st = getSettings();
      if (!st.bgmEnabled || !isUnlocked) return;
      if (!ensureContext()) return;
      const chordIdx = Math.floor(stepIndex / 4) % track.chords.length;
      if (stepIndex % 4 === 0) {
        playPadChord(track.chords[chordIdx], (track.stepMs * 4.2) / 1000, track.cutoff, track.wave);
      }
      if (track.bossaBass && (stepIndex % 4 === 0 || stepIndex % 4 === 2 || stepIndex % 4 === 3)) {
        const bassMidi = stepIndex % 4 === 2 ? track.chords[chordIdx][0] + 7 : track.chords[chordIdx][0];
        playBossaPluck(bassMidi);
      }
      const melNote = track.melody[stepIndex % track.melody.length];
      if (melNote) {
        playBellNote(melNote, (track.stepMs * 1.9) / 1000);
      }
      if (track.pulseBeat && (stepIndex % 4 === 0 || stepIndex % 4 === 2)) {
        playVelvetPulse();
      }
      stepIndex = (stepIndex + 1) % 64;
    };

    tick();
    bgmTimer = setInterval(tick, track.stepMs);
  }

  AudioEngine.resolveDesiredTrack = function () {
    const st = getSettings();
    if (st.bgmMode && st.bgmMode !== "auto" && BGM_TRACKS[st.bgmMode]) {
      return st.bgmMode;
    }
    const s = AG.state;
    if (!s) return "sakura_day";
    const a = s.aurora || {};
    if (s.mode === "title_menu") return "sakura_day";
    if (
      s.activeIntimateScene ||
      (s.activeRandomEvent && ["scene_private_spicy_room", "scene_intimate_tension_404"].includes(s.activeRandomEvent.id)) ||
      a.heat >= 55 ||
      (a.arousal || 0) >= 60
    ) {
      return "velvet_heat";
    }
    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    if (fam === "sombria" || (a.auroraDarkness || 0) >= 48 || (a.leveragePressure || 0) >= 30) {
      return "dark_chess";
    }
    if (s.currentLocation === "cafe_sakura" || s.currentLocation === "praca_cerejeiras") {
      return "cafe_bossa";
    }
    if (s.hour >= 20 || s.hour < 6 || s.weather === "chuva_noturna" || s.weather === "apagao_andar") {
      return "midnight_404";
    }
    return "sakura_day";
  };

  AudioEngine.syncBgm = function () {
    const st = getSettings();
    syncGains();
    if (!st.bgmEnabled) {
      stopSynthLoop();
      stopCustomAudio();
      currentTrackId = null;
      return;
    }
    if (!isUnlocked) return;

    const desired = AudioEngine.resolveDesiredTrack();
    if (desired === currentTrackId && (bgmTimer || customAudioEl)) return;
    currentTrackId = desired;

    // Tenta faixa externa (Lyria/MP3) primeiro; se não existir em midias/audio/, usa o sintetizador nativo
    if (typeof window !== "undefined" && typeof window.Audio === "function" && CUSTOM_BGM_PATHS[desired] && !missingCustomTracks[desired]) {
      stopSynthLoop();
      stopCustomAudio();
      try {
        const el = new window.Audio(CUSTOM_BGM_PATHS[desired]);
        el.loop = true;
        el.volume = Math.max(0, Math.min(1, st.bgmVolume / 100)) * 0.65;
        customAudioEl = el;
        customAudioTrackId = desired;
        el.addEventListener("error", () => {
          missingCustomTracks[desired] = true;
          if (customAudioEl === el) {
            customAudioEl = null;
            customAudioTrackId = null;
            if (getSettings().bgmEnabled && currentTrackId === desired) {
              startSynthTrack(desired);
            }
          }
        }, { once: true });
        const p = el.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            missingCustomTracks[desired] = true;
            if (customAudioEl === el) {
              customAudioEl = null;
              startSynthTrack(desired);
            }
          });
        }
        return;
      } catch (e) {
        missingCustomTracks[desired] = true;
      }
    }

    startSynthTrack(desired);
  };

  AudioEngine.getCurrentTrackLabel = function () {
    const id = currentTrackId || AudioEngine.resolveDesiredTrack();
    return (BGM_TRACKS[id] && BGM_TRACKS[id].label) || "Sakura Afternoon";
  };

  AudioEngine.isRainAmbienceActive = function () {
    return rainActive;
  };

  // ==========================================================================
  // 2. EFEITOS SONOROS EM CAMADAS (SFX)
  // ==========================================================================
  AudioEngine.playSfx = function (type) {
    const st = getSettings();
    if (!st.soundEnabled) return;
    if (type === "hover") {
      if (!st.hoverSfx) return;
      const nowMs = Date.now();
      if (nowMs - lastHoverSfxAt < 65) return;
      lastHoverSfxAt = nowMs;
    }
    if (!ensureContext() || !sfxMasterGain) return;

    const now = ctx.currentTime;
    const makeTone = (wave, f1, f2, startOff, dur, vol) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(f1, now + startOff);
      if (f2 && f2 !== f1) osc.frequency.exponentialRampToValueAtTime(f2, now + startOff + dur);
      g.gain.setValueAtTime(0.0001, now + startOff);
      g.gain.linearRampToValueAtTime(vol, now + startOff + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0008, now + startOff + dur);
      osc.connect(g);
      g.connect(sfxMasterGain);
      osc.start(now + startOff);
      osc.stop(now + startOff + dur + 0.02);
    };

    try {
      if (type === "hover") {
        makeTone("sine", 780, 920, 0, 0.032, 0.024);
      } else if (type === "click") {
        makeTone("sine", 540, 760, 0, 0.048, 0.055);
        makeTone("triangle", 1080, 1280, 0.012, 0.04, 0.022);
      } else if (type === "page") {
        makeTone("triangle", 420, 620, 0, 0.06, 0.042);
        makeTone("sine", 620, 720, 0.025, 0.055, 0.025);
      } else if (type === "msg") {
        makeTone("sine", 784, 784, 0, 0.075, 0.05);
        makeTone("sine", 1046.5, 1046.5, 0.07, 0.14, 0.055);
      } else if (type === "heart") {
        makeTone("triangle", 523.25, 523.25, 0, 0.13, 0.055);
        makeTone("triangle", 659.25, 659.25, 0.065, 0.15, 0.055);
        makeTone("sine", 783.99, 783.99, 0.13, 0.22, 0.052);
        makeTone("sine", 987.77, 987.77, 0.18, 0.26, 0.034);
      } else if (type === "hot") {
        makeTone("sine", 110, 72, 0, 0.16, 0.085);
        makeTone("sine", 349.23, 440, 0.02, 0.22, 0.048);
        makeTone("triangle", 523.25, 622.25, 0.08, 0.26, 0.04);
      } else if (type === "touch") {
        makeTone("sine", 659.25, 880, 0, 0.08, 0.048);
        makeTone("sine", 987.77, 1174.66, 0.045, 0.12, 0.032);
      } else if (type === "unlock") {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          makeTone("triangle", f, f, i * 0.06, 0.26, 0.048);
        });
      } else if (type === "warn") {
        makeTone("triangle", 240, 175, 0, 0.16, 0.062);
        makeTone("sine", 190, 148, 0.05, 0.18, 0.045);
      }
    } catch (e) {}
  };

  // ==========================================================================
  // 3. VOZ & NARRAÇÃO EXPRESSIVA PT-BR (Anti-Corte Chromium + Fila + Live UI)
  // ==========================================================================
  function cleanSpeechForTTS(rawText) {
    return String(rawText || "")
      .replace(/\*[^*]+\*/g, " ")
      .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "")
      .replace(/^\s*—\s*/gm, "")
      .replace(/\s*\n+\s*/g, ". ")
      .replace(/\.{2,}/g, "… ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function splitIntoSpeechChunks(cleanText, maxLen = 165) {
    const text = String(cleanText || "").trim();
    if (!text) return [];
    if (text.length <= maxLen) return [text];

    // Divide respeitando frases naturais (. ! ? …) para entonação limpa e evitar corte de 15s no Chrome
    const sentences = text.match(/[^.!?…]+(?:[.!?…]+|$)/g) || [text];
    const chunks = [];
    let current = "";

    const pushCurrent = () => {
      const t = current.trim();
      if (t) chunks.push(t);
      current = "";
    };

    for (const rawSentence of sentences) {
      const s = rawSentence.trim();
      if (!s) continue;
      if (s.length > maxLen) {
        pushCurrent();
        // Quebra frases muito longas em vírgulas/ponto-e-vírgula ou espaços
        const clauses = s.split(/(?<=[,;:])\s+/);
        let sub = "";
        for (const cl of clauses) {
          if (sub && (sub.length + 1 + cl.length) > maxLen) {
            chunks.push(sub.trim());
            sub = cl;
          } else if (cl.length > maxLen) {
            if (sub) { chunks.push(sub.trim()); sub = ""; }
            let rem = cl;
            while (rem.length > maxLen) {
              let cut = rem.lastIndexOf(" ", maxLen);
              if (cut < 40) cut = maxLen;
              chunks.push(rem.slice(0, cut).trim());
              rem = rem.slice(cut).trim();
            }
            sub = rem;
          } else {
            sub = sub ? `${sub} ${cl}` : cl;
          }
        }
        if (sub.trim()) chunks.push(sub.trim());
      } else if (current && (current.length + 1 + s.length) > maxLen) {
        pushCurrent();
        current = s;
      } else {
        current = current ? `${current} ${s}` : s;
      }
    }
    pushCurrent();
    return chunks;
  }

  AudioEngine.splitIntoSpeechChunks = splitIntoSpeechChunks;

  function setSpeakingState(active) {
    const next = Boolean(active);
    speakingNow = next;
    if (typeof document !== "undefined" && document.body) {
      document.body.setAttribute("data-speaking", next ? "on" : "off");
    }
    if (!next && speechKeepAliveTimer) {
      clearInterval(speechKeepAliveTimer);
      speechKeepAliveTimer = null;
    }
    speakingListeners.forEach((cb) => {
      try { cb(next); } catch (e) {}
    });
  }

  function startSpeechKeepAlive() {
    if (speechKeepAliveTimer) clearInterval(speechKeepAliveTimer);
    if (typeof setInterval !== "function") return;
    speechKeepAliveTimer = setInterval(() => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      if (!speakingNow) {
        clearInterval(speechKeepAliveTimer);
        speechKeepAliveTimer = null;
        return;
      }
      try {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          if (typeof window.speechSynthesis.pause === "function") window.speechSynthesis.pause();
          if (typeof window.speechSynthesis.resume === "function") window.speechSynthesis.resume();
        }
      } catch (e) {}
    }, 9000);
  }

  function refreshCachedVoices() {
    if (typeof window === "undefined" || !window.speechSynthesis || typeof window.speechSynthesis.getVoices !== "function") {
      return [];
    }
    const all = window.speechSynthesis.getVoices() || [];
    cachedVoices = all;
    return all;
  }

  if (typeof window !== "undefined" && window.speechSynthesis) {
    const notifyVoiceChange = () => {
      refreshCachedVoices();
      voiceChangeListeners.forEach((cb) => {
        try { cb(AudioEngine.getAvailablePortugueseVoices()); } catch (e) {}
      });
    };
    try {
      if (typeof window.speechSynthesis.addEventListener === "function") {
        window.speechSynthesis.addEventListener("voiceschanged", notifyVoiceChange);
      } else {
        window.speechSynthesis.onvoiceschanged = notifyVoiceChange;
      }
      refreshCachedVoices();
    } catch (e) {}
  }

  AudioEngine.onVoicesChanged = function (cb) {
    if (typeof cb === "function") voiceChangeListeners.push(cb);
  };

  AudioEngine.onSpeakingChange = function (cb) {
    if (typeof cb === "function") speakingListeners.push(cb);
  };

  AudioEngine.getAvailablePortugueseVoices = function () {
    const all = refreshCachedVoices();
    const list = all.length ? all : cachedVoices;
    const pt = list.filter((v) => /^pt/i.test(v.lang || ""));
    return pt.length ? pt : list.slice(0, 10);
  };

  function pickBestAuroraVoice(preferredName) {
    const voices = AudioEngine.getAvailablePortugueseVoices();
    if (!voices.length) return null;
    if (preferredName) {
      const exact = voices.find((v) => v.name === preferredName);
      if (exact) return exact;
    }
    const femHints = ["francisca", "thalita", "raquel", "maria", "leticia", "luciana", "fernanda", "brenda", "elza", "giovanna", "google português", "female", "natural"];
    for (const h of femHints) {
      const hit = voices.find((v) => (v.name || "").toLowerCase().includes(h) && /^pt-?br/i.test(v.lang || ""));
      if (hit) return hit;
    }
    const ptBr = voices.find((v) => /^pt-?br/i.test(v.lang || ""));
    return ptBr || voices[0];
  }

  AudioEngine.isSpeaking = function () {
    return speakingNow;
  };

  AudioEngine.getLastSpokenText = function () {
    return lastSpokenText;
  };

  AudioEngine.stopVoice = function () {
    speechSeq += 1;
    setSpeakingState(false);
    if (typeof window !== "undefined" && window.speechSynthesis && typeof window.speechSynthesis.cancel === "function") {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  };

  function computeExpressiveProfile(mode, st) {
    const userPitch = Math.max(0.85, Math.min(1.2, st.voicePitch || 1.0));
    const userRate = Math.max(0.75, Math.min(1.35, st.voiceRate || 1.0));

    if (mode === "narration") {
      return {
        pitch: Math.max(0.7, Math.min(1.35, 0.98 * userPitch)),
        rate: Math.max(0.7, Math.min(1.45, userRate * 0.97))
      };
    }

    const s = AG.state || {};
    const a = s.aurora || {};
    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const isIntimate = !!(s.activeIntimateScene || a.heat >= 60);

    let basePitch = 1.14;
    let rateMul = 1.0;
    if (isIntimate || fam === "quimica") { basePitch = 1.07; rateMul = 0.90; }
    else if (fam === "caotica") { basePitch = 1.21; rateMul = 1.08; }
    else if (fam === "vulneravel") { basePitch = 1.11; rateMul = 0.88; }
    else if (fam === "conflito") { basePitch = 1.05; rateMul = 1.07; }
    else if (fam === "sombria") { basePitch = 1.01; rateMul = 0.92; }

    return {
      pitch: Math.max(0.68, Math.min(1.45, Number((basePitch * userPitch).toFixed(3)))),
      rate: Math.max(0.7, Math.min(1.5, Number((userRate * rateMul).toFixed(3))))
    };
  }

  function speakTextInternal(rawText, opts = {}) {
    const st = getSettings();
    if (!st.voiceEnabled && !opts.force) return false;
    if (typeof window === "undefined" || !window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== "function") {
      return false;
    }

    const clean = cleanSpeechForTTS(rawText);
    if (!clean) return false;

    const chunks = splitIntoSpeechChunks(clean, 165);
    if (!chunks.length) return false;

    lastSpokenText = clean;
    const token = ++speechSeq;

    try {
      window.speechSynthesis.cancel();
      const chosen = pickBestAuroraVoice(st.voiceName);
      const prof = computeExpressiveProfile(opts.mode || "aurora", st);
      const vol = Math.max(0, Math.min(1, st.voiceVolume / 100));

      setSpeakingState(true);
      startSpeechKeepAlive();

      const speakChunkAt = (idx) => {
        if (token !== speechSeq) return;
        if (idx >= chunks.length) {
          setSpeakingState(false);
          return;
        }
        const utt = new window.SpeechSynthesisUtterance(chunks[idx]);
        utt.lang = "pt-BR";
        if (chosen) utt.voice = chosen;
        utt.pitch = prof.pitch;
        utt.rate = prof.rate;
        utt.volume = vol;

        utt.onend = () => {
          if (token !== speechSeq) return;
          if (idx + 1 < chunks.length) {
            speakChunkAt(idx + 1);
          } else {
            setSpeakingState(false);
          }
        };
        utt.onerror = () => {
          if (token !== speechSeq) return;
          setSpeakingState(false);
        };

        window.speechSynthesis.speak(utt);
      };

      speakChunkAt(0);
      return true;
    } catch (e) {
      setSpeakingState(false);
      return false;
    }
  }

  AudioEngine.speakAurora = function (rawText, opts = {}) {
    return speakTextInternal(rawText, Object.assign({}, opts, { mode: "aurora" }));
  };

  AudioEngine.speakNarration = function (rawText, opts = {}) {
    return speakTextInternal(rawText, Object.assign({}, opts, { mode: "narration" }));
  };

  AudioEngine.toggleSpeak = function (rawText, opts = {}) {
    if (speakingNow) {
      AudioEngine.stopVoice();
      return false;
    }
    const target = rawText || lastSpokenText;
    if (!target) return false;
    return speakTextInternal(target, Object.assign({}, opts, { force: true }));
  };

  AudioEngine.speakDialogueEntry = function (entry) {
    if (!entry) return false;
    const st = getSettings();
    if (!st.voiceEnabled || !st.voiceAutoPlay) return false;
    const a = (AG.state && AG.state.aurora) || {};
    if (entry.speech && a.activity !== "dormindo") {
      return AudioEngine.speakAurora(entry.speech);
    }
    if (st.voiceReadNarration && entry.text) {
      return AudioEngine.speakNarration(entry.text);
    }
    return false;
  };

  AudioEngine.unlock = function () {
    if (!isUnlocked) {
      isUnlocked = true;
      ensureContext();
    }
    AudioEngine.syncBgm();
  };

  AudioEngine.syncSettings = function () {
    syncGains();
    if (!getSettings().voiceEnabled) AudioEngine.stopVoice();
    AudioEngine.syncBgm();
  };

  // Desbloqueio automático na primeira interação real do jogador
  if (typeof window !== "undefined" && window.addEventListener) {
    const onFirstGesture = () => {
      AudioEngine.unlock();
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
  }

  // Substitui o playSound básico de state.js pelo motor rico em camadas!
  AG.playSound = function (type) {
    AudioEngine.playSfx(type);
  };

  AG.Audio = AudioEngine;
})(window.AuroraGame);
