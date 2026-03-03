// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class User {
  
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersUrl = 'https://localhost:7274/api/Users';
  private authUrl = 'https://localhost:7274/api/Auth';

  constructor(private http: HttpClient) {}

  // Get all users (Admin only)
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  // Get single user for editing
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${id}`);
  }

  // CREATE: Uses the Auth controller to handle password hashing
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, data);
  }

  // UPDATE: Uses UsersController (usually updates Name, Role, Dept, Status)
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.usersUrl}/${id}`, data);
  }

  // DELETE: Performs the Soft Delete (Status = Deleted)
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }
}