require = function(src) {
  var element = document.createElement("script");
  element.setAttribute("type", "text/javascript");
  element.setAttribute("src", src);
  document.getElementsByTagName("head")[0].appendChild(element);
};

require('support/spec.js');
require('support/file_loader.js');

// Test framework
require("../vendor/screw-unit/lib/screw.builder.js");
require("../vendor/screw-unit/lib/screw.matchers.js");
require("../vendor/screw-unit/lib/screw.events.js");
require("../vendor/screw-unit/lib/screw.behaviors.js");
require("../vendor/screw-unit/lib/jquery.fn.js");
require("../vendor/screw-unit/lib/jquery.print.js");
require("../vendor/smoke/lib/smoke.core.js");
require("../vendor/smoke/lib/smoke.mock.js");
require("../vendor/smoke/lib/smoke.stub.js");
require("../vendor/smoke/plugins/screw.mocking.js");

// Vendor
require("../vendor/base/base.js");

// Under test
require("../lib/leo.js");

// Specs
require("leo_spec.js");
