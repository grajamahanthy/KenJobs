using System.Collections.Generic;

namespace KenJobs.Bo.BusinessObjects
{
    public partial class JobCategoryBo:BusinessBase
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public short Status { get; set; }
        public virtual ICollection<JobBo> Jobs { get; set; }
    }
}
