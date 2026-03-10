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
  public categories: any[] = [];
  public isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Initialize form with null for categoryID to match [ngValue]
    this.assetForm = this.fb.group({
      name: ['', Validators.required],
      modelNo: ['', Validators.required],
      categoryID: [null, Validators.required], 
      tag: [''],
      description: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      departmentName: ['', Validators.required],
      supplierName: ['', Validators.required]
    });

    // 2. Load categories from your API
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  // Helper for HTML validation feedback
  isInvalid(controlName: string): boolean {
    const control = this.assetForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  save(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      console.warn("Form is invalid! Check missing fields.");
      return;
    }

    this.isSubmitting = true;

    // 3. Map values to match your C# AssetCreateDto exactly
    const payload = {
      name: this.assetForm.value.name,
      description: this.assetForm.value.description,
      modelNo: this.assetForm.value.modelNo,
      departmentName: this.assetForm.value.departmentName,
      supplierName: this.assetForm.value.supplierName,
      categoryID: Number(this.assetForm.value.categoryID),
      tag: this.assetForm.value.tag || "", 
      purchaseDate: new Date(this.assetForm.value.purchaseDate).toISOString(),
      cost: Number(this.assetForm.value.cost)
    };

    this.assetService.createAsset(payload).subscribe({
      next: () => {
        alert('Asset created successfully!');
        this.isSubmitting = false;
        this.router.navigate(['/admin/assets']);
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('Failed to save asset. Check the console.');
        this.isSubmitting = false;
      }
    });
  }
}