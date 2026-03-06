
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private baseUrl = 'https://localhost:7274/api/Assets';

  constructor(private http: HttpClient) {}

  // Added this to fetch the list for your table
  getAssets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createAsset(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  deleteAsset(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAvailableByCategory(categoryId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/available/${categoryId}`);
  }
}