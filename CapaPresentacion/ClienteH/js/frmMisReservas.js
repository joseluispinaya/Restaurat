
var table;

$(document).ready(function () {
    oBtenerDetalleReseCli();
    //CargarDatos();
})


function oBtenerDetalleReseCli() {
    var usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = 'Login.aspx';
    } else {
        var usuarioObj = JSON.parse(usuario);
        var idcl = usuarioObj.IdCliente;
        CargarDatos(idcl);
    }
}
function CargarDatos($idClie) {
    if ($.fn.DataTable.isDataTable("#tbmispedidos")) {
        $("#tbmispedidos").DataTable().destroy();
        $('#tbmispedidos tbody').empty();
    }

    var request = {
        IdCliente: $idClie
    };

    table = $("#tbmispedidos").DataTable({
        responsive: true,
        "ajax": {
            "url": 'frmMisReservas.aspx/Obtener',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.estado) {
                    return json.d.objeto;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdReserva", "visible": false, "searchable": false },
            { "data": "FechaRegistro" },
            { "data": "Codigo" },
            { "data": "Comentario" },
            {
                "data": "Estado",
                "render": function (data) {
                    if (data == "Confirmado")
                        return '<span class="badge badge-info">' + data + '</span>';
                    else
                        return '<span class="badge badge-danger">' + data + '</span>';
                }
            },
            { "data": "CantidadTotal" },
            { "data": "TotalCosto" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-xs" title="Ver Detalle">Detalles</button>',
                "orderable": false,
                "searchable": false,
                "width": "30px"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "rt",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}
$("#tbmispedidos tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    //var url = 'frmDetallesR.aspx';
    var url = 'frmDetallesR.aspx?id=' + model.IdReserva;
    window.location.href = url;
})