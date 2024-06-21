<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmUsuarios.aspx.cs" Inherits="CapaPresentacion.frmUsuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .buttons-excel {
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
        .custom-file {
            position: relative;
            display: inline-block;
            width: 100%;
            height: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .custom-file-input {
            position: absolute;
            width: 100%;
            height: 2.5rem;
            margin: 0;
            opacity: 0;
            cursor: pointer;
        }
        
        .custom-file-label {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1;
            height: 2.5rem;
            padding: .5rem .75rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            cursor: pointer;
        }
        
        .custom-file-label::after {
            content: "Seleccione";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
            display: block;
            height: 2.5rem;
            padding: .5rem .75rem;
            line-height: 1.5;
            color: #fff;
            background-color: #6c757d;
            border-left: inherit;
            border-radius: 0 .25rem .25rem 0;
        }
        
        .custom-file-input:lang(en) ~ .custom-file-label::after {
            content: "Browse";
        }
        
        .custom-file-input:focus ~ .custom-file-label {
            border-color: #80bdff;
            box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .25);
        }
        
        .custom-file-input:focus ~ .custom-file-label::after {
            border-color: inherit;
            box-shadow: none;
        }
        
        .custom-file-input::file-selector-button {
            border: none;
            border-radius: 0;
            margin: 0;
            padding: 0;
            width: 0;
            height: 0;
            overflow: hidden;
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
                                    <input type="text" class="form-control input-sm model" id="txtApellidos" name="Apellidos">
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
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="txtFotoS" accept="image/*">
                                    <label class="custom-file-label" for="txtFotoS">Ningún archivo seleccionado</label>
                                </div>
                            </div>
                            <%--<div class="form-group">
                                <p>Seleccione Foto</p>
                                <input type="file" id="txtFotoSa" accept="image/*" class="filestyle" data-buttonbefore="true">
                                <input class="form-control" type="file" id="txtFotoS" accept="image/*" />
                            </div>--%>
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
