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
    public partial class frmCategorias : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static Respuesta<List<ECategoria>> ObtenerCatego()
        {
            List<ECategoria> Lista = NCategoria.getInstance().ObtenerCategorias();
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
        public static RespuestaZ<bool> GurdarCatego(ECategoria oCategoria)
        {
            try
            {
                bool Respuesta = NCategoria.getInstance().RegistrarCategoria(oCategoria);
                var respuesta = new RespuestaZ<bool>
                {
                    Estado = Respuesta,
                    Mensage = Respuesta ? "Registrado correctamente" : "Ocurrio un error la categoria ya Existe",
                    Valor = Respuesta ? "success" : "warning"
                };
                return respuesta;
            }
            catch (Exception ex)
            {
                return new RespuestaZ<bool> { Estado = false, Mensage = "Ocurrió un error: " + ex.Message, Valor = "error" };
            }
        }

        [WebMethod]
        public static RespuestaZ<bool> ActualizarCatego(ECategoria oCategoria)
        {
            try
            {
                bool Respuesta = NCategoria.getInstance().ActualiCategoria(oCategoria);
                var respuesta = new RespuestaZ<bool>
                {
                    Estado = Respuesta,
                    Mensage = Respuesta ? "Actualizado correctamente" : "Ocurrio un error la categoria ya Existe",
                    Valor = Respuesta ? "success" : "warning"
                };
                return respuesta;
            }
            catch (Exception ex)
            {
                return new RespuestaZ<bool> { Estado = false, Mensage = "Ocurrió un error: " + ex.Message, Valor = "error" };
            }
        }
        [WebMethod]
        public static RespuestaZ<bool> Eliminar(int IdCategoria)
        {            
            try
            {
                bool Respuesta = NCategoria.getInstance().EliminarCategoria(IdCategoria);
                //bool Respuesta = true;
                var respuesta = new RespuestaZ<bool>
                {
                    Estado = Respuesta,
                    Mensage = Respuesta ? "Eliminado correctamente" : "No se pudo Eliminar la Categoria tiene una relacion con un Producto",
                    Valor = Respuesta ? "success" : "warning"
                };
                return respuesta;
            }
            catch (Exception ex)
            {
                return new RespuestaZ<bool> { Estado = false, Mensage = "Ocurrió un error: " + ex.Message, Valor = "error" };
            }
        }
        // codigo auxiliar
        [WebMethod]
        public static Respuesta<List<ECategoria>> ObtenerCategoProdu(int idcate)
        {
            List<ECategoria> Lista = NCategoria.getInstance().ObtenerCategorias();

            if (Lista != null)
            {
                if (idcate != 0)
                {
                    // Filtrar la lista por el idcate
                    Lista = Lista.Where(c => c.IdCategoria == idcate).ToList();
                }

                return new Respuesta<List<ECategoria>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<ECategoria>>() { estado = false, objeto = null };
            }
        }


        [WebMethod]
        public static Respuesta<List<EProducto>> ObtenerProduc()
        {
            List<EProducto> Lista = NProducto.getInstance().ObtenerProductos();

            if (Lista != null)
            {
                return new Respuesta<List<EProducto>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EProducto>>() { estado = false, objeto = null };
            }
        }
    }
}