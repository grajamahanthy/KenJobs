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
    public class CandidateController : ApiController
    {
        // GET: api/Candidate
        public IHttpActionResult Get()
        {
            return Ok( new string[] { "value1", "value2" });
        }

        // GET: api/Candidate/5
        [Authorize]
        [HttpPost]
        [Route("api/Candidate/GetCandidates")]
        public IHttpActionResult GetCandidates(CandidateSearchModel candidateSearchModel)
        {
            CandidateContract candidateWorker = new CandidateWorker();
            CandidateBo candidateBo = new CandidateBo();
            candidateBo.UserName = (string.IsNullOrEmpty(candidateSearchModel.UserName) ? "": candidateSearchModel.UserName);
            candidateBo.Location = (string.IsNullOrEmpty(candidateSearchModel.Location) ? "" : candidateSearchModel.Location);
            candidateBo.SkillSet = (string.IsNullOrEmpty(candidateSearchModel.SkillSet) ? "" : candidateSearchModel.SkillSet);
            candidateBo.NoticePeriod = (candidateSearchModel.NoticePeriod == null ? 1000 : candidateSearchModel.NoticePeriod);
            candidateBo.MinExperience = (candidateSearchModel.MinExperience == null ? 0 : candidateSearchModel.MinExperience);
            candidateBo.MaxExperience = (candidateSearchModel.MaxExperience == 0 ? 100 : candidateSearchModel.MaxExperience);


            IEnumerable<UserBo> listCandidateBo = candidateWorker.GetCandidates(candidateBo);
            List<UserProfileModel> listCandidates = new List<UserProfileModel>();
            JobController jobController = new JobController();
            foreach (UserBo userBo in listCandidateBo)
            {
                UserProfileModel userProfileModel = new UserProfileModel();

                userProfileModel.Id = userBo.Id;
                userProfileModel.Title = userBo.Title;

                userProfileModel.FirstName = userBo.FirstName;
                userProfileModel.MiddleName = userBo.MiddleName;
                userProfileModel.LastName = userBo.LastName;
                userProfileModel.PhoneNumber = userBo.PhoneNumber;
                userProfileModel.Email = userBo.Email;
                userProfileModel.ProfilePhoto = userBo.ProfilePhoto;
                userProfileModel.Gender_Id = userBo.Gender_Id;
                userProfileModel.Status = userBo.Status;
                userProfileModel.AspNetUser_Id = userBo.AspNetUser_Id;
                userProfileModel.Profile = jobController.profileModelMapper(userBo.Profile);

                listCandidates.Add(userProfileModel);
            } 



            //IEnumerable<>

            return Ok(listCandidates);
        }



        // POST: api/Candidate
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Candidate/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Candidate/5
        public void Delete(int id)
        {
        }
    }
}
