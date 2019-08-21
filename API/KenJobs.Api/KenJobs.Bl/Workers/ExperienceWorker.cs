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

namespace KenJobs.Bl.Workers
{
    public class ExperienceWorker : ExperienceContract
    {


        public ExperienceBo GetExperience(int id)
        {
            IGenericRepository<Experience> repository = new GenericRepository<Experience>();
            object objid = id;
            Experience experience = repository.GetById(objid);

            ExperienceBo experienceBo = new ExperienceBo();

            experienceBo.Id = experience.Id;
            experienceBo.User_Id = experience.User_Id;
            experienceBo.CompanyName = experience.CompanyName;
            experienceBo.Technology = experience.Technology;
            experienceBo.Role = experience.Role;
            experienceBo.Description = experience.Description;
            experienceBo.StartDate = experience.StartDate;
            experienceBo.EndDate = experience.EndDate;

            return experienceBo;
        }

        public IEnumerable<ExperienceBo> GetExperiences()
        {
            IGenericRepository<Experience> repository = new GenericRepository<Experience>();
            IEnumerable<Experience> experienceList = repository.GetAll();

            List<ExperienceBo> experienceBoList = new List<ExperienceBo>();

            foreach (Experience experience in experienceList)
            {
                ExperienceBo experienceBo = new ExperienceBo();

                experienceBo.Id = experience.Id;
                experienceBo.User_Id = experience.User_Id;
                experienceBo.CompanyName = experience.CompanyName;
                experienceBo.Technology = experience.Technology;
                experienceBo.Role = experience.Role;
                experienceBo.Description = experience.Description;
                experienceBo.StartDate = experience.StartDate;
                experienceBo.EndDate = experience.EndDate;
                experienceBoList.Add(experienceBo);
            }

            return experienceBoList;
        }

        public int PostExperience(ExperienceBo experienceBo)
        {
            IGenericRepository<Experience> repository = new GenericRepository<Experience>();
            Experience experience = new Experience();

            // experience.Id = experienceBo.Id;
            experience.User_Id = experienceBo.User_Id;
            experience.CompanyName = experienceBo.CompanyName;
            experience.Technology = experienceBo.Technology;
            experience.Role = experienceBo.Role;
            experience.Description = experienceBo.Description;
            experience.StartDate = experienceBo.StartDate;
            experience.EndDate = experienceBo.EndDate;
            experience.CreatedBy = "admin";
            experience.CreatedOn = DateTime.UtcNow;
            experience.UpdatedBy = "admin";
            experience.UpdatedOn = DateTime.UtcNow;
            repository.Insert(experience);
            repository.Save();
            return 1;
        }

        public int UpdateExperience(int id, ExperienceBo experienceBo)
        {
            IGenericRepository<Experience> repository = new GenericRepository<Experience>();
            Experience experience = repository.GetById(id);

            //experience.Id = experienceBo.Id;
            experience.User_Id = experienceBo.User_Id;
            experience.CompanyName = experienceBo.CompanyName;
            experience.Technology = experienceBo.Technology;
            experience.Role = experienceBo.Role;
            experience.Description = experienceBo.Description;
            experience.StartDate = experienceBo.StartDate;
            experience.EndDate = experienceBo.EndDate;
            repository.Update(experience);
            repository.Save();
            return 1;
        }


        public int DeleteExperience(int UserId)
        {
            IGenericRepository<Experience> repository = new GenericRepository<Experience>();

            repository.Delete(UserId);
                 repository.Save();
            return 1;
        }
    }
}
