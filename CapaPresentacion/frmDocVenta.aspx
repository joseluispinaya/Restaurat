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
                                    <h4 class="float-right">BOLETA #12345</h4>
                                    <h3 class="m-t-0">RESTAURANT LA J</h3>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-5">
                                        <address>
                                            <strong>Nombre:</strong>
                                            <label id="lblnombrepcd">JOSE LUIS</label><br>
                                            <strong>Apellido:</strong>
                                            <label id="lblapellido">PINAYA</label><br>
                                            <strong>NRO CI:</strong>
                                            <label id="lblnroci"></label><br>
                                            <strong>Asociacion:</strong>
                                            <label id="lblasociacion"></label><br>
                                            <strong>Tipo Disca:</strong>
                                            <label id="lbltipodis"></label><br>
                                            <strong>Porcentaje:</strong>
                                            <label id="lblporcentaje"></label>
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
                                                        <td><strong>Item</strong></td>
                                                        <td class="text-center"><strong>Price</strong></td>
                                                        <td class="text-center"><strong>Quantity</strong>
                                                        </td>
                                                        <td class="text-right"><strong>Totals</strong></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- foreach ($order->lineItems as $line) or some such thing here -->
                                                    <tr>
                                                        <td>BS-200</td>
                                                        <td class="text-center">$10.99</td>
                                                        <td class="text-center">1</td>
                                                        <td class="text-right">$10.99</td>
                                                    </tr>
                                                    <tr>
                                                        <td>BS-400</td>
                                                        <td class="text-center">$20.00</td>
                                                        <td class="text-center">3</td>
                                                        <td class="text-right">$60.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>BS-1000</td>
                                                        <td class="text-center">$600.00</td>
                                                        <td class="text-center">1</td>
                                                        <td class="text-right">$600.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="thick-line"></td>
                                                        <td class="thick-line"></td>
                                                        <td class="thick-line text-center">
                                                            <strong>Subtotal</strong></td>
                                                        <td class="thick-line text-right">$670.99</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="no-line"></td>
                                                        <td class="no-line"></td>
                                                        <td class="no-line text-center">
                                                            <strong>Shipping</strong></td>
                                                        <td class="no-line text-right">$15</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="no-line"></td>
                                                        <td class="no-line"></td>
                                                        <td class="no-line text-center">
                                                            <strong>Total</strong></td>
                                                        <td class="no-line text-right">
                                                            <h4 class="m-0">$685.99</h4>
                                                        </td>
                                                    </tr>
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
</body>
</html>
