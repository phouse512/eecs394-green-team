<?php
	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";
	

	$conn = mysqli_connect($hostname, $username, $password, $database_name);
	
	$post_id = $_POST['postID'];
	$poster = $_POST['poster'];
	$post_text = $_POST['postText'];
	$post_color = $_POST['postColor'];
	
	$sql = "UPDATE posts SET poster = '" . $poster . "', post_text = '" . $post_text . "', post_color = '" . $post_color . "' WHERE post_id = " . $post_id;
	
	
	if(mysqli_query($conn, $sql)){
		echo "success";
	} else {
		echo "fail";
	}

	?>