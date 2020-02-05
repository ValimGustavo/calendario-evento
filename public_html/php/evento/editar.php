<?php
    require('./header.php');
    require('../../../conf/conf-server.php');
    $propriedade = ["descricao", "horaInicio", "horaTermino", "emailUsuario"];
    $objeto = json_decode(file_get_contents("php://input"),true);
    
	$sql = "UPDATE EVENTOS1 SET descricao = ?, horaInicio = ?, horaTermino = ? WHERE id = ?";

	if($conn == NULL){
	    echo "cono";
	}
	
	$stmt = mysqli_stmt_init($conn);

	if(mysqli_stmt_prepare($stmt, $sql)){
	    mysqli_stmt_bind_param($stmt, "ssss", $objeto["descricao"] , $objeto["horaInicio"], $objeto["horaTermino"], $objeto["id"]);
		mysqli_stmt_execute($stmt);

		if(mysqli_stmt_affected_rows($stmt) == 1){
			echo json_encode(array("status" => "ok"));
		}else{
			echo json_encode(array("status" => "não encontrado"));
		}
		
		mysqli_stmt_close($stmt);
	}else{
		echo json_encode(array("status" => "erro na preparacao"));
	}

	mysqli_close($conn);



?>