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
	$add_tags = NULL;
	$remove_tags = NULL;
	if(isset($_POST['newTags'])){
		$add_tags = $_POST['newTags'];
	}
	if(isset($_POST['deletedTags'])){
		$remove_tags = $_POST['deletedTags'];
	}
	
	
	$sql = "UPDATE posts SET poster = '" . $poster . "', post_text = '" . $post_text . "', post_color = '" . $post_color . "' WHERE post_id = " . $post_id;
	
	
	if(mysqli_query($conn, $sql)){
		if(isset($add_tags)){
			$sql = "INSERT INTO poststotags (post_id, tag) values ";
			$tag_query = "";
			foreach($add_tags as $key => $value){
				$is_last = last($add_tags, $key);
				$tag_query .= "(" . $post_id . ", '" . $key . "')";
				if(!$is_last){
					$tag_query = $tag_query . ", ";
				}
			}
			$sql .= $tag_query;
			if(mysqli_query($conn, $sql)){
				if(isset($remove_tags)){
					$sql = "DELETE FROM poststotags WHERE post_id = " . $post_id . " AND tag IN (";
					$tag_query = "";
					foreach($remove_tags as $key => $value){
						$is_last = last($remove_tags, $key);
						$tag_query .= "'" . $key . "'";
						if(!$is_last){
							$tag_query = $tag_query . ", ";
						}
					}
					$sql .= $tag_query . ")";
					if(mysqli_query($conn, $sql)){
						echo "success";
					} else {
						echo "fail";
					}
				} else {
					echo "success";
				}
			} else {
				echo "fail";
			}
		} else if(isset($remove_tags)){
			$sql = "DELETE FROM poststotags WHERE post_id = " . $post_id . " AND tag IN (";
			$tag_query = "";
			foreach($remove_tags as $key => $value){
				$is_last = last($remove_tags, $key);
				$tag_query .= "'" . $key . "'";
				if(!$is_last){
					$tag_query = $tag_query . ", ";
				}
			}
			$sql .= $tag_query . ")";
			if(mysqli_query($conn, $sql)){
				echo "success";
			} else {
				echo "fail";
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

	?>