using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class JobSearchModel
    {
        public string Keyword { get; set; }
        public string Location { get; set; }
        public int? Experience { get; set; }
    }
}