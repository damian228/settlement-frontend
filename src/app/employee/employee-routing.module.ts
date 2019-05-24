import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { EmployeeComponent } from './employee.component';
import { Shell } from '@app/shell/shell.service';
import { BillComponent } from '@app/employee/bill/bill.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'employee', redirectTo: 'employee/calendar', pathMatch: 'full' },
    { path: 'employee/calendar', component: EmployeeComponent, data: { title: extract('Calendar') } },
    { path: 'employee/bill', component: BillComponent, data: { title: extract('Bill') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmployeeRoutingModule {}
