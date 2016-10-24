---
layout: page
---

<h1>My open source projects</h1>

<div class="row">
  <div class="col-md-offset-3 col-md-6">
    <div class="filter">
      <div class="row">
        <div class="col-md-4" data-filter="all">
          <div class="filter-option">
            <span>All</span>
          </div>
        </div>
        <div class="col-md-4" data-filter="freecodecamp">
          <div class="filter-option">
            <span>Free Code Camp</span>
          </div>
        </div>
        <div class="col-md-4" data-filter="rails">
          <div class="filter-option">
            <span>Ruby on Rails</span>
          </div>
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