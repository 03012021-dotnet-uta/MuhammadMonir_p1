using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class OrderDetail
    {
        public int ID { get; set; }
       // public int OrderID { get; set; }
       // public Order Order { get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; }
        //dont need store here
        public int Quantity { get; set; }
        public float Price { get; set; }
        
    }
}
