'use strict';

module.exports = function(req, res) {
    res.render('index', {
        title: 'Denuncialo.Co',
        user: req.user
    });
};