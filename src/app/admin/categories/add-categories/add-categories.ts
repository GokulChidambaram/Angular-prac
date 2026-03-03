import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-categories.html',
  styleUrls: ['./add-categories.scss']
})
export class AddCategoriesComponent {
  categoryName: string = '';
  private apiUrl = 'https://localhost:7274/api/Categories';

  constructor(private http: HttpClient, public router: Router) {}

  onSubmit(): void {
    if (!this.categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    const payload = { name: this.categoryName.trim() };

    this.http.post(this.apiUrl, payload).subscribe({
      next: () => {
        alert('Category added successfully!');
        this.router.navigate(['/admin/categories']);
      },
      error: (err: any) => {
        // Stringify logic to fix the [object Object] alert
        let errorMessage = "Database Save Failed";
        if (err.error) {
          errorMessage = typeof err.error === 'string' 
            ? err.error 
            : (err.error.message || JSON.stringify(err.error));
        }
        alert("Error: " + errorMessage);
      }
    });
  }
}