using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;


namespace CapaPresentacion.ClienteH
{
    public partial class frmRegistro : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static RespuestaZ<bool> Guardar(ECliente oCliente)
        {
            try
            {
                bool Respuesta = NCliente.getInstance().RegistrarCliente(oCliente);
                //bool Respuesta = false;
                var resp = new RespuestaZ<bool>
                {
                    Estado = Respuesta,
                    Mensage = Respuesta ? "Registrado correctamente" : "El numero de Documento ya existe en el Sistema",
                    Valor = Respuesta ? "success" : "warning"
                };
                return resp;
            }
            catch (Exception ex)
            {
                return new RespuestaZ<bool> { Estado = false, Mensage = "Ocurrió un error: " + ex.Message, Valor = "error" };
            }
        }
    }
}