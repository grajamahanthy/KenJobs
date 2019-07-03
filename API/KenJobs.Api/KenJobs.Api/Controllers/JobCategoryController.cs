using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Api.Models;

namespace KenJobs.Api.Controllers
{
    public class JobCategoryController : ApiController
    {
        // GET: api/JobCategory
        public IEnumerable<JobCategoryModel> Get()
        {

            JobCategoryContract jobCategoryContract = new JobCategoryworker();

            IEnumerable<JobCategoryBo> jobCategoryBoList = jobCategoryContract.GetJobCategories();

            List<JobCategoryModel> jobCategoryModelList = new List<JobCategoryModel>();

            foreach (JobCategoryBo jobCategoryBo in jobCategoryBoList)
            {
                JobCategoryModel jobCategoryModel = new JobCategoryModel();
                jobCategoryModel.Id = jobCategoryBo.Id;
                jobCategoryModel.Category = jobCategoryBo.Category;
                jobCategoryModel.Status = jobCategoryBo.Status;
                jobCategoryModelList.Add(jobCategoryModel);
            }

            return jobCategoryModelList;
        }

        // GET: api/JobCategory/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/JobCategory
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/JobCategory/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/JobCategory/5
        public void Delete(int id)
        {
        }
    }
}
