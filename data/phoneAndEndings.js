/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Super Smartphone Multi-App v8 (Chat Graduado & Coerente, Ligações/Vídeo,
   SakuraGram Feed, Radar & Rotina, FreelaPay & Pix, Delivery 24h, Galeria,
   Dossiê & Segurança/VPN) & Catálogo dos 16 Finais
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  function pickMsg(arr) {
    if (!arr || !arr.length) return "";
    const s = AG.state || { totalActionsTaken: 0, day: 1 };
    return arr[(s.totalActionsTaken + s.day + (s.phoneChat ? s.phoneChat.length : 0)) % arr.length];
  }

  function addPhotoUnique(fileName) {
    const ph = AG.state && AG.state.phoneState;
    if (!ph) return;
    ph.unlockedPhotos = ph.unlockedPhotos || [];
    if (!ph.unlockedPhotos.includes(fileName)) ph.unlockedPhotos.push(fileName);
  }

  function addTracksRisk(amount) {
    const s = AG.state;
    const ph = s.phoneState;
    const vpnActive = ph.vpnDay === s.day;
    const actual = vpnActive ? Math.max(4, Math.round(amount * 0.5)) : amount;
    ph.tracksRisk = AG.clamp((ph.tracksRisk || 0) + actual, 0, 100);
    return actual;
  }

  AG.GALLERY_CATALOG = [
    { file: "Aurora PNG 2.png", label: "Selfie Fofa do 404", tier: "Casual", hint: "Peça uma selfie leve no Chat ou interaja com o SakuraGram." },
    { file: "Aurora de uniforme PNG 4.png", label: "Uniforme do Café Sakura", tier: "Casual", hint: "Peça selfie durante o turno ou visite o Café Sakura." },
    { file: "Aurora Corada PNG.png", label: "Aurora Corada em Vídeo", tier: "Carinho", hint: "Faça uma Chamada de Vídeo ou elogie de perto." },
    { file: "Aurora Moletom Madrugada PNG.png", label: "Moletom de Madrugada", tier: "Carinho", hint: "Peça selfie de madrugada ou faça ligação à noite." },
    { file: "Aurora Provocando PNG.png", label: "Olhar Provocante", tier: "Química", hint: "Peça foto provocante no Chat ou descubra a conta alt." },
    { file: "Cena Celular Foto Secreta PNG.png", label: "Foto Secreta do Celular", tier: "Química", hint: "Peça foto provocante com Intimidade 28%+ ou Clima 34%+." },
    { file: "Cena Chamego Colo PNG.png", label: "Chamego no Colo", tier: "Romance", hint: "Sessão de fotos na Praça ou momentos de carinho." },
    { file: "Cena Quarto 404 Noite PNG.png", label: "Meia-Luz no 404", tier: "Química", hint: "Chamada de vídeo de madrugada ou noite no 404." },
    { file: "Cena Parede Corredor PNG.png", label: "Tensão no Corredor", tier: "Química", hint: "Desafios quentes ou provocações no corredor." },
    { file: "Cena Uniforme Provocante PNG.png", label: "Bastidores do Uniforme", tier: "Química", hint: "Peça foto 18+ ou provoque no turno do Café Sakura." },
    { file: "Cena Especial NSFW 1 PNG.png", label: "Foto Exclusiva 18+ · I", tier: "18+", hint: "Peça foto 18+ no Chat (Intimidade 46%+ ou Clima 48%+)." },
    { file: "Cena Especial NSFW 2 PNG.png", label: "Foto Exclusiva 18+ · II", tier: "18+", hint: "Segunda foto 18+ no Chat ou noite íntima no 404." },
    { file: "Cena Especial NSFW 3 Uniforme PNG.png", label: "Foto 18+ · Uniforme", tier: "18+", hint: "Foto 18+ enquanto ela usa o uniforme do Café Sakura." },
    { file: "Cena Especial NSFW 4 Controle PNG.png", label: "Foto 18+ · No Comando", tier: "18+", hint: "Foto 18+ com alta química / dinâmica de comando." }
  ];

  // ==========================================================================
  // FEED SOCIAL VIVO DA AURORA ("SAKURAGRAM")
  // ==========================================================================
  AG.getAuroraFeedPosts = function () {
    const s = AG.state;
    const a = s.aurora || {};
    const ph = s.phoneState || {};
    const liked = ph.likedPosts || {};
    const commented = ph.commentedPosts || {};
    const posts = [];

    posts.push({
      id: "post_cafe_arte",
      handle: "@aurora.404",
      time: "Hoje · Café Sakura",
      photo: "Aurora de uniforme PNG 4.png",
      caption: "Mais um café gelado de baunilha que ficou bonito demais pra entregar pro cliente. Alguém do 4º andar devia aparecer pra provar.",
      likes: 28 + (liked.post_cafe_arte ? 1 : 0),
      liked: !!liked.post_cafe_arte,
      commented: !!commented.post_cafe_arte,
      replySweet: "Sabia que você ia comentar primeiro! Quando passar por lá eu faço um caprichado só pra você.",
      replyHot: "Olha a ousadia nos comentários públicos, 402... depois eu te cobro isso pessoalmente."
    });

    posts.push({
      id: "post_madrugada_tablet",
      handle: "@aurora.404",
      time: s.hour >= 22 || s.hour <= 4 ? "Agora · Apê 404" : "Ontem à noite · Apê 404",
      photo: "Aurora Moletom Madrugada PNG.png",
      caption: "Três da manhã, moletom três tamanhos maior que meu 1,49m e o tablet cheio de rascunhos que ninguém pode ver ainda.",
      likes: 41 + (liked.post_madrugada_tablet ? 1 : 0),
      liked: !!liked.post_madrugada_tablet,
      commented: !!commented.post_madrugada_tablet,
      replySweet: "Você sempre repara nas minhas madrugadas... aparece no 404 pra tomar café comigo qualquer hora.",
      replyHot: "Se você continuar elogiando esse moletom, vou acabar batendo na porta do 402 usando só ele."
    });

    if (s.weather === "chuva_noturna" || (a.vulnerability || 0) >= 25) {
      posts.push({
        id: "post_chuva_janela",
        handle: "@aurora.404",
        time: "Hoje · Janela do 404",
        photo: "Aurora Corada PNG.png",
        caption: "Chuva batendo na janela deixa o quarto andar silencioso demais... sorte que agora tem boa companhia na porta ao lado.",
        likes: 53 + (liked.post_chuva_janela ? 1 : 0),
        liked: !!liked.post_chuva_janela,
        commented: !!commented.post_chuva_janela,
        replySweet: "Era indireta direta pro 402 mesmo — obrigada por sempre estar por perto.",
        replyHot: "Chuva + porta trancada + você comentando assim... tá pedindo pra eu atravessar o corredor agora."
      });
    }

    if ((a.intimacyLevel || 0) >= 20 || a.affinity >= 28 || a.heat >= 28) {
      posts.push({
        id: "post_indireta_402",
        handle: "@aurora.404",
        time: "Recente · 4º Andar",
        photo: "Aurora Provocando PNG.png",
        caption: "Curioso como a pessoa que antes eu queria expulsar do corredor virou o motivo de metade dos meus sorrisos bobos.",
        likes: 64 + (liked.post_indireta_402 ? 1 : 0),
        liked: !!liked.post_indireta_402,
        commented: !!commented.post_indireta_402,
        replySweet: "E nem vou fingir que não era sobre você — meu vizinho favorito do prédio inteiro.",
        replyHot: "Se a carapuça serviu no 402, vem cá cobrar o resto ao vivo."
      });
    }

    if ((a.intimacyLevel || 0) >= 42 || a.heat >= 45 || (s.intimacy && s.intimacy.sessions >= 1)) {
      posts.push({
        id: "post_meia_luz_privado",
        handle: "@aurora.404 · Amigos Próximos",
        time: "Só pra você · Apê 404",
        photo: "Cena Quarto 404 Noite PNG.png",
        caption: "Postei só na lista de 1 pessoa porque tem alguém do outro lado da parede que sabe exatamente o efeito que faz em mim.",
        likes: 1 + (liked.post_meia_luz_privado ? 1 : 0),
        liked: !!liked.post_meia_luz_privado,
        commented: !!commented.post_meia_luz_privado,
        replySweet: "A lista de Amigos Próximos literalmente só tem o seu nome, bobo. Vem pro 404.",
        replyHot: "Adorei que você abriu em dois segundos... a porta do 404 tá destrancada pra você."
      });
    }

    return posts;
  };

  // ==========================================================================
  // RADAR & AGENDA DA AURORA (TRANSPARÊNCIA TOTAL DE HORÁRIOS E METAS!)
  // ==========================================================================
  AG.getAuroraScheduleInfo = function () {
    const s = AG.state;
    const curLocId = AG.getAuroraCurrentLocation ? AG.getAuroraCurrentLocation() : "ape_404";
    const curLoc = (AG.LOCATIONS && AG.LOCATIONS[curLocId]) || { shortName: "Apê 404" };
    const isWknd = AG.isWeekend ? AG.isWeekend(s.day) : false;
    return {
      currentLocationId: curLocId,
      currentLocationName: curLoc.shortName,
      isWeekend: isWknd,
      sleeping: s.aurora && s.aurora.activity === "dormindo",
      inShift: !isWknd && s.hour >= 12 && s.hour < 17,
      schedule: isWknd
        ? [
            { hours: "03h – 09h", place: "Apê 404 (Dormindo)" },
            { hours: "09h – 14h", place: "Apê 404 (Folga em casa)" },
            { hours: "14h – 17h", place: "Praça das Cerejeiras (Passeio de folga)" },
            { hours: "17h – 19h", place: s.day % 2 === 0 ? "Praça das Cerejeiras" : "Corredor 4º Andar" },
            { hours: "19h – 22h", place: "Apê 404" },
            { hours: "22h – 00h", place: "Corredor 4º Andar" },
            { hours: "00h – 02h", place: "Mercadinho 24h" }
          ]
        : [
            { hours: "03h – 09h", place: "Apê 404 (Dormindo)" },
            { hours: "09h – 12h", place: "Apê 404 (Projetos de arte)" },
            { hours: "12h – 17h", place: "Café Sakura (Turno de uniforme)" },
            { hours: "17h – 19h", place: s.day % 2 === 0 ? "Praça das Cerejeiras" : "Corredor 4º Andar" },
            { hours: "19h – 22h", place: "Apê 404" },
            { hours: "22h – 00h", place: "Corredor 4º Andar" },
            { hours: "00h – 02h", place: "Mercadinho 24h" }
          ],
      milestones: AG.Gates ? AG.Gates.getMilestoneChecklist() : []
    };
  };

  AG.getAuroraLiveStatus = function () {
    const s = AG.state;
    const a = s.aurora;
    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const loc = AG.getAuroraCurrentLocation ? AG.getAuroraCurrentLocation() : "ape_404";

    if (a.activity === "dormindo") {
      return { presence: "Ausente · dormindo", note: "modo avião até amanhã (ou quase)" };
    }
    if (loc === "cafe_sakura") {
      return { presence: "No turno · Café Sakura", note: "fazendo expresso e contando os minutos pra sair" };
    }
    if (fam === "sombria") {
      return { presence: "Online agora", note: "quem acha que tá jogando sozinho ainda não viu nada." };
    }
    if (fam === "vulneravel") {
      return { presence: "Online · quieta", note: s.weather === "chuva_noturna" ? "ouvindo a chuva bater no vidro sem vontade de nada" : "cabeça cheia hoje, queria sumir um pouco" };
    }
    if (fam === "conflito") {
      return { presence: "Online", note: (a.jealousy || 0) >= 40 ? "engraçado como tem gente que testa minha paciência de propósito" : "paciência oficialmente zerada hoje." };
    }
    if (fam === "quimica" || a.heat >= 50) {
      return { presence: "Online agora", note: s.hour >= 22 || s.hour <= 3 ? "insônia perigosa no 404 e pensando em quem não devia" : "dia quente demais pra ficar longe de provocação" };
    }
    if (s.weather === "chuva_noturna") {
      return { presence: "Online · Apê 404", note: "chuva lá fora, moletom gigante e café quase acabando" };
    }
    if (s.weather === "apagao_andar") {
      return { presence: "Online · 4º andar", note: "meia-luz no corredor de novo, obrigada síndico" };
    }
    if (fam === "caotica") {
      return { presence: "Online agora", note: "40 abas abertas na cabeça e zero juízo hoje" };
    }
    if (a.affinity >= 50 || (a.intimacyLevel || 0) >= 45) {
      return { presence: "Online agora", note: "o quarto andar ficou bem melhor depois que o 402 ganhou morador" };
    }
    return { presence: "Online · Apê 404", note: "desenhando, ouvindo música e fingindo que vou dormir cedo" };
  };

  AG.triggerSpontaneousPhoneMessage = function () {
    const s = AG.state;
    const a = s.aurora;
    if (a.isBlockedOnPhone || !s.sharedStory.metInCorridor || a.activity === "dormindo") return;

    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const timeStr = AG.getFormattedClock();
    let msg = "";

    if (a.dynamic === "relacao_manipulada" || (a.leveragePressure || 0) >= 35) {
      msg = pickMsg([
        "Já fiz o que você queria... só não espera que eu finja que tá tudo normal entre nós.",
        "Fico olhando pro celular esperando qual vai ser a sua próxima cobrança."
      ]);
    } else if (fam === "sombria" || (a.auroraDarkness || 0) >= 45) {
      msg = pickMsg([
        "Tava aqui pensando no nosso último papo... você não faz ideia do quanto eu aprendi com você.",
        "Não some não, 402. Eu gosto de saber exatamente onde você tá."
      ]);
    } else if (fam === "vulneravel") {
      msg = pickMsg([
        "ei... você tá acordado? bateu um peso chato aqui no 404 hoje.",
        "desculpa mandar do nada, só queria ouvir alguma coisa leve de você agora."
      ]);
    } else if (fam === "conflito" || a.discomfort >= 45) {
      msg = (a.jealousy || 0) >= 40
        ? "tá muito ocupado com seus contatinhos hoje ou ainda lembra que eu moro na porta ao lado?"
        : "ainda tô chateada com você, só pra deixar claro.";
    } else if (s.weather === "chuva_noturna") {
      msg = pickMsg([
        "olha essa chuva lá fora... tá com cara de ficar no 404 sem fazer nada.",
        "trovão acabou de tremer minha janela aqui, passa cá se não tiver dormindo."
      ]);
    } else if (a.dynamic === "teia_de_controle") {
      msg = "Não lembro de ter te dado folga hoje. Aparece aqui no 404 quando eu chamar.";
    } else if (fam === "quimica" || a.heat >= 48) {
      msg = pickMsg([
        "difícil focar aqui no 404 lembrando do jeito que você me olhou de cima mais cedo...",
        "tô usando aquele moletom que você fica encarando. só comentando mesmo."
      ]);
    } else if (a.affinity >= 48 || (a.intimacyLevel || 0) >= 45) {
      msg = pickMsg([
        "oi, deu saudade de você aqui do outro lado da parede.",
        "tava passando café e lembrei de você. aparece quando puder."
      ]);
    } else {
      msg = pickMsg([
        "ei 402, passa aqui no corredor ou no café quando puder",
        "sobreviveu aos boletos hoje ou fugiu do quarto andar?"
      ]);
    }

    AG.playSound("msg");
    s.phoneChat.push({ sender: "aurora", text: msg, time: timeStr });
    a.unreadPhoneMessages = (a.unreadPhoneMessages || 0) + 1;
  };

  // ==========================================================================
  // AÇÕES DO SUPER SMARTPHONE (100% COERENTES COM AG.Gates & PRESENÇA)
  // ==========================================================================
  const INTIMATE_CHAT_QUESTIONS = [
    {
      q: "Pergunta sem filtro: qual foi a primeira coisa em mim que realmente chamou sua atenção?",
      a: "Sem mentir? Primeiro o contraste absurdo de altura no corredor... mas o que me fisgou de verdade foi você não tentar me tratar igual criança só porque tenho 1,49m. Ganhou meu respeito na primeira noite."
    },
    {
      q: "Se a gente pudesse sumir do prédio por um fim de semana inteiro agora, pra onde você me levava?",
      a: "Pra algum lugar com chuva fina, café bom o dia inteiro e nenhuma entrega pendente no computador. Só a gente rindo no sofá sem olhar relógio."
    },
    {
      q: "Confessa: você prefere quando eu chego devagar com carinho ou quando tomo iniciativa sem avisar?",
      a: "Olha a pergunta perigosa... Depende do meu humor! Quando tô cansada eu derreto com calma, mas quando o clima esquenta no quarto andar eu adoro quando você me surpreende."
    },
    {
      q: "Qual é a coisa que você mais gosta quando a gente fica a sós no 404 ou no 402?",
      a: "O jeito que a minha cabeça para de fazer barulho quando você me puxa pra perto. E também... o quanto o seu cheiro fica no meu moletom depois que você vai embora."
    },
    {
      q: "Você ainda tem alguma coisa que nunca teve coragem de me pedir cara a cara?",
      a: "Tenho sim... mas se eu contar tudo pelo chat estraga a surpresa! Chega perto de mim pessoalmente e pergunta olhando nos meus olhos que eu falo."
    },
    {
      q: "O que te deixa mais arrepio: minha voz baixinha no seu ouvido ou eu te segurando pela cintura?",
      a: "COVARDIA essa pergunta no meio do chat!! Os dois ao mesmo tempo deviam ser proibidos porque eu perco completamente a fala!"
    }
  ];

  AG.runPhoneAction = function (actionId) {
    const s = AG.state;
    const p = s.player;
    const a = s.aurora;
    const ph = s.phoneState;
    const sk = p.skills || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
    const timeStr = AG.getFormattedClock();
    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const auroraSleeping = a.activity === "dormindo";
    const auroraInShift = !AG.isWeekend(s.day) && s.hour >= 12 && s.hour < 17;

    AG.playSound("click");

    const bringAuroraTo402 = (arrivalSpeech) => {
      s.flags.auroraVisitingYourApt = true;
      s.flags.auroraCalledToCorridor = false;
      s.flags.auroraIn404WithPlayer = false;
      if (s.currentLocation === "ape_402") {
        s.activeConversationNode = null;
        s.activeTab = "situacao";
        AG.refreshAuroraActivity();
        if (arrivalSpeech) {
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*Minutos depois você ouve duas batidinhas leves na porta do 402 — Aurora entra fechando a porta atrás de si com um sorriso só pra você*",
            speech: arrivalSpeech
          });
        }
      } else {
        AG.refreshAuroraActivity();
      }
    };

    // ------------------------------------------------------------------------
    // 1. APP MENSAGENS & LIGAÇÕES (GRADUADO E SEM ARMADILHAS INJUSTAS!)
    // ------------------------------------------------------------------------
    if (actionId === "msg_fofa") {
      AG.advanceTime(5, { suppressRandom: true });
      s.phoneChat.push({
        sender: "player",
        text: pickMsg([
          "Passei só pra saber como você tá aí do outro lado da parede.",
          "Como tá a minha vizinha favorita do 404 agora?",
          "Lembrei de você aqui e resolvi mandar um oi."
        ]),
        time: timeStr
      });
      if (auroraSleeping) {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo no 404 e vai ler quando acordar.", time: AG.getFormattedClock() });
      } else if (a.discomfort >= 55 && ph.manipulationCount === 0) {
        s.phoneChat.push({ sender: "aurora", text: "Visualizado. Melhora suas atitudes pessoalmente primeiro.", time: AG.getFormattedClock() });
      } else if (fam === "vulneravel") {
        AG.playSound("heart");
        AG.applyDeltas({ affinity: 11, trust: 10, intimacyLevel: 5, mentalStability: 12, vulnerability: 8, mood: "emocionada" });
        s.phoneChat.push({ sender: "aurora", text: "você não tem ideia de como eu precisava receber essa mensagem exatamente agora... obrigada por lembrar de mim.", time: AG.getFormattedClock() });
      } else if (fam === "sombria") {
        AG.applyDeltas({ dominance: 5, heat: 6, intimacyLevel: 3, auroraDarkness: 2 });
        s.phoneChat.push({ sender: "aurora", text: "que gracinha você mandando mensagem fofa... continua assim que eu gosto de te ver comportado.", time: AG.getFormattedClock() });
      } else if (fam === "conflito") {
        AG.applyDeltas({ discomfort: -10, affinity: 5 });
        s.phoneChat.push({ sender: "aurora", text: "hmph... ainda tô meio emburrada com você, mas valeu por mandar mensagem.", time: AG.getFormattedClock() });
      } else if (fam === "quimica") {
        AG.playSound("hot");
        AG.applyDeltas({ affinity: 8, heat: 8, intimacyLevel: 5, arousal: 6 });
        s.phoneChat.push({ sender: "aurora", text: "se lembrou de mim, vem resolver isso pessoalmente aqui no 404 em vez de ficar só no chat...", time: AG.getFormattedClock() });
      } else {
        AG.playSound("msg");
        AG.applyDeltas({ affinity: 8, trust: 6, intimacyLevel: 4, discomfort: -5 });
        s.phoneChat.push({
          sender: "aurora",
          text: pickMsg([
            "ganhei minha noite agora. aparece aqui ao vivo quando puder!",
            "tô ótima agora que você deu sinal de vida, 402.",
            "fica me mimando assim que eu me acostumo mal, viu?"
          ]),
          time: AG.getFormattedClock()
        });
      }
    } else if (actionId === "msg_flerte_leve") {
      AG.advanceTime(6, { suppressRandom: true });
      s.phoneChat.push({
        sender: "player",
        text: pickMsg([
          "Tô tentando focar aqui, mas aquele seu olhar de baixo pra cima não sai da minha cabeça.",
          "Confessa: você faz de propósito pra ficar irresistível cada vez que abre a porta do 404, né?",
          "Tava pensando aqui... 1,49m de pura provocação morando logo na porta ao lado não ajuda minha concentração."
        ]),
        time: timeStr
      });
      if (auroraSleeping) {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo e vai acordar corada com isso.", time: AG.getFormattedClock() });
      } else if (a.discomfort >= 48) {
        AG.playSound("warn");
        s.phoneChat.push({ sender: "aurora", text: "Não adianta mandar cantada com esse clima tenso entre a gente. Conversa direito comigo primeiro.", time: AG.getFormattedClock() });
      } else {
        AG.playSound("hot");
        AG.applyDeltas({ heat: 10, intimacyLevel: 6, affinity: 6, arousal: 8, charisma: 1, mood: "corada_sensivel" });
        s.phoneChat.push({
          sender: "aurora",
          text: pickMsg([
            "Eita, 402!! Manda uma dessas do nada e quer que eu não fique toda vermelha olhando pro celular?! Continua assim...",
            "Olha só quem resolveu jogar charme por mensagem... se você falar isso olhando nos meus olhos pessoalmente eu perco a pose!",
            "Hahaha convencido! Mas admito que adorei ler isso agora — já subiu a temperatura aqui no 404."
          ]),
          time: AG.getFormattedClock()
        });
      }
    } else if (actionId === "msg_pergunta_intima") {
      AG.advanceTime(8, { suppressRandom: true });
      const idx = (ph.lastQuestionIdx || 0) % INTIMATE_CHAT_QUESTIONS.length;
      ph.lastQuestionIdx = idx + 1;
      const qa = INTIMATE_CHAT_QUESTIONS[idx];
      s.phoneChat.push({ sender: "player", text: qa.q, time: timeStr });
      if (auroraSleeping) {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo agora.", time: AG.getFormattedClock() });
      } else if (a.discomfort >= 48) {
        s.phoneChat.push({ sender: "aurora", text: "Hoje não tô no clima pra jogo de perguntas, 402. Vamos resolver o atrito primeiro.", time: AG.getFormattedClock() });
      } else {
        AG.playSound("heart");
        AG.applyDeltas({ intimacyLevel: 9, vulnerability: 8, trust: 8, affinity: 8, heat: 5, perception: 1 });
        s.phoneChat.push({ sender: "aurora", text: qa.a, time: AG.getFormattedClock() });
        if (idx === 2 && AG.Intimacy && AG.Intimacy.getHerPreference) {
          const prefMap = { lento: "ritmo lento", ousado: "iniciativa ousada", conduzida: "conduzir o ritmo", provocacao: "jogo de provocação", cuidado: "cuidado e cumplicidade" };
          const pKey = AG.Intimacy.getHerPreference();
          AG.queueToast(`Pista sobre ela: prefere ${prefMap[pKey] || pKey}`, "hot", "info");
        }
      }
    } else if (actionId === "msg_convidar_402") {
      AG.advanceTime(6, { suppressRandom: true });
      const gate = AG.Gates.check("phone_invite_402");
      s.phoneChat.push({
        sender: "player",
        text: s.weather === "chuva_noturna"
          ? "Chuva boa lá fora... quer passar aqui no 402 um pouco? Faço um café."
          : "Quer atravessar o corredor e vir aqui pro meu Apê 402 agora?",
        time: timeStr
      });
      if (gate.code === "sleeping") {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo no 404 agora.", time: AG.getFormattedClock() });
      } else if (gate.code === "shift") {
        s.phoneChat.push({ sender: "aurora", text: "Tô presa no turno do Café Sakura até as 17h! Passa aqui no balcão ou me chama depois do expediente.", time: AG.getFormattedClock() });
      } else if (gate.code === "friction") {
        AG.playSound("warn");
        s.phoneChat.push({ sender: "aurora", text: "Hoje não tô com cabeça pra ir aí com esse atrito todo. Conserta o clima entre a gente primeiro.", time: AG.getFormattedClock() });
      } else if (gate.ok) {
        AG.playSound("heart");
        const arriveLine = s.weather === "chuva_noturna"
          ? "Nem precisa pedir duas vezes com essa chuva. Já atravessei o corredor — fecha a porta que lá fora tá gelado!"
          : "Tô aqui! Você chamou com tanto jeito no chat que larguei tudo no 404 e vim logo pro seu sofá.";
        bringAuroraTo402(arriveLine);
        AG.applyDeltas({ affinity: 8, intimacyLevel: 7, heat: 6, discomfort: -6 });
        s.phoneChat.push({
          sender: "aurora",
          text: s.currentLocation === "ape_402"
            ? "Já tô batendo aí no 402 — abre a porta!"
            : "Fechado! Tô indo pro seu Apê 402 te esperar lá — não demora pra voltar!",
          time: AG.getFormattedClock()
        });
      } else {
        // Sem punição injusta — resposta amigável que explica o progresso
        AG.applyDeltas({ affinity: 2, intimacyLevel: 2 });
        s.phoneChat.push({
          sender: "aurora",
          text: `Calma aí, 402! Vamos conversar mais um pouco no corredor ou por aqui antes de eu invadir seu apê (${gate.missing}).`,
          time: AG.getFormattedClock()
        });
      }
    } else if (actionId === "msg_combinar_corredor") {
      AG.advanceTime(6, { suppressRandom: true });
      const gate = AG.Gates.check("phone_date_meet");
      s.phoneChat.push({ sender: "player", text: "Dá um pulo aqui no corredor do 4º andar dois minutinhos? Quero te ver ao vivo.", time: timeStr });
      if (gate.code === "sleeping") {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo no 404.", time: AG.getFormattedClock() });
      } else if (gate.code === "shift") {
        s.phoneChat.push({ sender: "aurora", text: "Tô no Café Sakura trabalhando até 17h! Se quiser me ver agora, cola aqui no balcão!", time: AG.getFormattedClock() });
      } else if (gate.code === "friction") {
        s.phoneChat.push({ sender: "aurora", text: "Melhor a gente esfriar a cabeça antes de se esbarrar no corredor.", time: AG.getFormattedClock() });
      } else {
        AG.playSound("heart");
        s.flags.auroraCalledToCorridor = true;
        s.flags.auroraVisitingYourApt = false;
        s.flags.auroraIn404WithPlayer = false;
        AG.refreshAuroraActivity();
        AG.applyDeltas({ affinity: 6, intimacyLevel: 4 });
        if (s.currentLocation === "corredor_4andar") {
          s.activeTab = "situacao";
          AG.clearFeed();
          AG.pushFeed({
            type: "aurora",
            action: "*A porta do 404 destranca na mesma hora e Aurora sai encostando na parede com um sorriso curioso*",
            speech: "Chamou e eu apareci! Qual é a boa no quarto andar, 402?"
          });
        }
        s.phoneChat.push({
          sender: "aurora",
          text: s.currentLocation === "corredor_4andar" ? "Já abri a porta do 404, tô aqui fora!" : "Já tô saindo pro corredor — te encontro lá entre o 402 e o 404!",
          time: AG.getFormattedClock()
        });
      }
    } else if (actionId === "msg_audio_voz") {
      AG.advanceTime(6, { suppressRandom: true });
      s.phoneChat.push({
        sender: "player",
        text: "[Áudio enviado · 0:24] — Voz baixa e calma contando do seu dia e perguntando como ela está de verdade.",
        time: timeStr
      });
      if (auroraSleeping) {
        s.phoneChat.push({ sender: "system", text: "Áudio entregue · ela está dormindo no 404.", time: AG.getFormattedClock() });
      } else if (a.discomfort >= 55) {
        s.phoneChat.push({ sender: "aurora", text: "Ouvi seu áudio. Pelo menos o tom de voz foi decente, mas ainda preciso de espaço.", time: AG.getFormattedClock() });
      } else if (fam === "vulneravel") {
        AG.playSound("heart");
        AG.applyDeltas({ mentalStability: 16, trust: 14, affinity: 14, intimacyLevel: 8, vulnerability: 12, traumaLevel: -8, mood: "emocionada" });
        s.phoneChat.push({ sender: "aurora", text: "ouvi seu áudio duas vezes seguidas... sua voz acalma demais quando minha cabeça tá barulhenta assim. obrigada.", time: AG.getFormattedClock() });
      } else if (s.hour >= 22 || s.hour <= 3 || fam === "quimica") {
        AG.playSound("hot");
        AG.applyDeltas({ arousal: 14, heat: 12, intimacyLevel: 9, composure: -10, mood: "corada_sensivel" });
        s.phoneChat.push({ sender: "aurora", text: "ei!! mandar áudio com essa voz baixa e rouca a essa hora é golpe baixo demais... fiquei toda arrepiada aqui no 404!", time: AG.getFormattedClock() });
      } else {
        AG.playSound("heart");
        AG.applyDeltas({ affinity: 10, trust: 8, intimacyLevel: 6 });
        s.phoneChat.push({ sender: "aurora", text: "gostei demais do áudio! bem melhor do que mensagem seca — manda mais vezes.", time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_reagir_status") {
      AG.advanceTime(5, { suppressRandom: true });
      const liveSt = AG.getAuroraLiveStatus();
      s.phoneChat.push({
        sender: "player",
        text: `Respondendo ao seu status ("${liveSt.note}"): Tô de olho nessa indireta aí, Aurora.`,
        time: timeStr
      });
      if (auroraSleeping) {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo no 404.", time: AG.getFormattedClock() });
      } else if (fam === "conflito" || a.discomfort >= 48) {
        AG.applyDeltas({ rivalry: 6, discomfort: -5 });
        s.phoneChat.push({ sender: "aurora", text: "Se a carapuça serviu no 402, não fui eu que coloquei na sua cabeça.", time: AG.getFormattedClock() });
      } else if (fam === "vulneravel") {
        AG.playSound("heart");
        AG.applyDeltas({ affinity: 10, trust: 10, intimacyLevel: 6, mentalStability: 10, vulnerability: 10 });
        s.phoneChat.push({ sender: "aurora", text: "Você sempre percebe até as coisas pequenas que eu posto... passa aqui depois pra gente conversar.", time: AG.getFormattedClock() });
      } else {
        AG.playSound("msg");
        AG.applyDeltas({ affinity: 8, heat: 6, intimacyLevel: 4, composure: -8, perception: 1 });
        s.phoneChat.push({ sender: "aurora", text: "Hahaha você lê até meu status na hora que eu posto?! Assumiu que fica me stalkeando, 402!", time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_selfie_fofa") {
      AG.advanceTime(6, { suppressRandom: true });
      const gate = AG.Gates.check("phone_selfie_cute");
      s.phoneChat.push({ sender: "player", text: "Manda uma selfie sua rapidinho pra salvar meu dia por aqui?", time: timeStr });
      if (gate.code === "sleeping") {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo agora.", time: AG.getFormattedClock() });
      } else if (gate.code === "friction") {
        AG.playSound("warn");
        s.phoneChat.push({ sender: "aurora", text: "Sem clima pra selfie agora com a gente nesse atrito, 402.", time: AG.getFormattedClock() });
      } else if (gate.ok) {
        AG.playSound("heart");
        const chosenPhoto = a.wearingUniform
          ? "Aurora de uniforme PNG 4.png"
          : (s.hour >= 22 || s.hour <= 5) ? "Aurora Moletom Madrugada PNG.png" : "Aurora PNG 2.png";
        addPhotoUnique(chosenPhoto);
        AG.applyDeltas({ affinity: 10, intimacyLevel: 7, heat: 6, trust: 6, mood: "alegre" });
        s.phoneChat.push({
          sender: "aurora",
          text: `[Selfie enviada · salva na Galeria] Pronto, tirei agora mesmo só pra você parar de reclamar de saudade! Ficou boa?`,
          time: AG.getFormattedClock()
        });
        AG.queueToast("Nova foto salva na Galeria do Celular", "pos", "up");
      } else {
        AG.applyDeltas({ affinity: 3, intimacyLevel: 3 });
        s.phoneChat.push({
          sender: "aurora",
          text: `Hahaha mal começou o papo e já quer foto exclusiva? Conversa mais comigo primeiro (${gate.missing}) que eu mando!`,
          time: AG.getFormattedClock()
        });
      }
    } else if (actionId === "msg_quente_foto") {
      AG.advanceTime(8, { suppressRandom: true });
      const gate = AG.Gates.check("phone_photo_spicy");
      s.phoneChat.push({ sender: "player", text: "Como você tá vestida aí agora? Me manda uma foto provocante só pra mim...", time: timeStr });

      if (gate.code === "sleeping") {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo no 404.", time: AG.getFormattedClock() });
      } else if (gate.ok) {
        AG.playSound("hot");
        AG.applyDeltas({ heat: 14, arousal: 12, desire: 12, intimacyLevel: 9, specialScene: "fotoCelular" });
        addPhotoUnique("Cena Celular Foto Secreta PNG.png");
        addPhotoUnique("Aurora Provocando PNG.png");
        if (a.wearingUniform) addPhotoUnique("Cena Uniforme Provocante PNG.png");
        s.phoneChat.push({
          sender: "aurora",
          text: "[Foto Secreta enviada · salva na Galeria] Olha o que você me faz mandar... Não mostra essa tela pra ninguém, ouviu? Tô toda corada aqui.",
          time: AG.getFormattedClock()
        });
        AG.queueToast("Foto Secreta salva na Galeria", "hot", "up");
      } else if (gate.code === "bond") {
        // COERÊNCIA: Se só falta intimidade (sem atrito/manipulação), ela provoca rindo em vez de destruir a relação!
        AG.playSound("msg");
        AG.applyDeltas({ heat: 4, intimacyLevel: 3 });
        s.phoneChat.push({
          sender: "aurora",
          text: `Opa, olha a pressa do 402! Esquenta mais o clima e ganha mais intimidade comigo primeiro (${gate.missing}) — aí eu mando uma que vai tirar seu fôlego.`,
          time: AG.getFormattedClock()
        });
      } else {
        AG.playSound("warn");
        AG.applyDeltas({ discomfort: 8, affinity: -4 });
        s.phoneChat.push({
          sender: "aurora",
          text: gate.code === "manipulation"
            ? "Você realmente acha que vou mandar foto íntima enquanto tá usando pressão e trunfos contra mim? Apaga isso primeiro."
            : "Com o clima pesado desse jeito entre nós dois? Nem pensar. Conserta a situação comigo antes.",
          time: AG.getFormattedClock()
        });
      }
    } else if (actionId === "msg_foto_nsfw_18") {
      AG.advanceTime(10, { suppressRandom: true });
      const gate = AG.Gates.check("phone_photo_nsfw");
      s.phoneChat.push({ sender: "player", text: "Porta trancada aí? Quero uma foto 18+ sem filtro, só entre nós dois agora...", time: timeStr });
      if (gate.code === "sleeping") {
        s.phoneChat.push({ sender: "system", text: "Entregue · Aurora está dormindo no 404.", time: AG.getFormattedClock() });
      } else if (gate.ok) {
        AG.playSound("hot");
        const candidates = a.wearingUniform
          ? ["Cena Especial NSFW 3 Uniforme PNG.png", "Cena Especial NSFW 1 PNG.png", "Cena Especial NSFW 2 PNG.png"]
          : a.dominance >= 48
            ? ["Cena Especial NSFW 4 Controle PNG.png", "Cena Especial NSFW 2 PNG.png", "Cena Especial NSFW 1 PNG.png"]
            : ["Cena Especial NSFW 1 PNG.png", "Cena Especial NSFW 2 PNG.png", "Cena Especial NSFW 3 Uniforme PNG.png", "Cena Especial NSFW 4 Controle PNG.png"];
        const nextPhoto = candidates.find((c) => !(ph.unlockedPhotos || []).includes(c)) || candidates[0];
        addPhotoUnique(nextPhoto);
        const sceneKey = nextPhoto.includes("Uniforme") ? "nsfwUniforme" : nextPhoto.includes("Controle") ? "nsfwControle" : nextPhoto.includes("2") ? "nsfw2" : "nsfw1";
        AG.applyDeltas({ heat: 18, arousal: 18, intimacyLevel: 10, desire: 16, mood: "excitada_tensa", specialScene: sceneKey });
        s.phoneChat.push({
          sender: "aurora",
          text: `[Foto Exclusiva 18+ enviada · salva na Galeria] Tranca a tela agora mesmo, 402... Só mando uma foto assim pra você porque confio de olhos fechados. E se você não aparecer logo aqui, a culpa é toda sua.`,
          time: AG.getFormattedClock()
        });
        AG.queueToast("Foto 18+ exclusiva salva na Galeria", "hot", "up");
      } else if (gate.code === "bond") {
        AG.playSound("msg");
        AG.applyDeltas({ heat: 3 });
        s.phoneChat.push({
          sender: "aurora",
          text: `Calma lá, apressadinho! Uma foto nesse nível exige entrega de verdade (${gate.missing}). Continua me conquistando que você chega lá.`,
          time: AG.getFormattedClock()
        });
      } else {
        AG.playSound("warn");
        AG.applyDeltas({ discomfort: 10, affinity: -5 });
        s.phoneChat.push({
          sender: "aurora",
          text: gate.code === "manipulation"
            ? "Eu jamais vou mandar algo tão íntimo sob pressão ou chantagem. Joga limpo comigo primeiro."
            : "Sem a menor condição com esse atrito entre nós dois agora.",
          time: AG.getFormattedClock()
        });
      }
    } else if (actionId === "call_voice") {
      AG.advanceTime(15, { suppressRandom: true });
      const gate = AG.Gates.check("phone_voice_call");
      if (gate.code === "sleeping") {
        s.phoneChat.push({ sender: "system", text: "Chamada não atendida · Aurora está dormindo no 404.", time: timeStr });
      } else if (gate.code === "shift") {
        s.phoneChat.push({ sender: "aurora", text: "Desculpa recusar a ligação! Tô no balcão do Café Sakura agora, me liga depois das 17h!", time: timeStr });
      } else if (gate.code === "friction") {
        AG.playSound("warn");
        s.phoneChat.push({ sender: "system", text: "Aurora recusou a chamada. O clima ainda está pesado.", time: timeStr });
      } else if (gate.ok) {
        ph.callCount = (ph.callCount || 0) + 1;
        const lateNight = s.hour >= 22 || s.hour <= 3;
        AG.playSound(lateNight ? "hot" : "heart");
        const spokenLine = lateNight
          ? "Oi, 402... eu tava deitada no escuro aqui no 404 pensando em você. Fica na linha comigo mais um pouco, sua voz baixa nessa madrugada dá até arrepio."
          : "Alôô, vizinho! Adorei você ligar em vez de só digitar — tava precisando ouvir sua voz hoje pra dar uma animada.";
        AG.applyDeltas(lateNight
          ? { affinity: 12, trust: 10, intimacyLevel: 12, heat: 12, arousal: 12, vulnerability: 10, mood: "corada_sensivel" }
          : { affinity: 12, trust: 10, intimacyLevel: 9, calm: 8, discomfort: -8, mood: "alegre" }
        );
        if (lateNight) addPhotoUnique("Aurora Moletom Madrugada PNG.png");
        s.phoneChat.push({
          sender: "system",
          text: `📞 Chamada de Voz (${lateNight ? "18m · Madrugada" : "12m"}) — Aurora atendeu no segundo toque.`,
          time: timeStr
        });
        s.phoneChat.push({ sender: "aurora", text: spokenLine, time: AG.getFormattedClock() });
        if (AG.Audio && AG.Audio.speakAurora && s.settings.voiceEnabled !== false) {
          AG.Audio.speakAurora(spokenLine);
        }
      } else {
        AG.applyDeltas({ affinity: 2 });
        s.phoneChat.push({ sender: "aurora", text: `Opa, vi sua chamada! Vamos papear mais por texto/ao vivo primeiro que logo eu atendo (${gate.missing}).`, time: AG.getFormattedClock() });
      }
    } else if (actionId === "call_video") {
      AG.advanceTime(20, { suppressRandom: true });
      const gate = AG.Gates.check("phone_video_call");
      if (gate.code === "sleeping") {
        s.phoneChat.push({ sender: "system", text: "Chamada de vídeo sem resposta · ela está dormindo no 404.", time: timeStr });
      } else if (gate.code === "shift") {
        s.phoneChat.push({ sender: "aurora", text: "Sem vídeo no meio do expediente do Café Sakura! Me liga depois das 17h!", time: timeStr });
      } else if (gate.code === "friction") {
        AG.playSound("warn");
        s.phoneChat.push({ sender: "system", text: "Chamada de vídeo recusada — resolva o atrito primeiro.", time: timeStr });
      } else if (gate.ok) {
        ph.videoCallCount = (ph.videoCallCount || 0) + 1;
        const lateNight = s.hour >= 21 || s.hour <= 3;
        AG.playSound("hot");
        addPhotoUnique("Aurora Corada PNG.png");
        if (lateNight) addPhotoUnique("Cena Quarto 404 Noite PNG.png");
        const spokenLine = lateNight
          ? "Para de sorrir olhando pra câmera assim, 402... eu tô de moletom largo aqui na cama do 404 e você me olhando desse jeito me faz querer atravessar o corredor agora mesmo."
          : "Olha você todo bonitão na minha tela! A gente mora a três metros de distância e tá fazendo chamada de vídeo igual dois apaixonados — e eu tô amando.";
        AG.applyDeltas({ affinity: 14, trust: 12, intimacyLevel: 14, heat: 14, arousal: 14, vulnerability: 10, mood: lateNight ? "excitada_tensa" : "dengosa" });
        s.phoneChat.push({
          sender: "system",
          text: `📹 Chamada de Vídeo (20m) — Print salvo automaticamente na Galeria.`,
          time: timeStr
        });
        s.phoneChat.push({ sender: "aurora", text: spokenLine, time: AG.getFormattedClock() });
        if (AG.Audio && AG.Audio.speakAurora && s.settings.voiceEnabled !== false) {
          AG.Audio.speakAurora(spokenLine);
        }
      } else {
        AG.applyDeltas({ affinity: 3, intimacyLevel: 2 });
        s.phoneChat.push({ sender: "aurora", text: `Calma que eu ainda tô com vergonha de abrir câmera do nada! Ganha mais intimidade comigo primeiro (${gate.missing}).`, time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_manipular") {
      AG.advanceTime(10, { suppressRandom: true });
      const held = AG.getHeldSecrets ? AG.getHeldSecrets() : [];
      if (auroraSleeping || auroraInShift) {
        s.phoneChat.push({ sender: "system", text: auroraSleeping ? "Aurora está dormindo agora e não visualizou." : "Ela está no meio do turno no Café Sakura e não pode sair agora.", time: AG.getFormattedClock() });
      } else if ((ph.leverage || 0) > 0 || held.length > 0) {
        if ((ph.leverage || 0) > 0) ph.leverage -= 1;
        else if (held.length > 0) held[0].state = "used_pressure";
        ph.manipulationCount += 1;
        addTracksRisk(20);
        bringAuroraTo402("...Você me forçou a atravessar o corredor com aquela ameaça no celular. Fala logo o que você quer.");
        AG.applyDeltas({ affinity: -14, discomfort: 22, trust: -18, heat: 12, mood: "manipulada", specialScene: "manipulada" });
        AG.addMemory("manipulou_pelo_celular", "Usou um trunfo/segredo pra forçar a Aurora a ceder e ir até o seu apartamento.", "ruim", true);

        s.phoneChat.push({ sender: "player", text: "Você sabe o que eu descobri sobre você. Acho bom você passar no meu apê agora se não quiser dor de cabeça.", time: timeStr });
        s.phoneChat.push({
          sender: "aurora",
          text: s.currentLocation === "ape_402"
            ? "...Não acredito que você tá usando isso pra me chantagear. Tá. Eu tô indo aí pro 402 agora, mas isso é golpe baixo demais."
            : "...Não acredito que você tá jogando tão baixo assim. Tá, vou te esperar no 402.",
          time: AG.getFormattedClock()
        });
      } else {
        AG.playSound("warn");
        AG.applyDeltas({ affinity: -14, discomfort: 22, dominance: 14, mood: "irritada" });
        s.phoneChat.push({ sender: "player", text: "É melhor você fazer o que eu quero hoje ou vai se arrepender.", time: timeStr });
        s.phoneChat.push({ sender: "aurora", text: "Hahaha você tá tentando me intimidar sem ter absolutamente NADA na mão?! Quem vai te colocar no seu lugar sou eu!", time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_pressao_sutil") {
      AG.advanceTime(10, { suppressRandom: true });
      const gate = AG.Gates.check("phone_subtle_pressure");
      const held = AG.getHeldSecrets ? AG.getHeldSecrets() : [];
      if (gate.code === "sleeping" || gate.code === "shift") {
        s.phoneChat.push({ sender: "system", text: gate.reason, time: AG.getFormattedClock() });
      } else if (gate.ok) {
        if ((ph.leverage || 0) > 0) ph.leverage -= 1;
        else if (held.length > 0) held[0].state = "used_pressure";
        bringAuroraTo402("Olha só como você sabe usar as palavras certas... Fechei a porta do 402 — agora me mostra como você guarda um segredo.");
        AG.playSound("hot");
        AG.applyDeltas({ affinity: 10, heat: 16, intimacyLevel: 8, trust: 8, charisma: 3, mood: "provocante", specialScene: "chamego" });
        AG.addMemory("manipulacao_sutil_perfeita", "Usou um segredo dela com tanta lábia que ela veio para o seu apê achando que a ideia foi toda dela.", "controle", true);

        s.phoneChat.push({ sender: "player", text: "Tava aqui lembrando daquele detalhe que só eu sei sobre você... passa lá no 402 agora pra eu te mostrar como guardo bem um segredo nosso.", time: timeStr });
        s.phoneChat.push({
          sender: "aurora",
          text: s.currentLocation === "ape_402"
            ? "Olha como você sabe jogar com as palavras... Tô indo aí pro 402 agora mesmo, me espera com a porta destrancada."
            : "Olha como você sabe jogar com as palavras... Vou te esperar no 402, não demora.",
          time: AG.getFormattedClock()
        });
      } else {
        AG.playSound("warn");
        AG.applyDeltas({ suspicion: 10, discomfort: 6 });
        s.phoneChat.push({ sender: "aurora", text: `Que papo estranho cheio de indireta? Fala direito comigo (${gate.missing}).`, time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_blefe_desafio") {
      AG.advanceTime(8, { suppressRandom: true });
      const gate = AG.Gates.check("phone_dare_402");
      if (gate.code === "sleeping" || gate.code === "shift") {
        s.phoneChat.push({ sender: "system", text: gate.reason, time: AG.getFormattedClock() });
      } else if (gate.ok) {
        bringAuroraTo402("Duvidou que eu vinha?! Abre espaço aí no 402 que agora eu vou acabar com essa sua marra ao vivo!");
        AG.playSound("hot");
        AG.applyDeltas({ influence: 10, rivalry: 10, heat: 14, intimacyLevel: 6, dominance: -10, mood: "provocante", specialScene: "paredeCorredor" });
        s.phoneChat.push({ sender: "player", text: "Duvido você ter coragem de aparecer no 402 agora pra resolver nossa aposta cara a cara.", time: timeStr });
        s.phoneChat.push({
          sender: "aurora",
          text: s.currentLocation === "ape_402"
            ? "Duvida?! Abre essa porta agora que eu tô atravessando o corredor pra acabar com a sua marra ao vivo!"
            : "Duvida?! Já tô indo pro seu Apê 402 te esperar — aparece lá se tiver coragem!",
          time: AG.getFormattedClock()
        });
      } else {
        AG.playSound("msg");
        AG.applyDeltas({ rivalry: 6, heat: 4 });
        s.phoneChat.push({ sender: "aurora", text: `Haha precisa esquentar mais a nossa rivalidade ou o clima antes de me tirar do sofá (${gate.missing})!`, time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_visto_e_ignorado") {
      AG.advanceTime(12, { suppressRandom: true });
      AG.playSound("click");
      s.phoneChat.push({ sender: "player", text: "Ok.", time: timeStr });
      if (auroraSleeping) {
        s.phoneChat.push({ sender: "system", text: "Entregue · ela vai ver quando acordar.", time: AG.getFormattedClock() });
      } else if (a.discomfort >= 45 || fam === "conflito") {
        AG.applyDeltas({ discomfort: 8, rivalry: 8, personaCold: 2 });
        s.phoneChat.push({ sender: "aurora", text: "'Ok.'? Beleza então. Fica no seu silêncio aí que eu também tenho mais o que fazer.", time: AG.getFormattedClock() });
      } else {
        AG.applyDeltas({ composure: -16, influence: 12, rivalry: 8, personaCold: 3, mood: "carente" });
        s.phoneChat.push({ sender: "aurora", text: "'Ok.'?! Você visualizou meu textão e só mandou um 'Ok.' com ponto final?! O que deu em você agora, 402?? Responde direito!!", time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_chantagem_especifica") {
      AG.advanceTime(10, { suppressRandom: true });
      const held = AG.getHeldSecrets ? AG.getHeldSecrets() : [];
      if (auroraSleeping || auroraInShift) {
        s.phoneChat.push({ sender: "system", text: auroraSleeping ? "Aurora está dormindo no 404 agora." : "Ela está no turno no Café Sakura e não pode sair.", time: AG.getFormattedClock() });
      } else if (held.length > 0) {
        const sec = held.slice().sort((x, y) => (y.pressureVal || 20) - (x.pressureVal || 20))[0];
        sec.state = "used_pressure";
        if (ph.leverage > 0) ph.leverage -= 1;
        ph.manipulationCount += 1;
        addTracksRisk(18);
        bringAuroraTo402(`Você realmente usou "${sec.name}" pra me arrastar até aqui... Fala logo o que você quer.`);
        AG.playSound("warn");
        AG.applyDeltas({ leveragePressure: sec.pressureVal || 25, composure: -20, influence: 18, discomfort: 20, affinity: -12, personaRuthless: 4, mood: "manipulada", specialScene: "manipulada" });
        s.phoneChat.push({ sender: "player", text: `[Anexo: ${sec.name}] — Acho melhor você passar no 402 agora mesmo pra gente conversar sobre quem realmente manda nesse andar.`, time: timeStr });
        s.phoneChat.push({ sender: "aurora", text: `...COMO VOCÊ CONSEGUIU '${sec.name}'?! Não manda isso pra ninguém!! Eu tô indo pro 402 agora mesmo!`, time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_queimar_prova_chat") {
      AG.advanceTime(10, { suppressRandom: true });
      const held = AG.getHeldSecrets ? AG.getHeldSecrets() : [];
      if (held.length > 0) {
        const sec = held[0];
        sec.state = "burned_trust";
        if (ph.leverage > 0) ph.leverage -= 1;
        ph.manipulationCount = 0;
        AG.playSound("heart");
        AG.applyDeltas({ leveragePressure: -100, composure: -24, affinity: 20, trust: 24, intimacyLevel: 10, discomfort: -24, personaWarm: 4, mood: "dengosa" });
        s.phoneChat.push({ sender: "player", text: `🎥 [Vídeo Enviado] — Acabei de apagar permanentemente '${sec.name}' da minha galeria e da lixeira. Sem chantagem entre nós.`, time: timeStr });
        s.phoneChat.push({ sender: "aurora", text: "Você... gravou apagando aquilo tudo sem pedir nada em troca?! Meu coração parou agora... obrigada de verdade, 402.", time: AG.getFormattedClock() });
      }
    } else if (actionId === "msg_consertar") {
      AG.advanceTime(15, { suppressRandom: true });
      ph.manipulationCount = 0;
      ph.leverage = 0;
      ph.tracksRisk = 0;
      AG.playSound("heart");
      AG.applyDeltas({ leveragePressure: -100, affinity: 16, trust: 16, intimacyLevel: 6, discomfort: -32, mood: "espontanea" });
      AG.addMemory("consertou_relacao_sincero", "Apagou qualquer trunfo ou pressão e pediu perdão sincero para reconstruir a relação com a Aurora.", "bom", true);

      s.phoneChat.push({ sender: "player", text: "Aurora, apaguei tudo e parei com qualquer pressão. Eu errei feio com você e quero consertar as coisas de verdade, sem nada forçado.", time: timeStr });
      s.phoneChat.push({ sender: "aurora", text: "...Eu tava tão magoada com aquele clima pesado... Obrigada por jogar limpo comigo e apagar aquilo. Vamos recomeçar direito.", time: AG.getFormattedClock() });
    }

    // ------------------------------------------------------------------------
    // 2. APP SAKURAGRAM (FEED SOCIAL INTERATIVO DA AURORA)
    // ------------------------------------------------------------------------
    else if (actionId.startsWith("feed_like:")) {
      const pid = actionId.slice("feed_like:".length);
      ph.likedPosts = ph.likedPosts || {};
      if (ph.likedPosts[pid]) return;
      ph.likedPosts[pid] = true;
      const post = AG.getAuroraFeedPosts().find((x) => x.id === pid);
      if (post && post.photo) addPhotoUnique(post.photo);
      AG.playSound("heart");
      AG.advanceTime(3, { suppressRandom: true });
      AG.applyDeltas({ affinity: 5, intimacyLevel: 3, heat: 2 });
      AG.queueToast("Curtiu a postagem da Aurora (+Afinidade)", "pos", "up");
    } else if (actionId.startsWith("feed_comment_sweet:") || actionId.startsWith("feed_comment_hot:")) {
      const isHot = actionId.startsWith("feed_comment_hot:");
      const pid = actionId.split(":")[1];
      ph.commentedPosts = ph.commentedPosts || {};
      if (ph.commentedPosts[pid]) return;
      ph.commentedPosts[pid] = true;
      const post = AG.getAuroraFeedPosts().find((x) => x.id === pid);
      if (!post) return;
      if (post.photo) addPhotoUnique(post.photo);
      AG.advanceTime(5, { suppressRandom: true });
      if (isHot) {
        AG.playSound("hot");
        AG.applyDeltas({ heat: 10, intimacyLevel: 6, arousal: 8, affinity: 5, charisma: 1 });
      } else {
        AG.playSound("heart");
        AG.applyDeltas({ affinity: 10, trust: 8, intimacyLevel: 6, discomfort: -6 });
      }
      s.phoneChat.push({
        sender: "system",
        text: `📸 Você comentou no SakuraGram dela ("${post.caption.slice(0, 44)}…")`,
        time: timeStr
      });
      if (!auroraSleeping) {
        s.phoneChat.push({ sender: "aurora", text: isHot ? post.replyHot : post.replySweet, time: AG.getFormattedClock() });
      }
      AG.queueToast(isHot ? "Comentário provocante enviado" : "Comentário carinhoso enviado", isHot ? "hot" : "pos", "up");
    }

    // ------------------------------------------------------------------------
    // 3. APP FREELAPAY & PIX (BANCO, ALUGUEL, MIMO PIX & MINI-FREELAS)
    // ------------------------------------------------------------------------
    else if (actionId === "pay_rent_pix") {
      const amt = p.rentAmount || 350;
      if (p.money < amt) return;
      AG.playSound("heart");
      AG.advanceTime(5, { suppressRandom: true });
      p.rentDueInDays = (p.rentDueInDays || 0) + 7;
      AG.applyDeltas({ money: -amt, calm: 16 });
      AG.queueToast(`Aluguel quitado via Pix (+7 dias tranquilos)`, "pos", "up");
    } else if (actionId === "pix_mimo_aurora") {
      if (p.money < 30 || ph.lastPixDay === s.day) return;
      ph.lastPixDay = s.day;
      AG.playSound("heart");
      AG.advanceTime(5, { suppressRandom: true });
      AG.applyDeltas({ money: -30, affinity: 14, trust: 12, intimacyLevel: 7, discomfort: -12 });
      s.phoneChat.push({ sender: "player", text: "💸 [Pix enviado · R$ 30] — Pra garantir seu café gelado e um doce hoje sem você gastar do seu turno.", time: timeStr });
      if (!auroraSleeping) {
        s.phoneChat.push({ sender: "aurora", text: "EI!! Você me mandou um Pix só pro meu café e doce?! Você tá me mimando demais, 402... obrigada de verdade!", time: AG.getFormattedClock() });
      } else {
        s.pendingDelayedEffects.push({
          deltas: { affinity: 6, trust: 6 },
          auroraSpeech: "Acordei e vi a notificação do seu Pix pro meu café! Que carinho absurdo, 402!"
        });
      }
    } else if (actionId === "gig_bugfix" || actionId === "gig_script" || actionId === "gig_consult") {
      ph.completedQuickGigs = ph.completedQuickGigs || {};
      const key = `${s.day}:${actionId}`;
      if (ph.completedQuickGigs[key] || p.energy < 10) return;
      ph.completedQuickGigs[key] = true;
      AG.playSound("click");
      if (actionId === "gig_bugfix") {
        const pay = 38 + Math.round((sk.tech || 15) * 1.1);
        AG.advanceTime(45, { suppressRandom: true });
        AG.applyDeltas({ money: pay, energy: -10, tech: 2 });
        AG.queueToast(`Bugfix entregue pelo celular (+R$ ${pay})`, "pos", "up");
      } else if (actionId === "gig_script") {
        const pay = 54 + Math.round((sk.tech || 15) * 1.4);
        AG.advanceTime(65, { suppressRandom: true });
        AG.applyDeltas({ money: pay, energy: -14, tech: 3 });
        AG.queueToast(`Script entregue pelo FreelaPay (+R$ ${pay})`, "pos", "up");
      } else {
        const pay = 44 + Math.round((sk.charisma || 12) * 1.4);
        AG.advanceTime(50, { suppressRandom: true });
        AG.applyDeltas({ money: pay, energy: -10, charisma: 2, perception: 1 });
        AG.queueToast(`Consultoria concluída (+R$ ${pay})`, "pos", "up");
      }
    }

    // ------------------------------------------------------------------------
    // 4. APP VASCULHAR & DOSSIÊ
    // ------------------------------------------------------------------------
    else if (actionId === "inv_conta_secreta") {
      AG.advanceTime(20, { suppressRandom: true });
      AG.unlockSecret("conta_alt_desabafos", "SEGREDO NO DOSSIÊ: Prints da Conta Alt Privada da Aurora!");
      const r = addTracksRisk(30);
      addPhotoUnique("Aurora Provocando PNG.png");
      s.phoneChat.push({ sender: "system", text: "Você encontrou a conta privada da Aurora e salvou os prints no seu Dossiê.", time: timeStr });
      AG.queueToast(`+${r}% Rastros no celular`, "neg", "up");
    } else if (actionId === "inv_multa_condominio") {
      AG.advanceTime(20, { suppressRandom: true });
      AG.unlockSecret("aviso_condominio_404", "Notificação confidencial do síndico salva no Dossiê");
      ph.leverage += 1;
      const r = addTracksRisk(35);
      s.phoneChat.push({ sender: "system", text: "Você interceptou a notificação confidencial do 404 e guardou no Dossiê.", time: timeStr });
      AG.queueToast(`+${r}% Rastros no celular`, "neg", "up");
    } else if (actionId === "inv_logs_condominio") {
      if ((sk.tech || 15) < 18) return;
      AG.advanceTime(20, { suppressRandom: true });
      const locked = s.secretsDossier && Object.values(s.secretsDossier).find((x) => x.state === "locked");
      const r = addTracksRisk(15);
      if (locked) {
        AG.unlockSecret(locked.id, `Auditoria digital silenciosa revelou: ${locked.name}`);
        s.phoneChat.push({ sender: "system", text: `Acesso técnico concluído: "${locked.name}" adicionado ao Dossiê com rastros reduzidos.`, time: timeStr });
      } else {
        ph.leverage = (ph.leverage || 0) + 1;
        s.phoneChat.push({ sender: "system", text: "Todos os segredos principais já foram coletados — você salvou +1 Trunfo extra dos logs.", time: timeStr });
      }
      AG.applyDeltas({ tech: 2, stealth: 2 });
      AG.queueToast(`+${r}% Rastros`, "ctrl", "up");
    } else if (actionId === "inv_sabotar_wifi") {
      AG.advanceTime(15, { suppressRandom: true });
      const r = addTracksRisk(28);
      const canPullNow = AG.getAuroraCurrentLocation() === "ape_404" && a.activity !== "dormindo";
      if (canPullNow) {
        ph.plantedWifiSabotage = true;
        s.flags.auroraCalledToCorridor = true;
        AG.refreshAuroraActivity();
        s.phoneChat.push({ sender: "system", text: "Você derrubou a porta do switch do 404 pelo app — a Aurora acabou de sair no corredor.", time: timeStr });
      } else {
        s.phoneChat.push({ sender: "system", text: "Você derrubou a porta do switch do 404 pelo app, mas ela não está acordada no 404 agora para sair no corredor.", time: timeStr });
      }
      AG.queueToast(`+${r}% Rastros no celular`, "neg", "up");
    } else if (actionId === "inv_plantar_boato_predio") {
      AG.advanceTime(15, { suppressRandom: true });
      ph.leverage += 1;
      const r = addTracksRisk(18);
      AG.applyDeltas({ rivalry: 14, influence: 10, charisma: 2 });
      s.phoneChat.push({ sender: "system", text: "Você soltou uma indireta bem-humorada no grupo do prédio que chegou direto aos ouvidos dela.", time: timeStr });
      AG.queueToast(`+${r}% Rastros no celular`, "neg", "up");
    } else if (actionId === "inv_app_paquera_externo") {
      AG.advanceTime(25, { suppressRandom: true });
      const r = addTracksRisk(45);
      AG.applyDeltas({ desire: -35, calm: 8, affinity: -5, jealousy: 22 });
      s.phoneChat.push({ sender: "system", text: "Você passou 25 minutos num app externo para esfriar a cabeça — mas deixou o histórico aberto na tela.", time: timeStr });
      AG.queueToast(`+${r}% Rastros no celular`, "neg", "up");
    }

    // ------------------------------------------------------------------------
    // 5. APP SEGURANÇA, VPN & GALERIA
    // ------------------------------------------------------------------------
    else if (actionId === "sec_limpar_rastros") {
      AG.advanceTime(15, { suppressRandom: true });
      const prevRisk = ph.tracksRisk || 0;
      ph.tracksRisk = 0;
      s.phoneChat.push({ sender: "system", text: "Você limpou o histórico, ocultou as pastas e apagou qualquer notificação comprometedora.", time: timeStr });
      if (prevRisk > 0) AG.queueToast("Rastros zerados", "pos", "down");
    } else if (actionId === "sec_ativar_vpn") {
      if ((sk.tech || 15) < 16) return;
      AG.advanceTime(10, { suppressRandom: true });
      ph.vpnDay = s.day;
      ph.tracksRisk = AG.clamp((ph.tracksRisk || 0) - 12, 0, 100);
      AG.applyDeltas({ tech: 2, stealth: 2 });
      AG.queueToast("VPN & Modo Discreto ativos hoje (-50% rastros)", "pos", "up");
    } else if (actionId.startsWith("gal_toggle_fav:")) {
      const fName = actionId.slice("gal_toggle_fav:".length);
      ph.favoritePhotos = ph.favoritePhotos || [];
      if (ph.favoritePhotos.includes(fName)) {
        ph.favoritePhotos = ph.favoritePhotos.filter((x) => x !== fName);
      } else {
        ph.favoritePhotos.push(fName);
      }
    }

    // ------------------------------------------------------------------------
    // 6. APP DELIVERY 24H (COERENTE COM SONO E LOCAL DA AURORA!)
    // ------------------------------------------------------------------------
    else if (actionId === "del_mimo_404") {
      if (p.money < 28) return;
      AG.advanceTime(15, { suppressRandom: true });
      ph.plantedDeliveryGift = true;
      AG.applyDeltas({ money: -28, affinity: 16, trust: 10, intimacyLevel: 6, discomfort: -14, mood: auroraSleeping ? "dormindo" : "dengosa" });
      AG.addMemory("delivery_surpresa_404", "Mandou entregar café gelado e doce surpresa pra Aurora pelo celular.", "bom", true);
      if (auroraSleeping) {
        s.pendingDelayedEffects.push({
          deltas: { affinity: 8, trust: 6, mood: "dengosa" },
          auroraSpeech: "Acordei e achei uma sacolinha de café gelado e doce pendurada na minha maçaneta com o seu nome! Você é perfeito demais!"
        });
        s.phoneChat.push({ sender: "system", text: "Entregue na maçaneta do 404 · Ela vai ver assim que acordar!", time: AG.getFormattedClock() });
      } else if (auroraInShift) {
        s.phoneChat.push({ sender: "aurora", text: "EI!! Chegou um motoboy aqui no Café Sakura trazendo doce e bilhete seu no meio do meu turno!! Minhas colegas estão morrendo de inveja!", time: AG.getFormattedClock() });
      } else {
        s.phoneChat.push({ sender: "aurora", text: "EI!! Acabou de chegar uma sacolinha com café gelado e doce na minha maçaneta com seu nome!! Você é perfeito demais!", time: AG.getFormattedClock() });
      }
    } else if (actionId === "del_jantar_dois") {
      if (p.money < 42) return;
      AG.advanceTime(20, { suppressRandom: true });
      AG.applyDeltas({ money: -42, satiety: 46, energy: 10, affinity: 18, intimacyLevel: 10, trust: 10, discomfort: -12 });
      if (auroraSleeping) {
        s.pendingDelayedEffects.push({
          deltas: { affinity: 8, intimacyLevel: 6 },
          auroraSpeech: "Vi que você deixou comida quentinha reservada pra gente! Vou passar no 402 pra te agradecer direito."
        });
        s.phoneChat.push({ sender: "system", text: "Pedido entregue · Você jantou e separou a porção dela pra quando acordar.", time: AG.getFormattedClock() });
      } else {
        s.phoneChat.push({ sender: "aurora", text: "Jantar quente pra nós dois?! Para tudo — me espera no 402 ou vem pro 404 que eu já tô pegando os pratos!", time: AG.getFormattedClock() });
      }
    } else if (actionId === "del_kit_madrugada") {
      if (p.money < 26) return;
      AG.advanceTime(12, { suppressRandom: true });
      AG.applyDeltas({ money: -26, auroraEnergy: 28, affinity: 14, trust: 8, intimacyLevel: 5, mood: auroraSleeping ? "dormindo" : "euforica" });
      if (auroraSleeping) {
        s.pendingDelayedEffects.push({ deltas: { auroraEnergy: 12, affinity: 6 }, auroraSpeech: "Energético de pêssego e snacks esperando na porta quando acordei! Você me conhece demais!" });
        s.phoneChat.push({ sender: "system", text: "Kit Madrugada entregue na porta do 404 para quando ela acordar.", time: AG.getFormattedClock() });
      } else {
        s.phoneChat.push({ sender: "aurora", text: "ENERGÉTICO DE PÊSSEGO E SNACKS?! Você literalmente salvou minha virada de arte hoje, 402!!", time: AG.getFormattedClock() });
      }
    } else if (actionId === "del_flores_vela") {
      if (p.money < 48) return;
      AG.advanceTime(15, { suppressRandom: true });
      AG.applyDeltas({ money: -48, affinity: 18, heat: 16, intimacyLevel: 12, trust: 10, discomfort: -16, mood: auroraSleeping ? "dormindo" : "corada_sensivel" });
      if (auroraSleeping) {
        s.pendingDelayedEffects.push({ deltas: { heat: 10, intimacyLevel: 6 }, auroraSpeech: "Flores e vela aromática de cereja na minha porta?! Você tá querendo me deixar completamente apaixonada, né?" });
        s.phoneChat.push({ sender: "system", text: "Flores & Vela entregues na porta do 404 como surpresa.", time: AG.getFormattedClock() });
      } else {
        s.phoneChat.push({ sender: "aurora", text: "Flores e vela de cereja e âmbar entregues aqui no 404?! Meu apartamento inteiro ficou perfumado... vem sentir esse cheiro de perto hoje à noite.", time: AG.getFormattedClock() });
      }
    } else if (actionId === "del_lanche_402") {
      if (p.money < 20) return;
      AG.advanceTime(20, { suppressRandom: true });
      AG.applyDeltas({ money: -20, satiety: 48, energy: 6 });
    }

    AG.saveGame("autosave");
  };

  // ==========================================================================
  // CATÁLOGO DOS 8 FINAIS DO JOGO (Incluindo o Final de Relação Manipulada!)
  // ==========================================================================
  AG.ENDINGS = {
    bad_end_precoce_404: {
      id: "bad_end_precoce_404",
      category: "Final Ruim Precoce",
      badge: "🚪 FINAL 1/16",
      title: "O Vizinho Indesejado do 4º Andar",
      paragraphs: [
        "Você ignorou todos os limites da Aurora logo no primeiro encontro no corredor.",
        "Ela trancou a porta do 404 a sete chaves, registrou reclamação no condomínio e nunca mais dirigiu a palavra a você."
      ]
    },
    bad_end_bloqueado_definitivo: {
      id: "bad_end_bloqueado_definitivo",
      category: "Final Ruim",
      badge: "❄️ FINAL 2/16",
      title: "Bloqueado & Portas Trancadas",
      paragraphs: [
        "Suas atitudes e vacilos acumularam um desconforto insustentável.",
        "A Aurora bloqueou seu número, fechou a porta do 404 na sua cara e cortou você de vez da rotina dela."
      ]
    },
    end_distante_solitario: {
      id: "end_distante_solitario",
      category: "Final Distante",
      badge: "🌫️ FINAL 3/16",
      title: "Duas Portas que Se Desencontraram",
      paragraphs: [
        "Você preferiu resolver suas necessidades e sua rotina isolado no 402.",
        "A conexão esfriou até sobrar apenas um cumprimento formal de corredor."
      ]
    },
    end_chamego_namoro_doce: {
      id: "end_chamego_namoro_doce",
      category: "Final Romântico & Chamego",
      badge: "💗 FINAL 4/16",
      title: "Minha Pequena Grande Mulher Favorita",
      paragraphs: [
        "O que começou com a surpresa diante dos 1,49m dela no corredor se transformou no romance mais doce e cúmplice do mundo.",
        "Hoje a Aurora vive aninhada no seu abraço entre o 402 e o 404, fazendo dengo no seu colo e chamando você de lar."
      ]
    },
    end_tensao_ardente_madrugada: {
      id: "end_tensao_ardente_madrugada",
      category: "Final Quente & Provocante",
      badge: "🔥 FINAL 5/16",
      title: "Incêndio nas Madrugadas do 404",
      paragraphs: [
        "A química entre vocês superou qualquer barreira. Cada olhar de baixo pra cima, cada uniforme e cada sussurro viraram madrugadas inesquecíveis entre quatro paredes.",
        "— Tranca a porta, Diretor... a noite no 404 é toda nossa."
      ]
    },
    end_teia_de_controle_absoluto: {
      id: "end_teia_de_controle_absoluto",
      category: "Final de Domínio Dela",
      badge: "👑 FINAL 6/16",
      title: "Na Palma da Mão Dela",
      paragraphs: [
        "Mesmo com apenas 1,49m, a Aurora assumiu o comando absoluto sobre você. Mesmo quando as coisas pesavam, você nunca conseguiu dizer não.",
        "Basta uma mensagem dela de madrugada para você largar tudo e obedecer."
      ]
    },
    end_manipulacao_sombria: {
      id: "end_manipulacao_sombria",
      category: "Final de Manipulação (Seu Controle)",
      badge: "⛓️ FINAL 7/16",
      title: "Relação Forçada & Segredos no Celular",
      paragraphs: [
        "Você usou cada segredo, pista e trunfo que coletou no celular para manter a Aurora presa às suas exigências sem jamais deixar rastros.",
        "É uma relação tensa, torta e forçada: ela continua indo ao seu apartamento e cedendo a tudo o que você pede, presa pelos segredos que você guarda a sete chaves."
      ]
    },
    end_parceiros_caoticos_sucesso: {
      id: "end_parceiros_caoticos_sucesso",
      category: "Final Verdadeiro Completo",
      badge: "🌟 FINAL 8/16",
      title: "Nosso Próprio Estúdio entre o 402 & o 404",
      paragraphs: [
        "Você evoluiu sua carreira, conquistou o coração e o desejo da Aurora e juntos transformaram o quarto andar num estúdio criativo independente de sucesso."
      ]
    },
    end_rivais_eletricos: {
      id: "end_rivais_eletricos",
      category: "Final Rivais & Química Explosiva",
      badge: "⚔️ FINAL 9/16",
      title: "Guerra Fria & Faíscas no 4º Andar",
      paragraphs: [
        "Entre cafés trocados, Wi-Fi renomeado, bilhetes ousados e apostas de madrugada, vocês transformaram o 4º andar num campo de batalha irresistível.",
        "Ninguém admite que perdeu, mas no fim de toda revanche vocês acabam rindo colados na mesma porta — rivais inseparáveis que se merecem."
      ]
    },
    end_mestre_do_xadrez: {
      id: "end_mestre_do_xadrez",
      category: "Final Virada Psicológica (Xeque-Mate)",
      badge: "♟️ FINAL 10/16",
      title: "Xeque-Mate na Rainha do 404",
      paragraphs: [
        "A Aurora achava que sempre teria a última palavra no quarto andar — até encontrar alguém com lábia, percepção e timing capazes de prever cada movimento dela.",
        "Você virou o tabuleiro sem precisar de força: agora é ela quem espera o seu próximo passo com o coração acelerado e um sorriso desafiado."
      ]
    },
    end_aurora_vila_absoluta: {
      id: "end_aurora_vila_absoluta",
      category: "Final Sombrio: A Antagonista do 404",
      badge: "🖤 FINAL 11/16",
      title: "A Rainha Sombria do 4º Andar",
      paragraphs: [
        "Você plantou a semente da desconfiança e alimentou o lado mais frio da Aurora — até que a aluna superou o mestre em cada jogada psicológica.",
        "Hoje ela sorri com doçura para todo o prédio enquanto controla cada detalhe da sua rotina, dos seus horários e das suas decisões atrás de portas fechadas."
      ]
    },
    end_espiral_mutua_thriller: {
      id: "end_espiral_mutua_thriller",
      category: "Final Thriller Psicológico Mútuo",
      badge: "♟️🖤 FINAL 12/16",
      title: "Dois Manipuladores no 4º Andar",
      paragraphs: [
        "Nenhum dos dois jamais voltou a ser inocente. Entre blefes, segredos guardados, sabotagens e uma atração magnética impossível de quebrar, vocês abraçaram o caos juntos.",
        "O mundo lá fora não faz ideia da dupla perigosa que divide as madrugadas entre o 402 e o 404."
      ]
    },
    end_trauma_irreversivel: {
      id: "end_trauma_irreversivel",
      category: "Final Trágico Emocional",
      badge: "💔 FINAL 13/16",
      title: "Vidro Quebrado no Corredor",
      paragraphs: [
        "Os choques frios, a manipulação emocional e a quebra de confiança esgotaram completamente a estabilidade emocional da Aurora.",
        "Numa manhã silenciosa, a porta do 404 amanhece vazia com um único bilhete colado no seu batente: 'Você venceu todos os jogos... e ficou sozinho no andar.'"
      ]
    },
    end_redencao_da_espiral: {
      id: "end_redencao_da_espiral",
      category: "Final de Redenção & Cura",
      badge: "🌅 FINAL 14/16",
      title: "Resgate do Abismo",
      paragraphs: [
        "Vocês dois chegaram muito perto de se destruir na espiral de paranoia, segredos e jogos mentais — mas no momento decisivo você escolheu baixar todas as armas e acolhê-la de verdade.",
        "As cicatrizes viraram lealdade inabalável: ninguém no mundo entende o coração da Aurora como você."
      ]
    },
    end_parceiros_de_caos: {
      id: "end_parceiros_de_caos",
      category: "Final Caótico & Festivo",
      badge: "🍾 FINAL 15/16",
      title: "Caos, Drinks & Risadas Sem Filtro",
      paragraphs: [
        "Sem drama desnecessário e sem tédio nunca: vocês transformaram cada sexta-feira e cada madrugada numa coleção de apostas malucas, risadas altas e confissões espontâneas.",
        "A vida ao lado da baixinha mais elétrica do prédio nunca mais teve um minuto sequer de monotonia."
      ]
    },
    end_entrega_completa_404: {
      id: "end_entrega_completa_404",
      category: "Final Intimidade Máxima (Estágio 5)",
      badge: "💞 FINAL 16/16",
      title: "Entrega de Corpo e Alma no 404",
      paragraphs: [
        "Todas as barreiras, armaduras e medos caíram por terra. Com estabilidade emocional plena, abertura total e química avassaladora, a Aurora se entregou por inteiro a você.",
        "Do primeiro esbarrão na caixa alta do corredor até cada amanhecer abraçados: ela é, sem dúvida alguma, a sua mulher favorita."
      ]
    }
  };

  AG.getAvailableMilestoneEndings = function () {
    const s = AG.state;
    const p = s.player;
    const a = s.aurora;
    const ph = s.phoneState || {};
    const list = [];

    if ((a.auroraDarkness || 0) >= 65 && a.dominance >= 55) {
      list.push({ id: "end_aurora_vila_absoluta", label: "🖤 Ver Final 11/16: A Rainha Sombria do 4º Andar" });
    }
    if ((a.auroraDarkness || 0) >= 60 && ((a.influence || 0) >= 50 || (a.rivalry || 0) >= 50)) {
      list.push({ id: "end_espiral_mutua_thriller", label: "♟️🖤 Ver Final 12/16: Dois Manipuladores no 4º Andar" });
    }
    if ((a.traumaLevel || 0) >= 60 || (a.mentalStability !== undefined && a.mentalStability <= 22)) {
      list.push({ id: "end_trauma_irreversivel", label: "💔 Ver Final 13/16: Vidro Quebrado no Corredor" });
    }
    if (s.memories.some((m) => m.id === "resgate_emocional_sincero") && (a.mentalStability !== undefined && a.mentalStability >= 70) && a.trust >= 50) {
      list.push({ id: "end_redencao_da_espiral", label: "🌅 Ver Final 14/16: Resgate do Abismo" });
    }
    if ((a.intimacyLevel || 0) >= 80 && (a.vulnerability || 0) >= 55 && (a.mentalStability !== undefined && a.mentalStability >= 65)) {
      list.push({ id: "end_entrega_completa_404", label: "💞 Ver Final 16/16: Entrega de Corpo e Alma no 404" });
    }
    if ((a.rivalry || 0) >= 40 && a.affinity >= 50 && a.discomfort < 25) {
      list.push({ id: "end_parceiros_de_caos", label: "🍾 Ver Final 15/16: Caos, Drinks & Risadas Sem Filtro" });
    }
    if ((a.rivalry || 0) >= 65 && a.heat >= 40) {
      list.push({ id: "end_rivais_eletricos", label: "⚔️ Ver Final 9/16: Guerra Fria & Faíscas (Rivais)" });
    }
    if ((a.influence || 0) >= 70) {
      list.push({ id: "end_mestre_do_xadrez", label: "♟️ Ver Final 10/16: Xeque-Mate na Rainha do 404" });
    }
    if (ph.manipulationCount >= 2) {
      list.push({ id: "end_manipulacao_sombria", label: "⛓️ Ver Final: Relação Forçada & Manipulada" });
    }
    if (a.affinity >= 65 && a.trust >= 50) {
      list.push({ id: "end_chamego_namoro_doce", label: "💗 Ver Final: Minha Mulher Favorita (Chamego)" });
    }
    if (a.heat >= 65 && a.affinity >= 25) {
      list.push({ id: "end_tensao_ardente_madrugada", label: "🔥 Ver Final: Incêndio no 404 (Quente)" });
    }
    if (a.dominance >= 62 || a.dynamic === "teia_de_controle") {
      list.push({ id: "end_teia_de_controle_absoluto", label: "👑 Ver Final: Na Palma da Mão Dela" });
    }
    if (a.affinity >= 55 && a.trust >= 45 && p.workProgress >= 4) {
      list.push({ id: "end_parceiros_caoticos_sucesso", label: "🌟 Ver Final Verdadeiro: Estúdio 402+404" });
    }
    if (p.soloReliefCount >= 5 || (s.day >= 5 && a.affinity <= 10 && a.dominance < 40)) {
      list.push({ id: "end_distante_solitario", label: "🌫️ Ver Final: Rotinas Desencontradas" });
    }
    return list;
  };
})(window.AuroraGame);
