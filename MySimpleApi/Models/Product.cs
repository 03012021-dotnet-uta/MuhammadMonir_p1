using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Product
    {
        public int ID { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public string  Description { get; set; }
        public int StoreID { get; set; }
        public float ListPrice { get; set; }        

    }
}
