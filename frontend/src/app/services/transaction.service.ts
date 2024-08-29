import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private _ApiURL = "https://localhost:7194/api/Transactions"

  constructor(private _http: HttpClient) {}

  postFormData(formData: any): Observable<any> {
    return this._http.post<any>(this._ApiURL, formData)
  }
}
