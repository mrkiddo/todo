<?php
/**
* provide AJAX responses specifically for POST method in create operation
* @version: v1.0
* @author: Jiawei Luo<jluo3036@gmail.com>
* @copyright:
*/

// in case of cross-domain issue
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:POST');  
//header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Headers:x-requested-with,content-type'); 

require_once("functions.php");

$conn = db_connect();

// receive POST data from client
// create a new record with data
// return the operation result and the new record just added to database
if(isset($_POST)){
	if(isset($_POST['userid']) && isset($_POST['title']) && isset($_POST['content'])){
		$userid = $_POST['userid'];
		$title = $_POST['title'];
		$content = $_POST['content'];
		$result = create_result($conn, $userid, $title, $content);
		if($result){
			$data = array("success" => $result);
			return_data($data);
		}
		else{
			$data = array("success" => "false");
			return_data($data);
		}
		exit();
	}
}
?>