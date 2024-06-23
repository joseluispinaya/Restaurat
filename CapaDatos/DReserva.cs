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
    }
}
