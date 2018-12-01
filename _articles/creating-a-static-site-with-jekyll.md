---
   layout: article
   title: Criando um site estático com Jekyll
   excerpt: Aprenda todas as funcionalidades do Jekyll criando um site do zero
   categories: [Jekyll]
   published: true
---

Oi pessoal, hoje vou criar um site portfólio com blog do zero utilizando jekyll, um gerador de sites estaticos escrito em ruby. Este é a primeira parte de uma série de posts no qual irei construir um site.

<!--- com as seguintes características:
- Home, contendo os seguintes elementos:
   - Imagem inicial
   - Redes sociais
   - Uma seção sobre, contendo uma descrição e minhas informações pessoais
   - Meu curriculo
   - Minhas habilidades
   - Últimas postagens do blog
   - Alguns dos meus trabalhos
   - Depoimento de clientes
   - Um formulário de contato
- Blog com todas as postagens, podendo buscar por categorias
- Feed RSS
-->
# Criando a base do site

Para criar a base do site iremos rodar o comando abaixo, onde o parâmetro será o nome do seu site, no caso irei utilizar "jekyll_site".

```shell
   jekyll new jekyll_site
```

Após rodar o comando você verá uma estrutura de arquivos, eis uma breve explicação das mesmas.


<<< Colocar Imagem aqui >>>>

- _posts = Contém os posts do blog
- _config.yml = Arquivo de configurações gerais do site
- Gemfile = Arquivo de dependencias de gems do projeto
- index.md = Arquivo da página inicial


## Iniciando o server de desenvolvimento

Para subir um servidor local para desenvolvimento, podemos rodar o seguinte comando:
```shell
   jekyll serve
```

<< Colocar imagem inicial do tema aqui >>

E com isso já temos nosso site rodando em jekyll

Note que agora, temos uma nova pasta na nossa estrutura de arquivos chamada _site, esta pasta é aonde fica a versão "compilada" das páginas. Toda vez 
que o comando "serve" é disparado, o jekyll lê a estrutura de arquivos e gera o HTML respectivo, bacana não?

## Editando o conteúdo das páginas

Vamos agora editar o nosso site, começando pela home. Para definir a home do site, o Jekyll possui uma convenção que é o nome "index", então arquivos como "index.md" ou "index.html", serão lidos como a base do nosso site, assim como é o padrão de vários servidores de arquivos.

Ao abrirmos o arquivo index.md, veremos uma marcação no início de cada página, essa marcação sempre vai existir, e se chama YAML,  ela é necessária para que o jekyll possa reconhecer que está página contém metadados, e que deva ser compilada.

Abaixo do fechamento da tabela, tudo que colocarmos, o Jekyll irá interpretar como conteúdo da nossa página, vamos colocar um texto de exemplo, fazendo com que o nosso arquivo fique desta maneira:

``` markdown
   ---
      layout: home
   ---
   Hello World!
```

Como vemos, o mesmo foi colocado no meio do conteúdo.

<blockquote class="blockquote">
   Interessante: confira como ficou a página gerada dentro da pasta "_site", isto é útil para quando você quiser entender o que o Jekyll está fazendo.
</blockquote>

Podemos fazer o mesmo com a página "about.md". A seguir, veremos como podemos fazer os nossos próprios layouts.


## Entendendo os temas do Jekyll

Se analisarmos o cabeçalho da nossa página, notamos o termo layout, cujo valor  que define o nome do layout ao qual nossa página está herdando, ou na qual ela está sendo construída. Assim como muitos engine templates, o Jekyll possui o Liquid, que contêm essa capacidade de fazermos páginas herdarem de layouts, e estes layouts herdarem de outros layouts, permitindo o máximo reaproveitamento de código.

Mas aonde o Jekyll busca o conteúdo para gerar o arquivo? Boa pergunta jovem padawan. O Jekyll possui um sistema de temas, que nada mais são que gems do ruby. Na versão do Jekyll que estamos utilizando neste artigo (3.6.2) o tema padrão se chama minima (https://github.com/jekyll/minima). Você pode ver referências dele no arquivo gemfile, e também no arquivo _config.yml. Então vou precisar construir uma gem para alterar o tema? Não é necessário, o Jekyll nos permite sobreescrever as definições de um tema. Que é o que veremos a seguir.


## Sobreescrevendo layouts

Para começar, vamos excluir a referência ao tema do arquivo _config.yml, excluindo a linha:

```yaml
   theme: minima
```

Será necessário parar o comando jekyll serve e roda-lo novamente para que as alterações sejam processadas. Ao roda-lo novamente, veremos alguns avisos no console:

``` bash
   Build Warning: Layout 'post' requested in _posts/2018-11-30-welcome-to-jekyll.markdown does not exist.
   Build Warning: Layout 'default' requested in 404.html does not exist.
   Build Warning: Layout 'page' requested in about.md does not exist.
   Build Warning: Layout 'home' requested in index.md does not exist.
```

Isto acontece porque retiramos o tema minima, logo os layouts que antes existiam, já não podem ser localizados. Não precisamos nos preocupar, pois iremos criar novos layouts e novas páginas. Exclua as páginas "about.md", "404.html" e o arquivo que está na pasta _posts, não precisaremos deles por enquanto.

Após, vamos alterar o layout da index.md para "default", ficando desta forma:

``` markdown
   ---
   layout: default
   ---

   Hello World!
```

Agora vamos criar o nosso layout chamado "default". Os layouts no jekyll ficam localizados na pasta "_layouts" na raiz do projeto, como não temos esta pasta podemos cria-la. Logo após crie um arquivo chamado "default.html", que conterá o seguinte conteúdo.

``` html
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Jekyll Site</title>
   </head>
   <body>
      {{ "{{ content " }}}}
   </body>
   </html>
```

Note a presença da expressão "{{ "{{ content " }}}}". No liquid, tudo que estiver dentro de "{{ "{{ " }}}}" (double mustaches) irá ser interpretado como uma váriavel. Mas aonde é definida está variavel "content"? Neste caso, ela é uma varíavel reservada do Jekyll, que usa a mesma para colocar o conteúdo de páginas que herdam deste layout. Se analisarmos a home novamente, veremos que a expressão "Hello World!" está entre as tags body, que é aonde definimos nossa content.

Vamos agora incrementar o nosso site, colocando uma navegação superior, adicione o trecho abaixo logo após a abertura da tag body no arquivo default.html.

``` html
   <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">My Jekyll Site</h5>
      <nav class="my-2 my-md-0 mr-md-3">
         <a class="p-2 text-dark" href="/">Home</a>
         <a class="p-2 text-dark" href="/works">Works</a>
         <a class="p-2 text-dark" href="/blog">Blog</a>
      </nav>
   </div>
```

Adicione também uma referência ao CDN do bootstrap imediatamente antes do fechamento da tag head:

``` html
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
```

Bacana, mas vamos aprender como podemos organizar melhor o nosso template com o uso do que o Jekyll chama de "includes".


## Utilizando includes no Jekyll

Da mesma maneira com o que fizemos nos layouts, vamos criar uma pasta chamada, "_includes" na raiz do nosso projeto. Dentro dela vamos criar um arquivo chamado "top-nav.html" e colocar o conteúdo do nosso cabeçalho dentro do mesmo:

```html
   <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">My Jekyll Site</h5>
      <nav class="my-2 my-md-0 mr-md-3">
         <a class="p-2 text-dark" href="/">Home</a>
         <a class="p-2 text-dark" href="/works">Works</a>
         <a class="p-2 text-dark" href="/blog">Blog</a>
      </nav>
   </div>
```

Já no nosso arquivo default.html, iremos retirar o cabeçalho e colocar uma referência ao arquivo que acabamos de criar:

``` html
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Jekyll Site</title>

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
   </head>
   <body>
      {{ "{% include top-nav.html" }}%}

      {{ "{{ content " }}}}
   </body>
   </html>
```

Note a expressão {{ "{% include top-nav.html" }}%}, quando chamamos um método no Jekyll, no caso o "include" , utilizamos {{ "{% " }}%} ao invés dos double mustaches. Sempre que puder, refatore o seu código para que ele fique sempre simples e legível.


Continuando o nosso blog, vamos voltar para o arquivo index.md e adicionar um pouco mais de conteúdo.

``` html
   <section class="jumbotron text-center">
      <div class="container">
         <h1 class="jumbotron-heading">John Doe</h1>
         <p class="lead text-muted">Hi, i'm John Doe and that's my blog and portfolio website!!!</p>
         <p>
            <a href="#" class="btn btn-primary my-2">Call me!</a>
         </p>
      </div>
   </section>
```

Perfeito, o próximo passo será colocar uma seção de portfólio. Claro que poderíamos simplesmente escrever o HTML de forma estática, mas não seria mais interessante se pudessemos ter essa informação melhor organizada? O Jekyll, nos permite realizar isso, através de algo chamado collections.

## Collections

Collections são o modo como salvamos estruturas de dados no Jekyll, algo semelhante aos post types do Wordpress, mas de forma mais livre.

### Declarando uma collection

Como exemplo, vamos declarar uma collection com o nome de "Work", que representará cada um dos itens do nosso portfólio.

Primeiramente iremos declarar a nossa collection no arquivo _config.yml da seguinte forma:

``` yaml
   collections:
   works:
```

Você pode colocar o trecho acima em qualquer lugar do arquivo, irei colocar logo depois da parte de plugins. Reinicie o servidor do jekyll, para ele possa aplicar as alteraç~oes.

O próximo passo é criar uma pasta que terá o mesmo nome da nossa collections mas com um "_" na frente. Sempre que colocarmos um underscore na frente de uma pasta,o Jekyll entende que ele não deve replicar essa pasta para a estrutura final do site.

Após criar a pasta vamos criar um arquivo chamado "blog.md" com o seguinte conteúdo:

``` markdown
   ---
      title: "My personal Blog"
   ---
```


Com isso já declaramos o nosso primeiro item de portfólio. Após  Mas como faço para saber se o Jekyll processou este item? Vamos aprender a seguir:

### Referenciando uma collection

Agora, voltando a nossa home, no arquivo index.md, vamos adicionar o seguinte trecho de código:

``` html
   <div class="container">
      {{"{% for work in site.works" }}%}
         <h1>{{ work.title }}</h1>
      {{"{% endfor " }}%}
   </div>
```


Atualizando a página, você verá que será mostrado o mesmo valor definido na propriedade "title" do arquivo "blog.md". Isto irá valer para outras propriedades que forem criadas.

Assim como a diretiva "for", existem várias outras diretivas do Liquid que você pode usar, como o "if" por exemplo. Vamos aprimorar a seção de portfólio, adicionando uma foto, uma descrição, e uma flag para saber se devemos mostrar na home ou não. Podemos também criar mais dois itens para ilustrar melhor o funcionamento do Jekyll.

O arquivo blog.md ficou desta maneira:

``` html
   ---
      title: "My personal blog"
      image_url: "https://image.shutterstock.com/z/stock-vector-blog-content-blogging-post-concept-for-web-page-banner-presentation-social-media-documents-1151964476.jpg"
      description: "A personal blog and portfolio website made for educational purposes"
      show_on_home: false
   ---
```


Agora irei alterar a home para buscar as novas informações:

``` html
   <div class="container">
      <h1 class="text-center mb-5">My works</h1>

      <div class="row">
         {{ "{% for work in site.works " }}%}
   
            <div class="col-md-4">
               <div class="card mb-4 shadow-sm">
                  <img class="card-img-top" alt="{{ "{{ work.title " }}}}" style="height: 225px; width: 100%; display: block;" 
                  src="{{"{{ work.image_url " }}}}">
                  <div class="card-body">
                     <p class="card-text">{{"{{ work.description "}}}}</p>
                     <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                           <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         {{"{% endfor " }}%}
      </div>   
   </div>
```


Mas espere, ainda não estamos filtrando a collection pela flag "show_on_home" certo? Exato! Vamos fazer isso agora. Vamos usar duas novas diretivas do Liquid, que é a "assign", utilizada para atribuir valores a variáveis, e a diretiva where, que é utilizada em arrays para realizar filtros.

Substituia a linha:
``` markdown
   {{ "{% for work in site.works " }}%}
```

Por estas:

``` markdown
   {% assign featured_works = site.works | where:"show_on_home", true %}
   {{ "s{% for work in featured_works " }}%}
```

Note que diferente da diretiva "for", "assign" não requer uma tag "endassign". Após atualizarmos a página, não iremos ver nenhum item, pois colocamos nossos objetos "work" com a flag "show_on_home" igual a "false". Ao trocarmos para true, e atualizarmos a página, as mesmas serão exibidas.


## Entendendo os posts no Jekyll

Os posts no Jekyll funcionam de maneira semelhante as collections, mas ao contrário das mesmas, já estão configuradas por padrão no Jekyll. Vamos criar um novo arquivo na pasta "_posts" para ver o seu funcionamento. Para que o Jekyll reconheça corretamente o seu post, ele deve seguir o seguinte padrão para o nome:

-YYYY-MM-DD-nome_do_post.md

Onde como você já deve ter imaginado, YYYY seria o ano, MM o mês e DD o dia da publicação do post. Este formato é necessário pois o Jekyll por padrão organiza os posts por sua data. Abaixo um exemplo de como seria um post.

``` markdown
   ---
   layout: default
   title:  "Welcome to Jekyll!"
   date:   2018-11-30 22:07:43 -0200
   categories: jekyll update
   ---
   You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

   To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

   Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

   [jekyll-docs]: https://jekyllrb.com/docs/home
   [jekyll-gh]:   https://github.com/jekyll/jekyll
   [jekyll-talk]: https://talk.jekyllrb.com/
```

Note que o post acima é escrito com a linguagem markdown, e o Jekyll irá fazer a compilação do mesmo para HTML. Mas isso não significa que você também não possa escrever diretamente em HTML, caso nunca tenha mexido com markdown, vale a pena dar uma chance a ele, ele permite escrever posts com bastante produtividade.


### Exibindo os posts na home

Para exibir os posts do blog na home, iremos fazer de maneira semelhante ao com o que fizemos para o portfólio. Antes disso, irei criar uma pasta chamada "home" dentro da pasta "_includes" para organizar o template da home do nosso site. Criarei dois arquivos lá:

**latest-from-blog.html**
``` html
   <h1 class="text-center mb-5">Latest from blog</h1>

   <div class="row">
      {{"{% for post in site.posts "}}%}

         <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
               <div class="card-body">
                  <h2>{{ post.title }}</h2>
                  <p class="card-text">{{ post.excerpt }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                     <div>
                        {{"{% for category in post.categories "}}%}
                           <button type="button" class="btn btn-sm btn-outline-secondary mr-2">{{"{{ category "}}}}</button>
                        {{"{% endfor "}}%}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      {{"{% endfor "}}%}
   </div>
```


**featured-works.html**
```highlight
   <h1 class="text-center mb-5">My works</h1>

   <div class="row">
      {% assign featured_works = site.works | where:"show_on_home", true %}
      {% for work in featured_works %}

         <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
               <img class="card-img-top" alt="{{"{{ work.title "}}}}" style="height: 225px; width: 100%; display: block;" 
               src="{{"{{ work.image_url "}}}}">
               <div class="card-body">
                  <p class="card-text">{{"{{ work.description "}}}}</p>
                  <div class="d-flex justify-content-between align-items-center">
                     <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      {% endfor %}
   </div>
```

E a index.md irá ficar desta maneira:

```highlight
   ---
      layout: default
   ---

   <section class="jumbotron text-center">
      <div class="container">
         <h1 class="jumbotron-heading">John Doe</h1>
         <p class="lead text-muted">Hi, i'm John Doe and that's my blog and portfolio website!!!</p>
         <p>
            <a href="#" class="btn btn-primary my-2">Call me!</a>
         </p>
      </div>
   </section>

   <div class="container">
      {{"{% include home/featured-works.html " }}%}

      {{"{% include home/latest-from-blog.html " }}%}
   </div>
```

Chegamos ao final da série? Ainda não! Agora iremos aprender a hospedar o nosso novo site gratuitamente no github!

## Hospedando o site

