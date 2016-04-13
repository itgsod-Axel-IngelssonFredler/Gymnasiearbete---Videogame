<?php

require 'Mysql.php';

class Membership {
	
	function validate_user($user_name, $password) {
		$mysql = New Mysql();
		$ensure_credentials = $mysql->verify_Username_and_Pass($user_name, $password);
		
		if($ensure_credentials) {
			$SESSION['status'] = 'authorized';
			header("location: index.erb");
			} else return "Please enter a correct username or password";
	
	}
}