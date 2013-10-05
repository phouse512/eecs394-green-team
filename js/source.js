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
	/*$.ajax({
		url: 'script/viewAllPosts.php',
		type: 'GET',
		success: function(data, textStatus, xhr) {
			console.log(data);
		}, 
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		} 
	});
		*/
	$.ajax({
		url: 'script/viewAllPosts.php',
		type: 'GET',
		dataType: 'xml',
		success: function(data, textStatus, xhr) {
			$(data).find('post').each(function(){
				var text = $(this).find('post_text').text();
				$('#noteSpace').append('<div class="col-xs-3 postNote">' + text + '</div>');
			});
			//var total = $('*', data).length;
			//console.log(total);
		},
		error: function(xhr, textStatus, errorThrown) {
			alert("Could not retrieve XML")
		}
	})
	
}