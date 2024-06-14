<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmUsuarios.aspx.cs" Inherits="CapaPresentacion.frmUsuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .buttons-excel {
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Usuarios
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header justify-content-center">
                    <span>
                        <i class="fas fa-user-friends"></i> Usuarios
                        <button type="button" id="btnNuevoRol" class="btn btn-sm btn-success float-end" style="margin-left: 30px;">
                                <i class="fas fa-user-plus"></i> Nuevo Registro
                            </button>
                    </span>
                </div>
                <div class="card-body">
                    <div class="row mt-3">
                        <div class="col-sm-12">

                            <table id="tbUsuario" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Foto</th>
                                        <th>Rol</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Correo</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr />
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
                    <input id="txtIdUsuario" class="model" name="IdUsuario" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtNombre">Nombre</label>
                                    <input type="text" class="form-control input-sm model" id="txtNombres" name="Nombres">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtApellidos">Apellidos</label>
                                    <input type="email" class="form-control input-sm model" id="txtApellidos" name="Apellidos">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtCorreo">Correo</label>
                                    <input type="text" class="form-control input-sm model" id="txtCorreo" name="Correo">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="cboRol">Rol</label>
                                    <select class="form-control form-control-sm" id="cboRol">
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="cboEstado">Estado</label>
                                    <select class="form-control form-control-sm" id="cboEstado">
                                        <option value="1">Activo</option>
                                        <option value="0">No Activo</option>
                                    </select>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtOcupacion">Fecha Actual</label>
                                    <input type="text" class="form-control input-sm" id="txtFechaa" readonly name="ocupacion" />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            
                            <div class="form-group">
                                <p>Seleccione Foto</p>
                                <input type="file" id="txtFoto" accept="image/*" class="filestyle" data-buttonbefore="true">
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-12 text-center">
                                    <img id="imgUsuarioM" src="Imagenes/Sinfotop.png" alt="Foto usuario" style="height: 120px; max-width: 120px; border-radius: 50%;">
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/bootstrap-filestyle/js/bootstrap-filestyle.min.js" type="text/javascript"></script>
    <script src="js/frmUsuarios.js" type="text/javascript"></script>
</asp:Content>
