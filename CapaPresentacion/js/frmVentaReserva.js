
$(document).ready(function () {
    cargarPro();

})
function cargarPro() {

    $("#cboBuscarProducto").select2({
        ajax: {
            url: "frmVentaReserva.aspx/BuscarPro",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ buscar: params.term });
            },
            processResults: function (data) {

                return {
                    results: data.d.objeto.map((item) => ({
                        id: item.IdProducto,
                        text: item.Nombre,
                        ImageFulP: item.ImageFulP,
                        PrecioUnidadVenta: parseFloat(item.PrecioUnidadVenta)
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar Producto',
        minimumInputLength: 1,
        templateResult: formatoResultados
    });
}

function formatoResultados(data) {
    // Esto es por defecto, ya que muestra el "buscando..."
    if (data.loading)
        return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td style="width:60px">
                    <img style="height:60px;width:60px;margin-right:10px" src="${data.ImageFulP}"/>
                </td>
                <td>
                    <p style="font-weight: bolder;margin:2px">${data.PrecioUnidadVenta}</p>
                    <p style="margin:2px">${data.text}</p>
                </td>
            </tr>
        </table>`
    );

    return contenedor;
}

$("#cboBuscarProducto").on("select2:select", function (e) {
    const data = e.params.data;

    console.log(data);
})