/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Motor de Estado v6: Habilidades do Jogador, Suspeita vs Furtividade,
   Pertences da Aurora, Eventos de Calendário, Histórico & Temas/Configurações
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  AG.MEDIA_PATHS = {
    logos: {
      gameLogo: "midias/logos/logo_jogo_oficial.png",
      bowIcon: "midias/logos/laco_icone_oficial.png",
      studioLogo: "midias/logos/santni_studio_logo.png",
      studioIcon: "midias/logos/santni_icon.png"
    },
    character: {
      menuCute: "midias/personagem/Aurora PNG 2.png",
      uniform: "midias/personagem/Aurora de uniforme PNG 4.png",
      casualDefault: "midias/personagem/Aurora PNG 20.png",
      blushing: "midias/personagem/Aurora Corada PNG.png",
      teasing: "midias/personagem/Aurora Provocando PNG.png",
      angry: "midias/personagem/Aurora Brava PNG.png",
      bossy: "midias/personagem/Aurora Mandona PNG.png",
      lateNightHoodie: "midias/personagem/Aurora Moletom Madrugada PNG.png"
    },
    specialScenes: {
      provocante: "midias/cenas_especiais/Cena Parede Corredor PNG.png",
      chamego: "midias/cenas_especiais/Cena Chamego Colo PNG.png",
      levantandoEla: "midias/cenas_especiais/Cena Levantando Ela PNG.png",
      paredeCorredor: "midias/cenas_especiais/Cena Parede Corredor PNG.png",
      uniformeProvocante: "midias/cenas_especiais/Cena Uniforme Provocante PNG.png",
      controle: "midias/cenas_especiais/Cena Controle Dominio PNG.png",
      manipulada: "midias/cenas_especiais/Cena Manipulada Forcada PNG.png",
      noite404: "midias/cenas_especiais/Cena Quarto 404 Noite PNG.png",
      nsfw1: "midias/cenas_especiais/Cena Especial NSFW 1 PNG.png",
      nsfw2: "midias/cenas_especiais/Cena Especial NSFW 2 PNG.png",
      nsfwUniforme: "midias/cenas_especiais/Cena Especial NSFW 3 Uniforme PNG.png",
      nsfwControle: "midias/cenas_especiais/Cena Especial NSFW 4 Controle PNG.png",
      fotoCelular: "midias/cenas_especiais/Cena Celular Foto Secreta PNG.png"
    },
    backgrounds: {
      ape_402: "midias/cenarios/ape_402.jpg",
      ape_404: "midias/cenarios/ape_404.jpg",
      corredor_4andar: "midias/cenarios/corredor_4andar.jpg",
      cafe_sakura: "midias/cenarios/cafe_sakura.jpg",
      praca_cerejeiras: "midias/cenarios/praca_cerejeiras.jpg",
      mercadinho_24h: "midias/cenarios/mercadinho_24h.jpg"
    }
  };

  const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const DAILY_BIASES = [
    "☕ Segunda Sonolenta",
    "🎨 Terça Foco Criativo",
    "⚡ Quarta Caótica Online",
    "🌙 Quinta de Madrugada Longa",
    "🔥 Sexta Elétrica & Provocante",
    "🌸 Sábado Livre de Folga",
    "💗 Domingo Manhoso & Carente"
  ];

  const MOOD_DEFS = {
    // 1. FAMÍLIA LUMINOSA & AFETIVA
    espontanea: { label: "🎀 Fofa & Leve", emoji: "😊", family: "luminosa", spriteHint: "casualDefault", css: "mood-espontanea", desc: "Com 1,49m, sorriso fácil e olhando pra cima pra falar com você." },
    alegre: { label: "😄 Alegre & Radiante", emoji: "😄", family: "luminosa", spriteHint: "menuCute", css: "mood-espontanea", desc: "Sorrindo à toa, leve e super receptiva às suas ideias." },
    muito_feliz: { label: "✨ Muito Feliz", emoji: "✨", family: "luminosa", spriteHint: "menuCute", css: "mood-dengosa", desc: "Olhos brilhando de felicidade genuína com a sua presença." },
    emocionada: { label: "🥹 Emocionada", emoji: "🥹", family: "luminosa", spriteHint: "blushing", css: "mood-dengosa", desc: "Tocou fundo no coração dela — voz trêmula de carinho real." },
    euforica: { label: "🌟 Eufórica & 1000V", emoji: "🌟", family: "luminosa", spriteHint: "menuCute", css: "mood-caotica", desc: "Agitada, rindo alto e pronta pra qualquer loucura boa com você." },
    dengosa: { label: "💗 Dengosa", emoji: "🥰", family: "luminosa", spriteHint: "blushing", css: "mood-dengosa", desc: "Manhosa, querendo carinho e atenção exclusiva." },
    entregue: { label: "💞 Entregue & Apaixonada", emoji: "💞", family: "luminosa", spriteHint: "blushing", css: "mood-dengosa", desc: "Sem barreiras e com o olhar brilhando só para você." },

    // 2. FAMÍLIA QUÍMICA & PAIXÃO
    provocante: { label: "😈 Provocante", emoji: "😏", family: "quimica", spriteHint: "teasing", css: "mood-provocante", desc: "Olhar malicioso de baixo pra cima, testando sua reação." },
    corada_sensivel: { label: "😳 Corada & Sensível", emoji: "😳", family: "quimica", spriteHint: "blushing", css: "mood-dengosa", desc: "Coração disparado e reagindo ao menor toque ou olhar de perto." },
    excitada_tensa: { label: "🔥 Fervendo de Vontade", emoji: "🔥", family: "quimica", spriteHint: "teasing", css: "mood-provocante", desc: "Olhar fixo nos seus lábios, respiração curta e clima nas alturas." },
    sedutora_ousada: { label: "💋 Ousada & Sem Filtro", emoji: "💋", family: "quimica", spriteHint: "teasing", css: "mood-provocante", desc: "Confiante, atrevida e provocando você sem nenhuma timidez." },
    magnetizada: { label: "🧲 Hipnotizada por Você", emoji: "🧲", family: "quimica", spriteHint: "blushing", css: "mood-provocante", desc: "Presa no seu olhar e totalmente envolvida pela tensão entre vocês." },

    // 3. FAMÍLIA CAÓTICA & SITUACIONAL
    caotica: { label: "⚡ 220V Online", emoji: "😜", family: "caotica", spriteHint: "casualDefault", css: "mood-caotica", desc: "Animada, elétrica e falando sem filtro." },
    entediada: { label: "🥱 Entediada", emoji: "🥱", family: "caotica", spriteHint: "casualDefault", css: "mood-desconfiada", desc: "Sem paciência pra rotina — ações comuns rendem menos; quer novidade ou desafio!" },
    enjoada_sarcastica: { label: "🙄 Enjoada & Sarcástica", emoji: "🙄", family: "caotica", spriteHint: "bossy", css: "mood-desconfiada", desc: "Cheia de ironia e nariz empinado, testando quem aguenta o humor dela." },
    sonolenta_manhosa: { label: "🧸 Sonolenta & Coladinha", emoji: "🧸", family: "caotica", spriteHint: "lateNightHoodie", css: "mood-dengosa", desc: "Encolhida no moletom largo com sono, carente e pedindo cafuné." },
    solta_pos_drink: { label: "🍾 Solta & Risonha (Drinks)", emoji: "🍾", family: "caotica", spriteHint: "blushing", css: "mood-caotica", desc: "Bêbada leve de festa, rindo fácil e soltando verdades sem filtro!" },
    impulsiva_maluca: { label: "🤪 Caótica Sem Freio", emoji: "🤪", family: "caotica", spriteHint: "teasing", css: "mood-caotica", desc: "No modo maluca imprevisível — topa apostas e ideias insanas na hora!" },
    dormindo: { label: "💤 Dormindo", emoji: "😴", family: "caotica", spriteHint: "lateNightHoodie", css: "mood-espontanea", desc: "Adormecida no ambiente — qualquer barulho pode acordá-la." },

    // 4. FAMÍLIA VULNERÁVEL & DOR REAL
    chateada: { label: "😔 Chateada", emoji: "😔", family: "vulneravel", spriteHint: "blushing", css: "mood-desconfiada", desc: "Magoada e mais fechada por algo que aconteceu." },
    muito_triste: { label: "😢 Muito Triste", emoji: "😢", family: "vulneravel", spriteHint: "blushing", css: "mood-desconfiada", desc: "Com o olhar caído e coração pesado — precisa de tato ou acolhimento." },
    chorosa_vulneravel: { label: "🥺 Vulnerável & Chorosa", emoji: "🥺", family: "vulneravel", spriteHint: "blushing", css: "mood-dengosa", desc: "Segurando o choro e sem armadura nenhuma — cuidado real ou manipulação marcam fundo." },
    carente: { label: "🌙 Carente & Manhosa", emoji: "🌙", family: "vulneravel", spriteHint: "lateNightHoodie", css: "mood-dengosa", desc: "Voz baixinha precisando de companhia e validação." },
    ansiosa: { label: "🌀 Ansiosa & Agitada", emoji: "🌀", family: "vulneravel", spriteHint: "blushing", css: "mood-desconfiada", desc: "Mente a mil com prazos, contas e pensamentos acelerados." },
    decepcionada: { label: "🥀 Decepcionada", emoji: "🥀", family: "vulneravel", spriteHint: "angry", css: "mood-desconfiada", desc: "Esperava muito mais de você — a confiança sofreu um golpe sério." },
    melancolica: { label: "🌧️ Deprimida & Pensativa", emoji: "🌧️", family: "vulneravel", spriteHint: "lateNightHoodie", css: "mood-desconfiada", desc: "Quieta olhando a janela, distante e melancólica." },

    // 5. FAMÍLIA CONFLITO, EGO & HOSTILIDADE
    irritada: { label: "💢 Irritada", emoji: "😠", family: "conflito", spriteHint: "angry", css: "mood-irritada", desc: "Pavio curto e paciência no limite." },
    raivosa: { label: "🤬 Raivosa & Explosiva", emoji: "🤬", family: "conflito", spriteHint: "angry", css: "mood-irritada", desc: "Fervendo de raiva — vai bater de frente sem medir palavras." },
    rispida_agressiva: { label: "⚡ Ríspida & Agressiva", emoji: "⚡", family: "conflito", spriteHint: "angry", css: "mood-irritada", desc: "Na defensiva total, atacando com palavras afiadas quem cruzar o caminho." },
    ignorante_fria: { label: "🧊 Ignorante & Cortante", emoji: "🧊", family: "conflito", spriteHint: "bossy", css: "mood-desconfiada", desc: "Seca, grossa e te tratando com puro gelo." },
    desconfortavel: { label: "😬 Desconfortável", emoji: "😬", family: "conflito", spriteHint: "angry", css: "mood-desconfiada", desc: "Incomodada com a situação e pronta pra cortar contato." },
    ciumenta: { label: "😤 Ciumenta & Territorial", emoji: "😤", family: "conflito", spriteHint: "angry", css: "mood-irritada", desc: "Bico fechado, olho no seu celular e exigindo atenção exclusiva." },
    invejosa: { label: "🐍 Invejosa & Competitiva", emoji: "🐍", family: "conflito", spriteHint: "bossy", css: "mood-controladora", desc: "Incomodada por alguém estar chamando mais atenção ou vencendo ela." },

    // 6. FAMÍLIA SOMBRIA & ESPIRAL PSICOLÓGICA
    desconfiada: { label: "😒 Desconfiada", emoji: "🤨", family: "sombria", spriteHint: "bossy", css: "mood-desconfiada", desc: "Medindo suas intenções com cautela afiada." },
    controladora: { label: "👑 No Comando", emoji: "😌", family: "sombria", spriteHint: "bossy", css: "mood-controladora", desc: "Confiante, sabendo que tem você na palma da mão." },
    manipulada: { label: "⛓️ Encurralada & Tensa", emoji: "😣", family: "sombria", spriteHint: "angry", css: "mood-desconfiada", desc: "Ressentida por estar cedendo à sua pressão — pode tramar contra-ataque!" },
    abalada_traumatizada: { label: "💔 Abalada & Ferida", emoji: "💔", family: "sombria", spriteHint: "angry", css: "mood-desconfiada", desc: "Profundamente marcada por choques emocionais — a confiança virou caco." },
    paranoica_delirante: { label: "👁️ Paranoica & Delirante", emoji: "👁️", family: "sombria", spriteHint: "bossy", css: "mood-irritada", desc: "Enxerga planos ocultos em cada olhar seu e monta teorias sem parar." },
    corrompida_fria: { label: "🖤 Corrompida & Fria", emoji: "🖤", family: "sombria", spriteHint: "bossy", css: "mood-controladora", desc: "Aprendeu seu jogo sombrio e perdeu a inocência — agora joga tão pesado quanto você." },
    obsessiva_controladora: { label: "👑🖤 Obcecada & Manipuladora", emoji: "👑", family: "sombria", spriteHint: "bossy", css: "mood-controladora", desc: "Virou a antagonista psicológica do 4º andar — quer dominar sua mente e rotina!" },
    vingativa: { label: "🗡️ Vingativa", emoji: "🗡️", family: "sombria", spriteHint: "angry", css: "mood-irritada", desc: "Sorriso gelado planejando como vai te dar o troco em dobro." }
  };

  const DYNAMIC_DEFS = {
    desconhecidos: { title: "🌱 Completa Desconhecida (1,49m)", desc: "Vocês acabaram de se esbarrar. Você ainda nem tem o número dela." },
    vizinhos_curiosos: { title: "🎀 Conhecidos do 4º Andar", desc: "Quebraram o gelo inicial, mas ainda estão construindo intimidade." },
    faisca_imediata: { title: "🔥 Faísca & Tensão Rápida", desc: "Você teve atitude logo de cara e despertou a química dela." },
    sintonia_caotica: { title: "⚡ Íntimos de Madrugada", desc: "Ela já confia em você, trocam mensagens e dividem a rotina." },
    chamego_dengoso: { title: "💗 Meu Chamego Favorito", desc: "Romance doce, portas abertas e carinho verdadeiro." },
    tensao_ardente: { title: "🌶️ Clima Quente Sem Filtro", desc: "Desejo intenso e provocações sem freio." },
    teia_de_controle: { title: "👑 Na Palma da Mão Dela", desc: "Ela exerce controle psicológico sobre você." },
    relacao_manipulada: { title: "⛓️ Relação Forçada (Seu Controle)", desc: "Você usou trunfos para pressioná-la. Pode ser consertado ou levado ao extremo." },
    jogo_de_poder_mutuo: { title: "♟️ Xadrez Psicológico & Virada", desc: "Você virou a mesa com pura lábia e timing — agora a disputa de poder entre o 402 e o 404 é eletrizante." },
    guerra_fria_4andar: { title: "⚔️ Guerra Fria no 4º Andar", desc: "Pegadinhas, sabotagens travessas e provocações mútuas: nenhum dos dois aceita perder." },
    espiral_sombria_dela: { title: "🖤 Rainha Sombria do 404", desc: "Suas escolhas corromperam a visão dela — agora é a Aurora quem manipula, sabota e tenta dominar você!" },
    thriller_mutuo: { title: "♟️🖤 Dois Manipuladores no 4º Andar", desc: "Vocês dois abraçaram o lado sombrio sem filtro: um thriller psicológico magnético entre 402 e 404." },
    gelo_e_farpas: { title: "❄️ Clima Pesado", desc: "Suas atitudes geraram desconforto real." },
    afastados: { title: "🚪 Portas Trancadas", desc: "Ela está evitando qualquer contato com você." }
  };

  AG.ACTIVITY_DEFS = {
    tentando_alcancar_alto: {
      id: "tentando_alcancar_alto",
      badge: "📏 Na ponta dos pés tentando alcançar o alto",
      narrative: "Aurora está esticando os braços do alto dos seus 1,49m para alcançar uma prateleira/caixa alta."
    },
    mexendo_cozinha: {
      id: "mexendo_cozinha",
      badge: "🍳 Mexendo na bancada / preparando café",
      narrative: "Aurora está de costas na bancada preparando café gelado e mexendo nos potes, com o celular deixado sobre a mesa."
    },
    mexendo_movel: {
      id: "mexendo_movel",
      badge: "📦 Organizando uma estante / móvel baixo",
      narrative: "Aurora está abaixada organizando cabos, livros e objetos numa prateleira."
    },
    assistindo_jogando: {
      id: "assistindo_jogando",
      badge: "🎮 Animada jogando / assistindo no sofá",
      narrative: "Aurora está super empolgada no sofá com um controle na mão e uma série passando no monitor secundário."
    },
    trabalhando_uniforme: {
      id: "trabalhando_uniforme",
      badge: "👗 Atendendo de uniforme no Café Sakura",
      narrative: "Aurora está usando o uniforme oficial de trabalho atrás do balcão do Café Sakura."
    },
    dormindo: {
      id: "dormindo",
      badge: "💤 Pegou no sono profundamente",
      narrative: "Aurora acabou adormecendo ali mesmo, encolhidinha sob o moletom. O ambiente está silencioso — você pode agir diretamente com ela ou mexer nas coisas ao redor."
    },
    no_corredor_celular: {
      id: "no_corredor_celular",
      badge: "📱 Encostada na parede mexendo no celular",
      narrative: "Aurora está encostada perto da porta do 404, fone no pescoço, olhando para você de baixo pra cima."
    },
    desenhando_tablet: {
      id: "desenhando_tablet",
      badge: "🎨 Desenhando no tablet gráfico concentrada",
      narrative: "Aurora está sentada com os joelhos encolhidos desenhando no tablet gráfico de fone, mordendo a pontinha da caneta."
    },
    saindo_banho_toalha: {
      id: "saindo_banho_toalha",
      badge: "🫧 Pós-banho secando o cabelo com a toalha",
      narrative: "Aurora acabou de sair do banho usando uma camiseta larga perfumada e secando as pontas úmidas do cabelo com a toalha."
    },
    olhando_chuva_janela: {
      id: "olhando_chuva_janela",
      badge: "🌧️ Encostada na janela vendo a chuva cair",
      narrative: "Aurora está abraçando os próprios joelhos perto da janela iluminada pelas gotas da chuva, com o olhar mais suave e vulnerável."
    },
    trocando_roupa_porta: {
      id: "trocando_roupa_porta",
      badge: "👗 Testando combinações de roupa no espelho",
      narrative: "Aurora está em frente ao espelho comparando dois visuais novos e girando para ver o caimento."
    }
  };

  function createInitialState() {
    return {
      version: "8.0.0",
      mode: "title_menu",
      currentNarrationId: "prologo_1",

      day: 1,
      hour: 23,
      minute: 15,
      totalActionsTaken: 0,
      weather: "limpo", // 'limpo' | 'chuva_noturna' | 'apagao_andar'

      currentLocation: "corredor_4andar",
      mainHubStage: 1,
      unlockedLocations: ["ape_402", "corredor_4andar"],

      unlocks: {
        hasUnpackedBackpack: false,
        knowsAuroraName: false,
        hasAuroraNumber: false,
        unlockedSpyApp: false,
        visited404Once: false,
        unlockedNeighborhood: false,
        hasSpareKey404: false
      },

      player: {
        name: "Você",
        jobTitle: "Freelancer Digital",
        energy: 78,
        satiety: 72,
        calm: 80,
        desire: 30,
        money: 160,
        rentDueInDays: 7,
        rentAmount: 350,
        workProgress: 0,
        soloReliefCount: 0,
        boxesUnpacked: 0,
        storyChapter: 1,
        // Habilidades evolutivas do protagonista
        skills: {
          charisma: 12,   // 🗣️ Lábia & Persuasão
          stealth: 12,    // 🤫 Furtividade & Discrição
          tech: 15,       // 💻 Domínio Técnico & Código
          perception: 12  // 👁️ Percepção & Observação
        },
        // Postura ativa do seu personagem & Arquétipo moldado pelas suas escolhas
        activeApproach: "natural", // 'natural' | 'calculista' | 'provocador' | 'implacavel' | 'protetor'
        persona: {
          cold: 0,      // 🧊 Frio & Analítico
          bold: 0,      // 😈 Audacioso & Provocador
          warm: 0,      // 💗 Protetor & Cúmplice
          ruthless: 0   // 🐍 Calculista & Chantagista
        }
      },

      // Dossiê de Segredos & Trunfos Concretos da Aurora (Podem ser usados em chantagem, barganha ou queimados por confiança!)
      secretsDossier: {
        conta_alt_desabafos: {
          id: "conta_alt_desabafos",
          name: "📱 Prints da Conta Alt Privada",
          severity: "Médio",
          pressureVal: 24,
          state: "locked",
          desc: "Prints da conta secreta onde ela desabafa sobre boletos e admite que observa o vizinho do 402."
        },
        aviso_condominio_404: {
          id: "aviso_condominio_404",
          name: "📄 Notificação Confidencial do Síndico",
          severity: "Alto",
          pressureVal: 32,
          state: "locked",
          desc: "Advertência oficial de barulho de madrugada e taxa pendente que ela morre de medo que chegue ao proprietário."
        },
        rascunho_secreto_sketch: {
          id: "rascunho_secreto_sketch",
          name: "📔 Páginas Ocultas do Sketchbook",
          severity: "Alto",
          pressureVal: 30,
          state: "locked",
          desc: "Anotações pessoais e rascunhos secretos que ela esconde a sete chaves (incluindo desenhos sobre você!)."
        },
        audio_fofoca_cafe: {
          id: "audio_fofoca_cafe",
          name: "🎙️ Áudio Vazado Sobre o Chefe do Café Sakura",
          severity: "Crítico",
          pressureVal: 42,
          state: "locked",
          desc: "Gravação dela falando tudo o que realmente pensa do gerente — se ele ouvir, ela perde o emprego na hora."
        },
        termo_aposta_404: {
          id: "termo_aposta_404",
          name: "🎲 Prova da Aposta Perdida do 4º Andar",
          severity: "Médio",
          pressureVal: 22,
          state: "locked",
          desc: "Registro irrefutável de que a Rainha do 404 perdeu uma aposta para você e está devendo favores."
        },
        cache_msgs_apagadas: {
          id: "cache_msgs_apagadas",
          name: "💬 Backup das Mensagens Apagadas de Madrugada",
          severity: "Médio",
          pressureVal: 26,
          state: "locked",
          desc: "Confissões vulneráveis e atrevidas que ela digitou às 2h da manhã e apagou antes que você visse."
        }
      },

      // Pertences Pessoais da Aurora (Podem estar 'in_404', 'carried' [exposto com você] ou 'hidden_in_402' [guardado na gaveta trancada])
      belongings: {
        spareKey404: { id: "spareKey404", name: "🗝️ Chave Reserva do 404", state: "in_404", desc: "Permite entrar no Apê 404 mesmo quando ela está fora trabalhando." },
        secretSketchbook: { id: "secretSketchbook", name: "📔 Caderno Secreto de Rascunhos", state: "in_404", desc: "Contém desenhos íntimos e pensamentos secretos dela." },
        pinkRibbon: { id: "pinkRibbon", name: "🎀 Laço Rosa Favorito da Aurora", state: "in_404", desc: "Um pertence pessoal super íntimo do quarto dela." },
        condoNotice: { id: "condoNotice", name: "💌 Carta Confidencial do 404", state: "in_404", desc: "Notificação que pode ser quitada por você para ajudá-la ou usada como chantagem." }
      },

      phoneState: {
        activeApp: "chat",
        leverage: 0,
        tracksRisk: 0,
        manipulationCount: 0,
        plantedWifiSabotage: false,
        plantedDeliveryGift: false,
        unlockedPhotos: [],
        favoritePhotos: [],
        likedPosts: {},
        commentedPosts: {},
        completedQuickGigs: {},
        callCount: 0,
        videoCallCount: 0,
        vpnDay: 0,
        lastPixDay: 0,
        lastQuestionIdx: 0,
        scheduledDate: null
      },

      aurora: {
        age: 22,
        heightLabel: "1,49m",
        affinity: 0,
        trust: 0,
        heat: 5,
        dominance: 10,
        discomfort: 0,
        suspicion: 0,        // 🔍 Suspeita (0..100%): sobe se você deixar pistas; fica 0% se agir com alta Furtividade!
        influence: 0,        // ♟️ Influência no Jogo (0..100%): sobe com blefes afiados, apostas ganhas e leitura psicológica!
        rivalry: 0,          // ⚔️ Rivalidade / Guerra Fria (0..100%): sobe com provocações, pegadinhas e desafios mútuos!
        composure: 75,       // 🛡️ Armadura Emocional (0..100%): psicologia indireta derruba a guarda dela; <= 35% deixa ela vulnerável!
        leveragePressure: 0, // ⛓️ Pressão / Encurralada (0..100%): sobe com chantagens do Dossiê; >= 50% pode fazê-la contra-atacar!
        // Status Pessoais & Íntimos da Aurora
        auroraEnergy: 76,    // 🔋 Disposição Física Dela (0..100%): cai no turno do Café Sakura e de madrugada!
        intimacyLevel: 0,    // 💞 Nível de Intimidade (0..100%): evolui em 5 estágios reais de proximidade física e emocional!
        arousal: 10,         // 💋 Tensão & Desejo Dela (0..100%): sobe com provocações, proximidade, chuva e noites juntos!
        jealousy: 0,         // 😤 Ciúme / Apego Territorial (0..100%): sobe quando você provoca ciúme ou flerta fora!
        vulnerability: 15,   // 🦋 Abertura Emocional (0..100%): cresce quando ela baixa as barreiras de verdade com você!
        currentOutfit: "Moletom Oversized do 404",
        // Matriz Emocional Viva & Espiral Sombria Bidirecional (v8)
        undercurrent: "espontanea", // Emoção oculta por baixo da máscara (revelada com Percepção >= 16!)
        mentalStability: 82,        // 🧠 Estabilidade Emocional Dela (0..100%)
        auroraDarkness: 5,          // 🖤 Espiral Sombria / Corrupção Moral Dela (0..100%: >= 40% faz ela virar a antagonista!)
        traumaLevel: 0,             // 💔 Feridas Emocionais Acumuladas (0..100%)
        mood: "caotica",
        dynamic: "desconhecidos",
        stanceTrait: "Espontânea & Marrenta",
        dailyMoodBias: DAILY_BIASES[0],
        activity: "no_corredor_celular",
        wearingUniform: false,
        manualUniformOverride: null,
        previewPhotoPath: null,
        activeSpecialSceneKey: null,
        customAvatars: {},
        isBlockedOnPhone: false,
        unreadPhoneMessages: 0
      },

      pendingDelayedEffects: [],
      eventNotifications: [],
      dialogueHistory: [], // Log das últimas 25 interações para o modal Histórico
      activeMinigame: null,
      activeRandomEvent: null, // Evento aleatório ou pergunta-armadilha interativa com escolhas!
      focusEvolutionStage: 1,
      lastRandomEventTurn: -5,

      sharedStory: {
        chapter: 1,
        metInCorridor: false,
        firstImpression: null,
        unlocked404Key: false,
        timesSleptAt404: 0,
        controlEventsSeen: 0,
        romanceEventsSeen: 0,
        hotEventsSeen: 0
      },

      memories: [],
      sceneFeed: [],
      activeConversationNode: null,
      activeDeepScene: null,
      activeIntimateScene: null,
      intimacy: {
        sessions: 0,
        discovered: {},
        checkins: 0,
        stops: 0,
        log: []
      },
      seenDialogueVariants: {},
      activeTab: "situacao",
      inventory: [],
      topicLog: {},

      phoneChat: [
        {
          sender: "system",
          text: "📱 Seu Smartphone — Você ainda não tem o contato da vizinha do 404 salvo.",
          time: "23:10"
        }
      ],

      unlockedEndings: [],
      settings: {
        soundEnabled: true,
        hoverSfx: true,
        sfxVolume: 70,
        bgmEnabled: true,
        bgmVolume: 45,
        bgmMode: "auto",          // 'auto' | 'sakura_day' | 'cafe_bossa' | 'midnight_404' | 'velvet_heat' | 'dark_chess'
        ambienceEnabled: true,    // som ambiente de chuva noturna
        voiceEnabled: true,
        voiceAutoPlay: true,      // reproduzir fala da Aurora automaticamente
        voiceReadNarration: false,// ler também descrições/narrações
        voiceVolume: 85,
        voiceRate: 1.0,
        voicePitch: 1.0,          // ajuste fino de timbre (0.85..1.20)
        voiceName: "",
        theme: "pastel",          // 'pastel' | 'midnight' | 'velvet'
        buttonDetailMode: "clean",// 'clean' | 'detailed'
        intimacyTone: "intenso",  // 'suave' | 'intenso'
        textSpeed: "instant",     // 'instant' | 'fast' | 'typewriter'
        fontScale: "normal",      // 'normal' | 'large'
        animatedBg: true,
        bgIntensity: "intense",   // 'intense' | 'soft' | 'off'
        locationArt: true,        // cenários ilustrados no palco
        customCursor: true,       // cursor editorial personalizado
        clickFx: true             // ondas e brilhos no clique
      },
      flags: {}
    };
  }

  AG.state = createInitialState();
  AG.MOOD_DEFS = MOOD_DEFS;
  AG.DYNAMIC_DEFS = DYNAMIC_DEFS;

  AG.PLAYER_APPROACHES = {
    natural: { id: "natural", label: "🙂 Natural & Espontâneo", desc: "Age de forma equilibrada, sem máscara fixa." },
    calculista: { id: "calculista", label: "🧊 Frio & Calculista", desc: "Bônus em Psicologia Indireta (-Armadura dela, +Influência, menos Suspeita)." },
    provocador: { id: "provocador", label: "😈 Provocador Audacioso", desc: "Bônus em Clima Quente e Rivalidade (+20% Clima e +Rivalidade nas interações)." },
    implacavel: { id: "implacavel", label: "🐍 Oportunista & Chantagista", desc: "Bônus em Pressão & Chantagem (+Pressão no Dossiê e +Influência, mas gera mais Atrito)." },
    protetor: { id: "protetor", label: "💗 Protetor & Charmoso", desc: "Bônus em Afinidade e Confiança (+20% Afinidade e reduz Atrito mais rápido)." }
  };

  AG.setPlayerApproach = function (approachId) {
    if (!AG.PLAYER_APPROACHES[approachId]) return;
    AG.state.player.activeApproach = approachId;
    AG.saveGame("autosave");
  };

  AG.getPlayerPersonaLabel = function () {
    const pr = (AG.state.player && AG.state.player.persona) || { cold: 0, bold: 0, warm: 0, ruthless: 0 };
    const entries = [
      { k: "cold", val: pr.cold || 0, label: "🧊 Estrategista Frio" },
      { k: "ruthless", val: pr.ruthless || 0, label: "🐍 Chantagista Calculista" },
      { k: "bold", val: pr.bold || 0, label: "😈 Provocador Sem Filtro" },
      { k: "warm", val: pr.warm || 0, label: "💗 Protetor Envolvente" }
    ].sort((a, b) => b.val - a.val);
    if (entries[0].val < 6) return "🎭 Camaleão em Formação";
    return entries[0].label;
  };

  AG.unlockSecret = function (secretId, customMsg) {
    const s = AG.state;
    if (!s.secretsDossier || !s.secretsDossier[secretId]) return false;
    const sec = s.secretsDossier[secretId];
    if (sec.state === "held") return false;
    sec.state = "held";
    s.unlocks.unlockedSpyApp = true;
    s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
    AG.pushNotification(customMsg || `🗂️ NOVO SEGREDO NO DOSSIÊ: ${sec.name} (${sec.severity})! Você pode usá-lo para pressionar, barganhar ou queimar a prova diante da Aurora.`);
    return true;
  };

  AG.getHeldSecrets = function () {
    const d = AG.state.secretsDossier || {};
    return Object.values(d).filter((sec) => sec.state === "held");
  };

  AG.getIntimacyStage = function () {
    const lv = (AG.state.aurora && AG.state.aurora.intimacyLevel) || 0;
    if (lv >= 80) return { stage: 5, title: "💞 Entrega Completa", desc: "Confiança física e emocional absoluta entre o 402 e o 404." };
    if (lv >= 60) return { stage: 4, title: "🔥 Intimidade Sem Barreiras", desc: "Conforto total, noites juntos e sintonia intensa." };
    if (lv >= 40) return { stage: 3, title: "💓 Química & Tensão Íntima", desc: "Coração dispara fácil com seu toque e olhar de perto." };
    if (lv >= 20) return { stage: 2, title: "✨ Toques Casuais & Olhares", desc: "Já aceita proximidade, encosta o ombro e provoca sem medo." };
    return { stage: 1, title: "🌱 Distância Segura", desc: "Ainda mantendo espaço pessoal e observando suas intenções." };
  };

  // ==========================================================================
  // MOTOR UNIFICADO DE PRONTIDÃO, INTIMIDADE & CONSENTIMENTO (FONTE ÚNICA!)
  // Garante 100% de consistência entre Celular, Conversas, Locais e Cenas 18+
  // ==========================================================================
  AG.Gates = (function () {
    const G = {};

    function snap() {
      const s = AG.state;
      const a = s.aurora || {};
      const p = s.player || {};
      const ph = s.phoneState || {};
      const sk = p.skills || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
      const intimacy = a.intimacyLevel || 0;
      const affinity = a.affinity || 0;
      const trust = a.trust || 0;
      const heat = a.heat || 0;
      const arousal = a.arousal || 10;
      const discomfort = a.discomfort || 0;
      const influence = a.influence || 0;
      const rivalry = a.rivalry || 0;
      const sessions = (s.intimacy && s.intimacy.sessions) || 0;
      const manipulation = (ph.manipulationCount || 0) > 0 || (a.leveragePressure || 0) >= 25;
      const sleeping = a.activity === "dormindo";
      const inShift = !AG.isWeekend(s.day) && s.hour >= 12 && s.hour < 17;
      const partnered = (intimacy >= 46 && affinity >= 30) || (sessions >= 1 && affinity >= 25 && discomfort < 32);
      const heldSecrets = AG.getHeldSecrets ? AG.getHeldSecrets().length : 0;
      const hasAnyLeverage = (ph.leverage || 0) > 0 || heldSecrets > 0;
      return {
        s, a, p, ph, sk,
        intimacy, affinity, trust, heat, arousal, discomfort, influence, rivalry,
        sessions, manipulation, sleeping, inShift, partnered, heldSecrets, hasAnyLeverage
      };
    }

    function ok(chip = "Pronto") {
      return { ok: true, code: "ok", chip, reason: "", missing: "" };
    }

    function fail(code, chip, reason, missing) {
      return { ok: false, code, chip, reason, missing: missing || reason };
    }

    G.check = function (gateId, opts = {}) {
      const x = snap();
      const { s, a, sk, intimacy, affinity, trust, heat, arousal, discomfort, influence, rivalry, manipulation, sleeping, inShift, partnered, hasAnyLeverage } = x;

      if (opts.requireAwake && sleeping) {
        return fail("sleeping", "Dormindo", "Aurora está dormindo no 404 agora.", "Esperar ela acordar (09h+)");
      }
      if (opts.requireFreeOfShift && inShift) {
        return fail("shift", "No turno", "Aurora está trabalhando no Café Sakura até as 17h.", "Disponível fora do turno (após 17h)");
      }

      if (gateId === "phone_invite_402") {
        if (sleeping) return fail("sleeping", "Dormindo", "Aurora está dormindo agora.", "Aguardar ela acordar");
        if (inShift) return fail("shift", "No turno", "Ela está no expediente do Café Sakura até as 17h.", "Após as 17h ou fim de semana");
        if (discomfort >= 45) return fail("friction", `Atrito ${discomfort}%`, "O clima está pesado demais pra ela ir ao seu apê agora.", `Reduza Atrito < 45% (atual ${discomfort}%)`);
        if (intimacy >= 18 || affinity >= 22 || heat >= 28 || trust >= 24 || s.unlockedLocations.includes("ape_404") || s.weather === "chuva_noturna" || partnered) {
          return ok("Aceita ✓");
        }
        return fail("bond", `Intim. ${intimacy}/18`, "Ela ainda prefere te conhecer melhor antes de ir ao seu apê.", `Intimidade ${intimacy}/18 ou Afinidade ${affinity}/22`);
      }

      if (gateId === "phone_date_meet") {
        if (sleeping) return fail("sleeping", "Dormindo", "Aurora está dormindo agora.", "Aguardar ela acordar");
        if (inShift) return fail("shift", "No turno", "Ela está no turno do Café Sakura até as 17h.", "Fora do turno (após 17h)");
        if (discomfort >= 42) return fail("friction", `Atrito ${discomfort}%`, "Ela não está no clima para sair enquanto houver atrito.", `Reduza Atrito < 42%`);
        if (intimacy >= 14 || affinity >= 18 || heat >= 22 || trust >= 18 || partnered) return ok("Topa ✓");
        return fail("bond", `Afin. ${affinity}/18`, "Criem um pouco mais de sintonia primeiro.", `Intimidade ${intimacy}/14 ou Afinidade ${affinity}/18`);
      }

      if (gateId === "phone_selfie_cute") {
        if (sleeping) return fail("sleeping", "Dormindo", "Ela está dormindo agora.", "Aguardar ela acordar");
        if (discomfort >= 45) return fail("friction", `Atrito ${discomfort}%`, "O clima está chato demais pra ela mandar foto.", `Reduza Atrito < 45%`);
        if (intimacy >= 10 || affinity >= 15 || heat >= 18 || trust >= 14 || partnered) return ok("Manda ✓");
        return fail("bond", `Intim. ${intimacy}/10`, "Quebre um pouco mais o gelo antes de pedir foto.", `Intimidade ${intimacy}/10 ou Afinidade ${affinity}/15`);
      }

      if (gateId === "phone_photo_spicy") {
        if (sleeping) return fail("sleeping", "Dormindo", "Ela está dormindo agora.", "Aguardar ela acordar");
        if (manipulation) return fail("manipulation", "Pressão ativa", "Há manipulação/pressão ativa — apague trunfos e limpe o clima no Chat primeiro.", "Limpar manipulação no Chat");
        if (discomfort >= 36) return fail("friction", `Atrito ${discomfort}%`, "Atrito alto bloqueia fotos provocantes.", `Reduza Atrito < 36% (atual ${discomfort}%)`);
        if (intimacy >= 28 || heat >= 34 || (affinity >= 38 && trust >= 26) || a.dynamic === "tensao_ardente" || partnered) {
          return ok("Pronta ✓");
        }
        return fail("bond", `Intim. ${intimacy}/28`, "Ainda falta um pouco mais de intimidade ou clima pra ela mandar foto provocante.", `Intimidade ${intimacy}/28 ou Clima ${heat}/34`);
      }

      if (gateId === "phone_photo_nsfw") {
        if (sleeping) return fail("sleeping", "Dormindo", "Ela está dormindo agora.", "Aguardar ela acordar");
        if (manipulation) return fail("manipulation", "Pressão ativa", "Fotos 18+ exigem clima limpo e consensual (sem chantagem ativa).", "Limpar manipulação no Chat");
        if (discomfort >= 30) return fail("friction", `Atrito ${discomfort}%`, "Reduza o atrito antes de pedir algo tão íntimo.", `Reduza Atrito < 30% (atual ${discomfort}%)`);
        if (intimacy >= 46 || (heat >= 48 && affinity >= 28) || (arousal >= 55 && intimacy >= 32) || partnered) {
          return ok("18+ ✓");
        }
        return fail("bond", `Intim. ${intimacy}/46`, "Fotos exclusivas 18+ exigem intimidade profunda ou química alta.", `Intimidade ${intimacy}/46 ou Clima ${heat}/48`);
      }

      if (gateId === "phone_voice_call") {
        if (sleeping) return fail("sleeping", "Dormindo", "Ela está dormindo agora.", "Aguardar ela acordar");
        if (inShift) return fail("shift", "No turno", "Ela não consegue atender ligação no balcão do Café Sakura.", "Fora do turno (após 17h)");
        if (discomfort >= 48) return fail("friction", `Atrito ${discomfort}%`, "Ela não vai atender com o clima tão pesado.", `Reduza Atrito < 48%`);
        if (intimacy >= 10 || affinity >= 14 || trust >= 14 || heat >= 18 || partnered) return ok("Atende ✓");
        return fail("bond", `Afin. ${affinity}/14`, "Converse um pouco mais antes de ligar.", `Afinidade ${affinity}/14 ou Intimidade ${intimacy}/10`);
      }

      if (gateId === "phone_video_call") {
        if (sleeping) return fail("sleeping", "Dormindo", "Ela está dormindo agora.", "Aguardar ela acordar");
        if (inShift) return fail("shift", "No turno", "Sem chamada de vídeo no meio do expediente do Café Sakura.", "Fora do turno (após 17h)");
        if (discomfort >= 38) return fail("friction", `Atrito ${discomfort}%`, "Atrito alto impede chamada de vídeo.", `Reduza Atrito < 38%`);
        if (intimacy >= 24 || affinity >= 30 || heat >= 30 || trust >= 28 || partnered) return ok("Vídeo ✓");
        return fail("bond", `Intim. ${intimacy}/24`, "Precisa de mais intimidade para chamada de vídeo à vontade.", `Intimidade ${intimacy}/24 ou Afinidade ${affinity}/30`);
      }

      if (gateId === "phone_dare_402") {
        if (sleeping) return fail("sleeping", "Dormindo", "Ela está dormindo agora.", "Aguardar ela acordar");
        if (inShift) return fail("shift", "No turno", "Ela está presa no Café Sakura até 17h.", "Fora do turno (após 17h)");
        if (discomfort >= 48) return fail("friction", `Atrito ${discomfort}%`, "Com atrito alto, ela ignora provocações de aposta.", `Reduza Atrito < 48%`);
        if (influence >= 35 || rivalry >= 35 || heat >= 40 || intimacy >= 36 || partnered) return ok("Topa ✓");
        return fail("bond", `Rival./Clima`, "Precisa de mais rivalidade, influência ou química acesa.", `Rivalidade ${rivalry}/35, Influência ${influence}/35 ou Clima ${heat}/40`);
      }

      if (gateId === "phone_subtle_pressure") {
        if (sleeping) return fail("sleeping", "Dormindo", "Ela está dormindo agora.", "Aguardar ela acordar");
        if (inShift) return fail("shift", "No turno", "Ela está no turno do Café Sakura.", "Após 17h");
        if (!hasAnyLeverage) return fail("leverage", "Sem trunfo", "Você precisa de pelo menos 1 trunfo ou segredo.", "Colete um trunfo no Dossiê");
        if (sk.charisma < 16) return fail("skill", `Lábia ${sk.charisma}/16`, "Requer Lábia 16+ para pressão velada sem atrito.", `Lábia ${sk.charisma}/16`);
        return ok("Lábia ✓");
      }

      if (gateId === "lift_waist") {
        if (discomfort >= 40) return fail("friction", `Atrito ${discomfort}%`, "Ela não vai gostar de ser erguida estando irritada.", `Atrito < 40%`);
        if (intimacy >= 18 || affinity >= 22 || heat >= 24 || trust >= 22 || partnered) return ok("Pronto ✓");
        return fail("bond", `Intim. ${intimacy}/18`, "Ainda falta um pouco de proximidade para pegá-la pela cintura.", `Intimidade ${intimacy}/18 ou Afinidade ${affinity}/22`);
      }

      if (gateId === "hug_behind") {
        if (discomfort >= 38) return fail("friction", `Atrito ${discomfort}%`, "Ela está fechada demais por causa do atrito.", `Atrito < 38%`);
        if (intimacy >= 24 || affinity >= 30 || heat >= 32 || trust >= 28 || partnered) return ok("Pronto ✓");
        return fail("bond", `Intim. ${intimacy}/24`, "Precisa de mais intimidade para abraçá-la de surpresa por trás.", `Intimidade ${intimacy}/24 ou Afinidade ${affinity}/30`);
      }

      if (gateId === "spicy_location_move") {
        if (manipulation) return fail("manipulation", "Pressão ativa", "Clima forçado/manipulação bloqueia avanço espontâneo.", "Limpe a manipulação no Chat");
        if (discomfort >= 36) return fail("friction", `Atrito ${discomfort}%`, "Clima tenso demais para provocações físicas.", `Atrito < 36%`);
        if (intimacy >= 20 || heat >= 24 || affinity >= 26 || partnered) return ok("Clima ✓");
        return fail("bond", `Intim. ${intimacy}/20`, "Aumente um pouco a intimidade ou o clima primeiro.", `Intimidade ${intimacy}/20 ou Clima ${heat}/24`);
      }

      if (gateId === "direct_kiss_move") {
        if (manipulation) return fail("manipulation", "Pressão ativa", "Ela não aceita beijo direto enquanto houver chantagem/pressão ativa.", "Apague trunfos e peça desculpas no Chat");
        if (discomfort >= 35) return fail("friction", `Atrito ${discomfort}%`, "Conserte o atrito antes de avançar para um beijo.", `Atrito < 35% (atual ${discomfort}%)`);
        if (intimacy >= 36 || (affinity >= 38 && heat >= 34) || heat >= 48 || (arousal >= 52 && affinity >= 24) || partnered) {
          return ok("Clima ✓");
        }
        return fail("bond", `Intim. ${intimacy}/36`, "Ainda precisa de mais intimidade ou química para avançar direto.", `Intimidade ${intimacy}/36 ou Clima ${heat}/48`);
      }

      if (gateId === "private_spicy_room") {
        if (manipulation) return fail("manipulation", "Pressão ativa", "Exige relação limpa sem chantagem ativa.", "Limpar manipulação no Chat");
        if (discomfort >= 34) return fail("friction", `Atrito ${discomfort}%`, "Reduza o atrito abaixo de 34%.", `Atrito < 34%`);
        if (intimacy >= 26 || heat >= 32 || affinity >= 34 || partnered) return ok("Pronto ✓");
        return fail("bond", `Intim. ${intimacy}/26`, "Construa mais intimidade ou química antes de fechar a porta.", `Intimidade ${intimacy}/26 ou Clima ${heat}/32`);
      }

      if (gateId === "intimate_18") {
        const privateLoc = s.currentLocation === "ape_404" || s.currentLocation === "ape_402";
        if (!AG.isAuroraHere() || sleeping) return fail("absent", "Indisponível", "Aurora precisa estar presente e acordada com você.", "Estar com a Aurora acordada");
        if (!privateLoc) return fail("loc", "Local público", "Apenas em privacidade no Apê 404 ou Apê 402.", "Ir ao Apê 404 ou 402 juntos");
        if (manipulation) return fail("manipulation", "Pressão ativa", "Momento 18+ exige 100% de consentimento livre (sem manipulação ativa).", "Limpar manipulação no Chat");
        if (discomfort >= 32) return fail("friction", `Atrito ${discomfort}%`, "Conserte o atrito antes de propor uma noite íntima.", `Atrito < 32% (atual ${discomfort}%)`);
        if (intimacy >= 46 || (heat >= 42 && affinity >= 22) || (heat >= 50 && intimacy >= 26) || (arousal >= 58 && intimacy >= 32) || partnered) {
          return ok("18+ Pronto ✓");
        }
        return fail("bond", `Intim. ${intimacy}/46`, "Aumente mais a Intimidade ou o Clima Quente juntos primeiro.", `Intimidade ${intimacy}/46 ou Clima ${heat}/42 + Afin. ${affinity}/22`);
      }

      if (gateId === "sleep_cuddle") {
        if (manipulation) return fail("manipulation", "Pressão ativa", "Sem confiança limpa, tocar nela dormindo quebra tudo.", "Limpar manipulação no Chat");
        if (discomfort >= 30) return fail("friction", `Atrito ${discomfort}%`, "Com atrito alto ela vai acordar assustada.", `Atrito < 30%`);
        if (intimacy >= 46 || (affinity >= 50 && trust >= 40) || a.dynamic === "tensao_ardente" || partnered) return ok("Confortável ✓");
        return fail("bond", `Intim. ${intimacy}/46`, "Exige intimidade profunda para deitar colado enquanto ela dorme.", `Intimidade ${intimacy}/46 ou Afin. ${affinity}/50 + Conf. ${trust}/40`);
      }

      if (gateId === "topic_spicy_soft") {
        if (discomfort >= 45) return fail("friction", `Atrito ${discomfort}%`, "Clima tenso demais para provocações agora.", `Atrito < 45%`);
        if (intimacy >= 12 || heat >= 18 || affinity >= 18 || partnered) return ok("Pronto");
        return fail("bond", `Intim. ${intimacy}/12`, "Aqueça um pouco o papo ou ganhe intimidade primeiro.", `Intimidade ${intimacy}/12 ou Clima ${heat}/18`);
      }

      if (gateId === "topic_spicy_deep") {
        if (manipulation) return fail("manipulation", "Pressão ativa", "Toques íntimos intensos exigem clima livre de manipulação.", "Limpar manipulação no Chat");
        if (discomfort >= 36) return fail("friction", `Atrito ${discomfort}%`, "Reduza o atrito antes de avançar tanto.", `Atrito < 36%`);
        if (intimacy >= 26 || heat >= 32 || affinity >= 34 || partnered) return ok("Quente ✓");
        return fail("bond", `Intim. ${intimacy}/26`, "Precisa de mais intimidade ou química acesa.", `Intimidade ${intimacy}/26 ou Clima ${heat}/32`);
      }

      if (gateId === "topic_declare_love") {
        if (discomfort >= 40) return fail("friction", `Atrito ${discomfort}%`, "Melhor resolver o clima antes de se declarar.", `Atrito < 40%`);
        if (intimacy >= 22 || affinity >= 30 || trust >= 26 || partnered) return ok("Pronto");
        return fail("bond", `Afin. ${affinity}/30`, "Construa um vínculo mais forte antes da declaração.", `Afinidade ${affinity}/30 ou Intimidade ${intimacy}/22`);
      }

      return ok();
    };

    G.getMilestoneChecklist = function () {
      const checks = [
        { label: "Convidar pro Apê 402 (Chat)", res: G.check("phone_invite_402") },
        { label: "Chamada de Vídeo (Celular)", res: G.check("phone_video_call") },
        { label: "Foto Provocante no Chat", res: G.check("phone_photo_spicy") },
        { label: "Foto Exclusiva 18+ no Chat", res: G.check("phone_photo_nsfw") },
        { label: "Avanço / Beijo Direto no Palco", res: G.check("direct_kiss_move") },
        { label: "Cena Íntima 18+ (5 Etapas)", res: G.check("intimate_18") }
      ];
      return checks;
    };

    return G;
  })();

  try {
    const savedEndings = localStorage.getItem("mfws_global_endings");
    if (savedEndings) AG.state.unlockedEndings = JSON.parse(savedEndings);
  } catch (e) {}

  AG.isWeekend = function (day) {
    const idx = ((day || AG.state.day) - 1) % 7;
    return idx === 5 || idx === 6; // Sáb (5) ou Dom (6)
  };

  // Aplica classes de tema e fonte no <body>
  AG.applyVisualSettings = function () {
    const st = (AG.state && AG.state.settings) || {};
    if (typeof document !== "undefined" && document.body) {
      document.body.setAttribute("data-theme", st.theme || "pastel");
      document.body.setAttribute("data-font", st.fontScale || "normal");
      document.body.setAttribute("data-anim", st.animatedBg === false ? "off" : "on");
      document.body.setAttribute("data-bg-fx", st.bgIntensity || "intense");
      document.body.setAttribute("data-loc-art", st.locationArt === false ? "off" : "on");
      document.body.setAttribute("data-cursor", st.customCursor === false ? "native" : "custom");
    }
    if (AG.CursorFX && AG.CursorFX.sync) AG.CursorFX.sync();
    if (AG.Audio && AG.Audio.syncSettings) AG.Audio.syncSettings();
  };

  AG.getDefaultSettings = function () {
    return Object.assign({}, createInitialState().settings);
  };

  AG.resetDefaultSettings = function () {
    AG.state.settings = AG.getDefaultSettings();
    AG.applyVisualSettings();
    AG.saveGame("autosave");
    return AG.state.settings;
  };

  AG.refreshAuroraActivity = function () {
    const s = AG.state;
    const a = s.aurora;
    const loc = AG.getAuroraCurrentLocation ? AG.getAuroraCurrentLocation() : s.currentLocation;
    const h = s.hour;

    const isCafeShift = !AG.isWeekend(s.day) && h >= 12 && h < 17;

    if (a.manualUniformOverride !== null && a.manualUniformOverride !== undefined) {
      a.wearingUniform = a.manualUniformOverride;
    } else {
      a.wearingUniform = isCafeShift;
    }

    // Atualiza o visual atual da Aurora conforme o horário, local e clima
    if (a.wearingUniform) {
      a.currentOutfit = "Uniforme do Café Sakura";
    } else if (h >= 0 && h < 9) {
      a.currentOutfit = "Camiseta Larga de Dormir";
    } else if (AG.isWeekend(s.day) && h >= 12 && h < 19) {
      a.currentOutfit = "Vestido Leve de Folga";
    } else if (loc === "praca_cerejeiras" || loc === "mercadinho_24h") {
      a.currentOutfit = "Conjunto Casual do Bairro";
    } else {
      a.currentOutfit = "Moletom Oversized do 404";
    }

    if (isCafeShift) {
      a.activity = "trabalhando_uniforme";
      return;
    }

    if ((loc === "ape_404" || (loc === "ape_402" && s.flags.auroraVisitingYourApt)) && (h >= 3 && h < 9)) {
      a.activity = "dormindo";
      a.mood = "dormindo";
      return;
    }

    if (a.mood === "dormindo") {
      a.mood = "espontanea";
    }

    if (loc === "ape_404" || (loc === "ape_402" && s.flags.auroraVisitingYourApt)) {
      if (s.weather === "chuva_noturna" && s.totalActionsTaken % 2 === 0) {
        a.activity = "olhando_chuva_janela";
        return;
      }
      const homePool = ["mexendo_cozinha", "assistindo_jogando", "mexendo_movel", "tentando_alcancar_alto", "desenhando_tablet"];
      if ((a.intimacyLevel || 0) >= 30 && (h >= 19 || h <= 2)) homePool.push("saindo_banho_toalha");
      if ((a.intimacyLevel || 0) >= 35 && loc === "ape_404") homePool.push("trocando_roupa_porta");
      a.activity = homePool[(s.totalActionsTaken + s.day) % homePool.length];
      return;
    }

    if (loc === "mercadinho_24h") {
      a.activity = "tentando_alcancar_alto";
      return;
    }

    a.activity = (s.totalActionsTaken % 3 === 0) ? "tentando_alcancar_alto" : "no_corredor_celular";
  };

  AG.pendingToasts = [];

  function stripEmojiBasic(str) {
    if (!str) return "";
    return String(str)
      .replace(/^(?:[\p{Extended_Pictographic}\uFE0F\u200D\u2600-\u27BF]+(?:\s+|$))+/u, "")
      .trim();
  }

  AG.queueToast = function (text, kind = "info", dir = "info") {
    if (!text) return;
    const clean = stripEmojiBasic(text);
    if (!clean) return;
    AG.pendingToasts.push({
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      text: clean,
      kind,
      dir
    });
    if (AG.pendingToasts.length > 12) {
      AG.pendingToasts = AG.pendingToasts.slice(-12);
    }
  };

  AG.pushNotification = function (text, pills = []) {
    AG.state.eventNotifications = AG.state.eventNotifications || [];
    AG.state.eventNotifications.push({ text, pills });
    if (AG.state.eventNotifications.length > 2) {
      AG.state.eventNotifications = AG.state.eventNotifications.slice(-2);
    }
    AG.queueToast(text, "info", "info");
    AG.recordHistory(stripEmojiBasic(text), { kind: "event" });
  };

  AG.recordHistory = function (text, meta) {
    if (!text) return;
    const s = AG.state;
    s.dialogueHistory = s.dialogueHistory || [];
    const m = meta || {};
    s.dialogueHistory.unshift({
      day: s.day,
      time: AG.getFormattedClock(),
      speaker: m.speaker || "",
      playerBeat: m.playerBeat || "",
      action: m.action || "",
      kind: m.kind || "note",
      text: String(text)
    });
    if (s.dialogueHistory.length > 45) {
      s.dialogueHistory = s.dialogueHistory.slice(0, 45);
    }
  };

  AG.WEATHER_DEFS = {
    limpo: { id: "limpo", label: "Céu limpo", short: "", ambient: "O ar lá fora está calmo." },
    chuva_noturna: { id: "chuva_noturna", label: "Chuva lá fora", short: "Chuva", ambient: "Gotas contínuas batem no vidro da janela." },
    apagao_andar: { id: "apagao_andar", label: "Meia-luz no 4º andar", short: "Meia-luz", ambient: "O corredor está em meia-luz por causa da queda de fase." }
  };

  AG.getWeatherInfo = function () {
    const key = (AG.state && AG.state.weather) || "limpo";
    return AG.WEATHER_DEFS[key] || AG.WEATHER_DEFS.limpo;
  };

  AG.processDelayedEffects = function () {
    const s = AG.state;
    if (!s.pendingDelayedEffects || !s.pendingDelayedEffects.length) return;
    if (!AG.isAuroraHere() || s.aurora.activity === "dormindo") return;

    const eff = s.pendingDelayedEffects.shift();
    if (!eff) return;

    const pills = AG.applyDeltas(eff.deltas || {});
    if (eff.memoryId) {
      AG.addMemory(eff.memoryId, eff.memoryText, eff.memoryCat || "bom", true);
    }
    AG.pushNotification(`✨ Reação da Aurora ao que você fez antes: "${eff.auroraSpeech}"`, pills);
  };

  AG.getActiveAuroraSprite = function () {
    const s = AG.state;
    const a = s.aurora;

    const isUni = a.manualUniformOverride !== null && a.manualUniformOverride !== undefined
      ? a.manualUniformOverride
      : ((!AG.isWeekend(s.day) && s.hour >= 12 && s.hour < 17) || s.currentLocation === "cafe_sakura" || a.wearingUniform);

    const baseUniformOrCasual = isUni
      ? AG.MEDIA_PATHS.character.uniform
      : AG.MEDIA_PATHS.character.casualDefault;

    if (a.previewPhotoPath) {
      return { primary: a.previewPhotoPath, fallback: baseUniformOrCasual, label: a.previewPhotoPath.split("/").pop() };
    }
    if (a.customAvatars && a.customAvatars[a.mood]) {
      return { primary: a.customAvatars[a.mood], fallback: baseUniformOrCasual, label: "Custom (" + a.mood + ")" };
    }
    if (a.activeSpecialSceneKey && AG.MEDIA_PATHS.specialScenes[a.activeSpecialSceneKey]) {
      return {
        primary: AG.MEDIA_PATHS.specialScenes[a.activeSpecialSceneKey],
        fallback: baseUniformOrCasual,
        label: AG.MEDIA_PATHS.specialScenes[a.activeSpecialSceneKey].split("/").pop()
      };
    }
    if (isUni) {
      return { primary: AG.MEDIA_PATHS.character.uniform, fallback: AG.MEDIA_PATHS.character.casualDefault, label: "Aurora de uniforme PNG 4.png" };
    }
    const mDef = MOOD_DEFS[a.mood];
    if (mDef && mDef.spriteHint && AG.MEDIA_PATHS.character[mDef.spriteHint]) {
      const spPath = AG.MEDIA_PATHS.character[mDef.spriteHint];
      return { primary: spPath, fallback: baseUniformOrCasual, label: spPath.split("/").pop() };
    }
    if (s.hour >= 0 && s.hour < 5) return { primary: AG.MEDIA_PATHS.character.lateNightHoodie, fallback: baseUniformOrCasual, label: "Aurora Moletom Madrugada PNG.png" };

    return { primary: AG.MEDIA_PATHS.character.casualDefault, fallback: AG.MEDIA_PATHS.character.menuCute, label: "Aurora PNG 20.png" };
  };

  // Fallback seguro (substituído pelo motor completo em engine/audioEngine.js)
  AG.playSound = AG.playSound || function () {};

  AG.clamp = function (val, min, max) {
    return Math.max(min, Math.min(max, Math.round(val)));
  };

  AG.getPhaseOfDay = function (hour) {
    if (hour >= 6 && hour < 12) return { id: "manha", label: "🌅 Manhã" };
    if (hour >= 12 && hour < 18) return { id: "tarde", label: "☀️ Tarde" };
    if (hour >= 18 && hour < 24) return { id: "noite", label: "🌙 Noite" };
    return { id: "madrugada", label: "🌌 Madrugada" };
  };

  AG.getWeekdayName = function (day) {
    return WEEKDAYS[(day - 1) % 7];
  };

  AG.getFormattedClock = function () {
    return `${String(AG.state.hour).padStart(2, "0")}:${String(AG.state.minute).padStart(2, "0")}`;
  };

  AG.getAuroraCurrentLocation = function () {
    const s = AG.state;
    const h = s.hour;
    const dyn = s.aurora.dynamic;

    // 1. Compromissos fixos da rotina dela têm prioridade real (ela sai para trabalhar/passear)
    if (!AG.isWeekend(s.day) && h >= 12 && h < 17) return "cafe_sakura";
    if (AG.isWeekend(s.day) && h >= 14 && h < 17) return "praca_cerejeiras";

    // 2. Presença explícita quando ela foi chamada/convidada para um local específico
    if (s.flags.auroraVisitingYourApt) return "ape_402";
    if (s.flags.auroraIn404WithPlayer) return "ape_404";
    if (s.flags.auroraCalledToCorridor || (s.phoneState && s.phoneState.plantedWifiSabotage)) return "corredor_4andar";

    // 3. Rotina autônoma dela pelo prédio e bairro (nunca teleporta só porque você entrou num lugar!)
    if (dyn === "afastados") return (h >= 2 && h < 4) ? "mercadinho_24h" : "ape_404";
    if (h >= 2 && h < 14) return "ape_404";
    if (h >= 17 && h < 19) return (s.day % 2 === 0) ? "praca_cerejeiras" : "corredor_4andar";
    if (h >= 19 && h < 22) return "ape_404";
    if (h >= 22 && h <= 23) return "corredor_4andar";
    if (h >= 0 && h < 2) return "mercadinho_24h";
    return "ape_404";
  };

  AG.isAuroraHere = function () {
    return AG.getAuroraCurrentLocation() === AG.state.currentLocation;
  };

  AG.unlockAuroraPhoneNumber = function (reasonText) {
    const s = AG.state;
    if (s.unlocks.hasAuroraNumber) return;
    s.unlocks.hasAuroraNumber = true;
    s.aurora.unreadPhoneMessages += 1;
    s.phoneChat.push({
      sender: "aurora",
      text: "oii 402!! salvou meu número direitinho? agora você não tem desculpa pra sumir 🎀",
      time: AG.getFormattedClock()
    });
    AG.addMemory("conseguiu_numero", reasonText || "Conseguiu o número de celular pessoal da Aurora.", "bom", true);
  };

  AG.recalculateDynamic = function () {
    const s = AG.state;
    const a = s.aurora;
    const sh = s.sharedStory;
    const ph = s.phoneState || {};

    // Molda o Traço de Postura (stanceTrait) conforme suas escolhas acumuladas
    if ((a.auroraDarkness || 0) >= 60 && (a.influence || 0) >= 45) a.stanceTrait = "Cúmplice Sombria & Calculista";
    else if ((a.auroraDarkness || 0) >= 55) a.stanceTrait = "Antagonista Psicológica do 404";
    else if ((a.mentalStability !== undefined ? a.mentalStability : 82) <= 32) a.stanceTrait = "Frágil & Instável";
    else if ((a.rivalry || 0) >= 55 && a.heat >= 35) a.stanceTrait = "Rival Elétrica & Competitiva";
    else if ((a.influence || 0) >= 55 && a.dominance < 48) a.stanceTrait = "Desarmada & Mexida por Você";
    else if (a.dominance >= 50) a.stanceTrait = "Dominante & Mandona";
    else if (a.heat >= 50) a.stanceTrait = "Atrevida & Provocadora";
    else if (a.affinity >= 50) a.stanceTrait = "Dengosa & Entregue";
    else if (a.suspicion >= 55 || a.discomfort >= 45) a.stanceTrait = "Alerta & Desconfiada";
    else a.stanceTrait = "Espontânea & Marrenta";

    if (Math.abs(a.affinity) >= 35 || a.heat >= 38 || a.dominance >= 38 || (a.influence || 0) >= 40 || (a.rivalry || 0) >= 40 || (a.auroraDarkness || 0) >= 40 || ph.manipulationCount >= 1) {
      s.focusEvolutionStage = 3;
    } else if (s.totalActionsTaken >= 3 || sh.metInCorridor) {
      s.focusEvolutionStage = 2;
    } else {
      s.focusEvolutionStage = 1;
    }

    if ((a.auroraDarkness || 0) >= 55 && ((a.influence || 0) >= 45 || (a.rivalry || 0) >= 45)) {
      a.dynamic = "thriller_mutuo";
      return;
    }
    if ((a.auroraDarkness || 0) >= 50 && (a.dominance >= 42 || (a.mentalStability !== undefined && a.mentalStability <= 45))) {
      a.dynamic = "espiral_sombria_dela";
      return;
    }
    if ((a.rivalry || 0) >= 58 && a.discomfort < 72) {
      a.dynamic = "guerra_fria_4andar";
      return;
    }
    if ((a.influence || 0) >= 58 && a.dominance < 52 && a.discomfort < 65) {
      a.dynamic = "jogo_de_poder_mutuo";
      return;
    }
    if (ph.manipulationCount > 0) {
      a.dynamic = "relacao_manipulada";
      return;
    }
    if (a.discomfort >= 78 && a.dominance < 50) {
      a.dynamic = "afastados";
      return;
    }
    if (a.dominance >= 48 && (a.discomfort >= 25 || a.heat >= 35 || sh.controlEventsSeen >= 2)) {
      a.dynamic = "teia_de_controle";
      return;
    }
    if (a.discomfort >= 48 || a.affinity <= -20) {
      a.dynamic = "gelo_e_farpas";
      return;
    }
    if (a.heat >= 52 && a.affinity >= 15) {
      a.dynamic = "tensao_ardente";
      return;
    }
    if (a.affinity >= 52 && a.trust >= 40) {
      a.dynamic = "chamego_dengoso";
      return;
    }
    if (a.affinity >= 28 || a.trust >= 28) {
      a.dynamic = "sintonia_caotica";
      return;
    }
    if (sh.firstImpression === "provocante" || a.heat >= 28) {
      a.dynamic = "faisca_imediata";
      return;
    }
    if (sh.metInCorridor) {
      a.dynamic = "vizinhos_curiosos";
      return;
    }
    a.dynamic = "desconhecidos";
  };

  AG.checkHubAndStoryProgression = function () {
    const s = AG.state;
    const a = s.aurora;
    const ph = s.phoneState || {};

    if (s.sharedStory.metInCorridor && !s.unlocks.unlockedNeighborhood) {
      s.unlocks.unlockedNeighborhood = true;
      ["mercadinho_24h", "cafe_sakura", "praca_cerejeiras"].forEach((loc) => {
        if (!s.unlockedLocations.includes(loc)) s.unlockedLocations.push(loc);
      });
    }

    if (
      !s.unlockedLocations.includes("ape_404") &&
      (a.affinity >= 42 || a.heat >= 45 || a.dominance >= 45 || ph.manipulationCount >= 1 || s.unlocks.hasSpareKey404 || (s.day >= 4 && a.trust >= 30))
    ) {
      s.unlockedLocations.push("ape_404");
      s.mainHubStage = 3;
      s.sharedStory.unlocked404Key = true;
      AG.addMemory("chave_404", s.unlocks.hasSpareKey404 ? "Conseguiu acesso ao Apê 404 com a chave reserva." : "A Aurora abriu as portas do Apê 404 para você.", "bom", true);
      AG.pushNotification("🔓 Novo local desbloqueado no mapa: Apê 404 da Aurora!");
    } else if (s.mainHubStage === 1 && (s.day >= 2 || a.affinity >= 18 || a.heat >= 22)) {
      s.mainHubStage = 2;
    }
  };

  AG.addMemory = function (id, text, category = "bom", permanent = false) {
    const idx = AG.state.memories.findIndex((m) => m.id === id);
    const obj = { id, text, category, permanent, dayCreated: AG.state.day };
    if (idx !== -1) AG.state.memories[idx] = obj;
    else {
      AG.state.memories.unshift(obj);
      if (AG.state.mode === "simulator") {
        AG.queueToast("Nova memória registrada", "info", "info");
      }
    }
    if (AG.state.memories.length > 25) {
      AG.state.memories = AG.state.memories.filter((m, i) => m.permanent || i < 19);
    }
  };

  AG.advanceTime = function (minutes, opts = {}) {
    const s = AG.state;
    const p = s.player;
    const a = s.aurora;
    const ph = s.phoneState;

    const wasAuroraHere = AG.isAuroraHere();
    s.eventNotifications = [];

    if (!opts.keepSpecialScene) {
      a.activeSpecialSceneKey = null;
      a.previewPhotoPath = null;
    }

    s.totalActionsTaken += 1;
    let totalMins = s.minute + minutes;
    let hoursPassed = Math.floor(totalMins / 60);
    s.minute = totalMins % 60;

    let newHour = s.hour + hoursPassed;
    let daysPassed = Math.floor(newHour / 24);
    s.hour = newHour % 24;

    if (s.currentLocation === "ape_404") {
      s.unlocks.visited404Once = true;
    }

    if (daysPassed > 0 || opts.isSleeping || (!AG.isWeekend(s.day) && s.hour >= 12 && s.hour < 17)) {
      s.flags.auroraVisitingYourApt = false;
      s.flags.auroraCalledToCorridor = false;
      s.flags.auroraIn404WithPlayer = false;
      if (ph) ph.plantedWifiSabotage = false;
    }
    if (daysPassed > 0 || opts.isSleeping) {
      a.manualUniformOverride = null;
    }

    if (daysPassed > 0) {
      s.day += daysPassed;
      p.rentDueInDays -= daysPassed;
      a.dailyMoodBias = DAILY_BIASES[(s.day - 1) % 7];
      s.memories = s.memories.filter((m) => m.permanent || (s.day - m.dayCreated) <= 3);

      // Reseta clima no amanhecer de novo dia fora do ciclo de chuva
      if (s.day % 3 !== 0) {
        s.weather = "limpo";
      }

      if (AG.getWeekdayName(s.day) === "Sex") {
        AG.applyDeltas({ heat: 6 });
        AG.queueToast("Sexta-feira no quarto andar", "hot", "info");
      } else if (AG.isWeekend(s.day)) {
        AG.queueToast("Fim de semana · Aurora de folga", "pos", "info");
      }

      if (p.rentDueInDays <= 0) {
        p.rentDueInDays = 7;
        if (p.money >= p.rentAmount) {
          AG.applyDeltas({ money: -p.rentAmount });
          AG.queueToast(`Aluguel pago em dia (R$ ${p.rentAmount})`, "info", "down");
        } else {
          AG.applyDeltas({ calm: -20, dominance: 8 });
          AG.queueToast(`Faltou saldo pro aluguel (R$ ${p.rentAmount})`, "neg", "down");
        }
      }
    }

    // Bug corrigido: chuva noturna agora realmente começa nos dias chuvosos a partir das 18h!
    if (s.day % 3 === 0 && (s.hour >= 18 || s.hour <= 3) && s.weather === "limpo") {
      s.weather = "chuva_noturna";
      AG.queueToast("Chuva começou lá fora", "info", "info");
    } else if (s.weather === "chuva_noturna" && s.hour >= 7 && s.hour < 18) {
      s.weather = "limpo";
    }

    if (!opts.isSleeping) {
      s._vitalFrac = s._vitalFrac || { e: 0, s: 0, d: 0 };
      const factor = minutes / 60;
      s._vitalFrac.e += 5.5 * factor;
      s._vitalFrac.s += 6.5 * factor;
      s._vitalFrac.d += 4.0 * factor;
      const lossE = Math.floor(s._vitalFrac.e);
      const lossS = Math.floor(s._vitalFrac.s);
      const gainD = Math.floor(s._vitalFrac.d);
      s._vitalFrac.e -= lossE;
      s._vitalFrac.s -= lossS;
      s._vitalFrac.d -= gainD;

      const prevE = p.energy;
      const prevS = p.satiety;
      if (lossE > 0) p.energy = AG.clamp(p.energy - lossE, 0, 100);
      if (lossS > 0) p.satiety = AG.clamp(p.satiety - lossS, 0, 100);
      if (gainD > 0) p.desire = AG.clamp(p.desire + gainD, 0, 100);

      if (p.energy <= 12 && prevE > 12) AG.queueToast("Energia baixa · descanse no 402", "neg", "down");
      if (p.satiety <= 12 && prevS > 12) AG.queueToast("Fome alta · coma algo", "neg", "down");
      if (p.energy <= 15 || p.satiety <= 15) p.calm = AG.clamp(p.calm - 4, 0, 100);
    }

    AG.refreshAuroraActivity();

    // Se a rotina dela mudou e ela saiu do seu local atual, encerra interações presenciais!
    if (wasAuroraHere && !AG.isAuroraHere() && !opts.isSleeping) {
      s.activeConversationNode = null;
      s.activeDeepScene = null;
      s.activeIntimateScene = null;
      if (["situacao", "conversar", "chamego", "provocar", "controle", "presentes"].includes(s.activeTab)) {
        s.activeTab = "local";
      }
      const newLocObj = AG.LOCATIONS[AG.getAuroraCurrentLocation()];
      if (newLocObj) {
        AG.queueToast(`Aurora foi para ${newLocObj.shortName}`, "info", "info");
      }
    }

    if (daysPassed > 0 || hoursPassed >= 3) {
      AG.refreshAuroraMoodByContext();
    }

    if (!opts.suppressRandom) {
      AG.processDelayedEffects();
    }

    // Ponto 031: Visitas Espontâneas da Aurora ao Seu Apê 402 à Noite! (Só se ela estiver no prédio e acordada)
    if (
      !opts.suppressRandom &&
      s.currentLocation === "ape_402" &&
      !s.flags.auroraVisitingYourApt &&
      ["ape_404", "corredor_4andar"].includes(AG.getAuroraCurrentLocation()) &&
      a.activity !== "dormindo" &&
      (s.hour >= 20 || s.hour <= 1) &&
      (a.affinity >= 48 || a.heat >= 48 || a.dominance >= 48) &&
      a.discomfort < 40 &&
      Math.random() < 0.25
    ) {
      s.flags.auroraVisitingYourApt = true;
      AG.refreshAuroraActivity();
      const visitSpeech = a.dominance >= 48
        ? "Bati na sua porta porque resolvi que hoje você vai me fazer companhia aqui no 402. Abre espaço aí."
        : a.heat >= 48
          ? "O 404 tava silencioso demais e eu vim ver o que o meu vizinho favorito tava fazendo sozinho a essa hora..."
          : "Oi... deu saudade de você do outro lado da parede e vim ficar um pouquinho aqui no seu cantinho, posso?";
      AG.pushNotification(`🚪 *TOC, TOC!* A Aurora veio bater na porta do seu Apê 402 espontaneamente: "${visitSpeech}"`);
    }

    // Ponto 019: Pergunta-Armadilha quando a Suspeita da Aurora atinge >= 75%!
    if (
      !opts.suppressRandom &&
      AG.isAuroraHere() &&
      a.activity !== "dormindo" &&
      a.suspicion >= 75 &&
      !s.activeRandomEvent &&
      !s.activeMinigame
    ) {
      s.activeRandomEvent = {
        id: "trap_high_suspicion",
        title: "🔍 Pergunta-Armadilha da Aurora (Suspeita Crítica!)",
        desc: "A Aurora cruza os braços, olha fundo nos seus olhos e te coloca contra a parede: 'Andam acontecendo umas coincidências muito estranhas nesse quarto andar e umas coisas minhas mexidas... Você tem alguma coisa pra me confessar agora?'",
        choices: [
          {
            id: "trap_charisma_bluff",
            tone: "ctrl",
            label: "🗣️ [Usar Lábia 20+] Manter a calma absoluta, olhar nos olhos dela e dar uma explicação impecável",
            skillHint: "Requer 🗣️ Lábia >= 20 para zerar a suspeita sem ser pego"
          },
          {
            id: "trap_honest_confess",
            tone: "sweet",
            label: "🙏 Confessar que andou curioso demais sobre ela e pedir desculpas sinceras",
            skillHint: "Perde 1 Trunfo, mas reduz a Suspeita em -50% e preserva a relação"
          },
          {
            id: "trap_defensive_lie",
            tone: "risky",
            label: "💢 Ficar na defensiva e responder com ironia",
            skillHint: "Alto risco de confirmar a desconfiança dela (+Atrito)"
          }
        ]
      };
    }

    // =========================================================================
    // AÇÕES AUTÔNOMAS DA AURORA (A personagem age contra/com você por conta própria!)
    // =========================================================================

    // 1. Aurora Contra-Chantageia o Jogador se LeveragePressure >= 45% ou ManipulationCount >= 1
    if (
      !opts.suppressRandom &&
      AG.isAuroraHere() &&
      a.activity !== "dormindo" &&
      ((a.leveragePressure || 0) >= 45 || (ph && ph.manipulationCount >= 1)) &&
      !s.activeRandomEvent &&
      !s.activeMinigame &&
      (s.totalActionsTaken - (s.lastRandomEventTurn || 0)) >= 3 &&
      Math.random() < 0.32
    ) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.activeRandomEvent = {
        id: "aurora_act_counter_blackmail",
        title: "⚡ AÇÃO DA AURORA: Contra-Chantagem do 404!",
        desc: "A Aurora tranca a porta atrás de si, encosta na parede com o olhar gelado e levanta o próprio celular: 'Achou que só você sabia juntar sujeira dos outros? Eu tirei foto do seu caderno de estratégia aberto no 402 e descobri seu atraso com o cliente principal. Se você continuar me pressionando, eu jogo tudo no ventilador. Qual vai ser, 402?'",
        choices: [
          {
            id: "cb_ice_bluff",
            tone: "ctrl",
            label: "🧊 [Frieza • Lábia 18+] Sorrir sem piscar e mostrar que o que você tem sobre ela é muito pior",
            skillHint: "Requer 🗣️ Lábia >= 18: quebra a armadura dela (-25% Armadura, +20% Influência)"
          },
          {
            id: "cb_mutual_pact",
            tone: "hot",
            label: "🤝 [Pacto Sombrio] Propor um acordo de 'armas guardadas': ninguém expõe ninguém, mas a tensão continua",
            skillHint: "Reduz Atrito (-18), aumenta +16 Clima e +14% Rivalidade"
          },
          {
            id: "cb_burn_own_leverage",
            tone: "sweet",
            label: "🔥 [Jogada de Choque] Apagar um segredo dela na frente dela e desarmar a guerra de vez",
            skillHint: "Zera Pressão, reduz Atrito (-30) e dá +22 Confiança"
          },
          {
            id: "cb_escalate_ruthless",
            tone: "risky",
            label: "🐍 [Implacável] Pagar pra ver e dobrar a aposta cara a cara",
            skillHint: "+25% Pressão e +20% Rivalidade, mas explode o Atrito (+22)"
          }
        ]
      };
    }

    // 2. Aurora Bisbilhotando no Seu Apê 402 (Só se ela estiver no prédio e acordada!)
    if (
      !opts.suppressRandom &&
      s.currentLocation === "ape_402" &&
      ["ape_404", "corredor_4andar"].includes(AG.getAuroraCurrentLocation()) &&
      a.activity !== "dormindo" &&
      !s.activeRandomEvent &&
      !s.activeMinigame &&
      (s.flags.plantedFakeBait || (a.suspicion || 0) >= 35 || (a.rivalry || 0) >= 35) &&
      (s.totalActionsTaken - (s.lastRandomEventTurn || 0)) >= 3 &&
      Math.random() < (s.flags.plantedFakeBait ? 0.65 : 0.28)
    ) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.flags.auroraVisitingYourApt = true;
      AG.refreshAuroraActivity();
      const wasBait = !!s.flags.plantedFakeBait;
      s.flags.plantedFakeBait = false;
      s.activeRandomEvent = {
        id: "aurora_act_snoop_402",
        title: wasBait ? "🪝 ISCA MORDIDA: Você Flagrou a Aurora Bisbilhotando o 402!" : "👀 AÇÃO DA AURORA: Você Flagrou Ela Mexendo na Sua Mesa no 402!",
        desc: wasBait
          ? "Sua isca falsa funcionou perfeitamente! Ao entrar em silêncio no seu Apê 402, você flagra a Aurora debruçada sobre a sua mesa lendo a página falsa que você deixou de propósito. Ela congela no lugar, pálida!"
          : "Você abre a porta do seu Apê 402 em silêncio e flagra a Aurora de costas revirando suas anotações sobre a escrivaninha para tentar descobrir seus planos. Ela dá um pulo assustada quando você fecha a porta!",
        choices: [
          {
            id: "snoop_weaponize",
            tone: "ctrl",
            label: "📸 [Chantagem Instantânea] Tirar uma foto dela em flagrante e usar como novo Trunfo (+Pressão • -Armadura)",
            skillHint: "Desbloqueia Trunfo de Flagrante, -24% Armadura dela e +18% Influência"
          },
          {
            id: "snoop_cold_mindgame",
            tone: "ctrl",
            label: "🧊 [Psicologia Indireta] Não gritar — apenas sentar na cama, sorrir calmo e perguntar o que ela achou",
            skillHint: "Desestabiliza ela completamente (-28% Armadura, +16% Influência, -15% Suspeita)"
          },
          {
            id: "snoop_tease_pin",
            tone: "hot",
            label: "🔥 [Audacioso] Encostar na porta impedindo a fuga e cobrar um 'pedágio' pela invasão",
            skillHint: "+18 Clima, +12% Rivalidade, -15% Armadura"
          },
          {
            id: "snoop_let_go_warm",
            tone: "sweet",
            label: "💗 [Desarmar com Sinceridade] Rir baixo e dizer que ela não precisa invadir — basta perguntar",
            skillHint: "+16 Afinidade, +14 Confiança, -20% Suspeita"
          }
        ]
      };
    }

    // 3. Teste Psicológico da Aurora (Ela testa se você mente ou percebe o blefe dela!)
    if (
      !opts.suppressRandom &&
      AG.isAuroraHere() &&
      a.activity !== "dormindo" &&
      s.totalActionsTaken >= 5 &&
      !s.activeRandomEvent &&
      !s.activeMinigame &&
      (s.totalActionsTaken - (s.lastRandomEventTurn || 0)) >= 4 &&
      Math.random() < 0.2
    ) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      const perc = (p.skills && p.skills.perception) || 12;
      s.activeRandomEvent = {
        id: "aurora_act_loyalty_test",
        title: "🎭 AÇÃO DA AURORA: Teste Psicológico Disfarçado!",
        desc: "A Aurora apoia o queixo na mão e te olha com inocência ensaiada: 'Sabe, um amigo meu falou que ouviu uns boatos estranhos sobre um cara desse andar que anda mexendo na vida dos vizinhos... Você acha que eu devia denunciar pro síndico ou conversar com ele?'" +
          (perc >= 16 ? " 👁️ [Percepção " + perc + "]: O olhar dela não pisca — NÃO existe amigo nenhum, ela está testando sua reação pra ver se você se entrega!" : ""),
        choices: [
          {
            id: "ltest_call_out_bluff",
            tone: "ctrl",
            label: "👁️ [Leitura Fria] Sorrir e expor na hora que não existe amigo nenhum — que ela está te testando",
            skillHint: "Quebra a armadura dela (-22% Armadura, +18% Influência, -20% Suspeita)"
          },
          {
            id: "ltest_play_along_smooth",
            tone: "ctrl",
            label: "🎭 [Espelhar com Frieza] Manter cara de paisagem e dar um conselho impecável sem cair na armadilha",
            skillHint: "-25% Suspeita, +10 Confiança, +3 Lábia"
          },
          {
            id: "ltest_flip_flirt",
            tone: "hot",
            label: "🔥 [Virar o Clima] Dizer que se ela quer investigar o vizinho do 402, pode fazer isso bem mais de perto",
            skillHint: "+16 Clima, -12% Armadura, +10% Influência"
          }
        ]
      };
    }

    // 4. Contra-Ataque da Aurora quando a Rivalidade está alta (>= 45%): ela vira a mesa com uma pegadinha/desafio!
    if (
      !opts.suppressRandom &&
      AG.isAuroraHere() &&
      a.activity !== "dormindo" &&
      (a.rivalry || 0) >= 45 &&
      !s.activeRandomEvent &&
      !s.activeMinigame &&
      (s.totalActionsTaken - (s.lastRandomEventTurn || 0)) >= 3 &&
      Math.random() < 0.3
    ) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.activeRandomEvent = {
        id: "trap_aurora_retaliation",
        title: "⚔️ Contra-Ataque do 404 (A Aurora Reagiu!)",
        desc: "A Aurora encosta na porta com um sorriso travesso e perigoso, balançando o celular na mão: 'Achou que só o 402 sabia aprontar por aqui? Eu troquei a senha do Wi-Fi compartilhado do andar e escondi sua encomenda aqui comigo. Como o Sr. Espertinho pretende resolver isso?'",
        choices: [
          {
            id: "retal_counter_bluff",
            tone: "ctrl",
            label: "♟️ [Lábia 18+] Sorrir de volta, revelar que você já previu isso e virar o blefe contra ela",
            skillHint: "Requer 🗣️ Lábia >= 18 (+18% Influência, +14 Clima)"
          },
          {
            id: "retal_bold_wager",
            tone: "hot",
            label: "🔥 [Aposta Quente] Aceitar o jogo e propor um 'tudo ou nada': quem perder paga uma prenda hoje",
            skillHint: "+16 Clima, +12% Rivalidade e química elétrica"
          },
          {
            id: "retal_truce_sweet",
            tone: "sweet",
            label: "🤝 Propor uma trégua divertida pagando um café gelado pra ela no 404",
            skillHint: "Reduz a Rivalidade e converte em +16 Afinidade"
          }
        ]
      };
    }

    // 5. Cena de Ciúme Real da Aurora (quando Ciúme >= 50%)
    if (
      !opts.suppressRandom &&
      AG.isAuroraHere() &&
      a.activity !== "dormindo" &&
      (a.jealousy || 0) >= 50 &&
      !s.activeRandomEvent &&
      !s.activeMinigame &&
      (s.totalActionsTaken - (s.lastRandomEventTurn || 0)) >= 3 &&
      Math.random() < 0.38
    ) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.activeRandomEvent = {
        id: "ev_aurora_jealous_confront",
        title: "😤 CENA DA AURORA: Crise de Ciúme & Apego Territorial!",
        desc: "A Aurora para bem na sua frente com um bico enciumado e os olhos brilhando de posse: 'Eu vi você sorrindo pro celular de novo... Vai me falar quem tá tomando a atenção que era pra ser minha ou vai continuar me testando, 402?'",
        choices: [
          { id: "jeal_reassure_kiss", tone: "sweet", label: "💗 Segurar o rosto dela e dizer que ninguém no mundo compete com ela (-Ciúme • +Intimidade • +Afinidade)" },
          { id: "jeal_tease_possessive", tone: "hot", label: "🔥 Sorrir provocando e dizer que adora ver ela com ciúme de você (+18 Clima • +18 Tensão Dela • +Intimidade)" },
          { id: "jeal_cool_deny", tone: "ctrl", label: "🧊 Responder calmo e misterioso sem negar nem confirmar (+14% Influência • -16% Armadura)" }
        ]
      };
    }

    // 6. Confissão Íntima na Chuva / Alta Abertura Emocional (vulnerability >= 40% ou chuva noturna)
    if (
      !opts.suppressRandom &&
      AG.isAuroraHere() &&
      a.activity !== "dormindo" &&
      ((s.weather === "chuva_noturna" && a.affinity >= 20) || (a.vulnerability || 0) >= 42) &&
      !s.flags.seenRainConfession &&
      !s.activeRandomEvent &&
      !s.activeMinigame &&
      (s.totalActionsTaken - (s.lastRandomEventTurn || 0)) >= 3 &&
      Math.random() < 0.32
    ) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.flags.seenRainConfession = true;
      s.activeRandomEvent = {
        id: "ev_aurora_rainy_confession",
        title: "🌧️ MOMENTO ÍNTIMO: A Confissão Sem Armadura da Aurora",
        desc: "O barulho lá fora silencia o corredor. A Aurora abraça os joelhos do seu lado, sem nenhuma pose marrenta, com a voz baixinha: 'Antes de você se mudar pro 402, esse prédio inteiro parecia gelado demais... Eu faço piada com tudo pra ninguém notar, mas ter você por perto mudou meus dias.'",
        choices: [
          { id: "conf_hold_close", tone: "sweet", label: "💞 Puxar ela pro seu abraço e deixar ela descansar a cabeça no seu peito (+22 Intimidade • +22 Abertura • Entregue)" },
          { id: "conf_kiss_forehead", tone: "hot", label: "💋 Dar um beijo demorado na testa e depois na boca bem devagar (+18 Intimidade • +16 Clima • +18 Afinidade)" },
          { id: "conf_probe_secret", tone: "ctrl", label: "👁️ [Psicologia Indireta] Aproveitar a guarda zero dela para descobrir um segredo íntimo (+Segredo no Dossiê)" }
        ]
      };
    }

    // 7. Batida Baixinha na Porta de Madrugada (Só se ela estiver no prédio e acordada!)
    if (
      !opts.suppressRandom &&
      s.currentLocation === "ape_402" &&
      ["ape_404", "corredor_4andar"].includes(AG.getAuroraCurrentLocation()) &&
      a.activity !== "dormindo" &&
      (s.hour >= 22 || s.hour <= 2) &&
      (a.arousal || 0) >= 55 &&
      (a.intimacyLevel || 0) >= 35 &&
      a.discomfort < 30 &&
      !s.activeRandomEvent &&
      !s.activeMinigame &&
      (s.totalActionsTaken - (s.lastRandomEventTurn || 0)) >= 3 &&
      Math.random() < 0.35
    ) {
      s.lastRandomEventTurn = s.totalActionsTaken;
      s.flags.auroraVisitingYourApt = true;
      AG.refreshAuroraActivity();
      s.activeRandomEvent = {
        id: "ev_aurora_late_night_craving",
        title: "🔥 MADRUGADA NO 402: Batida Baixinha na Sua Porta!",
        desc: "Você abre a porta do 402 e dá de cara com a Aurora de camiseta larga de dormir, bochechas coradas e respiração curta: 'Não consegui dormir lá no 404 pensando no jeito que você me olhou mais cedo... Posso entrar?'",
        choices: [
          { id: "crav_pull_inside", tone: "hot", label: "🔥 Puxar ela pela cintura pra dentro e fechar a porta devagar (+20 Intimidade • +20 Clima • Noite Especial)" },
          { id: "crav_cuddle_talk", tone: "sweet", label: "🧸 Abrir os braços e chamar ela pra deitar coladinha em você (+18 Intimidade • +20 Afinidade • +20 Abertura)" },
          { id: "crav_playful_tease", tone: "ctrl", label: "😏 Apoiar no batente sorrindo: 'Só se você admitir em voz alta por que veio' (+16 Tensão Dela • +14 Influência)" }
        ]
      };
    }

    // Evolução natural dos status vivos da Aurora com o passar do tempo
    if (!opts.isSleeping) {
      const hrFactor = minutes / 60;
      const isShiftTime = !AG.isWeekend(s.day) && s.hour >= 12 && s.hour < 17;
      const energyDrain = isShiftTime ? 8 : (s.hour >= 0 && s.hour < 4 ? 7 : 3.5);
      a.auroraEnergy = AG.clamp((a.auroraEnergy !== undefined ? a.auroraEnergy : 76) - Math.round(energyDrain * hrFactor), 5, 100);
      if (a.activity === "dormindo") {
        a.auroraEnergy = AG.clamp(a.auroraEnergy + Math.round(14 * hrFactor), 0, 100);
      }
      // Tensão dela cresce levemente à noite/chuva se já há química, ou esfria aos poucos
      if ((s.hour >= 22 || s.hour <= 2 || s.weather === "chuva_noturna") && (a.heat >= 35 || (a.intimacyLevel || 0) >= 35)) {
        a.arousal = AG.clamp((a.arousal || 10) + Math.round(3.5 * hrFactor), 0, 100);
      } else if ((a.arousal || 0) > 15) {
        a.arousal = AG.clamp(a.arousal - Math.round(2.5 * hrFactor), 0, 100);
      }
    } else {
      a.auroraEnergy = AG.clamp((a.auroraEnergy !== undefined ? a.auroraEnergy : 76) + 55, 0, 100);
    }

    // IA Sombria Bidirecional da Aurora (quando Espiral Sombria >= 40%) & Crises Emocionais Vivas
    if (!opts.suppressRandom && !s.activeRandomEvent && !s.activeMinigame && !s.activeConversationNode && !s.activeDeepScene) {
      if (AG.EmotionEngine && AG.EmotionEngine.tryTriggerDarkAuroraAction) {
        AG.EmotionEngine.tryTriggerDarkAuroraAction();
      }
      if (!s.activeRandomEvent && AG.EmotionEngine && AG.EmotionEngine.tryTriggerEmotionalCrisis) {
        AG.EmotionEngine.tryTriggerEmotionalCrisis();
      }
    }

    // Ponto 067-078: Gatilho de Eventos Aleatórios Interativos com Cooldown (mínimo 4 ações entre eventos)
    if (
      !opts.suppressRandom &&
      !s.activeRandomEvent &&
      !s.activeMinigame &&
      !s.activeConversationNode &&
      !s.activeDeepScene &&
      (s.totalActionsTaken - (s.lastRandomEventTurn || 0)) >= 4 &&
      Math.random() < 0.24
    ) {
      if (AG.tryTriggerInteractiveRandomEvent) {
        AG.tryTriggerInteractiveRandomEvent();
      }
    }

    // Verificação de Pertences Expostos (Se você pegou algo dela e deixou 'carried' em vez de guardar na Gaveta Trancada 'hidden_in_402')
    if (!opts.suppressRandom && AG.isAuroraHere() && a.activity !== "dormindo" && s.belongings) {
      const exposedItem = Object.values(s.belongings).find((b) => b.state === "carried" && b.id !== "spareKey404");
      if (exposedItem && (a.suspicion >= 45 || s.currentLocation === "ape_402") && Math.random() < 0.45) {
        exposedItem.state = "in_404";
        const pills = AG.applyDeltas({ affinity: -24, discomfort: 34, trust: -22, suspicion: -20, mentalStability: -10, mood: "raivosa" });
        AG.addMemory("flagrado_pertence_" + exposedItem.id, `A Aurora viu que você estava com ${exposedItem.name} sem ter guardado na gaveta trancada!`, "ruim", true);
        AG.pushNotification(`🚨 FLAGRA DE PERTENCE: A Aurora viu ${exposedItem.name} exposto com você e tomou de volta revoltada! (Dica: Guarde na Gaveta Trancada do 402 para nunca ser descoberto!)`, pills);
      }
    }

    // Flagra de pistas no celular (a Furtividade alta reduz o risco!)
    const stealthMitigation = ((p.skills && p.skills.stealth) || 10) * 0.5;
    const effectiveTrackRisk = (ph ? ph.tracksRisk : 0) - stealthMitigation;
    if (!opts.suppressRandom && AG.isAuroraHere() && a.activity !== "dormindo" && effectiveTrackRisk >= 50 && Math.random() < 0.35) {
      ph.tracksRisk = 0;
      ph.leverage = 0;
      ph.manipulationCount = 0;
      const pills = AG.applyDeltas({ affinity: -28, discomfort: 38, trust: -25, dominance: 20, suspicion: 25, auroraDarkness: 14, mentalStability: -14, mood: "paranoica_delirante" });
      AG.addMemory("flagrado_pistas_celular", "A Aurora viu as pistas que você esqueceu no celular e descobriu suas armações!", "ruim", true);
      AG.pushNotification("🚨 FLAGRA NO CELULAR: A Aurora bateu o olho na sua tela acesa e descobriu os rastros que você esqueceu de apagar!", pills);
    }

    AG.recalculateDynamic();
    AG.checkHubAndStoryProgression();

    if (!opts.suppressRandom && s.unlocks.hasAuroraNumber && Math.random() < 0.22 && !a.isBlockedOnPhone) {
      if (AG.triggerSpontaneousPhoneMessage) AG.triggerSpontaneousPhoneMessage();
    }

    AG.saveGame("autosave");
  };

  AG.refreshAuroraMoodByContext = function () {
    const s = AG.state;
    const a = s.aurora;
    const h = s.hour;

    if (a.activity === "dormindo") {
      a.mood = "dormindo";
      return;
    }

    // Atualiza Emoção Subjacente (Oculta por baixo da máscara!)
    if ((a.auroraDarkness || 0) >= 50) {
      a.undercurrent = (a.dominance >= 45) ? "obsessiva_controladora" : "vingativa";
    } else if ((a.mentalStability !== undefined ? a.mentalStability : 82) <= 38) {
      a.undercurrent = (a.suspicion >= 45) ? "paranoica_delirante" : "chorosa_vulneravel";
    } else if ((a.jealousy || 0) >= 35) {
      a.undercurrent = "ciumenta";
    } else if ((a.arousal || 10) >= 50) {
      a.undercurrent = "magnetizada";
    } else if (a.affinity >= 35) {
      a.undercurrent = "carente";
    } else if (a.suspicion >= 35) {
      a.undercurrent = "desconfiada";
    } else {
      a.undercurrent = "espontanea";
    }

    if ((a.auroraDarkness || 0) >= 58) {
      const darkPool = ["obsessiva_controladora", "corrompida_fria", "vingativa", "paranoica_delirante"];
      a.mood = darkPool[(s.totalActionsTaken + s.day) % darkPool.length];
      return;
    }
    if ((a.traumaLevel || 0) >= 55 || (a.mentalStability !== undefined && a.mentalStability <= 28)) {
      const brokenPool = ["abalada_traumatizada", "chorosa_vulneravel", "muito_triste", "ansiosa", "paranoica_delirante"];
      a.mood = brokenPool[(s.totalActionsTaken + s.day) % brokenPool.length];
      return;
    }
    if (s.phoneState && s.phoneState.manipulationCount > 0) {
      a.mood = (a.auroraDarkness >= 30) ? "vingativa" : "manipulada";
      return;
    }
    if ((a.jealousy || 0) >= 50) {
      a.mood = (Math.random() < 0.7) ? "ciumenta" : "invejosa";
      return;
    }
    if (a.discomfort >= 60) {
      const angryPool = ["raivosa", "rispida_agressiva", "ignorante_fria", "decepcionada"];
      a.mood = angryPool[(s.totalActionsTaken + s.day) % angryPool.length];
      return;
    }
    if (a.discomfort >= 42) {
      a.mood = (Math.random() < 0.5) ? "irritada" : "desconfortavel";
      return;
    }
    if (a.suspicion >= 60) {
      a.mood = (a.mentalStability <= 55) ? "paranoica_delirante" : "desconfiada";
      return;
    }
    if ((a.arousal || 0) >= 65 && (a.intimacyLevel || 0) >= 35) {
      const hotPool = ["excitada_tensa", "sedutora_ousada", "magnetizada"];
      a.mood = hotPool[(s.totalActionsTaken + s.day) % hotPool.length];
      return;
    }
    if ((a.intimacyLevel || 0) >= 75 && a.affinity >= 55 && a.discomfort < 20) {
      a.mood = (Math.random() < 0.6) ? "entregue" : "muito_feliz";
      return;
    }
    if ((a.auroraEnergy !== undefined ? a.auroraEnergy : 76) <= 28) {
      const tiredPool = (a.affinity >= 25 || (a.intimacyLevel || 0) >= 25)
        ? ["sonolenta_manhosa", "carente", "melancolica"]
        : ["melancolica", "ansiosa", "chateada"];
      a.mood = tiredPool[(s.totalActionsTaken + s.day) % tiredPool.length];
      return;
    }
    if (s.weather === "chuva_noturna" && (a.vulnerability || 0) >= 30) {
      a.mood = (Math.random() < 0.5) ? "melancolica" : "corada_sensivel";
      return;
    }
    if (a.dynamic === "teia_de_controle") {
      a.mood = (Math.random() < 0.65) ? "controladora" : "enjoada_sarcastica";
      return;
    }
    if (a.heat >= 50 || (h >= 0 && h < 4 && a.heat >= 30)) {
      const chemPool = ["provocante", "corada_sensivel", "sedutora_ousada"];
      a.mood = chemPool[(s.totalActionsTaken + s.day) % chemPool.length];
      return;
    }
    if (a.affinity >= 45) {
      const happyPool = ["alegre", "muito_feliz", "dengosa", "euforica", "emocionada"];
      a.mood = happyPool[(s.totalActionsTaken + s.day) % happyPool.length];
      return;
    }
    const neutralPool = ["espontanea", "alegre", "caotica", "entediada", "enjoada_sarcastica", "provocante", "impulsiva_maluca"];
    a.mood = neutralPool[(s.totalActionsTaken + s.day) % neutralPool.length];
  };

  AG.applyDeltas = function (deltas = {}) {
    const s = AG.state;
    const p = s.player;
    const a = s.aurora;
    p.skills = p.skills || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
    p.persona = p.persona || { cold: 0, bold: 0, warm: 0, ruthless: 0 };
    const app = p.activeApproach || "natural";
    const pills = [];

    const bias = a.dailyMoodBias || "";
    const isRainy = s.weather === "chuva_noturna";
    const curMood = a.mood || "espontanea";
    const prevMood = curMood;

    function scaledPositive(raw, mults) {
      if (raw <= 0) return raw;
      let m = 1;
      mults.forEach((f) => { m *= f; });
      m = Math.min(1.35, m);
      return Math.round(raw * m);
    }

    function applyStat(obj, key, delta, min, max, label, unit, clsPos, clsNeg, emitToast = true) {
      if (!delta) return 0;
      const before = typeof obj[key] === "number" ? obj[key] : 0;
      const after = AG.clamp(before + delta, min, max);
      obj[key] = after;
      const actual = after - before;
      if (actual === 0) return 0;
      const cls = actual > 0 ? clsPos : clsNeg;
      const sign = actual > 0 ? "+" : "";
      const txt = `${sign}${actual}${unit} ${label}`;
      pills.push({ label: txt, cls });
      if (emitToast) {
        const kind = cls === "delta-hot" ? "hot" : cls === "delta-ctrl" ? "ctrl" : cls === "delta-neg" ? "neg" : "pos";
        AG.queueToast(txt, kind, actual > 0 ? "up" : "down");
      }
      return actual;
    }

    let indirectIntimacy = 0;

    if (deltas.affinity) {
      const m = [];
      if (bias.includes("Domingo") || isRainy) m.push(1.2);
      if (curMood === "sonolenta_manhosa") m.push(1.2);
      if (app === "protetor") m.push(1.18);
      const val = scaledPositive(deltas.affinity, m);
      const actual = applyStat(a, "affinity", val, -100, 100, "Afinidade", "", "delta-pos", "delta-neg");
      if (actual >= 8 && !deltas.intimacyLevel) indirectIntimacy = Math.max(indirectIntimacy, Math.min(3, Math.round(actual * 0.2)));
    }
    if (deltas.trust) {
      const m = [];
      if (curMood === "melancolica") m.push(1.25);
      if (app === "protetor") m.push(1.18);
      applyStat(a, "trust", scaledPositive(deltas.trust, m), 0, 100, "Confiança", "%", "delta-pos", "delta-neg");
    }
    if (deltas.heat) {
      const m = [];
      if (bias.includes("Sexta") || isRainy) m.push(1.2);
      if (curMood === "corada_sensivel" || curMood === "excitada_tensa") m.push(1.2);
      if (app === "provocador") m.push(1.18);
      const actual = applyStat(a, "heat", scaledPositive(deltas.heat, m), 0, 100, "Clima", "", "delta-hot", "delta-neg");
      if (actual >= 8 && !deltas.arousal) {
        a.arousal = AG.clamp((a.arousal || 10) + Math.min(6, Math.round(actual * 0.35)), 0, 100);
      }
      if (actual >= 10 && !deltas.intimacyLevel && a.discomfort < 35) {
        indirectIntimacy = Math.max(indirectIntimacy, Math.min(3, Math.round(actual * 0.18)));
      }
    }
    if (indirectIntimacy > 0 && !deltas.intimacyLevel) {
      a.intimacyLevel = AG.clamp((a.intimacyLevel || 0) + indirectIntimacy, 0, 100);
    }

    if (deltas.dominance) {
      applyStat(a, "dominance", deltas.dominance, 0, 100, "Controle Dela", "", "delta-ctrl", "delta-pos");
    }
    if (deltas.discomfort) {
      let disVal = deltas.discomfort;
      if (disVal < 0 && app === "protetor") disVal = Math.round(disVal * 1.2);
      if (disVal > 0 && app === "implacavel") disVal = Math.round(disVal * 1.15);
      applyStat(a, "discomfort", disVal, 0, 100, "Atrito", "", "delta-neg", "delta-pos");
    }
    if (deltas.suspicion) {
      let susVal = deltas.suspicion;
      if (susVal > 0 && app === "calculista") susVal = Math.max(0, Math.round(susVal * 0.75));
      applyStat(a, "suspicion", susVal, 0, 100, "Suspeita", "%", "delta-neg", "delta-pos");
    }
    if (deltas.influence) {
      const m = [];
      if (app === "calculista" || app === "implacavel") m.push(1.2);
      if (a.composure !== undefined && a.composure <= 35) m.push(1.2);
      applyStat(a, "influence", scaledPositive(deltas.influence, m), 0, 100, "Influência", "%", "delta-ctrl", "delta-neg");
    }
    if (deltas.rivalry) {
      const m = [];
      if (app === "provocador" || curMood === "ciumenta") m.push(1.2);
      applyStat(a, "rivalry", scaledPositive(deltas.rivalry, m), 0, 100, "Rivalidade", "%", "delta-hot", "delta-pos");
    }
    if (deltas.composure) {
      let compVal = deltas.composure;
      if (compVal < 0 && app === "calculista") compVal = Math.round(compVal * 1.2);
      if (a.composure === undefined) a.composure = 75;
      applyStat(a, "composure", compVal, 0, 100, "Armadura", "%", "delta-pos", "delta-ctrl");
    }
    if (deltas.leveragePressure) {
      let presVal = deltas.leveragePressure;
      if (presVal > 0 && app === "implacavel") presVal = Math.round(presVal * 1.2);
      applyStat(a, "leveragePressure", presVal, 0, 100, "Pressão", "%", "delta-ctrl", "delta-pos");
    }
    if (deltas.auroraEnergy) {
      if (a.auroraEnergy === undefined) a.auroraEnergy = 76;
      applyStat(a, "auroraEnergy", deltas.auroraEnergy, 0, 100, "Disposição Dela", "%", "delta-pos", "delta-neg", false);
    }
    if (deltas.intimacyLevel) {
      const m = (curMood === "corada_sensivel" || curMood === "entregue") ? [1.2] : [];
      applyStat(a, "intimacyLevel", scaledPositive(deltas.intimacyLevel, m), 0, 100, "Intimidade", "%", "delta-pos", "delta-neg");
    }
    if (deltas.arousal) {
      const m = curMood === "excitada_tensa" ? [1.2] : [];
      if (a.arousal === undefined) a.arousal = 10;
      applyStat(a, "arousal", scaledPositive(deltas.arousal, m), 0, 100, "Tensão Dela", "%", "delta-hot", "delta-pos", false);
    }
    if (deltas.jealousy) {
      applyStat(a, "jealousy", deltas.jealousy, 0, 100, "Ciúme", "%", "delta-hot", "delta-pos");
    }
    if (deltas.vulnerability) {
      const m = curMood === "melancolica" ? [1.25] : [];
      if (a.vulnerability === undefined) a.vulnerability = 15;
      applyStat(a, "vulnerability", scaledPositive(deltas.vulnerability, m), 0, 100, "Abertura", "%", "delta-pos", "delta-neg", false);
    }
    if (deltas.mentalStability) {
      if (a.mentalStability === undefined) a.mentalStability = 82;
      applyStat(a, "mentalStability", deltas.mentalStability, 0, 100, "Estabilidade", "%", "delta-pos", "delta-neg");
    }
    if (deltas.auroraDarkness) {
      if (a.auroraDarkness === undefined) a.auroraDarkness = 5;
      applyStat(a, "auroraDarkness", deltas.auroraDarkness, 0, 100, "Espiral Sombria", "%", "delta-ctrl", "delta-pos");
    }
    if (deltas.traumaLevel) {
      applyStat(a, "traumaLevel", deltas.traumaLevel, 0, 100, "Ferida", "%", "delta-neg", "delta-pos", false);
    }

    if (deltas.undercurrent && MOOD_DEFS[deltas.undercurrent]) a.undercurrent = deltas.undercurrent;
    if (deltas.personaCold) p.persona.cold = AG.clamp((p.persona.cold || 0) + deltas.personaCold, 0, 100);
    if (deltas.personaBold) p.persona.bold = AG.clamp((p.persona.bold || 0) + deltas.personaBold, 0, 100);
    if (deltas.personaWarm) p.persona.warm = AG.clamp((p.persona.warm || 0) + deltas.personaWarm, 0, 100);
    if (deltas.personaRuthless) p.persona.ruthless = AG.clamp((p.persona.ruthless || 0) + deltas.personaRuthless, 0, 100);
    if (deltas.mood && MOOD_DEFS[deltas.mood]) {
      a.mood = deltas.mood;
      if (a.mood !== prevMood) {
        AG.queueToast(`Humor: ${stripEmojiBasic(MOOD_DEFS[a.mood].label)}`, "info", "info");
      }
    }
    if (deltas.specialScene) a.activeSpecialSceneKey = deltas.specialScene;

    // Player stats (valores reais)
    if (deltas.energy) applyStat(p, "energy", deltas.energy, 0, 100, "Energia", "", "delta-pos", "delta-neg");
    if (deltas.satiety) applyStat(p, "satiety", deltas.satiety, 0, 100, "Saciedade", "", "delta-pos", "delta-neg");
    if (deltas.calm) applyStat(p, "calm", deltas.calm, 0, 100, "Calma", "", "delta-pos", "delta-neg");
    if (deltas.desire) applyStat(p, "desire", deltas.desire, 0, 100, "Tensão", "", "delta-hot", "delta-pos");
    if (deltas.money) {
      const beforeM = p.money || 0;
      const afterM = Math.max(0, Math.round(beforeM + deltas.money));
      p.money = afterM;
      const actualM = afterM - beforeM;
      if (actualM !== 0) {
        const cls = actualM > 0 ? "delta-pos" : "delta-neg";
        const txt = `${actualM > 0 ? "+R$ " : "-R$ "}${Math.abs(actualM)}`;
        pills.push({ label: txt, cls });
        AG.queueToast(txt, actualM > 0 ? "pos" : "neg", actualM > 0 ? "up" : "down");
      }
    }

    // Player evolutionary skills
    if (deltas.charisma) applyStat(p.skills, "charisma", deltas.charisma, 0, 100, "Lábia", "", "delta-ctrl", "delta-neg");
    if (deltas.stealth) applyStat(p.skills, "stealth", deltas.stealth, 0, 100, "Furtividade", "", "delta-ctrl", "delta-neg");
    if (deltas.tech) applyStat(p.skills, "tech", deltas.tech, 0, 100, "Código", "", "delta-pos", "delta-neg");
    if (deltas.perception) applyStat(p.skills, "perception", deltas.perception, 0, 100, "Percepção", "", "delta-pos", "delta-neg");

    AG.recalculateDynamic();
    return pills;
  };

  AG.pushFeed = function (entry) {
    const finalEntry = (AG.DeepDialogue && AG.DeepDialogue.enrichRawAuroraFeed)
      ? AG.DeepDialogue.enrichRawAuroraFeed(entry)
      : entry;
    AG.state.sceneFeed.push(finalEntry);
    if (AG.state.sceneFeed.length > 2) AG.state.sceneFeed = AG.state.sceneFeed.slice(-2);
    if (finalEntry.speech) {
      AG.recordHistory(finalEntry.speech, {
        speaker: "Aurora",
        playerBeat: finalEntry.playerBeat || "",
        action: finalEntry.action || "",
        kind: "aurora"
      });
    } else if (finalEntry.text) {
      AG.recordHistory(finalEntry.text, { speaker: "", kind: "narrative" });
    }
    if (AG.Audio && AG.state.mode === "simulator") {
      if (typeof AG.Audio.speakDialogueEntry === "function") {
        AG.Audio.speakDialogueEntry(finalEntry);
      } else if (finalEntry.speech && AG.Audio.speakAurora && AG.state.aurora && AG.state.aurora.activity !== "dormindo") {
        AG.Audio.speakAurora(finalEntry.speech);
      }
    }
  };

  AG.clearFeed = function () {
    AG.state.sceneFeed = [];
  };

  AG.saveGame = function (slot = "autosave") {
    try {
      const copy = JSON.parse(JSON.stringify(AG.state));
      copy.savedAt = new Date().toLocaleString("pt-BR");
      localStorage.setItem(`mfws_save_${slot}`, JSON.stringify(copy));
      return true;
    } catch (e) {
      return false;
    }
  };

  AG.getSaveInfo = function (slot) {
    try {
      const raw = localStorage.getItem(`mfws_save_${slot}`);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return {
        slot,
        day: data.day || 1,
        time: `${String(data.hour || 0).padStart(2, "0")}:${String(data.minute || 0).padStart(2, "0")}`,
        dynamic: (AG.DYNAMIC_DEFS[(data.aurora && data.aurora.dynamic) || "desconhecidos"] || {}).title,
        savedAt: data.savedAt || "Recente"
      };
    } catch (e) {
      return null;
    }
  };

  AG.loadGame = function (slot = "autosave") {
    try {
      const raw = localStorage.getItem(`mfws_save_${slot}`);
      if (!raw) return false;
      const loaded = JSON.parse(raw);
      const globalEnds = AG.state.unlockedEndings || [];
      const base = createInitialState();

      AG.state = Object.assign({}, base, loaded);
      AG.state.player = Object.assign({}, base.player, loaded.player || {});
      AG.state.player.skills = Object.assign({}, base.player.skills, (loaded.player && loaded.player.skills) || {});
      AG.state.player.persona = Object.assign({}, base.player.persona, (loaded.player && loaded.player.persona) || {});
      AG.state.aurora = Object.assign({}, base.aurora, loaded.aurora || {});
      AG.state.unlocks = Object.assign({}, base.unlocks, loaded.unlocks || {});
      const loadedPhone = (loaded.phoneState && typeof loaded.phoneState === "object") ? loaded.phoneState : {};
      AG.state.phoneState = Object.assign({}, base.phoneState, loadedPhone, {
        unlockedPhotos: Array.isArray(loadedPhone.unlockedPhotos) ? loadedPhone.unlockedPhotos : [],
        favoritePhotos: Array.isArray(loadedPhone.favoritePhotos) ? loadedPhone.favoritePhotos : [],
        likedPosts: Object.assign({}, loadedPhone.likedPosts || {}),
        commentedPosts: Object.assign({}, loadedPhone.commentedPosts || {}),
        completedQuickGigs: Object.assign({}, loadedPhone.completedQuickGigs || {})
      });
      AG.state.sharedStory = Object.assign({}, base.sharedStory, loaded.sharedStory || {});
      AG.state.settings = Object.assign({}, base.settings, loaded.settings || {});
      AG.state.belongings = Object.assign({}, base.belongings, loaded.belongings || {});
      AG.state.secretsDossier = Object.assign({}, base.secretsDossier, loaded.secretsDossier || {});
      AG.state.flags = Object.assign({}, base.flags, loaded.flags || {});
      const loadedIntimacy = (loaded.intimacy && typeof loaded.intimacy === "object") ? loaded.intimacy : {};
      AG.state.intimacy = Object.assign({}, base.intimacy, loadedIntimacy, {
        discovered: Object.assign({}, base.intimacy.discovered, loadedIntimacy.discovered || {}),
        log: Array.isArray(loadedIntimacy.log) ? loadedIntimacy.log : []
      });
      AG.state.pendingDelayedEffects = Array.isArray(loaded.pendingDelayedEffects) ? loaded.pendingDelayedEffects : [];
      AG.state.eventNotifications = Array.isArray(loaded.eventNotifications) ? loaded.eventNotifications : [];
      AG.state.dialogueHistory = Array.isArray(loaded.dialogueHistory) ? loaded.dialogueHistory : [];
      AG.state.sceneFeed = Array.isArray(loaded.sceneFeed) ? loaded.sceneFeed : [];
      AG.state.memories = Array.isArray(loaded.memories) ? loaded.memories : [];
      AG.state.inventory = Array.isArray(loaded.inventory) ? loaded.inventory : [];
      AG.state.phoneChat = Array.isArray(loaded.phoneChat) && loaded.phoneChat.length ? loaded.phoneChat : base.phoneChat;
      AG.state.unlockedLocations = Array.isArray(loaded.unlockedLocations) && loaded.unlockedLocations.length ? loaded.unlockedLocations : base.unlockedLocations;
      AG.state.seenDialogueVariants = Object.assign({}, loaded.seenDialogueVariants || {});
      if (AG.state.activeDeepScene && !AG.state.activeDeepScene.gateId) {
        AG.state.activeDeepScene = null;
      }
      if (AG.state.activeConversationNode && !AG.state.activeConversationNode.topicId) {
        AG.state.activeConversationNode = null;
      }
      if (AG.state.activeIntimateScene && (typeof AG.state.activeIntimateScene.stage !== "number" || AG.state.activeIntimateScene.stage < 0 || AG.state.activeIntimateScene.stage > 4)) {
        AG.state.activeIntimateScene = null;
      }
      if (AG.state.activeRandomEvent && (!AG.state.activeRandomEvent.id || !Array.isArray(AG.state.activeRandomEvent.choices))) {
        AG.state.activeRandomEvent = null;
      }

      if (AG.state.mode === "title_menu") AG.state.mode = "simulator";
      AG.state.unlockedEndings = Array.from(new Set([...globalEnds, ...(loaded.unlockedEndings || [])]));
      AG.applyVisualSettings();
      AG.refreshAuroraActivity();
      AG.recalculateDynamic();
      return true;
    } catch (e) {
      return false;
    }
  };

  AG.importSaveData = function (rawJson, slot = "autosave") {
    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return { ok: false, error: "Arquivo JSON inválido para save." };
      }
      if (!parsed.aurora || typeof parsed.aurora !== "object" || !parsed.player || typeof parsed.player !== "object") {
        return { ok: false, error: "Este arquivo não contém dados válidos de Aurora/Jogador." };
      }
      localStorage.setItem(`mfws_save_${slot}`, JSON.stringify(parsed));
      const loadedOk = AG.loadGame(slot);
      if (!loadedOk) return { ok: false, error: "Não foi possível restaurar o estado salvo." };
      return { ok: true, day: AG.state.day, time: AG.getFormattedClock() };
    } catch (e) {
      return { ok: false, error: "Falha ao ler JSON: verifique se o arquivo está completo." };
    }
  };

  AG.resetNewGame = function (goToPrologue = true) {
    const globalEnds = AG.state.unlockedEndings || [];
    const customAvatars = (AG.state.aurora && AG.state.aurora.customAvatars) || {};
    const curSettings = Object.assign({}, AG.state.settings || {});
    AG.state = createInitialState();
    AG.state.settings = Object.assign(AG.state.settings, curSettings);
    AG.state.mode = goToPrologue ? "narration" : "title_menu";
    AG.state.unlockedEndings = globalEnds;
    AG.state.aurora.customAvatars = customAvatars;
    AG.applyVisualSettings();
  };

  AG.hardResetAllData = function () {
    try {
      ["autosave", "slot1", "slot2", "slot3"].forEach((s) => localStorage.removeItem(`mfws_save_${s}`));
      localStorage.removeItem("mfws_global_endings");
    } catch (e) {}
    AG.state = createInitialState();
    AG.state.mode = "title_menu";
    AG.applyVisualSettings();
  };

  AG.unlockEnding = function (endingId) {
    if (!AG.state.unlockedEndings.includes(endingId)) {
      AG.state.unlockedEndings.push(endingId);
      try {
        localStorage.setItem("mfws_global_endings", JSON.stringify(AG.state.unlockedEndings));
      } catch (e) {}
    }
    AG.state.mode = "ending";
    AG.state.currentEndingId = endingId;
  };
})(window.AuroraGame);
