
var table;

const MODELO_BASE = {
    IdProducto: 0,
    Nombre: "",
    Descripcion: "",
    IdCategoria: 0,
    PrecioUnidadVenta: 0.0, // Inicializado como float
    //PrecioUnidadVenta: "",
    Activo: true,
    ImageFulP: ""
}

function ObtenerFecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {

    $("#txtFechaa").val(ObtenerFecha());
    dtProduc();
    cargarCatego();
})

function dtProduc() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbProduct")) {
        // Destruir el DataTable existente
        $("#tbProduct").DataTable().destroy();
        // Limpiar el contenedor del DataTable
        $('#tbProduct tbody').empty();
    }

    table = $("#tbProduct").DataTable({
        responsive: true,
        "ajax": {
            "url": 'frmProductos.aspx/ObtenerProd',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.estado) {
                    return json.d.objeto; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdProducto", "visible": false, "searchable": false },
            {
                "data": "ImageFulP", render: function (data) {
                    return `<img style="height:40px" src=${data} class="rounded mx-auto d-block"/>`
                }
            },
            { "data": "oCategoria.Descripcion" },
            { "data": "Nombre" },
            { "data": "PrecioUnidadVenta" },
            {
                "data": "Activo", render: function (data) {
                    if (data == true)
                        return '<span class="badge badge-info">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "Bfrtip",
        "buttons": [
            {
                text: 'Exportar Excel',
                extend: 'excelHtml5',
                title: '',
                filename: 'Reporte Productos',
                exportOptions: {
                    columns: [2, 3, 4, 5] // Ajusta según las columnas que desees exportar
                }
            },
            'pageLength'
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function cargarCatego() {
    $("#cboCatego").html("");

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
                        $("<option>").attr({ "value": row.IdCategoria }).text(row.Descripcion).appendTo("#cboCatego");
                    }

                })
            }

        }
    });
}

function mostrarImagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgUsuarioP').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);

        // Actualiza el nombre del archivo en el label
        var fileName = input.files[0].name;
        var nextSibling = $(input).next('.custom-file-label');
        nextSibling.text(fileName);
    } else {
        $('#imgUsuarioP').attr('src', "Imagenes/Sinfotop.png");

        // Restablece el texto del label
        var nextSibling = $(input).next('.custom-file-label');
        nextSibling.text('Ningún archivo seleccionado');
    }


}

$('#txtFotoP').change(function () {
    mostrarImagenSeleccionada(this);
});

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdProducto").val(modelo.IdProducto);
    $("#txtNombrePr").val(modelo.Nombre);
    $("#txtDescripcionPr").val(modelo.Descripcion);
    $("#cboCatego").val(modelo.IdCategoria == 0 ? $("#cboCatego option:first").val() : modelo.IdCategoria);
    $("#txtPrecioPr").val(modelo.PrecioUnidadVenta);
    $("#cboEstadoPr").val(modelo.Activo == true ? 1 : 0);
    $("#imgUsuarioP").attr("src", modelo.ImageFulP == "" ? "Imagenes/Sinfotop.png" : modelo.ImageFulP);

    // Configurar el estado de cboEstado según cboEstadoDeshabilitado jquery v 1.11.1
    $("#cboEstadoPr").prop("disabled", cboEstadoDeshabilitado);

    //$("#txtCorreo").prop("disabled", !cboEstadoDeshabilitado);

    // Limpiar el input file y restablecer el texto del label
    $("#txtFotoP").val("");
    $(".custom-file-label").text('Ningún archivo seleccionado');

    $("#modalrolp").modal("show");
}

$("#tbProduct tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    mostrarModal(model, false);
})

$('#btnNuevoProd').on('click', function () {
    mostrarModal(null, true);
    //$("#modalrolp").modal("show");
})

function sendDataToServer(request) {
    $.ajax({
        type: "POST",
        url: "frmProductos.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d) {
                dtProduc();
                $('#modalrolp').modal('hide');
                swal("Mensaje", "Registro Exitoso", "success");
            } else {
                swal("Mensaje", "Error al registrar", "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function registerDataAjax() {
    var fileInput = document.getElementById('txtFotoP');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdProducto"] = parseInt($("#txtIdProducto").val());
    modelo["Nombre"] = $("#txtNombrePr").val();
    modelo["Descripcion"] = $("#txtDescripcionPr").val();
    modelo["PrecioUnidadVenta"] = parseFloat($("#txtPrecioPr").val()); // Convertir a float
    //modelo["PrecioUnidadVenta"] = $("#txtPrecioPr").val();
    modelo["IdCategoria"] = $("#cboCatego").val();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Error", "La imagen seleccionada es demasiado grande.", "error");
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oProducto: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServer(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oProducto: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServer(request);
    }
}

function sendDataToServerEdit(request) {
    $.ajax({
        type: "POST",
        url: "frmProductos.aspx/EditarProducto",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                dtProduc();
                $('#modalrolp').modal('hide');
                swal("Mensaje", response.d.Mensage, response.d.Valor);
            } else {
                swal("Mensaje", response.d.Mensage, response.d.Valor);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function editarDataAjax() {
    var fileInput = document.getElementById('txtFotoP');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdProducto"] = parseInt($("#txtIdProducto").val());
    modelo["Nombre"] = $("#txtNombrePr").val();
    modelo["Descripcion"] = $("#txtDescripcionPr").val();
    modelo["PrecioUnidadVenta"] = parseFloat($("#txtPrecioPr").val()); // Convertir a float
    modelo["Activo"] = ($("#cboEstadoPr").val() == "1" ? true : false);
    modelo["IdCategoria"] = $("#cboCatego").val();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande.", "error");
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oProducto: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerEdit(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oProducto: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerEdit(request);
    }
}

$('#btnGuardarCambiosP').on('click', function () {

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }


    if (parseInt($("#txtIdProducto").val()) == 0) {
        registerDataAjax();
    } else {
        //swal("Mensaje", "Falta para Actualizar personal.", "warning")
        editarDataAjax();
    }
})