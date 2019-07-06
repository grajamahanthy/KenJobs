using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class CurrencyBo
    {
        public int Id { get; set; }
        public string code { get; set; }
        public string value { get; set; }
        public Nullable<short> status { get; set; }
        public string symbol { get; set; }
    }
}
