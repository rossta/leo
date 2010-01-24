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
require("../ac.lib/ac.js");
require("../ac.lib/ac.observable.js");
require("../ac.lib/ac.event_handling.js");
require("../ac.lib/ac.canvas.js");
require("../ac.lib/ac.sandbox.js");
require("../ac.lib/ac.logger.js");
require("../ac.lib/ac.position.js");
require("../ac.lib/ac.drawing.js");
require("../ac.lib/ac.painter.js");
require("../ac.lib/ac.brush.js");
require("../ac.lib/ac.drawing.js");

// Specs
require("ac.drawing_spec.js");
require("ac.painter_spec.js");
require("ac.core_spec.js");
require("ac.position_spec.js");
require("ac.brush_spec.js");
