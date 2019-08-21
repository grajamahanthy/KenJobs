using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class AttachmentTypeBo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AllowedFileTypeExtensions { get; set; }
        public string AllowedFileSize { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }

        public virtual ICollection<UserAttachmentBo> UserAttachments { get; set; }
    }
}
