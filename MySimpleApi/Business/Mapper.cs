using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    class Mapper
    {
        public User GetANewUserWithHashedPassword(string passwordString)
        {
            using (var hmac = new HMACSHA512())
            {
                User user = new()
                {
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordString)),//this returns a byte[] representing the password
                    PasswordSalt = hmac.Key     // this assigns the randomly generated Key (comes with the HMAC instance) to the salt variable of the user instance,
                };
                return user;
            }
        }

        public byte[] HashTheUsername(string password, byte[] key)
        {
            using HMACSHA512 hmac = new HMACSHA512(key: key);

            var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return hashedPassword;
        }
    }
}
