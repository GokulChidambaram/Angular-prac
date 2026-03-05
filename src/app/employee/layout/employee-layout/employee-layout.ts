import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeSidebar } from '../../sidebar/employee-sidebar/employee-sidebar'; // Adjust path if needed

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [RouterOutlet, EmployeeSidebar],
  templateUrl: './employee-layout.html',
  styleUrls: ['./employee-layout.scss']
})
export class EmployeeLayout { }