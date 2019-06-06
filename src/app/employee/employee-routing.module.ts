import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { Shell } from '@app/shell/shell.service';
import { BillComponent } from '@app/employee/bill/bill.component';
import { BillResolver } from '@app/employee/bill/bill.resolver';
import { InvoiceComponent } from '@app/employee/invoice/invoice.component';
import { InvoiceResolver } from '@app/employee/invoice/invoice.resolver';
import { EmployeeGuard } from '@app/employee/employee.guard';
import { extract } from '@app/core';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'employee', redirectTo: 'employee/calendar', pathMatch: 'full' },
    { path: 'employee/calendar', component: EmployeeComponent, data: { title: extract('Calendar') }, canActivate: [EmployeeGuard] },
    {
      path: 'employee/bill',
      component: BillComponent,
      resolve: { bill: BillResolver },
      data: { title: extract('Bill') },
      canActivate: [EmployeeGuard]
    },
    {
      path: 'employee/invoice',
      component: InvoiceComponent,
      resolve: { invoices: InvoiceResolver },
      data: { title: extract('Invoice') },
      canActivate: [EmployeeGuard]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EmployeeGuard]
})
export class EmployeeRoutingModule {}
