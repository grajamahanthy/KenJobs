using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class ProfileModel
    {
        public int Id { get; set; }
        public int USer_Id { get; set; }
        public string Resume { get; set; }
        public string skills { get; set; }
        public short TotalExperiance { get; set; }
        public string HeighestQualification { get; set; }
        public string PreferredLocation { get; set; }
        public int CurrentSalary { get; set; }
        public int ExpectedSalary { get; set; }
        public string Languages { get; set; }
    }
}