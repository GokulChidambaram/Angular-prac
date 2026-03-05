import { Routes } from '@angular/router';
import { EmployeeLayout } from './layout/employee-layout/employee-layout';

export const employeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'request-form',
        loadComponent: () => 
          import('./request-form/request-form').then(m => m.RequestForm)
      },
      {
        path: 'my-requests',
        loadComponent: () => 
          import('./my-requests/my-requests').then(m => m.MyRequests)
      },
      {
        path: 'my-issues',
        loadComponent: () => import('./my-issues/my-issues').then(m => m.MyIssues)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];