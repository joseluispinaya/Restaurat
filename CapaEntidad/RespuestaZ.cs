using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class RespuestaZ<T>
    {
        public bool Estado { get; set; }
        public string Valor { get; set; }
        public T Objeto { get; set; }
        public string Mensage { get; set; }
    }
}
