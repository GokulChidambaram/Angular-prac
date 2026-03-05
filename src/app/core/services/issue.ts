import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7274/api/Issues'; 

  reportIssue(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  getMyIssues(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}