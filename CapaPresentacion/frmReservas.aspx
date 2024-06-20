﻿<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmReservas.aspx.cs" Inherits="CapaPresentacion.frmReservas" %>
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
    Panel de Reservas
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="mostrarproductoss">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header justify-content-center">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="sr-only" for="lbldetalletotactu">Detalle</label>
                            <i class="fas fa-user-friends"></i>&nbsp;&nbsp;&nbsp;Registrar Reserva
                        </div>

                        <div class="form-group m-l-10">
                            <select class="form-control form-control-sm" id="cboCategor">
                            </select>
                        </div>
                        <div class="form-group m-l-10">
                            <a id="vercarrit" class="btn btn-sm btn-success"><i class="fas fa-cart-plus"></i> 0 Item</a>
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
            </div>
        </div>
    </div>

    <div class="row" id="mostrarcarrito">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header justify-content-center">
                            <span>
                                <i class="fas fa-user-friends"></i>Detalle Cliente
                            <button type="button" id="btnEjemplo" class="btn btn-sm btn-success float-right">
                                <i class="fas fa-user-plus"></i> Ver Productos
                            </button>
                            </span>
                        </div>
                        <div class="card-body">
                            <input id="txtIdclientev" class="model" name="IdClientev" value="0" type="hidden" />
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <input type="text" class="form-control form-control-sm" disabled id="txtNombreCliente">
                                </div>
                                <div class="form-group col-sm-6">
                                    <input type="text" class="form-control form-control-sm" id="txtDocumentoCliente" placeholder="numero documento">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header justify-content-center">
                            <span>
                                <i class="fas fa-user-friends"></i>Detalle Productos
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12">

                                    <table id="tbReservasa" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th></th>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header justify-content-center">
                            <span>
                                <i class="fas fa-user-friends"></i>Detalle Reserva
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupSubTotal">Sub Total</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupSubTotal" id="txtSubTotal" disabled>
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupTotal">Total</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupTotal" id="txtTotal" disabled>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-12">
                                    <textarea class="form-control" rows="3" id="txtcomentario"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group mb-0">
                                <button type="button" id="btnTerminarVentar" class="btn btn-success btn-sm btn-block">Terminar Venta</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/frmReservas.js" type="text/javascript"></script>
</asp:Content>
