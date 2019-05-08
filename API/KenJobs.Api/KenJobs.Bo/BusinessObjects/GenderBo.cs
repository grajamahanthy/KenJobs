using System.Collections.Generic;

namespace KenJobs.Bo.BusinessObjects
{   
    public partial class GenderBo: BusinessBase
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public virtual ICollection<UserBo> Users { get; set; }
    }
}
