import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AssetRequestService } from '../../core/services/asset-request';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-requests.html',
  styleUrls: ['./my-requests.scss']
})
export class MyRequests implements OnInit {
  public requests: any[] = [];
  public isLoading: boolean = true;

  constructor(
    private requestService: AssetRequestService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyRequests();
  }

  loadMyRequests(): void {
    this.requestService.getMyRequests().subscribe({
      next: (res) => {
        console.log('My Requests Loaded:', res);
        this.requests = [...res]; 
        this.isLoading = false;
        this.cdr.detectChanges(); // Ensures Angular updates the view
      },
      error: (err) => {
        console.error('Failed to load requests', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  requestNewAsset(): void {
    this.router.navigate(['/employee/request-form']);
  }
}