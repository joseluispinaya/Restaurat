<%@ Page Title="" Language="C#" MasterPageFile="~/ClienteH/PaginaHome.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.ClienteH.Login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Inicio de Sesion
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="cargaa">
    <div class="col-md-4  offset-md-4">
        <div class="card bg-light">
            <div class="card-header justify-content-center">
                <span>
                    <i class="fas fa-check-circle"></i> Iniciar Sesión
                    <button class="btn btn-sm btn-primary float-right" type="button" id="btnIniciarSesiC"><i class="fas fa-user-plus"></i> Iniciar Sesión</button>
                </span>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label>Nro CI:</label>
                    <div>
                        <input type="text" class="form-control input-sm" id="txtuser" name="User">
                    </div>
                </div>
                <div class="mb-3">
                    <label>Contraseña:</label>
                    <div>
                        <input type="password" class="form-control input-sm" id="txtpassword" name="pswd">
                    </div>
                </div>
                <div>
                    <a class="waves-effect" href="frmRegistro.aspx">Crear una cuenta</a>
                <p><a class="waves-effect" href="#">¿Has olvidado tu contraseña?</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/Login.js" type="text/javascript"></script>
</asp:Content>
