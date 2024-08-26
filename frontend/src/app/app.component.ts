import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
