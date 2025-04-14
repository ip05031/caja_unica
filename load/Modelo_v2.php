<?php 


     class Modelo 
    {
        
        function __construct()
        {
            # code...
        }

        function ObtenerSoloMotoristas(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from motorista";
            //echo $sql;
            $motoristas = $database->getRows($sql);
            return $motoristas;
        }          
        
        function ObtenerTodosEquipoMotoristas(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from equipo inner join motorista on equipo.id_motorista = motorista.id_motorista order by id_equipo";
            //echo $sql;
            $fin = $database->getRows($sql);
            return $fin;
        }          

        function ObtenerTodosGastos(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from tipo_gasto where tipo_gasto != 'Gasto_General'";
            //echo $sql;
            $fin = $database->getRows($sql);
            return $fin;
        }  


        function ObtenerInicioMotorista($id){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select boleta.id_boleta , ingreso.fin from boleta inner join detalle_boleta on boleta.id_boleta = detalle_boleta.id_boleta 
            inner join ingreso on detalle_boleta.id_movimiento = ingreso.id_ingreso 
            where detalle_boleta.tipo_movimiento = 1  and boleta.id_equipo = $id
            order by boleta.id_boleta desc limit 1";
            //echo $sql;
            $fin = $database->getRow($sql);
            return $fin;
        }      

        function ObtenerMotoristas(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from motorista inner join equipo on equipo.id_motorista = motorista.id_motorista";
            //echo $sql;
            $gastos = $database->getRows($sql);
            return $gastos;
        }   
        
        function ObtenerGastosSalario(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from tipo_gasto where tipo_gasto = 'Gasto_Salario'";
            //echo $sql;
            $gastos = $database->getRows($sql);
            return $gastos;
        } 

        function ObtenerGastosOperativos(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from tipo_gasto where tipo_gasto = 'Gasto_Operativo'";
            //echo $sql;
            $gastos = $database->getRows($sql);
            return $gastos;
        }  
        
        function ObtenerGastosAdmin(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from tipo_gasto where tipo_gasto = 'Gasto_Admin'";
            //echo $sql;
            $gastos = $database->getRows($sql);
            return $gastos;
        }  
        
        function ObtenerGastosGenerales(){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select * from tipo_gasto where tipo_gasto = 'Gasto_General'";
            //echo $sql;
            $gastos = $database->getRows($sql);
            return $gastos;
        }         

        function ObtenerReporteDiarioDetalle($fecha){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select 
                        ( select equipo.numero_equipo from equipo where equipo.id_equipo = boleta.id_equipo ) as equipo  , 
                        ( select equipo.placa_equipo from equipo where equipo.id_equipo = boleta.id_equipo ) as placa  , 
                        (  select ingreso.viajes from detalle_boleta inner join ingreso on detalle_boleta.id_movimiento = ingreso.id_ingreso where detalle_boleta.id_boleta = boleta.id_boleta ) as viajes ,  
                        (  select ingreso.vueltas from detalle_boleta inner join ingreso on detalle_boleta.id_movimiento = ingreso.id_ingreso where detalle_boleta.id_boleta = boleta.id_boleta ) as vueltas ,  
                        boleta.total_ingreso as ingreso ,
                        boleta.neto_empesario as entrega ,
                        boleta.total_gasto as gastos ,
                        boleta.sueldo as sueldos , 
                        IFNULL ( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 13 ) , 0 )as ahorro_motorista  ,
                        IFNULL ( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 1 ) , 0 ) as mtto_ruta  ,
                        IFNULL ( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 2 ) , 0 ) as mtto_ruta1  ,
                        IFNULL ( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 4 ) , 0 ) as admon_ruta  ,
                        IFNULL ( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 5 ) , 0 ) as admon_extra  ,
                        boleta.liquido_entregado 
                    FROM boleta
                    where boleta.fecha_boleta = '$fecha'";
            //echo $sql;
            $registros = $database->getRows($sql);
            return $registros;
        } 
        

        function ObtenerReporteSemanal($rango){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select 
                        SUM( (  select ingreso.viajes from detalle_boleta inner join ingreso on detalle_boleta.id_movimiento = ingreso.id_ingreso where detalle_boleta.id_boleta = boleta.id_boleta ) ) as viajes ,  
                        SUM( boleta.total_ingreso ) as ingreso ,
                        SUM( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 3 )  )  as diesel,
                        SUM( boleta.total_gasto ) as gastos ,
                        SUM( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 4 )  )  as admon_ruta  ,
                        SUM( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 5 )  )  as admon_extra  ,
                        SUM( boleta.sueldo ) as sueldos , 
                        SUM( (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 1 )  ) as mtto_ruta  ,
                        SUM( boleta.neto_empesario ) as entrega ,
                        SUM( (  select ingreso.vueltas from detalle_boleta inner join ingreso on detalle_boleta.id_movimiento = ingreso.id_ingreso where detalle_boleta.id_boleta = boleta.id_boleta ) ) as vueltas ,  
                        SUM( boleta.liquido_entregado ) as liquido 
                        FROM boleta 
                    where boleta.fecha_boleta between $rango";
            //echo $sql;
            $registros = $database->getRow($sql);
            return $registros;
        } 

        function ObtenerReporteSemanalDetalle($rango){
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $sql = "select
                        ( select equipo.numero_equipo from equipo where equipo.id_equipo = boleta.id_equipo ) as equipo  , 
                        ( select equipo.placa_equipo from equipo where equipo.id_equipo = boleta.id_equipo ) as placa  , 
                        boleta.fecha_boleta as fecha ,  
                        (  select ingreso.viajes from detalle_boleta inner join ingreso on detalle_boleta.id_movimiento = ingreso.id_ingreso where detalle_boleta.id_boleta = boleta.id_boleta ) as viajes ,  
                        (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 13 ) as ahorro_motorista  ,
                        boleta.total_ingreso  as ingreso ,
                        (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 3 )   as diesel,
                        boleta.total_gasto  as gastos ,
                        (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 4 )    as admon_ruta  ,
                        (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 5 )    as admon_extra  ,
                        boleta.sueldo as sueldos , 
                        (  select gasto.monto_gasto from detalle_boleta inner join gasto on detalle_boleta.id_movimiento = gasto.id_gasto where detalle_boleta.id_boleta = boleta.id_boleta  and gasto.id_tipo_gasto = 1 )   as mtto_ruta  ,
                        boleta.neto_empesario as entrega ,
                        (  select ingreso.vueltas from detalle_boleta inner join ingreso on detalle_boleta.id_movimiento = ingreso.id_ingreso where detalle_boleta.id_boleta = boleta.id_boleta ) as vueltas ,  
                         boleta.liquido_entregado as liquido_entregado  
                        FROM boleta 
                        where boleta.fecha_boleta between $rango";
            //echo $sql;
            $registros = $database->getRows($sql);
            return $registros;
        } 



        function NuevoTipoGasto($nombre_gasto,$tipo_gasto,$monto_def,$monto_alt){

            $sql="insert into tipo_gasto values ( null ,'$nombre_gasto','$tipo_gasto','$monto_def','$monto_alt')";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "nombre_gasto"      =>$nombre_gasto,
                "tipo_gasto"        =>$tipo_gasto,
                "monto_def"         =>$monto_def,
                "monto_alt"         =>$monto_alt,
            );
            return $database->insertRowid($sql, $params);      
        }

        function NuevoGasto($tipo_gasto,$monto_gasto){

            $sql="insert into gasto values ( null , '$tipo_gasto' , '$monto_gasto' )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "tipo_gasto"        =>$tipo_gasto,
                "monto_gasto"        =>$monto_gasto,
            );
            return $database->insertRowid($sql, $params);      
        }    
        
        function NuevoIngreso($inicio,$fin,$vueltas,$viajes){

            $sql="insert into ingreso values ( null , '$inicio','$fin','$vueltas','$viajes' )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "inicio"            =>$inicio,
                "fin"               =>$fin,
                "vueltas"           =>$vueltas,
                "viajes"            =>$viajes,
            );
            return $database->insertRowid($sql, $params);      
        }          

        function NuevoMotorista($nombre_motorista){

            $sql="insert into motorista values ( null , '$nombre_motorista' )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "nombre_motorista"  =>$nombre_motorista,
            );
            return $database->insertRowid($sql, $params);      
        } 

        function NuevoEquipo($placa_equipo,$numero_equipo,$id_motorista){

            $sql="insert into equipo values ( null ,'$placa_equipo','$numero_equipo','$id_motorista' )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "placa_equipo"      =>$placa_equipo,
                "numero_equipo"     =>$numero_equipo,
                "id_motorista"      =>$id_motorista,
            );
            return $database->insertRowid($sql, $params);      
        } 

        function NuevoDetalleBoleta($id_boleta , $id_movimiento, $tipo_movimiento){

            $sql="insert into detalle_boleta values ( null , '$id_boleta' , '$id_movimiento' , '$tipo_movimiento' )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "id_movimiento"     =>$id_movimiento,
                "tipo_movimiento"   =>$tipo_movimiento,
            );
            return $database->insertRowid($sql, $params);      
        }            

        function NuevaBoleta($total_ingreso ,$total_gasto ,$liquido_entregado ,$neto_empesario,$id_equipo  ,$id_motorista ,$comentario ,$sueldo ){

            $sql="insert into boleta values ( NULL , '$total_ingreso' ,'$total_gasto' ,'$liquido_entregado' ,'$neto_empesario' , CURDATE() ,'$id_equipo'  ,'$id_motorista' ,'$comentario' , '$sueldo'  )";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "total_ingreso"     =>$total_ingreso,
                "total_gasto"       =>$total_gasto,
                "liquido_entregado" =>$liquido_entregado,
                "neto_empesario"    =>$neto_empesario,
                "id_equipo"         =>$id_equipo,
                "id_motorista"      =>$id_motorista,
                "comentario"        =>$comentario,
                "sueldo"            =>$sueldo,
            );
            return $database->insertRowid($sql, $params);      
        }               




        function ActualizarGasto($id_gasto , $nombre_gasto, $monto1 , $monto2) {

            $sql="update tipo_gasto set nombre_gasto = '$nombre_gasto' , monto_def = '$monto1' , monto_alt = '$monto2' where id_tipo_gasto = '$id_gasto'";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "nombre_gasto"      =>$nombre_gasto,
                "monto1"            =>$monto1,
                "monto2"            =>$monto2,
                "id_gasto"          =>$id_gasto,
            );
            return $database->updateRow($sql, $params);      
        }           

        function ActualizarEquipo($id_equipo , $placa_equipo , $numero_equipo, $id_motorista ) {

            $sql="update equipo set placa_equipo = '$placa_equipo' , numero_equipo = '$numero_equipo' , id_motorista = '$id_motorista' where id_equipo = '$id_equipo'";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "placa_equipo"      =>$placa_equipo,
                "numero_equipo"     =>$numero_equipo,
                "id_motorista"      =>$id_motorista,
            );
            return $database->updateRow($sql, $params);      
        }            

        function EliminarTipoGasto($id_gasto) {

            $sql="delete from tipo_gasto where id_tipo_gasto = '$id_gasto'";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "id_gasto"          =>$id_gasto,
            );
            return $database->deleteRow($sql, $params);      
        }          

        function EliminarEquipo($id_equipo) {

            $sql="delete from equipo where id_equipo = '$id_equipo'";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "id_equipo"          =>$id_equipo,
            );
            return $database->deleteRow($sql, $params);      
        }    
        function EliminarMotorista($id_motorista) {

            $sql="delete from motorista where id_motorista = '$id_motorista'";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "id_motorista"          =>$id_motorista,
            );
            return $database->deleteRow($sql, $params);      
        }            

   
        function ActualizarMotorista($id_motorista , $nombre_motorista ) {

            $sql="update motorista set  nombre_motorista = '$nombre_motorista'  where id_motorista = '$id_motorista'";
            $database = new dbPDO(DB_USER, DB_PASS, DB_HOST, DB_NAME, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            //var_dump($sql);
            $params = array(
                "nombre_motorista"      =>$nombre_motorista,
                "id_motorista"            =>$id_motorista,
            );
            return $database->updateRow($sql, $params);      
        }           





    }

 ?>
