<?php
	$username = "victorab_325p1";
	$password = "teamGreen!";
	$hostname = "localhost"; 
	$database_name = "victorab_325p1";

/*
//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password) 
  or die("Unable to connect to MySQL");
echo "Connected to MySQL<br>";

//select a database to work with
$selected = mysql_select_db("victorab_325p1",$dbhandle) 
  or die("Could not select database");
echo "Got the database!"

//execute the SQL query and return records
$result = mysql_query("SELECT post_id, post_txt, post_color FROM version1");
//fetch tha data from the database
while ($row = mysql_fetch_array($result)) {
   echo "ID:".$row{'post_id'}." Post:".$row{'post_txt'}." 
   Color:".$row{'post_color'}."<br>";
}
 */
	$connection = mysqli_connect($hostname, $username, $password, $database_name);

	$query = "SELECT post_id, post_text, post_color FROM version1";

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

		$xml->endElemnt();
	}

	$xml->endElement();
	header('Content-type: text/xml');
	$xml->flush();
?>