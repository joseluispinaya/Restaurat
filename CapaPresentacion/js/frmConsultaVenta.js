
var table;

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
    $("#txtfeini").datepicker();
    $("#txtfechfin").datepicker();
    $("#txtfeini").val(ObtenerFecha());
    $("#txtfechfin").val(ObtenerFecha());

    CargarDatos();
});

$('#btnBuscara').on('click', function () {

    CargarDatos();
})

function CargarDatos() {
    if ($.fn.DataTable.isDataTable("#tbVencon")) {
        $("#tbVencon").DataTable().destroy();
        $('#tbVencon tbody').empty();
    }

    var request = {
        fechainicio: $("#txtfeini").val(),
        fechafin: $("#txtfechfin").val()
    };

    table = $("#tbVencon").DataTable({
        responsive: true,
        "ajax": {
            "url": 'frmConsultaVenta.aspx/ObtenerLista',
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
            { "data": "IdVenta", "visible": false, "searchable": false },
            { "data": "TipoDocumento" },
            { "data": "Codigo" },
            { "data": "FechaRegistro" },
            { "data": "oCliente.NumeroDocumento" },
            { "data": "oCliente.Nombre" },
            { "data": "TotalCosto" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-xs" title="Ver Detalle">Detalle</button>',
                "orderable": false,
                "searchable": false,
                "width": "30px"
            }
        ],
        "dom": "rt",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbVencon tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    var url = 'frmDocVenta.aspx?id=' + model.IdVenta;

    $("#overlays").LoadingOverlay("show");
    var popup = window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');

    var timer = setInterval(function () {
        if (popup.closed) {
            clearInterval(timer);
            $("#overlays").LoadingOverlay("hide");
            // Redirigir a frmReservas.aspx cuando el popup se cierre
            //window.location.href = 'frmReservas.aspx';
        }
    }, 500);
})