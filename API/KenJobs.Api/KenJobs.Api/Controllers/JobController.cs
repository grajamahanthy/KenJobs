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
using System.Threading.Tasks;

namespace KenJobs.Api.Controllers
{
    public class JobController : ApiController
    {
        // GET: api/Job
        public IEnumerable<JobsModel> Get()
        {
            JobsContract Jobworker = new JobsWorker();
            IEnumerable<JobBo> jobBoList = Jobworker.GetJobs();

            List<JobsModel> jobModleList = new List<JobsModel>();

            foreach(JobBo jobBo in jobBoList)
            {
                JobsModel jobmodel = new JobsModel();

                jobmodel.Id = jobBo.Id;
                jobmodel.Client_Id = jobBo.Client_Id;
                jobmodel.JobTitle = jobBo.JobTitle;
                jobmodel.Description = jobBo.Description;
                jobmodel.NoOfVacancies = jobBo.NoOfVacancies;
                jobmodel.Qualification = jobBo.Qualification;
                jobmodel.State = jobBo.State;
                jobmodel.City = jobBo.City;
                jobmodel.PostDate = jobBo.PostDate;
                jobmodel.Status = jobBo.Status;
                jobmodel.PostingStatus = jobBo.PostingStatus;
                jobmodel.JobType_Id = jobBo.JobType_Id;
                jobmodel.Category_id = jobBo.Category_id;
                jobmodel.MinSalary = jobBo.MinSalary;
                jobmodel.MaxSalary = jobBo.MaxSalary;
                jobmodel.MinExperience = jobBo.MinExperience;
                jobmodel.MaxExperience = jobBo.MaxExperience;
                jobmodel.User_Id = jobBo.User_Id;
                jobmodel.ClientName = jobBo.ClientName;
                jobmodel.Currency = jobBo.Currency;
                jobmodel.Country = jobBo.Country;
                jobmodel.AddressLine = jobBo.AddressLine;





                jobModleList.Add(jobmodel);
            }
            return jobModleList;
        }
        // GET: api/Job/5
        public JobsModel Get(int id)
        {

            JobsContract Jobworker = new JobsWorker();
            JobBo jobBo = Jobworker.GetJob(id);

            JobsModel jobmodel = new JobsModel();

            jobmodel.Id = jobBo.Id;
            jobmodel.Client_Id = jobBo.Client_Id;
            jobmodel.JobTitle = jobBo.JobTitle;
            jobmodel.Description = jobBo.Description;
            jobmodel.NoOfVacancies = jobBo.NoOfVacancies;
            jobmodel.Qualification = jobBo.Qualification;
            jobmodel.State = jobBo.State;
            jobmodel.City = jobBo.City;
            jobmodel.PostDate = jobBo.PostDate;
            jobmodel.Status = jobBo.Status;
            jobmodel.PostingStatus = jobBo.PostingStatus;
            jobmodel.JobType_Id = jobBo.JobType_Id;
            jobmodel.Category_id = jobBo.Category_id;
            jobmodel.MinSalary = jobBo.MinSalary;
            jobmodel.MaxSalary = jobBo.MaxSalary;
            jobmodel.MinExperience = jobBo.MinExperience;
            jobmodel.MaxExperience = jobBo.MaxExperience;
            jobmodel.User_Id = jobBo.User_Id;
            jobmodel.ClientName = jobBo.ClientName;
            jobmodel.Currency = jobBo.Currency;
            jobmodel.Country = jobBo.Country;
            jobmodel.AddressLine = jobBo.AddressLine;

            return jobmodel;
        }

        // POST: api/Job
        public async Task<IHttpActionResult> Post(JobsModel jobmodel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            JobBo jobBo = new JobBo();

            jobBo.Id = jobmodel.Id;
            jobBo.Client_Id = jobmodel.Client_Id;
            jobBo.JobTitle = jobmodel.JobTitle;
            jobBo.Description = jobmodel.Description;
            jobBo.NoOfVacancies = jobmodel.NoOfVacancies;
            jobBo.Qualification = jobmodel.Qualification;
            jobBo.State = jobmodel.State;
            jobBo.City = jobmodel.City;
            jobBo.PostDate = jobmodel.PostDate;
            jobBo.Status = jobmodel.Status;
            jobBo.PostingStatus = jobmodel.PostingStatus;
            jobBo.JobType_Id = jobmodel.JobType_Id;
            jobBo.Category_id = jobmodel.Category_id;
            jobBo.MinSalary = jobmodel.MinSalary;
            jobBo.MaxSalary = jobmodel.MaxSalary;
            jobBo.MinExperience = jobmodel.MinExperience;
            jobBo.MaxExperience = jobmodel.MaxExperience;
            jobBo.User_Id = jobmodel.User_Id;

            JobsContract Jobworker = new JobsWorker();
             Jobworker.PostJob(jobBo);

            return Ok();
        }

        // PUT: api/Job/5
        public async Task<IHttpActionResult> Put(int id, JobsModel jobmodel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            JobBo jobBo = new JobBo();
            jobBo.Id = jobmodel.Id;
            jobBo.Client_Id = jobmodel.Client_Id;
            jobBo.JobTitle = jobmodel.JobTitle;
            jobBo.Description = jobmodel.Description;
            jobBo.NoOfVacancies = jobmodel.NoOfVacancies;
            jobBo.Qualification = jobmodel.Qualification;
            jobBo.State = jobmodel.State;
            jobBo.City = jobmodel.City;
            jobBo.PostDate = jobmodel.PostDate;
            jobBo.Status = jobmodel.Status;
            jobBo.PostingStatus = jobmodel.PostingStatus;
            jobBo.JobType_Id = jobmodel.JobType_Id;
            jobBo.Category_id = jobmodel.Category_id;
            jobBo.MinSalary = jobmodel.MinSalary;
            jobBo.MaxSalary = jobmodel.MaxSalary;
            jobBo.MinExperience = jobmodel.MinExperience;
            jobBo.MaxExperience = jobmodel.MaxExperience;
            jobBo.User_Id = jobmodel.User_Id;

            JobsContract Jobworker = new JobsWorker();

            Jobworker.UpdateJob(id, jobBo);

            return Ok();
        }

        // DELETE: api/Job/5
        public void Delete(int id)
        {
        }

        [HttpGet]
        [Route("api/Job/GetJobseekersByJobId/{JobId}")]
        public IEnumerable<UserProfileModel> GetJobseekersByJobId(int JobId)
        {
            JobsContract jobsWorker = new JobsWorker();
            IEnumerable<UserBo> userBoList = jobsWorker.GetJobseekersByJobId(JobId);

            List<UserProfileModel> userProfileModelList = new List<UserProfileModel>();

            foreach(UserBo userBo in userBoList)
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
                //userProfileModel.Profile = profileModelMapper(userBo.Profile);
                //userProfileModel.Experience = experienceModelMapper(userBo.Experience);
                //userProfileModel.EducationalQualification = educationalQualificationModelMapper(userBo.EducationalQualification);
                userProfileModelList.Add(userProfileModel);
            }
            return userProfileModelList;

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
    }
}
