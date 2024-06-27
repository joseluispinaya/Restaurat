<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmVentaReserva.aspx.cs" Inherits="CapaPresentacion.frmVentaReserva" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/select2/select2.min.css" rel="stylesheet"/>
    <style>
        .select2 {
            width: 100% !important;
        }
        .input-reducido {
            width: 60px; /* Ajusta el valor según tus necesidades */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Registro Venta
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header bg-primary">
                            <h3 class="card-title m-0"><i class="fas fa-user"></i> Detalle Cliente</h3>
                        </div>
                        <div class="card-body">
                            <input id="txtIdclienteAte" class="model" name="IdClientev" value="0" type="hidden" />
                            <div class="form-row">
                                <div class="form-group col-sm-5">
                                    <label for="txtNombreClienteat">Nombre</label>
                                    <input type="text" class="form-control input-sm" disabled id="txtNombreClienteat">
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="txtDocumentoClienteat">Nro CI</label>
                                    <input type="text" class="form-control input-sm" disabled id="txtDocumentoClienteat">
                                </div>
                                <div class="form-group col-sm-3">
                                    <label for="txtcelu">Nro Celular</label>
                                    <input type="text" class="form-control input-sm" disabled id="txtcelu">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header bg-primary">
                            <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Detalle Productos</h3>
                        </div>
                        <div class="card-body">
                            <div class="form-row">
                                <div class="form-group col-sm-12">
                                    <select class="form-control form-control-sm" id="cboBuscarProducto">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">

                                    <table id="tbReservasa" class="table table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th></th>
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
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header bg-primary">
                            <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Detalle Reserva</h3>
                        </div>
                        <div class="card-body">
                            <div class="input-group m-b-15">
                                <span class="input-group-addon">Fecha:</span>
                                <input type="text" class="form-control" id="txtFechaRese" disabled>
                            </div>
                            <div class="input-group m-b-15">
                                <span class="input-group-addon">Sub Total Bs.</span>
                                <input type="text" class="form-control" id="txtSubTotal" disabled>
                            </div>
                            <div class="input-group m-b-15">
                                <span class="input-group-addon">Total Bs.</span>
                                <input type="text" class="form-control" id="txtTotal" disabled>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group mb-0">
                                <button type="button" id="btnTerminarvent" class="btn btn-success btn-sm btn-block">Terminar Venta</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/select2/select2.min.js"></script>
    <script src="assets/select2/es.min.js"></script>
    <script src="js/frmVentaReserva.js" type="text/javascript"></script>
</asp:Content>
