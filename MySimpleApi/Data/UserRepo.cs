using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class UserRepo
    {
        private readonly MyDBContext context;

        public UserRepo() { }

        public UserRepo(MyDBContext context)
        {
            this.context = context;
        }

               /// <summary>
        /// Takes a username and returns true if the username is found in the Db.
        /// Otherwise returns false.
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public bool UserExists(string email)
        {
            //default is NULL
            if (context.Users.FirstOrDefault(p => p.Email == email) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// This method adds the verified new user to the Db and returns the User object from the Db
        /// </summary>
        /// <param name="newUser"></param>
        /// <returns></returns>
        public User Register(User newUser)
        {
            var newUser1 = context.Users.Add(newUser);// addd the new user to the Db
            context.SaveChanges();// save the change.
            return context.Users.FirstOrDefault(p => p.ID == newUser.ID);// default is null
        }

        /// <summary>
        /// This method takes a string of the username and returns the User object from the Db
        /// If no user is found, returns null.
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public User GetUserByEmail(string email)
        {
            User foundUser = context.Users.FirstOrDefault(p => p.Email == email);
            return foundUser;
        }

    }
}
