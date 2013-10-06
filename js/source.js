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
	//test with example.xml off-server
	/*
	$.ajax({
		url: 'example.xml',
		type: 'GET',
		success: function(data, textStatus, xhr) {
			$(data).find('post').each(function(index){
				var text = $(this).find('post_text').text();
				var color_class = $(this).find('post_color').text();
				if(color_class.localeCompare("0") == 0){
					$('#noteSpace').append('<div class="col-xs-3 postNote blackNote">' + text + '</div>');
				} else if(color_class.localeCompare("1") == 0){
					$('#noteSpace').append('<div class="col-xs-3 postNote blueNote">' + text + '</div>');
				} else if(color_class.localeCompare("2") == 0){
					$('#noteSpace').append('<div class="col-xs-3 postNote redNote">' + text + '</div>');
				} else if(color_class.localeCompare("3") == 0){
					$('#noteSpace').append('<div class="col-xs-3 postNote greenNote">' + text + '</div>');
				}
			});
			//var total = $('*', data).length;
			//console.log(total);
		}, 
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		} 
	});*/
		
		
	$.ajax({
		url: 'script/viewAllPosts.php',
		type: 'GET',
		dataType: 'xml',
		success: function(data, textStatus, xhr) {
			$(data).find('post').each(function(){
				var text = $(this).find('post_text').text();
				var color_class = $(this).find('post_color').text();
				if(color_class.localeCompare("0") == 0){
					$('#noteSpace').append('<div class="col-xs-3 postNote blackNote">' + text + '</div>');
				} else if(color_class.localeCompare("1") == 0){
					$('#noteSpace').append('<div class="col-xs-3 postNote blueNote">' + text + '</div>');
				} else if(color_class.localeCompare("2") == 0){
					$('#noteSpace').append('<div class="col-xs-3 postNote redNote">' + text + '</div>');
				} else if(color_class.localeCompare("3") == 0){
					$('#noteSpace').append('<div class="col-xs-3 postNote greenNote">' + text + '</div>');
				}
			});
			//var total = $('*', data).length;
			//console.log(total);
		},
		error: function(xhr, textStatus, errorThrown) {
			alert("Could not retrieve XML")
		}
	})
	
}