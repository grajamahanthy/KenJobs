using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class GridRequestBo
    {
        public PaginationBo Pagination { get; set; }
        public SortingBo Sorting { get; set; }
        public List<FilterBo> TopSearchFilter { get; set; }
        public List<FilterBo> LeftSearchFilter { get; set; }
    }
}
