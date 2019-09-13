using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class JobSearchModelBo
    {
        public string Keyword { get; set; }
        public string Location { get; set; }
        public int? Experience { get; set; }

        public GridRequestBo JobSearchRequest { get; set; }
    }
}
