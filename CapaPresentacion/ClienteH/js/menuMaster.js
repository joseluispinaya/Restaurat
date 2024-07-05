
$(document).ready(function () {
    //$('#mirese').hide();
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
        //console.log("No hay sesión. Mostrar sinsesion y ocultar consesion.");

        $('#mirese').hide();

        $('#sinsesion').show();
        $('#consesion').hide();
    } else {
        // Si hay sesión, ocultar el elemento de inicio de sesión y mostrar el menú del usuario con sesión
        //console.log("Hay sesión. Mostrar consesion y ocultar sinsesion.");

        $('#mirese').show();

        $('#sinsesion').hide();
        $('#consesion').show();
        oBtenerDetalleUsuario();
    }
}

function oBtenerDetalleUsuario() {
    var usuario = sessionStorage.getItem('usuario');
    if (usuario) {
        var usuarioObj = JSON.parse(usuario);

        // Obtener el nombre completo
        var nombreCompleto = usuarioObj.Nombre;

        // Dividir el nombre completo en partes utilizando el espacio como separador
        var partesNombre = nombreCompleto.split(' ');

        // Unir todas las partes después del primer espacio
        var sinnombre = partesNombre.slice(1).join(' ');


        $('#nammmel').text(usuarioObj.Nombre);
        $('#rolnomclir').text(sinnombre);
        //console.log("Detalles del usuario:", usuarioObj);
    }
}