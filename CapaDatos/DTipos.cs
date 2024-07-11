using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class DTipos
    {
        #region "PATRON SINGLETON"
        public static DTipos _instancia = null;

        private DTipos()
        {

        }

        public static DTipos getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DTipos();
            }
            return _instancia;
        }
        #endregion

        public List<ERol> ObtenerRol()
        {
            List<ERol> rptListaRol = new List<ERol>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerRoles", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new ERol()
                                {
                                    Idrol = Convert.ToInt32(dr["IdRol"]),
                                    NomRol = dr["Descripcion"].ToString(),
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
                throw new Exception("Error al obtener los roles", ex);
            }

            return rptListaRol;
        }

        public List<EToken> ObtenerToken()
        {
            List<EToken> rptListaRol = new List<EToken>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerTokens", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new EToken()
                                {
                                    Idtokens = Convert.ToInt32(dr["Idtokens"]),
                                    Tokenus = dr["Tokenus"].ToString(),
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
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
                throw new Exception("Error al obtener los roles", ex);
            }

            return rptListaRol;
        }

        public bool ActualizarToken(EToken producto)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarTokens", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Idtokens", producto.Idtokens);
                        cmd.Parameters.AddWithValue("@Tokenus", producto.Tokenus);

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
    }
}
