import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { IssueService } from '../../core/services/issue'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit { 
  public myAssets: any[] = [];
  public isLoading: boolean = true;
  
  // Modal Variables
  public selectedAssetForIssue: any = null;
  public issueDescription: string = '';
  public requiresRepair: boolean = false;
  public isSubmittingIssue: boolean = false;

  // 🌟 FIXED: Points to the base API, backend handles filtering
  private apiUrl = 'https://localhost:7274/api/Assets'; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private issueService: IssueService 
  ) {}

  ngOnInit(): void {
    this.fetchMyAssets();
  }

fetchMyAssets(): void {
  this.isLoading = true; // Angular checks this first
  this.cdr.markForCheck();
  this.http.get<any[]>(this.apiUrl).subscribe({
    next: (res) => {
      this.myAssets = res;
      
      // Wrap the state change in setTimeout to avoid NG0100
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
        
      });
    },
    error: (err) => {
      console.error('Error fetching assets', err);
      
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      });
    }
  });
}

  openIssueModal(asset: any): void {
    this.selectedAssetForIssue = asset;
    this.issueDescription = '';
    this.requiresRepair = false;
    this.cdr.detectChanges();
  }

  closeIssueModal(): void {
    this.selectedAssetForIssue = null;
    this.cdr.detectChanges();
  }

 submitIssue(): void {
  if (!this.issueDescription.trim() || !this.selectedAssetForIssue) return;
  this.isSubmittingIssue = true;

  const currentUserId = Number(localStorage.getItem('userId')); 

  // Ensure these keys match your C# IssueCreateDto properties exactly
  const payload = {
    AssetID: this.selectedAssetForIssue.assetID,
    ReportedByUserID: currentUserId, 
    Description: this.issueDescription,
    RequiresRepair: true // 👈 Use PascalCase to match C# DTO
  };

  this.issueService.reportIssue(payload).subscribe({
    next: () => {
      alert('Issue reported successfully!');
      this.isSubmittingIssue = false;
      this.closeIssueModal();
      this.fetchMyAssets(); 
    },
    error: (err) => {
      console.error('Frontend Error:', err);
      alert('Error: ' + (err.error?.message || 'Check console for details'));
      this.isSubmittingIssue = false;
      this.cdr.detectChanges();
    }
  });
}
}