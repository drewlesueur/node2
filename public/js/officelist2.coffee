

server = (method, args) ->
  $.ajax
    type: "POST",
    url : "/methods/#{method}"
    data: {"args": JSON.stringify(args)}
    success: (data) ->
      console.log data

server.req = (args) ->
  server "request", args

server.cr = (args) ->
  server "create", args

server.up = (args) ->
  server "update", args

server.del = (args) ->
  server "delete", args
  

$(document).ready () ->
  server.cr
    type: "listing"
    obj:
      price: 100
      _public: true


