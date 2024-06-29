


function ObtenerFecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idreseee = urlParams.get('id');

    if (idreseee !== null) {
        obtenerDetallep(idreseee);
    } else {
        swal("Mensaje", "No hay parametro de busqueda por url.", "warning");
        window.location.href = 'frmReservas.aspx';
        //window.close();
    }
    $("#txtFechaRese").val(ObtenerFecha());
    cargarPro();

})
function cargarPro() {

    $("#cboBuscarProducto").select2({
        ajax: {
            url: "frmVentaReserva.aspx/BuscarPro",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ buscar: params.term });
            },
            processResults: function (data) {

                return {
                    results: data.d.objeto.map((item) => ({
                        id: item.IdProducto,
                        text: item.Nombre,
                        categoria: item.oCategoria.Descripcion,
                        ImageFulP: item.ImageFulP,
                        PrecioUnidadVenta: parseFloat(item.PrecioUnidadVenta)
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar Producto',
        minimumInputLength: 1,
        templateResult: formatoResultados
    });
}

function formatoResultados(data) {
    // Esto es por defecto, ya que muestra el "buscando..."
    if (data.loading)
        return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td style="width:60px">
                    <img style="height:60px;width:60px;margin-right:10px" src="${data.ImageFulP}"/>
                </td>
                <td>
                    <p style="font-weight: bolder;margin:2px">${data.categoria}</p>
                    <p style="margin:2px">${data.text}</p>
                </td>
            </tr>
        </table>`
    );

    return contenedor;
}

let ProductosParaVenta = [];



function obtenerDetallep($idReserva) {

    var request = {
        IdReserva: $idReserva
    };

    $.ajax({
        type: "POST",
        url: "frmReservas.aspx/DetalleReservaCale",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                $("#txtIdReserrv").val($idReserva);
                $("#txtIdclienteAte").val(data.d.objeto.oCliente.IdCliente);
                $("#txtNombreClienteat").val(data.d.objeto.oCliente.Nombre);
                $("#txtDocumentoClienteat").val(data.d.objeto.oCliente.NumeroDocumento);
                $("#txtcelu").val(data.d.objeto.oCliente.Telefono);
                ProductosParaVenta = data.d.objeto.oListaDetalleReserva;
                mosProd_Precio();
                //console.log("arreglo: ", ProductosParaVenta);

            } else {
                swal("Mensaje", data.d.valor, "success");
            }
        }
    });
}

$("#cboBuscarProducto").on("select2:select", function (e) {
    const data = e.params.data;

    let producto_encontradov = ProductosParaVenta.filter(p => p.IdProducto == data.id)
    if (producto_encontradov.length > 0) {
        $("#cboBuscarProducto").val("").trigger("change")
        toastr.warning("", "El producto ya fue agregado")
        return false;
    }

    swal({
        title: data.text,
        text: data.categoria,
        imageUrl: data.ImageFulP,
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        inputPlaceholder: "Ingrese Cantidad"
    }, function (valor) {
        if (valor === false) {
            return false;
        }

        if (valor === "") {
            toastr.warning("", "Necesita ingresar la cantidad")
            return false;
        }
        if (isNaN(parseInt(valor))) {
            toastr.warning("", "Debe ser un valor numerico")
            return false;
        }

        let productod = {
            IdProducto: data.id,
            NombreProducto: data.text,
            Cantidad: parseInt(valor),
            PrecioUnidad: parseFloat(data.PrecioUnidadVenta),
            ImporteTotal: (parseFloat(valor) * data.PrecioUnidadVenta)
        }

        ProductosParaVenta.push(productod)
        //console.log(ProductosParaVenta);

        //actualizarCantidadCarrito();
        mosProd_Precio();
        $("#cboBuscarProducto").val("").trigger("change")
        swal.close();
    }
    )
})

function mosProd_Precio() {
    let total = 0;
    let subtotal = 0;
    let porcentaje = 0.18;

    $("#tbReservasa tbody").html("");

    ProductosParaVenta.forEach((item, index) => {
        total += parseFloat(item.ImporteTotal);

        $("#tbReservasa tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProductoa", item.IdProducto)
                ),
                $("<td>").text(item.NombreProducto),
                $("<td>").append(
                    $("<input>").attr({
                        type: "text",
                        value: item.Cantidad,
                        class: "form-control cantidad-input input-reducido",
                        "data-index": index // Añade un atributo para identificar el producto
                    })
                ),
                $("<td>").text(item.PrecioUnidad),
                $("<td>").text(item.ImporteTotal)
            )
        );
    });

    subtotal = total / (1 + porcentaje);
    $("#txtSubTotal").val(subtotal.toFixed(2));
    $("#txtTotal").val(total.toFixed(2));
}

// Evento change para actualizar cantidad
$(document).on('input', '.cantidad-input', function () {
    const index = $(this).data("index");
    const nuevaCantidad = parseInt($(this).val());

    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
        ProductosParaVenta[index].Cantidad = nuevaCantidad;
        ProductosParaVenta[index].ImporteTotal = nuevaCantidad * ProductosParaVenta[index].PrecioUnidad;
        mosProd_Precio();
    } else {
        toastr.warning("", "Debe ingresar una cantidad válida");
        // Revertir el valor del input a la cantidad anterior
        $(this).val(ProductosParaVenta[index].Cantidad);
    }
});

function mosProd_PrecioOri() {
    let total = 0;
    let subtotal = 0;
    let porcentaje = 0.18;

    $("#tbReservasa tbody").html("");

    ProductosParaVenta.forEach((item) => {

        total = total + parseFloat(item.ImporteTotal)

        $("#tbReservasa tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProductoa", item.IdProducto)
                ),
                $("<td>").text(item.NombreProducto),
                $("<td>").append(
                    $("<input>").attr({
                        type: "text",
                        value: item.Cantidad,
                        class: "form-control cantidad-input"
                    })
                ),
                $("<td>").text(item.PrecioUnidad),
                $("<td>").text(item.ImporteTotal)
            )
        )
    })
    subtotal = total / (1 + porcentaje);
    $("#txtSubTotal").val(subtotal.toFixed(2));
    $("#txtTotal").val(total.toFixed(2));
}

$(document).on('click', 'button.btn-eliminar', function () {
    const _idProducto = $(this).data("idProductoa")
    ProductosParaVenta = ProductosParaVenta.filter(p => p.IdProducto != _idProducto);

    mosProd_Precio();
});



$('#btnTerminarvent').on('click', function () {

    if (ProductosParaVenta.length < 1) {
        swal("Mensaje", "Debe ingresar minimo un producto", "warning");
        return;
    }

    if (parseInt($("#txtIdclienteAte").val()) == 0) {
        swal("Mensaje", "No puede registrar sin Cliente Retorne a reservas", "warning");
        return;
    }

    $("#btnTerminarvent").LoadingOverlay("show");

    var totallprodu = 0;
    var est = "Boleta";
    var DETALLE = "";
    var VENTA = "";
    var DETALLE_VENTA = "";
    var DATOS_VENTA = "";

    ProductosParaVenta.forEach((item) => {

        totallprodu = totallprodu + parseInt(item.Cantidad)

        DATOS_VENTA = DATOS_VENTA + "<DATOS>" +
            "<IdVenta>0</IdVenta>" +
            "<IdProducto>" + item.IdProducto + "</IdProducto>" +
            "<Cantidad>" + item.Cantidad + "</Cantidad>" +
            "<PrecioUnidad>" + item.PrecioUnidad + "</PrecioUnidad>" +
            "<ImporteTotal>" + item.ImporteTotal + "</ImporteTotal>" +
            "</DATOS>"
    });

    VENTA = "<VENTA>" +
        "<IdReserva>" + $("#txtIdReserrv").val() + "</IdReserva>" +
        "<IdCliente>" + $("#txtIdclienteAte").val() + "</IdCliente>" +
        "<TipoDocumento>" + est + "</TipoDocumento>" +
        "<CantidadProducto>" + ProductosParaVenta.length + "</CantidadProducto>" +
        "<CantidadTotal>" + totallprodu + "</CantidadTotal>" +
        "<TotalCosto>" + $("#txtTotal").val() + "</TotalCosto>" +
        "</VENTA>";

    DETALLE_VENTA = "<DETALLE_VENTA>" + DATOS_VENTA + "</DETALLE_VENTA>";
    DETALLE = "<DETALLE>" + VENTA + DETALLE_VENTA + "</DETALLE>"

    var request = { xml: DETALLE };

    $.ajax({
        type: "POST",
        url: "frmVentaReserva.aspx/GuardarVentaIdCliente",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            $("#btnTerminarvent").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $("#btnTerminarvent").LoadingOverlay("hide");
            if (response.d.Estado) {
                // Reseteo de campos y tabla después de un éxito
                ProductosParaVenta = [];
                mosProd_Precio();
                $("#txtIdReserrv").val("0");
                $("#txtIdclienteAte").val("0");
                $("#txtNombreClienteat").val("");
                $("#txtDocumentoClienteat").val("");
                $("#txtcelu").val("");

                //swal("Mensaje", response.d.Valor, "success");

                var url = 'frmDocVenta.aspx?id=' + response.d.Valor;

                $("#overlay").LoadingOverlay("show");
                var popup = window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');

                var timer = setInterval(function () {
                    if (popup.closed) {
                        clearInterval(timer);
                        $("#overlay").LoadingOverlay("hide");
                        // Redirigir a frmReservas.aspx cuando el popup se cierre
                        window.location.href = 'frmReservas.aspx';
                    }
                }, 500);


                //window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
            } else {
                swal("Mensaje", response.d.Mensaje, "error");
            }
        }
    });

    //window.open('frmDocVenta.aspx', '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
})