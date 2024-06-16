using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBD
    {
        #region "PATRON SINGLETON"
        public static ConexionBD conexion = null;

        public ConexionBD() { }

        public static ConexionBD getInstance()
        {
            if (conexion == null)
            {
                conexion = new ConexionBD();
            }
            return conexion;
        }
        #endregion

        public SqlConnection ConexionDB()
        {
            SqlConnection conexion = new SqlConnection();
            conexion.ConnectionString = "Data Source=.;Initial Catalog=ResJota;Integrated Security=True";
            //conexion.ConnectionString = @"Data Source=SQL8002.site4now.net;Initial Catalog=db_aa9f27_lajota;User Id=db_aa9f27_lajota_admin;Password=Elzero20242024@";
            return conexion;
        }
    }
}
