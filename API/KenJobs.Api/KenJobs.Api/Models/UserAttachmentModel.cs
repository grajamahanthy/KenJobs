using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class UserAttachmentModel
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Attachment_Id { get; set; }
        public int AttachmentType_Id { get; set; }
        public string Name { get; set; }
       
        public virtual AttachmentModel Attachment { get; set; }
        public virtual AttachmentTypeModel AttachmentType { get; set; }
        public virtual UserProfileModel User { get; set; }
    }
}