var express = require('express');

var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var mongoPath = 'mongodb://localhost:27017/yuinyan';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res, next) {
  res.render('index', { title: 'create game' });
});


router.post('/createuser', function(req, res){
  
    console.log(!!req.body&&!!req.body.username);
    
    MongoClient.connect(mongoPath, function(err, db) {
      assert.equal(null, err);
      db.collection('user').insertOne( {"username":req.body.username,"payload":{}},function(err,docsInserted){
        res.json(docsInserted.ops[0]);
      });
    });
});

// router.post('/getuserdata', function(req, res){
//     console.log(!!req.body&&!!req.body._id);
//     MongoClient.connect(mongoPath, function(err, db) {
//       assert.equal(null, err);
//       db.collection('user').find( {"_id":req.body._id,function(err,data){
//         res.json(data.ops[0]);
//       });
//     });
// });

module.exports = router;
