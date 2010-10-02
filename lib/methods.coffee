this.methods =
  create : (args, req, res) ->
    db.collection args.type, (err, collection) ->
      if err
        res.send "bro"
      else
        collection.insert args.obj, (err, docs) ->
          res.send docs
   request : (args, req, res) ->
    db.collection args.type, (err, collection) ->
      if err
        res.send "brokep"
      else
        if "_id" of args.wh
          args.wh._id = ObjectID.createFromHexString(args.wh._id)
        collection.find args.wh, (err, cursor) ->
          cursor.toArray (err, docs) ->
            res.send docs

  update : (args, req, res) ->
    db.collection args.type, (err, collection) ->
      if err
        res.send "broke"
      else
        if "_id" of args.wh
          args.wh._id = ObjectID.createFromHexString(args.wh._id)
        collection.update args.wh, args.va, {upsert: args.upsert, multi: args.multi}, (err, wha) ->
          
          res.send wha
          
  delete: (args, req, res) ->
     db.collection args.type, (err, collection) ->
      if err
        res.send "broke"
      else
        if "_id" of args.wh
          args.wh._id = ObjectID.createFromHexString(args.wh._id)
        collection.remove args.wh, (err, collection) ->
          res.send "done"
        
            