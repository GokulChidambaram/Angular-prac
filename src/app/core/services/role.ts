import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
  // Change 7141 to 7274 to match your UserService
  private baseUrl = 'https://localhost:7274/api/roles'; 

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<any[]>(this.baseUrl);
  }
}