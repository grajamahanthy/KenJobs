using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class ExperienceModel
    {
        public ExperienceModel()
        {
            this.UiStatus = "E";
        }
        public int? Id { get; set; }
        public int User_Id { get; set; }
        public string CompanyName { get; set; }
        public string Technology { get; set; }
        public string Role { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public string Description { get; set; }

        public string UiStatus { get; set; }
    }
}