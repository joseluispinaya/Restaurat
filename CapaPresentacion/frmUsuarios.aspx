<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmUsuarios.aspx.cs" Inherits="CapaPresentacion.frmUsuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Aclonica&display=swap');
    
    .food-items-container {
        background: white;
        overflow: auto;
        /*height: calc(100vh - 86px);*/
    }
    .food-items {
        display: none;
    }
    .biryani-section {
        margin-top: 20px;
    }
    .category-name {
        margin: 10px;
        font-size: 35px;
        color: coral;
        font-family: 'Aclonica', sans-serif;
    }
    .item-card {
        width: 200px;
        height: 240px;
        padding: 10px;
        margin: 10px;
        display: inline-block;
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
    }

    .item-price {
        margin: 0;
        color: rgb(2, 27, 27);
        font-weight: 500;
        font-size: 16px;
    }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Usuarios
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
                <h4 class="m-t-0 m-b-30">Usuarios</h4>
                <div class="row mt-3">
                    <div class="col-sm-12">
                        <div class="food-items-container">
                            <div class="biryani-section">
                                <p class="category-name">Biryani</p>
                                <div class="item-card">
                                    <div class="card-top">
                                        <i class="fa fa-star rating">4.3</i>
                                        <i class="far fa-heart"></i>
                                    </div>
                                    <img src="assets/images/Ambur-Chicken-Biryani.jpg">
                                    <p class="item-name">Ambur Biryani</p>
                                    <p class="item-price">Price : $ 13</p>
                                </div>
                                <div class="item-card">
                                    <div class="card-top">
                                        <i class="fa fa-star rating">4.3</i>
                                        <i class="far fa-heart"></i>
                                    </div>
                                    <img src="assets/images/Chicken-Biryani-hyd.jpg">
                                    <p class="item-name">Hyderabadi Biryani</p>
                                    <p class="item-price">Price : $ 15</p>
                                </div>
                                <div class="item-card">
                                    <div class="card-top">
                                        <i class="fa fa-star rating">4.3</i>
                                        <i class="far fa-heart"></i>
                                    </div>
                                    <img src="assets/images/Ambur-Chicken-Biryani.jpg">
                                    <p class="item-name">Ambur Biryani</p>
                                    <p class="item-price">Price : $ 13</p>
                                </div>
                                <div class="item-card">
                                    <div class="card-top">
                                        <i class="fa fa-star rating">4.3</i>
                                        <i class="far fa-heart"></i>
                                    </div>
                                    <img src="assets/images/Chicken-Biryani-hyd.jpg">
                                    <p class="item-name">Hyderabadi Biryani</p>
                                    <p class="item-price">Price : $ 15</p>
                                </div>
                                <div class="item-card">
                                    <div class="card-top">
                                        <i class="fa fa-star rating">4.3</i>
                                        <i class="far fa-heart"></i>
                                    </div>
                                    <img src="assets/images/Ambur-Chicken-Biryani.jpg">
                                    <p class="item-name">Ambur Biryani</p>
                                    <p class="item-price">Price : $ 13</p>
                                </div>
                                <div class="item-card">
                                    <div class="card-top">
                                        <i class="fa fa-star rating">4.3</i>
                                        <i class="far fa-heart"></i>
                                    </div>
                                    <img src="assets/images/Chicken-Biryani-hyd.jpg">
                                    <p class="item-name">Hyderabadi Biryani</p>
                                    <p class="item-price">Price : $ 15</p>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
