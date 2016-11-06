---
layout: page
---

<h1>My open source projects</h1>

<div class="row">
  <div class="col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
    <div class="filter">
      <div class="row">
        <div class="col-md-3" >
          <a class="filter-option" data-filter="all">
            <span>All</span>  
          </a>
        </div>
        <div class="col-md-3" >
          <a class="filter-option" data-filter="freecodecamp">
            <span>Free Code Camp</span>
          </a>
        </div>
        <div class="col-md-3">
          <a class="filter-option" data-filter="rails">
            <span>Ruby on Rails</span>
          </a>
        </div>
        <div class="col-md-3">
          <a class="filter-option" data-filter="jekyll">
            <span>Jekyll</span>
          </a>
        </div>
        <div class="col-md-3">
          <a class="filter-option" data-filter="">
            <span>Others</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="list">
  <div class="row">
  {% for project in site.projects %}
    <div class="project col-md-4" data-category="{{ project.category }}">
      <div class="inner">
        <div class="ribbon">
          <div class="inner">
            <span class="{{ project.category }}"></span>
            <span>{{ project }}</span>
          </div>
        </div>
        <h2>{{ project.name }}</h2>
        <div class="info">

          {% if project.demo_url != null %}
            <a class="link demo" href="{{ project.demo_url }}" target="_blank">
              <span class="fa-stack fa-lg">
                <i class="fa fa-flask a-stack-2x"></i>
              </span>
              <span class="description">Demo</span>
            </a>
          {% endif %}

          {% if project.source_url != null %}
            <a class="link source" href="{{ project.source_url }}" target="_blank">
              <span class="fa-stack fa-lg">
                <i class="fa fa-github fa-stack-2x"></i>
              </span>
              <span class="description">Code</span>
            </a>
          {% endif %}

        </div>
      </div>
    </div>
  {% endfor %}
  </div>
</div>

<script type="text/javascript">
registerFilterButtons = function()
{
$(".filter-option").click(function(){
  filter($(this).data("filter"));
});
}

filter = function(value)
{
$(".project").each(function(){
  var category = $(this).data("category");

  if (value == category || value == "all")
    $(this).removeClass("hide");
  else
    $(this).addClass("hide");
})
}

$(document).ready(function(){
registerFilterButtons();
});
</script>