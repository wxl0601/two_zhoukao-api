var express = require('express');
var router = express.Router();
var query = require('../mysql/query')

/* GET users listing. */
router.get('/api/list', function(req, res, next) {

  var pageSize = req.query.pageSize,
      pageNum = req.query.pageNum;
      query('select count(*) from two_zhoukao',function(err,results){
          if(err){
            return res.json({code:0,msg:err})
          }else{
            var count = results[0]['count(*)']
            var total = Math.ceil(count/pageSize);
            queryList(total)
          }
          
      })

       function queryList(total){
          var start = (pageNum-1)*pageSize;
          var sql = `select * from two_zhoukao limit ${start},${pageSize}`;

          query(sql,function(err,results){
            if(err){
              return res.json({code:0,msg:err})
            }else{
              res.json({code:1,date:results,total:total})
            }
          })



       }
      

  
});


router.post('/api/add', function(req, res, next) {

       function queryList(total){

          query('insert into two_zhoukao(url,wenzi) values(?,?)',[req.body.url,req.body.wenzi],function(err,results){
            if(err){
              return res.json({code:0,msg:err})
            }else{
              res.json({code:1,date:"成功"})
            }
          })



       }
      

  
});


module.exports = router;
