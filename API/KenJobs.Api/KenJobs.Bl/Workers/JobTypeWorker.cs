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


namespace KenJobs.Bl.Workers
{
  public  class JobTypeWorker : JobTypeContract
    {
        public JobTypeBo GetJobType(int id)
        {
            IGenericRepository<JobType> repository = new GenericRepository<JobType>();
            object objid = id;
            JobType jobType = repository.GetById(objid);

            JobTypeBo jobTypeBo = new JobTypeBo();

            jobTypeBo.Id = jobType.Id;
            jobTypeBo.JobType1 = jobType.JobType1;
            jobTypeBo.Status = jobType.Status;

            return jobTypeBo;
        }

        public IEnumerable<JobTypeBo> GetJobTypes()
        {
            IGenericRepository<JobType> repository = new GenericRepository<JobType>();
            IEnumerable<JobType> jobTypeList = repository.GetAll();

            List<JobTypeBo> jobTypeBoList = new List<JobTypeBo>();
            foreach (JobType jobType in jobTypeList)
            {
                JobTypeBo jobTypeBo = new JobTypeBo();
                jobTypeBo.Id = jobType.Id;
                jobTypeBo.JobType1 = jobType.JobType1;
                jobTypeBo.Status = jobType.Status;
                jobTypeBoList.Add(jobTypeBo);
            }
            return jobTypeBoList;
        }

        public int PostJobType(JobTypeBo jobtypeBo)
        {
            IGenericRepository<JobType> repository = new GenericRepository<JobType>();

            JobType jobtype = new JobType();
            jobtype.Id = jobtypeBo.Id;
            jobtype.JobType1 = jobtypeBo.JobType1;
            jobtype.Status = jobtypeBo.Status;
            repository.Insert(jobtype);
            repository.Save();
            return 1;

        }

        public int UpdateJobtype(int id, JobTypeBo jobtypeBo)
        {
            IGenericRepository<JobType> repository = new GenericRepository<JobType>();
            JobType jobtype = new JobType();
            jobtype.Id = jobtypeBo.Id;
            jobtype.JobType1 = jobtypeBo.JobType1;
            jobtype.Status = jobtypeBo.Status;
            repository.Update(jobtype);
            repository.Save();
            return 1;
        }
    }
}
