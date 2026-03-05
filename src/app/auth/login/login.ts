import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE:', res);
        
        // 1. Save credentials to localStorage via AuthService
        this.auth.saveToken(res.token);
        
        // 2. We use the role directly from the API response for the first redirect
        const userRole = res.user.role; 
        console.log('USER ROLE:', userRole);

        // 3. Role-Based Routing Logic
        if (userRole === 'Admin') {
          console.log('Routing to ADMIN AREA');
          this.router.navigate(['/admin/assets']);
        } else {
          // Now routing properly to your new Employee Portal!
          console.log('Routing to EMPLOYEE DASHBOARD');
          this.router.navigate(['/employee/dashboard']);
        }
      },
      error: (err) => {
        console.error('Login Error:', err);
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}