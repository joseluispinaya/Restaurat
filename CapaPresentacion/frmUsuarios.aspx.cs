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

            if (Lista != null)
            {
                // Filtrar la lista para excluir los roles con Idrol igual a 2
                List<ERol> ListaFiltrada = Lista.Where(rol => rol.Idrol != 2).ToList();

                return new Respuesta<List<ERol>>() { estado = true, objeto = ListaFiltrada };
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

        [WebMethod]
        public static RespuestaZ<bool> EditarUsuario(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                var imageUrl = string.Empty;
                List<EUsuario> Lista = NUsuario.getInstance().ObtenerUsuarios();
                var item = Lista.FirstOrDefault(x => x.IdUsuario == oUsuario.IdUsuario);

                if (item == null)
                {
                    return new RespuestaZ<bool>() { Estado = false, Mensage = "Ocurrio un inconveniente intente mas tarde", Valor = "error" };
                }
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    var stream = new MemoryStream(imageBytes);
                    string folder = "/Imagenes/";
                    imageUrl = Utilidadesj.getInstance().UploadPhotoA(stream, folder);

                    if (!string.IsNullOrEmpty(imageUrl))
                    {
                        if (!string.IsNullOrEmpty(item.Foto))
                        {
                            File.Delete(HttpContext.Current.Server.MapPath(item.Foto));
                        }
                    }
                    else
                    {
                        // Si no se pudo guardar la nueva imagen, mantener la URL de la imagen anterior
                        imageUrl = item.Foto;
                    }
                }
                else
                {
                    imageUrl = item.Foto;
                }

                item.IdUsuario = oUsuario.IdUsuario;
                item.Nombres = oUsuario.Nombres;
                item.Apellidos = oUsuario.Apellidos;
                item.Correo = oUsuario.Correo;
                item.Foto = imageUrl;
                item.IdRol = oUsuario.IdRol;
                item.Estado = oUsuario.Estado;

                bool Respuesta = NUsuario.getInstance().ActualizarUsuario(item);

                var respuesta = new RespuestaZ<bool>
                {
                    Estado = Respuesta,
                    Mensage = Respuesta ? "Actualizado correctamente" : "Error al actualizar el Correo ya Existe",
                    Valor = Respuesta ? "success" : "warning"
                };
                return respuesta;
            }
            catch (Exception ex)
            {
                return new RespuestaZ<bool> { Estado = false, Mensage = "Ocurrió un error: " + ex.Message, Valor = "error" };
            }
        }
    }
}