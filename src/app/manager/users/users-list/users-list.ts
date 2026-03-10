import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user';
 
@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss'],
  imports: [CommonModule]
})
export class ManagerUsersListComponent implements OnInit {
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
        alert('Failed to load users.');
      }
    });
  }
 
}
