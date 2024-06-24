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
                    <h4 class="modal-title m-0" id="myLargeModalLabel">Usuarios</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <input id="txtIdUsuarioc" class="model" name="IdUsuario" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtNombre">Nombre</label>
                                    <input type="text" class="form-control input-sm model" id="txtNombresc" name="Nombres">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtApellidos">Apellidos</label>
                                    <input type="text" class="form-control input-sm model" id="txtApellidosc" name="Apellidos">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="cboEstado">Estado</label>
                                    <select class="form-control form-control-sm" id="cboEstadoc">
                                        <option value="1">Activo</option>
                                        <option value="0">No Activo</option>
                                    </select>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtOcupacion">Fecha Actual</label>
                                    <input type="text" class="form-control input-sm" id="txtFechaac" readonly name="ocupacion" />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <p>Seleccione Foto</p>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="txtFotoSc" accept="image/*">
                                    <label class="custom-file-label" for="txtFotoS">Ningún archivo seleccionado</label>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-12 text-center">
                                    <img id="imgUsuarioMc" src="Imagenes/Sinfotop.png" alt="Foto usuario" style="height: 120px; max-width: 120px; border-radius: 50%;">
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambiosc" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/calen/moment.min.js"></script>
    <script src="assets/calen/fullcalendar.min.js"></script>
    <script src="assets/calen/es.js"></script>
    <script src="js/frmReservas.js" type="text/javascript"></script>
</asp:Content>
