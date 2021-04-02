using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Store : Address
    {
        public int ID { get; set; }
        public string ImageUrl { get; set; }
        public string SName { get; set; }
        public string Email { get; set; }
        public string PhNumber { get; set; }
    }
}
