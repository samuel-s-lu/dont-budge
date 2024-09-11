import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'transaction-history',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit{
  constructor(private _transactionService: TransactionService) {}

  ngOnInit(): void {
    this._transactionService.setTransactions();
  }

  transactionHistory$ = this._transactionService.getTransactions();
}
