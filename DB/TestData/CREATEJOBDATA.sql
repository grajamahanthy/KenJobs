ALTER PROCEDURE CREATEJOBSDATA
	@EMPLOYERID INT, @NUMOFJOBS INT = 20
AS
BEGIN
		DECLARE @JobCounter INT
		SET @JobCounter = 1
	
		WHILE (@JobCounter <=@NUMOFJOBS)
		BEGIN
			DECLARE @UNIQUEEXT NVARCHAR(20)
			SELECT @UNIQUEEXT = CAST(MAX(Id)+1 AS NVARCHAR(20)) FROM [JOBS]
			DECLARE @JobId INT

			INSERT INTO Jobs(JobTitle,Description,NoOfVacancies,MinSalary,Qualification,State,City,PostDate,Status,PostingStatus,JobType_Id,Category_id,MinExperience,Skills,MaxSalary,MaxExperience,User_Id,Currency,ClientName,Country,AddressLine,CreatedBy,CreatedOn,UpdatedBy,UpdatedOn)
			VALUES('Software Developer' + @UNIQUEEXT, 'Job Description'  + @UNIQUEEXT, 4, 20000, 'B.Tech', 'Andhra Pradesh', 'Visakhapatnam', GETDATE(), 1, 0, 1, 3, 6, '.NET, React JS, Angular, SQL Server', 60000, 9, @EMPLOYERID, 1, 'Kensuite', 'India', null, 'Admin', GETDATE(), 'Admin', GETDATE())
			SET @JobId = @@IDENTITY

			PRINT '---------JOB ID IS : ' + CAST(@JobId AS VARCHAR)
			EXEC CREATEJOBSEEKERDATA @JobId, 5

		SET @JobCounter = @JobCounter + 1
		END
END