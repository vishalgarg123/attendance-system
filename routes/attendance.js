var express = require('express');
var router = express.Router();
var pool= require("./pool");
var LocalStorage=require("node-localstorage").LocalStorage;
var localStorage=new LocalStorage('./scratch');


router.get('/displaybyid', function(req, res, next) {
  pool.query('select * from attendance  where Employeeid=?',[req.query.Employeeid],function(error,result){

    if(error)
    {
      res.render('displaybyemployeeid',{data:[]});
    }
    else
    {
      res.render('displaybyemployeeid',{data:result[0]});
    }
 
  
  });

})



router.get('/attendance', function(req, res, next) {
  var result=JSON.parse(localStorage.getItem('admin'))
  if(result)
  res.render('attendanceinterface', {msg: '' });
  else
  {
    res.render("loginpage",{msg: ''})
  }
});



router.get('/fetchallstudent', function(req, res) {
  pool.query('select * from student',function(error,result){

if(error)
{
  res.status(500).json([])
}
else
{
  res.status(200).json(result)
}

  });
});
router.post("/addnewrecord",function(req,res){


pool.query("insert into attendance(Employeeid,Employeename,Department,Position,joiningdate,status) values(?,?,?,?,?,?)",[ req.body.Employeeid, req.body.Employeename,req.body.Department,req.body.Position,req.body.joiningdate,req.body.status],function(error,result){
     
  if(error)
{ console.log("xxxxxxxxxxxxxxxxx",error)
   res.render('attendanceinterface',{msg: 'Server Error,Record Not Submitted'})
}
else
{
  res.render('attendanceinterface',{msg: 'Record submitted successfully'})
}



})

})
router.get('/displayall', function(req, res, next) {
  var result=JSON.parse(localStorage.getItem('admin'))
  if(!result)
  res.render("loginpage",{msg: ''})

  pool.query('select * from attendance ', function(error,result){
    console.log(result)
    if(error)
    {
      res.render('displayall',{data:[]});
    }
    else
    {
      res.render('displayall',{data:result});
    }
  
  
  });3
 
  });
  router.post("/editdeleterecord",function(req,res){
    console.log("BODY:",req.body)
    if(req.body.btn=="edit")
    {
    
  
 
  
  
     pool.query("update attendance set Employeename=?,Department=?,Position=?,status=? where Employeeid=?",[ req.body.Employeename,req.body.Department,req.body.Position,req.body.status,req.body.Employeeid], function(error,result) {
      
       if(error)
     {  console.log("xxxxxxxxxxxxxxxxx",error)
       res.redirect("/attendance/displayall")
     }
     else
     {   res.redirect("/attendance/displayall")
     }
  
  
  
     })
    }
    else
    {
      pool.query("delete from attendance  where Employeeid=?",[req.body.Employeeid], function(error,result) {
      
        if(error)
      { console.log("xxxxxxxxxxxxxxxxx",error)
         res.redirect("/attendance/displayall")
      }
      else
      {   res.redirect("/attendance/displayall")
      }
   
   
   
      })
    }
  
    
  
    
  
 
  })
module.exports = router;