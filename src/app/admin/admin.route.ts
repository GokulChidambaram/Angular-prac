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

// // ];
//  import { Routes } from '@angular/router';
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
//       // 👇 ADD THIS SECTION FOR EDITING
//       {
//         path: 'assets/edit/:id',
//         loadComponent: () =>
//           import('./assets/asset-edit/asset-edit') // Ensure this path matches your file name
//             .then(m => m.AssetEditComponent)
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
      // --- Assets Module ---
      {
        path: 'assets',
        loadComponent: () =>
          import('./assets/asset-list/asset-list').then(m => m.AssetListComponent)
      },
      {
        path: 'assets/add',
        loadComponent: () =>
          import('./assets/add-asset/add-asset').then(m => m.AddAssetComponent)
      },
      {
        path: 'assets/edit/:id',
        loadComponent: () =>
          import('./assets/asset-edit/asset-edit').then(m => m.AssetEditComponent)
      },

      // --- 👇 NEW: Users Module Section ---
      {
        path: 'users',
        loadComponent: () =>
          import('./users/user-list/user-list').then(m => m.UserListComponent)
      },
      {
        path: 'users/add',
        loadComponent: () =>
          import('./users/user-add/user-add').then(m => m.UserAddComponent)
      },
      {
        path: 'users/edit/:id',
        loadComponent: () =>
          import('./users/user-edit/user-edit').then(m => m.UserEditComponent)
      },

      // --- Default Redirect ---
      {
        path: '',
        redirectTo: 'assets',
        pathMatch: 'full'
      }
    ]
  }
];