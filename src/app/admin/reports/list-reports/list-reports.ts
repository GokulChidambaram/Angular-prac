import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-reports.html',
  styleUrls: ['./list-reports.scss']
})
export class ListReportsComponent {
  startDate: string = '';
  endDate: string = '';
  isLoaded: boolean = false;
  isSearching: boolean = false;

  stats = { total: 0, available: 0, assigned: 0, inRepair: 0, underReview: 0 };

  private readonly API_URL = 'https://localhost:7274/api/assets/report';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  generateReport() {
    if (!this.startDate || !this.endDate) return;

    this.isSearching = true;
    this.isLoaded = false;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    const params = new HttpParams()
      .set('startDate', this.startDate)
      .set('endDate', this.endDate);

    this.http.get<any[]>(this.API_URL, { params, headers }).subscribe({
      next: (data) => {
        // 1. IMMEDIATELY Filter out deleted assets (Status ID 4)
        // This ensures they are never seen by the Total or the Status columns
        const activeAssets = data.filter(a => a.status !== 4 && a.status !== 'Deleted');

        // 2. Map statistics from the ACTIVE list only
        this.stats = {
          total: activeAssets.length,
          available: activeAssets.filter(a => a.status === 0 || a.status === 'Available').length,
          assigned: activeAssets.filter(a => a.status === 1 || a.status === 'Assigned').length,
          inRepair: activeAssets.filter(a => a.status === 2 || a.status === 'InRepair').length,
          underReview: activeAssets.filter(a => a.status === 3 || a.status === 'UnderReview').length
        };
        
        this.isSearching = false;
        this.isLoaded = true;
        
        // 3. Force the UI to show the result immediately without 'lag'
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSearching = false;
        alert('Error fetching report');
      }
    });
  }

  reset() {
    this.startDate = '';
    this.endDate = '';
    this.isLoaded = false;
    this.isSearching = false;
  }
}