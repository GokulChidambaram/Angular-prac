import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
 selector: 'app-asset-list',
 standalone: true,
 templateUrl: './asset-list.html',
 styleUrls: ['./asset-list.scss'],
 imports: [CommonModule]
})
export class AssetListComponent {
 assets = [
   {
     id: 1,
     assetId: 'AST-001',
     modelNo: 'DL-909',
     name: 'Dell Laptop',
     status: 'Unassigned',
     price: 65000,
     date: '2023-10-12'
   }
 ];
 constructor(private router: Router) {}
 addAsset(): void {
   this.router.navigate(['/admin/assets/add']);
 }
}