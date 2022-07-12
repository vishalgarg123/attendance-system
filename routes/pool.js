var mysql=require('mysql')
var pool=mysql.createPool({
host:'localhost',
port:3306,
user:'root',
password:'vishal12#',
database:'attendance_Management',
connectionLimit:100

 })
 module.exports = pool;


 