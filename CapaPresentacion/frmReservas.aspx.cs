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
    public partial class frmReservas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static Respuesta<List<EReserva>> Obtener()
        {
            List<EReserva> Lista = NReserva.getInstance().ObtenerListaReserva();
            //Lista = NUsuario.getInstance().ObtenerUsuarios();

            if (Lista != null)
            {
                return new Respuesta<List<EReserva>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EReserva>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<EReserva> DetalleReservaCale(int IdReserva)
        {
            try
            {
                EReserva oReserva = NReserva.getInstance().ObtenerDetalleReservaIA(IdReserva);
                if (oReserva != null)
                {
                    return new Respuesta<EReserva>() { estado = true, objeto = oReserva };
                }
                else
                {
                    return new Respuesta<EReserva>() { estado = false, objeto = null, valor = "No se pudo encontrar la reserva" };
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new Respuesta<EReserva>() { estado = false, objeto = null, valor = ex.Message };
            }
        }
    }
}