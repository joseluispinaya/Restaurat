
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
                        start: row.FechaReserva,    // Ahora FechaReserva debería estar en formato ISO 8601
                        descripcion: row.Comentario  // Puedes agregar más campos si lo deseas
                    });
                });

                $('#calendar').fullCalendar('destroy'); // Destruye cualquier calendario existente
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month, basicWeek, basicDay'
                    },
                    events: events,
                    eventClick: function (calEvent, jsEvent, view) {
                        $("#txtNombresc").val(calEvent.title);
                        $("#txtApellidosc").val(calEvent.descripcion);
                        $("#modalrol").modal("show");
                    }
                    //eventRender: function (event, element) {
                    //    element.attr('title', event.descripcion);
                    //}
                });
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
