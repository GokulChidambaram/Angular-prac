import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-roles.html',
  styleUrls: ['./edit-roles.scss']
})
export class EditRolesComponent implements OnInit {
  roleID!: number;
  roleName: string = '';
  isSubmitting: boolean = false;

  private readonly API_URL = 'https://localhost:7274/api/roles';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // 2. Inject it here
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.roleID = +idParam;
      this.loadRoleDetails();
    }
  }

  loadRoleDetails(): void {
    this.http.get<any>(`${this.API_URL}/${this.roleID}`).subscribe({
      next: (res) => {
        console.log('Fetched Data:', res);
        // Based on your screenshot, the key is lowercase 'name'
        this.roleName = res.name; 
        
        // 3. Force the UI to refresh so "Loading name..." disappears
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.roleName || !this.roleName.trim()) return;

    this.isSubmitting = true;
    const payload = { 
      roleID: this.roleID, 
      name: this.roleName 
    };

    this.http.put(`${this.API_URL}/${this.roleID}`, payload).subscribe({
      next: () => this.router.navigate(['admin/roles']),
      error: () => this.isSubmitting = false
    });
  }

  cancel(): void {
    this.router.navigate(['admin/roles']);
  }
}