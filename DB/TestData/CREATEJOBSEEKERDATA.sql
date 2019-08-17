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
		VALUES(@AspNetID,'js_' + @UNIQUEEXT + '@gmail.com',1,'ADFuPp504lvX5wnMnLFdEYF1GBN92UpCP3eP0wNioysiBKSVfYHaR0NiKI1G+xQd4g=='
		,'5261efee-4ace-446d-a80d-fe8bd1087bab',null,0,0,null,0,0,'js_' + @UNIQUEEXT + '@gmail.com')

		INSERT INTO AspNetUserRoles (UserId, RoleId)
		VALUES(@AspNetID, 1)

		INSERT INTO [dbo].[User]
		([Title],[FirstName],[MiddleName],[LastName],[ProfilePhoto],[Gender_Id],[Status],[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn],[AspNetUser_Id],[PhoneNumber],[Email],[IsIndividual],[EmailActivationCode],[ResetPasswordCode])    
		VALUES('Mr', 'FirstName' + @UNIQUEEXT, 'MiddleName' + @UNIQUEEXT,'LastName' + @UNIQUEEXT,null,1,1,'Admin',GETDATE(),'Admin'
		,GETDATE(),@AspNetID,'9963188666','js_' + @UNIQUEEXT + '@gmail.com',1,null,null)
		
		SET @UserId = @@IDENTITY
		PRINT '------------------JOBSEEKER ID IS:' + CAST(@UserId AS VARCHAR)
		

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