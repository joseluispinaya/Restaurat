using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace CapaPresentacion
{
    public class Utilidadesj
    {
        #region "PATRON SINGLETON"
        public static Utilidadesj _instancia = null;

        private Utilidadesj()
        {

        }

        public static Utilidadesj getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new Utilidadesj();
            }
            return _instancia;
        }
        #endregion

        public string GenerarClave()
        {
            string clave = Guid.NewGuid().ToString("N").Substring(0, 6);
            return clave;
        }

        public string ConvertirSha256(string texto)
        {
            StringBuilder sb = new StringBuilder();
            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(texto));
                foreach (byte b in result)
                {
                    sb.Append(b.ToString("x2"));
                }
            }
            return sb.ToString();
        }
        public string UploadPhoto(MemoryStream stream, string folder)
        {
            string rutaa = "";

            try
            {
                stream.Position = 0;

                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";

                var fullPath = $"{folder}{file}";
                rutaa = fullPath;
                var path = Path.Combine(HttpContext.Current.Server.MapPath(folder), file);
                File.WriteAllBytes(path, stream.ToArray());

                return rutaa;
            }
            catch
            {
                return rutaa;
            }
        }
        public bool EnviaElCorreod(string toEmail, string clave, string usuario)
        {
            //bool respuesta = true;
            try
            {
                var from = "joseluisdelta1@gmail.com";
                var name = "Restaurant la J";
                var smtps = "smtp.gmail.com";
                var port = 587;
                //var password = "xyipqkdicmyimzor";
                var password = "xyipqkdicmyimzor";
                var correo = new MailMessage();

                correo.From = new MailAddress(from, name);
                correo.To.Add(toEmail);
                correo.Subject = "Cuenta Creada";

                string cuerposss =
                    "<div style='width:400px;border-radius:5px; margin:auto;background-color:#dbdbdb;box-shadow:0px 0px 10px  #DEDEDE;padding:20px'>" +
                    "    <table style='width:100%'>" +
                    "        <tr>" +
                    "            <td align='center' colspan='2'>" +
                    "                <h2 style='color:#004DAF'>Bienvenido Restaurant la Jota</h2>" +
                    "            </td>" +
                    "        </tr>" +
                    "        <tr>" +
                    "            <td align='left' colspan='2'>" +
                    "                <p>Se creó exitosamente tu usuario. Los detalles de tu cuenta son:</p>" +
                    "            </td>" +
                    "        </tr>" +
                    "        <tr>" +
                    "            <td><h4 style='color:#004DAF;margin:2px'>Usuario:</h4></td>" +
                    $"            <td>{usuario}</td>" +
                    "        </tr>" +
                    "        <tr>" +
                    "            <td><h4 style='color:#004DAF;margin:2px'>Contraseña:</h4></td>" +
                    $"            <td>{clave}</td>" +
                    "        </tr>" +
                    "    </table>" +
                    "    <div style='background-color:#FFE1CE;padding:15px;margin-top:15px;margin-bottom:15px'>" +
                    "        <p style='margin:0px;color: #F45E00;'>Le recomendamos cambiar la contraseña una vez inicie sesión.</p>" +
                    "    </div>" +
                    "    <table>" +
                    "        <tr>" +
                    "            <td>Para iniciar sesión ingrese a la siguiente URL:</td>" +
                    "        </tr>" +
                    "    </table>" +
                    "    <a href='#' >Iniciar Sesión</a>" +
                    "</div>";

                correo.Body = cuerposss;
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;

                SmtpClient smtp = new SmtpClient();
                smtp.Host = smtps;
                smtp.Port = port;
                smtp.Credentials = new NetworkCredential(from, password);
                smtp.EnableSsl = true;

                smtp.Send(correo);
                return true;
                //respuesta = true;
            }
            catch
            {
                return false;
            }
            //catch (Exception ex)
            //{
            //    respuesta = false;
            //    throw ex;
            //}

            //return respuesta;
        }
    }
}