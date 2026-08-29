using Capstone.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capstone.DAL.Repository
{
    public interface IRepository
    {
        public bool Authenticate(User User);
        public List<ServiceRequest> ViewRequest();

        public List<ServiceRequest> ViewRequest(string userName);

        public int RaiseRequest(ServiceRequest newRequest);
        public ServiceRequest GetRequestById(int requestId);
        public bool ReOpenRequest(ServiceRequest request);

        //public List<ServiceRequest> GetRequestBySP(string userName);

        public bool CloseRequest(int requestId);

        public bool DeleteRequest(int requestId);

        public User GetUser(string userName);
    }
}
