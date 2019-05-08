using System.Collections.Generic;

namespace KenJobs.Bo.BusinessObjects
{   
    public partial class ClientBo : BusinessBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }
        public string Website { get; set; }
        public string Address { get; set; }
        public short Status { get; set; }
        public string Logo { get; set; }    
        public ICollection<AppliedJobBo> AppliedJobs { get; set; }
        public ICollection<JobBo> Jobs { get; set; }
        public ICollection<User_ClientBo> User_Client { get; set; }
    }
}
