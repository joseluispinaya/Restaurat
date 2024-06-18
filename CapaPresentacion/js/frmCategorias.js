

$(document).ready(function () {

    cargarCatego();
    cargarProductosPorCatego();
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
                $.each(data.d.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<option>").attr({ "value": row.IdCategoria }).text(row.Descripcion).appendTo("#cboCategor");
                    }

                })
            }

        }
    });
}

function cargarProductosPorCategoee() {
    $.ajax({
        type: "POST",
        url: "frmCategorias.aspx/ObtenerCategoProdu",
        data: JSON.stringify({}),
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


// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    // Lógica para agregar el producto al carrito
    console.log(`Producto con ID ${idProducto} agregado al carrito.`);
}

// Delegar el evento click a los iconos de carrito de compras
$(document).on('click', '.fa-shopping-cart', function (e) {
    e.preventDefault();
    const idProducto = $(this).closest('a').data('id');
    console.log('ID del Producto:', idProducto);
    // Aquí puedes realizar alguna acción con el idProducto
    // Por ejemplo, agregar el producto al carrito de compras
    agregarAlCarrito(idProducto);
});

function cargarProductosPorCatego() {
    $.ajax({
        type: "POST",
        url: "frmCategorias.aspx/ObtenerCategoProdu",
        data: JSON.stringify({}),
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