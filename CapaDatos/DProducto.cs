using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DProducto
    {
        #region "PATRON SINGLETON"
        public static DProducto _instancia = null;

        private DProducto()
        {

        }

        public static DProducto getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DProducto();
            }
            return _instancia;
        }
        #endregion

        public bool RegistrarProducto(EProducto producto)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarProducto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                        cmd.Parameters.AddWithValue("@Foto", producto.Imagen);
                        cmd.Parameters.AddWithValue("@IdCategoria", producto.IdCategoria);
                        cmd.Parameters.AddWithValue("@PrecioUnidadVenta", producto.PrecioUnidadVenta);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al registrar. Intente más tarde.", ex);
            }

            return respuesta;
        }

        public bool ActualizarProducto(EProducto producto)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarProducto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdProducto", producto.IdProducto);
                        cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                        cmd.Parameters.AddWithValue("@Foto", producto.Imagen);
                        cmd.Parameters.AddWithValue("@IdCategoria", producto.IdCategoria);
                        cmd.Parameters.AddWithValue("@PrecioUnidadVenta", producto.PrecioUnidadVenta);
                        cmd.Parameters.AddWithValue("@Activo", producto.Activo);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al Actualizar. Intente más tarde.", ex);
            }

            return respuesta;
        }

        public List<EProducto> ObtenerProductos()
        {
            List<EProducto> rptListaUsuario = new List<EProducto>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerProductos", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EProducto()
                                {
                                    IdProducto = Convert.ToInt32(dr["IdProducto"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    ValorCodigo = Convert.ToInt32(dr["ValorCodigo"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Descripcion = dr["DescripcionProducto"].ToString(),
                                    Imagen = dr["Foto"].ToString(),
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    PrecioUnidadVenta = float.Parse(dr["PrecioUnidadVenta"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    oCategoria = new ECategoria() { Descripcion = dr["DescripcionCategoria"].ToString() }
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener los productos", ex);
            }

            return rptListaUsuario;
        }

        public List<EProducto> ObtenerProductosFil(string buscar)
        {
            List<EProducto> rptListaUsuario = new List<EProducto>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerProductosFiltro", con))
                    {
                        comando.Parameters.AddWithValue("@Nombre", buscar);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EProducto()
                                {
                                    IdProducto = Convert.ToInt32(dr["IdProducto"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    ValorCodigo = Convert.ToInt32(dr["ValorCodigo"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Descripcion = dr["DescripcionProducto"].ToString(),
                                    Imagen = dr["Foto"].ToString(),
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    PrecioUnidadVenta = float.Parse(dr["PrecioUnidadVenta"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    oCategoria = new ECategoria() { Descripcion = dr["DescripcionCategoria"].ToString() }
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener los productos", ex);
            }

            return rptListaUsuario;
        }
    }
}
