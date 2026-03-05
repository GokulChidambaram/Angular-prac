import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  templateUrl: './employee-sidebar.html',
  styleUrls: ['./employee-sidebar.scss']
})
export class EmployeeSidebar {
  
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  goToMyAssets(): void {
    this.router.navigate(['/employee/dashboard']);
  }

  goToRequestAsset(): void {
    this.router.navigate(['/employee/request-form']);
  }

  goToMyRequests(): void {
    this.router.navigate(['/employee/my-requests']);
  }

  goToMyIssues(): void {
    this.router.navigate(['/employee/my-issues']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}