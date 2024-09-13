import { Component, OnInit } from '@angular/core';
import { TransactionCategory } from '../models/transaction-category.enum';
import { Budget } from '../models/budget.model';
import { BudgetService } from '../services/budget.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'budget',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit {
  categories = Object.values(TransactionCategory);
  isEditing: boolean = false;
  budgets$ = this._budgetService.getBudgets();
  _budgets: null | Budget = null;
  budgetForm: FormGroup = new FormGroup({});

  constructor(private _budgetService: BudgetService) {}

  ngOnInit(): void {
    this._budgetService.setBudgets();

    this.budgets$.subscribe((budgets) => {
      this._budgets = budgets[0];
      console.log(this._budgets);
      this.budgetForm = new FormGroup({
        income: new FormControl<number>(this._budgets?.income ?? 0, Validators.required),
        education: new FormControl<number>(this._budgets?.education ?? 0, Validators.required),
        housing: new FormControl<number>(this._budgets?.housing ?? 0, Validators.required),
        groceries: new FormControl<number>(this._budgets?.groceries ?? 0, Validators.required),
        entertainment: new FormControl<number>(this._budgets?.entertainment ?? 0, Validators.required),
        family: new FormControl<number>(this._budgets?.family ?? 0, Validators.required),
        health: new FormControl<number>(this._budgets?.health ?? 0, Validators.required),
        miscellaneous: new FormControl<number>(this._budgets?.miscellaneous ?? 0, Validators.required)
      });
    });
  }

  onEditButtonClick(): void {
    this.isEditing = true;
  }

  onReturnButtonClick(): void {
    this.isEditing = false;
    this.budgetForm.reset({
      income: this._budgets?.income,
      education: this._budgets?.education,
      housing: this._budgets?.housing,
      groceries: this._budgets?.groceries,
      entertainment: this._budgets?.entertainment,
      family: this._budgets?.family,
      health: this._budgets?.health,
      miscellaneous: this._budgets?.miscellaneous
    });
  }

  onFormSubmit(): void {
    if (this.budgetForm.valid) {
      this._budgetService.postFormData(this.budgetForm.value).subscribe({
        next: (response) => {
          console.log("Successfully posted form data!", response)
        },
        error: (error) => console.error("Failed to post form", error)
      });
      this._budgetService.setBudgets();
      this.isEditing = false;
    }
  }
}
