<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmCategorias.aspx.cs" Inherits="CapaPresentacion.frmCategorias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Aclonica&display=swap');

        .food-items-container {
            background: white;
            overflow: auto;
        }

        .food-items {
            display: none;
        }

        .biryani-section {
            margin-top: 5px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around; /* Esto puede ayudarte a distribuir los elementos */
        }

        .category-name {
            width: 100%;
            margin: 10px;
            font-size: 20px;
            color: coral;
            font-family: 'Aclonica', sans-serif;
        }

        .item-card {
            width: 200px;
            height: 240px;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            background: rgb(253, 221, 226);
            cursor: pointer;
            transition: 0.5s all step-end;
        }

            .item-card:hover img {
                transform: scale(1.2);
            }

        .card-top {
            display: flex;
            margin: 5px 0;
            justify-content: space-between;
        }

        .rating {
            padding: 7px;
            color: goldenrod;
            background: black;
            font-size: 14px;
            border-radius: 15px;
        }

        .fa-heart {
            padding: 6px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
        }

        .item-card img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: auto;
            display: block;
            margin-bottom: 15px;
            transition: 0.5s all ease-in-out;
        }

        .item-name {
            margin: 5px 0;
            font-weight: 600;
            color: darkslategray;
            font-size: 16px;
            text-align: center;
        }

        .item-price {
            margin: 0;
            color: rgb(2, 27, 27);
            font-weight: 500;
            font-size: 16px;
            text-align: center;
        }
        .card-fod {
            display: flex;
            margin: 5px 0;
            justify-content: center;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Categorias
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-8">
            <div class="card">
                <div class="card-header justify-content-center">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="sr-only" for="lbldetalletotactu">Detalle</label>
                            <i class="fas fa-user-friends"></i>&nbsp;&nbsp;&nbsp;Reserva
                            <%--<label class="control-label" id="lbldetalletotactu">deee</label>--%>
                        </div>

                        <div class="form-group m-l-10">
                            <select class="form-control form-control-sm" id="cboCategor">
                            </select>
                        </div>
                        <div class="form-group m-l-10">
                            <%--<button id="btnregisbonoactu" type="button" class="btn btn-sm btn-success">Registrar Pago</button>--%>
                            <a href="#" class="btn btn-sm btn-success"><i class="fas fa-shopping-cart"></i> 0 Item</a>
                        </div>
                        
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="food-items-container">
                                <div class="biryani-section">
                                    <p class="category-name">Platos Especiales</p>
                                    <div class="item-card">
                                        <input id="txtIdProducto" type="hidden" />
                                        <div class="card-top">
                                            <a href="#"><i class="fas fa-shopping-cart rating">4.5</i></a>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/pacu.jpg">
                                        <p class="item-name">Pacu Asado</p>
                                        <p class="item-price">Precio : Bs 30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <%--<div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="food-items-container">
                                <div class="biryani-section">
                                    <p class="category-name">Platos Especiales</p>
                                    <div class="item-card">
                                        <input id="txtIdProducto" type="hidden" />
                                        <div class="card-top">
                                            <a href="#"><i class="fas fa-shopping-cart rating"> 4.5</i></a>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/pacu.jpg">
                                        <p class="item-name">Pacu Asado</p>
                                        <p class="item-price">Precio : Bs 30</p>
                                    </div>
                                    <div class="item-card">
                                        <div class="card-top">
                                            <i class="fa fa-star rating">4.3</i>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/Ambur-Chicken-Biryani.jpg">
                                        <p class="item-name">Arroz Cha Surubi</p>
                                        <p class="item-price">Precio : Bs 25</p>
                                    </div>
                                    <div class="item-card">
                                        <div class="card-top">
                                            <i class="fa fa-star rating">4.3</i>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/Chicken-Biryani-hyd.jpg">
                                        <p class="item-name">Hyderabadi Biryani</p>
                                        <p class="item-price">Precio : Bs 25</p>
                                    </div>
                                    <div class="item-card">
                                        <div class="card-top">
                                            <i class="fa fa-star rating">4.3</i>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/Ambur-Chicken-Biryani.jpg">
                                        <p class="item-name">Ambur Biryani</p>
                                        <p class="item-price">Precio : Bs 25</p>
                                    </div>
                                    <div class="item-card">
                                        <div class="card-top">
                                            <i class="fa fa-star rating">4.3</i>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/Chicken-Biryani-hyd.jpg">
                                        <p class="item-name">Hyderabadi Biryani</p>
                                        <p class="item-price">Precio : Bs 25</p>
                                    </div>
                                    <div class="item-card">
                                        <div class="card-top">
                                            <i class="fa fa-star rating">4.3</i>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/Ambur-Chicken-Biryani.jpg">
                                        <p class="item-name">Ambur Biryani</p>
                                        <p class="item-price">Precio : Bs 18</p>
                                    </div>
                                    <div class="item-card">
                                        <div class="card-top">
                                            <i class="fa fa-star rating">4.3</i>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/Chicken-Biryani-hyd.jpg">
                                        <p class="item-name">Hyderabadi Biryani</p>
                                        <p class="item-price">Precio : Bs 21</p>
                                    </div>
                                    <div class="item-card">
                                        <div class="card-top">
                                            <i class="fa fa-star rating">4.3</i>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <img src="assets/images/Chicken-Biryani-hyd.jpg">
                                        <p class="item-name">Hyderabadi Biryani</p>
                                        <p class="item-price">Precio : Bs 15</p>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>--%>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card">
                <div class="card-header justify-content-center">
                    <span>
                        <i class="fas fa-user-friends"></i> Detalle
                        <button type="button" id="btnNuevoRol" class="btn btn-sm btn-success float-end" style="margin-left: 30px;">
                                <i class="fas fa-user-plus"></i> Nuevo Registro
                            </button>
                    </span>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">

                            <table id="tbUsuario" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Producto</th>
                                        <th>Precio</th>
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
    <script src="js/frmCategorias.js" type="text/javascript"></script>
</asp:Content>
