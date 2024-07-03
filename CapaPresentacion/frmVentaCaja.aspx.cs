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
    public partial class frmVentaCaja : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECliente>> BuscarClie(string buscar)
        {
            List<ECliente> Lista = NCliente.getInstance().ObtenerClienFil(buscar);

            if (Lista != null)
            {
                return new Respuesta<List<ECliente>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<ECliente>>() { estado = false, objeto = null };
            }
        }
    }
}