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
    public class User_OrganizationWorker : User_OrganizationContract
    {
        public User_OrganizationBo GetUser_Organization(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User_OrganizationBo> GetUser_Organizations()
        {
            throw new NotImplementedException();
        }

        public int PostGetUser_Organizations(User_OrganizationBo user_OrganizationBo)
        {
            IGenericRepository<User_Organization> repository = new GenericRepository<User_Organization>();

            User_Organization user_Organization = new User_Organization();
            user_Organization.User_Id = user_OrganizationBo.User_Id;
            user_Organization.Organization_Id = user_OrganizationBo.Organization_Id;
            user_Organization.CreatedBy = "admin";
            user_Organization.CreatedOn = DateTime.Now;
            user_Organization.UpdatedBy = "admin";
            user_Organization.UpdatedOn = DateTime.Now;

            repository.Insert(user_Organization);
            repository.Save();
            return user_Organization.Id;

        }

        public int UpdateGetUser_Organizations(int id, User_OrganizationBo user_OrganizationBo)
        {
            throw new NotImplementedException();
        }
    }
}
