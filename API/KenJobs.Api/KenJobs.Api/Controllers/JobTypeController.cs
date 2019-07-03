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
    public class JobTypeController : ApiController
    {
        // GET: api/JobType
        public IEnumerable<JobTypeModel> Get()
        {
            JobTypeContract jobTypeContract = new JobTypeWorker();

            IEnumerable<JobTypeBo> jobTypeBoList = jobTypeContract.GetJobTypes();

            List<JobTypeModel> jobTypeModellist = new List<JobTypeModel>();

            foreach(JobTypeBo jobTypeBo in jobTypeBoList)
            {
                JobTypeModel jobTypeModel = new JobTypeModel();
                jobTypeModel.Id = jobTypeBo.Id;
                jobTypeModel.JobType1 = jobTypeBo.JobType1;
                jobTypeModel.Status = jobTypeBo.Status;
                jobTypeModellist.Add(jobTypeModel);
            }

            return jobTypeModellist;
        }

        // GET: api/JobType/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/JobType
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/JobType/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/JobType/5
        public void Delete(int id)
        {
        }
    }
}
