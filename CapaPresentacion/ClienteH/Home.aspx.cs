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
    public partial class Home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static RespuestaZ<int> GuardarReservaIdCliente(string xml)
        {
            try
            {
                int respuesta = NReserva.getInstance().RegistrarReservaNuevoIdclie(xml);
                if (respuesta != 0)
                {
                    return new RespuestaZ<int>() { Estado = true, Valor = respuesta.ToString() };
                }
                else
                {
                    return new RespuestaZ<int>() { Estado = false, Mensage = "No se pudo registrar la reserva." };
                }
            }
            catch (Exception ex)
            {
                return new RespuestaZ<int>() { Estado = false, Mensage = $"Error al registrar la reserva: {ex.Message}" };
            }
        }
    }
}