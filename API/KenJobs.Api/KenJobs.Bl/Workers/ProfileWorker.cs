using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal;
using KenJobs.Dal.Workers;

namespace KenJobs.Bl.Workers
{
    public class ProfileWorker : ProfileContract
    {
        public ProfileBo GetProfile(int id)
        {
            IGenericRepository<Profile> repository = new GenericRepository<Profile>();
            object objid = id;
            Profile profileList = repository.GetById(objid);

            ProfileBo profileBo = new ProfileBo();

            profileBo.Id = profileList.Id;
            profileBo.User_Id = profileList.User_Id;
            profileBo.Resume = profileList.Resume;
            profileBo.skills = profileList.skills;
            profileBo.TotalExperiance = profileList.TotalExperiance;
            profileBo.HeighestQualification = profileList.HeighestQualification;
            profileBo.PreferredLocation = profileList.PreferredLocation;
            profileBo.CurrentSalary = profileList.CurrentSalary;
            profileBo.ExpectedSalary = profileList.ExpectedSalary;
            profileBo.Languages = profileList.Languages;

            return profileBo;


        }

        public IEnumerable<ProfileBo> GetProfiles()
        {
            throw new NotImplementedException();
        }

        public int PostProfile(ProfileBo profileBo)
        {
            IGenericRepository<Profile> repository = new GenericRepository<Profile>();
            Profile profile = new Profile();

            profile.Id = profileBo.Id;
            profile.User_Id = profileBo.User_Id;
            profile.Resume = profileBo.Resume;
            profile.skills = profileBo.skills;
            profile.TotalExperiance = profileBo.TotalExperiance;
            profile.HeighestQualification = profileBo.HeighestQualification;
            profile.PreferredLocation = profileBo.PreferredLocation;
            profile.CurrentSalary = profileBo.CurrentSalary;
            profile.ExpectedSalary = profileBo.ExpectedSalary;
            profile.Languages = profileBo.Languages;
            profile.CreatedBy = "admin";
            profile.CreatedOn = DateTime.UtcNow;
            profile.UpdatedBy = "admin";
            profile.UpdatedOn = DateTime.UtcNow;

            repository.Insert(profile);
            repository.Save();

            return 1;
        }

        public int UpdateProfile(int id, ProfileBo profileBo)
        {
            IGenericRepository<Profile> repository = new GenericRepository<Profile>();
            Profile profile = repository.GetById(id);

            //profile.Id = profileBo.Id;
            profile.User_Id = profileBo.User_Id;
            profile.Resume = profileBo.Resume;
            profile.skills = profileBo.skills;
            profile.TotalExperiance = profileBo.TotalExperiance;
            profile.HeighestQualification = profileBo.HeighestQualification;
            profile.PreferredLocation = profileBo.PreferredLocation;
            profile.CurrentSalary = profileBo.CurrentSalary;
            profile.ExpectedSalary = profileBo.ExpectedSalary;
            profile.Languages = profileBo.Languages;

            repository.Update(profile);
            repository.Save();

            return 1;
        }
    }
}
