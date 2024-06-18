using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class DCategoria
    {
        #region "PATRON SINGLETON"
        public static DCategoria _instancia = null;

        private DCategoria()
        {

        }

        public static DCategoria getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DCategoria();
            }
            return _instancia;
        }
        #endregion

        public List<ECategoria> ObtenerCatego()
        {
            List<ECategoria> rptListaRol = new List<ECategoria>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCategorias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new ECategoria()
                                {
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    Descripcion = dr["Descripcion"].ToString(),
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
                throw new Exception("Error al obtener las Categorias", ex);
            }

            return rptListaRol;
        }

        public List<ECategoria> ObtenerCategoriasOr()
        {
            List<ECategoria> rptListaRol = new List<ECategoria>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCategorias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                ECategoria categoria = new ECategoria()
                                {
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    oListaProducto = new List<EProducto>()
                                };

                                // Obtener productos para la categoría actual
                                using (SqlCommand productoCmd = new SqlCommand("usp_ObtenerProductosPorCategoria", con))
                                {
                                    productoCmd.CommandType = CommandType.StoredProcedure;
                                    productoCmd.Parameters.AddWithValue("@IdCategoria", categoria.IdCategoria);

                                    using (SqlDataReader productoDr = productoCmd.ExecuteReader())
                                    {
                                        while (productoDr.Read())
                                        {
                                            EProducto producto = new EProducto()
                                            {
                                                IdProducto = Convert.ToInt32(productoDr["IdProducto"]),
                                                Codigo = productoDr["Codigo"].ToString(),
                                                ValorCodigo = Convert.ToInt32(productoDr["ValorCodigo"]),
                                                Nombre = productoDr["Nombre"].ToString(),
                                                Descripcion = productoDr["Descripcion"].ToString(),
                                                Imagen = productoDr["Foto"].ToString(),
                                                PrecioUnidadVenta = float.Parse(productoDr["PrecioUnidadVenta"].ToString()),
                                                //PrecioUnidadVenta = Convert.ToSingle(productoDr["PrecioUnidadVenta"]),
                                                Activo = Convert.ToBoolean(productoDr["Activo"]),
                                                //FechaRegistro = Convert.ToDateTime(productoDr["FechaRegistro"])
                                            };
                                            categoria.oListaProducto.Add(producto);
                                        }
                                    }
                                }

                                rptListaRol.Add(categoria);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las Categorias", ex);
            }

            return rptListaRol;
        }

        public List<ECategoria> ObtenerCategorias()
        {
            List<ECategoria> rptListaRol = new List<ECategoria>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCategorias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        // Primero obtenemos todas las categorías
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                ECategoria categoria = new ECategoria()
                                {
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    oListaProducto = new List<EProducto>()
                                };

                                rptListaRol.Add(categoria);
                            }
                        }

                        // Ahora obtenemos los productos para cada categoría
                        foreach (var categoria in rptListaRol)
                        {
                            using (SqlCommand productoCmd = new SqlCommand("usp_ObtenerProductosPorCategoria", con))
                            {
                                productoCmd.CommandType = CommandType.StoredProcedure;
                                productoCmd.Parameters.AddWithValue("@IdCategoria", categoria.IdCategoria);

                                using (SqlDataReader productoDr = productoCmd.ExecuteReader())
                                {
                                    while (productoDr.Read())
                                    {
                                        EProducto producto = new EProducto()
                                        {
                                            IdProducto = Convert.ToInt32(productoDr["IdProducto"]),
                                            Codigo = productoDr["Codigo"].ToString(),
                                            ValorCodigo = Convert.ToInt32(productoDr["ValorCodigo"]),
                                            Nombre = productoDr["Nombre"].ToString(),
                                            Descripcion = productoDr["Descripcion"].ToString(),
                                            Imagen = productoDr["Foto"].ToString(),
                                            PrecioUnidadVenta = float.Parse(productoDr["PrecioUnidadVenta"].ToString()),
                                            Activo = Convert.ToBoolean(productoDr["Activo"])
                                        };
                                        categoria.oListaProducto.Add(producto);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las Categorias", ex);
            }

            return rptListaRol;
        }

    }
}
