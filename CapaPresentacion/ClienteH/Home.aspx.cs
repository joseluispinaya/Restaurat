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
        public static Respuesta<List<ECategoria>> ObtenerCatego()
        {
            List<ECategoria> Lista = NCategoria.getInstance().ObtenerCatego();
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
        public static RespuestaZ<int> GuardarReservaIdCliente(string xml)
        {
            try
            {
                //K3DK5CEC3Y4QGTCUHYG7A7EH
                //BDV3AVCGH3F8N8P5GTQXXJ2A
                //+12512202351
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

        [WebMethod]
        public static Respuesta<EReserva> ObtenerDetalleReserva(int IdReserva)
        {
            EReserva oReserva = new EReserva();
            oReserva = NReserva.getInstance().ObtenerDetalleReservaIA(IdReserva);
            if (oReserva != null)
                return new Respuesta<EReserva>() { estado = true, objeto = oReserva };
            else
                return new Respuesta<EReserva>() { estado = false, objeto = null };
        }

        [WebMethod]
        public static Respuesta<EReserva> DetalleReservaIA(int IdReserva)
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
                    return new Respuesta<EReserva>() { estado = false, objeto = null, valor = "Error al registrar la reserva" };
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