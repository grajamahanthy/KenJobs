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
        IEnumerable<User> GetJobseekersByJobId(int userId);
        User GetUserByEmail(string email);
        IEnumerable<Job> GetAppliedJobByUserId(int userId);
    }
}
