<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmReservas.aspx.cs" Inherits="CapaPresentacion.frmReservas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/calen/fullcalendar.min.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Reservas
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="mostrarproductoss">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-2">
                            <h4 class="m-t-5 m-b-15">Crear Evento</h4>
                            <div class="m-t-5">
                                <input type="text" class="form-control new-event-form" placeholder="Add new event..." />
                            </div>
                        </div>
                        <div id="calendar" class="col-lg-10"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="modalrol" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabel">Informacion de Reserva</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-header bg-primary">
                                            <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Detalle Reserva</h3>
                                        </div>
                                        <div class="card-body">
                                            <input id="txtIdclienteAte" class="model" name="IdClientev" value="0" type="hidden" />
                                            <input id="txtIdReserrr" class="model" name="IdRserv" value="0" type="hidden" />
                                            <div class="form-row">
                                                <div class="form-group col-sm-5">
                                                    <input type="text" class="form-control input-sm" disabled id="txtNombreClienteat">
                                                </div>
                                                <div class="form-group col-sm-4">
                                                    <input type="text" class="form-control input-sm" disabled id="txtDocumentoClienteat">
                                                </div>
                                                <div class="form-group col-sm-3">
                                                    <input type="text" class="form-control input-sm" disabled id="txtcelu">
                                                </div>
                                            </div>

                                            <h4 class="m-t-0 m-b-10">Detalle Productos</h4>

                                            <div class="row">
                                                <div class="col-sm-12">

                                                    <table id="tbReservasaat" class="table table-striped table-bordered nowrap table-sm" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th>Producto Cantidad</th>
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
                                            <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Detalle Total</h3>
                                        </div>
                                        <div class="card-body">
                                            <div class="input-group m-b-15">
                                                <span class="input-group-addon">Registro:</span>
                                                <input type="text" class="form-control" id="txtregistro" disabled>
                                            </div>
                                            <div class="input-group m-b-15">
                                                <span class="input-group-addon">Para:</span>
                                                <input type="text" class="form-control" id="txtFechaReseat" disabled>
                                            </div>
                                            <div class="input-group m-b-15">
                                                <span class="input-group-addon">Total Bs.</span>
                                                <input type="text" class="form-control" id="txtTotalat" disabled>
                                            </div>
                                            
                                            <div class="form-row">
                                                <div class="form-group col-sm-12">
                                                    <textarea class="form-control" rows="2" disabled id="txtcomentarioat"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambiosat" type="button" class="btn btn-sm btn-primary">Generar atencion</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/calen/moment.min.js"></script>
    <script src="assets/calen/fullcalendar.min.js"></script>
    <script src="assets/calen/es.js"></script>
    <script src="js/frmReservas.js" type="text/javascript"></script>
</asp:Content>
