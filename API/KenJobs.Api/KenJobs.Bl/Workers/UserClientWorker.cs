using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal;
using KenJobs.Dal.Workers;

namespace KenJobs.Bl.Workers
{
    class UserClientWorker : UserClientContract
    {
        public User_ClientBo GetUserClient(int id)
        {
            IGenericRepository<User_Client> repository = new GenericRepository<User_Client>();
            object objid = id;
            User_Client userClient = repository.GetById(objid);
            User_ClientBo userclientBo = new User_ClientBo();
            userclientBo.Id = userClient.Id;
            userclientBo.User_Id = userClient.User_Id;
            userclientBo.Client_Id = userClient.Client_Id;

            return userclientBo;
        }

        public IEnumerable<User_ClientBo> GetUserClients()
        {
            IGenericRepository<User_Client> repository = new GenericRepository<User_Client>();
            IEnumerable<User_Client> userClientList = repository.GetAll();
            List<User_ClientBo> userClientBoList = new List<User_ClientBo>();

            foreach (User_Client userClient in userClientList)
            {
                User_ClientBo userClientBo = new User_ClientBo();
                userClientBo.Id = userClient.Id;
                userClientBo.User_Id = userClient.User_Id;
                userClientBo.Client_Id = userClient.Client_Id;

                userClientBoList.Add(userClientBo);
            }
            return userClientBoList;

        }

        public int PostUserClient(User_ClientBo userClientBo)
        {
            IGenericRepository<User_Client> repository = new GenericRepository<User_Client>();

            User_Client userClient = new User_Client();
            userClient.Id = userClientBo.Id;
            userClient.User_Id = userClientBo.User_Id;
            userClient.Client_Id = userClientBo.Client_Id;
            repository.Insert(userClient);
            repository.Save();

            return 1;
        }

        public int UpdateUserClient(int id, User_ClientBo userClientBo)
        {
            IGenericRepository<User_Client> repository = new GenericRepository<User_Client>();

            User_Client userClient = new User_Client();
            userClient.Id = userClientBo.Id;
            userClient.User_Id = userClientBo.User_Id;
            userClient.Client_Id = userClientBo.Client_Id;
            repository.Update(userClient);
            repository.Save();

            return 1;
        }
    }
}
