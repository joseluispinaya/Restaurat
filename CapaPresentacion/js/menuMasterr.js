

$(document).ready(function () {
    oBtenerDetalleUsuarioR();
});

$(document).on('click', '#close', function (e) {
    e.preventDefault();
    CerrarSesion();
    //swal("Mensaje", "Se Cerro la Session", "success")
});


function oBtenerDetalleUsuarioR() {

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ObtenerDetalleUsuario",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {

            if (response.d.Estado) {
                $("#nombreusuariome").append(response.d.Objeto.Apellidos);
                $("#rolnomme").text(response.d.Objeto.oRol.NomRol);
                $("#imgUsuarioMe").attr("src", response.d.Objeto.ImageFull);
                $("#imageUserMe").attr("src", response.d.Objeto.ImageFull);
                $("#rolusuariome").append(response.d.Objeto.oRol.NomRol);
                //$("#rolusuario").html("<i class='fa fa-circle text-success'></i> " + response.d.objeto.oRol.Descripcion);
            } else {
                window.location.href = 'IniciarSesion.aspx';
            }

        }
    });
}

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
            if (response.d.estado) {
                window.location.href = 'ClienteH/Home.aspx';
                //window.location.href = 'IniciarSesion.aspx';
            }
        }
    });
}