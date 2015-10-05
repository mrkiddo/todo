
<?php
/**
* provide AJAX responses for clients in terms of different CURD operations
* @version: v1.0
* @author: Jiawei Luo<jluo3036@gmail.com>
* @copyright:
*/

require_once("functions.php");

$conn = db_connect();

//$data = getAllResults($conn, $query);
//updateResult($conn, $query);

// reponse for `read` operation
// return all the results if any
// if no result can be retrieve, return `empty` property
if(isset($_GET['read'])){
	$id = $_GET['read'];
	if($id){
		$data = get_all_results($conn, $id);
		if($data){
			return_json($data);
			exit();
		}
		else{
			$data = array("empty" => 'true');
			return_json($data);
			exit();
		}
	}
}

// reponse for `change` operation
// update the state of a record
// return the opertation result
if(isset($_GET['change'])){
	$id = $_GET['change'];
	if(isset($_GET['state'])){
		$state = $_GET['state'];
		$data = update_result($conn, $id, $state);
		return_json($data);
		exit();
	}
}

// reponse for `delete` operation
// delete a record
// return the opertation resulty
if(isset($_GET['delete'])){
	$id = $_GET['delete'];
	if($id){
		$data = delete_result($conn, $id);
		return_json($data);
		exit();
	}
}

?>