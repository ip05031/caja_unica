<?php 
//echo "hello";
session_start();
require_once "configs/crudpdo.php";
require_once "configs/config.php";
require_once "Modelo.php";
//echo "helloq";

if (isset($_POST['tipo'])) {

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
        ObtenerTodosGastos();
    }     
    if($_POST['tipo'] == '5') {
        GuardarBoleta();
    }    
    if($_POST['tipo'] == '6') {
        EditarGasto();
    }  
    if($_POST['tipo'] == '7') {
        NuevoGasto();
    } 
    if($_POST['tipo'] == '8') {
        EliminarGasto();
    }     
    if($_POST['tipo'] == '9') {
        MotoristasEquipo();
    }     
    if($_POST['tipo'] == '10') {
        Cargar_Solo_Motoristas();
    }     
    if($_POST['tipo'] == '11') {
        editar_equipo();
    }     
    if($_POST['tipo'] == '12') {
        EliminarEquipo();
    }      
    if($_POST['tipo'] == '13') {
        NuevoEquipo();
    }    
    if($_POST['tipo'] == '14') {
        NuevoMotorista();
    } 
    if($_POST['tipo'] == '15') {
        EliminarMotorista();
    }      
    if($_POST['tipo'] == '16') {
        editar_motorista();
    }          
}


function cargar_gastos(){
    //echo "cargando gastos";
    $modelo                 = new Modelo();
    $gasto_salarios         = [];
    $gasto_operativ         = [];
    $gasto_administ         = [];

    try{ 
      
        $gastos1           = $modelo->ObtenerGastosSalario();
        $gastos2           = $modelo->ObtenerGastosOperativos();
        $gastos3           = $modelo->ObtenerGastosAdmin();


 
        foreach ($gastos1 as $gasto) {
            $gasto_obj          = new stdClass();
            $gasto_obj->id      = $gasto["id_tipo_gasto"];
            $gasto_obj->nombre  = $gasto["nombre_gasto"];
            $gasto_obj->monto   = $gasto["monto_def"];
            $gasto_obj->monto2   = $gasto["monto_alt"];
            array_push($gasto_salarios, $gasto_obj);
        }          

        foreach ($gastos2 as $gasto) {
            $gasto_obj          = new stdClass();
            $gasto_obj->id      = $gasto["id_tipo_gasto"];
            $gasto_obj->nombre  = $gasto["nombre_gasto"];
            $gasto_obj->monto   = $gasto["monto_def"];
            $gasto_obj->monto2   = $gasto["monto_alt"];
            array_push($gasto_operativ, $gasto_obj);
        }          

        foreach ($gastos3 as $gasto) {
            $gasto_obj          = new stdClass();
            $gasto_obj->id      = $gasto["id_tipo_gasto"];
            $gasto_obj->nombre  = $gasto["nombre_gasto"];
            $gasto_obj->monto   = $gasto["monto_def"];
            $gasto_obj->monto2   = $gasto["monto_alt"];
            array_push($gasto_administ, $gasto_obj);
        }          

        $retorno            = new stdClass();
        $retorno->lista1     = $gasto_salarios;
        $retorno->lista2     = $gasto_operativ;
        $retorno->lista3     = $gasto_administ;
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
            $elemento->id_equipo               = $motorista["id_equipo"];
            $elemento->id_motorista     = $motorista["id_motorista"];
            $elemento->placa            = $motorista["placa_equipo"];
            $elemento->nombre           = $motorista["nombre_motorista"];
            $elemento->numero_equipo           = $motorista["numero_equipo"];
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
      
        $fin         = $modelo->ObtenerInicioMotorista($id);

        //var_dump($motorista);

        $retorno                    = new stdClass();
        $retorno->fin               = (intval($fin["fin"]));
        $retorno->estado            = "success";

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



function ObtenerTodosGastos(){
    //echo "cargando gastos";
    $modelo                 = new Modelo();
    $lista_gastos       = [];
    try{ 
      
        $gastos           = $modelo->ObtenerTodosGastos();

 
       foreach ($gastos as $gasto) {
            //var_dump($gasto);
            $elemento           = new stdClass();
            $elemento->id       = $gasto["id_tipo_gasto"];
            $elemento->nombre   = $gasto["nombre_gasto"];
            $elemento->m1       = $gasto["monto_def"];
            $elemento->m2       = $gasto["monto_alt"];
            array_push($lista_gastos, $elemento);
        }

        $retorno                        = new stdClass();
        $retorno->lista                 = $lista_gastos;
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


function GuardarBoleta(){
    //var_dump( $_POST ); 

    $modelo                 = new Modelo();
    $lista_gastos       = [];
    try{ 
      
        // insertar boleta 
        $boleta1 = json_decode($_POST["boleta"]);
        //var_dump($boleta1);
        $total_ingreso      = $boleta1->total_ingreso;
        $total_gasto        = $boleta1->total_gasto;
        $liquido_entregado  = $boleta1->liquido_entregado;
        $neto_empesario     = $boleta1->neto_empesario;
        $id_equipo          = $boleta1->id_equipo;
        $id_motorista       = $boleta1->id_motorista;
        $comentario         = $boleta1->comentario;
        $sueldo             = $boleta1->sueldo;
        //var_dump($boleta1->fecha0);

        $fecha0             = explode("/", $boleta1->fecha);
        $fecha1             = $fecha0[2]."/".$fecha0[1]."/".$fecha0[0];

        
        $id_boleta          = $modelo->NuevaBoleta($total_ingreso ,$total_gasto ,$liquido_entregado ,$neto_empesario , $fecha1 ,$id_equipo  ,$id_motorista ,$comentario , $sueldo );
        //var_dump($id_boleta);
        //$id_boleta = 4;
        //var_dump($id_boleta);
        
        $gastos_salarios = json_decode($_POST["n_salario"]);
        $nuevos_salarios = json_decode($_POST["salario"]);        

        $gastos_opera = json_decode($_POST["n_opera"]);
        $nuevos_opera = json_decode($_POST["opera"]);        

        $gastos_admin = json_decode($_POST["n_admin"]);
        $nuevos_admin = json_decode($_POST["admin"]);
        //var_dump("---------------------------------------------------------------------------");
        
        $ingreso      = json_decode($_POST["ing"]);
        $id_ingreso   = $modelo->NuevoIngreso($ingreso->inicio,$ingreso->fin,$ingreso->vueltas,$ingreso->viajes);
        $id_detalle   = $modelo->NuevoDetalleBoleta($id_boleta, $id_ingreso, 1);

        //var_dump("---------------------------------------------------------------------------");

        foreach ($gastos_salarios as $gasto1 ) {
            if( $gasto1->valor > 0 ){
                $id_movimiento = $modelo->NuevoGasto( $gasto1->id ,$gasto1->valor);
                $id_detalle = $modelo->NuevoDetalleBoleta($id_boleta, $id_movimiento, 2);
            }
        }
        //var_dump("---------------------------------------------------------------------------");

        foreach ($nuevos_salarios as $gasto1 ) {
            if( $gasto1->valor > 0 ){
                $id_tipo = $modelo->NuevoTipoGasto($gasto1->nombre,'Gasto_Salario','0','0');
                $id_movimiento  = $modelo->NuevoGasto( $id_tipo ,$gasto1->valor);
                $id_detalle     = $modelo->NuevoDetalleBoleta($id_boleta, $id_movimiento, 2);
            }

        }
        //var_dump("---------------------------------------------------------------------------");

        foreach ($gastos_opera as $gasto1 ) {
            if( $gasto1->valor > 0 ){
                $id_movimiento = $modelo->NuevoGasto( $gasto1->id ,$gasto1->valor);
                $id_detalle = $modelo->NuevoDetalleBoleta($id_boleta, $id_movimiento, 2);
            }
        }
        //var_dump("---------------------------------------------------------------------------");

        foreach ($nuevos_opera as $gasto1 ) {
            if( $gasto1->valor > 0 ){
                $id_tipo = $modelo->NuevoTipoGasto($gasto1->nombre,'Gasto_Operativo','0','0');
                $id_movimiento  = $modelo->NuevoGasto( $id_tipo ,$gasto1->valor);
                $id_detalle     = $modelo->NuevoDetalleBoleta($id_boleta, $id_movimiento, 2);
            }

        }
        //var_dump("---------------------------------------------------------------------------");

        foreach ($gastos_admin as $gasto1 ) {
            if( $gasto1->valor > 0 ){
                $id_movimiento = $modelo->NuevoGasto( $gasto1->id ,$gasto1->valor);
                $id_detalle = $modelo->NuevoDetalleBoleta($id_boleta, $id_movimiento, 2);
            }
        }
        //var_dump("---------------------------------------------------------------------------");

        foreach ($nuevos_admin as $gasto1 ) {
            if( $gasto1->valor > 0 ){
                $id_tipo = $modelo->NuevoTipoGasto($gasto1->nombre,'Gasto_Admin','0','0');
                $id_movimiento  = $modelo->NuevoGasto( $id_tipo ,$gasto1->valor);
                $id_detalle     = $modelo->NuevoDetalleBoleta($id_boleta, $id_movimiento, 2);
            }

        }
        //var_dump("---------------------------------------------------------------------------");

        $retorno                        = new stdClass();
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

function EditarGasto(){
    //var_dump($_POST);
    $modelo                 = new Modelo();
    $lista_motoristas       = [];
    $gasto                  = $_POST["gasto"];
    try{ 
      
        //var_dump($gasto);         
        $respuesta          = $modelo->ActualizarGasto($gasto["id"] , $gasto["nombre"], $gasto["monto1"] , $gasto["monto2"]);
        //var_dump($respuesta);
        $retorno                    = new stdClass();
        $retorno->estado            = "success";

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

function NuevoGasto(){
    //var_dump($_POST);
    $modelo                 = new Modelo();
    $lista_motoristas       = [];
    $gasto                  = $_POST["gasto"];

    switch ($gasto["tipo"]) {
        case 1:     $tp_gasto = 'Gasto_Salario';
                    break;        

        case 2:     $tp_gasto = 'Gasto_Operativo';
                    break;        

        case 3:     $tp_gasto = 'Gasto_Admin';
                    break;   
    }


    try{ 
      
        //var_dump($gasto);         
        $respuesta          = $modelo-> NuevoTipoGasto( $gasto["nombre"], $tp_gasto , $gasto["monto1"] , $gasto["monto2"]);
        //var_dump($respuesta);
        $retorno                = new stdClass();
        $retorno->id            = $respuesta;
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


function EliminarGasto(){
    //var_dump($_POST);
    $modelo                 = new Modelo();
    $id                  = $_POST["id"];
        try{ 
      
        //var_dump($gasto);         
        $respuesta          = $modelo-> EliminarTipoGasto( $id );
        $retorno                = new stdClass();
        $retorno->id            = $respuesta;
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

function MotoristasEquipo(){
    //var_dump($_POST);
    $lista_equipos         = [];
    $modelo                 = new Modelo();
        try{ 
      
        //var_dump($gasto);         
        $equipos          = $modelo->ObtenerTodosEquipoMotoristas(  );
        foreach ($equipos as $equipo) {
            $obj                = new stdClass();
            $obj->id_equipo     = $equipo["id_equipo"];
            $obj->placa         = $equipo["placa_equipo"];
            $obj->numero        = $equipo["numero_equipo"];
            $obj->id_motorista  = $equipo["id_motorista"];
            $obj->nombre        = $equipo["nombre_motorista"];
            array_push($lista_equipos, $obj);
        }  



        $retorno                = new stdClass();
        $retorno->lista         = $lista_equipos;
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


function Cargar_Solo_Motoristas(){
    //var_dump($_POST);
    $lista_equipos         = [];
    $modelo                 = new Modelo();
        try{ 
      
        //var_dump($gasto);         
        $equipos          = $modelo->ObtenerSoloMotoristas(  );
        foreach ($equipos as $equipo) {
            $obj                = new stdClass();
            $obj->id_motorista  = $equipo["id_motorista"];
            $obj->nombre        = $equipo["nombre_motorista"];
            array_push($lista_equipos, $obj);
        }  



        $retorno                = new stdClass();
        $retorno->lista         = $lista_equipos;
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


function editar_equipo(){
    //var_dump($_POST);
    $modelo                 = new Modelo();
    $lista_motoristas       = [];
    $equipo                  = $_POST["equipo"];
    try{ 
      
        //var_dump($equipo);         
        $respuesta          = $modelo->ActualizarEquipo($equipo["id"] , $equipo["placa"], $equipo["numero"] , $equipo["motorista"]);
        //var_dump($respuesta);
        $retorno                    = new stdClass();
        $retorno->estado            = "success";

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


function EliminarEquipo(){
    //var_dump($_POST);
    $modelo                 = new Modelo();
    $id                  = $_POST["id"];
        try{ 
      
        var_dump($id);         
        $respuesta          = $modelo->EliminarEquipo( $id );
        $retorno                = new stdClass();
        $retorno->id            = $respuesta;
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


function NuevoEquipo(){
    $modelo                 = new Modelo();
    $equipo                  = $_POST["equipo"];
        try{ 
      
        var_dump($equipo);         
        $respuesta          = $modelo->NuevoEquipo($equipo["placa"],$equipo["numero"],$equipo["motorista"]);
        $retorno                = new stdClass();
        $retorno->id            = "";
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

function NuevoMotorista(){
    $modelo                 = new Modelo();
    $motorista                  = $_POST["motorista"];
        try{ 
      
        //var_dump($motorista);         
        $respuesta          = $modelo->NuevoMotorista( $motorista );
        $retorno                = new stdClass();
        $retorno->id            = $respuesta;
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

function EliminarMotorista(){
    //var_dump($_POST);
    $modelo                 = new Modelo();
    $id                  = $_POST["id"];
        try{ 
      
        //var_dump($id);         
        $respuesta          = $modelo->EliminarMotorista( $id );
        $retorno                = new stdClass();
        $retorno->id            = $respuesta;
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

function editar_motorista(){
    //var_dump($_POST);
    $modelo                 = new Modelo();
    $lista_motoristas       = [];
    $motorista                  = $_POST["motorista"];
    try{ 
      
        //var_dump($motorista);         
        $respuesta          = $modelo->ActualizarMotorista($motorista["id"] , $motorista["nombre"]);
        //var_dump($respuesta);
        $retorno                    = new stdClass();
        $retorno->estado            = "success";

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