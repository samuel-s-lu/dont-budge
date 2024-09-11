import { TransactionCategory } from "./transaction-category.enum";

export interface TransactionForm {
    name: string;
    amount: number;
    category: TransactionCategory;
    date: string;
}