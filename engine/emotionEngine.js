/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Motor Emocional Vivo, Inversão de Sentimentos & IA Sombria Bidirecional (v8)
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  const EE = {};

  EE.getMoodDef = function (moodKey) {
    return (AG.MOOD_DEFS && AG.MOOD_DEFS[moodKey]) || (AG.MOOD_DEFS && AG.MOOD_DEFS.espontanea) || {
      label: "🎀 Fofa & Leve",
      family: "luminosa",
      desc: "Humor leve."
    };
  };

  EE.getMoodFamily = function (moodKey) {
    return EE.getMoodDef(moodKey || (AG.state && AG.state.aurora && AG.state.aurora.mood)).family || "luminosa";
  };

  EE.getEmotionProfile = function () {
    const s = AG.state;
    const a = s.aurora;
    const perc = (s.player && s.player.skills && s.player.skills.perception) || 12;
    const primDef = EE.getMoodDef(a.mood);
    const underKey = a.undercurrent || "espontanea";
    const underDef = EE.getMoodDef(underKey);
    const stab = a.mentalStability !== undefined ? a.mentalStability : 82;
    const dark = a.auroraDarkness || 5;

    return {
      primaryKey: a.mood,
      primaryDef: primDef,
      family: primDef.family || "luminosa",
      undercurrentKey: underKey,
      undercurrentDef: underDef,
      canSeeUndercurrent: perc >= 16 && underKey !== a.mood,
      stability: stab,
      darkness: dark,
      trauma: a.traumaLevel || 0,
      isDarkAurora: dark >= 40
    };
  };

  // ==========================================================================
  // MOTOR "MESMO BOTÃO, REAÇÃO COMPLETAMENTE DIFERENTE"
  // Modula fala, ação e deltas de qualquer interação conforme o estado vivo dela
  // ==========================================================================
  EE.reactToAction = function (intentType, fallback) {
    const s = AG.state;
    const a = s.aurora;
    const mood = a.mood || "espontanea";
    const fam = EE.getMoodFamily(mood);

    // 1. REAÇÕES VIVAS A CARINHO / ELOGIO / GESTO BOM ('sweet' ou 'gift')
    if (intentType === "sweet" || intentType === "gift") {
      if (mood === "entediada") {
        return {
          action: "*Boceja apoiando o queixo na mão e te olha meio entediada*",
          speech: "Fofinho, vai... mas hoje eu tô morrendo de tédio nesse quarto andar. Faz alguma coisa mais inesperada ou me desafia logo!",
          extraDeltas: { affinity: 4, mood: "enjoada_sarcastica" }
        };
      }
      if (mood === "solta_pos_drink") {
        return {
          action: "*Dá uma risadinha solta com as bochechas rosadas e encosta a testa no seu ombro sem filtro*",
          speech: "Hahaha você é muito fofo quando faz isso!! Sabe de uma coisa? Eu nem devia falar, mas você virou minha pessoa favorita do prédio inteiro!",
          extraDeltas: { affinity: 12, intimacyLevel: 10, vulnerability: 12, composure: -14 }
        };
      }
      if (mood === "chorosa_vulneravel" || mood === "muito_triste" || mood === "ansiosa" || mood === "melancolica") {
        return {
          action: "*Os olhos dela marejam na hora e ela segura forte na sua manga, baixando completamente todas as defesas*",
          speech: "Você não imagina o quanto eu precisava ouvir e sentir esse cuidado hoje... Obrigada por não me deixar afundar sozinha na minha própria cabeça.",
          extraDeltas: { affinity: 16, trust: 16, mentalStability: 14, vulnerability: 16, traumaLevel: -8, mood: "emocionada" }
        };
      }
      if (mood === "paranoica_delirante" || mood === "desconfiada") {
        return {
          action: "*Semicerra os olhos estudando cada microexpressão sua com desconfiança aguda*",
          speech: "Espera... por que essa gentileza repentina toda agora? O que você tá planejando conseguir em troca disso, 402?",
          extraDeltas: { suspicion: 4, composure: -6, influence: 6 }
        };
      }
      if (mood === "corrompida_fria" || mood === "obsessiva_controladora" || mood === "vingativa") {
        return {
          action: "*Abre um sorriso gelado e acaricia seu queixo como quem testa um peão no tabuleiro*",
          speech: "Que graça você tentando me amolecer com doçura depois de tudo que me ensinou... Continua me agradando que eu decido se te recompenso ou se te castigo.",
          extraDeltas: { dominance: 10, auroraDarkness: 4, heat: 8 }
        };
      }
      if (mood === "raivosa" || mood === "rispida_agressiva" || mood === "ignorante_fria") {
        return {
          action: "*Corta seu gesto no ar com o olhar faiscando de raiva*",
          speech: "Não vem tentar passar pano com cara de bonzinho agora que eu tô furiosa! Ou você me encara de frente ou sai da minha frente!",
          extraDeltas: { discomfort: 6, affinity: -4 }
        };
      }
    }

    // 2. REAÇÕES VIVAS A PROVOCAÇÃO / CLIMA QUENTE ('hot')
    if (intentType === "hot") {
      if (mood === "chorosa_vulneravel" || mood === "muito_triste" || mood === "abalada_traumatizada") {
        return {
          action: "*Recua magoada enxugando o rosto com a manga do moletom*",
          speech: "Sério mesmo?! Eu tô mal de verdade aqui e você vem com provocação?! Isso só me faz sentir ainda pior.",
          extraDeltas: { discomfort: 18, affinity: -14, mentalStability: -10, traumaLevel: 8, mood: "decepcionada" }
        };
      }
      if (mood === "solta_pos_drink") {
        return {
          action: "*Ri corada demais e dá um passo pra trás mordendo o lábio*",
          speech: "Eita, calma lá grandão! Eu tô meio solta dos drinks — vamos rir e conversar antes que eu perca toda a noção aqui!",
          extraDeltas: { heat: 10, affinity: 8, composure: -10 }
        };
      }
      if (mood === "entediada" || mood === "impulsiva_maluca") {
        return {
          action: "*Os olhos dela acendem na hora — o tédio evapora e vira eletricidade pura*",
          speech: "AGORA SIM você acordou esse quarto andar!! Era exatamente essa faísca que eu tava precisando pra sair do tédio!",
          extraDeltas: { heat: 18, arousal: 16, mood: "sedutora_ousada" }
        };
      }
      if (mood === "corrompida_fria" || mood === "obsessiva_controladora") {
        return {
          action: "*Em vez de corar, ela segura você pela gola e sustenta um sorriso sombrio e magnético*",
          speech: "Você acha que tá me provocando? Olha bem quem tá com o coração acelerado aqui — eu vou virar esse jogo contra você até você perder o ar.",
          extraDeltas: { heat: 18, dominance: 12, auroraDarkness: 6, arousal: 14 }
        };
      }
      if (mood === "ciumenta" || mood === "invejosa") {
        return {
          action: "*Puxa você pra perto com fogo possessivo nos olhos*",
          speech: "Então prova agora que toda essa provocação é SÓ pra mim — porque eu não divido nada que é meu!",
          extraDeltas: { heat: 20, arousal: 18, jealousy: -15, mood: "excitada_tensa" }
        };
      }
    }

    // 3. REAÇÕES VIVAS A JOGO MENTAL / BLEFE ('outplay')
    if (intentType === "outplay") {
      if (fam === "sombria") {
        return {
          action: "*Inclina a cabeça com um sorriso frio — ela reconheceu a sua tática imediatamente*",
          speech: "Bonita jogada psicológica, 402... pena que eu aprendi a ler seus blefes observando você mesmo. Minha vez de jogar.",
          extraDeltas: { rivalry: 12, auroraDarkness: 6, influence: 6 }
        };
      }
      if (fam === "vulneravel") {
        return {
          action: "*Fica confusa e abalada com o seu jogo frio bem quando estava sem defesa*",
          speech: "Por que você tá fazendo jogo mental comigo logo agora que eu baixei a guarda...? Minha cabeça tá dando nó.",
          extraDeltas: { mentalStability: -12, composure: -18, influence: 12, traumaLevel: 10, mood: "paranoica_delirante" }
        };
      }
    }

    return fallback;
  };

  // ==========================================================================
  // AÇÕES DE MANIPULAÇÃO EMOCIONAL, INVERSÃO DE SENTIMENTOS, CORRUPÇÃO & RESGATE
  // ==========================================================================
  EE.getEmotionalManipulationActions = function () {
    const s = AG.state;
    const a = s.aurora;
    const p = s.player;
    const sk = (p && p.skills) || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
    const mood = a.mood || "espontanea";
    const fam = EE.getMoodFamily(mood);
    const list = [];

    if (!AG.isAuroraHere() || a.activity === "dormindo") return list;

    // 1. MANIPULAR BONS SENTIMENTOS (Calor Calculado / Love-Bombing)
    list.push({
      id: "emo_love_bomb_trap",
      title: "🎭 [Manipular Bons Sentimentos] Encher Ela de Validação & Elogios Calculados (Love-Bombing • 15m)",
      desc: "Eleva a Aurora artificialmente até 'Eufórica' / 'Emocionada' enquanto derruba a Armadura dela para preparar uma virada futura.",
      skillHint: "+18% Influência, -22% Armadura, coloca ela em 'Eufórica' (libera Puxar o Tapete!)",
      tone: "ctrl",
      onRun: function () {
        AG.playSound("heart");
        s.flags.loveBombedAurora = true;
        AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
        const pills = AG.applyDeltas({
          affinity: 12,
          composure: -22,
          influence: 16,
          auroraDarkness: 6,
          charisma: 2,
          personaCold: 3,
          personaRuthless: 2,
          mood: "euforica",
          undercurrent: "carente",
          specialScene: "chamego"
        });
        AG.clearFeed();
        AG.pushFeed({
          type: "aurora",
          action: "*Os olhos dela brilham intensamente e ela ri radiante, absorvendo cada palavra calculada que você disse como se fosse pura verdade*",
          speech: "Nossa!! Ninguém nunca reparou e elogiou tudo isso em mim num dia só! Você me deixou flutuando agora — eu faria qualquer coisa só pra continuar vendo esse seu sorriso!",
          pills
        });
      }
    });

    // 2. INVERSÃO DE BONS SENTIMENTOS -> CHOQUE FRIO ("Puxar o Tapete Emocional")
    if (fam === "luminosa" || fam === "quimica" || s.flags.loveBombedAurora) {
      list.push({
        id: "emo_cold_rug_pull",
        title: "🧊 [Inversão Cruel] Puxar o Tapete Emocional Bem no Pico de Alegria Dela (Alegria → Choque Frio • 15m)",
        desc: "Corta o sorriso dela de repente com frieza cortante para desestabilizar a mente dela, criar obsessão por validação ou corromper o coração dela.",
        skillHint: "Derruba -24% Estabilidade, +20% Espiral Sombria, +16% Influência, muda ela para 'Abalada' ou 'Decepcionada'",
        tone: "risky",
        onRun: function () {
          AG.playSound("warn");
          s.flags.loveBombedAurora = false;
          AG.advanceTime(15, { suppressRandom: true });
          const nextMood = (a.auroraDarkness || 0) >= 30 ? "vingativa" : "abalada_traumatizada";
          const pills = AG.applyDeltas({
            mentalStability: -22,
            auroraDarkness: 20,
            traumaLevel: 16,
            composure: -24,
            influence: 16,
            affinity: -16,
            discomfort: 18,
            personaRuthless: 5,
            mood: nextMood,
            undercurrent: "paranoica_delirante"
          });
          AG.addMemory("puxou_tapete_emocional", "Elevou o coração dela lá no alto só para puxar o tapete com pura frieza logo depois.", "ruim", true);
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*O sorriso radiante morre no rosto dela em um segundo; ela pisca em choque absoluto dando um passo pra trás com a voz trêmula*",
            speech: "...Você tava fingindo esse tempo todo só pra me ver cair desse jeito? Que tipo de pessoa brinca com a cabeça de alguém assim?!",
            pills
          });
        }
      });
    }

    // 3. INVERSÃO EMOCIONAL: RAIVA / CIÚME / CONFLITO -> QUÍMICA ARDENTE!
    if (fam === "conflito") {
      list.push({
        id: "emo_invert_anger_to_heat",
        title: "🔥 [Inversão Emocional] Virar a Raiva / Ciúme Dela Direto em Química Ardente! (15m)",
        desc: "Usa calma absoluta e intensidade no meio da discussão para transformar a hostilidade dela em tensão elétrica.",
        skillHint: "Requer 🗣️ Lábia >= 15 para inverter Conflito → 'Fervendo de Vontade' (+22 Clima, -18 Atrito)",
        tone: "hot",
        onRun: function () {
          AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
          AG.clearFeed();
          if (sk.charisma >= 15) {
            AG.playSound("hot");
            const pills = AG.applyDeltas({
              heat: 22,
              arousal: 20,
              discomfort: -18,
              composure: -18,
              influence: 14,
              charisma: 2,
              personaBold: 4,
              mood: "excitada_tensa",
              undercurrent: "magnetizada",
              specialScene: "paredeCorredor"
            });
            AG.pushFeed({
              type: "aurora",
              action: "*Ela ia gritar de novo, mas trava sem ar quando você não recua um centímetro e devolve um olhar intenso cheio de calma*",
              speech: "Que ódio... eu tava pronta pra acabar com você e num segundo você me deixou arrepiada e sem foco nenhum!! Como você consegue virar uma briga nisso?!",
              pills
            });
          } else {
            AG.playSound("warn");
            const pills = AG.applyDeltas({ discomfort: 16, mentalStability: -8, mood: "rispida_agressiva" });
            AG.pushFeed({
              type: "aurora",
              action: "*Empurra seu ombro ainda mais irritada com a tentativa frustrada*",
              speech: "Não tenta fazer cena de filme comigo quando eu tô furiosa! Isso só me irrita o dobro!",
              pills
            });
          }
        }
      });
    }

    // 4. INVERSÃO EMOCIONAL: TÉDIO / SARCASMO -> CAOS IMPREVISÍVEL!
    if (mood === "entediada" || mood === "enjoada_sarcastica") {
      list.push({
        id: "emo_invert_boredom_chaos",
        title: "🤪 [Inversão Emocional] Virar o Tédio / Ironia Dela em Caos Sem Freio! (15m)",
        desc: "Propõe uma loucura espontânea ou desafio absurdo que acende a faísca caótica dela na hora.",
        tone: "hot",
        onRun: function () {
          AG.playSound("hot");
          AG.advanceTime(15, { suppressRandom: true });
          const pills = AG.applyDeltas({
            heat: 14,
            affinity: 12,
            rivalry: 12,
            auroraEnergy: 15,
            personaBold: 3,
            mood: "impulsiva_maluca",
            undercurrent: "euforica"
          });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Dá um pulo do sofá abrindo um sorriso maluco de pura empolgação*",
            speech: "SÉRIO QUE VOCÊ TOPA ESSA LOUCURA?! AÍ SIM!! Esquece o tédio — agora o 4º andar vai ficar pequeno pra nós dois!",
            pills
          });
        }
      });
    }

    // 5. SEMEAR MAUS SENTIMENTOS (Plantar Inveja / Ansiedade / Insegurança)
    list.push({
      id: "emo_provoke_negative_shift",
      title: "🐍 [Manipular Maus Sentimentos] Plantar Inveja, Insegurança ou Ansiedade Sutilmente (15m)",
      desc: "Solta comentários afiados sobre prazos, rivais ou comparações para derrubar a estabilidade e deixá-la vulnerável ou invejosa.",
      skillHint: "+14% Espiral Sombria, -16% Estabilidade, +18% Ciúme, empurra para 'Ansiosa' ou 'Invejosa'",
      tone: "risky",
      onRun: function () {
        AG.playSound("warn");
        AG.advanceTime(15, { suppressRandom: true });
        const nextM = (s.totalActionsTaken % 2 === 0) ? "invejosa" : "ansiosa";
        const pills = AG.applyDeltas({
          mentalStability: -16,
          auroraDarkness: 14,
          jealousy: 18,
          composure: -16,
          influence: 10,
          traumaLevel: 8,
          personaRuthless: 4,
          mood: nextM,
          undercurrent: "invejosa"
        });
        AG.clearFeed();
        AG.pushFeed({
          type: "aurora",
          action: "*O sorriso dela murcha enquanto sua frase venenosa fica girando sem parar na cabeça dela*",
          speech: nextM === "invejosa"
            ? "Ah, é? Então essa outra pessoa é tão incrível assim? Pois espera pra ver do que eu sou capaz quando me provocam!"
            : "Por que você teve que me lembrar de tudo o que pode dar errado agora?! Meu peito até apertou só de ouvir isso...",
          pills
        });
      }
    });

    // 6. ALIMENTAR A ESPIRAL SOMBRIA DELA (Corromper / Incentivar o Lado Antagonista!)
    if (fam === "sombria" || fam === "conflito" || (a.auroraDarkness || 0) >= 20) {
      list.push({
        id: "emo_feed_dark_paranoia",
        title: "🖤 [Corromper & Dar Bola] Incentivar o Lado Sombrio, Frio e Manipulador da Aurora (+22% Espiral Sombria)",
        desc: "Valida a paranoia, o rancor e a sede de controle dela — transformando a Aurora na verdadeira vilã psicológica do 4º andar!",
        skillHint: "Acelera a IA Sombria Autônoma da Aurora (>= 40% Espiral Sombria ela começa a manipular VOCÊ!)",
        tone: "risky",
        onRun: function () {
          AG.playSound("warn");
          AG.advanceTime(20, { suppressRandom: true, keepSpecialScene: true });
          const nextDarkMood = (a.auroraDarkness || 0) >= 45 ? "obsessiva_controladora" : "corrompida_fria";
          const pills = AG.applyDeltas({
            auroraDarkness: 22,
            dominance: 14,
            heat: 12,
            mentalStability: -12,
            rivalry: 12,
            personaRuthless: 4,
            mood: nextDarkMood,
            undercurrent: "vingativa",
            specialScene: "controle"
          });
          AG.addMemory("alimentou_lado_sombrio", "Incentivou o lado frio, desconfiado e manipulador da Aurora — despertando a versão sombria dela.", "controle", true);
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Um brilho frio e fascinante acende no olhar dela; ela sorri devagar inclinando a cabeça pra você*",
            speech: "Sabe que você abriu meus olhos, 402? Ficar sendo a baixinha boazinha não leva a nada... Se o jogo nesse prédio é sobre quem manipula melhor, pode apostar que eu vou virar a dona desse tabuleiro — começando por você.",
            pills
          });
        }
      });
    }

    // 7. RESGATE & CURA EMOCIONAL GENUÍNA
    if ((a.mentalStability !== undefined && a.mentalStability <= 68) || fam === "vulneravel" || fam === "sombria" || (a.traumaLevel || 0) >= 20) {
      list.push({
        id: "emo_heal_emotional_wound",
        title: "🌅 [Resgate Genuíno] Acolher Sem Jogos e Curar a Estabilidade Emocional Dela (25m)",
        desc: "Abaixa todas as suas próprias máscaras e oferece apoio real e honesto para puxá-la de volta da dor ou da espiral sombria.",
        skillHint: "+24% Estabilidade, -18% Espiral Sombria, -16% Feridas Emocionais, +18 Confiança",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(25, { suppressRandom: true, keepSpecialScene: true });
          const pills = AG.applyDeltas({
            mentalStability: 24,
            auroraDarkness: -18,
            traumaLevel: -16,
            affinity: 18,
            trust: 18,
            discomfort: -18,
            vulnerability: 16,
            personaWarm: 5,
            mood: "emocionada",
            undercurrent: "entregue",
            specialScene: "chamego"
          });
          AG.addMemory("resgate_emocional_sincero", "Quando ela estava abalada ou presa na espiral sombria, você largou todos os jogos e a acolheu de verdade.", "bom", true);
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*A tensão rígida dos ombros dela cede de uma vez; ela encosta o rosto no seu peito respirando fundo como quem volta à superfície*",
            speech: "Eu tava me perdendo inteira dentro dessa cabeça maluca... Obrigada por me puxar de volta e me lembrar quem eu sou de verdade.",
            pills
          });
        }
      });
    }

    // 8. NOITE DE DRINKS / VINHO NO SOFÁ (Ativa estado solta_pos_drink!)
    if ((s.currentLocation === "ape_404" || s.currentLocation === "ape_402") && (s.hour >= 19 || s.hour <= 3) && (a.affinity >= 12 || a.heat >= 15) && a.discomfort < 45) {
      list.push({
        id: "emo_trigger_drinks_night",
        title: "🍾 [Clima de Festa] Abrir Vinho / Drinks no Sofá com a Aurora (R$ 24 • Estado 'Solta & Risonha')",
        desc: "Noite leve com música e taças no sofá: ela fica risonha, solta e sem filtro para confissões hilárias e profundas!",
        tone: "hot",
        disabled: p.money < 24,
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(30, { suppressRandom: true, keepSpecialScene: true });
          AG.applyDeltas({ money: -24, mood: "solta_pos_drink", undercurrent: "carente", composure: -22 });
          s.activeRandomEvent = {
            id: "scene_drinks_night_404",
            title: "🍾 NOITE DE DRINKS: Aurora Totalmente Solta & Sem Filtro!",
            desc: "Depois de duas taças e música baixa, a Aurora está com as bochechas rosadas, rindo à toa no sofá e falando tudo o que normalmente esconde: 'Sabe, 402... eu fico bancando a braba de 1,49m mas eu passo metade da semana pensando no que você tá fazendo do outro lado da parede!' Como você conduz a noite?",
            choices: [
              { id: "drink_care_laugh", tone: "sweet", label: "💧 [Cuidar & Rir Juntos] Trazer água, dar risada das confissões e curtir a noite leve (+22 Afinidade • +20 Confiança • +Estabilidade)" },
              { id: "drink_deep_honest", tone: "hot", label: "💗 [Confissões Mútuas] Abrir seu próprio coração também e aproveitar a sintonia (+20 Intimidade • +20 Abertura • +16 Clima)" },
              { id: "drink_fish_secret", tone: "ctrl", label: "🗂️ [Oportunista] Aproveitar a língua solta dela pra pescar um Segredo real pro Dossiê (+Segredo • +Espiral Sombria)" }
            ]
          };
        }
      });
    }

    return list;
  };

  // ==========================================================================
  // IA SOMBRIA AUTÔNOMA DA AURORA (QUANDO ELA VIRA A MANIPULADORA CONTRA VOCÊ!)
  // ==========================================================================
  EE.tryTriggerDarkAuroraAction = function () {
    const s = AG.state;
    const a = s.aurora;
    const dark = a.auroraDarkness || 5;
    const stab = a.mentalStability !== undefined ? a.mentalStability : 82;

    if (!AG.isAuroraHere() || a.activity === "dormindo") return false;
    if (dark < 40 && !(stab <= 38 && (a.rivalry >= 45 || a.dominance >= 45))) return false;
    if ((s.totalActionsTaken - (s.lastRandomEventTurn || 0)) < 3) return false;
    if (Math.random() > 0.42) return false;

    s.lastRandomEventTurn = s.totalActionsTaken;
    const pool = ["dark_aurora_gaslight", "dark_aurora_sabotage_work", "dark_aurora_social_trap", "dark_aurora_mind_lock"];
    const picked = pool[(s.totalActionsTaken + s.day) % pool.length];

    if (picked === "dark_aurora_gaslight") {
      s.activeRandomEvent = {
        id: "dark_aurora_gaslight",
        title: "🖤 AÇÃO DA AURORA SOMBRIA: Gaslighting Reverso do 404!",
        desc: "A Aurora olha nos seus olhos com frieza cirúrgica e um sorriso gelado: 'Você jurou ontem à noite que ia me ajudar com o projeto hoje — não lembra? Nossa, você anda tão esquecido e descontrolado ultimamente... Ainda bem que eu tô aqui pra organizar sua cabeça, né?' (Ela está manipulando a sua memória de propósito!)",
        choices: [
          { id: "dg_expose_perception", tone: "ctrl", label: "👁️ [Contornar • Percepção 16+] Expor a mentira na hora e mostrar que você enxerga o gaslighting dela" },
          { id: "dg_fuel_dark_game", tone: "risky", label: "🖤 [Dar Ainda Mais Bola] Sorrir aplaudindo a manipulação dela e entrar no thriller psicológico mútuo!" },
          { id: "dg_yield_drain", tone: "ctrl", label: "👑 [Ceder ao Controle Dela] Ficar confuso e deixar ela assumir o comando (-18 Calma • +20 Controle Dela)" },
          { id: "dg_break_cycle", tone: "sweet", label: "🌅 [Quebrar o Ciclo] Segurar a mão dela firme e dizer: 'Para com essa máscara, você não precisa jogar assim comigo'" }
        ]
      };
    } else if (picked === "dark_aurora_sabotage_work") {
      s.activeRandomEvent = {
        id: "dark_aurora_sabotage_work",
        title: "💻🖤 AÇÃO DA AURORA SOMBRIA: Ela Invadiu & Sabotou Sua Rotina Sem Permissão!",
        desc: "Você descobre que a Aurora entrou no seu 402 enquanto você tomava banho, desligou seu alarme e pausou o envio do seu freela! Quando você olha pra ela, ela sorri sem remorso nenhum: 'Você tava dando atenção demais pro computador e de menos pra mim. Resolvi esse detalhe por conta própria.'",
        choices: [
          { id: "ds_counter_tech", tone: "ctrl", label: "💻 [Contornar • Código 18+] Recuperar tudo em 2 minutos e virar o flagrante em +1 Segredo no Dossiê!" },
          { id: "ds_embrace_chaos", tone: "hot", label: "🔥🖤 [Alimentar a Espiral] Rir da audácia insana dela e dizer que agora você vai cobrar o prejuízo em dobro!" },
          { id: "ds_furious_clash", tone: "risky", label: "💢 [Confronto Real] Exigir respeito imediato e expulsar ela do seu espaço (+Atrito • +Ferida)" }
        ]
      };
    } else if (picked === "dark_aurora_social_trap") {
      s.activeRandomEvent = {
        id: "dark_aurora_social_trap",
        title: "🗞️🖤 AÇÃO DA AURORA SOMBRIA: Armadilha Social & Pressão no Grupo do Prédio!",
        desc: "Seu celular apita: a Aurora soltou uma mensagem super ambígua no grupo do condomínio fazendo todo mundo achar que você está devendo favores pesados a ela — e ela te encara no corredor sorrindo: 'Viu como eu também sei usar reputação como arma, 402? O que você vai fazer agora?'",
        choices: [
          { id: "dst_public_outbluff", tone: "ctrl", label: "🗣️ [Contornar • Lábia 18+] Responder no grupo com humor impecável virando o jogo a seu favor!" },
          { id: "dst_join_dark_pact", tone: "risky", label: "♟️🖤 [Dar Ainda Mais Bola] Confirmar a história dela no grupo e selar a aliança sombria entre 402 e 404!" },
          { id: "dst_honest_talk", tone: "sweet", label: "💗 [Desarmar] Ignorar o grupo e perguntar olhando nos olhos o que está machucando ela de verdade" }
        ]
      };
    } else {
      s.activeRandomEvent = {
        id: "dark_aurora_mind_lock",
        title: "👑🖤 AÇÃO DA AURORA SOMBRIA: A Armadilha Mental da Rainha do 404!",
        desc: "Com o olhar totalmente frio e obsessivo, a Aurora fecha a porta atrás de vocês e encosta na fechadura: 'Você achou que podia moldar a minha cabeça e sair ileso? Agora quem conhece cada fraqueza sua sou eu. Escolhe: entra no meu jogo de vez ou tenta quebrar o meu controle.'",
        choices: [
          { id: "dml_checkmate", tone: "ctrl", label: "♟️ [Xeque-Mate • Influência 50+] Mostrar que você previu até a virada sombria dela (+22 Influência • -25 Armadura)" },
          { id: "dml_surrender_queen", tone: "risky", label: "👑🖤 [Entregar o Trono] Alimentar o lado vilã dela e aceitar que ela domina o seu destino (+25 Controle • +20 Espiral Sombria)" },
          { id: "dml_rescue_heart", tone: "sweet", label: "🌅 [Resgatar do Abismo] Recusar a guerra mental e abraçar ela até a armadura sombria desmoronar (-25 Espiral Sombria • +25 Estabilidade)" }
        ]
      };
    }
    return true;
  };

  // ==========================================================================
  // CRISES EMOCIONAIS SITUACIONAIS (ANSIEDADE 3H, TÉDIO MORTAL, EXPLOSÃO)
  // ==========================================================================
  EE.tryTriggerEmotionalCrisis = function () {
    const s = AG.state;
    const a = s.aurora;
    if (!AG.isAuroraHere() || a.activity === "dormindo") return false;
    if ((s.totalActionsTaken - (s.lastRandomEventTurn || 0)) < 4) return false;
    if (Math.random() > 0.22) return false;

    // 1. Crise de Ansiedade de Madrugada
    if ((s.hour >= 0 && s.hour <= 3) && (a.mentalStability <= 65 || a.mood === "ansiosa" || a.mood === "melancolica")) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.activeRandomEvent = {
        id: "crisis_aurora_anxiety_3am",
        title: "🌀 CRISE EMOCIONAL: Aurora Com Crise de Ansiedade às 3h da Manhã",
        desc: "A Aurora está sentada no chão encostada na parede, respirando rápido e abraçando os joelhos com os olhos marejados: 'Desculpa aparecer assim... minha cabeça não para de girar pensando em contas, futuro e em ficar sozinha aqui.'",
        choices: [
          { id: "anx_genuine_care", tone: "sweet", label: "💗 [Acolher de Verdade] Sentar no chão com ela, guiar a respiração dela e ficar ao lado dela (+26 Estabilidade • +20 Afinidade • +20 Intimidade)" },
          { id: "anx_manipulate_bond", tone: "ctrl", label: "🕸️ [Manipular Vulnerabilidade] Acalmar ela enquanto planta a ideia de que só você a entende (+18 Influência • +12 Espiral Sombria • -18 Armadura)" },
          { id: "anx_cold_dismiss", tone: "risky", label: "🧊 [Frieza Dura] Dizer que ela precisa engolir o choro e endurecer (+20 Ferida • +18 Espiral Sombria • -20 Estabilidade)" }
        ]
      };
      return true;
    }

    // 2. Explosão Emocional / DR Pesada
    if (a.discomfort >= 48 || a.mood === "raivosa" || a.mood === "rispida_agressiva") {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.activeRandomEvent = {
        id: "crisis_aurora_explosive_fight",
        title: "💢 EXPLOSÃO EMOCIONAL: A Aurora Estourou Sem Filtro!",
        desc: "A Aurora bate a mão na mesa e te encara com a voz embargada de fúria e mágoa: 'CHEGA! Eu cansei de engolir suas atitudes, seus joguinhos e esse clima insuportável! Fala na minha cara agora o que você quer de mim!'",
        choices: [
          { id: "fight_sincere_apology", tone: "sweet", label: "🙏 [Baixar a Guarda] Assumir seus erros com sinceridade real e pedir perdão (-28 Atrito • +20 Estabilidade • +16 Confiança)" },
          { id: "fight_invert_passion", tone: "hot", label: "🔥 [Inverter em Paixão • Lábia 16+] Segurar o olhar dela firme e transformar a explosão em tensão elétrica (+22 Clima • -18 Atrito)" },
          { id: "fight_cruel_double", tone: "risky", label: "🤬 [Escalar a Guerra] Devolver no mesmo nível com frieza cortante (+24 Atrito • +22 Ferida • +20 Espiral Sombria)" }
        ]
      };
      return true;
    }

    // 3. Tarde de Tédio Mortal
    if (a.mood === "entediada" || (s.hour >= 14 && s.hour <= 18 && a.discomfort < 30)) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.activeRandomEvent = {
        id: "crisis_aurora_boredom_snap",
        title: "🥱 MOMENTO VIVO: Aurora Morrendo de Tédio no 4º Andar!",
        desc: "A Aurora se joga de ponta-cabeça no sofá bufando dramaticamente: 'Socorro, 402!! Esse prédio tá parado demais, eu vou enlouquecer de tédio se nada emocionante acontecer nos próximos cinco minutos!'",
        choices: [
          { id: "bore_wild_dare", tone: "hot", label: "🤪 [Caos Total] Inventar uma aposta maluca e imprevisível na hora (+16 Clima • +14 Rivalidade • 'Caótica Sem Freio')" },
          { id: "bore_sweet_date", tone: "sweet", label: "🌸 [Passeio Leve] Convidar ela pra tomar café gelado e andar sem pressa (+18 Afinidade • 'Muito Feliz')" },
          { id: "bore_tease_lazy", tone: "ctrl", label: "😏 [Provocar] Zombar do drama dela e desafiar ela a te entreter (+12 Influência • 'Enjoada & Sarcástica')" }
        ]
      };
      return true;
    }

    return false;
  };

  // ==========================================================================
  // HANDLER CENTRAL PARA TODAS AS ESCOLHAS EMOCIONAIS, DRINKS & IA SOMBRIA
  // ==========================================================================
  EE.handleEmotionEventChoice = function (choiceId) {
    const s = AG.state;
    const a = s.aurora;
    const sk = (s.player && s.player.skills) || { charisma: 12, stealth: 12, tech: 15, perception: 12 };

    // --- NOITE DE DRINKS ---
    if (choiceId === "drink_care_laugh") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 22, trust: 20, mentalStability: 16, intimacyLevel: 14, personaWarm: 4, mood: "muito_feliz", specialScene: "chamego" });
      AG.pushFeed({ type: "aurora", action: "*Toma a água rindo boba e encosta o rosto no seu braço*", speech: "Hahaha você cuidou direitinho de mim e ainda riu das minhas bobeiras... melhor noite de drinks da vida!", pills });
      return true;
    }
    if (choiceId === "drink_deep_honest") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ intimacyLevel: 20, vulnerability: 20, heat: 16, affinity: 16, mood: "emocionada", specialScene: "noite404" });
      AG.pushFeed({ type: "aurora", action: "*Segura suas duas mãos olhando fundo nos seus olhos com o rosto corado e sincero*", speech: "Ouvir você se abrir assim comigo também... acho que eu nunca me senti tão conectada com alguém na minha vida.", pills });
      return true;
    }
    if (choiceId === "drink_fish_secret") {
      AG.playSound("click");
      const locked = s.secretsDossier && Object.values(s.secretsDossier).find((x) => x.state === "locked");
      if (locked) AG.unlockSecret(locked.id, `🍾 NOITE DE DRINKS: Sem filtro, ela deixou escapar '${locked.name}'!`);
      const pills = AG.applyDeltas({ influence: 14, auroraDarkness: 10, personaRuthless: 3, mood: "solta_pos_drink" });
      AG.pushFeed({ type: "narrative", text: "🍾 Você manteve a cabeça fria enquanto ela falava sem filtro e guardou uma informação preciosa no seu Dossiê de Segredos!", pills });
      return true;
    }

    // --- IA SOMBRIA AUTÔNOMA DA AURORA ---
    if (choiceId === "dg_expose_perception") {
      if (sk.perception >= 16) {
        AG.playSound("click");
        const pills = AG.applyDeltas({ influence: 20, composure: -22, dominance: -14, perception: 3, mood: "paranoica_delirante" });
        AG.pushFeed({ type: "aurora", action: "*O sorriso frio trava no rosto dela quando você desmonta cada detalhe da mentira*", speech: "Como você percebeu tão rápido que eu inventei aquilo?! Impossível dobrar a sua mente...", pills });
      } else {
        AG.playSound("warn");
        const pills = AG.applyDeltas({ calm: -16, dominance: 16, mood: "obsessiva_controladora" });
        AG.pushFeed({ type: "aurora", action: "*Sorri satisfeita vendo sua dúvida*", speech: "Viu? Você nem tem certeza da própria memória sem mim pra te lembrar.", pills });
      }
      return true;
    }
    if (choiceId === "dg_fuel_dark_game") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ auroraDarkness: 18, heat: 18, rivalry: 16, influence: 12, personaRuthless: 4, mood: "corrompida_fria", specialScene: "controle" });
      AG.pushFeed({ type: "aurora", action: "*Dá uma risada perigosa e cola o corpo no seu com os olhos brilhando de adrenalina*", speech: "Você realmente gostou de me ver jogar sujo, né?! Dois manipuladores no mesmo andar... isso vai ser perigosamente viciante.", pills });
      return true;
    }
    if (choiceId === "dg_yield_drain") {
      AG.playSound("warn");
      const pills = AG.applyDeltas({ calm: -18, dominance: 20, auroraDarkness: 14, mood: "obsessiva_controladora", specialScene: "controle" });
      AG.pushFeed({ type: "aurora", action: "*Apoia o dedo no seu queixo com domínio sombrio absoluto*", speech: "Bom garoto. Deixa que eu penso por você de agora em diante.", pills });
      return true;
    }
    if (choiceId === "dg_break_cycle") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ auroraDarkness: -20, mentalStability: 20, trust: 16, affinity: 14, mood: "chorosa_vulneravel" });
      AG.pushFeed({ type: "aurora", action: "*A máscara fria racha na hora e os olhos dela ficam marejados*", speech: "...Eu só achei que se eu não te dominasse primeiro, você ia acabar me machucando de novo...", pills });
      return true;
    }

    if (choiceId === "ds_counter_tech") {
      if (sk.tech >= 18) {
        AG.playSound("click");
        const locked = s.secretsDossier && Object.values(s.secretsDossier).find((x) => x.state === "locked");
        if (locked) AG.unlockSecret(locked.id);
        const pills = AG.applyDeltas({ influence: 20, tech: 3, composure: -20, dominance: -14, mood: "vingativa" });
        AG.pushFeed({ type: "aurora", action: "*Fica pasma vendo você reverter a sabotagem em dois minutos com um sorriso frio*", speech: "Você tinha backup automático e ainda usou minha invasão contra mim?! Que ódio genial!!", pills });
      } else {
        AG.playSound("warn");
        const pills = AG.applyDeltas({ money: -25, calm: -14, dominance: 16, mood: "corrompida_fria" });
        AG.pushFeed({ type: "aurora", action: "*Sorri vitoriosa cruzando os braços*", speech: "Atrasou seu freela, né? Da próxima vez me dá atenção antes de eu precisar intervir.", pills });
      }
      return true;
    }
    if (choiceId === "ds_embrace_chaos") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ auroraDarkness: 18, heat: 20, rivalry: 18, arousal: 16, mood: "impulsiva_maluca", specialScene: "paredeCorredor" });
      AG.pushFeed({ type: "aurora", action: "*Abre um sorriso elétrico segurando sua camisa*", speech: "Amei que você não surtou — agora sim eu tenho um parceiro à altura da minha loucura!", pills });
      return true;
    }
    if (choiceId === "ds_furious_clash") {
      AG.playSound("warn");
      const pills = AG.applyDeltas({ discomfort: 22, traumaLevel: 14, affinity: -16, mood: "raivosa" });
      AG.pushFeed({ type: "aurora", action: "*Bate a porta furiosa*", speech: "Você começou esse jogo e agora reclama quando eu jogo de volta?!", pills });
      return true;
    }

    if (choiceId === "dst_public_outbluff") {
      if (sk.charisma >= 18) {
        AG.playSound("hot");
        const pills = AG.applyDeltas({ influence: 22, rivalry: 12, dominance: -16, charisma: 3, mood: "corada_sensivel" });
        AG.pushFeed({ type: "aurora", action: "*Lê sua resposta genial no grupo do prédio e fica vermelha de raiva e admiração*", speech: "VOCÊ VIROU O PRÉDIO INTEIRO CONTRA A MINHA ARMADILHA EM UMA MENSAGEM?! Não acredito!", pills });
      } else {
        AG.playSound("warn");
        const pills = AG.applyDeltas({ calm: -12, dominance: 14, mood: "corrompida_fria" });
        AG.pushFeed({ type: "aurora", action: "*Sorri olhando as reações no celular*", speech: "Ponto pro 404 no grupo do prédio, vizinho.", pills });
      }
      return true;
    }
    if (choiceId === "dst_join_dark_pact") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ auroraDarkness: 20, influence: 14, heat: 16, rivalry: 10, mood: "obsessiva_controladora", specialScene: "controle" });
      AG.pushFeed({ type: "aurora", action: "*Te encara fascinada quando você confirma a história dela dobrando a aposta*", speech: "Nós dois juntos somos um perigo real pra esse prédio inteiro...", pills });
      return true;
    }
    if (choiceId === "dst_honest_talk") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ auroraDarkness: -18, mentalStability: 18, affinity: 14, trust: 16, mood: "chateada" });
      AG.pushFeed({ type: "aurora", action: "*Apaga a mensagem do grupo cabisbaixa*", speech: "Desculpa... eu só queria testar se você ainda se importava comigo de verdade.", pills });
      return true;
    }

    if (choiceId === "dml_checkmate") {
      if ((a.influence || 0) >= 50 || sk.charisma >= 20) {
        AG.playSound("hot");
        const pills = AG.applyDeltas({ influence: 22, composure: -25, dominance: -20, heat: 16, mood: "magnetizada", specialScene: "paredeCorredor" });
        AG.pushFeed({ type: "aurora", action: "*Prende a respiração completamente desarmada quando percebe que você já estava dois passos à frente*", speech: "Você previu até a minha virada sombria... Você realmente é o único capaz de me dar xeque-mate.", pills });
      } else {
        AG.playSound("warn");
        const pills = AG.applyDeltas({ dominance: 18, calm: -14, mood: "obsessiva_controladora" });
        AG.pushFeed({ type: "aurora", action: "*Ri baixinho encostada na porta*", speech: "Ainda falta muito pra me dar xeque-mate, 402.", pills });
      }
      return true;
    }
    if (choiceId === "dml_surrender_queen") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ dominance: 25, auroraDarkness: 20, heat: 16, mood: "obsessiva_controladora", specialScene: "controle" });
      AG.pushFeed({ type: "aurora", action: "*Sorri com poder absoluto puxando você pela gola*", speech: "Finalmente entendeu o seu lugar. A Rainha Sombria do 404 aceita a sua rendição.", pills });
      return true;
    }
    if (choiceId === "dml_rescue_heart") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ auroraDarkness: -26, mentalStability: 26, traumaLevel: -20, affinity: 22, trust: 22, mood: "emocionada", specialScene: "chamego" });
      AG.pushFeed({ type: "aurora", action: "*Fica imóvel no seu abraço por três segundos antes de desabar segurando suas costas*", speech: "Eu tava com tanto medo de perder você que tentei virar um monstro... obrigada por não desistir de mim.", pills });
      return true;
    }

    // --- CRISES EMOCIONAIS (ANSIEDADE, EXPLOSÃO, TÉDIO) ---
    if (choiceId === "anx_genuine_care") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ mentalStability: 26, affinity: 20, intimacyLevel: 20, trust: 18, vulnerability: 20, traumaLevel: -12, mood: "emocionada", specialScene: "chamego" });
      AG.pushFeed({ type: "aurora", action: "*A respiração dela desacelera no ritmo da sua mão nas costas dela*", speech: "Você tem noção de que salvou minha madrugada inteira só sentando aqui no chão comigo? Obrigada...", pills });
      return true;
    }
    if (choiceId === "anx_manipulate_bond") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ influence: 18, auroraDarkness: 12, composure: -18, mentalStability: -8, personaCold: 4, mood: "carente" });
      AG.pushFeed({ type: "aurora", action: "*Agarra sua camisa ainda frágil, absorvendo cada palavra calculada*", speech: "Você tem razão... parece que lá fora ninguém me entende como você.", pills });
      return true;
    }
    if (choiceId === "anx_cold_dismiss") {
      AG.playSound("warn");
      const pills = AG.applyDeltas({ traumaLevel: 20, auroraDarkness: 18, mentalStability: -20, affinity: -18, discomfort: 20, personaRuthless: 5, mood: "abalada_traumatizada" });
      AG.pushFeed({ type: "aurora", action: "*Enxuga as lágrimas bruscamente e se levanta com o olhar vazio e endurecido*", speech: "Tem razão. Nunca mais vou cometer o erro de mostrar fraqueza na sua frente.", pills });
      return true;
    }

    if (choiceId === "fight_sincere_apology") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ discomfort: -28, mentalStability: 20, trust: 16, affinity: 14, traumaLevel: -10, mood: "chateada" });
      AG.pushFeed({ type: "aurora", action: "*Solta o ar devagar, a fúria cedendo para alívio genuíno*", speech: "...Era só isso que eu precisava ouvir: sinceridade de verdade. Vamos baixar as armas.", pills });
      return true;
    }
    if (choiceId === "fight_invert_passion") {
      if (sk.charisma >= 16) {
        AG.playSound("hot");
        const pills = AG.applyDeltas({ heat: 22, arousal: 18, discomfort: -18, influence: 14, mood: "excitada_tensa", specialScene: "paredeCorredor" });
        AG.pushFeed({ type: "aurora", action: "*A raiva derrete em tensão elétrica quando você a encara sem piscar*", speech: "Você não presta... eu venho brigar feio e você consegue fazer meu coração disparar de outro jeito!", pills });
      } else {
        AG.playSound("warn");
        const pills = AG.applyDeltas({ discomfort: 16, mood: "raivosa" });
        AG.pushFeed({ type: "aurora", action: "*Recua ainda mais brava*", speech: "Não tenta me seduzir pra fugir da conversa!", pills });
      }
      return true;
    }
    if (choiceId === "fight_cruel_double") {
      AG.playSound("warn");
      const pills = AG.applyDeltas({ discomfort: 24, traumaLevel: 22, auroraDarkness: 20, mentalStability: -18, affinity: -20, mood: "ignorante_fria" });
      AG.pushFeed({ type: "aurora", action: "*Os olhos dela viram puro gelo cortante*", speech: "Anotado. De hoje em diante você não conhece mais o meu lado doce — só o meu pior.", pills });
      return true;
    }

    if (choiceId === "bore_wild_dare") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 16, rivalry: 14, auroraEnergy: 16, mood: "impulsiva_maluca" });
      AG.pushFeed({ type: "aurora", action: "*Pula animadíssima batendo palmas*", speech: "FECHADO!! Isso sim é ideia boa — partiu transformar o 4º andar num caos divertido!", pills });
      return true;
    }
    if (choiceId === "bore_sweet_date") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 18, intimacyLevel: 12, mentalStability: 12, mood: "muito_feliz" });
      AG.pushFeed({ type: "aurora", action: "*Pega o tênis correndo com um sorriso radiante*", speech: "Siiim!! Você sempre salva meus dias parados!", pills });
      return true;
    }
    if (choiceId === "bore_tease_lazy") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ influence: 12, rivalry: 10, mood: "enjoada_sarcastica" });
      AG.pushFeed({ type: "aurora", action: "*Revira os olhos sorrindo de canto*", speech: "Olha a folga desse vizinho... deixa comigo que eu vou inventar algo que vai te tirar da zona de conforto!", pills });
      return true;
    }

    return false;
  };

  AG.EmotionEngine = EE;
})(window.AuroraGame);
