(function() {
  var body, display_add_listing, display_left_panel, html, listing, listings, map, render, render_add_listing, render_form, render_google_map, server;
  map = "";
  body = $("body");
  "Listing = () ->\nyoutubes_urls : []\nyoutube_html: []\nimages : []\ndefault_youtube: \"\"\nfor_lease = \"\"\nlocation = \"\"\nsize = \"\"\nprice = \"\"\nprice_type = \"\"\ndescription = \"\"\nbuilt_out = \"\"\nlat = \"\"\nlng = \"\"";
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
    var div_map, latlng, myOptions;
    div_map = html.div().attr("id", "map").css({
      width: 800,
      height: 500,
      position: 'absolute',
      left: 300,
      top: 0
    });
    body.append(div_map);
    latlng = new google.maps.LatLng(33.4222685, -111.8226402);
    myOptions = {
      zoom: 11,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return (map = new google.maps.Map(document.getElementById("map"), myOptions));
  };
  render = function() {
    var add_listing, map_div;
    map_div = render_google_map();
    add_listing = render_add_listing(listing);
    return body.append(add_listing);
  };
  render_add_listing = function(listing) {
    var listing_div, save_listing_button;
    listing_div = render_form();
    save_listing_button = {};
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
  render_form = function() {
    return "<select id=\"for_lease\">\n  <option>For Lease</option>\n  <option>For Purchase</option>\n</select>\nLocation\n<input id=\"location\">\nSize\n<input id=\"Size\">\nPrice\n<input id=\"price\">\nDescription\n<textarea id=\"desc\"></textarea>\n\nSize\n<input type=\"text\">\n";
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
