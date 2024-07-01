

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const IdVenta = urlParams.get('id')

    if (IdVenta !== null) {
        CargarDatos(IdVenta);
    } else {
        swal("Mensaje", "No hay parámetro recibido. El formulario se cerrará.", "warning");
        window.close();
    }
});

function CargarDatos($IdVenta) {

    $('#tbDetalles tbody').html('');

    var request = {
        IdVenta: $IdVenta
    };

    $.ajax({
        type: "POST",
        url: "frmVentaReserva.aspx/DetalleVenta",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.estado) {
                $("#tipodoc").text(response.d.objeto.TipoDocumento + " - " + response.d.objeto.Codigo);
                $("#lblnombre").text(response.d.objeto.oCliente.Nombre);


                $("#lblnroci").text(response.d.objeto.oCliente.NumeroDocumento);
                $("#lblcelu").text(response.d.objeto.oCliente.Telefono);
                $("#lbldire").text(response.d.objeto.oCliente.Direccion);

                $("#tbDetalles tbody").html("");

                $.each(response.d.objeto.oListaDetalleVenta, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(row.NombreProducto),
                        $("<td>").text(row.Cantidad),
                        $("<td>").text(row.PrecioUnidad),
                        $("<td>").text(row.ImporteTotal)

                    ).appendTo("#tbDetalles tbody");

                })
                $("#lblcanti").text(response.d.objeto.CantidadTotal);
                $("#lbltotall").text(response.d.objeto.TotalCosto);

                //$("#fpagado").text(response.d.objeto.TotalCosto + " /Bs.");
                var totalCosto = response.d.objeto.TotalCosto;
                if (!isNaN(totalCosto)) {
                    $("#fpagado").text(totalCosto.toFixed(2) + " /Bs.");
                } else {
                    $("#fpagado").text("0.00 /Bs."); // Manejo de errores en caso de NaN
                }

                $("#seleccion2").html($("#seleccion").html());
            }
        }
    });

}

function imprSelec(nombre) {
    var printContents = document.getElementById(nombre).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
function hide() {
    document.getElementById('Imprimir').style.visibility = "hidden";
}

window.addEventListener('beforeunload', function (e) {
    // Mensaje de confirmación
    var confirmationMessage = '¿Seguro que quieres salir?';
    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
    return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
});

window.addEventListener('unload', function (e) {
    // Redirigir a frmReservas.aspx cuando el popup se cierre
    setTimeout(function () {
        window.close();
    }, 3000);
});