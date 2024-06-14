using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EUsuario
    {
        public int IdUsuario { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public string Clave { get; set; }
        public string Foto { get; set; }
        public int IdRol { get; set; }
        public bool Estado { get; set; }
        public ERol oRol { get; set; }
        public string ImageFull => string.IsNullOrEmpty(Foto)
            ? $"/Imagenes/Sinfotop.png"
            : Foto;
    }
}
