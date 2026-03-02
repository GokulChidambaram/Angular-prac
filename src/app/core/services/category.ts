import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class CategoryService {

  private baseUrl = 'https://localhost:7274/api/categories';

  constructor(private http: HttpClient) {}

  getCategories() {

    return this.http.get<{ categoryID: number; name: string }[]>(this.baseUrl);

  }

}
 
