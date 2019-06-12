using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
    public interface ConfigContract
    {
        IEnumerable<StateBo> GetStates();
    }
}
