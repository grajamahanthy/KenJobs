
USE [kenjobs]
GO
DELETE FROM [dbo].[JobType]
GO
DELETE FROM [dbo].[JobCategory]
GO
DELETE FROM [dbo].[Gender]
GO
DELETE FROM [dbo].[Currency]
GO
DELETE FROM [dbo].[AspNetRoles]
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'1', N'JobSeeker')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'2', N'Employer')
GO
SET IDENTITY_INSERT [dbo].[Currency] ON 
GO
INSERT [dbo].[Currency] ([Id], [code], [value], [status], [symbol]) VALUES (1, N'USD', N'US Dollar', 1, N'$')
GO
INSERT [dbo].[Currency] ([Id], [code], [value], [status], [symbol]) VALUES (2, N'IND', N'Indian Rupee', 1, N'IND RUPEE')
GO
INSERT [dbo].[Currency] ([Id], [code], [value], [status], [symbol]) VALUES (3, N'EUR', N'Euro', 1, N'€')
GO
SET IDENTITY_INSERT [dbo].[Currency] OFF
GO
SET IDENTITY_INSERT [dbo].[Gender] ON 
GO
INSERT [dbo].[Gender] ([Id], [Name], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (1, N'male', N'Admin', CAST(N'2019-06-14T09:00:00.000' AS DateTime), N'Admin', CAST(N'2019-06-14T09:00:00.000' AS DateTime))
GO
INSERT [dbo].[Gender] ([Id], [Name], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (2, N'female', N'Admin', CAST(N'2019-06-14T09:00:00.000' AS DateTime), N'Admin', CAST(N'2019-06-14T09:00:00.000' AS DateTime))
GO
INSERT [dbo].[Gender] ([Id], [Name], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (3, N'other', N'Admin', CAST(N'2019-06-14T09:00:00.000' AS DateTime), N'Admin', CAST(N'2019-06-14T09:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Gender] OFF
GO
SET IDENTITY_INSERT [dbo].[JobCategory] ON 
GO
INSERT [dbo].[JobCategory] ([Id], [Category], [Status], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (1, N'Accounting', 1, N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime), N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[JobCategory] ([Id], [Category], [Status], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (2, N'Bank', 1, N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime), N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[JobCategory] ([Id], [Category], [Status], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (3, N'IT', 1, N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime), N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[JobCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[JobType] ON 
GO
INSERT [dbo].[JobType] ([Id], [Name], [Status], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (1, N'Full Time', 1, N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime), N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[JobType] ([Id], [Name], [Status], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (2, N'Part Time', 1, N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime), N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[JobType] ([Id], [Name], [Status], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (3, N'Work From Home', 1, N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime), N'admin', CAST(N'2019-06-28T00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[JobType] OFF
GO
SET IDENTITY_INSERT [dbo].[AttachmentType] ON 
GO
INSERT [dbo].[AttachmentType] ([Id], [Name], [AllowedFileTypeExtensions], [AllowedFileSize], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (1, N'ProfilePicture', NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[AttachmentType] ([Id], [Name], [AllowedFileTypeExtensions], [AllowedFileSize], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (2, N'Resume', NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[AttachmentType] ([Id], [Name], [AllowedFileTypeExtensions], [AllowedFileSize], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (3, N'CoverLetter', NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[AttachmentType] ([Id], [Name], [AllowedFileTypeExtensions], [AllowedFileSize], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (4, N'CompanyLogo', NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[AttachmentType] ([Id], [Name], [AllowedFileTypeExtensions], [AllowedFileSize], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (5, N'Custom', NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[AttachmentType] OFF
GO
