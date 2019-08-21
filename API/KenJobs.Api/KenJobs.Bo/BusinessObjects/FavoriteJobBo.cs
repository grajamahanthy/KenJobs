using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class FavoriteJobBo
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Job_Id { get; set; }
        public System.DateTime AppliedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime UpdatedOn { get; set; }
    }
}
