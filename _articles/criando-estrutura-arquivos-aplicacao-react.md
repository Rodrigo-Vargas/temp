---
   date: 2020-01-25
   layout: article
   title: Criando a estrutura de pastas de uma aplicação React
---

Com a nossa aplicação já configurada, vamos agora para a estrutura de arquivos básica de uma aplicação React. Lembrando que assim como todo projeto, temos diferentes maneiras de separar os arquivos, e esta é a que normalmente eu uso. Se tiver uma forma diferente, coloca ali nos comentários. :)

## Preview da estrutura de arquivos

## Criando a homepage

Criar um arquivo HTML com a seguinte estrutura dentro da pasta public

```HTML
   <html>
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="X-UA-Compatible" content="ie=edge">
         <meta name="theme-color" content="#2DE05A">
         
         <title>Bills Hub</title>
      </head>
      <body>
         <noscript>You need to enable JavaScript to run this app.</noscript>

         <div id="root"></div>

         <script type="text/javascript" src="/dist/bundle.js"></script>
      </body>
   </html>
```

## Rodando a aplicação
Para rodar a aplicação, iremos criar um novo script no nosso arquivo *package.json*. Para isso, adicione a seguinte linha na parte de scripts:

```javascript
   "scripts": {
      "dev": "webpack-dev-server --mode development",
      "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Se ficar com alguma dúvida, consulte o código-fonte da aplicação no GitHub.

Após modificar o arquivo, volte para o terminal e execute o comando:

```
   npm run dev
```