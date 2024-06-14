using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NUsuario
    {
        #region "PATRON SINGLETON"
        private static NUsuario daoEmpleado = null;
        private NUsuario() { }
        public static NUsuario getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NUsuario();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarUsuario(EUsuario oUsuario)
        {
            return DUsuario.getInstance().RegistrarUsuario(oUsuario);
        }
        public List<EUsuario> ObtenerUsuarios()
        {
            return DUsuario.getInstance().ObtenerUsuariosZ();
        }
        public int LoginUsuarioA(string Usuario, string Clave)
        {
            return DUsuario.getInstance().LoginUsuarioA(Usuario, Clave);
        }
    }
}
