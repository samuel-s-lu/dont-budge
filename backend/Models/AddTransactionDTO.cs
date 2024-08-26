namespace backend.Models
{
    public class AddTransactionDTO
    {
        public required string Name { get; set; }
        public required decimal Amount { get; set; }
        public required string Category { get; set; }
        public required int Year { get; set; }
        public required int Month { get; set; }
        public required int Day { get; set; }
    }
}