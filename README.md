# 🚪 Monty Hall Simulator

🌐 **Choose your language / Escolha seu idioma:**
- [English](##-english-version)
- [Português](##-versão-em-português)

---

## 🇺🇸 English Version

An interactive and visual simulator of the famous **Monty Hall Problem** (the three-door paradox), expanded to allow advanced probability testing with multiple doors and large-scale automated simulations.

The project was developed in **pure front-end**, focusing on practically analyzing the mathematical trends of the paradox under the perspective of the **Law of Large Numbers**.

### 🧠 What is the Monty Hall Problem?
The paradox originated from the American TV show *Let's Make a Deal*, hosted by Monty Hall. In the traditional 3-door scenario, the player chooses one door (behind one is a car, behind the other two are goats). The host reveals a goat behind one of the remaining doors and asks if the player wants to switch.

Mathematically, keeping your initial choice gives you a **33.3%** chance of winning, while switching doors elevates your chances to **66.6%**. This simulator proves this theory visually!

### 🚀 Key Features

- **Multiple Doors:** Go beyond the traditional paradox by configuring the experiment with 3 or more doors.
- **Customized Revelation:** Choose how many wrong doors the system should reveal before your final decision.
- **High-Speed Automatic Mode:** Enable automated simulations with intervals as low as 10ms to quickly generate thousands of statistical data points.
- **Statistics Panel:** Real-time monitoring of:
  - Overall win %.
  - Win % when switching doors.
  - Win % when keeping the original door.
  - Win % right on the first attempt.
- **Responsive Design:** Interface optimized for computers, but is still playable in cellphones.

### 🛠️ Technologies and Architecture

The project was built using only native web technologies, without external libraries, utilizing JavaScript's native `Math` API for generating pseudo-random probabilities.

The logic is modularized using **ES6 Modules** (`type="module"`), split into 6 structured files:
- `index.html` - Main structure of the application.
- `style.css` - Base styling and layout for large screens.
- `phoneStyle.css` - Responsiveness rules exclusive to mobile phones.
- `main.js` - Entry file that manages and connects modules and events.
- `jogo.js` - Controls the flow, game states, and Monty Hall rules.
- `estatisticas.js` - Responsible for storing statistics data.

### 🕹️ How to Play / Simulate

#### Manual Mode
1. Look at the prompts at the top and perform the corresponding action (for those who don't know the rules).
2. The system will reveal the wrong doors you didn't choose (they will turn red).
3. The prompt will change asking you to choose again. You can **keep** your marked door or **switch** to another remaining closed door.
4. The result will be revealed (the correct door turns green). After 3 seconds of analysis, the doors reset and the data is sent to the statistics panel.

#### Automatic Mode (To Analyze Trends)
1. In the settings panel, adjust the number of doors and the time interval (down to 10ms).
2. Activate the automatic mode. The computer will start playing by itself repeatedly.
3. Watch the magic of math happen: the more games the robot runs, the closer the statistics get to the exact precision of the paradox's real probabilities!
*Note: Door settings are locked during automatic simulation to prevent data corruption.*

### 📜 License

This project is licensed under the MIT License. Feel free to use, study, and modify the code. If you use this project for commercial purposes, publications, or news, please mention the original authorship.

---

## 🇧🇷 Versão em Português

Um simulador interativo e visual do famoso **Problema de Monty Hall** (o paradoxo das três portas), expandido para permitir testes avançados de probabilidade com múltiplas portas e simulações automatizadas em larga escala.

O projeto foi desenvolvido em **puro front-end**, com foco em analisar de forma prática as tendências matemáticas do paradoxo sob a perspectiva da **Lei dos Grandes Números**.

### 🧠 O que é o Problema de Monty Hall?
O paradoxo surgiu a partir do programa de TV americano *Let's Make a Deal*, apresentado por Monty Hall. No cenário tradicional com 3 portas, o jogador escolhe uma porta (atrás de uma há um carro, nas outras duas há bodes). O apresentador revela um bode em uma das portas restantes e pergunta se o jogador quer trocar.

Matematicamente, manter a escolha inicial te dá **33,3%** de chance de vitória, enquanto trocar de porta eleva suas chances para **66,6%**. Este simulador prova essa teoria visualmente!

### 🚀 Funcionalidades Principais

- **Múltiplas Portas:** Vá além do paradoxo tradicional, configurando o experimento com 3 ou mais portas.
- **Revelação Customizada:** Escolha quantas portas erradas o sistema deve revelar antes da sua decisão final.
- **Modo Automático de Alta Velocidade:** Ative simulações automatizadas com intervalos de até 10ms para gerar milhares de dados estatísticos rapidamente.
- **Painel de Estatísticas:** Monitoramento em tempo real de:
  - % Geral de acerto.
  - % De acerto ao trocar de porta.
  - % De acerto ao manter a porta original.
  - % De acerto logo na primeira tentativa.
- **Design Responsivo:** Interface mais otimizada para computadores, mas ainda jogável em celulares.

### 🛠️ Tecnologias e Arquitetura

O projeto foi construído utilizando apenas tecnologias nativas da web, sem bibliotecas externas, utilizando a API nativa `Math` do JavaScript para a geração de probabilidades pseudo-aleatórias.

A lógica é modularizada utilizando **ES6 Modules** (`type="module"`), dividida em 6 arquivos estruturados:
- `index.html` - Estrutura principal da aplicação.
- `style.css` - Estilização base e layout para telas grandes.
- `phoneStyle.css` - Regras de responsividade exclusivas para celulares.
- `main.js` - Arquivo de entrada que gerencia e conecta os módulos e eventos.
- `jogo.js` - Controla o fluxo, estados do jogo e regras do Monty Hall.
- `estatisticas.js` - Responsável pelo armazenamento de dados das estatísticas.

### 🕹️ Como Jogar / Simular

#### Modo Manual
1. Olhe para os avisos no topo e execute a ação correspondente (para quem não conhecer).
2. O sistema revelará as portas erradas que você não escolheu (elas ficarão vermelhas).
3. O aviso mudará pedindo para você escolher novamente. Você pode **manter** a sua porta marcada ou **trocar** para outra porta fechada restante.
4. O resultado será revelado (porta certa fica verde). Após 3 segundos de análise, as portas resetam e os dados vão para o painel de estatísticas.

#### Modo Automático (Para Analisar Tendências)
1. No painel de configurações, ajuste o número de portas e o intervalo de tempo (até 10ms).
2. Ative o modo automático. O computador começará a jogar sozinho repetidamente.
3. Observe a mágica da matemática acontecer: quanto mais jogos o robô roda, mais as estatísticas se aproximam com precisão exata das probabilidades reais do paradoxo!
*Nota: Configurações de portas ficam travadas durante a simulação automática para não corromper os dados estatísticos.*

### 📜 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, estudar e modificar o código. Caso utilize o projeto para fins comerciais, publicações ou notícias, por favor, mencione a autoria original.
