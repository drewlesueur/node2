(function() {
  var Listing, body, display_add_listing, display_left_panel, html, listing, listings, render, render_add_listing, render_google_map, server;
  "Listing = () ->\nyoutubes_urls : []\nyoutube_html: []\nimages : []\ndefault_youtube: \"\"\nfor_lease = \"\"\nlocation = \"\"\nsize = \"\"\nprice = \"\"\nprice_type = \"\"\ndescription = \"\"\nbuilt_out = \"\"\nlat = \"\"\nlng = \"\"";
  Listing = {
    update: function() {
      return console.log(arguments);
    }
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
  listing = {};
  html = {
    div: function() {
      return $("<div><" + "/div>");
    },
    input: function() {
      return $("<input />");
    },
    br: function() {
      return $("<br />");
    },
    span: function() {
      return $("<span><\/span>");
    },
    button: function() {
      return $('<input type="button" />');
    }
  };
  render_google_map = function() {
    var div_map;
    div_map = html.div();
    return div_map.text("Google Map replacement");
  };
  body = $("body");
  render = function() {
    var add_listing, map_div;
    map_div = render_google_map();
    add_listing = render_add_listing(listing);
    body.append(map_div);
    return body.append(add_listing);
  };
  render_add_listing = function(listing) {
    var listing_div, save_listing_button;
    listing_div = html.div();
    listing_div.append(html.div().text("Location"));
    listing_div.append(html.input().attr("class", "location add"), html.br());
    listing_div.append(html.div().text("Price"));
    save_listing_button = html.button().val("save");
    save_listing_button.click(function() {
      var location, price;
      location = $(".add.location").val();
      price = $(".add.location").val();
      return Listing.update(listing, {
        location: location,
        price: price
      });
    });
    return listing_div.append(html.input().attr("class", "price add"), html.br(), save_listing_button);
  };
  display_left_panel = function() {};
  $(document).ready(function() {
    listings = server.req({
      type: "listing",
      wh: {}
    }, function(data) {
      return console.log(data);
    });
    render();
    return null;
    return server.cr({
      type: "listing",
      obj: {
        price: 100,
        _public: true
      }
    });
  });
  display_add_listing = function() {};
})();
