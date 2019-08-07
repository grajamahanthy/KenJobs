using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class CandidateSearchModel
    {
         public string UserName { get; set; }
         public string Location { get; set; }
         public string SkillSet { get; set; }
         public int NoticePeriod { get; set; }
         public int MinExperience { get; set; }
         public int MaxExperience { get; set; }
    }
}