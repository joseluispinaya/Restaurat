<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmVentaCaja.aspx.cs" Inherits="CapaPresentacion.frmVentaCaja" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/select2/select2.min.css" rel="stylesheet"/>
    <%--<link rel="stylesheet" href="assets/checkui.css">--%>
    <style>
        .select2 {
            width: 100% !important;
        }
        select:disabled {
            background-color: #e9ecef;
            cursor: not-allowed;
        }
        .input-reducido {
            width: 60px; /* Ajusta el valor según tus necesidades */
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 200px;
            height: 42px;
        }

            .switch input {
                /*opacity: 0;*/
                width: 0;
                height: 0;
            }

            .switch label {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #3292e0; /* NEGRO 1E1E1E */
                transition: .4s;
                border-radius: 25px;
            }

                .switch label::before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 60px;
                    left: 5px;
                    bottom: 4px;
                    background-color: #ff9800; /* AMARILLO */
                    transition: .4s;
                    border-radius: 20px;
                }

            .switch input:checked + label {
                background-color: #ff9800; /* AMARILLO */
            }

                .switch input:checked + label::before {
                    transform: translateX(130px);
                    background-color: #3292e0; /* negro */
                }

            .switch input:checked::before,
            .switch input:checked::after {
                color: #fff;
            }

            .switch input::before,
            .switch input::after {
                position: absolute;
                top: 50%;
                transform: translateY(-55%);
                font-weight: bolder;
                z-index: 2;
            }

            .switch input::before {
                content: "NO";
                left: 20px;
                color: #fff;
            }

            .switch input::after {
                content: "SI";
                right: 20px;
                color: #3292e0;  /* negro */
            }

            .switch input:checked::before {
                color: #1E1E1E;
            }

            .switch input:checked::after {
                color: #fff;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Caja
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="overlayc">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header bg-primary">
                            <h3 class="card-title m-0"><i class="fas fa-user"></i> Detalle Cliente</h3>
                        </div>
                        <div class="card-body">
                            <input id="txtIdclienteAtec" class="model" name="IdClientev" value="0" type="hidden" />

                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="cboBuscarCliente">Buscar Clente</label>
                                    <select class="form-control form-control-sm" id="cboBuscarCliente">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <div class="form-group col-sm-6 text-center">
                                    <label for="cboBusciente">Nuevo Clente</label><br />
                                    <span class="switch">
                                        <input type="checkbox" id="switcher">
                                        <label for="switcher"></label>
                                    </span>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-sm-3">
                                    <label for="txtDocumentoClienteat">Nro CI</label>
                                    <input type="text" class="form-control input-sm" id="txtDocumentoClienteat">
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="txtNombreClienteat">Nombre</label>
                                    <input type="text" class="form-control input-sm" id="txtNombreClienteat">
                                </div>
                                
                                <div class="form-group col-sm-2">
                                    <label for="txtcelu">Nro Celular</label>
                                    <input type="text" class="form-control input-sm" id="txtcelu">
                                </div>
                                <div class="form-group col-sm-3">
                                    <label for="txtdirecc">Direccion</label>
                                    <input type="text" class="form-control input-sm" id="txtdirecc">
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
                            <h3 class="card-title m-0"><i class="fas fa-tags"></i> Detalle Productos</h3>
                        </div>
                        <div class="card-body">
                            <div class="form-row">
                                <div class="form-group col-sm-12">
                                    <select class="form-control form-control-sm" id="cboBuscarProductov">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-12">

                                    <table id="tbVentaca" class="table table-striped table-sm">
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
                            <h3 class="card-title m-0"><i class="fas fa-money-bill-alt"></i> Detalle Reserva</h3>
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
                                <button type="button" id="btnTermiCaja" class="btn btn-success btn-sm btn-block">Terminar Venta</button>
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
    <script src="js/frmVentaCaja.js" type="text/javascript"></script>
</asp:Content>
