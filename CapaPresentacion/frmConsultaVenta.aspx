<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmConsultaVenta.aspx.cs" Inherits="CapaPresentacion.frmConsultaVenta" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Consulta
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="overlays">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header bg-primary">
                <h3 class="card-title m-0"><i class="fas fa-user"></i> Detalle Cliente</h3>
            </div>
            <div class="card-body">
                <div class="form-row">
                    <div class="form-group col-sm-2">

                    </div>
                    <div class="form-group col-sm-3">
                        <label for="txtfeini">Desde</label>
                        <input type="text" class="form-control input-sm" id="txtfeini" autocomplete="off">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="txtfechfin">Hasta</label>
                        <input type="text" class="form-control input-sm" id="txtfechfin" autocomplete="off">
                    </div>
                    <div class="form-group col-sm-2 text-center">
                        <label for="txtcelu">Buscar</label><br />
                        <button type="button" id="btnBuscara" class="btn btn-sm btn-success float-end" style="margin-left: 30px;">
                            <i class="fas fa-user-plus"></i> Buscar
                        </button>
                    </div>
                    <div class="form-group col-sm-2">

                    </div>
                </div>
                <hr />
                <div class="row mt-3">
                        <div class="col-sm-12">

                            <table id="tbVencon" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Tipo Documento</th>
                                        <th>Codigo Documento</th>
                                        <th>Fecha Creacion</th>
                                        <th>Documento Cliente</th>
                                        <th>Nombre Cliente</th>
                                        <th>Total Venta</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/frmConsultaVenta.js" type="text/javascript"></script>
</asp:Content>
