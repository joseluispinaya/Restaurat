
$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['es']);

function ObtenerFecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {
    oBtenerDetalleCliente();

    //detalleReserva();

    $('#mostrarcarrito').hide();
    $("#txtFechaRese").datepicker();
    $("#txtFechaRese").val(ObtenerFecha());

    cargarCatego();
    cargarProductosPorCatego();
})

function detalleReserva() {

    var idRes = 1;

    var request = {
        IdReserva: idRes
    };

    $.ajax({
        type: "POST",
        url: "Home.aspx/DetalleReservaIA",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                console.log(data.d.objeto);
            } else {
                swal("Mensaje", data.d.valor, "success");
            }
        }
    });
}


function oBtenerDetalleCliente() {
    var usuario = sessionStorage.getItem('usuario');
    if (usuario) {
        var usuarioObj = JSON.parse(usuario);
        $('#txtIdclientev').val(usuarioObj.IdCliente);
        $('#txtNombreCliente').val(usuarioObj.Nombre);
        $('#txtDocumentoCliente').val(usuarioObj.NumeroDocumento);
        $('#txtcelu').val(usuarioObj.Telefono);
    }
}

let ProductosParaReserva = [];

function cargarCatego() {
    $("#cboCategorcl").html("");

    $.ajax({
        type: "POST",
        url: "Home.aspx/ObtenerCatego",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                $("<option>").attr({ "value": 0 }).text("-- SELECCIONE CATEGORIA --").appendTo("#cboCategorcl");
                $.each(data.d.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<option>").attr({ "value": row.IdCategoria }).text(row.Descripcion).appendTo("#cboCategorcl");
                    }

                })
            }

        }
    });
}

$(document).on('click', '#vercarrt', function (e) {
    e.preventDefault();

    if (ProductosParaReserva.length < 1) {
        swal("Mensaje", "No tiene Productos agregados", "warning");
        return;
    }

    $('#mostrarproductoss').hide();
    $('#mostrarcarrito').show();
});

$('#btnEjemplo').on('click', function () {
    $('#mostrarcarrito').hide();
    $('#mostrarproductoss').show();
})

//era aqui variable array

function actualizarCantidadCarrito() {
    const cantidad = ProductosParaReserva.length;
    $('#vercarrt').html(`<i class="fas fa-cart-plus"></i> ${cantidad} Item${cantidad !== 1 ? 's' : ''}`);
}


// Delegar el evento click a los iconos de carrito de compras
$(document).on('click', '.fa-shopping-cart', function (e) {
    e.preventDefault();

    var usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        // Si no hay sesión, redirigir al usuario a la página de login
        window.location.href = 'Login.aspx';
        return;
    }



    const $link = $(this).closest('a');

    const idProducto = $link.data('id');
    const nombreProducto = $link.data('nombre');
    const precioProducto = parseFloat($link.data('precio')); // Asegurarse de que sea un número
    const imagenProducto = $link.data('imagen');
    const descripcion = $link.data('descripcion');


    let producto_encontrado = ProductosParaReserva.filter(p => p.idProductoa == idProducto)
    if (producto_encontrado.length > 0) {
        toastr.warning("", "El producto ya fue agregado")
        return false;
    }

    swal({
        title: nombreProducto,
        text: descripcion,
        imageUrl: imagenProducto,
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

        let producto = {
            idProductoa: idProducto,
            nombreProductoa: nombreProducto,
            cantidada: parseInt(valor),
            precioProductoa: precioProducto,
            totala: (parseFloat(valor) * precioProducto)
        }

        ProductosParaReserva.push(producto)
        actualizarCantidadCarrito();
        mostrarProductos_Precio();
        //console.log(ProductosParaReserva);
        swal.close();
    }
    )

});

function mostrarProductos_Precio() {
    let total = 0;
    let subtotal = 0;
    let porcentaje = 0.18;

    $("#tbReservasa tbody").html("");

    ProductosParaReserva.forEach((item) => {

        total = total + parseFloat(item.totala)

        $("#tbReservasa tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProductoa", item.idProductoa)
                ),
                $("<td>").text(item.nombreProductoa),
                $("<td>").text(item.cantidada),
                $("<td>").text(item.precioProductoa),
                $("<td>").text(item.totala)
            )
        )
    })
    subtotal = total / (1 + porcentaje);
    $("#txtSubTotal").val(subtotal.toFixed(2));
    $("#txtTotal").val(total.toFixed(2));
}

$(document).on('click', 'button.btn-eliminar', function () {
    const _idProducto = $(this).data("idProductoa")
    ProductosParaReserva = ProductosParaReserva.filter(p => p.idProductoa != _idProducto);

    mostrarProductos_Precio();
    actualizarCantidadCarrito();
});

// Asignar el evento change al select
$("#cboCategorcl").change(cargarProductosPorCatego);


function cargarProductosPorCatego() {

    var request = {
        idcate: $("#cboCategorcl").val() == null ? "0" : $("#cboCategorcl").val()
    };

    $.ajax({
        type: "POST",
        url: "Home.aspx/ObtenerCategoProdu",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                const categorias = data.d.objeto;
                const container = document.querySelector('.food-items-container');

                // Limpiar el contenedor antes de llenarlo
                container.innerHTML = '';

                // Iterar sobre cada categoría
                categorias.forEach(categoria => {
                    // Crear un nuevo contenedor para la categoría
                    const categoriaDiv = document.createElement('div');
                    categoriaDiv.className = 'biryani-section';

                    // Añadir el nombre de la categoría
                    const categoryName = document.createElement('p');
                    categoryName.className = 'category-name';
                    categoryName.textContent = categoria.Descripcion;
                    categoriaDiv.appendChild(categoryName);

                    // Iterar sobre los productos de la categoría
                    categoria.oListaProducto.forEach(producto => {
                        const itemCard = document.createElement('div');
                        itemCard.className = 'item-card';

                        const input = document.createElement('input');
                        input.id = 'txtIdProducto';
                        input.type = 'hidden';
                        itemCard.appendChild(input);

                        const cardTop = document.createElement('div');
                        cardTop.className = 'card-top';

                        const ratingLink = document.createElement('a');
                        ratingLink.href = '#';
                        ratingLink.setAttribute('data-id', producto.IdProducto);
                        ratingLink.setAttribute('data-nombre', producto.Nombre);
                        ratingLink.setAttribute('data-precio', producto.PrecioUnidadVenta);
                        ratingLink.setAttribute('data-imagen', producto.Imagen);
                        ratingLink.setAttribute('data-descripcion', producto.Descripcion);

                        const ratingIcon = document.createElement('i');
                        ratingIcon.className = 'fas fa-shopping-cart rating';
                        ratingIcon.textContent = ' 4.5';
                        ratingLink.appendChild(ratingIcon);

                        cardTop.appendChild(ratingLink);

                        const heartIcon = document.createElement('i');
                        heartIcon.className = 'far fa-heart';
                        cardTop.appendChild(heartIcon);

                        itemCard.appendChild(cardTop);

                        const img = document.createElement('img');
                        img.src = producto.Imagen;
                        itemCard.appendChild(img);

                        const itemName = document.createElement('p');
                        itemName.className = 'item-name';
                        itemName.textContent = producto.Nombre;
                        itemCard.appendChild(itemName);

                        const itemPrice = document.createElement('p');
                        itemPrice.className = 'item-price';
                        itemPrice.textContent = `Precio : Bs ${producto.PrecioUnidadVenta}`;
                        itemCard.appendChild(itemPrice);

                        categoriaDiv.appendChild(itemCard);
                    });

                    container.appendChild(categoriaDiv);
                });
            }
        }
    });
}

function registerConIdClienteReserva() {

    var totallprodu = 0;
    var est = "Confirmado";
    var DETALLE = "";
    var RESERVA = "";
    var DETALLE_RESERVA = "";
    var DATOS_RESERVA = "";

    ProductosParaReserva.forEach((item) => {

        totallprodu = totallprodu + parseInt(item.cantidada)

        DATOS_RESERVA = DATOS_RESERVA + "<DATOS>" +
            "<IdReserva>0</IdReserva>" +
            "<IdProducto>" + item.idProductoa + "</IdProducto>" +
            "<Cantidad>" + item.cantidada + "</Cantidad>" +
            "<PrecioUnidad>" + item.precioProductoa + "</PrecioUnidad>" +
            "<ImporteTotal>" + item.totala + "</ImporteTotal>" +
            "</DATOS>"
    });

    // Obtener la fecha y formatearla en YYYY-MM-DDTHH:MM:SS
    var fechaRese = $("#txtFechaRese").val();
    var fechaParts = fechaRese.split('/');
    var formattedDate = fechaParts[2] + '-' + (fechaParts[1].length < 2 ? '0' : '') + fechaParts[1] + '-' + (fechaParts[0].length < 2 ? '0' : '') + fechaParts[0] + 'T00:00:00';


    RESERVA = "<RESERVA>" +
        "<IdCliente>" + $("#txtIdclientev").val() + "</IdCliente>" +
        "<CantidadProducto>" + ProductosParaReserva.length + "</CantidadProducto>" +
        "<CantidadTotal>" + totallprodu + "</CantidadTotal>" +
        "<TotalCosto>" + $("#txtTotal").val() + "</TotalCosto>" +
        "<Comentario>" + $("#txtcomentario").val() + "</Comentario>" +
        "<Estado>" + est + "</Estado>" +
        "<FechaSolicitado>" + formattedDate + "</FechaSolicitado>" +
        "</RESERVA>";

    DETALLE_RESERVA = "<DETALLE_RESERVA>" + DATOS_RESERVA + "</DETALLE_RESERVA>";
    DETALLE = "<DETALLE>" + RESERVA + DETALLE_RESERVA + "</DETALLE>"

    var request = { xml: DETALLE };

    //console.log(request);

    $.ajax({
        type: "POST",
        url: "frmCrearReserva.aspx/GuardarReservaIdCliente",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                // Reseteo de campos y tabla después de un éxito
                $("#txttotal").val("0");
                $("#tbReservasa tbody").html("");

                var url = 'docComprobante.aspx?id=' + response.d.Valor;
                window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
            } else {
                swal("Mensaje", response.d.Mensaje, "error");
            }
        }
    });

}



$('#btnTerminarReserv').on('click', function () {

    if (ProductosParaReserva.length < 1) {
        swal("Mensaje", "Debe registrar minimo un producto en la reserva", "warning");
        return;
    }

    var fechaReseStra = $("#txtFechaRese").val().trim();

    var fechaResePartsa = fechaReseStra.split('/');
    var fechaResea = new Date(fechaResePartsa[2], fechaResePartsa[1] - 1, fechaResePartsa[0]);


    var fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);  // Establecer la hora en 00:00:00


    if (fechaResea <= fechaActual) {
        swal("Mensaje", "Debe ingresar una fecha mayor a la actual", "warning");
        return;
    }

    // Validar que la fecha de reserva no sea un lunes
    if (fechaResea.getDay() === 1) {
        swal("Mensaje", "El restaurante no está abierto los lunes. Por favor, seleccione otro día.", "warning");
        return;
    }

    $("#btnTerminarReserv").LoadingOverlay("show");


    var totallprodu = 0;
    var est = "Confirmado";
    var DETALLE = "";
    var RESERVA = "";
    var DETALLE_RESERVA = "";
    var DATOS_RESERVA = "";

    ProductosParaReserva.forEach((item) => {

        totallprodu = totallprodu + parseInt(item.cantidada)

        DATOS_RESERVA = DATOS_RESERVA + "<DATOS>" +
            "<IdReserva>0</IdReserva>" +
            "<IdProducto>" + item.idProductoa + "</IdProducto>" +
            "<Cantidad>" + item.cantidada + "</Cantidad>" +
            "<PrecioUnidad>" + item.precioProductoa + "</PrecioUnidad>" +
            "<ImporteTotal>" + item.totala + "</ImporteTotal>" +
            "</DATOS>"
    });

    // Obtener la fecha y formatearla en YYYY-MM-DDTHH:MM:SS
    var fechaRese = $("#txtFechaRese").val();
    var fechaParts = fechaRese.split('/');
    var formattedDate = fechaParts[2] + '-' + (fechaParts[1].length < 2 ? '0' : '') + fechaParts[1] + '-' + (fechaParts[0].length < 2 ? '0' : '') + fechaParts[0] + 'T00:00:00';


    RESERVA = "<RESERVA>" +
        "<IdCliente>" + $("#txtIdclientev").val() + "</IdCliente>" +
        "<CantidadProducto>" + ProductosParaReserva.length + "</CantidadProducto>" +
        "<CantidadTotal>" + totallprodu + "</CantidadTotal>" +
        "<TotalCosto>" + $("#txtTotal").val() + "</TotalCosto>" +
        "<Comentario>" + $("#txtcomentario").val() + "</Comentario>" +
        "<Estado>" + est + "</Estado>" +
        "<FechaSolicitado>" + formattedDate + "</FechaSolicitado>" +
        "</RESERVA>";

    DETALLE_RESERVA = "<DETALLE_RESERVA>" + DATOS_RESERVA + "</DETALLE_RESERVA>";
    DETALLE = "<DETALLE>" + RESERVA + DETALLE_RESERVA + "</DETALLE>"

    var request = { xml: DETALLE };

    //console.log(request);

    $.ajax({
        type: "POST",
        url: "Home.aspx/GuardarReservaIdCliente",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            $("#btnTerminarReserv").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $("#btnTerminarReserv").LoadingOverlay("hide");
            if (response.d.Estado) {
                // Reseteo de campos y tabla después de un éxito
                ProductosParaReserva = [];
                mostrarProductos_Precio();
                actualizarCantidadCarrito();
                $("#txtcomentario").val("");

                $('#mostrarcarrito').hide();
                $('#mostrarproductoss').show();

                //dataSmsWhat(response.d.Valor);

                swal("Mensaje", "Su reserva fue realizada exitosamente", "success");
                //swal("Mensaje", response.d.Valor, "success");

                //var url = 'docComprobante.aspx?id=' + response.d.Valor;
                //window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
            } else {
                swal("Mensaje", response.d.Mensaje, "error");
            }
        }
    });


    //registerConIdClienteReserva();
})

function dataSmsWhat($IdReserva) {


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
                // Mostrar u ocultar el botón de cancelar según el estado
                var totalCosto = response.d.objeto.TotalCosto;
                var nombre = response.d.objeto.oCliente.Nombre;
                var codi = response.d.objeto.Codigo;
                var tot = totalCosto.toFixed(2) + " /Bs.";
                var comen = response.d.objeto.Comentario;
                var feres = response.d.objeto.FechaReserva;

                let message = `*Hola, me gustaría realizar una reserva:*\n\n`;
                message += `*Nombre:* ${nombre}\n`;
                message += `*Cod Reserva:* ${codi}\n`;
                message += `*Reserva para el:* ${feres}\n`;
                message += `*Comentario:* ${comen}\n`;
                message += `\n*Productos:*\n`;

                let ProductosParaVentaa = [];
                ProductosParaVentaa = response.d.objeto.oListaDetalleReserva;
                ProductosParaVentaa.forEach((item) => {

                    message += `- *${item.NombreProducto}*\n  *Cantidad:* ${item.Cantidad}\n  *Precio:* Bs${item.PrecioUnidad} cada uno\n`;
                })

                message += `\n*Total: ${tot}*`;

                var encodedMessage = encodeURIComponent(message);
                var whatsappURL = `https://api.whatsapp.com/send?phone=59169568863&text=${encodedMessage}`;
                window.open(whatsappURL, '_blank');


            }
        }
    });

}

function sendOrderToWhatsApp() {
    //$('#txtNombreCliente').val(usuarioObj.Nombre);
    var nombre = $('#txtNombreCliente').val();
    var codi = "00003";
    var tot = $('#txtTotal').val();
    let message = `*Hola, me gustaría realizar una reserva:*\n\n`;
    message += `*Nombre:* ${nombre}\n`;
    message += `*Cod Reserva:* ${codi}\n`;
    message += `\n*Productos:*\n`;

    ProductosParaReserva.forEach((item) => {

        message += `- *${item.nombreProductoa}*\n  *Cantidad:* ${item.cantidada}\n  *Precio:* Bs${item.precioProductoa} cada uno\n`;
        //message += `- *${item.nombreProductoa}*\n  *Cantidad:* ${item.cantidada}\n  *Precio:* Bs${item.precioProductoa} cada uno\n`;
    })
    message += `\n*Total: Bs${tot}*`;

    var encodedMessage = encodeURIComponent(message);
    var whatsappURL = `https://api.whatsapp.com/send?phone=59169568863&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    //console.log(message);
}