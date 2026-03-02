import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AssetService {
 private baseUrl = 'https://localhost:7274/api/assets';
 constructor(private http: HttpClient) {}
 createAsset(data: any) {
   return this.http.post(this.baseUrl, data);
 }
}
