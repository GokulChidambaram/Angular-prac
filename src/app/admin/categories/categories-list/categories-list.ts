import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.html',
  styleUrls: ['./categories-list.scss']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  isLoading: boolean = true;
  private apiUrl = 'https://localhost:7274/api/Categories';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Logging matches your previous success screen
        console.log('Categories received:', data); 
        this.categories = data;
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Fetch Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onEdit(id: number): void {
    // Navigates to the route defined in your admin-route
    this.router.navigate(['/admin/categories/edit', id]);
  }

  onDelete(id: number): void {
    if (confirm('Delete this category?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.fetchCategories(),
        error: (err) => console.error(err)
      });
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/admin/categories/add']);
  }
}