using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Dal.Contracts;

namespace KenJobs.Dal.Workers
{
    public class CustomRepository<T>: GenericRepository<T>,ICustomRepository<T> where T : class
    {
        public IEnumerable<Job> GetJobsByUserId(int userId)
        {
            var jobList = (from j in _context.Jobs
                           join uo in _context.User_Organization on j.User_Id equals uo.User_Id
                           join uo1 in _context.User_Organization on uo.Organization_Id equals uo1.Organization_Id
                           where uo1.User_Id == userId
                           select j
                           ).ToList();
            return jobList;
        }

        public IEnumerable<User> GetJobseekersByJobId(int jobId)
        {
            var jobseekerList = (from u in _context.Users
                           join aj in _context.AppliedJobs on u.Id equals aj.User_Id
                           where aj.Job_Id == jobId
                           select u).ToList();
            return jobseekerList;
        }

        public User GetUserByEmail(string email)
        {
            var user = (from u in _context.Users
                                 where u.Email == email
                                 select u).ToList();
            return user == null ? null : user[0];
        }
    }
}
