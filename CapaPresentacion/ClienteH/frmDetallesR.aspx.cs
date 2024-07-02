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
    public partial class frmDetallesR : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static RespuestaZ<bool> CancelarReserva(int IdReserva)
        {
            try
            {
                if (IdReserva <= 0)
                {
                    return new RespuestaZ<bool> { Estado = false, Mensage = "Id de reserva no Puede ser Cero", Valor = "warning" };
                }

                var result = NReserva.getInstance().CancelarReserva(IdReserva);
                //var result = true;
                var respuesta = new RespuestaZ<bool>
                {
                    Estado = result,
                    Mensage = result ? "La Reserva fue cancelada correctamente" : "Error al Cancelar la Reserva",
                    Valor = result ? "success" : "warning"
                };
                return respuesta;
            }
            catch
            {
                // Respuesta de error genérica
                return new RespuestaZ<bool> { Estado = false, Mensage = "Ocurrió un error al cancelar la reserva. Intente más tarde.", Valor = "error" };
            }
        }
    }
}