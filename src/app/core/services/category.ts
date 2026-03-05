import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7274/api/Categories'; // Ensure this matches your API URL

  // Fetch all categories for the dropdown
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}