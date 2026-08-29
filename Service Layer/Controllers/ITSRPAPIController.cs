using Capstone.DAL.Model;
using Capstone.DAL.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Capstone.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ITSRPAPIController : ControllerBase
    {
        private readonly IRepository _services;
        public ITSRPAPIController(IRepository services)
        {
            _services = services;
        }

        [HttpGet("Authenticate")]
        public async Task<IActionResult> Authenticate(string userName, string Password)
        {
            if (ModelState.IsValid)
            {
                var res = _services.Authenticate(new User { UserName= userName, Password= Password });
                if (!res)
                {
                    return NotFound();
                }
                return Ok(res);
            }
            return BadRequest(ModelState);
        }


        [HttpGet("GetAllRequest")]
        public IActionResult GetAllRequest()
        {
            List<ServiceRequest> serviceRequests = _services.ViewRequest();
            if(serviceRequests == null || serviceRequests.Count() == 0)
            {
                return NotFound();
            }
            return Ok(serviceRequests);
        }

        [HttpGet("GetRequestByuserName")]
        public IActionResult GetRequestByUN(string userName)
        {
            List<ServiceRequest> serviceRequests = _services.ViewRequest(userName);
            if (serviceRequests == null || serviceRequests.Count() == 0)
            {
                return NotFound();
            }
            return Ok(serviceRequests);
        }

        [HttpPost("reopen")]
        public IActionResult ReOpenRequest(ServiceRequest request)
        {
            if (ModelState.IsValid)
            {
                var res = _services.ReOpenRequest(request);
                if (!res) return NotFound(); // Additional Step from my side

                return Ok(request);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("CreateNewSerRequest")]
        public IActionResult Post(ServiceRequest newRequest)
        {
            Console.WriteLine(newRequest);
            if (ModelState.IsValid)
            {
                var res = _services.RaiseRequest(newRequest);
                return CreatedAtAction(
                    nameof(GetRequestById),
                    new { reqId = res},
                    newRequest
                    );
            }
            return BadRequest(ModelState);
        }

        [HttpGet("GetRequestById")]
        public IActionResult GetRequestById(int reqId)
        {
            ServiceRequest req = _services.GetRequestById(reqId);
            if (req == null) return NotFound();
            return Ok(req);
        }

        [HttpGet("GetUser")]
        public IActionResult GetUser(string userName)
        {
            var user = _services.GetUser(userName);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet("CloseRequest")]
        public IActionResult CloseRequest(int id)
        {
            var res = _services.CloseRequest(id);
            if (!res) return NotFound();
            return Ok();
        }

        [HttpDelete("Delete")]
        public IActionResult Delete(int id)
        {
            var res = _services.DeleteRequest(id);
            if (!res) return NotFound();
            return Ok();
        }
    }
}
