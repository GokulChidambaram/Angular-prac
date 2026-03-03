import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.scss'],
  imports: [CommonModule]
})
export class AssetListComponent implements OnInit {
  public assets: any[] = [];
  private apiUrl = 'https://localhost:7274/api/Assets'; 

  constructor(
    private router: Router, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Backend Data Arrived:', data);
        // Spreading into a new array to trigger Angular's change detection
        this.assets = [...data]; 
        // Manually tell Angular to render the new data
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  addAsset(): void {
    this.router.navigate(['/admin/assets/add']);
  }

  editAsset(id: number): void {
    this.router.navigate(['/admin/assets/edit', id]);
  }

  deleteAsset(id: number): void {
    if (confirm('Are you sure you want to delete this asset?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.loadAssets(),
        error: (err) => alert('Error deleting asset')
      });
    }
  }
}