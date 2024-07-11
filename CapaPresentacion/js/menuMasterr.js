

$(document).ready(function () {
    oBtenerDetalleUsuarioR();
    //cargarMenu();
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

function cargarMenu() {

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ObtenerMenu",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                const menuList = data.d.objeto;
                renderMenu(menuList);
                //$.Sidemenu.init();
                initializeMenuScripts();
                //console.log(data.d.objeto);
            } else {
                swal("Mensaje", "No se muestra el menu", "error")
            }

        }
    });
}

function renderMenu(menuList) {
    const menuContainer = $('#menu-list');
    menuContainer.empty();

    menuList.forEach(menu => {
        if (menu.IsSubMenu && menu.oSubMenu.length > 0) {
            // Crear menú con submenús
            let submenuItems = '';
            menu.oSubMenu.forEach(submenu => {
                submenuItems += `<li><a href="${submenu.NombreFormulario}">${submenu.Nombre}</a></li>`;
            });

            const menuHtml = `
                <li class="has_sub">
                    <a href="javascript:void(0);" class="waves-effect">
                        <i class="${menu.Icono}"></i>
                        <span>${menu.Nombre}</span>
                        <span class="float-right"><i class="mdi mdi-plus"></i></span>
                    </a>
                    <ul class="list-unstyled">
                        ${submenuItems}
                    </ul>
                </li>`;
            menuContainer.append(menuHtml);
        } else {
            // Crear menú sin submenús
            const menuHtml = `
                <li>
                    <a href="${menu.Url}" class="waves-effect">
                        <i class="${menu.Icono}"></i>
                        <span>${menu.Nombre}</span>
                        <span class="badge badge-primary float-right">1</span>
                    </a>
                </li>`;
            menuContainer.append(menuHtml);
        }
    });
}

function initializeMenuScripts() {
    // Aquí inicializas cualquier script necesario para manejar los submenús
    $('.has_sub > a').click(function () {
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('ul').slideUp(200);
        } else {
            element.addClass('open');
            element.find('ul').slideDown(200);
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