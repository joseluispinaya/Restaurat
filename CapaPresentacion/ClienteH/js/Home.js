
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
    //verificarSesion();
    $('#mostrarcarrito').hide();
    $("#txtFechaRese").datepicker();
    $("#txtFechaRese").val(ObtenerFecha());

    cargarCatego();
    cargarProductosPorCatego();
})


function cargarCatego() {
    $("#cboCategorcl").html("");

    $.ajax({
        type: "POST",
        url: "../frmProductos.aspx/ObtenerCatego",
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
    $('#mostrarproductoss').hide();
    $('#mostrarcarrito').show();
});

$('#btnEjemplo').on('click', function () {
    $('#mostrarcarrito').hide();
    $('#mostrarproductoss').show();
})

let ProductosParaReserva = [];

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
        url: "../frmCategorias.aspx/ObtenerCategoProdu",
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

function registerConIdClienteVenta() {

    var totallprodu = 0;
    var est = "Activo";
    var DETALLE = "";
    var VENTA = "";
    var DETALLE_VENTA = "";
    var DATOS_VENTA = "";

    ProductosParaReserva.forEach((item) => {

        totallprodu = totallprodu + parseInt(item.cantidada)

        DATOS_VENTA = DATOS_VENTA + "<DATOS>" +
            "<IdReserva>0</IdReserva>" +
            "<IdProducto>" + item.idProductoa + "</IdProducto>" +
            "<Cantidad>" + item.cantidada + "</Cantidad>" +
            "<PrecioUnidad>" + item.precioProductoa + "</PrecioUnidad>" +
            "<ImporteTotal>" + item.totala + "</ImporteTotal>" +
            "</DATOS>"
    })

    VENTA = "<VENTA>" +
        "<IdCliente>" + $("#txtIdclientev").val() + "</IdCliente>" +
        "<CantidadProducto>" + ProductosParaReserva.length + "</CantidadProducto>" +
        "<CantidadTotal>" + totallprodu + "</CantidadTotal>" +
        "<TotalCosto>" + $("#txtTotal").val() + "</TotalCosto>" +
        "<Comentario>" + $("#txtcomentario").val() + "</Comentario>" +
        "<Estado>" + est + "</Estado>" +
        "<FechaSolicitado>" + $("#txtFechaRese").val() + "</FechaSolicitado>" +
        "</VENTA>";

    DETALLE_VENTA = "<DETALLE_VENTA>" + DATOS_VENTA + "</DETALLE_VENTA>";
    DETALLE = "<DETALLE>" + VENTA + DETALLE_VENTA + "</DETALLE>"

    var request = { xml: DETALLE };

    console.log(request);

}


$('#btnTerminarVentar').on('click', function () {
    if (ProductosParaReserva.length < 1) {
        swal("Mensaje", "Debe registrar minimo un producto en la reserva", "warning");
        return;
    }

    registerConIdClienteVenta();
})