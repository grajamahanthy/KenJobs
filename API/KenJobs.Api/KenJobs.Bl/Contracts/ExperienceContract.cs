using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
 public interface ExperienceContract
    {
        IEnumerable<ExperienceBo> GetExperiences();
        ExperienceBo GetExperience(int id);
        int PostExperience(ExperienceBo experienceBo);
        int UpdateExperience(int id, ExperienceBo experience);

        int DeleteExperience(int UserId);
    }
}
