import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TransactionCategory } from '../models/transaction-category.enum';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'transaction-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
  providers: [TransactionService]
})
export class TransactionFormComponent {
  constructor(private _transactionService: TransactionService) {}

  transactionCategories = Object.values(TransactionCategory);

  categoryValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value != '' && !this.transactionCategories.includes(control.value)) {
      return { invalidCategory: true };
    }
    return null;
  }

  transactionForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    amount: new FormControl<number | null>(null, Validators.required),
    category: new FormControl<string>('', [Validators.required, this.categoryValidator]),
    date: new FormControl<Date | null>(null, Validators.required)
  });

  onFormSubmit() {
    this._transactionService.postFormData(this.transactionForm.value).subscribe({
      next: (response) => console.log("Successfully posted form data!", response),
      error: (error) => console.error("Failed to post form", error)
    });
    this.transactionForm.reset();
  }
}
