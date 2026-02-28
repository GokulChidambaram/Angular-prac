import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth';

@Component({

  selector: 'app-admin-dashboard',

  standalone: true,

  templateUrl: './admin-dashboard.html',

  styleUrls: ['./admin-dashboard.scss']

})

export class AdminDashboardComponent {

  assetCount = 11;

  assetRequestCount = 7;

  issueCount = 7;

  employeeCount = 5;

  constructor(

    private auth: AuthService,

    private router: Router

  ) {}

  logout(): void {

    this.auth.logout();

    this.router.navigate(['/login']);

  }

}
 
