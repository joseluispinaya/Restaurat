﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DCliente
    {
        #region "PATRON SINGLETON"
        public static DCliente _instancia = null;

        private DCliente()
        {

        }

        public static DCliente getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DCliente();
            }
            return _instancia;
        }
        #endregion

        public ECliente Login(string user, string pass)
        {
            ECliente obj = null;
            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand Comando = new SqlCommand("LogeoCliente", con))
                    {
                        Comando.CommandType = CommandType.StoredProcedure;
                        Comando.Parameters.AddWithValue("@User", user);
                        Comando.Parameters.AddWithValue("@Clave", pass);

                        con.Open();
                        using (SqlDataReader dr = Comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new ECliente
                                {
                                    IdCliente = Convert.ToInt32(dr["IdCliente"]),
                                    NumeroDocumento = dr["NumeroDocumento"].ToString(),
                                    Nombre = dr["Nombre"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    //Clave = dr["Clave"].ToString(),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    oRol = new ERol() { NomRol = dr["Descripcion"].ToString() }
                                };
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("Error en la base de datos", ex);
            }
            catch (Exception ex)
            {
                throw new Exception("Error general", ex);
            }

            return obj;
        }

        public List<ECliente> ObtenerClien()
        {
            List<ECliente> rptListaUsuario = new List<ECliente>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCLIENTE", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new ECliente()
                                {
                                    IdCliente = Convert.ToInt32(dr["IdCliente"]),
                                    NumeroDocumento = dr["NumeroDocumento"].ToString(),
                                    Nombre = dr["Nombre"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
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
                throw new Exception("Error al obtener los Cliente", ex);
            }

            return rptListaUsuario;
        }

        public List<ECliente> ObtenerClienFil(string buscar)
        {
            List<ECliente> rptListaUsuario = new List<ECliente>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCLIENTEFiltro", con))
                    {
                        comando.Parameters.AddWithValue("@Nrodocu", buscar);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new ECliente()
                                {
                                    IdCliente = Convert.ToInt32(dr["IdCliente"]),
                                    NumeroDocumento = dr["NumeroDocumento"].ToString(),
                                    Nombre = dr["Nombre"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
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
                throw new Exception("Error al obtener los Cliente", ex);
            }

            return rptListaUsuario;
        }
    }
}
