
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
			select += '<option value="'+motoristas[i].id_motorista +'" data-equipo = "'+motoristas[i].id_equipo +'"> '+motoristas[i].numero_equipo +' - '+motoristas[i].nombre +' - '+motoristas[i].placa +' </option>';
		}
		$(".motoristas").html(select);
		$('.select2').select2();
		console.log(data.lista[0]);
	})
	.fail(function(data) {
		console.log("error");
	})
	.always(function(data) {
		console.log("complete");
	});	
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
		console.log(data.lista1);
		var str1 = '';
		var str2 = '';
		var str3 = '';

		
		var lista1 = data.lista1;
		var n1 = lista1.length;		

		var lista2 = data.lista2;
		var n2 = lista2.length;		

		var lista3 = data.lista3;
		var n3 = lista3.length;
		var ac1 = 0;
		var ac2 = 0;
		var ac3 = 0;


		for (var i = 0; i < n1 ; i++) {
			ac1 += make_number( lista1[i].monto ) ;
			str1 +=	'<tr class="og">'+
					'	<td> '+lista1[i].nombre+' </td>'+
					'	<td  style="width:25%;">  <span class="id_gasto" style="display:none;"> '+lista1[i].id+' </span>  <input type="text" id="" name="" value=" '+lista1[i].monto+'" placeholder="" class="gasto_salario form-control gasto_clc" data-gasto="1"> </td>'+
					'	<td  style="width:25%;"></td>'+
					'</tr>';
		}

		str1 +=  	'<tr id="add_g1">'+
					'	<td colspan="3" style="font-weight: 700;color: #a94442;text-align:center;color:" onclick="agregar_gasto(1)"> + Agregar  </td>'+
					'</tr>';


		//$("#total_g1").html("$" + ac1.toFixed(2) );
		$("#tbl_g1 tbody").html(str1);

		//$( str1 ).insertAfter( $("#tbl_g1 tbody") );  

		for (var i = 0; i < n2 ; i++) {
			ac2 += make_number( lista2[i].monto ) ;
			str2 +=	'<tr class="og">'+
					'	<td> '+lista2[i].nombre+' </td>'+
					'	<td  style="width:25%;">  <span class="id_gasto" style="display:none;"> '+lista2[i].id+' </span>  <input type="text" id="" name="" value=" '+lista2[i].monto+'" placeholder="" class="gasto_operativo form-control gasto_clc" data-gasto="2"> </td>'+
					'	<td  style="width:25%;"></td>'+
					'</tr>';
		}

		str2 +=  	'<tr id="add_g2">'+
					'	<td colspan="3" style="font-weight: 700;color: #a94442;text-align:center" onclick="agregar_gasto(2)"> + Agregar  </td>'+
					'</tr>';
		$("#total_g2").html("$" + ac2.toFixed(2) );
		$("#tbl_g2 tbody").html(str2);

		//$( str2 ).insertAfter( $(".gastos_salario") );  		

		for (var i = 0; i < n3 ; i++) {
			ac3 += make_number( lista3[i].monto ) ;
			str3 +=	'<tr class="og">'+
					'	<td> '+lista3[i].nombre+' </td>'+
					'	<td  style="width:25%;">  <span class="id_gasto" style="display:none;"> '+lista3[i].id+' </span>  <input type="text" id="" name="" value=" '+lista3[i].monto+'" placeholder="" class="gasto_admin form-control gasto_clc" data-gasto="3"> </td>'+
					'	<td  style="width:25%;"></td>'+
					'</tr>';
		}

		str3 +=  	'<tr id="add_g3">'+
					'	<td colspan="3" style="font-weight: 700;color: #a94442;text-align:center" onclick="agregar_gasto(3)"> + Agregar  </td>'+
					'</tr>';
		$("#total_g3").html("$" + ac3.toFixed(2) );
		$("#tbl_g3 tbody").html(str3);

		//$( str3 ).insertAfter( $(".gastos_operativo") );  




	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}




function cargar_gastos_editar(){
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '1'},
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		console.log(data.lista1);
		var str1 = '';
		var str2 = '';
		var str3 = '';

		
		var lista1 = data.lista1;
		var n1 = lista1.length;		

		var lista2 = data.lista2;
		var n2 = lista2.length;		

		var lista3 = data.lista3;
		var n3 = lista3.length;
		var ac1 = 0;
		var ac2 = 0;
		var ac3 = 0;

		str1 +=	'<tr>'+
               	'     <td style="text-align: center;"> Nombre Gasto </td>'+
               	'     <td style="text-align: center;"> Monto </td>'+
               	'     <td style="text-align: center;"> Alternativo </td>'+
               	'     <td colspan="2"> Acciones  </td>'+
               	'</tr>';		

        str2 +=	'<tr>'+
               	'     <td style="text-align: center;"> Nombre Gasto </td>'+
               	'     <td style="text-align: center;"> Monto </td>'+
               	'     <td style="text-align: center;"> Alternativo </td>'+
               	'     <td colspan="2"> Acciones  </td>'+
               	'</tr>';		

        str3 +=	'<tr>'+
               	'     <td style="text-align: center;"> Nombre Gasto </td>'+
               	'     <td style="text-align: center;"> Monto </td>'+
               	'     <td style="text-align: center;"> Alternativo </td>'+
               	'     <td colspan="2"> Acciones  </td>'+
               	'</tr>';


		for (var i = 0; i < n1 ; i++) {
			ac1 += make_number( lista1[i].monto ) ;
			str1 +=	'<tr class="og">'+
					'	<td  style="">  '+
					'		<input type="text" id="" name="" value="'+lista1[i].nombre+'" placeholder="" class="form-control nombre" >'+
					' 	</td>'+					
					'	<td  style="width:10%;">  '+
					'		<span class="id_gasto" style="display:none;">'+lista1[i].id+'</span>  '+
					'		<span class="tipo_gasto" style="display:none;"> 1  </span>  '+
					'		<input type="number" id="" name="" value="'+lista1[i].monto+'" placeholder="" class="form-control monto1" >'+
					' 	</td>'+					
					'	<td  style="width:10%;">  '+
					'		<input type="number" id="" name="" value="'+lista1[i].monto2+'" placeholder="" class="form-control monto2" >'+
					' 	</td>'+
					'	<td  style="width:5%;"> <button type="button" class="btn btn-info btn-save"> <i class="fa fa-edit"></i>   </button></td>'+
					'	<td  style="width:5%;"> <button type="button" class="btn btn-danger btn-delete"> <i class="fa fa-trash"></i>   </button></td>'+
					'</tr>';
		}

		str1 +=  	'<tr id="add_g1">'+
					'	<td colspan="5" style="font-weight: 700;color: #a94442;text-align:center;color:" onclick="agregar_gasto_edit(1)"> + Agregar  </td>'+
					'</tr>';


		//$("#total_g1").html("$" + ac1.toFixed(2) );
		$("#tbl_g1 tbody").html(str1);

		//$( str1 ).insertAfter( $("#tbl_g1 tbody") );  

		for (var i = 0; i < n2 ; i++) {
			ac2 += make_number( lista2[i].monto ) ;
			str2 +=	'<tr class="og">'+
					'	<td  style="">  '+
					'		<input type="text" id="" name="" value="'+lista2[i].nombre+'" placeholder="" class="form-control nombre" >'+
					' 	</td>'+					
					'	<td  style="width:10%;">  '+
					'		<span class="id_gasto" style="display:none;">'+lista2[i].id+'</span>  '+
					'		<span class="tipo_gasto" style="display:none;">2</span>  '+
					'		<input type="number" id="" name="" value="'+lista2[i].monto+'" placeholder="" class="form-control monto1" >'+
					' 	</td>'+					
					'	<td  style="width:10%;">  '+
					'		<input type="number" id="" name="" value="'+lista2[i].monto2+'" placeholder="" class="form-control monto2" >'+
					' 	</td>'+
					'	<td  style="width:5%;"> <button type="button" class="btn btn-info btn-save"> <i class="fa fa-edit"></i>   </button></td>'+
					'	<td  style="width:5%;"> <button type="button" class="btn btn-danger btn-delete"> <i class="fa fa-trash"></i>   </button></td>'+
					'</tr>';
		}

		str2 +=  	'<tr id="add_g2">'+
					'	<td colspan="5" style="font-weight: 700;color: #a94442;text-align:center;color:" onclick="agregar_gasto_edit(2)"> + Agregar  </td>'+
					'</tr>';




		$("#total_g2").html("$" + ac2.toFixed(2) );
		$("#tbl_g2 tbody").html(str2);

		//$( str2 ).insertAfter( $(".gastos_salario") );  		

		for (var i = 0; i < n3 ; i++) {
			ac3 += make_number( lista3[i].monto ) ;
			str3 +=	'<tr class="og">'+
					'	<td  style="">  '+
					'		<input type="text" id="" name="" value="'+lista3[i].nombre+'" placeholder="" class="form-control nombre" >'+
					' 	</td>'+					
					'	<td  style="width:10%;">  '+
					'		<span class="id_gasto" style="display:none;">'+lista3[i].id+'</span>  '+
					'		<span class="tipo_gasto" style="display:none;">3</span>  '+
					'		<input type="number" id="" name="" value="'+lista3[i].monto+'" placeholder="" class="form-control monto1" >'+
					' 	</td>'+					
					'	<td  style="width:10%;">  '+
					'		<input type="number" id="" name="" value="'+lista3[i].monto2+'" placeholder="" class="form-control monto2" >'+
					' 	</td>'+
					'	<td  style="width:5%;"> <button type="button" class="btn btn-info btn-save"> <i class="fa fa-edit"></i>   </button></td>'+
					'	<td  style="width:5%;"> <button type="button" class="btn btn-danger btn-delete"> <i class="fa fa-trash"></i>   </button></td>'+
					'</tr>';
		}

		str3 +=  	'<tr id="add_g3">'+
					'	<td colspan="5" style="font-weight: 700;color: #a94442;text-align:center;color:" onclick="agregar_gasto_edit(3)"> + Agregar  </td>'+
					'</tr>';
		$("#total_g3").html("$" + ac3.toFixed(2) );
		$("#tbl_g3 tbody").html(str3);

		//$( str3 ).insertAfter( $(".gastos_operativo") );  




	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}





function calcular_ingreso(){
	var inicio 	= parseInt( $("#inicio").val() );
	var fin 	= parseInt( $("#fin").val() ) ;
	var precio 	= parseFloat( $("#precio").val() ) ;
	var total 	= (  fin - inicio ) * precio ;

	if (  $("#inicio").val() != "" ){
		if(  $("#fin").val() != "" ){
			$("#vueltas").val(  (  fin - inicio ) );
			$(".ingreso_label").html("$" + total.toFixed(2));
			$("#total_ingreso").html("$" + total.toFixed(2));
			$("#viajes").focus();
			calcular_salario();
			calcular_consolidados();
		} 
		else{
			$("#fin").focus();
		}
	} 
	else{
		$("#inicio").focus();
	}

}


function calcular_salario(){
	console.log("salario");
	var acumulador = 0;
	var ingreso = make_number ( $("#total_ingreso").html() ) ;
	$(".gasto_salario").each(function(index, el) {
		var salario = parseFloat( $(el).val() ) ;
		acumulador += salario;
	});

	var porcentaje = 0.17;
	var salario_neto = ( ingreso * porcentaje ) - acumulador;
	$("#total_g1").val(salario_neto.toFixed(2));
	recalcular_gastos(1);
}

function habilitar_inicio(check){
	if (  $(check).prop("checked") ){
		$("#inicio").removeAttr('readonly');
	}
	else{
		$("#inicio").attr('readonly','readonly');
	}
	
}




function agregar_gasto(tipo){
	var nombre_gasto = "";
	console.log("hola");

	switch(tipo) {
		case 1: 	nombre_gasto 	= "salario";
					selector 		= "1"
					break;		

		case 2: 	nombre_gasto 	= "operativo";
					selector 		= "2"
					break;		

		case 3: 	nombre_gasto 	= "admin";
					selector 		= "3"
					break;
	}

	var str =   '<tr class="ng">'+
					'<td> <input type="text" id="nombre_gasto" name="" value="" placeholder="" class="gasto_'+nombre_gasto+'_nombre form-control" style="width: 100%;">   </td>'+
					'<td> <input type="number" id="monto_gasto" name="" value="" placeholder=""  class="gasto_'+nombre_gasto+' form-control gasto_clc" data-gasto="'+selector+'">  </td>'+
					'<td></td>'+
				'</tr>';

	$( str ).insertBefore( "#add_g"+selector );

}




function agregar_gasto_edit(tipo){
	var nombre_gasto = "";
	console.log("hola");

	switch(tipo) {
		case 1: 	nombre_gasto 	= "salario";
					selector 		= "1"
					break;		

		case 2: 	nombre_gasto 	= "operativo";
					selector 		= "2"
					break;		

		case 3: 	nombre_gasto 	= "admin";
					selector 		= "3"
					break;
	}

	var str =	'<tr class="og">'+
				'	<td  style="width:25%;">  '+
				'		<input type="text" id="" name="" value="" placeholder="" class="form-control nombre" >'+
				' 	</td>'+					
				'	<td  style="width:25%;">  '+
				'		<span class="id_gasto" style="display:none;">0</span>  '+
				'		<span class="tipo_gasto" style="display:none;"> 1  </span>  '+
				'		<input type="text" id="" name="" value="" placeholder="" class="form-control monto1" >'+
				' 	</td>'+					
				'	<td  style="width:25%;">  '+
				'		<input type="text" id="" name="" value="" placeholder="" class="form-control monto2" >'+
				' 	</td>'+
				'	<td  style="width:5%;"> <button type="button" class="btn btn-success btn-new"> <i class="fa fa-save"></i>   </button></td>'+
				'	<td  style="width:5%;"> <button type="button" class="btn btn-danger btn-close"> <i class="fa fa-close"></i>   </button></td>'+
				'</tr>';
		

	$( str ).insertBefore( "#add_g"+selector );

}



function seleccionar_motorista(id){
	var codigo 		= $("#input_moto option:selected").data("equipo");
	
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '3' , codigo : codigo },
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		var nuevo_fin  = llenar_ceros( data.fin );
		$("#inicio").val(nuevo_fin);


	})
	.fail(function(data) {
		console.log("error");
	})
	.always(function(data) {
		console.log("complete");
	});
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


function llenar_ceros( numero ){
	var str = "";
	var nuevo = "" + numero;
	var n = nuevo.length;
	console.log(numero);
	console.log(n);
	switch (n) {
		case 1: str = "00000" + numero; break;
		case 2: str = "0000" + numero; break;
		case 3: str = "000" + numero; break;
		case 4: str = "00" + numero; break;
		case 5: str = "0" + numero; break;
		case 6: str = "" + numero; break;
	}
	console.log(str);
	return str;
}

/*----------------------------------------------------------------------------------------------------------------------------*/

function cargar_todos_gastos(){
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '4'},
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
	              	'	<td><input type="number" name="" id="monto" class="form-control" value="'+gastos[i].m1+'" required="required" title="">'+
	              	'	<td><input type="number" name="" id="monto" class="form-control" value="'+gastos[i].m2+'" required="required" title="">'+
	              	'       <input type="hidden" name="" id="id" class="form-control" value="'+gastos[i].id+'" required="required" title="">  </td>'+              		
	              	'	<td style="text-align:center;"> <button type="button" class="btn btn-success button2"  ><i class="fa fa-fw fa-save"></i></button>  </td>'+ 
	              	'	<td style="text-align:center;"> <button type="button" class="btn btn-danger eliminar_gasto" ><i class="fa fa-fw fa-trash"></i></button> </td> '+
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

/*----------------------------------------------------------------------------------------------------------------------------*/


function guardar_nuevo_gasto(){ 

	var nombre = $("#nombre_gasto");
	var monto1 = $("#monto_gasto");
	var monto2 = $("#monto_alternativo");

	if ( nombre.val() ==  ""){
		nombre.focus();
	}
	else{
		if ( monto1.val() ==  ""  || monto1.val() <= 0){
			monto1.focus();
		}
		else{
			if ( monto2.val() == "" || monto2.val() <= 0 ){
				monto2.focus();
			}
			else{
				$.ajax({
					url: 'load/info_boleta.php',
					type: 'POST',
					dataType: 'JSON',
					data:{
							tipo   : 4 , 
							param1 : p1 , 
							param2 : p2 , 
							param3 : p3 , 
							},
				})
				.done(function(data) {
					console.log("success");
					console.log(data);
					if ( data.insercion > 0  ){
						nombre.val("");
						monto1.val("");
						monto2.val("");
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
		}
	}

}


function recalcular_gastos(tipo){
	var sumar = 0;
	console.log(tipo);

	switch(tipo) {
		case 1: 	nombre_gasto 	= ".gasto_salario";
					selector 		= "#tbl_g1 tbody tr";
					break;		

		case 2: 	nombre_gasto 	= ".gasto_operativo";
					selector 		= "#tbl_g2 tbody tr";
					break;		

		case 3: 	nombre_gasto 	= ".gasto_admin";
					selector 		= "#tbl_g3 tbody tr";
					break;
	}

	console.log(selector);
	var n = $(selector).length;
	console.log(n);
	var total = 0;

	$(selector).each(function(index, el) {
		var input = $(el).find(nombre_gasto);
		if( input.length > 0 ){
			valor_suma = make_number( input.val() );
			if ( valor_suma >= 0 ){
				sumar += make_number( input.val() );
			}
		}
	});
	console.log(sumar);
	if( tipo == 1 ){
		if( make_number( $("#total_ingreso").html() ) != 0 ){
			var ingreso = make_number ( $("#total_ingreso").html() ) ;
			var salario = ingreso * 0.17;
			total = salario - sumar; 
			$("#total_g1").html("$" + total.toFixed(2));
			calcular_consolidados();
		}
	}
	else{
		total = sumar;
		$("#total_g"+tipo).html("$" + total.toFixed(2));
		calcular_consolidados();
	}


}


function calcular_consolidados(){
	var neto = 0;
	var liquido = 0;

	var ing = $("#total_ingreso");
	var sueldo = $("#total_g1");
	var opera = $("#total_g2");
	var admin = $("#total_g3");

	console.log(ing);
	console.log(sueldo);
	console.log(opera);
	console.log(admin);


	console.log(ing.html());
	console.log(sueldo.html());
	console.log(opera.html());
	console.log(admin.html());

	var ingreso = make_number(ing.html());
	var sueldos 	= make_number(sueldo.html());
	var operat  = make_number(opera.html());
	var admini  = make_number(admin.html());

	var gastos = sueldos + operat + admini;
	console.log(gastos);


	liquido = ingreso - ( sueldos + operat );
	console.log(liquido);


	neto = liquido - admini;
	console.log(neto);


	$(".liquido_label").html("$" + liquido.toFixed(2) );
	$(".neto_label").html("$" + neto.toFixed(2) );
	$(".gasto_label").html("$" + gastos.toFixed(2) );
}


function guardar_boleta(){
	



	var gastos_salar = [];
	var gastos_opera = [];
	var gastos_admin = [];	

	var gn_salar = [];
	var gn_opera = [];
	var gn_admin = [];

	var liquido 	= make_number( $(".liquido_label").html());
	var neto 		= make_number( $(".neto_label").html());
	var gasto 		= make_number( $(".gasto_label").html());
	var ingreso 	= make_number( $(".ingreso_label").html());
	var sueldo 		= make_number( $("#total_g1").html());
	

	var equipo 		= $("#input_moto option:selected").data("equipo");
	var motorista 	= $("#input_moto").val();
	var comentario 	= $("#comentario").val();

	var inicio 		= $("#inicio").val();
	var fin 		= $("#fin").val();
	var vueltas 	= $("#vueltas").val();
	var viajes 		= $("#viajes").val();


	var fecha0 		= $("#inputFecha").val();
	var equipo2 	= $("#input_moto").val();

	if ( fecha0 != "" ){ 
		if ( equipo2 != null ){
		
		


		$("#modal_guardando").modal("show");
	

		var boleta 	= {
						total_ingreso  		: ingreso  ,
						total_gasto  		: gasto  ,
						liquido_entregado  	: liquido  ,
						neto_empesario  	: neto  ,
						id_equipo  			: equipo  ,
						id_motorista  		: motorista  ,
						comentario  		: comentario  ,
						sueldo 				: sueldo ,
						fecha 				: fecha0 ,
					  };

		//console.log(boleta);

		var ing = {
						inicio 	: inicio,
						fin    	: fin,
						vueltas	: vueltas,
						viajes 	: viajes,
		}
		// SALARIO
		/*---------------------------------------------------------------------------------------------------*/
		$("#tbl_g1 tbody tr.og").each(function(index, el) {
			var id = $(el).find(".id_gasto").html();
			var valor = $(el).find(".gasto_salario").val();
			var gasto = { 
							id 		: id,
							valor 	: valor
						};
			gastos_salar.push(gasto);
		});
		//console.log(gastos_salar);		


		$("#tbl_g1 tbody tr.ng").each(function(index, el) {
			var nombre = $(el).find("#nombre_gasto").val();
			var valor = $(el).find("#monto_gasto").val();
			var gasto = { 
							nombre 	: nombre,
							valor 	: valor
						};
			gn_salar.push(gasto);
		});
		//console.log(gn_salar);
		/*---------------------------------------------------------------------------------------------------*/

		$("#tbl_g2 tbody tr.og").each(function(index, el) {
			var id = $(el).find(".id_gasto").html();
			console.log(id);
			var valor = $(el).find(".gasto_operativo").val();
			console.log(valor);
			var gasto = { 
							id 		: id,
							valor 	: valor
						};
			gastos_opera.push(gasto);
		});
		//console.log(gastos_opera);

		$("#tbl_g2 tbody tr.ng").each(function(index, el) {
			var nombre = $(el).find("#nombre_gasto").val();
			var valor = $(el).find("#monto_gasto").val();
			var gasto = { 
							nombre 	: nombre,
							valor 	: valor
						};
			gn_opera.push(gasto);
		});
		//console.log(gn_opera);
		/*---------------------------------------------------------------------------------------------------*/
		$("#tbl_g3 tbody tr.og").each(function(index, el) {
			var id = $(el).find(".id_gasto").html();
			console.log(id);
			var valor = $(el).find(".gasto_admin").val();
			console.log(valor);
			var gasto = { 
							id 		: id,
							valor 	: valor
						};
			gastos_admin.push(gasto);
		});
		//console.log(gastos_admin);

		$("#tbl_g3 tbody tr.ng").each(function(index, el) {
			var nombre = $(el).find("#nombre_gasto").val();
			var valor = $(el).find("#monto_gasto").val();
			var gasto = { 
							nombre 	: nombre,
							valor 	: valor
						};
			gn_admin.push(gasto);
		});
		//console.log(gn_admin);


		/*---------------------------------------------------------------------------------------------------*/


	    var parametros = [];
	    parametros.push(boleta);

	  
		if ( gastos_salar.length > 0 ){
			parametros.push(gastos_salar);
		}

		if ( gastos_opera.length > 0 ){
			parametros.push(gastos_opera);
		}

		if ( gastos_admin.length > 0 ){
			parametros.push(gastos_admin);
		}

		if ( gn_salar.length > 0 ){
			parametros.push(gn_salar);
		}

		if ( gn_opera.length > 0 ){
			parametros.push(gn_opera);
		}

		if ( gn_admin.length > 0 ){
			parametros.push(gn_admin);
		}


		envio_boleta( 	
						JSON.stringify( boleta),
						JSON.stringify( gn_salar),
						JSON.stringify( gn_opera),
						JSON.stringify( gn_admin),
						JSON.stringify( gastos_salar),
						JSON.stringify( gastos_opera),
						JSON.stringify( gastos_admin),
						JSON.stringify( ing),
					);
	}
	else{
		alert("Seleccione una unidad");
		return false;
	}
	}
	else{
		alert("Ingres fecha");
		return false;
	}

	
}

function envio_boleta( boleta , salario , opera , admin , n_salario , n_opera , n_admin , ing ){
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 5 ,  boleta , salario , opera , admin , n_salario , n_opera , n_admin , ing },
	})
	.done(function() {
		console.log("success");
		 $("#msg_exito").show();
		 $("#msg_loading").hide();
		 $("#comentario").val("");
		//location.reload();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}




function guardar_edit_gasto(tr,op){
	var id = $(tr).find("td span.id_gasto") ;
	var tipo = $(tr).find("td span.tipo_gasto") ;

	var nombre = $(tr).find("td .nombre") ;
	var monto1 = $(tr).find("td .monto1") ;
	var monto2 = $(tr).find("td .monto2") ;
	console.log(tr);
	console.log(id);
	if  ( op == 1 ){
		send = 6;
	}
	else{
		send = 7;
	}


	var gasto = {	
					id 		: id.html() ,
					tipo 	: tipo.html(),
					nombre 	: nombre.val(),
					monto1	: monto1.val(),
					monto2 	: monto2.val(),
				};
	console.log(gasto);

	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: send , gasto },
	})
	.done(function() {
		console.log("success");
		cargar_gastos_editar();
		 $("#msg_exito").show();
		 $("#msg_loading").hide();
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}


function eliminar_edit_gasto(tr){
	var id = $(tr).find("td span.id_gasto") ;
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 8 , id : id.html()  },
	})
	.done(function() {
		console.log("success");
		cargar_gastos_editar();	
		$("#msg_exito_eliminar").show();
		$("#msg_loading_eliminar").hide();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function cargar_motoristas_equipo(){
	
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 9 },
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		tabla_motorista_equipo(data.lista);
	})
	.fail(function() {
		console.log("error_here");
	})
	.always(function() {
		console.log("complete");
	});
}

function cargar_motoristas_mtto(){
	
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 10 },
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		tabla_motoristas(data.lista);
	})
	.fail(function() {
		console.log("error_here");
	})
	.always(function() {
		console.log("complete");
	});
}





function tabla_motorista_equipo(lista){
	var str = '' ;
		var equipos 	= lista;
		var n 		= lista.length;
		str +=  '<tr>'+
				'	<td style="width:10%;">'+
				'		Número'+
				'	</td>'+
				'	<td style="width:15%;">'+
				'		Placa '+
				'	</td>'+
				'	<td>'+
				'		 Motorista Asignado '+
				'	</td>'+
				'	<td colspan="2" style="width:20%;">'+
				'		Acciones '+
				'	</td> '+
				'</tr>';

		var select = '<option selected="selected" disabled="disabled">Seleccione un motorista</option>';
		for (var i = 0; i < n; i++) {
			str +=  '<tr class="tr_equipo_motorista">'+
					'	<td> <span class="id_equipo" style="display:none;">'+equipos[i].id_equipo+'</span> <input type="text" name="" id="input" class="form-control numero" value="'+equipos[i].numero+'" > </td> '+
					'	<td> <input type="text" name="" id="input" class="form-control placa" value="'+equipos[i].placa+'" > </td> '+
					'	<td> <span id="id_motorista" style="display:none;">'+equipos[i].id_motorista+'</span> <select name="motorista" id="input" class="form-control select2 motorista_equipo" data-id="'+equipos[i].id_motorista+'"> </select> </td> '+
	              	'	<td style="text-align:center;"> <button type="button" class="btn btn-success button2 btn-save"  ><i class="fa fa-fw fa-save"></i></button>  </td>'+ 
	              	'	<td style="text-align:center;"> <button type="button" class="btn btn-danger eliminar_gasto btn-delete" ><i class="fa fa-fw fa-trash"></i></button> </td> '+
					'</tr>';
		}
		$("#tbl-equipo-motorista tbody").html(str);
		select_motorista_Equipo( );
}

function select_motorista_Equipo( ){
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '10'},
	})
	.done(function(data) {
		//console.log("success");
		//console.log(data);
		//console.log(data.lista);
		var n = data.lista.length;
		var motoristas = data.lista;
		var select = '<option selected="selected" disabled="disabled">Seleccione un motorista</option>';
		for (var i = 0; i < n; i++) {
			select += '<option value="'+motoristas[i].id_motorista +'" > '+motoristas[i].nombre +'  </option>';
		}
		$(".motorista_equipo").html(select);
		$(".motorista_equipo").each(function(index, el) {
			var id_seleccionado = $(this).data("id");
			console.log(id_seleccionado);
			var option = $(this).find("option[value="+id_seleccionado+"]" );
			console.log(option);
			option.attr('selected', 'selected');
		}); 
		$('.select2').select2();
		//console.log(data.lista[0]);
	})
	.fail(function(data) {
		console.log("error_select_motorista_Equipo");
	})
	.always(function(data) {
		console.log("complete");
	});	
}

function select_solo_motistas( ){
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: {tipo: '10'},
	})
	.done(function(data) {
		//console.log("success");
		//console.log(data);
		//console.log(data.lista);
		var n = data.lista.length;
		var motoristas = data.lista;
		var select = '<option selected="selected" disabled="disabled">Seleccione un motorista</option>';
		for (var i = 0; i < n; i++) {
			select += '<option value="'+motoristas[i].id_motorista +'" > '+motoristas[i].nombre +'  </option>';
		}
		$(".motorista_nuevo_equipo").html(select);
	})
	.fail(function(data) {
		console.log("error_select_motorista_Equipo");
	})
	.always(function(data) {
		console.log("complete");
	});	
}




function guardar_equipo(tr){

	var id = $(tr).find("td span.id_equipo") ;
	var numero = $(tr).find("td .numero") ;

	var placa = $(tr).find("td .placa") ;
	var motorista = $(tr).find("td .motorista_equipo") ;


	console.log(tr);

	var equipo = {	
					id 			: id.html() ,
					numero 		: numero.val(),
					placa 		: placa.val(),
					motorista	: motorista.val(),
				};
	console.log(equipo);

	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 11 , equipo },
	})
	.done(function() {
		console.log("success");
		cargar_motoristas_equipo();
		 $("#msg_exito").show();
		 $("#msg_loading").hide();
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function eliminar_equipo(tr){
	var id = $(tr).find("td span.id_equipo") ;
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 12 , id : id.html()  },
	})
	.done(function() {
		console.log("success");
		cargar_gastos_editar();	
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function tabla_motoristas(lista){
	var str = '' ;
		var motoristas 	= lista;
		var n 		= lista.length;
		str +=  '<tr>'+
				'	<td style="width:80%;">'+
				'		Nombre'+
				'	</td>'+
				'	<td colspan="2" style="width:20%;">'+
				'		Acciones '+
				'	</td> '+
				'</tr>';

		var select = '<option selected="selected" disabled="disabled">Seleccione un motorista</option>';
		for (var i = 0; i < n; i++) {
			str +=  '<tr class="tr_mtto_motorista">'+
					'	<td> <span class="id_motorista" style="display:none;">'+motoristas[i].id_motorista+'</span> <input type="text" name="" id="input" class="form-control nombre" value="'+motoristas[i].nombre+'" > </td> '+
	              	'	<td style="text-align:center;"> <button type="button" class="btn btn-success button2 btn-save"  ><i class="fa fa-fw fa-save"></i></button>  </td>'+ 
	              	'	<td style="text-align:center;"> <button type="button" class="btn btn-danger eliminar_gasto btn-delete" ><i class="fa fa-fw fa-trash"></i></button> </td> '+
					'</tr>';
		}
		$("#tbl-motoristas tbody").html(str);
		
}


function nuevo_motorista(){
 	var motorista = $("#nombre_motorista");
 	if ( motorista.val() == "" ){
 		motorista.focus();
 	}
 	else{
 		enviar_nuevo_motorista(motorista.val());
 	}

}

function enviar_nuevo_motorista(motorista){
	
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 14 , motorista : motorista  },
	})
	.done(function() {
		console.log("success");
		cargar_motoristas_mtto();
		$("#nombre_motorista").val("");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}




function eliminar_motorista(tr){
	var id = $(tr).find("td span.id_motorista") ;
	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 15 , id : id.html()  },
	})
	.done(function() {
		console.log("success");
		cargar_motoristas_mtto();
		$("#msg_exito_eliminar").show();
		$("#msg_loading_eliminar").hide();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}




function guardar_motorista(tr){

	var id = $(tr).find("td span.id_motorista") ;
	var nombre = $(tr).find("td .nombre") ;

	console.log(tr);

	var motorista = {	
					id 			: id.html() ,
					nombre 		: nombre.val(),
				};
	console.log(motorista);

	$.ajax({
		url: 'load/info_boleta.php',
		type: 'post',
		dataType: 'json',
		data: { tipo: 16 , motorista },
	})
	.done(function() {
		console.log("success");
		cargar_motoristas_mtto();
		 $("#msg_exito").show();
		 $("#msg_loading").hide();
		
	})
	.fail(function() {
		console.log("error");
 		$("#modal_guardando").modal("hide");
 		$("#modal_error").modal("show");
	});
	
}


function guardar_nuevo_equipo(){
		var numero = $("#numero_equipo");
		var placa = $("#numero_placa");
		var motorista = $("#id_motorista");

		if ( numero.val() == "" ){
			numero.focus();
		}
		else{
			if( placa.val() == "" ){
				placa.focus();
			}
			else{
				var equipo = {	
								numero 			: numero.val() ,
								placa 			: placa.val(),
								motorista 		: motorista.val(),
							};
				console.log(equipo);

				$.ajax({
					url: 'load/info_boleta.php',
					type: 'post',
					dataType: 'json',
					data: { tipo: 13 , equipo },
				})
				.done(function() {
					console.log("success");
					cargar_motoristas_mtto();
					 $("#msg_exito").show();
					 $("#msg_loading").hide();
					
				})
				.fail(function() {
					console.log("error");
			 		$("#modal_guardando").modal("hide");
			 		$("#modal_error").modal("show");
				});
			}
		}



	
}
