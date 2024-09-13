import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { TransactionHistoryComponent } from "./transaction-history/transaction-history.component";
import { BudgetComponent } from './budget/budget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionFormComponent, TransactionHistoryComponent, BudgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
