using System.ComponentModel.DataAnnotations;

namespace backend.Models {
    public class Transaction
    {
        [Key]
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required decimal Amount { get; set; }
        public required TransactionCategory Category { get; set; }
        public required DateOnly Date { get; set; }
    }
}