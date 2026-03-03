import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user';
import { RoleService } from '../../../core/services/role';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrls: ['./user-edit.scss']
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  userId!: number;
  roles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roleID: [null, Validators.required],
      department: ['', Validators.required],
      status: [0, Validators.required] 
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = Number(idParam);

    // ✅ Load Roles from Service for the dropdown
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
        // Fetch user data ONLY after roles are loaded to ensure dropdown matches correctly
        this.fetchUserDetails();
      },
      error: (err) => console.error('Error fetching roles', err)
    });
  }

  fetchUserDetails(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.editForm.patchValue({
            name: user.name,
            email: user.email,
            roleID: user.roleID,
            department: user.department,
            status: user.status
          });
        },
        error: (err) => alert('User not found')
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.userService.updateUser(this.userId, this.editForm.value).subscribe({
        next: () => {
          alert('User updated successfully!');
          this.router.navigate(['/admin/users']);
        },
        error: (err) => alert('Update failed')
      });
    }
  }
}