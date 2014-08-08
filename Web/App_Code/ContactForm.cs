using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Web.Services;
using System.Web.Script.Services;
using System.Net.Mail;
using System.Web.Script.Serialization;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ContactForm : System.Web.Services.WebService 
{

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool SendEmail(string name, string company, string existweb, string req_demo, string url, string phone, string formemail, string formmessage)
	{
	try{
        //List<object> lstItems = new JavaScriptSerializer().ConvertToType<List<object>>(postmsg);
            string subject = "Wine Rack Media Contact Form";
            string message = "";
           // string to = "fred@winerackmedia.com";
            string to = "flyingmonkeysattack9@gmail.com,fred@winerackmedia.com,lauren@winerackmedia.com";

            string from = formemail;
            string replyTo = formemail;

            message += String.Format("Name: {0}" + " ", name);
            if (!string.IsNullOrEmpty(company))
            {
                message += String.Format("<br/>Company: {0}" + " ", company);
            }
          

            if (!string.IsNullOrEmpty(existweb))
            {
                message += String.Format("<br/>Exisitng WebSite: {0}" + " ", existweb);
            }
            if (!string.IsNullOrEmpty(req_demo))
            {
                message += String.Format("<br/>Requesting a demo: {0}" + " ", req_demo);
            }
            if (!string.IsNullOrEmpty(url))
            {
                message += String.Format("<br/>WebSite URL: {0}" + " ", url);
            }
            if (!string.IsNullOrEmpty(phone))
            {
                message += String.Format("<br/>Phone: {0}" + " ", phone);
            }
            message += String.Format("<br/>Email: {0}" + " ", formemail);
           
            message += String.Format("<br/>Message: {0}" + " ", formmessage);

            System.Net.Mail.MailMessage email = new System.Net.Mail.MailMessage(from, to);
            email.ReplyToList.Add(replyTo);
            email.Subject = subject;
            email.BodyEncoding = System.Text.Encoding.UTF8;
            email.Body = message;
            email.IsBodyHtml = true;
            SmtpClient client = new SmtpClient("smtp.gmail.com");
            client.Port = 587;
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential("info@winerackmedia.com", "winerack_2013media");
            client.Send(email);

            return true;
    }catch{
            return false;
    }
	}
}