using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class GridRequest
    {
        public Pagination Pagination { get; set; }
        public Sorting Sorting { get; set; }
        public List<Filter> TopSearchFilter { get; set; }
        public List<Filter> LeftSearchFilter { get; set; }
    }
}