---
layout: page
---

<h1>My open source projects</h1>

<div class="filter">
	<ul>
		<li class="filter-option" data-filter="all">All</li>
		<li class="filter-option" data-filter="freecodecamp" >Free Code Camp</li>
	</ul>
</div>

<div class="list">
	<div class="row">
		{% for project in site.projects %}
			<div class="project col-md-4" data-category="{{ project.category}}">
				<div class="inner">
					<h2>{{ project.name }}</h2>
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