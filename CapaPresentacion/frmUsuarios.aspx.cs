using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class frmUsuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static Respuesta<List<ERol>> ObtenerRol()
        {
            List<ERol> Lista = NTipos.getInstance().ObtenerRol();
            //Lista = NTipos.getInstance().ObtenerRol();

            if (Lista != null)
            {
                return new Respuesta<List<ERol>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<ERol>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<List<EUsuario>> ObtenerUsuario()
        {
            List<EUsuario> Lista = NUsuario.getInstance().ObtenerUsuarios();
            //Lista = NUsuario.getInstance().ObtenerUsuarios();

            if (Lista != null)
            {
                return new Respuesta<List<EUsuario>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EUsuario>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static bool Guardar(EUsuario oUsuario, byte[] imageBytes)
        {
            bool Respuesta = false;
            var imageUrl = string.Empty;
            string clavegenerada = Utilidadesj.getInstance().GenerarClave();
            string ClaveEncri = Utilidadesj.getInstance().ConvertirSha256(clavegenerada);

            if (imageBytes != null && imageBytes.Length > 0)
            {
                var stream = new MemoryStream(imageBytes);
                string folder = "/Imagenes/";
                imageUrl = Utilidadesj.getInstance().UploadPhoto(stream, folder);
            }
            EUsuario obj = new EUsuario
            {
                Nombres = oUsuario.Nombres,
                Apellidos = oUsuario.Apellidos,
                Correo = oUsuario.Correo,
                Clave = ClaveEncri,
                Foto = imageUrl,
                IdRol = oUsuario.IdRol
            };
            Respuesta = NUsuario.getInstance().RegistrarUsuario(obj);
            if (Respuesta)
            {
                bool ok = Utilidadesj.getInstance().EnviaElCorreod(obj.Correo, clavegenerada, obj.Correo);
            }
            return Respuesta;
        }
    }
}