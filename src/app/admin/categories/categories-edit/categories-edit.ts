import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-edit.html',
  styleUrls: ['./categories-edit.scss']
})
export class CategoriesEditComponent implements OnInit {
  categoryId!: number;
  categoryName: string = '';
  isLoading: boolean = true;
  private apiUrl = 'https://localhost:7274/api/Categories';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Extracts ID from URL /admin/categories/edit/1
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId) {
      this.loadCategory();
    }
  }

  loadCategory(): void {
    this.isLoading = true;
    this.http.get<any>(`${this.apiUrl}/${this.categoryId}`).subscribe({
      next: (data) => {
        this.categoryName = data.name; // Casing matches your backend
        this.isLoading = false;
        this.cdr.detectChanges(); // Ensures UI updates immediately
      },
      error: (err) => {
        console.error('Load Error:', err);
        alert('Category not found.');
        this.router.navigate(['/admin/categories']);
      }
    });
  }

  onSubmit(): void {
    if (!this.categoryName.trim()) {
      alert("Category name is required.");
      return;
    }

    const payload = { name: this.categoryName.trim() };

    this.http.put(`${this.apiUrl}/${this.categoryId}`, payload).subscribe({
      next: () => {
        alert('Category updated successfully!');
        this.router.navigate(['/admin/categories']);
      },
      error: (err: any) => {
        console.error('Update Error:', err);
        // Prevents [object Object] alert
        const errorMessage = err.error?.message || JSON.stringify(err.error) || "Server Error";
        alert("Failed to update: " + errorMessage);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/categories']);
  }
}