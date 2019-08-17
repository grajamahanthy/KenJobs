ALTER PROCEDURE CREATEEMPLOYERDATA
	@NUMOFEMPLOYERS INT = 50
AS
BEGIN
	DECLARE @UserCounter INT
	SET @UserCounter = 1
	
	WHILE (@UserCounter <=@NUMOFEMPLOYERS)
	BEGIN

		DECLARE @AspNetID NVARCHAR(MAX) = NEWID()
		DECLARE @UserId INT, @OrgId INT
		DECLARE @UNIQUEEXT NVARCHAR(20)
		SELECT @UNIQUEEXT = CAST(MAX(Id)+1 AS NVARCHAR(20)) FROM [USER]
	
		
		INSERT INTO [dbo].[AspNetUsers]
		(Id,[Email],[EmailConfirmed],[PasswordHash],[SecurityStamp],[PhoneNumber],[PhoneNumberConfirmed],[TwoFactorEnabled],[LockoutEndDateUtc],[LockoutEnabled],[AccessFailedCount],[UserName])
		VALUES(@AspNetID,'employer_' + @UNIQUEEXT + '@gmail.com',1,'ADFuPp504lvX5wnMnLFdEYF1GBN92UpCP3eP0wNioysiBKSVfYHaR0NiKI1G+xQd4g=='
		,'5261efee-4ace-446d-a80d-fe8bd1087bab',null,0,0,null,0,0,'employer_' + @UNIQUEEXT + '@gmail.com')

		INSERT INTO AspNetUserRoles (UserId, RoleId)
		VALUES(@AspNetID, 2)

		INSERT INTO [dbo].[User]
		([Title],[FirstName],[MiddleName],[LastName],[ProfilePhoto],[Gender_Id],[Status],[CreatedBy],[CreatedOn],[UpdatedBy],[UpdatedOn],[AspNetUser_Id],[PhoneNumber],[Email],[IsIndividual],[EmailActivationCode],[ResetPasswordCode])    
		VALUES('Mr', 'FirstName' + @UNIQUEEXT, 'MiddleName' + @UNIQUEEXT,'LastName' + @UNIQUEEXT,null,1,1,'Admin',GETDATE(),'Admin'
		,GETDATE(),@AspNetID,'9963188666','employer_' + @UNIQUEEXT + '@gmail.com',1,null,null)
		
		SET @UserId = @@IDENTITY

		INSERT INTO Organization (Name, CreatedBy,CreatedOn,UpdatedBy,UpdatedOn)
		VALUES('FirstName' + @UNIQUEEXT + '_LastName' + @UNIQUEEXT, 'Admin', GETDATE(), 'Admin', GETDATE())

		SET @OrgId = @@IDENTITY

		INSERT INTO User_Organization(User_Id, Organization_Id, CreatedBy,CreatedOn,UpdatedBy,UpdatedOn)
		VALUES(@UserId, @OrgId, 'Admin', GETDATE(), 'Admin', GETDATE())

		PRINT '--EMPLOYER ID IS: ' + CAST(@UserId AS VARCHAR)
		EXEC dbo.CREATEJOBSDATA @UserId, 20
		
		
		SET @UserCounter = @UserCounter + 1
	END
END