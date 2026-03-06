import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetRequestService } from '../../core/services/asset-request';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-requests.html',
  styleUrls: ['./manage-requests.scss']
})
export class ManageRequests implements OnInit {
  private requestService = inject(AssetRequestService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef); // 👈 Injecting CDR

  pendingRequests: any[] = [];
  availableAssets: any[] = [];
  selectedRequest: any = null;
  selectedAssetId: number | null = null;
  showModal = false;

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  loadPendingRequests() {
    this.requestService.getPendingRequests().subscribe({
      next: (data) => {
        this.pendingRequests = data;
        this.cdr.detectChanges(); // 👈 Update table view
      },
      error: (err) => console.error('Error loading requests', err)
    });
  }

  openApproveModal(request: any) {
    this.selectedRequest = request;
    this.showModal = true;
    
    this.http.get<any[]>(`https://localhost:7274/api/Assets/available/${request.categoryID}`).subscribe({
      next: (assets) => {
        this.availableAssets = assets;
        this.cdr.detectChanges(); // 👈 Ensure modal dropdown populates immediately
      },
      error: (err) => console.error('Error fetching available assets', err)
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedRequest = null;
    this.selectedAssetId = null;
    this.cdr.detectChanges(); // 👈 Ensure modal clears from DOM
  }

  confirmApproval() {
    if (!this.selectedAssetId) return;

    this.requestService.approveRequest(this.selectedRequest.requestID, this.selectedAssetId).subscribe({
      next: () => {
        alert('Asset successfully assigned and request approved!');
        this.closeModal();
        this.loadPendingRequests();
      },
      error: (err) => alert('Error: ' + err.error.message)
    });
  }
}