import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssetRequestService {
  private baseUrl = 'https://localhost:7274/api/AssetRequests';

  constructor(private http: HttpClient) {}

  // Get the employee's own requests
  getMyRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Submit a new request based on Category
  createRequest(data: { categoryID: number, reason: string }): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}