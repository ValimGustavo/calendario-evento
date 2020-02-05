<?php
    require('./header.php');
    require('../../../conf/conf-server.php');
 
 
 class Evento {
     public $pai;
     public $titulo;
     public $coluna = [];
     public $linhas = [];
     
 }
 
 
 
 $evento = new Evento();
 $evento->pai = "tabela";
 $evento->titulo = "Eventos";
 //$evento->coluna = ["id", "descricao", "horaInicio","horaTermino", "emailUsuario"];
 $evento->coluna = ["id", "Descrição", "Inicio","Término", "emailUsuario"];

    
try{
    
    $sql = "SELECT id, descricao, horaInicio, horaTermino, emailUsuario FROM EVENTOS1";
	
	$json_array = array();	//vetor com os valores associativos(sera transformado em json e retornado para usuario
	$array_parse = array(); //vetor usado para transformar resultado do banco em um vetor associativo
	
	$stmt = mysqli_stmt_init($conn);
	if(mysqli_stmt_prepare($stmt, $sql)){
		mysqli_stmt_execute($stmt);
		mysqli_stmt_bind_result($stmt, $id, $des, $horaIni, $horaTer, $emailUsuario);
		mysqli_stmt_store_result($stmt);
		while(mysqli_stmt_fetch($stmt)){
		    $array_parse = array();
		    array_push($array_parse, $id);
		    array_push($array_parse, $des);
		    array_push($array_parse, $horaIni);
		    array_push($array_parse, $horaTer);
		    array_push($array_parse, $emailUsuario);
			array_push($evento->linhas, $array_parse); 
		    unset($array_parse);
	    }
	}
	$evento = json_encode($evento);	
	echo $evento;		
    
    
}catch (exception $exception){
    
}finally{
    
	mysqli_close($conn);
}