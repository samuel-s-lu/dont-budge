import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { AsyncPipe } from '@angular/common';
import { TransactionHistoryRowComponent } from '../transaction-history-row/transaction-history-row.component';
import { map } from 'rxjs';

@Component({
  selector: 'transaction-history',
  standalone: true,
  imports: [AsyncPipe, TransactionHistoryRowComponent],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit{
  constructor(private _transactionService: TransactionService) {}

  ngOnInit(): void {
    this._transactionService.setTransactions();
  }

  transactionHistory$ = this._transactionService.getTransactions().pipe(
    map(transactions => 
      transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    )
  );
}
