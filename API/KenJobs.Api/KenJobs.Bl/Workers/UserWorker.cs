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
using System.Web.Script.Serialization;

namespace KenJobs.Bl.Workers
{
    public class UserWorker : UserContract
    {
        public AspNetUserBo GetAspNetUser(string id)
        {
            IGenericRepository<AspNetUser> repository = new GenericRepository<AspNetUser>();
            AspNetUserBo aspnetUserBo = new AspNetUserBo();
            AspNetUser aspnetUser = repository.GetById(id);

            aspnetUserBo.Id = aspnetUser.Id;
            aspnetUserBo.LockoutEnabled = aspnetUser.LockoutEnabled;
            aspnetUserBo.LockoutEndDateUtc = aspnetUser.LockoutEndDateUtc;
            aspnetUserBo.PasswordHash = aspnetUser.PasswordHash;
            aspnetUserBo.PhoneNumber = aspnetUser.PhoneNumber;
            aspnetUserBo.PhoneNumberConfirmed = aspnetUser.PhoneNumberConfirmed;
            aspnetUserBo.SecurityStamp = aspnetUser.SecurityStamp;
            aspnetUserBo.TwoFactorEnabled = aspnetUser.TwoFactorEnabled;
            aspnetUserBo.UserName = aspnetUser.UserName;
            aspnetUserBo.AccessFailedCount = aspnetUser.AccessFailedCount;
            aspnetUserBo.Email = aspnetUser.Email;
            aspnetUserBo.EmailConfirmed = aspnetUser.EmailConfirmed;

            aspnetUserBo.AspNetRoles = new List<AspNetRoleBo>();

            if (aspnetUserBo.AspNetRoles.Count > 0)
            {
                aspnetUserBo.AspNetRoles.Add(new AspNetRoleBo()
                {
                    Id = aspnetUser.AspNetRoles.ToList()[0].Id,
                    Name = aspnetUser.AspNetRoles.ToList()[0].Name
                });
            }
            else
            {
                aspnetUserBo.AspNetRoles.Add(new AspNetRoleBo()
                {
                    Id = "1",
                    Name = "JobSeeker"
                });
            }

            return aspnetUserBo;

        }
        public UserBo GetUser(string userid)
        {

            IGenericRepository<AspNetUser> repository = new GenericRepository<AspNetUser>();
            //object objid = userid;
            try
            {
                AspNetUser aspNetUser = repository.GetById(userid);
                User user = aspNetUser.Users.ToList()[0];

                UserBo userBo = new UserBo();
                userBo.Id = user.Id;
                userBo.FirstName = user.FirstName;
                userBo.MiddleName = user.MiddleName;
                userBo.LastName = user.LastName;
                userBo.ProfilePhoto = user.ProfilePhoto;
                userBo.Gender_Id = user.Gender_Id;
                userBo.Status = user.Status;
                userBo.CreatedBy = user.CreatedBy;
                userBo.CreatedOn = user.CreatedOn;
                userBo.UpdatedBy = user.UpdatedBy;
                userBo.UpdatedOn = user.UpdatedOn;
                userBo.AspNetUser_Id = user.AspNetUser_Id;
                userBo.PhoneNumber = user.PhoneNumber;
                userBo.Email = user.Email;

                userBo.ResetPasswordCode = user.ResetPasswordCode;
                userBo.EmailActivationCode = user.EmailActivationCode;
                userBo.Profile = GenerateProfileBo(user.Profiles);
                userBo.Experience = GenerateExperienceBo(user.Experiences);
                userBo.EducationalQualification = GenerateEducationalQualificationBo(user.EducationalQualifications);
                userBo.UserAttachment = GenerateUserAttachment(user.UserAttachments);
                return userBo;
            }
            catch (Exception ex)
            {
                return new UserBo();
            }

        }

        public string GetUserByAspId(string userid)
        {

            IGenericRepository<AspNetUser> repository = new GenericRepository<AspNetUser>();
            //object objid = userid;
            try
            {
                AspNetUser aspNetUser = repository.GetById(userid);
                User user = aspNetUser.Users.ToList()[0];

                UserBo userBo = new UserBo();
                userBo.Id = user.Id;
                userBo.FirstName = user.FirstName;
                userBo.MiddleName = user.MiddleName;
                userBo.LastName = user.LastName;
                userBo.ProfilePhoto = user.ProfilePhoto;
                userBo.Gender_Id = user.Gender_Id;
                userBo.Status = user.Status;
                userBo.CreatedBy = user.CreatedBy;
                userBo.CreatedOn = user.CreatedOn;
                userBo.UpdatedBy = user.UpdatedBy;
                userBo.UpdatedOn = user.UpdatedOn;
                userBo.AspNetUser_Id = user.AspNetUser_Id;
                userBo.PhoneNumber = user.PhoneNumber;
                userBo.Email = user.Email;

                userBo.ResetPasswordCode = user.ResetPasswordCode;
                userBo.EmailActivationCode = user.EmailActivationCode;
                userBo.Profile = GenerateProfileBo(user.Profiles);
                userBo.Experience = GenerateExperienceBo(user.Experiences);
                userBo.EducationalQualification = GenerateEducationalQualificationBo(user.EducationalQualifications);
                userBo.UserAttachment = GenerateUserAttachment(user.UserAttachments);

                JavaScriptSerializer js = new JavaScriptSerializer();

                string userAuthString = js.Serialize(userBo);



                return userAuthString.ToString();
            }
            catch (Exception ex)
            {
                return "";
            }

        }

        public IEnumerable<UserBo> GetUsers()
        {
            IGenericRepository<User> repository = new GenericRepository<User>();
            try
            {
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
                    userBo.CreatedOn = user.CreatedOn;
                    userBo.UpdatedBy = user.UpdatedBy;
                    userBo.UpdatedOn = user.UpdatedOn;
                    userBo.AspNetUser_Id = user.AspNetUser_Id;
                    userBo.PhoneNumber = user.PhoneNumber;
                    userBo.Email = user.Email;
                    UserBoList.Add(userBo);
                }
                return UserBoList;
            }
            catch (Exception ex)
            {
                return new List<UserBo>();
            }

        }

        public UserBo GetUserByEmail(string email)
        {
            ICustomRepository<User> repository = new CustomRepository<User>();
            User user = repository.GetUserByEmail(email);

            if (user != null)
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
                userBo.CreatedOn = user.CreatedOn;
                userBo.UpdatedBy = user.UpdatedBy;
                userBo.UpdatedOn = user.UpdatedOn;
                userBo.AspNetUser_Id = user.AspNetUser_Id;
                userBo.PhoneNumber = user.PhoneNumber;
                userBo.ResetPasswordCode = user.ResetPasswordCode;
                userBo.EmailActivationCode = user.EmailActivationCode;
                userBo.Email = user.Email;
                return userBo;
            }
            return null;

        }

        public int PostUser(UserBo userBo)
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
            user.CreatedOn = DateTime.Now;
            user.UpdatedBy = userBo.UpdatedBy;
            user.UpdatedOn = userBo.UpdatedOn;
            user.AspNetUser_Id = userBo.AspNetUser_Id;
            user.PhoneNumber = userBo.PhoneNumber;
            user.Email = userBo.Email;
            try
            {
                repository.Insert(user);
                repository.Save();
                return user.Id;
            }
            catch (Exception ex)
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
            user.CreatedOn = userBo.CreatedOn;
            user.UpdatedBy = userBo.UpdatedBy;
            user.UpdatedOn = userBo.UpdatedOn;
            user.AspNetUser_Id = userBo.AspNetUser_Id;
            user.PhoneNumber = userBo.PhoneNumber;
            user.Email = userBo.Email;
            user.EmailActivationCode = userBo.EmailActivationCode;
            user.ResetPasswordCode = userBo.ResetPasswordCode;

            repository.Update(user);
            repository.Save();

            return 1;
        }

        public int UpdateEmployer(int id, UserBo userBo)
        {
            IGenericRepository<User> repository = new GenericRepository<User>();
            User user = repository.GetById(id);

            user.Id = userBo.Id;
            user.FirstName = userBo.FirstName;
            user.LastName = userBo.LastName;
            user.ProfilePhoto = userBo.ProfilePhoto;
            user.Gender_Id = userBo.Gender_Id;
            user.Status = userBo.Status;
            user.UpdatedBy = "admin";
            user.UpdatedOn = DateTime.UtcNow;
            user.PhoneNumber = userBo.PhoneNumber;

            try
            {
                repository.Update(user);
                repository.Save();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }



        }
        public int UpdatePartialUserProps(UserBo userBo)
        {
            try
            {
                IGenericRepository<User> repository = new GenericRepository<User>();
                User user = new User();
                user = repository.GetById(userBo.Id);
                user.ResetPasswordCode = userBo.ResetPasswordCode;
                user.EmailActivationCode = userBo.EmailActivationCode;
                repository.Update(user);
                repository.Save();
            }
            catch
            {
                return 0;
            }
            return 1;
        }

        public List<ProfileBo> GenerateProfileBo(ICollection<Profile> profileList)
        {
            List<ProfileBo> profileBoList = new List<ProfileBo>();
            //ICollection<ProfileBo> IprofileBo = new ICollection<ProfileBo>();
            foreach (Profile profile in profileList)
            {
                ProfileBo profileBo = new ProfileBo();
                profileBo.Id = profile.Id;
                profileBo.User_Id = profile.User_Id;
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

            return profileBoList;


        }

        public List<ExperienceBo> GenerateExperienceBo(ICollection<Experience> ExperienceList)
        {
            List<ExperienceBo> experienceBoList = new List<ExperienceBo>();

            //ICollection<ProfileBo> IprofileBo = new ICollection<ProfileBo>();
            foreach (Experience experience in ExperienceList)
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
            return experienceBoList;
        }

        public List<EducationalQualificationBo> GenerateEducationalQualificationBo(ICollection<EducationalQualification> educationalQualificationList)
        {
            List<EducationalQualificationBo> educationalQualificationBoList = new List<EducationalQualificationBo>();

            //ICollection<ProfileBo> IprofileBo = new ICollection<ProfileBo>();
            foreach (EducationalQualification educationalQualification in educationalQualificationList)
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
            return educationalQualificationBoList;
        }

        public List<UserAttachmentBo> GenerateUserAttachment(ICollection<UserAttachment> userAttachmentsList)
        {
            List<UserAttachmentBo> userAttachmentBoList = new List<UserAttachmentBo>();
            foreach (UserAttachment userattachment in userAttachmentsList)
            {
                if (userattachment.AttachmentType_Id == 1)
                {
                    UserAttachmentBo userAttachmentBo = new UserAttachmentBo();
                    userAttachmentBo.Id = userattachment.Id;
                    userAttachmentBo.User_Id = userattachment.User_Id;
                    userAttachmentBo.Attachment_Id = userattachment.Attachment_Id;
                    userAttachmentBo.AttachmentType_Id = userattachment.AttachmentType_Id;
                    userAttachmentBo.Name = userattachment.Name;
                    userAttachmentBo.Attachment = new AttachmentBo()
                    {
                        Id = userattachment.Attachment.Id,
                        Base64Text = userattachment.Attachment.Base64Text,
                        FileExtension = userattachment.Attachment.FileExtension,
                    };
                    userAttachmentBoList.Add(userAttachmentBo);
                }
            }
            return userAttachmentBoList;
        }
    }
}
