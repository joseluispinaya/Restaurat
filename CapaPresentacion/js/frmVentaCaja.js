

function ObtenerFecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {

    $("#txtFechaRese").val(ObtenerFecha());
    cargarClien();
    cargarPro();

})

function cargarClien() {

    $("#cboBuscarCliente").select2({
        ajax: {
            url: "frmVentaCaja.aspx/BuscarClie",
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
                        id: item.IdCliente,
                        text: item.Nombre,
                        documento: item.NumeroDocumento,
                        Direccion: item.Direccion,
                        Telefono: item.Telefono,
                        cliente: item
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar Cliente',
        minimumInputLength: 1,
        templateResult: formatoRes
    });
}

function formatoRes(data) {

    var imagenes = "Imagenes/Sinfotop.png";
    // Esto es por defecto, ya que muestra el "buscando..."
    if (data.loading)
        return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td style="width:60px">
                    <img style="height:60px;width:60px;margin-right:10px" src="${imagenes}"/>
                </td>
                <td>
                    <p style="font-weight: bolder;margin:2px">${data.text}</p>
                    <p style="margin:2px">${data.documento}</p>
                </td>
            </tr>
        </table>`
    );

    return contenedor;
}

// Evento para manejar la selección del cliente
$("#cboBuscarCliente").on("select2:select", function (e) {

    var data = e.params.data.cliente;
    $("#txtIdclienteAtec").val(data.IdCliente);
    $("#txtDocumentoClienteat").val(data.NumeroDocumento);
    $("#txtNombreClienteat").val(data.Nombre);
    $("#txtcelu").val(data.Telefono);
    $("#txtdirecc").val(data.Direccion);

    $("#cboBuscarCliente").val("").trigger("change")
    //console.log(data);
});

function cargarPro() {

    $("#cboBuscarProductov").select2({
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

let ProductosParaVentaC = [];

$("#cboBuscarProductov").on("select2:select", function (e) {
    const data = e.params.data;

    let producto_encontradov = ProductosParaVentaC.filter(p => p.IdProducto == data.id)
    if (producto_encontradov.length > 0) {
        $("#cboBuscarProductov").val("").trigger("change")
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

        ProductosParaVentaC.push(productod)
        //console.log(ProductosParaVentaC);

        mosProdr_Precio();
        $("#cboBuscarProductov").val("").trigger("change")
        swal.close();
    }
    )
})

function mosProdr_Precio() {
    let total = 0;
    let subtotal = 0;
    let porcentaje = 0.18;

    $("#tbVentaca tbody").html("");

    ProductosParaVentaC.forEach((item, index) => {
        total += parseFloat(item.ImporteTotal);

        $("#tbVentaca tbody").append(
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
                        class: "form-control input-sm cantidad-input input-reducido",
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
        ProductosParaVentaC[index].Cantidad = nuevaCantidad;
        ProductosParaVentaC[index].ImporteTotal = nuevaCantidad * ProductosParaVentaC[index].PrecioUnidad;
        mosProdr_Precio();
    } else {
        toastr.warning("", "Debe ingresar una cantidad válida");
        // Revertir el valor del input a la cantidad anterior
        $(this).val(ProductosParaVentaC[index].Cantidad);
    }
});

$(document).on('click', 'button.btn-eliminar', function () {
    const _idProducto = $(this).data("idProductoa")
    ProductosParaVentaC = ProductosParaVentaC.filter(p => p.IdProducto != _idProducto);

    mosProdr_Precio();
});



$("#switcher").change(function () {
    // Verificar si el checkbox está marcado
    if ($(this).is(":checked")) {
        //swal("Con Cliente", "Se Registro de manera correcta con Id", "warning")
        $("#cboBuscarCliente").prop("disabled", true);

        $("#txtIdclienteAtec").val("0");
        $("#txtDocumentoClienteat").val("");
        $("#txtNombreClienteat").val("");
        $("#txtcelu").val("");
        $("#txtdirecc").val("");

    } else {
        //swal("Sin ID Cliente", "Se Registro de manera correcta sin Id", "success")
        $("#cboBuscarCliente").prop("disabled", false);

        $("#txtIdclienteAtec").val("0");
        $("#txtDocumentoClienteat").val("");
        $("#txtNombreClienteat").val("");
        $("#txtcelu").val("");
        $("#txtdirecc").val("");

    }
});

function registerDataGuardarVentaNue() {

    //VALIDACIONES DE CLIENTE
    if ($("#txtDocumentoClienteat").val().trim() == "" || $("#txtNombreClienteat").val().trim() == "") {
        swal("Mensaje", "Complete los datos del cliente", "warning");
        return;
    }
    var nrocidoc = $("#txtDocumentoClienteat").val().trim();

    $("#btnTermiCaja").LoadingOverlay("show");

    var totallprodu = 0;
    var est = "Boleta";

    var DETALLE = "";
    var VENTA = "";
    var DETALLE_CLIENTE = "";
    var DETALLE_VENTA = "";
    var DATOS_VENTA = "";

    ProductosParaVentaC.forEach((item) => {

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
        "<IdCliente>0</IdCliente>" +
        "<TipoDocumento>" + est + "</TipoDocumento>" +
        "<CantidadProducto>" + ProductosParaVentaC.length + "</CantidadProducto>" +
        "<CantidadTotal>" + totallprodu + "</CantidadTotal>" +
        "<TotalCosto>" + $("#txtTotal").val() + "</TotalCosto>" +
        "</VENTA>";

    DETALLE_CLIENTE = "<DETALLE_CLIENTE><DATOS>" +
        "<NumeroDocumento>" + nrocidoc + "</NumeroDocumento>" +
        "<Nombre>" + $("#txtNombreClienteat").val() + "</Nombre>" +
        "<Direccion>" + $("#txtdirecc").val() + "</Direccion>" +
        "<Telefono>" + $("#txtcelu").val() + "</Telefono>" +
        "<Clave>" + nrocidoc + "</Clave>" +
        "</DATOS></DETALLE_CLIENTE>";

    DETALLE_VENTA = "<DETALLE_VENTA>" + DATOS_VENTA + "</DETALLE_VENTA>";

    DETALLE = "<DETALLE>" + VENTA + DETALLE_CLIENTE + DETALLE_VENTA + "</DETALLE>"

    var request = { xml: DETALLE };

    $.ajax({
        type: "POST",
        url: "frmVentaCaja.aspx/GuardarVenta",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            $("#btnTermiCaja").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $("#btnTermiCaja").LoadingOverlay("hide");
            if (response.d.Estado) {
                // Reseteo de campos y tabla después de un éxito
                ProductosParaVentaC = [];
                mosProdr_Precio();

                $("#txtIdclienteAtec").val("0");
                $("#txtDocumentoClienteat").val("");
                $("#txtNombreClienteat").val("");
                $("#txtcelu").val("");
                $("#txtdirecc").val("");

                //swal("Mensaje", response.d.Valor, "success");

                var url = 'frmDocVenta.aspx?id=' + response.d.Valor;

                $("#overlayc").LoadingOverlay("show");
                var popup = window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');

                var timer = setInterval(function () {
                    if (popup.closed) {
                        clearInterval(timer);
                        $("#overlayc").LoadingOverlay("hide");
                        //window.location.reload();
                    }
                }, 500);

            } else {
                swal("Mensaje", response.d.Mensage, "error");
            }
        }
    });
}

function dataGuardarVentaCliente() {


    $("#btnTermiCaja").LoadingOverlay("show");

    var totallprodu = 0;
    var est = "Boleta";

    var DETALLE = "";
    var VENTA = "";
    var DETALLE_VENTA = "";
    var DATOS_VENTA = "";

    ProductosParaVentaC.forEach((item) => {

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
        "<IdCliente>" + $("#txtIdclienteAtec").val() + "</IdCliente>" +
        "<TipoDocumento>" + est + "</TipoDocumento>" +
        "<CantidadProducto>" + ProductosParaVentaC.length + "</CantidadProducto>" +
        "<CantidadTotal>" + totallprodu + "</CantidadTotal>" +
        "<TotalCosto>" + $("#txtTotal").val() + "</TotalCosto>" +
        "</VENTA>";

    DETALLE_VENTA = "<DETALLE_VENTA>" + DATOS_VENTA + "</DETALLE_VENTA>";
    DETALLE = "<DETALLE>" + VENTA + DETALLE_VENTA + "</DETALLE>"

    var request = { xml: DETALLE };

    $.ajax({
        type: "POST",
        url: "frmVentaCaja.aspx/GuardarVentaIdCliente",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            $("#btnTermiCaja").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $("#btnTermiCaja").LoadingOverlay("hide");
            if (response.d.Estado) {
                // Reseteo de campos y tabla después de un éxito
                ProductosParaVentaC = [];
                mosProdr_Precio();

                $("#txtIdclienteAtec").val("0");
                $("#txtDocumentoClienteat").val("");
                $("#txtNombreClienteat").val("");
                $("#txtcelu").val("");
                $("#txtdirecc").val("");

                //swal("Mensaje", response.d.Valor, "success");

                var url = 'frmDocVenta.aspx?id=' + response.d.Valor;

                $("#overlayc").LoadingOverlay("show");
                var popup = window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');

                var timer = setInterval(function () {
                    if (popup.closed) {
                        clearInterval(timer);
                        $("#overlayc").LoadingOverlay("hide");
                        //window.location.reload();
                    }
                }, 500);

            } else {
                swal("Mensaje", response.d.Mensage, "error");
            }
        }
    });
}
$('#btnTermiCaja').on('click', function () {

    if (ProductosParaVentaC.length < 1) {
        swal("Mensaje", "Debe registrar minimo un producto en la venta", "warning");
        return;
    }

    

    if (parseInt($("#txtIdclienteAtec").val()) == 0) {
        //swal("Sin ID Cliente", "Se Registro de manera correcta sin Id", "success")
        registerDataGuardarVentaNue();
    } else {
        //swal("Con Cliente", "Se Registro de manera correcta con Id", "warning")
        dataGuardarVentaCliente();
    }

})