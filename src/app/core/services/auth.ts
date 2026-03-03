import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private baseUrl = 'https://localhost:7274/api/Auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

 saveToken(token: string): void {
 localStorage.setItem('token', token);
 const payload = JSON.parse(atob(token.split('.')[1]));
 // ✅ CORRECT ROLE EXTRACTION (CLAIM URI)
 console.log('JWT Payload:', payload);
 const role =
   payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
   payload['role'];
 if (role) {
   localStorage.setItem('role', role);
 } else {
   console.warn('Role not found in JWT payload', payload);
 }
}

  getToken() {

    return localStorage.getItem('token');

  }
  getRole(): string | null {
   return localStorage.getItem('role');
  }

  logout() {

    localStorage.removeItem('token');

  }

  isLoggedIn() {

    return !!this.getToken();

  }

  isAdmin(): boolean {
   return this.getRole() === 'Admin';
 }
 isManager(): boolean {
   return this.getRole() === 'Manager';
 }
 isEmployee(): boolean {
   return this.getRole() === 'Employee';
 }

}
 
