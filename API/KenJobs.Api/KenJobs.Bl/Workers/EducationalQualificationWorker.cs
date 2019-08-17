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
    public class EducationalQualificationWorker : EducationalQualificationContract
    {
        public EducationalQualificationBo GetEducationalQualification(int id)
        {
            IGenericRepository<EducationalQualification> repository = new GenericRepository<EducationalQualification>();
            object objid = id;
            EducationalQualification educationalQualification = repository.GetById(objid);

            EducationalQualificationBo educationalQualificationBo = new EducationalQualificationBo();

            educationalQualificationBo.Id = educationalQualification.Id;
            educationalQualificationBo.User_Id = educationalQualification.User_Id;
            educationalQualificationBo.Institute = educationalQualification.Institute;
            educationalQualificationBo.Qualification = educationalQualification.Qualification;
            educationalQualificationBo.YearOfPass = educationalQualification.YearOfPass;
            educationalQualificationBo.Percentage = educationalQualification.Percentage;
            educationalQualificationBo.CreatedBy = educationalQualification.CreatedBy;
            educationalQualificationBo.CreatedOn = educationalQualification.CreatedOn;
            educationalQualificationBo.UpdatedBy = educationalQualification.UpdatedBy;
            educationalQualificationBo.UpdatedOn = educationalQualification.UpdatedOn;
            return educationalQualificationBo;
        }

        public IEnumerable<EducationalQualificationBo> GetEducationalQualifications()
        {
            IGenericRepository<EducationalQualification> repository = new GenericRepository<EducationalQualification>();
            IEnumerable<EducationalQualification> educationalQualificationList = repository.GetAll();
            List<EducationalQualificationBo> educationalQualificationBoList = new List<EducationalQualificationBo>();
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

        public int PostEducationalQualification(EducationalQualificationBo educationalQualificationBo)
        {
            IGenericRepository<EducationalQualification> repository = new GenericRepository<EducationalQualification>();
            EducationalQualification educationalQualification = new EducationalQualification();
            educationalQualification.Id = educationalQualificationBo.Id;
            educationalQualification.User_Id = educationalQualificationBo.User_Id;
            educationalQualification.Institute = educationalQualificationBo.Institute;
            educationalQualification.Qualification = educationalQualificationBo.Qualification;
            educationalQualification.YearOfPass = educationalQualificationBo.YearOfPass;
            educationalQualification.Percentage = educationalQualificationBo.Percentage;
            educationalQualification.CreatedBy = "admin";
            educationalQualification.CreatedOn = DateTime.UtcNow;
            educationalQualification.UpdatedBy ="admin";
            educationalQualification.UpdatedOn = DateTime.UtcNow;

            repository.Insert(educationalQualification);
            repository.Save();
            return 1;
        }

        public int UpdateEducationalQualification(int id, EducationalQualificationBo educationalQualificationBo)
        {
            IGenericRepository<EducationalQualification> repository = new GenericRepository<EducationalQualification>();
            EducationalQualification educationalQualification = repository.GetById(id);

           //educationalQualification.Id = educationalQualificationBo.Id;
            educationalQualification.User_Id = educationalQualificationBo.User_Id;
            educationalQualification.Institute = educationalQualificationBo.Institute;
            educationalQualification.Qualification = educationalQualificationBo.Qualification;
            educationalQualification.YearOfPass = educationalQualificationBo.YearOfPass;
            educationalQualification.Percentage = educationalQualificationBo.Percentage;

            repository.Update(educationalQualification);
            repository.Save();
            return 1;
        }
        public int DeleteEducationalQualification(int id)
        {
            IGenericRepository<EducationalQualification> repository = new GenericRepository<EducationalQualification>();
            repository.Delete(id);
            repository.Save();

            return 1;
        }
    }
}
