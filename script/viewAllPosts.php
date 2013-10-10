<?php
	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";

	$connection = mysqli_connect($hostname, $username, $password, $database_name);

	$query = "SELECT post_id, post_text, post_color, poster, TIME_FORMAT(create_time, '%h:%i %p') AS TheTime FROM posts ORDER BY post_id DESC";

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
		$xml->writeRaw($row['post_text']);
		$xml->endElement();

		$xml->startElement('post_color');
		$xml->writeRaw($row['post_color']);
		$xml->endElement();

		$xml->startElement('poster');
		$xml->writeRaw($row['poster']);
		$xml->endElement();

		$xml->startElement('timestamp');
		$xml->writeRaw($row['TheTime']);
		$xml->endElement();

		$xml->endElement();
	}

	$xml->endElement();
	header('Content-type: text/xml');
	$xml->flush();
?>