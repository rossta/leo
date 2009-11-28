var fixture = function(html) {
  $fixture = $("#fixture");
  if (!$fixture.length) $fixture = $("<div id='fixture'></div>").appendTo('body');
  $scenario = $("<div class='scenario'></div>");
  $fixture.append($scenario.append(html));
};