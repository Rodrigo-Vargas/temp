---
  layout: page
---
<div class="container">
  <div class="internal">
    <div class="home">
      <div class="intro">
        <h1>Rodrigo Vargas</h1>
        <h2>Full Stack Web Developer</h2>
      </div>
      
      <div class="social-media">
        <a class="github" href="https://github.com/rodrigo-vargas" target="_blank">
          <span class="fa-stack fa-lg">
            <i class="fa fa-github fa-stack-1x"></i>
          </span>
        </a>

        <a class="github" href="mailto:rodrigo@rodrigovargas.me" title="rodrigo@rodrigovargas.me">
          <span class="fa-stack fa-lg">
            <i class="fa fa-envelope fa-stack-1x"></i>
          </span>
        </a>
        
      </div>
    </div>

    <div class="resume">
      <div class="timeline">
        <h2>Linha do tempo</h2>
        <div class="list">
          <% WOR::Collection.new('Cards').items.group_by(&:year).sort.reverse.each do | year, cards | %>
            <div class="year row ">    
              <div class="info col-xs-2 col-sm-1">
                <span><%= year %></span>
              </div>

              <div class="card-list col-xs-10 col-sm-11">
                <div class="row">
                  <% cards.each do | card | %>
                    <div class="col-md-4">
                      <a class="" data-backdrop="true" data-toggle="modal" data-target="#<%= card.slug %>">
                        <div class="card" data-year="<%= card.year %>">
                          <h3><%= card.job_title %> - <%= card.name %></h3>
                          <span><%= card.period %></span>
                        </div>
                      </a>

                      <!-- Modal -->
                      <div class="modal fade" tabindex="-1" role="dialog" id="<%= card.slug %>">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-body">
                              <div class="row">
                                <div class="col-xs-12">
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                              </div>

                              <h2 class="title"><%= card.name %></h2>
                              <p><%= card.content(I18n.locale).html_safe %></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  <% end %>
                </div>
              </div>
            </div> 
          <% end %>
        </div>
      </div>

      <div class="skills-content">
        <h2>Skills</h2>
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
          <li>Responsible layout</li>
          <li>Design of basic layout</li>
        </ul>
      </div>

      <div class="my-modal-backdrop"></div>
    </div>
  </div>
</div>
