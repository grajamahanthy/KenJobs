namespace KenJobs.Bo.BusinessObjects
{
    public partial class ExperienceBo: BusinessBase
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public string CompanyName { get; set; }
        public string Technology { get; set; }
        public string Role { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public string Description { get; set; }    
        public virtual UserBo User { get; set; }
    }
}
