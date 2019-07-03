USE [kenjobs]
GO
ALTER TABLE [dbo].[User_Client] DROP CONSTRAINT [FK_User_Client_User]
GO
ALTER TABLE [dbo].[User_Client] DROP CONSTRAINT [FK_User_Client_Client]
GO
ALTER TABLE [dbo].[User] DROP CONSTRAINT [FK_User_Gender]
GO
ALTER TABLE [dbo].[User] DROP CONSTRAINT [FK_User_AspNetUser]
GO
ALTER TABLE [dbo].[State] DROP CONSTRAINT [FK_State_Country]
GO
ALTER TABLE [dbo].[Profile] DROP CONSTRAINT [FK_Profile_User]
GO
ALTER TABLE [dbo].[Jobs] DROP CONSTRAINT [FK_Jobs_JobType]
GO
ALTER TABLE [dbo].[Jobs] DROP CONSTRAINT [FK_Jobs_JobCategory]
GO
ALTER TABLE [dbo].[Jobs] DROP CONSTRAINT [FK_Jobs_Client]
GO
ALTER TABLE [dbo].[Experience] DROP CONSTRAINT [FK_Experience_User]
GO
ALTER TABLE [dbo].[EducationalQualification] DROP CONSTRAINT [FK_EducationalQualification_User]
GO
ALTER TABLE [dbo].[AppliedJobs] DROP CONSTRAINT [FK_AppliedJobs_User]
GO
ALTER TABLE [dbo].[AppliedJobs] DROP CONSTRAINT [FK_AppliedJobs_Jobs]
GO
ALTER TABLE [dbo].[AppliedJobs] DROP CONSTRAINT [FK_AppliedJobs_Client]
GO
/****** Object:  Table [dbo].[User_Client]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[User_Client]
GO
/****** Object:  Table [dbo].[User]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[User]
GO
/****** Object:  Table [dbo].[State]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[State]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[Profile]
GO
/****** Object:  Table [dbo].[JobType]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[JobType]
GO
/****** Object:  Table [dbo].[Jobs]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[Jobs]
GO
/****** Object:  Table [dbo].[JobCategory]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[JobCategory]
GO
/****** Object:  Table [dbo].[Gender]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[Gender]
GO
/****** Object:  Table [dbo].[Experience]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[Experience]
GO
/****** Object:  Table [dbo].[EducationalQualification]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[EducationalQualification]
GO
/****** Object:  Table [dbo].[Currency]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[Currency]
GO
/****** Object:  Table [dbo].[Country]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[Country]
GO
/****** Object:  Table [dbo].[Client]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[Client]
GO
/****** Object:  Table [dbo].[AppliedJobs]    Script Date: 04-07-2019 01:26:39 ******/
DROP TABLE [dbo].[AppliedJobs]
GO
/****** Object:  Table [dbo].[AppliedJobs]    Script Date: 04-07-2019 01:26:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppliedJobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[User_Id] [int] NOT NULL,
	[Client_Id] [int] NOT NULL,
	[Job_Id] [int] NOT NULL,
	[AppliedDate] [datetime] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_AppliedJobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Client]    Script Date: 04-07-2019 01:26:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[ContactPerson] [nvarchar](50) NOT NULL,
	[Website] [nvarchar](50) NOT NULL,
	[Address] [nvarchar](500) NOT NULL,
	[Status] [smallint] NOT NULL,
	[Logo] [nvarchar](50) NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Country]    Script Date: 04-07-2019 01:26:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Status] [smallint] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Currency]    Script Date: 04-07-2019 01:26:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Currency](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[code] [nvarchar](10) NULL,
	[value] [nvarchar](50) NULL,
	[status] [smallint] NULL,
	[symbol] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EducationalQualification]    Script Date: 04-07-2019 01:26:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EducationalQualification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[User_Id] [int] NOT NULL,
	[Institute] [nvarchar](200) NOT NULL,
	[Qualification] [nvarchar](100) NOT NULL,
	[YearOfPass] [nvarchar](50) NOT NULL,
	[Percentage] [float] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_EducationalQualification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Experience]    Script Date: 04-07-2019 01:26:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Experience](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[User_Id] [int] NOT NULL,
	[CompanyName] [nvarchar](200) NOT NULL,
	[Technology] [nvarchar](100) NOT NULL,
	[Role] [nvarchar](100) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Experience] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gender]    Script Date: 04-07-2019 01:26:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gender](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Gender] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobCategory]    Script Date: 04-07-2019 01:26:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Category] [nvarchar](50) NOT NULL,
	[Status] [smallint] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_JobCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Jobs]    Script Date: 04-07-2019 01:26:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Client_Id] [int] NOT NULL,
	[JobTitle] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[NoOfVacancies] [int] NULL,
	[MinSalary] [float] NULL,
	[Qualification] [nvarchar](100) NULL,
	[State] [int] NOT NULL,
	[City] [nvarchar](100) NOT NULL,
	[PostDate] [datetime] NOT NULL,
	[Status] [smallint] NOT NULL,
	[PostingStatus] [smallint] NOT NULL,
	[JobType_Id] [int] NOT NULL,
	[Category_id] [int] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
	[MinExperience] [float] NULL,
	[Skills] [nvarchar](max) NULL,
	[MaxSalary] [float] NULL,
	[MaxExperience] [float] NULL,
	[User_Id] [int] NULL,
	[currency] [int] NULL,
 CONSTRAINT [PK_Jobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobType]    Script Date: 04-07-2019 01:26:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[JobType] [nvarchar](30) NOT NULL,
	[Status] [smallint] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_JobType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 04-07-2019 01:26:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[USer_Id] [int] NOT NULL,
	[Resume] [nvarchar](100) NOT NULL,
	[skills] [nvarchar](200) NOT NULL,
	[TotalExperiance] [smallint] NOT NULL,
	[HeighestQualification] [nvarchar](100) NOT NULL,
	[PreferredLocation] [nvarchar](200) NOT NULL,
	[CurrentSalary] [int] NOT NULL,
	[ExpectedSalary] [int] NOT NULL,
	[Languages] [nvarchar](200) NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Profile] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[State]    Script Date: 04-07-2019 01:26:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[State](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Country_Id] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Status] [smallint] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 04-07-2019 01:26:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](20) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[MiddleName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[ProfilePhoto] [nvarchar](50) NULL,
	[Gender_Id] [int] NOT NULL,
	[Status] [smallint] NOT NULL,
	[CreatedBy] [nvarchar](100) NULL,
	[CreateOn] [datetime] NULL,
	[UpdatedBy] [nvarchar](100) NULL,
	[UpdatedOn] [datetime] NULL,
	[AspNetUser_Id] [nvarchar](128) NOT NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[Email] [nvarchar](256) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Client]    Script Date: 04-07-2019 01:26:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Client](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[User_Id] [int] NOT NULL,
	[Client_Id] [int] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](100) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_User_Client] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AppliedJobs]  WITH CHECK ADD  CONSTRAINT [FK_AppliedJobs_Client] FOREIGN KEY([Client_Id])
REFERENCES [dbo].[Client] ([Id])
GO
ALTER TABLE [dbo].[AppliedJobs] CHECK CONSTRAINT [FK_AppliedJobs_Client]
GO
ALTER TABLE [dbo].[AppliedJobs]  WITH CHECK ADD  CONSTRAINT [FK_AppliedJobs_Jobs] FOREIGN KEY([Job_Id])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[AppliedJobs] CHECK CONSTRAINT [FK_AppliedJobs_Jobs]
GO
ALTER TABLE [dbo].[AppliedJobs]  WITH CHECK ADD  CONSTRAINT [FK_AppliedJobs_User] FOREIGN KEY([User_Id])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[AppliedJobs] CHECK CONSTRAINT [FK_AppliedJobs_User]
GO
ALTER TABLE [dbo].[EducationalQualification]  WITH CHECK ADD  CONSTRAINT [FK_EducationalQualification_User] FOREIGN KEY([User_Id])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[EducationalQualification] CHECK CONSTRAINT [FK_EducationalQualification_User]
GO
ALTER TABLE [dbo].[Experience]  WITH CHECK ADD  CONSTRAINT [FK_Experience_User] FOREIGN KEY([User_Id])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Experience] CHECK CONSTRAINT [FK_Experience_User]
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT [FK_Jobs_Client] FOREIGN KEY([Client_Id])
REFERENCES [dbo].[Client] ([Id])
GO
ALTER TABLE [dbo].[Jobs] CHECK CONSTRAINT [FK_Jobs_Client]
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT [FK_Jobs_JobCategory] FOREIGN KEY([Category_id])
REFERENCES [dbo].[JobCategory] ([Id])
GO
ALTER TABLE [dbo].[Jobs] CHECK CONSTRAINT [FK_Jobs_JobCategory]
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT [FK_Jobs_JobType] FOREIGN KEY([JobType_Id])
REFERENCES [dbo].[JobType] ([Id])
GO
ALTER TABLE [dbo].[Jobs] CHECK CONSTRAINT [FK_Jobs_JobType]
GO
ALTER TABLE [dbo].[Profile]  WITH CHECK ADD  CONSTRAINT [FK_Profile_User] FOREIGN KEY([USer_Id])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Profile] CHECK CONSTRAINT [FK_Profile_User]
GO
ALTER TABLE [dbo].[State]  WITH CHECK ADD  CONSTRAINT [FK_State_Country] FOREIGN KEY([Country_Id])
REFERENCES [dbo].[Country] ([Id])
GO
ALTER TABLE [dbo].[State] CHECK CONSTRAINT [FK_State_Country]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_AspNetUser] FOREIGN KEY([AspNetUser_Id])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_AspNetUser]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Gender] FOREIGN KEY([Gender_Id])
REFERENCES [dbo].[Gender] ([Id])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Gender]
GO
ALTER TABLE [dbo].[User_Client]  WITH CHECK ADD  CONSTRAINT [FK_User_Client_Client] FOREIGN KEY([Client_Id])
REFERENCES [dbo].[Client] ([Id])
GO
ALTER TABLE [dbo].[User_Client] CHECK CONSTRAINT [FK_User_Client_Client]
GO
ALTER TABLE [dbo].[User_Client]  WITH CHECK ADD  CONSTRAINT [FK_User_Client_User] FOREIGN KEY([User_Id])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[User_Client] CHECK CONSTRAINT [FK_User_Client_User]
GO
