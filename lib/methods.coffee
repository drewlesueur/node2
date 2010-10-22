create = (args, req, res) ->
  db.collection args._type, (err, collection) ->
      if err
        console.log err
        res.send "bro"
      else
        
        args._user = req.user()
        collection.insert args, (err, docs) ->
          if err
            console.log err
            res.send "super error"
          res.send "1"
  
this.methods =
  insert : insert
  request : (args, req, res) ->
    db.collection args.type, (err, collection) ->
      if err
        res.send "brokep"
      else
        try
          if "_id" of args.wh
            args.wh._id = ObjectID.createFromHexString(args.wh._id)
          args.wh["$where"] = "this._user == '#{req.user()}' || this._public == true"
          collection.find args.wh, (err, cursor) ->
            cursor.toArray (err, docs) ->
              res.send docs
        catch e
          res.send e
  update : (args, req, res) ->
    db.collection args._type, (err, collection) ->
      if err
        res.send "broke"
      else
        args.wh._user = req.user()
        if "_id" of args.wh
          args.wh._id = ObjectID.createFromHexString(args.wh._id)
        collection.update args.wh, args.va, {upsert: args.upsert, multi: args.multi}, (err, wha) ->
          res.send wha
          
  remove: (args, req, res) ->
     db.collection args._type, (err, collection) ->
      if err
        res.send "broke"
      else
        args.wh._user = req.user()
        if "_id" of args.wh
          args.wh._id = ObjectID.createFromHexString(args.wh._id)
        collection.remove args.wh, (err, collection) ->
          res.send "done"
  
  test: () ->
    console.log "test"
  
  #use upsert instead of this!  
  addedit: (args, req, res) ->
    console.log "got to add edit"
    db.collection args._type, (err, collection) ->
      if err
        res.send "addedit error"
      else
        console.log "bloat"
        try
          if "_id" of args #update
            orig_args = args
            args = {}
            args.wh = {}
            args.wh._id = orig_args._id
            delete orig_args._id
            args.va = orig_args
            args._type = orig_args._type
            this.update args, req, res
          else   #create    
            create args, req, res
        catch e
          res.send e
            
  