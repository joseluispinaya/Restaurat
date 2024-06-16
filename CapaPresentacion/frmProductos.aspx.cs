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
    }
}