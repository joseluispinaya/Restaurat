using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;

namespace CapaPresentacion.ClienteH
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static Respuesta<ECliente> IniciarCli(string Usuario, string Clave)
        {
            try
            {
                var oClient = NCliente.getInstance().Login(Usuario, Clave);
                return oClient != null
                    ? new Respuesta<ECliente> { estado = true, objeto = oClient }
                    : new Respuesta<ECliente> { estado = false, objeto = null };
            }
            catch (Exception ex)
            {
                return new Respuesta<ECliente>
                {
                    estado = false,
                    objeto = null,
                    valor = "Ocurrió un error: " + ex.Message
                };
            }
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