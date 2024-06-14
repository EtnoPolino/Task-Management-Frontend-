import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent {
  id: number = this.activedRoute.snapshot.params['id']; // id est le params que l'on a dans le admin-routing.module.ts
  updateTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ['LOW', 'MEDIUM', 'HIGH'];
  listOfTaskStatus: any = [
    'PENDING',
    'INPROGRESS',
    'COMPLETED',
    'DEFERRED',
    'CANCELED',
  ];

  constructor(
    private adminService: AdminService,
    private activedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.getTaskById();
    this.getUsers();
    this.updateTaskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]],
    });
  }

  getTaskById() {
    this.adminService.getTaskById(this.id).subscribe((response) => {
      this.updateTaskForm.patchValue(response);
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe((response) => {
      this.listOfEmployees = response;
      console.log(response);
    });
  }

  updateTask() {
    console.log(this.updateTaskForm.value);

    this.adminService
      .updateTask(this.id, this.updateTaskForm.value)
      .subscribe((reponse) => {
        if (reponse.id != null) {
          this.snackbar.open('Task updated successfully', 'Close', {
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackbar.open('Something went wrong', 'ERROR', {
            duration: 5000,
          });
        }
      });
  }
}
