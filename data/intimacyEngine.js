/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Motor de Intimidade Adulta (18+): cenas íntimas interativas em 5 etapas,
   consentimento ativo (check-in, desacelerar, parar), preferências que você
   descobre jogando, pós-cena (aftercare) e diário de intimidade.
   Aurora é uma mulher adulta (22 anos). Tudo é consensual e sensual/literário.
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  const I = {};

  const STAGE_NAMES = ["Aproximação", "Aquecimento", "Intensidade", "Entrega", "Depois"];
  const STYLE_LABEL = {
    lento: "ritmo lento e atento",
    ousado: "iniciativa ousada",
    conduzida: "deixar ela conduzir",
    provocacao: "jogo de provocação",
    cuidado: "cuidado e cumplicidade"
  };

  function st() {
    const s = AG.state;
    s.intimacy = s.intimacy || { sessions: 0, discovered: {}, checkins: 0, stops: 0, log: [] };
    s.intimacy.discovered = s.intimacy.discovered || {};
    s.intimacy.log = s.intimacy.log || [];
    return s.intimacy;
  }

  function pick(key, arr) {
    if (AG.DeepDialogue && AG.DeepDialogue.pickVariant) return AG.DeepDialogue.pickVariant(key, arr);
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function fam() {
    return AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(AG.state.aurora.mood) : "luminosa";
  }

  function intense() {
    const t = AG.state.settings && AG.state.settings.intimacyTone;
    return t !== "suave";
  }

  // Preferência dela (oculta) — você descobre observando as reações
  I.getHerPreference = function () {
    const a = AG.state.aurora;
    if (a.dominance >= 45) return "conduzida";
    if ((a.rivalry || 0) >= 38) return "provocacao";
    if ((a.vulnerability || 0) >= 38 || (a.mentalStability !== undefined && a.mentalStability <= 60)) return "lento";
    if (a.heat >= 60) return "ousado";
    return "cuidado";
  };

  // ------------------------------------------------------------------------
  // Condições (consenso estrito + local privado + presença via AG.Gates)
  // ------------------------------------------------------------------------
  I.canStart = function () {
    if (AG.Gates && AG.Gates.check) {
      return AG.Gates.check("intimate_18").ok;
    }
    const s = AG.state;
    const a = s.aurora;
    const privateLoc = s.currentLocation === "ape_404" || s.currentLocation === "ape_402";
    return (
      AG.isAuroraHere() &&
      a.activity !== "dormindo" &&
      privateLoc &&
      ((a.intimacyLevel || 0) >= 46 || (a.heat >= 42 && a.affinity >= 22) || (a.heat >= 50 && (a.intimacyLevel || 0) >= 26)) &&
      a.discomfort < 32 &&
      (!s.phoneState || s.phoneState.manipulationCount === 0) &&
      (a.leveragePressure || 0) < 25
    );
  };

  I.getBlockReason = function () {
    if (AG.Gates && AG.Gates.check) {
      return AG.Gates.check("intimate_18");
    }
    return { ok: I.canStart(), missing: "" };
  };

  // ------------------------------------------------------------------------
  // Textos auxiliares: clima emocional dela e intensidade extra
  // ------------------------------------------------------------------------
  const FAM_FLAVOR = {
    luminosa: [
      "Ela ri baixinho entre um beijo e outro, leve, como quem não quer que o momento acabe.",
      "Há um brilho solto no olhar dela, de quem está exatamente onde quer estar."
    ],
    quimica: [
      "A respiração dela já está curta antes mesmo de você fazer o próximo movimento.",
      "O calor entre vocês tem peso próprio; cada centímetro de pele que se encosta parece acender mais um pouco."
    ],
    caotica: [
      "Ela alterna riso nervoso e fôlego curto, transformando a tensão numa brincadeira que escorrega pra algo bem mais sério.",
      "A energia elétrica dela se converte em pura atenção em você — e isso é ainda mais intenso."
    ],
    vulneravel: [
      "Ela segura o seu olhar um segundo a mais, como se pedisse sem palavras para você ir com cuidado.",
      "Dá pra sentir que ela está se permitindo entregar algo importante — e isso pede delicadeza."
    ],
    conflito: [
      "A tensão que havia entre vocês antes vira combustível: ela beija como quem resolve uma discussão com o corpo.",
      "O orgulho dela resiste meio segundo e depois cede, rendido."
    ],
    sombria: [
      "Há algo de magnético e perigoso no jeito calmo como ela te guia, sem pressa e sem desviar o olhar.",
      "O sorriso dela é de quem sabe exatamente o efeito que causa."
    ]
  };

  const EXTRA_INTENSE = {
    lento: [
      "Vocês se descobrem devagar, mãos que memorizam cada curva, beijos que se estendem até o ar do quarto parecer mais quente que o resto do prédio.",
      "O ritmo é tão lento que cada toque vira um pequeno acontecimento — a pele dela arrepia onde seus dedos passam."
    ],
    ousado: [
      "Você assume a iniciativa sem hesitar, e ela responde na mesma medida, puxando você pela gola como quem aprova cada decisão.",
      "A pegada firme e segura arranca dela um suspiro que não tenta esconder, e as mãos pequenas apertam seus ombros pedindo mais."
    ],
    conduzida: [
      "Ela toma o ritmo para si com um sorriso de dona da situação, e você descobre como é bom obedecer ao compasso dela.",
      "As mãos dela te guiam, os olhos dela te seguram, e o controle que ela exerce tem o gosto exato de um convite."
    ],
    provocacao: [
      "Cada quase-toque vira uma pequena tortura deliciosa; os dois sorriem, ofegantes, esperando quem cede primeiro.",
      "A tensão estica até o limite e, quando finalmente se encostam de novo, o alívio é quase um riso de rendição."
    ],
    cuidado: [
      "Entre um beijo e outro vocês trocam olhares cúmplices que dizem mais do que qualquer frase — conforto e desejo no mesmo gesto.",
      "Há risadas baixas, mãos entrelaçadas e uma entrega calma que deixa tudo ainda mais intenso."
    ]
  };

  // Reações profundas exclusivas quando você acerta a preferência oculta dela
  const FAVORITE_MATCH_LINES = {
    lento: [
      "Você nem imagina o quanto esse ritmo devagar mexe comigo... Quando você toca sem pressa, ouvindo cada suspiro meu, parece que o mundo inteiro lá fora apaga e só existe o calor das suas mãos em mim.",
      "É exatamente assim que eu perco todas as defesas — sem pressa, sentindo cada segundo na pele. Você leu minha cabeça inteira hoje, 402."
    ],
    ousado: [
      "Quando você chega com essa pegada firme e decidida, minhas pernas literalmente desistem de obedecer... Eu amo quando você não hesita e mostra na prática o quanto me quer agora.",
      "Era exatamente essa intensidade que tava faltando pra minha cabeça parar de pensar em tudo! Continua me segurando firme assim, 402."
    ],
    conduzida: [
      "Você não faz ideia do fogo que acende em mim quando você confia o ritmo inteiro nas minhas mãos... Ver você se entregar pro meu comando assim me deixa completamente elétrica.",
      "Eu sabia que você ia entender o quanto eu adoro conduzir a gente — e você obedece de um jeito que só me dá vontade de ir ainda mais fundo."
    ],
    provocacao: [
      "Esse seu joguinho de provocar até o limite me deixa louca de um jeito absurdo... Cada vez que você quase encosta e segura o sorriso, meu corpo inteiro pede mais.",
      "Você descobriu exatamente o gatilho que me tira do eixo — essa tensão no fio da navalha é o meu ponto fraco favorito."
    ],
    cuidado: [
      "É esse cuidado misturado com desejo que faz você ser diferente de tudo que eu já vivi... Me sinto tão segura nos seus braços que consigo me entregar inteira sem nenhum medo.",
      "Ninguém nunca misturou carinho e intensidade com tanta naturalidade quanto você — meu coração tá batendo junto com o seu agora."
    ]
  };

  // Camada literária extra por etapa + tom (intenso vs suave) para cenas de 3 parágrafos
  const STAGE_DEPTH_PARAGRAPHS = {
    0: {
      intenso: [
        "Ela aproxima o rosto até as respirações se misturarem por completo, os dedos deslizando devagar da sua camisa até a sua nuca como se estivesse memorizando o calor da sua pele.",
        "O silêncio do quarto parece amplificar cada batida acelerada no peito dela — o olhar de baixo pra cima não esconde mais nenhuma parcela da vontade acumulada."
      ],
      suave: [
        "Ela sorri pequeno entre um suspiro e outro, deixando a testa encostar de leve na sua enquanto o clima do quarto fica cada vez mais acolhedor e próximo.",
        "O ritmo calmo dá espaço para vocês dois se olharem de verdade, sem pressa alguma para apressar o que está nascendo ali."
      ]
    },
    1: {
      intenso: [
        "Um arrepio contínuo percorre os ombros dela sob seus dedos; ela solta o ar quente perto da sua orelha, puxando você ainda mais fundo para dentro do espaço dela.",
        "Cada toque acende uma resposta imediata no corpo dela — os lábios entreabertos, a pele quente sob a meia-luz e os dedos apertando seus ombros sem querer soltar."
      ],
      suave: [
        "A proximidade ganha uma fluidez natural; as mãos dela encontram as suas sem timidez, aproveitando o calor tranquilo que tomou conta do quarto.",
        "Entre toques lentos e sorrisos cúmplices, a última barreira de timidez dela desaparece completamente."
      ]
    },
    2: {
      intenso: [
        "O quarto inteiro parece encolher até sobrar apenas o ritmo das respirações curtas, o calor compartilhado e os olhos dela presos nos seus sem qualquer filtro restante.",
        "A voz dela sai num murmúrio entrecortado contra a sua pele, entregando na mesma medida urgência, confiança e um desejo impossível de disfarçar."
      ],
      suave: [
        "A sintonia entre vocês atinge um ponto raro onde cada gesto encontra resposta imediata, unindo intensidade emocional e delicadeza no mesmo compasso.",
        "Ela mantém o olhar conectado ao seu, deixando claro na expressão serena e apaixonada o quanto confia em você."
      ]
    },
    3: {
      intenso: [
        "Quando o fôlego finalmente volta aos poucos, o corpo pequeno dela continua colado no seu, quente e tremendo de leve enquanto ela ri baixinho contra o seu pescoço.",
        "Os dedos dela continuam entrelaçados nos seus com força mansa, saboreando o eco longo daquela entrega sem nenhuma vontade de sair dali."
      ],
      suave: [
        "Aos poucos o batimento cardíaco dos dois volta a um ritmo calmo, deixando no ar aquela sensação rara de plenitude e paz compartilhada.",
        "Ela suspira satisfeita contra o seu peito, completamente relaxada nos seus braços sob a luz suave."
      ]
    },
    4: {
      intenso: [
        "Sob o lençol quente, ela encosta os pés frios nos seus de propósito e solta uma risadinha preguiçosa, os olhos brilhando com a cumplicidade de quem acabou de viver uma noite inesquecível.",
        "Ela passa a ponta dos dedos devagar pelo contorno do seu rosto na meia-luz, já guardando cada detalhe dessa noite na memória favorita dela."
      ],
      suave: [
        "A calma depois do carinho parece preencher o apartamento inteiro — sem pressa, sem máscaras, apenas vocês dois dividindo o mesmo abrigo.",
        "Ela fecha os olhos por um instante encostada no seu ombro, sorrindo com a serenidade de quem se sente finalmente em casa."
      ]
    }
  };

  const REPEAT_SESSION_OPENERS = [
    "Engraçado como depois da última noite juntos eu nem preciso mais disfarçar o quanto eu te quero — só de ouvir a porta trancar meu coração já lembra do seu ritmo.",
    "A gente já conhece tão bem o caminho até aqui agora... e mesmo assim você continua conseguindo deixar minhas mãos tremendo só de me olhar desse jeito."
  ];

  // ------------------------------------------------------------------------
  // Escolhas por etapa
  // ------------------------------------------------------------------------
  const CHOICES = {
    0: [
      {
        id: "ab_beijo_lento", style: "lento", tone: "sweet",
        label: "Segurar o rosto dela e beijar devagar, sem nenhuma pressa",
        deltas: { heat: 10, arousal: 12, intimacyLevel: 8, affinity: 6, composure: -8 },
        beat: "Você trava a porta com um estalo baixo, segura o rosto dela com as duas mãos e deixa o beijo começar lento, quase em câmera lenta, até a respiração dos dois encontrar o mesmo compasso.",
        act: "Ela fecha os olhos e se inclina na ponta dos pés, os dedos cravados na sua camisa, retribuindo cada pausa com um suspiro.",
        speech: [
          "Hm... assim, devagar desse jeito, eu esqueço até o nome do prédio.\n\nNão tem relógio hoje, tem? Então não tem pressa nenhuma — continua olhando pra mim desse jeito.",
          "Você beija como quem tem a noite inteira... e eu tô começando a achar que tenho mesmo.\n\nNão para agora, 402."
        ]
      },
      {
        id: "ab_encostar", style: "ousado", tone: "hot",
        label: "Encostá-la contra a parede com firmeza e tomar o beijo",
        deltas: { heat: 14, arousal: 14, intimacyLevel: 8, composure: -12, personaBold: 2 },
        beat: "Você a conduz até encostar as costas dela na parede, apoia a mão ao lado do rosto dela e fecha a distância num beijo firme que deixa claro o quanto você quis isso o dia inteiro.",
        act: "Aurora solta um ofego surpreso e logo agarra a sua gola com as duas mãos, puxando você para baixo para retribuir com a mesma intensidade.",
        speech: [
          "Você não perde tempo, né?! ...Ainda bem que eu também não.\n\nSegura mais firme aqui na cintura que eu tô perdendo o equilíbrio e a vergonha ao mesmo tempo.",
          "Que pegada... minhas pernas ficaram bambas no primeiro segundo.\n\nSe a ideia era me deixar sem argumentos, parabéns — ganhou."
        ]
      },
      {
        id: "ab_ela_comanda", style: "conduzida", tone: "ctrl",
        label: "Sentar e dizer baixo: 'Hoje quem decide cada passo é você'",
        deltas: { heat: 12, arousal: 12, intimacyLevel: 8, dominance: 6, composure: -8 },
        beat: "Você se recosta com calma, abre um meio sorriso e fala olhando nos olhos dela: — Hoje eu sigo o seu ritmo. Mostra o que você quer.",
        act: "Um sorriso lento e confiante surge no rosto dela; Aurora sobe devagar no seu colo e segura o seu queixo, escolhendo exatamente onde começar.",
        speech: [
          "Você acabou de me dar o controle e sorriu como se soubesse o que ia acontecer...\n\nPois fica quietinho e deixa o resto comigo.",
          "Gosto desse seu lado que sabe entregar a vez.\n\nAgora aguenta, porque eu vou aproveitar cada segundo disso."
        ]
      },
      {
        id: "ab_provocar", style: "provocacao", tone: "ctrl",
        label: "Parar a um dedo da boca dela e provocar até ela pedir",
        deltas: { heat: 12, arousal: 16, influence: 6, composure: -12, rivalry: 4 },
        beat: "Você fica a um dedo da boca dela, respirando o mesmo ar, e sustenta o silêncio, deixando o olhar descer e subir devagar sem encostar.",
        act: "Aurora aperta os lábios, indignada e ofegante, os dedos puxando a sua camisa para ver se você cede primeiro.",
        speech: [
          "Você é uma tortura... Acaba logo isso antes que eu perca o resto da paciência!\n\nEu juro que vou me vingar, mas só depois que você me beijar.",
          "Tá bom, tá bom, você ganhou essa rodada: me beija!\n\nE se sorrir de novo desse jeito eu mordo."
        ]
      },
      {
        id: "ab_checkin", style: "cuidado", tone: "sweet", checkin: true,
        label: "Perguntar baixinho se ela está confortável e o que ela quer",
        deltas: { trust: 8, affinity: 6, vulnerability: 8, intimacyLevel: 4, discomfort: -6 },
        beat: "Você encosta a testa na dela e pergunta num sussurro: — Tá tudo bem pra você? Me diz o que você quer — e o que não quer — que eu sigo.",
        act: "Ela abre os olhos devagar, surpresa e comovida com o cuidado, e acaricia o seu rosto com o polegar.",
        speech: [
          "Você parou pra perguntar... isso me derrete mais do que qualquer beijo.\n\nTá tudo bem, de verdade. Eu quero isso, quero você — e se eu mudar de ideia, eu falo, combinado?",
          "Ninguém nunca tinha me perguntado isso antes de começar.\n\nTô confortável. E mais ainda agora, sabendo que posso falar a qualquer momento."
        ]
      }
    ],
    1: [
      {
        id: "aq_pescoco", style: "lento", tone: "hot",
        label: "Descer os beijos devagar pelo pescoço e pela clavícula",
        deltas: { heat: 12, arousal: 16, intimacyLevel: 10, composure: -12 },
        beat: "Você afasta o cabelo dela com as costas dos dedos e deixa os lábios percorrerem o pescoço e a clavícula em beijos lentos, medindo cada arrepio.",
        act: "Aurora inclina a cabeça para o lado, entregando o pescoço, e solta um suspiro longo com as mãos subindo pela sua nuca.",
        speech: [
          "Aí... exatamente aí. Você descobriu meu ponto fraco em dois minutos e ainda se faz de inocente.\n\nNão para, por favor. Eu tô derretendo.",
          "Seu hálito no meu pescoço me deixa toda arrepiada...\n\nContinua assim, bem devagar, que eu não quero que isso acabe."
        ]
      },
      {
        id: "aq_cintura", style: "ousado", tone: "hot",
        label: "Puxar a cintura dela contra o seu corpo e erguê-la até a sua altura",
        deltas: { heat: 14, arousal: 16, intimacyLevel: 10, composure: -14, personaBold: 2 },
        beat: "Você firma as mãos na cintura dela e a ergue com facilidade até os lábios dos dois ficarem na mesma altura, o corpo pequeno dela encaixando por inteiro no seu.",
        act: "Ela enlaça o seu pescoço com os braços e a cintura com as pernas, soltando uma risada sem fôlego antes de voltar a te beijar.",
        speech: [
          "Você me pegou no colo como se eu não pesasse nada...\n\nAgora me carrega até onde você quiser, mas não para de me beijar.",
          "Eu falo mal da diferença de altura toda hora — retiro tudo.\n\nDo seu colo, o mundo é bem melhor."
        ]
      },
      {
        id: "aq_ela_guia", style: "conduzida", tone: "ctrl",
        label: "Deixar as mãos dela guiarem as suas e seguir cada comando",
        deltas: { heat: 14, arousal: 16, intimacyLevel: 10, dominance: 6, composure: -10 },
        beat: "Você segue as mãos dela quando ela guia as suas pela própria cintura, sem forçar nada, obedecendo cada pausa e cada pedido sussurrado.",
        act: "Aurora sorri, vitoriosa e excitada, conduzindo o ritmo com os olhos fixos nos seus.",
        speech: [
          "Assim mesmo... bem obediente, olhando pra mim.\n\nVocê não tem ideia do quanto eu gosto de ter você exatamente assim.",
          "Esse jeito de me deixar mandar é perigosamente atraente.\n\nMais um pouco e eu não vou querer devolver o controle."
        ]
      },
      {
        id: "aq_tensao", style: "provocacao", tone: "ctrl",
        label: "Roçar os dedos e os lábios sem completar, deixando a tensão crescer",
        deltas: { heat: 12, arousal: 20, influence: 8, composure: -16 },
        beat: "Você percorre a pele dela com a ponta dos dedos e dos lábios sem nunca completar o gesto, recuando um milímetro cada vez que ela tenta fechar a distância.",
        act: "Aurora fecha os punhos na sua camisa, ofegante e rindo de nervoso, com os olhos escuros de impaciência.",
        speech: [
          "Você tá fazendo de propósito, eu sei que tá!\n\nSe continuar me enrolando, eu mesma assumo o comando.",
          "Meu coração nunca bateu tão forte na vida...\n\nTermina logo o que você começou ou eu termino por você."
        ]
      },
      {
        id: "aq_carinho", style: "cuidado", tone: "sweet",
        label: "Trocar beijos lentos e risadas, abraçando-a com carinho",
        deltas: { affinity: 10, trust: 8, intimacyLevel: 10, heat: 8, arousal: 10 },
        beat: "Você desacelera de propósito, ri junto com ela de uma bobagem qualquer e a abraça forte, beijando o topo da cabeça, a testa e depois a boca.",
        act: "Ela relaxa por completo no seu abraço, rindo baixinho e afundando o rosto no seu pescoço.",
        speech: [
          "Adoro que com você até o calor tem espaço pra risada.\n\nMe sinto segura de um jeito que eu nem sabia que dava.",
          "Fica assim mais um pouco... esse abraço é perfeito.\n\nDepois a gente continua do ponto que você quiser."
        ]
      },
      {
        id: "aq_checkin", style: "cuidado", tone: "sweet", checkin: true,
        label: "Desacelerar e perguntar se o ritmo está bom pra ela",
        deltas: { trust: 8, affinity: 6, vulnerability: 8, discomfort: -6 },
        beat: "Você diminui o ritmo, segura o rosto dela e pergunta com calma: — Tá bom assim? Quer que eu vá mais devagar ou mais rápido?",
        act: "Ela sorri agradecida, com os olhos úmidos de carinho, e beija a palma da sua mão.",
        speech: [
          "Tá perfeito... e eu adoro que você pergunte.\n\nSe eu quiser mudar alguma coisa eu falo, prometo. Pode continuar.",
          "Mais devagar é bom. Mais rápido... depois.\n\nObrigada por se importar com o que eu sinto."
        ]
      }
    ],
    2: [
      {
        id: "in_ritmo", style: "lento", tone: "hot",
        label: "Manter um ritmo lento e atento a cada reação dela",
        deltas: { heat: 14, arousal: 18, intimacyLevel: 12, affinity: 8, composure: -14 },
        beat: "Você mantém um ritmo lento e intenso, atento a cada suspiro e a cada aperto das mãos dela, ajustando o toque conforme ela pede.",
        act: "Aurora arqueia as costas e aperta os seus ombros, murmurando seu nome sem se preocupar em disfarçar.",
        speech: [
          "Assim... bem assim. Você presta atenção em tudo, né?\n\nEu nunca me senti tão... lida por alguém.",
          "Continua nesse ritmo, por favor. Meu corpo inteiro tá pedindo mais disso.\n\nVocê me deixa sem palavras."
        ]
      },
      {
        id: "in_fogo", style: "ousado", tone: "hot",
        label: "Aumentar a intensidade com pegada firme e olhar de cima",
        deltas: { heat: 18, arousal: 22, intimacyLevel: 12, composure: -18, personaBold: 3 },
        beat: "Você aumenta a intensidade com firmeza segura, sustentando o olhar dela de cima enquanto as mãos puxam o corpo dela cada vez mais perto.",
        act: "Ela morde o lábio inferior, as pernas apertando a sua cintura, e responde com um gemido baixo de aprovação.",
        speech: [
          "Isso... não para agora, 402. Eu tô quase perdendo o controle de tudo.\n\nVocê me deixa sem fôlego e eu adoro cada segundo.",
          "Você não tem ideia do que essa pegada faz comigo...\n\nMais um pouco e eu esqueço até o meu nome."
        ]
      },
      {
        id: "in_ela_por_cima", style: "conduzida", tone: "ctrl",
        label: "Deixar ela assumir o comando total e acompanhar o ritmo dela",
        deltas: { heat: 18, arousal: 22, intimacyLevel: 12, dominance: 8, composure: -14 },
        beat: "Você se entrega ao ritmo dela, deixando que ela decida cada movimento, enquanto as suas mãos apenas sustentam e acompanham.",
        act: "Aurora assume o comando com confiança, segurando o seu rosto e ditando o compasso com o olhar preso no seu.",
        speech: [
          "Olha só pra você... entregue assim, deixando eu mandar em tudo.\n\nVou cuidar muito bem de você, prometo.",
          "Eu adoro ter esse controle com você... é diferente de tudo.\n\nNão desvia o olhar, quero ver cada reação sua."
        ]
      },
      {
        id: "in_quase", style: "provocacao", tone: "ctrl",
        label: "Levá-la até a beira e recuar de propósito, sorrindo",
        deltas: { heat: 14, arousal: 26, influence: 10, composure: -20, rivalry: 4 },
        beat: "Você a leva até a beira da tensão e recua no último segundo, sorrindo calmo enquanto observa a frustração deliciosa dela.",
        act: "Aurora solta um gemido indignado e puxa o seu rosto com as duas mãos, ofegante e corada até as orelhas.",
        speech: [
          "Você é cruel!! Me deixa no limite e ainda sorri?!\n\nVolta aqui agora, ou eu mesma vou resolver isso.",
          "Eu juro que vou me vingar... mas primeiro volta aqui.\n\nEu preciso de você, agora."
        ]
      },
      {
        id: "in_cumplice", style: "cuidado", tone: "sweet",
        label: "Entrelaçar as mãos nas dela e manter os olhos nos dela o tempo todo",
        deltas: { affinity: 12, trust: 10, intimacyLevel: 14, heat: 12, arousal: 16, vulnerability: 8 },
        beat: "Você entrelaça os dedos nos dela e mantém os olhos presos aos seus durante todo o momento, sussurrando o quanto ela é linda.",
        act: "Os olhos dela se enchem de emoção e desejo ao mesmo tempo, e ela aperta suas mãos com força.",
        speech: [
          "Você me olha desse jeito... e eu me sinto a pessoa mais importante do mundo.\n\nNão solta minha mão, por favor.",
          "Com você eu não preciso fingir nada. É tão bom poder só sentir.\n\nFica comigo assim."
        ]
      },
      {
        id: "in_checkin", style: "cuidado", tone: "sweet", checkin: true,
        label: "Parar um instante e perguntar se ela quer continuar",
        deltas: { trust: 10, affinity: 6, vulnerability: 8, discomfort: -8 },
        beat: "Você para por um instante, encosta a testa na dela e pergunta com ternura: — Quer continuar assim? Podemos parar ou mudar o que você quiser.",
        act: "Ela ri, emocionada, e te puxa para um beijo curto e doce antes de responder.",
        speech: [
          "Quero continuar. Quero muito. E gostei ainda mais de você ter perguntado.\n\nSe eu pedir pra parar, eu sei que você vai parar. Isso me deixa livre pra querer tudo.",
          "Sim. Continua. Eu confio em você.\n\nSó o fato de você perguntar torna tudo melhor."
        ]
      }
    ],
    3: [
      {
        id: "cl_lento", style: "cuidado", tone: "sweet",
        label: "Chegar ao ápice juntos, devagar, sussurrando o nome dela",
        deltas: { heat: 14, arousal: -30, intimacyLevel: 18, affinity: 14, trust: 12, desire: -45 },
        beat: "Você sussurra o nome dela, sustentando o ritmo lento e olhando nos olhos dela até os dois se perderem no mesmo instante.",
        act: "Ela se agarra a você com um suspiro trêmulo, escondendo o rosto no seu pescoço enquanto o corpo todo relaxa devagar.",
        speech: [
          "Meu Deus, 402... eu nem consigo achar palavras pra descrever o que acabou de acontecer aqui. Sentir você olhando nos meus olhos desse jeito bem na hora em que eu perdi o chão foi absurdo.\n\nFica colado em mim assim mais um pouco, por favor. Não solta minha mão agora.",
          "Foi perfeito... perfeito de verdade, do começo até o último suspiro. Eu nunca tinha me sentido tão inteira e tão segura ao mesmo tempo nos braços de alguém.\n\nMe abraça forte, porque meu corpo inteiro ainda tá tremendo encostado no seu."
        ]
      },
      {
        id: "cl_intenso", style: "ousado", tone: "hot",
        label: "Intensificar até o limite e deixar a noite explodir",
        deltas: { heat: 18, arousal: -35, intimacyLevel: 18, affinity: 10, desire: -55, personaBold: 3 },
        beat: "Você leva o momento ao limite com firmeza e intensidade, até a tensão acumulada explodir num instante só, com os dois se agarrando um ao outro.",
        act: "Aurora cobre a boca com a mão para abafar um grito de prazer, os olhos fechados e o corpo todo tremendo contra o seu.",
        speech: [
          "Caramba... eu juro que vi estrelas, o teto e o quarto andar inteiro girar ao mesmo tempo! Você perdeu qualquer noção de limite hoje e eu não conseguiria reclamar nem se quisesse.\n\nVocê me desmontou inteira de um jeito maravilhoso — minhas mãos ainda nem pararam de tremer.",
          "Que noite absurda... minhas pernas viraram completamente gelatina e meu coração tá batendo na minha garganta até agora!\n\nMe dá dois minutos abraçada em você pra eu lembrar de novo como é que se respira direito, 402."
        ]
      },
      {
        id: "cl_ela_decide", style: "conduzida", tone: "ctrl",
        label: "Deixar ela decidir o momento exato, acompanhando cada sinal",
        deltas: { heat: 16, arousal: -32, intimacyLevel: 18, dominance: 6, affinity: 12, desire: -50 },
        beat: "Você segue exatamente o ritmo dela, deixando que ela decida cada instante, até ela te puxar pela nuca com um olhar que diz que chegou a hora.",
        act: "Aurora se entrega ao próprio ritmo com um suspiro profundo, apertando você contra si com força.",
        speech: [
          "Eu sonhei exatamente com isso... sentir cada segundo no meu compasso, com você totalmente entregue aos meus sinais e me acompanhando sem desviar o olhar.\n\nObrigada por confiar o ritmo inteiro nas minhas mãos — nunca me senti tão desejada assim.",
          "Foi exatamente do jeito que eu queria, sem tirar nem pôr uma única respiração... Ver você respondendo a cada gesto meu me deixou completamente rendida no final.\n\nNão sai daqui de perto não, tá? Fica comigo mais um bom tempo."
        ]
      }
    ],
    4: [
      {
        id: "af_abraco", style: "cuidado", tone: "sweet",
        label: "Abraçar ela apertado e ficar em silêncio, ouvindo a respiração",
        deltas: { affinity: 14, trust: 14, vulnerability: 12, calm: 12, intimacyLevel: 8, discomfort: -10 },
        beat: "Você a puxa para o seu peito, cobre os dois com o lençol e fica quieto, sentindo a respiração dela desacelerar contra a sua pele.",
        act: "Ela aninha a cabeça no seu ombro e desenha círculos preguiçosos no seu peito com a ponta do dedo.",
        speech: [
          "Eu adoro esse silêncio gostoso que fica com você depois... não tem pressa nenhuma de levantar, nem necessidade de preencher o ar com conversa fiada.\n\nSó ficar aqui ouvindo o seu coração voltar pro compasso calmo embaixo do meu ouvido já faz a noite inteira valer ouro.",
          "Fica mais um tempinho aqui comigo embaixo desse lençol... eu juro que não quero levantar nunca mais hoje.\n\nObrigada por cuidar de mim com tanto carinho depois também — é isso que faz você ser insubstituível."
        ]
      },
      {
        id: "af_conversa", style: "cuidado", tone: "sweet",
        label: "Conversar baixinho sobre o que ela mais gostou",
        deltas: { affinity: 12, trust: 14, vulnerability: 14, intimacyLevel: 10, charisma: 1 },
        beat: "Você pergunta baixinho, de brincadeira, o que ela mais gostou — e o que quer repetir ou fazer diferente da próxima vez.",
        act: "Ela fica vermelha, esconde o rosto no travesseiro e depois confessa tudo rindo, sem filtro.",
        speech: [
          "Você faz cada pergunta direta logo depois de me deixar sem fôlego!! Tá bom, eu conto... mas só porque eu confio completamente em você.\n\nA verdade é que eu amei cada segundo — especialmente quando você leu meu ritmo sem eu precisar explicar. E pra próxima noite eu já tenho umas ideias ainda melhores guardadas aqui.",
          "Eu amo que a gente consiga sair de uma noite tão intensa e conversar sobre tudo rindo sem vergonha nenhuma.\n\nSe tiver qualquer detalhe que você gostou mais ou queira experimentar comigo na próxima, me conta sem filtro também, combinado?"
        ]
      },
      {
        id: "af_brincar", style: "provocacao", tone: "hot",
        label: "Provocar de leve, rindo, enquanto vocês recuperam o fôlego",
        deltas: { affinity: 12, heat: 8, rivalry: 6, intimacyLevel: 8, trust: 8 },
        beat: "Você sorri de canto e solta uma provocação baixinha sobre o quanto ela se rendeu rápido, desafiando-a a repetir.",
        act: "Aurora joga o travesseiro na sua cara, rindo e corada, mas sem se afastar um centímetro.",
        speech: [
          "Convencido demais!! Quem foi que ficou sem voz no meio da cena, hein?! Eu não lembro de ter me rendido tão rápido assim não!\n\n...Tá bom, talvez eu tenha derretido um pouquinho — mas só porque você caprichou muito além da conta hoje, 402.",
          "Rindo de mim bem agora que minhas pernas nem respondem direito?! Pois anota aí que na próxima rodada eu vou me vingar com juros e correção!\n\nAgora para de rir e vem logo me abraçar aqui perto, seu abusado."
        ]
      }
    ]
  };

  // ------------------------------------------------------------------------
  // API
  // ------------------------------------------------------------------------
  I.start = function () {
    const s = AG.state;
    const a = s.aurora;
    if (!I.canStart()) return false;
    AG.playSound("hot");
    AG.advanceTime(10, { suppressRandom: true, keepSpecialScene: true });
    s.activeConversationNode = null;
    s.activeDeepScene = null;
    s.activeIntimateScene = { stage: 0, checked: false, paused: 0, styles: [], steps: 0 };
    s.aurora.activeSpecialSceneKey = a.wearingUniform ? "nsfwUniforme" : "noite404";

    const f = fam();
    const flavor = pick("intim_flavor_" + f, FAM_FLAVOR[f] || FAM_FLAVOR.luminosa);

    let openerBeat = "A porta está trancada, o celular no silencioso, e a luz baixa deixa o quarto com cara de refúgio. Você se aproxima devagar, esperando ela marcar o ritmo do primeiro passo.";
    let openerSpeech = "Eu pensei nisso o dia inteiro, sabia?\n\nMas tem uma regra: se eu falar 'pausa', a gente para na hora e vira só abraço. Combinado? ...Agora vem aqui.";

    if (a.wearingUniform) {
      openerBeat = "Você tranca a porta atrás de vocês enquanto ela ainda está com o uniforme ajustado do Café Sakura e o laço do avental frouxo na cintura. Só a luz baixa ilumina o rubor subindo pelo pescoço dela.";
      openerSpeech = "Você não tirou os olhos desse uniforme o dia inteiro — então eu não tirei ele antes de entrar aqui.\n\nCombinado de sempre: qualquer 'pausa' vira abraço na hora. Agora me mostra o que você tava segurando até aqui.";
    } else if (s.weather === "chuva_noturna") {
      openerBeat = "A chuva bate constante contra o vidro enquanto a luminária baixa aquece o quarto inteiro. Você puxa a cortina e chega perto dela, o calor da pele dela contrastando com o frio lá de fora.";
      openerSpeech = "Chuva forte lá fora, luz baixa aqui dentro e a porta trancada... não existe desculpa melhor pra gente esquecer do mundo.\n\nSe eu pedir pausa a gente desacelera na hora, combinado? Vem cá pra perto de mim.";
    } else if (s.currentLocation === "ape_404") {
      openerBeat = "No cantinho particular dela no 404, o monitor já apagou e só o abajur quente ao lado da cama fica aceso. O perfume de baunilha e pele quente enche o espaço quando ela dá um passo pra você.";
      openerSpeech = "Aqui no meu 404 ninguém atrapalha — e eu tô morrendo de vontade de ter você sem pressa hoje.\n\nRegra nossa: se eu falar pausa a gente só fica abraçado. Fechado? Então chega mais perto, 402.";
    } else {
      openerBeat = "No seu Apê 402, a porta fecha com um estalo baixo e o silêncio do corredor some. Ela apoia as mãos no seu peito olhando de baixo pra cima, com a respiração curta e um sorriso sem filtro.";
      openerSpeech = "Eu atravessei o corredor pensando só nesse momento, sabia?\n\nSe eu pedir pausa a gente para e fica só no abraço, combinado? ...Agora não me faz esperar mais.";
    }

    const it = st();
    if (it.sessions >= 1) {
      openerSpeech += "\n\n" + pick("intim_repeat_open", REPEAT_SESSION_OPENERS);
    } else {
      const firstNightTone = intense()
        ? "Ela segura a ponta da sua camisa puxando você um centímetro mais perto, os olhos brilhando sob a meia-luz sem nenhum sinal de recuo."
        : "Ela entrelaça os dedos nos seus com um sorriso corado e calmo, confiando totalmente no ritmo que vocês vão criar juntos.";
      openerSpeech += "\n\n" + firstNightTone;
    }

    AG.clearFeed();
    AG.pushFeed({
      type: "aurora",
      playerBeat: openerBeat,
      action: flavor,
      speech: openerSpeech
    });
    AG.saveGame("autosave");
    return true;
  };

  I.getStageName = function () {
    const sc = AG.state.activeIntimateScene;
    return sc ? STAGE_NAMES[sc.stage] : "";
  };

  I.getChoices = function () {
    const sc = AG.state.activeIntimateScene;
    if (!sc) return [];
    const disc = st().discovered || {};
    let list = (CHOICES[sc.stage] || []).filter((c) => !(c.checkin && sc.checked));
    list = list.map((c) => ({
      id: c.id,
      tone: c.tone,
      label: c.label,
      hint: (disc[c.style] && !c.checkin ? "♥ favorita dela · " : "") + STYLE_LABEL[c.style]
    }));
    if (sc.stage < 4) {
      list.push({ id: "int_slow_down", tone: "sweet", label: "Desacelerar e só abraçar por um momento", hint: "reduz o ritmo sem encerrar" });
      list.push({ id: "int_stop", tone: "sweet", label: "Parar aqui e abraçar ela", hint: "encerrar com carinho" });
    }
    return list;
  };

  function finishSession(reason) {
    const s = AG.state;
    const it = st();
    it.sessions += 1;
    it.log.unshift({ day: s.day, time: AG.getFormattedClock(), reason });
    if (it.log.length > 12) it.log = it.log.slice(0, 12);
    s.activeIntimateScene = null;
    s.flags.completedIntimateToday = s.day;
  }

  I.select = function (choiceId) {
    const s = AG.state;
    const a = s.aurora;
    const sc = s.activeIntimateScene;
    if (!sc) return;
    if (!AG.isAuroraHere() || a.activity === "dormindo") { s.activeIntimateScene = null; return; }
    const it = st();

    if (choiceId === "int_stop") {
      AG.playSound("heart");
      it.stops += 1;
      const pills = AG.applyDeltas({ trust: 14, affinity: 10, vulnerability: 10, discomfort: -10, intimacyLevel: 4, mood: "dengosa", specialScene: "chamego" });
      AG.addMemory("parou_com_carinho_" + s.day, "Parou no meio de um momento íntimo quando ela quis desacelerar — e ela sentiu o quanto era respeitada.", "bom", true);
      AG.clearFeed();
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você respira fundo, afasta o rosto e abraça ela com firmeza, sem nenhuma pressa nem cobrança.",
        action: "Ela solta o ar aliviada e sorri com os olhos marejados, aninhando-se no seu peito.",
        speech: "Obrigada por parar sem fazer cara feia. Isso significa mais do que você imagina.\n\nTô com vontade de ficar só assim, abraçada. Pode ser?",
        pills
      });
      finishSession("pausa");
      AG.advanceTime(10, { suppressRandom: true, keepSpecialScene: true });
      AG.saveGame("autosave");
      return;
    }

    if (choiceId === "int_slow_down") {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ trust: 8, vulnerability: 6, discomfort: -6, calm: 6 });
      AG.clearFeed();
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você desacelera, encosta a testa na dela e só respira junto, deixando o calor baixar sem encerrar nada.",
        action: "Ela fecha os olhos e sorri, respirando fundo, relaxando os ombros.",
        speech: "Gostei disso. Um minuto só pra respirar...\n\nQuando eu quiser, eu te falo. Mas é bom saber que posso.",
        pills
      });
      sc.paused = 0;
      AG.advanceTime(5, { suppressRandom: true, keepSpecialScene: true });
      AG.saveGame("autosave");
      return;
    }

    const ch = (CHOICES[sc.stage] || []).find((c) => c.id === choiceId);
    if (!ch) return;

    // Aurora pode pedir pra desacelerar quando está vulnerável e você vai ousado sem check-in
    const vulnerable = fam() === "vulneravel" || (a.mentalStability !== undefined && a.mentalStability <= 55);
    if (ch.style === "ousado" && vulnerable && !sc.checked && sc.stage >= 1) {
      AG.playSound("heart");
      const pills = AG.applyDeltas({ trust: 4, vulnerability: 4 });
      sc.paused += 1;
      AG.clearFeed();
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você parte pra uma pegada mais firme, mas percebe os ombros dela enrijecerem de leve.",
        action: "Aurora segura o seu pulso com delicadeza e balança a cabeça com um sorriso nervoso, sem se afastar.",
        speech: "Ei... mais devagar, tá? Hoje minha cabeça tá meio pesada e eu quero sentir cada coisa direito.\n\nNão é um 'não' pra você — é um 'com calma'. Que tal perguntar como eu tô antes?",
        subtext: "Dica sua: perguntar se ela está confortável (check-in) muda o clima e libera mais entrega.",
        pills
      });
      AG.saveGame("autosave");
      return;
    }

    // Estilo combinando com a preferência dela = reação intensificada + descoberta
    const pref = I.getHerPreference();
    const match = ch.style === pref && !ch.checkin;
    let deltas = Object.assign({}, ch.deltas);
    if (match) {
      Object.keys(deltas).forEach((k) => {
        if (typeof deltas[k] === "number" && deltas[k] > 0 && !["mood", "specialScene"].includes(k)) {
          deltas[k] = Math.round(deltas[k] * 1.25);
        }
      });
      it.discovered[ch.style] = true;
    }
    if (ch.checkin) { sc.checked = true; it.checkins += 1; }

    const specialKey = a.wearingUniform
      ? "nsfwUniforme"
      : ch.style === "conduzida" ? "nsfwControle"
      : sc.stage >= 2 ? (s.currentLocation === "ape_404" ? "nsfw2" : "nsfw1")
      : "noite404";
    deltas.specialScene = specialKey;
    deltas.mood = sc.stage >= 3 ? "entregue" : sc.stage >= 1 ? "excitada_tensa" : "corada_sensivel";

    AG.playSound(ch.tone === "hot" ? "hot" : "heart");
    const pills = AG.applyDeltas(deltas);
    if (ch.style && !ch.checkin) sc.styles.push(ch.style);

    const f = fam();
    const speechMain = pick("intim_sp_" + ch.id, ch.speech);
    let speech = speechMain;
    if (match) {
      const favLine = pick("intim_fav_" + ch.style, FAVORITE_MATCH_LINES[ch.style] || FAVORITE_MATCH_LINES.cuidado);
      speech += "\n\n" + favLine;
    } else if (!ch.checkin) {
      const stagePool = STAGE_DEPTH_PARAGRAPHS[sc.stage] || STAGE_DEPTH_PARAGRAPHS[1];
      const toneArr = intense() ? stagePool.intenso : stagePool.suave;
      const depthLine = pick("intim_depth_" + sc.stage + "_" + (intense() ? "int" : "sua"), toneArr);
      if (depthLine) speech += "\n\n" + depthLine;
    }
    const flavor = pick("intim_flavor_" + f, FAM_FLAVOR[f] || FAM_FLAVOR.luminosa);
    let action = ch.act + " " + flavor;
    if (intense() && !ch.checkin && sc.stage >= 1) {
      action += " " + pick("intim_extra_" + ch.style, EXTRA_INTENSE[ch.style] || EXTRA_INTENSE.cuidado);
    }

    AG.clearFeed();
    AG.pushFeed({
      type: "aurora",
      playerBeat: ch.beat,
      action,
      speech,
      subtext: match ? "Leitura sua: a reação dela foi mais forte que nas outras — você acertou o jeito que ela gosta." : undefined,
      pills
    });

    if (ch.checkin) {
      AG.advanceTime(5, { suppressRandom: true, keepSpecialScene: true });
      AG.saveGame("autosave");
      return;
    }

    sc.steps += 1;
    AG.advanceTime(10, { suppressRandom: true, keepSpecialScene: true });

    if (sc.stage >= 4) {
      const dominant = sc.styles.length
        ? sc.styles.slice().sort((x, y) => sc.styles.filter((v) => v === y).length - sc.styles.filter((v) => v === x).length)[0]
        : "cuidado";
      AG.addMemory(
        "noite_intima_" + s.day,
        `Uma noite íntima e consensual, marcada por ${STYLE_LABEL[dominant]} — e terminada com carinho.`,
        "quente",
        true
      );
      finishSession(dominant);
    } else {
      sc.stage += 1;
    }
    AG.saveGame("autosave");
  };

  I.getSummaryHtmlData = function () {
    const it = st();
    const disc = Object.keys(it.discovered).map((k) => STYLE_LABEL[k]);
    return {
      sessions: it.sessions,
      checkins: it.checkins,
      stops: it.stops,
      discovered: disc,
      log: it.log
    };
  };

  AG.Intimacy = I;
})(window.AuroraGame);
