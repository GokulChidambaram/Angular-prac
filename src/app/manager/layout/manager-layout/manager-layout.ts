import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagerSidebarComponent } from '../../sidebar/manager-sidebar/manager-sidebar';

@Component({
  selector: 'app-manager-layout',
  standalone: true,
  imports: [RouterOutlet, ManagerSidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-manager-sidebar></app-manager-sidebar>
      <main class="content-area">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout-wrapper { display: flex; min-height: 100vh; }
    .content-area { flex-grow: 1; margin-left: 250px; padding: 20px; background: #f9fbff; }
  `]
})
export class ManagerLayoutComponent {}