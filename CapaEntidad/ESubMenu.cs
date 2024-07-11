using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ESubMenu
    {
        public int IdSubMenu { get; set; }
        public int IdMenu { get; set; }
        public string Nombre { get; set; }
        public string NombreFormulario { get; set; }

        // ayuda url con extencion
        //public string NombreFormularioUrl => $"{NombreFormulario}.aspx";
    }
}
