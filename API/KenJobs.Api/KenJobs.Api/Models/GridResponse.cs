using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class GridResponse<T>
    {
        public List<T> Rows = null;
        public int TotalRecords { get; set; }
    }
}