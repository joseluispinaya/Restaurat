using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;
using System.Xml.Linq;
using System.Xml;
using System.Globalization;

namespace CapaDatos
{
    public class DReserva
    {
        #region "PATRON SINGLETON"
        public static DReserva _instancia = null;

        private DReserva()
        {

        }

        public static DReserva getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DReserva();
            }
            return _instancia;
        }
        #endregion

        //registro con id cliente
        public int RegistrarReservaNuevoIdclie(string Detalle)
        {
            int respuesta = 0;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarReservaIdCliente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@Detalle", SqlDbType.Xml).Value = Detalle;
                        cmd.Parameters.Add("@Resultado", SqlDbType.Int).Direction = ParameterDirection.Output;

                        con.Open();
                        cmd.ExecuteNonQuery();

                        respuesta = Convert.ToInt32(cmd.Parameters["@Resultado"].Value);
                    }
                }
            }
            catch (SqlException sqlEx)
            {
                respuesta = 0;
                throw new Exception("Error SQL al registrar la reserva", sqlEx);
            }
            catch (Exception ex)
            {
                respuesta = 0;
                throw new Exception("Error al registrar reserva", ex);
            }

            return respuesta;
        }

        public EReserva ObtenerDetalleReserva(int IdReserva)
        {
            EReserva rptDetalleVenta = new EReserva();
            SqlConnection con = null;
            //var NuevaCultura = CultureInfo.GetCultureInfo("es-BO");
            try
            {
                con = ConexionBD.getInstance().ConexionDB();
                SqlCommand cmd = new SqlCommand("usp_ObtenerDetalleReserva", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IdReserva", IdReserva);

                con.Open();

                using (XmlReader dr = cmd.ExecuteXmlReader())
                {
                    while (dr.Read())
                    {
                        XDocument doc = XDocument.Load(dr);
                        if (doc.Element("DETALLE_RESERVA") != null)
                        {
                            rptDetalleVenta = (from dato in doc.Elements("DETALLE_RESERVA")
                                               select new EReserva()
                                               {
                                                   Codigo = dato.Element("Codigo").Value,
                                                   CantidadTotal = int.Parse(dato.Element("CantidadTotal").Value),
                                                   //CantidadTotal = dato.Element("CantidadTotal").Value,
                                                   Comentario = dato.Element("Comentario").Value,
                                                   Estado = dato.Element("Estado").Value,
                                                   TotalCosto = float.Parse(dato.Element("TotalCosto").Value, CultureInfo.InvariantCulture),
                                                   FechaReserva = dato.Element("FechaSolicitado").Value,
                                                   FechaRegistro = dato.Element("FechaRegistro").Value
                                               }).FirstOrDefault();
                            rptDetalleVenta.oCliente = (from dato in doc.Element("DETALLE_RESERVA").Elements("DETALLE_CLIENTE")
                                                        select new ECliente()
                                                        {
                                                            Nombre = dato.Element("Nombre").Value,
                                                            Direccion = dato.Element("Direccion").Value,
                                                            NumeroDocumento = dato.Element("NumeroDocumento").Value,
                                                            Telefono = dato.Element("Telefono").Value
                                                        }).FirstOrDefault();
                            rptDetalleVenta.oListaDetalleReserva = (from producto in doc.Element("DETALLE_RESERVA").Element("DETALLE_PRODUCTO").Elements("PRODUCTO")
                                                                  select new EDetalleReserva()
                                                                  {
                                                                      IdProducto = int.Parse(producto.Element("IdProducto").Value),
                                                                      Cantidad = int.Parse(producto.Element("Cantidad").Value),
                                                                      NombreProducto = producto.Element("Nombre").Value,
                                                                      PrecioUnidad = float.Parse(producto.Element("PrecioUnidad").Value, CultureInfo.InvariantCulture),
                                                                      ImporteTotal = float.Parse(producto.Element("ImporteTotal").Value, CultureInfo.InvariantCulture)
                                                                  }).ToList();
                        }
                        else
                        {
                            rptDetalleVenta = null;
                        }
                    }

                    dr.Close();

                }

                return rptDetalleVenta;
            }
            catch (Exception ex)
            {
                rptDetalleVenta = null;
                return rptDetalleVenta;
                throw ex;
            }
        }

        public EReserva ObtenerDetalleReservaIA(int IdReserva)
        {
            EReserva rptDetalleVenta = null;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ObtenerDetalleReserva", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdReserva", IdReserva);

                        con.Open();

                        using (XmlReader dr = cmd.ExecuteXmlReader())
                        {
                            if (dr.Read())
                            {
                                XDocument doc = XDocument.Load(dr);
                                var detalleReservaElement = doc.Element("DETALLE_RESERVA");

                                if (detalleReservaElement != null)
                                {
                                    rptDetalleVenta = new EReserva
                                    {
                                        Codigo = detalleReservaElement.Element("Codigo").Value,
                                        CantidadTotal = int.Parse(detalleReservaElement.Element("CantidadTotal").Value),
                                        Comentario = detalleReservaElement.Element("Comentario").Value,
                                        Estado = detalleReservaElement.Element("Estado").Value,
                                        TotalCosto = float.Parse(detalleReservaElement.Element("TotalCosto").Value, CultureInfo.InvariantCulture),
                                        FechaReserva = detalleReservaElement.Element("FechaSolicitado").Value,
                                        FechaRegistro = detalleReservaElement.Element("FechaRegistro").Value
                                    };

                                    var detalleClienteElement = detalleReservaElement.Element("DETALLE_CLIENTE");
                                    if (detalleClienteElement != null)
                                    {
                                        rptDetalleVenta.oCliente = new ECliente
                                        {
                                            Nombre = detalleClienteElement.Element("Nombre").Value,
                                            Direccion = detalleClienteElement.Element("Direccion").Value,
                                            NumeroDocumento = detalleClienteElement.Element("NumeroDocumento").Value,
                                            Telefono = detalleClienteElement.Element("Telefono").Value
                                        };
                                    }

                                    var detalleProductoElement = detalleReservaElement.Element("DETALLE_PRODUCTO");
                                    if (detalleProductoElement != null)
                                    {
                                        rptDetalleVenta.oListaDetalleReserva = detalleProductoElement.Elements("PRODUCTO")
                                            .Select(producto => new EDetalleReserva
                                            {
                                                IdProducto = int.Parse(producto.Element("IdProducto").Value),
                                                Cantidad = int.Parse(producto.Element("Cantidad").Value),
                                                NombreProducto = producto.Element("Nombre").Value,
                                                PrecioUnidad = float.Parse(producto.Element("PrecioUnidad").Value, CultureInfo.InvariantCulture),
                                                ImporteTotal = float.Parse(producto.Element("ImporteTotal").Value, CultureInfo.InvariantCulture)
                                            }).ToList();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Manejo de la excepción
                // Aquí puedes registrar el error en un log, si es necesario
                rptDetalleVenta = null;
                throw new Exception("Error al encontrar el usuario. Intente más tarde.", ex);
            }

            return rptDetalleVenta;
        }

        public List<EReserva> ObtenerListaReserva()
        {
            List<EReserva> rptListaUsuario = new List<EReserva>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerListaReserva", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EReserva()
                                {
                                    IdReserva = Convert.ToInt32(dr["IdReserva"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    //FechaReserva = Convert.ToDateTime(dr["FechaSolicitado"].ToString()).ToString("dd/MM/yyyy"),
                                    FechaReserva = Convert.ToDateTime(dr["FechaSolicitado"].ToString()).ToString("yyyy-MM-dd"), // Formato ISO 8601
                                    VFechaReserva = Convert.ToDateTime(dr["FechaSolicitado"].ToString()),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    oCliente = new ECliente() { NumeroDocumento = dr["NumeroDocumento"].ToString(), Nombre = dr["Nombre"].ToString() },
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    TotalCosto = float.Parse(dr["TotalCosto"].ToString()),
                                    Comentario = dr["Comentario"].ToString(),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener las reservas", ex);
            }

            return rptListaUsuario;
        }
    }
}
