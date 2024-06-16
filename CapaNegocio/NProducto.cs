using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NProducto
    {
        #region "PATRON SINGLETON"
        private static NProducto instancia = null;
        private NProducto() { }
        public static NProducto getInstance()
        {
            if (instancia == null)
            {
                instancia = new NProducto();
            }
            return instancia;
        }
        #endregion

        public bool RegistrarProducto(EProducto producto)
        {
            return DProducto.getInstance().RegistrarProducto(producto);
        }

        public List<EProducto> ObtenerProductos()
        {
            return DProducto.getInstance().ObtenerProductos();
        }
    }
}
