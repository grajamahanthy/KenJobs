using KenJobs.Bl.Contracts;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Workers
{
   public class AttachmentWorker : AttachmentContract
    {
        public int DeleteAttachmentBo(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<AttachmentBo> GetAttachmentBo(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<AttachmentBo> GetAttachmentBos()
        {
            throw new NotImplementedException();
        }

        public int PostAttachmentBo(AttachmentBo attachmentBo)
        {
            IGenericRepository<KenJobs.Dal.Attachment> repository = new GenericRepository<KenJobs.Dal.Attachment>();
            KenJobs.Dal.Attachment attachment = new KenJobs.Dal.Attachment();
            attachment.Id = attachmentBo.Id;
            attachment.FileExtension = attachmentBo.FileExtension;
            attachment.Base64Text = attachmentBo.Base64Text;
            attachment.CreatedBy = "admin";
            attachment.CreatedOn = DateTime.UtcNow;
            attachment.UpdatedBy = "admin";
            attachment.UpdatedOn = DateTime.UtcNow;

            repository.Insert(attachment);
            repository.Save();
           return attachment.Id;
            
        }

        public int UpdateAttachmentBo(int id, AttachmentBo attachmentBo)
        {
            IGenericRepository<KenJobs.Dal.Attachment> repository = new GenericRepository<KenJobs.Dal.Attachment>();
            KenJobs.Dal.Attachment attachment = new KenJobs.Dal.Attachment();
            attachment = repository.GetById(id);
           //attachment.Id = attachmentBo.Id;
            attachment.FileExtension = attachmentBo.FileExtension;
            attachment.Base64Text = attachmentBo.Base64Text;

            repository.Update(attachment);
            repository.Save();
            return 1;
        }
    }
}
