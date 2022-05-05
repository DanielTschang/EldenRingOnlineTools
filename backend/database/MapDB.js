
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'eldenRingMap',
    port: 3306
});

// connection.connect(function(err) {
//     if (err) {
//         console.log(err)
//         console.log('connecting error');
//         return;
//     }
//     console.log('connecting success');
//   });

// async function test(){
//     return new Promise((resolve,reject)=>{
//         connection.query(SQLquerys.SiteOfGrace, (err, rows) =>  {
//         err ? reject(err) : resolve(rows);
//         }); 
//     })
// }

// connection.query(SQLquerys.SiteOfGrace, (err, rows) =>  {
//     err ? console.log('') : console.log(rows);
// }); 

// connection.end()

module.exports = connection;