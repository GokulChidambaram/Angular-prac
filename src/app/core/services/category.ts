import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:7274/api/Categories';

  constructor(private http: HttpClient) {}

  // Add this method to fix TS2339
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}