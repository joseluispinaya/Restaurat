
var table;
const MODELO_BASE = {
    IdCategoria: 0,
    Descripcion: "",
    Activo: true
}
$(document).ready(function () {

    dtCategorias();
    permisosNoti();
})

function dtCategorias() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbCategoria")) {
        // Destruir el DataTable existente
        $("#tbCategoria").DataTable().destroy();
        // Limpiar el contenedor del DataTable
        $('#tbCategoria tbody').empty();
    }

    table = $("#tbCategoria").DataTable({
        responsive: true,
        "ajax": {
            "url": 'frmCategorias.aspx/ObtenerCatego',
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
            { "data": "IdCategoria", "visible": false, "searchable": false },
            { "data": "Descripcion" },
            {
                "data": "Activo", render: function (data) {
                    if (data == true)
                        return '<span class="badge badge-info">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            { "data": "NumeroProductos" },
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
                filename: 'Reporte Categorias',
                exportOptions: {
                    columns: [1, 2, 3] // Ajusta según las columnas que desees exportar
                }
            },
            'pageLength'
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}


function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdCateg").val(modelo.IdCategoria);
    $("#txtDescripcion").val(modelo.Descripcion);
    $("#cboEstado").val(modelo.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    // Actualizar el título del modal
    if (cboEstadoDeshabilitado) {
        $("#custom-width-modalLabel").text("Nueva Categoria");
    } else {
        $("#custom-width-modalLabel").text("Editar Categoria");
    }

    $("#custom-width-modal").modal("show");
}

$("#tbCategoria tbody").on("click", ".btn-editar", function (e) {
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

$("#tbCategoria tbody").on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    var request = { IdCategoria: model.IdCategoria };

    swal({
        title: "Esta seguro",
        text: `Eliminar la categoria "${model.Descripcion}"`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "¡Si Eliminar!",
        cancelButtonText: "No. Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },

        function (respue) {

            if (respue) {

                $(".showSweetAlert").LoadingOverlay("show");

                $.ajax({
                    type: "POST",
                    url: "frmCategorias.aspx/Eliminar",
                    data: JSON.stringify(request),
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    error: function (xhr, ajaxOptions, thrownError) {
                        $(".showSweetAlert").LoadingOverlay("hide");
                        console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                    },
                    success: function (response) {
                        $(".showSweetAlert").LoadingOverlay("hide");

                        if (response.d.Estado) {
                            dtCategorias();
                            swal("Listo!", response.d.Mensage, response.d.Valor);
                            //swal.close();
                        } else {
                            swal("Lo sentimos", response.d.Mensage, response.d.Valor);
                        }
                    }
                });
            }
            
        });
})

$('#btnNuevoCate').on('click', function () {

    mostrarModal(null, true);
})

function dataRegistrar() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["IdCategoria"] = parseInt($("#txtIdCateg").val());
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oCategoria: modelo
    };

    $.ajax({
        type: "POST",
        url: "frmCategorias.aspx/GurdarCatego",
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
                dtCategorias();
                $('#custom-width-modal').modal('hide');
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

function dataActualizar() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["IdCategoria"] = parseInt($("#txtIdCateg").val());
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oCategoria: modelo
    };

    $.ajax({
        type: "POST",
        url: "frmCategorias.aspx/ActualizarCatego",
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
                dtCategorias();
                $('#custom-width-modal').modal('hide');
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

$('#btnGuardarCambios').on('click', function () {

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    if (parseInt($("#txtIdCateg").val()) == 0) {
        dataRegistrar();
    } else {
        //swal("Mensaje", "Falta para Actualizar.", "warning")
        dataActualizar();
    }
})

function permisosNoti() {
    if (!Push.Permission.GRANTED) {
        Push.Permission.request();
    }
}

function mostrarNotifiacion() {
    Push.create("Restaurante la J", {
        body: "Nueva Reserva Registrada",
        icon: "ImagenesPro/logoJ.jpg",
        timeout: 4000,
        onClick: function () {
            window.location = "Inicio.aspx";
            this.close();
        }
    });
}



$('#btnVernoti').on('click', function () {

    mostrarNotifiacion();
    //swal("Mensaje", "Registro Exitoso credenciales enviado al correo Registrado", "success");
})