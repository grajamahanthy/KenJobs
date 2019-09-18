using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
  public  interface FavoriteJobsContarct
    {
        IEnumerable<FavoriteJobBo> GetFavoriteJobs();
        IEnumerable<JobBo> GetFavoriteJobsByUserId(int userId);
        FavoriteJobBo GetFavoriteJob(int id);
        int PostFavoriteJob(FavoriteJobBo appliedJobBo);
        int PostMultipleFavoriteJob(List<FavoriteJobBo> appliedJobBo);
        int UpdateFavoriteJob(int id, FavoriteJobBo appliedJobBo);
        IEnumerable<FavoriteJobBo> GetFavoriteJobs(int jobId, int userId);
    }
}
