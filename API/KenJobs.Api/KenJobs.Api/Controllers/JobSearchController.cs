using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KenJobs.Api.Models;
using KenJobs.Bl.Workers;
using KenJobs.Bl.Contracts;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Api.Helpers;

namespace KenJobs.Api.Controllers
{
    public class JobSearchController : BaseController
    {
        // GET: api/JobSearch
        public List<JobsModel> Get()
        {
            JobsContract jobsWorker = new JobsWorker();
            IEnumerable<JobBo> jobBoList = jobsWorker.GetJobs();
            //IEnumerable<JobBo> jobBoList = jobsWorker.GetJobsByParams("angular", "", 6);

            List<JobsModel> jobModelList = new List<JobsModel>();
            foreach (JobBo jobBo in jobBoList)
            {
                JobsModel jobsModel = new JobsModel();
                jobsModel.Id = jobBo.Id;
                jobsModel.Client_Id = jobBo.Client_Id;
                jobsModel.JobTitle = jobBo.JobTitle;
                jobsModel.Description = jobBo.Description;
                jobsModel.NoOfVacancies = jobBo.NoOfVacancies;
                jobsModel.Qualification = jobBo.Qualification;
                jobsModel.State = jobBo.State;
                jobsModel.City = jobBo.City;
                jobsModel.PostDate = jobBo.PostDate;
                jobsModel.PostingStatus = jobBo.PostingStatus;
                jobsModel.JobType_Id = jobBo.JobType_Id;
                jobsModel.Category_id = jobBo.Category_id;
                jobsModel.MinSalary = jobBo.MinSalary;
                jobsModel.MaxSalary = jobBo.MaxSalary;
                jobsModel.MinExperience = jobBo.MinExperience;
                jobsModel.MaxExperience = jobBo.MaxExperience;
                jobsModel.User_Id = jobBo.User_Id;
                jobsModel.ClientName = jobBo.ClientName;
                jobsModel.Currency = jobBo.Currency;
                jobsModel.Country = jobBo.Country;
                jobsModel.Skills = jobBo.Skills;
                jobsModel.AddressLine = jobBo.AddressLine;

                JobTypeModel jobTypeModel = new JobTypeModel();
                JobTypeBo jobTypeBo = jobBo.JobType;
                jobTypeModel.Id = jobTypeBo.Id;
                jobTypeModel.Name = jobTypeBo.Name;
                jobTypeModel.Status = jobTypeBo.Status;

                jobsModel.JobType = jobTypeModel;

                JobCategoryModel jobCategoryModel = new JobCategoryModel();
                JobCategoryBo jobCategoryBo = jobBo.JobCategory;

                jobCategoryModel.Id = jobCategoryBo.Id;
                jobCategoryModel.Category = jobCategoryBo.Category;
                jobCategoryModel.Status = jobCategoryBo.Status;

                jobsModel.JobCategory = jobCategoryModel;

                jobModelList.Add(jobsModel);
            }
            return jobModelList;
        }

        [HttpPost]
        [Route("api/JobSearch/GetJobsByParms")]
        public GridResponse<JobsModel> GetJobsByParms(JobSearchModel jobSearchModel)
        {
            GridRequestHelper gridRequestHelper = new GridRequestHelper();
            JobsContract jobsWorker = new JobsWorker();


            JobSearchModelBo jobSearchModelBo = new JobSearchModelBo();
            jobSearchModelBo.Keyword = (string.IsNullOrEmpty(jobSearchModel.Keyword) ? "" : jobSearchModel.Keyword);
            jobSearchModelBo.Location = (string.IsNullOrEmpty(jobSearchModel.Location) ? "" : jobSearchModel.Location);
            jobSearchModelBo.Experience = jobSearchModel.Experience == 0 ? null : jobSearchModel.Experience;

            jobSearchModelBo.JobSearchRequest = gridRequestHelper.ToGridRequestBo(jobSearchModel.JobSearchRequest);

            GridResponseBo<JobBo> gridResponseBo = jobsWorker.GetJobsByParams(jobSearchModelBo);
            IEnumerable<JobBo> jobBoList = gridResponseBo.Rows;
            

            List<JobsModel> jobModelList = new List<JobsModel>();

            foreach (JobBo jobBo in jobBoList)
            {
                JobsModel jobsModel = new JobsModel();
                jobsModel.Id = jobBo.Id;
                jobsModel.Client_Id = jobBo.Client_Id;
                jobsModel.JobTitle = jobBo.JobTitle;
                jobsModel.Description = jobBo.Description;
                jobsModel.NoOfVacancies = jobBo.NoOfVacancies;
                jobsModel.Qualification = jobBo.Qualification;
                jobsModel.State = jobBo.State;
                jobsModel.City = jobBo.City;
                jobsModel.PostDate = jobBo.PostDate;
                jobsModel.PostingStatus = jobBo.PostingStatus;
                jobsModel.JobType_Id = jobBo.JobType_Id;
                jobsModel.Category_id = jobBo.Category_id;
                jobsModel.MinSalary = jobBo.MinSalary;
                jobsModel.MaxSalary = jobBo.MaxSalary;
                jobsModel.MinExperience = jobBo.MinExperience;
                jobsModel.MaxExperience = jobBo.MaxExperience;
                jobsModel.User_Id = jobBo.User_Id;
                jobsModel.ClientName = jobBo.ClientName;
                jobsModel.Currency = jobBo.Currency;
                jobsModel.Country = jobBo.Country;
                jobsModel.Skills = jobBo.Skills;
                jobsModel.AddressLine = jobBo.AddressLine;

                JobTypeModel jobTypeModel = new JobTypeModel();
                JobTypeBo jobTypeBo = jobBo.JobType;
                jobTypeModel.Id = jobTypeBo.Id;
                jobTypeModel.Name = jobTypeBo.Name;
                jobTypeModel.Status = jobTypeBo.Status;

                jobsModel.JobType = jobTypeModel;

                JobCategoryModel jobCategoryModel = new JobCategoryModel();
                JobCategoryBo jobCategoryBo = jobBo.JobCategory;

                jobCategoryModel.Id = jobCategoryBo.Id;
                jobCategoryModel.Category = jobCategoryBo.Category;
                jobCategoryModel.Status = jobCategoryBo.Status;

                jobsModel.JobCategory = jobCategoryModel;


                jobModelList.Add(jobsModel);
            }

            GridResponse<JobsModel> gridResponse = new GridResponse<JobsModel>();
            gridResponse.Rows = jobModelList;
            gridResponse.TotalRecords = gridResponseBo.TotalRecords; // paginationModel;

            return gridResponse;
        }

        [Authorize]
        [HttpPost]
        [Route("api/JobSearch/GetJobsByUserParms")]
        public GridResponse<JobsModel> GetJobsByUserParms(JobSearchModel jobSearchModel)
        {
            GridRequestHelper gridRequestHelper = new GridRequestHelper();
            JobsContract jobsWorker = new JobsWorker();


            JobSearchModelBo jobSearchModelBo = new JobSearchModelBo();
            jobSearchModelBo.Keyword = (string.IsNullOrEmpty(jobSearchModel.Keyword) ? "" : jobSearchModel.Keyword);
            jobSearchModelBo.Location = (string.IsNullOrEmpty(jobSearchModel.Location) ? "" : jobSearchModel.Location);
            jobSearchModelBo.Experience = jobSearchModel.Experience == 0 ? null : jobSearchModel.Experience;

            jobSearchModelBo.JobSearchRequest = gridRequestHelper.ToGridRequestBo(jobSearchModel.JobSearchRequest);
           
            KenJobsSession s = GetKenJobsSession();

            PaginationModel paginationModel = new PaginationModel();// jobSearchModel.paginationdata;
            PaginationModelBo paginationBo = new PaginationModelBo();


            paginationBo.SortColumnName = paginationModel.SortColumnName;
            paginationBo.SortOrder = paginationModel.SortOrder;
            paginationBo.CurrentPage = paginationModel.CurrentPage == 0 ? 1 : paginationModel.CurrentPage;
            paginationBo.PageSize = paginationModel.PageSize;
            paginationBo.TotalPages = paginationModel.TotalPages;
            paginationBo.TotalRecords = paginationModel.TotalRecords;


            GridResponseBo<JobBo> gridResponseBo = jobsWorker.GetJobsByParams(jobSearchModelBo);
            IEnumerable<JobBo> jobBoList = gridResponseBo.Rows;
           
            List<JobsModel> jobModelList = new List<JobsModel>();

            foreach (JobBo jobBo in jobBoList)
            {
                JobsModel jobsModel = new JobsModel();
                jobsModel.Id = jobBo.Id;
                jobsModel.Client_Id = jobBo.Client_Id;
                jobsModel.JobTitle = jobBo.JobTitle;
                jobsModel.Description = jobBo.Description;
                jobsModel.NoOfVacancies = jobBo.NoOfVacancies;
                jobsModel.Qualification = jobBo.Qualification;
                jobsModel.State = jobBo.State;
                jobsModel.City = jobBo.City;
                jobsModel.PostDate = jobBo.PostDate;
                jobsModel.PostingStatus = jobBo.PostingStatus;
                jobsModel.JobType_Id = jobBo.JobType_Id;
                jobsModel.Category_id = jobBo.Category_id;
                jobsModel.MinSalary = jobBo.MinSalary;
                jobsModel.MaxSalary = jobBo.MaxSalary;
                jobsModel.MinExperience = jobBo.MinExperience;
                jobsModel.MaxExperience = jobBo.MaxExperience;
                jobsModel.User_Id = jobBo.User_Id;
                jobsModel.ClientName = jobBo.ClientName;
                jobsModel.Currency = jobBo.Currency;
                jobsModel.Country = jobBo.Country;
                jobsModel.Skills = jobBo.Skills;
                jobsModel.AddressLine = jobBo.AddressLine;

                JobTypeModel jobTypeModel = new JobTypeModel();
                JobTypeBo jobTypeBo = jobBo.JobType;
                jobTypeModel.Id = jobTypeBo.Id;
                jobTypeModel.Name = jobTypeBo.Name;
                jobTypeModel.Status = jobTypeBo.Status;

                jobsModel.JobType = jobTypeModel;

                JobCategoryModel jobCategoryModel = new JobCategoryModel();
                JobCategoryBo jobCategoryBo = jobBo.JobCategory;

                jobCategoryModel.Id = jobCategoryBo.Id;
                jobCategoryModel.Category = jobCategoryBo.Category;
                jobCategoryModel.Status = jobCategoryBo.Status;

                jobsModel.JobCategory = jobCategoryModel;


                jobModelList.Add(jobsModel);
            }
            GridResponse<JobsModel> gridResponse = new GridResponse<JobsModel>();
            gridResponse.Rows = jobModelList;
            gridResponse.TotalRecords = gridResponseBo.TotalRecords;

            return gridResponse;
        }







        // GET: api/JobSearch/5
        //public List<JobsModel> Get(string Keyword,string location)
        //{
        //    JobsContract jobsWorker = new JobsWorker();


        //}

        // POST: api/JobSearch
        public void Post(JobsModel jobModel)
        {
            JobsContract jobsWorker = new JobsWorker();

            JobBo jobBo = new JobBo();

            jobBo.Client_Id = jobModel.Client_Id;
            jobBo.JobTitle = jobModel.JobTitle;
            jobBo.Description = jobModel.Description;
            jobBo.NoOfVacancies = jobModel.NoOfVacancies;
            jobBo.Qualification = jobModel.Qualification;
            jobBo.State = jobModel.State;
            jobBo.City = jobModel.City;
            jobBo.Status = jobModel.Status;
            jobBo.PostingStatus = jobModel.PostingStatus;
            jobBo.JobType_Id = jobModel.JobType_Id;
            jobBo.Category_id = jobModel.Category_id;
            jobBo.Skills = jobModel.Skills;
            jobBo.MinSalary = jobModel.MinSalary;
            jobBo.MaxSalary = jobModel.MaxSalary;
            jobBo.MinExperience = jobModel.MinExperience;
            jobBo.MaxExperience = jobModel.MaxExperience;
            jobBo.User_Id = jobModel.User_Id;
            jobBo.ClientName = jobModel.ClientName;
            jobBo.Currency = jobModel.Currency;
            jobBo.Country = jobModel.Country;

            jobsWorker.PostJob(jobBo);
        }

        // PUT: api/JobSearch/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/JobSearch/5
        public void Delete(int id)
        {

        }

        [HttpPost]
        [Route("api/JobSearch/GetJobsGrid")]
        public GridResponse<JobsModel> GetJobsGrid(GridRequest gridRequest)
        {
            GridRequestHelper gridRequestHelper = new GridRequestHelper();
            JobsContract jobsWorker = new JobsWorker();


            //JobSearchModelBo jobSearchModelBo = new JobSearchModelBo();
            //jobSearchModelBo.Keyword = (string.IsNullOrEmpty(jobSearchModel.Keyword) ? "" : jobSearchModel.Keyword);
            //jobSearchModelBo.Location = (string.IsNullOrEmpty(jobSearchModel.Location) ? "" : jobSearchModel.Location);
            //jobSearchModelBo.Experience = jobSearchModel.Experience == 0 ? null : jobSearchModel.Experience;
            //jobSearchModelBo.JobSearchRequest = gridRequestHelper.ToGridRequestBo(gridRequest);

            GridRequestBo gridRequestBo= gridRequestHelper.ToGridRequestBo(gridRequest);

            GridResponseBo<JobBo> gridResponseBo = jobsWorker.GetJobsByGridParams(gridRequestBo);
            IEnumerable<JobBo> jobBoList = gridResponseBo.Rows;


            List<JobsModel> jobModelList = new List<JobsModel>();

            foreach (JobBo jobBo in jobBoList)
            {
                JobsModel jobsModel = new JobsModel();
                jobsModel.Id = jobBo.Id;
                jobsModel.Client_Id = jobBo.Client_Id;
                jobsModel.JobTitle = jobBo.JobTitle;
                jobsModel.Description = jobBo.Description;
                jobsModel.NoOfVacancies = jobBo.NoOfVacancies;
                jobsModel.Qualification = jobBo.Qualification;
                jobsModel.State = jobBo.State;
                jobsModel.City = jobBo.City;
                jobsModel.PostDate = jobBo.PostDate;
                jobsModel.PostingStatus = jobBo.PostingStatus;
                jobsModel.JobType_Id = jobBo.JobType_Id;
                jobsModel.Category_id = jobBo.Category_id;
                jobsModel.MinSalary = jobBo.MinSalary;
                jobsModel.MaxSalary = jobBo.MaxSalary;
                jobsModel.MinExperience = jobBo.MinExperience;
                jobsModel.MaxExperience = jobBo.MaxExperience;
                jobsModel.User_Id = jobBo.User_Id;
                jobsModel.ClientName = jobBo.ClientName;
                jobsModel.Currency = jobBo.Currency;
                jobsModel.Country = jobBo.Country;
                jobsModel.Skills = jobBo.Skills;
                jobsModel.AddressLine = jobBo.AddressLine;

                JobTypeModel jobTypeModel = new JobTypeModel();
                JobTypeBo jobTypeBo = jobBo.JobType;
                jobTypeModel.Id = jobTypeBo.Id;
                jobTypeModel.Name = jobTypeBo.Name;
                jobTypeModel.Status = jobTypeBo.Status;

                jobsModel.JobType = jobTypeModel;

                JobCategoryModel jobCategoryModel = new JobCategoryModel();
                JobCategoryBo jobCategoryBo = jobBo.JobCategory;

                jobCategoryModel.Id = jobCategoryBo.Id;
                jobCategoryModel.Category = jobCategoryBo.Category;
                jobCategoryModel.Status = jobCategoryBo.Status;

                jobsModel.JobCategory = jobCategoryModel;


                jobModelList.Add(jobsModel);
            }

            GridResponse<JobsModel> gridResponse = new GridResponse<JobsModel>();
            gridResponse.Rows = jobModelList;
            gridResponse.TotalRecords = gridResponseBo.TotalRecords; // paginationModel;

            return gridResponse;
        }


    }
}
