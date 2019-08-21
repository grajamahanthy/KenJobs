using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class AttachmentBo
    {
        public int Id { get; set; }
        public string FileExtension { get; set; }
        public string Base64Text { get; set; }
       
        public virtual ICollection<UserAttachmentBo> UserAttachments { get; set; }
    }
}
