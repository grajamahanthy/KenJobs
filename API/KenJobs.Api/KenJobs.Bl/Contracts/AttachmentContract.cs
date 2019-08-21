using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
  public  interface AttachmentContract
    {
        IEnumerable<AttachmentBo> GetAttachmentBos();
        IEnumerable<AttachmentBo> GetAttachmentBo(int id);
        int PostAttachmentBo(AttachmentBo attachmentBo);
        int UpdateAttachmentBo(int id,AttachmentBo attachmentBo);
        int DeleteAttachmentBo(int id);
    }
}
