using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;


namespace KenJobs.Bl.Contracts
{
    public interface JobsContract
    {
        //Get all Jobs
        IEnumerable<JobBo> GetJobs();

        //Get Single Job using jobid
        JobBo GetJob(int jobid);

        //Post Job
        void PostJob(JobBo jobBo);

        //
        void UpdateJob(int Id,JobBo jobBo);

        //
        IEnumerable<JobBo> GetJobsByUserId(int UserId);
        IEnumerable<UserBo> GetJobseekersByJobId(int jobId);

        IEnumerable<JobBo> GetJobsByParams(string keyword, string location, int? experience,int? userId);
    }
}
