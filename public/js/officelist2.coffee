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
  div_map = html.div()
  div_map.text "Google Map replacement"

body = $("body")  
render = () ->
  map_div = render_google_map()
  add_listing = render_add_listing(listing)
  body.append map_div
  body.append add_listing

render_add_listing = (listing) ->
  listing_div = html.div()
  listing_div.append html.div().text "Location"
  listing_div.append html.input().attr("class","location add"), html.br()
  listing_div.append html.div().text "Price"
  
  save_listing_button = html.button().val "save"
  
  save_listing_button.click () ->
    location = $(".add.location").val()
    price = $(".add.location").val()
    Listing.update listing,
      location: location
      price: price
    
    
    
  listing_div.append html.input().attr("class","price add"), html.br(), save_listing_button
  

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
  
  

  


  

