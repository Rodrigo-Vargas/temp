---
title: Curriculo
lang: pt
ref: resume
permalink: /curriculo
layout: page
---

<div class="resume">
  <div class="employment-content">
    <h2>Carreira</h2>
    <div class="employment list">
      <div class="item">
        <h4>2013 - Atual</h4>
        <h3>Engenheiro de Software - Conectt</h3>
        <p>
          A Conectt é uma compania com experiência em desenvolvimento de websites, intranets e análise de marketing digital para grandes empresas. Aqui, eu tive a oportunidade de trabalhar com grandes empresas como clientes, como Dupont Pioneer, Universal Leaf Tobbacos, Grupo Boticário, Promonlogcais e Demarest Advogados.
        </p>

        <p>Como integrante do time de projetos, aprendi muito  ao trabalhar em times em projetos de mais de 600 horas de trabalho. Nestes projetos enfrentei novos desafios como:      
        </p>
        <ul>
          <li>Prazos rígidos de entregas;</li>
          <li>Seguir e propor padrões para codificação;</li>
          <li>Análise de requisitos e estimativa de tempo;</li>
          <li>Detecção de melhorias.</li>
        </ul>
        <p>Além disso, me tornei uma referência técnica em alguns deles, devido a proatividade e gostar muito de e interagir e trocar experiências com os outros desenvolvedores.</p>

        <p>Recentemente, estou trabalhando com o time de manutenção, onde temos o foco nos mais diversos tipos de demandas, do front-end ao back-end, juntamente com análise de requisitos, documentação, estimativa de prazos e propostas de melhorias para os produtos dos clientes.</p>
        
        <p>
          A Conectt trabalha principalmente com tecnologias Microsoft, focada na plataforma Sharepoint (2007, 2010, 2013). Por ser uma plataforma baseada em .NET, o backend é composto exclusivamente a tecnologia C#. Mais precisamente, C# com web forms. No front-end já trabalhei com tecnologias:
        </p>

        <ul>
          <li>Angular</li>
          <li>jQuery</li>
          <li>CSS</li>
          <li>HTML</li>
        </ul>

        <p>
          Ainda, tenho a oportunidade de trabalhar com times remotos e com a modalidade de home office ocasionalmente, tendo este tipo de comunicação como natural no meu dia a dia. Ainda, sou responsável juntamente com a supervisora da unidade por entrevistar novos candidatos ao time de desenvolvimento.
        </p>
      </div>

      <div class="item">
        <h4>2012 - 2013</h4>
        <h3>Desenvolvedor - Imediata Informática Empresarial</h3>
        <p>
          A Imediata é uma pequena empresa focada no desenvolvimento e manuntenção dos sistemas ERP desenvolvidos pela mesma usando a  tecnologia Cobol. Possui clientes dos mais diversos ramos, sendo os principais, mercados, engenhos e escritórios contabeis.
        </p>

        <p>Começei aqui como estagiário e fui promovido a desenvolvedor após um ano. Como estagiário no time de desenvolvimento, meu trabalho  era  aplicar correções em rotinas de todos os 6 produtos que a empresa possuia. Trabalhando aqui tive dois grandes desafios técnicos: trabalhar com uma tecnologia legada , Cobol, cuja principal dificuldade é encontrar material de estudo na internet e ajudar a migrar os sistemas para C#, na época, duas novas linguagens para mim.
        </p>

        <p>Como meu primeiro trabalho dentro de um ambiente corporativo, aprendi todos os desafios que a faculdade não pode proporcionar:</p>
        <ul>
          <li>Ler e compreender códigos realmente grandes, com inúmeras regras de négocio;</li>
          <li>Desenvolvimento colaborativo;</li>
          <li>Contato com cliente;</li>
          <li>Metas e prazos, e todos os desafios e cobranças que qualquer ambiente corporativo possui.</li>
        </ul>

        <p>
          Durante os 18 meses que trabalhei aqui, exerci todas as funções possíveis no departamento de desenvolvimento, realizando desde a etapa de levantamento de requisitos funcionais juntamente ao cliente, até o desenvolvimento e entrega do código. Também,  desenvolvi um completo sistema de comissões para o ERP, integrando com os módulos de notas fiscais, gerência contabil, e mais alguns de menor importância. Um trabalho que exigiu bastante esforço e constante contato com o cliente, que é utilizado até hoje pelo que sei.
        </p>
      </div>
    </div>
  </div>

  <div class="skills-content">
    <h2>Habilidades</h2>
    <ul>
      <li>Ruby on Rails</li>
      <li>C#</li>
      <li>Cobol</li>
      <li>Javascript</li>
      <li>jQuery</li>
      <li>Angular</li>
      <li>CSS</li>
      <li>HTML</li>
      <li>Node.js</li>
      <li>PHP</li>
      <li>Laravel</li>
      <li>SQL Server</li>
      <li>PostgreSQL</li>
      <li>Git, SVN e Team Foundation Server</li>
      <li>User Experience</li>
      <li>Design responsivo</li>
      <li>Criação de layouts básicos</li>
    </ul>
  </div>

  <div class="certifications-content">
    <h2>Certificações</h2>
    <div class="certifications list">
      <div class="row">
        {% for certification in site.certifications %}
          <div class="col-md-4">
            <div class="work" style="background-image:url(/assets/images/{{ certification.imageUrl}})">
              <a class="btn" data-backdrop="true" data-toggle="modal" data-target="#{{ certification.slugTitle }}">
                <div class="dark-wrapper">
                  <h3 class="title">{{ certification.title }}</h3>
                  <span>Ver certificação</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Modal -->
          <div class="modal fade" tabindex="-1" role="dialog" id="{{ certification.slugTitle }}">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="row">
                    <div class="col-xs-10">
                      <img class="img-responsive" src="/assets/images/{{ certification.imageUrl }}" alt="">                    
                    </div>
                    <div class="col-xs-2">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                  </div>

                  <h2 class="title">{{ certification.title }}</h2>
                  <p>{{ certification.description }}</p>
                </div>
              </div>
            </div>
          </div>

        {% endfor %}
      </div>
    </div>
  </div>

  <div class="my-modal-backdrop"></div>
</div>