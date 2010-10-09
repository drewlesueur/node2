(function() {
  var Listing, add_google_map_marker, add_listing_form, adding_markers, body, display_add_listing, display_left_panel, html, listing, listings, map, remove_adding_markers, render, render_add_listing, render_google_map, server, set;
  map = "";
  body = $("body");
  "Listing = () ->\nyoutubes_urls : []\nyoutube_html: []\nimages : []\ndefault_youtube: \"\"\nfor_lease = \"\"\nlocation = \"\"\nsize = \"\"\nprice = \"\"\nprice_type = \"\"\ndescription = \"\"\nbuilt_out = \"\"\nlat = \"\"\nlng = \"\"";
  (function() {
    return ($.fn.typed = function(settings) {
      var config;
      config = {
        callback: function() {},
        wait: 750
      };
      if (settings) {
        $.extend(config, settings);
      }
      this.each(function() {
        var save, t, that;
        $(this).attr('old-val', $(this).val());
        that = this;
        save = function() {
          var old_val, val;
          val = $(that).val();
          old_val = $(that).attr("old-val");
          if (val !== old_val) {
            config.callback.call(that);
            return $(that).attr("old-val", val);
          }
        };
        t = "";
        $(this).keydown(function() {
          return clearTimeout(t);
        });
        return $(this).keyup(function() {
          return (t = setTimeout(save, config.wait));
        });
      });
      return this;
    });
  })(jQuery);
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
  set = function() {};
  Listing = {
    set: function(listing, k, v) {
      listing[k] = v;
      return k === "location" ? add_google_map_marker(v) : null;
    }
  };
  adding_markers = [];
  remove_adding_markers = function() {
    var _a, _b, _c, _d, i;
    _a = []; _c = adding_markers;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      i = _c[_b];
      _a.push(i.setMap(null));
    }
    return _a;
  };
  add_google_map_marker = function(wherethe) {
    var geocoder;
    remove_adding_markers();
    geocoder = new google.maps.Geocoder();
    return geocoder.geocode({
      address: wherethe
    }, function(results, status) {
      var marker;
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          title: "hello world",
          draggable: true
        });
        return adding_markers.push(marker);
      } else {
        return alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };
  render_add_listing = function(listing) {
    var listing_div, save_listing_button;
    listing_div = $(add_listing_form());
    save_listing_button = listing_div.find("#save_listing");
    listing_div.find("#location").change(function() {
      return Listing.set(listing, "location", $(this).val());
    });
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
  add_listing_form = function() {
    return "<pre>\n<select id=\"for_lease\">\n  <option>For Lease</option>\n  <option>For Purchase</option>\n</select>\nLocation\n<input id=\"location\">\nSize\n<input id=\"Size\">\nPrice\n<input id=\"price\">\nDescription\n<textarea id=\"desc\"></textarea>\n<input type=\"button\" id=\"save_listing\" value=\"Save\"/>\n</pre>";
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
