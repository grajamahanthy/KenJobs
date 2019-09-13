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
    public class JobController : BaseController
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

       
        [HttpGet]
        [Route("api/Job")]
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
            jobmodel.Skills = jobBo.Skills;
            jobmodel.PostDate = jobBo.PostDate;

            JobTypeModel jobTypeModel = new JobTypeModel();
            JobTypeBo jobTypeBo = jobBo.JobType;
            jobTypeModel.Id = jobTypeBo.Id;
            jobTypeModel.Name = jobTypeBo.Name;
            jobTypeModel.Status = jobTypeBo.Status;

            jobmodel.JobType = jobTypeModel;

            JobCategoryModel jobCategoryModel = new JobCategoryModel();
            JobCategoryBo jobCategoryBo = jobBo.JobCategory;

            jobCategoryModel.Id = jobCategoryBo.Id;
            jobCategoryModel.Category = jobCategoryBo.Category;
            jobCategoryModel.Status = jobCategoryBo.Status;

            jobmodel.JobCategory = jobCategoryModel;
            return jobmodel;
        }

        // POST: api/Job
        [Authorize]
        [HttpPost]
        [Route("api/Job")]
        public IHttpActionResult Post(JobsModel jobModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            KenJobsSession s = GetKenJobsSession();
            JobsContract Jobworker = new JobsWorker();

            JobBo jobBo = new JobBo();

            jobBo.Client_Id = jobModel.Client_Id;
            jobBo.JobTitle = jobModel.JobTitle;
            jobBo.Description = jobModel.Description;
            jobBo.NoOfVacancies = jobModel.NoOfVacancies;
            jobBo.Qualification = jobModel.Qualification;
            jobBo.State = jobModel.State;
            jobBo.City = jobModel.City;
            jobBo.Status = jobModel.Status;
            jobBo.PostingStatus = jobModel.PostingStatus;
            jobBo.JobType_Id = jobModel.JobType_Id;
            jobBo.Category_id = jobModel.Category_id;
            jobBo.Skills = jobModel.Skills;
            jobBo.MinSalary = jobModel.MinSalary;
            jobBo.MaxSalary = jobModel.MaxSalary;
            jobBo.MinExperience = jobModel.MinExperience;
            jobBo.MaxExperience = jobModel.MaxExperience;
            jobBo.User_Id = s.User.Id;
            jobBo.ClientName = jobModel.ClientName;
            jobBo.Currency = jobModel.Currency;
            jobBo.Country = jobModel.Country;

             Jobworker.PostJob(jobBo);

            return Ok(1);
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

            return Ok(1);
        }

        // DELETE: api/Job/5
        public void Delete(int id)
        {
        }

        [Authorize]
        [HttpPost]
        [Route("api/Job/Updatejob")]
        public int Updatejob(JobsModel jobModel)
        {
            JobsContract jobsWorker = new JobsWorker();
            JobBo jobBo = new JobBo();
            jobBo.Id = jobModel.Id;
            jobBo.Client_Id = jobModel.Client_Id;
            jobBo.JobTitle = jobModel.JobTitle;
            jobBo.Description = jobModel.Description;
            jobBo.NoOfVacancies = jobModel.NoOfVacancies;
            jobBo.Qualification = jobModel.Qualification;
            jobBo.State = jobModel.State;
            jobBo.City = jobModel.City;
            jobBo.Status = jobModel.Status;
            jobBo.PostingStatus = jobModel.PostingStatus;
            jobBo.JobType_Id = jobModel.JobType_Id;
            jobBo.Category_id = jobModel.Category_id;
            jobBo.Skills = jobModel.Skills;
            jobBo.MinSalary = jobModel.MinSalary;
            jobBo.MaxSalary = jobModel.MaxSalary;
            jobBo.MinExperience = jobModel.MinExperience;
            jobBo.MaxExperience = jobModel.MaxExperience;
            jobBo.User_Id = jobModel.User_Id;
            jobBo.ClientName = jobModel.ClientName;
            jobBo.Currency = jobModel.Currency;
            jobBo.Country = jobModel.Country;
            jobBo.AddressLine = jobModel.AddressLine;


            JobTypeBo jobTypeBo = new JobTypeBo();
            JobTypeModel jobTypeModel = jobModel.JobType;
            jobTypeBo.Id = jobTypeBo.Id;
            jobTypeBo.Name = jobTypeBo.Name;
            jobTypeBo.Status = jobTypeBo.Status;
            jobBo.JobType = jobTypeBo;



            //JobCategoryBo jobCategoryBo = new JobCategoryBo();
            //JobCategoryModel jobCategoryModel = jobModel.JobCategory;
            //jobCategoryBo.Id = jobCategoryModel.Id;
            //jobCategoryBo.Category = jobCategoryModel.Category;
            //jobCategoryBo.Status = jobCategoryModel.Status;
            //jobBo.JobCategory = jobCategoryBo;



            jobsWorker.UpdateJob(jobBo.Id, jobBo);


            return 1;
        }

        [Authorize]
        [HttpGet]
        [Route("api/Job/GetJobsByUserId")]
        public List<JobsModel> GetJobsByUserId()
        {
            KenJobsSession s = GetKenJobsSession();
            JobsContract jobsWorker = new JobsWorker();
            IEnumerable<JobBo> jobBoList = jobsWorker.GetJobsByUserId(s.User.Id);

            List<JobsModel> jobModelList = new List<JobsModel>();

            foreach (JobBo jobBo in jobBoList)
            {
                JobsModel jobsModel = new JobsModel();
                jobsModel.Id = jobBo.Id;
                jobsModel.Client_Id = jobBo.Client_Id;
                jobsModel.JobTitle = jobBo.JobTitle;
                jobsModel.Description = jobBo.Description;
                jobsModel.NoOfVacancies = jobBo.NoOfVacancies;
                jobsModel.Qualification = jobBo.Qualification;
                jobsModel.State = jobBo.State;
                jobsModel.City = jobBo.City;
                jobsModel.PostDate = jobBo.PostDate;
                jobsModel.PostingStatus = jobBo.PostingStatus;
                jobsModel.JobType_Id = jobBo.JobType_Id;
                jobsModel.Category_id = jobBo.Category_id;
                jobsModel.MinSalary = jobBo.MinSalary;
                jobsModel.MaxSalary = jobBo.MaxSalary;
                jobsModel.MinExperience = jobBo.MinExperience;
                jobsModel.MaxExperience = jobBo.MaxExperience;
                jobsModel.User_Id = jobBo.User_Id;
                jobsModel.ClientName = jobBo.ClientName;
                jobsModel.Currency = jobBo.Currency;
                jobsModel.Country = jobBo.Country;
                jobsModel.Skills = jobBo.Skills;
                jobsModel.AddressLine = jobBo.AddressLine;
                jobsModel.Status= jobBo.Status;

                JobTypeModel jobTypeModel = new JobTypeModel();
                JobTypeBo jobTypeBo = jobBo.JobType;
                jobTypeModel.Id = jobTypeBo.Id;
                jobTypeModel.Name = jobTypeBo.Name;
                jobTypeModel.Status = jobTypeBo.Status;

                jobsModel.JobType = jobTypeModel;

                JobCategoryModel jobCategoryModel = new JobCategoryModel();
                JobCategoryBo jobCategoryBo = jobBo.JobCategory;

                jobCategoryModel.Id = jobCategoryBo.Id;
                jobCategoryModel.Category = jobCategoryBo.Category;
                jobCategoryModel.Status = jobCategoryBo.Status;

                jobsModel.JobCategory = jobCategoryModel;


                jobModelList.Add(jobsModel);
            }
            return jobModelList;
        }

        [Authorize]
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
                userProfileModel.Profile = profileModelMapper(userBo.Profile);
                userProfileModel.Experience = experienceModelMapper(userBo.Experience);
                userProfileModel.EducationalQualification = educationalQualificationModelMapper(userBo.EducationalQualification);
                userProfileModel.UserAttachments = userAttachmentsMapper(userBo.UserAttachment);
                userProfileModelList.Add(userProfileModel);
            }
            return userProfileModelList;

        }


        public List<ProfileModel> profileModelMapper(List<ProfileBo> profileBoList)
        {
            List<ProfileModel> profileModlList = new List<ProfileModel>();
            if (profileBoList != null && profileBoList.Count > 0)
            {
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
            }
            else
            {
                profileModlList.Add(new ProfileModel());
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

        List<UserAttachmentModel> userAttachmentsMapper(List<UserAttachmentBo> userAttachmentBoList)
        {
            List<UserAttachmentModel> userAttachmentModelList = new List<UserAttachmentModel>();
            foreach (UserAttachmentBo userAttachmentBo in userAttachmentBoList)
            {
                UserAttachmentModel userAttachmentModel = new UserAttachmentModel();
                userAttachmentModel.Id = userAttachmentBo.Id;
                userAttachmentModel.User_Id = userAttachmentBo.User_Id;
                userAttachmentModel.Attachment_Id = userAttachmentBo.Attachment_Id;
                userAttachmentModel.AttachmentType_Id = userAttachmentBo.AttachmentType_Id;
                userAttachmentModel.Name = userAttachmentBo.Name;
                userAttachmentModel.Attachment = new AttachmentModel()
                {
                    Id = userAttachmentBo.Attachment.Id,
                    Base64Text = userAttachmentBo.Attachment.Base64Text,
                    FileExtension = userAttachmentBo.Attachment.FileExtension,
                };
                userAttachmentModelList.Add(userAttachmentModel);
            }
            return userAttachmentModelList;
        }
    }
}
