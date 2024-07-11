using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EMenu
    {
        public int IdMenu { get; set; }
        public string Nombre { get; set; }
        public string Icono { get; set; }
        public string Url { get; set; }
        public bool IsSubMenu { get; set; }
        public List<ESubMenu> oSubMenu { get; set; }
        public bool Activo { get; set; }
    }
}
