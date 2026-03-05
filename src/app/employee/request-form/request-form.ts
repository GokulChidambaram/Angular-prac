import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 1. Import ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category';  
import { AssetRequestService } from '../../core/services/asset-request';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-form.html',
  styleUrls: ['./request-form.scss']
})
export class RequestForm implements OnInit {
  public requestForm!: FormGroup;
  public categories: any[] = []; 
  public isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService, 
    private requestService: AssetRequestService,
    private router: Router,
    private cdr: ChangeDetectorRef // 👈 2. Inject it here
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      categoryID: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = [...data]; // 👈 3. Spread operator to create a new array reference
        console.log('Categories loaded:', this.categories);
        this.cdr.detectChanges(); // 👈 4. Tell Angular to update the dropdown UI immediately!
      },
      error: (err) => console.error('Error fetching categories', err)
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.isSubmitting = true;
      
      this.requestService.createRequest(this.requestForm.value).subscribe({
        next: () => {
          alert('Request Sent Successfully!');
          this.router.navigate(['/employee/my-requests']);
        },
        error: () => {
          alert('Failed to send request');
          this.isSubmitting = false;
        }
      });
    }
  }
}