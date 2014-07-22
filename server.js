var http     = require('http');
var app      = require('./app/app');
var server   = http.createServer(app);
var mongoose = require('mongoose');
var config   = require('./app/config/');

/*routers*/
var router = require('./app/router/');

router(app);

mongoose.connect(config.MONGO_URL);

server.listen(app.get('port'), function(err){
    if(err){
        console.error(err);
        process.exit(-1);
    }
    console.log('Server running at http://127.0.0.1:'+app.get('port') + '/');
});