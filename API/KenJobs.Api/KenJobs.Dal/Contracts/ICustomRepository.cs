using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Dal.Contracts
{
    public interface ICustomRepository<T> : IDisposable where T : class
    {
        IEnumerable<Job> GetJobsByUserId(int userId);
        IEnumerable<Job> GetFavoriteJobByUserId(int userId);
        IEnumerable<User> GetJobseekersByJobId(int userId);
        User GetUserByEmail(string email);
        IEnumerable<Job> GetAppliedJobByUserId(int userId);

        IEnumerable<User> GetCandidates(string userName, string skills, string location, Nullable<int> minexperience, Nullable<int> maxExperience);
        IEnumerable<Job> GetJobsByParams(string keyword, string location, int? experience, int? userId);

        IEnumerable<AppliedJob> GetAppliedJobs(int jobid, int userid);
        IEnumerable<FavoriteJob> GetFavoriteJobs(int jobid, int userid);

        UserAttachment GetUserAttachment(int UserId, int AttachmentTypeId);
    }
}
