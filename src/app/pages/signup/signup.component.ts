import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SignUpComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loading = signal<boolean>(false);

  ngOnInit() {
    if (this.authService.getUser()) {
      this.router.navigate(['/home']);
    }
  }

  signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    role: ['user', [Validators.required]],
  });

  errorMessage = signal<string | null>(null);

  signUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password, confirmPassword, role } =
      this.signUpForm.value;

    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }
    this.loading.set(true);
    this.authService
      .signup({ name, email, password, confirmPassword, role })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message || 'Sign-up failed'),
            this.loading.set(false);
        },
      });
  }
}
