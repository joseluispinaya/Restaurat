<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frmDocVenta.aspx.cs" Inherits="CapaPresentacion.frmDocVenta" %>

<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8" />
    <title>RESTAURANT J</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta content="Admin Dashboard" name="description" />
    <meta content="ThemeDesign" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

    <link href="assets/css/icons.css" rel="stylesheet" type="text/css"/>
    <link href="assets/css/style.css" rel="stylesheet" type="text/css"/>
    <style>
        .containera {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            /*border: 1px solid #000;*/
            padding: 20px;
            margin-bottom: 20px; /* Add some space between the two containers */
            box-sizing: border-box;
        }
        .sin-margin-bottom {
            margin-bottom: 0;
        }
    </style>
</head>
<body>
    <div style="font-size: 11px; text-align: right;">
        <center>
            <button type="button" id="Imprimir" class="btn btn-success" onclick="javascript:imprSelec('wrapper')"><i class="fa fa-print"></i> IMPRIMIR</button>
        </center>
        <br />
    </div>
    <div id="wrapper">
        <div class="containera">
            <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="invoice-title">
                                    <h4 class="float-right" id="tipodoc">BOLETA #12345</h4>
                                    <h3 class="m-t-0">RESTAURANT LA J</h3>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-5">
                                        <address>
                                            <strong>Cliente:</strong>
                                            <label id="lblnombre" class="sin-margin-bottom">JOSE LUIS</label><br>
                                            <strong>NRO CI:</strong>
                                            <label id="lblnroci" class="sin-margin-bottom"></label><br>
                                            <strong>Celular:</strong>
                                            <label id="lblcelu" class="sin-margin-bottom"></label><br>
                                            <strong>Direccion:</strong>
                                            <label id="lbldire" class="sin-margin-bottom"></label>
                                        </address>
                                    </div>
                                    <div class="col-7">
                                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title text-dark m-0"><strong>Order summary</strong></h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table id="tbDetalles" class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Precio</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <!-- end row -->
                    </div>
                    <!-- panel body -->
                </div>
                <!-- end panel -->

            </div>
            <!-- end col -->

        </div>
        </div>

        
    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/modernizr.min.js"></script>
    <script src="assets/js/detect.js"></script>
    <script src="assets/js/fastclick.js"></script>
    <script src="assets/js/jquery.slimscroll.js"></script>
    <script src="assets/js/jquery.blockUI.js"></script>
    <script src="assets/js/waves.js"></script>
    <script src="assets/js/wow.min.js"></script>
    <script src="assets/js/jquery.nicescroll.js"></script>
    <script src="assets/js/jquery.scrollTo.min.js"></script>

    <script src="assets/js/app.js"></script>

    <script type="text/javascript" language="javascript">

        $(document).ready(function () {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const IdVenta = urlParams.get('id')

            CargarDatos(IdVenta);
        });

        function CargarDatos($IdVenta) {

            $('#tbDetalles tbody').html('');

            var request = {
                IdVenta: $IdVenta
            };

            $.ajax({
                type: "POST",
                url: "frmVentaReserva.aspx/DetalleVenta",
                data: JSON.stringify(request),
                contentType: 'application/json; charset=utf-8',
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                },
                success: function (response) {
                    if (response.d.estado) {
                        $("#tipodoc").text(response.d.objeto.TipoDocumento + " - " + response.d.objeto.Codigo);
                        $("#lblnombre").text(response.d.objeto.oCliente.Nombre);


                        $("#lblnroci").text(response.d.objeto.oCliente.NumeroDocumento);
                        $("#lblcelu").text(response.d.objeto.oCliente.Telefono);
                        $("#lbldire").text(response.d.objeto.oCliente.Direccion);

                        $("#tbDetalles tbody").html("");

                        $.each(response.d.objeto.oListaDetalleVenta, function (i, row) {
                            $("<tr>").append(
                                $("<td>").text(row.NombreProducto),
                                $("<td>").text(row.Cantidad),
                                $("<td>").text(row.PrecioUnidad),
                                $("<td>").text(row.ImporteTotal)

                            ).appendTo("#tbDetalles tbody");

                        })
                    }
                }
            });

        }

        function imprSelec(nombre) {
            var printContents = document.getElementById(nombre).innerHTML;
            var originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
        function hide() {
            document.getElementById('Imprimir').style.visibility = "hidden";
        }

        window.addEventListener('beforeunload', function (e) {
            // Mensaje de confirmación
            var confirmationMessage = '¿Seguro que quieres salir?';
            (e || window.event).returnValue = confirmationMessage; // Gecko + IE
            return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
        });

        window.addEventListener('unload', function (e) {
            // Redirigir a frmReservas.aspx cuando el popup se cierre
            setTimeout(function () {
                window.close();
            }, 3000);
        });
    </script>
</body>
</html>
