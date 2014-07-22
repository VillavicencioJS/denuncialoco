'use strict';

module.exports = {
    MONGO_URL: 'mongodb://'+process.env.USER+':'+process.env.PASSWORD+'@'+process.env.URL+'/'+process.env.DATABASE
}
