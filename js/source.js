function createPost(postText, postColor, poster) {
	$.ajax({
		url: 'script/insertPost.php',
		type: 'POST',
		data: ({postText: postText,
				postColor: postColor,
				poster: poster}),
		success: function(data, textStatus, xhr) {
			if (data == "success"){
				viewPosts();
				clearModal();
			} else {
				clearModal();
				console.log(data);
			}
		},
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		}
	});
}


/*function deletePost(postText, postColor, poster) {
    $.ajax({
        url: 'script/deletePost.php',
        type: 'DELETE'
        data: ({postText: postText,
				postColor: postColor,
				poster: poster}),
        });
}
*/

function clearModal(){
	$("#myModal").modal('hide');
	$("#poster").val("");
	$("#noteContent").val("");
	$("#color-select").val(1);
}

function saveNewPost(){
	var poster = $("#poster").val();
	var content = $("#noteContent").val();
	var color = $("#color-select").val();

	createPost(content, color, poster);
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
			console.log(data);
			var outputHTML = "";
			$(data).find('post').each(function(){
				var text = $(this).find('post_text').text();
				var color_class = $(this).find('post_color').text();
				var poster = $(this).find('poster').text();
				var timestamp = $(this).find('timestamp').text();
				if(color_class.localeCompare("0") == 0){
					outputHTML += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="postNote blackNote"><form action="script/deletePost.php" method="get"><button class="close" data-dismiss="modal" aria-hidden="true">&times;</button></form>' + text + '<hr class="hr-bottom"><div class="row noteFoot"><div class="col-lg-12"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + poster + '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + timestamp + '</div></div></div></div></div>';
				} else if(color_class.localeCompare("1") == 0){
					outputHTML += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="postNote blueNote"><button class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + text + '<hr class="hr-bottom"><div class="row noteFoot"><div class="col-lg-12"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + poster + '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + timestamp + '</div></div></div></div></div>';
				} else if(color_class.localeCompare("2") == 0){
					outputHTML += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="postNote redNote"><button class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + text + '<hr class="hr-bottom"><div class="row noteFoot"><div class="col-lg-12"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + poster + '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + timestamp + '</div></div></div></div></div>';
				} else if(color_class.localeCompare("3") == 0){
					outputHTML += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="postNote greenNote"><button class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + text + '<hr class="hr-bottom"><div class="row noteFoot"><div class="col-lg-12"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + poster + '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + timestamp + '</div></div></div></div></div>';
				}
			});
			$("#noteSpace").html(outputHTML);
		},
		error: function(xhr, textStatus, errorThrown) {
			alert("Could not retrieve XML")
		}
	})
}

