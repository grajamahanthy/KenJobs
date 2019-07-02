using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
    interface EducationalQualificationContract
    {
        IEnumerable<EducationalQualificationBo> GetEducationalQualifications();
        EducationalQualificationBo GetEducationalQualification(int id);
        int PostEducationalQualification(EducationalQualificationBo educationalQualificationBo);
        int UpdateEducationalQualification(int id,EducationalQualificationBo educationalQualificationBo);
    }
}
