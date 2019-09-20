<div>
	<h1 align="center">SIARA Tablet</h1>
</div>

<!-- FALAR MAIS SOBRE O PROJETO SIARA -->

## Instalar e Configurar o Ambiente de Desenvolvimento
Para o desenvolvimento com o Ionic, assim como para a execução de projetos Ionic no navegador , é preciso instalar o [Node.js](#nodejs), o [Ionic](#ionic) e o [Cordova](#cordova).

> Todo o processo a seguir foi feito no Sistema Operacional Windows 10. No Linux e no Mac, o processo de configuração do ambiente de [build](#build-do-projeto-para-android) é diferente.

### Node.js
Antes de instalar todas as outras ferramentas, é preciso instalar o Node.js. O Node.js é um ambiente de execução Javascript assíncrono orientado a eventos, ele é projetado para o desenvolvimento de aplicações escaláveis de rede.

[Baixe](https://nodejs.org/en/) e instale o Node.js na máquina. No Windows, a instalação é bastante simples (**Next** > **Next** > **Finish**). É recomendável fazer o download da versão LTS.

Para saber se a instalação foi bem sucedida, execute os comandos `node -v` e `npm -v` no prompt de comandos do Windows para ver as versões que foram instaladas.

### Ionic
O Ionic é um framework de desenvolvimento de aplicações móveis híbridas, ou seja, basta codificar uma vez e executará em qualquer plataforma. Usando tecnologia web padrão, o Ionic facilita o desenvolvimento de aplicações móveis.

Para instalar o Ionic 4 é simples, basta executar o comando `npm install -g ionic@4.12.0` no prompt de comandos do Windows. É importante definir a versão que será instalada, porque atualmente o framework está na versão 5. E de uma versão para a outra são feitas uma série de mudanças que podem impactar no desempenho da aplicação.

Caso já tenha uma versão mais antiga ou mais nova do Ionic na sua máquina, desinstale-a e instale a versão 4. Basta executar os seguintes comandos no prompt de comandos do Windows:
```
npm  uninstall  -g  ionic
npm install -g ionic@4.12.0
```
Para saber se a instalação foi bem sucedida, execute o comandos `ionic -v` no prompt de comandos do Windows para ver a versão que foi instalada.

### Cordova
O Cordova agrupa seu aplicativo HTML/JavaScript em um contêiner nativo que pode acessar as funções do dispositivo de várias plataformas. Essas funções são expostas por meio de uma API JavaScript unificada, permitindo que você escreva facilmente um conjunto de códigos para atingir quase todos os telefones ou tablets no mercado e publique em lojas de aplicativos.

Para instalar o Cordova na máquina, execute o comando `npm install -g cordova` no prompt de comandos do Windows. Ao final do processo, verifique a versão instalada com o comando `cordova -v`.

## Executar o Projeto no Navegador
Após baixar o projeto, execute o comando `npm install` no diretório do projeto para serem feitos os downloads das dependências do projeto. Após isso, basta executar o comando `ionic serve` no diretório do projeto para executá-lo no navegador.

## Build do Projeto para Android
Para realizar o build do projeto para Android, é necessário baixar e instalar o [JDK](#jdk), o [Android SDK](#android-sdk) e o [Gradle](#gradle) e [configurar as Variáveis de Ambiente](#configurar-as-variáveis-de-ambiente) do Windows.

### JDK
Como o Android tem como linguagem nativa o Java, é preciso baixar e instalar o Kit de Desenvolvimento Java (JDK). [Aqui](https://www.oracle.com/technetwork/pt/java/javase/downloads/jdk8-downloads-2133151.html), baixe o JDK SE 8 (x86 ou x64). A instalação é bastante simples no Windows (**Next** > **Next** > **Finish**).

> Atente-se ao local de instalação do JDK. Por padrão é no diretório `C:\Program Files\Java\jdk1.8.X`.

### Android SDK
Para realizar o build do projeto para Android, é necessário baixar e instalar o Kit de Desenvolvimento de Software Android (Android SDK). [Baixe](https://developer.android.com/studio) o SDK junto com o Android Studio, ele facilitará na instalação de algumas dependências, por exemplo, o SDK Tools. A instalação deste no Windows também se resume em **Next** > **Next** > **Finish**.

> O Android Studio irá perguntar onde você quer salvar o SDK. É recomendável que o salve no diretório `C:\Android\android-sdk-windows`.

Após a instalação, execute o Android Studio pela primeira vez e realize o download do restante das dependências do SDK. Siga os seguintes passos:

1. Na primeira tela, no canto inferior direito, clique em **Configure** > **SDK Manager**.
2. Na aba **SDK Platforms**, marque as versões do Android que deseja baixar. É recomendável que marque ao menos o **Android 4.4 (KitKat)**.
3. Na aba, **SDK Tools**, marque a opção **Android SDK Build-Tools** para baixar todas as API Level do Android.
4. Após realizar as marcações necessárias, clique e **Apply** no canto inferior direito e o download e instalação dos pacotes começarão.

### Gradle
O Gradle é um sistema avançado de automatização de builds que une o melhor da flexibilidade do Ant com o gerenciamento de dependencias e as convenções do Maven.

> [Baixe](https://gradle.org/next-steps/?version=5.6.2&format=bin) o Gradle e, de preferência, descompacte o arquivo ZIP no diretório `C:\Gradle\gradle-5.6.2`.

### Configurar as Variáveis de Ambiente
Não basta apenas instalar as bibliotecas, é preciso dizer ao sistema operacional que elas existem e informá-lo onde elas estão. Por conta disso, deve-se configurar as Variáveis de Ambiente do Windows. As variáveis a serem configuradas, são as seguintes: [JAVA_HOME](#java_home), [ANDROID_HOME](#android_home-e-android_sdk_root), [ANDROID_SDK_ROOT](#android_home-e-android_sdk_root),  [GRADLE_HOME](#gradle_home) e [PATH](#path). Para ter acesso às Variáveis de Ambiente, siga os seguintes passos:

1. No menu Iniciar do Windows, digite **Editar as variáveis de ambiente do sistema** e pressione **Enter**;
2. Clique em **Variáveis de Ambiente...**, no canto inferior direito.

#### JAVA_HOME
1. Em **Variáveis do sistema**, clique em **Novo...**;
2. Em **Nome da variável** ponha **JAVA_HOME**;
3. Em **Valor da variável** ponha o diretório onde foi instalado o JDK: `C:\Program Files\Java\jdk1.8.0.X`;
4. Clique em **OK**, no canto inferior direito.

#### ANDROID_HOME e ANDROID_SDK_ROOT
1. Em **Variáveis do sistema**, clique em **Novo...**;
2. Em **Nome da variável** ponha **ANDROID_HOME**;
3. Em **Valor da variável** ponha o diretório onde foi instalado o Android SDK: `C:\Android\android-sdk-windows`;
4. Clique em **OK**, no canto inferior direito.

> O valor da variável **ANDROID_SDK_ROOT** é igual ao valor da variável **ANDROID_HOME**. Basta seguir os passos acima, alterando apenas o campo **Nome da variável**.

#### GRADLE_HOME
1. Em **Variáveis do sistema**, clique em **Novo...**;
2. Em **Nome da variável** ponha **GRADLE_HOME**;
3. Em **Valor da variável** ponha o diretório onde foi instalado o Gradle: `C:\Gradle\gradle-5.6.2`;
4. Clique em **OK**, no canto inferior direito.

#### PATH
1. Em **Variáveis do sistema**, selecione a variável **Path** e clique em **Editar...**, no canto inferior direito;
2. No canto superior direito, clique em **Novo**;
3. Digite `%JAVA_HOME%\bin`, pressione **Enter** e repita o **passo 2**;
4. Digite `%ANDROID_HOME%\platform-tools`, pressione **Enter** e repita o **passo 2**;
5. Digite `%ANDROID_HOME%\tools`, pressione **Enter** e repita o **passo 2**;
6. Digite `%GRADLE_HOME%\bin`, pressione **Enter** e clique em **OK**.

> Caso esteja em outras versões do Windows, basta adicionar `%JAVA%\bin;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%GRADLE_HOME%\bin;` no final do valor da variável **Path**.

### Realizar o Build do Projeto para Android
Para fazer o build do projeto para Android, execute o comando `ionic cordova build android` no diretório do projeto. Verifique se ao final do processo de construção a saída é a seguinte:
```
BUILD SUCCESSFUL in XXm XXs
XX actionable tasks: XX executed
Build the following apk(s):
	<caminho do projeto>\platforms\android\app\build\outputs\apk\debug\app-debug.apk
```
Agora basta copiar o arquivo APK para o dispositivo Android (tablet) e executar a instalação. Antes, verifique se o aparelho está habilitado para permitir a instalação de aplicativos de fontes desconhecidas.
