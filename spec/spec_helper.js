Screw.Matchers["include"] = {
  match: function(expected, actual) {
    for(var i = 0; i < actual.length; i++) {
      if (Screw.Matchers["equal"]["match"](expected, actual[i])) {
        return true;
      }
    }
    return false;
  },

  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to contain ' + $.print(expected);
  }
};

var fixture = function(html) {
  $fixture = $("#fixture");
  if (!$fixture.length) $fixture = $("<div id='fixture'></div>").appendTo('body');
  $scenario = $("<div class='scenario'></div>");
  $fixture.append($scenario.append(html));
};