/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni productions / santni studio
   Prólogo RPG, 1º Encontro Ramificado & Viradas de História
   (Foco inicial na estatura baixinha de 1,49m da Aurora -> evolução profunda)
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  AG.NARRATIONS = {
    prologo_1: {
      tag: "🎀 My Favorite Woman Is Small • Capítulo I",
      title: "O Novo Morador do 402",
      paragraphs: [
        {
          type: "text",
          content: "Mudar para o quarto andar do Edifício Sakura era, acima de tudo, uma decisão prática. Aluguel honesto, perto do Café Sakura e silencioso o bastante para você tocar seus projetos digitais sem ninguém te perturbar."
        },
        {
          type: "text",
          content: "Ou pelo menos era o que você pensava até passar o primeiro dia inteiro ouvindo passos rápidos e leves vindo do apartamento vizinho, o 404."
        },
        {
          type: "stage",
          content: "Você tinha a sua vida pra organizar, suas contas pra pagar e sua própria rotina. Ainda não fazia ideia de quem morava do outro lado daquela parede."
        }
      ],
      choices: [
        {
          label: "Avançar para as 23h15 da primeira noite →",
          tone: "sweet",
          nextId: "prologo_2"
        }
      ]
    },

    prologo_2: {
      tag: "🎀 My Favorite Woman Is Small • Capítulo II",
      title: "A Caixa Alta do Corredor",
      paragraphs: [
        {
          type: "text",
          content: "Às 23h12, o seu sinal de rede piscou e caiu. Lembrando do aviso do porteiro sobre o distribuidor que ficava instalado bem no alto da parede do corredor do 4º andar, você abriu a porta e saiu para dar uma olhada."
        },
        {
          type: "text",
          content: "Antes mesmo de você erguer o braço até a caixa metálica lá no alto, a fechadura do 404 girou com tudo. A porta abriu e você olhou para frente — na altura normal dos seus olhos — mas não viu ninguém por meio segundo."
        },
        {
          type: "stage",
          content: "Foi só quando você baixou o olhar até a altura do seu peito que deu de cara com ela."
        }
      ],
      choices: [
        {
          label: "Olhar para baixo e encarar a moradora do 404 →",
          tone: "sweet",
          nextId: "prologo_3"
        }
      ]
    },

    prologo_3: {
      tag: "🎀 My Favorite Woman Is Small • Capítulo III: 1,49m de Audácia",
      title: "A Primeira Coisa que Chama a Atenção",
      paragraphs: [
        {
          type: "text",
          content: "A primeira coisa que salta aos olhos, de forma impossível de disfarçar, é o quão baixinha ela é. Com seus 22 anos e exatos 1,49m de altura, o topo da cabeça dela mal passa da linha do seu peito. Ela está na ponta dos pés, segurando um banquinho dobrável numa mão, com um moletom que nela parece um vestido e o headset pendurado no pescoço."
        },
        {
          type: "quote",
          content: "— Ei! Para onde você tá olhando aí em cima?! Eu tô aqui embaixo, ô poste do 402! E antes que você faça essa cara de quem achou bonitinho eu precisar de banquinho pra alcançar a caixa de rede: eu sou uma mulher adulta muito bem resolvida, a culpa é do síndico que instalou essa porcaria a dois metros do chão!"
        },
        {
          type: "stage",
          content: "Ela ergue o queixo pra te encarar de baixo pra cima, as bochechas levemente coradas pela cena, mas com um brilho provocante, elétrico e abusado nos olhos. É um contraste absurdo: um tamanho compacto e fofo com uma presença que preenche o corredor inteiro."
        }
      ],
      choices: [
        {
          label: "😊 Sorrir com charme e alcançar o cabo lá no alto pra ela: 'Prometo não comentar do banquinho se você me disser o nome da minha nova vizinha.'",
          desc: "Usa a diferença de altura a seu favor com gentileza e bom humor.",
          tone: "sweet",
          nextId: "encontro_2_fofo"
        },
        {
          label: "🔥 Dar meio passo pra perto, fazendo ela erguer ainda mais o rosto: 'Com esse tamanho e essa marra toda, você é um perigo concentrado, sabia?'",
          desc: "Transforma a diferença de altura em tensão provocante logo no primeiro minuto.",
          tone: "hot",
          nextId: "encontro_2_provocante"
        },
        {
          label: "😜 Entrar na zoeira: 'Um metro e meio de pura reclamação às onze da noite! Quer que eu te levante pra você mesma plugar o cabo?'",
          desc: "Brincadeira espontânea sobre a altura dela que testa o humor caótico da Aurora.",
          tone: "sweet",
          nextId: "encontro_2_zoeira"
        },
        {
          label: "👑 Ficar hipnotizado olhando pra ela de cima a baixo e abaixar na hora quando ela aponta pro cabo mandando você consertar.",
          desc: "Mesmo sendo muito mais alto, você cede ao comando dela no primeiro segundo.",
          tone: "ctrl",
          nextId: "encontro_2_controle"
        },
        {
          label: "💢 Fazer piada babaca e desrespeitosa com o tamanho dela e mandá-la parar de encher o saco no corredor.",
          desc: "Atitude grosseira que fere o orgulho dela logo de cara.",
          tone: "risky",
          nextId: "encontro_2_ruim"
        },
        {
          label: "⚠️ Avançar o sinal do nada: segurar ela pela cintura e tentar forçar um clima íntimo sem nem conhecer ela direito.",
          desc: "Atitude completamente precipitada com uma desconhecida — vai dar ruim na certa.",
          tone: "risky",
          nextId: "encontro_2_avanco_errado"
        }
      ]
    },

    encontro_2_avanco_errado: {
      tag: "🚨 Primeiro Contato • Passou Totalmente do Limite",
      title: "O Empurrão no Corredor",
      onEnter: function () {
        AG.applyDeltas({ affinity: -38, discomfort: 58, trust: -10, mood: "irritada" });
        AG.state.sharedStory.firstImpression = "desagradavel";
        AG.addMemory("avanco_desconhecida_corredor", "Tentou agarrar a cintura dela no primeiro minuto sem nem saber o nome dela.", "ruim", true);
      },
      paragraphs: [
        {
          type: "stage",
          content: "Assim que suas mãos tocam a cintura dela sem a menor intimidade, a Aurora arregala os olhos em choque e dá um tapa seco no seu braço, recuando dois passos para trás com o banquinho erguido como escudo."
        },
        {
          type: "quote",
          content: "— TIRA A MÃO DE MIM! Você tá completamente maluco?! Eu nem te conheço, você acabou de mudar pro 402 e acha que pode ir colocando a mão em mim desse jeito?!"
        }
      ],
      choices: [
        {
          label: "🙏 Levantar as mãos, recuar imediatamente e pedir mil desculpas pelo impulso sem noção.",
          tone: "sweet",
          onSelect: function () {
            AG.applyDeltas({ discomfort: -10, dominance: 18, mood: "desconfiada" });
            AG.startSimulatorAfterPrologue("Ela trancou metade da porta, mantendo distância total: 'Fica longe de mim. Se tentar encostar em mim sem permissão de novo, você vai se ver com a administração do prédio.'");
          }
        },
        {
          label: "💢 Ignorar o aviso dela e tentar avançar de novo na porta do 404.",
          tone: "risky",
          onSelect: function () {
            AG.unlockEnding("bad_end_precoce_404");
          }
        }
      ]
    },

    encontro_2_fofo: {
      tag: "🎀 Primeiro Contato • Diferença de Altura & Charme",
      title: "Alcançando o Topo sem Banquinho",
      onEnter: function () {
        AG.applyDeltas({ affinity: 14, trust: 10, mood: "espontanea" });
        AG.state.sharedStory.firstImpression = "fofo";
        AG.addMemory("ajudou_caixa_alta", "Usou sua altura pra alcançar a caixa de cabos pra ela sem tirar sarro do banquinho.", "bom", true);
      },
      paragraphs: [
        {
          type: "stage",
          content: "Quando você estica o braço sem esforço nenhum e encaixa o cabo cinza lá no alto, a Aurora acompanha o movimento olhando pra cima e solta um suspiro entre derrotada e encantada."
        },
        {
          type: "quote",
          content: "— Hum... tá bom, admito que ter um vizinho alto do lado tem suas vantagens práticas. Eu sou a Aurora. Trabalho de dia na confeitaria/estúdio do Café Sakura e de madrugada nos meus projetos digitais aqui no 404."
        },
        {
          type: "stage",
          content: "Ela esconde o banquinho atrás da porta e apoia o ombro no batente, olhando pra você com um sorriso muito mais doce e curioso."
        },
        {
          type: "quote",
          content: "— Todo mundo no começo só repara que eu sou baixinha... Vamos ver se você presta atenção no resto também, vizinho do 402."
        }
      ],
      choices: [
        {
          label: "💗 'A altura só chamou atenção no primeiro segundo. O que me prendeu aqui no corredor foi esse seu sorriso.'",
          tone: "sweet",
          onSelect: function () {
            AG.applyDeltas({ affinity: 12, trust: 8, heat: 6, mood: "dengosa" });
            AG.startSimulatorAfterPrologue("Ela corou até a ponta das orelhas, mordeu o lábio e disse que você já começou marcando ponto demais com ela.");
          }
        },
        {
          label: "🔥 'Eu já reparei em muito mais coisa além da sua altura, Aurora... e confesso que gostei de tudo que vi.'",
          tone: "hot",
          onSelect: function () {
            AG.applyDeltas({ affinity: 8, heat: 18, desire: 12, mood: "provocante" });
            AG.startSimulatorAfterPrologue("O olhar dela desceu até sua boca antes de abrir aquele sorriso atrevido: 'Olha só... mal chegou e já tá me olhando com essa fome toda?'");
          }
        },
        {
          label: "🧋 Entregar a lata de Café Gelado que estava no bolso do seu casaco pra selar a paz entre o 402 e o 404.",
          tone: "sweet",
          onSelect: function () {
            AG.state.flags.gavePrologueCoffee = true;
            AG.applyDeltas({ affinity: 16, trust: 12, mood: "espontanea" });
            AG.addMemory("cafe_primeira_noite", "Conquistou a Aurora na primeira noite com um café gelado de baunilha.", "bom", true);
            AG.startSimulatorAfterPrologue("Ela segurou a lata com as duas mãos como um troféu: 'Pronto, você oficialmente virou meu vizinho favorito!'");
          }
        }
      ]
    },

    encontro_2_provocante: {
      tag: "🔥 Primeiro Contato • Contraste Perigoso",
      title: "Olhando de Baixo pra Cima",
      onEnter: function () {
        AG.applyDeltas({ affinity: 10, heat: 26, desire: 15, mood: "provocante" });
        AG.state.sharedStory.firstImpression = "provocante";
        AG.addMemory("faisca_altura_corredor", "A diferença de altura entre vocês virou pura tensão química logo no primeiro minuto.", "quente", true);
      },
      paragraphs: [
        {
          type: "stage",
          content: "Em vez de se intimidar quando você chega mais perto, a Aurora larga o banquinho no chão, dá um passo à frente até quase encostar o peito no seu e ergue o rosto bem devagar."
        },
        {
          type: "quote",
          content: "— 'Perigo concentrado', é? Você não faz ideia do quanto, 402. Eu sou a Aurora. E pode ir tirando da cabeça que só porque eu sou baixinha eu sou boazinha ou inocente."
        },
        {
          type: "stage",
          content: "Ela apoia a ponta dos dedos no seu peito enquanto fica na ponta dos pés, deixando os lábios perigosamente próximos do seu queixo."
        },
        {
          type: "quote",
          content: "— Gostei do jeito que você me olha de cima... mas cuidado pra não descobrir que quem acaba sem ar aqui é você."
        }
      ],
      choices: [
        {
          label: "🔥 Segurar de leve na cintura dela enquanto alcança o cabo no alto: 'Quero só ver você tentar me deixar sem ar, Aurora.'",
          tone: "hot",
          onSelect: function () {
            AG.applyDeltas({ heat: 22, affinity: 10, desire: 18, mood: "provocante", specialScene: "provocante" });
            AG.startSimulatorAfterPrologue("Sentir sua mão na cintura dela enquanto você consertava o cabo por cima do ombro dela fez a respiração da Aurora falhar de pura tensão.");
          }
        },
        {
          label: "💗 Sorrir perto do rosto dela e falar num tom mais macio: 'Compacta, linda e atrevida. Acho que tirei a sorte grande nesse prédio.'",
          tone: "sweet",
          onSelect: function () {
            AG.applyDeltas({ affinity: 16, heat: 16, trust: 10, mood: "dengosa" });
            AG.startSimulatorAfterPrologue("A mistura de elogio doce com a tensão de perto desmontou a pose dela num sorriso derretido.");
          }
        },
        {
          label: "👑 Deixar a mão dela no seu peito ditar a distância: 'Se você mandar, eu abaixo até a sua altura sempre que você quiser.'",
          tone: "ctrl",
          onSelect: function () {
            AG.applyDeltas({ dominance: 22, heat: 16, desire: 14, mood: "controladora", specialScene: "controle" });
            AG.startSimulatorAfterPrologue("Um sorriso vitorioso e dominante surgiu no rosto dela: 'Ouviu isso? Nem precisei fazer força e já tenho um cara desse tamanho na minha mão.'");
          }
        }
      ]
    },

    encontro_2_zoeira: {
      tag: "⚡ Primeiro Contato • Sintonia & Provocação",
      title: "Te Levantar no Colo pra Alcançar?",
      onEnter: function () {
        AG.applyDeltas({ affinity: 14, heat: 12, trust: 10, mood: "caotica" });
        AG.state.sharedStory.firstImpression = "engracado";
        AG.addMemory("piada_levantar_colo", "Brincou oferecendo levantar ela no colo pra alcançar a caixa do corredor.", "quente", true);
      },
      paragraphs: [
        {
          type: "stage",
          content: "A Aurora abre a boca num 'O' de pura indignação teatral, mas as bochechas coram na hora com a imagem mental de você levantando ela pela cintura."
        },
        {
          type: "quote",
          content: "— ME LEVANTAR?! Olha a audácia desse ser humano que acabou de mudar pro prédio! Eu tenho 1,49m de pura dignidade e ódio acumulado, tá me ouvindo?!"
        },
        {
          type: "stage",
          content: "Ela não aguenta a própria cara de brava por três segundos e cai na risada, dando um soquinho leve no seu braço."
        },
        {
          type: "quote",
          content: "— Prazer, eu sou a Aurora! Conserta logo esse cabo aí em cima pra mim antes que eu aceite a oferta só pra você ver que eu sou pesada de personalidade!"
        }
      ],
      choices: [
        {
          label: "😄 Plugar o cabo rindo: 'Pronto, salvo! Mas a oferta de te levantar quando precisar pegar coisa na prateleira alta continua de pé.'",
          tone: "sweet",
          onSelect: function () {
            AG.applyDeltas({ affinity: 14, trust: 12, mood: "espontanea" });
            AG.startSimulatorAfterPrologue("'Bobo!' Ela riu alto, já completamente à vontade com você no corredor.");
          }
        },
        {
          label: "🔥 Plugar o cabo e olhar pra ela de cima: 'Pelo menos você cabe direitinho debaixo do meu braço.'",
          tone: "hot",
          onSelect: function () {
            AG.applyDeltas({ affinity: 12, heat: 16, mood: "provocante" });
            AG.startSimulatorAfterPrologue("Ela mordeu o lábio escondendo o sorriso: 'Olha ele usando argumento físico pra flertar comigo... pior que foi boa.'");
          }
        }
      ]
    },

    encontro_2_controle: {
      tag: "👑 Primeiro Contato • Pequena no Tamanho, Gigante no Domínio",
      title: "Quando 1,49m Fazem Você Abaixar a Cabeça",
      onEnter: function () {
        AG.applyDeltas({ dominance: 28, heat: 14, discomfort: 5, mood: "controladora" });
        AG.state.sharedStory.firstImpression = "tenso";
        AG.state.sharedStory.controlEventsSeen += 1;
        AG.addMemory("dominado_por_149m", "Mesmo sendo muito mais alto, você ficou intimidado e obedeceu a Aurora no primeiro minuto.", "controle", true);
      },
      paragraphs: [
        {
          type: "stage",
          content: "A Aurora percebe na hora a ironia deliciosa da cena: você tem muito mais altura que ela, mas bastou ela erguer o olhar e apontar para o cabo que você obedeceu em silêncio."
        },
        {
          type: "quote",
          content: "— Olha só que interessante... Desse tamanho todo e ficou mansinho só porque eu falei mais firme? Eu sou a Aurora. E acho que você acabou de me revelar o seu ponto fraco."
        },
        {
          type: "stage",
          content: "Ela puxa a sua camisa de leve pela barra, obrigando você a se curvar um pouco até ficar na altura dos olhos dela."
        },
        {
          type: "quote",
          content: "— Quando eu falar com você, você abaixa até a minha altura e me ouve direitinho. Entendeu como vai funcionar esse quarto andar?"
        }
      ],
      choices: [
        {
          label: "👑 Continuar inclinado na altura do rosto dela e concordar sem discutir.",
          tone: "ctrl",
          onSelect: function () {
            AG.applyDeltas({ dominance: 24, heat: 16, desire: 16, mood: "controladora", specialScene: "controle" });
            AG.state.sharedStory.controlEventsSeen += 1;
            AG.startSimulatorAfterPrologue("Ela sorriu satisfeita, soltando sua camisa devagar: 'Bom garoto. A altura é sua, mas quem manda aqui sou eu.'");
          }
        },
        {
          label: "🔥 Aproveitar que ela puxou sua camisa pra falar bem perto da boca dela: 'Eu abaixo, mas é porque daqui de perto a vista é melhor.'",
          tone: "hot",
          onSelect: function () {
            AG.applyDeltas({ heat: 22, dominance: 10, affinity: 10, mood: "provocante" });
            AG.startSimulatorAfterPrologue("Ela piscou surpresa com o contra-ataque tão de perto e abriu um sorriso malicioso: 'Hmmm, sabe morder de volta... gostei.'");
          }
        }
      ]
    },

    encontro_2_ruim: {
      tag: "⚠️ Primeiro Contato • Orgulho Ferido",
      title: "O Pavio Curto do 404",
      onEnter: function () {
        AG.applyDeltas({ affinity: -30, discomfort: 48, mood: "irritada" });
        AG.state.sharedStory.firstImpression = "desagradavel";
        AG.addMemory("ofendeu_altura_inicio", "Fez comentário grosseiro e desrespeitoso logo quando conheceu a Aurora.", "ruim", true);
      },
      paragraphs: [
        {
          type: "stage",
          content: "O rosto da Aurora fecha instantaneamente. Se havia qualquer traço fofo ou brincalhão nela um segundo atrás, agora só resta um olhar cortante e furioso."
        },
        {
          type: "quote",
          content: "— Você me chamou do quê?! Além de derrubar a porcaria da minha rede, você acha que pode falar comigo nesse tom ridículo? Eu odeio gente sem noção!"
        }
      ],
      choices: [
        {
          label: "🙏 Pedir desculpas na hora, dizer que falou besteira sem pensar e consertar o cabo pra ela.",
          tone: "sweet",
          onSelect: function () {
            AG.applyDeltas({ affinity: 10, discomfort: -14, dominance: 14, mood: "desconfiada" });
            AG.startSimulatorAfterPrologue("Ela cruzou os braços: 'Conserta isso aí e não repete essa gracinha nunca mais se quiser ter paz nesse andar.'");
          }
        },
        {
          label: "👑 Engolir a bronca dela calado, percebendo que mesmo brava ela continua te atraindo.",
          tone: "ctrl",
          onSelect: function () {
            AG.applyDeltas({ dominance: 30, discomfort: 12, mood: "controladora" });
            AG.state.sharedStory.controlEventsSeen += 2;
            AG.startSimulatorAfterPrologue("Ela viu você recuar diante da raiva dela e soltou um sorriso frio: 'Abaixou a bola rápido, né? Agora eu sei exatamente como lidar com você.'");
          }
        },
        {
          label: "💢 Continuar sendo extremamente grosso e invasivo na porta dela.",
          desc: "⚠️ Consequência real imediata: pode encerrar sua história agora mesmo!",
          tone: "risky",
          onSelect: function () {
            AG.unlockEnding("bad_end_precoce_404");
          }
        }
      ]
    },

    transicao_404_desbloqueado: {
      tag: "🔑 Virada da História • Além da Primeira Impressão",
      title: "Quando o Foco Já Mudou Completamente",
      paragraphs: [
        {
          type: "text",
          content: "Na primeira noite, tudo o que você via era uma vizinha baixinha de 1,49m brigando com uma caixa de cabos alta demais no corredor."
        },
        {
          type: "text",
          content: "Hoje, conforme ela destranca a porta do 404 e puxa você pela mão para dentro do mundo dela, você percebe como o foco mudou por completo: é o perfume doce dela, o jeito provocante como ela te olha de baixo pra cima, o humor caótico e a presença gigante que ela tem na sua vida."
        },
        {
          type: "quote",
          content: "— Entra logo, grandão... O 404 agora também é o nosso território."
        }
      ],
      choices: [
        {
          label: "Entrar no Apê 404 da Aurora →",
          tone: "sweet",
          onSelect: function () {
            AG.state.mode = "simulator";
            AG.state.currentLocation = "ape_404";
          }
        }
      ]
    },

    transicao_teia_controle: {
      tag: "👑 Virada Psicológica • Na Palma da Mão Pequena Dela",
      title: "O Jogo de Controle da Aurora",
      paragraphs: [
        {
          type: "text",
          content: "Quem olha de fora vê um cara muito mais alto ao lado de uma mulher baixinha de 1,49m com laço fofo e cara de anjo. Mas entre quatro paredes, a realidade é o exato oposto."
        },
        {
          type: "text",
          content: "Mesmo nos dias em que tudo deu errado, mesmo quando você sentiu desconforto ou tentou resistir, você nunca conseguiu ir embora. E a Aurora sabe disso melhor do que ninguém."
        },
        {
          type: "quote",
          content: "— Olha pra você... Basta eu puxar a sua gola pra baixo que você esquece qualquer reclamação e faz tudo do meu jeito, não é?"
        }
      ],
      choices: [
        {
          label: "Continuar preso na teia dela →",
          tone: "ctrl",
          onSelect: function () {
            AG.state.mode = "simulator";
          }
        }
      ]
    }
  };

  AG.startSimulatorAfterPrologue = function (closingSummary) {
    const s = AG.state;
    s.mode = "simulator";
    s.sharedStory.metInCorridor = true;
    s.unlocks.knowsAuroraName = true;
    s.currentLocation = "corredor_4andar";
    AG.checkHubAndStoryProgression();
    AG.refreshAuroraActivity();
    AG.recalculateDynamic();
    AG.clearFeed();
    AG.pushFeed({
      type: "aurora",
      action: "*Na porta do 404, olhando de baixo pra cima pra você*",
      speech: closingSummary
    });
    AG.saveGame("autosave");
  };
})(window.AuroraGame);
