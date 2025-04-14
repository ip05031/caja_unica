<?php 
	require_once "load/configs/crudpdo.php";
	require_once "load/configs/config.php";
	require_once "load/Modelo.php";
	header('Content-Type: text/html; charset=utf-8');
	date_default_timezone_set('America/El_Salvador');
	//var_dump($_GET);
	$trs  = "";
	$fechas 	= $_GET["rango"];
	//var_dump($fechas);	
	$dates 		= explode("-", $fechas);
	//var_dump($dates);

	$desde_hasta = "Desde  ". trim($dates[0]) ."  Hasta ". trim($dates[1]);



		$fecha01 = explode("/" , trim( $dates[0]) );
		$fecha02 = explode("/" , trim( $dates[1]) );

	

	$rango = " '" . $fecha01[2]. "/".$fecha01[1]."/".$fecha01[0]."' and  '" . $fecha02[2]. "/".$fecha02[1]."/".$fecha02[0]."';";

	//var_dump($rango);


	$modelo 	= new Modelo();
	$registros 	= $modelo->ObtenerReporteSemanal($rango);
	$detalles 	= $modelo->ObtenerReporteSemanalDetalle($rango);
	$ac3 = 0;
	$ac4 = 0;
	$ac5 = 0;
	$ac6 = 0;
	$ac7 = 0;
	$ac8 = 0;
	$ac9 = 0;
	$ac10 = 0;
	$ac11 = 0;
	$ac12 = 0;
	$ac13 = 0;
	$pasa = 0;
	//var_dump($detalles);

	$str 		= "" ;
	//var_dump($registros);


	

	foreach ($detalles as $fila) {
		//var_dump($fila);
		$trs .= '<tr style="text-align:center;">
					<td style="border-right: 1px solid #000;border-left:1px solid #000;padding:4px;">'.$fila["equipo"]			.'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.   $fila["placa"]			.'</td>';
		$date = new DateTime($fila["fecha"]);
		$trs .=    '<td style="border-right: 1px solid #000;padding:4px;">'.   $date->format('d/m/Y')			.'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.   $fila["viajes"]			.'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["ingreso"]  			  , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["entrega"]			  , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["gastos"]			      , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["sueldos"]			  , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["ahorro_motorista"]     , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["mtto_ruta"]		      , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["mtto_ruta1"]		      , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["admon_ruta"]		      , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["admon_extra"]		  , 2, '.', '') .'</td>
					<td style="border-right: 1px solid #000;padding:4px;">'.    number_format(  $fila["liquido_entregado"]    , 2, '.', '') .'</td>
				</tr>';

				$ac3 += floatval ($fila["viajes"]);
				$ac4 += floatval ($fila["ingreso"]);
				$ac5 += floatval ($fila["entrega"]);
				$ac6 += floatval ($fila["gastos"]);
				$ac7 += floatval ($fila["sueldos"]);
				$ac8 += floatval ($fila["ahorro_motorista"]);
				$ac9 += floatval ($fila["mtto_ruta"]);
				$ac10 += floatval($fila["mtto_ruta1"]);
				$ac11 += floatval($fila["admon_ruta"]);
				$ac12 += floatval($fila["admon_extra"]);
				$ac13 += floatval($fila["liquido_entregado"]);
				$pasa += intval($fila["vueltas"]);
	}
			$trs .= '<tr style="text-align:center;">
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;" colspan="3"> Totales </td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.     $ac3  .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac4  , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac5  , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac6  , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac7  , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac8  , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac9  , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac10 , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac11 , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac12 , 2, '.', '')   .'</td>
					<td style="border-top: 2px solid #dd4b39;padding:4px;margin-top:2px;">'.    number_format(  $ac13 , 2, '.', '')   .'</td>
				</tr>';

?>



 <!DOCTYPE html>
 <html lang="">
 <head>
 	<meta charset="utf-8">
 	<meta http-equiv="X-UA-Compatible" content="IE=edge">
 	<meta name="viewport" content="width=device-width, initial-scale=1">
 	<title>Boleta</title>
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
 </head>
 <!--body onload="window.print();"-->
 <body >
 	<div style="width:1200px !important; margin:0 auto;">
 		<div class="row">
 			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
 				<div class="table-responsive">
 					<table class="table-hover" style="margin:0 auto;">
 						<tbody>
 							<tr>
 								<td style="text-align:center;" colspan="4" >RUTA 44 CAJA UNICA</td>
 							</tr>
 							<tr>
 								<td style="text-align:center;" colspan="4">
 									<span style="float:left;"> </span> 
 									<span style="float:center;" > INGRESOS RECIBIDOS DE CAJA UNICA </span>
 									<span style="float:right;">  </span>
 								</td>
 							</tr>
 							<tr>
 								<td style="text-align:center;width: 20%;" > &nbsp;</td>
 								<td style="text-align:center;width: 20%;" colspan="2"> <?php echo $desde_hasta; ?> </td>
 								<td style="text-align:center;width: 20%;" > &nbsp;</td>
 							</tr>
 						</tbody>
 					</table>
 				</div>
 			</div>
 		</div>

 		<hr style="margin: 10 auto;border:1px solid blue;">

 		<div class="row" style="margin: 0 auto;">
 			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align: center;">


 				<div class="table-responsive" style="margin: 0 auto;">
 					<table class="table table-hover">
 						<thead>
 							<tr >
 								<th style="text-align:center;border: 1px solid #000;"> Equipo  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 10%""> Placa  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 15%"> fecha  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Viajes  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Ingreso  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Entrega  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Gastos  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Sueldos  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Ahorro <br> motorista  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Mtto <br> Ruta  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Castigo  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Admon  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Ahorro  </th>
 								<th style="text-align:center;border: 1px solid #000;width: 7%"> Liquido  </th>
 							</tr>                    
 						</thead> 						
 						<tbody>
 							<?php echo $trs; ?>
 						</tbody>
 					</table>
 				</div>

			<hr style="margin: 25 auto;border:1px solid blue;">

 				<div class="table-responsive" style="margin: 0 auto;">
 					<table class="table table-hover">
 						<tbody>
 							<tr>
 								<td>Viajes</td>
 								<td style="text-align: center;"> <?php echo $registros["viajes"]; ?>  </td> 
 								<td>Ingreso Bruto</td>
 								<td style="text-align: center;"> <?php echo number_format($registros["ingreso"], 2, '.', ''); ?> </td>								
  							<tr>
 							</tr>
 								<td>Diesel</td>
 								<td style="text-align: center;"> <?php echo number_format($registros["diesel"], 2, '.', ''); ?> </td>								
 								<td>Gastos</td>
 								<td style="text-align: center;"> <?php echo number_format($registros["gastos"], 2, '.', ''); ?> </td>								
 							<tr>
 							</tr> 								
 								<td>Admon</td>
 								<td style="text-align: center;"> <?php echo number_format($registros["admon_ruta"], 2, '.', ''); ?> </td>								
 								<td>Ahorro</td>
 								<td style="text-align: center;"> <?php echo number_format($registros["admon_extra"], 2, '.', ''); ?> </td>								
 							<tr>
 							</tr> 								
 								<td>Sueldo</td>
 								<td style="text-align: center;"> <?php echo number_format($registros["sueldos"], 2, '.', ''); ?> </td>								
 								<td>Mtto Ruta</td>
 								<td style="text-align: center;"> <?php echo number_format($registros["mtto_ruta"], 2, '.', ''); ?> </td>								
 							<tr>
 							</tr> 								
 								<td>Entrega</td>
 								<td style="text-align: center;"> <?php echo number_format($registros["entrega"], 2, '.', ''); ?> </td>								
 								<td>Vueltas</td>
 								<td style="text-align: center;"> <?php echo $registros["vueltas"]; ?> </td>								
 							</tr>
 						</tbody>
 					</table>
 				</div>
 			</div>
 		</div>
 		<hr style="margin: 10 auto;border:1px solid blue;">
 
 			</div>
 </body>
 </html>


