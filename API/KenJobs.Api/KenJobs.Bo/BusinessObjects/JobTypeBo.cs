using System.Collections.Generic;

namespace KenJobs.Bo.BusinessObjects
{   
    public partial class JobTypeBo: BusinessBase
    {
        public int Id { get; set; }
        public string JobType1 { get; set; }
        public short Status { get; set; }
        public virtual ICollection<JobBo> Jobs { get; set; }
    }
}
