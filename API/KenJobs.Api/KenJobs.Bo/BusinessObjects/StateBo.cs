namespace KenJobs.Bo.BusinessObjects
{
    public partial class StateBo: BusinessBase
    {
        public int Id { get; set; }
        public int Country_Id { get; set; }
        public string Name { get; set; }
        public short Status { get; set; }    
        public virtual CountryBo Country { get; set; }
    }
}
