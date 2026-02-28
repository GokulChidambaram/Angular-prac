import { inject } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth';

export const adminGuard = () => {

   const auth = inject(AuthService);

   const router = inject(Router);
   console.log('AdminGuard → loggedIn:', auth.isLoggedIn(), 'role:', auth.getRole());console.log('AdminGuard → loggedIn:', auth.isLoggedIn(), 'role:', auth.getRole());
  if (auth.isLoggedIn() && auth.isAdmin()) {

    return true;

  }

  router.navigate(['/login']);

  return false;

};

export const employeeGuard = () => {

  const auth = inject(AuthService);

  const router = inject(Router);

  if (auth.isLoggedIn() && !auth.isAdmin()) {

    return true;

  }

  router.navigate(['/admin-dashboard']);

  return false;

};
 






