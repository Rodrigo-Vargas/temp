---
   layout: article
   title: Configurando um ambiente para desenvolvimento .NET Core
   excerpt: Aprenda a configurar um ambiente para desenvolver .Net Core
   categories: [Devops, .NET Core]
   publish_date: 2019-01-22
---

Olá pessoal, tudo bom? Neste post, irei realizar a instalação e configuração de um ambiente de desenvolvimento para .NET Core, além de mostrar como fazer algumas operações interessantes com o code generator do .Net Core.

O primeiro passar é baixar o SDK do .Net Core. No momento da criação de post, a versão do mesmo se encontra na 2.2. No linux, podemos fazer isso adicionando os repositórios oficiais da Microsoft ao package manager da máquina, com os comandos:

```shell
wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
```

Após executados estes comandos, poderemos instalar o .NET SDK.

```
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-2.2
```

# Comando dotnet

O comando dotnet, nos permite realizar várias ações relacionadas com o desenvolvimento para .Net Core. Utilizando o comando abaixo podemos criar uma nova solution chamada "hello.world".

```shell
dotnet new sln -o hello-world
```

Após vamos criar um novo projeto .Net Core mvc. Para isto execute o comando:

```shell
dotnet new mvc -o hello.world
```

E após, iremos adicionar o novo projeto a solution:

```shell
dotnet sln hello-world.sln add hello.world/hello.world.csproj
```

Após realizar estes passos, temos uma solution configurada com um projeto MVC pronto para ser executado. Para ver a aplicação rodando, basta usar o comando:

```shell
dotnet run
```

A home page com um starter template será exibida no navegador. Provavelmente irá aparecer um aviso de site não seguro, você pode ignorar o mesmo.

# Usando o dotnet generator

```shell
dotnet tool install --global dotnet-aspnet-codegenerator
```

Também será necessário adicionar os pacotes abaixo, usando o nuget:

- Microsoft.VisualStudio.Web.CodeGeneration.Utils
- Microsoft.VisualStudio.Web.CodeGeneration.Design

E após, instale os pacotes adicionados usando:

```shell
dotnet restore
```

## Adicionando um controller

```shell
dotnet aspnet-codegenerator controller -name PostsController
```

## Adicionando uma view

Para adicionar uma view, use o comando abaixo, onde *Index* é o nome da view, *Empty* é o tipo dela e *Views/Posts* é a pasta aonde a mesma será criada.

```shell
dotnet aspnet-codegenerator View Index Empty  --relativeFolderPath Views/Posts
```

Além dessas, existem outras operações que você pode realizar com o code generator do .Net Core, rodando o comando abaixo, uma seção de ajuda é mostrada, com outras possibilidades de comandos e argumentos

```shell
   dotnet aspnet-codegenerator -h
```

Por hoje era isso pessoal, até a próxima!!!