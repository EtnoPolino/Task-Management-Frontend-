import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  listOfTasks: any = [];

  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar
  ) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.adminService.getAllTasks().subscribe((response) => {
      this.listOfTasks = response;
    });
  }

  deleteTask(id: number) {
    this.adminService.deleteTask(id).subscribe(() => {
      this.snackbar.open('Task deleted successfully', 'Close', {
        duration: 5000,
      });
      this.getAllTasks();
    });
  }
}
