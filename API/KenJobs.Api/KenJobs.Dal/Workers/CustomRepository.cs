using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Dal.Common.Grid;
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

        public IEnumerable<Job> GetJobsByParams(string keyword, string location, int? experience)
        {
            string sortColumnName = "JobTitle";
            string sortOrder = "asc";

            var param = sortColumnName;
            var propertyInfo = typeof(Job).GetProperty(param);
            KenJobsEntities _context = new KenJobsEntities();
            var jobs = (from j in _context.Jobs
                        where j.Skills.Contains(keyword) &&
                       (j.City.Contains(location) || j.State.Contains(location)) &&

                       ((experience != null && experience >= j.MinExperience && experience <= j.MaxExperience) ||
                       experience == null)

                        orderby sortColumnName + " " + sortOrder

                        select j).AsQueryable();

            //var List= jobs;
            //totalRecord = jobs.Count();
            //if (totalRecord > 0)
            //{
            //    totalPage = totalRecord / pageSize; //+ ((totalRecord % pageSize) > 0 ? 1 : 0);
            //    //  List = jobs.OrderBy((x) => propertyInfo.GetValue(x, null));
            //    List = jobs.Skip(pageSize * (currentPage - 1)).Take(pageSize);
            //}

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

        public UserAttachment GetUserAttachment(int UserId, int AttachmentTypeId)
        {
            KenJobsEntities _context = new KenJobsEntities();
            var userAttachment = (from u in _context.UserAttachments
                                  where u.User_Id == UserId &&
                                  u.AttachmentType_Id == AttachmentTypeId
                                  select u).FirstOrDefault();
            return userAttachment;
        }

        public GridResponse<T> GetListByGridParams(string sortcolumn, int order, SearchFilter searchFilter, Pagination pagination)
        {
            string sortColumnName = sortcolumn;
            bool sortAscending = (order == 1 ? true : false);
            KenJobsEntities _context = new KenJobsEntities();
            IEnumerable<T> filteredList = null;
            IEnumerable<T> sortedList = null;
            IEnumerable<T> paginatedList = null;

            GridResponse<T> GenericGridResponse = new GridResponse<T>();
            //Filtering
            if (searchFilter.TopSearchFilter.Count > 0)
            {
                IEnumerable<Job> iqFilteredList = _context.Set<Job>();

                foreach (Filter flts in searchFilter.TopSearchFilter)
                {
                    if (flts.PropertyName == "Keyword")
                        iqFilteredList = iqFilteredList.Where(x =>
                        (
                            x.JobTitle.ToLower().Contains(flts.Value[0].ToLower().ToString()) ||
                            x.City.ToLower().Contains(flts.Value[0].ToLower().ToString()) ||
                            x.ClientName.ToLower().Contains(flts.Value[0].ToLower().ToString()) ||
                            x.Skills.ToLower().Contains(flts.Value[0].ToLower().ToString())
                        )

                        );
                    else if (flts.PropertyName == "Experience")
                        iqFilteredList = iqFilteredList.Where(y => y.MinExperience <= Convert.ToDouble(flts.Value[0]) && y.MaxExperience >= Convert.ToDouble(flts.Value[0]));
                    else if (flts.PropertyName == "City")
                        iqFilteredList = iqFilteredList.Where(z => z.City.ToLower().Contains(flts.Value[0].ToLower().ToString()));
                }
                filteredList = (IEnumerable<T>)iqFilteredList;
            }
            else
            {
                filteredList = _context.Set<T>();
            }

            if (searchFilter.LeftSearchFilter.Count > 0)
            {
                IEnumerable<Job> iqFilteredList = (IEnumerable<Job>)filteredList;

                foreach (Filter flts in searchFilter.LeftSearchFilter)
                {
                    if (flts.PropertyName == "ClientName")
                        iqFilteredList = iqFilteredList.Where(x =>
                        (x.ClientName.ToLower().Contains(flts.Value[0].ToLower().ToString()))
                        );
                    else if (flts.PropertyName == "Experience")
                        iqFilteredList = iqFilteredList.Where(y => y.MinExperience <= Convert.ToDouble(flts.Value[0]) && y.MaxExperience >= Convert.ToDouble(flts.Value[0]));
                    else if (flts.PropertyName == "City")
                        iqFilteredList = iqFilteredList.Where(z => z.City.ToLower().Contains(flts.Value[0].ToLower().ToString()));
                }
                filteredList = (IEnumerable<T>)iqFilteredList;
            }
           

            //Sorting
            if (order != 0)
            {
                Sort<T> _sort = new Sort<T>(sortcolumn, sortAscending);
                sortedList = _sort.sortFunc(filteredList);
            }
            else
            {
                sortedList = filteredList;
            }

            //Pagination
            paginatedList = sortedList.Skip(pagination.PageSize * (pagination.CurrentPage - 1)).Take(pagination.PageSize);
            GenericGridResponse.Rows = paginatedList.ToList();
            GenericGridResponse.TotalRecords = filteredList.Count();
            return GenericGridResponse;
        }
    }
}
