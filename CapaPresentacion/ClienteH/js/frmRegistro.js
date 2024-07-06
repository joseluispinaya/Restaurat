

$('#btnGuardarR').on('click', function () {

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    //$("#loadd").LoadingOverlay("show");
    
    var request = {
        oCliente: {
            NumeroDocumento: $("#txtnumerodoc").val(),
            Nombre: $("#txtnombre").val(),
            Direccion: $("#txtDireccion").val(),
            Telefono: $("#txtCelular").val(),
            Clave: $("#txtClave").val(),
            IdRol: 2
        }
    };

    $.ajax({
        type: "POST",
        url: "frmRegistro.aspx/Guardar",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadd").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadd").LoadingOverlay("hide");
            if (response.d.Estado) {

                $("#txtnumerodoc").val("");
                $("#txtnombre").val("");
                $("#txtDireccion").val("");
                $("#txtCelular").val("");
                $("#txtClave").val("");

                //swal("Mensaje", response.d.Mensage, response.d.Valor);

                swal({
                    title: "Mensaje",
                    text: response.d.Mensage,
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(function () {
                    window.location.href = 'Login.aspx';
                }, 3000);

            } else {
                swal("Mensaje", response.d.Mensage, response.d.Valor);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadd").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });

    //console.log(request);
})