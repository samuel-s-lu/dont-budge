import { Component, Input } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'transaction-history-row',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transaction-history-row.component.html',
  styleUrl: './transaction-history-row.component.css'
})
export class TransactionHistoryRowComponent {
  @Input() transaction!: Transaction;
}
