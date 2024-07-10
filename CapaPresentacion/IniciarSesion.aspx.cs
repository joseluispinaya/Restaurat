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
            Response.AppendHeader("Cache-Control", "no-store");
        }
        [WebMethod]
        public static Respuesta<int> Iniciar(string Usuario, string Clave)
        {
            try
            {
                var ClaveEncri = Utilidadesj.getInstance().ConvertirSha256(Clave);

                int IdUsuario = NUsuario.getInstance().LoginUsuarioA(Usuario, ClaveEncri);
                
                if (IdUsuario != 0)
                {
                    Configuracion.oUsuario = new EUsuario() { IdUsuario = IdUsuario };
                    return new Respuesta<int>() { estado = true, valor = IdUsuario.ToString() };
                }
                else
                {
                    return new Respuesta<int>() { estado = false };
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<int>() { estado = false, valor = "Ocurrió un error: " + ex.Message };
            }
            
        }

        [WebMethod]
        public static RespuestaZ<bool> EnviarCorreo(string correo)
        {
            try
            {
                string clavegenerada = Utilidadesj.getInstance().GenerarClave();
                string ClaveEncri = Utilidadesj.getInstance().ConvertirSha256(clavegenerada);

                List<EUsuario> Lista = NUsuario.getInstance().ObtenerUsuarios();
                var items = Lista.FirstOrDefault(x => x.Correo == correo);

                if (items == null)
                {
                    return new RespuestaZ<bool>()
                    {
                        Estado = false,
                        Mensage = "El correo ingresado no existe",
                        Valor = "error"
                    };
                }

                items.Clave = ClaveEncri;
                bool Respuesta = NUsuario.getInstance().ActualizarUsuario(items);

                if (!Respuesta)
                {
                    return new RespuestaZ<bool>()
                    {
                        Estado = false,
                        Mensage = "Ocurrio un Error intente mas tarde",
                        Valor = "error"
                    };
                }

                bool enviocorr = EnviarCorreoRecuperacion(items.Correo, clavegenerada);

                return new RespuestaZ<bool>
                {
                    Estado = enviocorr,
                    Mensage = enviocorr ? "Se envio las Credenciales a su Correo" : "Ocurrio un error en el envio intente mas tarde",
                    Valor = enviocorr ? "success" : "warning"
                };
            }
            catch (Exception ex)
            {
                return new RespuestaZ<bool>
                {
                    Estado = false,
                    Mensage = "Ocurrió un error: " + ex.Message,
                    Valor = "error"
                };
            }
        }
        private static bool EnviarCorreoRecuperacion(string correo, string clavegenerada)
        {
            try
            {
                return Utilidadesj.getInstance().EnviodeCorreo(correo, "Recuperacion de acceso", "Se recupero sus credenciales", clavegenerada);
            }
            catch (Exception)
            {
                return false;
                //throw new Exception("Error general", ex);
            }
        }

    }
}