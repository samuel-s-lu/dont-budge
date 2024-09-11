import { TransactionCategory } from "./transaction-category.enum";

export interface Transaction {
    id: string;
    name: string;
    amount: number;
    category: TransactionCategory;
    date: string;
}