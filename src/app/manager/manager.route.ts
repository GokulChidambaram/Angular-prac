import { Routes } from '@angular/router';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout';
// Import the NEW name
import { ManagerAssetListComponent } from './assets/asset-list/asset-list'; 

export const managerRoutes: Routes = [
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      {
        path: 'assets',
        component: ManagerAssetListComponent // ✅ Use the unique name here
      },
      {
        path: '',
        redirectTo: 'assets',
        pathMatch: 'full'
      }
    ]
  }
];