<%@ Page Title="" Language="C#" MasterPageFile="~/ClienteH/PaginaHome.Master" AutoEventWireup="true" CodeBehind="frmRegistro.aspx.cs" Inherits="CapaPresentacion.ClienteH.frmRegistro" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Formulario de Registro
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">

    <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10">
        <div class="card">
            <div class="card-header bg-primary">
                <h3 class="card-title m-0"><i class="fas fa-user-check"></i> Registro de usuario</h3>
            </div>
            <div class="card-body" id="loadd">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txtnumerodoc">Nro Documento</label>
                            <input type="text" class="form-control input-sm model" id="txtnumerodoc" name="Documento" placeholder="Nro Documento">
                        </div>
                        <div class="form-group">
                            <label for="txtnombre">Nombre Completo</label>
                            <input type="text" class="form-control input-sm model" id="txtnombre" name="Nombre" placeholder="Nombre completo">
                        </div>
                        <div class="form-group">
                            <label for="txtClave">Contraseña</label>
                            <input type="password" class="form-control input-sm model" id="txtClave" name="Contraseña" placeholder="Contraseña">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txtDireccion">Direccion</label>
                            <input type="text" class="form-control input-sm model" id="txtDireccion" name="Direccion" placeholder="Direccion">
                        </div>
                        <div class="form-group">
                            <label for="txtCelular">Nro Celular</label>
                            <input type="text" class="form-control input-sm model" id="txtCelular" name="Celular" placeholder="Nro Celular">
                        </div>
                        <br />
                        <div class="form-group text-center">
                            <button type="button" id="btnGuardarR" class="btn btn-success btn-sm"> Registrar</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/frmRegistro.js" type="text/javascript"></script>
</asp:Content>
