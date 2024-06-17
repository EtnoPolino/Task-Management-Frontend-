import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  listOfEmployeeTasks: any = [];

  constructor(
    private employeeService: EmployeeService,
    private snackbar: MatSnackBar
  ) {
    this.getEmployeeAllTasksById();
  }

  getEmployeeAllTasksById() {
    this.employeeService.getEmployeeTasksById().subscribe((response) => {
      console.log(response);
      this.listOfEmployeeTasks = response;
    });
  }

  updateStatus(id: number, status: string) {
    this.employeeService.updateStatus(id, status).subscribe((response) => {
      if (response != null) {
        this.snackbar.open('Task status updated successfully', 'Close', {
          duration: 5000,
        });
        this.getEmployeeAllTasksById();
      } else {
        this.snackbar.open('Getting error while updating task', 'Close', {
          duration: 5000,
        });
      }
    });
  }
}
