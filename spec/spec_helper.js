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
require("../lib/artcart.js");
require("../lib/artcart.observable.js");
require("../lib/artcart.event_handling.js");
require("../lib/artcart.canvas.js");
require("../lib/artcart.sandbox.js");
require("../lib/artcart.logger.js");
require("../lib/artcart.position.js");
require("../lib/artcart.drawing.js");
require("../lib/artcart.painter.js");
require("../lib/artcart.brush.js");
require("../lib/artcart.drawing.js");

// Specs
require("artcart.drawing_spec.js");
require("artcart.painter_spec.js");
require("artcart.core_spec.js");
require("artcart.position_spec.js");
require("artcart.brush_spec.js");
