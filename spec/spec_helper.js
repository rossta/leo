var fixture = function(html) {
  $fixture = $("#fixture");
  if (!$fixture.length) $fixture = $("<div id='fixture'></div>").appendTo('body');
  $scenario = $("<div class='scenario'></div>");
  $fixture.append($scenario.append(html));
},
cleanFixtures = function() {
      $("#fixture").remove();
},
mockEvent = function(x, y) {
  var mockEvent = Screw.Matchers.mock(Event);
  if (x) Screw.Matchers.stub(mockEvent, "clientX").and_set_to(x);
  if (y) Screw.Matchers.stub(mockEvent, "clientY").and_set_to(y);
  return mockEvent;
};
