<?php
	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";

	$conn = mysqli_connect($hostname, $username, $password, $database_name);
	
	// Check connection
	if (mysqli_connect_errno())
	  {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  }
	  
	  $sql="INSERT INTO posts (post_id, post_text, post_color) VALUES('$_POST[1]','$_POST[commentTxt]','$_POST[color]')";
	  
	  if (!mysqli_query($conn,$sql))
	    {
	    die('Error: ' . mysqli_error($conn));
	    }

	  mysqli_close($conn);
	  
	  header('location: ../home.html');
?>