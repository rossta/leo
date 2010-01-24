var scripts = 0;

$(document).bind("scriptReady", function() {
  scripts -= 1;
  if (scripts < 1) {
    console.log(scripts);
    Leo.init();
  }
});

var require = function() {
  scripts += 1;
  console.log(arguments, scripts);

  var src = "", element = document.createElement("script");
  for (var i = 0; i < arguments.length; i++) { src += arguments[i]; }
  element.setAttribute("type", "text/javascript");
  element.setAttribute("src", src);

  if (element.readyState) {  //IE
    element.onreadystatechange = function(e){
      if (element.readyState == "loaded" || element.readyState == "complete") {
        element.onreadystatechange = null;
        $(document).trigger('scriptReady');
      }
    };
  } else {  //Others
    element.onload = function(e) { $(document).trigger('scriptReady'); };
  }
  
  document.getElementsByTagName("head")[0].appendChild(element);
};

require("vendor/base/base.js");
require("lib/leo.js");
