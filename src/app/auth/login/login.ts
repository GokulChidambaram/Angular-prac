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
        
        // 1. Save Token for API Authorization
        this.auth.saveToken(res.token);
        
        // 🌟 2. PERMANENT FIX: Save UserID to localStorage
        // This ensures the Employee Dashboard can report issues with a valid ID.
        localStorage.setItem('userId', res.user.userID.toString()); 
        
        // 3. Get role from response for routing
        const userRole = res.user.role; 
        console.log('USER ROLE:', userRole);

        // 4. Role-Based Routing Logic
        if (userRole === 'Admin') {
          this.router.navigate(['/admin/assets']);
        } 
        else if (userRole === 'Manager') {
          this.router.navigate(['/manager/assets']);
        } 
        else {
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