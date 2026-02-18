import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {

  private apiUrl = 'http://localhost:8080/api/user/register';

  // registerForm = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   username: ['', [Validators.required, Validators.minLength(3)]]
  // });

  registerForm;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    // TODO private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.successMessage = null;
    this.errorMessage = null;

    this.http.post<{ userUuid: string }>(
      this.apiUrl,
      this.registerForm.value
    ).subscribe({
      next: (response) => {
        this.successMessage = `User registered successfully. UUID: ${response.userUuid}`;
        this.registerForm.reset();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Registration failed';
      }
    });
  }
}
