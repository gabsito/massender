import { Component } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-dashboard-empresa',
  templateUrl: './dashboard-empresa.component.html',
  styleUrls: ['./dashboard-empresa.component.css']
})
export class DashboardEmpresaComponent {

  employees: Employee[] = [new Employee('John Doe'), 
  new Employee('Jane Smith'),
  new Employee('Jim Brown')];
 
  }


