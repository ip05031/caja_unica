function escribir ( selector ,  texto ){
	console.log( texto );
	console.log( selector );
	$(selector).html(texto);
}

function escribir_error( texto ){
	// jhjkh
	$("#txt_error").html(texto);
}

function ingreso( selector , numero ){
	var patron = /^\d*$/; 
	try {
		if( numero	 == "" ){
			console.log("no hay nada");
		}
		else{
			if(isNaN(numero)) {
				escribir_error( "Ingrese solo números" );
			}
			else{
			    if (patron.test(numero)) {            
					escribir ( selector ,  numero );
					escribir_error( "" );
					calcular_todo();
				
				}
				else {
					escribir_error( "Ingrese solo números" );
				}
			}	
		}
	}
	catch(err) {
		console.log ( "X1:" + err.message );
	}
}

function fecha(){
	var f = new Date();
	$("#txt_fecha").html(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())
}
function hora(){ 
	var f=new Date();
	cad=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 
	$("#txt_hora").html(cad);
	setTimeout("hora()",1000); 
}

function calcular_todo(){
	calcular_ingreso();
	calcular_gastos();
	calcular_resumen();

}

function calcular_ingreso(){
	var inicio = make_number( $("#txt_inicio").html() );
	var fin = make_number( $("#txt_final").html() );
	var mtto = make_number( $("#mtto_ruta").html() );


	var ingreso = 0;
	console.log(inicio);
	console.log(fin);

	var vueltas = fin - inicio;
	if ( vueltas > 0 ){
		valor = "" + vueltas;
	}
	else{
		escribir_error( "Inicio debe ser menor que Final" );
		valor = "000";
	}
	console.log(vueltas);
	$("#txt_vueltas").html(valor);

	var ingreso = parseFloat( vueltas * 0.2 );
	console.log("ing:"+ingreso);


	$("#txt_ingreso").html("$" + ingreso.toFixed(2));
	$("#txt_total_ingreso").html("$" + ingreso.toFixed(2));

	if( ingreso > 0) {
		var sal = ingreso * 0.17 ;
		var salary = sal - mtto;
		console.log("salario:"+salary);
		$("#salario_input").html(salary.toFixed(2));
		calcular_gastos();
	}
}

function calcular_gastos(){
	var total_gasto = 0;
	var gastos = $("#tbl_gastos tbody tr");

	gastos.each(function(index, el) {
		var cheque = $(el).find(".seleccion");
		
		if ( $(cheque).prop('checked') ){
			var monto = $(el).find(".gasto_dinero ");
			var mnt = make_number( $(monto).html() );
			console.log(mnt);
			total_gasto += mnt;
		}
	});


	console.log( "Total gasto 	" );
	console.log(total_gasto);
	$("#txt_suma_gasto").html("$" + total_gasto.toFixed(2) );
	$("#gasto_total").html("$" + total_gasto.toFixed(2) );
	calcular_resumen();
}

function calcular_resumen(){
	var salario = make_number( $("#salario_input").html() );
	var ingreso = make_number( $("#ingreso_total").html() );
	var gasto = make_number( $("#txt_suma_gasto").html() );

	var diesel 	= make_number( $("#diesel").html() );
	var liquido = 0;
	if( ingreso > 0) {
		liquido = ingreso - diesel - salario;
		console.log(liquido);
		$("#liquido_ingresado").html("$" + liquido.toFixed(2) );
		var neto_empresario = ingreso - gasto;
		$("#neto_empresario").html("$" + neto_empresario.toFixed(2) );	
	}
}

function make_number( numero ){
	//console.log(numero)
	var numero2 	 = "" + numero;
	var sin_dolar 	 = numero2.replace("$", "");
	var sin_comas 	 = sin_dolar.replace("," , "")
	var sin_espacios = sin_comas.replace(" " , "" );
	var limpio 		 =  parseFloat ( sin_espacios ) ; 
	//console.log("x:" + limpio );
	return limpio;
}

function sancionado(){
	if( $('#sancionado').prop('checked') ) {
		$("#txt_sancion").html("$2.00");
	}
	else{
		$("#txt_sancion").html("$0.00");
	}
}

function cargar_gastos(){
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '1'},
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		var n = data.lista.length;
		var gastos = data.lista;
		
		var ac_mnt = 0;
		var tr = '';
		var nombre_salario = "";
		var sancion = "";

		$(".lst_gastos").html('');
		for (var i = 0; i < n; i++) {
			if ( gastos[i].nombre == "Salario"){
				nombre_salario = 'id="salario_input"';
			}
			if ( gastos[i].nombre == "Mantenimiento Ruta" ){
				nombre_salario = 'id="mtto_ruta"';
			}
			if ( gastos[i].nombre == "Diesel" ){
				nombre_salario = 'id="diesel"';
			}
			if ( gastos[i].nombre != "Sanción" ){
				sancion = 'checked';
			}
			else{
				sancion = '';
			}
			tr += '<tr ><td style="width:5%;">	<input class="seleccion" type="checkbox" value="" '+sancion+' onclick="calcular_gastos();" data-id="'+ gastos[i].id+'"></td> <td class="fila_gasto" data-id = '+gastos[i].id+'> ';
			tr += gastos[i].nombre+' </td><td style="text-align: right;"><span class="gasto_dinero form-control no_input" '+nombre_salario+'> ';
			var mnt = make_number( gastos[i].monto );
			tr += '$'+ mnt.toFixed(2) +' </span></td> </tr>';


		}

		tr += '<tr style="color:#3c8dbc; font-size: 15px; font-weight: bold;border:1px solid blue;" ><td colspan="2"> Suma de gastos </td>'+
		'<td style="text-align: right;" colspan=""> <div class="form-control no_input" id="txt_suma_gasto" style="border:1px solid blue;"> $000.00</div> </td><td></td></tr>';

		$(".lst_gastos").html(tr);
		if ( $("#ingreso").html() != ""   ){
			console.log("se volverá a pintar el salario");
			calcular_ingreso_nuevo();
		}
		calcular_gastos();


	})
	.fail(function(data) {
		console.log("error");
	})
	.always(function(data) {
		console.log("complete");
		
	});	
}

function cargar_motoristas(){
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '2'},
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		console.log(data.lista);
		var n = data.lista.length;
		var motoristas = data.lista;
		var select = '<option selected="selected" disabled="disabled">Seleccione un motorista</option>';
		for (var i = 0; i < n; i++) {
			select += '<option value="'+motoristas[i].id_motorista +'" > '+motoristas[i].nombre +' </option>';
		}
		$(".motoristas").html(select);
		//$('.select2').select2();
		console.log(data.lista[0]);
	})
	.fail(function(data) {
		console.log("error");
	})
	.always(function(data) {
		console.log("complete");
	});	
}

function cargar_info_motorista(id){
	//alert("here:"+id);
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '3' , codigo : id },
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		$("#unidad").html(data.motorista.numero_equipo);
		$("#unidad").attr("data-id",data.motorista.id_equipo);
		$("#placa").html(data.motorista.placa_equipo);
		$("#inicio").html( make_number(data.motorista.fin) + 1 );
		console.log(data.motorista);
	})
	.fail(function(data) {
		console.log("error");
	})
	.always(function(data) {
		console.log("complete");
	});
}

function cancelar_modal(tipo){

	switch(tipo) {
		case 1 : 	selector = "#modal_gasto";
					selector_form = "#frm_gasto";
					break;		
		
		case 2 : 	selector = "#modal_motorista";
					selector_form = "#frm_motorista";
					break;		
		
		case 3 : 	selector = "#modal_equipo";
					selector_form = "#frm_equipo";
					break;
	}
	$(''+selector_form)[0].reset();
	$(selector).modal("hide");
}

function guardar_gasto(){
	alert("gasto");
	var nombre 	= $("#nombre_gasto");
	var monto 	= $("#monto_gasto");
	var check 	= $("#check_gasto");
	if( nombre.val() == "" ){
		nombre.focus();
		return false;
	}else{
		if( monto.val() == "" ){
			monto.focus();
			return false;
		}
		else{
			 enviar_gasto(nombre.val() , monto.val());
		}
	}
}

function enviar_gasto(p1 , p2){ 
	alert("envio");
	alert(p1);
	alert(p2);
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'POST',
		dataType: 'JSON',
		data: {tipo:4 , param1: p1 , param2 : p2},
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		if ( data.insercion > 0  ){
			$("#nombre_gasto").val("");
			$("#monto_gasto").val("");
			cargar_gastos_2();
			
		}
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}

function vuelta(){
	$("#formulario_gasto").toggle();
	$("#msg_gasto_exito").toggle();
}

function calcular_ingreso_nuevo(){
	console.log("ingreso nuevo");
	var final = $("#final");
	var final_val = $("#final").val();
	var inicio_val = $("#inicio").html();
	var precio  = make_number ( $("#precio").html() );
	var condicion1 = make_number( final_val ) < make_number( inicio_val );

	if ( final_val == "" ){
		alert("ingrese un valor");
		final.focus();
		return false;
	}
	else{
		if ( condicion1 ){
			alert("Fin debe ser mayor al inicio");
			final.focus();
			return false;
		}	
		else{

			var vueltas = make_number( final_val ) - make_number(inicio_val ) ;

			if ( vueltas > 0 ){
				$("#vueltas").html( vueltas );
				var ingreso = vueltas * precio;
				
				$("#ingreso").html("$" + ingreso.toFixed(2) );
				$("#ingreso_total").html("$" + ingreso.toFixed(2) );

				if ( ingreso > 0 ){ 
					var mtto = make_number( $("#mtto_ruta").html() );
					var sal = ingreso * 0.17 ;
					var salary = sal - mtto;
					console.log("salario:"+salary);
					$("#salario_input").html("$" + salary.toFixed(2));
					calcular_gastos();
				}


			}
		}
	}	
}

function guardar_boleta(){
	var gastos = [];
	var gasto = {};
	var iGasto = 0;

	var maquina = {
			id_equipo 		: $("#unidad").data("id"),
			id_motorista	: $(".motoristas").val(),
			inicio 			: $("#inicio").html(),
			fin 			: $("#final").val(),
			vueltas 		: $("#vueltas").html(),
		};
	console.log(maquina);
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'POST',
		dataType: 'JSON',
		data: {tipo:5 , maquina : maquina },
	})
	.done(function(data) {
		console.log("success-maquina");
		console.log(data);
		var boleta = {
			id_maquina	: data.id  ,
			vueltas 	: $("#vueltas").html(),
			ingreso 	: make_number ( $("#ingreso").html() ) , 
			sueldo 		: make_number ( $("#salario_input").html() ) , 
			gastos 		: make_number ( $("#txt_suma_gasto").html() )  ,
			neto 		: make_number ( $("#neto_empresario").html() ) ,
			liquido 	: make_number ( $("#liquido_ingresado").html() ) , 
			equipo 		: $("#unidad").data("id"), 
			motorista 	: $(".motoristas").val(),
		};
		console.log(boleta);
		$.ajax({
			url: 'load/info_boleta.php',
			type: 'POST',
			dataType: 'JSON',
			data: {tipo:6 , boleta : boleta },
		})
		.done(function(datos) {
			console.log("success-boleta");
			console.log(datos);
			$("#tbl_gastos tbody tr").each(function(index, el) {
				var tr = $(el);
				var check = $(tr).find(".seleccion");
				
				if ( $(check).prop("checked")  ){
					var id_gasto_sel = make_number ( $(check).data("id") );
					if ( id_gasto_sel != 9){
						iGasto++;
						gasto = {
							boleta : datos.id ,
							gasto : id_gasto_sel ,
						};
						gastos.push(gasto);
					}
				}
			});
			var envio = JSON.stringify(gastos);
			console.log(envio);
			$.ajax({
				url: 'load/info_boleta.php',
				type: 'POST',
				dataType: 'JSON',
				data: {tipo:7 , gastos : envio , n : iGasto },
			})
			.done(function(datas) {
				console.log("success");
				console.log(datas);
				if ( datas.id == 1 ){
					abrirVentana(datas.id);
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		})
		.fail(function() {
			console.log("error");
		});
	})
	.fail(function() {
		console.log("error");
	});
}

function cargar_gastos_2(){
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '1'},
	})
	.done(function(data) {
		var gasto_ret = "";
		console.log("success");
		console.log(data);
		var n = data.lista.length;
		var gastos = data.lista;
		console.log(gastos);
		for (var i = 0; i < n ; i++) {
			if ( gastos[i].nombre != "Salario" ){
				gasto_ret += ''+
				    '<tr id="fila-"'+i+'>'+
	              	'	<td> <input type="text" name="" id="nombre" class="form-control" value=" '+gastos[i].nombre+'" pattern="" title=""></td>'+
	              	'	<td><input type="number" name="" id="monto" class="form-control" value="'+gastos[i].monto+'" required="required" title="">'+
	              	'       <input type="hidden" name="" id="id" class="form-control" value="'+gastos[i].id+'" required="required" title="">  </td>'+              		
	              	'	<td style="text-align:center;"> <button type="button" class="btn btn-success editar_gasto" onclick="editar_gasto('+gastos[i].id+')" ><i class="fa fa-fw fa-save"></i></button>  </td>'+ 
	              	'	<td style="text-align:center;"> <button type="button" class="btn btn-danger eliminar_gasto" onclick="eliminar_gasto('+gastos[i].id+')"><i class="fa fa-fw fa-trash"></i></button> </td> '+
	              	'</tr>';
	        }
		}

		$("#gastos_tabla tbody").html('');
		$("#gastos_tabla tbody").html(gasto_ret);

	})
	.fail(function(data) {
		console.log("error");
	})
	.always(function(data) {
		console.log("complete");
	});	
}

function abrirVentana(id) {
	var altura=400;
	var anchura=800;
	var y=parseInt((window.screen.height/2)-(altura/2));
	var x=parseInt((window.screen.width/2)-(anchura/2));
	window.open("imprimir.php?id="+id, target='blank','width='+anchura+',height='+altura+',top='+y+',left='+x+',toolbar=no,location=no,status=no,menubar=no,scrollbars=no,directories=no,resizable=no');
}

function editar_gasto(id){
	console.log(id);
	var nombre = $("#fila-"+id).find("#nombre");
	console.log(nombre);
	var monto = $("#fila-"+indice).find("#monto");
	console.log(monto);
	var id = $("#fila-"+indice).find("#id");
	console.log(id);

}


function eliminar_gasto(id){
	console.log(id);


}





<?php 
//echo "hello";
session_start();
require_once "configs/crudpdo.php";
require_once "configs/config.php";
require_once "Modelo.php";
//echo "helloq";

if (isset($_POST['tipo'])) {
    if($_POST['tipo'] == '0') {
        verificar_login();
    }  
    if($_POST['tipo'] == '1') {
        cargar_gastos();
    }    
    if($_POST['tipo'] == '2') {
        cargar_motoristas();
    }    
    if($_POST['tipo'] == '3') {
        cargar_motorista_info();
    } 
    if($_POST['tipo'] == '4') {
        guardar_nuevo_gasto();
    } 
    if($_POST['tipo'] == '5') {
        guardar_maquina();
    } 
    if($_POST['tipo'] == '6') {
        guardar_boleta();
    }     
    if($_POST['tipo'] == '7') {
        guardar_gastos();
    } 
}

function verificar_login(){
   // $modelo->VerificarLogin($nick,$contra);              
}


function cargar_gastos(){
    //echo "cargando gastos";
    $modelo                 = new Modelo();
    $lista_gastos           = [];
    try{ 
      
        $gastos           = $modelo->ObtenerGastos();

 
       foreach ($gastos as $gasto1) {
            //var_dump($gasto1);
            $gasto          = new stdClass();
            $gasto->id      = $gasto1["id_gasto"];
          $gasto->nombre    = $gasto1["descripcion_gasto"];
            $gasto->monto   = $gasto1["monto_gasto"];
            array_push($lista_gastos, $gasto);
       }

        $retorno            = new stdClass();
        $retorno->lista     = $lista_gastos;
        $retorno->estado    = "success";

        echo json_encode($retorno);
    } 
    catch (PDOException $e) {
        $mensaje = "DataBase Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);
    } 
    catch (Exception $e) {
        $mensaje = "General Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);                
    }
}


function cargar_motoristas(){
    //echo "cargando gastos";
    $modelo                 = new Modelo();
    $lista_motoristas       = [];
    try{ 
      
        $motoristas           = $modelo->ObtenerMotoristas();

 
       foreach ($motoristas as $motorista) {
            //var_dump($motorista);
            $elemento                   = new stdClass();
            $elemento->id               = $motorista["id_equipo"];
            $elemento->id_motorista     = $motorista["id_motorista"];
            $elemento->placa            = $motorista["placa_equipo"];
            $elemento->nombre           = $motorista["nombre_motorista"];
            array_push($lista_motoristas, $elemento);
        }

        $retorno                        = new stdClass();
        $retorno->lista                 = $lista_motoristas;
        $retorno->estado                = "success";

        echo json_encode($retorno);
    } 
    catch (PDOException $e) {
        $mensaje = "DataBase Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);
    } 
    catch (Exception $e) {
        $mensaje = "General Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);                
    }
}

function cargar_motorista_info(){
    //echo "cargando gastos";
    $modelo                 = new Modelo();
    $lista_motoristas       = [];
    $id                     = $_POST["codigo"];
    //var_dump($id);
    try{ 
      
        $motorista         = $modelo->ObtenerMotorista($id);

        //var_dump($motorista);

        $retorno                        = new stdClass();
        $retorno->motorista             = $motorista;
        $retorno->estado                = "success";

        echo json_encode($retorno);
    } 
    catch (PDOException $e) {
        $mensaje = "DataBase Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);
    } 
    catch (Exception $e) {
        $mensaje = "General Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);                
    }
}


function guardar_nuevo_gasto(){
    //echo "cargando gastos";
    $modelo                 = new Modelo();
    $lista_motoristas       = [];
    $nombre                 = $_POST["param1"];
    $monto                  = $_POST["param2"];
    //var_dump($id);
    try{ 
      
        $insert         = $modelo->NuevoGasto($nombre,$monto);

        //var_dump($motorista);

        $retorno                        = new stdClass();
        $retorno->insercion             = $insert;
        $retorno->estado                = "success";

        echo json_encode($retorno);
    } 
    catch (PDOException $e) {
        $mensaje = "DataBase Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);
    } 
    catch (Exception $e) {
        $mensaje = "General Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);                
    }
}


function guardar_maquina(){
    //echo "cargando gastos";
    $modelo                 = new Modelo();
    $id                     = 0;
    $maquina                = $_POST["maquina"];

    $id_equipo              = $maquina["id_equipo"];
    $id_motorista           = $maquina["id_motorista"];
    $inicio                 = $maquina["inicio"];
    $fin                    = $maquina["fin"];
    $vueltas                = $maquina["vueltas"];

    try{ 
      
        $id                     = $modelo->NuevaMaquina( $id_equipo , $id_motorista , $inicio , $fin , $vueltas ) ;
        $retorno                = new stdClass();
        $retorno->id            = $id;
        $retorno->estado        = "success";

        echo json_encode($retorno);
    } 
    catch (PDOException $e) {
        $mensaje = "DataBase Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);
    } 
    catch (Exception $e) {
        $mensaje = "General Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);                
    }
}

function guardar_boleta(){ 
    //echo "cargando gastos";
    $modelo                 = new Modelo();
    $id                     = 0;
    $boleta                = $_POST["boleta"];
    //var_dump($_POST);


    $id_maquina         = $boleta["id_maquina"];
    $vueltas            = $boleta["vueltas"];
    $total_ingreso      = $boleta["ingreso"];
    $sueldo             = $boleta["sueldo"];
    $total_gasto        = $boleta["gastos"];
    $neto_empresario    = $boleta["neto"];
    $liquido_entregado  = $boleta["liquido"];
    $id_equipo          = $boleta["equipo"];
    $id_motorista       = $boleta["motorista"];

    try{ 
      
        $id                     = $modelo->NuevaBoleta( $id_maquina , $vueltas ,$total_ingreso ,$sueldo ,$total_gasto ,$neto_empresario ,$liquido_entregado ,$id_equipo , $id_motorista ) ;
        $retorno                = new stdClass();
        $retorno->id            = $id;
        $retorno->estado        = "success";

        echo json_encode($retorno);
    } 
    catch (PDOException $e) {
        $mensaje = "DataBase Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);
    } 
    catch (Exception $e) {
        $mensaje = "General Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);                
    } 
}

function guardar_gastos(){

    $modelo                 = new Modelo();
    $id                     = 0;
    $ids                    = [];
    $i                      = 0;

    try{ 
        $gastos                 = json_decode($_POST["gastos"]);
        var_dump($gastos);
        foreach ($gastos as $gasto) {
            $i++;
            $id_boleta = $gasto->boleta;
            $id_gasto  = $gasto->gasto;
            $ids[] = $modelo->NuevoDetalleBoleta( $id_boleta , $id_gasto );
        }
        $n1 = count($ids);
        $n2 = $_POST["n"];

        if ( $n1 == $n2 ){
            $id = 1;
        }

        $retorno                = new stdClass();
        $retorno->id            = $id;
        $retorno->estado        = "success";

        echo json_encode($retorno);
    } 
    catch (PDOException $e) {
        $mensaje = "DataBase Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);
    } 
    catch (Exception $e) {
        $mensaje = "General Error: The user could not be added.<br>".$e->getMessage();
        $retorno = new stdClass();
        $retorno->mensaje = $mensaje;
        echo json_encode($retorno);                
    } 
}

 ?>


 <?php 


     class Modelo 
    {
        
        function __construct()
        {
            # code...
        }

        function VerificarLogin($nick , $contra){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "SELECT count(*) as existe from usuario where nick_usuario = '$nick' and contra_usuario = md5( '$contra');";
            //echo $sql;
            $usuario = $database->getRow($sql);
            return $usuario;
        }   


        function ObtenerBoleta($id){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from boleta where id_boleta = $id;";
            //echo $sql;
            $gastos = $database->getRow($sql);
            return $gastos;
        }  



        function ObtenerMaquina($id){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from maquina inner join equipo on equipo.id_equipo = maquina.id_equipo 
            inner join motorista on equipo.id_motorista = motorista.id_motorista
             where id_maquina = $id;";
            //echo $sql;
            $gastos = $database->getRow($sql);
            return $gastos;
        }  


        function ObtenerGastosBoleta($id){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from detalle_boleta inner join gastos on gastos.id_gasto = detalle_boleta.id_gasto 
             where id_boleta = $id;";
            //echo $sql;
            $gastos = $database->getRows($sql);
            return $gastos;
        }  


        function ObtenerGastos(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from gastos where estado = 1;";
            //echo $sql;
            $gastos = $database->getRows($sql);
            return $gastos;
        }   

        function ObtenerMotoristas(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select equipo.id_equipo , equipo.id_motorista , equipo.placa_equipo , motorista.nombre_motorista from equipo inner join motorista on equipo.id_motorista = motorista.id_motorista;";
            //echo $sql;
            $motoristas = $database->getRows($sql);
            return $motoristas;
        }

        function ObtenerMotorista($id){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select equipo.id_equipo, equipo.numero_equipo, equipo.placa_equipo , maquina.fin  from equipo 
                    inner join motorista 
                    on equipo.id_motorista = motorista.id_motorista 
                    inner join maquina 
                    on maquina.id_motorista = motorista.id_motorista 
                    where motorista.id_motorista = $id 
                    order by id_maquina desc limit 1
                    ";
            //echo $sql;
            $motorista = $database->getRow($sql);
            return $motorista;
        }


        function NuevoGasto($descripcion_gasto,$monto_gasto){
            $sql="insert into gastos values ( null , '$descripcion_gasto' , '$monto_gasto' , 1 , NOW() )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "descripcion_gasto" =>$descripcion_gasto,
                "monto_gasto"       =>$monto_gasto,
            );
            return $database->insertRowid($sql, $params);      
        }

        function NuevaMaquina( $id_equipo , $id_motorista , $inicio , $fin , $vueltas){
            $sql="insert into maquina values ( null , '$id_equipo' ,'$id_motorista' ,'$inicio' , '$fin' , '$vueltas' )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $params = array(
                "id_equipo"     =>$id_equipo,
                "id_motorista"  =>$id_motorista,
                "inicio"        =>$inicio,
                "fin"           =>$fin,
                "vueltas"       =>$vueltas,
            );
            return $database->insertRowid($sql, $params);      
        }    

        function NuevaBoleta( $id_maquina , $viajes ,$total_ingreso ,$sueldo ,$total_gasto ,$neto_empresario ,$liquido_entregado ,$id_equipo , $id_motorista ){
            //echo "nueva boleta sql";
            $sql = "insert into boleta (id_boleta, id_maquina, viajes, total_ingreso, sueldo, total_gasto, neto_empresario, liquido_entregado, id_equipo, id_motorista ) 
                                VALUES (NULL, '$id_maquina', '$viajes', '$total_ingreso', '$sueldo', '$total_gasto', '$neto_empresario', '$liquido_entregado', '$id_equipo', '$id_motorista');";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //echo "<br>" . $sql;
            $params = array(
                "id_maquina"        => $id_maquina,
                "viajes"            => $viajes,
                "total_ingreso"     => $total_ingreso,
                "sueldo"            => $sueldo,
                "total_gasto"       => $total_gasto,
                "neto_empresario"   => $neto_empresario,
                "liquido_entregado" => $liquido_entregado,
                "id_equipo"         => $id_equipo,
                "id_motorista"      => $id_motorista
            );
            return $database->insertRowid($sql, $params);      
        }

        function NuevoDetalleBoleta( $id_boleta , $id_gasto ){
            $sql="insert into detalle_boleta values ( null , '$id_boleta' ,'$id_gasto'  )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $params = array(
                "id_boleta"     =>$id_boleta,
                "id_gasto"      =>$id_gasto,
            );
            return $database->insertRowid($sql, $params);      
        } 


        function eliminar_maquina_boleta( $id_maquina ){
            $sql="delete from maquina where id_maquina = $id_maquina  )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $params = array(
                "id_maquina"     =>$id_maquina,
            );
            return $maquina_del = $database->deleteRow($sql, $params);  
            
             
        }

        function eliminar_boleta_boleta( $id_boleta ){
            $sql="delete from boleta where id_boleta = $id_boleta  )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $params = array(
                "id_boleta"     =>$id_boleta,
            );
            return $maquina_del = $database->deleteRow($sql, $params);  
            
             
        }


        function eliminar_detalle_boleta( $id_boleta ){
            $sql="delete from detalle_boleta where id_boleta = $id_boleta  )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $params = array(
                "id_boleta"     =>$id_boleta,
            );
            return $maquina_del = $database->deleteRow($sql, $params);  
            
             
        }

    }

 ?>