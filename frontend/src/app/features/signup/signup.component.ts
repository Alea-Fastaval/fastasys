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
  standalone: true,
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
  template: `
    <div class="page-container">
      <mat-card class="signup-card">
        <mat-card-header>
          <mat-card-title>Fastaval Convention Signup</mat-card-title>
          <mat-card-subtitle>Complete your registration for Fastaval</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          @if (submitted()) {
            <div class="success-box">
              <mat-icon color="primary" class="big-icon">check_circle</mat-icon>
              <h2>Signup Request Received!</h2>
              <p>
                Please check your email <strong>{{ formData.email }}</strong> to confirm your registration.
              </p>
            </div>
          } @else {
            <mat-stepper #stepper linear>
              <mat-step label="Personal Information">
                <form class="step-form">
                  <mat-form-field appearance="outline">
                    <mat-label>First Name</mat-label>
                    <input matInput [(ngModel)]="formData.firstName" name="firstName" required />
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Last Name</mat-label>
                    <input matInput [(ngModel)]="formData.lastName" name="lastName" required />
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Email Address</mat-label>
                    <input matInput type="email" [(ngModel)]="formData.email" name="email" required />
                  </mat-form-field>

                  <div>
                    <button mat-raised-button color="primary" matStepperNext type="button">Next</button>
                  </div>
                </form>
              </mat-step>

              <mat-step label="Contact & Preferences">
                <form class="step-form">
                  <mat-form-field appearance="outline">
                    <mat-label>Phone Number</mat-label>
                    <input matInput [(ngModel)]="formData.phone" name="phone" />
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>City / Country</mat-label>
                    <input matInput [(ngModel)]="formData.city" name="city" />
                  </mat-form-field>

                  <div class="stepper-actions">
                    <button mat-button matStepperPrevious type="button">Back</button>
                    <button mat-raised-button color="primary" (click)="submitSignup()" type="button">
                      Submit Signup
                    </button>
                  </div>
                </form>
              </mat-step>
            </mat-stepper>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .page-container {
        padding: 2rem;
        max-width: 700px;
        margin: 0 auto;
      }
      .signup-card {
        padding: 1.5rem;
        border-radius: 16px;
      }
      .step-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
      }
      .stepper-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }
      .success-box {
        text-align: center;
        padding: 2rem;
      }
      .big-icon {
        font-size: 4rem;
        width: 4rem;
        height: 4rem;
        margin-bottom: 1rem;
      }
    `,
  ],
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
