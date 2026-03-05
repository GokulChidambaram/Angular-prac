import { Routes } from '@angular/router';
import { adminGuard,employeeGuard,managerGuard } from './core/guards/auth-guard';
export const routes: Routes = [
  // 🔐 LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login')
        .then(m => m.LoginComponent)
  },
  // 📝 REGISTER
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register')
        .then(m => m.RegisterComponent)
  },
  // 🧑‍💼 ADMIN AREA (SIDEBAR + ASSETS)
  {
    path: 'admin',
    canActivate: [adminGuard], // 🔒 ADMIN ONLY
    loadChildren: () =>
      import('./admin/admin.route')
        .then(m => m.adminRoutes)
  },
  {
    path: 'employee',
    canActivate: [employeeGuard], // 👈 UNCOMMENT THIS LINE
    loadChildren: () =>
      import('./employee/employee.route')
        .then(m => m.employeeRoutes)
  },
  // 👨‍💼 MANAGER AREA
  {
    path: 'manager',
    canActivate: [managerGuard],
    loadChildren: () => import('./manager/manager.route').then(m => m.managerRoutes)
  },
  // 🔁 DEFAULT
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
//   {
//   path: 'employee',
//   // You might want to create an 'authGuard' that just checks if any user is logged in
//   // canActivate: [authGuard], 
//   loadChildren: () =>
//     import('./employee/employee.route')
//       .then(m => m.employeeRoutes)
// },
  //  FALLBACK
  {
    path: '**',
    redirectTo: 'login'
  }
];
 