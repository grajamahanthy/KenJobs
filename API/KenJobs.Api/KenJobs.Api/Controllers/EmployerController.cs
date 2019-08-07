using KenJobs.Api.Models;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KenJobs.Api.Controllers
{
    public class EmployerController : BaseController
    {
        // GET: api/Employer
        [Authorize]
        public IHttpActionResult GetEmployers()
        {
            return Ok();
        }

        // GET: api/Employer/5
        [Authorize]

        public IHttpActionResult Get(int id)
        {
            UserContract userWorker = new UserWorker();
            KenJobsSession s = GetKenJobsSession();
            UserBo userBo = userWorker.GetUser(id.ToString());
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
            userProfileModel.CreatedBy = userBo.CreatedBy;
            userProfileModel.CreatedOn = userBo.CreatedOn;

            return Ok(userProfileModel);
        }

        // GET: api/Employer/5
        [Authorize]
        [Route("api/Employer/GetEmployerById")]
        public IHttpActionResult GetEmployerById()
        {
            UserContract userWorker = new UserWorker();
            KenJobsSession s = GetKenJobsSession();
            UserBo userBo = userWorker.GetUser(s.User.AspNetUser_Id);
            EmployerModel employerModel = new EmployerModel();

            employerModel.Id = userBo.Id;
            employerModel.FirstName = userBo.FirstName;
            employerModel.LastName = userBo.LastName;
            employerModel.PhoneNumber = userBo.PhoneNumber;
            employerModel.Email = userBo.Email;
            employerModel.ProfilePhoto = userBo.ProfilePhoto;
            employerModel.Gender_Id = userBo.Gender_Id;
            employerModel.Status = userBo.Status;
            employerModel.CreatedBy = userBo.CreatedBy;
            employerModel.CreatedOn = userBo.CreatedOn;

            return Ok(employerModel);
        }

        [Authorize]

        public IHttpActionResult PostEmployer(UserModel userModel)
        {
            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route("api/Employer/UpdateEmployer")]
        public IHttpActionResult UpdateEmployer(EmployerModel employerModel)
        {
            int returnstatus = 0;
            UserContract userWorker = new UserWorker();

            UserBo userBo = new UserBo();
            userBo.Id = employerModel.Id;
            userBo.FirstName = employerModel.FirstName;
            userBo.LastName = employerModel.LastName;
            userBo.Email = employerModel.Email;
            userBo.PhoneNumber = employerModel.PhoneNumber;
            userBo.Gender_Id = employerModel.Gender_Id;
            userBo.ProfilePhoto = employerModel.ProfilePhoto;
            
                returnstatus= userWorker.UpdateEmployer(userBo.Id, userBo);

            return Ok(returnstatus);
        }


        // POST: api/Employer
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Employer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Employer/5
        public void Delete(int id)
        {
        }
    }
}
