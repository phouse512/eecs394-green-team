<?php
	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";


	$conn = mysqli_connect($hostname, $username, $password, $database_name);

	if(isset($_POST['post_id'])){
		$post_id = $_POST['post_id'];
	} else {
		$post_id = NULL;
	}

	if(isset($post_id)){
		$sql = "SELECT distinct tag from poststotags INNER JOIN posts on poststotags.post_id = posts.post_id WHERE poststotags.post_id = " . $post_id . " AND Archived = 0 ORDER BY tag";
	} else {
		$sql = "SELECT distinct tag from poststotags INNER JOIN posts on poststotags.post_id = posts.post_id WHERE Archived = 0 ORDER BY tag";
	}

	$results = mysqli_query($conn, $sql);

	$xml = new XMLWriter();

	$xml->openURI("php://output");
	$xml->startDocument();
	$xml->setIndent(true);

	$xml->startElement('tags'); 

	while($row = mysqli_fetch_array($results, MYSQLI_ASSOC)) {
		$xml->startElement('tag');
		$xml->writeRaw(htmlspecialchars($row['tag']));
		$xml->endElement();
	}

	$xml->endElement();
	header('Content-type: text/xml');
	$xml->flush();

?>