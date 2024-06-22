
//$(document).ready(function () {
//    verificarSesion();
//});

$('#btnIniciarSesiC').on('click', function () {

    if ($("#txtuser").val().trim() == "") {
        swal("Mensaje", "Ingrese un Usuario", "warning");
        return;
    }
    loginUsuarioLoad();
})

function loginUsuarioLoad() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/IniciarCli",
        data: JSON.stringify({ Usuario: $("#txtuser").val(), Clave: $("#txtpassword").val() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#cargaa").LoadingOverlay("show");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#cargaa").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $("#cargaa").LoadingOverlay("hide");
            if (response.d.estado) {
                // Convertir el objeto a una cadena JSON y guardarlo en sessionStorage
                sessionStorage.setItem('usuario', JSON.stringify(response.d.objeto));
                //verificarSesion();
                // Redirigir al usuario
                window.location.href = 'Home.aspx';
            } else {
                swal("oops!", "No se encontro el usuario", "warning")
            }
        }
    });
}