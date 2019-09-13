using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class CustomList<T>
    {
        public IEnumerable<T> Item = null;
        public PaginationModelBo pagination { get; set; }
    }
}
