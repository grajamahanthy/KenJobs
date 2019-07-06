using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class OrganizationBo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }
        public string Website { get; set; }
        public string Address { get; set; }
        public Nullable<short> Status { get; set; }
        public string Logo { get; set; }
    }
}
