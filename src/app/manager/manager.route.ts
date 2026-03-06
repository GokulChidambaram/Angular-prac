import { Routes } from '@angular/router';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout';
// Import the NEW name
import { ManagerAssetListComponent } from './assets/asset-list/asset-list'; 
import { ManageRequests } from './manage-requests/manage-requests';

export const managerRoutes: Routes = [
  // {
  //   path: '',
  //   component: ManagerLayoutComponent,
  //   children: [
  //     {
  //       path: 'assets',
  //       component: ManagerAssetListComponent // ✅ Use the unique name here
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'assets',
  //       pathMatch: 'full'
  //     }
  //   ]
  // }

  {
    path: '',
    component: ManagerLayoutComponent, // Your layout with the sidebar
    children: [
      { path: 'assets', component: ManagerAssetListComponent },
      { path: 'requests', component: ManageRequests }, // 👈 Add this line
      { path: '', redirectTo: 'assets', pathMatch: 'full' }
    ]
  }
];