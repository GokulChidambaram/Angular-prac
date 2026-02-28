import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar';
@Component({
 selector: 'app-admin-layout',
 standalone: true,
 imports: [RouterOutlet, AdminSidebarComponent],
 templateUrl: './admin-layout.html',
 styleUrls: ['./admin-layout.scss']
})
export class AdminLayoutComponent {}
