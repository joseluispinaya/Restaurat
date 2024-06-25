
$(document).ready(function () {
    cargarReser();

    //$('#calendar').fullCalendar({
    //    header: {
    //        left: 'prev,next today',
    //        center: 'title',
    //        right: 'month, basicWeek, basicDay'
    //    },
    //    dayClick: function (date, jsEvent, view) {

    //        alert("Valor es: " + date.format());
    //        $("#modalrol").modal("show");
    //    },
    //    events: [
    //        {
    //            title: 'Reserva 1',
    //            descripcion: "Dessssssss",
    //            start: '2024-06-08'
    //        },
    //        {
    //            title: 'Long Event',
    //            descripcion: "Deeeeeeeeessss",
    //            start: '2024-06-12'
    //        },
    //        {
    //            id: 999,
    //            title: 'Repeating Event',
    //            descripcion: "Desssstrtrtrts",
    //            start: '2024-06-18',
    //            end: '2024-06-22'
    //        }
    //    ],
    //    eventClick: function (calEvent, jsEvent, view) {
    //        $("#txtNombresc").val(calEvent.title);
    //        $("#txtApellidosc").val(calEvent.descripcion);
    //        $("#modalrol").modal("show");
    //    }
    //});
})

let DetalleParaReserva = [];

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
                        //$("#txtNombreClienteat").val(calEvent.title);
                        //$("#txtDocumentoClienteat").val(calEvent.descripcion);
                        //$("#txtcelu").val(calEvent.id);
                        //$("#modalrol").modal("show");

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

                //DetalleParaReserva.forEach((item) => {

                //    $("#tbReservasaat tbody").append(
                //        $("<tr>").append(
                //            $("<td>").text(`${item.NombreProducto} ${item.Cantidad}`),
                //            $("<td>").text(item.PrecioUnidad),
                //            $("<td>").text(item.ImporteTotal)
                //        )
                //    )
                //})


                $("#modalrol").modal("show");
            } else {
                swal("Mensaje", data.d.valor, "success");
            }
        }
    });
}

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
