using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace CapaPresentacion.ClienteH
{
    public partial class frmMisReservas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EReserva>> Obtener(int IdCliente)
        {
            List<EReserva> Lista = NReserva.getInstance().ObtenerListaReserva();

            if (Lista != null)
            {
                List<EReserva> listaFiltrada = Lista.Where(r => r.oCliente.IdCliente == IdCliente).ToList();
                if (listaFiltrada.Count > 0)
                {
                    return new Respuesta<List<EReserva>>() { estado = true, objeto = listaFiltrada };
                }
                else
                {
                    return new Respuesta<List<EReserva>>() { estado = false, objeto = null, valor = "No se encontraron reservas para este cliente." };
                }
                //return new Respuesta<List<EReserva>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EReserva>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<EReserva> DetalleReserva(int IdReserva)
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