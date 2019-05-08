using System.Collections.Generic;

namespace KenJobs.Bo.BusinessObjects
{   
    public partial class AspNetRoleBo
    {
        public string Id { get; set; }
        public string Name { get; set; }    
        public virtual ICollection<AspNetUserBo> AspNetUsers { get; set; }
    }
}
