<?php
    require('./header.php');
    require('../../../conf/conf-server.php');

    $login = json_decode(file_get_contents("php://input"), true);
    
    if(!isset($login)){
		echo json_encode(["status"=>"Erro dados"]);
		exit;
	}
	
    $login["password"] = md5($login["password"]);
	
	try{
	    $sql = "SELECT email FROM USUARIOS WHERE name = ? AND password = ?";
	    $stmt = mysqli_stmt_init($conn);
	   
    	if(mysqli_stmt_prepare($stmt, $sql)){
    
    		mysqli_stmt_bind_param($stmt, "ss", $login["name"], $login["password"]);
    		mysqli_stmt_execute($stmt);
    		mysqli_stmt_bind_result($stmt, $email);
    		mysqli_stmt_store_result($stmt);
    
            $json = [];
    		while(mysqli_stmt_fetch($stmt)){
    		    array_push($json, $email);
    		}
    		
    	    $json = json_encode($json);
    	    echo $json;
    	}
	}catch(exception $exception){
	    
	}finally{
	    mysqli_close($conn);
	}

?>