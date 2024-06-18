using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class frmCategorias : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECategoria>> ObtenerCategoProdu()
        {
            List<ECategoria> Lista = NCategoria.getInstance().ObtenerCategorias();
            //Lista = NTipos.getInstance().ObtenerRol();

            if (Lista != null)
            {
                return new Respuesta<List<ECategoria>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<ECategoria>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<List<EProducto>> ObtenerProduc()
        {
            List<EProducto> Lista = NProducto.getInstance().ObtenerProductos();
            //Lista = NUsuario.getInstance().ObtenerUsuarios();

            if (Lista != null)
            {
                return new Respuesta<List<EProducto>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EProducto>>() { estado = false, objeto = null };
            }
        }
    }
}