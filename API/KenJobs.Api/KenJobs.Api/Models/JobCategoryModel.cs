using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class JobCategoryModel
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public short Status { get; set; }
    }
}