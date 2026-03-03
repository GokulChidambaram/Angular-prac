// import { Routes } from '@angular/router';
// import { AdminLayoutComponent } from './layout/admin-layout/admin-layout';
// export const adminRoutes: Routes = [
//   {
//     path: '',
//     component: AdminLayoutComponent,
//     children: [

//       {
//         path: 'assets',

//         loadComponent: () =>

//           import('./assets/asset-list/asset-list')

//             .then(m => m.AssetListComponent)

//       },

//       {

//         path: 'assets/add',

//         loadComponent: () =>

//           import('./assets/add-asset/add-asset')

//             .then(m => m.AddAssetComponent)

//       },

//       {

//         path: '',

//         redirectTo: 'assets',

//         pathMatch: 'full'

//       }

//     ]

//   }

// ];
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
      // 👇 ADD THIS SECTION FOR EDITING
      {
        path: 'assets/edit/:id',
        loadComponent: () =>
          import('./assets/asset-edit/asset-edit') // Ensure this path matches your file name
            .then(m => m.AssetEditComponent)
      },
      {
        path: '',
        redirectTo: 'assets',
        pathMatch: 'full'
      }
    ]
  }
];