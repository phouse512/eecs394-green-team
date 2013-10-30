function createPost(postText, postColor, poster, tagArray) {
	$.ajax({
		url: 'script/insertPost.php',
		type: 'POST',
		data: ({postText: postText,
				postColor: postColor,
				poster: poster,
				tagArray: tagArray}),
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

function deletePost(postID) {
    $.ajax({
        url: 'script/deletePost.php',
        type: 'POST',
        data: ({post_id: postID}),
        success: function(data, textStatus, xhr) {
        	if (data == "success"){
        		console.log(data);
        		viewPosts();
        	} else {
        		console.log(data);
        	}
        }
    });
}

function updatePost(postID, poster, postText, postColor){
	if(!$.isEmptyObject(editAddTagSet) || !$.isEmptyObject(editRemoveTagSet)){
		if(tagPopoverMap[postID]){
			delete tagPopoverMap[postID];
		}
	}
	$.ajax({
		url: 'script/editing.php',
		type: 'POST',
		data: ({postID: postID,
				poster: poster,
				postText: postText,
				postColor: postColor,
				newTags: editAddTagSet,
				deletedTags: editRemoveTagSet}),
		success: function(data, textStatus, xhr){
			if (data == "success"){
				console.log("Successfully updated");
				viewPosts();
				$("#editModal").modal('hide');
			} else {
				console.log(data);
			}
		},
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		}
	});
	
}

function clearModal(){
	$("#myModal").modal('hide');
}

function saveNewPost(){
	var poster = $("#poster").val();
	var content = $("#noteContent").val();
	var color = $("#color-select").val();

	var tagArray = new Array();
	$("#tagSpace .tagButton").each(function() {
		tagArray.push($(this).html().slice(1));
	})

	createPost(content, color, poster, tagArray);
}

function editPost(){
	var postID = $("#edit-post-id").val();
	var poster = $("#edit-poster").val();
	var content = $("#edit-noteContent").val();
	var color = $("#edit-color-select").val();

	console.log(editTagSet);
	console.log(editAddTagSet);
	console.log(editRemoveTagSet);

	updatePost(postID, poster, content, color);
}

function viewPosts(){
	$("#noteSpace").off("click");
	var sorter = sortColorPosts();
	var tagString = sortTagPosts();

	console.log(tagString + " " + sorter);
	$.ajax({
		url: 'script/viewAllPosts.php',
		type: 'POST',
		data: ({sortColors: sorter,
				sortTags: tagString}),
		dataType: 'xml',
		success: function(data, textStatus, xhr) {
			console.log(data);
			var outputHTML = "";
			$(data).find('post').each(function(){
				var text = $(this).find('post_text').text();
				var color_class = $(this).find('post_color').text();
				var poster = $(this).find('poster').text();
				var timestamp = $(this).find('timestamp').text();
				var post_id = $(this).find('post_id').text();

				if(color_class.localeCompare("3") == 0){
					outputHTML += '<div id="' + post_id + '"  class="col-xs-12 col-sm-6 col-md-4 col-lg-3 noteWrapper"><div class="postNote blackNote"><button class="close closeButton" data-dismiss="modal" aria-hidden="true">&times;</button><a data-toggle="modal" href="#editModal" class="btn btn-default btn-xs editButton"><span class="glyphicon glyphicon-edit"></span></a><button class="btn btn-default btn-xs editButton infoButton"><span class="glyphicon glyphicon-tag"></span></button><div class="row col-lg-9 noteFoot"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + poster + '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + timestamp + '</div></div><div class="noteText">' + text + '</div></div></div>';
				} else if(color_class.localeCompare("2") == 0){
					outputHTML += '<div id="' + post_id + '"  class="col-xs-12 col-sm-6 col-md-4 col-lg-3 noteWrapper"><div class="postNote blueNote"><button class="close closeButton" data-dismiss="modal" aria-hidden="true">&times;</button><a data-toggle="modal" href="#editModal" class="btn btn-default btn-xs editButton"><span class="glyphicon glyphicon-edit"></span></a><button class="btn btn-default btn-xs editButton infoButton"><span class="glyphicon glyphicon-tag"></span></button><div class="row col-lg-9 noteFoot"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + poster + '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + timestamp + '</div></div><div class="noteText">' + text + '</div></div></div>';
				} else if(color_class.localeCompare("0") == 0){
					outputHTML += '<div id="' + post_id + '"  class="col-xs-12 col-sm-6 col-md-4 col-lg-3 noteWrapper"><div class="postNote redNote"><button class="close closeButton" data-dismiss="modal" aria-hidden="true">&times;</button><a data-toggle="modal" href="#editModal" class="btn btn-default btn-xs editButton"><span class="glyphicon glyphicon-edit"></span></a><button class="btn btn-default btn-xs editButton infoButton"><span class="glyphicon glyphicon-tag"></span></button><div class="row col-lg-9 noteFoot"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + poster + '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + timestamp + '</div></div><div class="noteText">' + text + '</div></div></div>';
				} else if(color_class.localeCompare("1") == 0){
					outputHTML += '<div id="' + post_id + '"  class="col-xs-12 col-sm-6 col-md-4 col-lg-3 noteWrapper"><div class="postNote greenNote"><button class="close closeButton" data-dismiss="modal" aria-hidden="true">&times;</button><a data-toggle="modal" href="#editModal" class="btn btn-default btn-xs editButton"><span class="glyphicon glyphicon-edit"></span></a><button class="btn btn-default btn-xs editButton infoButton"><span class="glyphicon glyphicon-tag"></span></button><div class="row col-lg-9 noteFoot"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + poster + '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 noteFooter">' + timestamp + '</div></div><div class="noteText">' + text + '</div></div></div>';
				}
			});
			$("#noteSpace").html(outputHTML);

			$("#noteSpace").on("click", ".close", function(event) {
				deletePost($(this).parent().parent().attr("id"));
			});

			$("#noteSpace").on("click", ".editButton", function(event) {
				var postNote = $(this).parent();
				var color;
				var postID = postNote.parent().attr("id");
				$("#edit-post-id").val(postID);
				$("#edit-poster").val(postNote.children(".noteFoot").children(".noteFooter").first().html());
				$("#edit-noteContent").val(postNote.children(".noteText").html());
				if(postNote.hasClass("blackNote")){
					color = 3;
				} else if(postNote.hasClass("blueNote")) {
					color = 2;
				} else if(postNote.hasClass("redNote")) {
					color = 0;
				} else {
					color = 1;
				}
				$("#edit-color-select").val(color);
				$("#edit-tags").val("");
				getTags(postID, editModalTags);
			});

			$("#noteSpace").on("click", ".infoButton", function(event) {
				var postNote = $(this).parent();
				var postID = postNote.parent().attr("id");
				console.log(postID);
			});

			$("#noteSpace").on("click", ".noteFoot", function() {
                var postNote = $(this).parent();
                var footHeight = $(this).height();
                var postHeight = postNote.height();
                var textHeight = postNote.find(".noteText").height();
                var totalHeight = textHeight + footHeight;
                var pad = 2*parseInt(postNote.css("padding"), 10);
                var border = 2*parseInt(postNote.css("border-width"), 10);
                var expandHeight = totalHeight + pad + border;
                console.log(pad);
                console.log(border);
                console.log("footHeight: " + footHeight + " postHeight: " + postHeight + " textHeight: " + textHeight + " totalHeight: " + totalHeight);

                if(postHeight < totalHeight){
                    postNote.animate({
                        height: expandHeight
                    }, 300);
                } else if(postHeight > 200 - pad - border){
                    postNote.animate({
                        height: 200
                    }, 300);
                } 
            });

			$(".postViewer").popover({
                placement: "bottom",
                selector: ".infoButton",
                trigger: "click",
                container: "#noteSpace",
                html: true,
                content: function(){
                    var tagHTML = getTagDisplay($(this));
                    return '<div id="tag-' + $(this).parent().parent().attr("id") + '">' + tagHTML + '</div>';
                }
            });

			getTags();
		},
		error: function(xhr, textStatus, errorThrown) {
			alert(textStatus + errorThrown);
		}
	})
}


function sortColorPosts(){
	var sortString = new Array();
	$("#sortSelectors input:checked").each(function(){
		sortString.push($(this).val());
	});

	sortString = sortString.join(',');

	return sortString;
}

function sortTagPosts(){
	var sortString = new Array();
	$("#tagBody input:checked").each(function(){
		sortString.push("'" + $(this).attr("val") + "'");
	});

	sortString = sortString.join(',');
	return sortString;
}

function getTagDisplay(info)
{
	var postNote = info.parent();
	var postID = postNote.parent().attr("id");
	console.log(typeof(postID));
	if(tagPopoverMap[postID]){
		console.log("Entry exists");
		var popover = postNote.find(".popover").find(".popover-content");
		var tagHTML = "";
		var tagArray = tagPopoverMap[postID];
		console.log(tagArray);
		for(var i = 0; i < tagArray.length; i++){
			var tagText = tagArray[i];
			tagHTML += ' #' + tagText;
		}
		console.log(tagHTML);
		console.log(popover);
		return tagHTML;
	} else {
		console.log("Entry does not exist");
		getTags(postID, function(data){
			fetchTagDisplay(postNote, data);
		});
		return "Loading..."
	}
}

function fetchTagDisplay(postNote, data)
{
	var postID = postNote.parent().attr("id");
	var popover = $("#noteSpace").find(".popover").find(".popover-content").find("#tag-" + postID);
	var tagArray = [];
	var tagHTML = "";
	$(data).find('tag').each(function() {
		var tagText = $(this).text();
		tagArray.push(tagText);
		tagHTML += ' #' + tagText;
	});
	tagPopoverMap[postID] = tagArray;
	console.log(popover);
	popover.html(tagHTML);
}

function getTags(postID, callback){
	if(postID){
		$.ajax({
			url: 'script/getTags.php',
			type: 'POST',
			data: ({post_id: postID}),
			dataType: 'xml',
			success: function(data, textStatus, xhr) {
				if(callback){
					callback(data);
				} else {
					editModalTags(data);
				}
			},
			error: function(xhr, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	} else {
		$.ajax({
			url: 'script/getTags.php',
			type: 'GET',
			success: function(data, textStatus, xhr) {
				displayTags(data);
			},
			error: function(xhr, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
}

function displayTags(data){
	var outputHTML = "";
	
	$(data).find('tag').each(function() {
		var tagText = $(this).text();
		console.log(tagText);
		outputHTML += '<div class="checkbox"><label><input val="' + tagText + '" type="checkbox">' + tagText + '</label></div>';
	});

	$("#tagBody").html(outputHTML);
}

function editModalTags(data){
	var tagHTML = "";
	$(data).find('tag').each(function() {
		var tagText = $(this).text();
		editTagSet[tagText] = "";
		tagHTML += '<button class="btn btn-xs tagButton">#' + tagText + '</button>';
	});
	$("#edit-tagSpace").html(tagHTML);
}

function sortButton(){
	$("#tagModal").modal('hide');
	viewPosts();
}

