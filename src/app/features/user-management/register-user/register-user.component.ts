import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
//import { HttpClient } from '@angular/common/http';
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

  // signals
  submitting = signal(false); //loading = false;
  successMessage = signal<string | null>(null); //successMessage: string | null = null;
  errorMessage = signal<string | null>(null); //errorMessage: string | null = null;

  // form
  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]]
  });

  // computed state
  submitDisabled = computed(() => {
    console.log("submitting: " + this.submitting() + ", invalid form: " +  this.registerForm.invalid);
    return this.submitting() || this.registerForm.invalid;
  });

  // debug effect
  private logEffect = effect(() => {
    console.log("Registration submitting:", this.submitting());
  });

  onSubmit(): void {
    //if (this.registerForm.invalid || this.submitting()) return;
    if (this.submitDisabled()) return;

    this.submitting.set(true); //this.loading = true;
    this.successMessage.set(null); //this.successMessage = null;
    this.errorMessage.set(null); //this.errorMessage = null;

//     this.userService.register(this.registerForm.value as any)
    this.userService.register(this.registerForm.getRawValue())
      //.pipe(finalize(() => this.loading = false))
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (response) => {
          this.successMessage.set(`User registered successfully. UUID: ${response.userUuid}`);
          this.registerForm.reset();
          //this.loading = false;
        },
        error: (err) => {
          console.log("ERROR: " + err);
          //this.errorMessage.set(err.message);
          this.errorMessage.set(err?.message || err?.error?.message || err?.error?.errorMessage || 'Registration failed');
          //this.loading = false;
        }
      });
  }
}
