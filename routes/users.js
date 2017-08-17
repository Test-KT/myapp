var express = require('express');
var router = express.Router();
var User=require('./user');
var URL=require('url');
var mysql=require('mysql');
var dbconfig=require('../db/Dbconfig');
var usersql=require('../db/usersql');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUserInfo',function(req,res,next){
  var user=new User();
  var parms=URL.parse(req.url,true).query;
  if(parms.id=='1'){
    user.name='lsl';
    user.city='Gz';
    user.age=24;
  }else{
    user.name='nlt';
    user.city='Nn';
    user.age=24;
  }
  var response={state:1,data:user};
  res.send(JSON.stringify(response));
})


var pool=mysql.createPool(dbconfig.mysql);
var resJson=function(res,ret){
  if(typeof ret=='undefined'){
    res.json({code:'-200',msg:'操作失败'});
  }else{
    res.json(ret);
  }
}

router.get('/addUser',function(req,res,next){
  pool.getConnection(function(err,connection){
    var parms=req.query||req.params;
    console.log(parms.id);
    console.log(parms.name);
    connection.query(usersql.insert,[parms.id,parms.name],function(err,result){
      
      if(result){
        result = {   
          code: 200,   
         msg:'增加成功'
        };  
      }

      resJson(res,result);
      connection.release();
    })
  })
});


module.exports = router;
