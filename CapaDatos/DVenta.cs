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
    public class DVenta
    {
        #region "PATRON SINGLETON"
        public static DVenta _instancia = null;

        private DVenta()
        {

        }

        public static DVenta getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DVenta();
            }
            return _instancia;
        }
        #endregion

        //registro con id cliente para caja
        public int RegistrarVentaIdclie(string Detalle)
        {
            int respuesta = 0;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarVentaIdCliente", con))
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
                throw new Exception("Error SQL al registrar la venta", sqlEx);
            }
            catch (Exception ex)
            {
                respuesta = 0;
                throw new Exception("Error al registrar venta", ex);
            }

            return respuesta;
        }

        //registro con cliente y sus campos
        public int RegistrarVentaNuev(string Detalle)
        {
            int respuesta = 0;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarVentaCliente", con))
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
                throw new Exception("Error SQL al registrar la venta", sqlEx);
            }
            catch (Exception ex)
            {
                respuesta = 0;
                throw new Exception("Error al registrar venta", ex);
            }

            return respuesta;
        }

        //registro con Id Cliente para Atender reservas
        public int RegistrarVentaIdclieEstado(string Detalle)
        {
            int respuesta = 0;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarVentaIdEstado", con))
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
                throw new Exception("Error SQL al registrar la venta", sqlEx);
            }
            catch (Exception ex)
            {
                respuesta = 0;
                throw new Exception("Error al registrar venta", ex);
            }

            return respuesta;
        }

        public EVenta ObtenerDetalleVenta(int IdVenta)
        {
            EVenta rptDetalleVenta = null;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ObtenerDetalleVenta", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdVenta", IdVenta);

                        con.Open();

                        using (XmlReader dr = cmd.ExecuteXmlReader())
                        {
                            if (dr.Read())
                            {
                                XDocument doc = XDocument.Load(dr);
                                var detalleReservaElement = doc.Element("DETALLE_VENTA");

                                if (detalleReservaElement != null)
                                {
                                    rptDetalleVenta = new EVenta
                                    {
                                        TipoDocumento = detalleReservaElement.Element("TipoDocumento").Value,
                                        Codigo = detalleReservaElement.Element("Codigo").Value,
                                        CantidadTotal = int.Parse(detalleReservaElement.Element("CantidadTotal").Value),
                                        TotalCosto = float.Parse(detalleReservaElement.Element("TotalCosto").Value, CultureInfo.InvariantCulture),
                                        FechaRegistro = detalleReservaElement.Element("FechaRegistro").Value
                                    };

                                    var detalleClienteElement = detalleReservaElement.Element("DETALLE_CLIENTE");
                                    if (detalleClienteElement != null)
                                    {
                                        rptDetalleVenta.oCliente = new ECliente
                                        {
                                            IdCliente = int.Parse(detalleClienteElement.Element("IdCliente").Value),
                                            Nombre = detalleClienteElement.Element("Nombre").Value,
                                            Direccion = detalleClienteElement.Element("Direccion").Value,
                                            NumeroDocumento = detalleClienteElement.Element("NumeroDocumento").Value,
                                            Telefono = detalleClienteElement.Element("Telefono").Value
                                        };
                                    }

                                    var detalleProductoElement = detalleReservaElement.Element("DETALLE_PRODUCTO");
                                    if (detalleProductoElement != null)
                                    {
                                        rptDetalleVenta.oListaDetalleVenta = detalleProductoElement.Elements("PRODUCTO")
                                            .Select(producto => new EDetalleVenta
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
                throw new Exception("Error al encontrar detalle. Intente más tarde.", ex);
            }

            return rptDetalleVenta;
        }

        public List<EVenta> ObtenerListaVentaa()
        {
            List<EVenta> rptListaUsuario = new List<EVenta>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerListaVenta", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EVenta()
                                {
                                    IdVenta = Convert.ToInt32(dr["IdVenta"]),
                                    TipoDocumento = dr["TipoDocumento"].ToString(),
                                    Codigo = dr["Codigo"].ToString(),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    oCliente = new ECliente() { NumeroDocumento = dr["NumeroDocumento"].ToString(), Nombre = dr["Nombre"].ToString() },
                                    TotalCosto = float.Parse(dr["TotalCosto"].ToString())
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
