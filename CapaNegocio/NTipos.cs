using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NTipos
    {
        #region "PATRON SINGLETON"
        private static NTipos instancia = null;
        private NTipos() { }
        public static NTipos getInstance()
        {
            if (instancia == null)
            {
                instancia = new NTipos();
            }
            return instancia;
        }
        #endregion

        public List<ERol> ObtenerRol()
        {
            return DTipos.getInstance().ObtenerRol();
        }
        public List<EToken> ObtenerToken()
        {
            return DTipos.getInstance().ObtenerToken();
        }
        public bool ActualizarToken(EToken producto)
        {
            return DTipos.getInstance().ActualizarToken(producto);
        }
    }
}
