import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asset-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './asset-edit.html',
  styleUrls: ['./asset-edit.scss']
})
export class AssetEditComponent implements OnInit {
  editForm: FormGroup;
  assetId!: number;
  private apiUrl = 'https://localhost:7274/api/Assets';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      categoryName: ['', Validators.required],
      modelNo: ['', Validators.required],
      tag: [''],
      purchaseDate: [''],
      cost: [0],
      status: ['Available', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.assetId = Number(idParam);
    if (this.assetId) {
      this.fetchAsset();
    }
  }

  fetchAsset(): void {
    this.http.get<any>(`${this.apiUrl}/${this.assetId}`).subscribe({
      next: (data) => {
        this.editForm.patchValue({
          name: data.name,
          categoryName: data.categoryName,
          modelNo: data.modelNo,
          tag: data.tag,
          cost: data.cost,
          status: data.status,
          purchaseDate: data.purchaseDate ? data.purchaseDate.split('T')[0] : ''
        });
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      // Create the payload object exactly as the backend DTO expects it
      const payload = {
        name: this.editForm.value.name,
        categoryName: this.editForm.value.categoryName,
        modelNo: this.editForm.value.modelNo,
        tag: this.editForm.value.tag || "",
        purchaseDate: this.editForm.value.purchaseDate ? new Date(this.editForm.value.purchaseDate).toISOString() : null,
        cost: this.editForm.value.cost,
        status: this.editForm.value.status // e.g., "Available"
      };

      console.log('Sending Payload:', payload);

      this.http.put(`${this.apiUrl}/${this.assetId}`, payload).subscribe({
        next: () => {
          alert('Asset Updated Successfully!');
          this.router.navigate(['/admin/assets']);
        },
        error: (err) => {
          console.error('Update Error:', err);
          // Extract the specific error message from the validation response
          let errorMsg = "Update failed.";
          if (err.error && err.error.errors) {
            errorMsg = JSON.stringify(err.error.errors);
          } else if (typeof err.error === 'string') {
            errorMsg = err.error;
          }
          alert('Error: ' + errorMsg);
        }
      });
    }
  }
}