using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal;
using KenJobs.Dal.Workers;

namespace KenJobs.Bl.Workers
{
    class AppliedJobsWorker : AppliedJobsContract
    {
        public AppliedJobBo GetAppliedJob(int id)
        {
            IGenericRepository<AppliedJob> repository = new GenericRepository<AppliedJob>();
            object objid = id;
            AppliedJob appliedJob= repository.GetById(objid);

            AppliedJobBo appliedJobBo = new AppliedJobBo();
            appliedJobBo.Id = appliedJob.Id;
            appliedJobBo.User_Id = appliedJob.User_Id;
            appliedJobBo.Client_Id = appliedJob.Client_Id;
            appliedJobBo.Job_Id = appliedJob.Job_Id;
            appliedJobBo.AppliedDate = appliedJob.AppliedDate;

            return appliedJobBo;
        }

        public IEnumerable<AppliedJobBo> GetAppliedJobs()
        {
            IGenericRepository<AppliedJob> repository = new GenericRepository<AppliedJob>();
            IEnumerable<AppliedJob> appliedJobsList = repository.GetAll();

            List<AppliedJobBo> appliedJobsBoList = new List<AppliedJobBo>();

            foreach (AppliedJob appliedJob in appliedJobsList)
            {
                AppliedJobBo appliedJobBo = new AppliedJobBo();
                appliedJobBo.Id = appliedJob.Id;
                appliedJobBo.User_Id = appliedJob.User_Id;
                appliedJobBo.Client_Id = appliedJob.Client_Id;
                appliedJobBo.Job_Id = appliedJob.Job_Id;
                appliedJobBo.AppliedDate = appliedJob.AppliedDate;
                appliedJobsBoList.Add(appliedJobBo);
            }
            return appliedJobsBoList;
        }

        public int PostAppliedJob(AppliedJobBo appliedJobBo)
        {
            IGenericRepository<AppliedJob> repository = new GenericRepository<AppliedJob>();
            AppliedJob appliedJob = new AppliedJob();
            appliedJob.Id = appliedJobBo.Id;
            appliedJob.User_Id = appliedJobBo.User_Id;
            appliedJob.Client_Id = appliedJobBo.Client_Id;
            appliedJob.Job_Id = appliedJobBo.Job_Id;
            appliedJob.AppliedDate = appliedJobBo.AppliedDate;

            repository.Insert(appliedJob);
            repository.Save();
            return 1;
        }

        public int UpdateAppliedJob(int id, AppliedJobBo appliedJobBo)
        {
            IGenericRepository<AppliedJob> repository = new GenericRepository<AppliedJob>();
            AppliedJob appliedJob = new AppliedJob();
            appliedJob.Id = appliedJobBo.Id;
            appliedJob.User_Id = appliedJobBo.User_Id;
            appliedJob.Client_Id = appliedJobBo.Client_Id;
            appliedJob.Job_Id = appliedJobBo.Job_Id;
            appliedJob.AppliedDate = appliedJobBo.AppliedDate;

            repository.Update(appliedJob);
            repository.Save();
            return 1;
        }
    }
}
