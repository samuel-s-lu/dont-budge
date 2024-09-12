import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { TransactionForm } from '../models/transaction-form.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private _ApiURL = "https://localhost:7194/api/Transactions"
  private _transactions = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this._transactions.asObservable();

  constructor(private _http: HttpClient) {
    this.setTransactions;
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$;
  }

  setTransactions(): void {
    this._http.get<Transaction[]>(this._ApiURL).subscribe((transactions) => {
      this._transactions.next(transactions);
    });
  }

  postFormData(formData: any): Observable<TransactionForm> {
    return this._http.post<TransactionForm>(this._ApiURL, formData).pipe(
      tap(() => {
        this.setTransactions();
      })
    );
  }

  deleteTransaction(id: string): Observable<any> {
    return this._http.delete(`${this._ApiURL}/${id}`).pipe(
      tap(() => {
        this.setTransactions();
      })
    );
  }
}
