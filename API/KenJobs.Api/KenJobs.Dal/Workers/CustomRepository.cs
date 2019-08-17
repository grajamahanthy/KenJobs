using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Dal.Contracts;

namespace KenJobs.Dal.Workers
{
    public class CustomRepository<T> : GenericRepository<T>, ICustomRepository<T> where T : class
    {
        public IEnumerable<Job> GetAppliedJobByUserId(int userId)
        {
            var jobList = (from j in _context.Jobs
                           join a in _context.AppliedJobs on j.Id equals a.Job_Id
                           where a.User_Id == userId
                           select j).ToList();
            return jobList;
        }
        public IEnumerable<Job> GetFavoriteJobByUserId(int userId)
        {
            var jobList = (from j in _context.Jobs
                           join a in _context.FavoriteJobs on j.Id equals a.Job_Id
                           where a.User_Id == userId
                           select j).ToList();
            return jobList;
        }

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
            return (user == null || user.Count == 0) ? null : user[0];
        }

        public IEnumerable<User> GetCandidates(string userName, string skills, string location, Nullable<int> minexperience, Nullable<int> maxExperience)
        {
            KenJobsEntities _context = new KenJobsEntities();
            var CandList = (from u in _context.Users
                            join p in _context.Profiles
                            on u.Id equals p.User_Id
                            join a in _context.AspNetUsers
                            on u.AspNetUser_Id equals a.Id
                            where (u.FirstName + " " + u.LastName).Contains(userName)
                             && (p.skills).Contains(skills)
                             && (p.PreferredLocation).Contains(location)
                             && (p.TotalExperiance >= minexperience && p.TotalExperiance <= maxExperience)
                            select u).ToList();
            return CandList;
        }

        public IEnumerable<Job> GetJobsByParams(string keyword, string location, int? experience, int? userId)
        {

            KenJobsEntities _context = new KenJobsEntities();
            var jobs = (from j in _context.Jobs
                        where j.Skills.Contains(keyword) &&
                       (j.City.Contains(location) || j.State.Contains(location)) &&

                       ((experience != null && experience >= j.MinExperience && experience <= j.MaxExperience) ||
                       experience == null)

                        select j).ToList();

            //jobs = (from j in _context.Jobs
            //        join a in _context.AppliedJobs on j.Id equals a.Job_Id
            //        where j.Skills.Contains(keyword) &&
            //        (j.City.Contains(location) || j.State.Contains(location)) &&
            //        a.User_Id == userId &&

            //        ((experience != null && experience >= j.MinExperience && experience <= j.MaxExperience) ||
            //        experience == null)

            //        select  j).ToList();

            return jobs;
        }

        public IEnumerable<AppliedJob> GetAppliedJobs(int jobid, int userid)
        {
            KenJobsEntities _context = new KenJobsEntities();
            var appliedJobs = (from a in _context.AppliedJobs
                               where a.Job_Id == jobid &&
                               a.User_Id == userid
                               select a).ToList();
            return appliedJobs;

        }

        public IEnumerable<FavoriteJob> GetFavoriteJobs(int jobid, int userid)
        {
            KenJobsEntities _context = new KenJobsEntities();
            var appliedJobs = (from a in _context.FavoriteJobs
                               where a.Job_Id == jobid &&
                               a.User_Id == userid
                               select a).ToList();
            return appliedJobs;
        }

       
    }
}
