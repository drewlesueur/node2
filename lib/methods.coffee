this.methods =
  create : (args, req, res) ->
    db.collection args.type, (err, collection) ->
      if err
        console.log err
        res.send "bro"
      else
        collection.insert args.obj, (err, docs) ->
          res.send docs
        
   request : (args, req, res) ->
    db.collection args.type, (err, collection) ->
      if err
        res.send "broke"
      else
        collection.find args.wh, (err, cursor) ->
          
          cursor.toArray (err, docs) ->
            res.send docs

  update : (args, req, res) ->
    db.collection args.type, (err, collection) ->
      if err
        res.send "broke"
      else
        collection.update args.wh, args.va, {upsert: args.upsert, multi: args.multi}, (err, wha) ->
          
          res.send wha
          
          
  delete: () ->