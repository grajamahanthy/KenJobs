﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KenJobs.Bo.BusinessObjects;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
   public interface UserContract
    {
        IEnumerable<UserBo> GetUsers();
        UserBo GetUser(string id);
        UserBo GetUserById(int id);
        AspNetUserBo GetAspNetUser(string id);
        UserBo GetUserByEmail(string email);
        int PostUser(UserBo userBo);
        int UpdateUser(int id, UserBo userBo);
        int UpdateEmployer(int id, UserBo userBo);
        int UpdatePartialUserProps(UserBo userBo);
    }
}
