var express = require('express');
var router = express.Router();
var db = require('../functions/db');

router.get('/', function(req, res, next){
	res.render('list')
});

router.post('/', function(req, res, next){
	var listName = req.body.listName;
	var username = req.body.username;
	var status = req.body.status;
	db.listItems(username, listName, status, function(data){
		res.json({"items" : data});
	});
});

module.exports = router;