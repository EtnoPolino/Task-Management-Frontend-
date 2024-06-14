import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  listOfEmployeeTasks: any = [];

  constructor(private employeeService: EmployeeService) {
    this.getEmployeeAllTasksById();
  }

  getEmployeeAllTasksById() {
    this.employeeService.getEmployeeTasksById().subscribe((response) => {
      console.log(response);
      this.listOfEmployeeTasks = response;
    });
  }
}
