import { Routes } from '@angular/router';

import { adminGuard } from './core/guards/auth-guard';

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

  // 🔁 DEFAULT

  {

    path: '',

    redirectTo: 'login',

    pathMatch: 'full'

  },

  // ❌ FALLBACK

  {

    path: '**',

    redirectTo: 'login'

  }

];
 