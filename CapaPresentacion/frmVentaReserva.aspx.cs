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
    public partial class frmVentaReserva : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EProducto>> BuscarPro(string buscar)
        {
            List<EProducto> Lista = NProducto.getInstance().ObtenerProductosFil(buscar);
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

        [WebMethod]
        public static RespuestaZ<int> GuardarVentaIdCliente(string xml)
        {
            try
            {
                int respuesta = NVenta.getInstance().RegistrarVentaIdclieEstado(xml);
                if (respuesta != 0)
                {
                    return new RespuestaZ<int>() { Estado = true, Valor = respuesta.ToString() };
                }
                else
                {
                    return new RespuestaZ<int>() { Estado = false, Mensage = "No se pudo registrar la venta." };
                }
            }
            catch (Exception ex)
            {
                return new RespuestaZ<int>() { Estado = false, Mensage = $"Error al registrar la venta: {ex.Message}" };
            }
        }

        [WebMethod]
        public static Respuesta<EVenta> DetalleVenta(int IdVenta)
        {
            try
            {
                EVenta oVenta = NVenta.getInstance().ObtenerDetalleVenta(IdVenta);
                if (oVenta != null)
                {
                    return new Respuesta<EVenta>() { estado = true, objeto = oVenta };
                }
                else
                {
                    return new Respuesta<EVenta>() { estado = false, objeto = null, valor = "No se pudo encontrar la reserva" };
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new Respuesta<EVenta>() { estado = false, objeto = null, valor = ex.Message };
            }
        }
    }
}