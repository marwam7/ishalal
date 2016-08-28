var mongojs = require('mongojs');
cors = require('cors');

module.exports = function (app, db) {
    app.use(cors());
        app.get('/data/ingredients', function (req, res) {
            db.ingredients.find(function (err, ingredients) {
                console.log('stores:', ingredients);
                res.json(ingredients);
                //res.send(JSON.stringify(stores));
            });
        });
app.get('/data/stores', function (req, res) {
    db.stores.find(function (err, stores) {
        console.log('stores:', stores);
        res.json(stores);
        //res.send(JSON.stringify(stores));
    });
});
    app.get('/data/stores1', function (req, res) {
    db.stores1.find(function (err, stores1) {
        console.log('stores1:', stores1);
        res.json(stores1);
        //res.send(JSON.stringify(stores));
    });
});
app.post('/data/stores1', function (req, res) {
    console.log(req.body);
    db.stores1.insert(req.body, function (err, stores1) {
        console.log('stores1:', stores1);
        res.json(stores1);
        //res.send(JSON.stringify(stores));
    });
});
//app.post('/data/stores',function(req,res){
//    db.stores.insert(req.body,function(err,stores){
//        db.stores1.find(function (err, stores1) {
//        console.log('stores1:', stores1);
//        res.json(stores1);
//        //res.send(JSON.stringify(stores));
//    });
//       
//    });
//});
app.post('/data/stores1/:id', function (req, res) {
    var id = mongojs.ObjectId(req.params.id);
    db.stores1.findAndModify({
        "query": {
            _id : id
        }
        , "remove": true
    }, function (err, stores) {
        if (stores) {
            db.stores.insert(stores, function (err, stores) {
                console.log('stores:', stores);
                db.stores1.find(function (err, stores1) {
                    console.log('stores1:', stores1);
                    res.json(stores1);
                    //res.send(JSON.stringify(stores));
                });
         
            });
        } 
    });
});
app.delete('/data/stores1/:stores_id', function (req, res) {
    console.log("deletet id :"+req.params.stores_id);
    db.stores1.remove({
           _id: new mongojs.ObjectID(req.params.stores_id)
    }, function (err, stores1) {
        console.log('After deletion', err, stores1);
	db.stores1.find(function (err, stores1) {
        console.log('stores1:', stores1);
        res.json(stores1);
        //res.send(JSON.stringify(stores));
    });
    });
    
});   
    app.delete('/data/stores/:stores_id', function (req, res) {
    db.stores.remove({
           _id: new mongojs.ObjectID(req.params.stores_id)
    }, function (err, stores) {
	db.stores.find(function (err, stores) {
        console.log('stores:', stores);
        res.json(stores);
        //res.send(JSON.stringify(stores));
    });
    });
    
});

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};