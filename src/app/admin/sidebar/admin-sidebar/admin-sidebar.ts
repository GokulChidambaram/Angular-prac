import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';;
@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.scss']
})
export class AdminSidebarComponent {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}
  goToAssets(): void {
    this.router.navigate(['/admin/assets']);
  }
  goToCategories(): void {
    this.router.navigate(['/admin/categories']);
  }

  goToUsers(): void {
    this.router.navigate(['/admin/users']);
  }
  goToRoles(): void {
  this.router.navigate(['/admin/roles']);
  }
  // --- ADD THIS METHOD ---
  goToReports(): void {
    this.router.navigate(['/admin/reports']); 
    // Note: If your admin routes are prefixed, use ['/admin/reports']
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}