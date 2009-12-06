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
},
FileLoader = function() {
  this.xhr = function() {
    return this.ieXhr() || new XMLHttpRequest();
  };
  this.ieXhr = function() {
    function object(str) {
      try { return new ActiveXObject(str); } catch(e) {}
    }
    return object('Msxml2.XMLHTTP.6.0') ||
      object('Msxml2.XMLHTTP.3.0') ||
      object('Msxml2.XMLHTTP') ||
      object('Microsoft.XMLHTTP');
  };
  this.tryLoading = function(file) {
    try { return this.load(file); }
    catch (e) {};
  };
  this.load = function(file) {
    var request = this.xhr();
    request.open('GET', file, false);
    request.send(null);
    if (request.readyState == 4 && (request.status == 0 || request.status.toString().charAt(0) == 2)) return request.responseText;
  };
},
load = function(file) {
  if (!this.fileLoader) this.fileLoader = new FileLoader();
  return this.fileLoader.tryLoading(file);
};
