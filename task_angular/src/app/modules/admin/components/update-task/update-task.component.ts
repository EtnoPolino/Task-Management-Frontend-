import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent {
  id: number = this.route.snapshot.params['id']; // id est le params que l'on a dans le admin-routing.module.ts

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {
    this.getTaskById();
  }

  getTaskById() {
    this.adminService.getTaskById(this.id).subscribe((response) => {
      console.log(response);
    });
  }
}
