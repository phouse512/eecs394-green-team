<?php

	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";


	$delete_id = $_POST['post_id'];

	$conn = mysqli_connect($hostname, $username, $password, $database_name);
	
	$sql = "UPDATE posts SET Archived='1' WHERE post_id='" . $delete_id . "'";
	
	if(mysqli_query($conn, $sql)){
		echo "success";
	} else {
		echo "fail";
	}
	
?>