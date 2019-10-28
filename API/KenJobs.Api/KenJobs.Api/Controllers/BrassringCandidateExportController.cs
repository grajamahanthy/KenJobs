using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Web.Http;
using System.Xml;
using System.Xml.Linq;

namespace KenJobs.Api.Controllers
{
    public class BrassringCandidateExportController : ApiController
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
        public HttpResponseMessage Post(HttpRequestMessage request)
        {
            try
            {
                //var doc = new XmlDocument();
                //doc.Load(request.Content.ReadAsStreamAsync().Result);
                string cdataContent = string.Empty;
                XElement XTemp = XElement.Load(request.Content.ReadAsStreamAsync().Result);
                var cdataElement = XTemp.DescendantNodes().OfType<XCData>().FirstOrDefault();
                if (cdataElement != null)
                    cdataContent = cdataElement.Value;

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
                message.Body = cdataContent;
                message.IsBodyHtml = false;
                message.To.Add("sekhardev.44@gmail.com");

                smtp.Send(message);
                string XML = "<success>Kenjobs Integration Successful.</success>";
                return new HttpResponseMessage()
                {
                    Content = new StringContent(XML, Encoding.UTF8, "application/xml")
                };
            }
            catch (Exception ex)
            {
                string XML = "<error>Integration with Kenjobs is failed.</error>";
                return new HttpResponseMessage()
                {
                    Content = new StringContent(XML, Encoding.UTF8, "application/xml")
                };
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