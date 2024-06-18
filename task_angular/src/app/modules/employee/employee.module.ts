import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoAngularMaterialModule } from 'src/app/DemoAngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewTaskDetailComponent } from './components/view-task-detail/view-task-detail.component';

@NgModule({
  declarations: [DashboardComponent, ViewTaskDetailComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    DemoAngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EmployeeModule {}
