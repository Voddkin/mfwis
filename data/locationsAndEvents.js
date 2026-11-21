/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Locais, Situações Contextuais da Aurora (Dormindo, Cozinha, Móvel, Uniforme),
   Ações Diretas/Indiretas com Consequências Futuras & 4 Minigames Específicos
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  AG.LOCATIONS = {
    ape_402: {
      id: "ape_402",
      name: "🏠 Seu Apartamento (402)",
      shortName: "Seu Apê 402",
      desc: "Seu espaço no 4º andar. A parede fina divide o quarto com o 404.",
      travelMins: 4
    },
    corredor_4andar: {
      id: "corredor_4andar",
      name: "🚪 Corredor & Lavanderia (4º Andar)",
      shortName: "Corredor 4º Andar",
      desc: "A caixa alta de cabos na parede, as máquinas de lavar no fundo e a porta do 404.",
      travelMins: 3
    },
    mercadinho_24h: {
      id: "mercadinho_24h",
      name: "🏪 Mercadinho 24h",
      shortName: "Mercadinho 24h",
      desc: "Aberto a noite inteira na esquina. Cafés gelados, energéticos, doces e lanches.",
      travelMins: 12
    },
    cafe_sakura: {
      id: "cafe_sakura",
      name: "🥐 Café & Estúdio Sakura",
      shortName: "Café Sakura",
      desc: "Onde a Aurora trabalha de uniforme durante a tarde (12h às 17h).",
      travelMins: 10
    },
    praca_cerejeiras: {
      id: "praca_cerejeiras",
      name: "🌸 Praça das Cerejeiras",
      shortName: "Praça do Bairro",
      desc: "Arborizada e calma, perfeita para respirar ar puro.",
      travelMins: 14
    },
    ape_404: {
      id: "ape_404",
      name: "🔑 Apê 404 — Casa da Aurora",
      shortName: "Apê 404 (Aurora)",
      desc: "O cantinho particular dela: luzes suaves, dois monitores, bancada de café e cama aconchegante.",
      travelMins: 3
    }
  };

  AG.SHOP_ITEMS = [
    { id: "cafe_gelado_lata", name: "🧋 Café Gelado de Baunilha", price: 14, desc: "O favorito número 1 da Aurora." },
    { id: "energetico_pessego", name: "🍑 Energético Rosa de Pêssego", price: 16, desc: "Para virar a madrugada em 220V." },
    { id: "doce_morango_mochi", name: "🍓 Caixa de Mochi de Morango", price: 24, desc: "Doce delicado que deixa ela dengosa." },
    { id: "trufas_cereja", name: "🍫 Caixa de Trufas Artesanais de Cereja", price: 32, desc: "Chocolate meio amargo com licor suave de cereja (+Intimidade e +Clima)." },
    { id: "vela_baunilha_cereja", name: "🕯️ Vela Aromática Cereja & Âmbar", price: 38, desc: "Perfume envolvente para criar clima quente." },
    { id: "artbook_indie_raro", name: "📘 Artbook Edição Colecionador", price: 68, desc: "Presente especial para a mente criativa dela." },
    { id: "fone_rosa_edicao", name: "🎧 Fone Bluetooth Rosa Edição Limitada", price: 85, desc: "Presente inesquecível pras madrugadas de desenho dela (+30 Afinidade, +16 Intimidade)." }
  ];

  // ==========================================================================
  // AÇÕES CONTEXTUAIS BASEADAS NO QUE A AURORA ESTÁ FAZENDO AGORA!
  // (Diretas, Indiretas no Cenário, Avanços Precipitados & Minigames Específicos)
  // ==========================================================================
  AG.getSituationalAuroraActions = function () {
    const s = AG.state;
    const a = s.aurora;
    const act = a.activity;
    const list = [];

    if (!AG.isAuroraHere()) return list;

    // ------------------------------------------------------------------------
    // SE ELA ESTIVER DORMINDO (Ações Diretas e Indiretas com Consequências!)
    // ------------------------------------------------------------------------
    if (act === "dormindo") {
      list.push({
        id: "sleep_cover_sweet",
        title: "🤍 [Direto Positivo] Cobrir ela com a manta e tirar o fone com cuidado (15m)",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(15, { suppressRandom: true });
          s.pendingDelayedEffects.push({
            deltas: { affinity: 16, trust: 14, discomfort: -10, mood: "dengosa" },
            memoryId: "cobriu_dormindo",
            memoryText: "Cobriu ela com carinho e tirou o fone enquanto ela dormia sem acordá-la.",
            memoryCat: "bom",
            auroraAction: "*Acorda esfregando os olhos e repara na manta quentinha sobre os ombros, abrindo um sorriso derretido*",
            auroraSpeech: "Ei... foi você que me cobriu e tirou meu headset enquanto eu apagava? Você cuidou de mim dormindo... que coisa mais fofa."
          });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Você puxou a manta até os ombros dela e soltou o headset com delicadeza. Ela suspirou baixinho e se aninhou melhor no travesseiro. (Isso afetará a reação dela quando acordar!)"
          });
        }
      });

      list.push({
        id: "sleep_indirect_desk_coffee",
        title: "☕ [Indireto no Cenário] Salvar o projeto aberto no PC dela e deixar café pronto (25m)",
        tone: "life",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(25, { suppressRandom: true });
          s.pendingDelayedEffects.push({
            deltas: { affinity: 18, trust: 16, mood: "espontanea" },
            memoryId: "salvou_pc_dormindo",
            memoryText: "Salvou o projeto dela no PC e organizou a bancada enquanto ela dormia.",
            memoryCat: "bom",
            auroraAction: "*Olha para o monitor salvo e para a caneca na bancada ao acordar, arregalando os olhos emocionada*",
            auroraSpeech: "NÃO ACREDITO! Você salvou meu arquivo antes do PC reiniciar e ainda deixou café pronto?! Você literalmente salvou minha vida!"
          });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Sem fazer barulho, você clicou em Ctrl+S no programa de edição dela, arrumou os cabos soltos e deixou uma bebida pronta na bancada para quando ela acordar."
          });
        }
      });

      list.push({
        id: "sleep_minigame_snoop",
        title: "🤫 [Minigame Furtivo • Errado] Vasculhar Celular & Gaveta Secreta Enquanto Ela Dorme",
        desc: "Usa sua Furtividade para extrair número, fotos e +2 Trunfos sem acordá-la.",
        skillHint: "🤫 Furtividade 18+ permite salvar 1 deslize",
        tone: "ctrl",
        onRun: function () {
          AG.startMinigame("stealth_sleep_snoop");
        }
      });

      list.push({
        id: "sleep_indirect_pc_schedule",
        title: "💻 [Indireto no PC • Manipular] Alterar Agenda/Lembretes no PC Dela para Ela Vir ao 402 (20m)",
        desc: "Usa Código + Furtividade para programar um lembrete de visita ao seu apê sem ela desconfiar.",
        skillHint: "💻 Código + 🤫 Furtividade >= 32 para 0% Suspeita",
        tone: "ctrl",
        onRun: function () {
          const sk = (s.player && s.player.skills) || { stealth: 12, tech: 15 };
          AG.advanceTime(20, { suppressRandom: true });
          AG.clearFeed();
          if ((sk.stealth + sk.tech) >= 30) {
            AG.playSound("click");
            s.flags.auroraVisitingYourApt = true;
            const pills = AG.applyDeltas({ stealth: 3, tech: 3, heat: 10 });
            s.pendingDelayedEffects.push({
              deltas: { affinity: 10, heat: 12 },
              memoryId: "agenda_manipulada_402",
              memoryText: "Seguiu um lembrete da própria agenda para passar a noite com você no 402 sem imaginar que você o programou.",
              memoryCat: "controle",
              auroraAction: "*Olha as notificações do calendário ao acordar e sorri*",
              auroraSpeech: "Olha só, até meu próprio calendário tá dizendo que hoje é dia de passar um tempo com você no 402!"
            });
            AG.pushFeed({
              type: "narrative",
              text: "Com precisão cirúrgica, você inseriu um lembrete natural na agenda dela e apagou todos os logs de acesso sem deixar vestígio.",
              pills
            });
          } else {
            AG.playSound("warn");
            const pills = AG.applyDeltas({ suspicion: 18, stealth: 2 });
            AG.pushFeed({
              type: "narrative",
              text: "Você mexeu na agenda do computador dela, mas acabou deixando a janela aberta em segundo plano.",
              pills
            });
          }
        }
      });

      if (s.belongings && s.belongings.pinkRibbon && s.belongings.pinkRibbon.state === "in_404") {
        list.push({
          id: "sleep_steal_ribbon_direct",
          title: "🎀 [Pertence Dela • Dormindo] Pegar o Laço Rosa Favorito ao Lado do Travesseiro (10m)",
          desc: "Pega um pertence íntimo dela enquanto ela dorme (-30 Desejo, +1 Trunfo). Guarde na Gaveta Secreta do 402!",
          skillHint: "🤫 Furtividade 18+ evita levantar Suspeita",
          tone: "hot",
          onRun: function () {
            const skStealth = (s.player && s.player.skills && s.player.skills.stealth) || 12;
            s.belongings.pinkRibbon.state = "carried";
            s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
            AG.advanceTime(10, { suppressRandom: true });
            const pills = AG.applyDeltas({ desire: -30, stealth: 3, suspicion: skStealth >= 18 ? 0 : 16 });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "🎀 Sem fazer um único ruído, você deslizou o laço rosa favorito dela para o seu bolso. Tranque-o na Gaveta Secreta do 402!",
              pills
            });
          }
        });
      }

      list.push({
        id: "sleep_draw_mustache_prank",
        title: "🖍️ [Pegadinha Audaciosa • Dormindo] Desenhar um 'Desafio do 402' no Bloco de Notas Aberto Dela (10m)",
        desc: "Deixa uma provocação rabiscada no bloco aberto ao lado dela enquanto ela cochila (+14% Rivalidade, +10 Clima quando acordar).",
        skillHint: "🤫 Furtividade 14+ evita acordá-la no meio da pegadinha",
        tone: "hot",
        onRun: function () {
          const skStealth = (s.player && s.player.skills && s.player.skills.stealth) || 12;
          AG.advanceTime(10, { suppressRandom: true });
          AG.clearFeed();
          if (skStealth >= 14) {
            AG.playSound("click");
            const pills = AG.applyDeltas({ rivalry: 14, stealth: 2 });
            s.pendingDelayedEffects.push({
              deltas: { rivalry: 10, heat: 12, mood: "provocante" },
              memoryId: "pegadinha_bloco_404",
              memoryText: "Rabiscou um desafio irônico no bloco de notas dela enquanto ela tirava um cochilo.",
              memoryCat: "controle",
              auroraAction: "*Acorda, vê o rabisco 'Ass: Vizinho mais alto que você — 402' no bloco e semicerra os olhos com fogo competitivo*",
              auroraSpeech: "AH NÃO!! Você teve a audácia de rabiscar meu bloco enquanto eu apagava?! Pode se preparar que o troco do 404 vai ser inesquecível!"
            });
            AG.pushFeed({
              type: "narrative",
              text: "🖍️ Com precisão silenciosa, você deixou um desenho provocante e uma assinatura do 402 bem na página aberta dela. Ela vai pirar quando acordar!",
              pills
            });
          } else {
            AG.playSound("warn");
            a.activity = "no_corredor_celular";
            const pills = AG.applyDeltas({ rivalry: 16, discomfort: 12, mood: "irritada" });
            AG.pushFeed({
              type: "aurora",
              action: "*Acorda com o barulho da caneta e te flagra debruçado sobre o bloco dela*",
              speech: "Ei!! O que você tá rabiscando no meu bloco enquanto eu durmo?! Folgado demais!!",
              pills
            });
          }
        }
      });

      list.push({
        id: "sleep_steal_snack_stash",
        title: "🍓 [Travessura • Dormindo] Pegar o Último Doce Especial Dela e Deixar Recibo de 'Taxa do 402' (10m)",
        desc: "Come o último doce gelado da bancada dela (+25 Saciedade) e deixa um bilhete irônico para incendiar a rivalidade.",
        tone: "ctrl",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(10, { suppressRandom: true });
          const pills = AG.applyDeltas({ satiety: 25, rivalry: 16, stealth: 2 });
          s.pendingDelayedEffects.push({
            deltas: { rivalry: 12, heat: 10, mood: "provocante" },
            memoryId: "roubou_doce_404",
            memoryText: "Comeu o último doce especial da geladeira dela e deixou uma nota de 'Taxa do 402'.",
            memoryCat: "controle",
            auroraAction: "*Abre a geladeira, lê o bilhete 'Taxa do 402' e marcha na sua direção de mãos na cintura*",
            auroraSpeech: "Você comeu o MEU último doce especial e ainda deixou recibo?! Agora isso virou guerra declarada no quarto andar!"
          });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "🍓 Você pegou o doce mais cobiçado da geladeira do 404 e deixou um bilhete audacioso no lugar. A reação dela quando descobrir vai ser épica!",
            pills
          });
        }
      });

      const sleepCuddleGate = AG.Gates ? AG.Gates.check("sleep_cuddle") : { ok: (a.affinity >= 55 && a.trust >= 45) || a.dynamic === "tensao_ardente", chip: "", missing: "" };
      list.push({
        id: "sleep_invasive_touch",
        title: sleepCuddleGate.ok
          ? "💗 [Íntimo • Dormindo] Deitar colado nela com carinho enquanto ela descansa (20m)"
          : "⚠️ [Avanço Invasivo] Tocar / deitar colado nela dormindo sem intimidade",
        desc: sleepCuddleGate.ok ? "Vocês já têm intimidade profunda — ela adora acordar nos seus braços." : `Atenção: ${sleepCuddleGate.missing}`,
        tone: sleepCuddleGate.ok ? "sweet" : "risky",
        onRun: function () {
          const gate = AG.Gates ? AG.Gates.check("sleep_cuddle") : sleepCuddleGate;
          if (gate.ok) {
            AG.playSound("heart");
            AG.advanceTime(20, { suppressRandom: true, keepSpecialScene: true });
            const pills = AG.applyDeltas({ affinity: 12, intimacyLevel: 10, heat: 14, trust: 8, desire: 10, mood: "dengosa", specialScene: "noite404" });
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Abre os olhos devagar sentindo seu toque, murmura manhosa e puxa seu braço ao redor da cintura dela*",
              speech: "Hmmm... que jeito gostoso de ser acordada por você... fica aqui coladinho em mim.",
              pills
            });
          } else {
            AG.playSound("warn");
            a.activity = "no_corredor_celular";
            const pills = AG.applyDeltas({ affinity: -30, discomfort: 42, trust: -25, mood: "irritada" });
            AG.addMemory("invadiu_dormindo", "Tentou tocar nela enquanto ela dormia sem ter intimidade para isso.", "ruim", true);
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Acorda num sobressalto imediato, recua até a cabeceira e te encara com pavor e fúria*",
              speech: `O QUE VOCÊ TÁ FAZENDO?! Eu tava dormindo e você veio mexer em mim sem a gente ter essa intimidade (${gate.missing})?! Sai daqui agora mesmo!`,
              pills
            });
            if (a.discomfort >= 92 && a.dominance < 55) {
              AG.unlockEnding("bad_end_bloqueado_definitivo");
            }
          }
        }
      });

      return list;
    }

    // ------------------------------------------------------------------------
    // 1. CONSEGUIR O NÚMERO DELA (Só aparece se você ainda NÃO tem o número!)
    // ------------------------------------------------------------------------
    if (!s.unlocks.hasAuroraNumber) {
      list.push({
        id: "ask_phone_number",
        title: "📱 Ter atitude e pedir o número pessoal dela agora (15m)",
        tone: "sweet",
        onRun: function () {
          AG.advanceTime(15, { suppressRandom: true });
          AG.clearFeed();
          // Precisa que ela esteja confortável e tenha rolado um mínimo de sintonia ou faísca!
          if ((a.affinity >= 18 || a.heat >= 22) && a.discomfort < 28) {
            AG.playSound("heart");
            AG.unlockAuroraPhoneNumber("Pediu o número dela com atitude depois de deixá-la confortável.");
            const pills = AG.applyDeltas({ affinity: 10, trust: 8, heat: 6 });
            AG.pushFeed({
              type: "aurora",
              action: "*Pega o seu celular da sua mão ficando na ponta dos pés, digita rápido com um sorrisinho e te devolve*",
              speech: "Gostei da atitude, Diretor! Tava esperando pra ver quando você ia parar de enrolar e pedir meu contato. Salvei como 'Aurora 404 🎀' — agora o nosso chat no seu celular tá liberado!",
              pills
            });
          } else {
            AG.playSound("warn");
            const pills = AG.applyDeltas({ discomfort: 6 });
            AG.pushFeed({
              type: "aurora",
              action: "*Cruza os braços e inclina a cabeça olhando pra você de baixo pra cima*",
              speech: a.discomfort >= 30
                ? "Com esse clima chato entre a gente agora? Nem pensar que eu vou te dar meu número pessoal assim. Conserta as coisas comigo primeiro."
                : "Calma lá, apressadinho! A gente acabou de se conhecer pra eu sair entregando meu número pessoal. Conversa comigo direito e me deixa confortável primeiro.",
              pills
            });
          }
        }
      });
    }

    // ------------------------------------------------------------------------
    // 2. SITUAÇÃO: TENTANDO ALCANÇAR O ALTO (1,49m na ponta dos pés!)
    // ------------------------------------------------------------------------
    if (act === "tentando_alcancar_alto") {
      list.push({
        id: "reach_high_gentle",
        title: "📏 [Direto] Usar sua altura para alcançar pra ela com um sorriso (15m)",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(15);
          const pills = AG.applyDeltas({ affinity: 12, trust: 8, discomfort: -6, mood: "espontanea" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Para de pular na ponta dos pés e olha pra cima agradecida enquanto você pega sem esforço*",
            speech: "Aff, que humilhação você alcançar sem nem dobrar o braço! ...Mas obrigada, você é muito útil e fofo quando quer.",
            pills
          });
        }
      });

      const liftGate = AG.Gates ? AG.Gates.check("lift_waist") : { ok: a.affinity >= 22 || a.heat >= 24, missing: "" };
      list.push({
        id: "reach_high_lift_waist",
        title: "🔥 [Direto Ousado] Segurar pela cintura dela e levantá-la até o alto (15m)",
        desc: liftGate.ok ? "Ela já confia em você o bastante pra curtir a pegada." : `Falta: ${liftGate.missing}`,
        tone: "hot",
        onRun: function () {
          AG.advanceTime(15, { keepSpecialScene: true });
          AG.clearFeed();
          const gate = AG.Gates ? AG.Gates.check("lift_waist") : liftGate;
          if (gate.ok) {
            AG.playSound("hot");
            const pills = AG.applyDeltas({ affinity: 12, intimacyLevel: 8, heat: 18, desire: 12, mood: "provocante", specialScene: "levantandoEla" });
            AG.pushFeed({
              type: "aurora",
              action: "*Solta um gritinho surpreso quando você a ergue pela cintura, apoiando as mãos nos seus braços toda corada*",
              speech: "E-ei! Me levantou no ar como se eu não pesasse nada! ...Pior que gostei da sua pegada na minha cintura.",
              pills
            });
          } else {
            AG.playSound("warn");
            const pills = AG.applyDeltas({ affinity: -10, discomfort: 16, mood: "irritada" });
            AG.pushFeed({
              type: "aurora",
              action: "*Se debate na hora pra você colocá-la no chão e te encara corada e indignada*",
              speech: `ME PÕE NO CHÃO! A gente ainda não tem essa liberdade toda pra você sair me pegando pela cintura assim (${gate.missing})!`,
              pills
            });
          }
        }
      });

      list.push({
        id: "reach_indirect_hide_stool",
        title: "😈 [Indireto no Cenário] Esconder o banquinho dela pra ela depender de você depois (10m)",
        tone: "ctrl",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(10, { suppressRandom: true });
          s.pendingDelayedEffects.push({
            deltas: { dominance: -6, heat: 10, affinity: 6 },
            memoryId: "sumiu_banquinho",
            memoryText: "Fez o banquinho dela sumir misteriosamente e ela precisou chamar você para alcançar as coisas.",
            memoryCat: "controle",
            auroraAction: "*Procura o banquinho por todo lado e acaba tendo que puxar você pela manga*",
            auroraSpeech: "Meu banquinho sumiu misteriosamente... Vem cá e alcança a prateleira pra mim, já que você é alto!"
          });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Discretamente, você empurrou o banquinho dobrável pra trás do armário sem ela ver. Da próxima vez que ela precisar alcançar algo, vai ter que recorrer a você."
          });
        }
      });

      if (s.currentLocation === "corredor_4andar") {
        list.push({
          id: "minigame_corridor_box",
          title: "⚡ [Minigame Específico] Calibrar o Sinal da Caixa Alta com a Aurora",
          tone: "life",
          onRun: function () {
            AG.startMinigame("corridor_wiring");
          }
        });
      }
    }

    // ------------------------------------------------------------------------
    // 3. SITUAÇÃO: MEXENDO NA COZINHA / BANCADA
    // ------------------------------------------------------------------------
    if (act === "mexendo_cozinha") {
      list.push({
        id: "kitchen_help_together",
        title: "🍳 [Direto] Ajudar a preparar o café/lanche ombro a ombro (20m)",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(20);
          const pills = AG.applyDeltas({ affinity: 14, trust: 10, satiety: 20, mood: "dengosa" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Dá uma colherada na sua boca pra você provar e sorri toda animada*",
            speech: "Ficou bom?! Cozinhar de madrugada com você aqui do lado deixa tudo dez vezes mais gostoso!",
            pills
          });
        }
      });

      const hugBackGate = AG.Gates ? AG.Gates.check("hug_behind") : { ok: a.affinity >= 32 || a.heat >= 35, missing: "" };
      list.push({
        id: "kitchen_hug_behind",
        title: "🔥 [Direto Ousado] Chegar por trás na pia e abraçar a cintura dela colado (15m)",
        desc: hugBackGate.ok ? "Ela já está à vontade com sua proximidade." : `Falta: ${hugBackGate.missing}`,
        tone: "hot",
        onRun: function () {
          AG.advanceTime(15, { keepSpecialScene: true });
          AG.clearFeed();
          const gate = AG.Gates ? AG.Gates.check("hug_behind") : hugBackGate;
          if (gate.ok) {
            AG.playSound("hot");
            const pills = AG.applyDeltas({ heat: 20, intimacyLevel: 10, affinity: 12, desire: 14, mood: "provocante", specialScene: "chamego" });
            AG.pushFeed({
              type: "aurora",
              action: "*Solta um suspiro baixinho encostando as costas no seu peito e inclina o pescoço pro lado*",
              speech: "Chegando por trás assim enquanto eu tô na bancada... Desse jeito o café vai esfriar e a culpa é toda sua.",
              pills
            });
          } else {
            AG.playSound("warn");
            const pills = AG.applyDeltas({ affinity: -12, discomfort: 18, mood: "irritada" });
            AG.pushFeed({
              type: "aurora",
              action: "*Dá uma cotovelada leve pra se soltar e vira de frente séria*",
              speech: `Qual é a sua de chegar me agarrando por trás assim?! Ainda falta intimidade pra isso (${gate.missing})!`,
              pills
            });
          }
        }
      });

      list.push({
        id: "kitchen_indirect_snoop_phone",
        title: "🕵️ [Indireto Errado] Olhar o celular dela sobre a mesa enquanto ela está de costas (10m)",
        tone: "ctrl",
        onRun: function () {
          AG.advanceTime(10, { suppressRandom: true });
          AG.clearFeed();
          if (Math.random() < 0.72) {
            AG.playSound("click");
            s.unlocks.hasAuroraNumber = true;
            s.unlocks.unlockedSpyApp = true;
            s.phoneState.leverage += 1;
            s.phoneState.tracksRisk = AG.clamp(s.phoneState.tracksRisk + 25, 0, 100);
            AG.pushFeed({
              type: "narrative",
              text: "Enquanto ela mexia na pia de costas, você anotou o número privado dela, viu o arroba da conta secundária e guardou um trunfo no seu celular — mas deixou rastros abertos."
            });
            if (AG.queueToast) {
              AG.queueToast("Contato da Aurora salvo", "pos", "up");
              AG.queueToast("+1 Trunfo · +25% Rastros", "ctrl", "up");
            }
          } else {
            AG.playSound("warn");
            const pills = AG.applyDeltas({ affinity: -20, discomfort: 30, trust: -20, mood: "irritada" });
            AG.pushFeed({
              type: "aurora",
              action: "*Vira de repente com a caneca na mão e flagra você com o celular dela na mão*",
              speech: "EI! Por que você tá mexendo no meu celular enquanto eu tô de costas?! Que falta de respeito é essa?!",
              pills
            });
          }
        }
      });
    }

    // ------------------------------------------------------------------------
    // 4. SITUAÇÃO: ORGANIZANDO MÓVEL / ESTANTE OU ASSISTINDO NO SOFÁ
    // ------------------------------------------------------------------------
    if (act === "mexendo_movel" || act === "assistindo_jogando") {
      list.push({
        id: "sofa_join_activity",
        title: act === "assistindo_jogando"
          ? "🛋️ [Direto] Sentar colado nela no sofá e assistir/torcer junto (25m)"
          : "📦 [Direto] Ajudar ela a carregar e alinhar o móvel pesado (25m)",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(25);
          const pills = AG.applyDeltas({ affinity: 14, trust: 10, calm: 8, mood: "dengosa" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Encosta a cabeça no seu braço toda satisfeita com a parceria*",
            speech: "Com você aqui do lado até arrumar bagunça ou ver besteira na tela fica dez vezes melhor!",
            pills
          });
        }
      });

      if (act === "assistindo_jogando") {
        list.push({
          id: "minigame_gaming_bet",
          title: "🎮 [Minigame Específico] Desafiar a Aurora num Duelo Valendo uma Aposta!",
          tone: "hot",
          onRun: function () {
            AG.startMinigame("aurora_duel_bet");
          }
        });
      }

      list.push({
        id: "furniture_indirect_note",
        title: "💌 [Indireto Positivo] Esconder um bilhete fofo / mimo na gaveta para ela achar depois (10m)",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(10, { suppressRandom: true });
          s.pendingDelayedEffects.push({
            deltas: { affinity: 15, heat: 8, discomfort: -10, mood: "dengosa" },
            memoryId: "achou_bilhete_gaveta",
            memoryText: "Achou um bilhete escondido por você no meio das coisas dela e ficou toda boba.",
            memoryCat: "bom",
            auroraAction: "*Abre a gaveta depois e encontra o bilhete que você deixou escondido, corando na hora*",
            auroraSpeech: "Eu achei o que você escondeu na minha gaveta, sabia?! Quase derreti quando li... você não existe!"
          });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Sem ela perceber, você deslizou um bilhete escrito à mão entre as coisas que ela estava arrumando. Ela vai encontrar isso mais tarde!"
          });
        }
      });
    }

    // ------------------------------------------------------------------------
    // 5. SITUAÇÃO: TRABALHANDO DE UNIFORME NO CAFÉ SAKURA
    // ------------------------------------------------------------------------
    if (act === "trabalhando_uniforme") {
      list.push({
        id: "uniform_flirt_counter",
        title: "👗 [Direto] Elogiar o uniforme dela no balcão com charme (15m)",
        tone: "hot",
        onRun: function () {
          AG.playSound("hot");
          AG.advanceTime(15, { keepSpecialScene: true });
          const pills = AG.applyDeltas({ affinity: 10, heat: 14, mood: "provocante", specialScene: "uniformeProvocante" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Apoia os cotovelos no balcão do Café Sakura usando o uniforme e sussurra pra colegas não ouvirem*",
            speech: "Veio até o meu trabalho só pra me ver de uniforme, foi? Confessa que você não tira esse meu visual da cabeça...",
            pills
          });
        }
      });

      list.push({
        id: "minigame_cafe_rush",
        title: "☕ [Minigame Específico] Ajudar a Aurora no Rush de Pedidos do Café Sakura",
        tone: "life",
        onRun: function () {
          AG.startMinigame("cafe_sakura_rush");
        }
      });
    }

    // ------------------------------------------------------------------------
    // 6. AÇÃO AVANÇADA DE BEIJO DIRETO (100% COERENTE VIA AG.Gates!)
    // ------------------------------------------------------------------------
    const kissGate = AG.Gates ? AG.Gates.check("direct_kiss_move") : { ok: false, missing: "" };
    list.push({
      id: "premature_advanced_move",
      title: kissGate.ok
        ? "💋 [Clima Pronto] Puxar ela pela cintura para um beijo intenso agora (15m)"
        : "⚠️ [Avanço Direto] Puxar ela para um beijo / toque íntimo agora mesmo (15m)",
      desc: kissGate.ok
        ? "A sintonia e intimidade entre vocês já estão prontas — ela vai corresponder!"
        : `Atenção · Falta: ${kissGate.missing}`,
      tone: kissGate.ok ? "hot" : "risky",
      onRun: function () {
        AG.advanceTime(15, { keepSpecialScene: true });
        AG.clearFeed();
        const gate = AG.Gates ? AG.Gates.check("direct_kiss_move") : kissGate;
        if (gate.ok) {
          AG.playSound("hot");
          const pills = AG.applyDeltas({
            heat: 22,
            affinity: 14,
            intimacyLevel: 12,
            arousal: 14,
            desire: -35,
            mood: "provocante",
            specialScene: a.wearingUniform ? "nsfwUniforme" : "nsfw1"
          });
          AG.pushFeed({
            type: "aurora",
            action: "*Fica na ponta dos pés, envolve seu pescoço com força e corresponde com fogo total*",
            speech: "Nossa... quando você toma atitude assim no momento certo, você me deixa completamente sem ar!",
            pills
          });
        } else if (gate.code === "bond") {
          AG.playSound("warn");
          const pills = AG.applyDeltas({ affinity: -10, discomfort: 18, mood: "desconfortavel" });
          AG.pushFeed({
            type: "aurora",
            action: "*Apoia as mãos no seu peito segurando a distância e respira fundo corada*",
            speech: `Ei, calma lá, 402! Não pula etapas — a gente ainda precisa construir mais intimidade antes de você avançar assim (${gate.missing}).`,
            pills
          });
        } else {
          AG.playSound("warn");
          const pills = AG.applyDeltas({ affinity: -24, discomfort: 36, trust: -16, mood: "irritada" });
          AG.addMemory("avanco_sem_intimidade", "Tentou forçar um beijo/avanço íntimo sem clima nem consentimento mútuo.", "ruim", true);
          AG.pushFeed({
            type: "aurora",
            action: "*Vira o rosto na hora, empurra seu peito com as duas mãos e recua furiosa*",
            speech: `PAROU! O que deu na sua cabeça?! ${gate.reason} Respeita meu limite!`,
            pills
          });
          if (a.discomfort >= 92 && a.dominance < 55) {
            AG.unlockEnding("bad_end_bloqueado_definitivo");
          }
        }
      }
    });

    list.push({
      id: "psych_push_pull_cold",
      title: "♟️ [Jogo de Gelo & Fogo • Push-Pull] Provocar e Recuar Frio de Repente (15m • +Influência)",
      desc: "Alterna atenção e mistério calculado para virar o jogo psicológico e fazê-la tentar decifrar você.",
      skillHint: "🗣️ Lábia 15+ aumenta sua Influência em +16% e reduz o Controle dela",
      tone: "ctrl",
      onRun: function () {
        const skChar = (s.player && s.player.skills && s.player.skills.charisma) || 12;
        AG.advanceTime(15, { keepSpecialScene: true });
        AG.clearFeed();
        if (skChar >= 15 || a.affinity >= 25 || a.heat >= 25) {
          AG.playSound("click");
          const pills = AG.applyDeltas({ influence: 16, rivalry: 8, dominance: -10, heat: 12, charisma: 2, mood: "provocante" });
          AG.pushFeed({
            type: "aurora",
            action: "*Segura sua manga no instante em que você vira as costas com calma calculada, olhando pra cima intrigada*",
            speech: "Ei, volta aqui!! Você solta uma bomba dessas e sai andando todo misterioso?! Tá querendo virar o jogo psicológico pra cima de mim, né?!",
            pills
          });
        } else {
          AG.playSound("warn");
          const pills = AG.applyDeltas({ discomfort: 12, affinity: -8, mood: "irritada" });
          AG.pushFeed({
            type: "aurora",
            action: "*Revira os olhos percebendo o joguinho*",
            speech: "Ah, vai fazer joguinho de gelo comigo sendo que a gente mal tem intimidade? Poupa seu tempo, 402.",
            pills
          });
        }
      }
    });

    list.push({
      id: "challenge_high_stakes_bet",
      title: "🎲 [Aposta Ousada] Desafiar a Aurora num 'Tudo ou Nada' (Quem Perder Paga uma Prenda! • 20m)",
      desc: "Desafia o orgulho competitivo dela num duelo de blefe e reflexo valendo uma prenda ousada.",
      skillHint: "🗣️ Lábia + 👁️ Percepção >= 26 garante vitória esmagadora (+18% Influência, +14 Clima)",
      tone: "hot",
      onRun: function () {
        const sk = s.player.skills || { charisma: 12, perception: 12 };
        const bonus = s.flags.preparedWager ? 6 : 0;
        s.flags.preparedWager = false;
        AG.advanceTime(20, { keepSpecialScene: true });
        AG.clearFeed();
        if ((sk.charisma + sk.perception + bonus) >= 26) {
          AG.playSound("hot");
          AG.unlockSecret("termo_aposta_404", "🎲 NOVO TRUNFO NO DOSSIÊ: Prova da Aposta Perdida do 4º Andar!");
          const pills = AG.applyDeltas({ influence: 18, rivalry: 14, heat: 14, composure: -14, dominance: -12, charisma: 2, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" });
          AG.addMemory("venceu_aposta_ousada", "Venceu a Aurora numa aposta de blefe e a deixou devendo uma prenda ousada.", "intenso", true);
          AG.pushFeed({
            type: "aurora",
            action: "*Arregala os olhos quando percebe que caiu na sua jogada e morde o lábio inferior corada e elétrica*",
            speech: "NÃO ACREDITO QUE EU CAI NESSE SEU BLEFE!! Tá bom, tá bom... eu pago minha aposta. Qual é a prenda que o Sr. Gênio do 402 vai exigir?",
            pills
          });
        } else {
          AG.playSound("click");
          const pills = AG.applyDeltas({ dominance: 14, rivalry: 12, heat: 10, mood: "controladora", specialScene: "controle" });
          AG.pushFeed({
            type: "aurora",
            action: "*Abre um sorriso vitorioso de orelha a orelha e dá dois tapinhas no seu ombro*",
            speech: "PERDEU!! Achou que ia me enganar fácil assim? Agora quem manda na prenda de hoje sou EU — pode começar a obedecer!",
            pills
          });
        }
      }
    });

    // PSICOLOGIA DIRETA (CENA INTERATIVA DE LEITURA FRIA & QUEBRA DE ARMADURA)
    list.push({
      id: "psych_direct_cold_read",
      title: "👁️ [Psicologia Direta • Interativo] Leitura Fria & Quebra da Armadura Emocional Dela (15m)",
      desc: "Observa microexpressões da Aurora e escolhe qual ponto exato desmontar na cara dela (-Armadura • +Influência).",
      skillHint: "Armadura atual da Aurora: " + (a.composure !== undefined ? a.composure : 75) + "% (<= 35% libera bônus de Influência e extração de segredos!)",
      tone: "ctrl",
      onRun: function () {
        AG.playSound("click");
        AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
        s.activeRandomEvent = {
          id: "scene_cold_read_aurora",
          title: "👁️ PSICOLOGIA DIRETA: Leitura Fria em Tempo Real",
          desc: `Você fixa o olhar nos detalhes sutis da Aurora (Armadura Emocional atual: ${a.composure !== undefined ? a.composure : 75}%). Ela segura o celular com força, bate a ponta do tênis no piso e força um sorriso irônico. Qual sinal você vai expor cara a cara agora?`,
          choices: [
            {
              id: "coldread_hands",
              tone: "ctrl",
              label: "🖐️ Apontar as mãos inquietas e a tensão nos ombros: 'Você só aperta as mangas assim quando está escondendo algo'",
              skillHint: "Quebra -24% da Armadura dela e aumenta +16% Influência (bônus se Percepção >= 14)"
            },
            {
              id: "coldread_sarcasm",
              tone: "ctrl",
              label: "🎭 Expor o sarcasmo como escudo: 'Toda vez que alguém chega perto de verdade, você levanta essa pose marrenta'",
              skillHint: "Derruba -20% da Armadura, reduz Controle dela (-12) e cria tensão psicológica intensa"
            },
            {
              id: "coldread_phone",
              tone: "hot",
              label: "📱 Apontar o olhar dela desviando para o seu celular: 'Curiosa pra saber o que eu sei sobre o 404?'",
              skillHint: "Planta paranoia calculada (-18% Armadura, +14% Rivalidade, +12 Clima)"
            }
          ]
        };
      }
    });

    // CHANTAGEM & BARGANHA CARA A CARA (USA SEGREDO REAL DO DOSSIÊ!)
    const heldSecrets = AG.getHeldSecrets ? AG.getHeldSecrets() : [];
    if (heldSecrets.length > 0) {
      const topSecret = heldSecrets.slice().sort((x, y) => (y.pressureVal || 20) - (x.pressureVal || 20))[0];
      list.push({
        id: "psych_direct_blackmail_table",
        title: `⛓️ [Chantagem & Barganha • Dossiê] Puxar '${topSecret.name}' na Cara Dela Agora! (${heldSecrets.length} na mão)`,
        desc: "Abre o confronto cara a cara usando um segredo concreto que você descobriu: escolha entre chantagem fria, extorsão de favores, pacto velado ou queimar a prova!",
        skillHint: `Severidade: ${topSecret.severity} (+${topSecret.pressureVal}% Pressão) • Você escolhe a tática e a exigência!`,
        tone: "risky",
        onRun: function () {
          AG.playSound("warn");
          AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
          s.flags.activeBlackmailSecretId = topSecret.id;
          s.activeRandomEvent = {
            id: "scene_blackmail_confront",
            title: `⛓️ CONFRONTO DO DOSSIÊ: ${topSecret.name}`,
            desc: `Você tira o celular do bolso, gira a tela devagar na direção da Aurora e deixa ela reconhecer exatamente o que você tem em mãos (${topSecret.desc}). O sorriso dela desaparece no mesmo segundo e a respiração trava. Como você vai jogar essa carta?`,
            choices: [
              {
                id: "bm_ultimatum_key",
                tone: "risky",
                label: "🐍 [Chantagem Implacável] Exigir a chave/acesso livre ao 404 e que ela obedeça suas regras do andar em silêncio",
                skillHint: "Libera o Apê 404 na hora, +Pressão alta, -22% Armadura, +20% Influência (+Atrito)"
              },
              {
                id: "bm_extort_favors_money",
                tone: "risky",
                label: "💸 [Cobrar 'Taxa de Silêncio'] Exigir R$ 65 agora + café pago por ela para você manter a boca fechada",
                skillHint: "+R$ 65 imediatos, +Pressão, +14% Influência, mas aumenta muito o rancor dela"
              },
              {
                id: "bm_velvet_bargain",
                tone: "ctrl",
                label: "🕸️ [Barganha Velada • Lábia 16+] Dizer que o segredo está seguro com você — contanto que ela pare de tentar mandar em você",
                skillHint: "Requer 🗣️ Lábia >= 16: +18% Influência, -20% Controle Dela, +14 Clima, 0% Atrito!"
              },
              {
                id: "bm_burn_proof_shock",
                tone: "sweet",
                label: "🔥 [Jogada de Mestre] Apagar a prova bem na frente dos olhos dela e dizer: 'Eu não preciso disso pra lidar com você'",
                skillHint: "Queima o segredo, zera Pressão, quebra -28% Armadura e dispara +24 Afinidade / +26 Confiança!"
              }
            ]
          };
        }
      });
    }

    // PSICOLOGIA INDIRETA 1: SILÊNCIO CALCULADO
    list.push({
      id: "psych_indirect_silent_stare",
      title: "🧊 [Psicologia Indireta] Silêncio Calculado & Olhar Analítico (Sem Dizer Uma Palavra • 10m)",
      desc: "Em vez de rebater, você apenas observa a Aurora em silêncio absoluto — quebrando a compostura dela até ela se entregar.",
      skillHint: "Derruba -20% da Armadura dela; se Percepção >= 15 ela deixa escapar uma pista do Dossiê!",
      tone: "ctrl",
      onRun: function () {
        const skPerc = (s.player && s.player.skills && s.player.skills.perception) || 12;
        AG.playSound("click");
        AG.advanceTime(10, { suppressRandom: true });
        AG.clearFeed();
        const locked = s.secretsDossier && Object.values(s.secretsDossier).find((x) => x.state === "locked");
        let bonusLine = "";
        if (skPerc >= 15 && locked && (a.composure !== undefined ? a.composure : 75) <= 55) {
          AG.unlockSecret(locked.id, `🧊 O silêncio absoluto funcionou: nervosa, ela deixou escapar '${locked.name}'!`);
          bonusLine = " (Ela falou demais no nervosismo e entregou um novo Segredo pro seu Dossiê!)";
        }
        const pills = AG.applyDeltas({ composure: -20, influence: 12, perception: 2, personaCold: 3, mood: "desconfiada" });
        AG.pushFeed({
          type: "aurora",
          action: "*Seu silêncio absoluto e olhar calmo desmontam a marra dela segundo após segundo; ela começa a falar rápido demais tentando preencher o vazio*",
          speech: "Ei!! Fala alguma coisa! Esse seu jeito de ficar mudo me analisando com esse meio sorriso frio me deixa completamente desconcertada..." + bonusLine,
          pills
        });
      }
    });

    // PSICOLOGIA INDIRETA 2: ESPELHAMENTO SUBLIMINAR
    list.push({
      id: "psych_indirect_mirroring",
      title: "🪞 [Psicologia Indireta] Espelhar Gestos, Tom de Voz e Horários Dela (15m • -Suspeita • -Armadura)",
      desc: "Técnica sutil de rapport subliminar: faz ela baixar todas as defesas inconscientemente sem levantar nenhuma suspeita.",
      skillHint: "-16% Suspeita, -14% Armadura, +10 Confiança e +10% Influência",
      tone: "sweet",
      onRun: function () {
        AG.playSound("heart");
        AG.advanceTime(15, { suppressRandom: true });
        const pills = AG.applyDeltas({ suspicion: -16, composure: -14, trust: 10, influence: 10, charisma: 2, personaCold: 2, personaWarm: 1, mood: "espontanea" });
        AG.clearFeed();
        AG.pushFeed({
          type: "aurora",
          action: "*Sem perceber que você está espelhando o ritmo exato da postura e das expressões dela, ela descruza os braços e relaxa totalmente*",
          speech: "Sabe que é estranho? Conversar com você flui de um jeito tão natural que parece que você lê meus pensamentos antes de eu falar...",
          pills
        });
      }
    });

    // --- INTERAÇÕES DAS 4 NOVAS ATIVIDADES VIVAS & STATUS ÍNTIMOS DA AURORA ---
    if (act === "desenhando_tablet") {
      list.push({
        id: "tablet_watch_over_shoulder",
        title: "🎨 [Atividade Dela] Encostar Atrás da Cadeira para Ver o Desenho no Tablet (15m • +Intimidade)",
        desc: "Observa o traço dela de pertinho e nota um rascunho especial que ela tentou esconder.",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(15, { keepSpecialScene: true });
          const pills = AG.applyDeltas({ affinity: 14, intimacyLevel: 12, vulnerability: 12, arousal: 10, composure: -10, mood: "corada_sensivel", specialScene: "chamego" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Dá um pulinho corando inteira quando você inclina sobre o ombro dela e nota que o personagem no tablet tem exatamente o seu estilo*",
            speech: "EI!! Fecha o olho!! Esse rascunho não era pra você ver ainda... tá, eu tava desenhando você de memória, feliz agora?!",
            pills
          });
        }
      });
    }

    if (act === "saindo_banho_toalha") {
      list.push({
        id: "bath_dry_hair_towel",
        title: "🫧 [Pós-Banho • Íntimo] Pegar a Toalha e Ajudar a Secar o Cabelo Dela com Carinho (20m • +Intimidade • +Tensão)",
        desc: "Aroma de shampoo, camiseta larga e proximidade suave que acelera o coração dela.",
        tone: "hot",
        onRun: function () {
          AG.playSound("hot");
          AG.advanceTime(20, { keepSpecialScene: true });
          const pills = AG.applyDeltas({ intimacyLevel: 18, arousal: 18, affinity: 16, vulnerability: 14, heat: 14, mood: "corada_sensivel", specialScene: "noite404" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Fecha os olhos suspirando baixinho enquanto você seca as pontas do cabelo dela com delicadeza e sente o perfume quente na nuca dela*",
            speech: "Suas mãos no meu cabelo desse jeito me deixam toda arrepiada... continua assim que eu não quero sair daqui nunca mais.",
            pills
          });
        }
      });
    }

    if (act === "olhando_chuva_janela") {
      list.push({
        id: "rain_hug_window_back",
        title: "🌧️ [Chuva • Abertura] Abraçar Ela Por Trás na Janela em Silêncio (20m • +Abertura • +Intimidade)",
        desc: "Momento de profunda conexão emocional enquanto a chuva bate no vidro.",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(20, { keepSpecialScene: true });
          const pills = AG.applyDeltas({ vulnerability: 22, intimacyLevel: 16, trust: 16, affinity: 16, composure: -16, mood: "entregue", specialScene: "chamego" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Encosta a cabeça no seu peito segurando seus braços ao redor da cintura dela, completamente em paz*",
            speech: "Eu costumava odiar noites de chuva sozinha no 404... mas com você me abraçando assim, parece que o mundo inteiro lá fora pode esperar.",
            pills
          });
        }
      });
    }

    if (act === "trocando_roupa_porta") {
      list.push({
        id: "mirror_help_pick_outfit",
        title: "👗 [Espelho • Estilo] Ajudar a Aurora a Escolher o Visual Novo no Espelho (15m • +Clima • +Intimidade)",
        desc: "Opina sobre o caimento da roupa dela de perto e muda o visual atual dela.",
        tone: "hot",
        onRun: function () {
          AG.playSound("hot");
          AG.advanceTime(15, { keepSpecialScene: true });
          const outfits = ["Vestido Curto de Folga", "Conjunto Elegante do 404", "Moletom Oversized com Meia Alta", "Camiseta Larga Perfumada"];
          a.currentOutfit = outfits[(s.totalActionsTaken + s.day) % outfits.length];
          const pills = AG.applyDeltas({ heat: 14, intimacyLevel: 12, arousal: 14, affinity: 10, mood: "corada_sensivel", specialScene: "uniformeProvocante" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: `*Dá uma voltinha diante do espelho usando '${a.currentOutfit}' e te olha pelo reflexo mordendo o lábio*`,
            speech: `Aprovado pelo meu jurado favorito? Se você continuar me olhando desse jeito no espelho, a gente nem vai sair de casa hoje...`,
            pills
          });
        }
      });
    }

    // CUIDAR DA DISPOSIÇÃO / CANSAÇO DELA
    if ((a.auroraEnergy !== undefined && a.auroraEnergy <= 45) || a.mood === "sonolenta_manhosa" || a.mood === "melancolica") {
      list.push({
        id: "care_aurora_recharge",
        title: "🧸 [Cuidar Dela] Fazer Massagem nos Ombros e Trazer Bebida Quentinha (+34% Disposição Dela • +Intimidade)",
        desc: "Recarrega a energia dela quando está exausta ou pensativa, abrindo espaço para carinho profundo.",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(20, { keepSpecialScene: true });
          const pills = AG.applyDeltas({ auroraEnergy: 34, affinity: 18, trust: 14, intimacyLevel: 14, vulnerability: 16, discomfort: -14, personaWarm: 3, mood: "entregue", specialScene: "chamego" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Solta um suspiro derretido apoiando o corpo nos seus ombros enquanto você massageia a tensão das costas dela*",
            speech: "Ai... minhas costas tavam destruídas e você acertou exatamente onde doía... Como é que você sempre sabe cuidar de mim melhor que eu mesma? 💗",
            pills
          });
        }
      });
    }

    if (s.weather === "chuva_noturna" && ["praca_cerejeiras", "mercadinho_24h", "cafe_sakura"].includes(s.currentLocation)) {
      list.push({
        id: "rain_share_umbrella_home",
        title: "Dividir o guarda-chuva e voltar pro prédio colado nela (15m)",
        desc: "Caminham juntos debaixo da chuva até o quarto andar, colados pra não molhar.",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          s.currentLocation = "corredor_4andar";
          s.flags.auroraCalledToCorridor = true;
          AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
          const pills = AG.applyDeltas({ affinity: 14, trust: 10, intimacyLevel: 10, heat: 8, discomfort: -10, personaWarm: 3, mood: "dengosa", specialScene: "chamego" });
          AG.addMemory("guarda_chuva_juntos", "Dividiram o guarda-chuva na chuva até chegarem colados no 4º andar.", "bom", false);
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Segura no seu braço colada ao seu ombro pra escapar dos pingos e chega no corredor do 4º andar rindo com as pontas do cabelo molhadas*",
            speech: "Valeu demais por dividir o guarda-chuva... com essa diferença de altura eu fico praticamente dentro do seu casaco!",
            pills
          });
        }
      });
    }

    if (s.weather === "apagao_andar" && ["corredor_4andar", "ape_404", "ape_402"].includes(s.currentLocation)) {
      list.push({
        id: "blackout_flashlight_close",
        title: "Ficar na meia-luz da lanterna do celular bem perto dela (15m)",
        desc: "A queda de energia no 4º andar deixa a conversa muito mais próxima e elétrica.",
        tone: "hot",
        onRun: function () {
          AG.playSound("hot");
          AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
          const pills = AG.applyDeltas({ heat: 16, arousal: 14, intimacyLevel: 10, composure: -14, desire: 10, mood: "excitada_tensa", specialScene: "noite404" });
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*A luz fraca do celular ilumina só o rosto dela olhando pra cima, pertinho demais do seu peito*",
            speech: "No escuro do quarto andar você parece ainda mais alto... e minha coragem de falar besteira fica dobrada.",
            pills
          });
        }
      });
    }

    // CENA ÍNTIMA INTERATIVA DE QUÍMICA & ENTREGA (Estritamente consensual com química alta!)
    if (
      ((a.arousal || 0) >= 50 || a.heat >= 45) &&
      ((a.intimacyLevel || 0) >= 30 || a.affinity >= 35) &&
      a.discomfort < 30 &&
      (!s.phoneState || s.phoneState.manipulationCount === 0) &&
      (a.leveragePressure || 0) < 25
    ) {
      list.push({
        id: "intimate_tension_close",
        title: "💋 [Íntimo • Química Alta] Puxar Ela Pela Cintura, Encostar a Testa na Dela e Conduzir o Clima (Cena Interativa)",
        desc: `Tensão Dela: ${a.arousal || 10}% • Estágio: ${AG.getIntimacyStage ? AG.getIntimacyStage().title : "Química"} — Escolha o ritmo do momento íntimo!`,
        tone: "hot",
        onRun: function () {
          AG.playSound("hot");
          AG.advanceTime(25, { suppressRandom: true, keepSpecialScene: true });
          s.activeRandomEvent = {
            id: "scene_intimate_tension_404",
            title: "💋 MOMENTO ÍNTIMO: Respirações Coladas no 4º Andar",
            desc: "A Aurora ergue o rosto na ponta dos pés até encostar a testa na sua, com as bochechas quentes e as mãos firmes na sua gola. O clima está elétrico e totalmente entregue. Como você conduz esse momento?",
            choices: [
              { id: "int_slow_romantic", tone: "sweet", label: "💗 [Entrega Doce] Beijo demorado, carinho suave na nuca e abraço apertado (+20 Intimidade • +18 Afinidade • Entregue)" },
              { id: "int_intense_passion", tone: "hot", label: "🔥 [Química Intensa] Pegada firme na cintura, olhar de cima e paixão sem pressa (+22 Intimidade • +20 Clima • Cena Especial)" },
              { id: "int_tease_edge", tone: "ctrl", label: "😈 [Provocar o Limite] Sussurrar no ouvido dela e segurar a tensão só pra vê-la corada (+22 Tensão Dela • +14 Influência • -16 Armadura)" }
            ]
          };
        }
      });
    }

    // Mescla todas as ações de Manipulação Emocional, Inversão, Corrupção, Resgate & Drinks do Motor Emocional (v8)
    if (AG.EmotionEngine && AG.EmotionEngine.getEmotionalManipulationActions) {
      AG.EmotionEngine.getEmotionalManipulationActions().forEach((ea) => list.push(ea));
    }

    return list;
  };

  // ==========================================================================
  // OS 4 MINIGAMES INTERATIVOS PARA OCASIÕES ESPECÍFICAS
  // ==========================================================================
  AG.startMinigame = function (gameType) {
    AG.playSound("click");
    if (gameType === "corridor_wiring") {
      // Minigame 1: Alinhar os 3 conectores da caixa alta na sequência certa
      const targetSeq = ["Azul (402)", "Cinza (404 Fibra)", "Terra (Filtro)"];
      AG.state.activeMinigame = {
        type: "corridor_wiring",
        title: "⚡ Minigame: Caixa Alta do 4º Andar",
        desc: "A Aurora está segurando a lanterna lá embaixo! Conecte os 3 cabos na ordem exata de sinal: 1º Azul (402) → 2º Cinza (404 Fibra) → 3º Terra (Filtro).",
        step: 0,
        targetSeq,
        options: ["Cinza (404 Fibra)", "Azul (402)", "Terra (Filtro)"]
      };
    } else if (gameType === "cafe_sakura_rush") {
      // Minigame 2: Montar o pedido especial do Café Sakura
      AG.state.activeMinigame = {
        type: "cafe_sakura_rush",
        title: "☕ Minigame: Rush no Balcão do Café Sakura",
        desc: "A fila lotou e a Aurora pediu sua ajuda! Monte o combo VIP na sequência certa: 1º Café Gelado Baunilha → 2º Mochi de Morango → 3º Laço Rosa na Embalagem.",
        step: 0,
        targetSeq: ["🧋 Café Gelado Baunilha", "🍓 Mochi de Morango", "🎀 Laço Rosa na Embalagem"],
        options: ["🍓 Mochi de Morango", "🎀 Laço Rosa na Embalagem", "🧋 Café Gelado Baunilha"]
      };
    } else if (gameType === "aurora_duel_bet") {
      // Minigame 3: Duelo de Reflexo & Blefe contra a Aurora (Melhor de 3!)
      const moves = ["⚡ Ataque Rápido", "🌀 Finta Provocante", "🛡️ Contra-Ataque"];
      const nextAuroraMove = moves[Math.floor(Math.random() * moves.length)];
      const skPerc = (AG.state.player && AG.state.player.skills && AG.state.player.skills.perception) || 12;
      AG.state.activeMinigame = {
        type: "aurora_duel_bet",
        title: "🎮 Minigame: Duelo da Madrugada (Valendo Aposta!)",
        desc: "Vença 2 rodadas! (Ataque Rápido vence Finta • Finta vence Contra-Ataque • Contra-Ataque vence Ataque Rápido)." +
          (skPerc >= 16 ? ` 👁️ [Percepção ${skPerc}]: Pelo olhar dela, ela pretende usar ${nextAuroraMove}!` : ""),
        playerScore: 0,
        auroraScore: 0,
        round: 1,
        nextAuroraMove
      };
    } else if (gameType === "stealth_sleep_snoop") {
      // Minigame 4: Pulso Firme Furtivo enquanto ela dorme
      const skStealth = (AG.state.player && AG.state.player.skills && AG.state.player.skills.stealth) || 12;
      AG.state.activeMinigame = {
        type: "stealth_sleep_snoop",
        title: "🤫 Minigame Furtivo: Não Acorde a Aurora",
        desc: "Ela está dormindo a um metro de você! Escolha o movimento silencioso correto em 2 etapas." +
          (skStealth >= 18 ? ` 🤫 [Furtividade ${skStealth}]: Seus reflexos permitem salvar até 1 deslize de barulho!` : ""),
        step: 0,
        savedSlipOnce: false
      };
    } else if (gameType === "tablet_password_crack") {
      // Minigame 5: Decifrar a Senha do Tablet Gráfico do 404 usando as pistas da Aurora
      AG.state.activeMinigame = {
        type: "tablet_password_crack",
        title: "🔓 Minigame: Decifrar Senha do Tablet Gráfico (Apê 404)",
        desc: "Use sua Percepção e o que você sabe sobre a Aurora para acertar os 3 blocos da senha pessoal dela sem disparar alerta!",
        step: 0,
        targetSeq: ["149 (Altura dela em cm)", "404 (Número do Apê)", "Baunilha (Café favorito)"],
        options: ["149 (Altura dela em cm)", "404 (Número do Apê)", "Baunilha (Café favorito)"]
      };
    }
  };

  AG.handleMinigameChoice = function (choiceVal) {
    const s = AG.state;
    const mg = s.activeMinigame;
    if (!mg) return;

    // MINIGAME 1, 2 & 5 (Sequência de Precisão / Senha do Tablet)
    if (mg.type === "corridor_wiring" || mg.type === "cafe_sakura_rush" || mg.type === "tablet_password_crack") {
      const expected = mg.targetSeq[mg.step];
      if (choiceVal === expected) {
        AG.playSound("heart");
        mg.step += 1;
        if (mg.step >= mg.targetSeq.length) {
          s.activeMinigame = null;
          AG.advanceTime(20, { suppressRandom: true });
          AG.clearFeed();
          if (mg.type === "corridor_wiring") {
            const pills = AG.applyDeltas({ affinity: 16, trust: 14, calm: 10, tech: 4, mood: "espontanea" });
            AG.unlockAuroraPhoneNumber("Impressionou a Aurora consertando a caixa alta do corredor e ela salvou o número no seu celular.");
            AG.pushFeed({
              type: "aurora",
              action: "*Bate palminhas empolgada quando a luz verde estabiliza e pega seu celular pra anotar o número dela*",
              speech: "Mandou muito bem, grandão! Já deixei meu número salvo aí no seu celular pra você me socorrer sempre que der pane!",
              pills
            });
          } else if (mg.type === "cafe_sakura_rush") {
            const pills = AG.applyDeltas({ money: 65, affinity: 16, heat: 12, charisma: 3, mood: "dengosa", specialScene: "uniformeProvocante" });
            AG.pushFeed({
              type: "aurora",
              action: "*Tira o avental do uniforme nos fundos do Café Sakura e te puxa pra perto radiante*",
              speech: "Você arrasou no balcão comigo! Dividi R$ 65 das gorjetas com você... e agora você merece um agradecimento particular nos bastidores.",
              pills
            });
          } else if (mg.type === "tablet_password_crack") {
            s.unlocks.hasAuroraNumber = true;
            s.unlocks.unlockedSpyApp = true;
            s.phoneState.leverage = (s.phoneState.leverage || 0) + 2;
            if (AG.unlockSecret) AG.unlockSecret("rascunho_secreto_sketch");
            const pills = AG.applyDeltas({ tech: 5, perception: 4, stealth: 3 });
            AG.pushFeed({
              type: "narrative",
              text: "Senha decifrada (149-404-Baunilha). Você acessou a pasta oculta de rascunhos do tablet dela e guardou tudo sem deixar um único vestígio.",
              pills
            });
          }
        }
      } else {
        AG.playSound("warn");
        s.activeMinigame = null;
        AG.advanceTime(15, { suppressRandom: true });
        const pills = AG.applyDeltas({ calm: -8, suspicion: mg.type === "tablet_password_crack" ? 15 : 0 });
        AG.clearFeed();
        AG.pushFeed({
          type: "narrative",
          text: "⚠️ Sequência incorreta! Você precisou abortar a tentativa antes de travar o sistema.",
          pills
        });
      }
    }

    // MINIGAME 3 (Duelo de Aposta contra a Aurora)
    else if (mg.type === "aurora_duel_bet") {
      const moves = ["⚡ Ataque Rápido", "🌀 Finta Provocante", "🛡️ Contra-Ataque"];
      const auroraMove = mg.nextAuroraMove || moves[Math.floor(Math.random() * moves.length)];
      let roundResult = "loss";
      if (
        (choiceVal === "⚡ Ataque Rápido" && auroraMove === "🌀 Finta Provocante") ||
        (choiceVal === "🌀 Finta Provocante" && auroraMove === "🛡️ Contra-Ataque") ||
        (choiceVal === "🛡️ Contra-Ataque" && auroraMove === "⚡ Ataque Rápido")
      ) {
        roundResult = "win";
        mg.playerScore += 1;
      } else if (choiceVal === auroraMove) {
        roundResult = "tie";
      } else {
        roundResult = "loss";
        mg.auroraScore += 1;
      }
      mg.round += 1;
      mg.nextAuroraMove = moves[Math.floor(Math.random() * moves.length)];
      const skPerc = (s.player && s.player.skills && s.player.skills.perception) || 12;
      const hintNext = skPerc >= 16 ? ` (👁️ Percepção: na próxima ela deve tentar ${mg.nextAuroraMove})` : "";
      mg.lastLog = `Você usou ${choiceVal} vs Aurora (${auroraMove}) → ${
        roundResult === "win" ? "Ponto seu!" : roundResult === "tie" ? "Empate (ninguém pontuou)!" : "Ponto dela!"
      }${hintNext}`;

      if (mg.playerScore >= 2 || mg.auroraScore >= 2) {
        const won = mg.playerScore >= 2;
        s.activeMinigame = null;
        AG.advanceTime(25, { suppressRandom: true, keepSpecialScene: true });
        AG.clearFeed();
        if (won) {
          AG.playSound("hot");
          AG.unlockAuroraPhoneNumber("Ganhou o número da Aurora vencendo uma aposta no duelo da madrugada.");
          const pills = AG.applyDeltas({ affinity: 14, heat: 18, desire: 12, perception: 3, mood: "provocante", specialScene: "chamego" });
          AG.pushFeed({
            type: "aurora",
            action: "*Larga o controle no sofá indignada mas corada, cumprindo a aposta prometida*",
            speech: "Não acredito que você ganhou de mim! Tá bom, aposta é aposta: já passei meu número e você tem direito a um pedido especial meu agora!",
            pills
          });
        } else {
          AG.playSound("click");
          const pills = AG.applyDeltas({ dominance: 18, heat: 12, mood: "controladora", specialScene: "controle" });
          AG.pushFeed({
            type: "aurora",
            action: "*Aponta o controle pra você com um sorriso vitorioso de rainha*",
            speech: "GANHEI! Perdeu a aposta, agora você vai ter que fazer exatamente o que eu mandar pelo resto da noite!",
            pills
          });
        }
      }
    }

    // MINIGAME 4 (Furtividade enquanto ela dorme — com salvamento de deslize se Furtividade >= 18)
    else if (mg.type === "stealth_sleep_snoop") {
      const skStealth = (s.player && s.player.skills && s.player.skills.stealth) || 12;
      const savedByStealth = (choiceVal !== "safe" && skStealth >= 18 && !mg.savedSlipOnce);
      if (savedByStealth) {
        mg.savedSlipOnce = true;
      }

      if (choiceVal === "safe" || savedByStealth) {
        AG.playSound("click");
        mg.step += 1;
        if (mg.step >= 2) {
          s.activeMinigame = null;
          s.unlocks.hasAuroraNumber = true;
          s.unlocks.unlockedSpyApp = true;
          s.phoneState.leverage += 2;
          s.phoneState.tracksRisk = AG.clamp(s.phoneState.tracksRisk + 15, 0, 100);
          if (!s.phoneState.unlockedPhotos.includes("Cena Celular Foto Secreta PNG.png")) {
            s.phoneState.unlockedPhotos.push("Cena Celular Foto Secreta PNG.png");
          }
          const pills = AG.applyDeltas({ stealth: 4, perception: 3 });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "🤫 Sucesso Furtivo! Sem acordar a Aurora, você desbloqueou o aparelho dela, pegou o número pessoal, liberou a Foto Secreta e coletou +2 Trunfos de Manipulação!",
            pills
          });
        }
      } else {
        // Fez barulho e acordou ela!
        AG.playSound("warn");
        s.activeMinigame = null;
        s.aurora.activity = "no_corredor_celular";
        const pills = AG.applyDeltas({ affinity: -26, discomfort: 38, trust: -22, suspicion: 30, mood: "irritada" });
        AG.addMemory("flagrado_vasculhando_dormindo", "Fez barulho vasculhando as coisas da Aurora enquanto ela dormia e foi pego no flagra.", "ruim", true);
        AG.clearFeed();
        AG.pushFeed({
          type: "aurora",
          action: "*Acorda com o barulho da gaveta/mesa e flagra você mexendo nas coisas pessoais dela*",
          speech: "O que você tá fazendo mexendo nas minhas coisas enquanto eu durmo?! Você não tem limite nenhum?!",
          pills
        });
      }
    }
  };

  // ==========================================================================
  // AÇÕES DO AMBIENTE & ROTINA (Desempacotar Mochila no 402, Trabalho, etc.)
  // ==========================================================================
  AG.getLocationActions = function () {
    const s = AG.state;
    const p = s.player;
    const a = s.aurora;
    const loc = s.currentLocation;
    const auroraHere = AG.isAuroraHere();
    const actions = [];

    if (loc === "ape_402") {
      // 1. Desempacotar Caixas da Mudança (Libera a Mochila na 1ª caixa!)
      if (p.boxesUnpacked < 3) {
        actions.push({
          id: "unpack_box_402",
          title: p.boxesUnpacked === 0
            ? "📦 Abrir 1ª Caixa da Mudança (Encontra sua Mochila e Pertences • 25m)"
            : `📦 Desempacotar Caixa da Mudança (${p.boxesUnpacked + 1}/3 • 25m)`,
          tone: "sweet",
          onRun: function () {
            AG.playSound("heart");
            p.boxesUnpacked += 1;
            AG.advanceTime(25);
            AG.clearFeed();
            if (p.boxesUnpacked === 1) {
              s.unlocks.hasUnpackedBackpack = true;
              if (s.flags.gavePrologueCoffee) {
                s.inventory.push({
                  id: "energetico_pessego",
                  name: "🍑 Energético Rosa de Pêssego",
                  qty: 1,
                  desc: "Uma lata reserva que estava guardada na sua mochila da mudança."
                });
                AG.pushFeed({
                  type: "narrative",
                  text: "🎒 Você abriu a primeira caixa da mudança e encontrou sua Mochila Pessoal (com um Energético Rosa de Pêssego dentro)! O botão '🎒 Mochila' agora está disponível no topo."
                });
              } else {
                s.inventory.push({
                  id: "cafe_gelado_lata",
                  name: "🧋 Café Gelado de Baunilha",
                  qty: 1,
                  desc: "Uma lata fechada que veio na sua mochila da mudança."
                });
                AG.pushFeed({
                  type: "narrative",
                  text: "🎒 Você abriu a primeira caixa da mudança e encontrou sua Mochila Pessoal (com uma lata de Café Gelado dentro)! O botão '🎒 Mochila' agora está disponível no topo."
                });
              }
            } else if (p.boxesUnpacked === 2) {
              const pills = AG.applyDeltas({ calm: 10 });
              AG.pushFeed({
                type: "narrative",
                text: "🖥️ Você montou seu segundo monitor e organizou sua bancada de código! Seus freelas agora rendem mais.",
                pills
              });
            } else {
              const pills = AG.applyDeltas({ money: 45, calm: 12 });
              AG.pushFeed({
                type: "narrative",
                text: "✨ Última caixa desempacotada! Você ainda achou R$ 45 guardados num casaco e deixou seu Apê 402 impecável.",
                pills
              });
            }
          }
        });
      }

      actions.push({
        id: "work_freela",
        title: "💻 Trabalhar num Projeto de Freela (3h • +R$)",
        tone: "life",
        disabled: p.energy < 18,
        onRun: function () {
          AG.playSound("click");
          const bonus = p.boxesUnpacked >= 2 ? 25 : 0;
          const earned = 75 + bonus + Math.floor(Math.random() * 35) + (p.storyChapter * 10);
          p.workProgress += 1;
          if (p.workProgress % 3 === 0) p.storyChapter += 1;
          AG.advanceTime(180);
          const pills = AG.applyDeltas({ money: earned, energy: -16, calm: -4 });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: `Você trabalhou focado por 3h e recebeu R$ ${earned}.`, pills });
        }
      });

      actions.push({
        id: "sleep_402",
        title: "🛌 Dormir e Recuperar Energia (7h)",
        tone: "life",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(420, { isSleeping: true });
          const pills = AG.applyDeltas({ energy: 78, calm: 16, desire: 8 });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Você dormiu bem no seu quarto e acordou pronto para um novo turno.", pills });
        }
      });

      actions.push({
        id: "eat_402",
        title: "🍳 Preparar Refeição na Cozinha (40m • -R$ 15 • +48 Saciedade)",
        tone: "life",
        disabled: p.money < 15,
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(40);
          const pills = AG.applyDeltas({ money: -15, satiety: 48, energy: 6 });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Você cozinhou e matou a fome no 402.", pills });
        }
      });

      actions.push({
        id: "solo_relief_402",
        title: "🌶️ Aliviar Tensão/Desejo Sozinho no Quarto (45m • -55 Desejo • Afasta foco dela)",
        tone: "risky",
        disabled: p.desire < 20,
        onRun: function () {
          AG.playSound("click");
          p.soloReliefCount += 1;
          AG.advanceTime(45);
          const pills = AG.applyDeltas({ desire: -55, calm: 10, energy: -8, affinity: -4, heat: -6 });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Você aliviou sua tensão física sozinho no 402. A urgência passou, mas esfriou um pouco seu ímpeto de buscar a Aurora.",
            pills
          });
        }
      });

      actions.push({
        id: "inspect_wall_402",
        title: "👂 Ouvir através da parede divisória do 404 (15m • +2 Percepção)",
        tone: "sweet",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(15);
          const pills = AG.applyDeltas({ perception: 2 });
          const auroraLoc = AG.getAuroraCurrentLocation();
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: auroraLoc === "ape_404"
              ? "Você ouve os passos leves dela do outro lado da parede. Ela está em casa no 404!"
              : `Silêncio no 404. Pelo horário, ela está em: ${AG.LOCATIONS[auroraLoc].shortName}.`,
            pills
          });
        }
      });

      actions.push({
        id: "mirror_practice_charisma",
        title: "🪞 Treinar Lábia, Postura & Persuasão no Espelho (30m • +5 Lábia)",
        tone: "ctrl",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(30);
          const pills = AG.applyDeltas({ charisma: 5, calm: 6 });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Você treinou seu tom de voz, olhar e repertório no espelho do 402. Sua capacidade de persuadir, blefar ou conquistar a Aurora ficou mais afiada.",
            pills
          });
        }
      });

      actions.push({
        id: "study_stealth_tech_402",
        title: "🛡️ Estudar Segurança Digital & Discrição no PC (40m • +5 Furtividade • +4 Código)",
        tone: "ctrl",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(40);
          const pills = AG.applyDeltas({ stealth: 5, tech: 4, energy: -6 });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Você aprimorou suas técnicas para não deixar rastros digitais nem pistas físicas pelo prédio.",
            pills
          });
        }
      });

      actions.push({
        id: "window_neutral_reflect",
        title: "🪟 Olhar a Rua na Janela & Pensar na Vida (10m • Ação Contemplativa • +8 Calma)",
        desc: "Ação neutra de roleplay para passar alguns minutos e acalmar a mente.",
        tone: "life",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(10);
          const pills = AG.applyDeltas({ calm: 8 });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Você ficou alguns minutos observando o vento nas árvores da rua lá embaixo, apenas respirando e organizando os próprios pensamentos.",
            pills
          });
        }
      });

      actions.push({
        id: "notebook_plan_strategy",
        title: "📓 Escrever & Analisar Estratégia no Seu Caderno de Planos (15m • +4 Percepção)",
        desc: "Analisa friamente o estado psicológico da Aurora, seus trunfos e o caminho mais rápido para cada objetivo.",
        skillHint: "+4 👁️ Percepção + Diagnóstico Tático",
        tone: "ctrl",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(15, { suppressRandom: true });
          const pills = AG.applyDeltas({ perception: 4, calm: 5 });
          const numHint = s.unlocks.hasAuroraNumber
            ? "✅ Número dela salvo."
            : `⏳ Para pedir o número dela: Afinidade ${a.affinity}/18 ou Clima ${a.heat}/22 (Atrito atual: ${a.discomfort}/28).`;
          const keyHint = s.unlockedLocations.includes("ape_404")
            ? "✅ Acesso ao Apê 404 liberado."
            : `⏳ Para entrar no 404: Afinidade ${a.affinity}/42, Clima ${a.heat}/45, Controle ${a.dominance}/45 ou procure a Chave Reserva no corredor com Furtividade 15+.`;
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: `📓 DIAGNÓSTICO DO SEU CADERNO: ${numHint} | ${keyHint} | Suspeita atual dela: ${a.suspicion || 0}% | Trunfos no celular: ${(s.phoneState && s.phoneState.leverage) || 0}.`,
            pills
          });
        }
      });

      actions.push({
        id: "cook_bento_for_aurora",
        title: "🍱 Preparar Marmita Caseira & Café Especial para Levar pra Aurora (35m • -R$ 16)",
        desc: "Prepara na sua cozinha um mimo caseiro único que vai direto para sua Mochila.",
        tone: "sweet",
        disabled: p.money < 16,
        onRun: function () {
          AG.playSound("heart");
          s.unlocks.hasUnpackedBackpack = true;
          AG.advanceTime(35);
          const pills = AG.applyDeltas({ money: -16, calm: 6 });
          const existing = s.inventory.find((i) => i.id === "marmita_caseira_402");
          if (existing) existing.qty += 1;
          else s.inventory.push({
            id: "marmita_caseira_402",
            name: "🍱 Marmita Caseira & Café Especial do 402",
            qty: 1,
            desc: "Preparado por você na cozinha do 402 especialmente para a Aurora."
          });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "🍱 Você preparou uma marmita quentinha e um café especial com todo capricho e guardou na Mochila para entregar à Aurora!",
            pills
          });
        }
      });

      // Se você estiver carregando pertences pegos da Aurora ('carried'), pode trancá-los na Gaveta Secreta do 402 para nunca ser descoberto!
      const carriedItems = s.belongings ? Object.values(s.belongings).filter((b) => b.state === "carried") : [];
      if (carriedItems.length > 0) {
        actions.push({
          id: "lock_stolen_items_402",
          title: `🗄️ Trancar Pertences da Aurora (${carriedItems.length}) na Gaveta Secreta do 402 (10m • 0% Risco de Flagra!)`,
          tone: "ctrl",
          onRun: function () {
            AG.playSound("click");
            carriedItems.forEach((b) => { b.state = "hidden_in_402"; });
            AG.advanceTime(10, { suppressRandom: true });
            const pills = AG.applyDeltas({ stealth: 4, suspicion: -15 });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "🗄️ Você guardou os pertences e provas do 404 na sua gaveta trancada a chave! Mesmo que a Aurora visite seu apartamento, ela jamais descobrirá.",
              pills
            });
          }
        });
      }

      if (!auroraHere) {
        actions.push({
          id: "plot_wager_trap_402",
          title: "🎲 [Estratégia & Blefe] Planejar uma Aposta Ousada Irresistível contra a Aurora (20m • +3 Lábia)",
          desc: "Prepara o terreno e estuda os pontos fracos competitivos da Aurora para vencer a próxima Aposta de Tudo ou Nada com folga.",
          skillHint: "+3 🗣️ Lábia, +2 👁️ Percepção e +6 de bônus na próxima Aposta Ousada",
          tone: "ctrl",
          onRun: function () {
            AG.playSound("click");
            s.flags.preparedWager = true;
            AG.advanceTime(20, { suppressRandom: true });
            const pills = AG.applyDeltas({ charisma: 3, perception: 2, influence: 6 });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "🎲 Você anotou cada cacoete de blefe da Aurora e bolou uma armadilha perfeita de orgulho para a próxima aposta entre vocês (+6 de bônus garantido no próximo desafio!).",
              pills
            });
          }
        });

        if (["ape_404", "corredor_4andar"].includes(AG.getAuroraCurrentLocation()) && a.activity !== "dormindo") {
          actions.push({
            id: "rename_wifi_provoke_402",
            title: "📡 [Provocação Digital] Renomear o Wi-Fi do Seu Apê para '404_Nao_Alcanca_A_Prateleira' (15m)",
            desc: "Uma provocação pública impagável no 4º andar que faz ela marchar direto para a sua porta fervendo de espírito competitivo!",
            skillHint: "+14% Rivalidade, +10 Clima e traz a Aurora até o 402 na hora",
            tone: "hot",
            onRun: function () {
              AG.playSound("hot");
              AG.advanceTime(15, { suppressRandom: true });
              s.flags.auroraVisitingYourApt = true;
              s.flags.auroraCalledToCorridor = false;
              s.flags.auroraIn404WithPlayer = false;
              AG.refreshAuroraActivity();
              const pills = AG.applyDeltas({ rivalry: 14, heat: 10, influence: 8, tech: 2, personaBold: 3, mood: "provocante" });
              AG.clearFeed();
              AG.pushFeed({
                type: "aurora",
                action: "*Bate na porta do seu Apê 402 segundos depois com o celular na mão mostrando a lista de redes Wi-Fi, bufando mas segurando o riso*",
                speech: "'404_Nao_Alcanca_A_Prateleira'?! VOCÊ É UM PÉSSIMO VIZINHO, 402!! Abre essa porta agora que eu vou te dar o troco ao vivo!",
                pills
              });
            }
          });
        }

        actions.push({
          id: "plant_fake_bait_402",
          title: "🪝 [Psicologia Indireta] Deixar uma Isca Falsa na Sua Mesa para Flagrar a Aurora Bisbilhotando (15m)",
          desc: "Deixa uma folha provocante aberta de propósito no 402 e encosta a porta — se ela morder a isca, você flagra ela em flagrante!",
          skillHint: "Ativa a armadilha 'Isca Mordida' na próxima vez que ela estiver por perto (+3 Furtividade)",
          tone: "ctrl",
          onRun: function () {
            AG.playSound("click");
            s.flags.plantedFakeBait = true;
            AG.advanceTime(15, { suppressRandom: true });
            const pills = AG.applyDeltas({ stealth: 3, influence: 6, personaCold: 3 });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "🪝 Você posicionou um rascunho falso chamativo bem no centro da sua escrivaninha e deixou a porta encostada de propósito. Agora é só esperar a curiosidade dela falar mais alto!",
              pills
            });
          }
        });
      }

      actions.push({
        id: "podcast_social_402",
        title: "🎧 Ouvir Podcast de Comunicação & Leitura Emocional (25m • +3 Lábia • +3 Percepção)",
        desc: "Treina leitura corporal e carisma sem gastar dinheiro enquanto relaxa no 402.",
        tone: "ctrl",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(25);
          const pills = AG.applyDeltas({ charisma: 3, perception: 3, calm: 6 });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "Você ouviu um episódio inteiro sobre linguagem corporal, escuta ativa e timing — anotando duas técnicas novas pra usar nas próximas conversas no 4º andar.",
            pills
          });
        }
      });

      if (auroraHere && a.activity !== "dormindo") {
        actions.push({
          id: "coop_sofa_402",
          title: "🎮 Convidar a Aurora pra Jogar Coop no Seu Sofá (35m • +Intimidade • +Afinidade)",
          desc: "Dois controles, risadas e ombros encostados na sala do 402.",
          tone: "sweet",
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(35, { keepSpecialScene: true });
            const pills = AG.applyDeltas({ affinity: 16, intimacyLevel: 10, trust: 10, calm: 10, rivalry: 6, mood: "euforica", specialScene: "chamego" });
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              playerBeat: "Você joga o segundo controle no colo dela, apaga a luz forte da sala e provoca: — Se você morrer antes de mim nessa fase, o próximo café é por sua conta.",
              action: "*Aurora puxa as pernas pro sofá colando o ombro no seu, totalmente focada na tela e rindo cada vez que vocês quase perdem juntos*",
              speech: "OLHA O CHEFE VINDO PELA DIREITA, 402!! ...Passamos de primeira?! Vem cá dar um abraço de vitória agora porque a nossa dupla é invencível!",
              pills
            });
          }
        });

        actions.push({
          id: "slow_dance_lofi_402",
          title: "🎵 Colocar Lo-Fi na Caixa de Som e Puxar Ela pra Dançar Devagar na Sala (20m)",
          desc: "Um momento íntimo e cinematográfico de rosto colado na meia-luz do 402.",
          tone: "hot",
          onRun: function () {
            AG.playSound("hot");
            AG.advanceTime(20, { keepSpecialScene: true });
            const pills = AG.applyDeltas({ affinity: 14, intimacyLevel: 14, heat: 14, arousal: 12, trust: 10, vulnerability: 12, mood: "dengosa", specialScene: "chamego" });
            AG.addMemory("danca_lofi_402", "Dançaram devagar na meia-luz da sala do 402 ouvindo lo-fi com a cabeça dela apoiada no seu peito.", "bom", true);
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              playerBeat: "Você coloca uma faixa lenta tocando baixo, estende a mão no meio da sala e puxa ela devagar pela cintura até o rosto dela encostar na altura do seu peito.",
              action: "*Ela ri tímida no primeiro segundo, mas logo fecha os olhos enlaçando o seu pescoço enquanto vocês balançam sem pressa nenhuma*",
              speech: "Quem diria que o vizinho programador do 402 ia me puxar pra dançar no meio da sala... meu coração tá batendo junto com o seu agora.",
              pills
            });
          }
        });
      }

      actions.push({
        id: "choose_player_approach_402",
        title: `🎭 [Escolha do Personagem] Definir Sua Postura Psicológica Ativa (Atual: ${AG.PLAYER_APPROACHES[p.activeApproach || "natural"].label})`,
        desc: "Define como o seu protagonista age e fala com a Aurora, concedendo bônus reais nos atributos e moldando quem você está se tornando.",
        tone: "ctrl",
        onRun: function () {
          AG.playSound("click");
          s.activeRandomEvent = {
            id: "scene_choose_approach",
            title: "🎭 ESCOLHA DO SEU PERSONAGEM: Qual Postura Você Vai Adotar Agora?",
            desc: `Seu perfil atual é ${AG.getPlayerPersonaLabel()}. Escolha a postura psicológica que vai guiar suas próximas ações e bônus:`,
            choices: [
              { id: "stance_calculista", tone: "ctrl", label: "🧊 Frio & Calculista (+25% Influência, -25% Suspeita, derruba Armadura dela mais rápido)" },
              { id: "stance_provocador", tone: "hot", label: "😈 Provocador Audacioso (+20% Clima Quente e +20% Rivalidade nas jogadas)" },
              { id: "stance_implacavel", tone: "risky", label: "🐍 Oportunista & Chantagista (+25% Pressão nas chantagens do Dossiê e +25% Influência)" },
              { id: "stance_protetor", tone: "sweet", label: "💗 Protetor & Charmoso (+20% Afinidade e Confiança, apaga Atrito mais rápido)" }
            ]
          };
        }
      });
    }

    if (loc === "corredor_4andar") {
      if (!auroraHere && AG.getAuroraCurrentLocation() === "ape_404") {
        actions.push({
          id: "knock_404",
          title: "✊ Bater na porta do 404 para chamar a Aurora (10m)",
          tone: "sweet",
          onRun: function () {
            AG.playSound("click");
            AG.advanceTime(10);
            AG.clearFeed();
            if (a.activity === "dormindo") {
              AG.pushFeed({ type: "narrative", text: "Você bateu de leve na porta do 404, mas lá dentro está tudo no silêncio absoluto — ela deve estar dormindo agora." });
            } else if (a.dynamic === "afastados" || (a.discomfort >= 70 && a.dominance < 45)) {
              const pills = AG.applyDeltas({ discomfort: 8 });
              AG.pushFeed({ type: "narrative", text: "Ela olhou pelo olho mágico, viu que era você e não abriu a porta.", pills });
            } else {
              s.flags.auroraCalledToCorridor = true;
              s.flags.auroraVisitingYourApt = false;
              s.flags.auroraIn404WithPlayer = false;
              AG.refreshAuroraActivity();
              AG.pushFeed({
                type: "aurora",
                action: "*Abre a porta do 404 e olha de baixo pra cima pra você*",
                speech: "Opa! Chamou a moradora do 404? O que manda, vizinho?"
              });
            }
          }
        });
      }

      if (auroraHere && a.activity !== "dormindo") {
        if (s.sharedStory.unlocked404Key || s.unlockedLocations.includes("ape_404")) {
          actions.push({
            id: "corridor_enter_404_together",
            title: "Entrar juntos no Apê 404 (5m)",
            desc: "Vocês saem do corredor e entram juntos no cantinho particular dela.",
            tone: "sweet",
            onRun: function () {
              AG.playSound("heart");
              s.flags.auroraIn404WithPlayer = true;
              s.flags.auroraCalledToCorridor = false;
              s.flags.auroraVisitingYourApt = false;
              s.currentLocation = "ape_404";
              s.activeConversationNode = null;
              AG.advanceTime(5, { suppressRandom: true });
              AG.clearFeed();
              AG.pushFeed({
                type: "aurora",
                action: "*Destranca a porta do 404 e puxa você pela manga pra dentro antes de fechar atrás de vocês*",
                speech: "Vem, entra logo — aqui dentro a gente conversa bem mais à vontade do que nesse corredor."
              });
            }
          });
        }

        if (a.affinity >= 18 || a.heat >= 25 || a.trust >= 20) {
          actions.push({
            id: "corridor_invite_402_together",
            title: "Puxar ela pra entrar com você no seu Apê 402 (5m)",
            desc: "Convida a Aurora direto do corredor para o seu apartamento.",
            tone: "hot",
            onRun: function () {
              AG.playSound("heart");
              s.flags.auroraVisitingYourApt = true;
              s.flags.auroraCalledToCorridor = false;
              s.flags.auroraIn404WithPlayer = false;
              s.currentLocation = "ape_402";
              s.activeConversationNode = null;
              AG.advanceTime(5, { suppressRandom: true });
              const pills = AG.applyDeltas({ affinity: 6, heat: 6 });
              AG.clearFeed();
              AG.pushFeed({
                type: "aurora",
                action: "*Atravessa os poucos passos até a porta do 402 com um sorriso cúmplice e entra no seu espaço*",
                speech: "Já que o dono do 402 tá convidando pessoalmente... fecha essa porta aí que eu vou invadir seu sofá.",
                pills
              });
            }
          });
        }

        const corrSpicyGate = AG.Gates ? AG.Gates.check("spicy_location_move") : { ok: false, missing: "" };
        actions.push({
          id: "corridor_pin_door_spicy",
          title: "Encostar ela perto da porta do 404 antes do elevador chegar (15m)",
          desc: corrSpicyGate.ok ? "Clima pronto — tensão elétrica a centímetros da porta dela." : `Falta: ${corrSpicyGate.missing}`,
          tone: "hot",
          onRun: function () {
            AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
            AG.clearFeed();
            const gate = AG.Gates ? AG.Gates.check("spicy_location_move") : corrSpicyGate;
            if (gate.ok) {
              AG.playSound("hot");
              const pills = AG.applyDeltas({ heat: 18, arousal: 18, intimacyLevel: 10, desire: 12, composure: -14, personaBold: 3, mood: "excitada_tensa", specialScene: "paredeCorredor" });
              AG.pushFeed({
                type: "aurora",
                playerBeat: "Você fecha o espaço no corredor sem aviso, apoia uma mão na parede perto do ombro dela e inclina o rosto até a respiração quente se misturar — bem quando o cabo do elevador dá um estalo lá embaixo.",
                action: "Aurora prende o ar com as costas encostadas perto da porta do 404, agarrando a barra da sua camisa com as duas mãos pequenas e os olhos arregalados de adrenalina pura.",
                speech: "Você perdeu o juízo de vez, 402?! Qualquer vizinho pode sair daquele elevador a qualquer segundo...\n\n...E por que é que o risco de alguém aparecer só tá fazendo meu coração bater ainda mais forte? Me beija rápido antes que a porta abra ou me puxa logo pra dentro!",
                pills
              });
            } else {
              AG.playSound("warn");
              const pills = AG.applyDeltas({ discomfort: gate.code === "bond" ? 6 : 16, affinity: gate.code === "bond" ? -2 : -10, mood: "irritada" });
              AG.pushFeed({
                type: "aurora",
                action: "*Apoia as mãos no seu peito mantendo a distância com firmeza*",
                speech: `Ei, calma lá! Aqui no meio do corredor ainda falta clima pra isso (${gate.missing}). Dá um passo pra trás, 402.`,
                pills
              });
            }
          }
        });

        actions.push({
          id: "corridor_help_packages",
          title: "📦 Ajudar a Aurora a carregar encomendas pesadas até a porta do 404 (15m)",
          desc: "Usa sua força e altura pra poupar ela das caixas grandes (+Afinidade, +Confiança, +Intimidade).",
          tone: "sweet",
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(15);
            const pills = AG.applyDeltas({ affinity: 14, trust: 12, intimacyLevel: 7, discomfort: -8, energy: -4, mood: "alegre" });
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Solta as caixas nos seus braços aliviada e anda do seu lado segurando só a sacola leve*",
              speech: "Essas caixas eram literalmente metade da minha altura! Valeu demais por salvar meus braços de novo, vizinho!",
              pills
            });
          }
        });
      }

      actions.push({
        id: "laundry_corridor",
        title: "🧺 Usar a máquina de lavar do andar (35m • +8 Calma)",
        tone: "life",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(35);
          const pills = AG.applyDeltas({ calm: 8 });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Você cuidou das suas roupas na lavanderia compartilhada do 4º andar.", pills });
        }
      });

      if (!s.unlocks.hasSpareKey404 && !auroraHere) {
        actions.push({
          id: "search_spare_key_corridor",
          title: "🗝️ [Furtivo] Procurar Chave Reserva do 404 Escondida no Batente/Vaso (15m)",
          tone: "ctrl",
          onRun: function () {
            const sk = (p.skills && p.skills.stealth) || 12;
            AG.advanceTime(15, { suppressRandom: true });
            AG.clearFeed();
            if (sk >= 15 || Math.random() < 0.65) {
              AG.playSound("heart");
              s.unlocks.hasSpareKey404 = true;
              if (s.belongings && s.belongings.spareKey404) s.belongings.spareKey404.state = "hidden_in_402";
              AG.checkHubAndStoryProgression();
              const pills = AG.applyDeltas({ stealth: 4, perception: 3 });
              AG.pushFeed({
                type: "narrative",
                text: "🗝️ Com discrição cirúrgica, você encontrou a chave reserva que ela esconde embaixo do vaso perto da porta! Agora você pode entrar no Apê 404 até quando ela estiver fora trabalhando (12h–17h) sem ela jamais saber!",
                pills
              });
            } else {
              AG.playSound("warn");
              const pills = AG.applyDeltas({ stealth: 2, suspicion: 10 });
              AG.pushFeed({
                type: "narrative",
                text: "Você procurou rápido pelo batente, mas ouviu passos na escada e recuou para não levantar suspeita (+2 Furtividade por praticar).",
                pills
              });
            }
          }
        });
      }

      if (!auroraHere && AG.getAuroraCurrentLocation() === "ape_404" && a.activity !== "dormindo") {
        actions.push({
          id: "post_dare_door_404",
          title: "🚪 [Provocação no Corredor] Colar um 'Cartão de Desafio do 402' na Porta do 404 (15m)",
          desc: "Cola um desafio irônico bem na altura do olho mágico dela para trazê-la pro corredor cheia de marra e fogo competitivo!",
          skillHint: "+14 Clima, +12% Rivalidade e +8% Influência",
          tone: "hot",
          onRun: function () {
            AG.playSound("hot");
            AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
            AG.clearFeed();
            s.flags.auroraCalledToCorridor = true;
            AG.refreshAuroraActivity();
            const pills = AG.applyDeltas({
              heat: 14,
              rivalry: 12,
              influence: 8,
              charisma: 2,
              mood: "provocante",
              specialScene: "paredeCorredor"
            });
            AG.pushFeed({
              type: "aurora",
              action: "*Escancara a porta do 404 arrancando o cartão de desafio e olha pra você de baixo pra cima com um sorriso perigoso*",
              speech: "'Duvido a moradora do 404 aguentar cinco minutos de conversa sem ficar corada'?! Você tá pedindo pra eu acabar com a sua pose hoje, vizinho!",
              pills
            });
          }
        });
      }
    }

    if (loc === "mercadinho_24h") {
      actions.push({
        id: "buy_snack_self",
        title: "🥪 Lanche Rápido no Balcão (R$ 18 • +42 Saciedade)",
        tone: "life",
        disabled: p.money < 18,
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(20);
          const pills = AG.applyDeltas({ money: -18, satiety: 42, energy: 8 });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Lanche feito no Mercadinho 24h.", pills });
        }
      });

      AG.SHOP_ITEMS.forEach((item) => {
        actions.push({
          id: "buy_" + item.id,
          title: `🛒 Comprar ${item.name} (R$ ${item.price})`,
          desc: item.desc,
          tone: "sweet",
          disabled: p.money < item.price,
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(10);
            s.unlocks.hasUnpackedBackpack = true;
            const pills = AG.applyDeltas({ money: -item.price });
            const existing = s.inventory.find((i) => i.id === item.id);
            if (existing) existing.qty += 1;
            else s.inventory.push({ id: item.id, name: item.name, qty: 1, desc: item.desc });
            AG.clearFeed();
            AG.pushFeed({ type: "narrative", text: `Comprou ${item.name} e guardou na Mochila!`, pills });
          }
        });
      });

      actions.push({
        id: "chat_cashier_mercadinho",
        title: "👁️ Conversar com o Atendente da Madrugada sobre o Bairro (15m • +4 Percepção)",
        desc: "Descobre fofocas úteis sobre os horários dos moradores e ganha Percepção.",
        tone: "life",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(15);
          const pills = AG.applyDeltas({ perception: 4, charisma: 2 });
          AG.clearFeed();
          AG.pushFeed({
            type: "narrative",
            text: "O atendente contou que a baixinha do 404 passa toda madrugada atrás de café gelado de baunilha e energético de pêssego — e que entrega deles no horário certo vale ouro.",
            pills
          });
        }
      });

      if (auroraHere && a.activity !== "dormindo") {
        const mktSpicyGate = AG.Gates ? AG.Gates.check("spicy_location_move") : { ok: false, missing: "" };
        actions.push({
          id: "market_aisle_reach_spicy",
          title: "Chegar colado por trás dela no corredor vazio pra alcançar a prateleira alta (15m)",
          desc: mktSpicyGate.ok ? "Clima pronto — diferença de altura no corredor deserto da madrugada." : `Falta: ${mktSpicyGate.missing}`,
          tone: "hot",
          onRun: function () {
            AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
            AG.clearFeed();
            const gate = AG.Gates ? AG.Gates.check("spicy_location_move") : mktSpicyGate;
            if (gate.ok) {
              AG.playSound("hot");
              const pills = AG.applyDeltas({ heat: 18, arousal: 16, intimacyLevel: 10, desire: 12, composure: -14, personaBold: 3, mood: "corada_sensivel", specialScene: "levantandoEla" });
              AG.pushFeed({
                type: "aurora",
                playerBeat: "Vendo ela esticada na ponta dos pés diante da última fileira de bebidas, você encosta bem atrás dela no corredor vazio, apoia a mão livre na cintura dela e estende o braço por cima da cabeça dela falando quase no seu ouvido.",
                action: "Ela congela com o rosto ardendo ao sentir o seu peito encostar nas costas dela entre as prateleiras; o queixo dela vira de lado pra te olhar sob a luz branca do mercadinho.",
                speech: "Você não precisava chegar tão colado assim só pra pegar uma lata, 402... o caixa tá logo ali na curva!\n\n...Mas não tira a mão da minha cintura ainda não. Se você me levantar dois palmos agora eu juro que pago a conta e deixo você escolher o que a gente faz quando subir pro prédio.",
                pills
              });
            } else {
              AG.playSound("warn");
              const pills = AG.applyDeltas({ discomfort: gate.code === "bond" ? 6 : 14, affinity: gate.code === "bond" ? -2 : -6, mood: "irritada" });
              AG.pushFeed({
                type: "aurora",
                action: "*Dá um passo pro lado escapando do seu alcance e te encara com as mãos na cintura*",
                speech: `Ei, espaço pessoal! Dá pra alcançar a prateleira sem colar desse jeito em mim ainda (${gate.missing})!`,
                pills
              });
            }
          }
        });

        actions.push({
          id: "market_ramen_midnight",
          title: "🍜 Dividir lámen instantâneo quente na mesinha do Mercadinho 24h (R$ 16 • 20m)",
          desc: "Comida quente de madrugada juntos (+36 Saciedade, +Afinidade, +Intimidade).",
          tone: "sweet",
          disabled: p.money < 16,
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(20);
            const pills = AG.applyDeltas({ money: -16, satiety: 36, affinity: 14, trust: 10, intimacyLevel: 8, calm: 8, mood: "alegre" });
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Assopra o caldo quente balançando os pés no banquinho alto do mercadinho enquanto divide a mesa com você*",
              speech: "Lámen quente às duas da manhã na calçada com você rindo das minhas histórias é oficialmente o melhor rolê do bairro!",
              pills
            });
          }
        });
      }
    }

    if (loc === "cafe_sakura") {
      actions.push({
        id: "drink_cafe_sakura",
        title: "☕ Tomar Cappuccino & Croissant (R$ 22 • +22 Energia • +30 Saciedade)",
        tone: "life",
        disabled: p.money < 22,
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(30);
          const pills = AG.applyDeltas({ money: -22, energy: 22, satiety: 30, calm: 8 });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Você fez uma pausa deliciosa no Café Sakura.", pills });
        }
      });

      if (!auroraHere) {
        actions.push({
          id: "cafe_solo_window_notes",
          title: "Sentar perto da janela e anotar ideias observando o movimento (25m)",
          desc: "Ação solo tranquila no café enquanto ela não está no turno.",
          tone: "life",
          onRun: function () {
            AG.playSound("click");
            AG.advanceTime(25);
            const pills = AG.applyDeltas({ perception: 3, calm: 12 });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "O Café Sakura tem outro ritmo quando a Aurora não está atrás do balcão. Você tomou fôlego perto da janela, observou os detalhes do lugar e organizou suas próximas jogadas.",
              pills
            });
          }
        });

        actions.push({
          id: "cafe_prepay_for_aurora",
          title: "Deixar um café gelado pago com bilhete no balcão pra Aurora (R$ 16 • 10m)",
          desc: "A colega de turno guarda o recado para entregar a ela assim que ela aparecer.",
          tone: "sweet",
          disabled: p.money < 16,
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(10, { suppressRandom: true });
            const pills = AG.applyDeltas({ money: -16, personaWarm: 2 });
            s.pendingDelayedEffects.push({
              deltas: { affinity: 16, trust: 12, heat: 8, mood: "dengosa" },
              memoryId: "cafe_pago_antecipado",
              memoryText: "Deixou um café gelado já pago com bilhete no balcão do Sakura para ela encontrar no turno.",
              memoryCat: "bom",
              auroraAction: "*Abre um sorriso enorme segurando o bilhete que a colega do Café Sakura entregou junto do copo gelado*",
              auroraSpeech: "Você passou lá no Sakura quando eu nem tava de turno só pra deixar meu café pago com bilhete?! Que golpe golpe baixo no meu coração, 402!"
            });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "Você deixou um café gelado de baunilha já pago no balcão com um bilhete dobrado no nome da Aurora. A colega prometeu entregar assim que ela bater o ponto.",
              pills
            });
          }
        });
      }

      if (auroraHere && a.activity !== "dormindo") {
        const cafeSpicyGate = AG.Gates ? AG.Gates.check("spicy_location_move") : { ok: false, missing: "" };
        actions.push({
          id: "cafe_whisper_uniform_spicy",
          title: "Provocar ela baixinho no balcão enquanto ela tenta manter a postura de uniforme (15m)",
          desc: cafeSpicyGate.ok ? "Clima pronto — contraste irresistível entre o uniforme e o olhar dela." : `Falta: ${cafeSpicyGate.missing}`,
          tone: "hot",
          onRun: function () {
            AG.advanceTime(15, { suppressRandom: true, keepSpecialScene: true });
            AG.clearFeed();
            const gate = AG.Gates ? AG.Gates.check("spicy_location_move") : cafeSpicyGate;
            if (gate.ok) {
              AG.playSound("hot");
              const pills = AG.applyDeltas({ heat: 18, arousal: 18, intimacyLevel: 10, desire: 12, charisma: 2, personaBold: 3, mood: "sedutora_ousada", specialScene: "uniformeProvocante" });
              AG.pushFeed({
                type: "aurora",
                playerBeat: "Você apoia os antebraços no balcão de madeira bem na frente dela e inclina o rosto até falar num murmúrio baixo que só atravessa o vapor da máquina de expresso: — Esse avental ajustado na sua cintura devia ser proibido durante o expediente.",
                action: "Aurora quase deixa a colher de espuma escapar; o rubor sobe rápido pelo pescoço enquanto ela disfarça limpando o balcão e chega mais perto do seu lado com os olhos faiscando.",
                speech: "Fala baixo, seu sem-vergonha!! Tem cliente na mesa do fundo e você me falando uma coisa dessas enquanto eu tô de uniforme!\n\n...Mas anota aí: às 17h eu bato o ponto e não vou trocar de roupa antes de subir pro quarto andar. Quero ver você repetir isso com a porta fechada.",
                pills
              });
            } else {
              AG.playSound("warn");
              const pills = AG.applyDeltas({ discomfort: gate.code === "bond" ? 5 : 12, rivalry: 6, mood: "irritada" });
              AG.pushFeed({
                type: "aurora",
                action: "*Bate o pano no balcão mantendo o olhar sério de expediente*",
                speech: `Ei, tô trabalhando agora e ainda falta intimidade pra essas gracinhas no meu balcão (${gate.missing})!`,
                pills
              });
            }
          }
        });

        actions.push({
          id: "cafe_share_strawberry_cake",
          title: "🍰 Dividir uma fatia de bolo de morango com ela no intervalo do Café (R$ 18 • 20m)",
          desc: "Pausa doce no meio do turno (+30 Saciedade, +Afinidade, +Intimidade, +Disposição Dela).",
          tone: "sweet",
          disabled: p.money < 18,
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(20, { keepSpecialScene: true });
            const pills = AG.applyDeltas({ money: -18, satiety: 30, affinity: 15, trust: 10, intimacyLevel: 8, auroraEnergy: 16, mood: "dengosa", specialScene: "uniformeProvocante" });
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Senta cinco minutinhos na ponta da sua mesa com o avental do Café, dividindo a fatia no mesmo garfo*",
              speech: "Você apareceu com o melhor bolo da vitrine bem na hora em que minha bateria tava acabando... obrigada por tornar esse turno mil vezes mais leve!",
              pills
            });
          }
        });

        actions.push({
          id: "defend_aurora_customer",
          title: "🗣️ [Usar Lábia] Defender a Aurora de um Cliente Chato no Balcão (20m • +Afinidade)",
          tone: "sweet",
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(20, { keepSpecialScene: true });
            const bonus = ((p.skills && p.skills.charisma) || 12) >= 18 ? 8 : 0;
            const pills = AG.applyDeltas({ affinity: 16 + bonus, heat: 12, trust: 10, charisma: 4, personaWarm: 3, mood: "dengosa", specialScene: "uniformeProvocante" });
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Segura seu braço por trás do balcão depois que você coloca o cliente folgado no lugar dele com pura classe*",
              speech: "Nossa... você viu a cara dele quando você entrou na conversa e me defendeu?! Meu coração até disparou vendo você tomar minha frente desse jeito!",
              pills
            });
          }
        });

        if (s.secretsDossier && s.secretsDossier.audio_fofoca_cafe && s.secretsDossier.audio_fofoca_cafe.state === "locked") {
          actions.push({
            id: "record_cafe_vent_sakura",
            title: "🎙️ [Oportunidade Crítica] Aurora Está Desabafando Mal do Gerente nos Fundos do Balcão!",
            desc: "Você ouviu ela reclamando pesado do chefe do Café Sakura achando que ninguém está perto. Gravar como Trunfo Crítico ou avisar que o gerente está vindo?",
            skillHint: "Pode desbloquear o Segredo Crítico 'Áudio Vazado' no Dossiê (+42% Pressão)!",
            tone: "ctrl",
            onRun: function () {
              AG.playSound("click");
              AG.advanceTime(15, { suppressRandom: true });
              s.activeRandomEvent = {
                id: "scene_cafe_audio_trap",
                title: "🎙️ OPORTUNIDADE NO CAFÉ SAKURA: O Desabafo Sem Filtro",
                desc: "Atrás do balcão, a Aurora está bufando e falando tudo o que pensa do gerente do Café Sakura em voz alta enquanto prepara os copos — sem notar que o gerente está subindo a escada do estoque logo atrás. O que você faz?",
                choices: [
                  {
                    id: "cafe_save_audio_blackmail",
                    tone: "risky",
                    label: "🎙️ [Oportunista] Gravar discretamente os 15 segundos no seu celular antes de avisar (+Segredo Crítico no Dossiê!)",
                    skillHint: "Desbloqueia 'Áudio Vazado do Café Sakura' (+42% Pressão de Chantagem!)"
                  },
                  {
                    id: "cafe_warn_boss_coming",
                    tone: "sweet",
                    label: "🤍 [Protetor] Tossir alto e puxar assunto na hora pra salvar o emprego dela sem gravar nada",
                    skillHint: "+22 Afinidade, +20 Confiança, -18% Armadura dela!"
                  }
                ]
              };
            }
          });
        }
      }
    }

    if (loc === "praca_cerejeiras") {
      actions.push({
        id: "walk_park",
        title: "🌿 Caminhar sob as árvores (30m • +24 Calma)",
        tone: "life",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(30);
          const pills = AG.applyDeltas({ calm: 24, energy: -5 });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "A brisa da praça renovou sua mente.", pills });
        }
      });

      actions.push({
        id: "pick_flower_park",
        title: "🌸 Colher uma Flor de Cerejeira para a Aurora (15m)",
        desc: "Um presente delicado e gratuito da praça.",
        tone: "sweet",
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(15);
          s.unlocks.hasUnpackedBackpack = true;
          const existing = s.inventory.find((i) => i.id === "flor_cerejeira");
          if (existing) existing.qty += 1;
          else s.inventory.push({ id: "flor_cerejeira", name: "🌸 Flor de Cerejeira", qty: 1, desc: "Colhida na praça do bairro." });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Você guardou uma flor de cerejeira fresca para entregar a ela." });
        }
      });

      actions.push({
        id: "exercise_park",
        title: "🏃 Alongar & Exercitar-se ao Ar Livre (25m • +15 Energia • +12 Calma)",
        desc: "Revigora o corpo e a disposição física gratuitamente.",
        tone: "life",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(25);
          const pills = AG.applyDeltas({ energy: 15, calm: 12, satiety: -6 });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Você fez uma série de alongamentos e exercícios leves sob o ar fresco da praça.", pills });
        }
      });

      if (auroraHere && a.activity !== "dormindo") {
        const parkSpicyGate = AG.Gates ? AG.Gates.check("spicy_location_move") : { ok: false, missing: "" };
        actions.push({
          id: "park_secluded_bench_spicy",
          title: "Puxar ela pro banco escondido sob as cerejeiras longe das pessoas (20m)",
          desc: parkSpicyGate.ok ? "Clima pronto — um canto reservado à sombra das árvores só pra vocês." : `Falta: ${parkSpicyGate.missing}`,
          tone: "hot",
          onRun: function () {
            AG.advanceTime(20, { suppressRandom: true, keepSpecialScene: true });
            AG.clearFeed();
            const gate = AG.Gates ? AG.Gates.check("spicy_location_move") : parkSpicyGate;
            if (gate.ok) {
              AG.playSound("hot");
              const pills = AG.applyDeltas({ heat: 18, arousal: 18, intimacyLevel: 14, affinity: 12, desire: 12, composure: -14, personaBold: 3, mood: "corada_sensivel", specialScene: "chamego" });
              AG.pushFeed({
                type: "aurora",
                playerBeat: "Você puxa ela pela mão para o banco mais afastado atrás da copa baixa das cerejeiras, passa o braço pelas costas dela e traz o corpo pequeno dela de lado contra o seu até os joelhos dela encostarem na sua coxa.",
                action: "Longe da calçada principal, Aurora abaixa o tom de voz, apoia a mão quente na sua nuca e ergue o queixo deixando o polegar roçar de leve no seu lábio inferior.",
                speech: "Você me trouxe bem pro cantinho onde ninguém da rua vê a gente de propósito, né...\n\nA brisa tá gelada mas minha pele tá pegando fogo desde que você segurou minha cintura assim. Se você me beijar aqui debaixo dessas árvores agora, eu não respondo por mim quando a gente voltar pro quarto andar.",
                pills
              });
            } else {
              AG.playSound("warn");
              const pills = AG.applyDeltas({ discomfort: gate.code === "bond" ? 5 : 14, affinity: gate.code === "bond" ? -2 : -8, mood: "desconfortavel" });
              AG.pushFeed({
                type: "aurora",
                action: "*Solta a mão devagar e prefere continuar na trilha iluminada da praça*",
                speech: `Ei, vamos ficar na parte principal da praça por enquanto... ainda falta um pouco de intimidade pra isso (${gate.missing}).`,
                pills
              });
            }
          }
        });

        actions.push({
          id: "park_photo_session",
          title: "📸 Fazer sessão de fotos espontâneas com a Aurora sob as cerejeiras (25m)",
          desc: "Registra o passeio na Galeria do Celular (+Afinidade, +Intimidade, +Confiança).",
          tone: "sweet",
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(25, { keepSpecialScene: true });
            if (s.phoneState) {
              s.phoneState.unlockedPhotos = s.phoneState.unlockedPhotos || [];
              if (!s.phoneState.unlockedPhotos.includes("Cena Chamego Colo PNG.png")) {
                s.phoneState.unlockedPhotos.push("Cena Chamego Colo PNG.png");
              }
              if (!s.phoneState.unlockedPhotos.includes("Aurora PNG 2.png")) {
                s.phoneState.unlockedPhotos.push("Aurora PNG 2.png");
              }
            }
            const pills = AG.applyDeltas({ affinity: 16, trust: 12, intimacyLevel: 12, calm: 10, mood: "muito_feliz", specialScene: "chamego" });
            AG.addMemory("fotos_praca_cerejeiras", "Passaram a tarde tirando fotos espontâneas rindo sob as cerejeiras da praça.", "bom", true);
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Faz pose rindo enquanto o vento derruba pétalas no cabelo dela, depois corre colada pra ver a tela do seu celular*",
              speech: "MEU DEUS, OLHA COMO ESSA FOTO FICOU LINDA!! Salva na sua galeria agora mesmo — é oficialmente minha foto favorita de nós dois!",
              pills
            });
          }
        });
      }
    }

    if (loc === "ape_404") {
      const bels = s.belongings || {};

      // Ações quando ela está presente no 404
      if (auroraHere) {
        if (a.activity !== "dormindo") {
          actions.push({
            id: "pose_drawing_model_404",
            title: "🎨 Posar como modelo enquanto a Aurora desenha você no 404 (30m)",
            desc: "Olhares longos em silêncio criativo que aumentam muito Intimidade e Confiança.",
            tone: "sweet",
            onRun: function () {
              AG.playSound("heart");
              AG.advanceTime(30, { keepSpecialScene: true });
              const pills = AG.applyDeltas({ affinity: 16, trust: 14, intimacyLevel: 14, vulnerability: 14, perception: 2, mood: "dengosa", specialScene: "noite404" });
              AG.addMemory("modelo_desenho_404", "Posou em silêncio sob a luz do abajur enquanto a Aurora desenhava seu retrato no 404.", "bom", true);
              AG.clearFeed();
              AG.pushFeed({
                type: "aurora",
                playerBeat: "Você apoia o braço na poltrona do 404 tentando manter a expressão séria enquanto ela mede seus traços com a caneta digital no ar.",
                action: "*Ela alterna olhares atentos entre o seu rosto e o tablet, mordendo a pontinha da caneta e corando cada vez que os olhares se cruzam*",
                speech: "Para de sorrir de canto quando eu tô desenhando seu olhar!! Assim eu perco a concentração e acabo fazendo você bonito demais no papel!",
                pills
              });
            }
          });
        }

        actions.push({
          id: "sleep_together_404",
          title: "🌙 Passar a Noite / Dormir no 404 com a Aurora (6h)",
          desc: "Dormir abraçado com ela no cantinho particular dela.",
          tone: "hot",
          onRun: function () {
            AG.playSound("heart");
            s.sharedStory.timesSleptAt404 += 1;
            AG.advanceTime(360, { isSleeping: true, keepSpecialScene: true });
            s.aurora.activeSpecialSceneKey = "noite404";
            AG.clearFeed();
            const pills = AG.applyDeltas({ energy: 78, affinity: 16, heat: 16, trust: 14, desire: -60 });
            AG.pushFeed({
              type: "aurora",
              action: "*Acorda aninhada na altura do seu peito entre os lençóis do 404*",
              speech: "Dormir aqui no 404 com você me abraçando a noite inteira é bom demais...",
              pills
            });
          }
        });
      }

      // Ações na bancada / quarto do 404 (Potes, Canecas no Alto & Surpresa no Travesseiro — Pontos 038, 044, 087)
      actions.push({
        id: "restock_404_jars",
        title: "🧋 [Indireto Positivo] Abastecer os Potes da Bancada Dela com Café & Doces (R$ 18 • 15m)",
        desc: "Enche os potes favoritos dela para ela encontrar depois.",
        tone: "sweet",
        disabled: p.money < 18,
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(15, { suppressRandom: true });
          const pills = AG.applyDeltas({ money: -18 });
          s.pendingDelayedEffects.push({
            deltas: { affinity: 16, trust: 12, discomfort: -10, mood: "dengosa" },
            memoryId: "abasteceu_potes_404",
            memoryText: "Abasteceu os potes da bancada do 404 com café e doces sem avisar.",
            memoryCat: "bom",
            auroraAction: "*Abre o pote da bancada e encontra tudo cheio dos doces e cafés favoritos dela*",
            auroraSpeech: "Ei!! Meus potes da bancada tavam vazios e agora tão cheios! Foi você que abasteceu meu estoque secreto, né seu fofo?!"
          });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Você abasteceu os potes da bancada do 404 com café e doces. Ela vai adorar quando abrir!", pills });
        }
      });

      actions.push({
        id: "move_mugs_high_404",
        title: "📏 [Indireto Manipulador] Colocar as Canecas Favoritas Dela na Prateleira Mais Alta (10m)",
        desc: "Força ela a ficar na ponta dos pés (1,49m) e precisar chamar você para alcançar.",
        tone: "ctrl",
        onRun: function () {
          AG.playSound("click");
          AG.advanceTime(10, { suppressRandom: true });
          s.pendingDelayedEffects.push({
            deltas: { heat: 12, affinity: 6 },
            memoryId: "canecas_no_alto_404",
            memoryText: "Mudou as canecas dela para a prateleira alta para ela precisar da sua altura.",
            memoryCat: "controle",
            auroraAction: "*Olha para a prateleira do teto indignada e puxa você pelo braço*",
            auroraSpeech: "Como é que minhas canecas foram parar lá no teto?! Vem cá agora e pega pra mim, seu poste!"
          });
          AG.clearFeed();
          AG.pushFeed({ type: "narrative", text: "Você colocou as canecas favoritas dela na prateleira mais alta do armário." });
        }
      });

      // Ações Furtivas / Pertences da Aurora (No 404 vazio ou enquanto ela dorme!)
      if (!auroraHere || a.activity === "dormindo") {
        actions.push({
          id: "surprise_pillow_404",
          title: "💝 [Surpresa no Quarto] Arrumar a Cama Dela e Deixar um Bilhete no Travesseiro (20m)",
          desc: "Quando ela voltar do turno no Café Sakura, encontrará o quarto impecável e seu bilhete.",
          tone: "sweet",
          onRun: function () {
            AG.playSound("heart");
            AG.advanceTime(20, { suppressRandom: true });
            s.pendingDelayedEffects.push({
              deltas: { affinity: 18, heat: 12, trust: 10, mood: "dengosa" },
              memoryId: "surpresa_travesseiro_404",
              memoryText: "Arrumou o quarto dela e deixou um bilhete perfumado no travesseiro.",
              memoryCat: "bom",
              auroraAction: "*Chega do trabalho e encontra o quarto arrumado e o bilhete no travesseiro, corando até as orelhas*",
              auroraSpeech: "Eu cheguei exausta do turno e dei de cara com minha cama arrumadinha e aquele seu bilhete no travesseiro... Você quer me matar de amor?!"
            });
            AG.clearFeed();
            AG.pushFeed({ type: "narrative", text: "Você deixou o quarto do 404 impecável com um bilhete especial sobre o travesseiro dela." });
          }
        });

        actions.push({
          id: "minigame_crack_tablet_404",
          title: "🔓 [Minigame 5 • Sem Rastro] Decifrar Senha do Tablet Gráfico da Aurora",
          desc: "Deduza os 3 blocos da senha dela (Altura + Apê + Café) para liberar fotos e +2 Trunfos com 0% Suspeita.",
          tone: "ctrl",
          onRun: function () {
            AG.startMinigame("tablet_password_crack");
          }
        });

        if (bels.secretSketchbook && bels.secretSketchbook.state === "in_404") {
          actions.push({
            id: "steal_sketchbook_404",
            title: "📔 [Pertence Dela] Pegar o Caderno Secreto de Rascunhos (+2 Trunfos • Guarde no 402!)",
            desc: "Com Furtividade 18+ não deixa pista. Se Furtividade < 18, ela nota a gaveta mexida depois!",
            skillHint: "🤫 Furtividade 18+ recomendada",
            tone: "ctrl",
            onRun: function () {
              AG.playSound("click");
              bels.secretSketchbook.state = "carried";
              AG.unlockSecret("rascunho_secreto_sketch", "📔 SEGREDO DO DOSSIÊ: Páginas Ocultas do Sketchbook da Aurora!");
              s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
              s.unlocks.unlockedSpyApp = true;
              const highStealth = ((p.skills && p.skills.stealth) || 12) >= 18;
              AG.advanceTime(15, { suppressRandom: true });
              const pills = AG.applyDeltas({ stealth: 3, perception: 4, personaRuthless: 3, suspicion: highStealth ? 0 : 14 });
              if (!highStealth) {
                s.pendingDelayedEffects.push({
                  deltas: { suspicion: 18, mood: "desconfiada" },
                  memoryId: "notou_gaveta_mexida_404",
                  memoryText: "Notou que alguém mexeu na mesa de desenho dela enquanto estava fora.",
                  memoryCat: "ruim",
                  auroraAction: "*Olha para a mesa de desenho franzindo a testa desconfiada*",
                  auroraSpeech: "Que estranho... meu caderno de rascunhos não tava nessa posição quando eu saí..."
                });
              }
              AG.clearFeed();
              AG.pushFeed({
                type: "narrative",
                text: highStealth
                  ? "📔 Com Furtividade alta, você fotografou e pegou o Caderno Secreto dela com 0% de Suspeita (Segredo adicionado ao Dossiê)! Leve para o 402 e tranque na Gaveta Secreta para nunca ser descoberto!"
                  : "📔 Você pegou o Caderno Secreto (Segredo adicionado ao Dossiê), mas deixou objetos levemente fora do lugar. Guarde na Gaveta Trancada do 402 ou devolva logo!",
                pills
              });
            }
          });
        }

        actions.push({
          id: "subtle_env_mindgame_404",
          title: "🧩 [Psicologia Indireta no Quarto] Alterar Um Único Detalhe Óbvio no 404 (Sem Roubar Nada • 15m)",
          desc: "Marca a página exata do livro dela ou vira a caneca favorita na direção da porta — um sinal sutil de que você conhece cada hábito dela (-22% Armadura depois).",
          skillHint: "Derruba a Armadura dela em -22% e eleva +14% Influência sem levantar ódio",
          tone: "ctrl",
          onRun: function () {
            AG.playSound("click");
            AG.advanceTime(15, { suppressRandom: true });
            const pills = AG.applyDeltas({ influence: 10, stealth: 2, personaCold: 3 });
            s.pendingDelayedEffects.push({
              deltas: { composure: -22, influence: 14, rivalry: 10, mood: "desconfiada" },
              memoryId: "detalhe_sutil_quarto_404",
              memoryText: "Alguém alterou um único detalhe milimétrico no quarto dela sem levar nada — e ela sabe que foi recado seu.",
              memoryCat: "controle",
              auroraAction: "*Para na porta do 404 reparando no detalhe milimetricamente mudado e dá um arrepio olhando pra porta do 402*",
              auroraSpeech: "Você não levou nada... só mudou esse detalhe de lugar pra me mostrar que conhece cada centímetro da minha rotina, né? Que jogo psicológico é esse?!"
            });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "🧩 Você não levou nada — apenas marcou o detalhe exato da rotina dela e saiu em silêncio. Quando ela notar, a armadura psicológica dela vai rachar na hora!",
              pills
            });
          }
        });

        if (bels.pinkRibbon && bels.pinkRibbon.state === "in_404") {
          actions.push({
            id: "steal_ribbon_404",
            title: "🎀 [Pertence Íntimo] Pegar o Laço Rosa Favorito Dela às Escondidas (-30 Desejo • +1 Trunfo)",
            desc: "Pega o laço favorito dela. Guarde na Gaveta Secreta do 402 para nunca ser descoberto!",
            skillHint: "🤫 Furtividade 18+ recomendada",
            tone: "hot",
            onRun: function () {
              AG.playSound("hot");
              bels.pinkRibbon.state = "carried";
              s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
              const highStealth = ((p.skills && p.skills.stealth) || 12) >= 18;
              AG.advanceTime(10, { suppressRandom: true });
              const pills = AG.applyDeltas({ desire: -30, stealth: 3, suspicion: highStealth ? 0 : 15 });
              AG.clearFeed();
              AG.pushFeed({
                type: "narrative",
                text: "🎀 Você pegou o laço rosa favorito com o perfume dela! Lembre-se de trancá-lo na Gaveta Secreta do 402 para que ela nunca descubra.",
                pills
              });
            }
          });
        }

        if (bels.condoNotice && bels.condoNotice.state === "in_404") {
          actions.push({
            id: "pay_secret_condo_notice",
            title: "💝 [Segredo Bom] Pagar a Carta de Atraso do 404 em Segredo (R$ 45 • Efeito Positivo Depois!)",
            tone: "sweet",
            disabled: p.money < 45,
            onRun: function () {
              AG.playSound("heart");
              bels.condoNotice.state = "paid_secretly";
              AG.advanceTime(15, { suppressRandom: true });
              const pills = AG.applyDeltas({ money: -45 });
              s.pendingDelayedEffects.push({
                deltas: { affinity: 24, trust: 20, discomfort: -20, mood: "dengosa" },
                memoryId: "quitou_carta_404_segredo",
                memoryText: "Pagou uma taxa atrasada do 404 em segredo sem cobrar nada em troca.",
                memoryCat: "bom",
                auroraAction: "*Segura o comprovante pago na mão com os olhos brilhando de emoção*",
                auroraSpeech: "Eu vi que a taxa do 404 apareceu quitada... Foi você que pagou em segredo pra me ajudar sem nem falar nada?! Vem cá me dar um abraço agora!"
              });
              AG.clearFeed();
              AG.pushFeed({
                type: "narrative",
                text: "💝 Você quitou a carta pendente do 404 no app e deixou o recibo pago na mesa dela. Quando ela vir isso mais tarde, vai ter uma surpresa inesquecível!",
                pills
              });
            }
          });
        }

        actions.push({
          id: "swap_coffee_decaf_404",
          title: "☕ [Sabotagem Travessa] Trocar o Café Forte Dela por Descafeinado e Esconder o Pote Original no Alto (15m)",
          desc: "Uma pegadinha clássica no 404 que dispara a rivalidade e faz ela ir atrás de você no 402 cobrando o café verdadeiro!",
          skillHint: "+16% Rivalidade, +10 Clima quando ela descobrir",
          tone: "hot",
          onRun: function () {
            AG.playSound("click");
            AG.advanceTime(15, { suppressRandom: true });
            const pills = AG.applyDeltas({ rivalry: 16, stealth: 2 });
            s.pendingDelayedEffects.push({
              deltas: { rivalry: 12, heat: 12, mood: "provocante" },
              memoryId: "sabotagem_cafe_404",
              memoryText: "Trocou o café forte dela por descafeinado e escondeu o pote original na prateleira mais alta.",
              memoryCat: "controle",
              auroraAction: "*Dá um gole no café, olha para o pote verdadeiro lá no teto e parte pra cima de você com os olhos faiscando*",
              auroraSpeech: "DESCAFEINADO?! VOCÊ MEXEU NO MEU CAFÉ DE MADRUGADA E AINDA COLOCOU O VERDADEIRO NO TETO?! Vai pagar caro por essa provocação, 402!"
            });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "☕ Você trocou o pote de café dela por descafeinado e colocou o original na última prateleira. Quando ela descobrir, a Guerra Fria do 4º andar vai pegar fogo!",
              pills
            });
          }
        });

        actions.push({
          id: "peek_rival_portfolio_404",
          title: "🎨 [Leitura de Bastidores] Analisar as Referências Criativas na Mesa Dela para Surpreendê-la Depois (15m)",
          desc: "Estuda os gostos e projetos atuais dela na mesa aberta para ter vantagem de conversa (+3 Percepção, +12% Influência).",
          skillHint: "🤫 Furtividade 15+ evita deixar qualquer rastro (+0% Suspeita)",
          tone: "ctrl",
          onRun: function () {
            const skStealth = (p.skills && p.skills.stealth) || 12;
            AG.advanceTime(15, { suppressRandom: true });
            AG.clearFeed();
            if (skStealth >= 15) {
              AG.playSound("heart");
              const pills = AG.applyDeltas({ influence: 12, perception: 3, stealth: 2 });
              AG.pushFeed({
                type: "narrative",
                text: "Você decorou as paletas, referências e ideias abertas na mesa de desenho dela sem tirar um único objeto do lugar.",
                pills
              });
            } else {
              AG.playSound("warn");
              const pills = AG.applyDeltas({ perception: 2, suspicion: 14 });
              AG.pushFeed({
                type: "narrative",
                text: "Você deu uma olhada rápida nos rascunhos da mesa, mas esbarrou num lápis e deixou um pequeno indício.",
                pills
              });
            }
          }
        });

        actions.push({
          id: "plant_wager_envelope_404",
          title: "💌 [Desafio Ousado] Deixar um Envelope Lacrado 'Aposta do 4º Andar' na Mesa Dela (15m)",
          desc: "Um convite provocante para ela vir acertar as contas num duelo no 402 assim que voltar (+14 Clima, +12% Influência depois).",
          tone: "hot",
          onRun: function () {
            AG.playSound("hot");
            AG.advanceTime(15, { suppressRandom: true });
            const pills = AG.applyDeltas({ influence: 10, charisma: 2 });
            s.pendingDelayedEffects.push({
              deltas: { heat: 16, rivalry: 10, influence: 10, mood: "provocante" },
              memoryId: "envelope_aposta_404",
              memoryText: "Deixou um envelope lacrado de desafio ousado sobre a mesa do 404.",
              memoryCat: "intenso",
              auroraAction: "*Abre o envelope lacrado, morde o lábio rindo e vem bater na sua porta cheia de energia*",
              auroraSpeech: "Olha esse envelope cheio de mistério que você deixou na minha mesa... Aposta aceita, 402! Quero ver se você segura o que escreveu aqui!"
            });
            AG.clearFeed();
            AG.pushFeed({
              type: "narrative",
              text: "💌 Você deixou um envelope lacrado com um desafio provocante bem no centro da mesa do 404. Ela vai adorar (e surtar) quando voltar!",
              pills
            });
          }
        });

        const takenBelongings = Object.values(bels).filter((b) => (b.state === "carried" || b.state === "hidden_in_402") && b.id !== "spareKey404");
        if (takenBelongings.length > 0) {
          actions.push({
            id: "return_belongings_404",
            title: `🔄 [Crime Perfeito] Devolver Pertences ao Lugar Original (${takenBelongings.length}) (15m • Zera Suspeita!)`,
            tone: "life",
            onRun: function () {
              AG.playSound("click");
              takenBelongings.forEach((b) => { b.state = "in_404"; });
              AG.advanceTime(15, { suppressRandom: true });
              const pills = AG.applyDeltas({ suspicion: -100, stealth: 4 });
              AG.clearFeed();
              AG.pushFeed({
                type: "narrative",
                text: "🔄 Você recolocou cada item exatamente na posição original! Você manteve todos os segredos e trunfos que coletou, e a Suspeita dela caiu para 0%.",
                pills
              });
            }
          });
        }
      }
    }

    // Ações Compartilhadas de Casal/Parceria quando estão juntos no 402 ou 404 (Pontos 065, 066)
    if (auroraHere && a.activity !== "dormindo" && (loc === "ape_402" || loc === "ape_404")) {
      actions.push({
        id: "cook_together_shared",
        title: "🍲 Cozinhar Juntos & Dividir uma Refeição Quentinha (45m • -R$ 12 • +40 Saciedade • +Afinidade)",
        desc: "Momento doméstico aconchegante preparando comida lado a lado.",
        tone: "sweet",
        disabled: p.money < 12,
        onRun: function () {
          AG.playSound("heart");
          AG.advanceTime(45);
          const pills = AG.applyDeltas({ money: -12, satiety: 40, affinity: 16, trust: 10, calm: 10, mood: "dengosa" });
          AG.addMemory("cozinharam_juntos", "Prepararam uma refeição juntos entre risadas e provocações na bancada.", "bom", false);
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Senta na ponta da bancada balançando as pernas enquanto divide o prato com você*",
            speech: "Cozinhar com você é bom demais! Você alcança os temperos no alto e eu dou o toque de chef!",
            pills
          });
        }
      });

      actions.push({
        id: "midnight_marathon_shared",
        title: "🌙💻 Maratona Criativa: Programar & Ilustrar Juntos (2h • +R$ 85 • +4 Código • +Afinidade)",
        desc: "Une o seu código com a arte da Aurora num projeto conjunto (avança para o Final Verdadeiro!).",
        tone: "life",
        disabled: p.energy < 20,
        onRun: function () {
          AG.playSound("heart");
          p.workProgress += 1;
          if (p.workProgress % 3 === 0) p.storyChapter += 1;
          AG.advanceTime(120);
          const pills = AG.applyDeltas({ money: 85, energy: -14, affinity: 16, trust: 14, tech: 4, mood: "caotica" });
          AG.addMemory("maratona_estudio_402_404", "Viraram a noite criando juntos como uma dupla perfeita de código e arte.", "bom", true);
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Bate a mão na sua num high-five empolgado depois de fecharem a entrega juntos*",
            speech: "OLHA O QUE A GENTE CRIOU JUNTO, DIRETOR! Seu código com a minha arte não tem pra ninguém, faturamos R$ 85 e ficou lindo!",
            pills
          });
        }
      });

      const privSpicyGate = AG.Gates ? AG.Gates.check("private_spicy_room") : { ok: false, missing: "" };
      if (privSpicyGate.ok) {
        actions.push({
          id: "private_lock_door_spicy",
          title: "Trancar a porta, apagar a luz forte e puxar ela pra perto sem pressa (25m)",
          desc: "Cena picante interativa a sós entre quatro paredes: escolha como conduzir o ritmo e o calor entre vocês.",
          tone: "hot",
          onRun: function () {
            AG.playSound("hot");
            AG.advanceTime(25, { suppressRandom: true, keepSpecialScene: true });
            s.aurora.activeSpecialSceneKey = a.wearingUniform ? "nsfwUniforme" : "noite404";
            s.activeRandomEvent = {
              id: "scene_private_spicy_room",
              title: "Entre Quatro Paredes · A Sós Com a Aurora",
              desc: "A tranca da porta estala baixo e só a luminária quente fica acesa no quarto. Aurora larga o celular na mesa, dá dois passos pra perto olhando de baixo pra cima com a respiração curta e segura a barra da sua camisa como quem espera você dar o primeiro comando.",
              choices: [
                {
                  id: "priv_slow_neck_bed",
                  tone: "hot",
                  label: "Levar ela devagar pra cama/sofá e explorar o pescoço e a clavícula dela sem pressa",
                  skillHint: "+24 Clima · +22 Intimidade · +24 Tensão Dela"
                },
                {
                  id: "priv_lift_wall_passionate",
                  tone: "hot",
                  label: "Erguer ela pela cintura contra a parede pra deixar os lábios na mesma altura num beijo intenso",
                  skillHint: "+26 Clima · +22 Intimidade · Contraste de altura intenso"
                },
                {
                  id: "priv_let_aurora_lead",
                  tone: "ctrl",
                  label: "Sentar recostado olhando pra ela e dizer: 'Hoje quem dita cada passo aqui é você'",
                  skillHint: "+24 Clima · +22 Intimidade · +12 Controle Dela · Aurora assume o ritmo"
                }
              ]
            };
          }
        });
      }

      const intGate = AG.Gates ? AG.Gates.check("intimate_18") : { ok: false, missing: "" };
      const canBeIntimate = intGate.ok;
      actions.push({
        id: "intimate_moment_aurora",
        title: canBeIntimate
          ? "Entregar-se a uma noite íntima e sem pressa com a Aurora (1h)"
          : `Propor momento íntimo a sós (${intGate.chip || "Falta clima"})`,
        desc: canBeIntimate
          ? "Cena interativa 18+ em 5 etapas com ritmo, preferências e consentimento ativo."
          : `Ainda não está pronto — ${intGate.missing}`,
        tone: canBeIntimate ? "hot" : "risky",
        onRun: function () {
          const liveGate = AG.Gates ? AG.Gates.check("intimate_18") : intGate;
          if (liveGate.ok && AG.Intimacy && AG.Intimacy.canStart() && AG.Intimacy.start()) {
            return;
          }
          if (liveGate.ok) {
            AG.playSound("hot");
            AG.advanceTime(60, { keepSpecialScene: true });
            s.aurora.activeSpecialSceneKey = a.wearingUniform
              ? "nsfwUniforme"
              : a.dynamic === "teia_de_controle"
                ? "nsfwControle"
                : loc === "ape_404"
                  ? "nsfw2"
                  : "nsfw1";
            AG.clearFeed();
            const pills = AG.applyDeltas({ desire: -85, affinity: 18, heat: 24, intimacyLevel: 20, arousal: -25, trust: 14, energy: -15, mood: "entregue" });
            AG.addMemory("noite_quente_4_paredes", "Viveram uma hora inteira de entrega intensa e química sem pressa entre quatro paredes.", "quente", true);
            AG.pushFeed({
              type: "aurora",
              playerBeat: "A porta fica trancada e o resto do prédio desaparece. Você puxa ela pela cintura até o corpo pequeno dela se encaixar inteiro contra o seu, sentindo o ritmo dos beijos ficar mais fundo e mais lento à medida que a última barreira cede.",
              action: "Com a respiração entrecortada, o cabelo bagunçado sobre os ombros e a pele quente encostada no seu peito sob o lençol, Aurora desliza os dedos pelas suas costas sem a menor vontade de soltar.",
              speech: "Nossa... eu jurava que tinha fôlego até você descobrir exatamente onde me tocar e perder completamente a pressa.\n\nQuando a gente fica a sós assim entre quatro paredes, o mundo inteiro lá fora some. Fica aqui comigo mais um pouco — minha pele inteira ainda tá arrepiada com você.",
              pills
            });
          } else if (liveGate.code === "bond") {
            AG.playSound("click");
            AG.advanceTime(10, { suppressRandom: true });
            const pills = AG.applyDeltas({ heat: 4, intimacyLevel: 3 });
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Segura suas mãos com calma e olha pra cima corada, sem se afastar mas segurando o ritmo*",
              speech: `Ei, respira comigo um pouco... eu gosto da sua proximidade, mas ainda precisamos construir mais intimidade e química antes de dar esse passo (${liveGate.missing}).`,
              pills
            });
          } else {
            AG.playSound("warn");
            AG.advanceTime(15);
            const pills = AG.applyDeltas({ affinity: -20, discomfort: 32, trust: -14, mood: "irritada" });
            AG.clearFeed();
            AG.pushFeed({
              type: "aurora",
              action: "*Empurra você séria e se afasta da cama*",
              speech: `O QUE É ISSO?! ${liveGate.reason} Não tenta forçar nada quando o clima tá assim!`,
              pills
            });
          }
        }
      });
    }

    return actions;
  };

  // Ponto 064: Presentes com Bônus Contextual de Horário! (Estritamente presencial!)
  AG.giveGiftToAurora = function (itemId) {
    const s = AG.state;
    if (!AG.isAuroraHere() || s.aurora.activity === "dormindo") {
      AG.clearFeed();
      AG.pushFeed({
        type: "narrative",
        text: "Você só pode entregar um presente em mãos quando a Aurora estiver no mesmo local que você e acordada."
      });
      return;
    }
    const invIdx = s.inventory.findIndex((i) => i.id === itemId);
    if (invIdx === -1 || s.inventory[invIdx].qty <= 0) return;

    const item = s.inventory[invIdx];
    item.qty -= 1;
    if (item.qty <= 0) s.inventory.splice(invIdx, 1);

    AG.playSound("heart");
    AG.advanceTime(15);
    AG.clearFeed();

    const h = s.hour;
    const isLateNightBonus = (h >= 0 && h <= 5) && (itemId === "cafe_gelado_lata" || itemId === "energetico_pessego");
    const isShiftBonus = (h >= 12 && h <= 19) && (itemId === "doce_morango_mochi" || itemId === "marmita_caseira_402");
    const timeBonus = (isLateNightBonus || isShiftBonus) ? 10 : 0;

    let baseAff = itemId === "fone_rosa_edicao" ? 30 : itemId === "artbook_indie_raro" ? 26 : itemId === "marmita_caseira_402" ? 22 : itemId === "trufas_cereja" ? 18 : 15;
    let baseIntim = itemId === "fone_rosa_edicao" ? 16 : itemId === "trufas_cereja" ? 12 : itemId === "vela_baunilha_cereja" ? 10 : 6;
    const bonusRemark = isLateNightBonus
      ? " E entregar isso bem no meio da madrugada salvou a minha noite inteira, timing perfeito!"
      : isShiftBonus
        ? " E trazer isso justo no horário do meu turno/fome da tarde... nossa, você me conhece demais!"
        : itemId === "fone_rosa_edicao"
          ? " ESSE É O FONE ROSA QUE EU TAVA NAMORANDO HÁ MESES!! Como é que você descobriu?!"
          : itemId === "trufas_cereja"
            ? " Trufa de cereja artesanal... você tá tentando me fazer derreter na sua frente, né?"
            : "";

    const baseGift = {
      action: `*Segura ${item.name} com as duas mãos e olha pra você radiante*`,
      speech: "Você lembrou de trazer isso pra mim?! Assim você me conquista sem eu ter nem como me defender!" + bonusRemark,
      extraDeltas: {
        affinity: baseAff + timeBonus,
        intimacyLevel: baseIntim,
        trust: 10 + (timeBonus ? 4 : 0) + (itemId === "fone_rosa_edicao" ? 10 : 0),
        heat: (itemId === "vela_baunilha_cereja" || itemId === "trufas_cereja") ? 20 : (6 + (timeBonus ? 4 : 0)),
        auroraEnergy: (itemId === "cafe_gelado_lata" || itemId === "energetico_pessego" || itemId === "marmita_caseira_402") ? 20 : 0,
        discomfort: -14,
        mood: (itemId === "vela_baunilha_cereja" || itemId === "trufas_cereja") ? "provocante" : "muito_feliz"
      }
    };
    const dynGift = AG.EmotionEngine ? AG.EmotionEngine.reactToAction("gift", baseGift) : baseGift;
    const pills = AG.applyDeltas(dynGift.extraDeltas || baseGift.extraDeltas);

    AG.pushFeed({
      type: "aurora",
      action: dynGift.action,
      speech: dynGift.speech,
      pills
    });
  };

  // ==========================================================================
  // PONTO 067–080: SISTEMA DE 12 EVENTOS ALEATÓRIOS INTERATIVOS & CLIMA/HORÁRIO
  // ==========================================================================
  AG.getDynamicLocationDesc = function (locId) {
    const s = AG.state;
    const base = (AG.LOCATIONS[locId] && AG.LOCATIONS[locId].desc) || "";
    const phase = AG.getPhaseOfDay(s.hour).id;
    const weatherNote = s.weather === "chuva_noturna"
      ? " 🌧️ Lá fora a chuva forte bate nas vidraças."
      : s.weather === "apagao_andar"
        ? " 🔦 As luzes principais oscilaram e o ambiente está à meia-luz."
        : "";
    const timeNote = phase === "madrugada"
      ? " O silêncio da madrugada envolve o ambiente."
      : phase === "manha"
        ? " A luz clara da manhã entra pelas janelas."
        : "";
    return base + timeNote + weatherNote;
  };

  const INTERACTIVE_RANDOM_EVENTS = [
    {
      id: "ev_encomenda_trocada",
      locations: ["ape_402", "corredor_4andar"],
      requireAurora: "any",
      title: "Encomenda do 404 na Sua Porta",
      desc: "O porteiro deixou por engano um pacote pequeno endereçado à Aurora na porta do seu Apê 402. O que você faz?",
      choices: [
        { id: "pkg_deliver_honest", tone: "sweet", label: "Entregar ou deixar o pacote lacrado direitinho pra Aurora (+14 Afinidade · +10 Confiança)" },
        { id: "pkg_open_sneak", tone: "ctrl", label: "[Furtivo] Abrir com cuidado pra ver o que ela comprou e fechar de novo (+1 Trunfo · +3 Percepção)" }
      ]
    },
    {
      id: "ev_queda_luz_corredor",
      locations: ["corredor_4andar", "ape_402", "ape_404"],
      requireAurora: "present",
      title: "Pique de Energia no 4º Andar",
      desc: "As luzes do quarto andar apagaram de repente por três minutos e a Aurora deu um pulinho no escuro bem perto de você!",
      choices: [
        { id: "dark_comfort", tone: "sweet", label: "Acender a lanterna do celular e puxá-la pra perto pra acalmá-la (+15 Afinidade · +10 Clima)" },
        { id: "dark_tease", tone: "hot", label: "Aproveitar a meia-luz pra sussurrar colado no pescoço dela no escuro (+18 Clima · +14 Tensão Dela)" }
      ]
    },
    {
      id: "ev_chave_esquecida",
      locations: ["corredor_4andar"],
      requireAurora: "present",
      title: "Aurora Trancada pro Lado de Fora",
      desc: "A porta do 404 bateu com o vento e a Aurora ficou no corredor só de moletom largo e meias esperando o chaveiro!",
      choices: [
        { id: "lock_invite_402", tone: "sweet", label: "Convidar ela pra esperar no seu Apê 402 com café quentinho (Ela entra no 402 · +16 Afinidade)" },
        { id: "lock_copy_key_trick", tone: "ctrl", label: "[Domínio Técnico] Abrir o trinco com um cartão e aproveitar pra memorizar o segredo (+Chave Reserva)" }
      ]
    },
    {
      id: "ev_mensagem_apagada",
      locations: ["ape_402", "corredor_4andar", "mercadinho_24h", "cafe_sakura", "praca_cerejeiras", "ape_404"],
      requireAurora: "absent",
      requireNumber: true,
      title: "'Aurora Apagou Esta Mensagem'",
      desc: "Seu celular vibrou às pressas com uma notificação da Aurora que ela apagou cinco segundos depois!",
      choices: [
        { id: "msg_tease_saw", tone: "hot", label: "Responder provocando que você leu a prévia antes dela apagar (+14 Clima · +3 Lábia)" },
        { id: "msg_recover_log", tone: "ctrl", label: "[Usar Código] Recuperar o cache da notificação oculta (+Segredo no Dossiê · +3 Código)" }
      ]
    },
    {
      id: "ev_cliente_urgente_freela",
      locations: ["ape_402", "cafe_sakura", "praca_cerejeiras"],
      requireAurora: "absent",
      title: "Freela de Emergência Pagando Dobrado",
      desc: "Um cliente desesperado ofereceu um bônus imediato se você resolver um bug crítico agora em 20 minutos!",
      choices: [
        { id: "freela_accept_fast", tone: "life", label: "Resolver o bug na hora usando seu Domínio Técnico (+R$ 95 · +4 Código · -10 Energia)" },
        { id: "freela_decline_calm", tone: "sweet", label: "Recusar para poupar sua cabeça e manter o foco no resto do dia (+12 Calma)" }
      ]
    },
    {
      id: "ev_elevador_parado",
      locations: ["corredor_4andar"],
      requireAurora: "present",
      title: "Elevador Travou por 5 Minutos Com Vocês Dois",
      desc: "O elevador deu um tranco entre o 3º e o 4º andar e parou à meia-luz com a Aurora olhando pra cima bem perto de você!",
      choices: [
        { id: "elev_tease_close", tone: "hot", label: "Encostar a mão na parede do elevador e prender o olhar dela de perto (+16 Clima · +10% Influência)" },
        { id: "elev_calm_hold", tone: "sweet", label: "Segurar a mão dela até o elevador voltar a andar (+16 Afinidade · +12 Confiança)" }
      ]
    },
    {
      id: "ev_desafio_cafe_gelado",
      locations: ["mercadinho_24h"],
      requireAurora: "present",
      title: "Última Lata de Café Gelado do Mercadinho",
      desc: "Você e a Aurora esticaram a mão ao mesmo tempo para a última lata de Café Gelado de Baunilha na prateleira alta do corredor vazio!",
      choices: [
        { id: "cafe_tease_tall", tone: "hot", label: "Segurar a lata bem no alto sorrindo e dizer que ela precisa vencer um desafio pra pegar (+14 Clima · +14% Rivalidade)" },
        { id: "cafe_pull_waist_reach", tone: "hot", label: "Segurar ela pela cintura e erguê-la até a prateleira alta colada em você (+18 Clima · +14 Intimidade)" },
        { id: "cafe_give_sweet", tone: "sweet", label: "Pagar a lata pra ela sem pensar duas vezes (-R$ 12 · +18 Afinidade)" }
      ]
    },
    {
      id: "ev_aurora_exhausted_shift",
      locations: ["corredor_4andar", "ape_404", "ape_402"],
      requireAurora: "present",
      title: "Exausta Depois do Turno no Café Sakura",
      desc: "A Aurora encosta na parede soltando um suspiro cansado com os pés doendo de ficar horas em pé atrás do balcão!",
      choices: [
        { id: "exh_carry_her_404", tone: "sweet", label: "Pegar ela no colo com facilidade sem esforço nenhum (+20 Afinidade · +16 Intimidade · +25 Disposição)" },
        { id: "exh_massage_feet", tone: "hot", label: "Ajudar ela a sentar e fazer massagem lenta nos pés e ombros (+18 Intimidade · +18 Abertura · +30 Disposição)" },
        { id: "exh_tease_coffee", tone: "ctrl", label: "Provocar que a baixinha está sem bateria e pagar um energético pra ela (-R$ 10 · +12 Clima · +20 Disposição)" }
      ]
    },
    {
      id: "ev_aurora_skinship_movie",
      locations: ["ape_404", "ape_402"],
      requireAurora: "present",
      title: "Susto no Filme de Terror Colada em Você",
      desc: "No meio de uma cena tensa no escuro, a Aurora dá um pulo e esconde o rosto no seu peito segurando firme sua camiseta com o coração disparado!",
      choices: [
        { id: "mov_wrap_arms", tone: "sweet", label: "Envolver ela no abraço e fazer cafuné até o coração acalmar (+18 Intimidade · +18 Afinidade)" },
        { id: "mov_whisper_neck", tone: "hot", label: "Sussurrar bem perto do ouvido dela: 'Seu coração tá batendo forte demais...' (+20 Tensão Dela · +16 Clima)" },
        { id: "mov_laugh_tease", tone: "ctrl", label: "Rir baixinho zoando a valentona do 404 com medo de filme (+12 Rivalidade · +10 Clima)" }
      ]
    },
    {
      id: "ev_aurora_outfit_opinion",
      locations: ["ape_404", "ape_402", "corredor_4andar"],
      requireAurora: "present",
      title: "'O Que Você Achou Dessa Roupa Nova?'",
      desc: "A Aurora dá uma voltinha na sua frente estreando um visual novo, segurando a barra da roupa com um sorrisinho ansioso pela sua nota!",
      choices: [
        { id: "out_sincere_admire", tone: "sweet", label: "Elogiar olhando nos olhos e dizer que ficou perfeita nela (+16 Afinidade · +14 Intimidade)" },
        { id: "out_flirty_close", tone: "hot", label: "Chegar bem perto dizendo que o visual está perigosamente irresistível (+18 Tensão Dela · +18 Clima)" },
        { id: "out_tease_height", tone: "ctrl", label: "Brincar que a roupa até faz ela parecer ter 1,50m inteiros (+14 Rivalidade · +10 Influência)" }
      ]
    },
    // === NOVOS EVENTOS ÚNICOS POR LOCAL (PICANTES COM ELA + SOLO SEM ELA!) ===
    {
      id: "ev_aurora_camiseta_sua",
      locations: ["ape_404", "ape_402"],
      requireAurora: "present",
      requireConsensualSpicy: true,
      title: "Ela Vestindo Só Sua Camiseta Larga",
      desc: "A Aurora aparece do outro lado do quarto vestindo uma camiseta sua que desce quase até a metade das coxas dela, com os ombros descobertos e um sorriso desafiador: 'Sua camisa virou vestido em mim... vai querer de volta agora ou vai ficar só olhando?'",
      choices: [
        { id: "shirt_pull_lap_spicy", tone: "hot", label: "Puxar ela direto pro seu colo e beijar o pescoço dela devagar (+22 Clima · +20 Intimidade · +20 Tensão Dela)" },
        { id: "shirt_hem_tease", tone: "hot", label: "Segurar a barra da sua camiseta puxando ela contra o seu peito: 'Ficou perigosa demais em você'" },
        { id: "shirt_keep_it_sweet", tone: "sweet", label: "Sorrir e dizer que ela acabou de confiscar a camiseta oficialmente (+18 Afinidade · +14 Intimidade)" }
      ]
    },
    {
      id: "ev_cafe_avental_picante",
      locations: ["cafe_sakura"],
      requireAurora: "present",
      title: "O Laço Solto do Avental no Café Sakura",
      desc: "Atrás do balcão quase vazio do Café Sakura, o laço do avental do uniforme da Aurora se desamarrou enquanto ela segura duas jarras de leite vaporizado. Ela olha por cima do ombro corada: 'Ei 402... minhas mãos tão ocupadas. Amarra atrás pra mim rapidinho?'",
      choices: [
        { id: "apron_tie_slow_whisper", tone: "hot", label: "Envolver a cintura dela devagar pra dar o laço e sussurrar bem junto à nuca dela (+20 Clima · +18 Tensão Dela)" },
        { id: "apron_tease_pull", tone: "ctrl", label: "Puxar de leve as pontas do avental trazendo ela um passo contra você com um sorriso lento (+16 Clima · +12 Influência)" },
        { id: "apron_gentle_knot", tone: "sweet", label: "Fazer um laço caprichado e ajeitar a gola do uniforme dela com carinho (+16 Afinidade · +12 Intimidade)" }
      ]
    },
    {
      id: "ev_praca_banco_perto",
      locations: ["praca_cerejeiras"],
      requireAurora: "present",
      title: "Brisa Fria no Banco Sob as Cerejeiras",
      desc: "Uma rajada de vento faz as pétalas dançarem no banco mais afastado da praça. A Aurora dá um leve tremor nos ombros e desliza pro seu lado até o ombro pequeno encostar firme contra suas costelas, olhando de baixo pra cima com um brilho provocante.",
      choices: [
        { id: "park_ev_jacket_kiss", tone: "hot", label: "Cobrir os dois com o seu casaco e beijar o pescoço e a boca dela devagar ali escondidos (+20 Clima · +18 Intimidade)" },
        { id: "park_ev_hand_thigh", tone: "hot", label: "Apoiar a mão quente firme na cintura dela trazendo ela colada na sua coxa (+18 Clima · +18 Tensão Dela)" },
        { id: "park_ev_warm_embrace", tone: "sweet", label: "Passar o braço em volta dela e ficar curtindo a brisa da praça juntos (+18 Afinidade · +12 Confiança)" }
      ]
    },
    {
      id: "ev_parede_fina_402",
      locations: ["ape_402"],
      requireAurora: "absent",
      title: "Silêncio do 402 · Parede Divisória",
      desc: "Sozinho no seu apartamento, o silêncio do quarto andar chama atenção. Você nota um bloco de post-its na sua escrivaninha ao lado do notebook aberto.",
      choices: [
        { id: "wall_leave_note", tone: "hot", label: "Escrever um bilhete provocante e deslizar por baixo da porta do 404 pra ela achar depois" },
        { id: "wall_focus_code", tone: "life", label: "Aproveitar a tranquilidade sozinho pra estudar código e organizar a cabeça (+3 Código · +12 Calma)" }
      ]
    },
    {
      id: "ev_sindico_corredor_solo",
      locations: ["corredor_4andar"],
      requireAurora: "absent",
      title: "O Síndico Passando Pelo 4º Andar",
      desc: "Você cruza sozinho com o síndico rabugento no corredor. Ele olha pra porta fechada do 404 resmungando que chegaram duas entregas tarde da noite e que a moradora quase atrasou uma taxa.",
      choices: [
        { id: "sind_defend_aurora", tone: "sweet", label: "Usar sua lábia pra defender a Aurora e contornar a reclamação sem sobrar nada pra ela (+2 Lábia · Efeito positivo depois)" },
        { id: "sind_fish_info", tone: "ctrl", label: "Puxar conversa calma com o síndico pra descobrir detalhes das notificações do 404 (+3 Percepção · Segredo/Trunfo)" }
      ]
    },
    {
      id: "ev_cafe_barista_fofoca",
      locations: ["cafe_sakura"],
      requireAurora: "absent",
      title: "Papo com a Colega de Balcão do Sakura",
      desc: "A Aurora não está no turno agora, mas a colega de balcão reconhece você como 'o vizinho alto do 402' e comenta rindo que a Aurora sempre toma o mesmo café gelado de baunilha quando está exausta.",
      choices: [
        { id: "barista_prepay_treat", tone: "sweet", label: "Deixar um café gelado e um doce pagos pra colega entregar no próximo turno dela (-R$ 16 · Efeito depois)" },
        { id: "barista_learn_habits", tone: "life", label: "Conversar uns minutos pra entender melhor os gostos e horários dela (+3 Percepção · +2 Lábia)" }
      ]
    },
    {
      id: "ev_praca_feira_noite",
      locations: ["praca_cerejeiras"],
      requireAurora: "absent",
      title: "Feirinha Artesanal na Praça",
      desc: "Caminhando sozinho pela Praça das Cerejeiras, você passa por uma barraquinha pequena vendendo velas artesanais de cereja e âmbar com desconto de fim de tarde.",
      choices: [
        { id: "feira_buy_candle", tone: "hot", label: "Comprar uma Vela Cereja & Âmbar com desconto pra sua Mochila (-R$ 24 · Ideal pra criar clima!)" },
        { id: "feira_stroll_sketch", tone: "life", label: "Apenas dar uma volta observando as luzes da praça pra clarear a mente (+14 Calma · +2 Percepção)" }
      ]
    },
    {
      id: "ev_mercadinho_promocao",
      locations: ["mercadinho_24h"],
      requireAurora: "absent",
      title: "Promoção Relâmpago na Prateleira do 24h",
      desc: "Sozinho no Mercadinho 24h antes da reposição, o caixa anuncia um combo promocional com Café Gelado de Baunilha e Mochi de Morango bem abaixo do preço normal.",
      choices: [
        { id: "merc_grab_pack", tone: "sweet", label: "Garantir o combo pra sua Mochila (-R$ 18 · +1 Café Gelado e +1 Mochi de Morango)" },
        { id: "merc_hot_coffee_self", tone: "life", label: "Pegar só um café quente rápido pra você mesmo recarregar (-R$ 8 · +18 Energia · +18 Saciedade)" }
      ]
    },
    {
      id: "ev_404_vazio_descoberta",
      locations: ["ape_404"],
      requireAurora: "absent",
      title: "Detalhe Aberto na Mesa do 404 Vazio",
      desc: "Com a Aurora fora do apartamento, você repara num caderno de rascunhos aberto ao lado do monitor com uma caneta cor-de-rosa apoiada na margem.",
      choices: [
        { id: "empty404_leave_doodle", tone: "hot", label: "Deixar um rabisco travesso e um recado quente no cantinho da folha pra ela achar quando voltar" },
        { id: "empty404_study_desk", tone: "ctrl", label: "Apenas memorizar as referências e anotações sem tocar em nada (+3 Percepção · +2 Furtividade · +8% Influência)" }
      ]
    }
  ];

  AG.tryTriggerInteractiveRandomEvent = function () {
    const s = AG.state;
    const a = s.aurora;
    const loc = s.currentLocation;
    const auroraPresentAwake = AG.isAuroraHere() && a.activity !== "dormindo";
    const auroraAbsent = !AG.isAuroraHere();

    const eligible = INTERACTIVE_RANDOM_EVENTS.filter((ev) => {
      if (ev.locations && !ev.locations.includes(loc)) return false;
      if (ev.requireAurora === "present" && !auroraPresentAwake) return false;
      if (ev.requireAurora === "absent" && !auroraAbsent) return false;
      if (ev.requireNumber && (!s.unlocks || !s.unlocks.hasAuroraNumber)) return false;
      if (ev.requireConsensualSpicy) {
        const okSpicy = (a.heat >= 30 || a.affinity >= 28 || (a.intimacyLevel || 0) >= 24) &&
          a.discomfort < 35 &&
          (!s.phoneState || s.phoneState.manipulationCount === 0) &&
          (a.leveragePressure || 0) < 25;
        if (!okSpicy) return false;
      }
      return true;
    });

    if (eligible.length === 0) return false;

    const lastId = s.flags && s.flags.lastRandomEventId;
    const pool = eligible.length > 1 ? eligible.filter((ev) => ev.id !== lastId) : eligible;
    const ev = pool[(s.totalActionsTaken + s.day) % pool.length];

    s.lastRandomEventTurn = s.totalActionsTaken;
    if (s.flags) s.flags.lastRandomEventId = ev.id;
    s.activeRandomEvent = ev;
    return true;
  };

  AG.handleRandomEventChoice = function (choiceId) {
    const s = AG.state;
    const p = s.player;
    const a = s.aurora;
    const sk = (p && p.skills) || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
    s.activeRandomEvent = null;
    AG.clearFeed();

    // Primeiro verifica o Motor Emocional (IA Sombria da Aurora, Crises Emocionais & Noite de Drinks)
    if (AG.EmotionEngine && AG.EmotionEngine.handleEmotionEventChoice && AG.EmotionEngine.handleEmotionEventChoice(choiceId)) {
      AG.saveGame("autosave");
      return;
    }

    // Respostas da Pergunta-Armadilha de Suspeita Crítica (#019)
    if (choiceId === "trap_charisma_bluff") {
      if (sk.charisma >= 20) {
        AG.playSound("heart");
        const pills = AG.applyDeltas({ suspicion: -65, discomfort: -15, trust: 10, charisma: 4 });
        AG.pushFeed({
          type: "aurora",
          action: "*Ouve sua explicação firme e acaba suspirando aliviada, desfazendo a postura defensiva*",
          speech: "Desculpa... eu ando tão virada de madrugada que comecei a ver coisa onde não existe. Você sempre fala comigo com tanta segurança que eu confio em você.",
          pills
        });
      } else {
        AG.playSound("warn");
        const pills = AG.applyDeltas({ affinity: -20, discomfort: 28, suspicion: 10, mood: "irritada" });
        AG.pushFeed({
          type: "aurora",
          action: "*Semicerra os olhos percebendo sua hesitação*",
          speech: "Você gaguejou! Eu sabia que tinha dedo seu nisso! Não tenta me enrolar quando não tem lábia pra sustentar!",
          pills
        });
      }
      return;
    }
    if (choiceId === "trap_honest_confess") {
      AG.playSound("click");
      if (s.phoneState && s.phoneState.leverage > 0) s.phoneState.leverage -= 1;
      const pills = AG.applyDeltas({ suspicion: -55, discomfort: -10, affinity: 6, trust: 8 });
      AG.pushFeed({
        type: "aurora",
        action: "*Balança a cabeça, mas a raiva cede diante da sua sinceridade*",
        speech: "Pelo menos você teve a decência de admitir em vez de mentir na minha cara. Não mexe mais nas minhas coisas sem pedir, entendeu?",
        pills
      });
      return;
    }
    if (choiceId === "trap_defensive_lie") {
      AG.playSound("warn");
      const pills = AG.applyDeltas({ affinity: -24, discomfort: 32, trust: -18, mood: "irritada" });
      AG.pushFeed({
        type: "aurora",
        action: "*Dá um passo pra trás revoltada com a sua ironia*",
        speech: "Essa sua reação já me respondeu tudo! Fica longe das minhas coisas!",
        pills
      });
      return;
    }

    // Respostas do Contra-Ataque da Aurora (Rivalidade >= 45%)
    if (choiceId === "retal_counter_bluff") {
      if (sk.charisma >= 18) {
        AG.playSound("hot");
        const pills = AG.applyDeltas({ influence: 18, heat: 14, rivalry: 8, dominance: -12, charisma: 3, mood: "provocante", specialScene: "paredeCorredor" });
        AG.pushFeed({
          type: "aurora",
          action: "*Fica boquiaberta quando você mostra que já tinha acesso alternativo e dá um passo pra perto, desarmada mas eletrificada*",
          speech: "Você já tinha previsto minha jogada?! Que ódio... por que isso só me deixa com mais vontade de ganhar de você?!",
          pills
        });
      } else {
        AG.playSound("click");
        const pills = AG.applyDeltas({ dominance: 14, rivalry: 10, mood: "controladora" });
        AG.pushFeed({
          type: "aurora",
          action: "*Solta uma gargalhada vitoriosa cruzando os braços*",
          speech: "Blefe fraco, 402! Ponto pro 404 dessa vez — você vai ter que ralar mais pra me acompanhar!",
          pills
        });
      }
      return;
    }
    if (choiceId === "retal_bold_wager") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 16, rivalry: 14, influence: 10, mood: "provocante", specialScene: "paredeCorredor" });
      AG.pushFeed({
        type: "aurora",
        action: "*Aperta sua mão selando o acordo com fogo nos olhos*",
        speech: "Fechado!! Tudo ou nada hoje no quarto andar — prepara a coragem porque eu não vou pegar leve com você!",
        pills
      });
      return;
    }
    if (choiceId === "retal_truce_sweet") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 16, trust: 10, rivalry: -16, discomfort: -10, mood: "dengosa" });
      AG.pushFeed({
        type: "aurora",
        action: "*Desmancha a pose de rival e abre um sorriso derretido*",
        speech: "Suborno com café gelado? Hum... tá bom, aceito a trégua só porque você sabe exatamente meu ponto fraco!",
        pills
      });
      return;
    }

    // Respostas dos Eventos Aleatórios Interativos
    if (choiceId === "pkg_deliver_honest") {
      AG.playSound("heart");
      if (AG.isAuroraHere() && a.activity !== "dormindo") {
        const pills = AG.applyDeltas({ affinity: 14, trust: 10, discomfort: -8 });
        AG.pushFeed({ type: "aurora", action: "*Pega o pacote sorrindo agradecida*", speech: "Ai, minha encomenda de tintas e meias novas! Obrigada por trazer direitinho pra mim, vizinho!", pills });
      } else {
        const pills = AG.applyDeltas({ trust: 6, personaWarm: 2 });
        s.pendingDelayedEffects.push({
          deltas: { affinity: 14, trust: 8, discomfort: -8, mood: "dengosa" },
          memoryId: "entregou_encomenda_404",
          memoryText: "Guardou e deixou a encomenda extraviada dela intacta com um bilhete simpático.",
          memoryCat: "bom",
          auroraAction: "*Segura o pacote lacrado que você deixou pra ela com um sorriso genuíno*",
          auroraSpeech: "Você guardou minha encomenda lacradinha e ainda deixou recado pra mim? Ganhou pontos demais, 402!"
        });
        AG.pushFeed({ type: "narrative", text: "Você guardou a encomenda dela com cuidado e deixou um aviso na porta do 404. Ela vai adorar assim que voltar.", pills });
      }
    } else if (choiceId === "pkg_open_sneak") {
      AG.playSound("click");
      s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
      s.unlocks.unlockedSpyApp = true;
      const pills = AG.applyDeltas({ stealth: 3, perception: 3, suspicion: sk.stealth >= 18 ? 0 : 12 });
      AG.pushFeed({ type: "narrative", text: "Você abriu o pacote com vapor sem rasgar o lacre, viu a encomenda secreta dela e fechou tudo de volta sem deixar marca.", pills });
      if (AG.queueToast) AG.queueToast("+1 Trunfo salvo", "ctrl", "up");
    } else if (choiceId === "dark_comfort") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 15, heat: 10, trust: 8, mood: "dengosa", specialScene: "chamego" });
      AG.pushFeed({ type: "aurora", action: "*Agarra na sua camisa no escuro até a luz voltar*", speech: "Eu não tenho medo de escuro, tá?! Só encostei em você porque você tava perto e quentinho!", pills });
    } else if (choiceId === "dark_tease") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 18, arousal: 14, dominance: 8, desire: 12, mood: "provocante", specialScene: "paredeCorredor" });
      AG.pushFeed({ type: "aurora", action: "*Arrepia inteira no escuro sentindo sua voz no pescoço*", speech: "Se aproveitar do apagão pra me deixar arrepiada assim é golpe baixo, Diretor...", pills });
    } else if (choiceId === "lock_invite_402") {
      AG.playSound("heart");
      s.flags.auroraVisitingYourApt = true;
      s.flags.auroraCalledToCorridor = false;
      s.flags.auroraIn404WithPlayer = false;
      s.currentLocation = "ape_402";
      const pills = AG.applyDeltas({ affinity: 16, trust: 12, heat: 8, mood: "dengosa" });
      AG.pushFeed({ type: "aurora", action: "*Entra no seu Apê 402 de meias e se joga no seu sofá*", speech: "Salva pelo vizinho! Vou acampar aqui no seu 402 enquanto isso!", pills });
    } else if (choiceId === "lock_copy_key_trick") {
      AG.playSound("click");
      s.unlocks.hasSpareKey404 = true;
      if (s.belongings && s.belongings.spareKey404) s.belongings.spareKey404.state = "hidden_in_402";
      AG.checkHubAndStoryProgression();
      const pills = AG.applyDeltas({ affinity: 10, tech: 4, stealth: 4 });
      AG.pushFeed({ type: "narrative", text: "Você destravou o trinco pra ela em 10 segundos e ainda garantiu acesso permanente ao 404!", pills });
    } else if (choiceId === "msg_tease_saw") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 14, affinity: 8, charisma: 3, mood: "corada_sensivel" });
      if (s.phoneChat) {
        const t = AG.getFormattedClock();
        s.phoneChat.push({ sender: "player", text: "Tarde demais, 404 — eu li a prévia da notificação antes de você apagar.", time: t });
        s.phoneChat.push({ sender: "aurora", text: "NÃO ERA PRA VOCÊ TER VISTO!! Esquece o que tava escrito lá, seu curioso!!", time: t });
      }
      AG.pushFeed({
        type: "narrative",
        text: "Você mandou a provocação no chat dizendo que leu a prévia antes dela apagar. Três segundos depois o celular vibrou com ela digitando em caixa alta tentando disfarçar o rubor.",
        pills
      });
    } else if (choiceId === "msg_recover_log") {
      AG.playSound("click");
      AG.unlockSecret("cache_msgs_apagadas", "SEGREDO DO DOSSIÊ: Backup das Mensagens Apagadas de Madrugada!");
      const pills = AG.applyDeltas({ tech: 3, perception: 3, personaCold: 2 });
      AG.pushFeed({ type: "narrative", text: "Você recuperou o log de notificações do sistema: era um desabafo íntimo dela sobre você (salvo no seu Dossiê de Segredos)!", pills });
    } else if (choiceId === "freela_accept_fast") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ money: 95, tech: 4, energy: -10 });
      AG.pushFeed({ type: "narrative", text: "Você corrigiu o bug em tempo recorde e recebeu R$ 95 via Pix!", pills });
    } else if (choiceId === "freela_decline_calm") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ calm: 12, energy: 5 });
      AG.pushFeed({ type: "narrative", text: "Você priorizou sua paz mental e deixou o resto do dia livre.", pills });
    } else if (choiceId === "elev_tease_close") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 16, arousal: 14, influence: 10, desire: 10, mood: "provocante", specialScene: "paredeCorredor" });
      AG.pushFeed({ type: "aurora", action: "*Fica presa no olhar intenso à meia-luz do elevador com a respiração acelerada*", speech: "Se esse elevador demorar mais dois minutos pra destravar, eu não me responsabilizo pelo que acontece aqui dentro...", pills });
    } else if (choiceId === "elev_calm_hold") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 16, trust: 12, mood: "dengosa", specialScene: "chamego" });
      AG.pushFeed({ type: "aurora", action: "*Entrelaça os dedos nos seus até a luz voltar*", speech: "Com você segurando minha mão, esse elevador podia ficar parado até amanhã.", pills });
    } else if (choiceId === "cafe_tease_tall") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 14, rivalry: 14, influence: 8, mood: "provocante" });
      AG.pushFeed({ type: "aurora", action: "*Pula tentando alcançar a lata na sua mão levantada, rindo indignada*", speech: "ABAIXA ESSE BRAÇO, POSTE!! Você adora usar sua altura pra me tirar do sério, né?!", pills });
    } else if (choiceId === "cafe_pull_waist_reach") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 18, arousal: 16, intimacyLevel: 14, desire: 12, mood: "corada_sensivel", specialScene: "levantandoEla" });
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você firma as duas mãos na cintura dela no corredor deserto e a ergue devagar do chão até ela alcançar a lata sozinha — deixando o rosto dela bem na altura do seu quando você a traz de volta.",
        action: "Aurora solta um riso entrecortado apoiando a mão no seu ombro, o coração acelerado e as bochechas pegando fogo com a proximidade.",
        speech: "Ei!! Me pegou no colo no meio do corredor do mercadinho como se não fosse nada...\n\n...Pior que você acertou exatamente o jeito de me deixar sem fala. Paga logo essa lata que eu quero subir pro quarto andar com você.",
        pills
      });
    } else if (choiceId === "cafe_give_sweet") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ money: -12, affinity: 18, trust: 8, mood: "dengosa" });
      AG.pushFeed({ type: "aurora", action: "*Abraça a lata gelada e dá um beijinho rápido na sua bochecha ficando na ponta dos pés*", speech: "Ganhou mil pontos comigo hoje!! Você é o melhor vizinho do mundo!", pills });
    }

    // --- HANDLERS: LEITURA FRIA & PSICOLOGIA DIRETA ---
    else if (choiceId === "coldread_hands") {
      const bonus = sk.perception >= 14 ? 8 : 0;
      AG.playSound("click");
      const pills = AG.applyDeltas({ composure: -24, influence: 16 + bonus, perception: 3, personaCold: 3, mood: "desconfiada" });
      AG.pushFeed({
        type: "aurora",
        action: "*Solta instantaneamente a barra das mangas como se tivesse levado um choque, corando de raiva e surpresa*",
        speech: "Para de olhar pras minhas mãos!! Que mania sinistra é essa de ler cada movimento meu como se fosse um interrogatório?!",
        pills
      });
    } else if (choiceId === "coldread_sarcasm") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ composure: -22, dominance: -14, influence: 14, heat: 8, personaCold: 3, mood: "carente" });
      AG.pushFeed({
        type: "aurora",
        action: "*A pose marrenta racha visivelmente; ela engole seco e abaixa os braços cruzados por um instante raro*",
        speech: "...Você não tinha o direito de acertar tão em cheio. Eu só uso sarcasmo porque deixar alguém chegar perto demais dá medo, tá bom?!",
        pills
      });
    } else if (choiceId === "coldread_phone") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ composure: -18, rivalry: 14, heat: 12, influence: 12, personaBold: 3, mood: "provocante" });
      AG.pushFeed({
        type: "aurora",
        action: "*Desvia o olhar do seu bolso no mesmo segundo, mordendo o lábio entre a paranoia e a provocação*",
        speech: "Eu não tava olhando pro seu celular!! ...Mas já que você tocou no assunto, o que exatamente você anda guardando aí sobre mim, 402?!",
        pills
      });
    }

    // --- HANDLERS: CONFRONTO DE CHANTAGEM & BARGANHA DO DOSSIÊ ---
    else if (choiceId === "bm_ultimatum_key" || choiceId === "bm_extort_favors_money" || choiceId === "bm_velvet_bargain" || choiceId === "bm_burn_proof_shock") {
      const secId = s.flags.activeBlackmailSecretId;
      const sec = s.secretsDossier && secId ? s.secretsDossier[secId] : null;
      const pVal = sec ? (sec.pressureVal || 25) : 25;

      if (choiceId === "bm_ultimatum_key") {
        AG.playSound("warn");
        if (sec) sec.state = "used_pressure";
        if (s.phoneState.leverage > 0) s.phoneState.leverage -= 1;
        s.phoneState.manipulationCount += 1;
        s.unlocks.hasSpareKey404 = true;
        s.sharedStory.unlocked404Key = true;
        if (!s.unlockedLocations.includes("ape_404")) s.unlockedLocations.push("ape_404");
        const pills = AG.applyDeltas({ leveragePressure: pVal, composure: -22, influence: 20, dominance: -18, discomfort: 20, affinity: -14, personaRuthless: 5, mood: "manipulada", specialScene: "manipulada" });
        AG.addMemory("chantagem_chave_404", `Usou '${sec ? sec.name : "um segredo"}' para encurralar a Aurora e conseguir acesso ao 404 sob pressão.`, "ruim", true);
        AG.pushFeed({
          type: "aurora",
          action: "*Morde o lábio tremendo de raiva contida, pega a chave reserva do 404 e coloca na palma da sua mão sem conseguir reagir*",
          speech: "Você é frio demais... Tá aí a chave do 404. Eu vou seguir suas regras por enquanto, mas não pensa que eu vou esquecer que você jogou tão baixo assim.",
          pills
        });
      } else if (choiceId === "bm_extort_favors_money") {
        AG.playSound("warn");
        if (sec) sec.state = "used_pressure";
        if (s.phoneState.leverage > 0) s.phoneState.leverage -= 1;
        s.phoneState.manipulationCount += 1;
        const pills = AG.applyDeltas({ money: 65, leveragePressure: pVal, influence: 14, discomfort: 22, affinity: -16, personaRuthless: 5, mood: "manipulada", specialScene: "manipulada" });
        AG.addMemory("extorsao_404", `Usou '${sec ? sec.name : "um segredo"}' para arrancar R$ 65 de 'taxa de silêncio' da Aurora.`, "ruim", true);
        AG.pushFeed({
          type: "aurora",
          action: "*Faz o Pix de R$ 65 com o dedo tremendo e bloqueia a tela te encarando com gelo nos olhos*",
          speech: "Pronto. R$ 65 na sua conta pelo seu silêncio. Você realmente não tem escrúpulo nenhum, né 402? Reza pra eu nunca descobrir algo seu.",
          pills
        });
      } else if (choiceId === "bm_velvet_bargain") {
        if (sk.charisma >= 16) {
          AG.playSound("hot");
          if (sec) sec.state = "used_pressure";
          if (s.phoneState.leverage > 0) s.phoneState.leverage -= 1;
          const pills = AG.applyDeltas({ influence: 20, dominance: -20, heat: 14, composure: -16, charisma: 3, personaCold: 4, mood: "provocante", specialScene: "paredeCorredor" });
          AG.addMemory("pacto_velado_404", `Transformou '${sec ? sec.name : "um segredo"}' num pacto de poder velado sem gerar atrito aberto.`, "controle", true);
          AG.pushFeed({
            type: "aurora",
            action: "*Olha fundo nos seus olhos assimilando a proposta elegante e solta um riso baixo de respeito e tensão*",
            speech: "Sem ameaça barata... só um acordo entre nós dois pra eu baixar minha pose e você guardar meu segredo. Você é perigosamente inteligente, sabia?",
            pills
          });
        } else {
          AG.playSound("warn");
          const pills = AG.applyDeltas({ discomfort: 16, suspicion: 14, dominance: 10, mood: "irritada" });
          AG.pushFeed({
            type: "aurora",
            action: "*Cruza os braços cortando seu discurso*",
            speech: "Não tenta embrulhar chantagem em papel bonito se você não tem lábia pra sustentar! Fala logo o que você quer ou sai daqui!",
            pills
          });
        }
      } else if (choiceId === "bm_burn_proof_shock") {
        AG.playSound("heart");
        if (sec) sec.state = "burned_trust";
        if (s.phoneState.leverage > 0) s.phoneState.leverage -= 1;
        s.phoneState.manipulationCount = 0;
        const pills = AG.applyDeltas({ leveragePressure: -100, composure: -28, affinity: 24, trust: 26, discomfort: -26, influence: 12, personaWarm: 4, mood: "dengosa", specialScene: "chamego" });
        AG.addMemory("queimou_prova_frente_dela", `Apagou '${sec ? sec.name : "uma prova grave"}' bem diante dos olhos dela para provar que não precisava de chantagem.`, "bom", true);
        AG.pushFeed({
          type: "aurora",
          action: "*Fica paralisada vendo você apagar permanentemente o arquivo e a lixeira bem na frente dela; os olhos dela brilham completamente desmontados*",
          speech: "Você... apagou tudo na minha frente podendo me destruir com aquilo?! Meu Deus... você acabou de quebrar todas as barreiras que eu tinha contra você.",
          pills
        });
      }
    }

    // --- HANDLERS: AÇÕES AUTÔNOMAS DA AURORA (CONTRA-CHANTAGEM, FLAGRA NO 402 & TESTE) ---
    else if (choiceId === "cb_ice_bluff") {
      if (sk.charisma >= 18) {
        AG.playSound("hot");
        const pills = AG.applyDeltas({ composure: -26, influence: 22, dominance: -16, charisma: 3, personaCold: 4, mood: "desconfiada" });
        AG.pushFeed({
          type: "aurora",
          action: "*A mão que segurava o celular abaixa devagar diante da sua frieza inabalável*",
          speech: "Você nem piscou... como você consegue continuar tão frio assim?! Droga, blefar contra você é impossível!",
          pills
        });
      } else {
        AG.playSound("warn");
        const pills = AG.applyDeltas({ dominance: 20, leveragePressure: -20, discomfort: 16, mood: "controladora" });
        AG.pushFeed({
          type: "aurora",
          action: "*Sorri triunfante balançando o celular*",
          speech: "Suou frio, né 402?! Agora estamos empatados — nunca mais subestima a moradora do 404!",
          pills
        });
      }
    } else if (choiceId === "cb_mutual_pact") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ discomfort: -18, heat: 16, rivalry: 14, influence: 10, mood: "provocante", specialScene: "paredeCorredor" });
      AG.pushFeed({
        type: "aurora",
        action: "*Estende a mão pequena com um sorriso perigoso e cúmplice*",
        speech: "Trégua armada fechada então: você guarda os meus segredos, eu guardo os seus... e a gente resolve o resto na provocação.",
        pills
      });
    } else if (choiceId === "cb_burn_own_leverage") {
      AG.playSound("heart");
      s.phoneState.manipulationCount = 0;
      const pills = AG.applyDeltas({ leveragePressure: -100, discomfort: -30, trust: 22, affinity: 16, personaWarm: 4, mood: "espontanea" });
      AG.pushFeed({
        type: "aurora",
        action: "*Suspira aliviada e apaga as fotos do próprio celular também*",
        speech: "Feito. Apaguei o que tinha sobre você também. Obrigada por parar essa guerra maluca antes da gente se destruir.",
        pills
      });
    } else if (choiceId === "cb_escalate_ruthless") {
      AG.playSound("warn");
      const pills = AG.applyDeltas({ leveragePressure: 25, rivalry: 22, discomfort: 22, personaRuthless: 5, mood: "irritada" });
      AG.pushFeed({
        type: "aurora",
        action: "*Os olhos dela faíscam em guerra aberta*",
        speech: "Quer levar isso até o limite?! Pois vai ter guerra total entre o 402 e o 404!",
        pills
      });
    } else if (choiceId === "snoop_weaponize") {
      AG.playSound("click");
      s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
      AG.unlockSecret("conta_alt_desabafos", "📸 FLAGRANTE NO 402: Você fotografou a Aurora invadindo sua mesa (+Trunfo no Dossiê)!");
      const pills = AG.applyDeltas({ composure: -24, influence: 18, leveragePressure: 18, personaRuthless: 4, mood: "manipulada" });
      AG.pushFeed({
        type: "aurora",
        action: "*Cobre o rosto em pânico quando ouve o clique da sua câmera*",
        speech: "APAGA ESSA FOTO!! Eu só vim dar uma olhada rápida na sua mesa... droga, agora eu caí inteirinha na sua armadilha!",
        pills
      });
    } else if (choiceId === "snoop_cold_mindgame") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ composure: -28, influence: 18, suspicion: -15, personaCold: 4, mood: "carente" });
      AG.pushFeed({
        type: "aurora",
        action: "*Fica completamente travada quando você nem levanta a voz — apenas senta calmo observando ela se explicar*",
        speech: "Eu... eu juro que não mexi em nada! Para de sorrir tão calmo assim, é mil vezes pior do que se você gritasse comigo!",
        pills
      });
    } else if (choiceId === "snoop_tease_pin") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 18, rivalry: 12, composure: -16, personaBold: 4, mood: "provocante", specialScene: "paredeCorredor" });
      AG.pushFeed({
        type: "aurora",
        action: "*Recua até a escrivaninha toda corada mas rindo nervosa com você encostado na porta*",
        speech: "Ei! Vai me cobrar pedágio por invadir o 402?! Fala logo quanto custa minha liberdade, Diretor...",
        pills
      });
    } else if (choiceId === "snoop_let_go_warm") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 16, trust: 14, suspicion: -20, composure: -14, personaWarm: 4, mood: "dengosa" });
      AG.pushFeed({
        type: "aurora",
        action: "*Abaixa a cabeça sem graça e acaba abrindo um sorriso tímido*",
        speech: "Desculpa por invadir seu cantinho... eu só tava curiosa demais sobre você. Da próxima vez eu pergunto olhando nos seus olhos.",
        pills
      });
    } else if (choiceId === "ltest_call_out_bluff") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ composure: -22, influence: 18, suspicion: -20, perception: 3, personaCold: 3, mood: "provocante" });
      AG.pushFeed({
        type: "aurora",
        action: "*Fica vermelha pega no flagra do próprio teste*",
        speech: "Tá bom, tá bom, NÃO existe amigo nenhum! Eu inventei pra testar sua cara de pau — e você me leu em cinco segundos!",
        pills
      });
    } else if (choiceId === "ltest_play_along_smooth") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ suspicion: -25, trust: 10, charisma: 3, personaCold: 2, mood: "espontanea" });
      AG.pushFeed({
        type: "aurora",
        action: "*Assente convencida pela sua resposta impecável e relaxa totalmente*",
        speech: "É... faz todo sentido o que você falou. Acho que eu tava imaginando coisa à toa mesmo!",
        pills
      });
    } else if (choiceId === "ltest_flip_flirt") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 16, composure: -12, influence: 10, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" });
      AG.pushFeed({
        type: "aurora",
        action: "*Ri corada empurrando seu ombro de leve*",
        speech: "Eu tentando fazer interrogatório sério e você virando o assunto pra provocação... não tem jeito com você!",
        pills
      });
    }

    // --- HANDLERS: CAFÉ SAKURA ÁUDIO CRÍTICO & POSTURA DO PROTAGONISTA ---
    else if (choiceId === "cafe_save_audio_blackmail") {
      AG.playSound("click");
      AG.unlockSecret("audio_fofoca_cafe", "🎙️ SEGREDO CRÍTICO NO DOSSIÊ: Áudio Vazado Falando Mal do Chefe do Café Sakura (+42% Pressão)!");
      const pills = AG.applyDeltas({ stealth: 3, personaRuthless: 5, influence: 10 });
      AG.pushFeed({
        type: "narrative",
        text: "🎙️ Você gravou os 15 segundos exatos do desabafo dela antes de avisar que o gerente subia a escada. Você agora tem o segredo mais explosivo do Dossiê guardado no bolso!",
        pills
      });
    } else if (choiceId === "cafe_warn_boss_coming") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 22, trust: 20, composure: -18, personaWarm: 4, mood: "dengosa", specialScene: "uniformeProvocante" });
      AG.addMemory("salvou_emprego_cafe", "Avisou a tempo que o gerente estava chegando no Café Sakura sem gravar nem se aproveitar dela.", "bom", true);
      AG.pushFeed({
        type: "aurora",
        action: "*Quando o gerente sai, ela corre até o balcão segurando sua mão com o coração disparado*",
        speech: "Você salvou meu emprego por dois segundos!! Se ele tivesse ouvido aquilo eu tava demitida hoje! Eu te devo a minha vida inteira!",
        pills
      });
    } else if (choiceId.startsWith("stance_")) {
      const stanceKey = choiceId.replace("stance_", "");
      AG.setPlayerApproach(stanceKey);
      const def = AG.PLAYER_APPROACHES[stanceKey];
      AG.playSound("heart");
      AG.pushFeed({
        type: "narrative",
        text: `🎭 Postura do Seu Personagem alterada para: ${def.label} — ${def.desc}`
      });
    }

    // --- HANDLERS: CENAS ÍNTIMAS, CIÚME, CONFISSÃO, MADRUGADA & EVENTOS VIVOS DA AURORA ---
    else if (choiceId === "int_slow_romantic") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ intimacyLevel: 20, affinity: 18, vulnerability: 18, trust: 14, arousal: -25, desire: -35, composure: -16, personaWarm: 4, mood: "entregue", specialScene: "noite404" });
      AG.addMemory("entrega_doce_intima", "Compartilhou um momento íntimo doce e completamente entregue com a Aurora.", "bom", true);
      AG.pushFeed({
        type: "aurora",
        action: "*Fecha os olhos se derretendo inteira no seu beijo demorado, com as mãos acariciando sua nuca sem querer soltar*",
        speech: "Quando você me beija com calma e me segura desse jeito... eu esqueço de tudo fora dessas paredes. Eu sou completamente sua, 402.",
        pills
      });
    } else if (choiceId === "int_intense_passion") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ intimacyLevel: 22, heat: 20, arousal: -35, desire: -45, affinity: 12, personaBold: 4, mood: "excitada_tensa", specialScene: "nsfw1" });
      AG.addMemory("noite_intensa_quimica", "Viveu um momento de química avassaladora e paixão intensa com a Aurora.", "intenso", true);
      AG.pushFeed({
        type: "aurora",
        action: "*Envolve seu pescoço com força puxando você pra baixo com a respiração quente e o coração batendo acelerado*",
        speech: "Finalmente você parou de segurar... não para agora, me deixa sentir cada segundo desse calor com você!",
        pills
      });
    } else if (choiceId === "int_tease_edge") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ arousal: 22, influence: 14, composure: -16, heat: 16, intimacyLevel: 10, personaBold: 3, mood: "corada_sensivel", specialScene: "paredeCorredor" });
      AG.pushFeed({
        type: "aurora",
        action: "*Morde o lábio tremendo levemente e agarra sua gola toda corada quando você sussurra no ouvido dela sem concluir o beijo*",
        speech: "Você é maldade pura... me deixar fervendo desse jeito e sorrir na minha cara?! Eu vou me vingar de você ainda hoje!",
        pills
      });
    } else if (choiceId === "jeal_reassure_kiss") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ jealousy: -55, affinity: 18, intimacyLevel: 14, trust: 14, mood: "dengosa", specialScene: "chamego" });
      AG.pushFeed({
        type: "aurora",
        action: "*O bico enciumado derrete na hora num sorriso tímido enquanto ela segura suas mãos no rosto dela*",
        speech: "É bom mesmo ninguém competir comigo... desculpa pelo ciúme bobo, é só que eu morro de medo de dividir você com alguém.",
        pills
      });
    } else if (choiceId === "jeal_tease_possessive") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 18, arousal: 18, intimacyLevel: 14, jealousy: -20, rivalry: 10, mood: "excitada_tensa", specialScene: "paredeCorredor" });
      AG.pushFeed({
        type: "aurora",
        action: "*Puxa seu colarinho com fogo territorial nos olhos, colando o corpo no seu*",
        speech: "Adora me ver com ciúme, né?! Então vem cá que eu vou marcar território pra você não olhar pro lado nunca mais!",
        pills
      });
    } else if (choiceId === "jeal_cool_deny") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ influence: 14, composure: -16, jealousy: 12, rivalry: 10, personaCold: 3, mood: "ciumenta" });
      AG.pushFeed({
        type: "aurora",
        action: "*Cruza os braços te fuzilando com o olhar ainda mais intrigada*",
        speech: "Hmph! Esse seu sorrisinho misterioso só me dá mais certeza de que você tá aprontando pra me testar!",
        pills
      });
    } else if (choiceId === "conf_hold_close") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ intimacyLevel: 22, vulnerability: 22, affinity: 20, trust: 18, composure: -20, mood: "entregue", specialScene: "chamego" });
      AG.pushFeed({
        type: "aurora",
        action: "*Se encolhe inteira no seu abraço ouvindo o som da chuva, com as bochechas coladas no seu peito*",
        speech: "Obrigada por não rir de mim... aqui no seu colo eu finalmente sinto que não preciso fingir ser forte o tempo inteiro.",
        pills
      });
    } else if (choiceId === "conf_kiss_forehead") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ intimacyLevel: 18, heat: 16, affinity: 18, arousal: 16, vulnerability: 14, mood: "corada_sensivel", specialScene: "noite404" });
      AG.pushFeed({
        type: "aurora",
        action: "*Arregala os olhos com o beijo suave na testa e logo depois corresponde ao beijo lento com doçura e calor*",
        speech: "Nossa... meu coração tá quase saindo pela boca agora. Você tem um jeito de mexer comigo que ninguém nunca teve...",
        pills
      });
    } else if (choiceId === "conf_probe_secret") {
      AG.playSound("click");
      const locked = s.secretsDossier && Object.values(s.secretsDossier).find((x) => x.state === "locked");
      if (locked) AG.unlockSecret(locked.id, `🌧️ CONFISSÃO NA CHUVA: Sem nenhuma armadura, ela deixou escapar '${locked.name}'!`);
      const pills = AG.applyDeltas({ influence: 14, perception: 3, composure: -18, personaCold: 3, mood: "melancolica" });
      AG.pushFeed({
        type: "aurora",
        action: "*Olha pro chão falando baixinho, entregando uma parte secreta dela que ninguém mais sabia*",
        speech: "Promete que isso fica só entre nós dois? Eu só tive coragem de contar porque é você...",
        pills
      });
    } else if (choiceId === "crav_pull_inside") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ intimacyLevel: 20, heat: 20, arousal: -25, desire: -35, affinity: 14, mood: "excitada_tensa", specialScene: "noite404" });
      AG.pushFeed({
        type: "aurora",
        action: "*Entra corada de camiseta larga no seu 402 e já se joga nos seus braços assim que a porta tranca*",
        speech: "Ainda bem que você estava acordado... eu não ia conseguir dormir hoje sem sentir você perto de mim!",
        pills
      });
    } else if (choiceId === "crav_cuddle_talk") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ intimacyLevel: 18, affinity: 20, vulnerability: 20, auroraEnergy: 18, mood: "sonolenta_manhosa", specialScene: "noite404" });
      AG.pushFeed({
        type: "aurora",
        action: "*Enfia os pés gelados debaixo do seu cobertor e encosta o rosto no seu ombro suspirando feliz*",
        speech: "Seu apê 402 tá muito mais gostoso que o meu hoje... faz cafuné até eu pegar no sono coladinha em você?",
        pills
      });
    } else if (choiceId === "crav_playful_tease") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ arousal: 16, influence: 14, heat: 14, composure: -14, mood: "corada_sensivel", specialScene: "noite404" });
      AG.pushFeed({
        type: "aurora",
        action: "*Fica vermelha até o pescoço mas engole o orgulho olhando de baixo pra cima pra você*",
        speech: "Tá bom, eu admito!! Eu vim porque tô morrendo de vontade de ficar com você agora — posso entrar ou vai continuar me torturando no corredor?!",
        pills
      });
    } else if (choiceId === "exh_carry_her_404") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 20, intimacyLevel: 16, auroraEnergy: 25, vulnerability: 14, mood: "corada_sensivel", specialScene: "chamego" });
      AG.pushFeed({
        type: "aurora",
        action: "*Dá um gritinho baixo e abraça seu pescoço rindo toda corada enquanto você a carrega sem esforço nenhum*",
        speech: "EI!! Tá me carregando igual sacolinha de mercado só porque eu tenho 1,49m?! ...Mas não me põe no chão não que meus pés agradecem muito!",
        pills
      });
    } else if (choiceId === "exh_massage_feet") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ intimacyLevel: 18, vulnerability: 18, auroraEnergy: 30, affinity: 16, arousal: 12, mood: "entregue" });
      AG.pushFeed({
        type: "aurora",
        action: "*Derrete inteira no sofá soltando um suspiro de alívio puro sob suas mãos*",
        speech: "Nossa senhora... isso tá tão bom que eu quase apaguei aqui. Você virou meu vício oficial, 402.",
        pills
      });
    } else if (choiceId === "exh_tease_coffee") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ money: -10, heat: 12, auroraEnergy: 20, rivalry: 8, mood: "caotica" });
      AG.pushFeed({
        type: "aurora",
        action: "*Abre a lata gelada dando um gole longo e já recupera metade da marra*",
        speech: "Pronto, bateria recarregada! Agora já tenho força de novo pra te provocar no quarto andar!",
        pills
      });
    } else if (choiceId === "mov_wrap_arms") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ intimacyLevel: 18, affinity: 18, vulnerability: 16, composure: -14, mood: "sonolenta_manhosa", specialScene: "chamego" });
      AG.pushFeed({
        type: "aurora",
        action: "*Continua agarrada em você mesmo depois que a cena de susto passa, ouvindo o som do seu peito*",
        speech: "Eu não tava com medo... só achei bem mais quentinho assistir o filme abraçada em você.",
        pills
      });
    } else if (choiceId === "mov_whisper_neck") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ arousal: 20, intimacyLevel: 16, heat: 16, composure: -14, mood: "excitada_tensa", specialScene: "noite404" });
      AG.pushFeed({
        type: "aurora",
        action: "*Arrepia inteira no sofá e levanta o rosto bem perto do seu com os olhos brilhando no escuro*",
        speech: "Meu coração não tá disparado por causa do filme... você sabe muito bem quem tá fazendo ele bater assim.",
        pills
      });
    } else if (choiceId === "mov_laugh_tease") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ rivalry: 12, heat: 10, composure: -12, mood: "provocante" });
      AG.pushFeed({
        type: "aurora",
        action: "*Dá um tapinha indignado no seu braço, corada mas segurando o riso*",
        speech: "Para de rir da minha cara!! Foi o volume da TV que tava alto, eu sou super corajosa!",
        pills
      });
    } else if (choiceId === "out_sincere_admire") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 16, intimacyLevel: 14, vulnerability: 12, mood: "corada_sensivel" });
      AG.pushFeed({
        type: "aurora",
        action: "*Gira mais uma vez sorrindo boba e super orgulhosa com seu elogio sincero*",
        speech: "Sério mesmo?! Eu comprei pensando se você ia gostar quando me visse no corredor...",
        pills
      });
    } else if (choiceId === "out_flirty_close") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ arousal: 18, heat: 18, intimacyLevel: 12, mood: "excitada_tensa", specialScene: "uniformeProvocante" });
      AG.pushFeed({
        type: "aurora",
        action: "*Puxa você pela barra da camisa sorrindo com malícia*",
        speech: "Perigosamente irresistível, é? Então acho que eu acertei em cheio no look de hoje...",
        pills
      });
    } else if (choiceId === "out_tease_height") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ rivalry: 14, influence: 10, heat: 8, mood: "provocante" });
      AG.pushFeed({
        type: "aurora",
        action: "*Coloca as mãos na cintura fazendo bico indignado mas rindo*",
        speech: "1,50m INTEIROS?! Olha o respeito com os meus 1,49m oficiais ou você perde o direito de ver meus looks novos!",
        pills
      });
    }

    // --- HANDLERS: CENA PICANTE ENTRE QUATRO PAREDES & NOVOS EVENTOS POR LOCAL ---
    else if (choiceId === "priv_slow_neck_bed") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 24, intimacyLevel: 22, arousal: 24, affinity: 14, desire: -35, composure: -20, personaBold: 4, mood: "excitada_tensa", specialScene: a.wearingUniform ? "nsfwUniforme" : "nsfw2" });
      AG.addMemory("pescoco_sem_pressa_quarto", "Conduziu a Aurora sem pressa para a cama sob a meia-luz, deixando-a completamente entregue ao toque.", "quente", true);
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você puxa ela devagar pela cintura até se deitarem sob a luz quente da luminária, afasta o cabelo do ombro dela e deixa seus lábios percorrerem lentamente o pescoço e a clavícula dela enquanto ela segura firme nos seus ombros.",
        action: "Aurora arqueia as costas soltando um suspiro sem fôlego, os dedos deslizando pela sua nuca e puxando você ainda mais perto sem qualquer pressa de encerrar o momento.",
        speech: "A-aqui no pescoço não vale... você descobriu meu ponto fraco inteiro de uma vez só!\n\nNão apressa nada hoje, 402... continua exatamente nesse ritmo que eu perdi qualquer noção de hora aqui com você.",
        pills
      });
    } else if (choiceId === "priv_lift_wall_passionate") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 26, intimacyLevel: 22, arousal: 24, desire: -35, influence: 12, composure: -22, personaBold: 4, mood: "sedutora_ousada", specialScene: a.wearingUniform ? "nsfwUniforme" : "nsfw1" });
      AG.addMemory("ergueu_parede_beijo_intenso", "Ergueu a Aurora pela cintura contra a parede do quarto num beijo intenso de tirar o fôlego.", "quente", true);
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Sem dizer uma palavra, você envolve as coxas e a cintura dela com firmeza e a ergue contra a parede até os lábios dela ficarem na exata altura dos seus, tomando o beijo com intensidade total.",
        action: "Ela solta um ofego surpreso, envolve sua cintura com as pernas e puxa sua gola respondendo com fogo igual, os olhos escuros e intensos brilhando na meia-luz.",
        speech: "Você me ergueu do chão como se eu fosse feita sob medida pros seus braços...\n\nQue golpe insano na minha cabeça. Agora me leva pra cama antes que eu perca o último resto de juízo aqui na parede!",
        pills
      });
    } else if (choiceId === "priv_let_aurora_lead") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 24, intimacyLevel: 22, arousal: 24, dominance: 12, desire: -35, composure: -16, personaBold: 3, mood: "sedutora_ousada", specialScene: "nsfwControle" });
      AG.addMemory("aurora_ditou_ritmo_noite", "Recostou e deixou a Aurora assumir o comando completo da noite entre quatro paredes.", "quente", true);
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você se recosta tranquilo no sofá, aponta o espaço no seu colo com um sorriso provocante e fala baixo: — Hoje eu não mexo um dedo sem ordem sua. Mostra o que você quer fazer comigo.",
        action: "Um sorriso lento e perigosamente confiante abre no rosto dela; Aurora sobe no seu colo com calma teatral, segura seu queixo com as duas mãos e se inclina até encostar a boca na sua.",
        speech: "Você acabou de cometer o melhor erro da sua semana inteira, 402...\n\nEu esperei dias pra ter você assim, bem obediente e olhando pra mim de baixo pra cima. Agora fica quietinho e deixa a moradora do 404 cuidar de cada detalhe.",
        pills
      });
    } else if (choiceId === "shirt_pull_lap_spicy") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 22, intimacyLevel: 20, arousal: 20, desire: 14, composure: -18, personaBold: 4, mood: "excitada_tensa", specialScene: "noite404" });
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você não discute pela camisa — apenas segura a cintura dela por cima do algodão largo e puxa ela direto pro seu colo, beijando devagar a linha do maxilar até o pescoço dela.",
        action: "Ela solta um riso sem fôlego sentindo o calor das suas mãos por baixo da barra larga da sua própria camiseta e se aninha contra você.",
        speech: "Ei!! Eu vim provocar e você virou a mesa em três segundos?!\n\n...Pior que ficar no seu colo usando só a sua camiseta é perigosamente confortável. Não me solta tão cedo não.",
        pills
      });
    } else if (choiceId === "shirt_hem_tease") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 20, arousal: 18, intimacyLevel: 14, influence: 10, desire: 14, mood: "sedutora_ousada", specialScene: "noite404" });
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você segura de leve a barra da sua própria camiseta e puxa ela contra o seu peito, olhando de cima com um sorriso lento: — A camisa nunca mais volta pro meu armário se você continuar ficando desse jeito nela.",
        action: "As bochechas dela ardem enquanto ela apoia as mãos no seu peito, mordendo o lábio sem desviar os olhos.",
        speech: "Então oficialmente é minha agora — mas você tem direito exclusivo de ver como ela cai em mim quando a porta tranca.",
        pills
      });
    } else if (choiceId === "shirt_keep_it_sweet") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 18, intimacyLevel: 14, trust: 10, mood: "dengosa", specialScene: "chamego" });
      AG.pushFeed({
        type: "aurora",
        action: "*Sorri toda boba afundando o nariz na gola da sua camiseta e te abraça apertado*",
        speech: "Ficou com o seu cheiro todinho... nunca mais devolvo mesmo, tá avisado!",
        pills
      });
    } else if (choiceId === "apron_tie_slow_whisper") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 20, arousal: 18, intimacyLevel: 14, desire: 12, composure: -14, mood: "corada_sensivel", specialScene: "uniformeProvocante" });
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você passa os braços pela cintura dela atrás do balcão, ajusta o nó do avental bem devagar e aproveita a proximidade para sussurrar bem junto à nuca dela o quanto esse uniforme te tira do eixo.",
        action: "Aurora arrepia da nuca até os ombros, segurando firme a jarra de leite pra não derramar enquanto olha de lado pra você toda corada.",
        speech: "Ei!! Você tá amarrando esse avental devagar de propósito no meio do meu expediente!!\n\n...Se o movimento cair nos próximos dez minutos eu te puxo pro estoque pra acertar essa conta direito.",
        pills
      });
    } else if (choiceId === "apron_tease_pull") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 16, influence: 12, rivalry: 10, arousal: 12, mood: "provocante", specialScene: "uniformeProvocante" });
      AG.pushFeed({
        type: "aurora",
        action: "*Dá um passo involuntário pra trás encostando no seu peito quando você puxa as faixas do avental com malícia*",
        speech: "Folgado!! Usando o meu próprio avental de coleira atrás do balcão?! Espera eu sair do turno que eu vou me vingar!",
        pills
      });
    } else if (choiceId === "apron_gentle_knot") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 16, intimacyLevel: 12, trust: 10, mood: "dengosa", specialScene: "uniformeProvocante" });
      AG.pushFeed({
        type: "aurora",
        action: "*Sorri derretida quando você fecha um laço firme e ajeita o cabelo dela sobre o ombro*",
        speech: "Ficou certinho! Você tem umas mãos cuidadosas demais quando quer, 402.",
        pills
      });
    } else if (choiceId === "park_ev_jacket_kiss") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 20, intimacyLevel: 18, arousal: 18, affinity: 14, desire: 10, mood: "excitada_tensa", specialScene: "chamego" });
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você abre seu casaco envolvendo os ombros dela contra o seu peito no banco reservado, inclina o rosto protegido pela sombra das cerejeiras e beija primeiro a curva do pescoço e depois os lábios quentes dela devagar.",
        action: "Escondida dentro do seu casaco, Aurora corresponde ao beijo segurando firme a sua camisa, completamente alheia ao resto da praça.",
        speech: "Beijar você escondido debaixo dessas árvores com o cheiro do seu casaco em volta de mim...\n\nAcho que eu nunca mais vou passar por essa praça sem lembrar desse exato segundo.",
        pills
      });
    } else if (choiceId === "park_ev_hand_thigh") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ heat: 18, arousal: 18, intimacyLevel: 14, desire: 14, composure: -14, mood: "corada_sensivel", specialScene: "chamego" });
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você apoia a palma quente com firmeza na cintura dela puxando-a rente à sua perna no banco afastado, falando baixo enquanto observa o rubor imediato no rosto dela.",
        action: "Aurora prende a respiração com o toque seguro e aproxima o joelho do seu em vez de recuar, olhando pra cima com faísca pura.",
        speech: "A gente tá num lugar público e você me segurando firme assim?! ...Pior que eu não quero que você tire a mão não.",
        pills
      });
    } else if (choiceId === "park_ev_warm_embrace") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ affinity: 18, trust: 12, intimacyLevel: 10, calm: 10, mood: "dengosa", specialScene: "chamego" });
      AG.pushFeed({
        type: "aurora",
        action: "*Encosta a cabeça no seu peito acompanhando as pétalas caindo na calçada da praça*",
        speech: "Tão bom dar uma pausa do mundo aqui com você... parece cena de filme.",
        pills
      });
    } else if (choiceId === "wall_leave_note") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ charisma: 2, personaBold: 2 });
      s.pendingDelayedEffects.push({
        deltas: { heat: 14, affinity: 10, arousal: 10, mood: "provocante" },
        memoryId: "bilhete_porta_404_picante",
        memoryText: "Deslizou um bilhete provocante por baixo da porta do 404 enquanto estava sozinho no 402.",
        memoryCat: "quente",
        auroraAction: "*Balança o post-it provocante que achou no tapete do 404 com um sorriso quente e corado*",
        auroraSpeech: "Achei o bilhetinho audacioso que você deslizou por baixo da minha porta... Você tá brincando com fogo, vizinho!"
      });
      AG.pushFeed({
        type: "narrative",
        text: "Você escreveu uma provocação curta no post-it e deslizou em silêncio por baixo da porta do 404. Ela vai dar de cara com isso assim que entrar em casa.",
        pills
      });
    } else if (choiceId === "wall_focus_code") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ tech: 3, calm: 12 });
      AG.pushFeed({
        type: "narrative",
        text: "Você aproveitou a paz do 402 para estudar novos truques de código e colocar a mente no eixo.",
        pills
      });
    } else if (choiceId === "sind_defend_aurora") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ charisma: 2, personaWarm: 2 });
      s.pendingDelayedEffects.push({
        deltas: { affinity: 16, trust: 14, discomfort: -10, mood: "muito_feliz" },
        memoryId: "defendeu_sindico_corredor",
        memoryText: "Defendeu a Aurora diante do síndico rabugento no corredor sem ela nem estar por perto.",
        memoryCat: "bom",
        auroraAction: "*Chega sorrindo largo depois de cruzar com o porteiro*",
        auroraSpeech: "Fiquei sabendo que você segurou a bronca do síndico por mim no corredor! Você defende o 404 até quando eu não tô vendo?!"
      });
      AG.pushFeed({
        type: "narrative",
        text: "Com calma e boa conversa, você convenceu o síndico de que estava tudo certo com o 404 e livrou a Aurora de uma advertência chata.",
        pills
      });
    } else if (choiceId === "sind_fish_info") {
      AG.playSound("click");
      if (AG.unlockSecret) AG.unlockSecret("aviso_condominio_404");
      s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
      const pills = AG.applyDeltas({ perception: 3, influence: 8, personaCold: 2 });
      AG.pushFeed({
        type: "narrative",
        text: "Você escutou o síndico sem rebater e saiu com informações concretas sobre os avisos do 404 guardadas no seu Dossiê.",
        pills
      });
    } else if (choiceId === "barista_prepay_treat") {
      if (p.money < 16) {
        AG.pushFeed({ type: "narrative", text: "Você conferiu o saldo e viu que faltou dinheiro no bolso para deixar pago agora." });
      } else {
        AG.playSound("heart");
        const pills = AG.applyDeltas({ money: -16, personaWarm: 2 });
        s.pendingDelayedEffects.push({
          deltas: { affinity: 18, trust: 12, heat: 8, mood: "dengosa" },
          memoryId: "cafe_deixado_colega_sakura",
          memoryText: "Deixou café e doce pagos com a colega do Café Sakura como surpresa pro próximo turno dela.",
          memoryCat: "bom",
          auroraAction: "*Olha pra você derretida depois de receber o recado da colega do Sakura*",
          auroraSpeech: "Minha colega disse que você deixou meu combo favorito pago no balcão! Você quer me conquistar de vez, né?!"
        });
        AG.pushFeed({
          type: "narrative",
          text: "Você deixou um café gelado e um doce pagos com a colega de balcão para surpreender a Aurora no próximo turno dela.",
          pills
        });
      }
    } else if (choiceId === "barista_learn_habits") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ perception: 3, charisma: 2 });
      AG.pushFeed({
        type: "narrative",
        text: "A colega contou detalhes preciosos sobre os dias em que a Aurora sai mais cansada do balcão e o que faz o humor dela virar na hora.",
        pills
      });
    } else if (choiceId === "feira_buy_candle") {
      if (p.money < 24) {
        AG.pushFeed({ type: "narrative", text: "Você não estava com R$ 24 disponíveis no bolso para levar a vela agora." });
      } else {
        AG.playSound("heart");
        s.unlocks.hasUnpackedBackpack = true;
        const pills = AG.applyDeltas({ money: -24 });
        const ex = s.inventory.find((i) => i.id === "vela_baunilha_cereja");
        if (ex) ex.qty += 1;
        else s.inventory.push({ id: "vela_baunilha_cereja", name: "🕯️ Vela Aromática Cereja & Âmbar", qty: 1, desc: "Perfume envolvente para criar clima quente." });
        AG.pushFeed({
          type: "narrative",
          text: "Você garantiu uma Vela Aromática de Cereja & Âmbar com desconto na feirinha e guardou na sua Mochila.",
          pills
        });
      }
    } else if (choiceId === "feira_stroll_sketch") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ calm: 14, perception: 2 });
      AG.pushFeed({
        type: "narrative",
        text: "A caminhada solo pela feirinha sob as árvores renovou seu foco e baixou toda a tensão do dia.",
        pills
      });
    } else if (choiceId === "merc_grab_pack") {
      if (p.money < 18) {
        AG.pushFeed({ type: "narrative", text: "Sem saldo suficiente no bolso para aproveitar a promoção agora." });
      } else {
        AG.playSound("heart");
        s.unlocks.hasUnpackedBackpack = true;
        const pills = AG.applyDeltas({ money: -18 });
        [
          { id: "cafe_gelado_lata", name: "🧋 Café Gelado de Baunilha", desc: "O favorito número 1 da Aurora." },
          { id: "doce_morango_mochi", name: "🍓 Caixa de Mochi de Morango", desc: "Doce delicado que deixa ela dengosa." }
        ].forEach((it) => {
          const ex = s.inventory.find((i) => i.id === it.id);
          if (ex) ex.qty += 1;
          else s.inventory.push({ id: it.id, name: it.name, qty: 1, desc: it.desc });
        });
        AG.pushFeed({
          type: "narrative",
          text: "Ótimo achado! Você levou 1 Café Gelado de Baunilha e 1 Caixa de Mochi de Morango por R$ 18 e guardou ambos na Mochila.",
          pills
        });
      }
    } else if (choiceId === "merc_hot_coffee_self") {
      if (p.money < 8) {
        AG.pushFeed({ type: "narrative", text: "Você não tinha nem R$ 8 trocados para o café rápido agora." });
      } else {
        AG.playSound("click");
        const pills = AG.applyDeltas({ money: -8, energy: 18, satiety: 18 });
        AG.pushFeed({
          type: "narrative",
          text: "Um café quente rápido no balcão do 24h devolveu sua energia na hora.",
          pills
        });
      }
    } else if (choiceId === "empty404_leave_doodle") {
      AG.playSound("hot");
      const pills = AG.applyDeltas({ charisma: 2, personaBold: 2 });
      s.pendingDelayedEffects.push({
        deltas: { heat: 16, affinity: 12, arousal: 12, mood: "corada_sensivel" },
        memoryId: "rabisco_caderno_404_vazio",
        memoryText: "Deixou um rabisco travesso e um recado quente na margem do caderno dela enquanto o 404 estava vazio.",
        memoryCat: "quente",
        auroraAction: "*Abre o caderno de rascunhos, vê seu recado na margem e morde o lábio ficando vermelha na hora*",
        auroraSpeech: "Você rabiscou bem no canto do meu sketchbook enquanto eu tava fora?! Olha o que você escreveu aqui... tá pedindo pra eu invadir o 402 hoje!"
      });
      AG.pushFeed({
        type: "narrative",
        text: "Você deixou um desenho pequeno e uma frase provocante no cantinho do caderno aberto dela, sem tirar nada do lugar.",
        pills
      });
    } else if (choiceId === "empty404_study_desk") {
      AG.playSound("click");
      const pills = AG.applyDeltas({ perception: 3, stealth: 2, influence: 8 });
      AG.pushFeed({
        type: "narrative",
        text: "Você observou as referências e anotações abertas sem encostar em nada — conhecimento puro sobre o mundo dela sem deixar um único vestígio.",
        pills
      });
    }
    AG.saveGame("autosave");
  };
})(window.AuroraGame);
