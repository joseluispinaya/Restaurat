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
    public partial class frmProductos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECategoria>> ObtenerCatego()
        {
            List<ECategoria> Lista = NCategoria.getInstance().ObtenerCatego();
            //Lista = NTipos.getInstance().ObtenerRol();

            if (Lista != null)
            {
                return new Respuesta<List<ECategoria>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<ECategoria>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<List<EProducto>> ObtenerProd()
        {
            List<EProducto> Lista = NProducto.getInstance().ObtenerProductos();
            //Lista = NUsuario.getInstance().ObtenerUsuarios();

            if (Lista != null)
            {
                return new Respuesta<List<EProducto>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EProducto>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static bool Guardar(EProducto oProducto, byte[] imageBytes)
        {
            bool Respuesta = false;
            var imageUrl = string.Empty;

            if (imageBytes != null && imageBytes.Length > 0)
            {
                var stream = new MemoryStream(imageBytes);
                string folder = "/ImagenesPro/";
                imageUrl = Utilidadesj.getInstance().UploadPhoto(stream, folder);
            }
            EProducto obj = new EProducto
            {
                Nombre = oProducto.Nombre,
                Descripcion = oProducto.Descripcion,
                PrecioUnidadVenta = oProducto.PrecioUnidadVenta,
                Imagen = imageUrl,
                IdCategoria = oProducto.IdCategoria
            };
            Respuesta = NProducto.getInstance().RegistrarProducto(obj);
            
            return Respuesta;
        }

        [WebMethod]
        public static RespuestaZ<bool> EditarProducto(EProducto oProducto, byte[] imageBytes)
        {
            try
            {
                var imageUrl = string.Empty;
                List<EProducto> Lista = NProducto.getInstance().ObtenerProductos();
                var item = Lista.FirstOrDefault(x => x.IdProducto == oProducto.IdProducto);

                if (item == null)
                {
                    return new RespuestaZ<bool>() { Estado = false, Mensage = "Ocurrio un error intente mas tarde", Valor = "error" };
                }
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    var stream = new MemoryStream(imageBytes);
                    string folder = "/ImagenesPro/";
                    imageUrl = Utilidadesj.getInstance().UploadPhotoA(stream, folder);

                    //if (!string.IsNullOrEmpty(item.Imagen))
                    //{
                    //    File.Delete(HttpContext.Current.Server.MapPath(item.Imagen));
                    //}

                    if (!string.IsNullOrEmpty(imageUrl))
                    {
                        if (!string.IsNullOrEmpty(item.Imagen))
                        {
                            File.Delete(HttpContext.Current.Server.MapPath(item.Imagen));
                        }
                    }
                    else
                    {
                        // Si no se pudo guardar la nueva imagen, mantener la URL de la imagen anterior
                        imageUrl = item.Imagen;
                    }
                }
                else
                {
                    imageUrl = item.Imagen;
                }

                item.IdProducto = oProducto.IdProducto;
                item.Nombre = oProducto.Nombre;
                item.Descripcion = oProducto.Descripcion;
                item.PrecioUnidadVenta = oProducto.PrecioUnidadVenta;
                item.Imagen = imageUrl;
                item.IdCategoria = oProducto.IdCategoria;
                item.Activo = oProducto.Activo;

                bool Respuesta = NProducto.getInstance().ActualizarProducto(item);

                var respuesta = new RespuestaZ<bool>
                {
                    Estado = Respuesta,
                    Mensage = Respuesta ? "Actualizado correctamente" : "Error al actualizar el Nombre del producto ya Existe",
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