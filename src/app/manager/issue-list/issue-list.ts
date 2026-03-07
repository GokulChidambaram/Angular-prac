import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { IssueService } from '../../core/services/issue';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-list.html',
  styleUrls: ['./issue-list.scss']
})
export class IssueListComponent implements OnInit {
  private issueService = inject(IssueService);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  
  public issues: any[] = [];
  public isLoading = true;

  STATUS = {
    OPEN: 'Open',
    IN_PROGRESS: 'InProgress',
    RESOLVED: 'Resolved'
  };

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.isLoading = true;
    this.issueService.getAllIssues().subscribe({
      next: (data) => {
        // Create a new array reference for faster Angular change detection
        this.issues = [...data]; 
        this.isLoading = false;
        
        // Force the UI to update immediately
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isLoading = false;
      }
    });
  }

  updateStatus(issue: any, newStatusCode: number, statusLabel: string): void {
    const payload = {
      description: issue.description,
      status: newStatusCode 
    };

    this.issueService.updateStatus(issue.issueID, payload).subscribe({
      next: () => {
        console.log(`Updated to ${statusLabel}`);
        // Refresh after update
        this.loadIssues(); 
      }
    });
  }

  // Bonus: trackBy function for extra performance
  trackByIssueId(index: number, issue: any): number {
    return issue.issueID;
  }
}