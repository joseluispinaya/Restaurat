using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class IniciarSesion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static int Iniciar(string Usuario, string Clave)
        {
            string ClaveEncri = Utilidadesj.getInstance().ConvertirSha256(Clave);

            int IdUsuario = NUsuario.getInstance().LoginUsuarioA(Usuario, ClaveEncri);
            Configuracion.oUsuario = new EUsuario() { IdUsuario = IdUsuario };
            return IdUsuario;
        }


    }
}