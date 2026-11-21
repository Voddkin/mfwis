/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   PATCH SUJO + GRÁFICO para deepDialogueAndUnlocks.js
   Personalidade de putaria pura, conteúdo gráfico de sexo, height play sexualizado
   Nível 2/3 — mesmo tom que o intimacyEngine reescrito
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  const DD = AG.DeepDialogue || {};

  // ========================================================================
  // ABERTURAS QUENTES REESCRITAS (bem mais sujas e gráficas)
  // ========================================================================
  const DIRTY_OPENING_PLAYER_BEATS = {
    quente_encurralar_parede: [
      "Você acompanha o passo dela, apoia a mão na parede acima do ombro pequeno e fecha o corpo contra o dela. A buceta dela quase roça na sua coxa. — Você não vai a lugar nenhum até eu decidir.",
      "Você a encurrala na parede, a diferença de altura fazendo ela ter que erguer o rosto. Sua mão desce e aperta a bunda pequena por cima da roupa. — Fica quietinha aí.",
      "Você prende ela contra a parede e enfia a coxa entre as pernas dela, sentindo o calor da buceta. — Olha pra mim enquanto eu te aperto assim."
    ],
    quente_provocar_uniforme_moletom: [
      "Seu olhar desce devagar pelo corpo dela e para bem entre as pernas. — Você veste isso sabendo que eu fico duro só de imaginar o que tem embaixo, né?",
      "Você puxa o tecido do moletom/uniforme dela o suficiente pra ver a curva da bunda. — Essa roupa te deixa ainda mais fácil de manusear. Eu gosto.",
      "Você chega perto e fala baixo: — Se eu enfiar a mão agora, aposto que já tá molhada. Quer testar?"
    ],
    quente_sussurrar_pescoco: [
      "Você se curva até a boca ficar colada no pescoço dela e sussurra: — Eu quero te foder até você esquecer o próprio nome. Sua buceta apertada engolindo meu pau inteiro.",
      "Você lambe o pescoço dela devagar e murmura: — Imagina eu te erguendo e te enfiando na parede. Você é pequena demais pra fugir.",
      "Você morde de leve a orelha dela e fala rouco: — Eu vou te usar. E você vai gozar pedindo mais."
    ],
    quente_puxar_cintura_colo: [
      "Você segura a cintura minúscula dela com as duas mãos e puxa com força contra o seu pau duro. — Sente isso? É tudo pra você.",
      "Você a ergue um pouco do chão só pela cintura e segura ela colada no seu corpo. — Você pesa nada. Eu posso te foder em qualquer posição que eu quiser.",
      "Você puxa ela pro seu colo de uma vez e acomoda a bunda dela em cima do volume da sua calça. — Mexe. Esfrega essa buceta em mim."
    ],
    quente_sentar_bancada_altura: [
      "Você ergue Aurora pela cintura e a senta na bancada, abrindo as pernas dela e se encaixando no meio. Agora os rostos ficam na mesma altura. — Melhor assim. Agora eu posso te beijar e te foder sem me curvar.",
      "Você a coloca sentada na bancada alta e empurra o corpo entre as coxas dela. Sua mão já desce e aperta a parte de dentro da coxa. — Fica assim. Aberta pra mim.",
      "Você a ergue e senta ela na bancada, alinhando o pau com a buceta dela ainda por cima da roupa. — Olha só... perfeita pra ser usada nessa altura."
    ],
    quente_morder_labio_desafio: [
      "Você segura o queixo dela e aproxima a boca até quase tocar. — Se você pedir, eu te fodo agora mesmo. Mas tem que pedir como putinha.",
      "Você morde o próprio lábio olhando pra boca dela. — Aposto que sua buceta já tá latejando. Fala que quer meu pau.",
      "Você reduz a distância até as respirações se misturarem. — Me implora. Eu quero ouvir você pedindo pra ser fodida."
    ],
    quente_jogo_tres_toques: [
      "Você desliza o dedo devagar pela parte de dentro da coxa dela e fala baixo: — Três toques. Se você gemer antes do terceiro, eu te fodo até você não aguentar mais.",
      "Você passa o polegar bem perto da buceta dela por cima da roupa. — Um... dois... no terceiro eu decido se enfio o dedo ou o pau.",
      "Você segura a nuca dela e fala no ouvido: — Três toques meus. Se molhar a calcinha antes, você vira minha putinha pelo resto da noite."
    ],
    quente_mandar_ela_conduzir: [
      "Você se recosta e abre as pernas, o pau já marcado na calça. — Sobe. Usa meu pau do jeito que você quiser. Eu quero ver você cavalgando.",
      "Você puxa ela pela mão e coloca no seu colo. — Hoje você manda. Quero ver essa buceta pequena engolindo tudo.",
      "Você segura o rosto dela e fala: — Me fode. Sobe em mim e me usa até você gozar."
    ],
    quente_falar_buceta: [
      "Você desce a mão e aperta a buceta dela por cima da roupa, sentindo o calor. — Tá molhada pra caralho. Eu quero enfiar os dedos agora.",
      "Você fala baixo olhando nos olhos dela: — Eu quero lamber essa buceta até você gozar na minha cara.",
      "Você segura a coxa dela e abre um pouco. — Me mostra. Eu quero ver como tá sua buceta agora."
    ],
    quente_height_play_foder: [
      "Você a ergue completamente do chão, segurando pela bunda. — Você é pequena demais. Eu posso te foder em pé sem nem me esforçar.",
      "Você segura ela no colo, o pau já pressionando a entrada. — Olha a diferença. Eu te encho inteira e ainda sobra.",
      "Você a levanta até a altura do seu pau e esfrega. — Essa altura me deixa doido. Eu te uso como quiser."
    ],
    quente_cnc_verbal: [
      "Você aperta a nuca dela e fala baixo: — Se eu te usar sem pedir, se eu te foder mesmo você falando para... você goza igual, né?",
      "Você segura o queixo dela com firmeza. — Eu gosto quando você resiste um pouco. Continua pedindo pra parar que eu vou mais fundo.",
      "Você sussurra no ouvido dela: — Me autoriza a te usar de verdade. Eu quero te foder sem pedir licença."
    ]
  };

  const DIRTY_AURORA_RESPONSES = {
    quente_encurralar_parede: [
      "Ela ergue o queixo e esfrega a buceta na sua coxa de propósito. — Então me usa. Eu tô molhada já.",
      "Aurora morde o lábio e segura sua camisa. — Continua me apertando assim. Eu gosto de ficar presa.",
      "Ela solta um gemidinho baixo. — Porra... sua mão na minha bunda me deixa louca. Aperta mais."
    ],
    quente_provocar_uniforme_moletom: [
      "Ela ri safada e abre um pouco as pernas. — Quer conferir? Enfia a mão e vê você mesmo.",
      "Aurora puxa o tecido e mostra mais pele. — Imagina só o que tem embaixo. Você ia gozar rápido.",
      "Ela chega mais perto. — Eu visto isso pra te deixar duro. Funcionou, né?"
    ],
    quente_sussurrar_pescoco: [
      "Ela treme e segura sua nuca. — Fala mais. Eu quero ouvir você falando como vai me foder.",
      "Aurora geme baixo. — Porra... continua falando putaria no meu ouvido. Eu já tô pingando.",
      "Ela vira o rosto e quase beija. — Então me fode. Para de falar e me usa."
    ],
    quente_puxar_cintura_colo: [
      "Ela se esfrega de propósito no seu pau. — Sente como eu tô quente? Isso é tudo sua culpa.",
      "Aurora envolve sua cintura com as pernas. — Me segura mais forte. Eu gosto de ser manuseada.",
      "Ela geme quando o pau pressiona. — Porra... enfia. Eu não aguento mais só esfregar."
    ],
    quente_sentar_bancada_altura: [
      "Ela abre as pernas mais e puxa você. — Assim fica perfeito. Agora me beija e me fode.",
      "Aurora envolve sua cintura com as pernas. — Eu adoro quando você me coloca na altura certa pra usar.",
      "Ela esfrega a buceta no volume da sua calça. — Continua. Eu quero seu pau bem aqui."
    ],
    quente_morder_labio_desafio: [
      "Ela segura seu olhar e fala baixo: — Me fode. Eu quero seu pau agora.",
      "Aurora puxa sua camisa. — Eu peço. Me fode como putinha. Por favor.",
      "Ela morde seu lábio de volta. — Eu não aguento mais. Me usa."
    ],
    quente_jogo_tres_toques: [
      "Ela já está tremendo no segundo toque. — Porra... você ganhou. Me fode.",
      "Aurora geme e segura seu pulso. — Eu já tô molhada. Para de provocar e enfia.",
      "Ela olha nos seus olhos ofegante. — Três foi demais. Agora me fode de verdade."
    ],
    quente_mandar_ela_conduzir: [
      "Ela sobe no seu colo e esfrega a buceta no pau. — Então fica quieto. Eu vou te usar até gozar.",
      "Aurora abre sua calça e segura o pau. — Meu agora. Eu vou cavalgar até não aguentar mais.",
      "Ela te empurra pra trás e se acomoda. — Olha pra mim enquanto eu te fodo."
    ],
    quente_falar_buceta: [
      "Ela cora e abre um pouco as pernas. — Então toca. Eu quero seus dedos dentro.",
      "Aurora segura sua mão e guia. — Tá molhada pra caralho. Sente.",
      "Ela fala ofegante: — Lambe. Eu quero gozar na sua boca."
    ],
    quente_height_play_foder: [
      "Ela envolve seu pescoço com os braços. — Me ergue e me fode. Eu adoro ser pequena pra você.",
      "Aurora geme quando você a levanta. — Porra... você me manuseia como quiser. Eu gosto.",
      "Ela esfrega a buceta no seu pau. — Me usa nessa altura. Eu quero sentir você fundo."
    ],
    quente_cnc_verbal: [
      "Ela engole seco e responde baixo: — Eu autorizo. Me usa. Mesmo se eu falar para.",
      "Aurora olha nos seus olhos. — Eu gosto quando você não escuta. Continua.",
      "Ela treme e fala: — Me fode sem pedir. Eu gozo mais assim."
    ]
  };

  const originalPick = DD.pickVariant;

  DD.pickVariant = function (bucketKey, variants) {
    if (DIRTY_OPENING_PLAYER_BEATS[bucketKey]) {
      const arr = DIRTY_OPENING_PLAYER_BEATS[bucketKey];
      if (originalPick) return originalPick.call(DD, bucketKey, arr);
      return arr[Math.floor(Math.random() * arr.length)];
    }
    if (DIRTY_AURORA_RESPONSES[bucketKey]) {
      const arr = DIRTY_AURORA_RESPONSES[bucketKey];
      if (originalPick) return originalPick.call(DD, bucketKey, arr);
      return arr[Math.floor(Math.random() * arr.length)];
    }
    if (originalPick) return originalPick.call(DD, bucketKey, variants);
    if (!variants || !variants.length) return null;
    return variants[Math.floor(Math.random() * variants.length)];
  };

  DD.DIRTY_OPENING_PLAYER_BEATS = DIRTY_OPENING_PLAYER_BEATS;
  DD.DIRTY_AURORA_RESPONSES = DIRTY_AURORA_RESPONSES;

  AG.DeepDialogue = DD;
})(window.AuroraGame);
