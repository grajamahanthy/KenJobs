using System;

namespace KenJobs.Bo.BusinessObjects
{
    public class BusinessBase
    {
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime UpdatedOn { get; set; }
    }
}
