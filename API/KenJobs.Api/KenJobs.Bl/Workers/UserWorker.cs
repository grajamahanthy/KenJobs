using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using KenJobs.Dal;
using System.Collections.Generic;


namespace KenJobs.Bl.Workers
{
    public class UserWorker : UserContract
    {
        public UserBo GetUser(string userid)
        {

            IGenericRepository<AspNetUser> repository = new GenericRepository<AspNetUser>();
            //object objid = userid;
            try
            {
                AspNetUser aspNetUser = repository.GetById(userid);

                User user = aspNetUser.Users.ToList()[0];
                List<ProfileBo> profileBoList = new List<ProfileBo>();

                //ICollection<ProfileBo> IprofileBo = new ICollection<ProfileBo>();
                foreach (Profile profile in user.Profiles)
                {
                    ProfileBo profileBo = new ProfileBo();

                    profileBo.Id = profile.Id;
                    profileBo.USer_Id = profile.USer_Id;
                    profileBo.Resume = profile.Resume;
                    profileBo.skills = profile.skills;
                    profileBo.TotalExperiance = profile.TotalExperiance;
                    profileBo.HeighestQualification = profile.HeighestQualification;
                    profileBo.PreferredLocation = profile.PreferredLocation;
                    profileBo.CurrentSalary = profile.CurrentSalary;
                    profileBo.ExpectedSalary = profile.ExpectedSalary;
                    profileBo.Languages = profile.Languages;
                    profileBoList.Add(profileBo);
                }

                List<ExperienceBo> experienceBoList = new List<ExperienceBo>();

                //ICollection<ProfileBo> IprofileBo = new ICollection<ProfileBo>();
                foreach (Experience experience in user.Experiences)
                {
                    ExperienceBo experienceBo = new ExperienceBo();

                    experienceBo.Id = experience.Id;
                    experienceBo.User_Id = experience.User_Id;
                    experienceBo.CompanyName = experience.CompanyName;
                    experienceBo.Technology = experience.Technology;
                    experienceBo.Role = experience.Role;
                    experienceBo.StartDate = experience.StartDate;
                    experienceBo.EndDate = experience.EndDate;
                    experienceBo.Description = experience.Description;
                    experienceBoList.Add(experienceBo);
                }

                List<EducationalQualificationBo> educationalQualificationBoList = new List<EducationalQualificationBo>();

                //ICollection<ProfileBo> IprofileBo = new ICollection<ProfileBo>();
                foreach (EducationalQualification educationalQualification in user.EducationalQualifications)
                {
                    EducationalQualificationBo educationalQualificationBo = new EducationalQualificationBo();

                    educationalQualificationBo.Id = educationalQualification.Id;
                    educationalQualificationBo.User_Id = educationalQualification.User_Id;
                    educationalQualificationBo.Institute = educationalQualification.Institute;
                    educationalQualificationBo.Qualification = educationalQualification.Qualification;
                    educationalQualificationBo.YearOfPass = educationalQualification.YearOfPass;
                    educationalQualificationBo.Percentage = educationalQualification.Percentage;
                    educationalQualificationBoList.Add(educationalQualificationBo);
                }

                UserBo userBo = new UserBo();
                userBo.Id = user.Id;
                userBo.FirstName = user.FirstName;
                userBo.MiddleName = user.MiddleName;
                userBo.LastName = user.LastName;
                userBo.ProfilePhoto = user.ProfilePhoto;
                userBo.Gender_Id = user.Gender_Id;
                userBo.Status = user.Status;
                userBo.CreatedBy = user.CreatedBy;
                userBo.CreateOn = user.CreateOn;
                userBo.UpdatedBy = user.UpdatedBy;
                userBo.UpdatedOn = user.UpdatedOn;
                userBo.AspNetUser_Id = user.AspNetUser_Id;
                userBo.PhoneNumber = user.PhoneNumber;
                userBo.Email = user.Email;
                userBo.Profile = profileBoList;
                userBo.Experience = experienceBoList;
                userBo.EducationalQualification = educationalQualificationBoList;


                return userBo;
            }
            catch (Exception ex)
            {
                return new UserBo();
            }
        }

        public IEnumerable<UserBo> GetUsers()
        {
            IGenericRepository<User> repository = new GenericRepository<User>();
            try {
                IEnumerable<User> userList = repository.GetAll();

                List<UserBo> UserBoList = new List<UserBo>();

                foreach (User user in userList)
                {
                    UserBo userBo = new UserBo();
                    userBo.Id = user.Id;
                    userBo.FirstName = user.FirstName;
                    userBo.MiddleName = user.MiddleName;
                    userBo.LastName = user.LastName;
                    userBo.ProfilePhoto = user.ProfilePhoto;
                    userBo.Gender_Id = user.Gender_Id;
                    userBo.Status = user.Status;
                    userBo.CreatedBy = user.CreatedBy;
                    userBo.CreateOn = user.CreateOn;
                    userBo.UpdatedBy = user.UpdatedBy;
                    userBo.UpdatedOn = user.UpdatedOn;
                    userBo.AspNetUser_Id = user.AspNetUser_Id;
                    userBo.PhoneNumber = user.PhoneNumber;
                    userBo.Email = user.Email;
                    UserBoList.Add(userBo);
                }
                return UserBoList;
            } catch(Exception ex) {
                return new List<UserBo>();
            }
            
        }

        public int InsertUser(UserBo userBo)
        {
            IGenericRepository<User> repository = new GenericRepository<User>();

            User user = new User();
            user.Id = userBo.Id;
            user.FirstName = userBo.FirstName;
            user.MiddleName = userBo.MiddleName;
            user.LastName = userBo.LastName;
            user.ProfilePhoto = userBo.ProfilePhoto;
            user.Gender_Id = userBo.Gender_Id;
            user.Status = userBo.Status;
            user.Title = userBo.Title;
            user.CreatedBy = "Client";
            user.CreateOn = DateTime.Now;
            user.UpdatedBy = userBo.UpdatedBy;
            user.UpdatedOn = userBo.UpdatedOn;
            user.AspNetUser_Id = userBo.AspNetUser_Id;
            user.PhoneNumber = userBo.PhoneNumber;
            user.Email = userBo.Email;
            try
            {
                repository.Insert(user);
                repository.Save();
                return 1;
            }
            catch(Exception ex)
            {
                return -1;
            }

        }

        public int UpdateUser(int id, UserBo userBo)
        {
            IGenericRepository<User> repository = new GenericRepository<User>();
            User user = new User();

            user.Id = userBo.Id;
            user.FirstName = userBo.FirstName;
            user.MiddleName = userBo.MiddleName;
            user.LastName = userBo.LastName;
            user.ProfilePhoto = userBo.ProfilePhoto;
            user.Gender_Id = userBo.Gender_Id;
            user.Status = userBo.Status;
            user.CreatedBy = userBo.CreatedBy;
            user.CreateOn = userBo.CreateOn;
            user.UpdatedBy = userBo.UpdatedBy;
            user.UpdatedOn = userBo.UpdatedOn;
            user.AspNetUser_Id = userBo.AspNetUser_Id;
            user.PhoneNumber = userBo.PhoneNumber;
            user.Email = userBo.Email;

            repository.Update(user);
            repository.Save();

            return 1;
        }


    }
}
