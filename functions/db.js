var mysql = require('mysql')
var pwdHash = require('password-hash');
var host = "todoapp.cnfegalrlacy.us-west-2.rds.amazonaws.com"
var user = "kunal"
var password = "unit1"
var database = "ToDoApp"

function addQuery(username, status, listName, description){
	var query = 'INSERT INTO items (username, status, description, listName, timestamp) VALUES ("' + username.toString() + '", "' + status + '", "' + description.toString() + '", "' +listName.toString() + '", "' + Date.now() + '");';
	console.log("ADD QUERY: " + query)
	return query
}

function updateQuery(username, status, listName, description, id){
	var query = 'UPDATE items SET username="' + username.toString() + '", status="' + status +  '", listName="' + listName.toString() +  '", description="' +  description.toString() + '" WHERE id=' + id + ';';
	console.log("UPDATE QUERY: " + query);
	return query;
}
function listQuery(username, list, status){
	var query = "SELECT * FROM items WHERE username='" + username.toString() + "'AND listName='" + list.toString() + "'AND status='" + status + "';";
	console.log(query);
	return query;
}	

function newUserQuery(firstname, lastname, username, password, email, college){
	var query = 'INSERT INTO users (firstname, lastname, username, password, email, college) VALUES ("' + firstname.toString() + '", "' + lastname.toString() + '", "' + username.toString() + '", "' + password.toString() + '", "' + email.toString() + '", "' + college.toString() + '");';
	console.log(query);
	return query;
}

function checkIfUserExistsQuery(username, email){
	var query = "SELECT * FROM users WHERE username='" + username.toString() + "' or email='" + email.toString() + "';";
	console.log(query);
	return query;
}

function loginQuery(username){
	var query = "SELECT * FROM users WHERE username='" + username.toString() + "';"
	console.log(query);
	return query;
}

checkIfUserExists = function(username, email, cb){
	var connection = mysql.createConnection({
		host: host,
		user: user,
		password: password,
		database: database
	});
	connection.connect(function(err, conn){
		if(err){
			cb(err);
			connection.end();
		}
		else{
			connection.query(checkIfUserExistsQuery(username, email), function(err, rows, fields){
				if (err) throw err;
				if(rows.length == 0){
					cb('success');
				}
				else if(rows[0].username == username){
					cb('username');
				}
				else if(rows[0].email == email){
					cb('email');
				}
				else{
					cb('server issue');
				}
				connection.end();
			});
		}

	});
	
	
}

exports.login = function(username, pwd, cb){
	var connection = mysql.createConnection({
		host: host,
		user: user,
		password: password,
		database: database
	});
	connection.connect();
	connection.query(loginQuery(username), function(err, rows, fields){
		if(rows.length == 1){
			if(pwdHash.verify(pwd, rows[0].password)){
				cb(true)
			}
			else{
				cb('password is incorrect');
			}
		}
		else{
			cb("Username Doesn't Exist");
		}

		connection.end();
	});

}

exports.newUser = function(firstname, lastname, username, pwd, email, college, cb){
	checkIfUserExists(username, email, function(data){
		if(data == 'success'){
			var connection = mysql.createConnection({
				host: host,
				user: user,
				password: password,
				database: database
			});
			connection.connect();
			pwd = pwdHash.generate(pwd);
			connection.query(newUserQuery(firstname, lastname, username, pwd, email, college), function(err, rows, fields){
				console.log(err);
				cb(rows.insertId);
			});
			connection.end();
		}
		else{
			cb(data);
		}
	});
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

exports.listItems = function(username, list, status, cb){
	var connection = mysql.createConnection({
		host: host,
		user: user,
		password: password,
		database: database
	});
	connection.connect();
	connection.query(listQuery(username, list, status), function(err, rows, fields){
		console.log(err);
		cb(rows);
	});
	connection.end();
}


	/*connection.connect(function(err, conn){
		if(err){
			console.log("MYSQL ERROR: " + err);
			cb(err);
			connection.end();
		}
		else{
			connection.query(newUserQuery(firstname, lastname, username, password, email, college), function(err, rows, fields){
				console.log(err);
				cb(rows);
				connection.end();
			});
		}
	});*/
	/*
	checkIfUserExists(username, email, function(data){
		console.log("CHECK IF EXISTS DATA: " + data);
		if(data == 'success'){
			var connection = mysql.createConnection({
				host: host,
				user: user,
				password: password,
				database: database
			});
			connection.connect(function(err, conn){
				if(err){
					console.log("MYSQL ERROR: " + err);
					cb(err);
					connection.end();
				}
				else{
					connection.query(newUserQuery(firstname, lastname, username, password, email, college), function(err, rows, fields){
						console.log(err);
						cb(rows);
						connection.end();
					});
				}
			});
				
			
		}
		else{
			cb(false);
		}
	})
	
	*/
