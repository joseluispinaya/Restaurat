using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCategoria
    {
        #region "PATRON SINGLETON"
        private static NCategoria instancia = null;
        private NCategoria() { }
        public static NCategoria getInstance()
        {
            if (instancia == null)
            {
                instancia = new NCategoria();
            }
            return instancia;
        }
        #endregion

        public List<ECategoria> ObtenerCatego()
        {
            return DCategoria.getInstance().ObtenerCatego();
        }
        public List<ECategoria> ObtenerCategorias()
        {
            return DCategoria.getInstance().ObtenerCategorias();
        }
    }
}
