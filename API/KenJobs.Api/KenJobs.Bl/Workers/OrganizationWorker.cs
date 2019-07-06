using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bl.Contracts;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using KenJobs.Dal;

namespace KenJobs.Bl.Workers
{
    public class OrganizationWorker : OrganizationContract
    {
        public OrganizationBo GetOrganization(int id)
        {
            IGenericRepository<Organization> repository = new GenericRepository<Organization>();
            IEnumerable<Organization> organizationList = repository.GetAll();
            throw new NotImplementedException();
        }

        public IEnumerable<OrganizationBo> GetOrganizations()
        {
            throw new NotImplementedException();
        }

        public int PostOrganization(OrganizationBo organizationBo)
        {
            IGenericRepository<Organization> repository = new GenericRepository<Organization>();

            Organization organization = new Organization();
            organization.Name = organizationBo.Name;
            organization.Phone = organizationBo.Phone;
            organization.Email = organizationBo.Email;
            organization.ContactPerson = organizationBo.ContactPerson;
            organization.Website = organizationBo.Website;
            organization.Address = organizationBo.Address;
            organization.Status = organizationBo.Status;
            organization.Logo = organizationBo.Logo;
            organization.CreatedBy = "admin";
            organization.CreatedOn = DateTime.Now;

            repository.Insert(organization);
            repository.Save();
            return organization.Id;

        }

        public int UpdateOrganization(int id, OrganizationBo organizationBo)
        {
            throw new NotImplementedException();
        }
    }
}
