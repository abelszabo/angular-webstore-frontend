import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

//   registerForm!: FormGroup;
//   ngOnInit(): void {
//       this.registerForm = this.fb.nonNullable.group({
//         email: ['', [Validators.required, Validators.email]],
//         username: ['', [Validators.required, Validators.minLength(3)]]
//       });
//   }

  successMessage: string | null = null;
  errorMessage: string | null = null;
  loading = false;

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit(): void {
    if (this.registerForm.invalid || this.loading) return;

    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

//     this.userService.register(this.registerForm.value as any)
    this.userService.register(this.registerForm.getRawValue())
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.successMessage = `User registered successfully. UUID: ${response.userUuid}`;
          this.registerForm.reset();
          //this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Registration failed';
          //this.loading = false;
        }
      });
  }
}
