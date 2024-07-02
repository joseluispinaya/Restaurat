

var table;

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const IdReser = urlParams.get('id')

    if (IdReser !== null) {
        CargarDatos(IdReser);
    } else {
        swal("Mensaje", "No hay parámetro recibido. El formulario.", "warning");
        window.location.href = 'frmMisReservas.aspx';
    }
});


function CargarDatos($IdReserva) {

    $('#tbmispedid tbody').html('');

    var request = {
        IdReserva: $IdReserva
    };

    $.ajax({
        type: "POST",
        url: "frmMisReservas.aspx/DetalleReserva",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.estado) {
                $("#txtIdReserrvd").val($IdReserva);
                // Mostrar u ocultar el botón de cancelar según el estado
                var est = response.d.objeto.Estado;
                if (est != "Confirmado") {
                    $("#btnCancelar").hide();
                } else {
                    $("#btnCancelar").show();
                }

                $("#lblnamecli").text(response.d.objeto.oCliente.Nombre);


                $("#lblnroci").text(response.d.objeto.oCliente.NumeroDocumento);
                $("#lblcelua").text(response.d.objeto.oCliente.Telefono);
                $("#lblubica").text(response.d.objeto.oCliente.Direccion);


                $("#lblestados").text(response.d.objeto.Estado);
                $("#lblcodre").text(response.d.objeto.Codigo);
                $("#lblfechres").text(response.d.objeto.FechaReserva);
                $("#lblcoment").text(response.d.objeto.Comentario);
                $("#lblcanti").text(response.d.objeto.CantidadTotal);

                var totalCosto = response.d.objeto.TotalCosto;
                if (!isNaN(totalCosto)) {
                    $("#lbltot").text(totalCosto.toFixed(2) + " /Bs.");
                } else {
                    $("#lbltot").text("0.00 /Bs."); // Manejo de errores en caso de NaN
                }


                $("#tbmispedid tbody").html("");

                $.each(response.d.objeto.oListaDetalleReserva, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.NombreProducto),
                        $("<td>").text(row.Cantidad),
                        $("<td>").text(row.PrecioUnidad),
                        $("<td>").text(row.ImporteTotal)

                    ).appendTo("#tbmispedid tbody");

                })
                
            }
        }
    });

}

$('#btnCancelar').on('click', function () {

    var request = { IdReserva: parseInt($("#txtIdReserrvd").val()) };

    var idrrrt = $("#txtIdReserrvd").val();
    swal({
        title: "Mensaje de Confirmacion",
        text: "¿Esta seguro de Cancelar la Reserva con ID: " + idrrrt + "?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (respuesta) {
            if (respuesta) {
                $(".showSweetAlert").LoadingOverlay("show");

                $.ajax({
                    type: "POST",
                    url: "frmDetallesR.aspx/CancelarReserva",
                    data: JSON.stringify(request),
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    error: function (xhr, ajaxOptions, thrownError) {
                        $(".showSweetAlert").LoadingOverlay("hide");
                        console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                    },
                    success: function (response) {
                        $(".showSweetAlert").LoadingOverlay("hide");
                        if (response.d.Estado) {
                            //swal("Mensaje", response.d.Mensage, response.d.Valor);
                            $("#txtIdReserrvd").val("0");
                            swal({
                                title: "Mensaje",
                                text: response.d.Mensage,
                                timer: 2000,
                                showConfirmButton: false
                            });

                            setTimeout(function () {
                                //$(".showSweetAlert").LoadingOverlay("hide");
                                window.location.href = 'frmMisReservas.aspx';
                                //swal("Listo!", "El usuario fue cancelada.", "success");
                            }, 2000);

                            
                        } else {
                            swal("Mensaje", response.d.Mensage, response.d.Valor);
                            //swal("oops!", "No se puede eliminar el usuario por relacion con otros Registros", "warning")
                        }
                    }
                });

                

            }
        }
    )
})