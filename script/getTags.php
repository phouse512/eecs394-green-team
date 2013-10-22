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
		$sql = "SELECT distinct tag from poststotags WHERE post_id = " . $post_id;
	} else {
		$sql = "SELECT distinct tag from poststotags";
	}

	$results = mysqli_query($conn, $sql);

	$xml = new XMLWriter();

	$xml->openURI("php://output");
	$xml->startDocument();
	$xml->setIndent(true);

	$xml->startElement('tags'); 

	while($row = mysqli_fetch_array($results, MYSQLI_ASSOC)) {
		$xml->startElement('tag');
		$xml->writeRaw($row['tag']);
		$xml->endElement();
	}

	$xml->endElement();
	header('Content-type: text/xml');
	$xml->flush();

?>