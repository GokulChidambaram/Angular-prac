import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { RoleService } from '../../core/services/role';
@Component({
 selector: 'app-register',
 imports: [CommonModule, ReactiveFormsModule],
 templateUrl: './register.html',
 styleUrls: ['./register.scss']
})
export class RegisterComponent {
 registerForm!: FormGroup;
 roles: any[] = [];
 constructor(
   private fb: FormBuilder,
   private auth: AuthService,
   private roleService: RoleService
 ) {
   // ✅ Form initialized safely
   this.registerForm = this.fb.group({
     name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     password: ['', Validators.required],
     roleID: [null, Validators.required],
     department: ['']
   });
   this.roleService.getRoles().subscribe(r => this.roles = r);
 }
 submit(): void {
   if (this.registerForm.invalid) return;
   this.auth.register(this.registerForm.value).subscribe({
     next: () => alert('User registered'),
     error: err => alert(err.error?.message || 'Registration failed')
   });
 }
}