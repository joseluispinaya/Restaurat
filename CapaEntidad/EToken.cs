using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EToken
    {
        public int Idtokens { get; set; }
        public string Tokenus { get; set; }
        public int IdUsuario { get; set; }
        public bool Activo { get; set; }
    }
}
