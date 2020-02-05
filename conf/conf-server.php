<?php
    $dbName = "id12406455_calendario";	
    $dbUser = "id12406455_calendario";
    $dbPass = "000webhost";
    $dbHost = "localhost";	 
	
	$conn = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);
	
	if(!$conn){
	    echo json_encode("Erro ao conectar");
	    die;
	}else{
	   // $message= ["Conectado", "sucesso"];
	   // $message = json_encode($message); 
	   // echo $message;
	}
?>
	