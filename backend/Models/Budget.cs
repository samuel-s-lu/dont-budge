using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Budget
    {
        [Key]
        public required int Income { get; set; }
        public required int Education { get; set; }
        public required int Housing { get; set; }
        public required int Groceries { get; set; }
        public required int Entertainment { get; set; }
        public required int Family { get; set; }
        public required int Health { get; set; }
        public required int Miscellaneous { get; set; }
    }
}