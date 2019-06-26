using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
    interface ProfileContract
    {
        IEnumerable<ProfileBo> GetProfiles();
        ProfileBo GetProfile(int id);
        int PostProfile(ProfileBo profileBo);
        int UpdateProfile(int id, ProfileBo profileBo);
    }
}
