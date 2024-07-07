

$(document).ready(function () {

    cargarR();
})

function cargarR() {

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ObtenerReserCancelar",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                var res = "Se cancelo las reservas pasadas un total de: " + data.d.valor;
                swal("Notificacion", res, "success")
            } 

        }
    });
}