var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json


var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  } 
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
};

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

var Item = require('./models/item');


app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

//PUT route, updates the item by id from the DB
app.put('/items/:id', function(req,res) {
    var id = {_id:req.body._id};
    var update = {name:req.body.name};
   Item.findOneAndUpdate(id,update, function(err,items) {
         if (err) {
             return res.status(500).json({
                 message: 'Internal Server Error'
             });
         }
         res.status(201).json(items);
   });
});

//DELETE route, removes the item by name from the DB
app.delete('/items/:id', function(req,res) {
   Item.remove({
       _id: req.params.id
   }, function(err,item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
   });
});

exports.app = app;
exports.storage = storage;


app.listen(process.env.PORT || 8080, process.env.IP);