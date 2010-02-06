var requests = 0,
responses = 0,
require = function() {
  requests += 1;

  var src = "", element = document.createElement("script");
  for (var i = 0; i < arguments.length; i++) { src += arguments[i]; }
  element.setAttribute("type", "text/javascript");
  element.setAttribute("src", src);
  element.onload = function() { responses += 1; };
  document.getElementsByTagName("head")[0].appendChild(element);
},
executeTests = function() {
  console.log("Requests: " + requests + ", Responses: " + responses);
  if (requests > responses) setTimeout(executeTests, 100);
  else $(window).load();
},

DIR = { VENDOR: "../vendor/", LIB: "../lib/" };

require('support/spec.js');
require('support/file_loader.js');

// Test framework
require(DIR.VENDOR, "screw-unit/lib/screw.builder.js");
require(DIR.VENDOR, "screw-unit/lib/screw.matchers.js");
require(DIR.VENDOR, "screw-unit/lib/screw.events.js");
require(DIR.VENDOR, "screw-unit/lib/screw.behaviors.js");
require(DIR.VENDOR, "screw-unit/lib/jquery.fn.js");
require(DIR.VENDOR, "screw-unit/lib/jquery.print.js");
require(DIR.VENDOR, "smoke/lib/smoke.core.js");
require(DIR.VENDOR, "smoke/lib/smoke.mock.js");
require(DIR.VENDOR, "smoke/lib/smoke.stub.js");
require(DIR.VENDOR, "smoke/plugins/screw.mocking.js");

// Vendor
require(DIR.VENDOR, "underscore/underscore.js");
require(DIR.VENDOR, "base/base.js");

// Under test
require(DIR.LIB, "leo.js");
require(DIR.LIB, "leo.modules.js");
require(DIR.LIB, "leo.handlers.js");
require(DIR.LIB, "leo.commands.js");
require(DIR.LIB, "leo.graphics.js");
require(DIR.LIB, "leo.nodes.js");
require(DIR.LIB, "leo.builder.js");
require(DIR.LIB, "leo.stack.js");

// Specs
require("leo.commands.spec.js");
require("leo.nodes.spec.js");
require("leo.graphics.spec.js");
require("leo.modules.spec.js");
require("leo.spec.js");

executeTests();