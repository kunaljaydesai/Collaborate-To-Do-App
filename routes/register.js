var express = require('express');
var router = express.Router();

var db = require('../functions/db');

router.get('/', function(req, res, next){
	res.render('register');
});

router.post('/', function(req, res, next){
	var firstName = req.body.firstname;
	var lastName = req.body.lastname;
	var userName = req.body.username;
	var college = req.body.college;
	var password = req.body.password;
	var email = req.body.email;
	db.newUser(firstName, lastName, userName, password, email, college, function(data){
		res.json({'response' : data});
	});
	
});

module.exports = router;