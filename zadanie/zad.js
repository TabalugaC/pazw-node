
const mysql = require('mysql');





const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'mariadb',  
    database: 'baza'     
});

connection.connect(function(err){
if(err){
    console.log(err);
}else{
    console.log("połączono");
}
});