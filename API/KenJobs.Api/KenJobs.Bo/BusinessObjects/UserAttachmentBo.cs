using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
    public class UserAttachmentBo
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Attachment_Id { get; set; }
        public int AttachmentType_Id { get; set; }
        public string Name { get; set; }
     
        public virtual AttachmentBo Attachment { get; set; }
        public virtual AttachmentTypeBo AttachmentType { get; set; }
        public virtual UserBo User { get; set; }
    }
}
