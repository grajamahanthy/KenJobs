using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
    public interface AttachmentTypeContract
    {
        IEnumerable<AttachmentTypeBo> GetAttachmentTypeBos();
        IEnumerable<AttachmentTypeBo> GetAttachmentTypeBoById(int id);
        AttachmentTypeBo GetAttachmentTypeBo(int id);
        int PostAttachmentTypeBo(AttachmentTypeBo attachmentBo);
        int UpdateAttachmentTypeBo(int id,AttachmentTypeBo attachmentBo);
        int DeleteAttachmentTypeBo(int id);

    }
}
