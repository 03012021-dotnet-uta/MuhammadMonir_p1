using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Stocks
    {
        public int ID { get; set; }
        public string  Receipt { get; set; }
        public int StoreID { get; set; }
        public Store Store { get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; }

        public float QtyAdded { get; set; }
        public float Price { get; set; }
    }
}
