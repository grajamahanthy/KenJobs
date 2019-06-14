using System;

namespace KenJobs.Bo.BusinessObjects
{
    public class BusinessBase
    {
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreateOn { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }
    }
}
