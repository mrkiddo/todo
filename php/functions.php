<?php
/**
* provides all the function needed: database handlers for CURD and create AJAX return for clients
* @version: v1.0
* @author: Jiawei Luo<jluo3036@gmail.com>
* @copyright:
*/

/**
* db_connect
* setup basic a database connection
* @return mysqli object
*/
function db_connect(){
	$result = new mysqli('localhost', 'pinkyman_todo', '53545657', 'pinkyman_todo');
	try{
		if($mysqli->connect_errno){
    		printf("Connect failed: %s\n", $mysqli->connect_error);
    		throw new Exception('Database connecting failure.');
    		exit();
		}
		else{
			return $result;
		}
	}
	catch(Exception $e){
		echo 'Exception: ' . $e->getMessage() . '<br/>';
	}
}

/**
* get_all_results
* retrieve all the results by select operation from database
* @param $conn mysqli connection object
* @param $id string user id
* @return array
*/
function get_all_results($conn, $id){
	try{
		if(!$id)
			throw new Exception('Query statement is empty');
		$query = "SELECT * FROM `todo-items` WHERE `userid`='" . $id . "'";
		$result = $conn->query($query);
		if(!$result)
			throw new Exception('No data retrieve');
		$collection = array();
		while($row = $result->fetch_assoc()){
			array_push($collection, $row);
		}
		return $collection;
	}
	catch(Exception $e){
		echo 'Exception: ' . $e->getMessage() . '<br/>';
	}
}

/**
* update_result
* update the modified record from client to database
* @param $conn mysqli connection object
* @param $id string record id
* @param $id string new record state
* @return array
*/
function update_result($conn, $id, $state){
	try{
		if(!$query && !$id && !$state)
			throw new Exception('Parameter error');
		$query = "UPDATE `todo-items` SET `state`='" . $state . "' WHERE `id`=" . $id;
		$result = $conn->query($query);
		if($result && $conn->affected_rows){
			return array(
					"success" => 'true'
				);
		}
		else{
			return array(
					"success" => 'false'
				);
		}
		//printf("Affected rows: %d\n", $conn->affected_rows);
	}
	catch(Exception $e){
		echo 'Exception: ' . $e->getMessage() . '<br/>';
	}
}

/**
* delete_result
* delete the record from database
* @param $conn mysqli connection object
* @param $id string record id
* @return array
*/
function delete_result($conn, $id){
	try{
		if(!$id)
			throw new Exception('Parameter error');
		$query = "DELETE FROM `todo-items` WHERE `id`=". $id;
		$result = $conn->query($query);
		if($result && $conn->affected_rows){
			return array(
					"success" => 'true'
				);
		}
		else{
			return array(
					"success" => 'false'
				);
		}
	}
	catch(Exception $e){
		echo 'Exception: ' . $e->getMessage() . '<br/>';
	}
}

/**
* create_result
* create new record and insert to database
* @param $conn mysqli connection object
* @param $userid string user id
* @param $title string record title
* @param $content string record content
* @return array
*/
function create_result($conn, $userid, $title, $content){
	try{
		$query = "INSERT INTO `todo-items`(`id`, `userid`, `title`, `content`, `state`, `date`) VALUES (null, '" . $userid . "', '" . $title . "', '" . $content . "', 'NO', null)";
		$result = $conn->query($query);
		$new_id = $conn->insert_id;
		if($result && $new_id){
			$new_result = $conn->query("SELECT * FROM `todo-items` WHERE `id`=". $new_id);
			$row = $new_result->fetch_assoc();
			return $row;
		}
		else{
			return false;
		}
	}
	catch(Exception $e){
		echo 'Exception: ' . $e->getMessage() . '<br/>';
	}
}

/**
* return_json
* perform json encoding to results for AJAX JSONP requests
* @param $data array
* @return void
*/
function return_json($data){
	$callback = $_GET['callback'];
	$tmp = json_encode($data);
	echo $callback . '('. $tmp . ')';
}

/**
* return_json
* perform json encoding to results for other AJAX requests
* @param $data array
* @return void
*/
function return_data($data){
	$callback = $_GET['callback'];
	$tmp = json_encode($data);
	echo $tmp;
}
?>