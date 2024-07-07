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
        public static bool CerrarSesion()
        {
            Configuracion.oUsuario = null;

            return true;

        }
    }
}