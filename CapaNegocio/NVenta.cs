using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NVenta
    {
        #region "PATRON SINGLETON"
        private static NVenta daoEmpleado = null;
        private NVenta() { }
        public static NVenta getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NVenta();
            }
            return daoEmpleado;
        }
        #endregion

        public int RegistrarVentaIdclie(string Detalle)
        {
            return DVenta.getInstance().RegistrarVentaIdclie(Detalle);
        }

        public int RegistrarVentaIdclieEstado(string Detalle)
        {
            return DVenta.getInstance().RegistrarVentaIdclieEstado(Detalle);
        }
        public EVenta ObtenerDetalleVenta(int IdVenta)
        {
            return DVenta.getInstance().ObtenerDetalleVenta(IdVenta);
        }
        public List<EVenta> ObtenerListaVentaa()
        {
            return DVenta.getInstance().ObtenerListaVentaa();
        }
    }
}
