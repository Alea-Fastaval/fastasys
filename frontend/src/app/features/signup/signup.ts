import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {
  private readonly http = inject(HttpClient);

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
  };

  submitted = signal(false);

  public submitSignup(): void {
    if (!this.formData.email) return;

    this.http
      .post('/api/signup/submit', {
        email: this.formData.email,
        formDataJson: JSON.stringify(this.formData),
      })
      .subscribe(() => {
        this.submitted.set(true);
      });
  }
}
