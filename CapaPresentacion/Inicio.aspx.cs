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
    public partial class Inicio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EReserva>> ObtenerReserCancelar()
        {
            DateTime fechaActual = DateTime.Now;
            int cantidadCanceladas = 0;
            List<EReserva> reservas = NReserva.getInstance().ObtenerListaReserva();

            List<EReserva> reservasParaCancelar = reservas
                .Where(r => r.VFechaReserva <= fechaActual && r.Estado == "Confirmado")
                .ToList();

            if (reservasParaCancelar.Count == 0)
            {
                return new Respuesta<List<EReserva>>() { estado = false, objeto = null, valor = "0" };
            }

            foreach (EReserva reserva in reservasParaCancelar)
            {
                bool result = NReserva.getInstance().CancelarReserva(reserva.IdReserva);
                if (result)
                {
                    cantidadCanceladas++;
                }
            }

            return new Respuesta<List<EReserva>>()
            {
                estado = true,
                objeto = reservasParaCancelar,
                valor = cantidadCanceladas.ToString()
            };
        }

        [WebMethod]
        public static RespuestaZ<bool> ActualizaroRegiTok(string Tokenus)
        {
            try
            {
                int IdUsuario = Configuracion.oUsuario.IdUsuario;
                var listaToten = NTipos.getInstance().ObtenerToken();
                var token = listaToten.FirstOrDefault(x => x.IdUsuario == IdUsuario);

                if (token == null)
                {
                    return new RespuestaZ<bool>()
                    {
                        Estado = false,
                        Mensage = "El usuario no existe",
                        Valor = "error"
                    };
                }

                if (token.Tokenus != Tokenus)
                {
                    token.Tokenus = Tokenus;
                    bool Respuesta = NTipos.getInstance().ActualizarToken(token);
                    return new RespuestaZ<bool>()
                    {
                        Estado = Respuesta,
                        Mensage = Respuesta ? "Token actualizado" : "Ocurrio un error intente mas tarde",
                        Valor = Respuesta ? "success" : "warning"
                    };

                }

                return new RespuestaZ<bool>() { Estado = false, Mensage = "Realizo otra accion", Valor ="warning" };
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

        [WebMethod]
        public static RespuestaZ<EUsuario> ObtenerDetalleUsuario()
        {
            try
            {
                if (Configuracion.oUsuario == null)
                {
                    return new RespuestaZ<EUsuario>() { Estado = false, Mensage = "No se ha encontrado un usuario configurado.", Valor = "error" };
                }

                int IdUsuario = Configuracion.oUsuario.IdUsuario;
                var listaUsuarios = NUsuario.getInstance().ObtenerUsuarios();
                var usuario = listaUsuarios.FirstOrDefault(x => x.IdUsuario == IdUsuario);

                if (usuario == null)
                {
                    return new RespuestaZ<EUsuario>() { Estado = false, Mensage = "No se encontró el usuario especificado.", Valor = "error" };
                }

                Configuracion.oUsuario = usuario;
                return new RespuestaZ<EUsuario>() { Estado = true, Objeto = usuario };
            }
            catch (Exception ex)
            {
                // Puedes agregar logging aquí para registrar el error
                return new RespuestaZ<EUsuario> { Estado = false, Mensage = "Ocurrió un error: " + ex.Message, Valor = "error" };
            }
        }

        [WebMethod]
        public static Respuesta<List<EMenu>> ObtenerMenu()
        {
            List<EMenu> Lista = NMenu.getInstance().ObtenerMenu();

            if (Lista != null)
            {

                return new Respuesta<List<EMenu>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EMenu>>() { estado = false, objeto = null };
            }
        }
        [WebMethod]
        public static RespuestaZ<EUsuario> ObtenerDetalleUsuarioA()
        {
            try
            {
                if (Configuracion.oUsuario != null)
                {
                    int IdUsuario = Configuracion.oUsuario.IdUsuario;
                    List<EUsuario> Lista = NUsuario.getInstance().ObtenerUsuarios();
                    var items = Lista.FirstOrDefault(x => x.IdUsuario == IdUsuario);

                    if (items != null)
                    {
                        Configuracion.oUsuario = items;
                        return new RespuestaZ<EUsuario>() { Estado = true, Objeto = items };
                    }
                    else
                    {
                        return new RespuestaZ<EUsuario>() { Estado = false, Mensage = "Ocurrio un inconveniente intente mas tarde", Valor = "error" };
                    }
                }
                else
                {
                    return new RespuestaZ<EUsuario>() { Estado = false, Mensage = "Ocurrio un inconveniente intente mas tarde", Valor = "error" };
                }
            }
            catch (Exception ex)
            {
                return new RespuestaZ<EUsuario> { Estado = false, Mensage = "Ocurrió un error: " + ex.Message, Valor = "error" };
            }
        }
        // sin usar
        [WebMethod]
        public static Respuesta<List<EReserva>> ObtenerReserCancelarOr()
        {
            DateTime feactual = DateTime.Now;
            int Cant = 0;
            List<EReserva> Lista = NReserva.getInstance().ObtenerListaReserva();
            

            if (Lista != null)
            {
                List<EReserva> listafil = Lista
                .Where(re => re.VFechaReserva <= feactual && re.Estado == "Confirmado").ToList();
                string canti = listafil.Count.ToString();

                if (listafil.Count != 0)
                {
                    foreach (EReserva item in listafil)
                    {
                        var result = NReserva.getInstance().CancelarReserva(item.IdReserva);
                        if (result)
                        {
                            Cant += 1;
                        }
                    }
                    return new Respuesta<List<EReserva>>() { estado = true, objeto = listafil, valor = Cant.ToString() };
                }
                else
                {
                    return new Respuesta<List<EReserva>>() { estado = false, objeto = null };
                }
            }
            else
            {
                return new Respuesta<List<EReserva>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> CerrarSesion()
        {
            Configuracion.oUsuario = null;

            return new Respuesta<bool>() { estado = true };

        }
    }
}