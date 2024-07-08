<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmCategorias.aspx.cs" Inherits="CapaPresentacion.frmCategorias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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
                        <i class="fas fa-user-friends"></i>Categorias
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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/js/push.min.js"></script>
    <script src="js/frmCategorias.js" type="text/javascript"></script>
</asp:Content>
