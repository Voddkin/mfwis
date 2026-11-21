/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Motor de Conversas Contínuas & Ramificação Orgânica Multi-Turno (v6)
   ==========================================================================
   COMO FUNCIONA:
   - Ao abrir um assunto, você entra numa conversa viva e contínua com a Aurora.
   - Cada escolha gera 4 a 6 novas respostas contextuais que acompanham o fio
     da conversa (carinho, química, jogo mental, atrito, emoção ativa, dossiê).
   - Você decide quando aprofundar, mudar de assunto no meio do papo ou encerrar.
   - 100% baseado em dados puros (JSON) — totalmente seguro para Save/Load.
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  function pickLine(lines, seedOffset = 0) {
    if (!lines || !lines.length) return "";
    const s = AG.state || { totalActionsTaken: 0, day: 1 };
    const idx = Math.abs((s.totalActionsTaken || 0) + (s.day || 1) + seedOffset) % lines.length;
    return lines[idx];
  }

  AG.INTERACTION_TOPICS = {
    // ------------------------------------------------------------------------
    // ABA 1: CONVERSAR (11 Assuntos Naturais)
    // ------------------------------------------------------------------------
    conversar: [
      {
        id: "papo_diferenca_altura",
        title: "Brincar sobre a diferença de altura de vocês",
        desc: "O detalhe que chamou sua atenção no primeiro dia — e muda de tom conforme vocês ficam mais próximos.",
        costMins: 15,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Fica na ponta dos pés do seu lado, medindo o topo da cabeça dela no seu peito com um sorriso dengoso*",
            speech: "No primeiro dia você só me via como 'a baixinha do 404', né? Confessa agora: meu 1,49m tem exatamente a medida certa pra encaixar debaixo do seu queixo quando você me abraça."
          },
          hot: {
            action: "*Ergue o rosto bem de pertinho, com aquele olhar atrevido de baixo pra cima que desmonta qualquer defesa*",
            speech: "Todo mundo acha que porque eu tenho 1,49m eu sou inofensiva... até ficar a dois centímetros de mim e descobrir que tamanho compacto concentra muito mais provocação."
          },
          ctrl: {
            action: "*Puxa você pela gola da camisa até você se curvar na altura dos olhos dela*",
            speech: "Gosto da ironia de você ter toda essa altura e mesmo assim bastar eu puxar sua gola pra você ficar quietinho me olhando de baixo."
          },
          cold: {
            action: "*Cruza os braços e ergue o queixo irritada*",
            speech: "Se veio fazer piadinha sem graça sobre a minha altura hoje, economiza o fôlego."
          },
          neutral: {
            action: "*Coloca as mãos na cintura fazendo pose dramática*",
            speech: "Olha aqui, 1,49m é altura aerodinâmica de elite! Só dá trabalho na hora de pegar caneca na prateleira de cima do armário."
          }
        }
      },
      {
        id: "papo_uniforme_turno",
        title: "Comentar sobre o uniforme de trabalho dela",
        desc: "Falar sobre o turno dela no Café/Estúdio Sakura e como o uniforme cai nela.",
        costMins: 15,
        tone: "hot",
        openings: {
          sweet: {
            action: "*Dá uma voltinha rápida mostrando o caimento do uniforme e sorri meio encabulada*",
            speech: "Passo a tarde inteira com esse uniforme atendendo e organizando o estúdio do Café Sakura... mas confesso que só fico animada quando vejo que é você olhando."
          },
          hot: {
            action: "*Ajeita a barra do uniforme devagar, percebendo na hora para onde o seu olhar escapou*",
            speech: "Eu vi exatamente pra onde você olhou quando eu apareci de uniforme... Quer que eu não tire ele tão cedo hoje quando a gente subir pro quarto andar?"
          },
          ctrl: {
            action: "*Alisa o tecido do uniforme com um sorriso confiante*",
            speech: "Basta eu aparecer de uniforme que você perde metade do vocabulário. Fica aí admirando enquanto eu decido se você merece minha atenção."
          },
          cold: {
            action: "*Suspira cansada do turno*",
            speech: "Acabei de passar horas em pé nesse uniforme, não tô com paciência pra papo torto."
          },
          neutral: {
            action: "*Olha pro próprio uniforme e ri*",
            speech: "Tiveram que mandar ajustar a barra duas vezes porque o tamanho P padrão ainda ficava enorme nos meus 1,49m."
          }
        }
      },
      {
        id: "papo_madrugada_insonia",
        title: "Falar sobre a insônia e as madrugadas no quarto andar",
        desc: "Por que as melhores conversas de vocês acontecem quando o resto do prédio apaga.",
        costMins: 15,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Abraça os joelhos no canto e olha pra você com um sorriso calmo*",
            speech: "Antes de você mudar pro 402, minhas madrugadas eram só tela brilhando e silêncio. Agora eu fico esperando dar onze horas só pra ter você por perto."
          },
          hot: {
            action: "*Estica o corpo devagar e te lança um olhar lento, carregado de intenção*",
            speech: "Depois da meia-noite o meu filtro vai embora... e o foco da minha cabeça para de ser trabalho e passa a ser você."
          },
          ctrl: {
            action: "*Gira o celular nos dedos com um sorriso soberano*",
            speech: "Adoro como você trocou seu horário de sono inteiro só pra ficar disponível na hora que eu quero conversar."
          },
          cold: {
            action: "*Olha pro relógio sem entusiasmo*",
            speech: "Eu tô acordada porque tenho entrega. Se não for falar nada que preste, me deixa produzir."
          },
          neutral: {
            action: "*Ajusta o headset no pescoço rindo*",
            speech: "Dormir cedo é pra quem não tem quarenta abas abertas na cabeça às duas da manhã."
          }
        }
      },
      {
        id: "papo_artes_projetos_dela",
        title: "Perguntar sobre os desenhos e projetos dela",
        desc: "Sair da superfície e mergulhar no talento criativo e nos rascunhos que ela guarda.",
        costMins: 20,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Puxa você pela manga pra mostrar o tablet de desenho com os olhos brilhando*",
            speech: "Olha como ficou esse traço! Eu adoro quando você pergunta das minhas criações... mostra que você enxerga muito além da minha fachada caótica."
          },
          hot: {
            action: "*Morde a pontinha do lábio segurando o tablet contra o peito*",
            speech: "Tem a pasta de projetos pros clientes... e tem a pasta com senha que eu desenho quando tô pensando em nós dois de madrugada."
          },
          ctrl: {
            action: "*Ergue uma sobrancelha desafiadora*",
            speech: "Quer ver o que eu ando criando? Só mostro pra quem sabe me elogiar direito."
          },
          cold: {
            action: "*Bloqueia a tela do tablet*",
            speech: "Hoje não tô a fim de mostrar rascunho nenhum."
          },
          neutral: {
            action: "*Gesticula animada contando dos projetos*",
            speech: "Passei três horas desenhando um laço rosa perfeito numa arte hoje e fiquei orgulhosa demais!"
          }
        }
      },
      {
        id: "papo_cronicamente_online",
        title: "Rir de besteiras da internet e memes aleatórios",
        desc: "Entrar na sintonia rápida, ácida e espontânea dela.",
        costMins: 15,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Cola o ombro no seu pra mostrar a tela do celular segurando a risada*",
            speech: "Salvei três vídeos seguidos porque todos eles tinham exatamente a nossa energia. Vem ver isso aqui!"
          },
          hot: {
            action: "*Ri baixinho olhando pra você de canto*",
            speech: "Meu algoritmo só me recomenda vídeo de casal com diferença de altura absurda e provocação... acho que meu celular anda ouvindo nossas conversas."
          },
          ctrl: {
            action: "*Sopra uma mecha de cabelo com ironia*",
            speech: "Tava lendo sobre caras que juram que estão no comando mas fazem tudo que uma baixinha manda. Lembrou alguém?"
          },
          cold: {
            action: "*Rola o feed sem olhar pra você*",
            speech: "Tô ocupada respondendo gente mais agradável aqui."
          },
          neutral: {
            action: "*Solta uma gargalhada contagiosa*",
            speech: "Se a internet acabasse amanhã eu tinha que ser reiniciada de fábrica!"
          }
        }
      },
      {
        id: "papo_me_pergunta_algo",
        title: "Deixar ela te fazer uma pergunta na lata",
        desc: "Abrir espaço para ela te colocar contra a parede sem filtro.",
        costMins: 15,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Apoia o queixo nas duas mãos e olha pra cima pros seus olhos*",
            speech: "Então me diz a verdade: quando foi que você parou de me ver só como a vizinha baixinha do 404 e começou a gostar de mim de verdade?"
          },
          hot: {
            action: "*Diminui a distância e baixa o tom de voz*",
            speech: "Minha pergunta é direta: qual foi a coisa mais atrevida que já passou pela sua cabeça quando me viu de uniforme ou de moletom aqui?"
          },
          ctrl: {
            action: "*Sorri com calma dominadora*",
            speech: "Me responde sem gaguejar: por que mesmo quando eu te trato com dureza você não consegue dar meia-volta e me esquecer?"
          },
          cold: {
            action: "*Encara você séria*",
            speech: "Você pretende mudar esse seu jeito comigo ou tá querendo que eu tranque a porta do 404 pra sempre?"
          },
          neutral: {
            action: "*Sorri travessa*",
            speech: "Manda na lata: qual foi a primeira coisa que você pensou no segundo em que eu abri a porta com aquele banquinho na mão?"
          }
        }
      },
      {
        id: "papo_sua_vida_trabalho",
        title: "Contar como andam o seu trabalho e a sua semana",
        desc: "Dividir a sua própria rotina e deixar ela te conhecer melhor.",
        costMins: 15,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Segura sua mão com as duas mãos pequenas dela num gesto acolhedor*",
            speech: "Eu gosto tanto quando você divide a sua vida comigo... Você trabalha duro demais, merece todo o carinho do mundo quando chega perto de mim."
          },
          hot: {
            action: "*Sorri de canto passando o dedo pelo seu braço*",
            speech: "Trabalhou demais hoje, foi? Deixa comigo que eu sei exatamente como tirar sua cabeça das planilhas e fazer seu coração acelerar."
          },
          ctrl: {
            action: "*Te avalia de cima a baixo*",
            speech: "Trabalha direitinho mesmo. Quero você com a vida em ordem pra poder se dedicar a mim sem desculpa."
          },
          cold: {
            action: "*Dá de ombros*",
            speech: "Cada um com seus boletos, 402."
          },
          neutral: {
            action: "*Bate no seu braço em solidariedade*",
            speech: "A luta contra os boletos une o quarto andar inteiro! Como tão os seus projetos essa semana?"
          }
        }
      },
      {
        id: "papo_o_que_acha_de_mim",
        title: "Perguntar o que ela realmente sente por você",
        desc: "Ouvir sem rodeios em que pé está a cabeça e o coração da Aurora.",
        costMins: 15,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Corando dos pés à cabeça, ela encosta a testa no seu peito por um segundo antes de olhar pra cima*",
            speech: "Eu acho que você virou a minha pessoa favorita no mundo inteiro... e que eu adoro cada centímetro de diferença entre nós dois quando você me abraça."
          },
          hot: {
            action: "*Sustenta seu olhar com puro fogo*",
            speech: "Eu acho que a tensão entre nós dois já passou do ponto de retorno faz tempo... e que cada vez que você chega perto meu corpo inteiro reage."
          },
          ctrl: {
            action: "*Sorri satisfeita, tocando seu queixo*",
            speech: "Eu acho que você é completamente meu. Pode até tentar bancar o independente no 402, mas quem governa sua cabeça sou eu."
          },
          cold: {
            action: "*Expressão fechada e sincera*",
            speech: "Agora? Você tá desperdiçando todas as chances que eu te dei e me deixando cada vez mais desconfortável."
          },
          neutral: {
            action: "*Sorri espontânea*",
            speech: "Acho que você começou como o cara alto que derrubou minha internet e agora tá virando minha companhia favorita do prédio."
          }
        }
      },
      {
        id: "conversar_otimizar_pc_dela",
        title: "Dar um jeito no PC e no tablet gráfico dela",
        desc: "Resolve travamentos nas artes dela e rende bastante admiração.",
        skillHint: "Usa Código (20+ dá bônus extra)",
        costMins: 20,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Testa a caneta na tela com os olhos brilhando e se joga no seu pescoço*",
            speech: "MEU DEUS, O TRAÇO TÁ ZERO DELAY! Como você fez isso em cinco minutos?! Você é literalmente o meu gênio particular!"
          },
          hot: {
            action: "*Encosta no seu ombro enquanto você mexe no teclado dela, respirando pertinho do seu pescoço*",
            speech: "Ver você mexendo no meu PC com essa segurança toda... confesso que inteligência técnica assim me deixa bem atraída."
          },
          ctrl: {
            action: "*Sorri satisfeita testando a velocidade do monitor*",
            speech: "Muito bom ter um especialista morando na porta ao lado pra resolver meus problemas na hora que eu preciso."
          },
          cold: {
            action: "*Testa o programa e suaviza a expressão na hora*",
            speech: "...Tá, admito que isso aqui me salvou horas de trabalho hoje. Valeu mesmo."
          },
          neutral: {
            action: "*Bate palmas impressionada olhando a tela*",
            speech: "Caraca! Você destravou minha memória inteira! Ganhou moral demais comigo agora!"
          }
        }
      },
      {
        id: "conversar_notar_detalhe_percepcao",
        title: "Comentar um detalhe sutil que você reparou nela hoje",
        desc: "Mostra que você presta atenção nas entrelinhas do humor e do visual dela.",
        skillHint: "Usa Percepção",
        costMins: 15,
        tone: "sweet",
        openings: {
          sweet: {
            action: "*Leva a mão ao laço no cabelo, surpresa e encantada*",
            speech: "Você reparou que eu mudei o jeito de prender o laço e que eu tava com dor no pulso de desenhar?! Ninguém nunca presta essa atenção toda em mim..."
          },
          hot: {
            action: "*Morde o lábio inferior, sentindo-se lida pelo seu olhar atento*",
            speech: "Você repara em cada microdetalhe meu, né? Esse seu olhar me analisando dos pés à cabeça dá até um calor..."
          },
          ctrl: {
            action: "*Ergue o queixo lisonjeada*",
            speech: "Olha só como você me estuda direitinho... Gosto que seus olhos estejam sempre atentos a tudo que diz respeito a mim."
          },
          cold: {
            action: "*Pisca surpresa, perdendo parte da pose dura*",
            speech: "...Não achei que você fosse reparar nisso. Pelo menos atento você sabe ser."
          },
          neutral: {
            action: "*Arregala os olhos impressionada*",
            speech: "Nossa, você tem olho de águia aí de cima, hein?! Reparou mesmo!"
          }
        }
      },
      {
        id: "conversar_elogio_calculado",
        title: "Fazer um elogio certeiro bem no ponto sensível dela",
        desc: "Fala exatamente o que ela precisava ouvir para desmontar a guarda dela.",
        skillHint: "Combina Lábia + Percepção (28+ = efeito máximo)",
        costMins: 15,
        tone: "hot",
        openings: {
          sweet: {
            action: "*Desvia o olhar completamente corada, mexendo na barra do moletom sem saber onde esconder o rosto*",
            speech: "Como é que você sempre sabe exatamente a frase que faz minha postura inteira desmoronar?! Isso é covardia comigo..."
          },
          hot: {
            action: "*Dá meio passo pra frente, os lábios entreabertos e o olhar completamente fisgado pelo seu*",
            speech: "Você escolheu cada palavra desse elogio sabendo o efeito que ia causar em mim, né? Pois parabéns: acertou bem no alvo."
          },
          ctrl: {
            action: "*Tenta manter a pose superior, mas o rubor nas bochechas entrega que você acertou o ponto fraco dela*",
            speech: "...Você é bem esperto com as palavras quando quer me agradar. Gostei. Continua tentando me ganhar assim."
          },
          cold: {
            action: "*Cruza os braços, mas a respiração falha por um segundo diante da precisão do que você disse*",
            speech: "...Não acha que um elogio certeiro vai apagar tudo, mas admito que você soube tocar num ponto que ninguém repara."
          },
          neutral: {
            action: "*Pisca três vezes seguidas, pega totalmente de surpresa pelo seu comentário certeiro*",
            speech: "Eita... você leu a minha mente agora ou andou estudando psicologia de madrugada?!"
          }
        }
      }
    ],

    // ------------------------------------------------------------------------
    // ABA 2: CARINHO & CHAMEGO (4 Assuntos Íntimos)
    // ------------------------------------------------------------------------
    chamego: [
      {
        id: "chamego_abraco_altura_peito",
        title: "Puxar ela pra um abraço na altura do seu peito",
        desc: "Aproveitar a diferença de altura para um abraço quente e protetor.",
        costMins: 15,
        tone: "sweet",
        specialScene: "chamego",
        openings: {
          sweet: {
            action: "*Ela envolve sua cintura com força, apoia a bochecha bem em cima do seu coração e fecha os olhos derretida*",
            speech: "Hmmm... sabia que a melhor parte de ter 1,49m é que quando você me abraça assim, meu ouvido fica exatamente em cima do seu coração batendo?"
          },
          hot: {
            action: "*Cola o corpo inteiro no seu no abraço e ergue o rosto roçando os lábios no seu pescoço*",
            speech: "Seu abraço começa todo fofo e protetor... mas sentir seu coração acelerando assim contra mim me dá vontade de muito mais."
          },
          ctrl: {
            action: "*Aceita o abraço satisfeita, acomodando-se em você como dona do território*",
            speech: "Isso, me envolve direitinho. Gosto de sentir que você usa esse seu tamanho todo pra me proteger e me mimar."
          },
          cold: {
            action: "*Recua antes de você fechar o abraço*",
            speech: "Sem abraço agora. Conserta o clima entre a gente primeiro."
          },
          neutral: {
            action: "*Surpresa, ela retribui o abraço quase sumindo nos seus braços e dá uma risadinha fofa*",
            speech: "Nossa, você me envelopou inteira nesse abraço! Quentinho demais!"
          }
        }
      },
      {
        id: "chamego_levantar_prateleira",
        title: "Alcançar algo no alto ou erguê-la de leve pela cintura",
        desc: "Um momento espontâneo e cheio de química usando a estatura de vocês.",
        costMins: 15,
        tone: "sweet",
        specialScene: "levantandoEla",
        openings: {
          sweet: {
            action: "*Solta um gritinho surpreso quando seus braços a envolvem, segurando nos seus ombros enquanto ri corada*",
            speech: "Ai, meu Deus! Você me levanta como se eu fosse uma pluma! ...Não me solta rápido não, gostei de ficar na altura dos seus olhos."
          },
          hot: {
            action: "*Com as mãos apoiadas nos seus ombros e o rosto finalmente na mesma altura que o seu, ela olha direto pra sua boca*",
            speech: "Agora que você me trouxe até a altura da sua boca... vai aproveitar ou só queria mostrar que tem força nos braços?"
          },
          ctrl: {
            action: "*Sorri lá de cima segurando na sua nuca*",
            speech: "Pronto, meu elevador particular funcionando perfeitamente. Não me desce até eu mandar."
          },
          cold: {
            action: "*Dá um tapa na sua mão na hora*",
            speech: "Nem inventa de tentar me pegar no colo com a gente brigado!"
          },
          neutral: {
            action: "*Fica vermelha até a raiz do cabelo mas abre um sorriso gigante*",
            speech: "Eita, que facilidade foi essa?! Assim você humilha meu banquinho dobrável!"
          }
        }
      },
      {
        id: "chamego_cafune_laco",
        title: "Fazer carinho no rosto dela e ajeitar o laço no cabelo",
        desc: "Gesto delicado que desarma a pose marrenta dela.",
        costMins: 15,
        tone: "sweet",
        specialScene: "chamego",
        openings: {
          sweet: {
            action: "*Inclina a cabeça na palma da sua mão como uma gatinha manhosa, suspirando baixinho*",
            speech: "Quando você faz carinho no meu rosto com essa delicadeza toda, toda a minha marra evapora em dois segundos..."
          },
          hot: {
            action: "*Vira o rosto e dá um beijo lento na palma da sua mão sem tirar os olhos dos seus*",
            speech: "Sua mão no meu rosto é tão boa... mas eu quero sentir ela descendo mais um pouco."
          },
          ctrl: {
            action: "*Deixa você ajeitar o cabelo dela com expressão de rainha*",
            speech: "Ajeita com cuidado mesmo. Gosto quando você me trata com devoção."
          },
          cold: {
            action: "*Desvia o rosto*",
            speech: "Não vem tentar me amolecer com cafuné agora não."
          },
          neutral: {
            action: "*Sorri tímida mexendo na barra do moletom*",
            speech: "Ficou certinho meu cabelo? Você tem a mão super delicada pra um cara desse tamanho!"
          }
        }
      },
      {
        id: "chamego_declarar_amor",
        title: "Olhar nos olhos dela e dizer que ela é a sua favorita",
        desc: "A declaração central — sincera, direta e difícil de esquecer.",
        reqGate: "topic_declare_love",
        costMins: 20,
        tone: "sweet",
        specialScene: "chamego",
        openings: {
          sweet: {
            action: "*Os olhos dela ficam marejados de felicidade e ela fica na ponta dos pés para envolver seu pescoço*",
            speech: "Repete isso mais uma vez... Ouvir que eu sou a sua mulher favorita faz meu coração bater tão forte que nem cabe dentro de mim!"
          },
          hot: {
            action: "*Puxa você pelo colarinho para um encontro de respirações ardente*",
            speech: "Sua mulher favorita, é? Então vem provar o quanto você é louco por mim agora mesmo."
          },
          ctrl: {
            action: "*Sorri com orgulho absoluto, acariciando sua nuca*",
            speech: "É claro que eu sou a sua favorita. Depois de me conhecer, nenhuma outra mulher no mundo teria chance na sua cabeça."
          },
          cold: {
            action: "*Cruza os braços cética*",
            speech: "Discurso lindo, pena que suas últimas atitudes não combinaram com isso."
          },
          neutral: {
            action: "*Corando intensamente, ela esconde o rosto no seu peito por três segundos*",
            speech: "Nossa... você falou isso num tom tão sincero que me deixou completamente boba agora!"
          }
        }
      }
    ],

    // ------------------------------------------------------------------------
    // ABA 3: PROVOCAR & QUÍMICA (5 Assuntos)
    // ------------------------------------------------------------------------
    provocar: [
      {
        id: "quente_encurralar_parede",
        title: "Apoiar a mão na parede perto do ombro dela e olhar de perto",
        desc: "Usar a proximidade e a diferença de altura para criar tensão elétrica.",
        costMins: 15,
        tone: "hot",
        specialScene: "paredeCorredor",
        openings: {
          sweet: {
            action: "*Prende a respiração olhando pra cima, o peito subindo e descendo rápido enquanto as bochechas queimam*",
            speech: "Q-quando você me cerca na parede desse jeito olhando de cima... minhas pernas ficam bambas na hora..."
          },
          hot: {
            action: "*Em vez de encolher, ela umedece os lábios, arqueia as costas e desliza as mãos pelo seu abdômen*",
            speech: "Acha que me encurralou na parede, grandão? Olha bem pra minha cara e vê quem é que tá provocando quem aqui..."
          },
          ctrl: {
            action: "*Sorri de baixo pra cima sem um pingo de medo e segura você pela cintura*",
            speech: "Pode apoiar a mão na parede o quanto quiser... quem decide o que acontece nesse espaço entre nós dois ainda sou eu."
          },
          cold: {
            action: "*Empurra seu peito com firmeza*",
            speech: "Sai da frente! Não vem fazer pose na parede comigo quando eu tô brava com você!"
          },
          neutral: {
            action: "*O coração dela dispara visivelmente com o movimento repentino*",
            speech: "Eita... cena de romance perigoso ao vivo no quarto andar! Você quer me matar do coração?!"
          }
        }
      },
      {
        id: "quente_provocar_uniforme_moletom",
        title: "Fazer uma provocação ousada sobre a roupa dela",
        desc: "Elogio quente e direto sem rodeios.",
        costMins: 15,
        tone: "hot",
        specialScene: "uniformeProvocante",
        openings: {
          sweet: {
            action: "*Morde o lábio inferior toda corada, mas puxa a barra da roupa só um pouquinho pra te provocar de volta*",
            speech: "Você fica me olhando desse jeito intenso... me dá uma mistura de vergonha com vontade de chegar mais perto."
          },
          hot: {
            action: "*Inclina o corpo pra frente de propósito, sustentando seu olhar com um sorriso cheio de malícia*",
            speech: "Gostou da vista? Eu posso ser baixinha, mas sei muito bem o efeito que cada curva minha faz na sua cabeça."
          },
          ctrl: {
            action: "*Cruza os braços devagar, deixando você admirar enquanto sorri superior*",
            speech: "Olha mesmo. Sofre um pouquinho de vontade aí, porque você só toca quando merecer."
          },
          cold: {
            action: "*Fecha a roupa e te corta seco*",
            speech: "Guarda esse olhar pra você, não te dei essa liberdade hoje."
          },
          neutral: {
            action: "*Abre um sorriso atrevido e pisca um olho*",
            speech: "Opa! Alguém perdeu totalmente a discrição no olhar hoje, hein?!"
          }
        }
      },
      {
        id: "quente_sussurrar_pescoco",
        title: "Abaixar até a orelha dela e sussurrar o que você está pensando",
        desc: "Voz baixa no ouvido que faz a tensão explodir.",
        reqGate: "topic_spicy_soft",
        costMins: 20,
        tone: "hot",
        specialScene: "paredeCorredor",
        openings: {
          sweet: {
            action: "*Solta um suspiro audível e agarra sua manga com força, arrepiada da nuca aos pés*",
            speech: "Não fala isso assim tão baixinho no meu ouvido... você sabe que eu perco todo o juízo quando você faz isso."
          },
          hot: {
            action: "*Vira o rosto no mesmo segundo, deixando sua boca roçar na dela enquanto fala num fôlego só*",
            speech: "Falar no meu ouvido é fácil... quero ver você fazer metade do que acabou de sussurrar quando a porta trancar."
          },
          ctrl: {
            action: "*Segura sua nuca mantendo você curvado na altura dela*",
            speech: "Hmmm... tanta vontade reprimida nesse sussurro. Continua implorando baixinho no meu ouvido que eu gosto."
          },
          cold: {
            action: "*Afasta a cabeça irritada*",
            speech: "Para de sussurrar no meu ouvido! Respeita meu espaço!"
          },
          neutral: {
            action: "*Arrepia inteira e dá um passo pro lado com a mão na orelha, corada*",
            speech: "Nossa senhora... isso foi golpe baixo demais, meu coração foi na garganta!"
          }
        }
      },
      {
        id: "quente_puxar_cintura_colo",
        title: "Puxar ela pela cintura pra bem perto (ou pro seu colo)",
        desc: "Contato físico intenso em privacidade para momentos de química alta.",
        locations: ["ape_404", "ape_402"],
        reqGate: "topic_spicy_soft",
        costMins: 20,
        tone: "hot",
        specialScene: "nsfw1",
        openings: {
          sweet: {
            action: "*Acomoda-se no seu colo com o rosto vermelho vivo e esconde o sorriso no seu pescoço*",
            speech: "Você me puxa com uma facilidade que me deixa tonta... e o pior é que eu adoro ficar aqui em cima pertinho de você."
          },
          hot: {
            action: "*Apoia os dois joelhos ao seu redor no colo, coloca as mãos nos seus ombros e te olha de cima com fogo nos olhos*",
            speech: "Olha só quem ficou mais alta que você agora que eu tô no seu colo... Daqui de cima a conversa fica muito mais interessante."
          },
          ctrl: {
            action: "*Senta no seu colo como num trono e segura seu queixo com dois dedos*",
            speech: "Pronto, agora estamos na altura certa: eu por cima ditando o ritmo e você embaixo obedecendo."
          },
          cold: {
            action: "*Tira sua mão da cintura dela imediatamente*",
            speech: "Tira a mão! Você tá maluco de vir me puxando assim sem clima nenhum?!"
          },
          neutral: {
            action: "*Segura nos seus braços surpresa com o puxão repentino*",
            speech: "Opa, calma aí que quase me tirou do chão num puxão só!"
          }
        }
      },
      {
        id: "provocar_ciume_calculado",
        title: "Olhar uma notificação sorrindo de propósito pra testar o ciúme dela",
        desc: "Desperta o lado territorial e competitivo dela.",
        skillHint: "Lábia 15+ amplifica o ciúme e o apego",
        costMins: 15,
        tone: "hot",
        specialScene: "paredeCorredor",
        openings: {
          sweet: {
            action: "*Para na hora, fica na ponta dos pés tentando espiar a tela do seu celular e agarra sua manga com um bico enciumado*",
            speech: "Quem é que tá te mandando mensagem a essa hora, posso saber?! Não vem sorrir pro celular na minha frente não que eu já fico com ciúme!"
          },
          hot: {
            action: "*Empurra a mão com seu celular pra baixo e cola o corpo no seu, olhando fundo nos seus olhos com fogo puro*",
            speech: "Outra mulher querendo sua atenção? Guarda esse celular agora... Eu vou te fazer esquecer até o próprio nome pra você lembrar quem manda na sua cabeça."
          },
          ctrl: {
            action: "*Toma o celular da sua mão, bloqueia a tela e te prensa contra a parede segurando seu colarinho*",
            speech: "Tá tentando me fazer ciúme de propósito? Pois conseguiu. Agora você não sai da minha frente até apagar qualquer outra da sua lista."
          },
          cold: {
            action: "*Vira o rosto fingindo desdém, mas bate o pé nervosa no chão*",
            speech: "Ah, ótimo, vai lá conversar com seus contatinhos então!"
          },
          neutral: {
            action: "*Semicerra os olhos imediatamente curiosa e dá um passo pra perto de você*",
            speech: "Opa, que sorrisinho misterioso pro celular foi esse, hein 402?! Tô perdendo meu posto de vizinha favorita?!"
          }
        }
      },
      {
        id: "quente_beijo_pescoco_lento",
        title: "Descer os lábios devagar do canto da boca até a curva do pescoço dela",
        desc: "Contato lento e intenso que derrete o autocontrole dela na hora.",
        locations: ["ape_404", "ape_402", "corredor_4andar"],
        reqGate: "topic_spicy_deep",
        costMins: 20,
        tone: "hot",
        specialScene: "paredeCorredor",
        openings: {
          sweet: {
            action: "*Inclina o pescoço de leve fechando os olhos enquanto agarra sua camisa sem fôlego*",
            speech: "A-aí no meu pescoço não vale... você descobriu meu ponto fraco rápido demais, 402."
          },
          hot: {
            action: "*Solta um suspiro rouco, deslizando os dedos pela sua nuca para te manter bem onde está*",
            speech: "Continua exatamente aí... sua boca quente no meu pescoço tá tirando qualquer resquício de juízo da minha cabeça."
          },
          ctrl: {
            action: "*Arqueia o pescoço com um sorriso lento, segurando firme nos seus ombros*",
            speech: "Gosto quando você se curva todo pra me dar atenção exatamente onde eu quero... mais devagar."
          },
          cold: {
            action: "*Recua firme segurando seu peito*",
            speech: "Tira o rosto do meu pescoço! Não tô nem um pouco no clima pra você avançar assim."
          },
          neutral: {
            action: "*Arrepia inteira e segura seu braço completamente corada*",
            speech: "Eita!! Chegar assim direto no meu pescoço quase me fez perder o chão!"
          }
        }
      },
      {
        id: "quente_tirar_moletom_ombro",
        title: "Deslizar a gola larga do moletom dela devagar por um ombro",
        desc: "Explora o contraste do moletom enorme no corpo pequeno dela em clima quente.",
        locations: ["ape_404", "ape_402"],
        reqGate: "topic_spicy_deep",
        costMins: 20,
        tone: "hot",
        specialScene: "nsfw1",
        openings: {
          sweet: {
            action: "*Fica corada até a clavícula quando o tecido escorrega pelo ombro, mas não puxa de volta*",
            speech: "Esse moletom já fica caindo sozinho em mim... e você puxando devagar assim me deixa toda tremendo de vergonha boa."
          },
          hot: {
            action: "*Morde o lábio inferior e inclina o ombro exposto na sua direção com o olhar pegando fogo*",
            speech: "Vai parar só no ombro ou finalmente resolveu descobrir o que tem por baixo dessa roupa gigante, 402?"
          },
          ctrl: {
            action: "*Sustenta seu olhar sem recuar um milímetro enquanto deixa a gola cair*",
            speech: "Pode olhar o quanto quiser... mas só encosta onde eu deixar você encostar hoje."
          },
          cold: {
            action: "*Puxa a gola de volta no mesmo segundo, irritada*",
            speech: "Tira a mão da minha roupa! Não te dei essa liberdade hoje!"
          },
          neutral: {
            action: "*Pisca surpresa com a audácia do gesto, ficando vermelha na hora*",
            speech: "Nossa senhora... o clima esquentou vinte graus em dois segundos aqui dentro!"
          }
        }
      },
      {
        id: "quente_sentar_bancada_altura",
        title: "Erguer ela pela cintura e sentar ela na bancada pra ficarem cara a cara",
        desc: "Anula a diferença de altura deixando os joelhos dela ao redor da sua cintura.",
        locations: ["ape_404", "ape_402"],
        reqGate: "topic_spicy_deep",
        costMins: 20,
        tone: "hot",
        specialScene: "nsfw2",
        openings: {
          sweet: {
            action: "*Solta um gritinho baixo quando você a acomoda sentada na bancada, passando as pernas de leve ao redor da sua cintura*",
            speech: "Olha onde você me colocou... agora a gente tá na mesma altura e eu não tenho pra onde fugir do seu olhar."
          },
          hot: {
            action: "*Enlaça sua cintura com os tornozelos em cima da bancada e puxa você pela camisa até colar no corpo dela*",
            speech: "A melhor ideia que você já teve nesse prédio foi me colocar aqui em cima... agora sua boca tá exatamente na altura certa."
          },
          ctrl: {
            action: "*Sorri vitoriosa de cima da bancada, segurando seu rosto com as duas mãos*",
            speech: "Pronto: agora eu tô até mais alta que você. Fica paradinho entre as minhas pernas enquanto eu decido o que fazer com você."
          },
          cold: {
            action: "*Afasta suas mãos na hora*",
            speech: "Nem inventa de tentar me erguer pra cima da bancada com a gente nesse clima!"
          },
          neutral: {
            action: "*Apoia as mãos na borda da bancada rindo corada com o coração acelerado*",
            speech: "Uau... você me pegou no ar e me colocou aqui como se eu não pesasse nada!"
          }
        }
      },
      {
        id: "quente_morder_labio_desafio",
        title: "Segurar o queixo dela firme e perguntar se ela aguenta parar só num beijo",
        desc: "Provocação direta e sem rodeios que testa o limite dos dois.",
        reqGate: "topic_spicy_soft",
        costMins: 15,
        tone: "hot",
        specialScene: "paredeCorredor",
        openings: {
          sweet: {
            action: "*Os lábios dela entreabrem devagar enquanto o polegar seu roça no queixo dela*",
            speech: "Se você me beijar olhando pra mim desse jeito, eu duvido muito que eu queira parar..."
          },
          hot: {
            action: "*Apoia as mãos no seu peito e ergue o rosto com fogo puro nos olhos*",
            speech: "Só um beijo? Você subestima demais a minha falta de freio quando você pega firme no meu queixo assim."
          },
          ctrl: {
            action: "*Sorri perigosamente sem desviar dos seus olhos*",
            speech: "Testa então. Vamos ver quem é que perde o controle primeiro depois de um beijo só."
          },
          cold: {
            action: "*Tira sua mão do queixo dela com um gesto seco*",
            speech: "Não toca no meu rosto quando eu tô sem paciência pra você."
          },
          neutral: {
            action: "*Prende o ar completamente pega de surpresa pela firmeza do gesto*",
            speech: "Que pegada firme foi essa do nada?! Meu cérebro travou aqui!"
          }
        }
      },
      {
        id: "quente_jogo_tres_toques",
        title: "Propor o jogo dos três toques: sem desviar o olhar e sem recuar",
        desc: "Um jogo lento de pele, respiração e autocontrole a centímetros de distância.",
        locations: ["ape_404", "ape_402", "corredor_4andar"],
        reqGate: "topic_spicy_soft",
        costMins: 20,
        tone: "hot",
        specialScene: "paredeCorredor",
        openings: {
          sweet: {
            action: "*Aceita tímida mas animada, encostando perto com as bochechas quentes*",
            speech: "Três toques sem desviar o olhar? Já aviso que eu vou perder no primeiro..."
          },
          hot: {
            action: "*Dá um passo colando quase no seu peito, o olhar brilhando de puro desafio*",
            speech: "Fechado. Três toques seus — e se eu aguentar sem piscar, os próximos três são meus onde eu escolher."
          },
          ctrl: {
            action: "*Arqueia uma sobrancelha divertida*",
            speech: "Adoro jogos onde eu já sei que vou te deixar sem ar no final. Começa."
          },
          cold: {
            action: "*Cruza os braços desinteressada*",
            speech: "Sem joguinho agora, 402."
          },
          neutral: {
            action: "*Ri nervosa mas curiosa, ficando de frente pra você*",
            speech: "Você inventa cada brincadeira perigosa nesse quarto andar... tá, manda o primeiro."
          }
        }
      },
      {
        id: "quente_mandar_ela_conduzir",
        title: "Encostar tranquilo e desafiar ela a assumir o controle total hoje",
        desc: "Abre espaço pra Aurora mostrar o lado mais ousado e dominante dela por cima.",
        locations: ["ape_404", "ape_402"],
        reqGate: "topic_spicy_deep",
        costMins: 20,
        tone: "hot",
        specialScene: "nsfwControle",
        openings: {
          sweet: {
            action: "*Sorri meio tímida, mas sobe no sofá ao seu lado passando os dedos pela sua gola*",
            speech: "Você deixando tudo na minha mão assim... cuidado que eu posso ser bem mais ousada do que pareço."
          },
          hot: {
            action: "*Um sorriso lento e faminto toma conta do rosto dela enquanto ela se aproxima sem pressa, empurrando seus ombros contra o encosto*",
            speech: "Finalmente você falou a língua certa... Fica quietinho aí embaixo que hoje eu vou te mostrar tudo o que 1,49m de iniciativa consegue fazer."
          },
          ctrl: {
            action: "*Sobe no seu colo com calma absoluta de rainha e segura seu queixo de cima*",
            speech: "Adoro quando você percebe o seu lugar. Mãos quietas até eu mandar — hoje o ritmo inteiro é meu."
          },
          cold: {
            action: "*Te encara fria*",
            speech: "Nem tenta usar esse papo pra amolecer meu humor agora."
          },
          neutral: {
            action: "*Os olhos dela faíscam surpresos e animados com o convite*",
            speech: "Opa!! Me entregando o comando total assim de bandeja?! Depois não pede arrego!"
          }
        }
      }
    ],

    // ------------------------------------------------------------------------
    // ABA 4: BASTIDORES, CONTROLE & JOGO MENTAL (9 Assuntos)
    // ------------------------------------------------------------------------
    controle: [
      {
        id: "ctrl_abaixar_obedecer",
        title: "Curvar até a altura dela e perguntar qual é a ordem de hoje",
        desc: "Entregar o domínio psicológico para ver até onde ela vai.",
        costMins: 15,
        tone: "ctrl",
        specialScene: "controle",
        openings: {
          sweet: {
            action: "*Dá dois tapinhas carinhosos na sua bochecha com um sorriso travesso*",
            speech: "Olha ele todo obediente abaixando pra falar comigo! Minha ordem de hoje é simples: quero mimo e atenção exclusiva."
          },
          hot: {
            action: "*Passa o polegar pelo seu lábio inferior enquanto você permanece curvado na frente dela*",
            speech: "Adoro quando um homem desse tamanho abaixa a cabeça e espera minha ordem... Fica exatamente assim enquanto eu penso no que vou fazer com você."
          },
          ctrl: {
            action: "*Segura você pela gola e sorri com domínio absoluto*",
            speech: "Viu como você aprendeu? Não importa o quanto eu tenha 1,49m: quem manda nos seus passos, na sua rotina e na sua cabeça sou eu."
          },
          cold: {
            action: "*Te olha com frieza calculada*",
            speech: "Agora que fez besteira vem abaixar a cabeça pra mim, né? Vai ter que se esforçar muito pra eu te perdoar."
          },
          neutral: {
            action: "*Arqueia a sobrancelha se divertindo com o poder*",
            speech: "Opa! Gostei dessa postura! Acho que vou adotar essa regra todo dia no quarto andar!"
          }
        }
      },
      {
        id: "ctrl_reclamar_mas_preso",
        title: "Reclamar que ela complica tudo, mas admitir que não consegue sair",
        desc: "Aprofunda o laço de dependência e domínio mesmo no meio do atrito.",
        costMins: 20,
        tone: "ctrl",
        specialScene: "controle",
        openings: {
          sweet: {
            action: "*Segura seu rosto com carinho, suavizando o clima na hora*",
            speech: "Ei... eu não quero que você fique comigo sofrendo. Vamos alinhar nosso coração pra ser gostoso pros dois."
          },
          hot: {
            action: "*Ri baixinho encostando a boca no seu queixo*",
            speech: "Você diz que eu te dou dor de cabeça, mas basta eu aparecer na porta que o seu desejo fala mais alto que qualquer orgulho."
          },
          ctrl: {
            action: "*Solta uma risada fria e magnética, enrolando a gola da sua camisa nos dedos*",
            speech: "Pode reclamar à vontade. Diz que tá ruim, diz que eu sou mandona... mas olha pros seus pés: você não dá um passo pra longe de mim."
          },
          cold: {
            action: "*Te encara sem pena*",
            speech: "Se tá ruim pra você, a porta do 402 é logo ali. Mas a gente sabe que daqui a meia hora você volta batendo na minha porta."
          },
          neutral: {
            action: "*Inclina a cabeça com um sorriso irônico*",
            speech: "Reclama, reclama, mas não sai do meu pé um minuto sequer!"
          }
        }
      },
      {
        id: "ctrl_atitude_ruim_forcar",
        title: "Ser grosso e cruzar o limite de propósito",
        desc: "Gera atrito real, aumenta a raiva dela e aproxima de rotas sombrias ou rupturas.",
        costMins: 15,
        tone: "risky",
        openings: {
          sweet: {
            action: "*Recua com expressão de decepção profunda*",
            speech: "Por que você tá me tratando desse jeito horrível do nada?! Isso machuca de verdade!"
          },
          hot: {
            action: "*Fecha a cara instantaneamente e se afasta*",
            speech: "Acabou o clima. Você passou do limite do aceitável e estragou tudo."
          },
          ctrl: {
            action: "*Olha pra você com um gelo cortante*",
            speech: "Achou que bancar o grosso ia te dar alguma vantagem comigo? Você acabou de cavar seu próprio castigo."
          },
          cold: {
            action: "*Aponta pra saída com raiva genuína*",
            speech: "Eu avisei que minha paciência tinha acabado! Continua assim pra você ver se eu não te bloqueio da minha vida hoje mesmo!"
          },
          neutral: {
            action: "*Dá um passo pra trás revoltada*",
            speech: "Qual é o seu problema?! Não fala nem age assim comigo!"
          }
        }
      },
      {
        id: "ctrl_blefar_inocencia",
        title: "Fingir inocência e desconversar pra apagar qualquer suspeita",
        desc: "Usa lábia e sangue-frio para convencê-la de que tudo foi coincidência.",
        skillHint: "Usa Lábia + Furtividade contra a Suspeita dela",
        costMins: 15,
        tone: "ctrl",
        openings: {
          sweet: {
            action: "*Suspira aliviada e balança a cabeça, acreditando na sua explicação calma*",
            speech: "Ai, ainda bem... eu tava começando a achar que tinha alguma coisa estranha acontecendo, mas ouvindo você explicar assim eu fico tranquila."
          },
          hot: {
            action: "*Semicerra os olhos te estudando de perto, mas acaba sorrindo seduzida pela sua lábia*",
            speech: "Você tem uma lábia tão boa que quase me faz esquecer qualquer desconfiança... Cuidado que eu fico de olho em você mesmo assim."
          },
          ctrl: {
            action: "*Ouve sua justificativa de braços cruzados e assente devagar*",
            speech: "Hum. Sua explicação faz sentido. Vou aceitar dessa vez porque você soube falar direito comigo."
          },
          cold: {
            action: "*Te encara desconfiada enquanto pesa cada palavra sua*",
            speech: "Sei... Você sempre tem uma resposta pronta na ponta da língua, né?"
          },
          neutral: {
            action: "*Dá uma risadinha e relaxa os ombros*",
            speech: "Tá vendo, eu já tava viajando achando que era armação! Faz total sentido o que você falou!"
          }
        }
      },
      {
        id: "ctrl_inverter_culpa",
        title: "Inverter a culpa e fazer ela se sentir mal por duvidar de você",
        desc: "Vira o jogo psicológico para ganhar vantagem e reduzir o domínio dela.",
        skillHint: "Requer Lábia 16+ para funcionar sem gerar raiva",
        costMins: 20,
        tone: "ctrl",
        specialScene: "manipulada",
        openings: {
          sweet: {
            action: "*Encolhe os ombros imediatamente culpada e segura na sua manga*",
            speech: "Desculpa... você tem razão, eu fui injusta desconfiando de você depois de tudo que a gente viveu. Não fica chateado comigo, por favor..."
          },
          hot: {
            action: "*Morde o lábio, desmontada pela forma como você virou o argumento contra ela*",
            speech: "Olha como você vira o jogo na minha cabeça... Agora sou eu que tenho que te compensar pra você me perdoar?"
          },
          ctrl: {
            action: "*Pisca surpresa quando percebe que você inverteu a situação com frieza*",
            speech: "Espera aí... eu vim te cobrar e agora você tá me fazendo pedir desculpa?! Você joga mais pesado do que eu pensava."
          },
          cold: {
            action: "*Hesita, dividida entre a raiva e a dúvida que você plantou na mente dela*",
            speech: "...Será que eu exagerei mesmo? Você fala dum jeito que bagunça minha cabeça."
          },
          neutral: {
            action: "*Fica sem jeito mexendo nos dedos*",
            speech: "Poxa, quando você coloca desse jeito eu até me sinto mal por ter reclamado..."
          }
        }
      },
      {
        id: "ctrl_tirar_proveito_carencia",
        title: "Aproveitar um momento de carência dela pra pescar confidências",
        desc: "Usa a guarda baixa dela para conseguir vantagem e um Trunfo sem parecer invasivo.",
        skillHint: "Furtividade + Lábia >= 22 evita levantar suspeita",
        costMins: 20,
        tone: "ctrl",
        openings: {
          sweet: {
            action: "*Deita a cabeça no seu ombro de olhos fechados, falando mais do que devia no cansaço*",
            speech: "Com você sendo tão compreensivo assim eu acabo contando até os segredos que eu jurei não contar pra ninguém..."
          },
          hot: {
            action: "*Suspira encostada em você, com a guarda totalmente baixa*",
            speech: "Quando a madrugada bate assim e você me dá esse colo, eu entrego todos os meus pontos fracos na sua mão..."
          },
          ctrl: {
            action: "*Respira fundo, baixando a armadura por um instante raro*",
            speech: "Não espalha que você me viu num momento vulnerável assim... só com você eu baixo a guarda desse jeito."
          },
          cold: {
            action: "*Cruza os braços, não caindo fácil na sua tentativa*",
            speech: "Por que você tá fazendo tanta pergunta específica justo agora que eu tô cansada?"
          },
          neutral: {
            action: "*Boceja e acaba soltando confidências da própria vida sem filtro*",
            speech: "Ai, tô tão virada hoje que minha língua tá solta demais, acabei te contando coisa que ninguém do prédio sabe!"
          }
        }
      },
      {
        id: "ctrl_heroi_fabricado",
        title: "Posar de salvador pra um problema que você mesmo armou antes",
        desc: "Aparece resolvendo a situação com cara de anjo para ganhar influência e crédito.",
        skillHint: "Código + Lábia >= 28 torna o blefe perfeito",
        costMins: 20,
        tone: "ctrl",
        openings: {
          sweet: {
            action: "*Abre um sorriso gigante, olhando pra cima cheia de gratidão*",
            speech: "Eu não acredito que você salvou meu dia de novo!! O que seria da minha vida nesse prédio se você não tivesse se mudado pro 402?!"
          },
          hot: {
            action: "*Semicerra os olhos desconfiada do seu sorrisinho de canto, mas entra no clima mordendo o lábio*",
            speech: "Você apareceu exatamente na hora certa e resolveu tudo em dois minutos... Coincidência demais, mas vou fingir que acredito só pra ver até onde vai essa sua lábia."
          },
          ctrl: {
            action: "*Suspira aliviada, perdendo metade da pose de mandona diante da sua eficiência*",
            speech: "Tá... admito que hoje você mandou bem demais. Ponto pro 402."
          },
          cold: {
            action: "*Cruza os braços intrigada, olhando do equipamento pra você*",
            speech: "Engraçado como essas coisas só dão defeito quando você tá por perto pra consertar, né?"
          },
          neutral: {
            action: "*Junta as mãos comemorando e dá um pulinho*",
            speech: "Nossa, você chegou na hora exata como herói do quarto andar!!"
          }
        }
      },
      {
        id: "ctrl_duelo_psicologico",
        title: "Ler a expressão dela e expor o que ela está tentando disfarçar",
        desc: "Desmonta a marra da Aurora na hora e vira a mesa no jogo de poder.",
        skillHint: "Percepção + Lábia >= 28 desarma ela na hora",
        costMins: 20,
        tone: "ctrl",
        specialScene: "paredeCorredor",
        openings: {
          sweet: {
            action: "*Fica vermelha até as orelhas no mesmo segundo, tentando cobrir o sorriso com as mãos*",
            speech: "Ei!! Como você percebeu isso?! Para de me ler como se eu fosse um livro aberto, isso não vale!"
          },
          hot: {
            action: "*Arqueia uma sobrancelha admirada e dá um passo pra perto, sustentando o desafio nos olhos*",
            speech: "Ok, confesso: você me pegou no pulo. É raro alguém conseguir virar o jogo psicológico contra mim sem tremer na base..."
          },
          ctrl: {
            action: "*Pisca surpresa quando você desmonta o argumento dela com precisão cirúrgica*",
            speech: "Espera aí... você prestou atenção até nesse detalhe?! Ok, você joga muito melhor do que eu imaginei."
          },
          cold: {
            action: "*Cruza os braços te encarando*",
            speech: "Tá achando que virou psicólogo de corredor pra ficar tentando adivinhar o que eu penso?"
          },
          neutral: {
            action: "*Solta um riso nervoso mexendo no cabelo*",
            speech: "Nossa... você lê as pessoas assustadoramente bem, hein 402!"
          }
        }
      },
      {
        id: "ctrl_cobrar_aposta_ousada",
        title: "Cobrar uma aposta ganha e ditar as regras de hoje",
        desc: "Usa sua vantagem psicológica para fazer a dona do 404 entrar no seu ritmo.",
        skillHint: "Requer Influência 45%+ ou Rivalidade 45%+",
        costMins: 20,
        tone: "hot",
        specialScene: "controle",
        openings: {
          sweet: {
            action: "*Faz bico corada, mas ri aceitando a derrota na aposta de vocês*",
            speech: "Tá bom, tá bom... aposta é aposta e eu não fujo de desafio! Hoje quem escolhe as regras do nosso rolê no quarto andar é você."
          },
          hot: {
            action: "*Morde o lábio inferior com brilho competitivo e entra no seu ritmo*",
            speech: "Olha só quem virou o jogo e tá ditando as regras hoje... Capricha nessa prenda porque amanhã eu vou pedir revanche dobrada!"
          },
          ctrl: {
            action: "*Tenta sustentar a pose por três segundos, mas acaba rindo e cedendo a rodada*",
            speech: "Aproveita esse momento histórico porque ver a dona do 404 seguindo suas regras não acontece todo dia!"
          },
          cold: {
            action: "*Empina o queixo sem dar abertura*",
            speech: "Que aposta? Não te devo vantagem nenhuma hoje não!"
          },
          neutral: {
            action: "*Pisca surpresa com a sua audácia*",
            speech: "Opa, olha a confiança do cara querendo ditar as regras aqui! Tem certeza que aguenta o troco?"
          }
        }
      }
    ]
  };

  // ==========================================================================
  // HELPERS DE ESTADO, FADIGA & TRANSFORMAÇÃO DE ASSUNTO
  // ==========================================================================
  AG.getStateKeyForOpening = function () {
    const a = AG.state.aurora;
    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const hostileMood = ["irritada", "raivosa", "rispida_agressiva", "ignorante_fria", "desconfortavel", "decepcionada"].includes(a.mood);
    if (a.discomfort >= 45 || hostileMood || a.dynamic === "gelo_e_farpas" || a.dynamic === "afastados") {
      if (a.dominance >= 52 && a.dynamic === "teia_de_controle") return "ctrl";
      return "cold";
    }
    if (a.dynamic === "teia_de_controle" || a.mood === "controladora" || (fam === "sombria" && a.mood !== "desconfiada") || a.dominance >= 52) return "ctrl";
    if (a.dynamic === "tensao_ardente" || a.dynamic === "faisca_imediata" || fam === "quimica" || a.mood === "provocante" || a.heat >= 42 || (a.arousal || 0) >= 50) return "hot";
    if (a.dynamic === "chamego_dengoso" || fam === "vulneravel" || a.mood === "dengosa" || a.mood === "carente" || a.affinity >= 38 || (a.intimacyLevel || 0) >= 35) return "sweet";
    return "neutral";
  };

  function findTopic(categoryKey, topicId) {
    const list = AG.INTERACTION_TOPICS[categoryKey] || [];
    return list.find((t) => t.id === topicId) || null;
  }

  function topicFatigue(topicId) {
    const s = AG.state;
    s.topicLog = s.topicLog || {};
    const key = s.day + ":" + topicId;
    s.topicLog[key] = (s.topicLog[key] || 0) + 1;
    return s.topicLog[key];
  }

  function scaleDeltas(deltas, factor) {
    const out = {};
    Object.keys(deltas).forEach((k) => {
      const v = deltas[k];
      if (typeof v === "number" && v > 0 && ["affinity", "trust", "heat", "dominance", "influence", "intimacyLevel"].includes(k)) {
        out[k] = Math.max(1, Math.round(v * factor));
      } else {
        out[k] = v;
      }
    });
    return out;
  }

  function initialThreadForCategory(categoryKey) {
    if (categoryKey === "provocar") return "hot";
    if (categoryKey === "controle") return "mind";
    return "warm";
  }

  function applyTopicOpeningEffects(topic) {
    const s = AG.state;
    const sk = (s.player && s.player.skills) || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
    let pills = [];

    let overrideOpening = null;
    if (topic.id === "ctrl_atitude_ruim_forcar") {
      pills = AG.applyDeltas({ affinity: -18, discomfort: 26, trust: -10, mood: "irritada" });
      AG.addMemory("atitude_ruim_" + s.day, "Teve uma atitude grosseira e invasiva que deixou a Aurora revoltada.", "ruim", false);
    } else if (topic.id === "conversar_otimizar_pc_dela") {
      const bonus = sk.tech >= 20 ? 8 : 0;
      pills = AG.applyDeltas({ affinity: 14 + bonus, trust: 12, discomfort: -10, tech: 3, mood: "dengosa" });
      AG.addMemory("otimizou_pc_404", "Usou seu domínio técnico para deixar o computador de arte da Aurora voando.", "bom", true);
    } else if (topic.id === "conversar_notar_detalhe_percepcao") {
      pills = AG.applyDeltas({ affinity: 12, heat: 8, discomfort: -8, perception: 3 });
    } else if (topic.id === "conversar_elogio_calculado") {
      const strongCombo = (sk.charisma + sk.perception) >= 28;
      const curFam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(s.aurora.mood) : "luminosa";
      const calcDeltas = {
        affinity: strongCombo ? 16 : 10,
        heat: strongCombo ? 18 : 12,
        trust: 10,
        suspicion: -10,
        charisma: 2,
        perception: 2
      };
      if (!["vulneravel", "conflito", "sombria"].includes(curFam)) calcDeltas.mood = "provocante";
      pills = AG.applyDeltas(calcDeltas);
    } else if (topic.id === "ctrl_blefar_inocencia") {
      if (sk.charisma + sk.stealth >= (s.aurora.suspicion || 0) * 0.45) {
        s.phoneState.tracksRisk = AG.clamp((s.phoneState.tracksRisk || 0) - 20, 0, 100);
        pills = AG.applyDeltas({ suspicion: -35, discomfort: -10, charisma: 3 });
      } else {
        pills = AG.applyDeltas({ suspicion: 15, discomfort: 14, affinity: -8, mood: "desconfiada" });
        overrideOpening = {
          action: "*Semicerra os olhos sem engolir o seu teatro nem por um segundo*",
          speech: "Você acha mesmo que essa cara de inocente funciona comigo quando eu já tô cheia de suspeita? Tenta melhorar sua lábia antes de blefar na minha cara."
        };
      }
    } else if (topic.id === "ctrl_inverter_culpa") {
      if (sk.charisma >= 16) {
        s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
        pills = AG.applyDeltas({ discomfort: -16, dominance: -12, heat: 10, charisma: 4 });
      } else {
        pills = AG.applyDeltas({ discomfort: 16, affinity: -10, mood: "irritada" });
        overrideOpening = {
          action: "*Cruza os braços cortando sua tentativa de virar o jogo no meio da frase*",
          speech: "Ei, não tenta jogar a culpa pro meu colo sem ter argumento! Eu enxerguei sua manobra de longe — vai precisar de bem mais lábia pra me enrolar."
        };
      }
    } else if (topic.id === "ctrl_tirar_proveito_carencia") {
      s.phoneState.leverage = (s.phoneState.leverage || 0) + 1;
      s.unlocks.unlockedSpyApp = true;
      const detected = (sk.stealth + sk.charisma) < 22;
      pills = AG.applyDeltas({
        heat: 10,
        influence: 12,
        trust: detected ? -10 : 6,
        suspicion: detected ? 18 : 0,
        stealth: 3
      });
    } else if (topic.id === "provocar_ciume_calculado") {
      const strongChar = sk.charisma >= 15;
      pills = AG.applyDeltas({
        heat: strongChar ? 20 : 12,
        rivalry: strongChar ? 16 : 8,
        jealousy: strongChar ? 28 : 18,
        influence: strongChar ? 10 : 0,
        affinity: strongChar ? 6 : -4,
        discomfort: strongChar ? 0 : 10,
        charisma: 2,
        mood: "ciumenta"
      });
      AG.addMemory("ciume_calculado_" + s.day, "Sentiu uma ponta forte de ciúme competitivo quando achou que outra mulher estava atrás de você.", "intenso", false);
    } else if (topic.id === "ctrl_heroi_fabricado") {
      const masterCombo = (sk.tech + sk.charisma) >= 28;
      pills = AG.applyDeltas({
        influence: masterCombo ? 18 : 10,
        rivalry: masterCombo ? 8 : 14,
        trust: masterCombo ? 12 : 4,
        affinity: 10,
        suspicion: masterCombo ? -10 : 14,
        charisma: 2,
        tech: 2,
        mood: "provocante"
      });
      AG.addMemory("heroi_salvador_404", "Você apareceu na hora certa bancando o herói do quarto andar — e ela ainda desconfia do seu sorrisinho.", "controle", true);
    } else if (topic.id === "ctrl_duelo_psicologico") {
      if ((sk.perception + sk.charisma) >= 28) {
        pills = AG.applyDeltas({
          influence: 18,
          dominance: -14,
          heat: 14,
          rivalry: 10,
          perception: 2,
          charisma: 2,
          mood: "provocante"
        });
        AG.addMemory("lida_como_livro_aberto", "Você desarmou a marra dela com pura percepção e lábia num duelo mental.", "intenso", true);
      } else {
        pills = AG.applyDeltas({ rivalry: 10, discomfort: 10, dominance: 8, mood: "desconfiada" });
        overrideOpening = {
          action: "*Sorri afiada virando o jogo contra você sem esforço*",
          speech: "Tentando me ler num duelo mental sem ter Lábia e Percepção pra segurar o ritmo? Dessa vez quem leu você fui eu, 402."
        };
      }
    } else if (topic.id === "ctrl_cobrar_aposta_ousada") {
      const canLead = (s.aurora.influence || 0) >= 40 || (s.aurora.rivalry || 0) >= 40 || (s.aurora.heat || 0) >= 48 || (s.aurora.intimacyLevel || 0) >= 45;
      if (canLead) {
        pills = AG.applyDeltas({
          influence: 16,
          heat: 16,
          rivalry: 10,
          dominance: -14,
          charisma: 3,
          mood: "provocante"
        });
        AG.addMemory("virou_regras_noite", "Usou uma aposta ganha e sua influência para fazer a Rainha do 404 entrar no seu ritmo.", "intenso", true);
      } else {
        pills = AG.applyDeltas({ discomfort: 8, dominance: 10, rivalry: 8, mood: "controladora" });
        overrideOpening = {
          action: "*Empina o queixo rindo da sua audácia sem recuar um passo*",
          speech: "Cobrar aposta de quem, 402?! Você ainda não tem influência nem rivalidade suficiente comigo pra sair ditando minhas regras hoje!"
        };
      }
    }

    return { pills, overrideOpening };
  }

  // ==========================================================================
  // INICIAR OU MUDAR DE ASSUNTO DENTRO DA CONVERSA CONTÍNUA
  // ==========================================================================
  AG.getTopicsForTab = function (tabKey) {
    const s = AG.state;
    const list = AG.INTERACTION_TOPICS[tabKey] || [];
    return list.filter((tp) => !tp.locations || tp.locations.includes(s.currentLocation));
  };

  AG.startTopicConversation = function (categoryKey, topicId) {
    const s = AG.state;
    if (!AG.isAuroraHere() || s.aurora.activity === "dormindo") return;
    const topic = findTopic(categoryKey, topicId);
    if (!topic) return;
    if (topic.locations && !topic.locations.includes(s.currentLocation)) return;

    // Checagem coerente de intimidade/prontidão para tópicos avançados!
    if (topic.reqGate && AG.Gates && AG.Gates.check) {
      const gate = AG.Gates.check(topic.reqGate);
      if (!gate.ok) {
        AG.playSound(gate.code === "bond" ? "click" : "warn");
        AG.advanceTime(8, { suppressRandom: true });
        AG.clearFeed();
        if (gate.code === "bond") {
          const pills = AG.applyDeltas({ heat: 3, intimacyLevel: 2 });
          AG.pushFeed({
            type: "aurora",
            action: "*Dá um passo para trás sorrindo de canto, segurando o seu pulso com leveza sem fechar a cara*",
            speech: `Calma lá, apressadinho! Eu gostei da iniciativa, mas a gente ainda precisa construir um pouco mais de intimidade e clima antes de ir direto pra isso (${gate.missing}). Conversa e provoca mais um pouco comigo primeiro!`,
            pills
          });
        } else {
          const pills = AG.applyDeltas({ discomfort: 4 });
          AG.pushFeed({
            type: "aurora",
            action: "*Mantém a distância olhando séria pra você*",
            speech: gate.code === "manipulation"
              ? "Não vou entrar nesse clima com você enquanto houver pressão ou chantagem ativa entre nós. Limpe isso primeiro."
              : `Sem clima nenhum pra isso agora com o atrito tão alto entre nós dois (${gate.missing}). Conserta as coisas comigo primeiro.`,
            pills
          });
        }
        AG.saveGame("autosave");
        return;
      }
    }

    AG.playSound(topic.tone === "hot" ? "hot" : topic.tone === "risky" ? "warn" : "click");
    AG.advanceTime(topic.costMins || 15, { keepSpecialScene: true, suppressRandom: true });
    if (topic.specialScene) s.aurora.activeSpecialSceneKey = topic.specialScene;

    const stateKey = AG.getStateKeyForOpening();
    const baseOpening = topic.openings[stateKey] || topic.openings.neutral;
    const repeats = topicFatigue(topic.id);
    const eff = applyTopicOpeningEffects(topic);
    const pills = eff.pills || [];
    const opening = eff.overrideOpening || baseOpening;

    AG.clearFeed();
    if (AG.DeepDialogue && AG.DeepDialogue.buildRichOpening) {
      const richOpen = AG.DeepDialogue.buildRichOpening(topic, stateKey, opening, repeats);
      richOpen.pills = pills;
      AG.pushFeed(richOpen);
    } else {
      let speech = opening.speech;
      if (repeats >= 3 && topic.id !== "ctrl_atitude_ruim_forcar") {
        speech = "De novo esse assunto hoje? Você tá bem fixado nisso, hein... " + speech;
      }
      AG.pushFeed({ type: "aurora", action: opening.action, speech, pills });
    }

    // Se a passagem do tempo fez a rotina dela mudar de local, não mantém conversa fantasma aberta!
    if (!AG.isAuroraHere() || s.aurora.activity === "dormindo") {
      s.activeConversationNode = null;
      return;
    }

    const prevTurn = (s.activeConversationNode && s.activeConversationNode.turn) || 0;
    s.activeConversationNode = {
      stage: 2,
      turn: prevTurn > 0 ? prevTurn + 1 : 1,
      topicTurn: 1,
      categoryKey,
      topicId: topic.id,
      topicTitle: topic.title,
      stateKey,
      thread: topic.id === "ctrl_atitude_ruim_forcar" ? "conflict" : initialThreadForCategory(categoryKey),
      lastBranch: null,
      usedBranches: [],
      droppedSecretThisTalk: (s.activeConversationNode && s.activeConversationNode.droppedSecretThisTalk) || false,
      viewMode: "replies",
      fatigue: repeats
    };
  };

  AG.switchConversationTopic = function (categoryKey, topicId) {
    AG.startTopicConversation(categoryKey, topicId);
  };

  AG.toggleConversationTopicMenu = function () {
    const node = AG.state.activeConversationNode;
    if (!node) return;
    node.viewMode = node.viewMode === "switch_topic" ? "replies" : "switch_topic";
  };

  AG.toggleConversationClosingMenu = function () {
    const node = AG.state.activeConversationNode;
    if (!node) return;
    node.viewMode = node.viewMode === "closing" ? "replies" : "closing";
  };

  AG.getSwitchableTopics = function () {
    const node = AG.state.activeConversationNode;
    const currentId = node ? node.topicId : null;
    const groups = [
      { key: "conversar", label: "Conversar" },
      { key: "chamego", label: "Carinho" },
      { key: "provocar", label: "Provocar" },
      { key: "controle", label: "Bastidores" }
    ];
    return groups.map((g) => ({
      key: g.key,
      label: g.label,
      items: AG.getTopicsForTab(g.key).filter((t) => t.id !== currentId)
    }));
  };

  // ==========================================================================
  // ÁRVORES DEDICADAS POR ASSUNTO (RESPOSTAS 100% SOB MEDIDA PARA CADA TEMA)
  // ==========================================================================
  const TOPIC_SPECIFIC_BEATS = {
    papo_diferenca_altura: [
      {
        id: "tp_alt_chin",
        tone: "sweet",
        title: "Apoiar o queixo de leve no topo da cabeça dela só pra ver ela reclamar",
        hint: "Brincadeira carinhosa usando a diferença de altura",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 13, trust: 8, intimacyLevel: 6, composure: -8, personaWarm: 3, mood: "dengosa", specialScene: "chamego" },
        action: "*Ela dá um pulinho indignado de brincadeira, mas acaba encostando as costas no seu peito com um sorriso bobo*",
        speech: "Ei!! Minha cabeça não é apoio de queixo não, ô poste do 402! ...Tá, só mais cinco segundos porque você tá quentinho."
      },
      {
        id: "tp_alt_eye",
        tone: "hot",
        title: "Abaixar até ficar na mesma altura dos olhos dela e sustentar o olhar",
        hint: "Transforma a diferença de altura em tensão próxima",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 14, intimacyLevel: 8, composure: -14, desire: 10, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" },
        action: "*Quando você desce até o nível dos olhos dela tão de perto, a marra dela vacila e o olhar escapa direto pra sua boca*",
        speech: "Covardia demais você abaixar desse jeito sem avisar... Ficar olho no olho tão perto muda completamente o clima da conversa."
      },
      {
        id: "tp_alt_shelf",
        tone: "sweet",
        title: "Brincar que vai guardar as canecas dela lá na prateleira mais alta outra vez",
        hint: "Leve, divertido e alimenta a química de vizinhos",
        nextThread: "warm",
        sound: "click",
        deltas: { affinity: 10, rivalry: 8, discomfort: -6, mood: "alegre" },
        action: "*Ela aponta o dedo pro seu peito tentando parecer brava, mas não aguenta e cai na gargalhada*",
        speech: "Se você encostar nas minhas canecas eu troco a senha do seu roteador na madrugada! Fica avisado!"
      },
      {
        id: "tp_alt_read",
        tone: "ctrl",
        title: "Dizer calmo que toda essa marra de 1,49m é só armadura — e você já sacou",
        hint: "Leitura psicológica direta · derruba a Armadura dela",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -20, influence: 14, dominance: -10, perception: 2, personaCold: 3, mood: "corada_sensivel" },
        action: "*Ela pisca desarmada, cruzando os braços como se você tivesse puxado a cortina atrás da pose dela*",
        speech: "...Ninguém nunca fala isso na minha cara com essa calma toda. Para de me ler tão fácil, 402."
      }
    ],

    papo_uniforme_turno: [
      {
        id: "tp_uni_stay",
        tone: "hot",
        title: "Pedir baixinho pra ela não tirar o uniforme tão cedo hoje",
        hint: "Escala o clima quente com o visual do Café Sakura",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 16, intimacyLevel: 8, desire: 12, personaBold: 3, mood: "provocante", specialScene: "uniformeProvocante" },
        action: "*Um sorriso cheio de malícia abre no rosto dela enquanto ela gira devagar na sua frente*",
        speech: "Sabia que esse uniforme mexia com a sua cabeça... Se você se comportar direitinho no quarto andar, eu penso no seu pedido."
      },
      {
        id: "tp_uni_tired",
        tone: "sweet",
        title: "Perguntar se os pés dela estão doendo e oferecer fazer um café pra ela",
        hint: "Cuidado genuíno que recupera Estabilidade e Confiança",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, trust: 12, auroraEnergy: 10, mentalStability: 8, discomfort: -10, personaWarm: 3, mood: "dengosa" },
        action: "*Os ombros tensos dela relaxam na hora e ela solta um suspiro agradecido encostando em você*",
        speech: "Nossa, você não tem noção de como meus pés estão moídos hoje... Obrigada por perguntar isso em vez de só olhar a roupa."
      },
      {
        id: "tp_uni_tease",
        tone: "hot",
        title: "Ameaçar aparecer no Café Sakura amanhã só pra distrair ela no balcão",
        hint: "Provocação leve que sobe Clima Quente e Rivalidade",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 12, rivalry: 10, affinity: 8, personaBold: 2, mood: "provocante" },
        action: "*Ela arregala os olhos rindo e dá um empurrãozinho leve no seu braço*",
        speech: "Nem ousa sentar na mesa da frente me encarando enquanto eu tiro expresso! Eu já erro o troco só de pensar!"
      },
      {
        id: "tp_uni_probe",
        tone: "ctrl",
        title: "Perguntar de forma casual como anda a paciência dela com o gerente do Café",
        hint: "Psicologia indireta · pesca desabafos e derruba Armadura",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -18, influence: 12, perception: 2, personaCold: 2, mood: "espontanea" },
        action: "*Ela revira os olhos e abaixa o tom imediatamente, baixando a guarda no meio do desabafo*",
        speech: "Nem me lembra daquele cara... gravei até um áudio xingando tudo outro dia pra desabafar — sorte que ninguém ouviu!"
      }
    ],

    papo_madrugada_insonia: [
      {
        id: "tp_mad_stay",
        tone: "sweet",
        title: "Dizer que fica acordado com ela até o sono bater, sem pressa nenhuma",
        hint: "Aprofunda Intimidade e Abertura Emocional",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, trust: 12, intimacyLevel: 8, vulnerability: 12, mentalStability: 10, personaWarm: 3, mood: "dengosa", specialScene: "noite404" },
        action: "*Ela encosta a cabeça no seu ombro, o olhar muito mais calmo do que durante o dia*",
        speech: "Sabe que é muito mais fácil encarar as duas da manhã quando você tá do meu lado sem ficar olhando pro relógio?"
      },
      {
        id: "tp_mad_filter",
        tone: "hot",
        title: "Chegar mais perto e perguntar o que muda quando o filtro dela some",
        hint: "Sobe Clima Quente e Desejo de madrugada",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 16, desire: 12, composure: -12, personaBold: 3, mood: "excitada_tensa", specialScene: "noite404" },
        action: "*Ela morde o canto do lábio olhando pra cima, o clima do quarto parecendo diminuir dois metros*",
        speech: "Depois da meia-noite eu paro de fingir que não fico pensando na sua mão na minha cintura... era isso que você queria ouvir?"
      },
      {
        id: "tp_mad_quiet",
        tone: "sweet",
        title: "Só sentar do lado dela dividindo o silêncio tranquilo do quarto andar",
        hint: "Cura Estabilidade e faz ela baixar totalmente a guarda",
        nextThread: "warm",
        sound: "heart",
        deltas: { trust: 14, mentalStability: 12, vulnerability: 10, calm: 10, composure: -10, personaWarm: 2, mood: "melancolica" },
        action: "*Por alguns segundos ninguém precisa falar nada — ela apenas entrelaça o dedinho no seu devagar*",
        speech: "Que paz... eu nem sabia que dava pra ficar em silêncio com alguém sem ficar desconfortável."
      },
      {
        id: "tp_mad_mind",
        tone: "ctrl",
        title: "Perguntar baixinho qual pensamento realmente não deixa ela dormir",
        hint: "Atinge a vulnerabilidade dela e derruba a Armadura",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -20, vulnerability: 14, influence: 10, perception: 2, personaCold: 2, mood: "carente" },
        action: "*Ela hesita com os olhos fixos no chão antes de confessar quase num sussurro*",
        speech: "Acho que é o medo de me acostumar demais a ter você na porta ao lado... e um dia você cansar de mim."
      }
    ],

    papo_artes_projetos_dela: [
      {
        id: "tp_art_folder",
        tone: "hot",
        title: "Perguntar sorrindo o que tem dentro daquela pasta com senha",
        hint: "Provoca a curiosidade íntima dela",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 12, composure: -14, intimacyLevel: 6, personaBold: 2, mood: "corada_sensivel" },
        action: "*Ela abraça o tablet contra o peito ficando completamente vermelha até o pescoço*",
        speech: "N-não tem nada que você possa ver ainda!! Se você abrir aquela pasta eu vou ter que mudar de prédio de tanta vergonha!"
      },
      {
        id: "tp_art_drawme",
        tone: "sweet",
        title: "Pedir pra ela fazer um rascunho seu agora enquanto vocês conversam",
        hint: "Gera memória fofa e sobe Afinidade + Confiança",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, trust: 10, intimacyLevel: 6, personaWarm: 3, mood: "alegre" },
        memory: { id: "rascunho_402", text: "Fez um rascunho seu concentrada enquanto vocês conversavam no quarto andar.", cat: "bom", perm: true },
        action: "*Os olhos dela iluminam na hora e ela pega a caneta digital te mandando ficar parado*",
        speech: "Não mexe o queixo! ...Olha, não reclama se eu exagerar um pouco na cara de metido, tô só sendo fiel à referência!"
      },
      {
        id: "tp_art_praise",
        tone: "sweet",
        title: "Elogiar o traço dela de verdade, reparando nos detalhes pequenos",
        hint: "Validação genuína que fortalece a autoestima dela",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 15, trust: 12, mentalStability: 10, vulnerability: 10, perception: 2, personaWarm: 3, mood: "emocionada" },
        action: "*Ela olha da tela pra você com um brilho genuíno de quem raramente é levada a sério*",
        speech: "Obrigada de verdade por olhar direito pro meu trabalho... ouvir isso de você vale mais do que qualquer curtida online."
      },
      {
        id: "tp_art_peek",
        tone: "ctrl",
        title: "Inclinar por cima do ombro dela pra espiar as abas abertas no tablet",
        hint: "Furtividade + Percepção · pode pescar segredos ou levantar suspeita",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -16, influence: 12, perception: 3, stealth: 2, personaCold: 3, mood: "desconfiada" },
        action: "*Ela percebe sua sombra tão perto das costas dela e bloqueia uma aba rapidinho com um sorriso tenso*",
        speech: "Opa, olho comprido demais aí de cima, hein 402! Quer ver a arte ou tá bisbilhotando minhas anotações?"
      }
    ],

    papo_me_pergunta_algo: [
      {
        id: "tp_ask_honest",
        tone: "sweet",
        title: "Responder olhando nos olhos: dizer que ela virou a melhor parte do seu dia",
        hint: "Resposta honesta que derrete a defesa dela",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 16, trust: 14, intimacyLevel: 10, vulnerability: 12, personaWarm: 4, mood: "emocionada", specialScene: "chamego" },
        action: "*Ela prende a respiração sem conseguir esconder o sorriso gigante que toma o rosto inteiro*",
        speech: "Eu pedi sinceridade e você vem me derrubar desse jeito... Agora quem ficou sem resposta fui eu."
      },
      {
        id: "tp_ask_bold",
        tone: "hot",
        title: "Responder sem rodeios e contar o pensamento mais atrevido que teve com ela",
        hint: "Aumenta bastante Clima Quente e Tensão dela",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 18, desire: 14, intimacyLevel: 8, composure: -14, personaBold: 4, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*As bochechas dela ficam em brasa no meio da sua frase, mas ela não desvia o olhar nem por um segundo*",
        speech: "Meu Deus... você falou isso tudo na minha cara sem nem gaguejar?! E o pior é que eu gostei de cada palavra..."
      },
      {
        id: "tp_ask_flip",
        tone: "ctrl",
        title: "Sorrir calmo e devolver a pergunta pro colo dela antes de responder",
        hint: "Vira o jogo e baixa a Armadura dela",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -18, influence: 15, rivalry: 10, charisma: 2, personaCold: 3, mood: "provocante" },
        action: "*Ela semicerra os olhos rindo da sua manobra, pega no próprio jogo*",
        speech: "Espertinho demais! Eu te coloco contra a parede e em dois segundos você faz eu ter que confessar primeiro!"
      },
      {
        id: "tp_ask_dodge",
        tone: "ctrl",
        title: "Dar um meio sorriso misterioso e dizer que ela ainda precisa descobrir",
        hint: "Cria curiosidade e tensão sem entregar suas cartas",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -14, influence: 12, heat: 8, personaCold: 2, mood: "carente" },
        action: "*Ela faz bico irritada de brincadeira e puxa a manga da sua camisa*",
        speech: "Ah não, fazer mistério assim é golpe baixo! Agora vou ficar te infernizando até você falar!"
      }
    ],

    papo_o_que_acha_de_mim: [
      {
        id: "tp_feel_recip",
        tone: "sweet",
        title: "Segurar as duas mãos dela e dizer que sente exatamente a mesma coisa",
        hint: "Fortalece vínculo real e Intimidade",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 18, trust: 14, intimacyLevel: 12, vulnerability: 12, personaWarm: 4, mood: "dengosa", specialScene: "chamego" },
        action: "*Ela aperta seus dedos com força e encosta a testa no seu peito, toda derretida*",
        speech: "Ouvir você confirmar assim deixa meu coração em paz... não solta minhas mãos agora não."
      },
      {
        id: "tp_feel_prove",
        tone: "hot",
        title: "Chegar bem perto e dizer: 'Então para de falar e me prova'",
        hint: "Desafio direto de alta tensão",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 18, intimacyLevel: 10, desire: 12, personaBold: 4, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*Ela segura na gola da sua camisa na mesma hora, ficando na ponta dos pés com os olhos faiscando*",
        speech: "Você pediu pra eu provar... então não pisca nem recua agora."
      },
      {
        id: "tp_feel_test",
        tone: "ctrl",
        title: "Encarar calmo e perguntar se isso é sincero ou só o jogo de sempre dela",
        hint: "Quebra defesas e testa a verdade por trás da postura dela",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -22, influence: 14, vulnerability: 10, perception: 2, personaCold: 3, mood: "corada_sensivel" },
        action: "*Ela perde o sorrisinho ensaiado na hora e te olha séria, um pouco exposta*",
        speech: "...Eu brinco com muita coisa nesse andar, 402. Mas sobre o jeito que eu fico quando você chega perto, eu não tô fingindo nada."
      },
      {
        id: "tp_feel_cold",
        tone: "risky",
        title: "Ficar em silêncio por alguns segundos antes de responder com frieza",
        hint: "Desestabiliza a segurança dela e abre caminho frio/sombrio",
        nextThread: "conflict",
        sound: "warn",
        deltas: { mentalStability: -14, composure: -18, discomfort: 16, auroraDarkness: 12, influence: 10, personaRuthless: 3, mood: "decepcionada" },
        action: "*O brilho no olhar dela apaga devagar enquanto ela solta os braços e recua meio passo*",
        speech: "Entendi... Eu me abro pra você e recebo esse gelo de volta. Vou lembrar disso."
      }
    ],

    chamego_abraco_altura_peito: [
      {
        id: "tp_hug_stay",
        tone: "sweet",
        title: "Apoiar o queixo no cabelo dela e ficar ali sem pressa nenhuma",
        hint: "Intimidade acolhedora profunda",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 15, trust: 12, intimacyLevel: 10, mentalStability: 12, calm: 10, personaWarm: 3, mood: "entregue", specialScene: "chamego" },
        action: "*Ela solta um suspiro longo e se encolhe ainda mais nos seus braços*",
        speech: "Se eu pudesse pausar o relógio do quarto andar, eu pausava exatamente nesse segundo..."
      },
      {
        id: "tp_hug_lift",
        tone: "hot",
        title: "Erguer o queixo dela com um dedo pra olhar bem de perto",
        hint: "Pivota o abraço em química intensa",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 14, intimacyLevel: 10, desire: 10, personaBold: 3, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*Os lábios dela ficam entreabertos enquanto ela olha pra cima completamente entregue ao momento*",
        speech: "Você sabe exatamente o que acontece comigo quando você segura meu queixo desse jeito..."
      },
      {
        id: "tp_hug_pullback",
        tone: "ctrl",
        title: "Soltar o abraço devagar um segundo antes do que ela queria",
        hint: "Push-pull sutil que aumenta Influência e desejo",
        nextThread: "hot",
        sound: "click",
        deltas: { composure: -16, influence: 12, heat: 12, arousal: 10, personaCold: 2, mood: "carente" },
        action: "*Ela ainda segura a barra da sua camisa tentando te puxar de volta com um bico dengoso*",
        speech: "Ei! Quem disse que você podia terminar o abraço antes de eu mandar?! Volta aqui!"
      }
    ],

    chamego_levantar_prateleira: [
      {
        id: "tp_lift_hold",
        tone: "hot",
        title: "Continuar segurando ela na altura dos seus olhos sem descer ainda",
        hint: "Tensão cara a cara na mesma altura",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 16, intimacyLevel: 10, desire: 12, personaBold: 3, mood: "provocante", specialScene: "levantandoEla" },
        action: "*Ela envolve seu pescoço com os dois braços, sorrindo a centímetros da sua boca*",
        speech: "Olha a vista daqui de cima... Se você continuar me segurando assim eu vou acabar me aproveitando da altura."
      },
      {
        id: "tp_lift_spin",
        tone: "sweet",
        title: "Dar uma volta devagar com ela rindo até ela pedir pra descer",
        hint: "Leve, divertido e gera bastante Afinidade",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 15, trust: 10, discomfort: -12, personaWarm: 3, mood: "euforica", specialScene: "levantandoEla" },
        action: "*Ela solta uma risada alta e sincera agarrada nos seus ombros*",
        speech: "HAHAHA ME COLOCA NO CHÃO, SEU LOUCO!! Tá, espera, foi bom demais — faz de novo outro dia!"
      },
      {
        id: "tp_lift_ctrl",
        tone: "ctrl",
        title: "Perguntar sorrindo se lá no alto ela ainda acha que manda em tudo",
        hint: "Provoca o orgulho dela e balança o controle",
        nextThread: "mind",
        sound: "click",
        deltas: { dominance: -12, influence: 14, rivalry: 10, heat: 10, personaBold: 2, mood: "provocante" },
        action: "*Ela belisca de leve o seu ombro tentando manter a pose de rainha mesmo suspensa no ar*",
        speech: "Mando sim! Até porque quem tá fazendo força pra me carregar igual princesa aqui é você!"
      }
    ],

    quente_encurralar_parede: [
      {
        id: "tp_wall_breath",
        tone: "hot",
        title: "Ficar parado bem perto, só acompanhando a respiração dela acelerar",
        hint: "Escala o desejo sem precisar dizer nada",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 18, desire: 14, composure: -16, intimacyLevel: 8, personaBold: 3, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*Ela engole em seco, as mãos pequenas espalmadas no seu peito sem decidir se empurra ou puxa*",
        speech: "Você não fala nada e mesmo assim faz meu coração bater nos ouvidos... o que você tá esperando?"
      },
      {
        id: "tp_wall_retreat",
        tone: "ctrl",
        title: "Recuar um passo sorrindo calmo justo quando ela ergue o rosto",
        hint: "Gelo e fogo clássico · derruba Armadura e sobe Influência",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -22, influence: 16, heat: 14, rivalry: 12, personaCold: 3, mood: "provocante" },
        action: "*Ela fica encostada na parede boquiaberta, depois solta um riso inconformado*",
        speech: "Você NÃO fez isso!! Me cercou na parede e saiu andando tranquilo?! Isso vai ter volta dobrada!"
      },
      {
        id: "tp_wall_forehead",
        tone: "sweet",
        title: "Encostar a testa na dela devagar e trocar a tensão por carinho",
        hint: "Combina química com intimidade profunda",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, intimacyLevel: 12, trust: 10, heat: 10, personaWarm: 3, mood: "entregue", specialScene: "chamego" },
        action: "*Ela fecha os olhos no mesmo segundo e apoia as mãos na sua cintura*",
        speech: "Quando você mistura essa intensidade com calma, eu simplesmente desmonto na sua mão..."
      }
    ],

    quente_sussurrar_pescoco: [
      {
        id: "tp_whisp_more",
        tone: "hot",
        title: "Continuar falando ainda mais baixo perto da orelha dela",
        hint: "Dispara o Clima Quente e o Desejo",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 18, desire: 14, composure: -16, personaBold: 3, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*Ela agarra seu braço com força, um arrepio visível subindo pelo pescoço dela*",
        speech: "Para... quer dizer, não para, mas desse jeito eu não vou conseguir manter pose nenhuma hoje..."
      },
      {
        id: "tp_whisp_laugh",
        tone: "ctrl",
        title: "Afastar meio passo rindo baixinho de como ela arrepiou na hora",
        hint: "Provocação controlada · sobe Influência",
        nextThread: "hot",
        sound: "click",
        deltas: { composure: -18, influence: 14, heat: 12, rivalry: 10, personaBold: 2, mood: "corada_sensivel" },
        action: "*Ela cobre a orelha com a mão completamente vermelha e te encara indignada*",
        speech: "Você riu de mim?! Eu não arrepiei coisa nenhuma! ...Tá, talvez um pouco, mas a culpa é da sua voz!"
      },
      {
        id: "tp_whisp_soft",
        tone: "sweet",
        title: "Puxar ela pra um abraço calmo logo depois de bagunçar a cabeça dela",
        hint: "Carinho depois da faísca",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, intimacyLevel: 10, trust: 8, personaWarm: 3, mood: "dengosa", specialScene: "chamego" },
        action: "*Ela esconde o rosto quente no seu ombro, ainda rindo nervosa*",
        speech: "Você me desarma e me abraça no mesmo minuto... assim não tem defesa que aguente."
      }
    ],

    provocar_ciume_calculado: [
      {
        id: "tp_jel_hide",
        tone: "ctrl",
        title: "Virar a tela do celular pro lado sorrindo como se não fosse nada",
        hint: "Pressiona o ciúme e derruba a Armadura dela",
        nextThread: "mind",
        sound: "click",
        deltas: { jealousy: 18, composure: -18, influence: 14, rivalry: 12, personaCold: 3, mood: "ciumenta" },
        action: "*Ela fica na ponta dos pés indignada, tentando olhar por cima do seu braço sem conseguir*",
        speech: "Ah, agora vai esconder a tela?! Se não fosse nada você deixava eu ver! Quem é?!"
      },
      {
        id: "tp_jel_lock",
        tone: "hot",
        title: "Bloquear o celular, guardar no bolso e puxar ela pra perto",
        hint: "Vira o ciúme dela direto em química",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 16, affinity: 10, jealousy: -8, intimacyLevel: 8, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" },
        action: "*A expressão enciumada derrete em um sorriso perigoso assim que você escolhe olhar só pra ela*",
        speech: "Acho bom mesmo guardar esse celular... Agora sim sua atenção tá exatamente onde devia estar."
      },
      {
        id: "tp_jel_apologize",
        tone: "sweet",
        title: "Mostrar a tela rindo e dizer que era só mensagem de trabalho",
        hint: "Alivia o ciúme e transforma em risada carinhosa",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 12, trust: 10, jealousy: -14, discomfort: -10, personaWarm: 2, mood: "corada_sensivel" },
        action: "*Ela espia a tela, percebe que caiu na pegadinha e dá um tapa leve no seu peito corada*",
        speech: "Seu idiota!! Eu quase tive um treco aqui e era planilha de cliente?! Não faz mais isso comigo!"
      }
    ],

    ctrl_duelo_psicologico: [
      {
        id: "tp_duel_press",
        tone: "ctrl",
        title: "Apontar mais um detalhe da expressão dela sem piscar",
        hint: "Mantém a pressão mental · derruba bastante Armadura",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -22, influence: 16, dominance: -12, perception: 2, personaCold: 3, mood: "desconfiada" },
        action: "*Ela aperta os lábios e desvia o olhar por um instante raro, claramente desconcertada*",
        speech: "Tá bom, já entendi que você repara em tudo! Que nervoso conversar com alguém que lê cada microexpressão minha..."
      },
      {
        id: "tp_duel_close",
        tone: "hot",
        title: "Diminuir a distância e transformar o duelo mental em provocação de perto",
        hint: "Rivalidade elétrica + Clima Quente",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, rivalry: 14, influence: 12, arousal: 12, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" },
        action: "*Ela não recua — pelo contrário, ergue o queixo sustentando o desafio bem de perto*",
        speech: "Quer levar esse xadrez pro corpo a corpo, 402? Cuidado que de perto eu jogo muito melhor."
      },
      {
        id: "tp_duel_mercy",
        tone: "sweet",
        title: "Sorrir e dar uma trégua antes que o clima fique pesado demais",
        hint: "Desarma o atrito mantendo respeito",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 10, trust: 10, discomfort: -12, influence: 6, personaWarm: 2, mood: "alegre" },
        action: "*Ela solta o ar rindo, finalmente relaxando os ombros*",
        speech: "Ufa, obrigada pela trégua! Competir com você cansa até a mente, sabia?"
      }
    ],

    papo_cronicamente_online: [
      {
        id: "tp_net_watch",
        tone: "sweet",
        title: "Aproximar a cabeça da tela junto dela pra rir dos vídeos",
        hint: "Sintonia natural e leve",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 12, trust: 8, discomfort: -8, intimacyLevel: 5, personaWarm: 2, mood: "alegre" },
        action: "*Ela inclina a tela pra você rindo tanto que precisa apoiar a mão no seu braço*",
        speech: "Olha esse final!! Eu sabia que só você ia entender exatamente por que eu ri disso às onze da noite!"
      },
      {
        id: "tp_net_alg",
        tone: "hot",
        title: "Comentar baixinho que o algoritmo dela tem muito bom gosto",
        hint: "Vira a brincadeira digital em flerte",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 14, arousal: 10, composure: -10, personaBold: 2, mood: "provocante" },
        action: "*Ela trava a tela na hora, olhando pra cima com um sorriso cúmplice e malicioso*",
        speech: "Olha só quem tá querendo testar na prática os vídeos que aparecem no meu feed..."
      },
      {
        id: "tp_net_alt",
        tone: "ctrl",
        title: "Perguntar rindo o que ela posta quando acha que ninguém do prédio está vendo",
        hint: "Psicologia indireta · pesca pistas da conta secundária",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -18, influence: 12, perception: 2, personaCold: 2, mood: "corada_sensivel" },
        action: "*Ela bloqueia o celular um segundo rápido demais, entregando que tem conta paralela*",
        speech: "Eu não posto nada demais não!! ...Ei, tira esse sorriso de detetive da cara agora mesmo!"
      }
    ],

    papo_sua_vida_trabalho: [
      {
        id: "tp_work_company",
        tone: "sweet",
        title: "Dizer que só de conversar com ela o peso da semana já diminuiu",
        hint: "Fortalece Confiança e Afinidade",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, trust: 12, calm: 10, vulnerability: 8, personaWarm: 3, mood: "dengosa" },
        action: "*Ela sorri gentil e aperta sua mão com os dedos pequenos*",
        speech: "Então sempre que a cabeça pesar de trabalho, bate na minha porta. Eu te distraio rapidinho."
      },
      {
        id: "tp_work_distract",
        tone: "hot",
        title: "Perguntar sorrindo exatamente como ela pretende tirar sua cabeça das planilhas",
        hint: "Puxa o papo pra provocação direta",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 14, desire: 10, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" },
        action: "*Ela se aproxima devagar, passando o dedo pela gola da sua camisa*",
        speech: "Se eu contar perde a graça... fecha o notebook mais cedo hoje e vem descobrir ao vivo."
      },
      {
        id: "tp_work_collab",
        tone: "ctrl",
        title: "Propor fazerem uma pausa juntos onde ela escolhe o que fazer depois",
        hint: "Aumenta intimidade e testa a iniciativa dela",
        nextThread: "mind",
        sound: "click",
        deltas: { dominance: 8, affinity: 8, influence: 6, mood: "espontanea" },
        action: "*Ela cruza os braços já planejando alguma coisa com brilho nos olhos*",
        speech: "Opa, deixar a programação inteira na minha mão? Depois não reclama se a gente virar a madrugada!"
      }
    ],

    conversar_otimizar_pc_dela: [
      {
        id: "tp_pc_teach",
        tone: "sweet",
        title: "Explicar devagar os atalhos pra nunca mais travar na hora da entrega",
        hint: "Sobe Confiança e Código",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 12, trust: 14, tech: 2, personaWarm: 2, mood: "alegre" },
        action: "*Ela anota tudo num post-it rosa colado no monitor e te olha admirada*",
        speech: "Você explica sem fazer eu me sentir burra. Ganhou mais mil pontos comigo hoje!"
      },
      {
        id: "tp_pc_reward",
        tone: "hot",
        title: "Olhar de canto pra ela e perguntar qual vai ser o pagamento do suporte técnico",
        hint: "Transforma o favor em clima quente",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 12, influence: 10, personaBold: 3, mood: "provocante" },
        action: "*Ela apoia o queixo no seu ombro, bem perto do seu rosto, rindo baixo*",
        speech: "Olha ele cobrando taxa de manutenção... Aceita pagamento em café ou tava pensando em outra coisa?"
      },
      {
        id: "tp_pc_log",
        tone: "ctrl",
        title: "Comentar por cima que viu uma pasta curiosa enquanto limpava o cache",
        hint: "Pressão psicológica sutil · derruba bastante Armadura",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -22, influence: 14, perception: 2, personaCold: 3, mood: "corada_sensivel" },
        action: "*Ela dá um pulo na cadeira tentando tampar o monitor com as duas mãos pequenas*",
        speech: "EI!! O combinado era otimizar o sistema, não bisbilhotar minhas pastas! Esquece o que você viu!"
      }
    ],

    conversar_notar_detalhe_percepcao: [
      {
        id: "tp_perc_wrist",
        tone: "sweet",
        title: "Segurar a mão dela de leve e fazer uma massagem rápida no pulso cansado",
        hint: "Gesto atencioso · sobe Intimidade e Abertura",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 15, trust: 12, intimacyLevel: 10, auroraEnergy: 8, personaWarm: 3, mood: "dengosa", specialScene: "chamego" },
        action: "*Ela olha pros seus dedos cuidando do pulso dela e suspira baixinho toda derretida*",
        speech: "Nossa... você realmente presta atenção em tudo em mim. Isso tá bom demais, continua."
      },
      {
        id: "tp_perc_look",
        tone: "hot",
        title: "Dizer baixo que reparar em cada detalhe dela virou seu hábito favorito",
        hint: "Aquece o clima com intensidade",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 14, composure: -12, personaBold: 2, mood: "corada_sensivel" },
        action: "*Ela desvia o olhar por um segundo sorrindo envergonhada e volta pros seus olhos*",
        speech: "Se você continuar falando essas coisas olhando direto pra mim, eu não vou aguentar manter a postura..."
      },
      {
        id: "tp_perc_deep",
        tone: "ctrl",
        title: "Comentar que o jeito como ela tenta disfarçar cansaço entrega quando algo a incomoda",
        hint: "Leitura profunda · quebra a Armadura",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -20, influence: 12, vulnerability: 12, perception: 2, personaCold: 2, mood: "melancolica" },
        action: "*Ela abaixa a guarda de uma vez, surpresa por alguém enxergar além da energia agitada dela*",
        speech: "...É estranho quando alguém enxerga a gente de verdade assim. Dá um pouco de medo, mas é bom."
      }
    ],

    conversar_elogio_calculado: [
      {
        id: "tp_calc_double",
        tone: "hot",
        title: "Aproximar só mais um pouco e repetir o elogio olhando nos olhos dela",
        hint: "Dobra o efeito emocional e químico",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 14, composure: -16, influence: 12, mood: "corada_sensivel", specialScene: "paredeCorredor" },
        action: "*Ela segura a barra do moletom sem conseguir parar de sorrir, completamente mexida*",
        speech: "Para!! Você sabe exatamente a dose certa pra me deixar sem defesa nenhuma..."
      },
      {
        id: "tp_calc_stepback",
        tone: "ctrl",
        title: "Sorrir tranquilo e mudar de assunto como se não tivesse acabado de desmontar ela",
        hint: "Psicologia indireta · alto ganho de Influência",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -20, influence: 16, rivalry: 8, personaCold: 3, mood: "carente" },
        action: "*Ela pisca atordoada, puxando sua manga pra você não sair do assunto*",
        speech: "Ei!! Você solta uma bomba dessas no meu colo e finge que nada aconteceu?! Volta aqui!"
      },
      {
        id: "tp_calc_genuine",
        tone: "sweet",
        title: "Suavizar o olhar e deixar claro que cada palavra era sincera",
        hint: "Converte jogada calculada em vínculo real",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, trust: 14, vulnerability: 10, personaWarm: 3, mood: "emocionada" },
        action: "*O rubor fica ainda mais forte e ela encosta a testa no seu ombro*",
        speech: "Obrigada... eu às vezes acho que você tá só jogando comigo, mas ouvir isso assim me deixa boba."
      }
    ],

    chamego_cafune_laco: [
      {
        id: "tp_laco_forehead",
        tone: "sweet",
        title: "Ajeitar a franja dela devagar e dar um beijo demorado na testa",
        hint: "Carinho profundo que derrete a marra toda",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 16, trust: 14, intimacyLevel: 12, mentalStability: 10, personaWarm: 4, mood: "entregue", specialScene: "chamego" },
        action: "*Ela fecha os olhos devagar e segura na sua camisa, soltando um suspiro baixinho*",
        speech: "Beijo na testa é golpe baixo demais... parece que o mundo inteiro para quando você faz isso."
      },
      {
        id: "tp_laco_untie",
        tone: "hot",
        title: "Deslizar os dedos pela fita do laço devagar enquanto encara a boca dela",
        hint: "Pivota o cafuné em tensão íntima",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, arousal: 16, intimacyLevel: 10, desire: 12, personaBold: 3, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*Ela prende a respiração com os dedos roçando no seu pulso, olhando direto pros seus lábios*",
        speech: "Se você soltar meu laço com esse olhar aí... sabe que eu não vou ficar parada esperando, né?"
      },
      {
        id: "tp_laco_tease",
        tone: "sweet",
        title: "Brincar que o laço rosa dá pelo menos uns três centímetros extras pra ela",
        hint: "Brincadeira leve que vira risada e abraço",
        nextThread: "warm",
        sound: "click",
        deltas: { affinity: 12, discomfort: -10, mood: "alegre" },
        action: "*Ela bate no seu peito rindo e se joga no seu abraço de qualquer jeito*",
        speech: "Três centímetros de puro charme, respeita o meu laço!"
      }
    ],

    chamego_declarar_amor: [
      {
        id: "tp_love_hold",
        tone: "sweet",
        title: "Ficar em silêncio olhando pra ela, deixando a frase pesar de verdade",
        hint: "Aumenta bastante Intimidade, Afinidade e Confiança",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 18, trust: 16, intimacyLevel: 14, vulnerability: 16, personaWarm: 4, mood: "emocionada", specialScene: "chamego" },
        action: "*Os olhos dela brilham enquanto ela envolve seu pescoço na ponta dos pés, encostando a bochecha na sua*",
        speech: "Eu não troco o que a gente construiu nesse quarto andar por nada nesse mundo. Você também é meu favorito."
      },
      {
        id: "tp_love_kiss",
        tone: "hot",
        title: "Puxar ela pela cintura até o rosto dela ficar pertinho do seu",
        hint: "Une romance profundo com química intensa",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 16, intimacyLevel: 14, affinity: 12, personaBold: 3, mood: "entregue", specialScene: "noite404" },
        action: "*Ela segura seu rosto com as duas mãos pequenas e sorri contra a sua respiração*",
        speech: "Então para de só falar e fica bem perto de mim agora..."
      },
      {
        id: "tp_love_ask",
        tone: "ctrl",
        title: "Sorrir de canto e perguntar baixinho se ela tem coragem de dizer o mesmo",
        hint: "Desafia ela a abrir a guarda por inteiro",
        nextThread: "warm",
        sound: "click",
        deltas: { composure: -18, vulnerability: 14, affinity: 12, influence: 8, mood: "corada_sensivel" },
        action: "*Ela morde o lábio vermelha até as orelhas antes de sussurrar contra o seu peito*",
        speech: "Você é chato demais fazendo eu confessar... mas sim. Você virou minha pessoa favorita."
      }
    ],

    quente_provocar_uniforme_moletom: [
      {
        id: "tp_cloth_closer",
        tone: "hot",
        title: "Sustentar o olhar sem disfarçar e comentar qual detalhe você mais gostou",
        hint: "Direto, ousado e dispara a tensão dela",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 16, desire: 12, composure: -14, personaBold: 3, mood: "excitada_tensa", specialScene: "uniformeProvocante" },
        action: "*Ela arqueia uma sobrancelha mordendo o lábio e dá um passo na sua direção*",
        speech: "Zero filtro hoje, né? Gostei. Falar olhando nos olhos assim deixa tudo muito mais interessante."
      },
      {
        id: "tp_cloth_cool",
        tone: "ctrl",
        title: "Dar um sorriso tranquilo e dizer que o que mais chama atenção nem é a roupa",
        hint: "Vira o elogio em poder psicológico + charme",
        nextThread: "hot",
        sound: "click",
        deltas: { composure: -16, influence: 14, affinity: 10, heat: 12, personaCold: 2, mood: "corada_sensivel" },
        action: "*Ela pisca pega de surpresa pelo elogio certeiro e cora na hora*",
        speech: "Ei... assim você desarma toda a minha provocação de uma vez só!"
      },
      {
        id: "tp_cloth_yield",
        tone: "ctrl",
        title: "Sorrir e deixar ela se exibir no ritmo dela sem você dar um passo",
        hint: "Alimenta o lado confiante e dominador dela",
        nextThread: "mind",
        sound: "click",
        deltas: { dominance: 12, heat: 12, arousal: 10, mood: "controladora" },
        action: "*Ela gira devagar com um sorriso satisfeito de quem sabe o efeito que causa*",
        speech: "Isso mesmo, fica aí admirando quietinho. Gosto de ver você hipnotizado."
      }
    ],

    quente_puxar_cintura_colo: [
      {
        id: "tp_lap_steady",
        tone: "hot",
        title: "Firmar as mãos na cintura dela e perguntar se ela pretende sair daí tão cedo",
        hint: "Alta intimidade e tensão no colo",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 18, intimacyLevel: 12, desire: 14, personaBold: 3, mood: "excitada_tensa", specialScene: "nsfw1" },
        action: "*Ela se ajeita ainda mais perto, envolvendo seu pescoço com um sorriso lento*",
        speech: "Sair daqui? De jeito nenhum. Agora que eu fiquei mais alta que você, eu não arredo o pé."
      },
      {
        id: "tp_lap_cuddle",
        tone: "sweet",
        title: "Passar os braços ao redor dela e deixar ela encostar a cabeça no seu ombro",
        hint: "Transforma o colo em chamego profundo",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 16, intimacyLevel: 12, trust: 10, vulnerability: 12, personaWarm: 3, mood: "entregue", specialScene: "chamego" },
        action: "*Ela relaxa o corpo inteiro em cima de você, respirando fundo no seu pescoço*",
        speech: "Aqui em cima parece o lugar mais seguro e quente do prédio inteiro..."
      },
      {
        id: "tp_lap_ctrl",
        tone: "ctrl",
        title: "Apoiar as costas e deixar ela ditar o ritmo lá de cima",
        hint: "Sobe Controle dela + Clima Quente",
        nextThread: "mind",
        sound: "click",
        deltas: { dominance: 14, heat: 14, arousal: 12, mood: "controladora", specialScene: "controle" },
        action: "*Ela segura seu queixo de cima pra baixo com um brilho triunfante nos olhos*",
        speech: "Olha você obediente assim... agora quem escolhe o próximo movimento sou eu."
      }
    ],

    ctrl_abaixar_obedecer: [
      {
        id: "tp_obey_full",
        tone: "ctrl",
        title: "Continuar curvado na altura dela esperando a próxima ordem sem reclamar",
        hint: "Entrega domínio psicológico total",
        nextThread: "mind",
        sound: "click",
        deltas: { dominance: 18, heat: 10, discomfort: -8, mood: "controladora", specialScene: "controle" },
        action: "*Ela acaricia seu rosto satisfeita com o próprio poder sobre você*",
        speech: "Olha que cena bonita... você desse tamanho inteiro esperando minha palavra. Continua assim."
      },
      {
        id: "tp_obey_flip",
        tone: "hot",
        title: "Aproveitar que está na altura do rosto dela pra olhar fundo e roubar o ar dela",
        hint: "Finge obediência pra virar a mesa na hora",
        nextThread: "hot",
        sound: "hot",
        deltas: { influence: 16, heat: 16, dominance: -12, composure: -16, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" },
        action: "*A pose de rainha dela vacila em um segundo quando percebe que estar na altura dos olhos dela era armadilha sua*",
        speech: "Ei!! Você abaixou fingindo obediência só pra ficar a dois centímetros da minha boca?! Jogador sujo!"
      },
      {
        id: "tp_obey_sweet",
        tone: "sweet",
        title: "Sorrir baixinho e perguntar o que ela realmente precisa pra relaxar hoje",
        hint: "Desarma o teatro de poder com carinho real",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, trust: 10, mentalStability: 8, personaWarm: 3, mood: "dengosa" },
        action: "*Ela perde a marra na hora e dá um sorriso genuíno mexendo no seu cabelo*",
        speech: "Na verdade? Só queria você por perto sem pressa hoje."
      }
    ],

    ctrl_reclamar_mas_preso: [
      {
        id: "tp_trap_admit",
        tone: "ctrl",
        title: "Assumir em voz alta que ela bagunçou sua cabeça e você não quer sair",
        hint: "Alimenta profundamente a Teia de Controle",
        nextThread: "mind",
        sound: "click",
        deltas: { dominance: 18, heat: 12, affinity: 6, mood: "controladora", specialScene: "controle" },
        action: "*Um sorriso lento e vitorioso toma conta do rosto dela enquanto ela segura sua gola*",
        speech: "Finalmente admitiu. E relaxa: eu cuido muito bem do que é meu."
      },
      {
        id: "tp_trap_challenge",
        tone: "hot",
        title: "Responder que o vício é mútuo — porque ela também não fecha a porta pra você",
        hint: "Equilibra o poder com rivalidade elétrica",
        nextThread: "hot",
        sound: "hot",
        deltas: { rivalry: 14, influence: 14, heat: 14, dominance: -10, composure: -14, personaBold: 3, mood: "provocante" },
        action: "*Ela trava o sorriso por um segundo, mexida pela verdade na sua frase*",
        speech: "...Tá, talvez você também tenha ficado difícil de ignorar nesse andar. Não se acha muito não!"
      },
      {
        id: "tp_trap_honest",
        tone: "sweet",
        title: "Falar sério que quer construir algo bom de verdade, sem machucar nenhum dos dois",
        hint: "Traz saúde emocional e estabilidade",
        nextThread: "warm",
        sound: "heart",
        deltas: { trust: 16, affinity: 14, mentalStability: 14, auroraDarkness: -10, personaWarm: 3, mood: "emocionada" },
        action: "*O olhar duro dela suaviza na hora e ela encosta a mão no seu peito*",
        speech: "Eu também quero isso. Desculpa quando eu exagero na pose — não quero que a gente se machuque."
      }
    ],

    ctrl_atitude_ruim_forcar: [
      {
        id: "tp_bad_double",
        tone: "risky",
        title: "Manter o olhar frio e não voltar atrás em nada do que disse",
        hint: "Escala atrito pesado e desperta a Espiral Sombria dela",
        nextThread: "conflict",
        sound: "warn",
        deltas: { discomfort: 20, affinity: -14, auroraDarkness: 14, rivalry: 14, personaRuthless: 4, mood: "raivosa" },
        action: "*Os olhos dela escurecem de raiva fria enquanto ela ergue o queixo sem recuar*",
        speech: "Ótimo. Bom saber exatamente com quem eu tô lidando no 402. Não reclama do que voltar pra você."
      },
      {
        id: "tp_bad_sorry",
        tone: "sweet",
        title: "Perceber que passou do limite e pedir desculpa na hora",
        hint: "Freia o estrago antes que vire ruptura",
        nextThread: "warm",
        sound: "heart",
        deltas: { discomfort: -16, trust: 6, affinity: 6, personaWarm: 2, mood: "decepcionada" },
        action: "*Ela continua de braços cruzados, mas a expressão tensa diminui um pouco*",
        speech: "...Pelo menos você reconheceu rápido. Mas não faz mais isso comigo, sério."
      },
      {
        id: "tp_bad_coldread",
        tone: "ctrl",
        title: "Perguntar com calma gelada por que ela levou tão pro lado pessoal",
        hint: "Manipulação fria · derruba Estabilidade e sobe Influência",
        nextThread: "mind",
        sound: "warn",
        deltas: { mentalStability: -14, composure: -16, influence: 12, auroraDarkness: 12, personaCold: 4, mood: "paranoica_delirante" },
        action: "*Ela pisca confusa e revoltada com a sua frieza cirúrgica*",
        speech: "Você me trata mal e ainda tenta fazer parecer que o problema sou eu?! Que cabeça doentia você tem..."
      }
    ],

    ctrl_blefar_inocencia: [
      {
        id: "tp_bluff_calm",
        tone: "ctrl",
        title: "Manter a expressão tranquila e mudar de assunto naturalmente",
        hint: "Sela o blefe e derruba ainda mais a Suspeita",
        nextThread: "mind",
        sound: "click",
        deltas: { suspicion: -18, composure: -10, influence: 10, charisma: 2, personaCold: 3, mood: "espontanea" },
        action: "*Ela balança a cabeça convencida e deixa o assunto pra trás*",
        speech: "É, faz sentido mesmo. Desculpa ficar cismada à toa, cabeça cansada inventa coisa."
      },
      {
        id: "tp_bluff_charm",
        tone: "sweet",
        title: "Dar um sorriso leve e fazer um agrado pra virar a página de vez",
        hint: "Zera o desconforto com charme",
        nextThread: "warm",
        sound: "heart",
        deltas: { suspicion: -14, affinity: 10, discomfort: -10, personaWarm: 2, mood: "alegre" },
        action: "*Ela ri solta, esquecendo totalmente a desconfiança de dois minutos atrás*",
        speech: "Pronto, passou! Você tem um jeito muito fácil de me fazer esquecer qualquer estresse."
      },
      {
        id: "tp_bluff_smirk",
        tone: "hot",
        title: "Soltar um meio sorriso cúmplice, deixando ela em dúvida se acreditou ou não",
        hint: "Cria tensão perigosa de gato e rato",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 12, rivalry: 12, influence: 10, suspicion: 6, personaBold: 2, mood: "provocante" },
        action: "*Ela estreita os olhos mordendo o lábio, intrigada pela sua cara de pau*",
        speech: "Esse sorrisinho no canto da boca não me engana totalmente não, 402... vou ficar de olho em você."
      }
    ],

    ctrl_inverter_culpa: [
      {
        id: "tp_guilt_press",
        tone: "ctrl",
        title: "Ficar quieto com ar magoado, deixando ela correr atrás pra te compensar",
        hint: "Pressão psicológica · derruba Armadura e sobe Influência",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -22, influence: 16, dominance: -12, auroraDarkness: 8, personaRuthless: 3, mood: "carente" },
        action: "*Ela segura na sua manga ansiosa, claramente culpada por achar que te magoou*",
        speech: "Ei, não fica fechado comigo assim... eu já pedi desculpa! O que eu posso fazer pra você ficar de boa?"
      },
      {
        id: "tp_guilt_forgive",
        tone: "sweet",
        title: "Puxar ela pra um abraço dizendo que já passou e ela não precisa se culpar",
        hint: "Recompensa emocional após a inversão",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 12, trust: 10, suspicion: -14, composure: -12, personaCold: 2, mood: "dengosa", specialScene: "chamego" },
        action: "*Ela suspira aliviada se encaixando no seu abraço*",
        speech: "Obrigada por não guardar rancor de mim... prometo não duvidar assim de você."
      },
      {
        id: "tp_guilt_price",
        tone: "hot",
        title: "Dizer baixo que ela vai ter que compensar essa desconfiança de perto",
        hint: "Transforma a culpa dela em vantagem quente",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 16, influence: 12, arousal: 12, personaBold: 3, mood: "provocante" },
        action: "*Ela olha pra cima mordendo o lábio, rendida pela sua lábia*",
        speech: "Olha como você sabe aproveitar cada oportunidade... tá bom, como é que eu te compenso?"
      }
    ],

    ctrl_tirar_proveito_carencia: [
      {
        id: "tp_vuln_dig",
        tone: "ctrl",
        title: "Fazer mais uma pergunta suave e específica enquanto a guarda dela está no chão",
        hint: "Derruba a Armadura ao mínimo pra abrir extração de segredo",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -24, influence: 14, stealth: 2, personaCold: 3, personaRuthless: 2, mood: "carente" },
        action: "*Bocejando encostada em você, ela fala ainda mais baixo e sem filtro nenhum*",
        speech: "Sabe o pior? Eu nem devia contar isso, mas tô tão cansada que nem consigo mais segurar tudo sozinha..."
      },
      {
        id: "tp_vuln_care",
        tone: "sweet",
        title: "Desistir da segunda intenção e só fazer cafuné até ela descansar de verdade",
        hint: "Cura Estabilidade, Confiança e Afinidade",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 16, trust: 16, mentalStability: 14, vulnerability: 14, personaWarm: 4, mood: "entregue", specialScene: "chamego" },
        action: "*Ela fecha os olhos no seu ombro, confiando em você de verdade*",
        speech: "Obrigada por não se aproveitar do meu cansaço... com você eu finalmente consigo desligar a cabeça."
      },
      {
        id: "tp_vuln_hold",
        tone: "hot",
        title: "Puxar ela mais pra perto e falar baixo perto do cabelo dela",
        hint: "Aproxima física e emocionalmente na guarda baixa",
        nextThread: "hot",
        sound: "hot",
        deltas: { intimacyLevel: 10, heat: 12, composure: -14, mood: "sonolenta_manhosa" },
        action: "*Ela murmura manhosa sem força nenhuma pra fazer pose*",
        speech: "Hmmm... fica assim bem pertinho... sua voz dá uma calma gostosa demais."
      }
    ],

    ctrl_heroi_fabricado: [
      {
        id: "tp_hero_humble",
        tone: "ctrl",
        title: "Fazer cara de anjo e dizer que foi pura coincidência estar passando ali",
        hint: "Sobe Confiança e Influência com zero rastro",
        nextThread: "mind",
        sound: "click",
        deltas: { influence: 14, trust: 10, suspicion: -12, charisma: 2, personaCold: 3, mood: "alegre" },
        action: "*Ela acredita no seu ar inocente e sorri agradecida*",
        speech: "Pois que coincidência abençoada! Você sempre aparece exatamente quando eu preciso!"
      },
      {
        id: "tp_hero_wink",
        tone: "hot",
        title: "Piscar de leve deixando no ar que heróis do 402 cobram recompensa",
        hint: "Alimenta química e rivalidade divertida",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 14, rivalry: 10, influence: 10, personaBold: 2, mood: "provocante" },
        action: "*Ela ri desconfiada mas entra totalmente na brincadeira*",
        speech: "Sei... 'coincidência', né? Vou pagar essa recompensa, mas só porque você resolveu rápido!"
      },
      {
        id: "tp_hero_sweet",
        tone: "sweet",
        title: "Dizer que só queria ver o sorriso aliviado dela hoje",
        hint: "Converte a armação em puro carinho",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, trust: 8, discomfort: -10, personaWarm: 3, mood: "dengosa" },
        action: "*Ela fica toda corada e segura sua mão em agradecimento*",
        speech: "Nossa... assim eu acabo esquecendo até que eu tava estressada dois minutos atrás."
      }
    ],

    ctrl_cobrar_aposta_ousada: [
      {
        id: "tp_bet_lead",
        tone: "hot",
        title: "Ditar uma regra ousada pra noite e encarar ela sem piscar",
        hint: "Escala Clima Quente e Influência",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, influence: 14, arousal: 16, dominance: -10, personaBold: 3, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*Ela engole em seco, mas um brilho competitivo e empolgado acende nos olhos dela*",
        speech: "Fechado. Eu pago minhas apostas direito — só não vai tremer quando for a minha vez de cobrar revanche!"
      },
      {
        id: "tp_bet_sweet",
        tone: "sweet",
        title: "Usar a aposta pra pedir uma noite tranquila só vocês dois sem celular",
        hint: "Intimidade genuína que surpreende ela",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 16, trust: 14, intimacyLevel: 12, mentalStability: 10, personaWarm: 3, mood: "emocionada", specialScene: "chamego" },
        action: "*Ela pisca surpresa, esperando uma provocação, e abre um sorriso enorme*",
        speech: "Você ganhou a aposta e pediu só tempo comigo sem distração?! ...Ok, você venceu duas vezes hoje."
      },
      {
        id: "tp_bet_save",
        tone: "ctrl",
        title: "Sorrir calmo e dizer que vai guardar esse favor pra cobrar na hora certa",
        hint: "Pressão indireta · derruba Armadura e mantém vantagem",
        nextThread: "mind",
        sound: "click",
        deltas: { composure: -18, influence: 16, rivalry: 10, personaCold: 3, mood: "desconfiada" },
        action: "*Ela arregala os olhos inquieta com o sorriso calculista no seu rosto*",
        speech: "Guardar pra depois?! Isso é tortura psicológica, 402! Fala logo o que você tá tramando!"
      }
    ],

    quente_beijo_pescoco_lento: [
      {
        id: "tp_neck_linger",
        tone: "hot",
        title: "Demorar os lábios na curva do pescoço dela sentindo o pulso disparar",
        hint: "Alta química física · sobe Clima, Tensão e Intimidade",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 20, arousal: 20, intimacyLevel: 12, desire: 14, composure: -18, personaBold: 3, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*Ela inclina a cabeça ainda mais pro lado, os dedos cravando de leve no seu ombro enquanto a respiração fica curta*",
        speech: "M-meu Deus... você faz isso tão devagar que me desmonta inteira. Se não subir pra minha boca agora eu vou te puxar!"
      },
      {
        id: "tp_neck_whisper",
        tone: "hot",
        title: "Sussurrar contra a pele quente dela o que você quer fazer quando ficarem sozinhos",
        hint: "Combina toque e provocação no ouvido",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 18, influence: 10, composure: -16, personaBold: 3, mood: "sedutora_ousada" },
        action: "*Um arrepio atravessa os ombros dela e ela vira o rosto no mesmo segundo colando a testa na sua*",
        speech: "Falar essas coisas com a boca encostada no meu pescoço é covardia demais... quero ver você cumprir cada palavra!"
      },
      {
        id: "tp_neck_pull",
        tone: "ctrl",
        title: "Parar no ponto mais intenso e olhar pra ela sorrindo calmo",
        hint: "Controle de ritmo · derruba Armadura e dispara o desejo dela",
        nextThread: "hot",
        sound: "click",
        deltas: { composure: -22, influence: 16, arousal: 18, heat: 14, personaCold: 3, mood: "carente" },
        action: "*Ela abre os olhos indignada e sem fôlego, puxando você de volta pela gola*",
        speech: "Você NÃO parou no meio!! Volta aqui agora, 402, não me deixa assim!"
      }
    ],

    quente_tirar_moletom_ombro: [
      {
        id: "tp_shld_kiss",
        tone: "hot",
        title: "Encostar um beijo lento na pele exposta do ombro dela sem desviar o olhar",
        hint: "Sensualidade direta · alto ganho de Intimidade e Tensão",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 20, arousal: 20, intimacyLevel: 14, desire: 14, composure: -16, personaBold: 3, mood: "excitada_tensa", specialScene: "nsfw1" },
        action: "*Ela prende a respiração com os olhos semicerrados, apoiando a mão pequena na sua nuca*",
        speech: "Sua boca quente na minha pele... hoje você resolveu testar até onde vai o meu fôlego, né?"
      },
      {
        id: "tp_shld_waist",
        tone: "hot",
        title: "Deslizar a outra mão pela cintura dela por baixo da barra larga do moletom",
        hint: "Escala o toque físico em privacidade",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 22, arousal: 22, intimacyLevel: 14, desire: 16, personaBold: 4, mood: "excitada_tensa", specialScene: "nsfw1" },
        action: "*Ela dá um pequeno sobressalto gostoso ao sentir sua mão quente na cintura dela e cola o corpo no seu*",
        speech: "Sua mão tá tão quente na minha pele... não tira ela daí não, por favor."
      },
      {
        id: "tp_shld_fix",
        tone: "sweet",
        title: "Acariciar o ombro dela de leve e puxar ela pra um abraço colado",
        hint: "Alterna ousadia com carinho intenso",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 16, intimacyLevel: 12, trust: 10, heat: 10, personaWarm: 3, mood: "entregue", specialScene: "chamego" },
        action: "*Ela sorri derretida encostando o rosto no seu peito, toda arrepiada*",
        speech: "O jeito que você mistura desejo com cuidado me deixa completamente nas suas mãos..."
      }
    ],

    quente_sentar_bancada_altura: [
      {
        id: "tp_cnt_between",
        tone: "hot",
        title: "Dar um passo entre os joelhos dela e puxar a cintura dela até a borda",
        hint: "Proximidade total cara a cara na mesma altura",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 22, arousal: 22, intimacyLevel: 16, desire: 16, composure: -18, personaBold: 4, mood: "excitada_tensa", specialScene: "nsfw2" },
        action: "*Ela fecha as pernas ao redor da sua cintura e segura sua nuca, finalmente na exata altura da sua boca*",
        speech: "Ficar exatamente na sua altura assim sem precisar de ponta dos pés... agora me beija direito, 402."
      },
      {
        id: "tp_cnt_tease",
        tone: "ctrl",
        title: "Apoiar as duas mãos na bancada ao lado dela, prendendo o olhar dela de perto",
        hint: "Domínio suave e tensão elétrica",
        nextThread: "hot",
        sound: "hot",
        deltas: { influence: 16, heat: 18, arousal: 18, composure: -18, dominance: -10, personaBold: 3, mood: "corada_sensivel" },
        action: "*Ela inclina levemente pra trás rindo sem fôlego, os olhos brilhando presos nos seus*",
        speech: "Você me cercou aqui em cima e sabe muito bem que eu não tô nem tentando sair..."
      },
      {
        id: "tp_cnt_forehead",
        tone: "sweet",
        title: "Segurar o rosto dela com as duas mãos e dar um beijo demorado",
        hint: "Química profunda com carinho real",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 18, intimacyLevel: 16, heat: 16, trust: 12, personaWarm: 3, mood: "entregue", specialScene: "noite404" },
        action: "*Ela suspira fundo correspondendo o beijo devagar, acariciando seu rosto com as mãos pequenas*",
        speech: "A melhor coisa do mundo é ficar aqui em cima pertinho de você assim..."
      }
    ],

    quente_morder_labio_desafio: [
      {
        id: "tp_kiss_deep",
        tone: "hot",
        title: "Beijar ela fundo sem dar tempo pra mais nenhuma resposta",
        hint: "Ação direta de alta química",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 22, arousal: 22, intimacyLevel: 14, desire: 14, composure: -18, personaBold: 4, mood: "excitada_tensa", specialScene: "paredeCorredor" },
        action: "*Ela corresponde no mesmo segundo, ficando na ponta dos pés e agarrando sua camisa com força*",
        speech: "Quem disse que eu queria parar num beijo só?! Você beija bom demais pra eu manter qualquer pose..."
      },
      {
        id: "tp_kiss_brush",
        tone: "ctrl",
        title: "Apenas roçar a boca na dela de leve e afastar um centímetro provocando",
        hint: "Tensão máxima de quase-beijo · derruba Armadura",
        nextThread: "hot",
        sound: "click",
        deltas: { composure: -22, arousal: 22, influence: 16, heat: 18, personaCold: 2, personaBold: 3, mood: "provocante" },
        action: "*Ela fecha os olhos esperando o beijo e abre indignada quando você para a um milímetro*",
        speech: "Ei!! Que tortura é essa de encostar quase sem beijar?! Acaba o que você começou!"
      },
      {
        id: "tp_kiss_smile",
        tone: "sweet",
        title: "Passar o polegar pelo lábio dela e sorrir: 'Então vamos descobrir sem pressa'",
        hint: "Equilibra tensão quente e cumplicidade",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 14, heat: 16, intimacyLevel: 12, trust: 8, mood: "corada_sensivel" },
        action: "*Ela cora intensamente e apoia a bochecha na sua mão, rendida*",
        speech: "Sem pressa é ainda mais perigoso com você..."
      }
    ],

    quente_jogo_tres_toques: [
      {
        id: "tp_3t_neck",
        tone: "hot",
        title: "Começar deslizando os dedos devagar do queixo até a curva do pescoço dela",
        hint: "Aumenta bastante Tensão Dela e Clima",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 18, arousal: 20, intimacyLevel: 12, composure: -16, personaBold: 3, mood: "excitada_tensa" },
        action: "*A pele dela arrepia imediatamente sob os seus dedos, mas ela segura o olhar no seu tentando não ceder*",
        speech: "Primeiro toque e eu já tô sem ar... você tem a mão quente demais pra esse jogo ser justo."
      },
      {
        id: "tp_3t_waist",
        tone: "hot",
        title: "Puxar firme a cintura dela contra o seu corpo no segundo toque",
        hint: "Proximidade intensa e domínio do ritmo",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 20, arousal: 20, intimacyLevel: 14, desire: 14, personaBold: 3, mood: "sedutora_ousada", specialScene: "paredeCorredor" },
        action: "*Ela bate o peito contra o seu com um suspiro curto e morde o lábio sorrindo*",
        speech: "Assim tão colado eu já perdi a conta dos toques... manda o terceiro logo!"
      },
      {
        id: "tp_3t_turn",
        tone: "ctrl",
        title: "Devolver a vez pra ela: 'Agora quero ver onde você escolhe encostar'",
        hint: "Testa a ousadia e iniciativa dela",
        nextThread: "hot",
        sound: "hot",
        deltas: { dominance: 10, heat: 18, arousal: 18, rivalry: 10, mood: "provocante" },
        action: "*Ela sorri maliciosa, desliza as mãos pelo seu peito até sua nuca e puxa você pra baixo*",
        speech: "Você pediu pra ver a minha vez... agora aguenta quietinho!"
      }
    ],

    quente_mandar_ela_conduzir: [
      {
        id: "tp_lead_let",
        tone: "hot",
        title: "Manter as mãos quietas ao lado do corpo e deixar ela ditar cada segundo",
        hint: "Alta química com ela no comando por cima",
        nextThread: "hot",
        sound: "hot",
        deltas: { dominance: 16, heat: 22, arousal: 22, intimacyLevel: 14, desire: 14, mood: "sedutora_ousada", specialScene: "nsfwControle" },
        action: "*Ela solta um riso baixo de pura satisfação, acomodando-se por cima e beijando o canto do seu queixo até sua boca*",
        speech: "Olha como você fica irresistível quando deixa eu mandar no ritmo inteiro... não mexe um dedo até eu deixar."
      },
      {
        id: "tp_lead_grab",
        tone: "hot",
        title: "Deixar ela provocar até o limite e então segurar firme a cintura dela virando a posição",
        hint: "Virada picante de poder no meio da cena",
        nextThread: "hot",
        sound: "hot",
        deltas: { heat: 24, arousal: 24, influence: 16, rivalry: 14, intimacyLevel: 16, personaBold: 4, mood: "excitada_tensa", specialScene: "nsfw1" },
        action: "*Ela solta um gritinho surpreso e excitado quando você inverte a posição num movimento só*",
        speech: "EI!! O combinado era eu mandar hoje — mas confesso que você me virando assim me fez perder todo o fôlego!"
      },
      {
        id: "tp_lead_praise",
        tone: "sweet",
        title: "Olhar de baixo pra cima e dizer baixinho o quanto ela é hipnotizante assim",
        hint: "Alimenta a confiança e entrega emocional dela",
        nextThread: "warm",
        sound: "heart",
        deltas: { affinity: 16, intimacyLevel: 16, heat: 16, trust: 12, personaWarm: 3, mood: "entregue" },
        action: "*Os olhos dela suavizam misturando desejo e carinho enquanto ela desliza os dedos no seu rosto*",
        speech: "Só com você eu me sinto tão segura pra me soltar desse jeito..."
      }
    ]
  };

  function findTopicSpecificBeat(topicId, branchId) {
    const list = TOPIC_SPECIFIC_BEATS[topicId];
    if (!list) return null;
    return list.find((b) => b.id === branchId) || null;
  }

  function getLivingContextRemark(nextThread, turn) {
    const s = AG.state;
    const mems = s.memories || [];
    if (turn % 2 === 0 && s.weather === "chuva_noturna" && (nextThread === "warm" || nextThread === "hot")) {
      return " Esse barulho de chuva lá fora ainda deixa tudo aqui dentro com outra atmosfera...";
    }
    if (turn % 2 === 0 && s.weather === "apagao_andar") {
      return " E nessa meia-luz do quarto andar parece que só existe a gente aqui.";
    }
    if (turn === 2 && mems.length > 0) {
      if (nextThread === "warm" && mems.some((m) => m.id === "cafe_primeira_noite")) {
        return " Ainda lembro daquele café gelado da primeira noite, viu?";
      }
      if (nextThread === "warm" && mems.some((m) => m.id === "otimizou_pc_404")) {
        return " Meu tablet tá voando até agora desde que você mexeu nele, aliás.";
      }
      if (nextThread === "conflict" && mems.some((m) => m.category === "ruim")) {
        return " E não acha que eu esqueci das outras vezes em que você pisou na bola não.";
      }
    }
    return "";
  }

  // ==========================================================================
  // CONSTRUTOR DINÂMICO DE OPÇÕES MULTI-TURNO (CADA ESCOLHA ABRE NOVO CAMINHO)
  // ==========================================================================
  AG.getConversationChoices = function () {
    const s = AG.state;
    const a = s.aurora;
    const node = s.activeConversationNode;
    if (!node) return [];

    // Compatibilidade com saves antigos que usavam stage === 3
    if (node.viewMode === "closing" || (node.stage === 3 && !node.turn)) {
      return getClosingChoices();
    }

    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const composure = a.composure !== undefined ? a.composure : 75;
    const lockedSecret = s.secretsDossier && Object.values(s.secretsDossier).find((sec) => sec.state === "locked");
    const heldSecrets = AG.getHeldSecrets ? AG.getHeldSecrets() : [];
    const topSecret = heldSecrets.length > 0
      ? heldSecrets.slice().sort((x, y) => (y.pressureVal || 20) - (x.pressureVal || 20))[0]
      : null;

    const turn = node.turn || 1;
    const topicTurn = node.topicTurn || turn;
    const thread = node.thread || initialThreadForCategory(node.categoryKey);
    const recent = (node.usedBranches || []).slice(-2);

    let pool = [];

    if (topicTurn === 1 && TOPIC_SPECIFIC_BEATS[node.topicId]) {
      pool = TOPIC_SPECIFIC_BEATS[node.topicId].map((b) => ({
        id: b.id,
        tone: b.tone,
        title: b.title,
        hint: b.hint
      }));
    } else if (topicTurn === 1) {
      if (node.categoryKey === "controle") {
        pool = [
          { id: "tactic_crack_armor", tone: "ctrl", title: "Apontar a contradição na voz dela sem levantar o tom", hint: "Derruba a Armadura e aumenta sua Influência se Percepção 15+" },
          { id: "tactic_silent_pressure", tone: "ctrl", title: "Ficar em silêncio absoluto encarando ela até ela falar demais", hint: "Pressão indireta · quebra a Armadura sem gerar suspeita" },
          { id: "tactic_velvet_blade", tone: "hot", title: "Misturar um elogio próximo com uma indireta bem afiada", hint: "Sobe Influência e Clima Quente ao mesmo tempo" },
          { id: "tactic_bait_ego", tone: "sweet", title: "Deixar ela achar que venceu essa rodada pra baixar a desconfiança", hint: "Reduz Suspeita e Atrito" },
          { id: "tactic_harsh_truth", tone: "risky", title: "Jogar a verdade crua na cara dela sem nenhum filtro", hint: "Quebra a pose na marra, mas gera Atrito e Rivalidade" }
        ];
      } else if (node.categoryKey === "provocar") {
        pool = [
          { id: "hot_escalate", tone: "hot", title: "Não recuar um centímetro e sustentar o olhar de cima", hint: "Dobra a tensão e o desejo" },
          { id: "hot_push_pull", tone: "ctrl", title: "Dar um passo atrás sorrindo calmo bem no pico da tensão", hint: "Gelo e fogo · derruba Armadura e aumenta Influência" },
          { id: "hot_read_tell", tone: "ctrl", title: "Comentar baixinho que a respiração e o rubor entregaram tudo", hint: "Usa Percepção pra desmontar a pose dela" },
          { id: "sweet", tone: "sweet", title: "Quebrar a provocação com um gesto de carinho sincero", hint: "Muda o clima pra intimidade acolhedora" },
          { id: "ctrl", tone: "ctrl", title: "Deixar ela assumir o comando da provocação", hint: "Alimenta o domínio dela" },
          { id: "risky", tone: "risky", title: "Cortar o clima de repente com uma resposta ácida", hint: "Testa o limite dela e cria faísca" }
        ];
      } else {
        pool = [
          { id: "sweet", tone: "sweet", title: "Responder com calma e atenção de verdade ao que ela disse", hint: "Fortalece Afinidade, Confiança e Intimidade" },
          { id: "warm_playful", tone: "sweet", title: "Entrar na brincadeira e devolver uma provocação leve", hint: "Mantém a conversa solta e natural" },
          { id: "subtle_probe", tone: "ctrl", title: "Fazer uma pergunta aparentemente casual pra pescar algo pessoal", hint: "Psicologia indireta · derruba Armadura com Percepção 14+" },
          { id: "hot", tone: "hot", title: "Chegar mais perto e virar o assunto pra um tom mais quente", hint: "Pivota o papo pra tensão" },
          { id: "outplay", tone: "ctrl", title: "Desarmar a pose dela com um comentário esperto", hint: "Usa Lábia 15+ pra ganhar Influência" },
          { id: "risky", tone: "risky", title: "Responder frio e seco só pra ver como ela reage", hint: "Gera atrito e muda a temperatura da conversa" }
        ];
      }
    } else if (thread === "warm") {
      pool = [
        { id: "warm_listen_deep", tone: "sweet", title: "Ficar quieto só ouvindo ela abrir o peito sem interromper", hint: "Aprofunda Confiança e Abertura Emocional" },
        { id: "warm_touch_face", tone: "sweet", title: "Encostar a mão no rosto dela e dizer o que estava segurando", hint: "Aumenta Intimidade e Afinidade" },
        { id: "warm_ask_real", tone: "sweet", title: "Perguntar o que realmente anda tirando o sono dela essa semana", hint: "Faz ela baixar a guarda de verdade" },
        { id: "hot_whisper_pivot", tone: "hot", title: "Abaixar até a orelha dela e transformar esse carinho em provocação", hint: "Vira o papo de carinho pra química" },
        { id: "subtle_probe", tone: "ctrl", title: "Aproveitar que ela relaxou e puxar um detalhe escondido do 404", hint: "Pesca informações sem parecer suspeito" },
        { id: "conflict_rug_pull", tone: "risky", title: "Esfriar o tom de repente e cortar o clima bom", hint: "Desestabiliza o humor dela e abre rota fria/sombria" }
      ];
    } else if (thread === "hot") {
      const isPrivateLoc = s.currentLocation === "ape_404" || s.currentLocation === "ape_402";
      pool = [
        { id: "hot_deep_kiss", tone: "hot", title: "Puxar o rosto dela e beijar fundo sem deixar ela inventar mais desculpa", hint: "Escala direto pra beijo intenso (+Clima, +Intimidade)" },
        { id: "hot_neck_bite", tone: "hot", title: "Descer os lábios até o pescoço dela sentindo a pele arrepiar", hint: "Alta tensão física (+Tensão Dela, +Clima)" },
        ...(isPrivateLoc ? [{ id: "hot_under_hoodie", tone: "hot", title: "Deslizar a mão quente pela cintura dela por baixo da barra da roupa", hint: "Privativo · escala o toque físico" }] : []),
        { id: "hot_closer_dare", tone: "hot", title: "Desafiar ela baixinho a não desviar o olhar agora", hint: "Aumenta Desejo, Clima Quente e Intimidade" },
        { id: "hot_push_pull", tone: "ctrl", title: "Recuar meio passo sorrindo e deixar ela no vácuo de propósito", hint: "Derruba Armadura e aumenta Influência" },
        { id: "sweet_after_fire", tone: "sweet", title: "Diminuir o ritmo e puxar ela pra um abraço demorado", hint: "Alterna fogo com carinho genuíno" }
      ];
    } else if (thread === "mind") {
      pool = [
        { id: "tactic_silent_pressure", tone: "ctrl", title: "Continuar em silêncio estudando ela até o desconforto fazê-la falar", hint: "Derruba bastante a Armadura dela" },
        { id: "mind_twist_words", tone: "ctrl", title: "Usar as próprias palavras dela pra devolver a pressão pro colo dela", hint: "Sobe Influência e Rivalidade" },
        { id: "tactic_velvet_blade", tone: "hot", title: "Misturar charme de perto com uma indireta que bagunça a cabeça dela", hint: "Pivota jogo mental em química tensa" },
        { id: "tactic_bait_ego", tone: "sweet", title: "Aliviar a mão e deixar ela sentir que recuperou o controle", hint: "Apaga Suspeita e esfria alertas" },
        { id: "ctrl", tone: "ctrl", title: "Abaixar o tom e obedecer só pra ver até onde ela vai", hint: "Alimenta o lado controladora dela" },
        { id: "tactic_harsh_truth", tone: "risky", title: "Apertar ainda mais fundo no ponto que ela tenta esconder", hint: "Alto risco · pode rachar estabilidade ou gerar fúria" }
      ];
    } else {
      // thread === "conflict"
      pool = [
        { id: "conflict_hold_ground", tone: "risky", title: "Sustentar a cara fria e não pedir desculpa", hint: "Alimenta Rivalidade e Espiral Sombria" },
        { id: "conflict_escalate_dare", tone: "risky", title: "Dobrar a aposta e devolver a provocação na mesma moeda", hint: "Escala o confronto de frente" },
        { id: "emo_flip_conflict", tone: "hot", title: "Encurtar a distância no meio do atrito e virar a raiva em tensão", hint: "Requer Lábia 15+ pra inverter conflito em química" },
        { id: "conflict_honest_pause", tone: "sweet", title: "Parar, respirar fundo e pedir desculpa de verdade", hint: "Baixa o atrito e recupera Confiança" },
        { id: "mind_gaslight_calm", tone: "ctrl", title: "Manter a voz gelada e perguntar por que ela está perdendo a linha", hint: "Jogo frio · derruba Estabilidade e sobe Influência" }
      ];
    }

    // Evita mostrar exatamente o botão recém-clicado se houver alternativas suficientes
    let base = pool.filter((c) => !recent.includes(c.id));
    if (base.length < 4) base = pool.slice();

    const specials = [];

    // 1. RESPOSTAS EXCLUSIVAS AO ESTADO EMOCIONAL VIVO DELA
    if (fam === "vulneravel" && !base.some((c) => c.id === "emo_empathy_heal")) {
      specials.push({
        id: "emo_empathy_heal",
        tone: "sweet",
        title: "Largar qualquer pose e acolher ela de verdade agora",
        hint: "Recupera Estabilidade, Confiança e cura feridas emocionais"
      });
    } else if (fam === "conflito" && !base.some((c) => c.id === "emo_flip_conflict")) {
      specials.push({
        id: "emo_flip_conflict",
        tone: "hot",
        title: "Encarar ela sem recuar e virar essa raiva em tensão elétrica",
        hint: "Requer Lábia 15+ para inverter Conflito em Química"
      });
    } else if (fam === "sombria" && !base.some((c) => c.id === "emo_feed_dark_conv")) {
      specials.push({
        id: "emo_feed_dark_conv",
        tone: "risky",
        title: "Entrar no jogo sombrio dela e dobrar a aposta",
        hint: "Alimenta a Espiral Sombria dela e o Thriller Mútuo"
      });
    } else if (fam === "caotica" && !recent.includes("emo_ride_chaos")) {
      specials.push({
        id: "emo_ride_chaos",
        tone: "hot",
        title: "Embarcar na pilha dela e propor algo mais imprevisível ainda",
        hint: "Sincroniza com o estado caótico/eufórico dela"
      });
    }

    // 2. EXTRAÇÃO ORGÂNICA DE SEGREDO QUANDO A ARMADURA DELA ESTÁ QUEBRADA
    if (composure <= 45 && lockedSecret) {
      specials.push({
        id: "conv_extract_secret",
        tone: "ctrl",
        title: "Puxar o fio do que ela acabou de deixar escapar e arrancar a verdade",
        hint: "Armadura baixa — extrai um segredo real pro Dossiê sem encerrar a conversa"
      });
    }

    // 3. MENÇÃO SUTIL A UM SEGREDO DO DOSSIÊ NA SUA MÃO
    if (topSecret && turn >= 2 && !node.droppedSecretThisTalk) {
      specials.push({
        id: "conv_drop_secret_hint",
        tone: "risky",
        title: `Mencionar por cima "${topSecret.name}" só pra ver a reação dela`,
        hint: "Pressão psicológica real usando o Dossiê"
      });
    }

    const totalSlots = 6;
    const baseBudget = Math.max(3, totalSlots - specials.length);
    return specials.concat(base.slice(0, baseBudget)).slice(0, totalSlots);
  };

  function getClosingChoices() {
    const s = AG.state;
    const a = s.aurora;
    const list = [];
    const lockedSecret = s.secretsDossier && Object.values(s.secretsDossier).find((sec) => sec.state === "locked");
    if ((a.composure !== undefined ? a.composure : 75) <= 45 && lockedSecret) {
      list.push({
        id: "close_extract_secret",
        tone: "ctrl",
        title: "Antes de sair, arrancar a verdade que ela quase deixou escapar",
        hint: "Extrai um segredo real pro Dossiê e encerra o papo"
      });
    }
    list.push(
      { id: "close_sweet", tone: "sweet", title: "Encerrar com um carinho rápido no cabelo dela", hint: "Despedida afetuosa (+Afinidade)" },
      { id: "close_hot", tone: "hot", title: "Sair deixando uma promessa baixa pra próxima vez", hint: "Deixa o clima aceso (+Clima Quente)" },
      { id: "close_indirect_hook", tone: "ctrl", title: "Soltar uma frase ambígua na despedida pra ficar ecoando na cabeça dela", hint: "Derruba Armadura e soma Influência" },
      { id: "close_ctrl", tone: "ctrl", title: "Esperar o sinal dela antes de se afastar", hint: "Reforça o controle dela" },
      { id: "close_natural", tone: "life", title: "Apenas encerrar a conversa por agora", hint: "Volta pro ambiente sem forçar o clima" }
    );
    return list;
  }

  // ==========================================================================
  // EXECUTAR RESPOSTA NA CONVERSA CONTÍNUA
  // ==========================================================================
  AG.selectConversationChoice = function (choiceId) {
    const s = AG.state;
    const node = s.activeConversationNode;
    if (!node) return;
    if (!AG.isAuroraHere() || s.aurora.activity === "dormindo") {
      s.activeConversationNode = null;
      return;
    }

    if (String(choiceId).startsWith("close_")) {
      AG.endConversation(choiceId);
      return;
    }

    const topic = findTopic(node.categoryKey, node.topicId);
    if (!topic) {
      AG.state.activeConversationNode = null;
      return;
    }

    const availableChoices = AG.getConversationChoices ? AG.getConversationChoices() : [];
    const chosenObj = availableChoices.find((c) => c.id === choiceId);
    runTurn(topic, node, choiceId, chosenObj ? chosenObj.title : "");
  };

  function runTurn(topic, node, branch, chosenTitle) {
    const s = AG.state;
    const a = s.aurora;
    const sk = (s.player && s.player.skills) || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
    const armorLow = (a.composure !== undefined ? a.composure : 75) <= 45;
    const turn = node.turn || 1;
    const fatigueFactor = node.fatigue >= 3 ? 0.4 : node.fatigue === 2 ? 0.72 : 1;
    const lengthFactor = turn >= 7 ? 0.45 : turn >= 5 ? 0.7 : 1;
    const factor = fatigueFactor * lengthFactor;

    AG.advanceTime(6, { suppressRandom: true, keepSpecialScene: true });

    let pills = [];
    let action = "";
    let speech = "";
    let nextThread = node.thread || "warm";

    // --- 0. RESPOSTA SOB MEDIDA DO ASSUNTO ATUAL ---
    const specificBeat = findTopicSpecificBeat(node.topicId, branch);
    if (specificBeat) {
      AG.playSound(specificBeat.sound || "click");
      if (specificBeat.tone === "hot" && a.discomfort >= 55 && a.dominance < 45 && a.heat < 40) {
        pills = AG.applyDeltas({ affinity: -10, discomfort: 16, mood: "irritada" });
        action = "*Recua fechando a expressão na hora*";
        speech = "Sem clima pra isso agora, 402. Conserta a situação entre a gente primeiro.";
        nextThread = "conflict";
      } else {
        const intentMap = specificBeat.tone === "sweet" ? "sweet" : specificBeat.tone === "hot" ? "hot" : null;
        const baseSpec = {
          action: specificBeat.action,
          speech: specificBeat.speech,
          extraDeltas: specificBeat.deltas || {}
        };
        const dynSpec = intentMap && AG.EmotionEngine ? AG.EmotionEngine.reactToAction(intentMap, baseSpec) : baseSpec;
        pills = AG.applyDeltas(scaleDeltas(dynSpec.extraDeltas || baseSpec.extraDeltas, factor));
        action = dynSpec.action;
        speech = dynSpec.speech;
        nextThread = specificBeat.nextThread || nextThread;
        if (specificBeat.memory) {
          AG.addMemory(specificBeat.memory.id, specificBeat.memory.text, specificBeat.memory.cat, specificBeat.memory.perm);
        }
      }
    }

    // --- 1. EXTRAÇÃO DE SEGREDO NO MEIO DA CONVERSA ---
    else if (branch === "conv_extract_secret") {
      AG.playSound("heart");
      const lockedSecret = s.secretsDossier && Object.values(s.secretsDossier).find((sec) => sec.state === "locked");
      if (lockedSecret) {
        AG.unlockSecret(lockedSecret.id, `Você puxou o fio no meio da conversa com a Armadura dela em ${a.composure}% e descobriu "${lockedSecret.name}".`);
      }
      pills = AG.applyDeltas({ influence: 14, perception: 3, composure: -10, personaCold: 3, personaRuthless: 2 });
      action = "*Ainda desarmada e falando sem filtro, ela solta um detalhe precioso antes de morder a língua tarde demais*";
      speech = "Espera... esquece o que eu acabei de falar! Por que eu sempre acabo entregando minhas coisas quando você me olha desse jeito?!";
      nextThread = "mind";
    }

    // --- 2. MENCIONAR SEGREDO DO DOSSIÊ POR CIMA ---
    else if (branch === "conv_drop_secret_hint") {
      AG.playSound("warn");
      node.droppedSecretThisTalk = true;
      const heldSecrets = AG.getHeldSecrets ? AG.getHeldSecrets() : [];
      const topSecret = heldSecrets.length > 0
        ? heldSecrets.slice().sort((x, y) => (y.pressureVal || 20) - (x.pressureVal || 20))[0]
        : null;
      const pVal = topSecret ? Math.round((topSecret.pressureVal || 20) * 0.7) : 14;
      pills = AG.applyDeltas({
        composure: -24,
        leveragePressure: pVal,
        influence: 16,
        suspicion: 10,
        auroraDarkness: 8,
        personaRuthless: 4,
        personaCold: 3,
        mood: "desconfiada"
      });
      action = "*O sorriso dela congela no exato segundo em que você menciona o assunto como quem não quer nada; os dedos dela apertam o tecido da própria roupa*";
      speech = topSecret
        ? `...Como é que você sabe sobre "${topSecret.name}"? Fala logo o que você anda fuçando da minha vida, 402.`
        : "Espera aí... de onde você tirou esse assunto?! Que jogo você tá jogando comigo?!";
      nextThread = "mind";
    }

    // --- 3. RAMOS DE CARINHO / APROFUNDAMENTO ---
    else if (branch === "sweet" || branch === "warm_playful" || branch === "sweet_after_fire") {
      AG.playSound("heart");
      const baseFallback = branch === "warm_playful"
        ? {
            action: "*Dá um tapinha leve no seu braço segurando o riso, bem mais solta*",
            speech: pickLine([
              "Olha a audácia! Você aprendeu direitinho a entrar na minha pilha, né?",
              "Se continuar me fazendo rir desse jeito eu vou acabar perdendo toda a pose de vizinha marrenta.",
              "Aí sim! Finalmente alguém nesse prédio que acompanha o meu ritmo."
            ], turn),
            extraDeltas: { affinity: 11, trust: 7, discomfort: -8, composure: -6, personaWarm: 2, mood: "alegre" }
          }
        : branch === "sweet_after_fire"
          ? {
              action: "*Solta o ar que estava prendendo e encosta o rosto no seu peito, pega de surpresa pela troca de ritmo*",
              speech: pickLine([
                "Ei... não vale esquentar tudo e depois me abraçar com essa calma toda. Meu coração não aguenta essa montanha-russa!",
                "Você sabe exatamente a hora de parar de provocar e só me segurar perto, né? Isso desarma demais...",
                "Fica assim mais um minutinho... ouvir seu coração bater perto do meu acalma minha cabeça inteira."
              ], turn),
              extraDeltas: { affinity: 14, intimacyLevel: 10, trust: 10, discomfort: -10, composure: -10, personaWarm: 3, mood: "dengosa", specialScene: "chamego" }
            }
          : {
              action: "*Fica na ponta dos pés pra encostar a bochecha no seu ombro, baixando a guarda de verdade*",
              speech: pickLine([
                "Quando você me trata com esse cuidado todo, minha marra derrete inteirinha.",
                "Você começou reparando só na minha altura e agora conhece cada detalhe que me faz sorrir.",
                "Fica mais um pouquinho... conversar assim com você virou a melhor parte do meu dia."
              ], turn),
              extraDeltas: { affinity: 13, trust: 9, discomfort: -10, composure: -8, personaWarm: 3, mood: "dengosa", specialScene: "chamego" }
            };
      const dynRes = AG.EmotionEngine ? AG.EmotionEngine.reactToAction("sweet", baseFallback) : baseFallback;
      pills = AG.applyDeltas(scaleDeltas(dynRes.extraDeltas || baseFallback.extraDeltas, factor));
      action = dynRes.action;
      speech = dynRes.speech;
      nextThread = "warm";
    } else if (branch === "warm_listen_deep") {
      AG.playSound("heart");
      pills = AG.applyDeltas(scaleDeltas({ affinity: 12, trust: 14, vulnerability: 14, mentalStability: 10, composure: -10, personaWarm: 3, mood: "emocionada" }, factor));
      action = "*Percebendo que você não tenta cortar nem dar sermão, ela solta os ombros e fala muito mais baixo e sincera do que costuma falar*";
      speech = pickLine([
        "Às vezes eu faço barulho e piada o dia inteiro só pra ninguém perceber quando eu tô exausta por dentro... Mas com você eu não preciso fingir o tempo todo.",
        "Sabe o que é raro? Alguém ouvir sem ficar esperando a própria vez de falar. Você me deixa leve de verdade.",
        "Eu juro que tento bancar a durona no 404, mas quando você me escuta assim parece que o mundo inteiro dá uma pausa."
      ], turn);
      nextThread = "warm";
    } else if (branch === "warm_touch_face") {
      AG.playSound("heart");
      pills = AG.applyDeltas(scaleDeltas({ affinity: 15, intimacyLevel: 12, trust: 10, heat: 8, vulnerability: 10, personaWarm: 4, mood: "dengosa", specialScene: "chamego" }, factor));
      action = "*Ela fecha os olhos por um segundo encostando a bochecha na palma da sua mão e segura o seu pulso com os dedos pequenos*";
      speech = pickLine([
        "Você não tem ideia do quanto esse gesto mexe comigo... Minha cara já deve estar pegando fogo, né?",
        "Fala de novo olhando nos meus olhos. Quando você é sincero desse jeito eu esqueço qualquer medo.",
        "Eu gosto demais de como sua mão parece enorme no meu rosto... me dá vontade de ficar exatamente aqui."
      ], turn);
      nextThread = "warm";
    } else if (branch === "warm_ask_real") {
      AG.playSound("click");
      pills = AG.applyDeltas(scaleDeltas({ trust: 12, vulnerability: 14, composure: -12, mentalStability: 8, perception: 2, personaWarm: 2, mood: "carente" }, factor));
      action = "*Ela mexe na ponta da manga por alguns segundos, pensando se deve contar, e acaba cedendo com um sorriso pequeno*";
      speech = pickLine([
        "Tem noites em que eu fico com medo de não dar conta dos meus projetos, do aluguel e de tudo ao mesmo tempo... só que eu odeio admitir isso em voz alta.",
        "Muita gente acha que eu sou só energia e provocação, mas às vezes a cabeça pesa às três da manhã. Ter você na porta ao lado mudou isso.",
        "Eu fico me cobrando demais no estúdio e no Café. Desculpa se às vezes eu fico arisca do nada — é só cansaço acumulado."
      ], turn);
      nextThread = "warm";
    }

    // --- 4. RAMOS DE QUÍMICA / PROVOCAÇÃO / PUSH-PULL ---
    else if (
      branch === "hot_escalate" ||
      branch === "hot" ||
      branch === "hot_whisper_pivot" ||
      branch === "hot_closer_dare" ||
      branch === "hot_waist_pull" ||
      branch === "hot_deep_kiss" ||
      branch === "hot_neck_bite" ||
      branch === "hot_under_hoodie"
    ) {
      AG.playSound("hot");
      if ((node.stateKey === "cold" || a.discomfort >= 52) && a.dominance < 45 && a.heat < 40 && (a.intimacyLevel || 0) < 40) {
        pills = AG.applyDeltas({ affinity: -10, discomfort: 14, mood: "irritada" });
        action = "*Recua indignada e cruza os braços*";
        speech = "Eu tô nitidamente sem clima e você insiste nessa provocação?! Lê o ambiente!";
        nextThread = "conflict";
      } else if (a.affinity < 8 && a.heat < 16 && (a.intimacyLevel || 0) < 12) {
        pills = AG.applyDeltas({ heat: 4, intimacyLevel: 2 });
        action = "*Arqueia a sobrancelha sorrindo de canto, mantendo meio passo de distância*";
        speech = "Calma aí, 402... a gente ainda tá esquentando o clima! Conversa e ganha mais intimidade comigo primeiro.";
        nextThread = "warm";
      } else {
        const linePool = branch === "hot_deep_kiss"
          ? [
              "Você calou minha boca do melhor jeito possível... continua assim que eu não quero nem respirar direito.",
              "Que beijo foi esse?! Minhas pernas realmente ficaram bambas agora, segura firme na minha cintura!",
              "Se era pra me fazer esquecer qualquer provocação, parabéns — conseguiu em três segundos."
            ]
          : branch === "hot_neck_bite"
            ? [
                "Aí no meu pescoço me arrepia da cabeça aos pés... você sabe exatamente onde apertar o meu botão de desligar o juízo.",
                "Não morde de leve assim perto da minha nuca ou eu não respondo pelo que vou fazer com você aqui dentro!",
                "Fica aí mais um segundo... o calor da sua boca na minha pele tá me deixando louca."
              ]
            : branch === "hot_under_hoodie"
              ? [
                  "Sua mão quente direto na minha cintura por baixo da roupa... você não tem pena nenhuma do meu autocontrole, né?",
                  "Sobe essa mão só mais um pouquinho... eu não tô nem tentando te impedir hoje.",
                  "O jeito que seus dedos seguram minha cintura parece que eu caibo inteira nas suas mãos..."
                ]
              : branch === "hot_whisper_pivot"
                ? [
                    "Ei!! Do nada você abaixa a voz desse jeito no meu ouvido?! Meu corpo inteiro arrepiou na hora!",
                    "Você tava todo fofo dois segundos atrás e agora me solta uma dessas bem na minha nuca... isso é golpe baixo!",
                    "Para de sussurrar assim tão perto ou eu não vou responder pelos meus atos no quarto andar."
                  ]
                : branch === "hot_waist_pull"
                  ? [
                      "Você segura minha cintura com uma facilidade absurda... agora olha pra mim e vê se eu tô tentando me soltar.",
                      "Puxar assim de repente faz meu coração ir direto pra garganta... continua.",
                      "Desse jeito tão colado eu nem consigo pensar direito no que eu ia responder."
                    ]
                  : branch === "hot_closer_dare"
                    ? [
                        "Achou mesmo que eu ia desviar o olhar primeiro? Você ainda não me conhece, 402.",
                        "Quanto mais perto você chega, mais eu quero ver se você aguenta o que tá começando.",
                        "Pode olhar o quanto quiser... eu não vou recuar um milímetro."
                      ]
                    : [
                        "Você tá brincando com fogo no quarto andar, sabia?",
                        "Posso ter 1,49m, mas energia pra te deixar sem fôlego eu tenho de sobra.",
                        "Esse seu jeito de me olhar de cima sem recuar... você mexe demais comigo."
                      ];

        const intenseBoost = (branch === "hot_deep_kiss" || branch === "hot_under_hoodie" || branch === "hot_neck_bite");
        const baseHot = {
          action: intenseBoost
            ? "*Fecha os olhos por um segundo entregando-se ao toque quente, os dedos agarrando a sua camisa com força e a respiração descompassada*"
            : "*Puxa sua camisa de leve, olhando de baixo pra cima com a respiração curta e um sorriso perigoso*",
          speech: pickLine(linePool, turn),
          extraDeltas: {
            heat: intenseBoost ? 20 : 15,
            arousal: intenseBoost ? 18 : 12,
            intimacyLevel: intenseBoost ? 10 : 6,
            affinity: 5,
            composure: -14,
            desire: intenseBoost ? 14 : 10,
            personaBold: 3,
            mood: intenseBoost ? "excitada_tensa" : "provocante",
            specialScene: branch === "hot_under_hoodie" ? "nsfw1" : branch === "hot_waist_pull" ? "nsfw1" : "paredeCorredor"
          }
        };
        const dynHot = AG.EmotionEngine ? AG.EmotionEngine.reactToAction("hot", baseHot) : baseHot;
        pills = AG.applyDeltas(scaleDeltas(dynHot.extraDeltas || baseHot.extraDeltas, factor));
        action = dynHot.action;
        speech = dynHot.speech;
        nextThread = "hot";
      }
    } else if (branch === "hot_push_pull") {
      AG.playSound("click");
      pills = AG.applyDeltas(scaleDeltas({ composure: -20, influence: 15, heat: 12, rivalry: 10, charisma: 2, personaCold: 3, personaBold: 2, mood: "provocante" }, factor));
      action = "*Justo quando ela ergue o rosto esperando você diminuir o resto da distância, você recua um passo sorrindo calmo. Ela trava no lugar, frustrada e hipnotizada*";
      speech = pickLine([
        "EI!! Você não acabou de recuar bem nessa hora, né?! Que maldade é essa, 402?!",
        "Você faz isso de propósito só pra me deixar com vontade e correndo atrás de você, né?!",
        "Não vale esquentar o clima inteiro e depois sorrir frio como se nada tivesse acontecido!"
      ], turn);
      nextThread = "hot";
    } else if (branch === "hot_read_tell") {
      AG.playSound("hot");
      pills = AG.applyDeltas(scaleDeltas({ composure: -18, heat: 14, influence: 11, perception: 2, personaBold: 2, mood: "dengosa", specialScene: "paredeCorredor" }, factor));
      action = "*Ela leva as duas mãos às bochechas quentes no instante em que você aponta o quanto ela entregou o jogo*";
      speech = pickLine([
        "Para de comentar que eu tô corada!! Se você continuar reparando em cada reação minha desse jeito eu vou sumir de vergonha!",
        "Minha respiração NÃO tá acelerada... tá, talvez esteja um pouquinho, mas a culpa é inteiramente sua!",
        "Você adora ver o efeito que faz em mim de perto, né?!"
      ], turn);
      nextThread = "hot";
    }

    // --- 5. RAMOS DE PSICOLOGIA / JOGO MENTAL / CONTROLE ---
    else if (branch === "tactic_crack_armor") {
      AG.playSound("click");
      if (sk.perception >= 15 || armorLow) {
        pills = AG.applyDeltas(scaleDeltas({ composure: -22, influence: 15, dominance: -12, perception: 2, personaCold: 3, mood: "desconfiada" }, factor));
        action = "*A expressão ensaiada dela falha por dois segundos e ela desvia o olhar, incomodada por ter sido lida tão fácil*";
        speech = pickLine([
          "Espera... por que você tá analisando até o jeito como eu mexo os dedos?! Para de desmontar tudo o que eu falo!",
          "Tsc... você presta atenção demais no que eu tento esconder. É irritante o quanto você acerta.",
          "Como é que você percebeu que eu tava blefando?! Esse olhar frio me tira completamente do eixo..."
        ], turn);
      } else {
        pills = AG.applyDeltas({ dominance: 10, rivalry: 10, personaCold: 2, mood: "controladora" });
        action = "*A armadura emocional dela segura o tranco e ela devolve um sorriso afiado*";
        speech = "Tentando bancar o analista comigo? Vai precisar de bem mais Percepção pra passar da minha guarda, 402.";
      }
      nextThread = "mind";
    } else if (branch === "tactic_silent_pressure") {
      AG.playSound("click");
      pills = AG.applyDeltas(scaleDeltas({ composure: -22, influence: 14, suspicion: -8, charisma: 2, personaCold: 4, mood: "carente" }, factor));
      action = "*Você não diz uma única palavra — apenas sustenta o olhar calmo por dez segundos eternos. Ela começa a mexer na manga do moletom, inquieta com o silêncio*";
      speech = pickLine([
        "Por que você tá só me olhando calado com esse meio sorriso?! Fala alguma coisa! Esse seu silêncio me dá nervoso... tá bom, eu exagerei!",
        "Ei!! Para de ficar mudo me estudando assim! Quando você não responde, minha cabeça começa a imaginar mil coisas...",
        "Ok, você venceu o concurso de encarada! Eu falo demais quando você fica frio desse jeito, satisfeito?!"
      ], turn);
      nextThread = "mind";
    } else if (branch === "mind_twist_words") {
      AG.playSound("click");
      if (sk.charisma >= 14 || armorLow) {
        pills = AG.applyDeltas(scaleDeltas({ composure: -16, influence: 15, rivalry: 10, dominance: -10, charisma: 2, personaCold: 3, mood: "provocante" }, factor));
        action = "*Ela abre a boca pra rebater, trava no meio da frase percebendo que caiu na própria armadilha e solta um riso inconformado*";
        speech = pickLine([
          "Espera aí... você acabou de usar a minha própria frase contra mim?! Olha o nível de malandragem desse cara...",
          "Você vira qualquer argumento do avesso sem nem alterar o tom de voz. Dá raiva e dá vontade de aplaudir ao mesmo tempo.",
          "Tudo bem, ponto seu. Mas não se acostuma a me deixar sem resposta não!"
        ], turn);
      } else {
        pills = AG.applyDeltas({ dominance: 8, rivalry: 8, mood: "enjoada_sarcastica" });
        action = "*Ela revira os olhos com um sorriso irônico*";
        speech = "Bonita tentativa de inverter o papo, mas comigo esse truque não cola tão fácil.";
      }
      nextThread = "mind";
    } else if (branch === "tactic_velvet_blade") {
      AG.playSound("hot");
      pills = AG.applyDeltas(scaleDeltas({ influence: 15, heat: 14, composure: -14, affinity: 6, charisma: 2, personaRuthless: 3, mood: "provocante", specialScene: "paredeCorredor" }, factor));
      action = "*O elogio suave misturado com a indireta afiada dá um nó na cabeça dela; ela morde o lábio sem saber se fica brava ou derretida*";
      speech = pickLine([
        "Você joga sujo demais... me elogia num tom tão gostoso enquanto espeta exatamente o meu ponto fraco.",
        "Eu devia estar brava com essa indireta, mas o jeito que você falou perto de mim me deixou completamente desarmada...",
        "Metade de mim quer te empurrar daqui e a outra metade quer saber o que mais você tá planejando, 402."
      ], turn);
      nextThread = "hot";
    } else if (branch === "tactic_bait_ego") {
      AG.playSound("heart");
      pills = AG.applyDeltas(scaleDeltas({ suspicion: -24, discomfort: -14, dominance: 10, composure: -10, charisma: 2, personaCold: 2, mood: "controladora" }, factor));
      action = "*Ela cai certinho na isca de ego, relaxando os ombros e soltando a desconfiança achando que ganhou a rodada*";
      speech = pickLine([
        "Ah, bom! Pelo menos você sabe reconhecer quando eu tenho razão. Viu como é fácil quando você não tenta bancar o esperto?",
        "Hmph, gostei de ver. Agora sim estamos nos entendendo no quarto andar.",
        "Anotado! Quando você abaixa a bola assim eu até esqueço qualquer cisma que eu tava tendo."
      ], turn);
      nextThread = "mind";
    } else if (branch === "subtle_probe") {
      AG.playSound("click");
      if (sk.perception >= 14 || armorLow) {
        pills = AG.applyDeltas(scaleDeltas({ composure: -18, influence: 12, trust: 6, perception: 3, personaCold: 3, mood: "espontanea" }, factor));
        action = "*Sem desconfiar da sua pergunta casual, ela baixa completamente a guarda e solta mais do que pretendia*";
        speech = pickLine([
          "Ah, nem me fala... às vezes eu fico tão sobrecarregada entre o Café Sakura e as contas do 404 que acabo fazendo besteira sem pensar — mas não conta pra ninguém!",
          "Nossa, você pergunta dum jeito tão tranquilo que eu acabo contando até coisas que eu escondo na minha conta secundária...",
          "Jura que não vai rir? Eu anoto quase tudo o que me tira do sério num caderno escondido aqui no 404... só você me faz falar dessas coisas!"
        ], turn);
      } else {
        pills = AG.applyDeltas({ suspicion: 8, perception: 2, mood: "desconfiada" });
        action = "*Ela franze a testa achando a pergunta específica demais*";
        speech = "Ué, por que essa curiosidade toda de repente sobre a minha vida pessoal?";
      }
      nextThread = "mind";
    } else if (branch === "outplay") {
      AG.playSound("click");
      if (sk.charisma >= 15 || armorLow) {
        const baseOut = {
          action: "*Pisca desconcertada quando você desmonta a provocação dela com um sorriso calmo e vira o jogo*",
          speech: pickLine([
            "Espera aí... eu vim te provocar e você conseguiu me deixar sem resposta em uma frase?!",
            "Você joga muito bem esse xadrez do quarto andar, sabia? Isso só me deixa com mais vontade de ganhar de você.",
            "Para de sorrir com essa confiança toda... você sabe exatamente como me tirar do sério!"
          ], turn),
          extraDeltas: { influence: 14, rivalry: 8, dominance: -10, composure: -14, heat: 10, charisma: 2, personaCold: 2, mood: "provocante", specialScene: "paredeCorredor" }
        };
        const dynOut = AG.EmotionEngine ? AG.EmotionEngine.reactToAction("outplay", baseOut) : baseOut;
        pills = AG.applyDeltas(scaleDeltas(dynOut.extraDeltas || baseOut.extraDeltas, factor));
        action = dynOut.action;
        speech = dynOut.speech;
      } else {
        pills = AG.applyDeltas({ suspicion: 10, rivalry: 8, dominance: 8, mood: "desconfiada" });
        action = "*Estreita os olhos rindo da sua tentativa de blefe*";
        speech = "Quase me pegou, 402... mas vai precisar afiar mais essa lábia pra virar o jogo contra mim.";
      }
      nextThread = "mind";
    } else if (branch === "ctrl") {
      AG.playSound("click");
      pills = AG.applyDeltas(scaleDeltas({ dominance: 15, heat: 6, discomfort: -6, mood: "controladora", specialScene: "controle" }, factor));
      AG.state.sharedStory.controlEventsSeen += 1;
      action = "*Segura seu queixo de baixo pra cima, satisfeita*";
      speech = pickLine([
        "Olha que cena: você desse tamanho todo na palma da minha mão pequena.",
        "Entre o 402 e o 404, a palavra final é sempre minha.",
        "Bom garoto. Continua assim que eu decido quando você merece uma recompensa."
      ], turn);
      nextThread = "mind";
    } else if (branch === "mind_gaslight_calm") {
      AG.playSound("warn");
      pills = AG.applyDeltas(scaleDeltas({ mentalStability: -14, composure: -18, influence: 14, auroraDarkness: 12, discomfort: 10, personaCold: 4, personaRuthless: 3, mood: "paranoica_delirante" }, factor));
      action = "*A sua frieza absoluta no meio da discussão desconcerta ela por completo; ela pisca insegura, duvidando do próprio tom*";
      speech = pickLine([
        "Eu não tô perdendo a linha!! ...Tô? Você fala com essa voz gelada de propósito pra fazer parecer que a errada sou sempre eu!",
        "Para de me olhar como se eu estivesse exagerando tudo! Isso que você faz mexe demais com a minha cabeça...",
        "Você consegue ser assustadoramente frio quando quer, sabia?"
      ], turn);
      nextThread = "mind";
    }

    // --- 6. RAMOS EMOCIONAIS VIVOS ---
    else if (branch === "emo_empathy_heal") {
      AG.playSound("heart");
      pills = AG.applyDeltas({ mentalStability: 20, auroraDarkness: -14, traumaLevel: -12, affinity: 16, trust: 16, vulnerability: 16, personaWarm: 4, mood: "emocionada", specialScene: "chamego" });
      action = "*Ela solta um suspiro profundo e se apoia no seu peito, sentindo a tensão derreter completamente*";
      speech = "Você enxergou exatamente como eu tava por dentro sem eu precisar explicar... Obrigada por cuidar de mim assim.";
      nextThread = "warm";
    } else if (branch === "emo_flip_conflict") {
      if (sk.charisma >= 15) {
        AG.playSound("hot");
        pills = AG.applyDeltas({ heat: 20, arousal: 18, discomfort: -16, influence: 14, composure: -16, personaBold: 3, mood: "excitada_tensa", specialScene: "paredeCorredor" });
        action = "*A raiva no rosto dela se transforma em rubor intenso e respiração curta quando você encara ela sem recuar*";
        speech = "Eu tava pronta pra te matar dois segundos atrás e agora meu coração tá disparado por outro motivo... você não presta!";
        nextThread = "hot";
      } else {
        AG.playSound("warn");
        pills = AG.applyDeltas({ discomfort: 14, mood: "raivosa" });
        action = "*Recua bufando de raiva*";
        speech = "Não vem tentar virar a discussão em charme barato agora não!";
        nextThread = "conflict";
      }
    } else if (branch === "emo_feed_dark_conv") {
      AG.playSound("warn");
      pills = AG.applyDeltas({ auroraDarkness: 16, heat: 14, rivalry: 14, dominance: 10, influence: 10, personaRuthless: 4, mood: "corrompida_fria", specialScene: "controle" });
      action = "*Um sorriso sombrio e cúmplice ilumina o olhar dela enquanto ela se aproxima*";
      speech = "Sabia que você não ia fugir desse meu lado sombrio... Agora o jogo entre o 402 e o 404 ficou realmente interessante.";
      nextThread = "mind";
    } else if (branch === "emo_ride_chaos") {
      AG.playSound("hot");
      pills = AG.applyDeltas(scaleDeltas({ affinity: 12, heat: 14, rivalry: 10, auroraEnergy: 10, personaBold: 3, mood: "euforica" }, factor));
      action = "*Os olhos dela faíscam na hora e ela agarra seu pulso já rindo sem freio*";
      speech = "ISSO!! Finalmente você entrou na minha frequência caótica! Agora ninguém segura o quarto andar hoje!";
      nextThread = "hot";
    }

    // --- 7. RAMOS DE ATRITO, CONFLITO & RECONCILIAÇÃO ---
    else if (branch === "conflict_honest_pause") {
      AG.playSound("heart");
      pills = AG.applyDeltas({ discomfort: -22, affinity: 10, trust: 12, mentalStability: 10, personaWarm: 3, mood: "melancolica" });
      action = "*Ela te encara em silêncio por alguns segundos pra conferir se é sincero — então baixa os ombros, ainda sentida mas desarmada*";
      speech = pickLine([
        "...Obrigada por parar e pedir desculpa de verdade. Eu odeio quando a gente entra nesse clima pesado.",
        "Tá... aceito sua desculpa. Só não esquece que eu sinto essas coisas de verdade, viu?",
        "Respira você também. A gente se provoca o tempo todo, mas eu não quero sair machucada disso."
      ], turn);
      nextThread = "warm";
    } else if (branch === "conflict_rug_pull") {
      AG.playSound("warn");
      pills = AG.applyDeltas({ mentalStability: -18, auroraDarkness: 16, traumaLevel: 12, composure: -20, influence: 14, affinity: -14, discomfort: 16, personaRuthless: 4, mood: "decepcionada" });
      action = "*O sorriso dela desmancha na hora quando o seu tom muda da água pro vinho; ela dá um passo atrás visivelmente abalada*";
      speech = "...Você acabou de virar a chave assim do nada? Que jeito cruel de brincar comigo bem quando eu tava baixando a guarda.";
      AG.addMemory("esfriou_no_meio_papo_" + s.day, "Cortou um momento de carinho com frieza repentina bem quando ela abriu a guarda.", "ruim", false);
      nextThread = "conflict";
    } else if (branch === "tactic_harsh_truth" || branch === "conflict_hold_ground" || branch === "conflict_escalate_dare" || branch === "risky") {
      AG.playSound("warn");
      const harsh = branch === "tactic_harsh_truth" || branch === "conflict_escalate_dare";
      pills = AG.applyDeltas({
        composure: harsh ? -18 : -8,
        discomfort: harsh ? 18 : 20,
        rivalry: harsh ? 16 : 10,
        affinity: harsh ? -12 : -14,
        trust: -8,
        auroraDarkness: harsh ? 10 : 6,
        personaRuthless: 3,
        mood: (a.auroraDarkness || 0) >= 35 ? "vingativa" : "irritada"
      });
      action = harsh
        ? "*Ela congela como se tivesse levado um banho de água fria — a pose marrenta quebra em pura indignação*"
        : "*O olhar dela endurece e ela dá um passo pra trás*";
      speech = pickLine(
        harsh
          ? [
              "Que golpe baixo... Você realmente não tem pena nenhuma de jogar na minha cara exatamente o que me incomoda, né?!",
              "Nossa, que frieza absurda! Continua me empurrando assim pra ver o que você desperta em mim.",
              "Guarda essa sinceridade cruel! Se quer guerra comigo no quarto andar, você acabou de conseguir."
            ]
          : [
              "Que atitude desconfortável. Não vou tolerar isso.",
              "Você faz questão de estragar o clima toda vez, né?",
              "Mais uma dessas e minha porta não abre mais pra você."
            ],
        turn
      );
      AG.addMemory("atrito_conversa_" + s.day, "Tiveram um atrito pesado no meio da conversa que deixou marcas no humor dela.", "ruim", false);
      nextThread = "conflict";
    }

    // --- 8. MARCOS ORGÂNICOS DE CONVERSAS LONGAS (TURNOS 3, 5...) ---
    if (turn === 3 && nextThread === "warm" && a.discomfort < 35) {
      AG.addMemory("conversa_profunda_dia_" + s.day, "Passaram um bom tempo conversando fundo sobre tudo, criando uma sintonia difícil de quebrar.", "bom", false);
      AG.applyDeltas({ intimacyLevel: 6, trust: 6 });
    } else if (turn === 4 && nextThread === "hot" && a.heat >= 45) {
      AG.addMemory("tensao_prolongada_dia_" + s.day, "Esticaram a provocação turno após turno até o ar entre vocês ficar elétrico.", "quente", false);
      AG.applyDeltas({ arousal: 8, intimacyLevel: 6 });
    } else if (turn === 4 && (nextThread === "mind" || nextThread === "conflict") && a.rivalry >= 40) {
      AG.addMemory("duelo_mental_dia_" + s.day, "Travaram um longo duelo psicológico cheio de indiretas e provocações.", "controle", false);
    }

    const ctxRemark = getLivingContextRemark(nextThread, turn);
    const combinedSpeech = speech + ctxRemark;
    AG.clearFeed();
    if (AG.DeepDialogue && AG.DeepDialogue.buildRichTurn) {
      const rich = AG.DeepDialogue.buildRichTurn(chosenTitle, action, combinedSpeech, nextThread, turn, branch, node);
      AG.pushFeed({
        type: "aurora",
        playerBeat: rich.playerBeat,
        action: rich.action,
        speech: rich.speech,
        subtext: rich.subtext,
        pills
      });
    } else {
      AG.pushFeed({ type: "aurora", action, speech: combinedSpeech, pills });
    }

    // --- 9. AGÊNCIA DA AURORA: SE O ATRITO EXPLODIR, ELA MESMA ENCERRA ---
    if (a.discomfort >= 95 && a.dominance < 55) {
      s.activeConversationNode = null;
      AG.unlockEnding("bad_end_bloqueado_definitivo");
      return;
    }
    if (a.discomfort >= 82 && nextThread === "conflict" && a.dominance < 50) {
      s.activeConversationNode = null;
      AG.pushFeed({
        type: "narrative",
        text: "Aurora encerrou a conversa por conta própria e virou as costas, precisando de espaço."
      });
      AG.saveGame("autosave");
      return;
    }

    // Se a rotina dela mudou de local durante este turno, encerra a conversa normalmente
    if (!AG.isAuroraHere() || a.activity === "dormindo") {
      s.activeConversationNode = null;
      AG.saveGame("autosave");
      return;
    }

    // Continua dentro da conversa! Atualiza turno, fio e histórico recente
    node.turn = turn + 1;
    node.topicTurn = (node.topicTurn || 1) + 1;
    node.stage = 2;
    node.thread = nextThread;
    node.lastBranch = branch;
    node.prevBranch = branch;
    node.viewMode = "replies";
    node.usedBranches = (node.usedBranches || []).concat([branch]).slice(-4);
    AG.saveGame("autosave");
  }

  // ==========================================================================
  // ENCERRAR CONVERSA (ESCOLHA DO JOGADOR)
  // ==========================================================================
  AG.endConversation = function (closeId) {
    const s = AG.state;
    const a = s.aurora;
    const node = s.activeConversationNode;
    if (!node) return;

    const cid = closeId || "close_natural";
    AG.advanceTime(cid === "close_natural" ? 2 : 6, { suppressRandom: true, keepSpecialScene: true });

    let pills = [];
    let action = "";
    let speech = "";

    if (cid === "close_extract_secret") {
      AG.playSound("heart");
      const lockedSecret = s.secretsDossier && Object.values(s.secretsDossier).find((sec) => sec.state === "locked");
      if (lockedSecret) {
        AG.unlockSecret(lockedSecret.id, `Com a Armadura dela em ${a.composure}%, você fez ela deixar escapar "${lockedSecret.name}" na despedida.`);
      }
      pills = AG.applyDeltas({ influence: 14, perception: 3, personaCold: 3, personaRuthless: 2 });
      action = "*Ainda desarmada na despedida, ela deixa escapar um detalhe precioso antes de morder a língua tarde demais*";
      speech = "Espera... esquece o que eu acabei de falar! Por que eu fico soltando meus segredos quando você me olha desse jeito?!";
    } else if (cid === "close_indirect_hook") {
      AG.playSound("click");
      pills = AG.applyDeltas({ composure: -14, influence: 12, rivalry: 8, heat: 6, personaCold: 2, charisma: 1 });
      action = "*Você encerra o assunto com uma frase curta e enigmática, virando tranquilo enquanto ela fica parada tentando decifrar o recado*";
      speech = pickLine([
        "Ei, volta aqui!! Você não pode soltar uma frase dessas e encerrar o assunto como se fosse suspense!",
        "O que você quis dizer com isso?! Agora eu vou ficar pensando nisso a noite inteira!",
        "Você tem um jeito irritante de plantar ideias na minha cabeça antes de parar de falar..."
      ]);
    } else if (cid === "close_sweet") {
      AG.playSound("heart");
      pills = AG.applyDeltas({ affinity: node.prevBranch === "risky" ? 2 : 8, trust: 5, calm: 6, personaWarm: 2 });
      action = "*Acena com os dedos escondidos na manga longa do moletom*";
      speech = node.prevBranch === "risky"
        ? "...Tá. Ainda tô chateada, mas obrigada pelo carinho."
        : "Não some muito tempo, tá? O quarto andar fica sem graça sem você.";
    } else if (cid === "close_hot") {
      if (a.discomfort >= 45) {
        AG.playSound("warn");
        pills = AG.applyDeltas({ discomfort: 10, affinity: -6 });
        action = "*Vira o rosto, sem paciência*";
        speech = "Não é hora pra isso. Sério.";
      } else {
        AG.playSound("hot");
        pills = AG.applyDeltas({ heat: 12, desire: 10, personaBold: 2, mood: "provocante" });
        action = "*Morde o canto do lábio quando você dá um passo atrás*";
        speech = "Deixando esse fogo aceso pra cobrar depois, né? Vou estar esperando...";
      }
    } else if (cid === "close_ctrl") {
      AG.playSound("click");
      pills = AG.applyDeltas({ dominance: 10, heat: 4, mood: "controladora" });
      action = "*Faz um gesto sutil com os dedos liberando você*";
      speech = "Pode ir. Mas quando eu chamar, quero você aqui sem atraso.";
    } else {
      AG.playSound("click");
      action = "*Ela assente e volta a se ajeitar no canto dela, ainda com o eco da conversa no olhar*";
      speech = a.discomfort >= 45
        ? "Tá bom. A gente se fala depois."
        : "Beleza, qualquer coisa tô logo aqui por perto.";
    }

    AG.clearFeed();
    AG.pushFeed({ type: "aurora", action, speech, pills });
    s.activeConversationNode = null;

    if (a.dynamic === "teia_de_controle" && !s.flags.seenControlTransition) {
      s.flags.seenControlTransition = true;
      s.mode = "narration";
      s.currentNarrationId = "transicao_teia_controle";
    } else if (s.sharedStory.unlocked404Key && !s.flags.seen404Transition) {
      s.flags.seen404Transition = true;
      s.mode = "narration";
      s.currentNarrationId = "transicao_404_desbloqueado";
    }
    AG.saveGame("autosave");
  };
})(window.AuroraGame);
