import { Routes } from '@angular/router';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout';
import { ManagerAssetListComponent } from './assets/asset-list/asset-list';
import { ManageRequests } from './manage-requests/manage-requests';
import { ManagerUsersListComponent } from './users/users-list/users-list';
 
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
        path: '',
        redirectTo: 'assets',
        pathMatch: 'full'
      }
    ]
  }
];
 