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
    public partial class frmConsultaVenta : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EVenta>> ObtenerListad(string fechainicio, string fechafin)
        {
            DateTime desde = Convert.ToDateTime(fechainicio);
            DateTime hasta = Convert.ToDateTime(fechafin);


            List<EVenta> listaCompleta = NVenta.getInstance().ObtenerListaVentaa();
            List<EVenta> listaFiltrada = listaCompleta
                .Where(venta => venta.VFechaRegistro >= desde && venta.VFechaRegistro <= hasta)
                .ToList();

            if (listaFiltrada != null)
            {
                return new Respuesta<List<EVenta>>() { estado = true, objeto = listaFiltrada };
            }
            else
            {
                return new Respuesta<List<EVenta>>() { estado = false, objeto = null };
            }
        }
        [WebMethod]
        public static Respuesta<List<EVenta>> ObtenerLista(string fechainicio, string fechafin)
        {
            try
            {
                //DateTime desde = Convert.ToDateTime(fechainicio);
                //DateTime hasta = Convert.ToDateTime(fechafin);
                DateTime desde = Convert.ToDateTime(fechainicio).Date;
                DateTime hasta = Convert.ToDateTime(fechafin).Date;

                // Obtén la lista completa de ventas
                List<EVenta> listaCompleta = NVenta.getInstance().ObtenerListaVentaa();

                // Filtra la lista usando LINQ
                List<EVenta> listaFiltrada = listaCompleta
                    .Where(venta => venta.VFechaRegistro.Date >= desde && venta.VFechaRegistro.Date <= hasta)
                    .ToList();

                // Retorna la lista filtrada
                return new Respuesta<List<EVenta>>() { estado = true, objeto = listaFiltrada };
            }
            catch (Exception ex)
            {
                // Maneja la excepción y retorna una respuesta de error
                return new Respuesta<List<EVenta>>() { estado = false, valor = "Error al obtener la lista de ventas: " + ex.Message, objeto = null };
            }
        }

    }
}