map = ""
body = $("body") 

"""
Listing = () ->
  youtubes_urls : []
  youtube_html: []
  images : []
  default_youtube: ""
  for_lease = ""
  location = ""
  size = ""
  price = ""
  price_type = ""
  description = ""
  built_out = ""
  lat = ""
  lng = ""
"""



    

    

server = (method, args, func) ->
  $.ajax
    type: "POST",
    url : "/methods/#{method}"
    data: {"args": JSON.stringify(args)}
    success: (data) ->
      func and func data

server.req = (args, func) ->
  server "request", args, func

server.cr = (args, func) ->
  server "create", args, func

server.up = (args, func) ->
  server "update", args, func

server.del = (args, func) ->
  server "delete", args, func
  

listings = []
listing = {} # the listing you are adding

html = 
  div : () ->
    $("<div><"+"/div>")
  input: () ->
    $("<input />")
  br: ->
    $("<br />")
  span:  ->
    $("<span><\/span>")
  button: () ->
    $('<input type="button" />')
  
    
    
render_google_map = () ->
  div_map = html.div().attr("id", "map").css
    width: 800
    height: 500
    position: 'absolute'
    left: 300
    top: 0
    
  body.append div_map
  latlng = new google.maps.LatLng(33.4222685, -111.8226402)
  myOptions = {
    zoom: 11,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"),myOptions)


 
render = () ->
  map_div = render_google_map()
  add_listing = render_add_listing(listing)
  body.append add_listing

render_add_listing = (listing) ->
  
  listing_div = $ render_form()
  
  save_listing_button = {}
  save_listing_button.click () ->
    location = $(".add.location").val()
    price = $(".add.location").val()
    Listing.update listing,
      location: location
      price: price
  listing_div.append html.input().attr("class","price add"), html.br(), save_listing_button
  



render_form = () ->
  """
  <select id="for_lease">
    <option>For Lease</option>
    <option>For Purchase</option>
  </select>
  Location
  <input id="location">
  Size
  <input id="Size">
  Price
  <input id="price">
  Description
  <textarea id="desc"></textarea>
  
  Size
  <input type="text">
  
  """
  
  
display_left_panel = () ->
  
  
  
$(document).ready () ->
  listings = server.req
    type: "listing"
    wh: {}
    , (data) ->
      console.log data
  
  render()
  return
  
  server.cr
    type: "listing"
    obj:
      price: 100
      _public: true
      



display_add_listing = () ->
  
  

  


  

