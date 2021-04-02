using Data;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class UserBusiness
    {
        private readonly UserRepo context;
        private readonly Mapper mapper = new Mapper();
        public UserBusiness() {  } // for test purposes

        public UserBusiness(UserRepo context)
        {
            this.context = context;
        }

        public User Register(RawUser rawUser)
        {
            if (context.UserExists(rawUser.email) == true)
            {
                return null;
            }
            else
            {
                //convert this rawuser to a User
                // send in the submitted password and get back a User obj with the hashed password and key for it.
                User newUser = mapper.GetANewUserWithHashedPassword(rawUser.password);

                //transfer in the supplied data
                newUser.FName = rawUser.fname;
                newUser.LName = rawUser.lname;
                newUser.Email = rawUser.email;
                User registeredUser = context.Register(newUser);//call a method on the repo layer to save the new user to the DB.
                return registeredUser;
            }
        }

        public User Login(string username, string password)
        {
            if (context.UserExists(username) == false)
            {
                return null;
            }
            else
            {
                //get the matching user with this Username
                User foundUser = context.GetUserByEmail(username);

                // hash the provided password with the key from the found user
                byte[] hash = mapper.HashTheUsername(password, foundUser.PasswordSalt);

                // compare the 2 hashes with a external method
                // if the 2 hashes match return the found user.
                if (CompareTwoHashes(foundUser.PasswordHash, hash))
                {
                    return foundUser;
                }
                else return null;
            }
        }

        private bool CompareTwoHashes(byte[] arr1, byte[] arr2)
        {
            if (arr1.Length != arr2.Length)
            {
                return false;
            }
            //compare the hash of the inputted password and the found user
            for (int i = 0; i < arr1.Length; i++)
            {
                if (arr1[i] != arr2[i])
                {
                    return false;
                } // Unauthorized("Invalid Password");
            }
            return true;
        }


    }
}
