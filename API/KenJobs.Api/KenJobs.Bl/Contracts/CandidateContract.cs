using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
    public interface CandidateContract
    {
        IEnumerable<UserBo> GetCandidates();
        IEnumerable<UserBo> GetCandidates(CandidateBo candidateBo);

    }
}
