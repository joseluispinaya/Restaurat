<%@ Page Title="" Language="C#" MasterPageFile="~/ClienteH/PaginaHome.Master" AutoEventWireup="true" CodeBehind="frmDetallesR.aspx.cs" Inherits="CapaPresentacion.ClienteH.frmDetallesR" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .sin-margin-bottom {
            margin-bottom: 0;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Detalle Reserva
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">

<div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header justify-content-center">
                    <%--<h3 class="card-title text-dark m-0"><i class="fas fa-star"></i><strong>  RESERVAS</strong></h3>--%>

                    <span>
                        <i class="fas fa-bell"></i> Productos
                        <button type="button" id="btnCancelar" class="btn btn-sm btn-danger float-end" style="margin-left: 30px;">
                                <i class="fas fa-trash"></i> Cancelar
                            </button>
                        <a class="btn btn-sm btn-success float-end" href="frmMisReservas.aspx"><i class="fas fa-reply"></i> Regresar</a>
                    </span>
                </div>
                <div class="card-body">
                    <input id="txtIdReserrvd" class="model" name="IdReser" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="row m-b-0 m-t-5">
                                        <div class="col-4">
                                            <address>
                                                <strong>Nom. Cliente:</strong><br>
                                                <strong>Nro Documento:</strong><br>
                                                <strong>Nro Celular:</strong><br>
                                                <strong>Direccion:</strong>
                                            </address>
                                        </div>
                                        <div class="col-8">
                                            <address>
                                                <label id="lblnamecli" class="sin-margin-bottom">joseeeeeeeeee</label><br>
                                                <label id="lblnroci" class="sin-margin-bottom">joseeeeeeeeee</label><br>
                                                <label id="lblcelua" class="sin-margin-bottom"></label><br>
                                                <label id="lblubica" class="sin-margin-bottom"></label>
                                            </address>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="row m-b-0 m-t-5">
                                        <div class="col-4">
                                            <address>
                                                <strong>Estado:</strong><br>
                                                <strong>Nro Reserva:</strong><br>
                                                <strong>Fecha Reserva:</strong><br>
                                                <strong>Comentario:</strong><br>
                                                <strong>Cantidad:</strong><br>
                                                <strong>Total:</strong>
                                            </address>
                                        </div>
                                        <div class="col-8">
                                            <address>
                                                <label id="lblestados" class="sin-margin-bottom">joseeeeeeeeee</label><br>
                                                <label id="lblcodre" class="sin-margin-bottom">joseeeeeeeeee</label><br>
                                                <label id="lblfechres" class="sin-margin-bottom"></label><br>
                                                <label id="lblcoment" class="sin-margin-bottom"></label><br>
                                                <label id="lblcanti" class="sin-margin-bottom"></label><br>
                                                <label id="lbltot" class="sin-margin-bottom"></label>
                                            </address>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">

                            <table id="tbmispedid" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Nro</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Total</th>
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
    <script src="js/frmDetallesR.js" type="text/javascript"></script>
</asp:Content>
