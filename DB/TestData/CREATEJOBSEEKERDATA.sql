ALTER PROCEDURE CREATEJOBSEEKERDATA
	@JOBID INT, @NUMOFJOBSEEKERS INT = 5
AS
BEGIN
	DECLARE @JobSeekerCounter INT
	SET @JobSeekerCounter = 1
	
	WHILE (@JobSeekerCounter <=@NUMOFJOBSEEKERS)
	BEGIN

		DECLARE @AspNetID NVARCHAR(MAX) = NEWID()
		DECLARE @UserId INT
		DECLARE @UNIQUEEXT NVARCHAR(20)
		SELECT @UNIQUEEXT = CAST(MAX(Id)+1 AS NVARCHAR(20)) FROM [USER]
		
		INSERT INTO [dbo].[AspNetUsers]
		(Id,[Email],[EmailConfirmed],[PasswordHash],[SecurityStamp],[PhoneNumber],[PhoneNumberConfirmed],[TwoFactorEnabled],[LockoutEndDateUtc],[LockoutEnabled],[AccessFailedCount],[UserName])
		VALUES(@AspNetID,'js_' + @UNIQUEEXT + '@gmail.com',1,'AG250b4a6XywisfNtkx3fK6JLxuuGDbO7FyUREYlt4qdbCCCQqzGKW6BQO1pqfAy6w=='
		,'ccbc0828-df9d-49ae-8a19-3982d209ef28',null,0,0,null,0,0,'js_' + @UNIQUEEXT + '@gmail.com')

		INSERT INTO AspNetUserRoles (UserId, RoleId)
		VALUES(@AspNetID, 1)

		INSERT INTO [dbo].[User]
		([Title],[FirstName],[MiddleName],[LastName],[ProfilePhoto],[Gender_Id],[Status],[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn],[AspNetUser_Id],[PhoneNumber],[Email],[IsIndividual],[EmailActivationCode],[ResetPasswordCode])    
		VALUES('Mr', 'FirstName' + @UNIQUEEXT, 'MiddleName' + @UNIQUEEXT,'LastName' + @UNIQUEEXT,null,1,1,'Admin',GETDATE(),'Admin'
		,GETDATE(),@AspNetID,'9963188666','js_' + @UNIQUEEXT + '@gmail.com',1,null,null)
		
		SET @UserId = @@IDENTITY
		PRINT '------------------JOBSEEKER ID IS:' + CAST(@UserId AS VARCHAR)


		INSERT INTO EducationalQualification(User_Id, Institute, Qualification, YearOfPass, Percentage,[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn])
		Values(@UserId, 'JNTU', 'B.Tech', '2007', '90','Admin',GETDATE(),'Admin',GETDATE())
		INSERT INTO EducationalQualification(User_Id, Institute, Qualification, YearOfPass, Percentage,[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn])
		Values(@UserId, 'Intermediate Board', 'Intermediate', '2003', '90','Admin',GETDATE(),'Admin',GETDATE())
		INSERT INTO EducationalQualification(User_Id, Institute, Qualification, YearOfPass, Percentage,[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn])
		Values(@UserId, 'SSC Board', '10th Standard', '2001', '90','Admin',GETDATE(),'Admin',GETDATE())

		INSERT INTO Experience(User_Id, CompanyName, Technology, Role, StartDate, EndDate, Description,[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn])
		VALUES(@UserId, 'Kensuite Technologies Pvt Ltd.', '.Net', 'Architect', GETDATE(), GETDATE(), '','Admin',GETDATE(),'Admin',GETDATE())
		INSERT INTO Experience(User_Id, CompanyName, Technology, Role, StartDate, EndDate, Description,[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn])
		VALUES(@UserId, 'CTS Pvt Ltd.', '.Net', 'Architect', GETDATE(), GETDATE(), '','Admin',GETDATE(),'Admin',GETDATE())
		INSERT INTO Experience(User_Id, CompanyName, Technology, Role, StartDate, EndDate, Description,[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn])
		VALUES(@UserId, 'IBM INDIA Pvt Ltd.', '.Net', 'Architect', GETDATE(), GETDATE(), '','Admin',GETDATE(),'Admin',GETDATE())

		INSERT INTO Profile(User_Id, Resume, Skills, TotalExperiance, HeighestQualification, PreferredLocation, CurrentSalary, ExpectedSalary, Languages,[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn])
		VALUES(@UserId, '', '.Net, Web API, SQL Server, Angular, React', 10, 'B.Tech', 'Hyderabad', 9999999, 9999999, 'English, Telugu, Hindi','Admin',GETDATE(),'Admin',GETDATE())


		

		DECLARE @DefaultClientId INT
		SELECT TOP 1 @DefaultClientId = Id FROM Client		
		IF @DefaultClientId IS NULL
		BEGIN
			INSERT INTO Client(Name,Phone,Email,ContactPerson,Website,Address,Status,Logo,CreatedBy,CreatedOn,UpdatedBy,UpdatedOn) 
			VALUES('Default', '9999999999', 'g.rajamahanthy@gmail.com', 'Test Test', 'www.kwnsuite.com', 'Test Address', 1, 'Logo.png','ADMIN', GETDATE(), 'ADMIN', GETDATE())

			SET @DefaultClientId = @@IDENTITY
		END

		INSERT INTO AppliedJobs (User_Id,Client_Id,Job_Id,AppliedDate,CreatedBy,CreatedOn,UpdatedBy,UpdatedOn)
		VALUES(@UserId, @DefaultClientId, @JOBID, GETDATE(), 'ADMIN', GETDATE(), 'ADMIN', GETDATE())
		
		PRINT CAST(@UserId AS VARCHAR) + ' APPLIED FOR ' + CAST(@JOBID AS VARCHAR) + ' Successfully'

		SET @JobSeekerCounter = @JobSeekerCounter + 1
	END
END