import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  listOfTasks: any = [];
  searchForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.getAllTasks();
    this.searchForm = this.fb.group({
      title: [null],
    });
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

  searchTask() {
    this.listOfTasks = [];
    const title = this.searchForm.get('title')!.value;
    this.adminService.searchTask(title).subscribe((response) => {
      console.log(response);
      this.listOfTasks = response;
    });
  }
}
