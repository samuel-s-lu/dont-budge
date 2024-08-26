import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionCategory } from '../models/transaction-category.enum';

@Component({
  selector: 'transaction-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {

  transactionCategories = Object.values(TransactionCategory);

  transactionFrom = new FormGroup({
    name: new FormControl<string>(''),
    amount: new FormControl<Number | null>(null),
    category: new FormControl<string>(''),
    date: new FormControl<Date>(new Date())
  });

  onFormSubmit() {
    console.log(this.transactionFrom.value);
    this.transactionFrom.reset();
  }
}
