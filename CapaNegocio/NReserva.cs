using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NReserva
    {
        #region "PATRON SINGLETON"
        private static NReserva daoEmpleado = null;
        private NReserva() { }
        public static NReserva getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NReserva();
            }
            return daoEmpleado;
        }
        #endregion

        public int RegistrarReservaNuevoIdclie(string Detalle)
        {
            return DReserva.getInstance().RegistrarReservaNuevoIdclie(Detalle);
        }

        public EReserva ObtenerDetalleReserva(int IdReserva)
        {
            return DReserva.getInstance().ObtenerDetalleReserva(IdReserva);
        }

        public EReserva ObtenerDetalleReservaIA(int IdReserva)
        {
            return DReserva.getInstance().ObtenerDetalleReservaIA(IdReserva);
        }
        public List<EReserva> ObtenerListaReserva()
        {
            return DReserva.getInstance().ObtenerListaReserva();
        }
        public bool CancelarReserva(int idReserva)
        {
            return DReserva.getInstance().CancelarReserva(idReserva);
        }
    }
}
