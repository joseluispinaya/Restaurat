
$(document).on('click', '#close', function (e) {
    e.preventDefault();
    CerrarSesion();
    //swal("Mensaje", "Se Cerro la Session", "success")
});

function CerrarSesion() {
    //console.log("registra",request);

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/CerrarSesion",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d == true) {
                window.location.href = 'IniciarSesion.aspx';
            }
        }
    });
}