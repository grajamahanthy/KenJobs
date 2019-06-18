using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class JobsModel
    {
        public int Id { get; set; }
        public int Client_Id { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public Nullable<int> NoOfVacancies { get; set; }
        public int Salary { get; set; }
        public string Qualification { get; set; }
        public int State { get; set; }
        public string City { get; set; }
        public System.DateTime PostDate { get; set; }
        public short Status { get; set; }
        public short PostingStatus { get; set; }
        public int JobType_Id { get; set; }
        public int Category_id { get; set; }
    }
}