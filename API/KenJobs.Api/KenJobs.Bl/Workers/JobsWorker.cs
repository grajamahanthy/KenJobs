using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using KenJobs.Dal;
using System.Globalization;
using KenJobs.Dal.Common.Grid;

namespace KenJobs.Bl.Workers
{
    public class JobsWorker : JobsContract
    {
        public IEnumerable<JobBo> GetJobs()
        {
            IGenericRepository<Job> repository = new GenericRepository<Job>();
            IEnumerable<Job> jobList = repository.GetAll();

            List<JobBo> jobBolist = new List<JobBo>();
            foreach (Job job in jobList)
            {
                JobBo jobBo = new JobBo();
                jobBo.Id = job.Id;
                jobBo.Client_Id = job.Client_Id;
                jobBo.JobTitle = job.JobTitle;
                jobBo.Description = job.Description;
                jobBo.NoOfVacancies = job.NoOfVacancies;
                jobBo.Qualification = job.Qualification;
                jobBo.State = job.State;
                jobBo.City = job.City;
                jobBo.Status = job.Status;
                jobBo.PostingStatus = job.PostingStatus;
                jobBo.JobType_Id = job.JobType_Id;
                jobBo.Category_id = job.Category_id;
                jobBo.MinSalary = job.MinSalary;
                jobBo.MaxSalary = job.MaxSalary;
                jobBo.MinExperience = job.MinExperience;
                jobBo.MaxExperience = job.MaxExperience;
                jobBo.Skills = job.Skills;
                jobBo.User_Id = job.User_Id;
                jobBo.Currency = job.Currency;
                jobBo.ClientName = job.ClientName;
                jobBo.Country = job.Country;

                JobType jobType = job.JobType;
                JobTypeBo jobTypeBo = new JobTypeBo();
                jobTypeBo.Id = jobType.Id;
                jobTypeBo.Name = jobType.Name;
                jobTypeBo.Status = jobType.Status;

                jobBo.JobType = jobTypeBo;

                JobCategory jobCategory = job.JobCategory;
                JobCategoryBo jobCategoryBo = new JobCategoryBo();

                jobCategoryBo.Id = jobCategory.Id;
                jobCategoryBo.Category = jobCategory.Category;
                jobCategoryBo.Status = jobCategory.Status;
                jobBo.JobCategory = jobCategoryBo;



                jobBolist.Add(jobBo);
            }
            return jobBolist;
        }

        public JobBo GetJob(int jobid)
        {
            IGenericRepository<Job> repository = new GenericRepository<Job>();
            object objid = jobid;
            Job job = repository.GetById(objid);

            JobBo jobBo = new JobBo();
            jobBo.Id = job.Id;
            jobBo.Client_Id = job.Client_Id;
            jobBo.JobTitle = job.JobTitle;
            jobBo.Description = job.Description;
            jobBo.NoOfVacancies = job.NoOfVacancies;
            jobBo.Qualification = job.Qualification;
            jobBo.State = job.State;
            jobBo.City = job.City;
            jobBo.Status = job.Status;
            jobBo.PostingStatus = job.PostingStatus;
            jobBo.JobType_Id = job.JobType_Id;
            jobBo.Category_id = job.Category_id;
            jobBo.MinSalary = job.MinSalary;
            jobBo.MaxSalary = job.MaxSalary;
            jobBo.MinExperience = job.MinExperience;
            jobBo.MaxExperience = job.MaxExperience;
            jobBo.Skills = job.Skills;
            jobBo.User_Id = job.User_Id;
            jobBo.Currency = job.Currency;
            jobBo.ClientName = job.ClientName;
            jobBo.Country = job.Country;
            JobType jobType = job.JobType;
            JobTypeBo jobTypeBo = new JobTypeBo();
            jobTypeBo.Id = jobType.Id;
            jobTypeBo.Name = jobType.Name;
            jobTypeBo.Status = jobType.Status;

            jobBo.JobType = jobTypeBo;

            JobCategory jobCategory = job.JobCategory;
            JobCategoryBo jobCategoryBo = new JobCategoryBo();

            jobCategoryBo.Id = jobCategory.Id;
            jobCategoryBo.Category = jobCategory.Category;
            jobCategoryBo.Status = jobCategory.Status;
            jobBo.JobCategory = jobCategoryBo;




            return jobBo;

        }

        public IEnumerable<JobBo> GetJobsByUserId(int userId)
        {
            ICustomRepository<Job> repository = new CustomRepository<Job>();
            IEnumerable<Job> jobList = repository.GetJobsByUserId(userId);


            List<JobBo> jobBolist = new List<JobBo>();
            foreach (Job job in jobList)
            {
                JobBo jobBo = new JobBo();
                jobBo.Id = job.Id;
                jobBo.Client_Id = job.Client_Id;
                jobBo.JobTitle = job.JobTitle;
                jobBo.Description = job.Description;
                jobBo.NoOfVacancies = job.NoOfVacancies;
                jobBo.Qualification = job.Qualification;
                jobBo.State = job.State;
                jobBo.City = job.City;
                jobBo.Status = job.Status;
                jobBo.PostingStatus = job.PostingStatus;
                jobBo.JobType_Id = job.JobType_Id;
                jobBo.Category_id = job.Category_id;
                jobBo.MinSalary = job.MinSalary;
                jobBo.MaxSalary = job.MaxSalary;
                jobBo.MinExperience = job.MinExperience;
                jobBo.MaxExperience = job.MaxExperience;
                jobBo.Skills = job.Skills;
                jobBo.User_Id = job.User_Id;
                jobBo.Currency = job.Currency;
                jobBo.ClientName = job.ClientName;
                jobBo.Country = job.Country;

                JobType jobType = job.JobType;
                JobTypeBo jobTypeBo = new JobTypeBo();
                jobTypeBo.Id = jobType.Id;
                jobTypeBo.Name = jobType.Name;
                jobTypeBo.Status = jobType.Status;

                jobBo.JobType = jobTypeBo;

                JobCategory jobCategory = job.JobCategory;
                JobCategoryBo jobCategoryBo = new JobCategoryBo();

                jobCategoryBo.Id = jobCategory.Id;
                jobCategoryBo.Category = jobCategory.Category;
                jobCategoryBo.Status = jobCategory.Status;
                jobBo.JobCategory = jobCategoryBo;

                jobBolist.Add(jobBo);
            }
            return jobBolist;
        }

        public void PostJob(JobBo jobBo)
        {
            IGenericRepository<Job> repository = new GenericRepository<Job>();

            Job job = new Job();

            job.Client_Id = jobBo.Client_Id;
            job.JobTitle = jobBo.JobTitle;
            job.Description = jobBo.Description;
            job.NoOfVacancies = jobBo.NoOfVacancies;
            job.Qualification = jobBo.Qualification;
            job.State = jobBo.State;
            job.City = jobBo.City;
            job.Status = jobBo.Status;
            job.PostingStatus = jobBo.PostingStatus;
            job.JobType_Id = jobBo.JobType_Id;
            job.Category_id = jobBo.Category_id;
            job.MaxSalary = jobBo.MaxSalary;
            job.MinSalary = jobBo.MinSalary;
            job.MaxExperience = jobBo.MaxExperience;
            job.MinExperience = jobBo.MinExperience;
            job.Currency = jobBo.Currency;
            job.Skills = jobBo.Skills;
            job.User_Id = jobBo.User_Id;
            job.ClientName = jobBo.ClientName;
            job.Country = jobBo.Country;
            job.PostDate = DateTime.Now;
            job.CreatedBy = "Admin";
            job.CreatedOn = DateTime.Now;
            job.UpdatedBy = "Admin";
            job.UpdatedOn = DateTime.Now;

            try
            {
                repository.Insert(job); repository.Save();
            }
            catch (Exception ex)
            {
            }




        }

        public void UpdateJob(int id, JobBo jobBo)
        {
            IGenericRepository<Job> repository = new GenericRepository<Job>();
            Job job = new Job();
            job.Id = jobBo.Id;
            job.Client_Id = jobBo.Client_Id;
            job.JobTitle = jobBo.JobTitle;
            job.Description = jobBo.Description;
            job.NoOfVacancies = jobBo.NoOfVacancies;
            job.Qualification = jobBo.Qualification;
            job.State = jobBo.State;
            job.City = jobBo.City;
            job.Status = jobBo.Status;
            job.PostingStatus = jobBo.PostingStatus;
            job.JobType_Id = jobBo.JobType_Id;
            job.Category_id = jobBo.Category_id;
            job.MaxSalary = jobBo.MaxSalary;
            job.MinSalary = jobBo.MinSalary;
            job.MaxExperience = jobBo.MaxExperience;
            job.MinExperience = jobBo.MinExperience;
            job.Skills = jobBo.Skills;
            job.User_Id = jobBo.User_Id;
            job.Currency = jobBo.Currency;
            job.ClientName = jobBo.ClientName;
            job.Country = jobBo.Country;

            job.UpdatedBy = "Admin";
            job.UpdatedOn = new DateTime(DateTime.UtcNow.Ticks);
            job.CreatedBy = "Admin";
            job.CreatedOn = new DateTime(DateTime.UtcNow.Ticks);


            //JobTypeContract jobTypeWorker = new JobTypeWorker();
            //jobTypeWorker.UpdateJobtype(jobBo.JobType.Id, jobBo.JobType);


            //JobCategoryContract jobCategoryContract = new JobCategoryworker();
            //jobCategoryContract.UpdateJobCategory(jobBo.JobCategory.Id, jobBo.JobCategory);

            try
            {
                repository.Update(job);
                repository.Save();
            }
            catch (Exception ex)
            {

            }
        }


        public IEnumerable<UserBo> GetJobseekersByJobId(int jobId)
        {
            ICustomRepository<Job> repository = new CustomRepository<Job>();
            IEnumerable<User> jobseekerList = repository.GetJobseekersByJobId(jobId);

            List<UserBo> userBoList = new List<UserBo>();

            foreach (User user in jobseekerList)
            {
                UserWorker userWorker = new UserWorker();
                UserBo userBo = new UserBo();
                userBo.Id = user.Id;
                userBo.Title = user.Title;
                userBo.FirstName = user.FirstName;
                userBo.MiddleName = user.MiddleName;
                userBo.LastName = user.LastName;
                userBo.ProfilePhoto = user.ProfilePhoto;
                userBo.Gender_Id = user.Gender_Id;
                userBo.Status = user.Status;
                userBo.CreatedBy = user.CreatedBy;
                userBo.CreatedOn = user.CreatedOn;
                userBo.UpdatedBy = user.UpdatedBy;
                userBo.UpdatedOn = user.UpdatedOn;
                userBo.AspNetUser_Id = user.AspNetUser_Id;
                userBo.PhoneNumber = user.PhoneNumber;
                userBo.Email = user.Email;
                userBo.Profile = userWorker.GenerateProfileBo(user.Profiles);
                userBo.Experience = userWorker.GenerateExperienceBo(user.Experiences);
                userBo.EducationalQualification = userWorker.GenerateEducationalQualificationBo(user.EducationalQualifications);
                userBo.UserAttachment = userWorker.GenerateUserAttachment(user.UserAttachments);

                userBoList.Add(userBo);
            }

            return userBoList;

        }

        public GridResponseBo<JobBo> GetJobsByParams(JobSearchModelBo jobSearchModelBo)
        {
            string keyword = jobSearchModelBo.Keyword;
            string location = jobSearchModelBo.Location;
            int? experience = jobSearchModelBo.Experience;
            ICustomRepository<Job> repository = new CustomRepository<Job>();
            IEnumerable<Job> jobList = repository.GetJobsByParams(keyword, location, experience);

            PaginationBo paginationBo = jobSearchModelBo.JobSearchRequest.Pagination;

            IEnumerable<Job> List = jobList;
            paginationBo.TotalRecords = jobList.Count();
            if (paginationBo.TotalRecords > 0)
            {
                paginationBo.TotalPages = paginationBo.TotalRecords / paginationBo.PageSize + ((paginationBo.TotalRecords % paginationBo.PageSize) > 0 ? 1 : 0);
                //  List = jobs.OrderBy((x) => propertyInfo.GetValue(x, null));
                List = jobList.Skip(paginationBo.PageSize * (paginationBo.CurrentPage - 1)).Take(paginationBo.PageSize);
            }

            List<JobBo> jobBolist = new List<JobBo>();

            foreach (Job job in List)
            {
                JobBo jobBo = new JobBo();
                jobBo.Id = job.Id;
                jobBo.Client_Id = job.Client_Id;
                jobBo.JobTitle = job.JobTitle;
                jobBo.Description = job.Description;
                jobBo.NoOfVacancies = job.NoOfVacancies;
                jobBo.Qualification = job.Qualification;
                jobBo.State = job.State;
                jobBo.City = job.City;
                jobBo.Status = job.Status;
                jobBo.PostingStatus = job.PostingStatus;
                jobBo.JobType_Id = job.JobType_Id;
                jobBo.Category_id = job.Category_id;
                jobBo.MinSalary = job.MinSalary;
                jobBo.MaxSalary = job.MaxSalary;
                jobBo.MinExperience = job.MinExperience;
                jobBo.MaxExperience = job.MaxExperience;
                jobBo.Skills = job.Skills;
                jobBo.User_Id = job.User_Id;
                jobBo.Currency = job.Currency;
                jobBo.ClientName = job.ClientName;
                jobBo.Country = job.Country;

                JobType jobType = job.JobType;
                JobTypeBo jobTypeBo = new JobTypeBo();
                jobTypeBo.Id = jobType.Id;
                jobTypeBo.Name = jobType.Name;
                jobTypeBo.Status = jobType.Status;

                jobBo.JobType = jobTypeBo;

                JobCategory jobCategory = job.JobCategory;
                JobCategoryBo jobCategoryBo = new JobCategoryBo();

                jobCategoryBo.Id = jobCategory.Id;
                jobCategoryBo.Category = jobCategory.Category;
                jobCategoryBo.Status = jobCategory.Status;
                jobBo.JobCategory = jobCategoryBo;

                jobBolist.Add(jobBo);
            }
            GridResponseBo<JobBo> listJobBo = new GridResponseBo<JobBo>();
            listJobBo.Rows = jobBolist;
            listJobBo.TotalRecords = paginationBo.TotalRecords;

            return listJobBo;
        }

        public GridResponseBo<JobBo> GetJobsByGridParams(GridRequestBo gridRequestBo)
        {

            List<FilterBo> topFilterBoListBo = gridRequestBo.TopSearchFilter;
            List<FilterBo> leftFilterBoListBo = gridRequestBo.LeftSearchFilter;
            List<Filter> topFilterlist = new List<Filter>();
            List<Filter> leftFilterlist = new List<Filter>();
            SearchFilter searchFilter = new SearchFilter();
            foreach (FilterBo filterBo in topFilterBoListBo)
            {
                Filter filter = new Filter();
                filter.PropertyName = filterBo.ColumnName;
                filter.Value = filterBo.Value;
                topFilterlist.Add(filter);
            }
            foreach (FilterBo filterBo in leftFilterBoListBo)
            {
                Filter filter = new Filter();
                filter.PropertyName = filterBo.ColumnName;
                filter.Value = filterBo.Value;
                leftFilterlist.Add(filter);
            }
            searchFilter.TopSearchFilter = topFilterlist;
            searchFilter.LeftSearchFilter = leftFilterlist;

            Pagination pagination = new Pagination();
            pagination.PageSize = gridRequestBo.Pagination.PageSize;
            pagination.CurrentPage = gridRequestBo.Pagination.CurrentPage;

            SortingBo sortingBo = gridRequestBo.Sorting;
            ICustomRepository<Job> repository = new CustomRepository<Job>();
            GridResponse<Job> jobList = repository.GetListByGridParams(sortingBo.SortColumn, sortingBo.SortOrder, searchFilter, pagination);

            //PaginationBo paginationBo = gridRequestBo.Pagination;

            IEnumerable<Job> List = jobList.Rows;
            //paginationBo.TotalRecords = jobList.Count();
            //if (paginationBo.TotalRecords > 0)
            //{
            //    paginationBo.TotalPages = paginationBo.TotalRecords / paginationBo.PageSize + ((paginationBo.TotalRecords % paginationBo.PageSize) > 0 ? 1 : 0);
            //    //  List = jobs.OrderBy((x) => propertyInfo.GetValue(x, null));
            //    List = jobList.Skip(paginationBo.PageSize * (paginationBo.CurrentPage - 1)).Take(paginationBo.PageSize);
            //}

            List<JobBo> jobBolist = new List<JobBo>();

            foreach (Job job in List)
            {
                JobBo jobBo = new JobBo();
                jobBo.Id = job.Id;
                jobBo.Client_Id = job.Client_Id;
                jobBo.JobTitle = job.JobTitle;
                jobBo.Description = job.Description;
                jobBo.NoOfVacancies = job.NoOfVacancies;
                jobBo.Qualification = job.Qualification;
                jobBo.State = job.State;
                jobBo.City = job.City;
                jobBo.Status = job.Status;
                jobBo.PostingStatus = job.PostingStatus;
                jobBo.JobType_Id = job.JobType_Id;
                jobBo.Category_id = job.Category_id;
                jobBo.MinSalary = job.MinSalary;
                jobBo.MaxSalary = job.MaxSalary;
                jobBo.MinExperience = job.MinExperience;
                jobBo.MaxExperience = job.MaxExperience;
                jobBo.Skills = job.Skills;
                jobBo.User_Id = job.User_Id;
                jobBo.Currency = job.Currency;
                jobBo.ClientName = job.ClientName;
                jobBo.Country = job.Country;

                JobType jobType = job.JobType;
                JobTypeBo jobTypeBo = new JobTypeBo();
                jobTypeBo.Id = jobType.Id;
                jobTypeBo.Name = jobType.Name;
                jobTypeBo.Status = jobType.Status;

                jobBo.JobType = jobTypeBo;

                JobCategory jobCategory = job.JobCategory;
                JobCategoryBo jobCategoryBo = new JobCategoryBo();

                jobCategoryBo.Id = jobCategory.Id;
                jobCategoryBo.Category = jobCategory.Category;
                jobCategoryBo.Status = jobCategory.Status;
                jobBo.JobCategory = jobCategoryBo;

                jobBolist.Add(jobBo);
            }
            GridResponseBo<JobBo> listJobBo = new GridResponseBo<JobBo>();
            listJobBo.Rows = jobBolist;
            listJobBo.TotalRecords = jobList.TotalRecords;

            return listJobBo;
        }

    }
}
