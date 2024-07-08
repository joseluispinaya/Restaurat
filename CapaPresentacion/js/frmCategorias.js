

$(document).ready(function () {

    //cargarCatego();
    permisosNoti();
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

function permisosNoti() {
    if (!Push.Permission.GRANTED) {
        Push.Permission.request();
    }
}

function mostrarNotifiacion() {
    Push.create("Restaurante la J", {
        body: "Nueva Reserva Registrada",
        icon: "ImagenesPro/logoJ.jpg",
        timeout: 4000,
        onClick: function () {
            window.location = "Inicio.aspx";
            this.close();
        }
    });
}

$('#btnNuevoCate').on('click', function () {

    swal("Mensaje", "Error al registrar ingrese otro correo", "warning");
})

$('#btnVernoti').on('click', function () {

    mostrarNotifiacion();
    //swal("Mensaje", "Registro Exitoso credenciales enviado al correo Registrado", "success");
})