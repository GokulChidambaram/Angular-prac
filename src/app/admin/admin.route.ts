
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
      // --- CATEGORIES (ADD THESE NOW) ---
      {
        path: 'categories',
        loadComponent: () =>
          import('./categories/categories-list/categories-list').then(m => m.CategoryListComponent)
      },
      {
        path: 'categories/add',
        loadComponent: () =>
          import('./categories/add-categories/add-categories') // Folder/File name match
            .then(m => m.AddCategoriesComponent)
      },
      {
        path: 'categories/edit/:id',
        loadComponent: () =>
          import('./categories/categories-edit/categories-edit').then(m => m.CategoriesEditComponent)
      },
      { 
        path: 'users', loadComponent: () => 
          import('./users/user-list/user-list').then(m => m.UserListComponent) 
      },
      { 
        path: 'users/add', loadComponent: () =>
           import('./users/user-add/user-add').then(m => m.UserAddComponent)
       }, {
        path: 'users/edit/:id',
        loadComponent: () =>
          import('./users/user-edit/user-edit').then(m => m.UserEditComponent)
      },
      // --- ROLES MODULE ---
{ 
  path: 'roles', 
  loadComponent: () => 
    import('./roles/list-roles/list-roles').then(m => m.ListRolesComponent) 
},
{ 
        path: 'roles/add', 
        loadComponent: () =>
           import('./roles/add-roles/add-roles').then(m => m.AddRolesComponent) 
      },
    { 
  path: 'roles/edit/:id', 
  loadComponent: () => 
    import('./roles/edit-roles/edit-roles').then(m => m.EditRolesComponent) 
},
// --- REPORTS MODULE ---
{
  path: 'reports',
  loadComponent: () =>
    import('./reports/list-reports/list-reports').then(m => m.ListReportsComponent)
},
      {
        path: '',
        redirectTo: 'assets',
        pathMatch: 'full'
      }
    ]
  }
];