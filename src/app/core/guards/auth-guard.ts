// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth';

// // ----------------------------------------------------
// // 🛑 ADMIN GUARD: Protects the /admin routes
// // ----------------------------------------------------
// export const adminGuard = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   // 1. If they are logged in AND are an Admin, let them in.
//   if (auth.isLoggedIn() && auth.getRole() === 'Admin') {
//     return true;
//   }

//   // 2. Sneaky Employee check: If they are logged in but NOT an admin, 
//   // kick them back to their own dashboard.
//   if (auth.isLoggedIn() && auth.getRole() !== 'Admin') {
//     router.navigate(['/employee/dashboard']);
//     return false;
//   }

//   // 3. Not logged in at all? Kick them to the login page.
//   router.navigate(['/login']);
//   return false;
// };
// // 🛑 MANAGER GUARD (The missing piece!)
// // ----------------------------------------------------
// export const managerGuard = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   if (auth.isLoggedIn() && auth.getRole() === 'Manager') {
//     return true;
//   }

//   if (auth.isLoggedIn()) {
//     const role = auth.getRole();
//     role === 'Admin' ? router.navigate(['/admin']) : router.navigate(['/employee']);
//     return false;
//   }

//   router.navigate(['/login']);
//   return false;
// };

// // ----------------------------------------------------
// // 🛑 EMPLOYEE GUARD: Protects the /employee routes
// // ----------------------------------------------------
// export const employeeGuard = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   // 1. If they are logged in (as an Employee or Manager), let them in.
//   if (auth.isLoggedIn() && auth.getRole() !== 'Admin') {
//     return true;
//   }

//   // 2. If an Admin tries to go to the employee dashboard, 
//   // you can either let them in (return true) OR kick them to the admin dashboard. 
//   // Let's kick them to the admin dashboard to keep things separated.
//   if (auth.isLoggedIn() && auth.getRole() === 'Admin') {
//     router.navigate(['/admin']);
//     return false;
//   }

//   // 3. Not logged in at all? Kick them to the login page.
//   router.navigate(['/login']);
//   return false;
// };
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

// -------------------------------------------------------------------------
// 🛑 ADMIN GUARD: Protects the /admin routes
// -------------------------------------------------------------------------
export const adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. If they are logged in AND are an Admin, let them in.
  if (auth.isLoggedIn() && auth.getRole() === 'Admin') {
    return true;
  }

  // 2. Redirect check: If logged in but NOT an Admin, send them to their 
  // respective dashboard instead of showing a blank page.
  if (auth.isLoggedIn()) {
    const role = auth.getRole();
    role === 'Manager' ? router.navigate(['/manager']) : router.navigate(['/employee']);
    return false;
  }

  // 3. Not logged in at all? Kick them to the login page.
  router.navigate(['/login']);
  return false;
};

// -------------------------------------------------------------------------
// 🛑 MANAGER GUARD: Protects the /manager routes
// -------------------------------------------------------------------------
export const managerGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. If they are logged in AND are a Manager, let them in.
  if (auth.isLoggedIn() && auth.getRole() === 'Manager') {
    return true;
  }

  // 2. Redirect check: If logged in but NOT a Manager, send them to the 
  // right area based on their actual role.
  if (auth.isLoggedIn()) {
    const role = auth.getRole();
    role === 'Admin' ? router.navigate(['/admin']) : router.navigate(['/employee']);
    return false;
  }

  // 3. Not logged in at all? Kick them to the login page.
  router.navigate(['/login']);
  return false;
};

// -------------------------------------------------------------------------
// 🛑 EMPLOYEE GUARD: Protects the /employee routes
// -------------------------------------------------------------------------
export const employeeGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. Strict Role Check: Only allow 'Employee' role here.
  // This prevents Managers from accidentally loading Employee views.
  if (auth.isLoggedIn() && auth.getRole() === 'Employee') {
    return true;
  }

  // 2. Redirect check: If an Admin or Manager tries to access /employee,
  // redirect them back to their authorized portals.
  if (auth.isLoggedIn()) {
    const role = auth.getRole();
    role === 'Admin' ? router.navigate(['/admin']) : router.navigate(['/manager']);
    return false;
  }

  // 3. Not logged in at all? Kick them to the login page.
  router.navigate(['/login']);
  return false;
};