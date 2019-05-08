namespace KenJobs.Bo.BusinessObjects
{
    public partial class EducationalQualificationBo: BusinessBase
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public string Institute { get; set; }
        public string Qualification { get; set; }
        public string YearOfPass { get; set; }
        public double Percentage { get; set; }    
        public virtual UserBo User { get; set; }
    }
}
