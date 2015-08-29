var mysql = require('mysql')
var host = "todoapp.cnfegalrlacy.us-west-2.rds.amazonaws.com"
var user = "kunaljaydesai"
var password = "Coltsrule18"
var database = "ToDoApp"

function addQuery(username, status, listName, description){
	var query = 'INSERT INTO items (username, status, description, listName, timestamp) VALUES ("' + username.toString() + '", "' + status.toString() + '", "' + description.toString() + '", "' +listName.toString() + '", "' + Date.now() + '");';
	console.log("ADD QUERY: " + query)
	return query
}

function updateQuery(username, status, listName, description, id){
	var query = 'UPDATE items SET username="' + username.toString() + '", status="' + status.toString() +  '", listName="' + listName.toString() +  '", description="' +  description.toString() + '" WHERE id=' + id + ';';
	console.log("UPDATE QUERY: " + query);
	return query;
}

exports.addItem = function(username, status, listName, description, cb){
	var connection = mysql.createConnection({
		host: host,
		user: user,
		password: password,
		database: database
	});
	connection.connect();
	console.log("USERNAME: " + username)
	console.log("STATUS: " + status)
	console.log("LISTNAME: " + listName)
	connection.query(addQuery(username, status, listName, description), function(err, rows, fields){
		console.log(err);
		cb(rows.insertId);
	});
	connection.end();
}

exports.updateItem = function(id, username, status, listName, description, cb){
	var connection = mysql.createConnection({
		host: host,
		user: user,
		password: password,
		database: database
	});
	connection.connect();
	connection.query(updateQuery(username, status, listName, description, id), function(err, rows, fields){
		console.log(err);
		cb(true);
	});
	connection.end();
}