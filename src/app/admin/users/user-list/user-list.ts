import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  public users: any[] = [];

  constructor(
    private router: Router, 
    private userService: UserService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        // Spreading data to ensure Angular detects the change
        this.users = [...data]; 
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('Failed to load users. Ensure you are logged in as Admin.');
      }
    });
  }

  addUser(): void {
    this.router.navigate(['/admin/users/add']);
  }

  editUser(id: number): void {
    this.router.navigate(['/admin/users/edit', id]);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete/deactivate this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.loadUsers(); // Refresh the list
        },
        error: (err) => alert('Error deleting user')
      });
    }
  }
}