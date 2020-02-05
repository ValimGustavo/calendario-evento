<?php
    require('./header.php');
    require('../../../conf/conf-server.php');
    
    $propriedade = ["descricao", "horaInicio", "horaTermino", "emailUsuario"];
    $objeto = json_decode(file_get_contents("php://input"),true);
    
    //dados vindo da requisição
    for($i = 0; $i < count($propriedade); $i++){
        if(!isset($objeto[$propriedade[$i]])){
            echo json_encode("Erro no preenchimento do formulario");
            die;
        }
    }
    
    
    try{
        $sql = "INSERT INTO EVENTOS1 (descricao, horaInicio, horaTermino, emailUsuario) VALUES(?, ?, ?, ?)";
        echo $objeto["descricao"] , $objeto["horaInicio"], $objeto["horaTermino"], $objeto["emailUsuario"];
	
    	$stmt = mysqli_stmt_init($conn);
    	if(mysqli_stmt_prepare($stmt, $sql)){
    	    mysqli_stmt_bind_param($stmt, "ssss", $objeto["descricao"] , $objeto["horaInicio"], $objeto["horaTermino"], $objeto["emailUsuario"]);
    	    mysqli_stmt_execute($stmt);
    	   echo json_encode(["status" => "salvo"]);
	}
    }catch (exception $exception){
        echo json_encode(["status" => "erro"]);
    
    }finally{
         mysqli_stmt_close($stmt);
    }

?>