

$('#btnIniciarSesion').on('click', function () {

    //loginUsuario();
    if ($("#username").val().trim() == "") {
        swal("Mensaje", "Ingrese un Usuario", "warning");
        return;
    }
    loginUsuarioLoad();
})

$('#btnRecupe').on('click', function () {

    //VALIDACIONES DE CORREO
    if ($("#cooree").val().trim() == "") {
        swal("Mensaje", "Ingrese un Correo", "warning");
        return;
    }
    //enviaCco();
    //swal("Mensaje", "Se registro la compra", "success")
    swal("oops!", "Falta Implementar Recuperacion de Clave", "warning")
})

function loginUsuarioLoad() {

    $.ajax({
        type: "POST",
        url: "IniciarSesion.aspx/Iniciar",
        data: JSON.stringify({ Usuario: $("#username").val(), Clave: $("#password").val() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
            //console.log("Antes de enviar la solicitud");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d) {
                window.location.href = 'Inicio.aspx';
            } else {
                swal("oops!", "No se encontro el usuario", "warning")
            }
        }
    });
}

function enviaCco() {

    $.ajax({
        type: "POST",
        url: "IniciarSesion.aspx/EnviarCorreoDe",
        data: JSON.stringify({ correo: $("#cooree").val() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
            //console.log("Antes de enviar la solicitud");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.estado) {
                swal("Mensaje", "Se envio sms a correo", "success")
            } else {
                swal("oops!", "Ocurrio un error intente mas tarde", "warning")
            }
        }
    });
}