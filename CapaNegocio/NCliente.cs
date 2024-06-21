using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCliente
    {
        #region "PATRON SINGLETON"
        private static NCliente daoEmpleado = null;
        private NCliente() { }
        public static NCliente getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NCliente();
            }
            return daoEmpleado;
        }
        #endregion

        public ECliente Login(string user, string pass)
        {
            return DCliente.getInstance().Login(user, pass);
        }
    }
}
