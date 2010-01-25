var require = function() {
  var src = "", element = document.createElement("script");
  for (var i = 0; i < arguments.length; i++) { src += arguments[i]; }
  element.setAttribute("type", "text/javascript");
  element.setAttribute("src", src);
  document.getElementsByTagName("head")[0].appendChild(element);
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
require(DIR.VENDOR, "base/base.js");

// Under test
require(DIR.LIB, "leo.js");
require(DIR.LIB, "leo.canvas.js");

// Specs
require("leo.canvas.spec.js");
require("leo.spec.js");
