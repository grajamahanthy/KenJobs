namespace KenJobs.Bo.BusinessObjects
{
    public partial class AspNetUserLoginBo
    {
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }
        public string UserId { get; set; }    
        public virtual AspNetUserBo AspNetUser { get; set; }
    }
}
