using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Xml;
using System.Xml.Linq;

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

        [WebMethod]
        public static RespuestaZ<int> GuardarVentaIdCliente(string xml)
        {
            try
            {
                int respuesta = NVenta.getInstance().RegistrarVentaIdclie(xml);
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
        public static RespuestaZ<int> GuardarVenta(string xml)
        {
            try
            {
                // Cargar el XML en un XDocument
                XDocument xdoc = XDocument.Parse(xml);
                var nrodocumento = xdoc.Root.Element("DETALLE_CLIENTE")
                                  .Element("DATOS")
                                  .Element("NumeroDocumento").Value;

                List<ECliente> Lista = NCliente.getInstance().ObtenerClien();
                var item = Lista.FirstOrDefault(x => x.NumeroDocumento == nrodocumento);
                if (item != null)
                {
                    return new RespuestaZ<int>() { Estado = false, Mensage = "El numero de CI. ya se encuentra Registrado" };
                }

                int respuesta = NVenta.getInstance().RegistrarVentaNuev(xml);
                //int respuesta = 1;

                if (respuesta != 0)
                {
                    return new RespuestaZ<int>() { Estado = true, Valor = respuesta.ToString() };
                }
                else
                {
                    return new RespuestaZ<int>() { Estado = false, Mensage = "No se pudo registrar la venta." };
                }
            }
            catch (XmlException xmlEx)
            {
                return new RespuestaZ<int>() { Estado = false, Mensage = $"Error al procesar el XML: {xmlEx.Message}" };
            }
            catch (Exception ex)
            {
                return new RespuestaZ<int>() { Estado = false, Mensage = $"Error al registrar la venta: {ex.Message}" };
            }
        }
    }
}