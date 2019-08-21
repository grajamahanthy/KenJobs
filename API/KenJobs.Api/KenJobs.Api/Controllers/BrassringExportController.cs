using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Xml;

namespace KenJobs.Api.Controllers
{
    public class BrassringXml
    {
        public string IntegrationData { set; get; }
    }
    public class BrassringExportController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public IHttpActionResult Post(HttpRequestMessage request)
        {
            try
            {
                var doc = new XmlDocument();
                //doc.Load(request.Content.ReadAsStreamAsync().Result);
                string value = request.Content.ReadAsStringAsync().Result;
                var fromEmail = new MailAddress("info@kensuite.com", "Kensuite Technologies Pvt Ltd.");
                var toEmail = new MailAddress("ganesh.r@kensuite.com");
                var fromEmailPassword = "Password$9";

                var smtp = new SmtpClient
                {
                    Host = "relay-hosting.secureserver.net",
                    Port = 25,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
                };
                var message = new MailMessage(fromEmail, toEmail);
                message.Subject = "Candidate Exported From Brassring";
                message.Body = value;
                message.IsBodyHtml = true;
                message.To.Add("sekhardev.44@gmail.com");

                smtp.Send(message);
                return Ok("Kenjobs Integration Successful.");
            }
            catch (Exception ex) {
                return BadRequest("Integration with Kenjobs is failed.");
            }

        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}