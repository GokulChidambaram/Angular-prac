import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [ReactiveFormsModule],

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

    // ✅ Form initialized inside constructor (no fb error)

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

        // ✅ Save token + role

        this.auth.saveToken(res.token);

        console.log('ROLE FROM STORAGE:', this.auth.getRole());

        // ✅ ROLE-BASED ROUTING

        if (this.auth.isAdmin()) {

          console.log('Routing to ADMIN ASSETS');

          this.router.navigate(['/admin/assets']);

        } else {

          console.log('Routing to LOGIN (non-admin)');

          this.router.navigate(['/login']); // change later for employee dashboard

        }

      },

      error: () => {

        alert('Invalid credentials');

      }

    });

  }

}
 