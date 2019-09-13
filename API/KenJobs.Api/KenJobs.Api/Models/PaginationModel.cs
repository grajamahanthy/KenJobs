using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class PaginationModel
    {
        public string SortColumnName { get; set; }
        public string SortOrder { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }
    }
}