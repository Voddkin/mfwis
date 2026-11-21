/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Motor de Intimidade Adulta (18+) — VERSÃO REESCRITA (Putaria Nível 2/3 + CNC)
   
   5 etapas com linguagem suja e crua, opções consensuais e CNC,
   dirty talk pesado, height play sexualizado, consequências reais
   (o jogo NÃO trava com escolhas asquerosas ou maravilhosas).
   
   Aurora é mulher adulta (22 anos). CNC só aparece depois de autorização
   explícita dela (flag cncAuthorized). Safeword sempre disponível.
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  const I = {};

  const STAGE_NAMES = ["Aproximação", "Aquecimento", "Intensidade", "Entrega", "Depois"];
  
  const STYLE_LABEL = {
    lento: "ritmo lento e atento",
    ousado: "iniciativa ousada e dominante",
    conduzida: "deixar ela conduzir",
    provocacao: "jogo de provocação e tortura",
    cuidado: "cuidado e cumplicidade",
    cnc: "CNC / uso sem piedade",
    degradante: "tratamento degradante",
    bruto: "sexo bruto e animal"
  };

  function st() {
    const s = AG.state;
    s.intimacy = s.intimacy || { 
      sessions: 0, 
      discovered: {}, 
      checkins: 0, 
      stops: 0, 
      log: [],
      cncAuthorized: false,
      cncSessions: 0,
      lastIntensity: "normal"
    };
    s.intimacy.discovered = s.intimacy.discovered || {};
    s.intimacy.log = s.intimacy.log || [];
    return s.intimacy;
  }

  function pick(key, arr) {
    if (!arr || !arr.length) return "";
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

  function isCncUnlocked() {
    return !!st().cncAuthorized;
  }

  // Preferência oculta dela
  I.getHerPreference = function () {
    const a = AG.state.aurora;
    if (a.dominance >= 50) return "conduzida";
    if ((a.rivalry || 0) >= 40) return "provocacao";
    if ((a.vulnerability || 0) >= 40 || (a.mentalStability !== undefined && a.mentalStability <= 55)) return "lento";
    if (a.heat >= 65) return "ousado";
    if (isCncUnlocked() && (a.heat >= 55 || a.arousal >= 50)) return "cnc";
    return "cuidado";
  };

  // ------------------------------------------------------------------------
  // Condições de início
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
      a.discomfort < 38 &&
      (!s.phoneState || s.phoneState.manipulationCount === 0) &&
      (a.leveragePressure || 0) < 30
    );
  };

  I.getBlockReason = function () {
    if (AG.Gates && AG.Gates.check) {
      return AG.Gates.check("intimate_18");
    }
    return { ok: I.canStart(), missing: "" };
  };

  // ------------------------------------------------------------------------
  // Textos de clima emocional (versão mais suja)
  // ------------------------------------------------------------------------
  const FAM_FLAVOR = {
    luminosa: [
      "Ela ri baixinho entre um gemido e outro, os olhos brilhando de tesão puro.",
      "Há um sorriso safado no canto da boca dela, de quem está adorando ser usada assim."
    ],
    quimica: [
      "A buceta dela já está pingando antes mesmo de você enfiar os dedos. O cheiro de tesão preenche o quarto.",
      "O corpo pequeno dela treme inteiro cada vez que você aperta mais forte. Ela está molhada pra caralho."
    ],
    caotica: [
      "Ela alterna entre rir e gemer, transformando a tensão em putaria aberta. As mãos pequenas puxam sua roupa com urgência.",
      "A energia elétrica dela virou puro desejo animal. Ela quer ser fodida e não está mais disfarçando."
    ],
    vulneravel: [
      "Ela segura seu olhar com um misto de tesão e entrega. Os olhos marejam de prazer quando você a trata com firmeza.",
      "Dá pra sentir que ela está se abrindo de um jeito que quase ninguém vê — e isso deixa tudo ainda mais intenso."
    ],
    conflito: [
      "A raiva e o tesão se misturam. Ela beija como quem quer te morder e te foder ao mesmo tempo.",
      "O orgulho dela resiste meio segundo e depois cede de um jeito delicioso. Ela gosta quando você não pede licença."
    ],
    sombria: [
      "Há algo perigoso e gostoso no jeito calmo como ela te olha enquanto você a usa. Ela está curtindo cada segundo.",
      "O sorriso dela é de putinha que sabe exatamente o que está fazendo. E gosta."
    ]
  };

  const EXTRA_INTENSE = {
    lento: [
      "Você fode ela devagar, sentindo cada centímetro da buceta apertada dela engolir seu pau. Ela geme baixo, quase chorando de prazer.",
      "O ritmo lento deixa ela louca. Cada estocada profunda faz o corpo pequeno tremer e a voz dela falhar."
    ],
    ousado: [
      "Você a ergue pela cintura como se ela não pesasse nada e enfia o pau nela de uma vez. O gemido dela ecoa no quarto.",
      "A pegada firme e o pau duro dentro dela arrancam sons que ela nem tenta mais esconder. Ela está sendo usada e adora."
    ],
    conduzida: [
      "Ela sobe em você e cava o pau com a buceta molhada, ditando o ritmo enquanto geme no seu ouvido o quanto gosta de controlar.",
      "As mãos pequenas dela te empurram pra baixo e ela se senta até o fundo, olhando nos seus olhos enquanto te fode."
    ],
    provocacao: [
      "Você a leva até a beira do orgasmo e para de propósito. Ela quase chora de frustração, a buceta pulsando vazia.",
      "Cada vez que você quase enfia e recua, ela solta um gemido revoltado. Ela está desesperada pra ser fodida."
    ],
    cuidado: [
      "Entre uma estocada e outra você beija a testa dela e pergunta se está gostoso. Ela responde ofegante que está, e pede mais.",
      "O carinho misturado com o pau duro dentro dela deixa a Aurora completamente entregue e molhada."
    ],
    cnc: [
      "Você a usa sem pedir licença, segurando os pulsos dela e enfiando fundo. Ela geme e resiste de mentira, a buceta apertando ainda mais.",
      "Mesmo enquanto ela balbucia 'para' com a voz falhando, o corpo dela te puxa pra dentro e a buceta escorre."
    ],
    degradante: [
      "Você fala putaria na orelha dela enquanto fode. Ela cora até o pescoço e a buceta aperta como se gostasse de ser chamada de putinha.",
      "Tratar ela como objeto de prazer faz o corpo pequeno tremer de um jeito doentio e gostoso."
    ],
    bruto: [
      "Você fode ela sem nenhuma delicadeza, batendo o pau fundo e rápido. O barulho molhado e os gemidos dela enchem o quarto.",
      "O corpo dela é pequeno demais pra tanto pau e tanta força, e isso só deixa tudo mais excitante."
    ]
  };

  // ------------------------------------------------------------------------
  // CHOICES — versão expandida e suja
  // ------------------------------------------------------------------------
  const CHOICES = {
    // ===================== STAGE 0: APROXIMAÇÃO =====================
    0: [
      {
        id: "ab_beijo_lento", style: "lento", tone: "sweet",
        label: "Segurar o rostinho dela e beijar devagar, lambendo a boca",
        deltas: { heat: 12, arousal: 14, intimacyLevel: 8, affinity: 6, composure: -10 },
        beat: "Você trava a porta, segura o rosto pequeno dela com as duas mãos e beija devagar, chupando o lábio inferior e metendo a língua na boca dela sem pressa.",
        act: "Aurora fecha os olhos e se estica na ponta dos pés, os dedos cravados na sua camisa, retribuindo o beijo com a língua molhada e um gemidinho baixo.",
        speech: [
          "Hm... assim... você beija gostoso pra caralho.\n\nNão tem pressa hoje, né? Então continua me chupando a boca desse jeito.",
          "Porra... eu já tô molhada só com o beijo.\n\nContinua. Não para."
        ]
      },
      {
        id: "ab_encostar_parede", style: "ousado", tone: "hot",
        label: "Encostar ela na parede, erguer a saia/camisola e apertar a bunda",
        deltas: { heat: 16, arousal: 18, intimacyLevel: 9, composure: -14, personaBold: 3 },
        beat: "Você empurra Aurora contra a parede, ergue a roupa dela com uma mão e aperta a bunda pequena com força, enfiando a coxa entre as pernas dela.",
        act: "Ela solta um ofego alto e agarra sua gola, as pernas já trementes. A buceta quente e úmida se esfrega na sua coxa.",
        speech: [
          "Porra... você não perde tempo, né?\n\nAperta mais. Eu gosto quando você me manuseia assim.",
          "Minha bunda cabe inteira na sua mão... isso me deixa louca.\n\nMe aperta mais forte."
        ]
      },
      {
        id: "ab_ela_comanda", style: "conduzida", tone: "ctrl",
        label: "Sentar e falar: 'Hoje você manda. Usa meu pau como quiser'",
        deltas: { heat: 14, arousal: 16, intimacyLevel: 9, dominance: 8, composure: -10 },
        beat: "Você se senta, abre as pernas e olha pra ela com um meio sorriso. — Hoje o pau é seu. Faz o que quiser com ele.",
        act: "Um sorriso safado aparece no rosto dela. Aurora sobe no seu colo, esfrega a buceta molhada no volume da sua calça e segura seu queixo.",
        speech: [
          "Você acabou de me dar o controle e ainda sorriu...\n\nVou gozar sentada no seu pau e você vai ficar quietinho olhando.",
          "Gosto quando você se entrega assim.\n\nAgora aguenta, porque eu vou te usar até cansar."
        ]
      },
      {
        id: "ab_provocar_limite", style: "provocacao", tone: "ctrl",
        label: "Parar a um dedo da boca dela e provocar até ela pedir pra ser fodida",
        deltas: { heat: 14, arousal: 20, influence: 7, composure: -14, rivalry: 5 },
        beat: "Você fica a um centímetro da boca dela, respirando o mesmo ar, e sustenta o silêncio enquanto o pau lateja contra a barriga pequena dela.",
        act: "Aurora aperta os lábios, ofegante, e puxa sua camisa com força. A buceta dela já está molhando a calcinha.",
        speech: [
          "Você é um desgraçado... Acaba com isso e me beija logo!\n\nEu juro que vou te morder se você continuar me torturando.",
          "Porra, me beija! Eu já tô molhada pra caralho só de ficar assim.\n\nPara de me provocar e me fode de uma vez."
        ]
      },
      {
        id: "ab_checkin_cnc", style: "cuidado", tone: "sweet", checkin: true, unlocksCnc: true,
        label: "Perguntar se ela quer que você seja mais bruto / CNC hoje",
        deltas: { trust: 10, affinity: 8, vulnerability: 10, intimacyLevel: 6, discomfort: -8 },
        beat: "Você segura o rosto dela com carinho e pergunta baixo: — Aurora... se eu te usar sem pedir, se eu te tratar como putinha e não escutar quando você falar 'para'... você quer isso hoje? Me fala a verdade.",
        act: "Ela engole seco, os olhos brilhando de um jeito diferente. O corpo pequeno treme de leve.",
        speech: [
          "Eu... eu quero.\n\nSe eu falar a palavra de segurança a gente para de verdade. Mas se for só 'para' ou 'não'... você pode continuar. Eu gosto quando você me usa de verdade.",
          "Porra... você perguntou isso e eu já fiquei molhada.\n\nSim. Eu autorizo. Me usa. Me fode como se eu fosse só um brinquedo gostoso. Mas se eu falar 'laço vermelho', você para na hora."
        ]
      },
      {
        id: "ab_checkin_normal", style: "cuidado", tone: "sweet", checkin: true,
        label: "Perguntar se ela está confortável e o que ela quer agora",
        deltas: { trust: 9, affinity: 7, vulnerability: 9, intimacyLevel: 5, discomfort: -7 },
        beat: "Você encosta a testa na dela e pergunta: — Tá tudo bem? Me diz o que você quer e o que não quer. Eu escuto.",
        act: "Ela abre os olhos devagar e acaricia seu rosto com o polegar, sorrindo de um jeito sincero.",
        speech: [
          "Você parar pra perguntar me derrete mais do que qualquer beijo.\n\nTô bem. Eu quero você. E se eu mudar de ideia, eu falo.",
          "Ninguém nunca pergunta isso...\n\nTô confortável. E mais ainda agora."
        ]
      }
    ],

    // ===================== STAGE 1: AQUECIMENTO =====================
    1: [
      {
        id: "aq_pescoco_chupar", style: "lento", tone: "hot",
        label: "Chupar o pescoço e a clavícula até deixar marca",
        deltas: { heat: 14, arousal: 18, intimacyLevel: 11, composure: -14 },
        beat: "Você afasta o cabelo dela e chupa o pescoço com força, lambendo e mordendo de leve até a pele ficar vermelha. A mão desce e aperta a bunda pequena.",
        act: "Aurora inclina a cabeça, entregando o pescoço, e solta um gemido longo. As unhas cravam na sua nuca.",
        speech: [
          "Aí... porra, aí.\n\nVocê tá me marcando... eu gosto. Continua. Me deixa marcada pra eu lembrar amanhã.",
          "Seu dente no meu pescoço me deixa completamente molhada.\n\nNão para. Eu quero carregar essa marca."
        ]
      },
      {
        id: "aq_erguer_altura", style: "ousado", tone: "hot",
        label: "Erguer ela pela cintura até a altura do seu pau e esfregar",
        deltas: { heat: 16, arousal: 20, intimacyLevel: 12, composure: -16, personaBold: 3 },
        beat: "Você firma as mãos na cintura dela e a ergue como se ela não pesasse nada, alinhando a buceta com o volume do seu pau. Esfrega devagar, sentindo o calor e a umidade através da roupa.",
        act: "Ela enlaça seu pescoço e a cintura com as pernas. Um gemido alto escapa quando o pau grosso esfrega bem no meio da buceta.",
        speech: [
          "Porra... você me pega no colo como se eu fosse brinquedo.\n\nContinua esfregando. Eu já tô encharcada.",
          "Minha altura te deixa louco, né? Poder me levantar e usar do jeito que quiser...\n\nEntão usa. Me esfrega mais forte."
        ]
      },
      {
        id: "aq_ela_ajoelha", style: "conduzida", tone: "ctrl",
        label: "Deixar ela ajoelhar e chupar seu pau pela primeira vez",
        deltas: { heat: 18, arousal: 22, intimacyLevel: 13, dominance: 6, composure: -12 },
        beat: "Você se encosta e ela desce sozinha, ajoelhando na sua frente. As mãos pequenas abrem sua calça e o pau duro salta na cara dela.",
        act: "Aurora olha pra cima, abre a boca e engole o máximo que consegue, engasgando um pouco mas continuando. A língua gira na cabeça enquanto ela chupa.",
        speech: [
          "Hmm... gostoso pra caralho.\n\nVocê é grande demais pra minha boca, mas eu gosto de tentar.",
          "Olha pra mim enquanto eu te chupo.\n\nEu quero ver sua cara quando eu engolir tudo."
        ]
      },
      {
        id: "aq_dedos_calcinha", style: "provocacao", tone: "hot",
        label: "Enfiar a mão na calcinha dela e brincar com o clitóris sem entrar",
        deltas: { heat: 15, arousal: 24, influence: 8, composure: -18, rivalry: 4 },
        beat: "Você desliza a mão por dentro da calcinha dela e encontra a buceta encharcada. Os dedos esfregam o clitóris inchado em círculos lentos, sem enfiar.",
        act: "Aurora solta um gemido agudo e segura seu pulso, mas não tira. Os quadris dela se movem sozinhos pedindo mais.",
        speech: [
          "Porra... não fica só no clitóris, me fode com os dedos também!\n\nEu tô molhada demais pra você ficar só provocando.",
          "Você é cruel... continua assim que eu vou gozar só com o dedo.\n\nMas eu quero seu pau. Me dá."
        ]
      },
      {
        id: "aq_cnc_forcar_beijo", style: "cnc", tone: "hot", requiresCnc: true,
        label: "[CNC] Segurar o cabelo dela e beijar com força, ignorando o 'espera'",
        deltas: { heat: 18, arousal: 22, intimacyLevel: 10, dominance: 10, discomfort: 4, composure: -16 },
        beat: "Você puxa o cabelo dela com firmeza, força o beijo e mete a língua fundo na boca dela mesmo quando ela solta um 'espera' abafado. A outra mão aperta a bunda com força.",
        act: "Aurora resiste de mentira por dois segundos e depois derrete, chupando sua língua de volta. A buceta dela escorre ainda mais.",
        speech: [
          "P-pera... ah, foda-se.\n\nContinua. Me usa. Eu gosto quando você não escuta.",
          "Desgraçado... me beija mais forte.\n\nEu falei 'espera' e você cagou. Continua assim."
        ]
      }
    ],

    // ===================== STAGE 2: INTENSIDADE =====================
    2: [
      {
        id: "in_foder_devagar", style: "lento", tone: "hot",
        label: "Enfiar o pau devagar e foder ela com estocadas profundas e lentas",
        deltas: { heat: 18, arousal: 24, intimacyLevel: 14, composure: -18 },
        beat: "Você tira a calcinha dela, alinha o pau na entrada molhada e enfia centímetro por centímetro, sentindo a buceta apertada engolir tudo. Depois fode devagar, fundo, sem pressa.",
        act: "Aurora arqueia as costas e solta um gemido longo e trêmulo. As unhas cravam nas suas costas a cada estocada profunda.",
        speech: [
          "Porra... tão fundo...\n\nContinua assim, bem devagar. Eu sinto cada veia do seu pau.",
          "Você me preenche inteira... eu adoro quando você fode sem pressa.\n\nMais fundo. Quero sentir até o útero."
        ]
      },
      {
        id: "in_foder_pe", style: "ousado", tone: "hot",
        label: "Virar ela de quatro e foder com força, segurando a cintura pequena",
        deltas: { heat: 20, arousal: 26, intimacyLevel: 14, composure: -20, personaBold: 4 },
        beat: "Você vira Aurora de quatro na cama, segura a cintura minúscula com as duas mãos e enfia o pau de uma vez, fodendo com força. O barulho molhado enche o quarto.",
        act: "Ela enterra o rosto no travesseiro e geme alto a cada estocada. A bunda pequena treme a cada batida.",
        speech: [
          "Ah... porra... assim!\n\nMe fode mais forte. Eu aguento. Usa essa cintura pequena do jeito que quiser.",
          "Você me segura como se eu fosse brinquedo... e eu adoro.\n\nContinua me fodendo. Não para."
        ]
      },
      {
        id: "in_ela_por_cima", style: "conduzida", tone: "ctrl",
        label: "Deitar e deixar ela cavalgar até gozar em cima de você",
        deltas: { heat: 18, arousal: 24, intimacyLevel: 15, dominance: 10, composure: -16 },
        beat: "Você deita e ela sobe em cima, encaixando a buceta no seu pau. Aurora começa a cavalgar com força, gemendo e olhando nos seus olhos.",
        act: "Ela apoia as mãos no seu peito e se move com ritmo safado, a buceta apertando a cada descida. Os seios pequenos balançam.",
        speech: [
          "Olha pra mim enquanto eu te fodo.\n\nEu quero ver sua cara quando eu gozar sentada no seu pau.",
          "Seu pau é meu agora.\n\nFica quieto e deixa eu gozar em cima de você."
        ]
      },
      {
        id: "in_quase_gozar", style: "provocacao", tone: "ctrl",
        label: "Levar ela até a beira do orgasmo e parar de propósito",
        deltas: { heat: 16, arousal: 28, influence: 12, composure: -22, rivalry: 6 },
        beat: "Você fode ela rápido e fundo até sentir a buceta apertar no limite. No último segundo você para completamente e segura o quadril dela.",
        act: "Aurora solta um gemido revoltado e quase chora de frustração. Os quadris tentam se mexer sozinhos.",
        speech: [
          "NÃO! Volta aqui, desgraçado!\n\nEu tava quase gozando... me fode logo!",
          "Você é um filho da puta... eu tô tremendo.\n\nMe fode. Agora. Eu preciso gozar."
        ]
      },
      {
        id: "in_cnc_usar", style: "cnc", tone: "hot", requiresCnc: true,
        label: "[CNC] Segurar os pulsos dela e foder sem pedir, ignorando o 'para'",
        deltas: { heat: 22, arousal: 28, intimacyLevel: 12, dominance: 14, discomfort: 6, composure: -20 },
        beat: "Você prende os pulsos dela acima da cabeça com uma mão e enfia o pau com força. Quando ela solta um 'para' abafado, você continua fodendo mais fundo, usando o corpo pequeno dela.",
        act: "Aurora resiste de mentira, os olhos marejando de tesão. A buceta aperta ainda mais e escorre em você.",
        speech: [
          "P-para... ah, foda-se, continua!\n\nMe usa. Me fode como se eu fosse só um buraco gostoso.",
          "Eu falei para e você não parou... porra, isso me deixa louca.\n\nContinua me usando. Eu gosto."
        ]
      },
      {
        id: "in_degradar", style: "degradante", tone: "hot", requiresCnc: true,
        label: "[CNC] Foder ela enquanto chama de putinha e fala o quanto ela é fácil",
        deltas: { heat: 20, arousal: 26, intimacyLevel: 11, dominance: 12, discomfort: 5, composure: -18 },
        beat: "Você fode Aurora com força e fala no ouvido dela: — Olha só pra você... tão pequena, tão molhada, tão fácil de usar. Sua putinha.",
        act: "Ela cora até o pescoço e a buceta aperta violentamente. Um gemido vergonhoso escapa.",
        speech: [
          "Porra... me chama de putinha de novo.\n\nEu gosto. Eu sou sua putinha. Continua falando.",
          "Você me trata como objeto e eu fico ainda mais molhada...\n\nSou fácil pra você. Usa."
        ]
      }
    ],

    // ===================== STAGE 3: ENTREGA =====================
    3: [
      {
        id: "en_gozar_dentro", style: "ousado", tone: "hot",
        label: "Foder até gozar dentro dela, bem fundo",
        deltas: { heat: 22, arousal: 30, intimacyLevel: 16, composure: -22, affinity: 8 },
        beat: "Você segura a cintura dela com força e fode rápido e fundo até gozar, despejando porra quente bem no fundo da buceta apertada.",
        act: "Aurora geme alto e goza junto, a buceta pulsando e espremendo cada gota. O corpo pequeno treme inteiro.",
        speech: [
          "Dentro... goza dentro de mim!\n\nEu quero sentir sua porra escorrendo depois.",
          "Porra... eu senti você gozar fundo.\n\nContinua me fodendo mesmo depois. Eu ainda tô gozando."
        ]
      },
      {
        id: "en_gozar_cara", style: "bruto", tone: "hot",
        label: "Tirar o pau e gozar na cara e na boca dela",
        deltas: { heat: 20, arousal: 28, intimacyLevel: 14, dominance: 10, composure: -18 },
        beat: "Você tira o pau, ajoelha na frente dela e goza na cara pequena, na boca aberta e nos seios. A porra escorre pelo queixo.",
        act: "Aurora mantém a boca aberta e a língua pra fora, recebendo tudo. Os olhos brilham de tesão sujo.",
        speech: [
          "Isso... goza na minha cara.\n\nEu quero ficar toda suja de você.",
          "Hmm... gostoso.\n\nMe deixa assim. Não limpa ainda."
        ]
      },
      {
        id: "en_ela_goza_comando", style: "conduzida", tone: "ctrl",
        label: "Deixar ela gozar sentada em você, no ritmo dela",
        deltas: { heat: 20, arousal: 28, intimacyLevel: 16, dominance: 12, composure: -16 },
        beat: "Aurora cava o pau com força e goza sentada em você, a buceta apertando e escorrendo. Ela segura seu rosto e olha nos seus olhos enquanto goza.",
        act: "O corpo pequeno treme violentamente. Ela geme seu nome e continua se mexendo devagar, aproveitando cada onda.",
        speech: [
          "Eu tô gozando... porra, eu tô gozando no seu pau.\n\nNão tira. Deixa eu terminar.",
          "Olha pra mim... eu quero que você veja minha cara quando eu gozo."
        ]
      },
      {
        id: "en_cnc_forcar_gozo", style: "cnc", tone: "hot", requiresCnc: true,
        label: "[CNC] Forçar ela a gozar mesmo quando ela pede pra parar",
        deltas: { heat: 24, arousal: 32, intimacyLevel: 13, dominance: 16, discomfort: 8, composure: -24 },
        beat: "Quando Aurora começa a dizer 'espera, tá demais', você segura a cintura dela e fode ainda mais forte, forçando o orgasmo. A buceta dela explode em espasmos.",
        act: "Ela chora de prazer e goza violentamente, o corpo pequeno se contorcendo. Depois fica mole e ofegante.",
        speech: [
          "N-não... espera... AH!\n\nPorra... você me forçou a gozar... eu amei.",
          "Eu pedi pra parar e você me fez gozar mesmo assim...\n\nDesgraçado. Faz de novo."
        ]
      },
      {
        id: "en_duplo_gozo", style: "bruto", tone: "hot",
        label: "Foder sem parar até os dois gozarem juntos, sujos e ofegantes",
        deltas: { heat: 24, arousal: 30, intimacyLevel: 17, affinity: 10, composure: -20 },
        beat: "Você fode Aurora sem nenhuma pausa, o barulho molhado e os gemidos misturados. Vocês gozam quase juntos, o pau pulsando dentro da buceta que aperta sem parar.",
        act: "Os dois ficam tremendo, suados, a porra misturada com o tesão dela escorrendo entre as pernas.",
        speech: [
          "Eu gozei... porra, eu gozei com você dentro.\n\nNão tira ainda. Fica.",
          "A gente tá uma bagunça...\n\nE eu adoro."
        ]
      }
    ],

    // ===================== STAGE 4: DEPOIS (AFTERCARE) =====================
    4: [
      {
        id: "af_carinho_limpo", style: "cuidado", tone: "sweet",
        label: "Limpar ela com carinho, beijar a testa e abraçar",
        deltas: { trust: 14, affinity: 12, vulnerability: 10, intimacyLevel: 8, discomfort: -12 },
        beat: "Você pega uma toalha úmida, limpa a porra e o tesão das coxas dela com cuidado, beija a testa e a puxa pro seu peito.",
        act: "Aurora se aninha no seu peito, pequena e satisfeita, os olhos fechados. Um sorriso preguiçoso aparece.",
        speech: [
          "Você é tão cuidadoso depois...\n\nEu gosto disso. Fica abraçado em mim.",
          "Obrigada por limpar e por não sair correndo.\n\nFica mais um pouco."
        ]
      },
      {
        id: "af_sujos_juntos", style: "ousado", tone: "hot",
        label: "Ficar deitado com ela ainda sujos, o pau mole na coxa dela",
        deltas: { heat: 8, arousal: 6, intimacyLevel: 10, affinity: 8, composure: -6 },
        beat: "Você não limpa nada. Fica deitado com Aurora, a porra escorrendo entre as pernas dela e o pau mole descansando na coxa pequena.",
        act: "Ela ri baixinho e esfrega a bunda suja em você de propósito.",
        speech: [
          "A gente tá nojento...\n\nE eu tô adorando. Não limpa ainda.",
          "Sua porra escorrendo de mim...\n\nDeixa. Eu quero sentir."
        ]
      },
      {
        id: "af_cnc_continua", style: "cnc", tone: "hot", requiresCnc: true,
        label: "[CNC] Continuar tocando nela mesmo depois dela pedir descanso",
        deltas: { heat: 14, arousal: 16, dominance: 10, discomfort: 6, intimacyLevel: 6 },
        beat: "Mesmo depois do orgasmo, você continua passando o dedo na buceta sensível dela. Quando ela pede pra parar, você ignora e continua brincando com o clitóris inchado.",
        act: "Aurora treme e geme, misturando protesto e prazer. A buceta ainda lateja.",
        speech: [
          "Para... tá sensível demais... ah, foda-se.\n\nContinua. Eu gosto quando você não escuta.",
          "Você é um desgraçado...\n\nMas não para. Me toca mais."
        ]
      },
      {
        id: "af_conversa_safada", style: "provocacao", tone: "hot",
        label: "Perguntar baixinho qual foi a parte que ela mais gozou",
        deltas: { affinity: 10, trust: 8, intimacyLevel: 9, heat: 8 },
        beat: "Você beija o ombro dela e pergunta baixo, ainda ofegante: — Qual parte te fez gozar mais? Me conta.",
        act: "Aurora cora e esconde o rosto no seu peito por um segundo antes de responder.",
        speech: [
          "Quando você me chamou de putinha e fodeu mais forte...\n\nAquilo me quebrou. Eu gozei só de ouvir.",
          "Quando você me ergueu e me usou como se eu não pesasse nada.\n\nEu adoro ser pequena pra você."
        ]
      },
      {
        id: "af_dormir_colado", style: "cuidado", tone: "sweet",
        label: "Puxar ela pro seu peito e dormir colado, ainda pelados",
        deltas: { trust: 12, affinity: 14, vulnerability: 12, intimacyLevel: 10, discomfort: -10 },
        beat: "Você puxa o corpo pequeno dela pro seu peito, cobre os dois com o lençol e beija o topo da cabeça dela.",
        act: "Aurora se encolhe contra você, a cabeça encaixada no seu peito, e solta um suspiro longo e feliz.",
        speech: [
          "Eu poderia dormir assim todas as noites...\n\nVocê é quente e cheira a sexo. Eu gosto.",
          "Não solta.\n\nEu quero acordar ainda colada em você."
        ]
      }
    ]
  };

  // ------------------------------------------------------------------------
  // Funções principais
  // ------------------------------------------------------------------------
  I.startScene = function () {
    if (!I.canStart()) return false;
    const s = AG.state;
    const it = st();
    s.activeIntimateScene = {
      stage: 0,
      steps: 0,
      styles: [],
      checked: false,
      startedAt: Date.now()
    };

    const openerBeat = pick("intim_opener_beat", [
      "Você trava a porta do quarto e olha pra Aurora. O ar já está carregado de tesão.",
      "A distância entre vocês desaparece. O corpo pequeno dela já está quente e disponível."
    ]);
    const flavor = pick("intim_opener_flavor", FAM_FLAVOR[fam()] || FAM_FLAVOR.quimica);
    let openerSpeech = pick("intim_opener_speech", [
      "Você trancou a porta...\n\nEntão me usa. Eu tô pronta.",
      "Chega de brincadeira.\n\nMe fode."
    ]);

    if (it.sessions > 0) {
      openerSpeech = pick("intim_repeat_opener", [
        "A gente já se conhece...\n\nEntão não precisa ser gentil. Me fode do jeito que você sabe que eu gosto.",
        "De novo...\n\nEu já tô molhada só de lembrar da última vez."
      ]);
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
    const cncOk = isCncUnlocked();

    let list = (CHOICES[sc.stage] || []).filter((c) => {
      if (c.checkin && sc.checked) return false;
      if (c.requiresCnc && !cncOk) return false;
      return true;
    });

    list = list.map((c) => ({
      id: c.id,
      tone: c.tone,
      label: c.label,
      hint: (disc[c.style] && !c.checkin ? "♥ favorita · " : "") + (STYLE_LABEL[c.style] || c.style)
    }));

    if (sc.stage < 4) {
      list.push({ id: "int_slow_down", tone: "sweet", label: "Desacelerar e só abraçar por um momento", hint: "reduz o ritmo sem encerrar" });
      list.push({ id: "int_stop", tone: "sweet", label: "Parar aqui e abraçar ela (safeword real)", hint: "encerrar de verdade" });
    }
    return list;
  };

  function finishSession(reason) {
    const s = AG.state;
    const it = st();
    it.sessions += 1;
    if (reason === "cnc" || reason === "degradante" || reason === "bruto") it.cncSessions = (it.cncSessions || 0) + 1;
    it.log.unshift({ day: s.day, time: AG.getFormattedClock ? AG.getFormattedClock() : "", reason });
    if (it.log.length > 16) it.log = it.log.slice(0, 16);
    s.activeIntimateScene = null;
    s.flags = s.flags || {};
    s.flags.completedIntimateToday = s.day;
  }

  I.select = function (choiceId) {
    const s = AG.state;
    const a = s.aurora;
    const sc = s.activeIntimateScene;
    if (!sc) return;
    if (!AG.isAuroraHere() || a.activity === "dormindo") {
      s.activeIntimateScene = null;
      return;
    }
    const it = st();

    // STOP real
    if (choiceId === "int_stop") {
      AG.playSound && AG.playSound("heart");
      it.stops += 1;
      const pills = AG.applyDeltas({ trust: 16, affinity: 12, vulnerability: 12, discomfort: -14, intimacyLevel: 5, mood: "dengosa" });
      AG.addMemory && AG.addMemory("parou_com_carinho_" + s.day, "Parou de verdade quando ela pediu — ela sentiu o respeito.", "bom", true);
      AG.clearFeed();
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você para imediatamente, afasta o corpo e a abraça com firmeza, sem nenhuma cobrança.",
        action: "Aurora solta o ar aliviada e se aninha no seu peito, os olhos marejados de gratidão.",
        speech: "Obrigada por parar de verdade...\n\nIsso significa muito pra mim.",
        pills
      });
      finishSession("parou");
      AG.saveGame("autosave");
      return;
    }

    // Slow down
    if (choiceId === "int_slow_down") {
      AG.playSound && AG.playSound("heart");
      const pills = AG.applyDeltas({ trust: 6, affinity: 5, discomfort: -6, composure: 4 });
      AG.clearFeed();
      AG.pushFeed({
        type: "aurora",
        playerBeat: "Você reduz o ritmo, a abraça e só fica sentindo o corpo pequeno dela contra o seu por um momento.",
        action: "Ela respira fundo e relaxa nos seus braços, ainda quente mas mais calma.",
        speech: "Obrigada... eu precisava disso um segundo.\n\nPode continuar quando quiser.",
        pills
      });
      AG.advanceTime && AG.advanceTime(5, { suppressRandom: true, keepSpecialScene: true });
      AG.saveGame("autosave");
      return;
    }

    // Encontrar a escolha
    const allChoices = CHOICES[sc.stage] || [];
    const ch = allChoices.find((c) => c.id === choiceId);
    if (!ch) return;

    // Unlock CNC se for o check-in específico
    if (ch.unlocksCnc) {
      it.cncAuthorized = true;
      it.checkins += 1;
      sc.checked = true;
    }
    if (ch.checkin) {
      it.checkins += 1;
      sc.checked = true;
    }

    const match = ch.style && I.getHerPreference() === ch.style;
    if (match && ch.style) it.discovered[ch.style] = true;

    let deltas = Object.assign({}, ch.deltas || {});
    // Mood shift baseado na escolha
    if (ch.style === "cnc" || ch.style === "degradante" || ch.style === "bruto") {
      deltas.mood = sc.stage >= 3 ? "entregue" : "excitada_tensa";
      if (deltas.discomfort && deltas.discomfort > 0 && a.discomfort + deltas.discomfort > 45) {
        // Ainda assim o jogo continua, mas ela pode ficar mais sombria depois
        deltas.mood = "corrompida_fria";
      }
    } else if (sc.stage >= 3) {
      deltas.mood = "entregue";
    } else if (sc.stage >= 1) {
      deltas.mood = "excitada_tensa";
    } else {
      deltas.mood = "corada_sensivel";
    }

    AG.playSound && AG.playSound(ch.tone === "hot" ? "hot" : "heart");
    const pills = AG.applyDeltas(deltas);
    if (ch.style && !ch.checkin) sc.styles.push(ch.style);

    const f = fam();
    const speechMain = pick("intim_sp_" + ch.id, ch.speech);
    let speech = speechMain;

    if (match && !ch.checkin) {
      const favLines = {
        lento: ["Você fode exatamente no ritmo que me deixa louca...", "Esse jeito devagar me quebra inteira."],
        ousado: ["Porra, quando você me pega assim eu desisto de qualquer resistência.", "Essa pegada firme me deixa completamente sua."],
        conduzida: ["Eu adoro ter o controle e ver você se entregar.", "Continua me obedecendo assim."],
        provocacao: ["Você sabe exatamente como me torturar...", "Eu odeio e amo quando você me deixa no limite."],
        cuidado: ["Esse cuidado misturado com tesão me derrete.", "Ninguém me trata assim."],
        cnc: ["Você me usa de verdade e eu gozo com isso...", "Continua não escutando quando eu falo para."],
        degradante: ["Me chama de putinha de novo...", "Eu gosto de ser tratada assim por você."],
        bruto: ["Fode mais forte...", "Eu aguento. Me usa."]
      };
      const favLine = pick("intim_fav_" + ch.style, favLines[ch.style] || favLines.cuidado);
      speech += "\n\n" + favLine;
    } else if (!ch.checkin && intense()) {
      const extra = pick("intim_extra_" + ch.style, EXTRA_INTENSE[ch.style] || EXTRA_INTENSE.cuidado);
      if (extra) speech += "\n\n" + extra;
    }

    const flavor = pick("intim_flavor_" + f, FAM_FLAVOR[f] || FAM_FLAVOR.quimica);
    let action = (ch.act || "") + " " + flavor;

    AG.clearFeed();
    AG.pushFeed({
      type: "aurora",
      playerBeat: ch.beat,
      action,
      speech,
      subtext: match ? "Leitura sua: a reação dela foi bem mais forte — você acertou o jeito que ela gosta." : undefined,
      pills
    });

    if (ch.checkin) {
      AG.advanceTime && AG.advanceTime(5, { suppressRandom: true, keepSpecialScene: true });
      AG.saveGame("autosave");
      return;
    }

    sc.steps += 1;
    AG.advanceTime && AG.advanceTime(10, { suppressRandom: true, keepSpecialScene: true });

    if (sc.stage >= 4) {
      const dominant = sc.styles.length
        ? sc.styles.slice().sort((x, y) => sc.styles.filter((v) => v === y).length - sc.styles.filter((v) => v === x).length)[0]
        : "cuidado";
      AG.addMemory && AG.addMemory(
        "noite_intima_" + s.day,
        `Uma noite íntima marcada por ${STYLE_LABEL[dominant] || dominant}.`,
        dominant === "cnc" || dominant === "degradante" || dominant === "bruto" ? "quente" : "quente",
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
    const disc = Object.keys(it.discovered || {}).map((k) => STYLE_LABEL[k] || k);
    return {
      sessions: it.sessions,
      checkins: it.checkins,
      stops: it.stops,
      cncAuthorized: !!it.cncAuthorized,
      cncSessions: it.cncSessions || 0,
      discovered: disc,
      log: it.log
    };
  };

  AG.Intimacy = I;
})(window.AuroraGame);
