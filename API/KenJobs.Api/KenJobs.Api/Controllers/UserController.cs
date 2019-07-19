using KenJobs.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Bo.BusinessObjects;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace KenJobs.Api.Controllers
{
    public class UserController : BaseController
    {
        // GET: api/User
        public IEnumerable<UserModel> Get()
        {
            UserContract userWorker = new UserWorker();
            IEnumerable<UserBo> userBolist = userWorker.GetUsers();

            List<UserModel> userModelList = new List<UserModel>();

            foreach (UserBo userBo in userBolist)
            {
                UserModel userModel = new UserModel();
                userModel.FirstName = userBo.FirstName;
                userModel.MiddleName = userBo.MiddleName;
                userModel.LastName = userBo.LastName;
                userModel.ProfilePhoto = userBo.ProfilePhoto;
                userModel.Gender_Id = userBo.Gender_Id;
                userModel.Status = userBo.Status;
                userModel.AspNetUser_Id = userBo.AspNetUser_Id;
                userModel.CreatedBy = userBo.CreatedBy;
                userModel.CreatedOn = userBo.CreatedOn;
                userModelList.Add(userModel);
            }

            return userModelList;

        }

        // GET: api/User/5
        public UserProfileModel Get(string id)
        {
            UserContract userWorker = new UserWorker();
            UserBo userBo = userWorker.GetUser(id);

            UserProfileModel userProfileModel = new UserProfileModel();
            userProfileModel.Id = userBo.Id;
            userProfileModel.FirstName = userBo.FirstName;
            userProfileModel.MiddleName = userBo.MiddleName;
            userProfileModel.LastName = userBo.LastName;
            userProfileModel.PhoneNumber = userBo.PhoneNumber;
            userProfileModel.Email = userBo.Email;
            userProfileModel.ProfilePhoto = userBo.ProfilePhoto;
            userProfileModel.Gender_Id = userBo.Gender_Id;
            userProfileModel.Status = userBo.Status;
            userProfileModel.AspNetUser_Id = userBo.AspNetUser_Id;
            userProfileModel.Profile = profileModelMapper(userBo.Profile);
            userProfileModel.Experience = experienceModelMapper(userBo.Experience);
            userProfileModel.EducationalQualification = educationalQualificationModelMapper(userBo.EducationalQualification);

            userProfileModel.CreatedBy = userBo.CreatedBy;
            userProfileModel.CreatedOn = userBo.CreatedOn;

            return userProfileModel;

        }

        // POST: api/User
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }

        public List<ProfileModel> profileModelMapper(List<ProfileBo> profileBoList)
        {
            List<ProfileModel> profileModlList = new List<ProfileModel>();
            foreach (ProfileBo profile in profileBoList)
            {
                ProfileModel profileModel = new ProfileModel();
                profileModel.Id = profile.Id;
                profileModel.User_Id = profile.User_Id;
                profileModel.Resume = profile.Resume;
                profileModel.skills = profile.skills;
                profileModel.TotalExperiance = profile.TotalExperiance;
                profileModel.HeighestQualification = profile.HeighestQualification;
                profileModel.PreferredLocation = profile.PreferredLocation;
                profileModel.CurrentSalary = profile.CurrentSalary;
                profileModel.ExpectedSalary = profile.ExpectedSalary;
                profileModel.Languages = profile.Languages;

                profileModlList.Add(profileModel);
            }
            return profileModlList;
        }


        List<ExperienceModel> experienceModelMapper(List<ExperienceBo> experienceBoList)
        {
            List<ExperienceModel> experienceModelList = new List<ExperienceModel>();
            foreach (ExperienceBo experienceBo in experienceBoList)
            {
                ExperienceModel experienceModel = new ExperienceModel();
                experienceModel.Id = experienceBo.Id;
                experienceModel.User_Id = experienceBo.User_Id;
                experienceModel.CompanyName = experienceBo.CompanyName;
                experienceModel.Technology = experienceBo.Technology;
                experienceModel.Role = experienceBo.Role;
                experienceModel.StartDate = experienceBo.StartDate;
                experienceModel.EndDate = experienceBo.EndDate;
                experienceModel.Description = experienceBo.Description;
                experienceModelList.Add(experienceModel);
            }

            return experienceModelList;
        }

        List<EducationalQualificationModel> educationalQualificationModelMapper(List<EducationalQualificationBo> educationalQualificationBoList)
        {
            List<EducationalQualificationModel> educationalQualificationModelList = new List<EducationalQualificationModel>();
            foreach (EducationalQualificationBo educationalQualificationBo in educationalQualificationBoList)
            {
                EducationalQualificationModel educationalQualificationModel = new EducationalQualificationModel();

                educationalQualificationModel.Id = educationalQualificationBo.Id;
                educationalQualificationModel.User_Id = educationalQualificationBo.User_Id;
                educationalQualificationModel.Institute = educationalQualificationBo.Institute;
                educationalQualificationModel.Qualification = educationalQualificationBo.Qualification;
                educationalQualificationModel.YearOfPass = educationalQualificationBo.YearOfPass;
                educationalQualificationModel.Percentage = educationalQualificationBo.Percentage;
                educationalQualificationModelList.Add(educationalQualificationModel);
            }

            return educationalQualificationModelList;
        }

        [NonAction]
        public void SendVerificationLinkEmail(string email, string activationCode, string role, string emailFor = "VerifyAccount")
        {
            var verifyUrl = "/" + emailFor + "/" + role + "/" + email + "/" + activationCode;
            var link = Request.Headers.Referrer.AbsoluteUri.Replace(Request.Headers.Referrer.PathAndQuery, verifyUrl);

            var fromEmail = new MailAddress("info.kensuite@gmail.com", "Kensuite Technologies Pvt Ltd.");
            var toEmail = new MailAddress(email);
            var fromEmailPassword = "Password$9"; // Replace with actual password

            string subject = "";
            string body = "";
            if (emailFor == "VerifyAccount")
            {
                subject = "Your account is successfully created!";
                body = "<br/><br/>We are excited to tell you that your Dotnet Awesome account is" +
                    " successfully created. Please click on the below link to verify your account" +
                    " <br/><br/><a href='" + link + "'>" + link + "</a> ";
            }
            else if (emailFor == "ChangePassword")
            {
                body = GetEmailText();
                subject = "Forgot Password";
                body = body.Replace("$#$EmailText$#$", "We got request for reset your account password. Please click on the below link to reset your password.");
                body = body.Replace("$#$ButtonLinkUrl$#$", link);
                body = body.Replace("$#$ButtonLinkText$#$", "Reset Password");
            }

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
            };
            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
                smtp.Send(message);
        }


        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        [HttpPost]
        [Route("api/User/ForgotPassword")]
        public int ForgotPassword(EmailInfo EmailObj)
        {
            UserContract userWorker = new UserWorker();
            UserBo u = userWorker.GetUserByEmail(EmailObj.Email);

            if (u != null)
            {
                string role = userWorker.GetAspNetUser(u.AspNetUser_Id).AspNetRoles.ToList()[0].Name;
                string resetCode = Guid.NewGuid().ToString();
                SendVerificationLinkEmail(u.Email, resetCode, role, "ChangePassword");
                u.ResetPasswordCode = resetCode;
                return userWorker.UpdatePartialUserProps(u);
            }
            else
            {
                return 0;
            }

        }

        [HttpGet]
        [Route("api/User/ValidateKey")]
        public int ValidateKey(string email, string key, string codeFor)
        {
            UserContract userWorker = new UserWorker();
            UserBo u = userWorker.GetUserByEmail(email);
            bool isValid = false;
            if (u != null)
            {
                isValid = ((codeFor == "changepassword" && u.ResetPasswordCode == key) ||
                        (codeFor == "emailactivation" && u.EmailActivationCode == key));
            }

            return isValid ? 1 : 0;
        }

        [NonAction]
        public string GetEmailText()
        {
            return "<html><head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'> <style>.container{margin: 50px;}.logo-text{font-size: 40px; font-weight: 500; color: #fff; margin-bottom: 20px;}.bg-primary, .btn-primary{background-color: #00317f !important;}.card-header{border-top-left-radius: 5px; border-top-right-radius: 5px;}.card *{border: none;}.card, .card *{border: none;}.card-header, .card-body{padding-left: 20px;}.card-footer:last-child{border-radius: 0 0 calc(.25rem - 1px) calc(.25rem - 1px);}.text-muted{color: #6c757d !important;}.text-center{text-align: center !important;}.card-footer{padding: .75rem 1.25rem; background-color: rgba(0, 0, 0, .03); border-top: 1px solid rgba(0, 0, 0, .125);}.small, small{font-size: 80%; font-weight: 400;}h1, h2, h3, h4, h5, h6{margin-top: 0; margin-bottom: .5rem;}*, ::after, ::before{box-sizing: border-box;}h5{display: block; font-size: 0.83em; margin-block-start: 1.67em; margin-block-end: 1.67em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;}.text-center{text-align: center !important;}.small{font-size: 80%; font-weight: 400;}.card-footer{padding: .75rem 1.25rem; background-color: rgba(0, 0, 0, .03);}.text-muted{color: #6c757d !important;}.card-footer:last-child{border-radius: 0 0 calc(.25rem - 1px) calc(.25rem - 1px);}body{background-color: rgba(0, 0, 0, .03); margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 1rem; font-weight: 400; line-height: 1.5; color: #212529; text-align: left; background-color: #fff;}.btn:not(:disabled):not(.disabled){cursor: pointer;}.bg-primary, .btn-primary{background-color: #00317f !important; color: #fff;}.btn{display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid transparent; padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; border-radius: .25rem; transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out; color: #fff; text-decoration: none;}.card{border-radius: 5px !important; border: 1px solid #ccc; /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23) !important; */}</style></head><body> <div class='container'> <div class='card'> <div class='card-header bg-primary'> <h5 class='text-white logo-text'>Ken Jobs</h5> </div><div class='card-body text-muted'> <p class='card-text'> <div class='pb-4'>Hi,</div><div class='pb-4'> <p class='mb-2'>$#$EmailText$#$</p><a href='$#$ButtonLinkUrl$#$' class='btn btn-primary'>$#$ButtonLinkText$#$d</a> </div><br/> Greetings,<br/> Ken Jobs Team </p></div><div class='small card-footer footer text-center text-muted'>Copyright © All rights reserved.<br/>Kensuite</div></div></div></body></html>";
        }
    }
}
