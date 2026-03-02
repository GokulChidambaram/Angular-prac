import { Component } from '@angular/core';
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

export class AddAssetComponent {

  assetForm: FormGroup;

  // ✅ Category from DB

  categories: { categoryID: number; name: string }[] = [];

  constructor(

    private fb: FormBuilder,

    private assetService: AssetService,

    private categoryService: CategoryService,

    private router: Router

  ) {

    this.assetForm = this.fb.group({

      name: ['', Validators.required],

      modelNo: ['', Validators.required],

      categoryID: [null, Validators.required],

      tag: [''],

      description: [''],

      purchaseDate: ['', Validators.required],

      cost: [null, Validators.required],

      departmentName: ['', Validators.required],

      supplierName: ['', Validators.required]

    });

    // ✅ Load category dropdown from DB

    this.categoryService.getCategories().subscribe({

      next: res => this.categories = res,

      error: err => console.error('Failed to load categories', err)

    });

  }

  save(): void {

    if (this.assetForm.invalid) return;

    this.assetService.createAsset(this.assetForm.value).subscribe({

      next: () => {

        alert('Asset created successfully');

        this.router.navigate(['/admin/assets']);

      },

      error: err => {

        console.error(err);

        alert('Failed to create asset');

      }

    });

  }

}
 