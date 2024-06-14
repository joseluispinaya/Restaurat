<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="IniciarSesion.aspx.cs" Inherits="CapaPresentacion.IniciarSesion" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <title>Acceso al Sistema</title>
    <link href="assets/style.css" rel="stylesheet" />
</head>
<body>
    <div class="container">
    
        <div class="main">  
            <form id="form1" runat="server">
            <input type="checkbox" id="chk" aria-hidden="true"/>
    
            <div class="login">
                <div class="form">
                    <label for="chk" aria-hidden="true">CABAÑA LA JOTA</label>
                    <input class="input" type="text" name="email" id="username" placeholder="Usuario" value="susidelta1@gmail.com"/>
                    <input class="input" type="password" name="pswd" id="password" placeholder="Contraseña" value="777edf"/>
                    <button type="button" id="btnIniciarSesion">Iniciar</button>
                </div>
            </div>
    
            <div class="register">
                <div class="form">
                    <label for="chk" aria-hidden="true">Olvido su Clave</label>
                    <input class="inputs" type="email" name="email" id="cooree" placeholder="Correo"/>
                    <input class="inputs" type="text" name="txt" placeholder="Num Celular"/>
                    <br />
                    <h3 class="labeljo">Revice su Correo Electronico</h3>
                    <button type="button" id="btnRecupe">Recuperar</button>
                </div>
            </div>
            </form>
        </div>
    
</div>
    <script src="assets/js/jquery.min.js"></script>
    <%--<script src="js/IniciarSesion.js" type="text/javascript"></script>--%>
    <script src="assets/plugins/loadingoverlay/loadingoverlay.js"></script>
    <link href="assets/plugins/bootstrap-sweetalert/sweet-alert.css" rel="stylesheet" type="text/css"/>
    <script src="assets/plugins/bootstrap-sweetalert/sweet-alert.min.js"></script>
    <script src="js/IniciarSesion.js" type="text/javascript"></script>
</body>
</html>
