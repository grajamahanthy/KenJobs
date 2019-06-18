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

namespace KenJobs.Api.Controllers
{
    public class UserController : ApiController
    {
        // GET: api/User
        public IEnumerable<UserModel> Get()
        {
            UserContract userWorker = new UserWorker();
            IEnumerable<UserBo> userBolist = userWorker.GetUsers();

            List<UserModel> userModelList = new List<UserModel>();

            foreach(UserBo userBo in userBolist)
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
                userModel.CreateOn = userBo.CreateOn;
                userModelList.Add(userModel);
            }

            return userModelList;

        }

        // GET: api/User/5
        public string Get(int id)
        {
          
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
    }
}
