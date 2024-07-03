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
        public static Respuesta<List<ECategoria>> ObtenerCategoProdu(int idcate)
        {
            List<ECategoria> Lista = NCategoria.getInstance().ObtenerCategorias();

            if (Lista != null)
            {
                if (idcate != 0)
                {
                    // Filtrar la lista por el idcate
                    Lista = Lista.Where(c => c.IdCategoria == idcate).ToList();
                }

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