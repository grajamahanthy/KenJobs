namespace KenJobs.Bo.BusinessObjects
{
    public partial class AppliedJobBo
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Client_Id { get; set; }
        public int Job_Id { get; set; }
        public System.DateTime AppliedDate { get; set; }
        public ClientBo Client { get; set; }
        public JobBo Job { get; set; }
        public UserBo User { get; set; }
    }
}
