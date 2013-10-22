<?php
	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";
	

	$conn = mysqli_connect($hostname, $username, $password, $database_name);
	
	$editId = $_POST['post_id'];
	
	$post_text = $_POST['postText'];
	$post_color = $_POST['postColor'];
	$poster = $_POST['poster'];
	
	$sql = "UPDATE posts SET post_text='" . $post_text . "' WHERE post_id='" . $editId . "'";
	
	
	if(mysqli_query($conn, $sql)){
		echo "success";
	} else {
		echo "fail";
	}

	?>