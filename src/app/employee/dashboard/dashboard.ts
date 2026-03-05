import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 1. Fixed Warning: Removed RouterLink since we use Router in the constructor now
  imports: [CommonModule], 
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
// 2. Fixed Routing Error: Kept the class name as "Dashboard" to match your employee.route.ts
export class Dashboard implements OnInit { 
  public myAssets: any[] = [];
  public isLoading: boolean = true;
  
  private apiUrl = 'https://localhost:7274/api/Assets'; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchMyAssets();
  }

  fetchMyAssets(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (res) => {
        console.log('My Assets Loaded:', res);
        this.myAssets = [...res]; 
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching your assets', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // 3. Fixed Template Error: Added the missing method so the button click works
  requestNewAsset(): void {
    this.router.navigate(['/employee/request-form']);
  }
}