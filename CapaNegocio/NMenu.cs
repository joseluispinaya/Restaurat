using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NMenu
    {
        #region "PATRON SINGLETON"
        private static NMenu instancia = null;
        private NMenu() { }
        public static NMenu getInstance()
        {
            if (instancia == null)
            {
                instancia = new NMenu();
            }
            return instancia;
        }
        #endregion

        public List<EMenu> ObtenerMenu()
        {
            // Crear una lista de menús
            List<EMenu> listaMenus = new List<EMenu>();

            // Crear submenús de forma compacta
            var subMenu1 = new ESubMenu { IdSubMenu = 1, IdMenu = 1, Nombre = "Usuarios", NombreFormulario = "frmUsuarios.aspx" };
            var subMenu2 = new ESubMenu { IdSubMenu = 2, IdMenu = 1, Nombre = "Roles", NombreFormulario = "frmRoles.aspx" };

            var subMenu3 = new ESubMenu { IdSubMenu = 3, IdMenu = 2, Nombre = "Nueva Venta", NombreFormulario = "frmVentaCaja.aspx" };
            var subMenu4 = new ESubMenu { IdSubMenu = 4, IdMenu = 2, Nombre = "Consultar", NombreFormulario = "frmConsultaVenta.aspx" };

            var menu1 = new EMenu { IdMenu = 1, Nombre = "Usuarios", Icono = "mdi mdi-account-key", Url = "#", IsSubMenu = true, oSubMenu = new List<ESubMenu> { subMenu1, subMenu2 }, Activo = true };
            var menu2 = new EMenu { IdMenu = 2, Nombre = "Ventas", Icono = "mdi mdi-cart", Url = "#", IsSubMenu = true, oSubMenu = new List<ESubMenu> { subMenu3, subMenu4 }, Activo = true };

            var menu3 = new EMenu { IdMenu = 3, Nombre = "Inicio", Icono = "mdi mdi-home", Url = "Inicio.aspx", IsSubMenu = false, oSubMenu = new List<ESubMenu>(), Activo = true };

            // Agregar los menús a la lista
            listaMenus.Add(menu1);
            listaMenus.Add(menu2);
            listaMenus.Add(menu3);

            return listaMenus;
        }
    }
}
