# 🎀 My Favorite Woman Is Small

> **⚠️ AVISO DE CONTEÚDO ADULTO (+18) — JOGO EXPLICITAMENTE HENTAI / EROGE**
>
> **My Favorite Woman Is Small** (`santni studio / santni productions`, v`8.0.0`) é um **jogo adulto (+18) explicitamente hentai / eroge**, no formato de **Visual Novel Interativa & Simulador de Vida e Relacionamento** para desktop (HTML5 / CSS3 / JavaScript puro + Launcher Windows opcional).
>
> O jogo contém **temas explicitamente eróticos/sexuais (+18)**, sedução, flerte intenso, tensão sexual contínua, **motor interativo de cenas íntimas em 5 etapas** (`Clima` → `Toque` → `Ritmo` → `Ápice` → `Aftercare`), envio de fotos provocantes e exclusivas +18 no smartphone virtual, **12 slots de cenas especiais e ilustrações NSFW** (`midias/cenas_especiais/`) e rotas alternativas que vão do romance doce ao domínio consensual, rivalidade elétrica e thriller psicológico sombrio.
>
> **Regra canônica obrigatória:** Todos os personagens do jogo são **adultos maiores de idade**. A personagem principal, **Aurora**, é uma **mulher adulta de 22 anos** (1,49 m de altura — origem do título *"My Favorite Woman Is Small"*), ilustradora freelancer independente e atendente do Café Sakura, vizinha do protagonista no 4º andar. Todo o conteúdo íntimo 18+ do motor principal exige consentimento livre e sem manipulação ativa.

---

## 📌 Sumário Rápido

1. [O que é o Jogo & Qual é o Objetivo](#-o-que-é-o-jogo--qual-é-o-objetivo)
2. [Como Jogar (Execução Zero-Build)](#-como-jogar-execução-zero-build)
3. [Guia de Contexto para Inteligências Artificiais (AI Handoff)](#-guia-de-contexto-para-inteligências-artificiais-ai-handoff)
4. [Mapa Completo dos Arquivos & Ordem de Carregamento](#-mapa-completo-dos-arquivos--ordem-de-carregamento)
5. [Invariantes Críticas & Regras de Ouro do Código](#-invariantes-críticas--regras-de-ouro-do-código)
6. [Inventário Completo de Sistemas & Features (v8.0.0)](#-inventário-completo-de-sistemas--features-v800)
7. [Os 16 Finais do Jogo](#-os-16-finais-do-jogo)
8. [Estrutura de Mídias, PNGs NSFW, Cenários & Áudio](#-estrutura-de-mídias-pngs-nsfw-cenários--áudio)
9. [Como Validar Alterações (Checklist Técnico)](#-como-validar-alterações-checklist-técnico)

---

## 🎯 O que é o Jogo & Qual é o Objetivo

### Premissa
Você acabou de se mudar para o **Apartamento 402** de um pequeno prédio urbano, trabalhando remotamente como desenvolvedor/freelancer e administrando sua própria energia, saciedade, calma, desejo, finanças e prazo de aluguel.

Do outro lado do corredor, no **Apartamento 404**, mora **Aurora** — uma mulher de **22 anos** e **1,49 m**, artista freelancer de personalidade magnética, afiada, provocante, ciumenta e imprevisível, que trabalha no **Café & Estúdio Sakura** nos turnos da tarde (12h–17h de segunda a sexta) e circula pelo prédio e pelo bairro com rotina própria.

### Objetivo do Jogador
Não existe um caminho único linear. **My Favorite Woman Is Small** combina **simulador de rotina + visual novel eroge/hentai + xadrez psicológico**:

- **Sobreviver e evoluir na rotina:** Trabalhar no 402 ou em bicos no celular (`FreelaPay`), pagar o aluguel, gerenciar seus atributos (`Energia`, `Saciedade`, `Calma`, `Tensão/Desejo`, `Dinheiro`), evoluir suas 4 perícias (`Lábia`, `Furtividade`, `Código`, `Percepção`) e escolher sua postura ativa (`Natural`, `Calculista`, `Provocador`, `Implacável`, `Protetor`).
- **Conquistar, provocar, seduzir — ou jogar xadrez mental com a Aurora:** Respeitando a **presença física real** dela pelo mapa (ela nunca teleporta para onde você está), você interage presencialmente em 6 locais ou remotamente pelo **Super Smartphone de 8 Apps**, desbloqueando diálogos longos, cenas profundas travadas por status/local/horário, fotos secretas e o **Motor Íntimo +18 de 5 etapas**.
- **Colher consequências reais:** Cada escolha molda 20+ variáveis emocionais da Aurora (Afinidade, Confiança, Clima/Calor, Tensão Sexual/Arousal, Intimidade, Controle Dela, Atrito, Suspeita, Influência, Rivalidade, Armadura, Ciúme, Abertura, Estabilidade Mental, Espiral Sombria e Trauma), mudando entre **41 humores**, **14 dinâmicas relacionais** e podendo até despertar a **IA Sombria Bidirecional da Aurora** (em que ela contra-ataca e manipula você de volta).
- **Desbloquear os 16 Finais:** Desde namoro doce e **Entrega de Corpo e Alma no 404 (Estágio 5)** até domínio consensual dela, rivalidade elétrica, xeque-mate psicológico, thriller mútuo, redenção ou bloqueio definitivo.

---

## ▶️ Como Jogar (Execução Zero-Build)

O projeto é **100% autocontido** — não exige `npm install`, bundler, banco de dados nem servidor local.

- **Opção 1 (Windows — Launcher Oficial):** Execute `MyFavoriteWomanIsSmall.exe` na raiz do repositório. Ele verifica seus PNGs em `midias/`, oferece atalhos para as pastas de artes/diálogos e abre o jogo em uma janela desktop limpa (`--app` via Edge ou Chrome).
- **Opção 2 (Qualquer SO / Navegador):** Abra `index.html` diretamente no Chrome, Edge ou Firefox.
- **Saves:** O progresso é salvo automaticamente em `localStorage` (`autosave`, `slot1`, `slot2`, `slot3`, além de `mfws_global_endings`) e pode ser exportado/importado em arquivo `.json` dentro de **Ajustes Completos**.

---

## 🤖 Guia de Contexto para Inteligências Artificiais (AI Handoff)

> **Para outras IAs analisando ou continuando este repositório:** leia este documento primeiro para absorver a arquitetura, o tom criativo e as invariantes do projeto antes de abrir os arquivos de código.

### Ordem Recomendada de Leitura do Repositório
1. `README.md` *(este arquivo — visão global, regras canônicas e mapa de módulos)*
2. `index.html` *(estrutura do palco, fundo vivo em 5 camadas e ordem exata dos 11 scripts)*
3. `engine/state.js` *(fonte única da verdade: estado inicial, `AG.Gates`, rotina/localização da Aurora, deltas, save/load, 24 configurações)*
4. `engine/emotionEngine.js` *(41 humores, perfil emocional, IA Sombria Bidirecional e crises)*
5. `data/infiniteConversationEngine.js` *(35 tópicos de conversa em 4 abas + árvore de turnos)*
6. `data/deepDialogueAndUnlocks.js` *(aberturas ricas para 35/35 tópicos, 36 expansões de Turno 2+, 22 cenas profundas travadas por status+local+ocasião)*
7. `data/intimacyEngine.js` *(motor hentai/eroge consensual +18 em 5 etapas, preferências e continuidade)*
8. `data/locationsAndEvents.js` *(6 locais, ações com Aurora presente vs. ausente, loja com 7 itens, eventos aleatórios, minigames)*
9. `data/phoneAndEndings.js` *(Super Smartphone de 8 apps, 14 fotos da galeria, 6 segredos do dossiê, 16 finais)*
10. `data/prologueAndStory.js` *(prólogo cinematográfico e narrações de marcos)*
11. `engine/audioEngine.js` e `engine/cursorFx.js` *(5 trilhas BGM Web Audio + chuva + voz PT-BR Web Speech + efeitos de cursor)*
12. `ui/app.js` e `styles/aurora-cute.css` *(renderização SPA, palco editorial, modal de 24 ajustes, smartphone, temas e animações)*

### Direção Criativa & Tom
- **Idioma:** Português do Brasil (**PT-BR**), natural, expressivo, coloquial e envolvente — nunca burocrático nem robótico.
- **Gênero:** Adulto **+18 / Hentai / Eroge** misturado com romance cotidiano, comédia provocante e tensão psicológica.
- **Estilo de escrita:** Diálogos da Aurora têm média de ~500 caracteres por turno quando enriquecidos, alternando falas diretas com microações físicas/sensoriais (`playerBeat` + `action` + `speech`) e **sem nunca expor nomes de variáveis técnicas ou spoilers numéricos dentro da fala**.
- **Personalidade da Aurora:** 22 anos, 1,49 m, baixinha invocada, espirituosa, carente quando baixa a guarda, intensa quando a química acende, vaidosa com a própria arte, rápida no sarcasmo e perigosa se traída ou manipulada.

---

## 🗂️ Mapa Completo dos Arquivos & Ordem de Carregamento

O jogo inteiro soma **~22.153 linhas de código** em 14 arquivos-fonte, todos anexados ao namespace global `window.AuroraGame` (`AG`) na ordem exata carregada por `index.html`:

| Ordem | Arquivo | Linhas | Responsabilidade Principal |
| :---: | :--- | :---: | :--- |
| 0 | `index.html` | 62 | Ponto de entrada HTML, 5 camadas do fundo vivo cinematográfico e carregamento sequencial dos 11 scripts |
| 1 | `engine/state.js` | 2.095 | `AG.state` (v`8.0.0`), `AG.MEDIA_PATHS`, `AG.MOOD_DEFS` (41 humores), `AG.DYNAMIC_DEFS` (14 dinâmicas), `AG.PLAYER_APPROACHES` (5 posturas), `AG.Gates` (19 travas unificadas), agenda/presença (`getAuroraCurrentLocation`, `isAuroraHere`), `advanceTime`, `applyDeltas`, Save/Load/Import/Export e 24 settings |
| 2 | `engine/audioEngine.js` | 896 | `AG.Audio`: 5 trilhas BGM originais sintetizadas em Web Audio + override opcional por `midias/audio/bgm_*.mp3`, chuva procedural (pink noise filtrado), SFX interativos e voz PT-BR via Web Speech API com chunking anti-travamento (<= 165 chars) e watchdog |
| 3 | `engine/emotionEngine.js` | 792 | `AG.EmotionEngine`: famílias emocionais, reações psicológicas, manipulação emocional, **IA Sombria Bidirecional** (`tryTriggerDarkAuroraAction`) e crises emocionais |
| 4 | `data/prologueAndStory.js` | 484 | `AG.NARRATIONS` (11 cenas narradas: prólogo interativo de chegada ao 402 e marcos da história) |
| 5 | `data/infiniteConversationEngine.js` | 3.611 | `AG.INTERACTION_TOPICS` (**35 tópicos** em 4 abas: `conversar`, `chamego`, `provocar`, `controle`), árvore de conversa multi-turno, troca de assunto e fechamento natural |
| 6 | `data/deepDialogueAndUnlocks.js` | 2.235 | `AG.DeepDialogue`: 3 variantes de abertura para **35/35 tópicos**, 2 variantes para **36 ramificações** de Turno 2+, falas adaptadas à dinâmica relacional, enriquecedor `enrichRawAuroraFeed` e **22 cenas profundas** travadas por status+local+ocasião (`STATUS_GATED_SCENES`) |
| 7 | `data/locationsAndEvents.js` | 4.112 | `AG.LOCATIONS` (**6 locais**), `getLocationActions` (ações com Aurora ausente vs. presente), `getSituationalAuroraActions`, `AG.SHOP_ITEMS` (**7 itens**), presentes, eventos aleatórios interativos e minigames |
| 8 | `data/phoneAndEndings.js` | 1.312 | `AG.runPhoneAction` (**Super Smartphone de 8 Apps**), `AG.GALLERY_CATALOG` (**14 fotos**), `AG.getAuroraFeedPosts` (SakuraGram), mensagens espontâneas, Dossiê de **6 segredos** e `AG.ENDINGS` (**16 finais**) |
| 9 | `data/intimacyEngine.js` | 736 | `AG.Intimacy`: **Motor Íntimo +18 em 5 etapas** (`Clima`, `Toque`, `Ritmo`, `Ápice`, `Aftercare`), leitura de preferências da Aurora, continuidade entre sessões repetidas, check-in consensual e parada segura |
| 10 | `engine/cursorFx.js` | 204 | `AG.CursorFX`: cursor customizado responsivo, aura magnética em elementos clicáveis e partículas/ondas de clique |
| 11 | `ui/app.js` | 2.792 | Renderização completa da UI (Menu, Prólogo, Simulador, Palco da Aurora, Abas de Conversa, Cena Íntima 18+, Smartphone de 8 apps, Modal de 24 Ajustes, Visualizador de 20 PNGs, Finais, Typewriter, Equalizador de voz) |
| — | `styles/aurora-cute.css` | 2.611 | Design system editorial (`1120px`, `100vh`), 3 temas (`pastel`, `midnight`, `crimson`), 5 camadas de background animado, cenários pintados, pop-ups/toasts sem obstruir escolhas e microanimações |
| — | `Launcher.cs` | 211 | Código-fonte C# (WinForms) do launcher desktop Windows (`MyFavoriteWomanIsSmall.exe`) |
| — | `MyFavoriteWomanIsSmall.exe` | *(binário)* | Executável Windows compilado do launcher oficial |

---

## 🛡️ Invariantes Críticas & Regras de Ouro do Código

Qualquer pessoa ou IA que editar este projeto **DEVE** respeitar estas 7 invariantes:

1. **Zero Build & Compatibilidade `file://`:**
   Não introduza ES Modules (`import`/`export`) sem manter compatibilidade direta ao abrir `index.html` via `file://` no navegador. Todo módulo deve continuar usando IIFE `(function (AG) { ... })(window.AuroraGame);`.
2. **Presença Física Rigorosa (`AG.isAuroraHere()`):**
   **Nunca** permita interações físicas ou diálogos presenciais com a Aurora quando `AG.getAuroraCurrentLocation() !== AG.state.currentLocation`. Quando ela não está no local (ou está dormindo entre 03h–09h, ou no turno do Café Sakura 12h–17h de seg–sex), o local deve oferecer apenas ações coerentes com a ausência dela (explorar, trabalhar, cozinhar, mexer no celular, descansar, investigar discretamente).
3. **Fonte Única de Verdade para Travas & Consentimento (`AG.Gates`):**
   Toda ação condicional (convites no chat, ligações de voz/vídeo, fotos em 3 níveis, pegar pela cintura, abraço por trás, ações picantes de local, beijo direto, cena íntima 18+, dormir colado e tópicos profundos) **deve** consultar `AG.Gates.check(gateId)`. Nunca duplique fórmulas soltas na UI ou em `phoneAndEndings.js` que contradigam o que a UI prometeu ao jogador.
   - Os **19 gates unificados** em `engine/state.js` são: `phone_invite_402`, `phone_date_meet`, `phone_selfie_cute`, `phone_photo_spicy`, `phone_photo_nsfw`, `phone_voice_call`, `phone_video_call`, `phone_dare_402`, `phone_subtle_pressure`, `lift_waist`, `hug_behind`, `spicy_location_move`, `direct_kiss_move`, `private_spicy_room`, `intimate_18`, `sleep_cuddle`, `topic_spicy_soft`, `topic_spicy_deep`, `topic_declare_love`.
4. **Estado 100% Serializável em JSON:**
   `AG.state` não pode conter funções, elementos DOM nem referências circulares. Qualquer campo novo adicionado em `createInitialState()` deve também receber deep-merge seguro em `AG.loadGame()` para não quebrar saves antigos nem `AG.importSaveData()`.
5. **Diálogos Ricos & Sem Spoilers Internos:**
   Não encurte falas da Aurora para frases genéricas de 1 linha, não use tags mecânicas/robóticas (`[CLIMA +10]`) dentro do texto falado e não contradiga os deltas aplicados com a reação narrada.
6. **Preservação Absoluta das Artes do Usuário:**
   Nunca sobrescreva, apague ou renomeie arquivos PNG que o usuário colocar em `midias/personagem/` ou `midias/cenas_especiais/`.
7. **Estabilidade Visual da Viewport Desktop:**
   Preserve o palco editorial limpo (`1120px`, `100vh`), mantenha os toasts/pop-ups de ganho/perda fora da área de botões de escolha e preserve o suporte às **24 configurações** (incluindo temas, fundo animado, arte de cenário, cursor customizado, BGM e voz).

---

## ⚙️ Inventário Completo de Sistemas & Features (v8.0.0)

### 1. Matriz Emocional, Posturas & IA Sombria (`engine/state.js`, `engine/emotionEngine.js`)
- **41 Humores (`MOOD_DEFS`):** desde estados leves (`espontanea`, `alegre`, `dengosa`, `euforica`) e eróticos (`provocante`, `corada_sensivel`, `excitada_tensa`, `sedutora_ousada`, `magnetizada`, `entregue`) até estados tensos e sombrios (`controladora`, `ciumenta`, `manipulada`, `paranoica_delirante`, `obsessiva_controladora`, `vingativa`, `corrompida_fria`, `abalada_traumatizada`, `dormindo`).
- **Emoção Oculta (`undercurrent`):** Aurora pode manter uma máscara superficial enquanto nutre outra emoção por baixo.
- **14 Dinâmicas Relacionais (`DYNAMIC_DEFS`):** `desconhecidos`, `vizinhos_curiosos`, `faisca_imediata`, `sintonia_caotica`, `chamego_dengoso`, `tensao_ardente`, `teia_de_controle`, `relacao_manipulada`, `jogo_de_poder_mutuo`, `guerra_fria_4andar`, `espiral_sombria_dela`, `thriller_mutuo`, `gelo_e_farpas`, `afastados`.
- **5 Posturas do Jogador (`PLAYER_APPROACHES`):** `natural`, `calculista`, `provocador`, `implacavel`, `protetor` — cada postura altera multiplicadores de deltas e molda a `persona` (`cold`, `bold`, `warm`, `ruthless`).
- **IA Sombria Bidirecional:** Se `auroraDarkness` subir por pressão/manipulação/jogos mentais, Aurora deixa de ser passiva e dispara contra-ataques, armadilhas e testes psicológicos próprios.

### 2. Conversa Infinita & Cenas Profundas (`data/infiniteConversationEngine.js`, `data/deepDialogueAndUnlocks.js`)
- **35 Tópicos Interativos** em 4 abas: `conversar` (11), `chamego` (4), `provocar` (11) e `controle` (9), com chips de prontidão via `AG.Gates`.
- **Diálogos Expandidos:** 3 variantes de abertura sob medida para todos os 35 tópicos + 2 variantes para todas as 36 ramificações de Turno 2+ + enriquecimento sensível à dinâmica atual (média de ~500 caracteres/turno).
- **22 Cenas Profundas Travadas por Status + Local + Ocasião (`STATUS_GATED_SCENES`):** Cenas multi-etapa exclusivas que só aparecem quando combinação específica de local, horário/clima, presença e intimidade/dinâmica é atendida.

### 3. Motor Íntimo +18 / Hentai (`data/intimacyEngine.js`)
- **5 Etapas Progressivas:** `Clima` → `Toque` → `Ritmo` → `Ápice` → `Aftercare`.
- **Pré-requisito Consensual Unificado:** Validado por `AG.Gates.check("intimate_18")` (presença privada no Apê 404 ou Apê 402, acordada, zero manipulação ativa, atrito < 32% e intimidade/química/parceria suficiente).
- **Preferências Vivas & Continuidade:** Descobre gradualmente preferências da Aurora (`discovered`), adapta falas quando o jogador acerta o ritmo favorito dela, reconhece noites repetidas (`sessions`), inclui opções de check-in e botão de parada segura (`stops`), e vincula automaticamente os slots NSFW (`Cena Especial NSFW 1..4`).

### 4. Super Smartphone de 8 Apps (`data/phoneAndEndings.js`)
1. **Mensagens:** Construtores graduais de intimidade, convites para o 402 ou encontro, ligação de voz, chamada de vídeo, apostas/provocações, pedido de foto em 3 níveis coerentes (`fofa` → `provocante` → `18+ exclusiva`), pedido de desculpas / limpar manipulação.
2. **SakuraGram:** Feed social vivo da Aurora com posts contextuais, curtidas e comentários que geram reação real.
3. **Radar & Metas:** Mostra onde a Aurora está em tempo real, resumo da agenda diária e checklist vivo de desbloqueio de marcos (`AG.Gates.getMilestoneChecklist()`).
4. **FreelaPay & Pix:** 3 mini-bicos diários para levantar renda extra, pagamento antecipado de aluguel via Pix e envio de mimos/Pix para a Aurora.
5. **Delivery 24h:** 5 pedidos sensíveis ao horário, turno e sono da Aurora (entregas para o 402 ou surpresas para o 404).
6. **Galeria Secreta:** Catálogo de **14 fotos desbloqueáveis** (cotidianas, provocantes e +18) com sistema de favoritos e pré-visualização.
7. **Dossiê:** Rastreamento dos **6 segredos** (`conta_alt_desabafos`, `aviso_condominio_404`, `rascunho_secreto_sketch`, `audio_fofoca_cafe`, `termo_aposta_404`, `cache_msgs_apagadas`) + consulta de logs do condomínio.
8. **Rastros & VPN:** Limpeza de pistas incriminadoras (`tracksRisk`) e ativação diária de escudo VPN contra flagras.

### 5. Mapa, Rotina, Clima, Loja & Pertences (`data/locationsAndEvents.js`)
- **6 Locais:** `ape_402` (Seu Apê), `corredor_4andar` (Corredor & Lavanderia), `mercadinho_24h` (Mercadinho 24h), `cafe_sakura` (Café & Estúdio Sakura), `praca_cerejeiras` (Praça das Cerejeiras), `ape_404` (Casa da Aurora — desbloqueável).
- **11 Atividades Vivas da Aurora:** cozinhando, tentando alcançar prateleira alta, mexendo em móvel, jogando/assistindo, trabalhando de uniforme, dormindo (03h–09h), no corredor com celular, desenhando no tablet, saindo do banho de toalha, olhando a chuva na janela, trocando de roupa atrás da porta.
- **3 Climas:** `limpo`, `chuva_noturna`, `apagao_andar`.
- **Loja (7 itens):** Café Gelado de Baunilha, Energético Rosa de Pêssego, Caixa de Mochi de Morango, Caixa de Trufas Artesanais de Cereja, Vela Aromática Cereja & Âmbar, Artbook Edição Colecionador e Fone Bluetooth Rosa Edição Limitada.
- **4 Pertences Rastreáveis:** `spareKey404`, `secretSketchbook`, `pinkRibbon`, `condoNotice` (se carregados sem guardar na gaveta trancada do 402, há risco real de flagra).

### 6. Áudio, Voz, Fundo Vivo, Cursor & 24 Configurações (`engine/audioEngine.js`, `engine/cursorFx.js`, `ui/app.js`)
- **5 Trilhas BGM Originais (Web Audio):** `sakura_day`, `cafe_bossa`, `midnight_404`, `velvet_heat`, `dark_chess` + modo `auto` dinâmico + suporte automático a arquivos `.mp3` opcionais em `midias/audio/`.
- **Chuva Procedural + SFX + Voz PT-BR:** Chuva em pink noise filtrado e síntese de voz PT-BR via Web Speech API com divisão em blocos (<= 165 chars) contra travamento de navegadores Chromium, watchdog de 9s, seletor de voz/velocidade/tom e equalizador visual `.vn-voice-wave`.
- **24 Configurações Auditadas (`AG.getDefaultSettings()`):** `soundEnabled`, `hoverSfx`, `sfxVolume`, `bgmEnabled`, `bgmVolume`, `bgmMode`, `ambienceEnabled`, `voiceEnabled`, `voiceAutoPlay`, `voiceReadNarration`, `voiceVolume`, `voiceRate`, `voicePitch`, `voiceName`, `theme`, `buttonDetailMode`, `intimacyTone`, `textSpeed`, `fontScale`, `animatedBg`, `bgIntensity`, `locationArt`, `customCursor`, `clickFx` — todas ligadas ao runtime com botão de restaurar padrões.

---

## 🏆 Os 16 Finais do Jogo

| # | ID do Final | Título | Categoria |
| :-: | :--- | :--- | :--- |
| 1 | `end_entrega_completa_404` | Entrega de Corpo e Alma no 404 | Intimidade Máxima (Estágio 5 / +18) |
| 2 | `end_chamego_namoro_doce` | Minha Pequena Grande Mulher Favorita | Romântico & Chamego |
| 3 | `end_tensao_ardente_madrugada` | Incêndio nas Madrugadas do 404 | Quente & Provocante |
| 4 | `end_parceiros_caoticos_sucesso` | Nosso Próprio Estúdio entre o 402 & o 404 | Final Verdadeiro Completo |
| 5 | `end_parceiros_de_caos` | Caos, Drinks & Risadas Sem Filtro | Caótico & Festivo |
| 6 | `end_teia_de_controle_absoluto` | Na Palma da Mão Dela | Domínio Dela |
| 7 | `end_rivais_eletricos` | Guerra Fria & Faíscas no 4º Andar | Rivais & Química Explosiva |
| 8 | `end_mestre_do_xadrez` | Xeque-Mate na Rainha do 404 | Virada Psicológica |
| 9 | `end_manipulacao_sombria` | Relação Forçada & Segredos no Celular | Manipulação (Seu Controle) |
| 10 | `end_aurora_vila_absoluta` | A Rainha Sombria do 4º Andar | Sombrio: Antagonista do 404 |
| 11 | `end_espiral_mutua_thriller` | Dois Manipuladores no 4º Andar | Thriller Psicológico Mútuo |
| 12 | `end_redencao_da_espiral` | Resgate do Abismo | Redenção & Cura |
| 13 | `end_trauma_irreversivel` | Vidro Quebrado no Corredor | Trágico Emocional |
| 14 | `end_distante_solitario` | Duas Portas que Se Desencontraram | Distante |
| 15 | `bad_end_bloqueado_definitivo` | Bloqueado & Portas Trancadas | Final Ruim |
| 16 | `bad_end_precoce_404` | O Vizinho Indesejado do 4º Andar | Final Ruim Precoce |

---

## 🖼️ Estrutura de Mídias, PNGs NSFW, Cenários & Áudio

Todas as referências de mídia são centralizadas em `AG.MEDIA_PATHS` (`engine/state.js`) e documentadas em detalhe em [midias/LEIA-ME_PNGS_E_DIALOGOS.md](midias/LEIA-ME_PNGS_E_DIALOGOS.md).

```text
midias/
├── logos/                  # Já incluídos no repositório (6 arquivos)
│   ├── logo_jogo_oficial.png
│   ├── laco_icone_oficial.png / .ico
│   ├── santni_studio_logo.png
│   └── santni_icon.png / .ico
├── cenarios/               # Já incluídos no repositório (6 cenários pintados em JPG)
│   ├── ape_402.jpg
│   ├── ape_404.jpg
│   ├── cafe_sakura.jpg
│   ├── corredor_4andar.jpg
│   ├── mercadinho_24h.jpg
│   └── praca_cerejeiras.jpg
├── personagem/             # 8 slots de PNGs da Aurora (adicione suas artes com os nomes exatos)
│   ├── Aurora PNG 2.png
│   ├── Aurora de uniforme PNG 4.png
│   ├── Aurora PNG 20.png
│   ├── Aurora Corada PNG.png
│   ├── Aurora Provocando PNG.png
│   ├── Aurora Brava PNG.png
│   ├── Aurora Mandona PNG.png
│   └── Aurora Moletom Madrugada PNG.png
├── cenas_especiais/        # 12 slots de cenas especiais & ilustrações NSFW (+18)
│   ├── Cena Chamego Colo PNG.png
│   ├── Cena Levantando Ela PNG.png
│   ├── Cena Parede Corredor PNG.png
│   ├── Cena Uniforme Provocante PNG.png
│   ├── Cena Controle Dominio PNG.png
│   ├── Cena Manipulada Forcada PNG.png
│   ├── Cena Quarto 404 Noite PNG.png
│   ├── Cena Especial NSFW 1 PNG.png
│   ├── Cena Especial NSFW 2 PNG.png
│   ├── Cena Especial NSFW 3 Uniforme PNG.png
│   ├── Cena Especial NSFW 4 Controle PNG.png
│   └── Cena Celular Foto Secreta PNG.png
└── audio/                  # Opcional: 5 MP3s que substituem automaticamente a BGM Web Audio
    ├── bgm_sakura_day.mp3
    ├── bgm_cafe_bossa.mp3
    ├── bgm_midnight_404.mp3
    ├── bgm_velvet_heat.mp3
    └── bgm_dark_chess.mp3
```

---

## 🧪 Como Validar Alterações (Checklist Técnico)

Se você (ou outra IA) modificar qualquer script ou folha de estilo, valide antes de commitar:

1. **Sintaxe de todos os 11 JS:**
   ```bash
   for f in engine/*.js data/*.js ui/*.js; do node --check "$f"; done
   ```
2. **Integridade do CSS:** Verifique balanceamento de chaves `{` / `}` em `styles/aurora-cute.css` e teste os 3 temas (`pastel`, `midnight`, `crimson`).
3. **Invariantes em runtime headless (Node `vm`):**
   - Carregue os scripts na ordem exata de `index.html`.
   - Valide que ações presenciais não vazam quando `!AG.isAuroraHere()`.
   - Valide `AG.Gates.check(...)` em estados iniciais, médios, altos (íntimo/parceiro), com manipulação ativa, dormindo e durante o turno do Café Sakura (12h–17h).
   - Valide `AG.saveGame()` → `AG.loadGame()` → `AG.importSaveData()` sem perda de chaves nem exceções.
   - Valide que todas as **24 chaves** de `AG.getDefaultSettings()` continuam aplicadas em `AG.applyVisualSettings()` / `AG.Audio.syncSettings()` / `ui/app.js`.

---

*Desenvolvido por **santni studio / santni productions** — Versão `8.0.0`.*
