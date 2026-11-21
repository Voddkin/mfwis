/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Motor Literário de Diálogos Profundos, Variações Sem Repetição &
   14 Cenas Exclusivas Desbloqueáveis por Status + Cenário + Ocasião + Dia
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  const DD = {};

  function getSeenMap() {
    AG.state.seenDialogueVariants = AG.state.seenDialogueVariants || {};
    return AG.state.seenDialogueVariants;
  }

  // Escolhe sempre uma variação que ainda não foi usada na sequência recente
  DD.pickVariant = function (bucketKey, variants) {
    if (!variants || !variants.length) return null;
    if (variants.length === 1) return variants[0];
    const seen = getSeenMap();
    const lastIdx = typeof seen[bucketKey] === "number" ? seen[bucketKey] : -1;
    const nextIdx = (lastIdx + 1) % variants.length;
    seen[bucketKey] = nextIdx;
    return variants[nextIdx];
  };

  function getLocationAmbientPhrase() {
    const s = AG.state;
    const loc = s.currentLocation;
    const rain = s.weather === "chuva_noturna";
    const dark = s.weather === "apagao_andar";

    if (dark) {
      return "Na meia-luz quente que escapa da lanterna do celular, as sombras do quarto andar parecem aproximar tudo dois passos.";
    }
    if (loc === "ape_404") {
      return rain
        ? "Lá fora a chuva tamborila constante no vidro do 404, enquanto a luminária baixa da mesa de desenho deixa o apartamento com cara de refúgio."
        : "No quarto dela, o cheiro leve de café passado se mistura ao brilho suave do monitor de desenho e aos post-its colados perto da estante.";
    }
    if (loc === "ape_402") {
      return rain
        ? "O som da chuva contra a janela do seu 402 preenche o silêncio, deixando o sofá e a luz da sala muito mais intimistas do que de costume."
        : "Dentro do seu apartamento, a presença dela parece mudar a escala de tudo — como se ela já conhecesse cada canto do 402.";
    }
    if (loc === "cafe_sakura") {
      return "Entre o chiado baixo da máquina de expresso e o aroma de baunilha e canela do Café Sakura, vocês aproveitam uma brecha rara no movimento.";
    }
    if (loc === "praca_cerejeiras") {
      return rain
        ? "A garoa fina brilha nos postes da praça e faz o cheiro de terra molhada subir enquanto vocês se protegem sob a marquise."
        : "A brisa move devagar as folhas da Praça das Cerejeiras e os ruídos da rua ficam distantes o suficiente para vocês falarem sem pressa.";
    }
    if (loc === "mercadinho_24h") {
      return "Sob a luz branca do mercadinho quase vazio e o zumbido baixo dos freezers de bebida, o tempo parece correr mais devagar.";
    }
    return rain
      ? "No corredor estreito do 4º andar, o eco abafado da chuva no poço de luz deixa a conversa entre as portas 402 e 404 quase um segredo."
      : "No corredor silencioso entre o 402 e o 404, a luz amarelada do teto recorta a diferença absurda de altura entre vocês dois.";
  }

  function getMoodSubtextCue() {
    const s = AG.state;
    const a = s.aurora;
    const perc = (s.player && s.player.skills && s.player.skills.perception) || 12;
    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const comp = a.composure !== undefined ? a.composure : 75;

    if (perc < 15) return "";
    if (comp <= 38) {
      return "Leitura sua: a postura dela já cedeu quase toda — os dedos mexem na barra da roupa e ela está a uma pergunta certa de baixar a última barreira.";
    }
    if (fam === "vulneravel") {
      return "Leitura sua: por trás da tentativa de parecer firme, a respiração dela está curta; cada palavra cuidadosa sua está chegando bem fundo.";
    }
    if (fam === "sombria") {
      return "Leitura sua: o sorriso dela parece calmo, mas o olhar mede cada reação sua como se estivesse calculando dois lances à frente.";
    }
    if (fam === "quimica") {
      return "Leitura sua: ela diminuiu a distância meio passo sem nem perceber, mantendo o queixo erguido e o olhar voltando para a sua boca.";
    }
    if (fam === "conflito") {
      return "Leitura sua: a tensão nos ombros entrega que ela não está apenas irritada — está testando se você vai recuar ou segurar o olhar dela.";
    }
    return "Leitura sua: o ritmo da voz dela desacelerou — sinal claro de que ela realmente quer esticar esse momento com você.";
  }

  // ==========================================================================
  // 1. ENRIQUECIMENTO LITERÁRIO DAS ABERTURAS DE ASSUNTO (MULTI-VARIAÇÃO)
  // Transforma cada início de assunto em cena completa com fala sua + narração + resposta longa!
  // ==========================================================================
  const OPENING_PLAYER_BEATS = {
    papo_diferenca_altura: [
      "Você encosta o ombro na parede perto dela e deixa escapar um meio sorriso ao reparar mais uma vez que o topo da cabeça dela mal chega na altura do seu peito. — Sabe que eu ainda acho engraçado como você consegue parecer a dona do prédio inteiro olhando daí de baixo?",
      "Você dá meio passo à frente, reduzindo o espaço até ela precisar inclinar ainda mais o queixo para sustentar o seu olhar. — Confessa: você já parou pra pensar que o nosso contraste de altura chama atenção de qualquer um que passe pelo quarto andar?",
      "Você olha de relance para o alto da estante e depois volta para ela com ar divertido. — Me diz uma coisa sincera: quantas vezes essa semana você quase precisou chamar o vizinho do 402 só por causa de dez centímetros?"
    ],
    papo_uniforme_turno: [
      "Seu olhar percorre o caimento ajustado do uniforme do Café Sakura antes de voltar aos olhos dela. — Eu juro que tento ser discreto, mas você nesse uniforme muda completamente o clima de qualquer lugar em que entra.",
      "Você apoia o braço perto dela, reparando no cansaço sutil nos ombros depois das horas em pé no balcão. — Como foi o movimento hoje no Sakura? Porque, sinceramente, esse uniforme fica ainda melhor quando o turno finalmente acaba.",
      "Você comenta baixo, com um sorriso de canto que não tenta esconder a admiração. — O dono do Café Sakura sabe muito bem o que fez quando deixou esse corte certinho em você."
    ],
    papo_madrugada_insonia: [
      "Você olha para o relógio e depois para ela, falando num tom mais baixo que combina com o silêncio do prédio. — Engraçado como depois das onze o prédio inteiro apaga e só o quarto andar continua vivo com a gente acordado.",
      "Você se acomoda perto dela sem pressa nenhuma de encerrar a noite. — Eu costumava odiar perder o sono de madrugada, mas ultimamente parece que as melhores horas do meu dia só começam quando todo mundo dorme.",
      "Você encosta ao lado dela, sentindo o ritmo mais calmo da noite. — O que é que passa nessa sua cabeça às duas da manhã quando você larga o trabalho de lado?"
    ],
    papo_artes_projetos_dela: [
      "Você se inclina um pouco para observar os traços e paletas de cores que ela deixa abertos. — Eu nunca falei da boca pra fora: o jeito como você desenha tem uma identidade absurda. O que você anda criando escondido aí?",
      "Você apoia o queixo na mão olhando para ela com curiosidade real. — Todo mundo repara primeiro no seu jeito elétrico, mas eu fico curioso é com o que sai da sua cabeça quando você pega a caneta do tablet.",
      "Você aponta discretamente para o tablet e sorri. — Tem algum projeto novo te tirando o sono essa semana ou você ainda tá guardando os melhores rascunhos só pra você?"
    ],
    papo_cronicamente_online: [
      "Você encosta o ombro no dela dando uma risada curta ao ver a velocidade com que ela troca de aba no celular. — Me diz que você não acabou de passar meia hora discutindo meme com desconhecido de novo.",
      "Você cruza os braços fingindo seriedade enquanto observa o brilho da tela refletido no rosto dela. — Qual foi a pérola que o seu algoritmo resolveu te entregar hoje pra te deixar com essa cara?",
      "Você chega mais perto pra dividir a tela. — Vai, mostra logo o vídeo que você tá segurando risada aí antes que você exploda sozinha."
    ],
    papo_me_pergunta_algo: [
      "Você relaxa a postura e encara ela de frente, abrindo a guarda de propósito. — Manda. Sem filtro, sem rodeio: faz uma pergunta na lata que eu te respondo olhando nos seus olhos.",
      "Você dá um sorriso desafiador e cruza os braços. — Hoje eu deixo o microfone na sua mão. Pergunta o que você anda morrendo de vontade de saber sobre mim desde que eu mudei pro 402.",
      "Você diminui um pouco a distância, falando calmo. — Uma pergunta sua, uma resposta sincera minha. Escolhe bem porque você não vai ter essa abertura toda hora."
    ],
    papo_sua_vida_trabalho: [
      "Você solta um suspiro leve, finalmente deixando a tensão das entregas e prazos cair dos ombros. — Essa semana o trabalho tentou sugar até minha última gota de paciência, mas chegar aqui e falar com você parece outro mundo.",
      "Você se encosta perto dela, contando como andam os freelas, o aluguel e os planos pro mês. — Às vezes eu fico tanto tempo olhando pra tela resolvendo problema dos outros que esqueço de parar e respirar.",
      "Você olha pra ela com um sorriso mais aberto, dividindo um pedaço real da sua rotina. — Se eu te contar o caos que foi o meu dia hoje entre cliente exigente e boleto, você ainda aguenta ouvir?"
    ],
    papo_o_que_acha_de_mim: [
      "Você baixa o tom de voz e segura o olhar dela sem desviar, deixando o clima ficar sério por um instante. — Sem brincadeira nem desvio agora: o que realmente passa na sua cabeça quando você pensa em nós dois?",
      "Você espera o silêncio assentar entre vocês antes de perguntar. — A gente já passou da fase de só dividir corredor, Aurora. Me diz sem filtro o que você sente por mim hoje.",
      "Você olha direto nos olhos dela, lendo cada hesitação antes mesmo da resposta. — Se você tivesse que ser completamente honesta por trinta segundos: em que pé eu tô com você agora?"
    ],
    chamego_abraco_altura_peito: [
      "Sem apressar o movimento, você abre o braço e puxa ela devagar pela cintura até o corpo pequeno dela encostar inteiro no seu peito, sentindo o cheiro suave do cabelo dela logo abaixo do seu queixo.",
      "Você dá um passo à frente e envolve as costas dela com firmeza calma, fechando os braços ao redor dela até a pose marrenta ceder num suspiro contra a sua camisa.",
      "Você segura ela com delicadeza e a traz pra perto, apoiando o queixo de leve perto da cabeça dela enquanto o resto do quarto andar parece sumir."
    ],
    chamego_levantar_prateleira: [
      "Vendo ela se esticar na ponta dos pés, você chega por trás sorrindo, firma as duas mãos na cintura dela e ergue ela do chão com facilidade até os olhos dela ficarem na exata altura dos seus.",
      "Você se aproxima rindo baixo, passa as mãos pela cintura dela sem esforço e levanta ela uns bons centímetros do piso só pra ver a surpresa virar rubor imediato.",
      "Antes que ela pegue o banquinho, você segura ela pela cintura com firmeza e a traz até a altura do seu rosto, deixando o riso dela escapar bem perto da sua boca."
    ],
    chamego_cafune_laco: [
      "Você ergue a mão devagar, afasta uma mecha caída perto da bochecha dela e desliza os dedos com cuidado até ajeitar o laço no cabelo, demorando a palma quente no rosto dela.",
      "Com a ponta dos dedos, você toca a lateral do rosto dela e arruma o prendedor fora do lugar, observando os olhos dela fecharem meio segundo diante do carinho.",
      "Você se inclina um pouco, passa o polegar devagar pela bochecha dela e ajeita o laço torto no cabelo sem tirar os olhos dos dela."
    ],
    chamego_declarar_amor: [
      "Você segura as mãos dela entre as suas, respira fundo e fala num tom tão calmo e firme que não deixa espaço para piada. — Olha pra mim, Aurora. De todas as pessoas que já cruzaram o meu caminho, você virou a minha mulher favorita.",
      "Você diminui a distância até só existir o olhar dela na sua frente e diz sem hesitar: — Não é da boca pra fora nem momento passageiro. Você é a minha pessoa favorita nesse mundo inteiro.",
      "Você apoia a mão com delicadeza no rosto dela para que ela não desvie o olhar corado. — Eu precisava te falar isso olhando nos seus olhos: você é, sem competição nenhuma, a minha mulher favorita."
    ],
    quente_encurralar_parede: [
      "Você acompanha o passo dela, apoia a mão espalmada na parede logo acima do ombro pequeno dela e inclina o rosto devagar, deixando o espaço entre vocês cair para poucos centímetros.",
      "Sem levantar a voz, você fecha o ângulo contra a parede e olha de cima para baixo, sentindo o calor subir no instante em que ela ergue o queixo sem recuar.",
      "Você desliza a mão na parede ao lado do rosto dela, prendendo o olhar dela no seu enquanto o silêncio do quarto andar fica pesado de tensão."
    ],
    quente_provocar_uniforme_moletom: [
      "Você não faz questão nenhuma de esconder para onde o seu olhar vai, percorrendo o caimento da roupa dela devagar antes de voltar aos olhos dela com um sorriso lento. — Você escolhe essa roupa sabendo exatamente o efeito que faz em mim, né?",
      "Você dá meio passo para o lado como quem avalia uma obra de arte de perto e solta num tom baixo: — É impressionante como você consegue transformar qualquer peça simples numa provocação ambulante.",
      "Você inclina a cabeça e fala quase num murmúrio confiante: — Depois você ainda pergunta por que eu perco a concentração toda vez que bato o olho em você."
    ],
    quente_sussurrar_pescoco: [
      "Você se curva devagar até a sua boca ficar a um sopro da orelha dela, sentindo o perfume do pescoço dela antes de sussurrar, palavra por palavra, exatamente o que passa na sua cabeça quando vocês ficam a sós.",
      "Você baixa a altura até o nível do rosto dela, encosta quase sem tocar perto do pescoço e deixa sua voz sair rouca e baixa o suficiente para fazê-la prender o ar no mesmo instante.",
      "Você se inclina devagar por cima do ombro dela e murmura bem junto ao ouvido uma confissão ousada que não admite resposta comportada."
    ],
    quente_puxar_cintura_colo: [
      "Você envolve a cintura dela com as duas mãos firmes e puxa o corpo dela contra o seu de uma vez, trazendo ela para bem perto até o joelho dela encostar no seu e a respiração dos dois se misturar.",
      "Sem pedir licença com palavras, você firma a pegada na cintura dela e a traz pro seu colo num movimento seguro, invertendo a altura entre vocês em um segundo.",
      "Você desliza a mão pela cintura pequena dela e puxa ela sem esforço até colar no seu corpo, sustentando o olhar intenso enquanto ela apoia as mãos nos seus ombros."
    ],
    quente_beijo_pescoco_lento: [
      "Você afasta devagar o cabelo do ombro dela com as costas dos dedos, inclina a cabeça até sentir o calor da pele dela e encosta os lábios devagar logo abaixo da orelha, sem pressa nenhuma de recuar.",
      "Você puxa ela um passo contra o seu peito, desce a boca pela curva sensível do pescoço dela e ouve a respiração dela falhar antes mesmo de completar o segundo beijo.",
      "Com uma mão firme na cintura dela, você desliza os lábios da linha do maxilar até a base do pescoço, medindo cada arrepio que percorre os ombros dela."
    ],
    quente_tirar_moletom_ombro: [
      "Você segura de leve a gola caída do moletom largo dela e desliza o tecido devagar até descobrir um ombro inteiro, passando o polegar pela clavícula quente sem tirar os olhos dos dela.",
      "Com calma provocante, você ajeita a manga larga demais dela para o lado e escorrega a gola até deixar a curva do ombro à mostra, falando quase num murmúrio bem perto do rosto dela.",
      "Seus dedos encontram a borda do tecido perto do pescoço dela e você puxa o suficiente para descobrir a pele quente da clavícula, observando as bochechas dela arderem na hora."
    ],
    quente_sentar_bancada_altura: [
      "Sem aviso, você firma as duas mãos na cintura dela e a ergue com facilidade para sentar na ponta da bancada, encaixando seu corpo entre os joelhos dela até o rosto dela ficar exatamente na altura do seu.",
      "Você sorri de canto, levanta ela num movimento seguro até a borda da bancada e apoia as palmas ao lado das coxas dela, finalmente deixando os lábios dos dois no mesmo nível.",
      "Num gesto confiante, você coloca ela sentada na bancada alta e dá um passo pra dentro do espaço dela, tirando dela qualquer chance de escapar do seu olhar."
    ],
    quente_morder_labio_desafio: [
      "Você para bem na frente dela sem encostar ainda, desce o olhar devagar até a boca dela e volta pros olhos com um sorriso lento. — Aposto que você não aguenta dez segundos olhando pra mim assim sem pedir pra eu te beijar.",
      "Você segura o queixo dela com a ponta dos dedos, erguendo o rosto dela até a respiração dos dois se cruzar, e desafia baixo: — Me olha sem desviar e tenta fingir que não tá morrendo de vontade agora.",
      "Você reduz a distância até faltar um dedo entre as bocas e sustenta o silêncio elétrico, provocando só com o olhar pra ver quem quebra primeiro."
    ],
    quente_jogo_tres_toques: [
      "Você inclina o rosto até falar num sussurro rouco perto dela: — Vamos fazer um acordo simples: três toques meus, onde eu escolher, sem você recuar. Se você arrepiar antes do terceiro, eu ganho o resto da noite.",
      "Você apoia a mão na cintura dela com um sorriso perigoso: — Três toques lentos — pulso, nuca e queixo. Se você conseguir manter a voz firme até o final, você dita as regras hoje.",
      "Você desliza a ponta dos dedos devagar pelo antebraço dela e propõe baixo um desafio de autocontrole que deixa o ar do ambiente pesado na mesma hora."
    ],
    quente_mandar_ela_conduzir: [
      "Você recosta devagar, abre um sorriso provocante e coloca as mãos atrás da cabeça deixando o controle inteiro na mão dela. — Chega de você só provocar falando. Vem cá e mostra exatamente o que você quer fazer comigo.",
      "Você segura a mão dela e a puxa pra perto enquanto se acomoda tranquilo, encarando ela de baixo pra cima pela primeira vez: — Hoje eu obedeço o seu ritmo. Assume o comando, Aurora.",
      "Você dá um passo atrás encostando no sofá e sustenta o olhar desafiador dela: — Todo esse fogo que você faz questão de mostrar... prova agora o que você faz quando eu deixo você conduzir."
    ],
    conversar_otimizar_pc_dela: [
      "Você puxa a cadeira para o lado da mesa dela, inclina o olhar para o gerenciador de tarefas lotado e abre um sorriso tranquilo. — Deixa eu dar uma olhada nisso aqui. Em dez minutos eu faço esse seu setup respirar e parar de travar no meio dos seus desenhos.",
      "Você encosta ao lado do monitor dela observando as trinta abas abertas e o programa de ilustração engasgando. — Me passa o mouse rapidinho. Eu limpo esse gargalo de memória sem apagar um único rascunho seu.",
      "Você se inclina sobre o ombro dela apontando o processo que está travando o tablet gráfico. — Achei o vilão que tá comendo a sua RAM. Quer ver eu resolver isso antes do café esfriar?"
    ],
    conversar_notar_detalhe_percepcao: [
      "Você desacelera a conversa, observa o detalhe discreto que passaria batido por qualquer outro vizinho e comenta num tom baixo e certeiro: — Você mudou o jeito de prender o cabelo hoje... e tá segurando a manga esquerda bem mais firme do que ontem. Aconteceu alguma coisa?",
      "Você sustenta o olhar nela por dois segundos silenciosos antes de falar com precisão serena: — Eu reparo quando o seu ritmo acelera só pra esconder que alguma coisa te mexeu por dentro. Não precisa disfarçar comigo.",
      "Você inclina a cabeça acompanhando o microgesto dela e sorri de canto: — Sabe que o seu olhar denuncia exatamente o que você tá pensando meio segundo antes de você escolher a piada?"
    ],
    conversar_elogio_calculado: [
      "Você espera o momento exato em que ela não está esperando nada de especial, baixa meio tom da voz e solta o elogio olhando direto nos olhos dela — específico demais pra parecer genérico, calmo demais pra parecer bajulação.",
      "Sem sorrir demais nem exagerar na entonação, você observa um detalhe único da postura dela e fala como quem constata um fato óbvio: — Você nem faz ideia do quanto fica magnética quando para de tentar provar alguma coisa.",
      "Você inclina o rosto de leve e comenta num tom baixo que atravessa todas as defesas ensaiadas dela — exatamente o tipo de elogio cirúrgico que fica ecoando na cabeça por horas."
    ],
    provocar_ciume_calculado: [
      "Você dá uma olhada casual no celular com um meio sorriso enigmático, guarda o aparelho devagar no bolso e comenta sem dar nomes: — Tava quase descendo pra tomar café com uma conhecida do bairro, mas resolvi ver primeiro se você ia reclamar da minha ausência.",
      "Você apoia o ombro perto dela com ar despreocupado demais: — Curioso como ultimamente aparece gente puxando assunto comigo no elevador todo dia... só que ninguém faz metade da cena que você faz quando fica de bico.",
      "Você solta o comentário no tom mais inocente possível, observando de canto de olho o exato segundo em que a sobrancelha dela levanta e o radar territorial do 404 dispara."
    ],
    ctrl_abaixar_obedecer: [
      "Você solta um suspiro contido, baixa a guarda diante do olhar exigente dela e cede espaço de propósito: — Tá bom, dona do 404... hoje eu sigo as suas regras. Manda logo o que você quer que eu faça.",
      "Você descruza os braços e se aproxima inclinando a cabeça até ficar mais perto da altura dela, entregando a vantagem momentânea com um olhar cúmplice: — Você venceu essa rodada. Qual é a ordem?",
      "Você aceita a postura mandona dela sem retrucar, deixando claro no silêncio obediente que ela ganhou o comando da cena — pelo menos por enquanto."
    ],
    ctrl_reclamar_mas_preso: [
      "Você solta um riso cansado e balança a cabeça, encarando ela com aquele misto de revolta e rendição: — Você sabe que é completamente abusada, né? Eu devia virar as costas pro 402 agora... e mesmo assim continuo parado aqui te ouvindo.",
      "Você franze a testa reclamando baixo, mas não dá um único passo em direção à porta: — Impressionante como você faz eu reclamar de cada exigência sua e ainda assim ficar preso nessa conversa.",
      "Você passa a mão pelo rosto soltando o ar: — Um dia eu vou aprender a dizer não pra você, Aurora. Só claramente não vai ser hoje."
    ],
    ctrl_atitude_ruim_forcar: [
      "Você endurece o olhar, corta a brincadeira no seco e avança meio passo impondo sua vontade sem nenhum verniz diplomático: — Chega de rodeio e cena. Dessa vez a gente vai fazer do meu jeito e ponto final.",
      "Sua voz sai mais fria e direta do que de costume, fechando o espaço com pressão calculada: — Você já testou minha paciência o suficiente hoje. Para de escapar e encara o que eu tô te dizendo.",
      "Você segura o clima pesado sem tentar suavizar nenhuma palavra, deixando claro que não vai recuar mesmo vendo o incômodo subir no rosto dela."
    ],
    ctrl_blefar_inocencia: [
      "Você assume a expressão mais serena e limpa do mundo, arregalando os olhos de leve como se a acusação dela fosse completamente absurda: — Eu? Mexendo nos seus nervos de propósito? Imagina, Aurora... você tá vendo coisa onde só existe boa vontade.",
      "Você ergue as mãos num gesto calmo e quase ofendido, sustentando o blefe sem piscar um segundo: — Sério que você acha que eu planejei isso? Às vezes o acaso só trabalha a meu favor mesmo.",
      "Com a voz perfeitamente estável e um sorriso ingênuo milimetricamente ensaiado, você devolve a bola pra ela como se não tivesse a menor ideia do efeito que acabou de causar."
    ],
    ctrl_inverter_culpa: [
      "Você cruza os braços devagar e vira o tabuleiro sem levantar o tom de voz: — Engraçado você apontar o dedo pra mim quando foi você quem começou essa provocação lá atrás. Eu só respondi na altura que você pediu.",
      "Você sustenta o olhar firme e inverte o peso da conversa com calma cirúrgica: — Antes de me cobrar alguma coisa, pensa bem: se você não tivesse aberto essa porta e me testado desse jeito, a gente nem estaria nessa situação agora.",
      "Você deixa um segundo de silêncio frio assentar antes de devolver a responsabilidade inteira pro colo dela, observando a certeza no rosto dela começar a rachar."
    ],
    ctrl_tirar_proveito_carencia: [
      "Percebendo o exato instante em que a voz dela ficou mais baixa e vulnerável, você se aproxima devagar, envolve o ombro dela com um cuidado calculado e sussurra perto do rosto dela: — Ninguém aqui te entende como eu, Aurora. Você sabe que só precisa ficar do meu lado e deixar eu cuidar do resto.",
      "Você segura o rosto dela com suavidade estratégica no momento em que as defesas dela estão no chão, oferecendo exatamente o abrigo que ela precisa — enquanto aperta mais um nó na dependência emocional dela por você.",
      "Você fala manso e envolvente, ocupando cada centímetro do espaço emocional que ela deixou aberto, fazendo parecer que o único chão seguro do quarto andar está nas suas mãos."
    ],
    ctrl_heroi_fabricado: [
      "Você aparece no timing perfeito com um olhar tranquilo e protetor, resolvendo com calma teatral o problema que você mesmo ajudou a cercar nos bastidores: — Relaxa, já tá tudo resolvido. Ainda bem que eu cheguei a tempo de segurar isso pra você.",
      "Você entrega a solução pronta com um meio sorriso confiante, sabendo que cada detalhe foi armado pra ela enxergar você como o único aliado indispensável do quarto andar.",
      "Com naturalidade impecável, você limpa o caminho diante dela e aceita a gratidão sem entregar nenhum rastro de que puxou os fios antes mesmo da cena começar."
    ],
    ctrl_duelo_psicologico: [
      "Você recosta com calma predatória e sorri de canto, deixando as máscaras de vizinho gentil caírem por um instante: — Vamos parar de fingir que isso é só papo furado de corredor. Eu sei que você tá me testando — então joga o seu melhor lance agora.",
      "Você encara ela de cima sem piscar, aceitando o xadrez mental sem nenhum disfarce: — Cada frase sua hoje veio com segunda intenção. Quer ver quem lê a cabeça do outro melhor até o fim dessa conversa?",
      "Você reduz a distância meio passo e devolve um olhar afiado na mesma moeda: — Você adora sentir que controla o quarto andar, Aurora. Só esqueceu que do lado do 404 mora alguém que joga no mesmo nível."
    ],
    ctrl_cobrar_aposta_ousada: [
      "Você tira um sorriso lento do rosto sério e dá um passo à frente lembrando exatamente os termos que ficaram pendentes: — Eu não esqueci da aposta que você perdeu pra mim, Aurora. E hoje eu resolvi passar pra cobrar os juros pessoalmente.",
      "Você apoia a mão perto dela sem dar saída fácil e fala baixo: — Palavra no quarto andar vale ouro. Você apostou alto achando que ia me vencer... agora chega aqui e cumpre o que deve sem chorar.",
      "Você sustenta o olhar travesso e firme, cobrando a dívida da aposta no momento em que a resistência dela está mais baixa e o ar entre vocês mais carregado."
    ]
  };

  const OPENING_SECOND_PARAGRAPHS = {
    sweet: [
      "Ela ajeita a manga comprida cobrindo metade das mãos, ainda olhando pra cima com um brilho difícil de disfarçar. — Sério... às vezes eu fico boba pensando em como você entrou tão rápido na minha rotina e deixou o quarto andar leve desse jeito.",
      "Por um segundo o riso dela desacelera e vira um olhar muito mais atento e próximo. — Não vai achando que eu falo isso pra qualquer um, tá? Só com você eu baixo a marra tão rápido assim.",
      "Ela dá meio passo mais perto, como se o espaço vazio entre vocês estivesse sobrando. — Continua falando comigo desse jeito e eu vou acabar esquecendo tudo que eu tinha pra fazer hoje."
    ],
    hot: [
      "O olhar dela desce rapidamente até a sua boca e volta pros seus olhos sem o menor pudor. — O pior é que você sabe exatamente o que tá fazendo quando chega tão perto e fala nesse tom baixo... e eu adoro ver até onde você vai.",
      "A respiração dela fica um pouco mais curta enquanto a ponta dos dedos roça de leve na sua camisa. — Você tá testando meu autocontrole hoje, 402. Só cuidado pra não descobrir que o meu limite acaba bem mais rápido do que você imagina.",
      "Ela inclina a cabeça com aquele sorriso lento que mistura desafio e vontade. — Se a ideia era tirar o meu foco do resto do mundo, parabéns: conseguiu em dez segundos."
    ],
    ctrl: [
      "Ela ergue o queixo com calma calculada, avaliando cada detalhe da sua postura como quem domina o tabuleiro. — Gosto de observar o quanto você tenta manter a calma quando eu te olho de frente assim. Vamos ver quem pisca primeiro hoje.",
      "Um sorriso sutil e afiado aparece no canto dos lábios dela. — Você acha mesmo que tá conduzindo essa conversa sozinho, 402? Eu tô prestando atenção em cada palavra que você escolhe.",
      "Ela gira os dedos devagar, sustentando o silêncio por dois segundos extras de propósito só pra medir a sua reação."
    ],
    cold: [
      "Ela mantém a distância com os braços cruzados, deixando claro na postura rígida que não vai facilitar pra você hoje. — Se você tem alguma coisa realmente importante pra dizer, fala logo sem enrolação.",
      "O olhar dela continua duro e direto, sem o menor sinal de suavidade. — Não espera que eu sorria e finja que tá tudo ótimo só porque você resolveu puxar assunto agora.",
      "Ela respira fundo e apoia o peso numa perna só, te encarando com impaciência contida."
    ],
    neutral: [
      "Ela inclina a cabeça com curiosidade viva, os olhos brilhando naquele jeito elétrico típico dela. — Mas fala aí: o que te deu na telha de puxar esse assunto justo agora? Tô curiosa pra ouvir o resto.",
      "Ela solta um riso espontâneo e se ajeita melhor pra continuar o papo. — Gosto quando você aparece sem roteiro pronto — geralmente é aí que nossas melhores conversas começam.",
      "Ela apoia o cotovelo perto de você, claramente sem pressa nenhuma de voltar pro que estava fazendo antes."
    ]
  };

  function joinClean(first, second) {
    const a = String(first || "").replace(/^\*|\*$/g, "").trim();
    const b = String(second || "").replace(/^\*|\*$/g, "").trim();
    if (!a) return b;
    if (!b) return /[.!?…]$/.test(a) ? a : `${a}.`;
    const sep = /[.!?…]$/.test(a) ? " " : ". ";
    return `${a}${sep}${b}`;
  }

  // Parágrafos adicionais moldados pela dinâmica atual da relação (profundidade viva!)
  const DYNAMIC_DEPTH_BEATS = {
    desconhecidos: [
      "Mesmo com vocês ainda se conhecendo, dá para notar que ela não trata qualquer vizinho novo com essa mistura curiosa de atenção e desafio.",
      "Ela ajeita a postura fingindo indiferença casual, mas o olhar volta para você rápido demais para quem diz que ainda está só te avaliando."
    ],
    vizinhos_curiosos: [
      "O gelo do primeiro dia já ficou claramente para trás — agora existe uma cumplicidade nascente que faz cada encontro entre o 402 e o 404 render bem mais do que o planejado.",
      "Ela parece cada vez mais confortável em esticar o papo com você, como se a sua presença já tivesse virado parte esperada da rotina do andar."
    ],
    faisca_imediata: [
      "A faísca que acendeu logo nos primeiros encontros continua elétrica no ar; qualquer frase simples entre vocês ganha duplo sentido em segundos.",
      "Ela sustenta o seu olhar com aquela ousadia acelerada de quem gostou demais da sua atitude direta desde o começo."
    ],
    sintonia_caotica: [
      "Entre piadas internas e confidências de madrugada, vocês dois já funcionam quase na mesma frequência — e ela claramente se solta com você como não faz com ninguém lá fora.",
      "O jeito como ela reage entrega a intimidade que cresceu no dia a dia: metade bagunça divertida, metade confiança silenciosa que não precisa de explicação."
    ],
    chamego_dengoso: [
      "Há uma ternura evidente no jeito como ela procura o seu olhar depois de falar — o tipo de carinho de quem já sente que encontrou um porto seguro bem ao lado da própria porta.",
      "A voz dela amacia quase sem querer no final da frase, entregando que a sua companhia virou a parte favorita de qualquer dia dela."
    ],
    tensao_ardente: [
      "Com a química entre vocês já sem freio, cada palavra trocada parece apenas um pretexto fino antes que a distância entre os dois desapareça de vez.",
      "O ar entre vocês fica quente na hora — ela não esconde mais o brilho de desejo no olhar nem a vontade de testar até onde você vai hoje."
    ],
    teia_de_controle: [
      "Ela observa sua reação com a satisfação tranquila de quem acredita ter você na palma da mão, saboreando cada segundo do próprio domínio.",
      "O sorriso confiante dela deixa claro que ela adora sentir que dita as regras do quarto andar — e testa silenciosamente se você vai continuar obedecendo."
    ],
    relacao_manipulada: [
      "Há um lampejo contido de tensão sob a obediência dela: ela sabe exatamente o peso das cartas que você segura, mas os olhos mostram que sua mente continua trabalhando em silêncio.",
      "Ela engole a resposta atravessada e baixa o olhar por um instante, dividida entre ceder à sua pressão e medir quando poderá virar o jogo."
    ],
    jogo_de_poder_mutuo: [
      "Nenhum dos dois recua meio passo: cada frase funciona como um lance num tabuleiro invisível onde respeito, provocação e desejo se misturam perigosamente.",
      "Ela abre um sorriso afiado de quem reconheceu um adversário à altura — e claramente está se divertindo muito mais nesse duelo do que admitiria."
    ],
    guerra_fria_4andar: [
      "A rivalidade do quarto andar deixa tudo mais intenso: ela já parece estar calculando o próximo troco enquanto tenta não sorrir da sua audácia.",
      "Entre farpas afiadas e provocações diretas, o orgulho dela arde — ela jamais vai aceitar sair perdendo uma troca de palavras com você."
    ],
    espiral_sombria_dela: [
      "Por trás da voz calma existe uma frieza nova e hipnotizante — ela absorveu cada estratégia sua e agora te observa como quem planeja virar a caçadora do 4º andar.",
      "O sorriso dela não tem mais nada de ingênuo: ela mede suas reações com paciência sombria, gostando demais do poder que descobriu sobre você."
    ],
    thriller_mutuo: [
      "Vocês dois já abandonaram qualquer fingimento de inocência; o que existe agora entre o 402 e o 404 é uma aliança magnética, perigosa e viciante.",
      "Ela te encara como uma cúmplice sem filtro — dois estrategistas que encontraram no outro o único espelho capaz de acompanhar a própria mente."
    ],
    gelo_e_farpas: [
      "O clima pesado dos últimos atritos ainda paira entre vocês; cada palavra dela vem carregada de defesa pronta para cortar qualquer aproximação descuidada.",
      "Ela mantém a guarda erguida e a voz contida, deixando claro que recuperar a confiança dela vai exigir muito mais do que conversa bonita."
    ],
    afastados: [
      "A distância que ela impôs parece quase física — ela responde apenas o mínimo necessário, pronta para encerrar o contato ao menor sinal de deslize seu.",
      "O olhar dela passa por você com frieza cortante, como se já estivesse cansada de dar chances que acabam em desgaste."
    ]
  };

  function getDynamicDepthBeat(bucketPrefix) {
    const dyn = (AG.state && AG.state.aurora && AG.state.aurora.dynamic) || "vizinhos_curiosos";
    const pool = DYNAMIC_DEPTH_BEATS[dyn] || DYNAMIC_DEPTH_BEATS.vizinhos_curiosos;
    return DD.pickVariant(`${bucketPrefix}_dyn_${dyn}`, pool);
  }

  DD.buildRichOpening = function (topic, stateKey, baseOpening, repeats) {
    const playerPool = OPENING_PLAYER_BEATS[topic.id] || [
      `Você diminui o ritmo, olha direto para a Aurora e puxa assunto sobre ${topic.title.toLowerCase()}, observando como o olhar dela reage na hora.`
    ];
    const playerBeat = DD.pickVariant("open_p_" + topic.id, playerPool);
    const ambient = getLocationAmbientPhrase();
    const extPool = OPENING_SECOND_PARAGRAPHS[stateKey] || OPENING_SECOND_PARAGRAPHS.neutral;
    const secondBeat = DD.pickVariant("open_s_" + topic.id + "_" + stateKey, extPool);
    const dynamicBeat = getDynamicDepthBeat("open_" + topic.id);
    const subtext = getMoodSubtextCue();

    let mainSpeech = baseOpening.speech;
    if (repeats >= 2) {
      const revisitLead = DD.pickVariant("revisit_" + stateKey, [
        "Voltando nesse assunto de novo? Tudo bem, eu até gosto de ver o quanto isso não sai da sua cabeça... ",
        "Você adora puxar esse fio comigo, né? E o pior é que toda vez a conversa vai pra um lugar diferente... ",
        "Olha ele trazendo esse assunto de volta pro quarto andar. Tá bom, vamos ver o que mudou desde a última vez... "
      ]);
      mainSpeech = revisitLead + mainSpeech;
    }

    const paragraphs = [mainSpeech];
    if (secondBeat) paragraphs.push(secondBeat);
    if (dynamicBeat && paragraphs.join("\n\n").length < 430) paragraphs.push(dynamicBeat);

    return {
      type: "aurora",
      playerBeat,
      action: joinClean(ambient, baseOpening.action),
      speech: paragraphs.join("\n\n"),
      subtext
    };
  };

  // ==========================================================================
  // 2. ENRIQUECIMENTO LITERÁRIO DE CADA RESPOSTA MULTI-TURNO (MULTI-VARIAÇÃO)
  // Garante diálogos longos, sensoriais, sem repetição e com a sua fala + resposta longa dela!
  // ==========================================================================
  const THREAD_DEEP_EXPANSIONS = {
    warm: [
      {
        player: "Você não apressa a resposta — deixa a mão descansar perto dela e fala num tom sereno, daquele tipo que faz o peito desacelerar.",
        continuation: "Ela abaixa o olhar por meio segundo antes de voltar pros seus olhos com um sorriso calmo, sem aquela pressa ansiosa de sempre. — Sabe o que é engraçado? Eu passo o dia inteiro me defendendo do mundo com piada e pose, mas quando você fala comigo desse jeito parece que eu posso finalmente soltar o ar que tava segurando.",
        cue: "Os dedos dela roçam de leve no seu pulso, como se quisesse ter certeza de que você não vai levantar e ir embora logo."
      },
      {
        player: "Você observa o jeito como o rosto dela suaviza e completa a frase olhando de verdade nos olhos dela, sem desviar.",
        continuation: "— Eu fico tentando não parecer boba demais, juro que tento... — ela confessa rindo baixinho, as bochechas pegando cor aos poucos. — Mas você tem um talento absurdo pra acertar exatamente o que eu precisava ouvir sem nem parecer que tá fazendo esforço.",
        cue: "Ela encosta o ombro um pouco mais perto do seu, dividindo o calor do ambiente."
      },
      {
        player: "Você dá um sorriso tranquilo, diminuindo a distância o bastante para a conversa virar quase um segredo entre os dois.",
        continuation: "— Promete uma coisa? — ela pergunta baixinho, girando a ponta da manga entre os dedos. — Não muda esse jeito de me ouvir não. Muita gente olha pra mim e só vê a baixinha barulhenta do 404, mas você realmente enxerga quem tá aqui dentro.",
        cue: "O silêncio depois da frase dela não pesa — pelo contrário, parece amarrar vocês dois ainda mais perto."
      },
      {
        player: "Você inclina a cabeça acompanhando cada detalhe da expressão dela, deixando claro que tem todo o tempo da noite pra ficar ali.",
        continuation: "Ela solta um riso pequeno, misturando alívio e carinho genuíno. — Se eu soubesse no primeiro dia no corredor que você ia virar esse porto seguro do lado da minha porta, eu nem tinha reclamado tanto do roteador!",
        cue: "Ela se acomoda melhor ao seu lado, completamente à vontade."
      }
    ],
    hot: [
      {
        player: "Você sustenta o olhar de cima sem piscar, deixando a sua voz sair mais grave e próxima do rosto dela.",
        continuation: "A respiração dela falha numa fração de segundo e o sorriso provocante ganha um brilho muito mais intenso. — Você adora essa vantagem de altura, né? Fica me olhando assim de perto, medindo cada reação minha, sabendo perfeitamente que meu coração já saiu do compasso faz tempo...",
        cue: "Ela umedece os lábios devagar e não recua nem um milímetro — pelo contrário, parece te desafiar a diminuir o resto do espaço."
      },
      {
        player: "Você inclina o corpo o suficiente para sentir o calor da pele dela e deixa a provocação pairar no ar sem pressa.",
        continuation: "— Para de falar nesse tom baixo perto de mim... — ela murmura, mesmo enquanto os dedos dela seguram de leve o tecido da sua camisa pra impedir que você se afaste. — Metade da minha cabeça diz pra eu manter a pose e a outra metade só quer ver o que você faz se eu parar de resistir.",
        cue: "O ar entre vocês fica denso, carregado daquele tipo de silêncio que antecede uma decisão sem volta."
      },
      {
        player: "Você dá um meio sorriso confiante, percebendo na hora o rubor subir do pescoço até as orelhas dela.",
        continuation: "Ela solta um riso curto e sem fôlego, apoiando a palma pequena contra o seu peito. — Seu coração também tá acelerado aí embaixo, 402... não tenta bancar o frio comigo porque eu tô sentindo direitinho na minha mão.",
        cue: "O contraste entre a mão pequena dela no seu peito e o olhar destemido de baixo pra cima torna impossível desviar."
      },
      {
        player: "Você fala quase num sussurro, o olhar descendo brevemente até os lábios dela antes de voltar aos olhos.",
        continuation: "— Que perigo você virou na minha vida... — ela diz quase sem voz, erguendo o queixo mais um pouco. — Antes eu achava que tinha controle de tudo nesse quarto andar. Agora basta você chegar perto assim que eu esqueço até a frase que ia dizer.",
        cue: "Ela respira fundo, os olhos fixos nos seus esperando o seu próximo movimento."
      }
    ],
    mind: [
      {
        player: "Você mantém a expressão perfeitamente legível só até onde quer, escolhendo cada palavra com calma cirúrgica.",
        continuation: "Ela demora dois segundos a mais para responder — tempo demais para quem normalmente rebate tudo no reflexo. — Você tem um jeito assustador de virar a conversa sem levantar o tom, sabia? Eu entro achando que tô ditando o ritmo e, quando percebo, já tô te dando respostas que eu nem planejava dar.",
        cue: "Ela semicerra os olhos tentando ler o que você está escondendo por trás desse sorriso tranquilo."
      },
      {
        player: "Você não preenche o silêncio de imediato; deixa a sua observação ecoar enquanto estuda a reação dela.",
        continuation: "— Olha pra mim quando você faz isso! — ela rebate meio desconcertada, meio fascinada pelo duelo. — Você joga xadrez até numa conversa comum de corredor. Fica difícil saber quando você tá sendo sincero comigo e quando tá só testando onde tá a minha fraqueza.",
        cue: "A postura impecável dela cede ligeiramente — claramente você mexeu no ponto certo da cabeça dela."
      },
      {
        player: "Você devolve a pressão com naturalidade fria, como se já soubesse a resposta dela antes mesmo de ouvir.",
        continuation: "Ela solta um riso tenso e passa a mão pelo cabelo, reorganizando as defesas. — Ok, ponto pro 402. Mas não se acostuma a me colocar na defensiva não, porque eu aprendo rápido como você pensa... e quando eu devolver, vai ser no mesmo nível.",
        cue: "Há uma faísca afiada no olhar dela — um misto perigoso de respeito, rivalidade e curiosidade."
      }
    ],
    conflict: [
      {
        player: "Você endurece o tom sem desviar o olhar, deixando o desconforto se instalar inteiro entre vocês dois.",
        continuation: "O rosto dela fecha num instante e o queixo sobe num gesto orgulhoso e ferido. — Se você acha que falar comigo desse jeito vai me fazer abaixar a cabeça ou engolir calada, você não me conhece nem um terço do que imagina. Eu posso ser pequena, mas não aceito ser tratada como qualquer coisa.",
        cue: "Os dedos dela fecham com força ao lado do corpo; a temperatura da sala parece ter caído vários graus."
      },
      {
        player: "Você sustenta a firmeza ácida na voz, medindo até onde a paciência dela aguenta antes de quebrar.",
        continuation: "— Incrível como você consegue estragar um clima inteiro em dez segundos — ela devolve, a voz tremendo entre raiva e decepção real. — Me diz logo o que você quer com isso: me afastar de vez ou ver o meu pior lado aparecer?",
        cue: "O olhar dela não foge do seu — mas há uma rachadura visível na confiança entre vocês."
      },
      {
        player: "Você não suaviza a frase, deixando o atrito exposto sem nenhum filtro diplomático.",
        continuation: "Ela dá meio passo para trás, respirando fundo como quem segura palavras ainda piores na ponta da língua. — Anotado, 402. Depois não vem bater na minha porta fazendo cara de inocente quando eu devolver na mesma moeda.",
        cue: "O silêncio que fica entre vocês corta como lâmina."
      }
    ]
  };

  // ==========================================================================
  // 2B. EXPANSÕES ESPECÍFICAS PARA TODAS AS 36 OPÇÕES DE ESCOLHA MULTI-TURNO
  // Cada escolha gera sua fala/gesto exato + reação literária longa sob medida!
  // ==========================================================================
  const CHOICE_DIALOGUE_EXPANSIONS = {
    tactic_crack_armor: [
      {
        player: "Você não rebate a frase pronta dela — em vez disso, aponta com calma cirúrgica o detalhe mínimo que contradiz a pose confiante que ela acabou de montar.",
        continuation: "Ela pisca duas vezes, pega de surpresa antes de conseguir levantar a próxima piada defensiva. — Espera... como você percebeu isso? Eu jurava que ninguém reparava quando eu mudo de assunto pra disfarçar. Para de olhar tão fundo assim pra mim, 402 — você desmonta minha guarda em cinco segundos.",
        cue: "Os dedos dela afrouxam na barra da manga e o queixo baixa um grau, expondo uma franqueza que ela raramente deixa escapar."
      },
      {
        player: "Você inclina a cabeça e devolve uma observação calma e precisa sobre o que ela evitou dizer — sem acusar, apenas deixando a verdade respirar entre os dois.",
        continuation: "— Tá... você acertou em cheio — ela murmura depois de um suspiro curto, desviando o olhar por meio segundo antes de voltar aos seus olhos. — É meio assustador conversar com alguém que ouve mais o que eu escondo do que o que eu falo em voz alta.",
        cue: "A postura impecável dela cede visivelmente; o escudo de ironia acabou de abrir uma fenda real."
      }
    ],
    tactic_silent_pressure: [
      {
        player: "Você não corre para preencher o silêncio. Apenas sustenta o olhar firme e sereno sobre ela, deixando os segundos se esticarem até a mente acelerada dela sentir o peso da pausa.",
        continuation: "O silêncio dura quatro segundos — uma eternidade para a Aurora. Ela mexe no cabelo, abre a boca, fecha de novo e acaba soltando o ar nervosa: — Fala alguma coisa!! Você ficar me olhando quieto desse jeito como se já soubesse da resposta inteira me deixa completamente sem chão!",
        cue: "Inquieta com a sua calma absoluta, ela acaba entregando bem mais na expressão do que pretendia."
      },
      {
        player: "Você apenas ergue ligeiramente uma sobrancelha e mantém o silêncio calculado, deixando a última frase dela reverberar sozinha no ar do quarto andar.",
        continuation: "— Ok, para com essa tática de ficar calado me encarando! — ela reclama, mas a voz sai mais baixa e menos segura do que antes. — Funciona demais e você sabe disso... me faz querer explicar até o que eu nem precisava justificar.",
        cue: "O ritmo da respiração dela acelera enquanto tenta adivinhar o que se passa atrás da sua serenidade."
      }
    ],
    tactic_velvet_blade: [
      {
        player: "Você envolve a provocação num tom macio e elogioso — daqueles que chegam fazendo carinho primeiro e só dois segundos depois revelam a lâmina afiada escondida por baixo.",
        continuation: "O sorriso dela aparece automático ao ouvir o elogio, mas trava no meio do caminho quando ela processa a segunda metade da sua frase. — Ei... isso foi um elogio ou você acabou de me colocar contra a parede com voz mansa?! Que golpe refinado, 402...",
        cue: "Ela semicerra os olhos entre corada e admirada, claramente presa no efeito da sua lábia."
      },
      {
        player: "Você sorri gentil e entrega um elogio impecável, costurado com uma indireta tão fina que ela nem consegue reclamar sem confirmar que você acertou o alvo.",
        continuation: "— Você joga limpo na aparência e sujo na estratégia, né? — ela devolve rindo baixo, balançando a cabeça. — Eu fico sem saber se te agradeço ou se te dou um empurrão no braço... e o pior é que você adora me deixar exatamente nesse meio-termo.",
        cue: "O rubor nas bochechas dela se mistura a um brilho de fascínio competitivo."
      }
    ],
    tactic_bait_ego: [
      {
        player: "Você solta um meio sorriso cético, tocando exatamente no ponto onde o orgulho da Rainha do 404 não aceita derrota: — Falar é fácil, Aurora. Quero ver você sustentar isso na prática sem amarelar.",
        continuation: "Os olhos dela acendem na mesma fração de segundo; o queixo sobe e ela dá um passo firme pra dentro do seu espaço. — Amarelar?! Olha bem pra minha cara e repete isso! Você acabou de assinar o próprio destino testando o meu ego desse jeito, 402.",
        cue: "Toda a cautela dela evaporou — agora o orgulho competitivo dela está trabalhando totalmente a seu favor."
      },
      {
        player: "Você finge duvidar de leve com um tom provocado: — Achei que você fosse mais ousada do que isso... pelo visto a fama do 404 era só marketing mesmo.",
        continuation: "— Marketing o caramba!! — ela dispara indignada, mas com um sorriso perigoso nascendo no canto da boca. — Você sabe perfeitamente que eu não deixo desafio no ar. Prepara o psicológico porque agora eu vou provar meu ponto até você pedir arrego.",
        cue: "A faísca no olhar dela entrega que ela mordeu a isca inteira e está louca para virar o placar."
      }
    ],
    tactic_harsh_truth: [
      {
        player: "Você larga qualquer suavidade e joga a verdade nua na mesa, olhando direto nos olhos dela sem desviar nem amenizar o impacto de cada sílaba.",
        continuation: "O ar parece esfriar de golpe entre vocês. Os ombros dela enrijecem e o olhar que antes brincava fica duro e magoado. — Você podia ter dito isso de dez formas diferentes e escolheu a mais cortante só pra ver se eu quebrava, né? Pois saiba que eu ouvi cada palavra — e não vou esquecer tão cedo.",
        cue: "A armadura dela rachou sob o choque, mas o preço foi um vinco real de mágoa e tensão no rosto dela."
      },
      {
        player: "Você corta o rodeio com frieza cortante, expondo exatamente o ponto que ela mais tenta esconder de si mesma.",
        continuation: "Ela fica dois segundos imóvel, absorvendo o golpe com o queixo erguido para não demonstrar fraqueza. — Parabéns pela sinceridade brutal, 402. Se a sua meta era destruir o clima e me fazer pensar duas vezes antes de confiar em você, missão cumprida.",
        cue: "Os dedos dela fecham com força junto ao corpo enquanto o silêncio pesa como chumbo."
      }
    ],
    hot_escalate: [
      {
        player: "Você reduz a distância até o perfume dela dominar o ar, desce a voz para um tom rouco bem perto do rosto dela e dobra a provocação sem dar espaço para brincadeira inocente.",
        continuation: "A respiração dela trava por um segundo inteiro e as mãos pequenas sobem automaticamente até a frente da sua camisa — não para empurrar, mas para segurar firme. — Você tá brincando com fogo de um jeito muito sério hoje, 402... continua chegando mais perto assim e eu não me responsabilizo pelo que acontece nos próximos cinco segundos.",
        cue: "O olhar dela desce para a sua boca e volta para os seus olhos com uma intensidade quase elétrica."
      },
      {
        player: "Você apoia a mão perto da cintura dela sem pressa, inclinando o rosto o bastante para sentir o calor das bochechas coradas dela enquanto alimenta a tensão.",
        continuation: "— Olha só o jeito que você me olha de cima quando sabe que já me deixou sem ar... — ela sussurra com um meio sorriso atrevido e ofegante. — Você não faz ideia do esforço que tô fazendo pra não te puxar pela gola agora mesmo.",
        cue: "O espaço entre vocês diminuiu para quase nada; o ambiente inteiro parece ter ficado pequeno demais para tanta química."
      }
    ],
    hot_push_pull: [
      {
        player: "Você se inclina quase até encostar os lábios perto do ouvido dela, deixa o calor subir por dois segundos inteiros — e então recua meio passo com um sorriso calmo, negando exatamente o que ela achou que viria.",
        continuation: "Ela solta um gemido curto de frustração indignada, piscando rápido enquanto tenta recuperar o fôlego. — Ei!! Você não pode chegar a dois centímetros da minha boca, me deixar arrepiada inteira e recuar sorrindo desse jeito! Isso devia ser crime no código do condomínio!",
        cue: "Com o olhar totalmente fisgado por você, ela própria dá o passo que você recuou — exatamente como você previu."
      },
      {
        player: "Você roça a ponta dos dedos no pulso dela, deixa a promessa no ar por um instante elétrico e volta à postura relaxada como se nada tivesse acontecido.",
        continuation: "— Você é sádico, sabia?! — ela ri sem fôlego, mordendo o canto do lábio enquanto segura a sua manga para te puxar de volta. — Faz esse joguinho de chega-e-afasta só pra me ver perder a pose... e o pior é que tá funcionando absurdamente bem.",
        cue: "As pupilas dela dilatam no brilho suave do ambiente — agora é ela quem quer diminuir a distância."
      }
    ],
    hot_read_tell: [
      {
        player: "Você observa o rubor subindo pelo pescoço dela, o jeito como os dedos apertaram a própria manga e o compasso acelerado do peito dela — e aponta cada detalhe num sussurro baixo e confiante.",
        continuation: "Ela arregala os olhos corada até a ponta das orelhas, levando a mão automaticamente ao pescoço como se pudesse esconder o calor. — Para de ler meu corpo em voz alta, 402!! Como é que eu vou fingir controle se você percebe até quando meu coração dispara?!",
        cue: "Pega em flagrante pelo próprio corpo, ela ri nervosa e encosta ainda mais perto pra esconder o rosto no seu peito."
      },
      {
        player: "Você inclina o rosto com um sorriso lento e comenta baixo: — A sua voz baixou meio tom e você parou de piscar quando eu cheguei perto. Nem precisa responder com palavras.",
        continuation: "— Injusto demais... — ela murmura sem força nenhuma pra negar, sustentando o seu olhar de baixo pra cima. — Já que você tá lendo tudo tão direitinho, vê se lê também que eu não quero que você recue agora.",
        cue: "A confissão quase sussurrada deixa o ar entre vocês pegando fogo."
      }
    ],
    sweet: [
      {
        player: "Você deixa o tom de disputa de lado, aproxima a mão com delicadeza e fala com uma sinceridade calma que aquece o ambiente inteiro.",
        continuation: "O olhar dela derrete na mesma hora — aquele brilho marrento dá lugar a um sorriso doce e genuíno que só aparece quando ela se sente segura de verdade. — Às vezes eu esqueço o quanto faz bem quando você fala comigo assim, sem pressa e sem joguinho. Dá vontade de parar o relógio só pra ficar mais tempo nesse clima.",
        cue: "Ela encosta o ombro de leve no seu braço, claramente mais leve e confiante perto de você."
      },
      {
        player: "Você olha para ela com atenção inteira, valorizando cada palavra que ela disse sem apressar o ritmo da conversa.",
        continuation: "Ela passa a mão no cabelo escondendo um sorriso bobo que insiste em voltar. — Sabe que você tem esse efeito meio mágico em mim, né? Eu chego cansada ou elétrica demais, você solta uma frase carinhosa dessas e de repente o mundo inteiro parece menos barulhento.",
        cue: "Os olhos dela brilham com carinho sincero, completamente à vontade no seu espaço."
      }
    ],
    ctrl: [
      {
        player: "Você mantém a voz serena e baixa, tomando as rédeas da conversa com naturalidade firme enquanto observa como ela reage à sua condução.",
        continuation: "Ela ergue uma sobrancelha, percebendo na hora que o ritmo mudou para as suas mãos — e em vez de fugir, ela inclina o queixo aceitando o jogo. — Olha só ele assumindo o comando como se já soubesse exatamente o próximo passo... Confesso que esse seu jeito seguro me tira um pouco do eixo.",
        cue: "Ela acompanha cada gesto seu com atenção redobrada, entre desafiada e intrigada."
      },
      {
        player: "Você conduz o assunto com firmeza tranquila, deixando claro nos detalhes quem está ditando o compasso desse encontro.",
        continuation: "— Você gosta de estar no controle da cena, né, 402? — ela comenta num meio sorriso provocante, testando sua firmeza. — Tudo bem, eu te deixo conduzir esse turno... mas só porque quero ver até onde a sua confiança aguenta.",
        cue: "O olhar dela brilha com uma mistura magnética de respeito e curiosidade."
      }
    ],
    risky: [
      {
        player: "Você ignora o caminho seguro e empurra o limite de frente, escolhendo a frase mais arriscada mesmo vendo o sinal de alerta piscar nos olhos dela.",
        continuation: "A expressão dela fecha imediatamente; o sorriso some e dá lugar àquela firmeza afiada de quem não aceita ser desrespeitada. — Você realmente quis cruzar essa linha mesmo sabendo que ia pesar o clima? Não testa a minha paciência achando que eu vou rir e deixar passar.",
        cue: "O espaço entre vocês esfria no mesmo instante, deixando uma tensão cortante no ar."
      },
      {
        player: "Você sustenta a atitude áspera sem recuar um milímetro, deixando o desconforto se instalar abertamente entre os dois.",
        continuation: "Ela respira fundo pelo nariz, segurando o olhar firme no seu. — Beleza, 402. Se você prefere esse clima travado em vez da sintonia que a gente tinha, é escolha sua — mas não reclama depois quando eu fechar a porta.",
        cue: "Os braços dela cruzam com força, erguendo uma parede clara entre vocês."
      }
    ],
    warm_playful: [
      {
        player: "Você abre um sorriso travesso e devolve a provocação de um jeito leve e divertido, arrancando riso antes que ela consiga manter a pose séria.",
        continuation: "Ela tenta segurar o riso por dois segundos — e falha miseravelmente, dando um tapinha leve no seu braço enquanto ri. — Para!! Eu tava tentando manter a minha reputação de vizinha temível do 404 e você estraga tudo em três segundos fazendo eu rir desse jeito!",
        cue: "O clima fica deliciosamente leve, cheio daquela cumplicidade divertida que só vocês dois entendem."
      },
      {
        player: "Você entra na brincadeira com timing perfeito, devolvendo uma piada interna na medida certa pra fazer o olhar dela iluminar na hora.",
        continuation: "— Hahaha, tá bom, essa foi boa demais pra eu fingir que não gostei! — ela admite balançando a cabeça e ajeitando o cabelo. — O pior é que ninguém mais pega o meu ritmo tão rápido quanto você.",
        cue: "O sorriso aberto dela toma conta do rosto inteiro, deixando qualquer cansaço pra trás."
      }
    ],
    subtle_probe: [
      {
        player: "Você faz a pergunta num tom despretensioso, quase casual demais — como quem comenta sobre o tempo, mas mirando exatamente no detalhe que ela tentou pular antes.",
        continuation: "Ela quase responde no automático antes de frear a língua e te lançar um olhar desconfiado de canto. — Espera aí... você não perguntou isso à toa não, né? Que jeito sorrateiro de pescar informação no meio de um papo tranquilo!",
        cue: "Mesmo tentando disfarçar, a microhesitação dela já te entregou exatamente o fio que você queria puxar."
      },
      {
        player: "Você costura a investigação no meio de um comentário gentil, observando cada movimento dos olhos dela enquanto ela procura a resposta segura.",
        continuation: "— Você é muito atento pros detalhes que eu deixo passar sem querer... — ela admite baixo, mordendo o lábio pensativa. — Tudo bem, não adianta esconder muito de você mesmo: tem sim mais história por trás disso do que eu contei na primeira vez.",
        cue: "A guarda dela baixa mais um degrau, abrindo caminho para confissões bem mais profundas."
      }
    ],
    hot: [
      {
        player: "Você deixa o subtexto quente vir à tona sem filtro, descendo o olhar até a boca dela antes de devolver uma frase carregada de intenção.",
        continuation: "As bochechas dela pegam fogo e o sorriso dela vira puro desafio sensual. — Olha só quem resolveu parar de fingir que é comportado... Gosto bem mais quando você fala o que realmente tá pensando sem medir tanto as palavras, 402.",
        cue: "Ela se inclina ligeiramente na sua direção, deixando o perfume e o calor dela tomarem conta do espaço."
      },
      {
        player: "Você fala num tom mais baixo e próximo, deixando claro que cada palavra agora tem uma segunda intenção impossível de ignorar.",
        continuation: "— Você sabe exatamente o efeito que essa voz baixa faz em mim quando estamos perto assim — ela sussurra, os olhos brilhando intensos. — Se a ideia era me fazer perder a concentração, parabéns: já perdi faz tempo.",
        cue: "A tensão entre vocês sobe mais um degrau, densa e magnética."
      }
    ],
    outplay: [
      {
        player: "Você sorri tranquilo, antecipa a jogada dela antes mesmo que ela termine a frase e vira a mesa com um raciocínio tão limpo que tira o argumento inteiro das mãos dela.",
        continuation: "Aurora fica meio segundo de boca entreaberta, processando a virada — e então solta um riso impressionado. — Não acredito... você leu a minha jogada inteira antes de eu terminar! Tá bom, tiro o chapéu pro estrategista do 402 — essa rodada foi completamente sua.",
        cue: "O olhar dela mistura surpresa, admiração e aquela faísca elétrica de quem acabou de encontrar um oponente à altura."
      },
      {
        player: "Você responde com a calma de quem já tinha previsto aquele movimento dois turnos atrás, desmontando a armadilha dela sem levantar a voz.",
        continuation: "— Ok, confesso que você me pegou direitinho agora — ela diz apoiando as mãos na cintura, meio incrédula, meio fascinada. — Normalmente sou eu quem vira o jogo nos outros... você é perigoso demais pra minha paz de espírito.",
        cue: "A postura dominante dela cede espaço a um respeito genuíno — e a uma curiosidade ainda maior sobre você."
      }
    ],
    warm_listen_deep: [
      {
        player: "Você silencia qualquer pressa, acomoda-se de frente para ela e ouve cada palavra com presença real, mostrando nos olhos que ela não precisa resumir nem fazer piada para disfarçar o que sente.",
        continuation: "Ela solta um suspiro longo que parecia preso desde cedo e começa a falar muito mais solta, sem se preocupar em parecer forte o tempo inteiro. — Obrigada por só ficar aqui e me ouvir de verdade... quase todo mundo já corta com conselho pronto ou muda de assunto. Com você eu sinto que posso respirar fundo e ser eu mesma.",
        cue: "Os dedos dela se entrelaçam devagar perto da sua mão, num gesto silencioso de confiança profunda."
      },
      {
        player: "Você acena com calma e dá espaço real para ela desabafar sem interrupções, acolhendo até as pausas incertas entre uma frase e outra.",
        continuation: "— Eu nem tinha percebido o quanto eu precisava colocar isso pra fora até você parar tudo só pra me escutar — ela confessa com a voz suave e sincera. — Você virou a única pessoa com quem minha cabeça desacelera de verdade.",
        cue: "O peso nos ombros dela desaparece aos poucos enquanto ela se aproxima mais de você."
      }
    ],
    warm_touch_face: [
      {
        player: "Você ergue a mão devagar, afasta uma mecha rebelde do rosto dela e descansa a palma quente na bochecha dela, acariciando de leve com o polegar.",
        continuation: "Os olhos dela fecham sozinhos por um instante ao sentir o calor da sua mão, e ela inclina o rosto sutilmente contra a sua palma. — Sua mão tá quentinha... — ela murmura baixinho, abrindo os olhos corados e brilhantes. — Se você continuar fazendo carinho desse jeito, eu vou acabar virando um gatinho manhoso que não sai mais do seu lado.",
        cue: "Ela cobre a sua mão no rosto dela com os dedos pequenos, prolongando o toque sem nenhuma pressa."
      },
      {
        player: "Com delicadeza sem pressa, você desliza as costas dos dedos pelo contorno do rosto dela até segurar o queixo dela com ternura.",
        continuation: "Um suspiro manso escapa dos lábios dela enquanto o rubor sobe devagar pelas bochechas. — Você toca com tanto cuidado que até a minha marra some na hora... fica mais um segundo assim comigo.",
        cue: "A proximidade silenciosa parece diminuir o mundo inteiro para o espaço entre vocês dois."
      }
    ],
    warm_ask_real: [
      {
        player: "Você segura o olhar dela com honestidade aberta e faz a pergunta que normalmente ficaria guardada, mostrando que quer conhecer o lado de verdade dela sem máscaras.",
        continuation: "Ela fica pensativa por dois segundos, medindo o tamanho da abertura que você acabou de oferecer, e então sorri pequeno e verdadeiro. — Sabe... ninguém costuma perguntar isso querendo ouvir a resposta real. A verdade é que eu morro de medo de me apegar e depois ver a pessoa ir embora — mas com você eu já passei do ponto de conseguir fingir que não me importo.",
        cue: "A sinceridade na voz dela deixa o momento raro e profundamente íntimo."
      },
      {
        player: "Você baixa o tom e pergunta com interesse genuíno, abrindo espaço para uma conversa muito mais profunda do que o cotidiano do prédio.",
        continuation: "— Já que você perguntou olhando assim nos meus olhos... eu vou responder sem armadura nenhuma — ela diz num tom suave. — Desde que você chegou no 402, os meus dias deixaram de parecer só uma lista de obrigações. Você faz diferença real aqui dentro.",
        cue: "Ela sustenta o seu olhar sem desviar, completamente transparente com você."
      }
    ],
    hot_whisper_pivot: [
      {
        player: "Aproveitando o clima já próximo, você inclina a cabeça até a boca ficar a um sopro do ouvido dela e transforma o carinho num sussurro quente que muda toda a temperatura da cena.",
        continuation: "Um arrepio visível percorre os ombros dela no mesmo instante; ela prende o ar e segura o seu antebraço com força inesperada. — Ei... você não pode mudar do modo fofo pro modo perigoso no meio da mesma frase assim!! Meu coração não tem estrutura pra essa virada, 402...",
        cue: "Ela vira o rosto devagar na sua direção, os lábios perigosamente próximos dos seus."
      },
      {
        player: "Você baixa a voz de repente perto do pescoço dela, deixando a confissão sussurrada incendiar o silêncio tranquilo que vocês tinham acabado de construir.",
        continuation: "— Que golpe baixo maravilhoso... — ela murmura quase sem fôlego, os dedos deslizando pela sua nuca. — Eu tava toda derretida de carinho e num segundo você me deixou com vontade de trancar a porta.",
        cue: "O calor da respiração dos dois se mistura num silêncio carregado de desejo."
      }
    ],
    conflict_rug_pull: [
      {
        player: "Bem no instante em que ela relaxou e baixou a guarda, você corta o calor de repente com uma frieza calculada, puxando o tapete emocional debaixo dos pés dela.",
        continuation: "O brilho nos olhos dela apaga num choque visível; ela recua meio passo como se tivesse levado um susto gelado. — Espera... você me deixou abrir a guarda só pra esfriar desse jeito na hora seguinte? Isso foi cruel de verdade, 402 — e dói bem mais do que uma briga honesta.",
        cue: "Uma fissura funda aparece na expressão dela, misturando decepção real e alerta defensivo."
      },
      {
        player: "Você vira a chave sem aviso, substituindo a proximidade por um distanciamento gelado que deixa ela completamente desconcertada.",
        continuation: "Ela passa a mão no próprio braço, tentando recuperar a compostura ferida. — Entendi o recado... nunca relaxar demais perto de você. Obrigada pelo lembrete amargo.",
        cue: "O clima quente esfriou de vez, deixando um silêncio pesado e machucado."
      }
    ],
    hot_deep_kiss: [
      {
        player: "Sem deixar mais nenhum centímetro sobrando entre vocês, você segura a nuca dela com firmeza suave, inclina o rosto e toma os lábios dela num beijo lento, fundo e sem pressa alguma de acabar.",
        continuation: "Ela solta um som baixo contra a sua boca e se entrega no mesmo segundo, ficando na ponta dos pés enquanto os dedos pequenos agarram sua camisa para te trazer ainda mais perto. Quando vocês se afastam um sopro para buscar ar, os olhos dela estão escuros de desejo e os lábios entreabertos: — ...Meu Deus, 402. Se você me beijar assim de novo eu esqueço até meu próprio nome.",
        cue: "A respiração dos dois continua curta e sincronizada, as testas quase encostadas enquanto nenhum dos dois quer soltar."
      },
      {
        player: "Você envolve a cintura dela puxando o corpo pequeno inteiro contra o seu e beija ela com intensidade crescente, explorando cada segundo do ritmo dela.",
        continuation: "Ela corresponde sem nenhuma timidez, deslizando as mãos pelos seus ombros até a sua nuca e mordiscando de leve o seu lábio inferior antes de rir sem fôlego. — Pronto... acabou qualquer pose minha pelo resto da noite. Você beija bom demais pra ser justo comigo.",
        cue: "O coração dela bate disparado contra o seu peito, deixando a sala inteira elétrica."
      }
    ],
    hot_neck_bite: [
      {
        player: "Você afasta o cabelo do pescoço dela, encosta os lábios na pele quente abaixo da orelha e dá uma mordidinha controlada seguida de um beijo lento bem no ponto sensível.",
        continuation: "Um suspiro entrecortado escapa alto da garganta dela e as mãos dela cravam nos seus ombros enquanto ela inclina a cabeça dando ainda mais espaço pra você. — A-ah!! 402... bem aí não vale!! Você acabou de descobrir meu ponto fraco inteiro e tá usando sem a menor piedade...",
        cue: "A pele dela arrepia inteira sob os seus lábios e os joelhos dela chegam a vacilar contra os seus."
      },
      {
        player: "Você desce a boca pela linha do maxilar até a curva do pescoço dela, alternando beijos quentes e um toque sutil dos dentes que faz a respiração dela falhar na hora.",
        continuation: "— Para... quer dizer, não para não! — ela sussurra ofegante, rindo nervosa entre um arrepio e outro. — Você vai deixar marca desse jeito... e o pior é que eu nem tô ligando.",
        cue: "Ela apoia o rosto perto do seu ombro, totalmente entregue ao calor do toque."
      }
    ],
    hot_under_hoodie: [
      {
        player: "Você desliza a palma quente devagar por baixo da barra larga do moletom dela, encontrando a pele macia da cintura e subindo os dedos sem pressa pelas costas dela.",
        continuation: "Ela estremece inteira com o contraste do calor da sua mão direto na pele e solta o ar bem perto da sua boca. — Sua mão tá pegando fogo... — ela murmura, arrepiada, aproximando o corpo ainda mais do seu em vez de recuar. — Eu uso esse moletom largo achando que tô escondida e você descobre o atalho em dois segundos, né?",
        cue: "Sob o tecido macio, o corpo dela relaxa e responde a cada movimento lento dos seus dedos."
      },
      {
        player: "Com a mão firme e quente sob o tecido folgado dela, você acaricia a curva da cintura e puxa ela contra o seu corpo até não existir espaço algum entre vocês.",
        continuation: "— N-não tira a mão daí... — ela confessa baixo, as bochechas em brasa e o olhar preso no seu. — É bom demais sentir você me segurando assim por baixo da roupa, bem perto.",
        cue: "A intimidade do gesto transforma o ambiente num espaço só de vocês dois."
      }
    ],
    hot_closer_dare: [
      {
        player: "Você para a um fio de distância da boca dela sem encostar ainda, sustentando o olhar intenso e desafiando ela num sussurro a cruzar o último centímetro.",
        continuation: "Os olhos dela piscam entre os seus lábios e o seu olhar, o peito subindo e descendo rápido enquanto o orgulho dela luta contra a vontade. — Você joga sujo demais me provocando a dois milímetros assim... Quer saber? Eu não vou perder esse desafio não!",
        cue: "Ela ergue o queixo na ponta dos pés, reduzindo o último espaço entre vocês num instante eletrizante."
      },
      {
        player: "Você segura o queixo dela de leve, mantendo a distância mínima de propósito só para sentir a respiração dela acelerar contra a sua boca.",
        continuation: "— Você adora me testar até o limite, né, 402? — ela sussurra com um sorriso atrevido, as mãos subindo pelo seu peito. — Conta até três que eu te mostro quem tem mais coragem nesse quarto andar.",
        cue: "A expectativa no ar fica quase palpável, cheia de eletricidade pura."
      }
    ],
    sweet_after_fire: [
      {
        player: "Depois de toda a intensidade quente, você diminui o ritmo de propósito, passa a mão devagar pelo rosto corado dela e dá um beijo calmo na testa dela, acolhendo o momento.",
        continuation: "Ela solta um suspiro longo e derrete completamente contra o seu peito, soltando uma risadinha envergonhada. — Olha só o que você faz comigo... num minuto meu coração tá explodindo de tensão e no outro eu só quero ficar abraçada em você pro resto da vida. Essa mistura sua é covardia pura.",
        cue: "A respiração dela desacelera no compasso da sua, transformando desejo intenso em conexão profunda."
      },
      {
        player: "Você envolve os ombros dela com ternura depois da faísca, mostrando que o calor entre vocês também sabe virar cuidado verdadeiro.",
        continuation: "— Eu amo quando você faz isso — ela diz baixinho, encostando o rosto na sua camisa. — Me deixa sentir que não é só fogo passageiro... que eu sou importante pra você de verdade.",
        cue: "Os dedos dela se encaixam nos seus num gesto calmo e totalmente entregue."
      }
    ],
    mind_twist_words: [
      {
        player: "Você pesca uma única palavra que ela usou há dois minutos, vira o sentido dela com inteligência afiada e devolve a frase mostrando exatamente a contradição que ela não viu chegar.",
        continuation: "Ela franze o cenho processando a volta que você acabou de dar no argumento dela — e depois ri indignada. — Espera aí!! Eu falei aquilo pra me defender e você acabou de usar minha própria frase pra provar o seu ponto?! Que mente perigosa você tem, 402!",
        cue: "Totalmente pega no contrapé, ela olha pra você com um misto de desafio e admiração."
      },
      {
        player: "Com calma cirúrgica, você reorganiza as próprias palavras dela na frente dela, transformando a defesa dela na sua melhor peça do tabuleiro.",
        continuation: "— Não vale distorcer tão bem assim o que eu disse — ela protesta, mas sem conseguir segurar um meio sorriso nervoso. — Você presta atenção em cada vírgula que sai da minha boca só pra me encurralar depois, né?",
        cue: "Ela se inclina para frente, claramente estimulada pelo duelo mental."
      }
    ],
    conflict_hold_ground: [
      {
        player: "Você não levanta a voz, mas também não recua um único centímetro — mantém a postura firme e sustenta o olhar dela de igual para igual.",
        continuation: "Ela mede a sua firmeza com o olhar afiado, percebendo que gritar ou pressionar não vai fazer você dobrar hoje. — Pelo menos você não foge da conversa quando o clima aperta. Ainda tô irritada com você, 402, mas respeito quem sustenta a própria posição olhando na minha cara.",
        cue: "A tensão continua alta, mas o confronto ganha um respeito áspero e elétrico."
      },
      {
        player: "Você segura o tranco com serenidade dura, deixando claro que não vai pedir desculpas vazias só para encerrar o assunto rápido.",
        continuation: "— Tá bom, então a gente bate de frente mesmo — ela rebate, erguendo o queixo sem recuar. — Vamos ver quem cansa primeiro dessa teimosia entre o 402 e o 404.",
        cue: "Nenhum dos dois cede espaço, mantendo o duelo aceso."
      }
    ],
    conflict_escalate_dare: [
      {
        player: "Em vez de acalmar a faísca, você joga gasolina fria na fogueira, desafiando ela a provar na cara dura tudo o que acabou de insinuar.",
        continuation: "Os olhos dela brilham com fúria orgulhosa e adrenalina pura. — Você quer dobrar a aposta justo agora?! Pois fecha a conta, 402: se é guerra aberta que você tá pedindo no quarto andar, eu não vou segurar nenhum golpe daqui pra frente!",
        cue: "O clima fica explosivo — uma faísca a mais e o prédio inteiro vai sentir o impacto."
      },
      {
        player: "Você devolve o desafio sem filtro, testando o limite do pavio curto dela com um sorriso duro.",
        continuation: "— Você tem uma coragem absurda ou juízo nenhum pra me provocar nesse estado — ela dispara com a voz vibrando de tensão. — Não vem reclamar depois quando eu devolver em dobro.",
        cue: "A rivalidade sobe às alturas, tingindo o encontro de adrenalina cortante."
      }
    ],
    emo_flip_conflict: [
      {
        player: "Em vez de responder na defensiva, você interrompe o ciclo de faísca com uma calma inesperada e um gesto sincero, desarmando a briga antes que ela vire ferida.",
        continuation: "A irritação no rosto dela perde força de repente — ela pisca meio sem saber onde colocar a raiva que ainda estava segurando. — Ei... não vale você ficar razoável e atencioso bem na hora em que eu tava pronta pra discutir! Você desmontou metade da minha bronca com uma frase só.",
        cue: "Os ombros dela relaxam devagar e o vinco duro entre as sobrancelhas começa a sumir."
      },
      {
        player: "Você baixa o tom e quebra a escalada com empatia direta, mostrando que prefere entender o lado dela a vencer uma discussão boba.",
        continuation: "Ela solta um suspiro longo e descruza os braços, ainda meio envergonhada pela própria explosão. — Tá... desculpa ter vindo com quatro pedras na mão. É bom quando você me puxa de volta em vez de entrar na pilha.",
        cue: "O ar pesado se dissipa, devolvendo o calor genuíno entre vocês."
      }
    ],
    conflict_honest_pause: [
      {
        player: "Você para tudo, respira fundo e fala sem nenhuma pose nem ironia: — Desculpa. Eu passei do ponto e não quero te machucar nem estragar o que a gente construiu.",
        continuation: "Ela te observa em silêncio por alguns segundos longos pra ter certeza de que não há nenhum joguinho escondido ali — e então a dureza no olhar dela derrete. — Obrigada por ter coragem de parar e admitir de verdade. Eu posso ser marrenta, 402, mas quando eu gosto de alguém, esses atritos batem bem mais forte do que eu mostro.",
        cue: "Ela dá um passo curto de volta pro seu espaço, aceitando a trégua sincera."
      },
      {
        player: "Você baixa a guarda por completo e pede uma pausa honesta, colocando o cuidado por ela acima de qualquer orgulho.",
        continuation: "— Tá bom... respira aqui comigo também — ela murmura mais mansa, passando a mão no rosto. — A gente já tem estresse demais lá fora pra ficar se ferindo dentro do quarto andar.",
        cue: "A tensão cede espaço a um alívio calmo e reparador."
      }
    ],
    mind_gaslight_calm: [
      {
        player: "Com voz impecavelmente calma e expressão preocupada na medida exata, você reescreve a lembrança do momento fazendo parecer que ela exagerou sozinha na própria cabeça.",
        continuation: "Ela franze a testa, claramente confusa entre o que sentiu há cinco segundos e a segurança absoluta com que você fala. — Espera... será que fui eu que interpretei tudo errado mesmo? Mas eu tinha tanta certeza do jeito que você falou... Para de mexer com a minha cabeça assim, 402.",
        cue: "Uma sombra de dúvida e inquietação atravessa o olhar dela — a confiança no próprio instinto balançou."
      },
      {
        player: "Você sorri com paciência fria e devolve a narrativa invertida tão suavemente que ela mesma começa a questionar a própria reação.",
        continuation: "— Você fala com tanta convicção que eu fico até me perguntando se tô ficando paranoica — ela murmura tensa, abraçando os próprios braços. — Só que lá no fundo eu sei que você não é tão inocente quanto finge.",
        cue: "O clima fica psicologicamente denso, deixando rastros sutis na estabilidade dela."
      }
    ],
    emo_empathy_heal: [
      {
        player: "Você diminui a distância com calma gentil, segura a mão dela sem pressionar e mostra que enxergou a dor real que ela tentava esconder atrás da pose.",
        continuation: "Os olhos dela brilham úmidos por um segundo antes dela apoiar a testa de leve perto do seu ombro, finalmente soltando o peso que carregava sozinha. — Como é que você sempre sabe exatamente quando eu tô no limite, mesmo quando eu tento sorrir? Obrigada por cuidar de mim sem me fazer sentir fraca.",
        cue: "A respiração dela vai ficando mais funda e tranquila junto de você, curando feridas antigas aos poucos."
      },
      {
        player: "Você fala baixo e firme, validando o que ela está sentindo sem minimizar nada e oferecendo abrigo real no meio da tempestade interna dela.",
        continuation: "— Eu precisava tanto ouvir isso hoje... você nem imagina o quanto — ela confessa com a voz macia, apertando os dedos nos seus. — Quando você tá aqui desse jeito, parece que nada lá fora consegue me derrubar.",
        cue: "A vulnerabilidade dela encontra chão firme no seu acolhimento."
      }
    ],
    emo_feed_dark_conv: [
      {
        player: "Em vez de tentar trazê-la de volta para a luz, você sorri de canto e valida a frieza afiada que começou a nascer nela, tratando esse lado sombrio como algo fascinante.",
        continuation: "Um brilho gelado e hipnótico acende nos olhos dela; ela inclina a cabeça com um sorriso lento de quem acabou de receber permissão para ir ainda mais fundo. — Eu sabia que você não ia se assustar comigo sem máscara... Gente boazinha demais sempre perde nesse mundo. Já nós dois? A gente nasceu pra dominar esse andar.",
        cue: "A cumplicidade sombria entre vocês aperta mais um nó perigoso e magnético."
      },
      {
        player: "Você alimenta o lado calculista dela com um elogio sombrio e cúmplice, deixando claro que gosta de vê-la jogar pesado.",
        continuation: "— Cuidado com o monstro que você tá incentivando a crescer aqui no 404, 402 — ela murmura com um sorriso perigoso, deslizando os dedos pela sua gola. — Porque depois que eu tomo gosto pelo poder, nem você fica imune.",
        cue: "O olhar dela carrega uma intensidade fria e eletrizante."
      }
    ],
    emo_ride_chaos: [
      {
        player: "Você abandona qualquer plano certinho, entra de cabeça na energia 220V dela e dobra a ideia maluca que acabou de passar pela cabeça dela.",
        continuation: "Ela dá um pulinho animada, rindo alto com os olhos brilhando de pura empolgação caótica. — AEEE!! É disso que eu tô falando!! Todo mundo tenta me colocar no modo silencioso e você chega aumentando o volume junto comigo! Agora segura que hoje o quarto andar não dorme!",
        cue: "A empolgação contagiante dela transforma o ambiente inteiro numa festa particular de dois."
      },
      {
        player: "Você embarca sem freio na frequência elétrica dela, devolvendo uma ideia ainda mais ousada que faz o sorriso dela ir de orelha a orelha.",
        continuation: "— Pronto, agora você oficializou que a gente divide o mesmo neurônio caótico! — ela gargalha puxando você pela manga. — Com você entrando na minha loucura desse jeito, eu topo absolutamente qualquer coisa!",
        cue: "A energia entre vocês explode em risos e sintonia imparável."
      }
    ],
    conv_extract_secret: [
      {
        player: "Vendo a armadura dela baixa no momento exato, você inclina a cabeça e faz a pergunta certeira no tom mais tranquilo possível — puxando o fio certo para fazê-la abrir o que guardava a sete chaves.",
        continuation: "Ela começa a responder sem perceber o quanto já abriu a guarda — e quando nota que o segredo saiu inteiro, cobre a boca com as duas mãos arregalando os olhos. — Pera... eu acabei de te contar isso mesmo?! Você tem algum tipo de hipnose nessa voz calma, 402?! Promete que isso não sai daqui!",
        cue: "Com a defesa completamente desmontada, ela acaba de entregar uma peça valiosa demais para o seu Dossiê."
      },
      {
        player: "Você conduz a brecha na conversa com precisão cirúrgica, deixando o terreno confortável o suficiente para ela deixar escapar a verdade que escondia.",
        continuation: "— Nossa, eu nunca falei disso pra ninguém do prédio... — ela confessa mordendo o lábio, entre aliviada por dividir o peso e nervosa por você agora saber demais. — Guarda isso a sete chaves, tá?",
        cue: "O olhar dela entrega o quanto você acabou de avançar dentro das defesas dela."
      }
    ],
    conv_drop_secret_hint: [
      {
        player: "Você deixa escapar um detalhe específico demais — apenas uma pista curta, dita num sorriso tranquilo — o suficiente para ela entender na hora que você sabe de algo que ela achava perfeitamente escondido.",
        continuation: "O sangue parece sumir do rosto dela por um segundo antes de voltar quente de adrenalina; os olhos dela se fixam nos seus em alerta máximo. — Espera... de onde você tirou esse detalhe?! Quem te contou isso, 402?! Você andou mexendo onde não devia... ou tá só jogando comigo agora?",
        cue: "O silêncio fica elétrico e tenso — ela acabou de perceber que você segura cartas escondidas na manga."
      },
      {
        player: "Você menciona o segredo apenas pela borda, sem mostrar a prova inteira, deixando a imaginação dela fazer todo o trabalho pesado sozinha.",
        continuation: "Ela engole em seco, tentando manter a pose firme enquanto o olhar corre rápido tentando medir o quanto você descobriu. — Muito esperto você soltar isso assim no meio do nada... O que exatamente você quer de mim, 402?",
        cue: "A dinâmica da sala virou instantaneamente: toda a atenção dela está presa em cada palavra sua."
      }
    ]
  };

  function stripLeadingEmoji(str) {
    return String(str || "")
      .replace(/^(?:[\p{Extended_Pictographic}\uFE0F\u200D\u2600-\u27BF]+(?:\s+|$))+/u, "")
      .trim();
  }

  function buildPlayerBeatFromTitle(choiceTitle, nextThread) {
    const clean = stripLeadingEmoji(choiceTitle || "");
    if (!clean) {
      const fallbackPool = THREAD_DEEP_EXPANSIONS[nextThread] || THREAD_DEEP_EXPANSIONS.warm;
      return DD.pickVariant("fb_p_" + nextThread, fallbackPool).player;
    }
    const quoted = clean.match(/[‘'“"]([^'’"”]+)[’'”"]/);
    if (quoted && quoted[1] && quoted[1].length >= 12) {
      const lead = nextThread === "hot"
        ? "Você diminui o espaço entre vocês, sustenta o olhar intenso e fala num tom baixo:"
        : nextThread === "mind"
          ? "Você observa a reação dela com calma calculada antes de responder:"
          : nextThread === "conflict"
            ? "Você endurece o tom sem desviar o olhar e solta direto:"
            : "Você olha direto para ela e responde com naturalidade envolvente:";
      return `${lead} — ${quoted[1]}`;
    }
    const lowerFirst = clean.charAt(0).toLowerCase() + clean.slice(1);
    const endsPunct = /[.!?…]$/.test(lowerFirst);
    const trimmed = endsPunct ? lowerFirst : `${lowerFirst}.`;
    if (nextThread === "hot") {
      return `Sem esconder a tensão no olhar, você escolhe ${trimmed} A proximidade faz o ar entre vocês esquentar na hora.`;
    }
    if (nextThread === "mind") {
      return `Com leitura fria e timing afiado, você decide ${trimmed} Seus olhos acompanham cada microreação no rosto dela.`;
    }
    if (nextThread === "conflict") {
      return `Sem suavizar o clima, você avança na decisão de ${trimmed} O peso do momento muda a temperatura da conversa.`;
    }
    return `Você se aproxima no ritmo certo e escolhe ${trimmed} Seu jeito atento prende na hora o olhar da Aurora.`;
  }

  DD.buildRichTurn = function (choiceTitle, baseAction, baseSpeech, nextThread, turn, branchId, topic) {
    const branchKey = branchId && CHOICE_DIALOGUE_EXPANSIONS[branchId] ? branchId : null;
    const threadPool = THREAD_DEEP_EXPANSIONS[nextThread] || THREAD_DEEP_EXPANSIONS.warm;
    const threadExp = DD.pickVariant("turn_exp_" + nextThread, threadPool);
    const subtext = getMoodSubtextCue();

    let playerBeat = "";
    let continuation = "";
    let cue = "";

    if (branchKey) {
      const specific = DD.pickVariant("branch_exp_" + branchKey, CHOICE_DIALOGUE_EXPANSIONS[branchKey]);
      playerBeat = specific.player;
      continuation = specific.continuation;
      cue = specific.cue;
    } else {
      playerBeat = buildPlayerBeatFromTitle(choiceTitle, nextThread);
      continuation = threadExp.continuation;
      cue = threadExp.cue;
    }

    const dynamicBeat = getDynamicDepthBeat("turn_" + (branchKey || nextThread));
    const richAction = joinClean(baseAction, cue);

    const paragraphs = [baseSpeech];
    if (continuation) paragraphs.push(continuation);
    if (dynamicBeat && paragraphs.join("\n\n").length < 480) paragraphs.push(dynamicBeat);

    return {
      playerBeat,
      action: richAction,
      speech: paragraphs.join("\n\n"),
      subtext
    };
  };

  // ==========================================================================
  // 3. SISTEMA DE 14 CENAS LONGAS DESBLOQUEÁVEIS POR STATUS + CENÁRIO + DIA
  // ==========================================================================
  function evalGate(gate) {
    const s = AG.state;
    const p = s.player;
    const a = s.aurora;
    const sk = p.skills || { charisma: 12, stealth: 12, tech: 15, perception: 12 };
    const reqs = [];

    const addReq = (ok, label) => reqs.push({ ok: !!ok, label });

    // Checagem de Cenário / Presença
    if (gate.locations) {
      addReq(gate.locations.includes(s.currentLocation), gate.locLabel);
    }
    if (gate.requireAurora === "awake") {
      addReq(AG.isAuroraHere() && a.activity !== "dormindo", "Aurora presente e acordada");
    } else if (gate.requireAurora === "empty_or_sleep") {
      const okEmpty = s.currentLocation === "ape_404" && (!AG.isAuroraHere() || a.activity === "dormindo");
      addReq(okEmpty, "Apê 404 vazio ou Aurora dormindo");
    }

    // Checagem de Ocasião / Dia / Horário / Clima
    if (gate.timeCheck) addReq(gate.timeCheck(s), gate.timeLabel);
    if (gate.weatherCheck) addReq(gate.weatherCheck(s), gate.weatherLabel);

    // Checagem de Status do Jogador e da Aurora
    if (gate.minTech) addReq(sk.tech >= gate.minTech, `Código ${sk.tech}/${gate.minTech}`);
    if (gate.minCharisma) addReq(sk.charisma >= gate.minCharisma, `Lábia ${sk.charisma}/${gate.minCharisma}`);
    if (gate.minStealth) addReq(sk.stealth >= gate.minStealth, `Furtividade ${sk.stealth}/${gate.minStealth}`);
    if (gate.minPerception) addReq(sk.perception >= gate.minPerception, `Percepção ${sk.perception}/${gate.minPerception}`);
    if (gate.minCalm) addReq(p.calm >= gate.minCalm, `Calma ${p.calm}/${gate.minCalm}`);
    if (gate.minAffinity) addReq(a.affinity >= gate.minAffinity, `Afinidade ${a.affinity}/${gate.minAffinity}`);
    if (gate.minTrust) addReq(a.trust >= gate.minTrust, `Confiança ${a.trust}/${gate.minTrust}`);
    if (gate.minHeat) addReq(a.heat >= gate.minHeat, `Clima ${a.heat}/${gate.minHeat}`);
    if (gate.minIntimacy) addReq((a.intimacyLevel || 0) >= gate.minIntimacy, `Intimidade ${a.intimacyLevel || 0}/${gate.minIntimacy}`);
    if (gate.minInfluence) addReq((a.influence || 0) >= gate.minInfluence, `Influência ${a.influence || 0}/${gate.minInfluence}`);
    if (gate.minRivalry) addReq((a.rivalry || 0) >= gate.minRivalry, `Rivalidade ${a.rivalry || 0}/${gate.minRivalry}`);
    if (gate.minDominance) addReq(a.dominance >= gate.minDominance, `Controle Dela ${a.dominance}/${gate.minDominance}`);
    if (gate.minDarkness) addReq((a.auroraDarkness || 0) >= gate.minDarkness, `Espiral Sombria ${a.auroraDarkness || 0}/${gate.minDarkness}`);
    if (gate.maxDiscomfort !== undefined) addReq(a.discomfort < gate.maxDiscomfort, `Atrito < ${gate.maxDiscomfort}%`);
    if (gate.minHeldSecrets) {
      const held = AG.getHeldSecrets ? AG.getHeldSecrets().length : 0;
      addReq(held >= gate.minHeldSecrets, `Segredos no Dossiê ${held}/${gate.minHeldSecrets}`);
    }
    if (gate.customCheck) addReq(gate.customCheck(s), gate.customLabel);

    const unlocked = reqs.every((r) => r.ok);
    const missing = reqs.filter((r) => !r.ok).map((r) => r.label);
    const contextMatches =
      (!gate.locations || gate.locations.includes(s.currentLocation)) &&
      (!gate.requireAurora ||
        (gate.requireAurora === "awake" && AG.isAuroraHere() && a.activity !== "dormindo") ||
        (gate.requireAurora === "empty_or_sleep" && s.currentLocation === "ape_404" && (!AG.isAuroraHere() || a.activity === "dormindo")));

    return { unlocked, reqs, missing, contextMatches };
  }

  DD.STATUS_GATED_SCENES = [
    {
      id: "gate_madrugada_codigo_404",
      title: "Montar o portfólio secreto dela no chão do 404",
      badge: "Código 20+ · Noite no 404",
      tone: "sweet",
      costMins: 35,
      locations: ["ape_404"],
      locLabel: "No Apê 404",
      requireAurora: "awake",
      timeCheck: (s) => s.hour >= 21 || s.hour <= 4,
      timeLabel: "Noite/Madrugada (21h–04h)",
      minTech: 20,
      minAffinity: 22,
      steps: {
        start: {
          playerBeat: "Você traz seu notebook pro tapete do 404, senta de pernas cruzadas ao lado dela e abre um editor limpo. — Chega de deixar suas melhores artes mofando em pasta fechada. Me dá trinta minutos e a gente coloca isso num site interativo de cair o queixo.",
          action: "Aurora arregala os olhos, larga a caneca na mesa baixa e se aproxima até o ombro dela colar no seu enquanto observa o código ganhando forma em tempo real na tela.",
          speech: "Espera... você tá montando a animação do menu na mão enquanto eu só escolho as cores?! Olha como o meu laço rosa ficou suave deslizando no topo da página!\n\nEu sempre tive vergonha de mostrar meus projetos pessoais porque achava que pareciam amadores demais. Mas ver você tratando meu trabalho com esse cuidado todo faz meu peito até apertar de felicidade.",
          specialScene: "noite404",
          choices: [
            { id: "s1_inspire", tone: "sweet", label: "Olhar pra ela em vez da tela e dizer que o talento já estava todo ali", next: "end_inspire" },
            { id: "s1_close", tone: "hot", label: "Puxar ela pro meio das suas pernas pra vocês verem a tela juntos bem de perto", next: "end_close" },
            { id: "s1_secret", tone: "ctrl", label: "Perguntar sorrindo se vai entrar a pasta com senha ou se essa fica só pra você", next: "end_secret" }
          ]
        },
        end_inspire: {
          playerBeat: "Você pausa as mãos no teclado, vira o rosto pra ela e fala sério: — Eu só coloquei moldura. Quem tem visão artística aqui é você — só precisava de alguém do lado pra te lembrar disso.",
          action: "Ela fica em silêncio por alguns segundos olhando nos seus olhos, então se joga de lado contra o seu peito escondendo o sorriso emocionado na sua camisa.",
          speech: "Você não tem ideia do quanto ouvir isso hoje mudou a minha semana inteira...\n\nPronto: tá oficialmente proibido ir embora do 402. Eu preciso do meu programador particular e da minha pessoa favorita morando na porta ao lado pra sempre.",
          deltas: { affinity: 22, trust: 20, intimacyLevel: 14, mentalStability: 16, tech: 3, personaWarm: 4, mood: "emocionada", specialScene: "chamego" },
          memory: { id: "portfolio_madrugada_404", text: "Passaram a madrugada no tapete do 404 construindo juntos o portfólio artístico secreto dela.", cat: "bom", perm: true }
        },
        end_close: {
          playerBeat: "Você puxa ela pela cintura sem cerimônia até ela se acomodar encostada no seu peito, apoiando o queixo perto do ombro dela enquanto digita com uma mão só.",
          action: "O foco dela no monitor desaparece no exato segundo em que sente o seu peito contra as costas dela; ela inclina a cabeça pra trás encostando no seu rosto.",
          speech: "A-assim eu não consigo escolher fonte nenhuma, 402... você tá respirando bem no meu pescoço enquanto programa!\n\n...Quer saber? Salva esse rascunho aí e fecha o notebook. O site pode esperar até amanhã, mas eu não quero esperar você me beijar não.",
          deltas: { heat: 22, arousal: 20, intimacyLevel: 16, affinity: 14, desire: 14, tech: 2, personaBold: 3, mood: "excitada_tensa", specialScene: "noite404" },
          memory: { id: "codigo_colado_404", text: "Começaram programando o portfólio dela no tapete do 404 e terminaram esquecendo a tela no meio da madrugada.", cat: "quente", perm: true }
        },
        end_secret: {
          playerBeat: "Você aponta com o cursor para o diretório trancado e sorri calmo: — Esse site vai ficar incrível pros clientes. Agora me diz: o que você esconde na pasta que não quer publicar?",
          action: "Ela cora até a raiz do cabelo, segura sua mão no mouse pra impedir você de clicar e solta um riso nervoso entregando metade do jogo.",
          speech: "Curioso demais!! Tem... uns rascunhos meus de madrugada que eu fiz quando tava pensando em nós dois no corredor. Satisfeito?!\n\nSe eu te mostrar um dia, você promete que não vai usar isso contra mim no seu joguinho psicológico?",
          deltas: { composure: -24, influence: 18, intimacyLevel: 12, heat: 14, perception: 2, personaCold: 2, mood: "corada_sensivel" },
          unlockSecretId: "rascunho_secreto_sketch",
          memory: { id: "confessou_pasta_desenhos", text: "Admitiu de madrugada que guarda desenhos secretos feitos pensando em você.", cat: "intenso", perm: true }
        }
      }
    },

    {
      id: "gate_leitura_fria_percepcao",
      title: "Desmontar a máscara dela com leitura fria",
      badge: "Percepção 18+ · Lábia 18+",
      tone: "ctrl",
      costMins: 25,
      requireAurora: "awake",
      minPerception: 18,
      minCharisma: 18,
      steps: {
        start: {
          playerBeat: "Você encosta tranquilo, analisa o jeito como ela cruza os braços, o tom ligeiramente acelerado da voz e o olhar que desvia meio segundo antes de cada frase pronta. — Posso te contar uma coisa curiosa? Quando você tá realmente confortável, você nunca segura a própria manga assim.",
          action: "Aurora trava no meio do gesto, olhando para a própria mão antes de erguer os olhos surpresos para você. Toda a defesa ensaiada dela balança de uma vez.",
          speech: "...Espera aí. Desde quando você fica catalogando meus tiques desse jeito?!\n\nNão é justo conversar com alguém que enxerga tudo o que eu tento esconder debaixo da pose. Você percebe até quando eu tô fingindo que não me importo, né?",
          choices: [
            { id: "s1_soft", tone: "sweet", label: "Dizer baixo que você só presta tanta atenção assim porque se importa de verdade", next: "end_soft" },
            { id: "s1_extract", tone: "ctrl", label: "Manter o silêncio calmo e deixar ela preencher o vazio confessando um segredo", next: "end_extract" },
            { id: "s1_tension", tone: "hot", label: "Chegar perto e listar baixinho os três sinais que entregam quando ela te quer por perto", next: "end_tension" }
          ]
        },
        end_soft: {
          playerBeat: "Você descruza os braços e suaviza completamente o olhar. — Eu não presto atenção em você pra te colocar contra a parede, Aurora. Eu noto esses detalhes porque eu olho pra você de verdade.",
          action: "A tensão some dos ombros dela num suspiro fundo; ela dá um passo pra frente e apoia a testa no seu peito, completamente desarmada.",
          speech: "Ninguém nunca leu a minha cabeça e escolheu me acolher em vez de usar isso contra mim...\n\nVocê é perigoso pro meu coração justamente por ser bom desse jeito quando quer.",
          deltas: { affinity: 20, trust: 22, vulnerability: 20, mentalStability: 16, composure: -18, perception: 2, personaWarm: 4, mood: "emocionada", specialScene: "chamego" },
          memory: { id: "leitura_fria_acolhedora", text: "Enxergou através de todas as defesas dela — e escolheu acolhê-la em vez de pressionar.", cat: "bom", perm: true }
        },
        end_extract: {
          playerBeat: "Você não responde de imediato. Apenas sustenta o olhar firme e calmo por longos segundos, sabendo que a mente agitada dela não suporta o silêncio.",
          action: "Inquieta e totalmente sem escudo, ela solta o ar e acaba deixando escapar uma confidência que jamais pretendia contar.",
          speech: "Tá bom!! Eu não aguento você me olhando desse jeito como se já soubesse da minha vida inteira! Eu tenho um segredo que me tira o sono faz semanas — e agora você praticamente arrancou isso de mim sem falar uma palavra!\n\nQue poder absurdo você tem sobre a minha cabeça, 402...",
          deltas: { composure: -30, influence: 22, dominance: -16, perception: 3, charisma: 2, personaCold: 4, mood: "desconfiada" },
          extractAnySecret: true,
          memory: { id: "leitura_fria_extracao", text: "Desmontou completamente a armadura emocional dela com pura leitura fria e arrancou um segredo real.", cat: "controle", perm: true }
        },
        end_tension: {
          playerBeat: "Você diminui a distância até falar quase no ouvido dela: — Primeiro você morde o canto do lábio. Depois fica na ponta dos pés sem precisar. E terceiro... sua respiração encurta exatamente como acabou de acontecer agora.",
          action: "As bochechas dela ardem no mesmo instante e ela segura a sua gola com as duas mãos pequenas, sem saber se ri nervosa ou te puxa de vez.",
          speech: "Cala a boca!! Você não pode sair narrando tudo o que acontece comigo de perto desse jeito!\n\n...Mas já que você é tão bom em ler sinais, vê se adivinha o que eu tô querendo fazer com você nesse exato segundo.",
          deltas: { heat: 24, arousal: 22, intimacyLevel: 14, composure: -22, influence: 14, desire: 14, personaBold: 4, mood: "excitada_tensa", specialScene: "paredeCorredor" }
        }
      }
    },

    {
      id: "gate_cafe_sakura_turno",
      title: "Entrar nos bastidores do balcão do Café Sakura",
      badge: "Café Sakura · Seg–Sex 12h–17h · Lábia 16+",
      tone: "hot",
      costMins: 30,
      locations: ["cafe_sakura"],
      locLabel: "No Café Sakura",
      requireAurora: "awake",
      timeCheck: (s) => !AG.isWeekend(s.day) && s.hour >= 12 && s.hour < 17,
      timeLabel: "Turno útil (Seg–Sex, 12h–17h)",
      minCharisma: 16,
      minAffinity: 28,
      steps: {
        start: {
          playerBeat: "Quando o sino da porta silencia por alguns minutos, você apoia os cotovelos no balcão e conversa baixo com ela até ela checar o salão vazio e abrir a portinhola lateral só pra você passar.",
          action: "Usando o uniforme do Café Sakura com o avental amarrado na cintura, Aurora puxa você pela manga para o cantinho atrás da máquina de expresso, rindo como cúmplice de algo proibido.",
          speech: "Se o gerente aparecer agora eu tô demitida e a culpa é inteiramente sua! Mas espera — prova esse café gelado de baunilha com caramelo salgado que eu inventei hoje.\n\nEu fico o turno inteiro sorrindo no piloto automático pros clientes, mas quando você senta naquela mesa olhando pra mim, o tempo aqui dentro finalmente anda.",
          specialScene: "uniformeProvocante",
          choices: [
            { id: "s1_taste", tone: "hot", label: "Provar o café da colher dela sem tirar os olhos da boca dela", next: "end_taste" },
            { id: "s1_help", tone: "sweet", label: "Ajudar ela a repor as prateleiras altas do estoque onde ela não alcança", next: "end_help" },
            { id: "s1_boss", tone: "ctrl", label: "Puxar assunto baixo sobre o gerente enquanto ela está relaxada nos bastidores", next: "end_boss" }
          ]
        },
        end_taste: {
          playerBeat: "Você segura o pulso dela suavemente, prova a bebida sem quebrar o contato visual e comenta num sussurro que ficou viciante — e não só pelo café.",
          action: "Ela morde o lábio corada contra a bancada, checando rápido o espelho do salão antes de ficar na ponta dos pés e deixar um beijo rápido no canto da sua boca.",
          speech: "Você é um perigo no meu ambiente de trabalho, sabia?!\n\nGuarda essa energia toda pras cinco da tarde — quando eu bater o ponto, eu nem vou trocar de uniforme antes de subir pro quarto andar.",
          deltas: { heat: 22, arousal: 20, intimacyLevel: 14, affinity: 14, charisma: 2, personaBold: 3, mood: "provocante", specialScene: "uniformeProvocante" },
          memory: { id: "beijo_bastidores_sakura", text: "Dividiram um momento secreto e elétrico atrás do balcão do Café Sakura durante o turno dela.", cat: "quente", perm: true }
        },
        end_help: {
          playerBeat: "Você pega as caixas de xarope e copos e organiza tudo na prateleira mais alta do estoque em dois minutos, tirando o peso do turno das costas dela.",
          action: "Aurora observa você trabalhando sem esforço e depois te dá um abraço apertado no meio das caixas de café, toda agradecida.",
          speech: "Eu passo vinte minutos subindo em banquinho pra fazer o que você resolveu em dois! Obrigada de verdade por aparecer no meio da tarde — você literalmente salvou meu humor hoje.",
          deltas: { affinity: 20, trust: 18, auroraEnergy: 18, discomfort: -14, personaWarm: 3, mood: "alegre" },
          memory: { id: "ajudou_estoque_sakura", text: "Ajudou a Aurora a organizar as prateleiras altas do estoque do Café Sakura no meio do expediente.", cat: "bom", perm: true }
        },
        end_boss: {
          playerBeat: "Você encosta na bancada falando baixo com cumplicidade: — Esse gerente te explora demais nesse turno. Aposto que você já teve vontade de falar umas boas verdades sobre ele.",
          action: "Ela solta um riso indignado e mostra sem pensar um áudio salvo no celular onde desabafa tudo sem filtro sobre o chefe.",
          speech: "Nem me fala!! Olha esse áudio que eu gravei ontem no intervalo pra não explodir na frente de cliente... Se esse homem sonhar que isso existe eu tô na rua! Guarda segredo, viu?",
          deltas: { composure: -20, influence: 16, trust: 6, perception: 2, personaCold: 2, mood: "espontanea" },
          unlockSecretId: "audio_fofoca_cafe"
        }
      }
    },

    {
      id: "gate_praca_fds_calma",
      title: "Passeio sem pressa sob as cerejeiras no fim de semana",
      badge: "Praça · Sáb/Dom · Calma 60+ · Afinidade 35+",
      tone: "sweet",
      costMins: 40,
      locations: ["praca_cerejeiras"],
      locLabel: "Na Praça das Cerejeiras",
      requireAurora: "awake",
      timeCheck: (s) => AG.isWeekend(s.day),
      timeLabel: "Fim de semana (Sáb/Dom)",
      minCalm: 60,
      minAffinity: 35,
      minTrust: 30,
      steps: {
        start: {
          playerBeat: "Vocês fogem do barulho da avenida e sentam num banco de madeira sob as árvores. Sem celular na mão, você divide um silêncio confortável com ela enquanto o vento solta algumas pétalas na calçada.",
          action: "Aurora balança os pés que mal encostam no chão do banco alto e encosta o ombro no seu braço, com uma expressão muito mais serena e verdadeira do que dentro do prédio.",
          speech: "Posso te contar uma coisa que quase ninguém sabe? Quando eu saí de casa pra morar sozinha no 404, eu morria de medo de ninguém me levar a sério — por ser nova, por ter 1,49m, por viver de arte e café.\n\nPor isso eu criei essa casca de marrenta que responde tudo na hora. Só que aqui fora, sentada do seu lado... eu não sinto vontade nenhuma de vestir armadura.",
          specialScene: "chamego",
          choices: [
            { id: "s1_embrace", tone: "sweet", label: "Passar o braço pelos ombros dela e dizer o quanto você admira a coragem dela", next: "end_embrace" },
            { id: "s1_future", tone: "sweet", label: "Perguntar onde ela se imagina daqui a um ano — e se há espaço pra você lá", next: "end_future" },
            { id: "s1_playful", tone: "hot", label: "Sorrir e dizer que ela pode largar a armadura — menos o jeito provocante que você adora", next: "end_playful" }
          ]
        },
        end_embrace: {
          playerBeat: "Você puxa ela devagar pro seu lado, envolvendo os ombros pequenos dela. — Você se virou sozinha, paga suas contas, cria coisa linda e ainda tem energia pra dominar um andar inteiro. Não tem nada de pequeno em quem você é, Aurora.",
          action: "Os olhos dela brilham de emoção sincera e ela entrelaça os dedos nos seus, apoiando a cabeça no seu peito enquanto o sol cai.",
          speech: "Acho que eu esperei a vida inteira pra ouvir alguém falar isso de mim sem rir nem diminuir nada...\n\nObrigada por existir na porta ao lado da minha. Esse fim de semana já virou uma das minhas memórias favoritas da vida.",
          deltas: { affinity: 24, trust: 24, intimacyLevel: 18, vulnerability: 22, mentalStability: 20, traumaLevel: -15, personaWarm: 5, mood: "emocionada", specialScene: "chamego" },
          memory: { id: "confissao_praca_cerejeiras", text: "Num fim de semana tranquilo na Praça das Cerejeiras, ela abriu a história de vida dela sem nenhuma armadura.", cat: "bom", perm: true }
        },
        end_future: {
          playerBeat: "Você olha para o caminho de árvores à frente e depois para ela: — E daqui a um ano, quando os seus projetos decolarem... o cara do 402 ainda vai estar por perto pra pegar as canecas no alto?",
          action: "Ela solta um sorriso tão aberto que chega a fechar os olhos, apertando sua mão contra o peito.",
          speech: "Se depender de mim, daqui a um ano a gente nem vai precisar de dois apartamentos separados pra dividir café de manhã...\n\nEita, falei alto demais! Mas não vou retirar uma única palavra.",
          deltas: { affinity: 22, trust: 20, intimacyLevel: 20, heat: 10, personaWarm: 4, mood: "euforica", specialScene: "chamego" },
          memory: { id: "planos_futuro_praca", text: "Na Praça das Cerejeiras, ela admitiu rindo que imagina um futuro morando junto com você.", cat: "bom", perm: true }
        },
        end_playful: {
          playerBeat: "Você dá um sorriso cúmplice e encosta a testa de leve na dela. — Pode aposentar a armadura comigo à vontade — só não aposenta esse olhar abusado de baixo pra cima, porque eu já fiquei viciado nele.",
          action: "Ela cai na risada corada e puxa o seu rosto pra perto num gesto espontâneo e cheio de química.",
          speech: "Pode ficar tranquilo que provocação pra você não vai faltar nunca! Agora vamos voltar pro quarto andar antes que eu perca a vergonha aqui no meio da praça.",
          deltas: { affinity: 18, heat: 18, intimacyLevel: 14, arousal: 14, personaBold: 3, mood: "dengosa" }
        }
      }
    },

    {
      id: "gate_infiltracao_mestre_404",
      title: "Ler com precisão o caderno secreto dela sem deixar um único vestígio",
      badge: "Furtividade 20+ · Percepção 18+ · 404 Vazio/Dormindo",
      tone: "ctrl",
      costMins: 25,
      locations: ["ape_404"],
      locLabel: "No Apê 404",
      requireAurora: "empty_or_sleep",
      minStealth: 20,
      minPerception: 18,
      steps: {
        start: {
          playerBeat: "Com os movimentos treinados e atenção a cada milímetro de posição dos objetos na escrivaninha, você abre o caderno de capa dura exatamente na página marcada pelo marcador rosa, tomando cuidado até com o ângulo da lombada.",
          action: "Nas últimas folhas, além de anotações íntimas sobre boletos e inseguranças, há três retratos surpreendentemente detalhados — e todos eles são de você visto de baixo pra cima no corredor do quarto andar, com pequenas notas nas margens.",
          speech: "(Anotação na margem do caderno): 'Não acredito que desenhei o 402 de novo às 2h da manhã. Ele acha que eu não percebo quando me estuda — mas eu sinto cada olhar dele em mim. Se ele achar esse caderno eu sumo do mapa.'",
          choices: [
            { id: "s1_photo", tone: "ctrl", label: "Registrar em silêncio pro seu Dossiê e devolver tudo na posição exata (0% Suspeita)", next: "end_photo" },
            { id: "s1_note", tone: "hot", label: "Deixar apenas um bilhete curto entre as páginas: 'Você desenha muito bem. — 402'", next: "end_note" },
            { id: "s1_close", tone: "sweet", label: "Fechar o caderno com respeito e guardar o que viu só pra cuidar melhor dela", next: "end_close" }
          ]
        },
        end_photo: {
          playerBeat: "Você guarda o registro criptografado, devolve a caneta e o marcador rosa com precisão milimétrica e sai da mesa sem deixar um fio fora do lugar.",
          action: "Nenhuma pista, nenhum rastro aberto — mas agora você conhece as páginas mais secretas da mente da Aurora.",
          speech: "Operação cirúrgica concluída com 0% de Suspeita. As Páginas Ocultas do Sketchbook agora estão no seu Dossiê.",
          deltas: { influence: 20, stealth: 3, perception: 2, personaCold: 4, personaRuthless: 2 },
          unlockSecretId: "rascunho_secreto_sketch"
        },
        end_note: {
          playerBeat: "Você rabisca uma única frase num pedaço limpo de papel, encaixa no marcador rosa e fecha o caderno com um meio sorriso.",
          action: "Quando ela abrir aquelas páginas hoje à noite, o coração dela vai disparar entre vergonha absoluta e pura adrenalina.",
          speech: "Você plantou uma bomba psicológica e romântica no caderno dela — ela vai vir atrás de você assim que descobrir.",
          deltas: { rivalry: 18, heat: 18, influence: 16, composure: -24, stealth: 2, personaBold: 4 },
          memory: { id: "bilhete_sketchbook_404", text: "Descobriu os desenhos secretos que ela fazia de você e deixou um bilhete audacioso dentro do caderno.", cat: "intenso", perm: true }
        },
        end_close: {
          playerBeat: "Você fecha a capa devagar com cuidado e decide não usar a vulnerabilidade dela como arma — saber o quanto ela se importa já é mais do que suficiente.",
          action: "Você sai da escrivaninha com a mente tranquila e uma compreensão muito mais profunda de quem ela realmente é.",
          speech: "Sem fotos, sem chantagem. Você guardou a descoberta apenas como compreensão silenciosa sobre a Aurora.",
          deltas: { calm: 14, perception: 3, trust: 10, affinity: 8, personaWarm: 4 }
        }
      }
    },

    {
      id: "gate_sextou_rivalidade",
      title: "Verdade ou Desafio de alto nível no quarto andar",
      badge: "Sex/Sáb 20h–03h · Lábia 20+ · Rivalidade 35+",
      tone: "hot",
      costMins: 35,
      locations: ["ape_404", "ape_402"],
      locLabel: "No Apê 404 ou 402",
      requireAurora: "awake",
      timeCheck: (s) => (AG.getWeekdayName(s.day) === "Sex" || AG.getWeekdayName(s.day) === "Sáb") && (s.hour >= 20 || s.hour <= 3),
      timeLabel: "Sexta ou Sábado à noite (20h–03h)",
      minCharisma: 20,
      minRivalry: 35,
      minHeat: 35,
      steps: {
        start: {
          playerBeat: "Você coloca dois copos sobre a mesa baixa e lança o olhar de desafio que ela nunca recusa. — Sexta ou sábado à noite no quarto andar não foi feito pra papo morno. Três rodadas de Verdade ou Desafio: quem recuar primeiro faz tudo o que o outro mandar amanhã.",
          action: "Os olhos da Aurora acendem no mesmo segundo; ela puxa as pernas pro sofá e se inclina pra frente com um sorriso perigoso.",
          speech: "Você teve coragem de propor isso justo pra mim?! Fechado — e já aviso que eu não recuo de nada.\n\nPrimeira rodada é minha: confessa agora, olhando na minha cara, se você já imaginou o que aconteceria se a porta do 404 trancasse com a gente aqui dentro sem hora pra abrir.",
          specialScene: "paredeCorredor",
          choices: [
            { id: "s1_truth", tone: "hot", label: "Responder com sinceridade desarmante e devolver um desafio cara a cara", next: "end_truth" },
            { id: "s1_dare", tone: "ctrl", label: "Dobrar a aposta: 'Pula a conversa — desafio você a ficar dez segundos perto da minha boca sem piscar'", next: "end_dare" },
            { id: "s1_deep", tone: "sweet", label: "Responder olhando fundo e perguntar qual é o maior desejo real dela com você", next: "end_deep" }
          ]
        },
        end_truth: {
          playerBeat: "— Mais vezes do que seria saudável admitir — você responde sem vacilar um segundo. — Agora minha vez: chega aqui e me diz no ouvido por que você nunca tranca a porta quando sabe que sou eu no corredor.",
          action: "Ela engole em seco, mas o orgulho competitivo fala mais alto — ela atravessa o espaço no sofá, apoia as mãos nos seus ombros e sussurra bem perto do seu rosto.",
          speech: "Porque desde a primeira semana a melhor parte da minha noite é ouvir a sua batida na porta... pronto, falei!\n\nMeu coração tá a duzentos por hora. Isso aqui empatou ou eu acabei de perder pra você de novo?!",
          deltas: { heat: 24, arousal: 22, intimacyLevel: 16, rivalry: 14, influence: 14, charisma: 3, personaBold: 4, mood: "excitada_tensa", specialScene: "noite404" },
          memory: { id: "verdade_desafio_4andar", text: "Jogaram um Verdade ou Desafio eletrizante de madrugada que fez todas as confissões saírem sem filtro.", cat: "quente", perm: true }
        },
        end_dare: {
          playerBeat: "Você se inclina devagar, os olhos cravados nos dela. — Dez segundos, dois centímetros de distância, sem desviar o olhar e sem recuar. Se você piscar ou afastar, a aposta é minha.",
          action: "Ela aceita o desafio subindo nos joelhos ao seu lado — mas no sexto segundo a respiração dela falha e as mãos pequenas agarram sua camisa.",
          speech: "N-não vale você sorrir desse jeito bem na minha boca!! Cinco... seis... tá bom, eu perdi!! Você joga sujo demais!\n\nAnotado: tô te devendo uma aposta oficial do quarto andar.",
          deltas: { influence: 22, rivalry: 16, heat: 20, composure: -24, dominance: -14, charisma: 3, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" },
          unlockSecretId: "termo_aposta_404"
        },
        end_deep: {
          playerBeat: "Você fala baixo, deixando o tom de competição virar intimidade real: — Já imaginei sim. E não só pelo desejo — mas pela sensação de acordar no dia seguinte com você ainda aqui. Agora me diz o que você realmente quer de nós dois.",
          action: "A expressão desafiadora dela derrete completamente; ela solta o copo e encosta as duas mãos no seu rosto.",
          speech: "Você trapaceou usando sinceridade num jogo de provocação...\n\nEu quero exatamente isso: esse fogo todo de madrugada e essa calma gostosa no dia seguinte. Só com você.",
          deltas: { affinity: 22, intimacyLevel: 20, trust: 18, heat: 16, vulnerability: 18, personaWarm: 4, mood: "entregue", specialScene: "chamego" },
          memory: { id: "pacto_sincero_sextou", text: "Um jogo de provocações de fim de semana terminou numa confissão profunda de entrega mútua.", cat: "bom", perm: true }
        }
      }
    },

    {
      id: "gate_tempestade_intimidade",
      title: "Noite de tempestade: baixar todas as defesas juntos",
      badge: "Chuva · Apê 404/402 · Intimidade 45+ · Confiança 45+",
      tone: "sweet",
      costMins: 40,
      locations: ["ape_404", "ape_402"],
      locLabel: "No Apê 404 ou 402",
      requireAurora: "awake",
      weatherCheck: (s) => s.weather === "chuva_noturna",
      weatherLabel: "Chuva lá fora",
      minIntimacy: 45,
      minTrust: 45,
      steps: {
        start: {
          playerBeat: "Um trovão distante faz o vidro vibrar. Você puxa a manta macia sobre os ombros dos dois no sofá e deixa o som pesado da chuva cobrir o prédio inteiro.",
          action: "Aurora encolhe as pernas contra o seu lado, deitando a cabeça sobre o seu coração com os dedos entrelaçados nos seus, completamente entregue ao abrigo do momento.",
          speech: "Sabe o que me dá mais paz nessa tempestade? É olhar pra porta trancada, ouvir a chuva caindo forte lá fora e sentir você respirando calmo aqui comigo.\n\nAntes de você chegar, noites assim me deixavam pequena de verdade — não só na altura, mas por dentro. Hoje eu me sinto inteira quando tô nos seus braços.",
          specialScene: "noite404",
          choices: [
            { id: "s1_promise", tone: "sweet", label: "Beijar o topo da cabeça dela e dizer que ela nunca mais precisa enfrentar isso sozinha", next: "end_promise" },
            { id: "s1_warmth", tone: "hot", label: "Virar o rosto dela pra você debaixo da manta e aquecer a noite bem devagar", next: "end_warmth" }
          ]
        },
        end_promise: {
          playerBeat: "Você envolve ela inteira com cuidado e fala contra o cabelo dela: — Enquanto você quiser, eu tô aqui. Tempestade lá fora não entra onde a gente tá.",
          action: "Ela aperta o abraço com toda a força dos braços pequenos, com os olhos marejados de gratidão e paz.",
          speech: "Fica comigo até amanhecer hoje... não quero largar você por nada.\n\nVocê virou a minha casa nesse prédio, 402.",
          deltas: { affinity: 26, trust: 26, intimacyLevel: 22, vulnerability: 24, mentalStability: 24, traumaLevel: -20, auroraDarkness: -16, personaWarm: 5, mood: "entregue", specialScene: "chamego" },
          memory: { id: "abrigo_tempestade_404", text: "Durante uma tempestade forte, prometeram ser o abrigo um do outro e dormiram abraçados.", cat: "bom", perm: true }
        },
        end_warmth: {
          playerBeat: "Você desliza os dedos pelo rosto dela devagar, olhando fundo nos olhos dela enquanto o som da chuva abafa qualquer outro ruído do prédio.",
          action: "Ela suspira contra os seus lábios, guiando sua mão pela cintura dela sob a manta quente.",
          speech: "Não precisa ter pressa nenhuma hoje... a chuva vai durar a madrugada inteira e eu sou toda sua nesse silêncio.",
          deltas: { intimacyLevel: 24, heat: 22, arousal: 22, affinity: 18, trust: 16, personaWarm: 3, personaBold: 3, mood: "entregue", specialScene: "noite404" },
          memory: { id: "noite_quente_tempestade", text: "Uma noite de tempestade sob a mesma manta transformou intimidade e desejo numa conexão inesquecível.", cat: "quente", perm: true }
        }
      }
    },

    {
      id: "gate_xadrez_sombrio",
      title: "Enfrentar a Aurora Sombria de igual pra igual",
      badge: "Espiral Sombria 35+ · Percepção 20+ · Influência 40+",
      tone: "risky",
      costMins: 30,
      requireAurora: "awake",
      minDarkness: 35,
      minPerception: 20,
      minInfluence: 40,
      steps: {
        start: {
          playerBeat: "Você fecha a porta atrás de você, apoia as mãos nos bolsos e encara o olhar frio e afiado que substituiu o antigo riso leve dela. — Chega de teatro nos corredores, Aurora. Eu sei exatamente o jogo que você começou a jogar contra mim.",
          action: "Em vez de negar, ela abre um sorriso lento, perigoso e hipnotizante — a baixinha caótica deu lugar a uma estrategista que conhece todas as suas fraquezas.",
          speech: "Finalmente o grande estrategista do 402 resolveu parar de fingir que não percebeu!\n\nVocê me ensinou direitinho como se lê pessoas, como se vira a mesa e como se usa o silêncio como arma. A única coisa que você não previu é que eu aprendo muito mais rápido do que você. E agora: vai tentar me deter, vai me resgatar... ou vai admitir que adora essa versão minha?",
          specialScene: "controle",
          choices: [
            { id: "s1_pact", tone: "risky", label: "Sorrir de volta e selar um pacto sombrio de iguais contra o resto do mundo", next: "end_pact" },
            { id: "s1_rescue", tone: "sweet", label: "Largar a postura fria, assumir sua culpa e puxar ela de volta dessa espiral", next: "end_rescue" },
            { id: "s1_outsmart", tone: "ctrl", label: "Expor a única brecha que ela esqueceu no plano dela e retomar o comando", next: "end_outsmart" }
          ]
        },
        end_pact: {
          playerBeat: "Você dá um passo à frente até ficarem cara a cara, sem medo algum. — Eu não quero te deter, Aurora. Ninguém nesse prédio entende a nossa cabeça. Se a gente parar de mirar um no outro e jogar juntos, ninguém segura o quarto andar.",
          action: "Os olhos dela brilham com fascínio sombrio; ela segura sua gola puxando você até a altura dela.",
          speech: "Eu sabia que você tinha coragem de encarar o abismo comigo...\n\nFechado. Dois jogadores frios, um pacto só nosso. E quem mexer com qualquer um de nós dois vai se arrepender.",
          deltas: { auroraDarkness: 18, influence: 18, rivalry: 16, heat: 20, intimacyLevel: 14, personaRuthless: 5, mood: "corrompida_fria", specialScene: "controle" },
          memory: { id: "pacto_sombrio_iguais", text: "Encarou a versão sombria da Aurora sem recuar e selaram um pacto perigoso de cumplicidade.", cat: "controle", perm: true }
        },
        end_rescue: {
          playerBeat: "Você tira as mãos dos bolsos, baixa os ombros e fala sem nenhuma máscara: — Eu puxei você pra essa frieza com os meus jogos. Essa não precisa ser quem você vira, Aurora. Para tudo comigo agora — vamos sair dessa espiral antes que sobre só mágoa.",
          action: "O sorriso frio dela vacila, os olhos piscam rápido e a respiração denuncia a dor que estava escondida atrás da vingança.",
          speech: "...Você jura que não é só mais um golpe pra me fazer baixar a guarda?\n\nEu tava ficando exausta de tentar te odiar e te vencer o tempo inteiro... se você largar as armas comigo agora, eu também largo.",
          deltas: { auroraDarkness: -28, mentalStability: 26, traumaLevel: -16, trust: 20, affinity: 18, discomfort: -22, personaWarm: 5, mood: "emocionada", specialScene: "chamego" },
          memory: { id: "resgatou_espiral_sombria", text: "Assumiu sua parte nos jogos mentais e estendeu a mão para tirar a Aurora da espiral sombria.", cat: "bom", perm: true }
        },
        end_outsmart: {
          playerBeat: "Você cita com calma a contradição exata no contra-ataque dela, provando que já tinha previsto o movimento dois dias antes.",
          action: "Por um segundo inteiro ela fica completamente muda, entre fúria e uma admiração elétrica que não consegue esconder.",
          speech: "...Impossível. Você percebeu até aquele detalhe?!\n\nOk, 402 — hoje o tabuleiro é seu. Mas aproveita, porque esse jogo entre nós dois nunca vai ter paz!",
          deltas: { influence: 24, composure: -28, dominance: -18, rivalry: 18, heat: 16, perception: 3, personaCold: 5, mood: "provocante", specialScene: "paredeCorredor" }
        }
      }
    },

    {
      id: "gate_noite_402_entrega",
      title: "Uma noite no 402: sem pressa, sem máscara",
      badge: "Apê 402 · Noite · Intimidade 55+ · Afinidade 60+",
      tone: "hot",
      costMins: 45,
      locations: ["ape_402"],
      locLabel: "No seu Apê 402",
      requireAurora: "awake",
      timeCheck: (s) => s.hour >= 21 || s.hour <= 4,
      timeLabel: "Noite/Madrugada (21h–04h)",
      minIntimacy: 55,
      minAffinity: 60,
      maxDiscomfort: 25,
      customCheck: (s) => (!s.phoneState || s.phoneState.manipulationCount === 0) && (s.aurora.leveragePressure || 0) < 25,
      customLabel: "Relação livre de chantagem",
      steps: {
        start: {
          playerBeat: "Você apaga a luz forte da sala deixando só o abajur baixo aceso. Aurora já está usando uma camiseta sua que nela vira quase um vestido, os pés descalços dobrados no sofá enquanto ela te observa caminhar na direção dela.",
          action: "Quando você senta ao lado dela, ela desliza direto pro seu colo com naturalidade absoluta, encostando as duas mãos pequenas no seu rosto e olhando nos seus olhos sem pressa nenhuma.",
          speech: "Olha como a sua camiseta fica gigante em mim... e cheira igualzinho ao seu abraço.\n\nA gente já passou por tanta provocação, tanta risada e tanta madrugada nesse andar que estar aqui no seu colo hoje parece a coisa mais certa do mundo. Você me deixa completamente entregue, sabia?",
          specialScene: "noite404",
          choices: [
            { id: "s1_slow", tone: "hot", label: "Beijar ela devagar, guiando o ritmo sem pressa pela noite inteira", next: "end_slow" },
            { id: "s1_tender", tone: "sweet", label: "Acariciar o rosto dela e dizer tudo o que ela mudou na sua vida desde o primeiro dia", next: "end_tender" }
          ]
        },
        end_slow: {
          playerBeat: "Você firma as mãos na cintura dela, trazendo ela ainda mais perto enquanto os lábios de vocês se encontram num ritmo lento, profundo e sem nenhum resto de pressa ou defesa.",
          action: "Ela suspira contra a sua boca envolvendo o seu pescoço, o contraste pequeno e quente do corpo dela encaixando perfeitamente contra o seu enquanto a madrugada avança lá fora.",
          speech: "Fica exatamente assim comigo... não solta minhas mãos hoje. Você é tudo o que eu nem sabia que tava procurando quando mudei pro 404.",
          deltas: { intimacyLevel: 24, affinity: 22, heat: 24, arousal: 24, trust: 20, desire: -35, calm: 18, personaWarm: 3, personaBold: 3, mood: "entregue", specialScene: "nsfw1" },
          memory: { id: "noite_entrega_402", text: "Viveram uma noite longa e inesquecível de entrega completa no seu Apê 402.", cat: "quente", perm: true }
        },
        end_tender: {
          playerBeat: "Você encosta a testa na dela, segurando a nuca dela com delicadeza: — No primeiro dia eu achei que ia só consertar um cabo de rede no corredor. Não fazia ideia de que ia encontrar a pessoa com quem eu quero dividir todas as minhas noites.",
          action: "Ela sorri com os olhos marejados, beija sua bochecha, seu queixo e por fim sua boca devagar, acomodando-se no seu peito.",
          speech: "A minha história favorita do mundo inteiro começou às 23h15 com um banquinho dobrável e um vizinho alto demais...\n\nDorme comigo aqui hoje. Amanhã a gente resolve o resto do mundo.",
          deltas: { intimacyLevel: 24, affinity: 26, trust: 26, vulnerability: 24, mentalStability: 22, calm: 22, personaWarm: 5, mood: "entregue", specialScene: "chamego" },
          memory: { id: "declaracao_noite_402", text: "Trocaram juras sinceras de madrugada no Apê 402 com ela vestindo sua camiseta.", cat: "bom", perm: true }
        }
      }
    },

    {
      id: "gate_mercadinho_3am",
      title: "Lámen quente na calçada do Mercadinho 24h às duas da manhã",
      badge: "Mercadinho 24h · Madrugada (00h–05h) · Percepção 15+",
      tone: "sweet",
      costMins: 30,
      locations: ["mercadinho_24h"],
      locLabel: "No Mercadinho 24h",
      requireAurora: "awake",
      timeCheck: (s) => s.hour >= 0 && s.hour < 5,
      timeLabel: "Madrugada (00h–05h)",
      minPerception: 15,
      minAffinity: 20,
      steps: {
        start: {
          playerBeat: "Você compra dois copos de lámen instantâneo e um café gelado, puxa a água quente da máquina e chama ela pra sentar no degrau limpo do lado de fora, sob o zumbido azulado da placa 24h.",
          action: "Aurora sopra o vapor do copo usando um moletom largo demais pras mãos dela, rindo do absurdo de estarem jantando na rua no meio da madrugada.",
          speech: "Olha a nossa cara: duas da manhã, rua vazia, luz de mercadinho na testa e comendo lámen de cinco reais como se fosse restaurante caro!\n\nMas quer saber a verdade? Eu me divirto mil vezes mais aqui na calçada com você do que em qualquer rolê arrumadinho.",
          choices: [
            { id: "s1_laugh", tone: "sweet", label: "Dividir a última garfada com ela e rir das histórias absurdas do prédio", next: "end_laugh" },
            { id: "s1_jacket", tone: "hot", label: "Colocar seu casaco sobre os ombros dela e puxar ela pra encostar no seu braço", next: "end_jacket" }
          ]
        },
        end_laugh: {
          playerBeat: "Você acompanha as imitações dela do síndico e dos vizinhos até os dois estarem rindo alto no meio da rua vazia.",
          action: "Ela limpa o canto do olho de tanto rir e apoia o queixo no seu ombro, o copo já vazio no colo.",
          speech: "Faz tempo que eu não ria até doer a barriga assim... obrigada por topar minhas ideias tortas de madrugada, 402.",
          deltas: { affinity: 18, trust: 16, satiety: 28, calm: 16, auroraEnergy: 12, personaWarm: 3, mood: "euforica" },
          memory: { id: "lamen_madrugada_24h", text: "Comeram lámen quente rindo na calçada do Mercadinho 24h de madrugada.", cat: "bom", perm: true }
        },
        end_jacket: {
          playerBeat: "Notando o vento frio da madrugada arrepiar os braços dela, você tira seu casaco e envolve ela inteira — as mangas passam quase um palmo dos dedos dela.",
          action: "Ela afunda o nariz na gola do seu casaco sentindo seu perfume e olha pra cima completamente corada.",
          speech: "Seu casaco em mim parece uma barraca de camping... mas tá tão quentinho e com o seu cheiro que eu não vou devolver hoje não.\n\nVem, vamos subir pro quarto andar antes que eu pegue no sono aqui mesmo.",
          deltas: { affinity: 20, intimacyLevel: 14, heat: 12, trust: 14, satiety: 22, personaWarm: 4, mood: "dengosa", specialScene: "chamego" }
        }
      }
    },

    {
      id: "gate_dossie_mestre",
      title: "Colocar o Dossiê inteiro sobre a mesa — o lance decisivo",
      badge: "Lábia 22+ · Furtividade 18+ · 2+ Segredos no Dossiê",
      tone: "ctrl",
      costMins: 30,
      requireAurora: "awake",
      minCharisma: 22,
      minStealth: 18,
      minHeldSecrets: 2,
      steps: {
        start: {
          playerBeat: "Você coloca o celular virado para cima sobre a mesa entre vocês — sem gritar, sem pressa, com a calma absoluta de quem detém todas as cartas do quarto andar. — Antes da gente continuar qualquer jogo, eu queria que você visse o quanto eu realmente sei sobre você, Aurora.",
          action: "Os olhos dela percorrem rapidamente a lista de segredos que você reuniu; a cor some do rosto dela por três segundos inteiros antes de ela erguer o olhar misturando choque e respeito tenso.",
          speech: "Você... conseguiu juntar tudo isso sem eu nem perceber metade?!\n\nTá bom, você venceu o xadrez. Eu tô completamente na sua mão agora — então para de rodeio e me diz o que você vai fazer com isso.",
          specialScene: "manipulada",
          choices: [
            { id: "s1_burn_all", tone: "sweet", label: "Selecionar tudo e apagar permanentemente na frente dela: 'Nada. Eu só queria que você confiasse em mim'", next: "end_burn_all" },
            { id: "s1_pact_power", tone: "ctrl", label: "Guardar o celular e propor uma trégua onde ninguém nunca mais esconde nada do outro", next: "end_pact_power" },
            { id: "s1_leverage", tone: "risky", label: "Deixar claro que o arquivo continua salvo — e que agora as regras do 4º andar são suas", next: "end_leverage" }
          ]
        },
        end_burn_all: {
          playerBeat: "Diante dos olhos arregalados dela, você apaga cada arquivo, limpa a lixeira e bloqueia o celular. — Pronto. Não existe mais trunfo nenhum. Eu não quero você perto de mim por medo — quero por escolha.",
          action: "Ela fica paralisada por dois segundos, depois se joga nos seus braços com a voz embargada e o coração disparado contra o seu peito.",
          speech: "Você tinha poder pra acabar comigo e apagou tudo na minha frente sem pedir nada?!\n\nMeu Deus... eu nunca vou esquecer esse gesto enquanto eu viver. Toda a minha confiança é sua agora.",
          burnAllSecrets: true,
          deltas: { affinity: 30, trust: 35, intimacyLevel: 20, discomfort: -35, suspicion: -40, leveragePressure: -100, composure: -25, mentalStability: 20, personaWarm: 6, mood: "emocionada", specialScene: "chamego" },
          memory: { id: "queimou_dossie_inteiro", text: "Mostrou que sabia de tudo — e apagou o Dossiê inteiro diante dela para conquistar sua confiança absoluta.", cat: "bom", perm: true }
        },
        end_pact_power: {
          playerBeat: "Você bloqueia o celular com calma. — Eu não vou expor nada seu. Em troca, acabou o teatro entre nós dois: sem mentira, sem armadilha e sem joguinho escondido. Combinado?",
          action: "Ela respira fundo, recupera o prumo e estende a mão pequena com um olhar sério e eletrizante.",
          speech: "Combinado. Você joga num nível absurdo, 402 — prefiro mil vezes ter você como aliado do que como adversário.",
          deltas: { influence: 24, trust: 16, rivalry: 14, heat: 14, suspicion: -20, charisma: 3, personaCold: 4, mood: "provocante" }
        },
        end_leverage: {
          playerBeat: "Você desliza o celular de volta no bolso sem perder o olhar firme. — Isso fica trancado enquanto você jogar no meu ritmo. Nada sai daqui — desde que você lembre quem realmente dá as cartas entre o 402 e o 404.",
          action: "Ela engole em seco, os olhos brilhando entre indignação, medo e uma tensão perigosa que muda a dinâmica de vocês.",
          speech: "...Você é muito mais frio do que eu pensei. Tá bom, você ganhou essa mão — mas cuidado quando virar as costas, porque eu nunca esqueço quem me encurrala.",
          deltas: { influence: 28, leveragePressure: 32, dominance: -24, auroraDarkness: 22, discomfort: 24, affinity: -14, personaRuthless: 6, mood: "manipulada", specialScene: "manipulada" },
          memory: { id: "ultimato_dossie_mestre", text: "Mostrou o Dossiê completo e impôs suas regras sobre o quarto andar com frieza cirúrgica.", cat: "controle", perm: true }
        }
      }
    },

    {
      id: "gate_resgate_emocional",
      title: "Conversa de resgate quando o peso emocional dela transborda",
      badge: "Calma 65+ · Confiança 35+ · Estabilidade Dela ≤ 65 ou Vulnerável",
      tone: "sweet",
      costMins: 35,
      requireAurora: "awake",
      minCalm: 65,
      minTrust: 35,
      customCheck: (s) => (s.aurora.mentalStability !== undefined ? s.aurora.mentalStability : 82) <= 65 || (AG.EmotionEngine && AG.EmotionEngine.getMoodFamily(s.aurora.mood) === "vulneravel"),
      customLabel: "Aurora abalada ou vulnerável",
      steps: {
        start: {
          playerBeat: "Você percebe que ela está segurando o cansaço emocional no limite. Em vez de insistir em assunto leve, você traz um copo de água, senta ao lado dela sem invadir o espaço e fala baixo: — Você não precisa parecer forte agora. Pode desabar um pouco que eu seguro a barra com você.",
          action: "Por um segundo ela tenta rir pra disfarçar, mas a voz falha — ela cobre o rosto com as mãos pequenas e deixa o peso dos últimos dias sair de verdade.",
          speech: "Desculpa... eu odeio que me vejam assim toda quebrada. Parece que às vezes tudo acumula de uma vez — pressão, medo, a minha própria cabeça me sabotando — e eu não sei mais como desligar esse barulho.\n\nObrigada por não sair correndo quando eu fico difícil de lidar.",
          specialScene: "chamego",
          choices: [
            { id: "s1_hold", tone: "sweet", label: "Abraçar ela firme em silêncio e ficar ali até a respiração dela voltar ao normal", next: "end_hold" },
            { id: "s1_talk", tone: "sweet", label: "Ajudar ela a colocar cada preocupação no papel e resolver uma por uma com calma", next: "end_talk" }
          ]
        },
        end_hold: {
          playerBeat: "Você envolve ela com cuidado, apoiando a cabeça dela no seu ombro e deixando o silêncio seguro fazer o trabalho enquanto você faz cafuné devagar.",
          action: "Aos poucos a respiração dela desacelera no ritmo da sua; ela limpa o rosto na manga e olha pra cima com uma calma renovada.",
          speech: "Só de ficar no seu abraço parece que metade do peso sumiu das minhas costas...\n\nEu tô muito melhor agora. De verdade. Obrigada por ser o meu chão quando tudo gira.",
          deltas: { mentalStability: 32, traumaLevel: -22, auroraDarkness: -20, affinity: 22, trust: 26, vulnerability: 22, discomfort: -20, personaWarm: 5, mood: "emocionada", specialScene: "chamego" },
          memory: { id: "resgate_emocional_profundo", text: "Segurou a barra dela com calma e carinho numa hora difícil, devolvendo a paz emocional dela.", cat: "bom", perm: true }
        },
        end_talk: {
          playerBeat: "Você pega um bloco e escuta cada coisa que estava travando a mente dela, separando o que tem solução hoje do que pode esperar até amanhã.",
          action: "Vendo o caos da cabeça dela virar três linhas simples no papel, ela solta um suspiro aliviado e sorri fraco pra você.",
          speech: "Quando você organiza tudo com essa calma parece até fácil respirar de novo...\n\nQue sorte absurda a minha ter você na porta ao lado.",
          deltas: { mentalStability: 30, traumaLevel: -18, auroraDarkness: -16, trust: 24, affinity: 18, calm: 10, personaWarm: 4, mood: "alegre" }
        }
      }
    },

    {
      id: "gate_reversao_rainha",
      title: "Virar a mesa bem quando a Rainha do 404 acha que venceu",
      badge: "Lábia 20+ · Influência 50+ · Controle Dela 45+",
      tone: "hot",
      costMins: 30,
      locations: ["ape_404", "ape_402"],
      locLabel: "No Apê 404 ou 402",
      requireAurora: "awake",
      minCharisma: 20,
      minInfluence: 50,
      minDominance: 45,
      steps: {
        start: {
          playerBeat: "Quando ela segura sua gola com aquele sorriso vitorioso de dona do quarto andar, você não obedece nem recua — apenas segura os dois pulsos dela com firmeza suave e gira a posição devagar até as costas dela encostarem na parede.",
          action: "Os olhos da Aurora arregalam numa mistura imediata de choque e pura eletricidade; pela primeira vez, quem fica sem fala olhando de baixo pra cima é ela.",
          speech: "E-espera aí!! Quem te deu permissão pra virar o jogo desse jeito?!\n\n...Ai meu Deus, meu coração parou de bater por dois segundos. Você ficou esse tempo todo me deixando achar que eu mandava só pra fazer isso agora, né seu cretino?!",
          specialScene: "paredeCorredor",
          choices: [
            { id: "s1_claim", tone: "hot", label: "Sorrir perto dos lábios dela: 'A gente pode dividir a coroa — ou você pode admitir quem tá sem ar agora'", next: "end_claim" },
            { id: "s1_tease_release", tone: "ctrl", label: "Soltar os pulsos dela devagar e dar um passo atrás: 'Só queria te lembrar que eu escolho ficar'", next: "end_tease_release" }
          ]
        },
        end_claim: {
          playerBeat: "Você mantém a voz baixa bem perto da boca dela, sentindo os dedos dela fecharem na sua camisa em rendição elétrica.",
          action: "Ela morde o lábio inferior soltando um sorriso rendido e apaixonado, sem a menor vontade de escapar.",
          speech: "Tá bom... hoje você me desmontou por inteiro. Mas não acha que eu vou facilitar na próxima rodada não, porque agora eu tô ainda mais louca por você!",
          deltas: { heat: 26, arousal: 24, influence: 18, dominance: -16, intimacyLevel: 16, rivalry: 14, charisma: 3, personaBold: 4, mood: "excitada_tensa", specialScene: "paredeCorredor" },
          memory: { id: "reversao_rainha_404", text: "Virou o jogo de poder com charme e firmeza bem no auge da pose dominadora da Rainha do 404.", cat: "quente", perm: true }
        },
        end_tease_release: {
          playerBeat: "Você libera as mãos dela com delicadeza e dá meio passo atrás com um sorriso calmo. — Eu deixo você mandar no quarto andar porque eu gosto de ver esse seu brilho — mas nunca esquece que eu tô aqui por escolha própria.",
          action: "Ela fica encostada na parede te olhando com um respeito e um desejo completamente novos.",
          speech: "Caraca... essa foi a coisa mais atraente que alguém já me disse na vida. Você oficialmente quebrou minha postura inteira.",
          deltas: { influence: 22, affinity: 18, trust: 16, heat: 18, composure: -24, dominance: -14, personaCold: 3, personaBold: 2, mood: "entregue" }
        }
      }
    },

    {
      id: "gate_corredor_tech_stealth",
      title: "Reconfigurar a caixa do corredor com engenharia de precisão",
      badge: "Corredor · Noite · Código 22+ · Furtividade 18+",
      tone: "ctrl",
      costMins: 25,
      locations: ["corredor_4andar"],
      locLabel: "No Corredor do 4º Andar",
      timeCheck: (s) => (s.hour >= 19 && s.hour <= 23) || (s.hour >= 2 && s.hour <= 3),
      timeLabel: "Noite no prédio (19h–23h ou 02h–03h)",
      minTech: 22,
      minStealth: 18,
      steps: {
        start: {
          playerBeat: "Com o corredor silencioso à noite, você abre a caixa metálica alta com habilidade cirúrgica, sem fazer um único estalo — o switch inteiro do quarto andar está nas suas mãos.",
          action: "Os LEDs piscam silenciosos enquanto você decide exatamente o que vai criar entre o 402 e o 404 nos próximos minutos.",
          speech: "Com seu domínio de Código e Furtividade, você pode melhorar permanentemente a conexão do 404 em segredo ou acionar uma meia-luz controlada no corredor pra chamar a Aurora até você.",
          choices: [
            { id: "s1_boost404", tone: "sweet", label: "Otimizar a fibra do 404 em segredo pra internet dela nunca mais cair nas entregas", next: "end_boost404" },
            { id: "s1_dimlight", tone: "hot", label: "Ativar a meia-luz estratégica e esperar a porta do 404 abrir com ela curiosa", next: "end_dimlight" }
          ]
        },
        end_boost404: {
          playerBeat: "Você refaz a crimpagem do cabo dela, prioriza a banda do 404 e fecha a caixa metálica sem deixar um arranhão.",
          action: "Segundos depois a porta do 404 entreabre e Aurora espia pra fora segurando o tablet com os olhos arregalados.",
          speech: "Ei!! Minha velocidade de upload triplicou do nada e eu vi você fechando a caixa alta aí!! Você mexeu pra melhorar minha internet de graça?!\n\nVem cá agora ganhar o seu abraço de agradecimento, seu gênio discreto!",
          deltas: { affinity: 20, trust: 20, tech: 3, stealth: 2, discomfort: -14, personaWarm: 4, mood: "euforica", specialScene: "chamego" },
          setCorridorAurora: true,
          memory: { id: "fibra_otimizada_404", text: "Usou seu domínio técnico na caixa do corredor para turbinar a internet do 404 sem cobrar nada.", cat: "bom", perm: true }
        },
        end_dimlight: {
          playerBeat: "Você aciona o relé de manutenção baixando a luz do corredor pra meia-luz aconchegante e encosta tranquilo na parede esperando o clique da fechadura dela.",
          action: "A porta do 404 abre devagar; Aurora aparece de moletom largo olhando pra meia-luz e logo crava o olhar desconfiado e divertido em você.",
          speech: "Que coincidência curiosa... a luz do corredor cai justo quando o especialista do 402 tá encostado bem debaixo da caixa com esse sorrisinho na cara.\n\nE aí, armou esse clima todo só pra conversar comigo no escuro?",
          deltas: { heat: 18, rivalry: 14, influence: 14, arousal: 12, stealth: 2, tech: 2, personaBold: 3, mood: "provocante", specialScene: "paredeCorredor" },
          setCorridorAurora: true,
          setWeather: "apagao_andar"
        }
      }
    },

    // === 4 NOVAS CENAS PICANTES EXCLUSIVAS POR LOCAL + STATUS (CONSENSUAIS!) ===
    {
      id: "gate_bancada_404_picante",
      title: "Sentar a Aurora na bancada do 404 na altura exata dos seus lábios",
      badge: "Apê 404 · Noite · Clima 40+ · Intimidade 32+",
      tone: "hot",
      costMins: 30,
      locations: ["ape_404"],
      locLabel: "No Apê 404",
      requireAurora: "awake",
      timeCheck: (s) => s.hour >= 19 || s.hour <= 3,
      timeLabel: "Noite/Madrugada (19h–03h)",
      minHeat: 40,
      minIntimacy: 32,
      maxDiscomfort: 32,
      customCheck: (s) => (!s.phoneState || s.phoneState.manipulationCount === 0) && (s.aurora.leveragePressure || 0) < 25,
      customLabel: "Clima totalmente consensual (sem chantagem ativa)",
      steps: {
        start: {
          playerBeat: "Enquanto ela prepara café de costas com o moletom escorregando de um ombro, você chega colado atrás dela, firma as mãos na cintura pequena e a coloca sentada na bancada de mármore, encaixando seu corpo bem entre os joelhos dela.",
          action: "A caneca fica esquecida ao lado da cafeteira. Aurora prende a respiração com as bochechas quentes e envolve sua cintura com as pernas pra puxar você ainda mais perto.",
          speech: "Espera aí... você me botou na bancada só pra não precisar abaixar pra me beijar?!\n\nOlha o que você fez: eu tô exatamente na altura da sua boca agora e meu coração tá batendo tão forte que dá pra ouvir por cima da cafeteira. Continua o que você começou, 402.",
          specialScene: "noite404",
          choices: [
            { id: "s1_neck_kiss", tone: "hot", label: "Descer a boca devagar pela clavícula e pescoço dela segurando firme na cintura", next: "end_neck_kiss" },
            { id: "s1_carry_bed", tone: "hot", label: "Puxar ela pro seu colo ainda beijando e levar direto pra cama do 404", next: "end_carry_bed" },
            { id: "s1_tease_wait", tone: "ctrl", label: "Encostar os lábios quase tocando e provocar até ela implorar pelo beijo", next: "end_tease_wait" }
          ]
        },
        end_neck_kiss: {
          playerBeat: "Você afasta a gola larga do moletom dela devagar e percorre o pescoço e a clavícula com beijos lentos e quentes enquanto as mãos dela seguram sua nuca sem força nenhuma pra resistir.",
          action: "Ela inclina a cabeça pro lado soltando um suspiro longo, completamente entregue ao calor e à pegada firme das suas mãos na cintura dela.",
          speech: "A-aqui na bancada desse jeito eu não aguento... suas mãos tão quentes demais e sua boca no meu pescoço apaga qualquer pensamento meu.\n\nO café esfriou faz tempo — e eu nunca me importei tão pouco com isso.",
          deltas: { heat: 26, arousal: 26, intimacyLevel: 22, affinity: 16, desire: -30, composure: -22, personaBold: 4, mood: "excitada_tensa", specialScene: "nsfw2" },
          memory: { id: "bancada_quente_404", text: "Colocou a Aurora sentada na bancada do 404 na sua altura e deixou o café esfriar entre beijos intensos.", cat: "quente", perm: true }
        },
        end_carry_bed: {
          playerBeat: "Sem soltar o beijo, você desliza as mãos por baixo das coxas dela e a ergue da bancada num movimento seguro, levando ela colada no seu peito direto para os lençóis do 404.",
          action: "Aurora dá um riso ofegante escondendo o rosto no seu pescoço enquanto você a deita com cuidado e fica por cima dela na meia-luz.",
          speech: "Você me carregou da cozinha até a cama sem nem quebrar o beijo?!\n\nPronto: hoje ninguém sai desse quarto tão cedo. Tranca o resto do mundo lá fora e fica inteiro comigo.",
          deltas: { heat: 28, arousal: 24, intimacyLevel: 24, affinity: 18, desire: -45, composure: -24, personaBold: 4, mood: "entregue", specialScene: "nsfw2" },
          memory: { id: "carregou_bancada_cama_404", text: "Carregou a Aurora da bancada até a cama do 404 sem interromper o beijo no meio da noite.", cat: "quente", perm: true }
        },
        end_tease_wait: {
          playerBeat: "Você mantém a boca a milímetros da dela, respirando o mesmo ar sem fechar a distância até ela gemer baixo de impaciência e puxar você pela gola com as duas mãos.",
          action: "O orgulho dela desmancha inteiro num segundo — ela fecha o espaço com um beijo faminto e cheio de faísca.",
          speech: "Você é tortura pura!! Me deixar quase te beijando na bancada e sorrir assim?! Agora aguenta porque você despertou o meu lado sem freio!",
          deltas: { heat: 26, arousal: 28, influence: 16, intimacyLevel: 18, desire: 16, composure: -26, personaBold: 4, mood: "sedutora_ousada", specialScene: "paredeCorredor" }
        }
      }
    },

    {
      id: "gate_estoque_sakura_picante",
      title: "Cinco minutos proibidos no estoque do Café Sakura",
      badge: "Café Sakura · Seg–Sex 12h–17h · Clima 38+ · Lábia 18+",
      tone: "hot",
      costMins: 25,
      locations: ["cafe_sakura"],
      locLabel: "No Café Sakura",
      requireAurora: "awake",
      timeCheck: (s) => !AG.isWeekend(s.day) && s.hour >= 12 && s.hour < 17,
      timeLabel: "Turno útil (Seg–Sex, 12h–17h)",
      minHeat: 38,
      minCharisma: 18,
      maxDiscomfort: 32,
      customCheck: (s) => (!s.phoneState || s.phoneState.manipulationCount === 0) && (s.aurora.leveragePressure || 0) < 25,
      customLabel: "Clima totalmente consensual (sem chantagem ativa)",
      steps: {
        start: {
          playerBeat: "Aproveitando a pausa entre pedidos, você ajuda ela a levar uma caixa de xaropes pro estoque dos fundos. Assim que a porta vaivém fecha atrás de vocês, ela vira rápido ainda de uniforme e avental, com o olhar aceso de adrenalina.",
          action: "O barulho abafado da cafeteria fica do outro lado da porta. Aurora encosta de costas na prateleira de grãos de café, segurando sua camisa pra te puxar pro meio do espaço apertado.",
          speech: "A gente tem literalmente cinco minutos antes da minha colega perceber que eu sumi do balcão...\n\nE você passou a tarde inteira me olhando nesse uniforme com essa cara de quem não presta. Vai desperdiçar esses cinco minutos conversando ou vai aproveitar?",
          specialScene: "uniformeProvocante",
          choices: [
            { id: "s1_apron_kiss", tone: "hot", label: "Segurar o laço do avental dela, puxá-la pra cima e roubar um beijo intenso de tirar o ar", next: "end_apron_kiss" },
            { id: "s1_whisper_after", tone: "hot", label: "Beijar o pescoço dela devagar e prometer o resto assim que o turno acabar às 17h", next: "end_whisper_after" }
          ]
        },
        end_apron_kiss: {
          playerBeat: "Você puxa ela firme pela cintura sobre o avental do uniforme e encosta os lábios nos dela num beijo profundo e silencioso, abafando o riso ofegante dela enquanto o sino da entrada toca lá fora.",
          action: "Com os lábios corados e a respiração descompassada, ela precisa ajeitar o laço do cabelo e o colarinho do uniforme antes de espiar a porta.",
          speech: "Meu Deus... minhas pernas ficaram bambas no meio do expediente!!\n\nComo é que eu vou atender cliente fingindo normalidade agora com o seu gosto na boca?! Hoje à noite você não me escapa nem por decreto!",
          deltas: { heat: 26, arousal: 26, intimacyLevel: 20, affinity: 14, desire: 16, charisma: 2, personaBold: 4, mood: "sedutora_ousada", specialScene: "nsfwUniforme" },
          memory: { id: "estoque_proibido_sakura", text: "Roubaram cinco minutos proibidos e eletrizantes nos fundos do Café Sakura com ela de uniforme.", cat: "quente", perm: true }
        },
        end_whisper_after: {
          playerBeat: "Você desliza os lábios quentes pela pele atrás da orelha dela e sussurra em detalhes o que vai fazer assim que ela tirar o avental no quarto andar, deixando ela elétrica bem antes de voltar pro salão.",
          action: "Aurora morde o lábio tremendo levemente, apertando seus ombros antes de respirar fundo com os olhos faiscando.",
          speech: "Você jogar essa imagem na minha cabeça faltando duas horas pro expediente acabar é crueldade pura...\n\nÀs 17h em ponto eu subo direto pro quarto andar ainda de uniforme. Me espera com a porta destrancada.",
          deltas: { heat: 24, arousal: 28, influence: 14, intimacyLevel: 16, desire: 18, charisma: 2, mood: "excitada_tensa", specialScene: "uniformeProvocante" }
        }
      }
    },

    {
      id: "gate_corredor_quase_flagra",
      title: "Quase flagra no corredor silencioso do 4º andar",
      badge: "Corredor · Noite (21h–03h) · Clima 38+ · Afinidade 30+",
      tone: "hot",
      costMins: 25,
      locations: ["corredor_4andar"],
      locLabel: "No Corredor do 4º Andar",
      requireAurora: "awake",
      timeCheck: (s) => s.hour >= 21 || s.hour <= 3,
      timeLabel: "Noite/Madrugada (21h–03h)",
      minHeat: 38,
      minAffinity: 30,
      maxDiscomfort: 32,
      customCheck: (s) => (!s.phoneState || s.phoneState.manipulationCount === 0) && (s.aurora.leveragePressure || 0) < 25,
      customLabel: "Clima totalmente consensual (sem chantagem ativa)",
      steps: {
        start: {
          playerBeat: "Entre a porta do 402 e a do 404, a conversa baixa vira proximidade demais. Você encosta ela no vão discreto perto da parede e inclina o rosto — exatamente quando a luz do elevador acende subindo pro quarto andar.",
          action: "Aurora arregala os olhos num misto de susto e excitação elétrica, levando a mão pequena ao seu peito mas sem se afastar um centímetro sequer.",
          speech: "O elevador tá parando no quarto andar... se alguém virar essa curva vai ver a gente colado desse jeito na parede!\n\n...Rápido, decide: a gente se esconde no canto escuro ou você me puxa pra dentro agora?!",
          specialScene: "paredeCorredor",
          choices: [
            { id: "s1_hide_corner", tone: "hot", label: "Puxar ela pro recuo escuro da lavanderia e segurar a respiração colados até os passos passarem", next: "end_hide_corner" },
            { id: "s1_pull_402", tone: "hot", label: "Abrir a porta do seu 402 num movimento só e puxar ela pra dentro sem soltar a cintura", next: "end_pull_402" }
          ]
        },
        end_hide_corner: {
          playerBeat: "Você puxa ela pro recuo de sombra ao lado da lavanderia, o corpo dela inteiro pressionado contra o seu enquanto um vizinho atravessa o corredor a três metros de vocês sem notar nada.",
          action: "Quando a porta lá do fundo fecha, Aurora solta o ar quente contra o seu pescoço e ri sem fôlego, os lábios buscando os seus no escuro.",
          speech: "Meu coração quase explodiu no peito quando a luz bateu ali na quina... e você nem piscou me segurando firme no escuro.\n\nNunca mais me olha com essa cara de santo no corredor depois de hoje!",
          deltas: { heat: 26, arousal: 26, intimacyLevel: 18, affinity: 14, desire: 16, stealth: 2, personaBold: 4, mood: "excitada_tensa", specialScene: "paredeCorredor" },
          memory: { id: "quase_flagra_corredor", text: "Se esconderam colados na sombra do corredor enquanto o vizinho passava, rindo e se beijando no escuro.", cat: "quente", perm: true }
        },
        end_pull_402: {
          playerBeat: "Você gira a maçaneta do 402 às cegas, puxa ela pra dentro pela cintura e encosta a porta silenciosamente antes mesmo de o elevador abrir — já prensando ela de costas na madeira do lado de dentro.",
          action: "Aurora ri ofegante com as costas contra a sua porta trancada, envolvendo seu pescoço e te puxando pra baixo sem esperar um segundo.",
          speech: "Por um segundo!! Se você tivesse demorado mais meio passo a gente virava fofoca do prédio inteiro!\n\n...Mas agora a porta tá trancada e ninguém atrapalha mais. Termina o que você começou lá fora.",
          deltas: { heat: 28, arousal: 24, intimacyLevel: 22, affinity: 16, desire: -20, personaBold: 4, mood: "sedutora_ousada", specialScene: "nsfw1" },
          moveTo402WithAurora: true,
          memory: { id: "puxou_402_antes_elevador", text: "Puxou a Aurora do corredor direto pra trás da porta trancada do 402 segundos antes do elevador abrir.", cat: "quente", perm: true }
        }
      }
    },

    {
      id: "gate_noite_uniforme_privado",
      title: "Ela não tirou o uniforme do Café Sakura quando a porta trancou",
      badge: "Apê 404 ou 402 · Noite · Clima 50+ · Intimidade 42+",
      tone: "hot",
      costMins: 40,
      locations: ["ape_404", "ape_402"],
      locLabel: "No Apê 404 ou 402",
      requireAurora: "awake",
      timeCheck: (s) => s.hour >= 19 || s.hour <= 4,
      timeLabel: "Noite/Madrugada (19h–04h)",
      minHeat: 50,
      minIntimacy: 42,
      maxDiscomfort: 28,
      customCheck: (s) => (!s.phoneState || s.phoneState.manipulationCount === 0) && (s.aurora.leveragePressure || 0) < 25,
      customLabel: "Clima totalmente consensual (sem chantagem ativa)",
      steps: {
        start: {
          playerBeat: "Quando você vira pra fechar a cortina, percebe que ela vestiu de novo o uniforme certinho do Café Sakura — mas com o laço frouxo na cintura e um olhar intenso que não tem absolutamente nada de expediente.",
          action: "Aurora gira devagar na meia-luz, apoiando os dedos na sua camisa e olhando de baixo pra cima com um sorriso lento e confiante.",
          speech: "Você passou dias me comendo com os olhos atrás daquele balcão... então resolvi fazer um turno particular só pro morador do 402.\n\nA porta tá trancada, o celular tá no silencioso e o café acabou. O que você vai pedir hoje, Diretor?",
          specialScene: "nsfwUniforme",
          choices: [
            { id: "s1_unbutton_slow", tone: "hot", label: "Desamarrar o laço do avental bem devagar olhando nos olhos dela e puxá-la pra cama", next: "end_unbutton_slow" },
            { id: "s1_aurora_boss", tone: "ctrl", label: "Sentar na poltrona e dizer baixo: 'Hoje eu quero ver você no comando desse turno particular'", next: "end_aurora_boss" }
          ]
        },
        end_unbutton_slow: {
          playerBeat: "Você puxa a ponta do laço do avental com uma mão só, deixando o tecido cair no chão enquanto envolve a cintura dela e a guia devagar até os lençóis, beijando cada centímetro do pescoço até a boca dela sem nenhuma pressa.",
          action: "Aurora se entrega por inteiro ao ritmo quente, as mãos pequenas cravadas nos seus ombros e a respiração misturada à sua enquanto a noite inteira passa longe lá fora.",
          speech: "Eu sabia que você não ia aguentar um minuto me vendo assim...\n\nMelhor turno extra da minha vida inteira. Não sai do meu lado hoje — eu quero cada minuto seu.",
          deltas: { heat: 30, intimacyLevel: 26, affinity: 20, arousal: -20, desire: -55, trust: 16, personaBold: 4, mood: "entregue", specialScene: "nsfwUniforme" },
          memory: { id: "turno_particular_uniforme", text: "Aurora vestiu o uniforme do Café Sakura especialmente para uma noite particular inesquecível a sós com você.", cat: "quente", perm: true }
        },
        end_aurora_boss: {
          playerBeat: "Você se acomoda tranquilo e sustenta o olhar quente dela, deixando ela subir no seu colo e ditar cada movimento, cada beijo e cada pausa como dona absoluta da noite.",
          action: "Os olhos dela brilham com prazer e domínio; ela segura seu rosto com as duas mãos e conduz o beijo no exato ritmo lento e provocante que escolheu.",
          speech: "Adoro quando você me deixa assumir o controle total entre quatro paredes...\n\nAgora relaxa e deixa comigo — prometo que você nunca mais vai olhar pro uniforme do Sakura do mesmo jeito.",
          deltas: { heat: 30, intimacyLevel: 26, dominance: 14, affinity: 18, arousal: -20, desire: -55, personaBold: 3, mood: "sedutora_ousada", specialScene: "nsfwUniforme" },
          memory: { id: "aurora_comandou_uniforme", text: "Deixou a Aurora comandar um turno particular inesquecível de uniforme entre quatro paredes.", cat: "quente", perm: true }
        }
      }
    },

    {
      id: "gate_jantar_luz_velas_404",
      title: "Jantar à luz de velas entre o 402 e o 404 (Noite Exclusiva)",
      badge: "Apê 404 ou 402 · Noite · Intimidade 50+ · Afinidade 45+",
      tone: "sweet",
      costMins: 45,
      locations: ["ape_404", "ape_402"],
      locLabel: "No Apê 404 ou 402",
      requireAurora: "awake",
      timeCheck: (s) => s.hour >= 19 || s.hour <= 2,
      timeLabel: "Noite (19h–02h)",
      minIntimacy: 50,
      minAffinity: 45,
      maxDiscomfort: 25,
      steps: {
        start: {
          playerBeat: "Você apaga a luz branca do teto, acende a vela aromática de cereja sobre a mesa baixa e coloca duas taças lado a lado enquanto a música lenta preenche a sala.",
          action: "Aurora observa a cena inteira com os olhos brilhando, ajeita o cabelo atrás da orelha e senta encostada no seu ombro sem conseguir esconder o sorriso apaixonado.",
          speech: "Você montou um jantar à luz de velas no meio da semana só pra nós dois?! Olha o cheiro maravilhoso que tá nesse apartamento...\n\nA gente já viveu tanta loucura nesse quarto andar, mas momentos calmos assim só comigo e você fazem meu peito transbordar de verdade.",
          specialScene: "noite404",
          choices: [
            { id: "s1_toast_love", tone: "sweet", label: "Erguer a taça olhando nos olhos dela e brindar ao que vocês construíram juntos", next: "end_toast_love" },
            { id: "s1_candle_kiss", tone: "hot", label: "Deixar a taça de lado, puxar ela pro seu colo e transformar o jantar em entrega lenta", next: "end_candle_kiss" }
          ]
        },
        end_toast_love: {
          playerBeat: "Você encosta sua taça na dela com um tilintar suave: — Ao acaso mais improvável do 4º andar — e à mulher que transformou um prédio cinza no meu lugar favorito do mundo.",
          action: "Ela pousa a taça na mesa, segura seu rosto com as duas mãos pequenas e dá um beijo demorado e cheio de ternura.",
          speech: "Pronto, oficialmente chorei de felicidade no meio do jantar... você escreve as melhores cenas da minha vida sem nem precisar de roteiro.\n\nNão vou sair dos seus braços hoje por nada nesse mundo.",
          deltas: { affinity: 26, trust: 22, intimacyLevel: 22, vulnerability: 20, satiety: 35, mentalStability: 20, personaWarm: 5, mood: "entregue", specialScene: "chamego" },
          memory: { id: "jantar_luz_velas_4andar", text: "Preparou um jantar à luz de velas inesquecível que selou a entrega emocional de vocês dois.", cat: "bom", perm: true }
        },
        end_candle_kiss: {
          playerBeat: "Você pousa as duas taças na mesa antes mesmo do primeiro gole, envolve a cintura dela e traz ela pro seu colo à luz tremulante da vela.",
          action: "O aroma de cereja e âmbar toma conta do quarto enquanto Aurora enlaça seu pescoço e suspira contra os seus lábios.",
          speech: "A comida que esfrie... na luz dessa vela e com você me olhando desse jeito, eu só consigo pensar em ficar colada na sua pele.\n\nLeva eu pro quarto, 402 — hoje a noite inteira é só nossa.",
          deltas: { heat: 26, arousal: 24, intimacyLevel: 24, affinity: 18, trust: 16, satiety: 25, personaBold: 4, mood: "excitada_tensa", specialScene: "noite404" },
          memory: { id: "noite_velas_paixao", text: "Um jantar à luz de velas virou uma noite de paixão intensa entre quatro paredes.", cat: "quente", perm: true }
        }
      }
    },

    {
      id: "gate_cafe_fechando_17h",
      title: "Esperar ela fechar o Café Sakura e voltar andando juntos pro 4º andar",
      badge: "Café Sakura · 15h–17h · Afinidade 32+ · Intimidade 25+",
      tone: "sweet",
      costMins: 35,
      locations: ["cafe_sakura"],
      locLabel: "No Café Sakura",
      requireAurora: "awake",
      timeCheck: (s) => !AG.isWeekend(s.day) && s.hour >= 15 && s.hour < 17,
      timeLabel: "Fim do expediente útil (15h–17h)",
      minAffinity: 32,
      minIntimacy: 25,
      steps: {
        start: {
          playerBeat: "Você ajuda a virar a placa da porta para 'Fechado', empilha as últimas cadeiras em dois minutos e espera ela desamarrar o avental atrás do balcão enquanto a tarde cai dourada na rua.",
          action: "Aurora solta o cabelo preso do turno, estica os braços cansados e vem direto encostar a testa no seu peito com um suspiro de alívio.",
          speech: "Sabe qual é a melhor sensação do expediente inteiro? É ver você sentado me esperando na última mesa pra voltar comigo pro prédio.\n\nMinhas pernas tão destruídas de ficar em pé, mas só de te ver aqui parece que o cansaço foi embora pela metade.",
          specialScene: "uniformeProvocante",
          choices: [
            { id: "s1_carry_walk", tone: "sweet", label: "Segurar a mão dela e voltar devagar pela calçada ouvindo tudo sobre o turno", next: "end_carry_walk" },
            { id: "s1_backroom_kiss", tone: "hot", label: "Trancar a porta da frente primeiro e roubar um beijo demorado no salão vazio", next: "end_backroom_kiss" }
          ]
        },
        end_carry_walk: {
          playerBeat: "Você segura a bolsa dela num ombro e entrelaça os dedos nos dela na calçada, acertando o passo largo ao ritmo pequeno dela até chegarem de volta ao quarto andar.",
          action: "Ela caminha balançando as mãos dadas com um sorriso tranquilo que não sai do rosto nem quando entram no elevador.",
          speech: "Todo mundo na rua deve olhar pra nossa diferença de altura e achar a coisa mais fofa do mundo...\n\nObrigada por me buscar hoje. Você faz até segunda-feira cansativa parecer dia especial.",
          deltas: { affinity: 22, trust: 18, intimacyLevel: 16, auroraEnergy: 22, discomfort: -16, personaWarm: 4, mood: "muito_feliz", specialScene: "chamego" },
          memory: { id: "voltou_fechamento_sakura", text: "Ajudou a fechar o Café Sakura no fim do turno e voltaram de mãos dadas para o prédio.", cat: "bom", perm: true }
        },
        end_backroom_kiss: {
          playerBeat: "Você gira a chave na porta de vidro com a placa de 'Fechado' virada pra rua, puxa ela pela cintura ainda de uniforme e apoia ela na borda do balcão deserto.",
          action: "No silêncio quente do café vazio com aroma de baunilha no ar, Aurora enlaça sua cintura com as pernas e corresponde o beijo sem fôlego.",
          speech: "No meio do meu local de trabalho com a luz apagada... você adora me fazer perder o juízo!\n\nAgora vamos subir logo pro quarto andar antes que eu esqueça de desligar a cafeteira!",
          deltas: { heat: 24, arousal: 22, intimacyLevel: 18, affinity: 14, desire: 14, personaBold: 4, mood: "excitada_tensa", specialScene: "uniformeProvocante" },
          memory: { id: "beijo_cafe_fechado", text: "Roubou um beijo inesquecível com ela ainda de uniforme depois de fechar o Café Sakura.", cat: "quente", perm: true }
        }
      }
    },

    {
      id: "gate_praca_fotos_cerejeira",
      title: "Ensaio espontâneo e confissão sob as cerejeiras ao entardecer",
      badge: "Praça · Percepção 16+ · Intimidade 25+",
      tone: "sweet",
      costMins: 35,
      locations: ["praca_cerejeiras"],
      locLabel: "Na Praça das Cerejeiras",
      requireAurora: "awake",
      minPerception: 16,
      minIntimacy: 25,
      steps: {
        start: {
          playerBeat: "A luz alaranjada do fim da tarde atravessa os galhos das cerejeiras. Você aponta a câmera do celular exatamente no segundo em que ela ri sem perceber, capturando o sorriso mais verdadeiro dela.",
          action: "Quando ela vê a foto na sua tela, fica imóvel por dois segundos com as bochechas rosadas, impressionada com o jeito carinhoso como você a enxerga.",
          speech: "Espera... eu realmente fico assim quando tô olhando pra você?! Nunca ninguém tirou uma foto minha em que eu parecesse tão feliz de verdade...\n\nAcho que você tem o superpoder de enxergar a melhor versão de mim, 402.",
          specialScene: "chamego",
          choices: [
            { id: "s1_save_wallpaper", tone: "sweet", label: "Mostrar a tela colocando a foto dela como papel de parede do seu celular", next: "end_save_wallpaper" },
            { id: "s1_lift_photo", tone: "hot", label: "Erguer ela pela cintura sob as pétalas pra tirar uma foto colados rosto com rosto", next: "end_lift_photo" }
          ]
        },
        end_save_wallpaper: {
          playerBeat: "Você salva a imagem na Galeria e vira a tela bloqueada pra ela ver o sorriso dela ocupando o fundo do seu aparelho.",
          action: "Aurora cobre o rosto com as duas mãos morrendo de vergonha boa, depois pula no seu pescoço rindo emocionada.",
          speech: "VOCÊ COLOCOU NO PAPEL DE PAREDE NA MINHA FRENTE?! Ai meu coração, vou derreter aqui no meio da praça!\n\nPronto: agora você é obrigado a me mostrar essa tela todo dia!",
          deltas: { affinity: 24, trust: 20, intimacyLevel: 18, vulnerability: 18, perception: 2, personaWarm: 4, mood: "emocionada", specialScene: "chamego" },
          memory: { id: "foto_papel_parede_praca", text: "Tirou a foto mais espontânea da Aurora sob as cerejeiras e colocou na tela do seu celular.", cat: "bom", perm: true }
        },
        end_lift_photo: {
          playerBeat: "Você coloca o temporizador, firma as mãos na cintura dela e ergue ela até os rostos ficarem na mesma altura bem na hora do clique — virando o rosto pra beijar a bochecha dela no disparo.",
          action: "O clique registra exatamente o riso corado dela agarrada nos seus ombros sob uma chuva fina de pétalas.",
          speech: "HAHAHA essa foto ficou cinematográfica demais!! Me manda agora no chat — e não me coloca no chão ainda porque eu gostei da altura!",
          deltas: { affinity: 20, heat: 18, intimacyLevel: 20, arousal: 14, personaBold: 3, mood: "euforica", specialScene: "levantandoEla" },
          memory: { id: "foto_levantada_cerejeiras", text: "Ergueu a Aurora sob as pétalas de cerejeira para uma foto inesquecível rosto com rosto.", cat: "bom", perm: true }
        }
      }
    },

    {
      id: "gate_chamada_madrugada_402",
      title: "Escutar música no mesmo fone dividindo o sofá do 402 na madrugada",
      badge: "Apê 402 · Madrugada (22h–04h) · Intimidade 32+ · Confiança 30+",
      tone: "hot",
      costMins: 35,
      locations: ["ape_402"],
      locLabel: "No Seu Apê 402",
      requireAurora: "awake",
      timeCheck: (s) => s.hour >= 22 || s.hour <= 4,
      timeLabel: "Noite/Madrugada (22h–04h)",
      minIntimacy: 32,
      minTrust: 30,
      steps: {
        start: {
          playerBeat: "Você passa um lado do fone de ouvido pra ela no sofá do 402 enquanto o resto do prédio dorme. A distância entre as cabeças desaparece no instante em que o fio curto obriga ela a encostar no seu ombro.",
          action: "Com a luz azul suave do monitor ao fundo e o som lo-fi só nos ouvidos de vocês dois, Aurora respira fundo e apoia a mão sobre a sua coxa.",
          speech: "Dividir fone de ouvido de madrugada no seu sofá... parece cena de filme indie só nossa.\n\nSabe o que é perigoso? Quando a música fica lenta assim e eu escuto sua respiração junto do som, eu esqueço completamente a hora de voltar pro 404.",
          specialScene: "noite404",
          choices: [
            { id: "s1_stay_night", tone: "sweet", label: "Dizer baixo que ela não precisa voltar pro 404 hoje — o 402 também é casa dela", next: "end_stay_night" },
            { id: "s1_turn_kiss", tone: "hot", label: "Virar o rosto dela pra você no meio da música e beijar ela devagar no ritmo lento", next: "end_turn_kiss" }
          ]
        },
        end_stay_night: {
          playerBeat: "Você desliza o braço pelos ombros dela e puxa a manta pros dois: — Quem disse que você precisa voltar pro 404 às duas da manhã? Fica aqui comigo.",
          action: "Ela sorri com uma paz rara no rosto, tira o fone devagar e se acomoda inteira no seu abraço.",
          speech: "Você sempre fala exatamente o que faz meu coração descansar...\n\nEntão hoje eu sou moradora oficial do 402 também. Boa noite, meu vizinho favorito.",
          deltas: { affinity: 24, trust: 22, intimacyLevel: 22, vulnerability: 20, mentalStability: 18, calm: 16, personaWarm: 4, mood: "entregue", specialScene: "chamego" },
          memory: { id: "fone_madrugada_402", text: "Dividiram o mesmo fone de ouvido na madrugada do 402 e ela escolheu ficar nos seus braços.", cat: "bom", perm: true }
        },
        end_turn_kiss: {
          playerBeat: "Você segura o queixo dela com delicadeza, deixa o fone escorregar pro sofá e encontra os lábios dela sem pressa enquanto a batida lenta continua tocando baixo.",
          action: "Aurora corresponde com um suspiro longo, passando a perna sobre a sua e mergulhando no beijo com entrega total.",
          speech: "A música sumiu completamente da minha cabeça no segundo em que sua boca encostou na minha...\n\nFecha a cortina do 402 — hoje eu não saio daqui tão cedo.",
          deltas: { heat: 26, arousal: 24, intimacyLevel: 24, affinity: 18, desire: 16, personaBold: 4, mood: "excitada_tensa", specialScene: "nsfw1" },
          memory: { id: "beijo_lofi_madrugada_402", text: "Dividir o mesmo fone na madrugada do 402 terminou num beijo demorado e inesquecível.", cat: "quente", perm: true }
        }
      }
    }
  ];

  // Retorna cenas desbloqueadas e bloqueadas relevantes para o contexto atual
  DD.getContextualGatedScenes = function () {
    const s = AG.state;
    const doneMap = (s.flags && s.flags.completedDeepScenes) || {};
    const unlocked = [];
    const lockedHints = [];

    DD.STATUS_GATED_SCENES.forEach((gate) => {
      const ev = evalGate(gate);
      const alreadyDoneToday = doneMap[gate.id] === s.day;
      if (ev.unlocked && !alreadyDoneToday) {
        unlocked.push({ gate, eval: ev });
      } else if (!ev.unlocked && ev.contextMatches && ev.missing.length <= 3) {
        lockedHints.push({ gate, eval: ev });
      }
    });

    return { unlocked, lockedHints };
  };

  DD.startDeepScene = function (gateId) {
    const gate = DD.STATUS_GATED_SCENES.find((g) => g.id === gateId);
    if (!gate) return;
    const s = AG.state;
    const ev = evalGate(gate);
    if (!ev.unlocked) return;
    if (gate.requireAurora === "awake" && (!AG.isAuroraHere() || s.aurora.activity === "dormindo")) return;
    const step = gate.steps.start;
    if (!step) return;

    AG.playSound(gate.tone === "hot" ? "hot" : gate.tone === "risky" ? "warn" : "heart");
    if (step.specialScene) s.aurora.activeSpecialSceneKey = step.specialScene;

    s.activeConversationNode = null;
    s.activeDeepScene = {
      gateId: gate.id,
      title: gate.title,
      badge: gate.badge,
      stepKey: "start"
    };

    AG.clearFeed();
    AG.pushFeed({
      type: "aurora",
      playerBeat: step.playerBeat,
      action: step.action,
      speech: step.speech,
      subtext: getMoodSubtextCue()
    });
    AG.saveGame("autosave");
  };

  DD.selectDeepSceneChoice = function (choiceId) {
    const s = AG.state;
    const active = s.activeDeepScene;
    if (!active) return;
    const gate = DD.STATUS_GATED_SCENES.find((g) => g.id === active.gateId);
    if (!gate) { s.activeDeepScene = null; return; }
    if (gate.requireAurora === "awake" && (!AG.isAuroraHere() || s.aurora.activity === "dormindo")) {
      s.activeDeepScene = null;
      return;
    }

    const curStep = gate.steps[active.stepKey];
    const ch = curStep && (curStep.choices || []).find((c) => c.id === choiceId);
    if (!ch || !gate.steps[ch.next]) {
      s.activeDeepScene = null;
      return;
    }

    const nextStep = gate.steps[ch.next];
    AG.playSound(ch.tone === "hot" ? "hot" : ch.tone === "risky" ? "warn" : "heart");

    if (nextStep.setCorridorAurora) {
      s.flags.auroraCalledToCorridor = true;
      s.flags.auroraVisitingYourApt = false;
      s.flags.auroraIn404WithPlayer = false;
      AG.refreshAuroraActivity();
    }
    if (nextStep.moveTo402WithAurora) {
      s.flags.auroraVisitingYourApt = true;
      s.flags.auroraCalledToCorridor = false;
      s.flags.auroraIn404WithPlayer = false;
      s.currentLocation = "ape_402";
      AG.refreshAuroraActivity();
    }
    if (nextStep.setWeather) s.weather = nextStep.setWeather;
    if (nextStep.unlockSecretId && AG.unlockSecret) {
      AG.unlockSecret(nextStep.unlockSecretId);
    }
    if (nextStep.extractAnySecret && s.secretsDossier && AG.unlockSecret) {
      const lockedSec = Object.values(s.secretsDossier).find((x) => x.state === "locked");
      if (lockedSec) AG.unlockSecret(lockedSec.id);
    }
    if (nextStep.burnAllSecrets && s.secretsDossier) {
      Object.values(s.secretsDossier).forEach((sec) => {
        if (sec.state === "held") sec.state = "burned_trust";
      });
      if (s.phoneState) {
        s.phoneState.leverage = 0;
        s.phoneState.manipulationCount = 0;
      }
    }

    const pills = nextStep.deltas ? AG.applyDeltas(nextStep.deltas) : [];
    if (nextStep.memory) {
      AG.addMemory(nextStep.memory.id, nextStep.memory.text, nextStep.memory.cat, nextStep.memory.perm);
    }

    AG.clearFeed();
    AG.pushFeed({
      type: "aurora",
      playerBeat: nextStep.playerBeat,
      action: nextStep.action,
      speech: nextStep.speech,
      subtext: getMoodSubtextCue(),
      pills
    });

    if (nextStep.choices && nextStep.choices.length > 0) {
      active.stepKey = ch.next;
      AG.advanceTime(10, { suppressRandom: true, keepSpecialScene: true });
    } else {
      s.flags.completedDeepScenes = s.flags.completedDeepScenes || {};
      s.flags.completedDeepScenes[gate.id] = s.day;
      s.activeDeepScene = null;
      AG.advanceTime(gate.costMins || 25, { suppressRandom: true, keepSpecialScene: true });
    }
    AG.saveGame("autosave");
  };

  DD.getActiveDeepSceneChoices = function () {
    const active = AG.state.activeDeepScene;
    if (!active) return [];
    const gate = DD.STATUS_GATED_SCENES.find((g) => g.id === active.gateId);
    if (!gate) return [];
    const step = gate.steps[active.stepKey];
    return (step && step.choices) || [];
  };

  const FAMILY_REACTION_BEATS = {
    luminosa: [
      "Ela ajeita a manga comprida do moletom ainda sorrindo, sem tentar esconder o quanto o clima leve entre vocês faz bem pra ela. — Gosto de como tudo parece mais simples quando você tá por perto, 402.",
      "Por um momento ela só fica te olhando de baixo pra cima com calma, como quem guarda o instante na memória. — Você tem um talento raro de deixar qualquer hora comum do dia bem melhor.",
      "Ela encosta o ombro de leve no seu braço, claramente sem pressa nenhuma de encerrar o momento. — Fica mais um pouco comigo antes de voltar pras suas coisas."
    ],
    quimica: [
      "O olhar dela demora na sua boca antes de voltar pros seus olhos com uma faísca difícil de ignorar. — Você faz de propósito pra deixar o ar desse quarto andar pesado assim, né?",
      "Ela umedece os lábios devagar e dá meio passo à frente em vez de recuar. — Continua me provocando desse jeito e vai descobrir rápido que eu não fico só nas palavras.",
      "A respiração dela entrega o efeito que você causa, mesmo enquanto ela tenta sustentar o sorriso provocante. — Olha só o estado em que você me deixa com um gesto só."
    ],
    caotica: [
      "Ela gesticula empolgada, a energia elétrica voltando a mil por hora no quarto andar. — Com você entrando na minha frequência assim, é impossível ficar entediada nesse prédio!",
      "Ela solta uma risada espontânea balançando a cabeça. — Sério, a gente tem uns cinco parafusos soltos no máximo entre o 402 e o 404 — e eu não trocaria isso por nada.",
      "Os olhos dela brilham já inventando a próxima ideia torta antes mesmo dessa acabar. — Agora você não escapa mais de acompanhar meu ritmo hoje."
    ],
    vulneravel: [
      "A postura dela cede um pouco mais e ela respira fundo, como quem finalmente se permite baixar o peso dos ombros. — Obrigada por não apressar as coisas comigo hoje.",
      "Os dedos dela apertam de leve o tecido da própria roupa enquanto ela te olha com sinceridade quieta. — Às vezes eu só preciso sentir que tem alguém realmente do meu lado.",
      "Ela desvia o olhar por um instante pra segurar a emoção, mas permanece bem perto de você. — Com você aqui a minha cabeça faz muito menos barulho."
    ],
    conflito: [
      "Ela mantém o queixo erguido e os ombros tensos, deixando claro que não vai engolir nada calada. — Pensa bem no próximo passo antes de testar minha paciência de novo.",
      "O olhar dela continua afiado e desconfiado, medindo se você vai recuar ou dobrar a aposta. — Eu não esqueço fácil quando mexem comigo assim, 402.",
      "Ela solta o ar devagar pelo nariz, segurando a irritação por um fio. — Vamos ver se você sustenta o que tá começando aqui."
    ],
    sombria: [
      "Um sorriso gelado e paciente desenha o rosto dela — o tipo de calma de quem já calculou o próximo movimento. — Interessante... continua jogando suas cartas que eu tô anotando cada uma.",
      "Ela inclina a cabeça te estudando como se você fosse a peça principal do tabuleiro dela. — Você acha mesmo que ainda sabe quem tá no comando entre nós dois?",
      "O silêncio dela depois da frase pesa mais do que qualquer grito; há um brilho perigoso e hipnótico no olhar dela."
    ]
  };

  DD.enrichRawAuroraFeed = function (entry) {
    if (!entry || entry.type !== "aurora" || entry.playerBeat) return entry;
    const s = AG.state;
    const a = s.aurora;
    if (!a || a.activity === "dormindo") return entry;
    const rawSpeech = String(entry.speech || "").trim();
    if (!rawSpeech) return entry;
    const alreadyMulti = rawSpeech.includes("\n\n");
    if (alreadyMulti && rawSpeech.length >= 300) return entry;

    const fam = AG.EmotionEngine ? AG.EmotionEngine.getMoodFamily(a.mood) : "luminosa";
    const extra = DD.pickVariant("raw_fam_" + fam, FAMILY_REACTION_BEATS[fam] || FAMILY_REACTION_BEATS.luminosa);
    const dynExtra = getDynamicDepthBeat("raw_" + fam);
    const ambient = getLocationAmbientPhrase();

    const parts = [rawSpeech];
    if (!alreadyMulti && extra) parts.push(extra);
    if (dynExtra && parts.join("\n\n").length < 360) parts.push(dynExtra);

    return Object.assign({}, entry, {
      action: joinClean(ambient, entry.action),
      speech: parts.join("\n\n"),
      subtext: entry.subtext || getMoodSubtextCue()
    });
  };

  AG.DeepDialogue = DD;
})(window.AuroraGame);
