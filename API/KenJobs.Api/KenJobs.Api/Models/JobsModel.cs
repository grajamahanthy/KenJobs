using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class JobsModel
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
        public Nullable<double> MinSalary { get; set; }
        public Nullable<double> MinExperience { get; set; }
        public string Skills { get; set; }
        public Nullable<double> MaxSalary { get; set; }
        public Nullable<double> MaxExperience { get; set; }
        public Nullable<int> User_Id { get; set; }
        public Nullable<int> Currency { get; set; }
        public string ClientName { get; set; }
        public string AddressLine { get; set; }
        public string Country { get; set; }
    }
}