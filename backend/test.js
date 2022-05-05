var mysql = require('mysql');
var connectionOLD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'eldenRingMap',
    port: 3306
});

var connectionNEW = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'EldenRingMap_zhTW',
    port: 3306
});

connectionOLD.connect(function(err) {
    if (err) {
        console.log(err)
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
  });

connectionNEW.connect(function(err) {
    if (err) {
        console.log(err)
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});


