import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-roles.html',
  styleUrls: ['./add-roles.scss']
})
export class AddRolesComponent {
  roleName: string = '';
  isSubmitting: boolean = false;

  private readonly API_URL = 'https://localhost:7274/api/roles';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.roleName || !this.roleName.trim()) return;

    this.isSubmitting = true;
    const payload = { name: this.roleName };

    this.http.post(this.API_URL, payload).subscribe({
      next: () => {
        this.router.navigate(['admin/roles']);
      },
      error: (err) => {
        console.error('Save failed:', err);
        this.isSubmitting = false;
        alert('Failed to add role.');
      }
    });
  }

  // THIS WAS MISSING - ADD THIS NOW
  cancel() {
    this.router.navigate(['/roles']);
  }
}