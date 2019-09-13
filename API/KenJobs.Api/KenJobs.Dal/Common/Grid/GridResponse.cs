using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Dal.Common.Grid
{
    public class GridResponse<T>
    {
        public List<T> Rows = null;
        public int TotalRecords { get; set; }
    }
}
