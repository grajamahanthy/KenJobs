using System;
using System.Collections.Generic;

namespace KenJobs.Bo.BusinessObjects
{
    public partial class JobBo : BusinessBase
    {
        public int Id { get; set; }
        public Nullable<int> Client_Id { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public Nullable<int> NoOfVacancies { get; set; }
        public string Qualification { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public System.DateTime PostDate { get; set; }
        public short Status { get; set; }
        public short PostingStatus { get; set; }
        public int JobType_Id { get; set; }
        public int Category_id { get; set; }
        public double MinSalary { get; set; }
        public double MinExperience { get; set; }
        public string Skills { get; set; }
        public double MaxSalary { get; set; }
        public double MaxExperience { get; set; }
        public Nullable<int> User_Id { get; set; }
        public Nullable<int> Currency { get; set; }
        public string ClientName { get; set; }
        public string Country { get; set; }
        public string AddressLine { get; set; }


        public ICollection<AppliedJobBo> AppliedJobs { get; set; }
        public ClientBo Client { get; set; }
        public JobCategoryBo JobCategory { get; set; }
        public JobTypeBo JobType { get; set; }
    }
}
