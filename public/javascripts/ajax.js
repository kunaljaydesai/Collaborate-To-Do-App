$(document).ready(function(){
	$.ajax({
		type: "POST",
		url: '/add',
		data: {
			username: 'nick',
			listName: 'list',
			description: 'description'
		},
		success: function(data){
			console.log(data)
		}
	});
});