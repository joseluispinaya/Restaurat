
$(document).ready(function () {
    cargarReser();

})

let DetalleParaReserva = [];
let estadoRese = false;

function cargarReser() {

    $.ajax({
        type: "POST",
        url: "frmReservas.aspx/Obtener",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                var events = [];

                //console.log(data.d.objeto);
                $.each(data.d.objeto, function (i, row) {
                    events.push({
                        id: row.IdReserva,
                        title: 'Reserva ' + row.IdReserva + ' - ' + row.oCliente.Nombre,
                        start: row.FechaReserva,
                        descripcion: row.Comentario,
                        activo: row.Activo,
                        color: row.Color
                    });
                });

                $('#calendar').fullCalendar('destroy');
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month, basicWeek, basicDay'
                    },
                    /*navLinks: true,*/
                    /*selectable: true,*/
                    editable: true,
                    events: events,
                    eventClick: function (calEvent, jsEvent, view) {
                        //$("#txtDocumentoClienteat").val(calEvent.descripcion);
                        //$("#txtcelu").val(calEvent.id);
                        //$("#modalrol").modal("show");

                        $("#txtIdReserrr").val("0");
                        estadoRese = calEvent.activo;
                        //console.log(calEvent.activo);
                        detalleReserva(calEvent.id);
                    }
                    //eventRender: function (event, element) {
                    //    element.attr('title', event.descripcion);
                    //}
                });
            }

        }
    });
}

function detalleReserva($idRes) {


    var request = {
        IdReserva: $idRes
    };

    $.ajax({
        type: "POST",
        url: "frmReservas.aspx/DetalleReservaCale",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {

                $("#txtIdReserrr").val($idRes);

                $("#txtNombreClienteat").val(data.d.objeto.oCliente.Nombre);
                $("#txtDocumentoClienteat").val(data.d.objeto.oCliente.NumeroDocumento);
                $("#txtcelu").val(data.d.objeto.oCliente.Telefono);

                $("#tbReservasaat tbody").html("");

                DetalleParaReserva = data.d.objeto.oListaDetalleReserva;
                DetalleParaReserva.forEach((item) => {

                    $("#tbReservasaat tbody").append(
                        $("<tr>").append(
                            $("<td>").text(`${item.NombreProducto} ${item.Cantidad}`),
                            $("<td>").text(item.PrecioUnidad),
                            $("<td>").text(item.ImporteTotal)
                        )
                    );
                });

                $("#txtregistro").val(data.d.objeto.FechaRegistro);
                $("#txtFechaReseat").val(data.d.objeto.FechaReserva);
                $("#txtTotalat").val(data.d.objeto.TotalCosto);
                $("#txtcomentarioat").val(data.d.objeto.Comentario);

                //var idresevi = parseInt($("#txtIdReserrr").val());
                // Validar estadoRese y habilitar o deshabilitar el botón
                if (estadoRese) {
                    $("#btnGuardarCambiosat").show();
                    //$("#btnGuardarCambiosat").removeAttr("disabled");
                } else {
                    $("#btnGuardarCambiosat").hide();
                    //$("#btnGuardarCambiosat").attr("disabled", "disabled");
                }

                $("#modalrol").modal("show");
            } else {
                swal("Mensaje", data.d.valor, "success");
            }
        }
    });
}


$('#btnGuardarCambiosat').on('click', function () {

    //var idresevi = parseInt($("#txtIdReserrr").val());
    var idreser = $("#txtIdReserrr").val();
    //var url = 'frmVentaReserva.aspx?id=' + encodeURIComponent(idreser);
    var url = 'frmVentaReserva.aspx?id=' + idreser;

    window.location.href = url;
})

function cargarCatego() {
    $("#cboCategor").html("");

    $.ajax({
        type: "POST",
        url: "frmProductos.aspx/ObtenerCatego",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                $("<option>").attr({ "value": 0 }).text("-- SELECCIONE CATEGORIA --").appendTo("#cboCategor");
                $.each(data.d.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<option>").attr({ "value": row.IdCategoria }).text(row.Descripcion).appendTo("#cboCategor");
                    }

                })
            }

        }
    });
}
