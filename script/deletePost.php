<?php
	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";

	$conn = mysqli_connect($hostname, $username, $password, $database_name);

	$post_text = $_DELETE['postText'];
	$post_color = $_DELETE['postColor'];
	$poster = $_DELETE['poster'];
	
	$sql = "UPDATE posts SET Archived='1';
	
	if(mysqli_query($conn, $sql)){
		echo "success";
	} else {
		echo "fail";
	}
	
?>