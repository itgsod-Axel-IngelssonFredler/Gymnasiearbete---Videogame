<?php

require_once 'constants.php';

class MySQL {
	
	private $connection;
	
	function _construct() {
		$this->connection = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME) or 
							  die('Couldnt connect to the database');
	
	}
	
	function verify_Username_and_Pass($user_name, $password) {
		
			$query = "SELECT * 
					 FROM users
					 WHERE username = ? AND password = ?
					 LIMIT 1";
					 
			if($stmt = $this->connection->prepare($query)) {
				$stmt->bind_param('ss', $user_name, $password);
				$stmt->execute();
				
				if($stmt->fetch()) {
					$stmt->close();
					return true;
				}
			
			}
			
	}
}