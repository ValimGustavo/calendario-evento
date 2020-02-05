<?php
    require('./header.php');
    require('../../../conf/conf-server.php');

    $id = json_decode(file_get_contents("php://input"));
    
    if(!isset($id)){
		echo "Erro em id";
		exit;
	}


	class Evento {
	    public $id;
	    public $descricao;
	    public $horaInicio;
	    public $horaTermino;
	    public $emailUsuario;
	}
	
	
	
	try{
	    $sql = "SELECT descricao, horaInicio, horaTermino, emailUsuario FROM EVENTOS1 WHERE id = ?";
	    $stmt = mysqli_stmt_init($conn);
	    $evento = new Evento();
    	if(mysqli_stmt_prepare($stmt, $sql)){
    
    		mysqli_stmt_bind_param($stmt, "i", $id);
    		mysqli_stmt_execute($stmt);
    		mysqli_stmt_bind_result($stmt, $descricao, $horaIni, $horaTer, $emailUsuario);
    		mysqli_stmt_store_result($stmt);
    
            $json = [];
    		while(mysqli_stmt_fetch($stmt)){
    		    $evento->descricao = $descricao;
    		    $evento->horaInicio = $horaIni; $evento->horaTermino = $horaTer;
    		    $evento->id = $id;
    		    $evento->emailUsuario = $emailUsuario;
    		}
    		
    	    $json = json_encode($evento);
    	    echo $json;
    	}
	}catch(exception $exception){
	    
	}finally{
	    mysqli_close($conn);
	}

?>