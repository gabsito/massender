import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];

  getEmployee(): Employee[]{
    return this.employees;
  }

  addEmployee(name: string): void{
    this.employees.push(new Employee(name));
  }

}
