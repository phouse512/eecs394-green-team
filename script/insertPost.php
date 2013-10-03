<?php
	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";

	$post_text = $_POST['postText'];
	$post_color = $_POST['postColor'];

	$connection = mysqli_connect($hostname, $username, $password, $database_name);

	$query = "INSERT INTO posts (post_text, post_color) VALUES ('" . $post_text . "', '". $post_color . "')";

	if ($results = mysqli_query($connection, $query)){
		echo "success";
	} else {
		echo "fail";
	}
?>