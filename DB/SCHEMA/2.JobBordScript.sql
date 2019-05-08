USE [KenJobs]
GO
--SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserType]') AND type in (N'U')

--if EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserTypes]') AND type in (N'U'))
--print 'true';
--else
--print 'false';


--Create UserTypes
--if EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserTypes]') AND type in (N'U'))
--drop table UserTypes;
--create table UserType(
--Id int  identity(1,1),
--Name nvarchar(50) not null, 
--CreatedBy nvarchar(100) not null,
--CreateOn datetime not null,
--UpdatedBy nvarchar(100) not null,
--UpdatedOn datetime not null,
----Primary Key
--CONSTRAINT [PK_ROLE] PRIMARY KEY CLUSTERED 
--	(
--		[Id] ASC
--	)
--	WITH 
--	(
--		 PAD_INDEX = OFF,
--		 STATISTICS_NORECOMPUTE = OFF, 
--		 IGNORE_DUP_KEY = OFF, 
--		 ALLOW_ROW_LOCKS = ON, 
--		 ALLOW_PAGE_LOCKS = ON
--	 ) ON [PRIMARY]
--	) ON [PRIMARY]

-- Creating Gender
if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Gender]') AND type in (N'U'))
create table Gender(
Id int  identity(1,1),
Name nvarchar(20) not null,
CreatedBy nvarchar(100) not null,
CreateOn datetime not null,
UpdatedBy nvarchar(100) not null,
UpdatedOn datetime not null,
--Primary Key
CONSTRAINT [PK_Gender] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
GO
--Creating User
if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[User]') AND type in (N'U'))
create table [User](
Id int  identity(1,1),
Title nvarchar(20) not null,
FirstName nvarchar(50) not null,
MiddleName nvarchar(50) not null,
LastName nvarchar(50) not null,
ProfilePhoto nvarchar(50) not null,
Gender_Id int not null,
Status smallint not null,
CreatedBy nvarchar(100) not null,
CreateOn datetime not null,
UpdatedBy nvarchar(100) not null,  
UpdatedOn datetime not null,
AspNetUser_Id nvarchar(128) not null,

--Primary Key
CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
GO

if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Client]') AND type in (N'U'))
Create Table Client(
Id int identity(1,1),
Name nvarchar(50) not null,
Phone nvarchar(50) not null,
Email nvarchar(50) not null,
ContactPerson	nvarchar(50) not null,
Website	nvarchar(50) not null,
Address	nvarchar(500) not null,
Status	smallint not null,
Logo	nvarchar(50) not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null
--Primary Key
CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
	GO


if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[User_Client]') AND type in (N'U'))
create table User_Client(
Id	INT identity(1,1),
User_Id	INT not null,
Client_Id	INT not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,

--Primary Key
CONSTRAINT [PK_User_Client] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]

GO


if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[JobType]') AND type in (N'U'))
create table JobType(
Id	INT  identity(1,1),
JobType nvarchar(30) not null,
Status smallint not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,
--Primary Key
CONSTRAINT [PK_JobType] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
	GO

if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[JobCategory]') AND type in (N'U'))
Create table JobCategory(
Id INT  identity(1,1),
Category nvarchar(50) not null,
Status smallint not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,
--Primary Key
CONSTRAINT [PK_JobCategory] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
	GO

if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Jobs]') AND type in (N'U'))
create table Jobs(
Id int identity(1,1),
Client_Id int not null,
JobTitle nvarchar(100) not null,
Description nvarchar(max) not null,
NoOfVacancies int null,
Salary int not null,
Qualification nvarchar(100),
State int not null,
City nvarchar(100) not null,
PostDate datetime not null,
Status smallint  not null,
PostingStatus smallint not null,
JobType_Id int not null,
Category_id int not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,

--Primary Key
CONSTRAINT [PK_Jobs] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
	GO

if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AppliedJobs]') AND type in (N'U'))
Create Table AppliedJobs(
Id int identity(1,1),
User_Id int not null, 
Client_Id int not null,
Job_Id int not null,
AppliedDate datetime not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,
--Primary Key
CONSTRAINT [PK_AppliedJobs] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
GO

if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Profile]') AND type in (N'U'))
create table Profile(
Id int identity(1,1),
USer_Id int not null,
Resume nvarchar(100) not null,
skills nvarchar(200) not null,
TotalExperiance smallint not null,
HeighestQualification nvarchar(100) not null,
PreferredLocation nvarchar(200) not null,
CurrentSalary int not null,
ExpectedSalary int not null,
Languages nvarchar(200) not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,
--Primary Key
CONSTRAINT [PK_Profile] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
GO

if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Experience]') AND type in (N'U'))
create table Experience
(
Id int identity(1,1),
User_Id int not null,
CompanyName nvarchar(200) not null,
Technology nvarchar(100) not null,
Role nvarchar(100) not null,
StartDate datetime not null,
EndDate datetime not null,
Description nvarchar(max),
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,
--Primary Key
CONSTRAINT [PK_Experience] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
	GO

if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[EducationalQualification]') AND type in (N'U'))
create table EducationalQualification(
Id int identity(1,1),
User_Id int not null,
Institute nvarchar(200) not null,
Qualification nvarchar(100) not null,
YearOfPass nvarchar(50) not null,
Percentage float not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,
CONSTRAINT [PK_EducationalQualification] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]

	GO
	
if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Country]') AND type in (N'U'))
create table Country(
Id int Identity(1,1),
Name nvarchar(100) not null,
Status smallint not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,
CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
	GO

if NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[State]') AND type in (N'U'))
create table State(
Id int Identity(1,1),
Country_Id int not null,
Name nvarchar(100) not null,
Status smallint not null,
CreatedBy	nvarchar(100) not null,
CreateOn	datetime not null,
UpdatedBy	nvarchar(100) not null,
UpdatedOn	datetime not null,
CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
	WITH 
	(
		 PAD_INDEX = OFF,
		 STATISTICS_NORECOMPUTE = OFF, 
		 IGNORE_DUP_KEY = OFF, 
		 ALLOW_ROW_LOCKS = ON, 
		 ALLOW_PAGE_LOCKS = ON
	 ) ON [PRIMARY]
	) ON [PRIMARY]
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_User_Gender]') AND parent_object_id = OBJECT_ID(N'[dbo].[User]'))
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT FK_User_Gender FOREIGN KEY([Gender_Id])
REFERENCES [dbo].[Gender] ([Id]) 
GO

--User_Client
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_User_Client_User]') AND parent_object_id = OBJECT_ID(N'[dbo].[User_Client]'))
ALTER TABLE [dbo].[User_Client]  WITH CHECK ADD  CONSTRAINT FK_User_Client_User FOREIGN KEY([User_Id])
REFERENCES [dbo].[user] ([Id]) 
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_User_Client_Client]') AND parent_object_id = OBJECT_ID(N'[dbo].[User_Client]'))
ALTER TABLE [dbo].[User_Client]  WITH CHECK ADD  CONSTRAINT FK_User_Client_Client FOREIGN KEY([Client_Id])
REFERENCES [dbo].[Client] ([Id]) 
GO

--Jobs
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Jobs_Client]') AND parent_object_id = OBJECT_ID(N'[dbo].[Jobs]'))
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT FK_Jobs_Client FOREIGN KEY([Client_Id])
REFERENCES [dbo].[Client] ([Id]) 
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Jobs_JobType]') AND parent_object_id = OBJECT_ID(N'[dbo].[Jobs]'))
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT FK_Jobs_JobType FOREIGN KEY([JobType_Id])
REFERENCES [dbo].[JobType] ([Id]) 
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Jobs_JobCategory]') AND parent_object_id = OBJECT_ID(N'[dbo].[Jobs]'))
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT FK_Jobs_JobCategory FOREIGN KEY([Category_id])
REFERENCES [dbo].[JobCategory] ([Id]) 
GO

--AppliedJobs
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AppliedJobs_User]') AND parent_object_id = OBJECT_ID(N'[dbo].[AppliedJobs]'))
ALTER TABLE [dbo].[AppliedJobs]  WITH CHECK ADD  CONSTRAINT FK_AppliedJobs_User FOREIGN KEY([User_Id])
REFERENCES [dbo].[User] ([Id]) 
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AppliedJobs_Client]') AND parent_object_id = OBJECT_ID(N'[dbo].[AppliedJobs]'))
ALTER TABLE [dbo].[AppliedJobs]  WITH CHECK ADD  CONSTRAINT FK_AppliedJobs_Client FOREIGN KEY([Client_Id])
REFERENCES [dbo].[Client] ([Id]) 
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AppliedJobs_Jobs]') AND parent_object_id = OBJECT_ID(N'[dbo].[AppliedJobs]'))
ALTER TABLE [dbo].[AppliedJobs]  WITH CHECK ADD  CONSTRAINT FK_AppliedJobs_Jobs FOREIGN KEY([Job_Id])
REFERENCES [dbo].[Jobs] ([Id]) 
GO

--Profile
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Profile_User]') AND parent_object_id = OBJECT_ID(N'[dbo].[Profile]'))
ALTER TABLE [dbo].[Profile]  WITH CHECK ADD  CONSTRAINT FK_Profile_User FOREIGN KEY([USer_Id])
REFERENCES [dbo].[User] ([Id]) 
GO

--Experience
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Experience_User]') AND parent_object_id = OBJECT_ID(N'[dbo].[Experience]'))
ALTER TABLE [dbo].[Experience]  WITH CHECK ADD  CONSTRAINT FK_Experience_User FOREIGN KEY([USer_Id])
REFERENCES [dbo].[User] ([Id]) 
GO

--EducationalQualification
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_EducationalQualification_User]') AND parent_object_id = OBJECT_ID(N'[dbo].[EducationalQualification]'))
ALTER TABLE [dbo].[EducationalQualification]  WITH CHECK ADD  CONSTRAINT FK_EducationalQualification_User FOREIGN KEY([USer_Id])
REFERENCES [dbo].[User] ([Id]) 
GO

--State
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_State_Country]') AND parent_object_id = OBJECT_ID(N'[dbo].[State]'))
ALTER TABLE [dbo].[State]  WITH CHECK ADD  CONSTRAINT FK_State_Country FOREIGN KEY([Country_Id])
REFERENCES [dbo].[Country] ([Id]) 
GO

--User
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_User_AspNetUser]') AND parent_object_id = OBJECT_ID(N'[dbo].[User]'))
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT FK_User_AspNetUser FOREIGN KEY([AspNetUser_Id])
REFERENCES [dbo].[AspNetUsers] ([Id]) 
GO