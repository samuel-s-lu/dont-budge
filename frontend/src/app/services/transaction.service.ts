import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private _http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$;
  }

  setTransactions(year?: number, month?: number, category?: string): void {
    let params = new HttpParams();
    if (year) params.set('year', year.toString());
    if (month) params.set('month', month.toString());
    if (category) params.set('category', category);

    this._http.get<Transaction[]>(this._ApiURL, { params }).subscribe((transactions) => {
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
