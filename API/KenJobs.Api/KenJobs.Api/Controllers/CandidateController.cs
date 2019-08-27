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
    public class CandidateController : BaseController
    {

        [Authorize]
        [HttpGet]
        // GET: api/Candidate
        public IHttpActionResult Get()
        {
            UserContract userWorker = new UserWorker();
            KenJobsSession s = GetKenJobsSession();
            UserBo userBo = userWorker.GetUser(s.User.AspNetUser_Id);

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
            userProfileModel.UserAttachment = userAttachmentMapper(userBo.UserAttachment);

            userProfileModel.CreatedBy = userBo.CreatedBy;
            userProfileModel.CreatedOn = userBo.CreatedOn;

            return Ok(userProfileModel);
        }

        [Authorize]
        [HttpGet]
        // GET: api/Candidate
        [Route("api/Candidate/GetCandidateById")]

        public IHttpActionResult GetCandidateById(int UserId)
        {
            UserContract userWorker = new UserWorker();
            KenJobsSession s = GetKenJobsSession();
            UserBo userBo = userWorker.GetUserById(UserId);

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
            userProfileModel.UserAttachment = userAttachmentMapper(userBo.UserAttachment);

            userProfileModel.CreatedBy = userBo.CreatedBy;
            userProfileModel.CreatedOn = userBo.CreatedOn;

            return Ok(userProfileModel);
        }

        // GET: api/Candidate/5
        [Authorize]
        [HttpPost]
        [Route("api/Candidate/GetCandidates")]
        public IHttpActionResult GetCandidates(CandidateSearchModel candidateSearchModel)
        {
            CandidateContract candidateWorker = new CandidateWorker();
            CandidateBo candidateBo = new CandidateBo();
            candidateBo.UserName = (string.IsNullOrEmpty(candidateSearchModel.UserName) ? "" : candidateSearchModel.UserName);
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

        [Authorize]
        [HttpPost]
        [Route("api/Candidate/UpdateCandidate")]
        public IHttpActionResult UpdateCandidate(UserProfileModel userProfileModel)
        {
            int returnstatus = 0;
            UserContract userWorker = new UserWorker();
            KenJobsSession s = GetKenJobsSession();

            UserBo userBo = new UserBo();
            userBo.Id = s.User.Id;
            userBo.FirstName = userProfileModel.FirstName;
            userBo.LastName = userProfileModel.LastName;
            userBo.Email = userProfileModel.Email;
            userBo.PhoneNumber = userProfileModel.PhoneNumber;
            userBo.Gender_Id = userProfileModel.Gender_Id;
            userBo.ProfilePhoto = userProfileModel.ProfilePhoto;

            returnstatus = userWorker.UpdateEmployer(userBo.Id, userBo);

            //Profile
            ProfileModel profileModal = new ProfileModel();
            profileModal = userProfileModel.Profile[0];

            ProfileBo profileBo = new ProfileBo();
            profileBo.Id = profileModal.Id != null ? (int)profileModal.Id : 0;
            profileBo.User_Id = s.User.Id;
            profileBo.Resume = "resume.doc";
            profileBo.skills = profileModal.skills;
            profileBo.TotalExperiance = profileModal.TotalExperiance;
            profileBo.HeighestQualification = profileModal.HeighestQualification;
            profileBo.PreferredLocation = profileModal.PreferredLocation;
            profileBo.CurrentSalary = profileModal.CurrentSalary;
            profileBo.ExpectedSalary = profileModal.ExpectedSalary;
            profileBo.Languages = profileModal.Languages;
            ProfileContract profileWorker = new ProfileWorker();

            if (profileModal.Id != null)
            {
                profileWorker.UpdateProfile(profileBo.Id, profileBo);
            }
            else
            {
                profileWorker.PostProfile(profileBo);
            }

            //Experience
            List<ExperienceModel> experienceModalList = userProfileModel.Experience;
            if (experienceModalList.Count > 0)
            {
                foreach (ExperienceModel experienceModal in experienceModalList)
                {
                    if (!(experienceModal.UiStatus == "D" &&
                        (experienceModal.Id == null || experienceModal.Id == 0)))
                    {
                        ExperienceBo experienceBo = new ExperienceBo();
                        experienceBo.Id = experienceModal.Id != null ? (int)experienceModal.Id : 0;
                        experienceBo.User_Id = s.User.Id;
                        experienceBo.CompanyName = experienceModal.CompanyName;
                        experienceBo.Technology = experienceModal.Technology;
                        experienceBo.Role = experienceModal.Role;
                        experienceBo.StartDate = experienceModal.StartDate;
                        experienceBo.EndDate = experienceModal.EndDate;
                        experienceBo.UiStatus = experienceModal.UiStatus;
                        ExperienceContract experienceWorker = new ExperienceWorker();
                        if (experienceBo.UiStatus == "A")
                        {
                            //Add
                            experienceWorker.PostExperience(experienceBo);

                        }
                        else if (experienceBo.UiStatus == "E")
                        {
                            //Edit
                            experienceWorker.UpdateExperience(experienceBo.Id, experienceBo);


                        }
                        else if (experienceBo.UiStatus == "D")
                        {
                            //Delete
                            experienceWorker.DeleteExperience(experienceBo.Id);
                        }
                    }
                }
            }
            else
            {

            }

            //Education
            List<EducationalQualificationModel> educationalModalList = userProfileModel.EducationalQualification;
            if (educationalModalList.Count > 0)
            {
                foreach (EducationalQualificationModel educationalModal in educationalModalList)
                {
                    if (!(educationalModal.UiStatus == "D" &&
                      (educationalModal.Id == null || educationalModal.Id == 0)))
                    {
                        EducationalQualificationBo educationalQualificationBo = new EducationalQualificationBo();
                        educationalQualificationBo.Id = educationalModal.Id != null ? (int)educationalModal.Id : 0;
                        educationalQualificationBo.User_Id = s.User.Id;
                        educationalQualificationBo.Institute = educationalModal.Institute;
                        educationalQualificationBo.Qualification = educationalModal.Qualification;
                        educationalQualificationBo.YearOfPass = educationalModal.YearOfPass;
                        educationalQualificationBo.Percentage = educationalModal.Percentage;
                        educationalQualificationBo.UiStatus = educationalModal.UiStatus;

                        EducationalQualificationContract educationalQualificationContract = new EducationalQualificationWorker();
                        if (educationalQualificationBo.UiStatus == "A")
                        {
                            //Add
                            educationalQualificationContract.PostEducationalQualification(educationalQualificationBo);
                        }
                        else if (educationalQualificationBo.UiStatus == "E")
                        {
                            //create
                            educationalQualificationContract.UpdateEducationalQualification(educationalQualificationBo.Id, educationalQualificationBo);

                        }
                        else if (educationalQualificationBo.UiStatus == "D")
                        {
                            //Delete
                            educationalQualificationContract.DeleteEducationalQualification(educationalQualificationBo.Id);

                        }
                    }
                }
            }
            else
            {

            }

            return Ok(returnstatus);
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

        [NonAction]
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

        [NonAction]

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

        [NonAction]
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

        UserAttachmentModel userAttachmentMapper(List<UserAttachmentBo> userAttachmentBoList)
        {
            List<UserAttachmentModel> userAttachmentModelList = new List<UserAttachmentModel>();
            UserAttachmentModel userAttachmentModel = new UserAttachmentModel();

            foreach (UserAttachmentBo userAttachmentBo in userAttachmentBoList)
            {
                if (userAttachmentBo.AttachmentType_Id == 1)
                {
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
                }
            }
            return userAttachmentModel;

        }
    }
}
