import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  
  // Modal Variables for "Raise Issue"
  public selectedAssetForIssue: any = null;
  public issueDescription: string = '';
  public requiresRepair: boolean = false;
  public isSubmittingIssue: boolean = false;

  // 🌟 THE UPDATED ENDPOINT 🌟
  private apiUrl = 'https://localhost:7274/api/Assets/my-assets'; 

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

  requestNewAsset(): void {
    this.router.navigate(['/employee/request-form']);
  }

  // --- Modal Logic ---
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
    if (!this.issueDescription.trim()) return;
    this.isSubmittingIssue = true;

    const currentUserId = Number(localStorage.getItem('userId')) || 0; 

    const payload = {
      assetID: this.selectedAssetForIssue.assetID,
      reportedByUserID: currentUserId,
      description: this.issueDescription,
      requiresRepair: this.requiresRepair
    };

    this.issueService.reportIssue(payload).subscribe({
      next: () => {
        alert('Issue reported successfully!');
        this.isSubmittingIssue = false;
        this.closeIssueModal();
      },
      error: (err) => {
        console.error('Failed to report issue', err);
        alert('Failed to report issue. Try again later.');
        this.isSubmittingIssue = false;
        this.cdr.detectChanges();
      }
    });
  }
}