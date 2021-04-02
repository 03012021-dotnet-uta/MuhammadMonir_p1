using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Models;
using Business;

namespace MySimpleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private UserBusiness userBusiness;
        public UsersController(UserBusiness userBusiness)
        {
            this.userBusiness = userBusiness;
        }

        // GET: api/Users

        [HttpPost("register")]
        public ActionResult<User> Register([FromBody] RawUser rawperson)
        {
            User user = new User();
            if (!ModelState.IsValid)// did the conversion from JS to C# work?
            {
                // return StatusCode(409, $"User '{rawUser.UserName}' already exists.");
                return StatusCode(400, "That was a failue of modelbinding");
            }
            else
            {
                // here you will use the bussiness logic layer instance to pass the data to that layer and eventually save it to the Db.
                //Console.WriteLine($"{rawperson.Fname}, {rawperson.Lname}");
                user = userBusiness.Register(rawperson);
            }

            //check if person is null!!!
            if (user == null)
            {
                return StatusCode(409, "We're sorry, your new user was not successfully saved or a user of that username already exists.");
            }
            return user;
        }

        // THIS IS AN ACTION METHOD
        // GET: api/<MemeController>
        [HttpGet("login/{username}/{password}")]
        public ActionResult<User> Login(string username, string password)
        {
            
            //here we will do mich the same as in the register.....
            User person = new User();
            if (!ModelState.IsValid)// did the conversion from JS to C# work?
            {
                // return StatusCode(409, $"User '{rawUser.UserName}' already exists.");
                return StatusCode(400, "That was a failue of modelbinding");
            }
            else
            {
                // here you will use the bussiness logic layer instance to pass the data to that layer and eventually save it to the Db.
                //Console.WriteLine($"{rawperson.Fname}, {rawperson.Lname}");
                person = userBusiness.Login(username, password);
            }

            //check if person is null!!!
            if (person == null)
            {
                return StatusCode(409, "We're sorry, your username was not found.");
            }
            return person;
        }

      
    }
}
