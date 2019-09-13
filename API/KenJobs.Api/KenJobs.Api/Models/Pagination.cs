using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class Pagination
    {
        public int PageSize { get; set; } = 10;
        public int CurrentPage { get; set; } = 1;
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }
    }
}