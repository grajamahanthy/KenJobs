namespace KenJobs.Bo.BusinessObjects
{
    public partial class AspNetUserClaimBo
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public virtual AspNetUserBo AspNetUser { get; set; }
    }
}
