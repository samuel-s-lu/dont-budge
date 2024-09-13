import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Budget } from '../models/budget.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private _ApiURL = "https://localhost:7194/api/Budget"
  private _budgets = new BehaviorSubject<Budget[]>([]);
  budgets$ = this._budgets.asObservable();

  constructor(private _http: HttpClient) {}

  getBudgets(): Observable<Budget[]> {
    return this.budgets$;
  }

  setBudgets(): void {
    this._http.get<Budget[]>(this._ApiURL).subscribe((budgets) => {
      this._budgets.next(budgets);
    });
  }

  postFormData(formData: any): Observable<Budget> {
    return this._http.post<Budget>(this._ApiURL, formData).pipe(
      tap(() => {
        this.setBudgets();
      })
    );
  }
}