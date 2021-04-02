using Business;
using Data;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests
{
    public class DomainTests
    {
        DbContextOptions<MyDBContext> testOptions = new DbContextOptionsBuilder<MyDBContext>()
          .UseInMemoryDatabase(databaseName: "inMemoryDb")
          .Options;


        [Fact]
        public void UserClasTest()
        {
            User user = new() { FName = "first" };
            var expected = "first";

            var actual = user.FName;


            Assert.Equal(expected, actual);

           
        }

        [Fact]
        public void AddsANewUserToTheDb()
        {
            // ARRANGE - create the data to insert into the Db
            //create the new User seed
            User testUser = new User()
            {
                FName = "User 1",
                LName = "User",
                Email = "user1",
            };
            using (HMACSHA512 hmac = new HMACSHA512())
            {
                testUser.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("testPassword"));//this returns a byte[] representing the password
                testUser.PasswordSalt = hmac.Key;     // this assigns the randomly generated Key (comes with the HMAC instance) to the salt variable of the user instance,
            }
            User resultUser1 = new User();//to store the return from memeSaverRepo.Register()
            User resultUser2 = new User();//to store the return from memeSaverRepo.Register()

            using (var context1 = new MyDBContext(testOptions))
            {
                context1.Database.EnsureDeleted();//do this ONCE at hte beginning of each test
                context1.Database.EnsureCreated();// this creates the new-for-this-test database

                //create the UserRepo instance
                UserRepo msr = new UserRepo(context1);
                resultUser1 = msr.Register(testUser);
                context1.SaveChanges();
            }

            // ACT - call the method that inserts into the Db
            using (var context2 = new MyDBContext(testOptions))
            {
                context2.Database.EnsureCreated();
                resultUser2 = context2.Users.Where(x => x.PasswordHash == testUser.PasswordHash).FirstOrDefault();
            }

            // ASSERT - verify the the data state is as expected
            Assert.Equal(resultUser1.FName, resultUser2.FName);
        }



        [Fact]
        public void LoginReturnsTheUser()
        {
            // // Arrange
            var context1 = new MyDBContext(testOptions);
            var repoClass = new UserRepo(context1);//create a repo class.

             var businesClass = new UserBusiness(repoClass);// this class uses the repos class methods so it needs tso be created with the repo class injected.

            string username = "abc";
            string password = "cde";

            // // Act
           User actual = businesClass.Login(username, password);
            //Expected
            string expected = "abc";
            Console.WriteLine(actual.Email);
            // // Assert - you can assert as many times as you want but it only counts as one test.
            Assert.Equal(expected, actual.Email);
  
        }
    }
}

