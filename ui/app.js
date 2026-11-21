/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Interface Editorial de Simulador & Visual Novel (v7)
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  let activeModal = null;
  let activeTypewriterTimer = null;
  let activeTypewriterFinish = null;
  let currentShortcutActions = [];
  let dialogueExpanded = false;
  let stageUiHidden = false;
  let stageTouchTimer = null;
  let lastTouchActionStamp = -1;

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function stripLeadingEmoji(str) {
    if (!str) return "";
    return String(str)
      .replace(/^(?:[\p{Extended_Pictographic}\uFE0F\u200D\u2600-\u27BF]+(?:\s+|$))+/u, "")
      .trim();
  }

  // Transforma títulos técnicos de ações em rótulos limpos e humanos de simulador,
  // movendo duração/preço para o chip lateral e preservando detalhes no modo Detalhado.
  function formatActionCopy(rawTitle, explicitMins) {
    let text = stripLeadingEmoji(rawTitle || "");
    let tag = "";
    let chip = explicitMins ? `${explicitMins}m` : "";
    const metaNotes = [];

    // Extrai prefixo [Tag] se existir
    const tagMatch = text.match(/^\[([^\]]+)\]\s*/);
    if (tagMatch) {
      tag = stripLeadingEmoji(tagMatch[1]);
      text = text.slice(tagMatch[0].length).trim();
    }

    // Remove marcações técnicas soltas como (PNG 4)
    text = text.replace(/\s*\(PNG[^)]*\)/gi, "").trim();

    // Analisa parênteses finais que contenham metadados mecânicos (tempo, preço, fórmulas)
    const metaPattern = /(R\$\s*\d+|\b\d+\s*(?:m|min|h)\b|[+-]\d|•|→|Armadura|Influência|Suspeita|Rivalidade|Trunfo|Rastros|Atrito|Saciedade|Energia|Desejo|Calma|Afinidade|Clima|Intimidade|Confiança|Requer|Usa\s|Desbloqueia|Atrai\s|Zera\s|Love-Bombing)/i;

    let guard = 0;
    while (guard < 3) {
      guard++;
      const parenMatch = text.match(/\s*\(([^()]+)\)\s*$/);
      if (!parenMatch) break;
      const inner = parenMatch[1].trim();
      if (!metaPattern.test(inner)) break;

      const timeMatch = inner.match(/\b(\d+\s*(?:m|h))\b/i);
      const priceMatch = inner.match(/(R\$\s*\d+)/i);
      if (priceMatch && !chip) chip = priceMatch[1].replace(/\s+/g, " ");
      else if (timeMatch && !chip) chip = timeMatch[1].replace(/\s+/g, "");

      const cleanedInner = inner
        .replace(/(?:^|[•·]\s*)\b\d+\s*(?:m|h)\b/gi, "")
        .replace(/(?:^|[•·]\s*)R\$\s*\d+/gi, "")
        .replace(/^[•·\s]+|[•·\s]+$/g, "")
        .trim();
      if (cleanedInner) metaNotes.unshift(stripLeadingEmoji(cleanedInner));

      text = text.slice(0, parenMatch.index).trim();
    }

    return {
      title: text || rawTitle || "",
      tag,
      chip,
      metaNote: metaNotes.join(" · ")
    };
  }

  function getTimePhaseKey(hour) {
    if (hour >= 0 && hour < 6) return "madrugada";
    if (hour >= 6 && hour < 12) return "manha";
    if (hour >= 12 && hour < 18) return "tarde";
    return "noite";
  }

  function clearTypewriter() {
    if (activeTypewriterTimer) {
      clearInterval(activeTypewriterTimer);
      activeTypewriterTimer = null;
    }
    activeTypewriterFinish = null;
  }

  function ensureToastLayer() {
    let layer = document.getElementById("vn-toast-layer");
    if (!layer && document.body && document.createElement) {
      layer = document.createElement("div");
      layer.id = "vn-toast-layer";
      document.body.appendChild(layer);
    }
    return layer;
  }

  AG.flushToasts = function () {
    const queue = AG.pendingToasts || [];
    if (!queue.length) return;
    const items = queue.splice(0, queue.length);
    const layer = ensureToastLayer();
    if (!layer) return;

    // Prioriza os 4 pop-ups mais informativos (limpo e sem poluir a tela)
    const compact = items.slice(-4);
    compact.forEach((item, idx) => {
      const el = document.createElement("div");
      el.className = `vn-toast t-${item.kind || "info"}`;
      const arrow = item.dir === "up" ? "▲" : item.dir === "down" ? "▼" : "•";
      el.innerHTML = `<span class="vn-toast-arrow">${arrow}</span><span>${escapeHtml(item.text)}</span>`;
      const dismiss = () => {
        if (!el.parentNode) return;
        el.className += " vn-toast-out";
        setTimeout(() => {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 280);
      };

      setTimeout(() => {
        layer.appendChild(el);
        while (layer.children && layer.children.length > 4 && layer.removeChild) {
          layer.removeChild(layer.children[0]);
        }
        setTimeout(dismiss, 2600 + idx * 160);
      }, idx * 50);
    });
  };

  AG.touchAuroraOnStage = function (stagePane) {
    const s = AG.state;
    const a = s.aurora;
    if (!AG.isAuroraHere()) return "";

    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const pickLine = (arr) => arr[(s.totalActionsTaken + Math.floor(Math.random() * arr.length)) % arr.length];
    let text = "";
    let sound = "heart";
    let microDelta = null;

    if (a.activity === "dormindo") {
      sound = "click";
      text = pickLine([
        "\"Hmmm... só mais cinco minutinhos, 402...\"",
        "\"Mmm... quentinho... não acorda eu agora...\""
      ]);
    } else if (s.activeIntimateScene) {
      sound = "hot";
      text = pickLine([
        "\"Ei... ficar me tocando assim no meio do momento só me faz perder o resto do fôlego.\"",
        "\"Suas mãos tão quentes demais hoje... continua.\""
      ]);
    } else if (a.discomfort >= 55) {
      sound = "warn";
      text = pickLine([
        "\"Tira a mão, 402. Não tô no clima pra gracinha agora.\"",
        "\"Espaço pessoal, por favor.\""
      ]);
      microDelta = { discomfort: 1 };
    } else if (fam === "sombria" || a.dominance >= 52) {
      sound = "click";
      text = pickLine([
        "\"Encostando em mim sem pedir permissão? Corajoso você...\"",
        "\"Gosto quando você toma iniciativa — desde que lembre quem manda no quarto andar.\""
      ]);
      microDelta = { heat: 1 };
    } else if (a.wearingUniform) {
      sound = "hot";
      text = pickLine([
        "\"Ei, mãos quietas enquanto eu tô de uniforme... pelo menos até eu sair do balcão!\"",
        "\"Olhando pro laço do meu avental de novo, 402? Disfarça!\""
      ]);
      microDelta = { heat: 1 };
    } else if (a.heat >= 45 || (a.arousal || 0) >= 50) {
      sound = "hot";
      text = pickLine([
        "\"Você encosta desse jeito sabendo exatamente o arrepio que me dá, né?\"",
        "\"Continua me cutucando assim e eu puxo você pela gola agora mesmo.\"",
        "\"Olha esse olhar... já perdi completamente o foco.\""
      ]);
      microDelta = { heat: 1 };
    } else if (a.affinity >= 40 || fam === "vulneravel") {
      sound = "heart";
      text = pickLine([
        "\"Aí você me derrete inteira, 402...\"",
        "\"Fica perto assim mais um pouquinho.\"",
        "\"Seu toque acalma minha cabeça na hora.\""
      ]);
      microDelta = { affinity: 1 };
    } else {
      sound = "click";
      text = pickLine([
        "\"Ei! Para de cutucar como se eu fosse um chaveirinho de 1,49m!\"",
        "\"O que foi, poste do 402? Tá querendo atenção?\"",
        "\"Tô vendo esse seu sorrisinho aí de cima, viu?\""
      ]);
      microDelta = { affinity: 1 };
    }

    AG.playSound(sound === "click" ? "touch" : sound);
    if (AG.Audio && AG.Audio.speakAurora && a.activity !== "dormindo") {
      AG.Audio.speakAurora(text);
    }
    if (microDelta && lastTouchActionStamp !== s.totalActionsTaken) {
      lastTouchActionStamp = s.totalActionsTaken;
      AG.applyDeltas(microDelta);
      AG.flushToasts();
    }

    if (stagePane && stagePane.querySelector) {
      const img = stagePane.querySelector("#active-stage-png");
      if (img && img.className && !img.className.includes("is-touched")) {
        img.className += " is-touched";
        setTimeout(() => {
          img.className = img.className.replace(/\s*is-touched/g, "");
        }, 360);
      }
      const canvas = stagePane.querySelector(".vn-character-canvas");
      if (canvas) {
        let bubble = canvas.querySelector(".stage-touch-bubble");
        if (!bubble) {
          bubble = document.createElement("div");
          bubble.className = "stage-touch-bubble";
          canvas.appendChild(bubble);
        }
        bubble.textContent = text;
        if (stageTouchTimer) clearTimeout(stageTouchTimer);
        stageTouchTimer = setTimeout(() => {
          if (bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble);
        }, 3400);
      }
    }
    return text;
  };

  AG.render = function () {
    clearTypewriter();
    currentShortcutActions = [];
    const root = document.getElementById("app-root");
    if (!root) return;
    if (AG.applyVisualSettings) AG.applyVisualSettings();
    const s = AG.state;
    const a = s.aurora || {};
    const isIntimateNow = !!(
      s.activeIntimateScene ||
      (s.activeRandomEvent && ["scene_private_spicy_room", "scene_intimate_tension_404"].includes(s.activeRandomEvent.id))
    );
    if (document.body && document.body.setAttribute) {
      const heatTier = (a.heat >= 45 || (a.arousal || 0) >= 55) ? "high" : a.heat >= 25 ? "mid" : "low";
      const moodFam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
      document.body.setAttribute("data-heat-tier", heatTier);
      document.body.setAttribute("data-intimate", isIntimateNow ? "on" : "off");
      document.body.setAttribute("data-mood-fam", moodFam);
      document.body.setAttribute("data-phase", getTimePhaseKey(s.hour));
    }
    root.innerHTML = "";

    if (s.mode === "title_menu") {
      root.appendChild(renderSingleScreenTitleMenu());
    } else if (s.mode === "narration") {
      root.appendChild(renderNarrationScreen());
    } else if (s.mode === "ending") {
      root.appendChild(renderCleanTopBar());
      root.appendChild(renderEndingScreen());
    } else {
      root.appendChild(renderCleanTopBar());
      root.appendChild(renderCleanSimulator());
    }

    if (activeModal) {
      root.appendChild(renderModal(activeModal));
    }

    if (AG.Audio && AG.Audio.syncBgm) AG.Audio.syncBgm();
    AG.flushToasts();
  };

  // ==========================================================================
  // MENU PRINCIPAL (100vh, Editorial, Aurora Integrada na Composição)
  // ==========================================================================
  function renderSingleScreenTitleMenu() {
    const s = AG.state;
    const autoInfo = AG.getSaveInfo("autosave");
    const menuPngPath = s.aurora.customAvatars.menuCute || AG.MEDIA_PATHS.character.menuCute;
    const totalEndings = Object.keys(AG.ENDINGS).length;

    const screen = document.createElement("main");
    screen.className = "menu-single-screen";

    screen.innerHTML = `
      <div class="menu-stage-hub">
        <div class="menu-brand-side">
          <div class="menu-kicker">santni productions · apê 404</div>
          <img src="${AG.MEDIA_PATHS.logos.gameLogo}" alt="My Favorite Woman Is Small" class="menu-official-logo" />
          <div class="menu-interactive-speech" id="menu-aurora-speech">
            <span>Aurora · 1,49m</span>
            <div id="menu-speech-text">"Para onde você tá olhando aí de cima, hein? Decide logo se vai continuar de onde a gente parou ou começar tudo de novo comigo."</div>
          </div>
        </div>

        <div class="menu-center-aurora">
          <img
            src="${menuPngPath}"
            alt="Aurora"
            class="menu-aurora-integrated-png"
            id="menu-hero-png2"
            title="Clique na Aurora"
          />
        </div>

        <div class="menu-controls-side">
          ${
            autoInfo
              ? `<button class="menu-pill-btn primary" id="m-btn-continue" data-speech="Demorou, hein. Tava te esperando no Dia ${autoInfo.day}, às ${autoInfo.time}. Vamos voltar pro quarto andar?">
                   <span>Continuar</span>
                   <span class="menu-btn-meta">Dia ${autoInfo.day} · ${autoInfo.time}</span>
                 </button>`
              : ""
          }
          <button class="menu-pill-btn ${autoInfo ? "" : "primary"}" id="m-btn-new" data-speech="Vai começar do zero só pra ver como a gente se esbarra no corredor às 23h15?">
            <span>Novo Jogo</span>
            <span class="menu-btn-meta">Prólogo</span>
          </button>
          <button class="menu-pill-btn" id="m-btn-saves" data-speech="Quer salvar, carregar outro momento nosso ou recomeçar tudo? Fica tudo guardado aqui.">
            <span>Saves & Reset</span>
            <span class="menu-btn-meta">4 slots</span>
          </button>
          <button class="menu-pill-btn" id="m-btn-media" data-speech="Aqui ficam os 20 espaços prontos pros meus PNGs — casual, uniforme e cenas especiais.">
            <span>Galeria de PNGs</span>
            <span class="menu-btn-meta">20 cenas</span>
          </button>
          <button class="menu-pill-btn" id="m-btn-endings" data-speech="Você já desbloqueou ${s.unlockedEndings.length} dos nossos ${totalEndings} finais possíveis. Qual rota vai tentar agora?">
            <span>Finais</span>
            <span class="menu-btn-meta">${s.unlockedEndings.length}/${totalEndings}</span>
          </button>
          <button class="menu-pill-btn" id="m-btn-settings" data-speech="Ajusta o tema, o ritmo do texto e o nível de detalhe dos botões do jeito que preferir.">
            <span>Configurações</span>
            <span class="menu-btn-meta">Tema · Texto</span>
          </button>
          <button class="menu-pill-btn" id="m-btn-studio" data-speech="Créditos da santni studio e santni productions.">
            <span>Estúdio</span>
            <span class="menu-btn-meta">santni</span>
          </button>
        </div>
      </div>
    `;

    setTimeout(() => {
      const heroImg = screen.querySelector("#menu-hero-png2");
      const speechText = screen.querySelector("#menu-speech-text");

      if (heroImg) {
        heroImg.addEventListener("error", () => {
          heroImg.src = AG.MEDIA_PATHS.logos.bowIcon;
          heroImg.className = "menu-bow-emblem-fallback";
        });
        heroImg.addEventListener("click", () => {
          AG.playSound("heart");
          const lines = [
            "\"Ei, para de cutucar minha tela e entra logo no jogo.\"",
            "\"1,49m de altura sim, mas mando no quarto andar inteiro, tá bom?\"",
            "\"Colocou meus PNGs novos na pasta midias/? Quero ficar impecável na cena.\"",
            "\"Ficar parado no menu olhando pra mim também conta como provocação, viu?\""
          ];
          if (speechText) speechText.textContent = lines[Math.floor(Math.random() * lines.length)];
        });
      }

      screen.querySelectorAll("[data-speech]").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          if (speechText) speechText.textContent = `"${btn.getAttribute("data-speech")}"`;
        });
      });

      const bind = (id, fn) => {
        const el = screen.querySelector(id);
        if (el) el.addEventListener("click", fn);
      };

      bind("#m-btn-continue", () => { AG.playSound("heart"); AG.loadGame("autosave"); AG.render(); });
      bind("#m-btn-new", () => { AG.playSound("heart"); AG.resetNewGame(true); AG.render(); });
      bind("#m-btn-saves", () => { AG.playSound("click"); activeModal = "save_load"; AG.render(); });
      bind("#m-btn-media", () => { AG.playSound("click"); activeModal = "custom_media"; AG.render(); });
      bind("#m-btn-endings", () => { AG.playSound("click"); activeModal = "diary"; AG.render(); });
      bind("#m-btn-settings", () => { AG.playSound("click"); activeModal = "settings"; AG.render(); });
      bind("#m-btn-studio", () => { AG.playSound("click"); activeModal = "studio_credits"; AG.render(); });
    }, 0);

    return screen;
  }

  // ==========================================================================
  // TOP BAR EDITORIAL (Fina, Desktop, Sem Poluição Visual)
  // ==========================================================================
  function renderCleanTopBar() {
    const s = AG.state;
    const u = s.unlocks || {};
    const phase = AG.getPhaseOfDay(s.hour);
    const locObj = AG.LOCATIONS[s.currentLocation] || AG.LOCATIONS.corredor_4andar;
    const ph = s.phoneState || {};
    const phaseWord = stripLeadingEmoji(phase.label || "");
    const weatherInfo = AG.getWeatherInfo ? AG.getWeatherInfo() : { short: "", label: "" };

    const header = document.createElement("header");
    header.className = "top-bar";

    const unreadDot = (s.aurora.unreadPhoneMessages > 0 || ph.tracksRisk >= 50)
      ? `<span class="notif-dot" title="Alerta no celular"></span>`
      : "";
    const invCount = s.inventory.reduce((acc, i) => acc + i.qty, 0);

    header.innerHTML = `
      <div class="top-left-hud">
        <span class="hud-brand-mark">
          <img src="${AG.MEDIA_PATHS.logos.bowIcon}" alt="Laço" class="bow-mini-icon" />
        </span>
        <span class="hud-clock-block">Dia ${s.day} · ${AG.getWeekdayName(s.day)} · ${AG.getFormattedClock()} · ${escapeHtml(phaseWord)}</span>
        ${weatherInfo.short ? `<span class="hud-weather-tag" title="${escapeHtml(weatherInfo.label)}">${escapeHtml(weatherInfo.short)}</span>` : ""}
        <span class="hud-location-tag">${escapeHtml(locObj.shortName)}</span>
        <span class="hud-money-tag">R$ ${s.player.money}</span>
      </div>

      <div class="top-actions">
        <button class="icon-btn top-audio-btn ${s.settings && s.settings.bgmEnabled === false ? "is-muted" : ""}" id="btn-quick-bgm" title="Ligar/mutar trilha sonora (tecla M)">♪</button>
        <button class="icon-btn bordered" id="btn-open-phone">Celular ${unreadDot}</button>
        ${
          u.hasUnpackedBackpack
            ? `<button class="icon-btn" id="btn-open-inv">Mochila${invCount > 0 ? ` (${invCount})` : ""}</button>`
            : ""
        }
        <button class="icon-btn" id="btn-open-status">Ficha & Memórias</button>
        <button class="icon-btn" id="btn-open-media">PNGs</button>
        <button class="icon-btn" id="btn-open-save">Saves</button>
        <button class="icon-btn" id="btn-open-settings">Ajustes</button>
        <button class="icon-btn" id="btn-go-menu">Menu</button>
      </div>
    `;

    setTimeout(() => {
      const bind = (id, fn) => {
        const el = header.querySelector(id);
        if (el) el.addEventListener("click", fn);
      };
      bind("#btn-quick-bgm", () => {
        s.settings.bgmEnabled = s.settings.bgmEnabled === false ? true : false;
        AG.applyVisualSettings();
        AG.saveGame("autosave");
        AG.queueToast(s.settings.bgmEnabled ? "Música ligada" : "Música mutada", "info", "info");
        AG.render();
      });
      bind("#btn-open-phone", () => { AG.playSound("click"); s.aurora.unreadPhoneMessages = 0; activeModal = "phone"; AG.render(); });
      bind("#btn-open-status", () => { AG.playSound("click"); activeModal = "status_memories"; AG.render(); });
      bind("#btn-open-inv", () => { AG.playSound("click"); activeModal = "inventory"; AG.render(); });
      bind("#btn-open-media", () => { AG.playSound("click"); activeModal = "custom_media"; AG.render(); });
      bind("#btn-open-save", () => { AG.playSound("click"); activeModal = "save_load"; AG.render(); });
      bind("#btn-open-settings", () => { AG.playSound("click"); activeModal = "settings"; AG.render(); });
      bind("#btn-go-menu", () => {
        AG.playSound("click");
        if (AG.Audio && AG.Audio.stopVoice) AG.Audio.stopVoice();
        AG.saveGame("autosave");
        s.mode = "title_menu";
        AG.render();
      });
    }, 0);

    return header;
  }

  // ==========================================================================
  // WORKSPACE PRINCIPAL DO SIMULADOR (Palco VN Grande + Painel Lateral Fixo)
  // ==========================================================================
  function renderCleanSimulator() {
    const s = AG.state;
    const p = s.player;
    const a = s.aurora;
    const auroraHere = AG.isAuroraHere();
    const locObj = AG.LOCATIONS[s.currentLocation] || AG.LOCATIONS.corredor_4andar;
    const auroraLocObj = AG.LOCATIONS[AG.getAuroraCurrentLocation()] || AG.LOCATIONS.ape_404;
    const moodDef = AG.MOOD_DEFS[a.mood] || AG.MOOD_DEFS.espontanea;
    const actDef = AG.ACTIVITY_DEFS[a.activity] || AG.ACTIVITY_DEFS.no_corredor_celular;
    const spriteInfo = AG.getActiveAuroraSprite();
    const emoProfile = AG.EmotionEngine ? AG.EmotionEngine.getEmotionProfile() : null;
    const approachObj = (AG.PLAYER_APPROACHES && AG.PLAYER_APPROACHES[p.activeApproach || "natural"]) || { label: "Natural" };

    const workspace = document.createElement("main");
    workspace.className = "sim-workspace";

    // --- COLUNA ESQUERDA: PALCO VISUAL DE SIMULADOR ---
    const isIntimateNow = !!(
      s.activeIntimateScene ||
      (s.activeRandomEvent && ["scene_private_spicy_room", "scene_intimate_tension_404"].includes(s.activeRandomEvent.id))
    );
    const stagePane = document.createElement("section");
    stagePane.className = `vn-stage-pane${stageUiHidden ? " ui-hidden" : ""}`;
    stagePane.setAttribute("data-loc", s.currentLocation || "corredor_4andar");
    stagePane.setAttribute("data-phase", getTimePhaseKey(s.hour));
    stagePane.setAttribute("data-weather", s.weather || "limpo");
    stagePane.setAttribute("data-mood-fam", emoProfile ? emoProfile.family : "luminosa");
    stagePane.setAttribute("data-intimate", isIntimateNow ? "on" : "off");

    const latestEntry = (s.sceneFeed && s.sceneFeed.length) ? s.sceneFeed[s.sceneFeed.length - 1] : null;
    const isSpeakingNow = !!(latestEntry && latestEntry.type === "aurora");

    let speakerName = auroraHere ? "Aurora" : locObj.shortName;
    let playerBeatHtml = "";
    let actionCueHtml = "";
    let speechBodyHtml = "";
    let subtextHtml = "";

    function formatParagraphsHtml(rawSpeech, addDash) {
      const chunks = String(rawSpeech || "")
        .split(/\n{2,}/)
        .map((c) => c.trim())
        .filter(Boolean);
      if (!chunks.length) return "";
      return chunks
        .map((para, i) => {
          const needsDash = addDash && i === 0 && !para.startsWith("—") && !para.startsWith("(");
          return `<div class="vn-speech-para">${needsDash ? "— " : ""}${escapeHtml(para)}</div>`;
        })
        .join("");
    }

    if (latestEntry && latestEntry.type === "aurora") {
      speakerName = "Aurora";
      if (latestEntry.playerBeat) {
        playerBeatHtml = `<div class="vn-player-beat"><strong>Você</strong>${escapeHtml(latestEntry.playerBeat)}</div>`;
      }
      actionCueHtml = latestEntry.action ? `<div class="aurora-action-cue">${escapeHtml(latestEntry.action)}</div>` : "";
      speechBodyHtml = formatParagraphsHtml(latestEntry.speech, true);
      if (latestEntry.subtext) {
        subtextHtml = `<div class="vn-inner-thought">${escapeHtml(latestEntry.subtext)}</div>`;
      }
    } else if (latestEntry) {
      speakerName = locObj.shortName;
      speechBodyHtml = formatParagraphsHtml(stripLeadingEmoji(latestEntry.text || latestEntry.speech || ""), false);
    } else {
      const locDesc = AG.getDynamicLocationDesc ? AG.getDynamicLocationDesc(s.currentLocation) : "";
      const fallbackText = auroraHere
        ? `${actDef.narrative} ${locDesc}`.trim()
        : `${locDesc} Aurora está em ${auroraLocObj.shortName}.`.trim();
      speechBodyHtml = formatParagraphsHtml(fallbackText, false);
    }

    const cleanMood = stripLeadingEmoji(moodDef.label);
    const cleanAct = stripLeadingEmoji(actDef.badge);
    const cleanApproach = stripLeadingEmoji(approachObj.label);
    const cleanUnder = emoProfile && emoProfile.canSeeUndercurrent
      ? stripLeadingEmoji(emoProfile.undercurrentDef.label)
      : "";

    const outfitShort = a.currentOutfit || (a.wearingUniform ? "Uniforme Sakura" : "Moletom 404");
    const isHotChem = a.heat >= 40 || (a.arousal || 0) >= 45 || isIntimateNow;
    const bgPhotoPath = (AG.MEDIA_PATHS && AG.MEDIA_PATHS.backgrounds && AG.MEDIA_PATHS.backgrounds[s.currentLocation]) || "";

    stagePane.innerHTML = `
      ${bgPhotoPath ? `<img src="${bgPhotoPath}" alt="" class="stage-bg-photo" id="stage-bg-photo-img" aria-hidden="true" /><div class="stage-bg-tint" aria-hidden="true"></div>` : ""}
      <div class="stage-ambient-layer" aria-hidden="true">
        <div class="stage-pattern-drift"></div>
        <div class="stage-silk-beam"></div>
        <div class="stage-mood-aura"></div>
        <span class="stage-mote is-petal" style="left:11%; width:10px; height:13px; --dur:11s; --del:-1s; --drift:28px;"></span>
        <span class="stage-mote" style="left:22%; width:14px; height:14px; --dur:13s; --del:-4s; --drift:-22px;"></span>
        <span class="stage-mote ${isHotChem ? "is-heart" : "is-petal"}" style="left:34%; width:10px; height:13px; --dur:10s; --del:-6.5s; --drift:22px;">${isHotChem ? "♥" : ""}</span>
        <span class="stage-mote" style="left:46%; width:9px; height:9px; --dur:12s; --del:-2.2s; --drift:-18px;"></span>
        <span class="stage-mote is-petal" style="left:58%; width:11px; height:14px; --dur:14s; --del:-8.1s; --drift:26px;"></span>
        <span class="stage-mote ${isHotChem ? "is-heart" : ""}" style="left:69%; width:13px; height:13px; --dur:11.5s; --del:-3.4s; --drift:-26px;">${isHotChem ? "♥" : ""}</span>
        <span class="stage-mote" style="left:81%; width:15px; height:15px; --dur:15s; --del:-9.2s; --drift:-20px;"></span>
        <span class="stage-mote is-petal" style="left:90%; width:9px; height:12px; --dur:12.5s; --del:-5.3s; --drift:-24px;"></span>
      </div>

      <div class="stage-corner-hud">
        <div class="player-vitals-card" title="Seus sinais vitais">
          <div class="vital-item">
            <div class="vital-label-row"><span>Energia</span><strong>${p.energy}</strong></div>
            <div class="vital-track"><div class="vital-fill v-energy" style="width:${AG.clamp(p.energy, 0, 100)}%"></div></div>
          </div>
          <div class="vital-item">
            <div class="vital-label-row"><span>Fome</span><strong>${p.satiety}</strong></div>
            <div class="vital-track"><div class="vital-fill v-satiety" style="width:${AG.clamp(p.satiety, 0, 100)}%"></div></div>
          </div>
          <div class="vital-item">
            <div class="vital-label-row"><span>Calma</span><strong>${p.calm}</strong></div>
            <div class="vital-track"><div class="vital-fill v-calm" style="width:${AG.clamp(p.calm, 0, 100)}%"></div></div>
          </div>
          <div class="vital-item">
            <div class="vital-label-row"><span>Tensão</span><strong>${p.desire}</strong></div>
            <div class="vital-track"><div class="vital-fill v-desire" style="width:${AG.clamp(p.desire, 0, 100)}%"></div></div>
          </div>
        </div>

        <div class="stage-right-chips">
          <button class="stage-mini-btn" id="btn-quick-posture" title="Escolher a postura do seu personagem">
            Postura: ${escapeHtml(cleanApproach)}
          </button>
          ${
            auroraHere
              ? `<button class="stage-mini-btn" id="btn-cycle-outfit" title="Alternar visual da Aurora (${escapeHtml(outfitShort)})">
                   ${escapeHtml(a.wearingUniform ? "Uniforme" : "Casual")}
                 </button>`
              : ""
          }
          ${
            auroraHere && a.activity !== "dormindo"
              ? `<span class="stage-chemistry-pill ${isHotChem ? "is-hot" : ""}" title="Química e tensão atual da Aurora">
                   <span class="chem-heart">♥</span>
                   <span>Clima ${a.heat}% · Tensão ${a.arousal || 10}%</span>
                 </span>`
              : ""
          }
        </div>
      </div>

      <div class="vn-character-canvas">
        ${
          auroraHere
            ? `<img src="${spriteInfo.primary}" alt="Aurora" class="vn-aurora-figure" id="active-stage-png" title="Clique na Aurora para interagir" />`
            : `<div class="vn-empty-room">
                 <strong>${escapeHtml(locObj.shortName)}</strong>
                 <span>Aurora está em ${escapeHtml(auroraLocObj.shortName)} agora.</span>
               </div>`
        }
      </div>

      <div class="vn-dialogue-dock">
        <div class="vn-dialogue-box ${dialogueExpanded ? "is-expanded" : ""}">
          <div class="vn-nameplate-row">
            <div class="vn-speaker-left">
              <span class="vn-speaker-name">${escapeHtml(speakerName)}</span>
              ${isSpeakingNow ? `<span class="vn-voice-wave" aria-hidden="true"><i></i><i></i><i></i></span>` : ""}
              ${auroraHere ? `<span class="vn-mood-label" title="${escapeHtml(moodDef.desc)}">${escapeHtml(cleanMood)}</span>` : ""}
              ${cleanUnder ? `<span class="vn-undercurrent-hint" title="Sua Percepção alta leu o que ela tenta esconder">por dentro: ${escapeHtml(cleanUnder)}</span>` : ""}
            </div>
            <div class="vn-nameplate-right">
              ${auroraHere && !isSpeakingNow ? `<span class="vn-activity-note">${escapeHtml(cleanAct)}</span>` : ""}
              ${isSpeakingNow ? `<button class="vn-log-btn" id="btn-replay-voice" title="Ouvir ou pausar a voz da Aurora nesta fala (tecla V)">${(AG.Audio && AG.Audio.isSpeaking && AG.Audio.isSpeaking()) ? "Parar" : "Voz"}</button>` : ""}
              <button class="vn-log-btn" id="btn-hide-stage-ui" title="Ocultar interface pra ver a cena limpa (tecla H)">Ocultar</button>
              <button class="vn-log-btn" id="btn-expand-dialogue" title="Expandir área de leitura (tecla E)">${dialogueExpanded ? "Normal" : "Expandir"}</button>
              <button class="vn-log-btn" id="btn-open-backlog" title="Abrir histórico de diálogos (tecla L)">Log</button>
            </div>
          </div>
          ${playerBeatHtml}
          ${actionCueHtml}
          <div class="aurora-speech-bubble vn-speech-body">${speechBodyHtml}</div>
          ${subtextHtml}
        </div>
      </div>
      ${stageUiHidden ? `<button class="vn-unhide-pill" id="btn-show-stage-ui" title="Restaurar interface (tecla H)">Mostrar interface (H)</button>` : ""}
    `;

    setTimeout(() => {
      const stageImg = stagePane.querySelector("#active-stage-png");
      if (stageImg) {
        let fallbackStage = 0;
        stageImg.addEventListener("error", () => {
          if (fallbackStage === 0 && spriteInfo.fallback) {
            fallbackStage = 1;
            stageImg.src = spriteInfo.fallback;
          } else if (fallbackStage <= 1) {
            fallbackStage = 2;
            stageImg.onerror = null;
            stageImg.src = AG.MEDIA_PATHS.logos.bowIcon;
            stageImg.style.maxHeight = "120px";
            stageImg.style.margin = "auto";
          }
        });
        stageImg.addEventListener("click", () => {
          AG.touchAuroraOnStage(stagePane);
        });
      }

      const bgPhotoEl = stagePane.querySelector("#stage-bg-photo-img");
      if (bgPhotoEl) {
        bgPhotoEl.addEventListener("error", () => { bgPhotoEl.style.display = "none"; });
      }

      const btnVoice = stagePane.querySelector("#btn-replay-voice");
      if (btnVoice && latestEntry && latestEntry.speech) {
        btnVoice.addEventListener("click", () => {
          if (AG.Audio && AG.Audio.toggleSpeak) {
            AG.Audio.toggleSpeak(latestEntry.speech, { mode: "aurora" });
          } else if (AG.Audio && AG.Audio.speakAurora) {
            AG.Audio.speakAurora(latestEntry.speech, { force: true });
          }
        });
      }

      const btnHideUi = stagePane.querySelector("#btn-hide-stage-ui");
      if (btnHideUi) {
        btnHideUi.addEventListener("click", () => {
          AG.playSound("page");
          stageUiHidden = true;
          AG.render();
        });
      }
      const btnShowUi = stagePane.querySelector("#btn-show-stage-ui");
      if (btnShowUi) {
        btnShowUi.addEventListener("click", () => {
          AG.playSound("page");
          stageUiHidden = false;
          AG.render();
        });
      }

      const btnOutfit = stagePane.querySelector("#btn-cycle-outfit");
      if (btnOutfit) {
        btnOutfit.addEventListener("click", () => {
          AG.playSound("click");
          a.activeSpecialSceneKey = null;
          a.previewPhotoPath = null;
          const curUni = a.manualUniformOverride !== null && a.manualUniformOverride !== undefined
            ? a.manualUniformOverride
            : a.wearingUniform;
          a.manualUniformOverride = !curUni;
          a.wearingUniform = a.manualUniformOverride;
          a.currentOutfit = a.wearingUniform ? "Uniforme do Café Sakura" : "Moletom Oversized do 404";
          AG.render();
        });
      }

      const btnExpand = stagePane.querySelector("#btn-expand-dialogue");
      if (btnExpand) {
        btnExpand.addEventListener("click", () => {
          AG.playSound("page");
          dialogueExpanded = !dialogueExpanded;
          AG.render();
        });
      }

      const btnLog = stagePane.querySelector("#btn-open-backlog");
      if (btnLog) {
        btnLog.addEventListener("click", () => {
          AG.playSound("page");
          activeModal = "backlog";
          AG.render();
        });
      }

      const btnPosture = stagePane.querySelector("#btn-quick-posture");
      if (btnPosture) {
        btnPosture.addEventListener("click", () => {
          AG.playSound("click");
          s.activeRandomEvent = {
            id: "scene_choose_approach",
            title: "Postura do Seu Personagem",
            desc: `Perfil atual: ${AG.getPlayerPersonaLabel ? AG.getPlayerPersonaLabel() : "Natural"}. Escolha como você quer conduzir as próximas interações:`,
            choices: [
              { id: "stance_natural", tone: "life", label: "Natural e espontâneo", skillHint: "Equilibrado, sem modificadores extremos" },
              { id: "stance_calculista", tone: "ctrl", label: "Frio e calculista", skillHint: "+25% Influência, -25% Suspeita, derruba Armadura mais rápido" },
              { id: "stance_provocador", tone: "hot", label: "Provocador audacioso", skillHint: "+20% Clima Quente e +20% Rivalidade" },
              { id: "stance_implacavel", tone: "risky", label: "Oportunista e implacável", skillHint: "+25% Pressão de Chantagem e +25% Influência" },
              { id: "stance_protetor", tone: "sweet", label: "Protetor e acolhedor", skillHint: "+20% Afinidade e Confiança, reduz Atrito mais rápido" }
            ]
          };
          AG.render();
        });
      }

      if (s.settings && (s.settings.textSpeed === "typewriter" || s.settings.textSpeed === "fast")) {
        const paras = stagePane.querySelectorAll ? stagePane.querySelectorAll(".vn-speech-para") : [];
        if (paras && paras.length > 0) {
          const texts = Array.from(paras).map((el) => el.textContent || "");
          paras.forEach((el) => { el.textContent = ""; });
          let pIdx = 0;
          let cIdx = 0;
          const stepChars = s.settings.textSpeed === "fast" ? 7 : 3;
          const stepDelay = s.settings.textSpeed === "fast" ? 12 : 16;
          const finishNow = () => {
            clearTypewriter();
            paras.forEach((el, i) => { el.textContent = texts[i]; });
          };
          activeTypewriterFinish = finishNow;
          activeTypewriterTimer = setInterval(() => {
            if (pIdx >= texts.length) {
              clearTypewriter();
              return;
            }
            cIdx += stepChars;
            paras[pIdx].textContent = texts[pIdx].slice(0, cIdx);
            if (cIdx >= texts[pIdx].length) {
              pIdx++;
              cIdx = 0;
            }
          }, stepDelay);
          const bubble = stagePane.querySelector(".aurora-speech-bubble");
          if (bubble) {
            bubble.addEventListener("click", finishNow, { once: true });
          }
        }
      }
    }, 0);

    workspace.appendChild(stagePane);
    workspace.appendChild(renderCleanInteractionDeck(auroraHere));

    return workspace;
  }

  // ==========================================================================
  // PAINEL LATERAL DE AÇÕES & CONVERSA CONTÍNUA DO SIMULADOR
  // ==========================================================================
  function buildChoiceButton(opts) {
    const showDetail = AG.state.settings && AG.state.settings.buttonDetailMode === "detailed";
    const parsed = formatActionCopy(opts.title, opts.mins);
    const chip = opts.chip !== undefined ? opts.chip : parsed.chip;

    const subLines = [];
    if (showDetail) {
      const lead = parsed.tag ? `${parsed.tag}` : "";
      const body = opts.desc || opts.hint || parsed.metaNote || "";
      if (lead && body) subLines.push(`${lead} · ${body}`);
      else if (lead) subLines.push(lead);
      else if (body) subLines.push(body);
      if (opts.skillHint) subLines.push(stripLeadingEmoji(opts.skillHint));
    }

    const btn = document.createElement("button");
    btn.className = `choice-btn tone-${opts.tone || "sweet"}`;
    if (opts.disabled) btn.disabled = true;

    const keyBadge = opts.keyNum ? `<span class="choice-key-num">${opts.keyNum}</span>` : "";

    btn.innerHTML = `
      <div class="choice-left-wrap">
        ${keyBadge}
        <div>
          <div class="choice-title">${escapeHtml(parsed.title)}</div>
          ${subLines.length ? `<div class="choice-sub-hint">${escapeHtml(subLines.join(" · "))}</div>` : ""}
        </div>
      </div>
      ${chip ? `<span class="time-chip">${escapeHtml(chip)}</span>` : ""}
    `;

    if (opts.onClick) {
      btn.addEventListener("click", opts.onClick);
      if (opts.keyNum && !opts.disabled) {
        currentShortcutActions[opts.keyNum - 1] = opts.onClick;
      }
    }
    return btn;
  }

  function renderCleanInteractionDeck(auroraHere) {
    const s = AG.state;
    const a = s.aurora;
    const deck = document.createElement("aside");
    deck.className = "interaction-deck";

    const dynDef = AG.DYNAMIC_DEFS[a.dynamic] || AG.DYNAMIC_DEFS.vizinhos_curiosos;
    const locObj = AG.LOCATIONS[s.currentLocation] || AG.LOCATIONS.corredor_4andar;
    const intimacyStage = AG.getIntimacyStage ? AG.getIntimacyStage() : { title: "Distância Segura" };

    // ------------------------------------------------------------------------
    // 0. EVENTO INTERATIVO / ESCOLHA DE POSTURA / CENA DE REAÇÃO
    // ------------------------------------------------------------------------
    if (s.activeRandomEvent) {
      const ev = s.activeRandomEvent;
      deck.innerHTML = `
        <div class="deck-header-bar">
          <span class="deck-header-title">${escapeHtml(stripLeadingEmoji(ev.title))}</span>
          <span class="deck-header-sub">Decisão</span>
        </div>
        <div class="deck-scroll-area" id="random-ev-body">
          <div class="info-box-soft">${escapeHtml(stripLeadingEmoji(ev.desc))}</div>
          <div class="choices-list-single" id="random-ev-choices"></div>
        </div>
      `;
      const box = deck.querySelector("#random-ev-choices");
      (ev.choices || []).forEach((ch, idx) => {
        box.appendChild(
          buildChoiceButton({
            title: ch.label,
            tone: ch.tone || "sweet",
            skillHint: ch.skillHint,
            keyNum: idx < 6 ? idx + 1 : null,
            onClick: () => {
              if (AG.handleRandomEventChoice) AG.handleRandomEventChoice(ch.id);
              else s.activeRandomEvent = null;
              AG.render();
            }
          })
        );
      });
      return deck;
    }

    // ------------------------------------------------------------------------
    // 0.5. CENA PROFUNDA DESBLOQUEADA POR STATUS / CENÁRIO / OCASIÃO ATIVA
    // ------------------------------------------------------------------------
    if (s.activeDeepScene && AG.DeepDialogue) {
      const ds = s.activeDeepScene;
      const dsGate = (AG.DeepDialogue.STATUS_GATED_SCENES || []).find((g) => g.id === ds.gateId);
      if (dsGate && dsGate.requireAurora === "awake" && (!auroraHere || a.activity === "dormindo")) {
        s.activeDeepScene = null;
      } else {
        const dsChoices = AG.DeepDialogue.getActiveDeepSceneChoices();
        deck.innerHTML = `
          <div class="deck-header-bar">
            <span class="deck-header-title">${escapeHtml(ds.title)}</span>
            <span class="deck-header-sub">Cena Especial</span>
          </div>
          <div class="deck-scroll-area" id="deep-scene-area">
            <div class="info-box-soft">${escapeHtml(ds.badge || "Cena desbloqueada pelos seus status e ocasião atual.")}</div>
            <div class="choices-list-single" id="deep-scene-choices"></div>
          </div>
        `;
        const box = deck.querySelector("#deep-scene-choices");
        dsChoices.forEach((ch, idx) => {
          box.appendChild(
            buildChoiceButton({
              title: ch.label,
              tone: ch.tone || "sweet",
              keyNum: idx < 6 ? idx + 1 : null,
              onClick: () => {
                AG.DeepDialogue.selectDeepSceneChoice(ch.id);
                AG.render();
              }
            })
          );
        });
        return deck;
      }
    }

    // ------------------------------------------------------------------------
    // 0.7. MOMENTO ÍNTIMO ATIVO (18+, consentimento ativo)
    // ------------------------------------------------------------------------
    if (s.activeIntimateScene && AG.Intimacy) {
      if (!auroraHere || a.activity === "dormindo") {
        s.activeIntimateScene = null;
      } else {
        const sc = s.activeIntimateScene;
        const pct = Math.round(((sc.stage + 1) / 5) * 100);
        deck.innerHTML = `
          <div class="deck-header-bar">
            <span class="deck-header-title">Momento íntimo</span>
            <span class="deck-header-sub">${escapeHtml(AG.Intimacy.getStageName())} · ${sc.stage + 1}/5</span>
          </div>
          <div class="intim-progress-track"><div class="intim-progress-fill" style="width:${pct}%"></div></div>
          <div class="deck-scroll-area">
            <div class="info-box-soft">Você pode desacelerar ou parar a qualquer momento — ela também. Perguntar como ela está muda o clima.</div>
            <div class="choices-list-single" id="intim-choices"></div>
          </div>
        `;
        const box = deck.querySelector("#intim-choices");
        AG.Intimacy.getChoices().forEach((ch, idx) => {
          box.appendChild(
            buildChoiceButton({
              title: ch.label,
              hint: ch.hint,
              tone: ch.tone || "sweet",
              keyNum: idx < 6 ? idx + 1 : null,
              onClick: () => {
                AG.Intimacy.select(ch.id);
                AG.render();
              }
            })
          );
        });
        return deck;
      }
    }

    // ------------------------------------------------------------------------
    // 1. MINIGAME ATIVO
    // ------------------------------------------------------------------------
    if (s.activeMinigame) {
      const mg = s.activeMinigame;
      let statusLine = "";
      if (mg.type === "corridor_wiring" || mg.type === "cafe_sakura_rush" || mg.type === "tablet_password_crack") {
        statusLine = `Etapa ${mg.step + 1} de ${mg.targetSeq.length}`;
      } else if (mg.type === "aurora_duel_bet") {
        statusLine = `Você ${mg.playerScore} × ${mg.auroraScore} Aurora · Rodada ${mg.round}`;
      } else if (mg.type === "stealth_sleep_snoop") {
        statusLine = `Furtividade ${mg.step + 1}/2`;
      }

      deck.innerHTML = `
        <div class="deck-header-bar">
          <span class="deck-header-title">${escapeHtml(stripLeadingEmoji(mg.title))}</span>
          <button class="icon-btn bordered" id="btn-cancel-mg">Sair</button>
        </div>
        <div class="deck-scroll-area">
          <div class="info-box-soft">
            <strong>${escapeHtml(statusLine)}</strong>
            <span>${escapeHtml(stripLeadingEmoji(mg.lastLog || mg.desc))}</span>
          </div>
          <div class="choices-list-single" id="mg-buttons"></div>
        </div>
      `;

      const cancelBtn = deck.querySelector("#btn-cancel-mg");
      if (cancelBtn) cancelBtn.addEventListener("click", () => { s.activeMinigame = null; AG.render(); });

      const box = deck.querySelector("#mg-buttons");
      if (mg.type === "corridor_wiring" || mg.type === "cafe_sakura_rush" || mg.type === "tablet_password_crack") {
        const completedSteps = mg.targetSeq.slice(0, mg.step);
        mg.options.forEach((opt) => {
          const done = completedSteps.includes(opt);
          box.appendChild(
            buildChoiceButton({
              title: opt,
              tone: "sweet",
              disabled: done,
              chip: done ? "Feito" : "",
              onClick: () => { AG.handleMinigameChoice(opt); AG.render(); }
            })
          );
        });
      } else if (mg.type === "aurora_duel_bet") {
        ["⚡ Ataque Rápido", "🌀 Finta Provocante", "🛡️ Contra-Ataque"].forEach((mv) => {
          box.appendChild(
            buildChoiceButton({
              title: mv,
              tone: "hot",
              onClick: () => { AG.handleMinigameChoice(mv); AG.render(); }
            })
          );
        });
      } else if (mg.type === "stealth_sleep_snoop") {
        const steps = [
          [
            { label: "Deslizar o celular devagar pelo tapete sem esbarrar na caneca", val: "safe" },
            { label: "Puxar o cabo do carregador de uma vez com pressa", val: "noise" }
          ],
          [
            { label: "Usar o brilho mínimo da tela virado contra a luz pra anotar o número", val: "safe" },
            { label: "Abrir a gaveta de madeira emperrada com força", val: "noise" }
          ]
        ];
        (steps[mg.step] || steps[0]).forEach((st) => {
          box.appendChild(
            buildChoiceButton({
              title: st.label,
              tone: "ctrl",
              onClick: () => { AG.handleMinigameChoice(st.val); AG.render(); }
            })
          );
        });
      }

      return deck;
    }

    // ------------------------------------------------------------------------
    // 2. CONVERSA CONTÍNUA ATIVA (MULTI-TURNO + MUDAR ASSUNTO + ENCERRAR)
    // ------------------------------------------------------------------------
    if (s.activeConversationNode && (!auroraHere || a.activity === "dormindo")) {
      s.activeConversationNode = null;
    }
    if (s.activeConversationNode && auroraHere) {
      const node = s.activeConversationNode;
      const viewMode = node.viewMode || "replies";
      const turnNum = node.turn || 1;
      const headerTitle =
        viewMode === "switch_topic" ? "Mudar de assunto"
        : viewMode === "closing" ? "Como encerrar a conversa"
        : (node.topicTitle || "Conversando com Aurora");

      deck.innerHTML = `
        <div class="deck-header-bar">
          <span class="deck-header-title">${escapeHtml(headerTitle)}</span>
          <span class="deck-header-sub">Turno ${turnNum}</span>
        </div>
        <div class="deck-scroll-area" id="conv-scroll-area"></div>
        <div class="conv-footer-actions">
          <button class="icon-btn" id="btn-conv-switch">${viewMode === "switch_topic" ? "Voltar às respostas" : "Mudar de assunto"}</button>
          <button class="icon-btn" id="btn-conv-close">${viewMode === "closing" ? "Continuar papo" : "Encerrar conversa"}</button>
        </div>
      `;

      const area = deck.querySelector("#conv-scroll-area");

      if (viewMode === "switch_topic" && AG.getSwitchableTopics) {
        AG.getSwitchableTopics().forEach((grp) => {
          if (!grp.items || !grp.items.length) return;
          const lbl = document.createElement("div");
          lbl.className = "deck-section-label";
          lbl.textContent = grp.label;
          area.appendChild(lbl);

          grp.items.forEach((tp) => {
            area.appendChild(
              buildChoiceButton({
                title: tp.title,
                desc: tp.desc,
                skillHint: tp.skillHint,
                tone: tp.tone || "sweet",
                mins: tp.costMins,
                onClick: () => {
                  AG.switchConversationTopic(grp.key, tp.id);
                  AG.render();
                }
              })
            );
          });
        });
      } else {
        const choices = AG.getConversationChoices ? AG.getConversationChoices() : [];
        choices.forEach((ch, idx) => {
          area.appendChild(
            buildChoiceButton({
              title: ch.title,
              hint: ch.hint,
              tone: ch.tone || "sweet",
              keyNum: idx < 6 ? idx + 1 : null,
              onClick: () => {
                AG.selectConversationChoice(ch.id);
                AG.render();
              }
            })
          );
        });
      }

      const btnSwitch = deck.querySelector("#btn-conv-switch");
      const btnClose = deck.querySelector("#btn-conv-close");
      if (btnSwitch) {
        btnSwitch.addEventListener("click", () => {
          AG.playSound("click");
          AG.toggleConversationTopicMenu();
          AG.render();
        });
      }
      if (btnClose) {
        btnClose.addEventListener("click", () => {
          AG.playSound("click");
          AG.toggleConversationClosingMenu();
          AG.render();
        });
      }

      return deck;
    }

    // ------------------------------------------------------------------------
    // 3. MODO SIMULADOR LIVRE (ABAS LIMPAS + AÇÕES CONTEXTUAIS)
    // ------------------------------------------------------------------------
    const isSleeping = auroraHere && a.activity === "dormindo";
    if (!auroraHere && ["situacao", "conversar", "chamego", "provocar", "controle", "presentes"].includes(s.activeTab)) {
      s.activeTab = "local";
    }
    if (isSleeping && ["conversar", "chamego", "provocar", "controle", "presentes"].includes(s.activeTab)) {
      s.activeTab = "situacao";
    }

    const headerBar = document.createElement("div");
    headerBar.className = "deck-header-bar";
    headerBar.innerHTML = `
      <span class="deck-header-title">${escapeHtml(auroraHere ? stripLeadingEmoji(dynDef.title) : locObj.shortName)}</span>
      <span class="deck-header-sub">${escapeHtml(auroraHere ? intimacyStage.title : "Sozinho no local")}</span>
    `;
    deck.appendChild(headerBar);

    const tabs = [
      { id: "situacao", label: isSleeping ? "Dormindo" : "Agora", show: auroraHere },
      { id: "conversar", label: "Conversar", show: auroraHere && !isSleeping },
      { id: "chamego", label: "Carinho", show: auroraHere && !isSleeping },
      { id: "provocar", label: "Provocar", show: auroraHere && !isSleeping },
      { id: "controle", label: "Bastidores", show: auroraHere && !isSleeping },
      { id: "presentes", label: "Presentes", show: auroraHere && !isSleeping && s.unlocks.hasUnpackedBackpack },
      { id: "local", label: "Ambiente", show: true },
      { id: "mover", label: "Mapa", show: true }
    ];

    const tabsRow = document.createElement("div");
    tabsRow.className = "deck-tabs";
    tabs.filter((t) => t.show).forEach((t) => {
      const b = document.createElement("button");
      b.className = `tab-btn ${s.activeTab === t.id ? "active" : ""}`;
      b.textContent = t.label;
      b.addEventListener("click", () => {
        AG.playSound("click");
        s.activeTab = t.id;
        AG.render();
      });
      tabsRow.appendChild(b);
    });
    deck.appendChild(tabsRow);

    const scrollArea = document.createElement("div");
    scrollArea.className = "deck-scroll-area";

    function getFilteredGatedScenes(modeFilter) {
      if (!AG.DeepDialogue || !AG.DeepDialogue.getContextualGatedScenes) return { uList: [], lList: [] };
      const { unlocked, lockedHints } = AG.DeepDialogue.getContextualGatedScenes();
      const matchFilter = (entry) => {
        const g = entry.gate;
        if (modeFilter === "local") return g.requireAurora !== "awake";
        return g.requireAurora === "awake" || !g.requireAurora;
      };
      return { uList: unlocked.filter(matchFilter), lList: lockedHints.filter(matchFilter) };
    }

    function appendUnlockedGated(uList) {
      if (!uList.length) return;
      const lbl = document.createElement("div");
      lbl.className = "deck-section-label";
      lbl.textContent = "Desbloqueado agora · Status & Ocasião";
      scrollArea.appendChild(lbl);

      uList.forEach(({ gate }) => {
        const btn = buildChoiceButton({
          title: gate.title,
          desc: gate.badge,
          tone: gate.tone || "sweet",
          chip: `Especial · ${gate.costMins}m`,
          onClick: () => {
            AG.DeepDialogue.startDeepScene(gate.id);
            AG.render();
          }
        });
        btn.className += " is-special-unlocked";
        scrollArea.appendChild(btn);
      });
    }

    function appendLockedGated(lList) {
      if (!lList.length) return;
      const lbl = document.createElement("div");
      lbl.className = "deck-section-label";
      lbl.textContent = "Próximos desbloqueios";
      scrollArea.appendChild(lbl);

      lList.slice(0, 2).forEach(({ gate, eval: ev }) => {
        const cardBtn = document.createElement("button");
        cardBtn.className = `choice-btn tone-${gate.tone || "ctrl"} is-locked-hint`;
        cardBtn.disabled = true;
        cardBtn.innerHTML = `
          <div>
            <div class="choice-title">${escapeHtml(gate.title)}</div>
            <div class="choice-req-line">Falta: ${escapeHtml(ev.missing.join(" · "))}</div>
          </div>
          <span class="time-chip">Bloqueado</span>
        `;
        scrollArea.appendChild(cardBtn);
      });
    }

    if (s.activeTab === "situacao" && auroraHere) {
      const { uList, lList } = getFilteredGatedScenes("aurora");
      appendUnlockedGated(uList);
      const sitActions = AG.getSituationalAuroraActions();
      sitActions.forEach((act) => {
        scrollArea.appendChild(
          buildChoiceButton({
            title: act.title,
            desc: act.desc,
            skillHint: act.skillHint,
            tone: act.tone || "sweet",
            onClick: () => {
              act.onRun();
              AG.render();
            }
          })
        );
      });
      appendLockedGated(lList);
    } else if (["conversar", "chamego", "provocar", "controle"].includes(s.activeTab) && auroraHere) {
      if (s.activeTab === "provocar" && AG.Intimacy) {
        if (AG.Intimacy.canStart()) {
          const ctaBtn = buildChoiceButton({
            title: "Trancar a porta e viver um momento íntimo com a Aurora",
            desc: "Cena interativa 18+ em 5 etapas (ritmo, preferências e consentimento ativo)",
            tone: "hot",
            chip: "18+ · 5 etapas",
            onClick: () => {
              AG.Intimacy.start();
              AG.render();
            }
          });
          ctaBtn.className += " is-intimate-cta";
          scrollArea.appendChild(ctaBtn);
        } else if (s.currentLocation === "ape_404" || s.currentLocation === "ape_402") {
          const blk = AG.Intimacy.getBlockReason ? AG.Intimacy.getBlockReason() : null;
          if (blk && blk.missing) {
            const note = document.createElement("div");
            note.className = "info-box-soft";
            note.innerHTML = `<strong>Momento Íntimo 18+ (5 etapas)</strong><span>Para liberar: ${escapeHtml(blk.missing)}</span>`;
            scrollArea.appendChild(note);
          }
        }
      }
      const topics = AG.getTopicsForTab
        ? AG.getTopicsForTab(s.activeTab)
        : (AG.INTERACTION_TOPICS[s.activeTab] || []);
      topics.forEach((tp) => {
        const gateInfo = (tp.reqGate && AG.Gates && AG.Gates.check) ? AG.Gates.check(tp.reqGate) : null;
        const chipOverride = gateInfo && !gateInfo.ok ? gateInfo.chip : undefined;
        const hintMerged = gateInfo && !gateInfo.ok
          ? `Falta: ${gateInfo.missing}`
          : tp.skillHint;
        const btn = buildChoiceButton({
          title: tp.title,
          desc: tp.desc,
          skillHint: hintMerged,
          tone: tp.tone || "sweet",
          mins: tp.costMins,
          chip: chipOverride,
          onClick: () => {
            AG.startTopicConversation(s.activeTab, tp.id);
            AG.render();
          }
        });
        scrollArea.appendChild(btn);
      });
    } else if (s.activeTab === "presentes" && auroraHere) {
      if (s.inventory.length === 0) {
        scrollArea.innerHTML = `<div class="info-box-soft">Sua mochila está vazia. Passe no <strong>Mercadinho 24h</strong> ou prepare algo na cozinha do <strong>Apê 402</strong>.</div>`;
      } else {
        s.inventory.forEach((item) => {
          scrollArea.appendChild(
            buildChoiceButton({
              title: item.name,
              desc: item.desc,
              tone: "sweet",
              chip: `×${item.qty}`,
              onClick: () => {
                AG.giveGiftToAurora(item.id);
                AG.render();
              }
            })
          );
        });
      }
    } else if (s.activeTab === "local") {
      const { uList, lList } = getFilteredGatedScenes("local");
      appendUnlockedGated(uList);
      AG.getLocationActions().forEach((act) => {
        scrollArea.appendChild(
          buildChoiceButton({
            title: act.title,
            desc: act.desc,
            skillHint: act.skillHint,
            tone: act.tone || "life",
            disabled: !!act.disabled,
            onClick: () => {
              act.onRun();
              AG.render();
            }
          })
        );
      });
      appendLockedGated(lList);
    } else if (s.activeTab === "mover") {
      s.unlockedLocations.forEach((locId) => {
        const destObj = AG.LOCATIONS[locId];
        if (!destObj) return;
        const isCurrent = s.currentLocation === locId;
        const auroraAtDest = AG.getAuroraCurrentLocation() === locId;
        const empty404Infiltrate = locId === "ape_404" && !auroraAtDest;
        const chipLabel = auroraAtDest
          ? "Aurora aqui"
          : empty404Infiltrate
            ? "404 vazio"
            : isCurrent
              ? "Atual"
              : `${destObj.travelMins || 10}m`;

        scrollArea.appendChild(
          buildChoiceButton({
            title: destObj.name,
            tone: auroraAtDest ? "sweet" : empty404Infiltrate ? "ctrl" : "life",
            disabled: isCurrent,
            chip: chipLabel,
            onClick: () => {
              AG.playSound("click");
              if (AG.Audio && AG.Audio.stopVoice) AG.Audio.stopVoice();
              s.flags.auroraCalledToCorridor = false;
              s.flags.auroraVisitingYourApt = false;
              s.flags.auroraIn404WithPlayer = false;
              s.activeConversationNode = null;
              s.activeDeepScene = null;
              s.activeIntimateScene = null;
              s.currentLocation = locId;
              AG.advanceTime(destObj.travelMins || 10);
              const arrivedWithAurora = AG.isAuroraHere();
              const curAuroraLoc = AG.LOCATIONS[AG.getAuroraCurrentLocation()];
              s.activeTab = arrivedWithAurora ? "situacao" : "local";
              AG.clearFeed();
              AG.pushFeed({
                type: "narrative",
                text: arrivedWithAurora
                  ? `Você chegou em ${destObj.shortName} — Aurora está por aqui agora.`
                  : `Você chegou em ${destObj.shortName}. Ela não está aqui agora (pelo horário, está em ${curAuroraLoc ? curAuroraLoc.shortName : "outro local"}).`
              });
              AG.render();
            }
          })
        );
      });
    }

    deck.appendChild(scrollArea);
    return deck;
  }

  // ==========================================================================
  // NARRAÇÃO EDITORIAL & TELA DE FINAL (Com Scroll Próprio no Viewport 100vh)
  // ==========================================================================
  function resolveNarrationBackdrop(nodeId) {
    const bgs = (AG.MEDIA_PATHS && AG.MEDIA_PATHS.backgrounds) || {};
    const id = String(nodeId || "");
    if (id.includes("404") || id.includes("controle") || id.includes("rainha")) return bgs.ape_404 || bgs.corredor_4andar || "";
    if (id.includes("cafe") || id.includes("sakura")) return bgs.cafe_sakura || bgs.corredor_4andar || "";
    if (id.includes("praca")) return bgs.praca_cerejeiras || bgs.corredor_4andar || "";
    if (id.includes("402") || id.includes("falencia")) return bgs.ape_402 || bgs.corredor_4andar || "";
    return bgs.corredor_4andar || bgs.ape_404 || "";
  }

  function renderNarrationScreen() {
    const s = AG.state;
    const node = AG.NARRATIONS[s.currentNarrationId] || AG.NARRATIONS.prologo_1;

    if (node.onEnter && !s.flags["entered_" + s.currentNarrationId]) {
      s.flags["entered_" + s.currentNarrationId] = true;
      node.onEnter();
    }

    const shell = document.createElement("div");
    shell.className = "narration-scroll-shell";
    const bgSrc = resolveNarrationBackdrop(s.currentNarrationId);
    if (bgSrc) {
      const bgImg = document.createElement("img");
      bgImg.src = bgSrc;
      bgImg.alt = "";
      bgImg.className = "narration-bg-backdrop";
      bgImg.setAttribute("aria-hidden", "true");
      shell.appendChild(bgImg);
    }

    const wrap = document.createElement("main");
    wrap.className = "narration-wrapper";

    let bodyHtml = "";
    const fullNarrationText = (node.paragraphs || []).map((p) => p.content || "").join(" ");
    (node.paragraphs || []).forEach((p) => {
      if (p.type === "quote") bodyHtml += `<p class="dialogue-quote">${escapeHtml(p.content)}</p>`;
      else if (p.type === "stage") bodyHtml += `<p style="font-style:italic; color:var(--ink-soft);">${escapeHtml(p.content)}</p>`;
      else bodyHtml += `<p>${escapeHtml(p.content)}</p>`;
    });

    wrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:10px; flex-wrap:wrap;">
        <div class="narration-tag">${escapeHtml(stripLeadingEmoji(node.tag))}</div>
        <div style="display:flex; gap:6px;">
          <button class="icon-btn bordered" id="btn-narr-voice" title="Ouvir a narração desta cena">Ouvir narração</button>
          <button class="icon-btn bordered" id="btn-narr-menu">Menu</button>
        </div>
      </div>
      <h1 class="narration-title">${escapeHtml(node.title)}</h1>
      <div class="narration-body">${bodyHtml}</div>
      <div class="choices-list-single" id="narration-choices-box"></div>
    `;

    const voiceBtn = wrap.querySelector("#btn-narr-voice");
    if (voiceBtn) {
      voiceBtn.addEventListener("click", () => {
        if (AG.Audio && AG.Audio.toggleSpeak) {
          const started = AG.Audio.toggleSpeak(fullNarrationText, { mode: "narration" });
          voiceBtn.textContent = started ? "Parar narração" : "Ouvir narração";
        }
      });
    }

    const mBtn = wrap.querySelector("#btn-narr-menu");
    if (mBtn) mBtn.addEventListener("click", () => {
      if (AG.Audio && AG.Audio.stopVoice) AG.Audio.stopVoice();
      s.mode = "title_menu";
      AG.render();
    });

    const choicesBox = wrap.querySelector("#narration-choices-box");
    (node.choices || []).forEach((ch, idx) => {
      choicesBox.appendChild(
        buildChoiceButton({
          title: ch.label,
          tone: ch.tone || "sweet",
          keyNum: idx < 6 ? idx + 1 : null,
          onClick: () => {
            if (AG.Audio && AG.Audio.stopVoice) AG.Audio.stopVoice();
            AG.playSound(ch.tone === "hot" ? "hot" : ch.tone === "risky" ? "warn" : "click");
            if (ch.onSelect) ch.onSelect();
            else if (ch.nextId) s.currentNarrationId = ch.nextId;
            AG.render();
          }
        })
      );
    });

    shell.appendChild(wrap);
    return shell;
  }

  function renderEndingScreen() {
    const s = AG.state;
    const endObj = AG.ENDINGS[s.currentEndingId] || AG.ENDINGS.bad_end_precoce_404;

    const shell = document.createElement("div");
    shell.className = "narration-scroll-shell";
    const bgSrc = resolveNarrationBackdrop(endObj.id);
    if (bgSrc) {
      const bgImg = document.createElement("img");
      bgImg.src = bgSrc;
      bgImg.alt = "";
      bgImg.className = "narration-bg-backdrop";
      bgImg.setAttribute("aria-hidden", "true");
      shell.appendChild(bgImg);
    }

    const wrap = document.createElement("main");
    wrap.className = "narration-wrapper";
    const fullEndingText = `${endObj.title}. ${(endObj.paragraphs || []).join(" ")}`;

    wrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:10px; flex-wrap:wrap;">
        <div class="narration-tag">${escapeHtml(stripLeadingEmoji(endObj.badge))} · ${escapeHtml(endObj.category)}</div>
        <button class="icon-btn bordered" id="btn-end-voice" title="Ouvir a narração deste final">Ouvir final</button>
      </div>
      <h1 class="narration-title">${escapeHtml(endObj.title)}</h1>
      <div class="narration-body">${(endObj.paragraphs || []).map((t) => `<p>${escapeHtml(t)}</p>`).join("")}</div>
      <div class="choices-list-single" id="ending-actions"></div>
    `;

    const voiceBtn = wrap.querySelector("#btn-end-voice");
    if (voiceBtn) {
      voiceBtn.addEventListener("click", () => {
        if (AG.Audio && AG.Audio.toggleSpeak) {
          const started = AG.Audio.toggleSpeak(fullEndingText, { mode: "narration" });
          voiceBtn.textContent = started ? "Parar narração" : "Ouvir final";
        }
      });
    }

    const box = wrap.querySelector("#ending-actions");
    if (!endObj.id.startsWith("bad_end")) {
      box.appendChild(
        buildChoiceButton({
          title: "Continuar jogando no Modo Livre",
          tone: "sweet",
          onClick: () => {
            if (AG.Audio && AG.Audio.stopVoice) AG.Audio.stopVoice();
            s.mode = "simulator";
            AG.render();
          }
        })
      );
    }

    box.appendChild(
      buildChoiceButton({
        title: "Voltar ao Menu Principal",
        tone: "ctrl",
        onClick: () => {
          if (AG.Audio && AG.Audio.stopVoice) AG.Audio.stopVoice();
          AG.resetNewGame(false);
          AG.render();
        }
      })
    );

    shell.appendChild(wrap);
    return shell;
  }

  // ==========================================================================
  // MODAIS (Celular, Ficha & Psicologia da Aurora, PNGs, Mochila, Saves, Ajustes)
  // ==========================================================================
  function renderModal(type) {
    const s = AG.state;
    const u = s.unlocks || {};
    const ph = s.phoneState || {};
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) { activeModal = null; AG.render(); }
    });

    const card = document.createElement("div");
    card.className = "modal-card";
    let title = "";
    let bodyHtml = "";

    if (type === "phone") {
      const sk = (s.player && s.player.skills) || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
      const curApp = ph.activeApp || (u.hasAuroraNumber ? "chat" : "freelapay");
      const canSpy = u.unlockedSpyApp || s.aurora.trust >= 25 || s.aurora.discomfort >= 25;
      const gCheck = (id) => (AG.Gates && AG.Gates.check ? AG.Gates.check(id) : { ok: true, chip: "Pronto", missing: "" });
      const chipSpan = (res) => `<span class="time-chip ${res.ok ? "chip-ready" : "chip-wait"}" title="${escapeHtml(res.missing || res.reason || "")}">${escapeHtml(res.chip)}</span>`;

      if (!u.hasAuroraNumber) {
        title = `Smartphone · Sem o contato da Aurora · Saldo R$ ${s.player.money}`;
        const preTabs = `
          <div class="phone-app-tabs">
            <button class="tab-btn ${curApp === "chat" ? "active" : ""}" data-app="chat">Contato</button>
            <button class="tab-btn ${curApp === "radar" ? "active" : ""}" data-app="radar">Radar</button>
            <button class="tab-btn ${curApp === "freelapay" ? "active" : ""}" data-app="freelapay">FreelaPay</button>
            <button class="tab-btn ${curApp === "delivery" ? "active" : ""}" data-app="delivery">Delivery</button>
          </div>
        `;
        let preBody = "";
        if (curApp === "radar") {
          const sched = AG.getAuroraScheduleInfo ? AG.getAuroraScheduleInfo() : { currentLocationName: "4º Andar", schedule: [], milestones: [] };
          preBody = `
            <div class="info-box-soft">
              <strong>Rotina estimada do 4º Andar (${sched.isWeekend ? "Fim de Semana" : "Dia Útil"})</strong>
              ${sched.schedule.map((row) => `<span><strong>${escapeHtml(row.hours)}</strong> · ${escapeHtml(row.place)}</span>`).join("")}
            </div>
          `;
        } else if (curApp === "freelapay") {
          const gigs = ph.completedQuickGigs || {};
          const payBug = 38 + Math.round(sk.tech * 1.1);
          const payScr = 54 + Math.round(sk.tech * 1.4);
          const payCon = 44 + Math.round(sk.charisma * 1.4);
          preBody = `
            <div class="info-box-soft">
              <strong>FreelaPay & Pix · Saldo: R$ ${s.player.money}</strong>
              <span>Aluguel (R$ ${s.player.rentAmount || 350}) vence em <strong>${s.player.rentDueInDays} dias</strong>.</span>
            </div>
            <div class="choices-list-single">
              <button class="choice-btn tone-life" data-ph-act="gig_bugfix" ${gigs[`${s.day}:gig_bugfix`] || s.player.energy < 10 ? "disabled" : ""}>
                <span class="choice-title">Bugfix Express pelo celular (45m · +2 Código)</span>
                <span class="time-chip">+R$ ${payBug}</span>
              </button>
              <button class="choice-btn tone-ctrl" data-ph-act="gig_script" ${gigs[`${s.day}:gig_script`] || s.player.energy < 14 ? "disabled" : ""}>
                <span class="choice-title">Script de Automação remoto (65m · +3 Código)</span>
                <span class="time-chip">+R$ ${payScr}</span>
              </button>
              <button class="choice-btn tone-sweet" data-ph-act="gig_consult" ${gigs[`${s.day}:gig_consult`] || s.player.energy < 10 ? "disabled" : ""}>
                <span class="choice-title">Consultoria rápida por áudio (50m · +2 Lábia)</span>
                <span class="time-chip">+R$ ${payCon}</span>
              </button>
              <button class="choice-btn tone-life" data-ph-act="pay_rent_pix" ${s.player.money < (s.player.rentAmount || 350) ? "disabled" : ""}>
                <span class="choice-title">Quitar Aluguel antecipado via Pix (+7 dias)</span>
                <span class="time-chip">R$ ${s.player.rentAmount || 350}</span>
              </button>
            </div>
          `;
        } else if (curApp === "delivery") {
          preBody = `
            <div class="info-box-soft"><strong>Delivery 24h · Apê 402</strong></div>
            <button class="choice-btn tone-life" data-ph-act="del_lanche_402" ${s.player.money < 20 ? "disabled" : ""}>
              <span class="choice-title">Pedir lanche rápido pro seu Apê 402 (+48 Saciedade)</span>
              <span class="time-chip">R$ 20</span>
            </button>
          `;
        } else {
          preBody = `
            <div class="info-box-soft" style="border-left:4px solid var(--crimson);">
              <strong>Você ainda não tem o número da vizinha do 404</strong>
              <span>Quando conseguir o contato dela, desbloqueia Mensagens, Ligações, Vídeo, SakuraGram, Fotos e Mimos.</span>
              <span><strong>Como conseguir o número:</strong></span>
              <ul style="margin-left:18px; margin-top:4px; line-height:1.55;">
                <li>Conversar com ela e pedir o número na aba <em>Agora</em> (Afinidade 18+ ou Clima 22+);</li>
                <li>Ajudá-la na caixa alta do corredor ou vencer uma aposta no duelo;</li>
                <li>Ou espiar o celular dela por meios furtivos enquanto ela estiver distraída ou dormindo.</li>
              </ul>
            </div>
          `;
        }
        bodyHtml = preTabs + preBody;
      } else {
        title = `Smartphone · Aurora 404 · Intimidade ${s.aurora.intimacyLevel || 0}% · Trunfos: ${ph.leverage || 0}`;
        const feedPosts = AG.getAuroraFeedPosts ? AG.getAuroraFeedPosts() : [];
        const totalGal = (AG.GALLERY_CATALOG && AG.GALLERY_CATALOG.length) || 14;
        const appTabsHtml = `
          <div class="phone-app-tabs">
            <button class="tab-btn ${curApp === "chat" ? "active" : ""}" data-app="chat">Mensagens</button>
            <button class="tab-btn ${curApp === "feed" ? "active" : ""}" data-app="feed">SakuraGram (${feedPosts.length})</button>
            <button class="tab-btn ${curApp === "radar" ? "active" : ""}" data-app="radar">Radar & Metas</button>
            <button class="tab-btn ${curApp === "freelapay" ? "active" : ""}" data-app="freelapay">FreelaPay</button>
            <button class="tab-btn ${curApp === "delivery" ? "active" : ""}" data-app="delivery">Delivery</button>
            <button class="tab-btn ${curApp === "galeria" ? "active" : ""}" data-app="galeria">Galeria (${(ph.unlockedPhotos || []).length}/${totalGal})</button>
            ${canSpy ? `<button class="tab-btn ${curApp === "investigar" ? "active" : ""}" data-app="investigar">Dossiê</button>` : ""}
            <button class="tab-btn ${curApp === "seguranca" ? "active" : ""}" data-app="seguranca">Rastros (${ph.tracksRisk}%)</button>
          </div>
        `;

        let appContentHtml = "";
        if (curApp === "chat") {
          const msgsHtml = (s.phoneChat || [])
            .map(
              (m) => `
              <div class="chat-bubble ${m.sender === "player" ? "from-player" : "from-aurora"}">
                <div>${escapeHtml(m.text)}</div>
                <span style="font-size:0.66rem; opacity:0.68; font-family:var(--font-mono);">${escapeHtml(m.time || "")}</span>
              </div>
            `
            )
            .join("");

          const heldSecs = AG.getHeldSecrets ? AG.getHeldSecrets() : [];
          const topHeldSec = heldSecs.length > 0
            ? heldSecs.slice().sort((x, y) => (y.pressureVal || 20) - (x.pressureVal || 20))[0]
            : null;
          const liveSt = AG.getAuroraLiveStatus
            ? AG.getAuroraLiveStatus()
            : { presence: "Online", note: "no quarto andar" };

          const gInv402 = gCheck("phone_invite_402");
          const gMeet = gCheck("phone_date_meet");
          const gVoice = gCheck("phone_voice_call");
          const gVideo = gCheck("phone_video_call");
          const gSelfie = gCheck("phone_selfie_cute");
          const gSpicyPhoto = gCheck("phone_photo_spicy");
          const gNsfwPhoto = gCheck("phone_photo_nsfw");
          const gDare = gCheck("phone_dare_402");
          const gSubtle = gCheck("phone_subtle_pressure");

          appContentHtml = `
            <div class="phone-status-strip">
              <span class="phone-status-presence">Aurora · ${escapeHtml(liveSt.presence)}</span>
              <span class="phone-status-note">"${escapeHtml(liveSt.note)}"</span>
            </div>
            <div class="phone-chat-box" id="phone-chat-scroll">${msgsHtml}</div>
            <div class="deck-section-label">Aproximar & Construir Intimidade</div>
            <div class="choices-list-single">
              <button class="choice-btn tone-sweet" data-ph-act="msg_fofa">
                <span class="choice-title">Mandar uma mensagem carinhosa</span>
                <span class="time-chip chip-ready">+Afinidade</span>
              </button>
              <button class="choice-btn tone-hot" data-ph-act="msg_flerte_leve">
                <span class="choice-title">Mandar um flerte leve pra esquentar o clima</span>
                <span class="time-chip chip-ready">+Clima</span>
              </button>
              <button class="choice-btn tone-sweet" data-ph-act="msg_pergunta_intima">
                <span class="choice-title">Jogar "Pergunta Sem Filtro" no chat (revela gostos dela)</span>
                <span class="time-chip chip-ready">+Intimidade</span>
              </button>
              <button class="choice-btn tone-sweet" data-ph-act="msg_audio_voz">
                <span class="choice-title">Mandar um áudio com voz calma</span>
                <span class="time-chip chip-ready">Áudio</span>
              </button>
              <button class="choice-btn tone-life" data-ph-act="msg_reagir_status">
                <span class="choice-title">Responder ao status atual dela</span>
              </button>
            </div>

            <div class="deck-section-label">Encontros & Ligações</div>
            <div class="choices-list-single">
              <button class="choice-btn tone-sweet" data-ph-act="msg_convidar_402" title="${escapeHtml(gInv402.missing || "Ela topa vir pro 402")}">
                <span class="choice-title">Convidar ela pra atravessar o corredor e vir pro 402</span>
                ${chipSpan(gInv402)}
              </button>
              <button class="choice-btn tone-life" data-ph-act="msg_combinar_corredor" title="${escapeHtml(gMeet.missing || "Encontrar no corredor")}">
                <span class="choice-title">Chamar ela pra se encontrarem no corredor do 4º andar</span>
                ${chipSpan(gMeet)}
              </button>
              <button class="choice-btn tone-sweet" data-ph-act="call_voice" title="${escapeHtml(gVoice.missing || "Ligação de voz com fala audível")}">
                <span class="choice-title">Fazer uma ligação de voz pra Aurora</span>
                ${chipSpan(gVoice)}
              </button>
              <button class="choice-btn tone-hot" data-ph-act="call_video" title="${escapeHtml(gVideo.missing || "Chamada de vídeo íntima + print na Galeria")}">
                <span class="choice-title">Abrir Chamada de Vídeo com a Aurora</span>
                ${chipSpan(gVideo)}
              </button>
            </div>

            <div class="deck-section-label">Fotos Exclusivas (Progressão por Intimidade)</div>
            <div class="choices-list-single">
              <button class="choice-btn tone-sweet" data-ph-act="msg_selfie_fofa" title="${escapeHtml(gSelfie.missing || "Nível 1 · Selfie espontânea")}">
                <span class="choice-title">Pedir uma selfie espontânea dela agora (Nível 1)</span>
                ${chipSpan(gSelfie)}
              </button>
              <button class="choice-btn tone-hot" data-ph-act="msg_quente_foto" title="${escapeHtml(gSpicyPhoto.missing || "Nível 2 · Foto provocante/secreta")}">
                <span class="choice-title">Provocar e pedir uma foto secreta só pra você (Nível 2)</span>
                ${chipSpan(gSpicyPhoto)}
              </button>
              <button class="choice-btn tone-hot" data-ph-act="msg_foto_nsfw_18" title="${escapeHtml(gNsfwPhoto.missing || "Nível 3 · Foto exclusiva 18+ consensual")}">
                <span class="choice-title">Pedir foto exclusiva 18+ sem filtro (Nível 3 · Consensual)</span>
                ${chipSpan(gNsfwPhoto)}
              </button>
            </div>

            <div class="deck-section-label">Jogos Mentais, Dossiê & Reconciliação</div>
            <div class="choices-list-single">
              <button class="choice-btn tone-hot" data-ph-act="msg_blefe_desafio" title="${escapeHtml(gDare.missing || "Atrair ela por desafio")}">
                <span class="choice-title">Mandar um desafio pra atrair ela pro 402</span>
                ${chipSpan(gDare)}
              </button>
              <button class="choice-btn tone-ctrl" data-ph-act="msg_visto_e_ignorado">
                <span class="choice-title">Deixar no visto e responder seco ("Ok.")</span>
              </button>
              ${
                topHeldSec
                  ? `<button class="choice-btn tone-risky" data-ph-act="msg_chantagem_especifica">
                       <span class="choice-title">Anexar "${escapeHtml(topHeldSec.name)}" e mandar ela vir ao 402</span>
                     </button>
                     <button class="choice-btn tone-sweet" data-ph-act="msg_queimar_prova_chat">
                       <span class="choice-title">Mandar vídeo apagando "${escapeHtml(topHeldSec.name)}" pra ganhar a confiança dela</span>
                     </button>`
                  : ""
              }
              ${
                (ph.leverage > 0 || heldSecs.length > 0)
                  ? `<button class="choice-btn tone-ctrl" data-ph-act="msg_pressao_sutil" title="${escapeHtml(gSubtle.missing || "")}">
                       <span class="choice-title">Usar pressão velada com um trunfo sem gerar atrito</span>
                       ${chipSpan(gSubtle)}
                     </button>`
                  : ""
              }
              ${
                ph.leverage > 0 || ph.manipulationCount > 0 || heldSecs.length > 0
                  ? `<button class="choice-btn tone-ctrl" data-ph-act="msg_manipular">
                       <span class="choice-title">Pressionar ela com um trunfo pra vir ao seu apê</span>
                     </button>`
                  : ""
              }
              ${
                ph.manipulationCount > 0 || s.aurora.discomfort >= 25 || (s.aurora.leveragePressure || 0) > 0
                  ? `<button class="choice-btn tone-life" data-ph-act="msg_consertar">
                       <span class="choice-title">Apagar trunfos, pedir desculpa e limpar o clima</span>
                       <span class="time-chip chip-ready">Zera pressão</span>
                     </button>`
                  : ""
              }
            </div>
          `;
        } else if (curApp === "feed") {
          appContentHtml = `
            <div class="info-box-soft">
              <strong>SakuraGram · Feed da Aurora (@aurora.404)</strong>
              <span>Curta e comente nas postagens dela para ganhar intimidade, desbloquear fotos na Galeria e receber respostas no chat.</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${feedPosts.map((post) => `
                <div class="phone-feed-card">
                  <div class="phone-feed-head">
                    <strong>${escapeHtml(post.handle)}</strong>
                    <span>${escapeHtml(post.time)} · ♥ ${post.likes}</span>
                  </div>
                  <div class="phone-feed-caption">${escapeHtml(post.caption)}</div>
                  <div class="phone-feed-actions">
                    <button class="icon-btn bordered" data-ph-act="feed_like:${escapeHtml(post.id)}" ${post.liked ? "disabled" : ""}>${post.liked ? "Curtido ♥" : "Curtir ♥"}</button>
                    <button class="icon-btn bordered" data-ph-act="feed_comment_sweet:${escapeHtml(post.id)}" ${post.commented ? "disabled" : ""}>${post.commented ? "Comentado" : "Comentar fofo"}</button>
                    <button class="icon-btn bordered" data-ph-act="feed_comment_hot:${escapeHtml(post.id)}" ${post.commented ? "disabled" : ""}>Comentar provocando</button>
                  </div>
                </div>
              `).join("")}
            </div>
          `;
        } else if (curApp === "radar") {
          const sched = AG.getAuroraScheduleInfo ? AG.getAuroraScheduleInfo() : { currentLocationName: "Apê 404", schedule: [], milestones: [] };
          const intSt = AG.getIntimacyStage ? AG.getIntimacyStage() : { stage: 1, title: "Distância Segura", desc: "" };
          const intSummary = AG.Intimacy && AG.Intimacy.getSummaryHtmlData ? AG.Intimacy.getSummaryHtmlData() : { sessions: 0, discovered: [] };
          appContentHtml = `
            <div class="info-box-soft">
              <strong>Localização Agora: ${escapeHtml(sched.currentLocationName)}</strong>
              <span>Estágio de Intimidade: <strong>${escapeHtml(intSt.title)} (${s.aurora.intimacyLevel || 0}%)</strong></span>
              <span>Noites íntimas vividas: <strong>${intSummary.sessions}</strong> · Preferências descobertas: <strong>${intSummary.discovered.length ? escapeHtml(intSummary.discovered.join(", ")) : "Nenhuma ainda"}</strong></span>
            </div>
            <div class="deck-section-label">Prontidão dos Marcos & Ações Avançadas</div>
            <div style="display:flex; flex-direction:column; gap:5px;">
              ${sched.milestones.map((m) => `
                <div class="phone-milestone-row ${m.res.ok ? "is-ok" : "is-wait"}">
                  <span><strong>${escapeHtml(m.label)}</strong></span>
                  <span style="font-size:0.71rem; color:var(--ink-soft);">${m.res.ok ? "Liberado ✓" : escapeHtml(m.res.missing)}</span>
                </div>
              `).join("")}
            </div>
            <div class="deck-section-label">Rotina da Aurora (${sched.isWeekend ? "Fim de Semana" : "Segunda a Sexta"})</div>
            <div class="info-box-soft">
              ${sched.schedule.map((row) => `<span><strong>${escapeHtml(row.hours)}</strong> · ${escapeHtml(row.place)}</span>`).join("")}
            </div>
          `;
        } else if (curApp === "freelapay") {
          const gigs = ph.completedQuickGigs || {};
          const payBug = 38 + Math.round(sk.tech * 1.1);
          const payScr = 54 + Math.round(sk.tech * 1.4);
          const payCon = 44 + Math.round(sk.charisma * 1.4);
          appContentHtml = `
            <div class="info-box-soft">
              <strong>FreelaPay & Pix · Saldo: R$ ${s.player.money}</strong>
              <span>Aluguel (R$ ${s.player.rentAmount || 350}) vence em <strong>${s.player.rentDueInDays} dias</strong> · Ligações feitas: ${ph.callCount || 0} voz / ${ph.videoCallCount || 0} vídeo.</span>
            </div>
            <div class="deck-section-label">Mini-Freelas Remotos (1× por dia cada)</div>
            <div class="choices-list-single">
              <button class="choice-btn tone-life" data-ph-act="gig_bugfix" ${gigs[`${s.day}:gig_bugfix`] || s.player.energy < 10 ? "disabled" : ""}>
                <span class="choice-title">Bugfix Express pelo celular (45m · +2 Código)</span>
                <span class="time-chip">${gigs[`${s.day}:gig_bugfix`] ? "Feito hoje" : `+R$ ${payBug}`}</span>
              </button>
              <button class="choice-btn tone-ctrl" data-ph-act="gig_script" ${gigs[`${s.day}:gig_script`] || s.player.energy < 14 ? "disabled" : ""}>
                <span class="choice-title">Script de Automação remoto (65m · +3 Código)</span>
                <span class="time-chip">${gigs[`${s.day}:gig_script`] ? "Feito hoje" : `+R$ ${payScr}`}</span>
              </button>
              <button class="choice-btn tone-sweet" data-ph-act="gig_consult" ${gigs[`${s.day}:gig_consult`] || s.player.energy < 10 ? "disabled" : ""}>
                <span class="choice-title">Consultoria rápida por áudio (50m · +2 Lábia)</span>
                <span class="time-chip">${gigs[`${s.day}:gig_consult`] ? "Feito hoje" : `+R$ ${payCon}`}</span>
              </button>
            </div>
            <div class="deck-section-label">Transferências Pix</div>
            <div class="choices-list-single">
              <button class="choice-btn tone-sweet" data-ph-act="pix_mimo_aurora" ${s.player.money < 30 || ph.lastPixDay === s.day ? "disabled" : ""}>
                <span class="choice-title">Mandar Pix Mimo pro café & doce da Aurora (+Afinidade, +Intimidade)</span>
                <span class="time-chip">${ph.lastPixDay === s.day ? "Enviado hoje" : "R$ 30"}</span>
              </button>
              <button class="choice-btn tone-life" data-ph-act="pay_rent_pix" ${s.player.money < (s.player.rentAmount || 350) ? "disabled" : ""}>
                <span class="choice-title">Quitar Aluguel antecipado via Pix (+7 dias · +16 Calma)</span>
                <span class="time-chip">R$ ${s.player.rentAmount || 350}</span>
              </button>
            </div>
          `;
        } else if (curApp === "investigar") {
          const allSecrets = s.secretsDossier ? Object.values(s.secretsDossier) : [];
          const heldCount = allSecrets.filter((x) => x.state === "held").length;
          appContentHtml = `
            <div class="info-box-soft">
              <strong>Dossiê sobre a Aurora (${heldCount} na mão de ${allSecrets.length})</strong>
              ${allSecrets
                .map((sec) => {
                  const badge =
                    sec.state === "held" ? `Na sua mão (${sec.severity})`
                    : sec.state === "used_pressure" ? "Já usado em pressão"
                    : sec.state === "burned_trust" ? "Apagado por confiança"
                    : "Não descoberto";
                  return `<span>· ${escapeHtml(sec.name)}: <strong>${badge}</strong></span>`;
                })
                .join("")}
            </div>
            <div class="choices-list-single">
              <button class="choice-btn tone-ctrl" data-ph-act="inv_logs_condominio" ${sk.tech < 18 ? "disabled" : ""}>
                <span class="choice-title">Auditoria digital silenciosa dos logs (Código 18+)</span>
                <span class="time-chip">${sk.tech >= 18 ? "+15% rastros" : `Código ${sk.tech}/18`}</span>
              </button>
              <button class="choice-btn tone-ctrl" data-ph-act="inv_conta_secreta">
                <span class="choice-title">Vasculhar conta secundária privada dela</span>
                <span class="time-chip">+30% rastros</span>
              </button>
              <button class="choice-btn tone-ctrl" data-ph-act="inv_multa_condominio">
                <span class="choice-title">Interceptar notificação confidencial do 404</span>
                <span class="time-chip">+35% rastros</span>
              </button>
              <button class="choice-btn tone-hot" data-ph-act="inv_sabotar_wifi">
                <span class="choice-title">Derrubar o switch do 4º andar pelo app</span>
                <span class="time-chip">+28% rastros</span>
              </button>
              <button class="choice-btn tone-hot" data-ph-act="inv_plantar_boato_predio">
                <span class="choice-title">Soltar uma indireta irônica no grupo do prédio</span>
              </button>
              <button class="choice-btn tone-risky" data-ph-act="inv_app_paquera_externo">
                <span class="choice-title">Abrir app de paquera externo</span>
                <span class="time-chip">+45% rastros</span>
              </button>
            </div>
          `;
        } else if (curApp === "seguranca") {
          const vpnOn = ph.vpnDay === s.day;
          appContentHtml = `
            <div class="info-box-soft">
              <strong>Rastros abertos no seu celular: ${ph.tracksRisk}%</strong>
              <span>VPN & Modo Discreto hoje: <strong>${vpnOn ? "Ativo (-50% rastros)" : "Desligado"}</strong></span>
              <span>${ph.tracksRisk >= 50 ? "Risco alto: se você cruzar com a Aurora agora, ela pode notar algo na sua tela." : "Limpo e discreto por enquanto."}</span>
            </div>
            <div class="choices-list-single">
              <button class="choice-btn tone-life" data-ph-act="sec_limpar_rastros">
                <span class="choice-title">Limpar histórico, prints e ocultar notificações</span>
                <span class="time-chip">15m</span>
              </button>
              <button class="choice-btn tone-ctrl" data-ph-act="sec_ativar_vpn" ${sk.tech < 16 || vpnOn ? "disabled" : ""}>
                <span class="choice-title">Ativar VPN & Modo Discreto hoje (Código 16+ · reduz rastros em 50%)</span>
                <span class="time-chip">${vpnOn ? "Ativo ✓" : sk.tech >= 16 ? "10m" : `Código ${sk.tech}/16`}</span>
              </button>
            </div>
          `;
        } else if (curApp === "galeria") {
          const photos = ph.unlockedPhotos || [];
          const favs = ph.favoritePhotos || [];
          const catalog = AG.GALLERY_CATALOG || [];
          const lockedCatalog = catalog.filter((c) => !photos.includes(c.file));
          appContentHtml = `
            <div class="info-box-soft">
              <strong>Galeria Secreta (${photos.length}/${catalog.length || photos.length} fotos desbloqueadas)</strong>
              <span>Toque numa foto para exibi-la no palco principal ou marque como favorita ★.</span>
            </div>
            ${
              photos.length === 0
                ? `<div class="info-box-soft">Nenhuma foto salva ainda. Peça uma selfie no Chat, interaja no SakuraGram ou faça uma Chamada de Vídeo!</div>`
                : `<div class="choices-list-single">
                    ${photos
                      .map((phName) => {
                        const meta = catalog.find((c) => c.file === phName);
                        const isFav = favs.includes(phName);
                        return `
                          <div style="display:flex; gap:6px; align-items:stretch;">
                            <button class="choice-btn tone-hot" style="flex:1;" data-preview-photo="${escapeHtml(phName)}">
                              <span class="choice-title">${isFav ? "★ " : ""}${escapeHtml(meta ? meta.label : phName)}</span>
                              <span class="time-chip">${escapeHtml(meta ? meta.tier : "Foto")}</span>
                            </button>
                            <button class="icon-btn bordered" data-ph-act="gal_toggle_fav:${escapeHtml(phName)}" title="Favoritar foto">${isFav ? "★" : "☆"}</button>
                          </div>
                        `;
                      })
                      .join("")}
                   </div>`
            }
            ${
              lockedCatalog.length > 0
                ? `<div class="deck-section-label">Como desbloquear mais fotos</div>
                   <div class="info-box-soft">
                     ${lockedCatalog.slice(0, 4).map((c) => `<span>· <strong>${escapeHtml(c.label)}</strong> (${escapeHtml(c.tier)}): ${escapeHtml(c.hint)}</span>`).join("")}
                   </div>`
                : ""
            }
          `;
        } else if (curApp === "delivery") {
          appContentHtml = `
            <div class="info-box-soft">
              <strong>Delivery 24h · Entregas no 4º Andar & Café Sakura</strong>
              <span>Se a Aurora estiver dormindo, o pedido fica como surpresa pra quando ela acordar!</span>
            </div>
            <div class="choices-list-single">
              <button class="choice-btn tone-sweet" data-ph-act="del_mimo_404" ${s.player.money < 28 ? "disabled" : ""}>
                <span class="choice-title">Mandar café gelado e doce surpresa pra Aurora (+Afinidade, +Intimidade)</span>
                <span class="time-chip">R$ 28</span>
              </button>
              <button class="choice-btn tone-sweet" data-ph-act="del_jantar_dois" ${s.player.money < 42 ? "disabled" : ""}>
                <span class="choice-title">Pedir jantar quente pra dois (+46 Saciedade, +Intimidade, +Afinidade)</span>
                <span class="time-chip">R$ 42</span>
              </button>
              <button class="choice-btn tone-life" data-ph-act="del_kit_madrugada" ${s.player.money < 26 ? "disabled" : ""}>
                <span class="choice-title">Kit Madrugada Criativa pra ela (+28% Disposição Dela, +Afinidade)</span>
                <span class="time-chip">R$ 26</span>
              </button>
              <button class="choice-btn tone-hot" data-ph-act="del_flores_vela" ${s.player.money < 48 ? "disabled" : ""}>
                <span class="choice-title">Flores & Vela de Cereja surpresa no 404 (+16 Clima, +12 Intimidade)</span>
                <span class="time-chip">R$ 48</span>
              </button>
              <button class="choice-btn tone-life" data-ph-act="del_lanche_402" ${s.player.money < 20 ? "disabled" : ""}>
                <span class="choice-title">Pedir lanche rápido pro seu Apê 402 (+48 Saciedade)</span>
                <span class="time-chip">R$ 20</span>
              </button>
            </div>
          `;
        }

        bodyHtml = appTabsHtml + appContentHtml;
      }
    } else if (type === "status_memories") {
      title = "Ficha da Aurora · Psicologia, Dossiê & Memórias";
      const milestoneEndings = AG.getAvailableMilestoneEndings();
      const sk = (s.player && s.player.skills) || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
      const bels = s.belongings ? Object.values(s.belongings) : [];
      const secs = s.secretsDossier ? Object.values(s.secretsDossier) : [];
      const hist = s.dialogueHistory || [];
      const curApproach = (AG.PLAYER_APPROACHES && AG.PLAYER_APPROACHES[s.player.activeApproach || "natural"]) || { label: "Natural" };
      const intStage = AG.getIntimacyStage ? AG.getIntimacyStage() : { title: "Distância Segura", desc: "" };
      const curMoodDef = AG.MOOD_DEFS[s.aurora.mood] || AG.MOOD_DEFS.espontanea;
      const emoProf = AG.EmotionEngine ? AG.EmotionEngine.getEmotionProfile() : null;

      bodyHtml = `
        <div class="info-box-soft">
          <strong>Seu Personagem</strong>
          <span>Arquétipo: <strong>${escapeHtml(AG.getPlayerPersonaLabel ? AG.getPlayerPersonaLabel() : "Natural")}</strong> · Postura ativa: <strong>${escapeHtml(stripLeadingEmoji(curApproach.label))}</strong></span>
          <span>Lábia <strong>${sk.charisma}</strong> · Furtividade <strong>${sk.stealth}</strong> · Código <strong>${sk.tech}</strong> · Percepção <strong>${sk.perception}</strong></span>
          <span>Carreira: Cap. ${s.player.storyChapter} (${s.player.workProgress} entregas) · Caixas: ${s.player.boxesUnpacked}/3 · Aluguel em ${s.player.rentDueInDays}d</span>
        </div>

        <div class="info-box-soft">
          <strong>Vínculo & Estado Vivo da Aurora</strong>
          <span>Afinidade <strong>${s.aurora.affinity > 0 ? "+" : ""}${s.aurora.affinity}</strong> · Confiança <strong>${s.aurora.trust}%</strong> · Clima Quente <strong>${s.aurora.heat}%</strong> · Atrito <strong>${s.aurora.discomfort}%</strong></span>
          <span>Intimidade: <strong>${escapeHtml(intStage.title)} (${s.aurora.intimacyLevel || 0}%)</strong> — ${escapeHtml(intStage.desc)}</span>
          <span>Desejo dela <strong>${s.aurora.arousal || 10}%</strong> · Abertura <strong>${s.aurora.vulnerability || 15}%</strong> · Ciúme <strong>${s.aurora.jealousy || 0}%</strong> · Disposição <strong>${s.aurora.auroraEnergy !== undefined ? s.aurora.auroraEnergy : 76}%</strong></span>
          <span>Humor atual: <strong>${escapeHtml(stripLeadingEmoji(curMoodDef.label))}</strong> — ${escapeHtml(curMoodDef.desc)}</span>
          <span>Visual atual: <strong>${escapeHtml(s.aurora.currentOutfit || "Moletom Oversized do 404")}</strong></span>
        </div>

        ${(() => {
          if (!AG.Intimacy) return "";
          const d = AG.Intimacy.getSummaryHtmlData();
          const pref = d.discovered.length
            ? d.discovered.map((x) => escapeHtml(x)).join(" · ")
            : "ainda nada descoberto — preste atenção nas reações dela";
          return `<div class="info-box-soft">
            <strong>Intimidade (18+)</strong>
            <span>Momentos íntimos: <strong>${d.sessions}</strong> · Check-ins de cuidado: <strong>${d.checkins}</strong> · Pausas respeitadas: <strong>${d.stops}</strong></span>
            <span>O que você já descobriu que ela gosta: <strong>${pref}</strong></span>
            ${d.log.slice(0, 3).map((l) => `<small style="color:var(--ink-muted);">Dia ${l.day} · ${escapeHtml(l.time)} — ${l.reason === "pausa" ? "pausa respeitada com carinho" : "noite concluída com carinho"}</small>`).join("")}
          </div>`;
        })()}

        <div class="info-box-soft">
          <strong>Psicologia Profunda, Poder & Espiral Sombria</strong>
          <span>Postura dela: <strong>${escapeHtml(s.aurora.stanceTrait || "Espontânea")}</strong> · Clima do dia: <strong>${escapeHtml(s.aurora.dailyMoodBias || "Padrão")}</strong></span>
          <span>Estabilidade <strong>${s.aurora.mentalStability !== undefined ? s.aurora.mentalStability : 82}%</strong> · Espiral Sombria <strong>${s.aurora.auroraDarkness || 5}%</strong> · Feridas <strong>${s.aurora.traumaLevel || 0}%</strong></span>
          <span>Armadura <strong>${s.aurora.composure !== undefined ? s.aurora.composure : 75}%</strong> · Pressão <strong>${s.aurora.leveragePressure || 0}%</strong> · Controle dela <strong>${s.aurora.dominance}%</strong></span>
          <span>Sua Influência <strong>${s.aurora.influence || 0}%</strong> · Rivalidade <strong>${s.aurora.rivalry || 0}%</strong> · Suspeita <strong>${s.aurora.suspicion || 0}%</strong></span>
          ${
            emoProf && emoProf.canSeeUndercurrent
              ? `<span>Emoção oculta (Percepção 16+): <strong>${escapeHtml(stripLeadingEmoji(emoProf.undercurrentDef.label))}</strong></span>`
              : `<span>Emoção oculta: <em>Requer Percepção 16+ para enxergar o que ela disfarça.</em></span>`
          }
        </div>

        <div class="info-box-soft">
          <strong>Dossiê de Segredos (${secs.filter((x) => x.state === "held").length} na sua mão)</strong>
          ${secs
            .map((sec) => {
              const lbl =
                sec.state === "held" ? `Na sua mão (${sec.severity} · +${sec.pressureVal}% pressão)`
                : sec.state === "used_pressure" ? "Usado em pressão"
                : sec.state === "burned_trust" ? "Queimado por confiança"
                : "Não descoberto";
              return `<span>· ${escapeHtml(sec.name)}: <strong>${lbl}</strong></span>`;
            })
            .join("")}
        </div>

        <div class="info-box-soft">
          <strong>Pertences Pessoais da Aurora</strong>
          ${bels
            .map((b) => {
              const stLabel =
                b.state === "in_404" ? "No Apê 404"
                : b.state === "carried" ? "Com você (guarde na gaveta do 402)"
                : b.state === "hidden_in_402" ? "Trancado na gaveta secreta do 402"
                : "Quitado em segredo";
              return `<span>· ${escapeHtml(b.name)}: <strong>${stLabel}</strong></span>`;
            })
            .join("")}
        </div>

        ${
          milestoneEndings.length > 0
            ? `<div class="info-box-soft" style="background:var(--ribbon-soft); border-color:var(--crimson);">
                 <strong>Finais de Arco Disponíveis Agora</strong>
                 <div id="modal-endings-list" style="display:flex; flex-direction:column; gap:6px; margin-top:6px;"></div>
               </div>`
            : ""
        }

        <div class="deck-section-label">Memórias da Aurora (${s.memories.length})</div>
        <div style="display:flex; flex-direction:column; gap:6px; max-height:160px; overflow-y:auto;">
          ${
            s.memories.length === 0
              ? `<div class="info-box-soft">Vocês acabaram de se conhecer — suas atitudes vão criar as memórias dela.</div>`
              : s.memories
                  .map(
                    (m) => `
                    <div class="info-box-soft">
                      <span>${escapeHtml(m.text)}</span>
                      <small style="color:var(--ink-muted); font-family:var(--font-mono);">Dia ${m.dayCreated} · ${m.permanent ? "Permanente" : "Recente"}</small>
                    </div>
                  `
                  )
                  .join("")
          }
        </div>

        <div class="deck-section-label">Histórico Recente (${hist.length})</div>
        <div style="display:flex; flex-direction:column; gap:5px; max-height:150px; overflow-y:auto;">
          ${
            hist.length === 0
              ? `<div class="info-box-soft">Nenhum registro ainda nesta sessão.</div>`
              : hist.map((h) => `<div class="info-box-soft" style="padding:7px 10px;"><strong>Dia ${h.day} · ${h.time}</strong> — ${escapeHtml(h.text)}</div>`).join("")
          }
        </div>
      `;
    } else if (type === "settings") {
      title = "Configurações Completas";
      const st = s.settings || {};
      const ptVoices = (AG.Audio && AG.Audio.getAvailablePortugueseVoices) ? AG.Audio.getAvailablePortugueseVoices() : [];
      const curTrackLabel = (AG.Audio && AG.Audio.getCurrentTrackLabel) ? AG.Audio.getCurrentTrackLabel() : "Sakura Afternoon";
      const trackOpts = (AG.Audio && AG.Audio.BGM_TRACK_OPTIONS) ? AG.Audio.BGM_TRACK_OPTIONS : [{ id: "auto", label: "Automática" }];
      const bgmVol = typeof st.bgmVolume === "number" ? st.bgmVolume : 45;
      const sfxVol = typeof st.sfxVolume === "number" ? st.sfxVolume : 70;
      const voiceVol = typeof st.voiceVolume === "number" ? st.voiceVolume : 85;
      const voiceRate = typeof st.voiceRate === "number" ? st.voiceRate : 1.0;
      const voicePitchPct = Math.round((typeof st.voicePitch === "number" ? st.voicePitch : 1.0) * 100);
      const bgmMode = st.bgmMode || "auto";

      bodyHtml = `
        <div class="info-box-soft">
          <strong>Visual, Tema & Cenários</strong>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
            <button class="tab-btn ${st.theme === "pastel" ? "active" : ""}" data-set-theme="pastel">Papel & Rosa (Claro)</button>
            <button class="tab-btn ${st.theme === "midnight" ? "active" : ""}" data-set-theme="midnight">Madrugada 404 (Escuro)</button>
            <button class="tab-btn ${st.theme === "velvet" ? "active" : ""}" data-set-theme="velvet">Crimson Velvet (Vinho Sensual)</button>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
            <button class="tab-btn ${(st.bgIntensity || "intense") === "intense" ? "active" : ""}" data-set-bgfx="intense">Fundo: Intenso</button>
            <button class="tab-btn ${st.bgIntensity === "soft" ? "active" : ""}" data-set-bgfx="soft">Fundo: Suave</button>
            <button class="tab-btn ${st.bgIntensity === "off" ? "active" : ""}" data-set-bgfx="off">Fundo: Estático</button>
            <button class="tab-btn ${st.locationArt !== false ? "active" : ""}" data-toggle-locart="1">Cenários Ilustrados: ${st.locationArt !== false ? "Ligados" : "Desligados"}</button>
            <button class="tab-btn ${st.animatedBg !== false ? "active" : ""}" data-toggle-anim="1">Animações: ${st.animatedBg !== false ? "Ligadas" : "Desligadas"}</button>
          </div>
        </div>

        <div class="info-box-soft">
          <strong>Cursor & Interações do Mouse</strong>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
            <button class="tab-btn ${st.customCursor !== false ? "active" : ""}" data-toggle-cursor="1">Cursor Personalizado: ${st.customCursor !== false ? "Ligado" : "Nativo"}</button>
            <button class="tab-btn ${st.clickFx !== false ? "active" : ""}" data-toggle-clickfx="1">Efeitos de Clique: ${st.clickFx !== false ? "Ligados" : "Desligados"}</button>
            <button class="tab-btn ${st.hoverSfx !== false ? "active" : ""}" data-toggle-hoversfx="1">Som ao Passar Mouse: ${st.hoverSfx !== false ? "Ligado" : "Mudo"}</button>
          </div>
        </div>

        <div class="info-box-soft">
          <strong>Trilha Sonora, Ambiente & Efeitos Sonoros</strong>
          <span style="font-size:0.74rem; color:var(--ink-muted);">Faixa ativa: <strong>${escapeHtml(curTrackLabel)}</strong> (também detecta faixas MP3/WAV em <code>midias/audio/</code>)</span>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
            <button class="tab-btn ${st.bgmEnabled !== false ? "active" : ""}" data-toggle-bgm="1">Música: ${st.bgmEnabled !== false ? "Ligada" : "Muda"}</button>
            <button class="tab-btn ${st.ambienceEnabled !== false ? "active" : ""}" data-toggle-ambience="1">Som de Chuva: ${st.ambienceEnabled !== false ? "Ligado" : "Desligado"}</button>
            <button class="tab-btn ${st.soundEnabled !== false ? "active" : ""}" data-toggle-snd="1">Efeitos Sonoros: ${st.soundEnabled !== false ? "Ligados" : "Mudos"}</button>
          </div>
          <select class="settings-select" id="sel-bgm-mode" title="Escolher modo ou faixa da trilha sonora">
            ${trackOpts.map((t) => `<option value="${escapeHtml(t.id)}" ${bgmMode === t.id ? "selected" : ""}>Trilha: ${escapeHtml(t.label)}</option>`).join("")}
          </select>
          <div class="settings-slider-row">
            <span>Volume da Música</span>
            <input type="range" min="0" max="100" value="${bgmVol}" class="settings-range" id="rng-bgm-vol" />
            <strong id="val-bgm-vol">${bgmVol}%</strong>
          </div>
          <div class="settings-slider-row">
            <span>Volume dos Efeitos</span>
            <input type="range" min="0" max="100" value="${sfxVol}" class="settings-range" id="rng-sfx-vol" />
            <strong id="val-sfx-vol">${sfxVol}%</strong>
          </div>
        </div>

        <div class="info-box-soft">
          <strong>Voz da Aurora & Narração PT-BR</strong>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
            <button class="tab-btn ${st.voiceEnabled !== false ? "active" : ""}" data-toggle-voice="1">Voz da Aurora: ${st.voiceEnabled !== false ? "Ligada" : "Desligada"}</button>
            <button class="tab-btn ${st.voiceAutoPlay !== false ? "active" : ""}" data-toggle-vauto="1">Fala Automática: ${st.voiceAutoPlay !== false ? "Ligada" : "Manual (V)"}</button>
            <button class="tab-btn ${st.voiceReadNarration === true ? "active" : ""}" data-toggle-vnarr="1">Ler Narrações: ${st.voiceReadNarration === true ? "Ligado" : "Desligado"}</button>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px; align-items:center;">
            <button class="tab-btn ${voiceRate <= 0.9 ? "active" : ""}" data-set-vrate="0.88">Ritmo: Lento</button>
            <button class="tab-btn ${voiceRate > 0.9 && voiceRate < 1.1 ? "active" : ""}" data-set-vrate="1.0">Ritmo: Natural</button>
            <button class="tab-btn ${voiceRate >= 1.1 ? "active" : ""}" data-set-vrate="1.15">Ritmo: Vivo</button>
            <button class="icon-btn bordered" id="btn-test-voice">Testar voz</button>
            <button class="icon-btn bordered" id="btn-stop-voice">Parar voz</button>
          </div>
          <div class="settings-slider-row">
            <span>Volume da Voz</span>
            <input type="range" min="0" max="100" value="${voiceVol}" class="settings-range" id="rng-voice-vol" />
            <strong id="val-voice-vol">${voiceVol}%</strong>
          </div>
          <div class="settings-slider-row">
            <span>Timbre da Voz</span>
            <input type="range" min="85" max="120" value="${voicePitchPct}" class="settings-range" id="rng-voice-pitch" />
            <strong id="val-voice-pitch">${(voicePitchPct / 100).toFixed(2)}×</strong>
          </div>
          ${
            ptVoices.length > 0
              ? `<select class="settings-select" id="sel-aurora-voice" title="Escolher voz instalada no sistema">
                   <option value="">Voz automática PT-BR (recomendada)</option>
                   ${ptVoices.map((v) => `<option value="${escapeHtml(v.name)}" ${st.voiceName === v.name ? "selected" : ""}>${escapeHtml(v.name)} (${escapeHtml(v.lang)})</option>`).join("")}
                 </select>`
              : `<select class="settings-select" id="sel-aurora-voice" title="Escolher voz instalada no sistema">
                   <option value="">Voz automática PT-BR do navegador</option>
                 </select>`
          }
        </div>

        <div class="info-box-soft">
          <strong>Leitura, Botões & Cenas Íntimas (18+)</strong>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
            <button class="tab-btn ${st.intimacyTone !== "suave" ? "active" : ""}" data-set-itone="intenso">18+: Sensual detalhado</button>
            <button class="tab-btn ${st.intimacyTone === "suave" ? "active" : ""}" data-set-itone="suave">18+: Sugestivo (suave)</button>
            <button class="tab-btn ${st.buttonDetailMode !== "detailed" ? "active" : ""}" data-set-btnmode="clean">Botões Limpos</button>
            <button class="tab-btn ${st.buttonDetailMode === "detailed" ? "active" : ""}" data-set-btnmode="detailed">Botões Detalhados</button>
            <button class="tab-btn ${st.textSpeed !== "typewriter" && st.textSpeed !== "fast" ? "active" : ""}" data-set-speed="instant">Texto Instantâneo</button>
            <button class="tab-btn ${st.textSpeed === "fast" ? "active" : ""}" data-set-speed="fast">Texto Rápido</button>
            <button class="tab-btn ${st.textSpeed === "typewriter" ? "active" : ""}" data-set-speed="typewriter">Máquina de Escrever</button>
            <button class="tab-btn ${st.fontScale !== "large" ? "active" : ""}" data-set-font="normal">Fonte Padrão</button>
            <button class="tab-btn ${st.fontScale === "large" ? "active" : ""}" data-set-font="large">Fonte Ampliada</button>
          </div>
        </div>

        <div class="info-box-soft">
          <strong>Backup de Save (.json), Padrões & Atalhos</strong>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; align-items:center;">
            <button class="icon-btn bordered" id="btn-export-json">Exportar Save (.json)</button>
            <label class="icon-btn bordered" style="cursor:pointer;">
              Importar Save (.json)
              <input type="file" accept=".json" id="inp-import-json" style="display:none;" />
            </label>
            <button class="icon-btn bordered" id="btn-reset-settings">Restaurar Padrões</button>
          </div>
          <span style="margin-top:6px;"><code>1–6</code> escolher · <code>Espaço</code> concluir texto · <code>H</code> palco limpo · <code>E</code> expandir diálogo · <code>V</code> voz · <code>M</code> música · <code>L</code> Log · <code>C</code> Celular · <code>F</code> Ficha · <code>Esc</code> fechar</span>
        </div>
      `;
    } else if (type === "backlog") {
      title = "Log de Diálogos";
      const hist = (s.dialogueHistory || []).slice().reverse();
      bodyHtml = hist.length === 0
        ? `<div class="info-box-soft">Nenhuma fala registrada ainda nesta partida.</div>`
        : `<div id="backlog-scroll-list" style="display:flex; flex-direction:column; gap:8px;">
            ${hist
              .map((h) => {
                const isAurora = h.kind === "aurora" || h.speaker === "Aurora";
                return `
                  <div class="backlog-item ${isAurora ? "is-aurora" : ""}">
                    <div class="backlog-meta">
                      ${isAurora ? `<span class="backlog-speaker">Aurora</span>` : `<span>Cena</span>`}
                      <span>Dia ${h.day} · ${escapeHtml(h.time || "")}</span>
                    </div>
                    ${h.playerBeat ? `<div class="vn-player-beat" style="margin:2px 0;"><strong>Você</strong>${escapeHtml(h.playerBeat)}</div>` : ""}
                    ${h.action ? `<div class="backlog-action">${escapeHtml(h.action)}</div>` : ""}
                    <div class="backlog-line" style="white-space:pre-line;">${isAurora ? "— " : ""}${escapeHtml(stripLeadingEmoji(h.text))}</div>
                  </div>
                `;
              })
              .join("")}
           </div>`;
    } else if (type === "custom_media") {
      title = "Galeria de PNGs (20 Slots)";
      const charEntries = Object.entries(AG.MEDIA_PATHS.character);
      const sceneEntries = Object.entries(AG.MEDIA_PATHS.specialScenes);

      bodyHtml = `
        <div class="info-box-soft">
          <strong>Pasta 1: <code>midias/personagem/</code> (8 Visuais da Aurora)</strong>
        </div>
        <div class="choices-list-single">
          ${charEntries
            .map(
              ([k, path]) => `
              <div class="info-box-soft" style="flex-direction:row; justify-content:space-between; align-items:center;">
                <code>${escapeHtml(path)}</code>
                <button class="icon-btn bordered" data-test-char="${escapeHtml(path)}">Testar</button>
              </div>
            `
            )
            .join("")}
        </div>
        <div class="info-box-soft" style="margin-top:6px;">
          <strong>Pasta 2: <code>midias/cenas_especiais/</code> (12 Cenas Especiais)</strong>
        </div>
        <div class="choices-list-single">
          ${sceneEntries
            .map(
              ([k, path]) => `
              <div class="info-box-soft" style="flex-direction:row; justify-content:space-between; align-items:center;">
                <code>${escapeHtml(path)}</code>
                <button class="icon-btn bordered" data-test-scene="${escapeHtml(k)}">Ativar</button>
              </div>
            `
            )
            .join("")}
        </div>
      `;
    } else if (type === "inventory") {
      title = "Sua Mochila";
      bodyHtml = s.inventory.length === 0
        ? `<div class="info-box-soft">Mochila vazia. Visite o <strong>Mercadinho 24h</strong> ou cozinhe no <strong>Apê 402</strong>.</div>`
        : s.inventory.map((i) => `<div class="info-box-soft"><strong>${escapeHtml(i.name)} (×${i.qty})</strong><span>${escapeHtml(i.desc)}</span></div>`).join("");
    } else if (type === "diary") {
      const totalEnds = Object.keys(AG.ENDINGS).length;
      title = `Finais Descobertos (${s.unlockedEndings.length}/${totalEnds})`;
      bodyHtml = Object.values(AG.ENDINGS)
        .map((e) => {
          const unlocked = s.unlockedEndings.includes(e.id);
          return `
            <div class="info-box-soft" style="border-left:4px solid ${unlocked ? "var(--crimson)" : "var(--line-strong)"};">
              <strong>${unlocked ? escapeHtml(e.title) : `Bloqueado · ${escapeHtml(e.category)}`}</strong>
              <span>${unlocked ? escapeHtml(e.paragraphs[0]) : "Explore escolhas diferentes para descobrir esta rota."}</span>
            </div>
          `;
        })
        .join("");
    } else if (type === "save_load") {
      title = "Saves & Reset";
      const slots = ["autosave", "slot1", "slot2", "slot3"];
      bodyHtml = slots
        .map((sl) => {
          const info = AG.getSaveInfo(sl);
          const name = sl === "autosave" ? "Auto-Save" : `Slot ${sl.replace("slot", "")}`;
          return `
            <div class="info-box-soft" style="flex-direction:row; justify-content:space-between; align-items:center;">
              <div>
                <strong>${name}</strong>
                <span style="display:block; font-size:0.76rem;">${info ? `Dia ${info.day} · ${info.time} · ${escapeHtml(stripLeadingEmoji(info.dynamic))}` : "Vazio"}</span>
              </div>
              <div style="display:flex; gap:6px;">
                ${sl !== "autosave" ? `<button class="icon-btn bordered" data-save="${sl}">Salvar</button>` : ""}
                ${info ? `<button class="icon-btn bordered" data-load="${sl}">Carregar</button>` : ""}
              </div>
            </div>
          `;
        })
        .join("") + `
        <button class="choice-btn tone-ctrl" id="btn-reset-run"><span class="choice-title">Reiniciar partida atual (Voltar ao Prólogo)</span></button>
        <button class="choice-btn tone-risky" id="btn-hard-reset"><span class="choice-title">Apagar todos os saves e dados locais</span></button>
      `;
    } else if (type === "studio_credits") {
      title = "Créditos do Estúdio";
      bodyHtml = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:16px; padding:18px; text-align:center;">
          <img src="${AG.MEDIA_PATHS.logos.studioLogo}" alt="santni studio" style="max-height:76px; object-fit:contain;" />
          <img src="${AG.MEDIA_PATHS.logos.studioIcon}" alt="santni icon" style="width:72px; height:72px; object-fit:contain;" />
          <div class="info-box-soft" style="text-align:center;">
            <strong>My Favorite Woman Is Small</strong>
            <span>Uma produção original <strong>santni studio / santni productions</strong>.</span>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="modal-header">
        <span class="modal-title">${title}</span>
        <button class="icon-btn bordered" id="btn-close-modal">Fechar</button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
    `;

    backdrop.appendChild(card);

    setTimeout(() => {
      const closeBtn = card.querySelector("#btn-close-modal");
      if (closeBtn) closeBtn.addEventListener("click", () => { activeModal = null; AG.render(); });

      if (type === "backlog") {
        const mb = card.querySelector(".modal-body");
        if (mb) mb.scrollTop = mb.scrollHeight;
      }

      if (type === "phone") {
        const sc = card.querySelector("#phone-chat-scroll");
        if (sc) sc.scrollTop = sc.scrollHeight;
        card.querySelectorAll("[data-app]").forEach((b) => {
          b.addEventListener("click", () => {
            AG.playSound("click");
            s.phoneState.activeApp = b.getAttribute("data-app");
            AG.render();
          });
        });
        card.querySelectorAll("[data-ph-act]").forEach((b) => {
          b.addEventListener("click", () => {
            AG.runPhoneAction(b.getAttribute("data-ph-act"));
            AG.render();
          });
        });
        card.querySelectorAll("[data-preview-photo]").forEach((b) => {
          b.addEventListener("click", () => {
            const pName = b.getAttribute("data-preview-photo");
            const allPaths = Object.values(AG.MEDIA_PATHS.character).concat(Object.values(AG.MEDIA_PATHS.specialScenes));
            const matchedPath = allPaths.find((p) => p.endsWith(pName)) || ("midias/cenas_especiais/" + pName);
            s.aurora.previewPhotoPath = matchedPath;
            activeModal = null;
            AG.render();
          });
        });
      }

      if (type === "status_memories") {
        const box = card.querySelector("#modal-endings-list");
        if (box) {
          AG.getAvailableMilestoneEndings().forEach((me) => {
            box.appendChild(
              buildChoiceButton({
                title: me.label,
                tone: "sweet",
                onClick: () => {
                  activeModal = null;
                  AG.unlockEnding(me.id);
                  AG.render();
                }
              })
            );
          });
        }
      }

      if (type === "custom_media") {
        card.querySelectorAll("[data-test-scene]").forEach((b) => {
          b.addEventListener("click", () => {
            AG.playSound("click");
            s.aurora.previewPhotoPath = null;
            s.aurora.activeSpecialSceneKey = b.getAttribute("data-test-scene");
            if (s.mode === "title_menu") s.mode = "simulator";
            activeModal = null;
            AG.render();
          });
        });
        card.querySelectorAll("[data-test-char]").forEach((b) => {
          b.addEventListener("click", () => {
            AG.playSound("click");
            const p = b.getAttribute("data-test-char");
            s.aurora.activeSpecialSceneKey = null;
            s.aurora.previewPhotoPath = p;
            if (s.mode === "title_menu") s.mode = "simulator";
            activeModal = null;
            AG.render();
          });
        });
      }

      if (type === "save_load") {
        card.querySelectorAll("[data-save]").forEach((b) => {
          b.addEventListener("click", () => { AG.playSound("heart"); AG.saveGame(b.getAttribute("data-save")); AG.render(); });
        });
        card.querySelectorAll("[data-load]").forEach((b) => {
          b.addEventListener("click", () => {
            AG.playSound("click");
            if (AG.loadGame(b.getAttribute("data-load"))) { activeModal = null; AG.render(); }
          });
        });
        const btnResetRun = card.querySelector("#btn-reset-run");
        if (btnResetRun) btnResetRun.addEventListener("click", () => { AG.resetNewGame(true); activeModal = null; AG.render(); });
        const btnHard = card.querySelector("#btn-hard-reset");
        if (btnHard) btnHard.addEventListener("click", () => { AG.hardResetAllData(); activeModal = null; AG.render(); });
      }

      if (type === "settings") {
        const saveAndApply = () => {
          AG.applyVisualSettings();
          AG.saveGame("autosave");
          AG.render();
        };
        card.querySelectorAll("[data-set-theme]").forEach((b) => {
          b.addEventListener("click", () => { s.settings.theme = b.getAttribute("data-set-theme"); saveAndApply(); });
        });
        card.querySelectorAll("[data-set-btnmode]").forEach((b) => {
          b.addEventListener("click", () => { s.settings.buttonDetailMode = b.getAttribute("data-set-btnmode"); saveAndApply(); });
        });
        card.querySelectorAll("[data-set-speed]").forEach((b) => {
          b.addEventListener("click", () => { s.settings.textSpeed = b.getAttribute("data-set-speed"); saveAndApply(); });
        });
        card.querySelectorAll("[data-set-itone]").forEach((b) => {
          b.addEventListener("click", () => { s.settings.intimacyTone = b.getAttribute("data-set-itone"); saveAndApply(); });
        });
        card.querySelectorAll("[data-set-bgfx]").forEach((b) => {
          b.addEventListener("click", () => { s.settings.bgIntensity = b.getAttribute("data-set-bgfx"); saveAndApply(); });
        });
        card.querySelectorAll("[data-set-font]").forEach((b) => {
          b.addEventListener("click", () => { s.settings.fontScale = b.getAttribute("data-set-font"); saveAndApply(); });
        });
        card.querySelectorAll("[data-set-vrate]").forEach((b) => {
          b.addEventListener("click", () => { s.settings.voiceRate = parseFloat(b.getAttribute("data-set-vrate")) || 1.0; saveAndApply(); });
        });

        const bindToggle = (sel, key) => {
          const el = card.querySelector(sel);
          if (el) el.addEventListener("click", () => {
            s.settings[key] = s.settings[key] === false ? true : false;
            saveAndApply();
          });
        };
        bindToggle("[data-toggle-anim]", "animatedBg");
        bindToggle("[data-toggle-locart]", "locationArt");
        bindToggle("[data-toggle-cursor]", "customCursor");
        bindToggle("[data-toggle-clickfx]", "clickFx");
        bindToggle("[data-toggle-hoversfx]", "hoverSfx");
        bindToggle("[data-toggle-bgm]", "bgmEnabled");
        bindToggle("[data-toggle-ambience]", "ambienceEnabled");
        bindToggle("[data-toggle-snd]", "soundEnabled");
        bindToggle("[data-toggle-voice]", "voiceEnabled");
        bindToggle("[data-toggle-vauto]", "voiceAutoPlay");

        const narrToggle = card.querySelector("[data-toggle-vnarr]");
        if (narrToggle) {
          narrToggle.addEventListener("click", () => {
            s.settings.voiceReadNarration = s.settings.voiceReadNarration === true ? false : true;
            saveAndApply();
          });
        }

        const bgmModeSel = card.querySelector("#sel-bgm-mode");
        if (bgmModeSel) {
          bgmModeSel.addEventListener("change", () => {
            s.settings.bgmMode = bgmModeSel.value || "auto";
            saveAndApply();
          });
        }

        const bindRange = (rngSel, valSel, key) => {
          const rng = card.querySelector(rngSel);
          const lbl = card.querySelector(valSel);
          if (!rng) return;
          rng.addEventListener("input", () => {
            s.settings[key] = parseInt(rng.value, 10);
            if (lbl) lbl.textContent = `${s.settings[key]}%`;
            AG.applyVisualSettings();
            AG.saveGame("autosave");
          });
        };
        bindRange("#rng-bgm-vol", "#val-bgm-vol", "bgmVolume");
        bindRange("#rng-sfx-vol", "#val-sfx-vol", "sfxVolume");
        bindRange("#rng-voice-vol", "#val-voice-vol", "voiceVolume");

        const pitchRng = card.querySelector("#rng-voice-pitch");
        const pitchLbl = card.querySelector("#val-voice-pitch");
        if (pitchRng) {
          pitchRng.addEventListener("input", () => {
            const pct = parseInt(pitchRng.value, 10) || 100;
            s.settings.voicePitch = Number((pct / 100).toFixed(2));
            if (pitchLbl) pitchLbl.textContent = `${s.settings.voicePitch.toFixed(2)}×`;
            AG.applyVisualSettings();
            AG.saveGame("autosave");
          });
        }

        const voiceSel = card.querySelector("#sel-aurora-voice");
        if (voiceSel) {
          voiceSel.addEventListener("change", () => {
            s.settings.voiceName = voiceSel.value || "";
            AG.applyVisualSettings();
            AG.saveGame("autosave");
          });
        }
        const testVoiceBtn = card.querySelector("#btn-test-voice");
        if (testVoiceBtn) {
          testVoiceBtn.addEventListener("click", () => {
            if (AG.Audio && AG.Audio.speakAurora) {
              AG.Audio.speakAurora("Oi, vizinho do 402! Assim que fica a minha voz quando a gente conversa por aqui no quarto andar.", { force: true });
            }
          });
        }
        const stopVoiceBtn = card.querySelector("#btn-stop-voice");
        if (stopVoiceBtn) {
          stopVoiceBtn.addEventListener("click", () => {
            if (AG.Audio && AG.Audio.stopVoice) AG.Audio.stopVoice();
          });
        }
        const resetSetBtn = card.querySelector("#btn-reset-settings");
        if (resetSetBtn) {
          resetSetBtn.addEventListener("click", () => {
            AG.playSound("page");
            if (AG.resetDefaultSettings) AG.resetDefaultSettings();
            AG.queueToast("Configurações restauradas para o padrão", "info", "info");
            AG.render();
          });
        }
        const expBtn = card.querySelector("#btn-export-json");
        if (expBtn) {
          expBtn.addEventListener("click", () => {
            const blob = new Blob([JSON.stringify(s, null, 2)], { type: "application/json" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `save_my_favorite_woman_is_small_dia_${s.day}.json`;
            a.click();
          });
        }
        const impInput = card.querySelector("#inp-import-json");
        if (impInput) {
          impInput.addEventListener("change", (ev) => {
            const file = ev.target.files && ev.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const res = AG.importSaveData
                ? AG.importSaveData(String(reader.result), "autosave")
                : { ok: false, error: "Importador indisponível." };
              if (res.ok) {
                activeModal = null;
                AG.queueToast(`Save importado (Dia ${res.day} · ${res.time})`, "pos", "up");
                AG.render();
              } else {
                AG.queueToast(res.error || "Arquivo de save inválido", "neg", "down");
                AG.flushToasts();
              }
            };
            reader.readAsText(file);
          });
        }
      }
    }, 0);

    return backdrop;
  }

  window.addEventListener("keydown", (e) => {
    const tag = e.target && e.target.tagName ? e.target.tagName.toUpperCase() : "";
    if (tag === "INPUT" || tag === "TEXTAREA" || e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key === "Escape") {
      if (activeModal) {
        activeModal = null;
        AG.render();
      } else if (stageUiHidden) {
        stageUiHidden = false;
        AG.render();
      }
      return;
    }

    const s = AG.state;
    if (!activeModal && /^[1-6]$/.test(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      if (typeof currentShortcutActions[idx] === "function") {
        e.preventDefault();
        currentShortcutActions[idx]();
      }
      return;
    }

    if (e.key === " " && !activeModal && typeof activeTypewriterFinish === "function") {
      e.preventDefault();
      activeTypewriterFinish();
      return;
    }

    if (s.mode === "simulator") {
      const k = e.key.toLowerCase();
      if (k === "h" && !activeModal) {
        AG.playSound("page");
        stageUiHidden = !stageUiHidden;
        AG.render();
      } else if (k === "e" && !activeModal) {
        AG.playSound("page");
        dialogueExpanded = !dialogueExpanded;
        AG.render();
      } else if (k === "l") {
        AG.playSound("page");
        activeModal = activeModal === "backlog" ? null : "backlog";
        AG.render();
      } else if (k === "c") {
        AG.playSound("click");
        if (activeModal !== "phone") s.aurora.unreadPhoneMessages = 0;
        activeModal = activeModal === "phone" ? null : "phone";
        AG.render();
      } else if (k === "f") {
        AG.playSound("click");
        activeModal = activeModal === "status_memories" ? null : "status_memories";
        AG.render();
      } else if (k === "v" && !activeModal) {
        const last = s.sceneFeed && s.sceneFeed[s.sceneFeed.length - 1];
        if (last && last.speech && AG.Audio) {
          if (AG.Audio.toggleSpeak) AG.Audio.toggleSpeak(last.speech, { mode: "aurora" });
          else if (AG.Audio.speakAurora) AG.Audio.speakAurora(last.speech, { force: true });
        }
      } else if (k === "m" && !activeModal) {
        s.settings.bgmEnabled = s.settings.bgmEnabled === false ? true : false;
        AG.applyVisualSettings();
        AG.saveGame("autosave");
        AG.queueToast(s.settings.bgmEnabled ? "Música ligada" : "Música mutada", "info", "info");
        AG.flushToasts();
      }
    }
  });

  // Atualiza botão Voz/Parar e lista assíncrona de vozes PT-BR sem travar a interface
  if (AG.Audio && typeof AG.Audio.onSpeakingChange === "function") {
    AG.Audio.onSpeakingChange((isSpk) => {
      if (typeof document === "undefined") return;
      const btn = document.getElementById("btn-replay-voice");
      if (btn) btn.textContent = isSpk ? "Parar" : "Voz";
    });
  }
  if (AG.Audio && typeof AG.Audio.onVoicesChanged === "function") {
    AG.Audio.onVoicesChanged(() => {
      if (activeModal === "settings") AG.render();
    });
  }

  // Parallax sutil reativo ao mouse no fundo vivo (throttled via requestAnimationFrame)
  if (typeof window !== "undefined" && window.addEventListener && typeof document !== "undefined" && document.documentElement) {
    let parallaxPending = false;
    let lastMx = 0;
    let lastMy = 0;
    window.addEventListener("mousemove", (ev) => {
      const st = (AG.state && AG.state.settings) || {};
      if (st.animatedBg === false || st.bgIntensity === "off") return;
      const w = window.innerWidth || 1280;
      const h = window.innerHeight || 720;
      lastMx = ((ev.clientX / w) - 0.5) * 2;
      lastMy = ((ev.clientY / h) - 0.5) * 2;
      if (parallaxPending) return;
      parallaxPending = true;
      const apply = () => {
        parallaxPending = false;
        if (document.documentElement && document.documentElement.style && document.documentElement.style.setProperty) {
          document.documentElement.style.setProperty("--mx", lastMx.toFixed(3));
          document.documentElement.style.setProperty("--my", lastMy.toFixed(3));
        }
      };
      if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(apply);
      else apply();
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    if (AG.CursorFX && AG.CursorFX.init) AG.CursorFX.init();
    AG.render();
  });
})(window.AuroraGame);
