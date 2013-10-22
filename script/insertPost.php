<?php

	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";	


	$conn = mysqli_connect($hostname, $username, $password, $database_name);

	$post_text = $_POST['postText'];
	$post_color = $_POST['postColor'];
	$poster = $_POST['poster'];
	if(isset($_POST['tagArray'])){
		$tags = $_POST['tagArray'];
	} else {
		$tags = NULL;
	}

	
	
	$sql = "INSERT INTO posts (post_text, post_color, poster) VALUES('" . $post_text . "', '" . $post_color . "', '" . $poster . "')";
	if(mysqli_query($conn, $sql)){
		$post_id = mysqli_insert_id($conn);
		$tag_query = "";
		if(isset($tags)){
			foreach($tags as $key => $tag){
				$is_last = last($tags, $key);
				$tag_query = $tag_query . "(" . $post_id . ", '" . $tag . "')";
				if(!$is_last){
					$tag_query = $tag_query . ", ";
				}
			}
			if(strlen($tag_query) != 0){
				$sql = "INSERT INTO poststotags (post_id, tag) values " . $tag_query;
			
				if(mysqli_query($conn, $sql)){
					echo "success";
				} else {
					echo "fail";
				}
				
			}
		} else {
			echo "success";
		}
	} else {
		echo "fail";
	}

	function last($array, $key){
		end($array);
		return $key === key($array);
	}



/*

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

*/ 

?>