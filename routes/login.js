var express = require('express');
var router = express.Router();
var db = require('../functions/db');
router.get('/', function(req, res, next){
	res.render('login');
});

router.post('/', function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;
	db.login(username, password, function(data){
		res.json({'response' : data});
	})
	
});

module.exports = router;