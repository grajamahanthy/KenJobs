using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
    public interface OrganizationContract
    {
        IEnumerable<OrganizationBo> GetOrganizations();
        OrganizationBo GetOrganization(int id);
        int PostOrganization(OrganizationBo organizationBo);
        int UpdateOrganization(int id,OrganizationBo organizationBo);

    }
}
