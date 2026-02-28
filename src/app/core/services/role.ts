
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private baseUrl = 'https://localhost:7141/api/roles';
  constructor(private http: HttpClient) {}
  getRoles() {
    return this.http.get<any[]>(this.baseUrl);
  }
}
