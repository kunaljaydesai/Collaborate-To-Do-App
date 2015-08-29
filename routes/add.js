var express = require('express');
var router = express.Router();
var db = require('../functions/db')

router.get('/', function(req, res, next){
	res.render('add');
	/*db.addItem(username, status, listName, timestamp, function(data){
		if(data){
			res.json({"Test" : "Working"});
		}
	});*/
	
});

router.post('/', function(req, res, next){
	var username = req.body.username;
	var status = 'In Progress'
	var listName = req.body.listName
	var timestamp = Date.now() //milliseconds since epoch
	var description = req.body.description;
	db.addItem(username, status, listName, description, function(data){
		res.json({"id" : data, "username" : username, "status" : status, "listName" : listName, "timestamp" : timestamp});
	});
	
});

module.exports = router;