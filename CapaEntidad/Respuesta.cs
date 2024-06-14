using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class Respuesta<T>
    {
        public bool estado { get; set; }
        public string valor { get; set; }
        public T objeto { get; set; }
    }
}
