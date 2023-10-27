Introdução a um fluxo de trabalho:
Para ajudá-lo a começar, este guia mostra alguns exemplos básicos. Para obter a documentação completa do GitHub Actions sobre fluxos de trabalho, consulte "Configurando fluxos de trabalho".

Personalizando quando as execuções do fluxo de trabalho são acionadas
Defina seu fluxo de trabalho para ser executado em eventos push para as ramificações emainrelease/*

on:
  push:
    branches:
    - main
    - release/*
Defina seu fluxo de trabalho para ser executado em eventos direcionados à ramificaçãopull_requestmain

on:
  pull_request:
    branches:
    - main
Defina seu fluxo de trabalho para ser executado todos os dias da semana, de segunda a sexta-feira, às 2:00 UTC

on:
  schedule:
  - cron: "0 2 * * 1-5"
Para obter mais informações, consulte "Eventos que disparam fluxos de trabalho".

Executando manualmente um fluxo de trabalho
Para executar manualmente um fluxo de trabalho, você pode configurar seu fluxo de trabalho para usar o evento. Isso habilita um botão "Executar fluxo de trabalho" na guia Ações.workflow_dispatch

on:
  workflow_dispatch:
Para obter mais informações, consulte "Executando manualmente um fluxo de trabalho".

Executando seus trabalhos em diferentes sistemas operacionais
O GitHub Actions fornece executores hospedados para Linux, Windows e macOS.

Para definir o sistema operacional para seu trabalho, especifique o sistema operacional usando:runs-on

jobs:
  my_job:
    name: deploy to staging
    runs-on: ubuntu-18.04
Os tipos de máquina virtual disponíveis são:

ubuntu-latestou ubuntu-18.04ubuntu-16.04
windows-latest ou windows-2019
macos-latest ou macos-10.15
Para obter mais informações, consulte "Ambientes virtuais para ações do GitHub".

Usando uma ação
As ações são unidades reutilizáveis de código que podem ser criadas e distribuídas por qualquer pessoa no GitHub. Você pode encontrar uma variedade de ações no GitHub Marketplace e também no repositório oficial de Ações.

Para usar uma ação, você deve especificar o repositório que contém a ação. Também recomendamos que você especifique uma tag Git para garantir que esteja usando uma versão lançada da ação.

- name: Setup Node
  uses: actions/setup-node@v1
  with:
    node-version: '10.x'
Para obter mais informações, consulte "Sintaxe de fluxo de trabalho para ações do GitHub".

Executando um comando
Você pode executar comandos na máquina virtual do trabalho.

- name: Install Dependencies
  run: npm install
Para obter mais informações, consulte "Sintaxe de fluxo de trabalho para ações do GitHub".

Executando um trabalho em uma matriz de sistemas operacionais e versões de tempo de execução
Você pode executar automaticamente um trabalho em um conjunto de valores diferentes, como versões diferentes de bibliotecas de código ou sistemas operacionais.

Por exemplo, esse trabalho usa uma estratégia de matriz para ser executada em 3 versões do Node e 3 sistemas operacionais:

jobs:
  test:
    name: Test on node ${{ matrix.node_version }} and ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node_version: ['8', '10', '12']
        os: [ubuntu-latest, windows-latest, macOS-latest]

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node_version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node_version }}

    - name: npm install, build and test
      run: |
        npm install
        npm run build --if-present
        npm test
Para obter mais informações, consulte "Sintaxe de fluxo de trabalho para ações do GitHub".

Executando etapas ou trabalhos condicionalmente
O GitHub Actions oferece suporte a condições em etapas e trabalhos usando dados presentes no contexto do fluxo de trabalho.

Por exemplo, para executar uma etapa apenas como parte de um push e não em um pull_request, você pode especificar uma condição na propriedade com base no nome do evento:if:

steps:
- run: npm publish
  if: github.event_name == 'push'
Para obter mais informações, consulte "Contexts and expression syntax for GitHub Actions".
