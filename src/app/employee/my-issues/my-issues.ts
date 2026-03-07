import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueService } from '../../core/services/issue'; 
@Component({
  selector: 'app-my-issues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-issues.html',
  styleUrls: ['./my-issues.scss']
})
export class MyIssues implements OnInit {
  public issues: any[] = [];
  public isLoading: boolean = true;

  constructor(
    private issueService: IssueService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyIssues();
  }

  loadMyIssues(): void {
    this.isLoading = true;
    // Calls the secure endpoint that only returns THIS employee's issues
    this.issueService.getMyIssues().subscribe({
      next: (res) => {
        console.log('My Issues Loaded:', res);
        this.issues = [...res]; 
        this.isLoading = false;
        this.cdr.detectChanges(); // Ensures Angular updates the view instantly
      },
      error: (err) => {
        console.error('Failed to load issues', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // High-performance trackBy function for the HTML table
  trackByIssueId(index: number, issue: any): number {
    return issue.issueID;
  }
}