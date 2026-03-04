import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-roles.html',
  styleUrls: ['./list-roles.scss']
})
export class ListRolesComponent implements OnInit {
  roles: any[] = [];
  private readonly API_URL = 'https://localhost:7274/api/roles'; 

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef // 1. Added Change Detection
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (res) => {
        console.log('Backend Data Arrived:', res);
        this.roles = res;
        this.cdr.detectChanges(); // 2. Force the UI to show the data immediately
      },
      error: (err) => {
        console.error('HTTP Error:', err);
      }
    });
  }

  editRole(id: number): void {
    this.router.navigate(['/roles/edit', id]);
  }

  deleteRole(id: number): void {
  // 1. Show a confirmation popup
  if (confirm('Are you sure you want to delete this role?')) {
    
    // 2. Get the token from localStorage
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    // 3. Call the backend DELETE endpoint
    this.http.delete(`${this.API_URL}/${id}`, { headers }).subscribe({
      next: () => {
        // 4. Remove the deleted role from the list without refreshing the whole page
        this.roles = this.roles.filter(r => r.roleID !== id);
        this.cdr.detectChanges(); 
        alert('Role deleted successfully');
      },
      error: (err) => {
        console.error('Delete failed:', err);
        // Handle unauthorized or foreign key errors
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          alert('Could not delete. Check if users are still assigned to this role.');
        }
      }
    });
  }
}
}