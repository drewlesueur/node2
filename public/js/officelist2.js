(function() {
  var server;
  server = function(method, args) {
    return $.ajax({
      type: "POST",
      url: ("/methods/" + (method)),
      data: {
        "args": JSON.stringify(args)
      },
      success: function(data) {
        return console.log(data);
      }
    });
  };
  server.req = function(args) {
    return server("request", args);
  };
  server.cr = function(args) {
    return server("create", args);
  };
  server.up = function(args) {
    return server("update", args);
  };
  server.del = function(args) {
    return server("delete", args);
  };
  $(document).ready(function() {
    return server.cr({
      type: "listing",
      obj: {
        price: 100,
        _public: true
      }
    });
  });
})();
