namespace KenJobs.Bo.BusinessObjects
{
    public partial class User_ClientBo:BusinessBase
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Client_Id { get; set; }
    
        public virtual ClientBo Client { get; set; }
        public virtual UserBo User { get; set; }
    }
}
