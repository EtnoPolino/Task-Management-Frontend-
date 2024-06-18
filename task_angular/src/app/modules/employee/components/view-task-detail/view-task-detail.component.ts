import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-task-detail',
  templateUrl: './view-task-detail.component.html',
  styleUrls: ['./view-task-detail.component.scss'],
})
export class ViewTaskDetailComponent {
  taskId: number = this.activedRoute.snapshot.params['id'];
  taskData: any;
  tasksComments: any;
  commentForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private activedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getTaskById();
    this.getComments();
    this.commentForm = this.fb.group({
      content: [null, [Validators.required]],
    });
  }

  getTaskById() {
    this.employeeService.getTaskById(this.taskId).subscribe((reponse) => {
      this.taskData = reponse;
    });
  }

  getComments() {
    this.employeeService.getCommentsByTask(this.taskId).subscribe((reponse) => {
      this.tasksComments = reponse;
    });
  }

  publishComment() {
    console.log(this.commentForm.value);

    this.employeeService
      .createComment(this.taskId, this.commentForm.get('content')?.value)
      .subscribe((response) => {
        if (response.id != null) {
          this.snackbar.open('comment posted successfully', 'Close', {
            duration: 5000,
          });
          this.getComments();
        } else {
          this.snackbar.open('Something went wrong', 'ERROR', {
            duration: 5000,
          });
        }
      });
  }
}
