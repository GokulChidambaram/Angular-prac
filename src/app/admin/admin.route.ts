import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout';
export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [

      {
        path: 'assets',

        loadComponent: () =>

          import('./assets/asset-list/asset-list')

            .then(m => m.AssetListComponent)

      },

      {

        path: 'assets/add',

        loadComponent: () =>

          import('./assets/add-asset/add-asset')

            .then(m => m.AddAssetComponent)

      },

      {

        path: '',

        redirectTo: 'assets',

        pathMatch: 'full'

      }

    ]

  }

];
 