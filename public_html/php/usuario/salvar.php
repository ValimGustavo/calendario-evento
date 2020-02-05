<?php
    require('./header.php');
    require('../../../conf/conf-server.php');
    
    $propriedade = ["name", "password", "email"];
    
    $user = json_decode(file_get_contents("php://input"),true);
    //dados vindo da requisição
    for($i = 0; $i < count($propriedade); $i++){
        if(!isset($user[$propriedade[$i]])){
            echo json_encode("Erro no preenchimento do formulario");
            die;
        }
    }
    
    $user["password"] = md5($user["password"]);
    
    try{
        
        $sql = "INSERT INTO USUARIOS (name, password, email) VALUES (?, ?, ?)";
     
    	$stmt = mysqli_stmt_init($conn);
    	if(mysqli_stmt_prepare($stmt, $sql)){
    	    mysqli_stmt_bind_param($stmt, "sss", $user["name"], $user["password"], $user['email']);
    	    print_r($stmt);
    	    mysqli_stmt_execute($stmt);
    	    echo json_encode(["status" => "ok"]);
	}
    }catch (exception $exception){
        echo json_encode(["status" => "erro"]);
    
    }finally{
         mysqli_stmt_close($stmt);
    }

?>