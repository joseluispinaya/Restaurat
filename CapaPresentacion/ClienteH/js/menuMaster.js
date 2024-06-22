
$(document).ready(function () {
    //$('#sinsesion').hide();
    verificarSesion();
});

$(document).on('click', '#closecli', function (e) {
    e.preventDefault();
    cerrarSesion();

});

function cerrarSesion() {
    sessionStorage.removeItem('usuario');
    verificarSesion();
    window.location.reload(); // Recarga la página
}

function verificarSesion() {
    var usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        // Si no hay sesión, mostrar el elemento de inicio de sesión y ocultar el menú del usuario con sesión
        console.log("No hay sesión. Mostrar sinsesion y ocultar consesion.");
        $('#sinsesion').show();
        $('#consesion').hide();
    } else {
        // Si hay sesión, ocultar el elemento de inicio de sesión y mostrar el menú del usuario con sesión
        console.log("Hay sesión. Mostrar consesion y ocultar sinsesion.");
        $('#sinsesion').hide();
        $('#consesion').show();
        oBtenerDetalleUsuario();
    }
}

function oBtenerDetalleUsuario() {
    var usuario = sessionStorage.getItem('usuario');
    if (usuario) {
        var usuarioObj = JSON.parse(usuario);
        $('#nammmel').text(usuarioObj.Nombre);
        //$('#nombreusuario').text(usuario);
        console.log("Detalles del usuario:", usuarioObj);
        // Otros detalles del usuario pueden ser obtenidos y mostrados aquí
    }
}