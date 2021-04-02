using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public enum OrderStatus
    { Delivered = 1, Received, InProgress, Cancelled }

    public class Order
    {
        public Order()
        {
            List<OrderDetail> OrderDetails = new List<OrderDetail>(); 
        }
        public int ID { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
        public int StoreID { get; set; }
        public Store Store { get; set; }
        public float StoreAmount { get; set; }
        public float TaxAmount { get; set; }
        public OrderStatus? OrderStatus { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }
    }
}
