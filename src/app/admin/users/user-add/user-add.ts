import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user'; 
import { RoleService } from '../../../core/services/role'; 

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-add.html',
  styleUrls: ['./user-add.scss']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    public router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleID: [null, Validators.required], // This matches the [value] in HTML
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // ✅ Properly fetching roles from RoleService
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => console.error('Could not load roles', err)
    });
  }

  save(): void {
    if (this.userForm.invalid) return;
    this.userService.createUser(this.userForm.value).subscribe({
      next: () => {
        alert('User created successfully');
        this.router.navigate(['/admin/users']);
      },
      error: (err) => alert(err.error?.message || 'Failed to create user')
    });
  }
}