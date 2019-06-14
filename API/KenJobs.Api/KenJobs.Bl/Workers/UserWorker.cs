using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using KenJobs.Dal;

namespace KenJobs.Bl.Workers
{
    public class UserWorker : UserContract
    {
        public IEnumerable<UserBo> GetUser()
        {
            IGenericRepository<User> repository = new GenericRepository<User>();
            IEnumerable<User> userList = repository.GetAll();

            List<UserBo> UserBoList = new List<UserBo>();

            foreach (User user in userList)
            {
                UserBo userBo = new UserBo();
                userBo.Id = user.Id;
                userBo.FirstName = user.FirstName;
                userBo.MiddleName = user.MiddleName;
                userBo.LastName = user.LastName;
                userBo.ProfilePhoto = user.ProfilePhoto;
                userBo.Gender_Id = user.Gender_Id;
                userBo.Status = user.Status;
                userBo.CreatedBy = user.CreatedBy;
                userBo.CreateOn = user.CreateOn;
                userBo.UpdatedBy = user.UpdatedBy;
                userBo.UpdatedOn = user.UpdatedOn;
                userBo.AspNetUser_Id = user.AspNetUser_Id;
                UserBoList.Add(userBo);
            }
            return UserBoList;
        }

        public int InsertUser(UserBo userBo)
        {
            IGenericRepository<User> repository = new GenericRepository<User>();

            User user = new User();
            user.Id = userBo.Id;
            user.FirstName = userBo.FirstName;
            user.MiddleName = userBo.MiddleName;
            user.LastName = userBo.LastName;
            user.ProfilePhoto = userBo.ProfilePhoto;
            user.Gender_Id = userBo.Gender_Id;
            user.Status = userBo.Status;
            user.CreatedBy = "Client";
            user.CreateOn = DateTime.Now;
            user.UpdatedBy = userBo.UpdatedBy;
            user.UpdatedOn = userBo.UpdatedOn;
            user.AspNetUser_Id = userBo.AspNetUser_Id;
            repository.Insert(user);
            repository.Save();
            return 1;

        }
    }
}
