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

  // Calls the new secure endpoint we just created
  getMyIssues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-issues`);
  }

  // --- MANAGER METHODS ---

  getAllIssues(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateStatus(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }
}