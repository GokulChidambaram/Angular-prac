// Location: src/app/modules/manager/manager.routes.ts

import { Routes } from '@angular/router';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout';
import { ManagerAssetListComponent } from './assets/asset-list/asset-list';
import { ManageRequests } from './manage-requests/manage-requests';
import { ManagerUsersListComponent } from './users/users-list/users-list';
// Import the new component
import { IssueListComponent } from './issue-list/issue-list';

export const managerRoutes: Routes = [
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      {
        path: 'assets',
        component: ManagerAssetListComponent
      },
      {
        path: 'requests',
        component: ManageRequests
      },
      {
        path: 'users',
        component: ManagerUsersListComponent
      },
      {
        path: 'issues', // New Route
        component: IssueListComponent
      },
      {
        path: '',
        redirectTo: 'assets',
        pathMatch: 'full'
      }
    ]
  }
];