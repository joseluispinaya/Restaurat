<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmCategorias.aspx.cs" Inherits="CapaPresentacion.frmCategorias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .buttons-excel{
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Categorias
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header justify-content-center">
                    <span>
                        <i class="fas fa-user-friends"></i>  Categorias
                        <button type="button" id="btnNuevoCate" class="btn btn-sm btn-success float-end" style="margin-left: 30px;">
                            <i class="fas fa-user-plus"></i>  Nuevo Registro
                           
                        </button>
                        <button type="button" id="btnVernoti" class="btn btn-sm btn-danger" style="margin-left: 30px;">
                            <i class="fas fa-bell"></i>  Ver Notificacion
                        </button>
                    </span>
                </div>
                <div class="card-body">
                    <div class="row mt-3">
                        <div class="col-sm-12">

                            <table id="tbCategoria" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Descripcion</th>
                                        <th>Estado</th>
                                        <th>Cant Productos</th>
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

    <div id="custom-width-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title m-0" id="custom-width-modalLabel">Categoria</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <input id="txtIdCateg" class="model" name="IdCategoria" value="0" type="hidden" />
                <div class="form-row">
                    <div class="form-group col-sm-6">
                        <label for="txtDescripcion">Descripcion</label>
                        <input type="text" class="form-control input-sm model" id="txtDescripcion"  name="Descripcion">
                    </div>
                    <div class="form-group col-sm-6">
                        <label for="cboEstado">Estado</label>
                        <select class="form-control form-control-sm" id="cboEstado">
                            <option value="1">Activo</option>
                            <option value="0">No Activo</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Cerrar</button>
                <button id="btnGuardarCambios" type="button" class="btn btn-primary waves-effect waves-light">Guardar Cambios</button>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/js/push.min.js"></script>
    <script src="js/frmCategorias.js" type="text/javascript"></script>
</asp:Content>
