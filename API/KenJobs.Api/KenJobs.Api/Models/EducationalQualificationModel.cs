using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class EducationalQualificationModel
    {
        public EducationalQualificationModel()
        {
            this.UiStatus = "E";
        }
        public int? Id { get; set; }
        public int User_Id { get; set; }
        public string Institute { get; set; }
        public string Qualification { get; set; }
        public string YearOfPass { get; set; }
        public double Percentage { get; set; }
        public string UiStatus { get; set; }

    }
}