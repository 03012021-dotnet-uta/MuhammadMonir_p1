using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MySimpleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "I Love Programming";
        }
        [HttpPost]
        public string Post([FromBody] string incoming)
        {
            if (incoming == "user123")
                return "successfully Logged In";
            else
                return "Access Denied";
        }

    }
}
