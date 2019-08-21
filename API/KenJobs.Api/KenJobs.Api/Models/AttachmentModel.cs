using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class AttachmentModel
    {
        public int Id { get; set; }
        public string FileExtension { get; set; }
        public string Base64Text { get; set; }
       
        public virtual ICollection<UserAttachmentModel> UserAttachments { get; set; }
    }
}