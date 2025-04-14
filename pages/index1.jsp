<%@page session="false" contentType="text/html" %>
<%@taglib uri="http://java.sun.com/portlet" prefix="portlet"%>
<%@ page pageEncoding="UTF-8" %>
<%@page import="javax.portlet.PortletSession"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.ba.plataforma.ebanca.beans.MantenimientoPushEbancaBeans"%>
<%@page import="com.ba.plataforma.ebanca.comun.Servicios"%>

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
			},
			"columns": [
			    { "width": "40%" },
			    { "width": "40%" },
			    { "width": "20%" },

			  ]
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
	.button {
		border:1px solid #c3c3;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
		height: 35px !important;
		width:50%;
	}
	
	.button-acceptar {
		color : #38702C;
		background-color: #9ED393;
	}
	
	.button-cancelar {
		color : #A21414;
		background-color: #D39393;
	}
	
	
</style>

<%

	List lstMensajesEbanca = new ArrayList();
	lstMensajesEbanca = new Servicios().listarTransaccionesCheques();	
	lstMensajesEbanca 									= lstMensajesEbanca != null ? lstMensajesEbanca : new ArrayList();	
	int sizeLstMensajeEbanca 							= lstMensajesEbanca.size(); 
	MantenimientoPushEbancaBeans mensajeEbancaSelect 	= (MantenimientoPushEbancaBeans)renderRequest.getPortletSession().getAttribute("MENSAJES_EBANCA_CONSULTA", PortletSession.APPLICATION_SCOPE);
	mensajeEbancaSelect									= mensajeEbancaSelect != null ? mensajeEbancaSelect : new MantenimientoPushEbancaBeans();
%>

<h1 class="ui-widget ui-widget-header" align="center">AGREGAR TRANSACCIONES PUSH E-BANCA</h1>
<div   align="center">

		<table id="idtabla" class="display dataTable" align="center" >
		<thead>
			<tr style="font-weight: bold;" align="left">
				<td>TRANSACCIONES PARA AUTORIZAR</td>
				<td>COMENTARIO</td>
				<td>ACCIÓN</td>
			</tr>
		</thead>
		<tbody>	
			<%
				for(int i = 0 ; i < sizeLstMensajeEbanca; i++ ){
					MantenimientoPushEbancaBeans transaccion = (MantenimientoPushEbancaBeans)lstMensajesEbanca.get(i);
					if( transaccion.getEstado().equalsIgnoreCase("1") ){

			%>
			
				
				
				

				
				<tr valign="top">
					<form name="autoNotiPush" method="post" action="<portlet:actionURL/>">
					<td style="font-weight: bold;" align="left">
							<input type="hidden" name="<%=com.bancoagricola.frmwrk.portlet.Controller.COMMAND%>" value="com.ba.plataforma.ebanca.command.MantenimientoPushEbanca" >
							<input type="hidden" name="accion" id="autorizarNotificacion" value="autorizarNotificacion"/>
							<span id="nombretransaccion"> <%=transaccion.getNombreTransaccion()%> </span>
							<span id="idTransaccion"> <input type="hidden" name="idTransaccion" value="<%=transaccion.getId()%>" /> </span>
							<span id="estadoTransaccion"> <input type="hidden" name="estadoTrans" value="<%=transaccion.getEstado() %>" /> </span>
					</td>

					<td colspan="" rowspan="" headers="" align="center">
						<span id="ComentarioTransaccion" > <textarea name="comentarioTrans" style="width:100%;"></textarea> </span>
					</td>
					<td colspan="" rowspan="" headers="" align="center">
						<span id="buttonSubmit" > 
						
							<input type="hidden" name="estadoNotificacion" value="" placeholder="" id="estadoNotificacion">
							<button type="button" class="btn btn-default button button-acceptar"  onclick="autorizar(1, this.form );" >AUTORIZAR</button>
							<button type="button" class="btn btn-default button button-cancelar"  onclick="autorizar(2, this.form );" >RECHAZAR</button>							

						</span>
					</td>
					</form>
					
				</tr>
			<%
					}
				}
			%>	
		</tbody>
	</table>					
</div>

<script type="text/javascript">

		function autorizar(tipo,formulario) {
			//alert(tipo);
			if( formulario.comentarioTrans.value == "" ){
				formulario.comentarioTrans.placeholder ="Ingrese un comentario";
				formulario.comentarioTrans.focus();
				$("#comentarioTrans").html("");
			}
			else{
				formulario.estadoNotificacion.value = tipo;
				formulario.submit();				
			}
		}

</script>




