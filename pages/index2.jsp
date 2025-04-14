<%@page session="false" contentType="text/html" %>
<%@taglib uri="http://java.sun.com/portlet" prefix="portlet"%>
<%@ page pageEncoding="UTF-8" %>
<%@page import="javax.portlet.PortletSession"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.ba.plataforma.ebanca.beans.MantenimientoPushEbancaBeans,
				com.ba.plataforma.ebanca.comun.Servicios;"%>
<portlet:defineObjects/>
<script language="JavaScript1.2" src="<%= renderRequest.getContextPath()%>/scripts/jquery-1.11.3.min.js"></script>
<script language="JavaScript1.2" src="<%=renderRequest.getContextPath()%>/scripts/ui/jquery-ui.js"></script>
<script language="JavaScript1.2" src="<%=renderRequest.getContextPath()%>/scripts/helper.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="<%= renderRequest.getContextPath()%>/styles/calendar-color.css" title="win2k-cold-1" />
<link rel="stylesheet" href="<%=renderRequest.getContextPath()%>/styles/themes/baseStyle/jquery-ui.css" type="text/css" />

<script type="text/javascript" src="<%= renderRequest.getContextPath()%>/scripts/calendar.js"></script>
<script type="text/javascript" src="<%= renderRequest.getContextPath()%>/scripts/calendar-aux.js"></script>
<script type="text/javascript" src="<%= renderRequest.getContextPath()%>/scripts/calendar-lang.js"></script>
<script language="JavaScript1.2" src="<%= renderRequest.getContextPath()%>/scripts/helper.js"></script>
<script language="JavaScript1.2" src="<%= renderRequest.getContextPath()%>/scripts/mascara.js"></script>
<script language="JavaScript1.2" src="<%=renderRequest.getContextPath()%>/scripts/jquery.ui.datepicker-es.js"></script>

<script language="JavaScript1.2" src="<%=renderRequest.getContextPath()%>/scripts/datatable/js/jquery.dataTables.js"></script>
<link rel="stylesheet" href="<%=renderRequest.getContextPath()%>/scripts/datatable/css/jquery.dataTables.css" type="text/css" />
<script type="text/javascript">

$(document).ready(function () {
	$("#idtabla").DataTable({
			"scrollX" : true,
			"language":	{
				"sProcessing":     "Procesando...",
				"sLengthMenu":     "Mostrar _MENU_ registros",
				"sZeroRecords":    "No se encontraron resultados",
				"sEmptyTable":     "Ningún dato disponible en esta tabla",
				"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
				"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
				"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
				"sInfoPostFix":    "",
				"sSearch":         "Buscar:",
				"sUrl":            "",
				"sInfoThousands":  ",",
				"sLoadingRecords": "Cargando...",
				"oPaginate": {
					"sFirst":    "Primero",
					"sLast":     "Ultimo",
					"sNext":     "Siguiente",
					"sPrevious": "Anterior"
				},
				"oAria": {
					"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
					"sSortDescending": ": Activar para ordenar la columna de manera descendente"
				}
			}
		});



});
</script>
<style>
	.display, .dataTable, .no-footer, .dataTables_wrapper, .dataTables_scrollHeadInner{
		width: 100% !important; 
		position: static !important;
	}
	
	.dataTables_scrollHead{
		position: static !important;
	}
	
	.error{
		width: auto !important;
	}
	
	.boton a {display:block; width:100%; height:100%;}
</style>
<%
	List lstTransaccionEbanca = new ArrayList();
	lstTransaccionEbanca = Servicios.listarTransaccionesCheques();
	//List lstTransaccionEbanca								= (ArrayList)renderRequest.getPortletSession().getAttribute("LST_MENSAJES_EBANCA", PortletSession.APPLICATION_SCOPE);
	lstTransaccionEbanca 									= lstTransaccionEbanca != null ? lstTransaccionEbanca : new ArrayList();
	int sizeLstTransaccionEbanca							= lstTransaccionEbanca.size();
	lstTransaccionEbanca=lstTransaccionEbanca!=null?lstTransaccionEbanca:new ArrayList(); 									
%>


<form name="formAdmonNotiPush" method="post" action="<portlet:actionURL/>">
<input type="hidden" name="<%=com.bancoagricola.frmwrk.portlet.Controller.COMMAND%>" value="com.ba.plataforma.ebanca.command.MantenimientoPushEbanca" >
<input type="hidden" name="accion" id="accion" />
<input type="hidden" name="select" id="select" />
<h1 class="ui-widget ui-widget-header" align="center">AGREGAR TRANSACCIONES PUSH E-BANCA</h1>
<div   align="center">
		
		<table class="table table-hover" id="tlb_estados" style="display: none;">
			<tbody>
				<tr>
				<%
					for(int i=0; i<sizeLstTransaccionEbanca; i++){
						MantenimientoPushEbancaBeans transaccion = (MantenimientoPushEbancaBeans)lstTransaccionEbanca.get(i);		
				%>
					<td id="id_<%=transaccion.getId() %>">
						<span class="estado"><%=transaccion.getEstado() %></span>
					</td>
					<%
					}
				%>
				</tr>
		
			</tbody>
		</table>
	
		<table id="idtabla" class="display dataTable" align="center" >
		<thead>
			<tr style="font-weight: bold;" align="left">
				<td>LISTA DE TRANSACCIONES</td>
				<td></td>
			</tr>
		</thead>
		<tbody>	
		
			<%
				for(int i=0; i<sizeLstTransaccionEbanca; i++){
					MantenimientoPushEbancaBeans transaccion = (MantenimientoPushEbancaBeans)lstTransaccionEbanca.get(i);
				if(!(transaccion.getEstado().equalsIgnoreCase("1"))){
			%>
				<tr valign="top">
					<td style="font-weight: bold;" align="left">
						<%=transaccion.getNombreTransaccion()%>
					</td>
					<td style="font-weight: bold;" align="left">
						<input type="checkbox" id="btnTran" name="btnTran" value="" data-id="<%=transaccion.getId() %>" data-estado="<%=transaccion.getEstado() %>" onclick="onclickEjecutar(this);" <%= transaccion.getEstado().equalsIgnoreCase("0") ? "" : "checked" %>>
						
						
					</td>	
				</tr>
			<%
				}
				}
			%>	
			
<!--	<input type="checkbox" name="" value="" data-id="33" onclick="onclickEjecutar(this);">-->
<!--	<input type="checkbox" name="" value="" data-id="12" onclick="onclickEjecutar(this);" checked="checked">-->
	

		</tbody>
	</table>
	
			<table class="table table-hover" id="sobreAcciones" style="display: none">
			<tbody>
				<tr>
				</tr>
			</tbody>
		</table>

<input type="hidden" name="toodo" value="" placeholder="" id="toodo">
<input type="button" name="" value="Guardar" onclick="enviarTodo(this.form);">
<input type="button" name="" value="Cancelar" onclick="cancelar();">
	
</div>		

</form>
<script type="text/javascript">
	function onclickEjecutar(checkbox){
  			console.log(checkbox);
  			console.log($(checkbox));



  			var id = $(checkbox).data("id");
  			var estado = $(checkbox).data("estado");
  			
  			console.log(id);

  			if ( $(checkbox).prop("checked") ){
  				tipo = 1;
  				console.log(id);
  				console.log(tipo);
  				actualizarTabla2(id,tipo,estado);
  			}
  			else{
  				tipo = 2;
  				console.log(id);
  				console.log(tipo);
  				actualizarTabla2(id,tipo,estado);
  			}
  		}

  		// cuando seleccionas 
  		function cambiarEstado ( id , tipo ) {
  			console.log(tipo);
  			console.log(id);
  			var selector = "#tlb_estados tr td#id_"+id;
  			console.log("selector"+selector);
  			var id = $(selector);
  			var estado = $(id).find(".estado");
  			switch (tipo) {
  				case 1:  	estado.html("1");
  							break;
  				case 2: 	estado.html("0");
  							break;
  			}
  			 actualizarTabla2(id,tipo,estado);
  		}


  		function cargarInput(){
  			var envio = "";
  			var filas =  $("#sobreAcciones tr td");
  			filas.each(function(index, el) {
  				 var id = $(el).attr("id");
  				 var idres=id.substring(3);
  				 var estado = $(el).html();

  				 if ( index == 0){
  				 	envio += "" + idres + "," + estado;
  				 }
  				 else{
  				 	
  				 	envio += "|" + idres + "," + estado;
  				 }
  			});

  			$("#toodo").val(envio);
  		}

  	

  		function enviarTodo(form){
  			cargarInput();
  			doSubmit('guardar');
  			form.submit();
  		}
		function doSubmit(accion){
			var obj = getobj("accion");
			obj.value = accion;
			document.formAdmonNotiPush.submit();

   		}
   		function cancelar(){
  			doSubmit('cancelar');
  		}
  		
  		
  		function actualizarTabla2(id,tipo,estado){
			var celda = "";
			var tr = $("#sobreAcciones tr");
			var td = $("#sobreAcciones tr td#id_"+id);

			if ( estado == 2 ){
				if( tipo == 1 ) {
					td.remove();
				}
				else{ 
					tr.append("<td id=\"id_"+id+"\" >3</td>");
				}
			} 
			else{ 
				if ( tipo == 1 ){
					tr.append("<td id=\"id_"+id+"\" >1</td>");
				}
				else{
					td.remove();
				}
			}	
		}

</script>
