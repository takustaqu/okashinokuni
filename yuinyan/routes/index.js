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
      db.collection('user').insertOne( {
          "username":req.body.username,
          "checkin":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          "currentStation":false
        },function(err,docsInserted){
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

//チェックイン処理
router.post('/checkin', function(req, res){
    
    MongoClient.connect(mongoPath, function(err, db) {
      assert.equal(null, err);
      var objId = new ObjectID(req.body._id);
      var stationId = parseInt(req.body.stationId);
      db.collection('user').findOne({"_id":objId},function(data,result){
          
        var checkins = result.checkin;
        
        checkins[stationId]++;
        
        db.collection('user').update( {"_id":objId}, { $set:{ checkin: checkins,currentStation:stationId} } ,function(data,count,result){
          
          //再検索して値を返す。
          db.collection('user').findOne({"_id":objId},function(data,result){
            res.json(result); 
          });
          
        });
      });
    });
});

//グループ参加機能
router.post('/addgroup', function(req, res){
    
    MongoClient.connect(mongoPath, function(err, db) {
      assert.equal(null, err);
      var objId = new ObjectID(req.body._id);
      var groupId = parseInt(req.body.groupId);
      db.collection('user').findOne({"_id":objId},function(data,result){

        db.collection('user').update( {"_id":objId}, { $set:{groupId:groupId} } ,function(data,count,result){
          
          //再検索して値を返す。
          db.collection('user').findOne({"_id":objId},function(data,result){
            res.json(result); 
          });
          
        });
      });
    });
});

//グループでの取得
router.post('/getgroup', function(req, res){
    console.log(!!req.body&&!!req.body.groupId);
    MongoClient.connect(mongoPath, function(err, db) {
      //assert.equal(null, err);
      var result = [];
      var cursor = db.collection('user').find({"groupId":parseInt(req.body.groupId)});
      cursor.each(function(err, doc) {
          assert.equal(err, null);
          if (doc != null) {
            result.push(doc);
          } else {
            res.json(result);
          }
      });
    });
});






module.exports = router;
