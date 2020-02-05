<?php
    require('./header.php');
    require('../../../conf/conf-server.php');
    $propriedade = ["descricao", "horaInicio", "horaTermino", "emailUsuario"];
    $objeto = json_decode(file_get_contents("php://input"),true);

    print_r($objeto);

	$sql = "DELETE FROM EVENTOS1 WHERE id = ?";
	$stmt = mysqli_stmt_init($conn);

	if(mysqli_stmt_prepare($stmt, $sql)){
		mysqli_stmt_bind_param($stmt, 'i', $objeto["id"]);
		mysqli_stmt_execute($stmt);

		if(mysqli_stmt_affected_rows($stmt)){
			echo json_encode(array("status" => "ok"));
		}else{
			echo json_encode(array("status" => "error"));				
		}
    }

?>