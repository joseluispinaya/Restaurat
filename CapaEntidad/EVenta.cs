using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EVenta
    {
        public int IdVenta { get; set; }
        public string TipoDocumento { get; set; }
        public string Codigo { get; set; }
        public int CantidadProducto { get; set; }
        public int CantidadTotal { get; set; }
        public float TotalCosto { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public ECliente oCliente { get; set; }
        public List<EDetalleVenta> oListaDetalleVenta { get; set; }
    }
}
