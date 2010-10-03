(function() {
  var Listing, listings, render, server;
  Listing = function() {
    var built_out, description, for_lease, lat, lng, location, price, price_type, size;
    ({
      youtubes_urls: [],
      youtube_html: [],
      images: [],
      default_youtube: ""
    });
    for_lease = "";
    location = "";
    size = "";
    price = "";
    price_type = "";
    description = "";
    built_out = "";
    lat = "";
    return (lng = "");
  };
  server = function(method, args, func) {
    return $.ajax({
      type: "POST",
      url: ("/methods/" + (method)),
      data: {
        "args": JSON.stringify(args)
      },
      success: function(data) {
        return func && func(data);
      }
    });
  };
  server.req = function(args, func) {
    return server("request", args, func);
  };
  server.cr = function(args, func) {
    return server("create", args, func);
  };
  server.up = function(args, func) {
    return server("update", args, func);
  };
  server.del = function(args, func) {
    return server("delete", args, func);
  };
  listings = [];
  $(document).ready(function() {
    listings = server.req({
      type: "listing",
      wh: {}
    }, function(data) {
      return console.log(data);
    });
    return server.cr({
      type: "listing",
      obj: {
        price: 100,
        _public: true
      }
    });
  });
  render = function() {
    return display_google_map();
  };
})();
