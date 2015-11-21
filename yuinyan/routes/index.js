var express = require('express');

var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
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
        db.close();
      });
    });
});

router.post('/getuserdata', function(req, res){
    console.log(!!req.body&&!!req.body._id);
    MongoClient.connect(mongoPath, function(err, db) {
      assert.equal(null, err);
      db.collection('user').findOne({"_id":new ObjectID(req.body._id)},function(data,result){
        res.json(result);
      });
    });
});

module.exports = router;
