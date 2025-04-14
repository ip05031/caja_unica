<?php 
require_once "load/configs/crudpdo.php";
require_once "load/configs/config.php";
require_once "load/Modelo.php";
header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('America/El_Salvador');
$n = $_REQUEST["id"];
$fecha = date("d/m/Y");
$hora = date("g:i:s a");
$modelo                 = new Modelo();
 //$modelo->ObtenerGastos();

$boleta = $modelo->ObtenerBoleta($n);
//var_dump($boleta);
$maquina = $modelo->ObtenerMaquina($boleta["id_maquina"]);
//var_dump($maquina);
$gastos = $modelo->ObtenerGastosBoleta($n);
//var_dump($gastos);
$n_g = count($gastos);
//var_dump($n_g);
$str = "" ;

foreach ($gastos as $gasto) {
	$str .= '<tr>
		<td> '.$gasto["descripcion_gasto"].' </td>
		<td style="text-align:right;">
			<span id="txt_admin"> $ '. number_format($gasto["monto_gasto"], 2, '.', '') .' </span> 
		</td>
	</tr>';
}
	$str .= '<tr>
		<td> Sueldos </td>
		<td style="text-align:right;">
			<span id="txt_admin"> $ '. number_format($boleta["sueldo"], 2, '.', '') .' </span> 
		</td>
	</tr>';

	if ( $n_g < 5 ){
		//var_dump("ok");
		
		for ($i = 0; $i < (5 - $n_g  ); $i++) {
		//var_dump($i);

			$str .= '<tr>
				<td colspan="2"> &nbsp; </td>
				</tr>';
		 } 

	}
/*
$maquina = $modelo->ObtenerMaquina();
*/
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
<body onload="window.print();">
<div style="width:750px !important; margin:0 auto;">
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
								<span style="float:left;"> <?php echo $hora; ?> </span> 
								<span style="float:center;" > INGRESOS DIARIOS EN US DOLARES </span>
								<span style="float:right;"> <?php echo $fecha; ?> </span>
							</td>
						</tr>
						<tr>
							<td style="text-align:center;width: 20%;" >Autobus</td>
							<td style="text-align:center;width: 20%;" ><?php echo $maquina["placa_equipo"]; ?></td>
							<td style="text-align:center;width: 20%;" >Equipo</td>
							<td style="text-align:center;width: 20%;" ><?php echo $maquina["numero_equipo"]; ?></td>
						</tr>
						<tr>
							<td style="text-align:center;" >Propietario</td>
							<td style="text-align:center;" >1</td>
							<td style="text-align:center;" colspan="2"> MOVISAL S.A. de C.V.  </td>
						</tr>				
						<tr>
							<td style="text-align:center;" >Conductor</td>
							<td style="text-align:center;" ><?php echo $maquina["id_motorista"]; ?></td>
							<td style="text-align:center;" colspan="2"> <?php echo $maquina["nombre_motorista"]; ?>  </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<hr style="margin: 10 auto;border:1px solid blue;">
	<div class="row" style="margin: 0 auto;">
		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="border-right:1px solid #00a65a;">
			<h3 style="color:#3c8dbc;"> 
				Ingresos
			</h3>
				<table class="table-hover" style="width:100%;">
					<tbody>
						<tr>
							<td> Número Inicial</td>
							<td style="text-align:right;"> <span id="txt_inicio"> <?php echo $maquina["inicio"]; ?> </span> </td>
						</tr>                    
						<tr>
							<td> Número Final</td>
							<td style="text-align:right;"> <span id="txt_final" > <?php echo $maquina["fin"]; ?> </span> </td>
						</tr>                    
						<tr>
							<td> Vueltas </td>
							<td style="text-align:right;" > <span id="txt_vueltas" > <?php echo $maquina["vueltas"]; ?> </span> </td>
						</tr>
						<tr>
							<td> Viajes </td>
							<td style="text-align:right;" > <span id="txt_viajes" > <?php echo $boleta["viajes"]; ?> </span>  </td>
						</tr>                  
						<tr>
							<td> &nbsp; </td>
							<td> &nbsp; </td>
						</tr>
						<tr>
							<td> &nbsp; </td>
							<td> &nbsp; </td>
						</tr>
						<tr style="color:#3c8dbc;font-weight: bold;">
							<td> Ingreso </td>
							<td style="text-align:right;"> <span id="txt_ingreso" style="text-align:right;"> $ <?php echo number_format($boleta["total_ingreso"], 2, '.', '');  ?> </span> </td>
						</tr>
					</tbody>
				</table>
			<div class="pull-right">
				
			</div>
		</div>

		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="border-right:1px solid #00a65a;">
			<h3 style="color:#3c8dbc;"> 
				Gastos
			</h3>
				<table class="table-hover" style="width:100%;">
					<tbody>
                   		<?php echo $str; ?>
						
						<tr style="color:#3c8dbc;font-weight: bold;">
							<td > Suma de Gastos </td>
							<td style="text-align:right;"> $ <?php echo number_format($boleta["total_gasto"], 2, '.', '');  ?></td>
						</tr>

					</tbody>
				</table>
		</div>

		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
			<h3 style="color:#3c8dbc;"> 
				&nbsp;
			</h3>
				<table class="table-hover" style="width:100%;">
					<tbody>
						<tr>
							<td style="width:60%;"> Total Ingresos: </td>
							<td style="text-align:right;">
								<span id="txt_total_ingreso">$ <?php echo number_format($boleta["total_ingreso"], 2, '.', '');  ?> </span>
							</td>
						</tr>                    
						<tr>
							<td>Total Gastos:</td>
							<td style="text-align:right;">
								<span id="txt_total_gastos"> $ <?php echo number_format($boleta["total_gasto"], 2, '.', '');  ?> </span>
							</td>
						</tr>                    
						<tr>
							<td>Liquido Entregado:</td>
							<td style="text-align:right;">
								<span id="txt_liquido_entregado">$ <?php echo number_format($boleta["liquido_entregado"], 2, '.', '');  ?> </span>
							</td>
						</tr>                    
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>						
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>						
						<tr style="color:#00a65a;font-weight:bold;">
							<td>Neto Empresario:</td>
							<td style="text-align:right;"> $ <?php echo number_format($boleta["neto_empresario"], 2, '.', '');  ?> </td>
						</tr>
					</tbody>
				</table>
		</div>




	</div>

</div>


</body>
</html>