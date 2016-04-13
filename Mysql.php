<?php

require_once(

class MySQL {
	
	function verify_Username_and_Pass($user_name, $password) {
		$connection = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME) or 
			die('Couldnt connect to the database')
	}
}