using Capstone.DAL.Model;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Capstone.DAL.Repository
{
    public class Repository : IRepository
    {
        private readonly HelpDeskDbContext _context;
        public Repository(HelpDeskDbContext context)
        {
            _context = context;
        }
        public bool Authenticate(User User)
        {
            var isExist = _context.Users.FirstOrDefault(x => x.UserName == User.UserName);
            if (isExist == null) return false;

            var isValidRole = _context.Roles.Any(x => x.RoleId == isExist.RoleId);

            if (!(isExist.Password.Equals(User.Password)) || !isValidRole) return false;

            return true;

        }
        public List<ServiceRequest> ViewRequest()
        {
            return _context.ServiceRequests.ToList();
        }

        public List<ServiceRequest> ViewRequest(string userName)
        {
            return _context.ServiceRequests.Where(x => x.RaisedBy == userName).ToList();
        }

        public int RaiseRequest(ServiceRequest newRequest)
        {
            newRequest.ReqStatus = 1;
            _context.ServiceRequests.Add(newRequest);
            _context.SaveChanges();

            return newRequest.RequestId;
        }

        public ServiceRequest GetRequestById(int requestId)
        {
            return _context.ServiceRequests.FirstOrDefault(x => x.RequestId == requestId);
        }
        public bool ReOpenRequest(ServiceRequest request)
        {
            var isExist = _context.ServiceRequests.Any(x=>x.RequestId == request.RequestId);
            if(!isExist) return false;

            request.ReqStatus = 1;
            _context.ServiceRequests.Update(request);
            _context.SaveChanges();
            return true;
        }

        //public List<ServiceRequest> GetRequestBySP(string userName)
        //{

        //}

        public bool CloseRequest(int requestId)
        {
            var isExist = _context.ServiceRequests.FirstOrDefault(x => x.RequestId == requestId);
            if (isExist == null) return false;

            isExist.ReqStatus = 2;
            _context.ServiceRequests.Update(isExist);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteRequest(int requestId)
        {
            var isExist = _context.ServiceRequests.FirstOrDefault(x => x.RequestId == requestId);
            if (isExist == null) return false;

            _context.ServiceRequests.Remove(isExist);
            _context.SaveChanges();
            return true;
        }

        public User GetUser(string userName)
        {
            return _context.Users.FirstOrDefault(x => x.UserName == userName);
        }
    }
}
