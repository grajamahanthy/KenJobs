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
                userModel.CreateOn = userBo.CreateOn;
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
            userProfileModel.CreateOn = userBo.CreateOn;

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
            foreach(ProfileBo profile in profileBoList)
            {
                ProfileModel profileModel = new ProfileModel();
                profileModel.Id = profile.Id;
                profileModel.USer_Id = profile.USer_Id;
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
            foreach(ExperienceBo experienceBo in experienceBoList)
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
            foreach(EducationalQualificationBo educationalQualificationBo in educationalQualificationBoList)
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
