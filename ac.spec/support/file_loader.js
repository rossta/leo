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
};