<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmProductos.aspx.cs" Inherits="CapaPresentacion.frmProductos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/productes.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Productos
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header justify-content-center">
                    <span>
                        <i class="fas fa-bell"></i> Productos
                        <button type="button" id="btnNuevoProd" class="btn btn-sm btn-success float-end" style="margin-left: 30px;">
                                <i class="fas fa-edit"></i> Nuevo Registro
                            </button>
                    </span>
                </div>
                <div class="card-body">
                    <div class="row mt-3">
                        <div class="col-sm-12">

                            <table id="tbProduct" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Foto</th>
                                        <th>Categoria</th>
                                        <th>Nombres</th>
                                        <th>Precio</th>
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

    <div class="modal fade bs-example-modal-lg" id="modalrolp" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabel">Producto</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <input id="txtIdProducto" class="model" name="IdProducto" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtNombrePr">Nombre</label>
                                    <input type="text" class="form-control input-sm model" id="txtNombrePr" name="Nombres">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtDescripcionPr">Descripcion</label>
                                    <input type="text" class="form-control input-sm model" id="txtDescripcionPr" name="Descripcion">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtPrecioPr">Precio</label>
                                    <input type="text" class="form-control input-sm model" id="txtPrecioPr" name="Precio">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="cboCatego">Categoria</label>
                                    <select class="form-control form-control-sm" id="cboCatego">
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="cboEstadoPr">Estado</label>
                                    <select class="form-control form-control-sm" id="cboEstadoPr">
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
                                <p>Seleccione Imagen</p>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="txtFotoP" accept="image/*">
                                    <label class="custom-file-label" for="txtFotoP">Ningún archivo seleccionado</label>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-12 text-center">
                                    <img id="imgUsuarioP" src="Imagenes/Sinfotop.png" alt="Foto usuario" style="height: 120px; max-width: 120px; border-radius: 50%;">
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambiosP" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/frmProductos.js" type="text/javascript"></script>
</asp:Content>
