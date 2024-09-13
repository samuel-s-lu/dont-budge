namespace backend.Models
{
    public enum TransactionCategory
    {
        Income,
        Education,
        Housing,
        Groceries,
        Entertainment,
        Family,
        Health,
        Miscellaneous,
        Savings
    }

    public static class EnumExtensions {
         public static TransactionCategory StrToEnum(string s) {
            // return (TransactionCategory)Enum.Parse(typeof(TransactionCategory), s, true);
            if (Enum.TryParse(s, true, out TransactionCategory result)) {
                return result;
            }
            throw new ArgumentException($"'{s}' is not a valid TransactionCategory");
        }
    }
}