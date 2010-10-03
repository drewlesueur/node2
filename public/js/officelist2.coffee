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

$(document).ready () ->
  listings = server.req
    type: "listing"
    wh: {}
    , (data) ->
      console.log data
  
  
  server.cr
    type: "listing"
    obj:
      price: 100
      _public: true
      
      
      
render = () ->
  display_google_map()
  

