using KenJobs.Bl.Contracts;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Workers
{
   public class CandidateWorker : CandidateContract
    {
        public IEnumerable<UserBo> GetCandidates()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserBo> GetCandidates(CandidateBo candidateBo)
        {
            ICustomRepository<User> customRepository = new CustomRepository<User>();

            IEnumerable<User> listCandidate = customRepository.GetCandidates(candidateBo.UserName, candidateBo.SkillSet, candidateBo.Location, candidateBo.MinExperience, candidateBo.MaxExperience);
            List<UserBo> listCandidates = new List<UserBo>();

         
            foreach (User user in listCandidate)
            {
                UserWorker userWorker = new UserWorker();
                UserBo userBo = new UserBo();
                userBo.Id = user.Id;
                userBo.Title = user.Title;
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
                userBo.Profile = userWorker.GenerateProfileBo(user.Profiles);
                userBo.Experience = userWorker.GenerateExperienceBo(user.Experiences);
                userBo.EducationalQualification = userWorker.GenerateEducationalQualificationBo(user.EducationalQualifications);

                listCandidates.Add(userBo);
            }

            return listCandidates;
        }

       
    }
}
