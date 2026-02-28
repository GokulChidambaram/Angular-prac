import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
 selector: 'app-add-asset',
 standalone: true,
 imports: [ReactiveFormsModule, CommonModule],
 templateUrl: './add-asset.html',
 styleUrls: ['./add-asset.scss']
})
export class AddAssetComponent {
 assetForm!: FormGroup;
 categories = ['IT', 'Electronics', 'Furniture', 'Software'];
 subCategories = ['Desktop', 'Laptop', 'Office Chair', 'Pen Drive', 'Charger', 'Headphones'];
 suppliers = ['Google', 'Dell', 'Lenovo', 'HP'];
 departments = ['IT', 'HR', 'Finance'];
 subDepartments = ['QA', 'SDE', 'Infra', 'PM', 'Recruitment'];
 constructor(private fb: FormBuilder, private router: Router) {
   this.assetForm = this.fb.group({
     assetId: ['', Validators.required],
     modelNo: ['', Validators.required],
     name: ['', Validators.required],
     description: [''],
     unitPrice: ['', Validators.required],
     dateOfPurchase: ['', Validators.required],
     category: ['', Validators.required],
     subCategory: ['', Validators.required],
     supplier: ['', Validators.required],
     department: ['', Validators.required],
     subDepartment: ['', Validators.required]
   });
 }
 save(): void {
   if (this.assetForm.invalid) return;
   console.log(this.assetForm.value);
   this.router.navigate(['/admin/assets']);
 }
}
