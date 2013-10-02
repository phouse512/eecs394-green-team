function createPost(postText, postColor) {
	$.ajax({
		url: 'script/insertPost.php',
		type: 'POST',
		data: ({postText: postText,
				postColor: postColor}),
		success: function(data, textStatus, xhr) {
			console.log(data);
		},
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		}
	});
}

function viewPosts(){
	$.ajax({
		url: 'script/viewAllPosts.php',
		type: 'GET',
		success: function(data, textStatus, xhr) {
			console.log(data);
		}, 
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		} 
	});
}