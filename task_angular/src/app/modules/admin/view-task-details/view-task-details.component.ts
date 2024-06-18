import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.scss'],
})
export class ViewTaskDetailsComponent {
  taskId: number = this.activedRoute.snapshot.params['id'];
  taskData: any;
  commentForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private activedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getTaskById();
    this.commentForm = this.fb.group({
      content: [null, [Validators.required]],
    });
  }

  getTaskById() {
    this.adminService.getTaskById(this.taskId).subscribe((reponse) => {
      this.taskData = reponse;
    });
  }

  publishComment() {
    console.log(this.commentForm.value);

    this.adminService
      .createComment(this.taskId, this.commentForm.get('content')?.value)
      .subscribe((response) => {
        if (response.id != null) {
          this.snackbar.open('comment posted successfully', 'Close', {
            duration: 5000,
          });
        } else {
          this.snackbar.open('Something went wrong', 'ERROR', {
            duration: 5000,
          });
        }
      });
  }
}
