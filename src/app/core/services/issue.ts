import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7274/api/Issues'; 

  // --- EMPLOYEE METHODS ---

  reportIssue(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  // Calls the secure endpoint we created for the logged-in user
  getMyIssues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-issues`);
  }

  // --- MANAGER METHODS ---

  getAllIssues(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // --- UPDATED METHOD ---
  // Now uses PATCH and the correct /status endpoint
  updateStatus(id: number, payload: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, payload);
  }
}