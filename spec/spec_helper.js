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
require("../lib/ac.js");
require("../lib/ac.observable.js");
require("../lib/ac.event_handling.js");
require("../lib/ac.canvas.js");
require("../lib/ac.sandbox.js");
require("../lib/ac.logger.js");
require("../lib/ac.position.js");
require("../lib/ac.drawing.js");
require("../lib/ac.painter.js");
require("../lib/ac.brush.js");
require("../lib/ac.drawing.js");

// Specs
require("ac.drawing_spec.js");
require("ac.painter_spec.js");
require("ac.core_spec.js");
require("ac.position_spec.js");
require("ac.brush_spec.js");
