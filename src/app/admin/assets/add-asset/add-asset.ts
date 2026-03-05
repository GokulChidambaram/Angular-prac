import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetService } from '../../../core/services/asset';
import { CategoryService } from '../../../core/services/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-asset.html',
  styleUrls: ['./add-asset.scss']
})
export class AddAssetComponent implements OnInit {
  public assetForm!: FormGroup;
  public categories: any[] = []; // Flexible type in case your DB returns more than just id/name
  public isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assetForm = this.fb.group({
      name: ['', Validators.required],
      modelNo: ['', Validators.required],
      categoryID: ['', Validators.required], // Initialize as empty string to match HTML
      tag: [''],
      description: [''],
      purchaseDate: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      departmentName: ['', Validators.required],
      supplierName: ['', Validators.required]
    });

    // Load category dropdown from DB
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  save(): void {
    // 1. Check validity and show errors if invalid
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched(); 
      console.warn("Form is invalid! Check missing fields.");
      return;
    }

    this.isSubmitting = true;

    // 2. Force numbers to be numbers for the C# backend!
    const payload = {
      ...this.assetForm.value,
      categoryID: Number(this.assetForm.value.categoryID),
      cost: Number(this.assetForm.value.cost)
    };

    // 3. Send to API
    this.assetService.createAsset(payload).subscribe({
      next: () => {
        alert('Asset created successfully!');
        this.isSubmitting = false;
        this.router.navigate(['/admin/assets']);
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('Failed to create asset. Check the console for details.');
        this.isSubmitting = false;
      }
    });
  }
}