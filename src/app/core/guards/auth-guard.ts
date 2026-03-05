import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

// ----------------------------------------------------
// 🛑 ADMIN GUARD: Protects the /admin routes
// ----------------------------------------------------
export const adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. If they are logged in AND are an Admin, let them in.
  if (auth.isLoggedIn() && auth.getRole() === 'Admin') {
    return true;
  }

  // 2. Sneaky Employee check: If they are logged in but NOT an admin, 
  // kick them back to their own dashboard.
  if (auth.isLoggedIn() && auth.getRole() !== 'Admin') {
    router.navigate(['/employee/dashboard']);
    return false;
  }

  // 3. Not logged in at all? Kick them to the login page.
  router.navigate(['/login']);
  return false;
};

// ----------------------------------------------------
// 🛑 EMPLOYEE GUARD: Protects the /employee routes
// ----------------------------------------------------
export const employeeGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. If they are logged in (as an Employee or Manager), let them in.
  if (auth.isLoggedIn() && auth.getRole() !== 'Admin') {
    return true;
  }

  // 2. If an Admin tries to go to the employee dashboard, 
  // you can either let them in (return true) OR kick them to the admin dashboard. 
  // Let's kick them to the admin dashboard to keep things separated.
  if (auth.isLoggedIn() && auth.getRole() === 'Admin') {
    router.navigate(['/admin']);
    return false;
  }

  // 3. Not logged in at all? Kick them to the login page.
  router.navigate(['/login']);
  return false;
};