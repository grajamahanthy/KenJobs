using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class AttachmentTypeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AllowedFileTypeExtensions { get; set; }
        public string AllowedFileSize { get; set; }
        public virtual ICollection<UserAttachmentModel> UserAttachments { get; set; }
    }
}