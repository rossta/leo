var load = function(file) {
  if (!this.fileLoader) this.fileLoader = new FileLoader();
  return this.fileLoader.tryLoading(file);
},

fixture = function(html) {
  $fixture = $("#fixture");
  if (!$fixture.length) $fixture = $("<div id='fixture' class='scenario'></div>").appendTo('body');
  $fixture.html(html);
  return $fixture;
},

cleanFixtures = function() {
  return $("#fixture").empty();
},

mockEvent = function(x, y) {
  var mockEvent = Screw.Matchers.mock(Event);
  if (x) Screw.Matchers.stub(mockEvent, "pageX").and_set_to(x);
  if (y) Screw.Matchers.stub(mockEvent, "pageY").and_set_to(y);
  return mockEvent;
},

log = function() {
  if (window.console) window.console.log.apply(window.console, arguments);
};