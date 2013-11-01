<?php


	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";

	

	$connection = mysqli_connect($hostname, $username, $password, $database_name);

	$sortColors = '(' . $_POST['sortColors'] . ')';
	if(isset($_POST['sortTags'])){
		$sortTags = $_POST['sortTags'];
	} else {
		$sortTags = NULL;
	}

	if(isset($sortTags)){
		$tag_query = "(";
		foreach($sortTags as $key => $tag){
			$escaped_tag = mysqli_real_escape_string($connection, $tag);
			$is_last = last($sortTags, $key);
			$tag_query .= "'" . $escaped_tag . "'";
			if(!$is_last){
				$tag_query .= ", ";
			}
		}
		$tag_query .= ")";
		$query = "SELECT DISTINCT posts.post_id, post_text, post_color, poster, TIME_FORMAT(create_time, '%h:%i %p') AS TheTime, Archived FROM posts INNER JOIN poststotags ON posts.post_id=poststotags.post_id AND tag in (" . $tag_query . ") AND Archived='0' AND post_color IN " . $sortColors . " ORDER BY post_id DESC";
	} else {
		$query = "SELECT post_id, post_text, post_color, poster, TIME_FORMAT(create_time, '%h:%i %p') AS TheTime, Archived FROM posts WHERE Archived='0' AND post_color IN " . $sortColors . " ORDER BY post_id DESC";
	}

	$results = mysqli_query($connection, $query);

	$xml = new XMLWriter();

	$xml->openURI("php://output");
	$xml->startDocument();
	$xml->setIndent(true);

	$xml->startElement('posts'); 

	while($row = mysqli_fetch_array($results, MYSQLI_ASSOC)) {
		$xml->startElement('post');

		$xml->startElement('post_id');
		$xml->writeRaw($row['post_id']);
		$xml->endElement();

		$xml->startElement('post_text');
		$xml->writeRaw(htmlspecialchars($row['post_text']));
		$xml->endElement();

		$xml->startElement('post_color');
		$xml->writeRaw($row['post_color']);
		$xml->endElement();

		$xml->startElement('poster');
		$xml->writeRaw(htmlspecialchars($row['poster']));
		$xml->endElement();

		$xml->startElement('timestamp');
		$xml->writeRaw($row['TheTime']);
		$xml->endElement();

		$xml->endElement();
	}

	$xml->endElement();
	header('Content-type: text/xml');
	$xml->flush();

	function last($array, $key){
		end($array);
		return $key === key($array);
	}
?>