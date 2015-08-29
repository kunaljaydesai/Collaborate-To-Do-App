var express = require('express');
var router = express.Router();
var db = require('../functions/db')


router.get('/', function(req, res, next){
	res.render('update');
});

router.post('/', function(req, res, next){
	var username = req.body.username;
	var listName = req.body.listName;
	var time = Date.now();
	var status = req.body.status;
	var description = req.body.description;
	var id = req.body.id;
	db.updateItem(id, username, status, listName, description, function(data){
		if (data){
			res.json({'updated' : 'true'});
		}
	});
});

module.exports = router;