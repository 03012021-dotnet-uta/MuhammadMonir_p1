using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public enum Roles { Admin =1, Customer = 2}
    public class User : Address
    {
        public int ID { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        [Required]
        public string Email { get; set; }
        public string PhNumber { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public Roles Role { get; set; }
    }
}
