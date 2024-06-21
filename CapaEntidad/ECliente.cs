using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ECliente
    {
        public int IdCliente { get; set; }
        public string NumeroDocumento { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public bool Activo { get; set; }
        public string Clave { get; set; }
        public int IdRol { get; set; }
        public ERol oRol { get; set; }
    }
}
