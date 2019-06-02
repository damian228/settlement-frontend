import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { EmployeeComponent } from './employee.component';
import { Shell } from '@app/shell/shell.service';
import { BillComponent } from '@app/employee/bill/bill.component';
import { BillResolver } from '@app/employee/bill/bill.resolver';
import { InvoiceComponent } from '@app/employee/invoice/invoice.component';
import { InvoiceResolver } from '@app/employee/invoice/invoice.resolver';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'employee', redirectTo: 'employee/calendar', pathMatch: 'full' },
    { path: 'employee/calendar', component: EmployeeComponent, data: { title: extract('Calendar') } },
    { path: 'employee/bill', component: BillComponent, resolve: { bill: BillResolver }, data: { title: extract('Bill') } },
    { path: 'employee/invoice', component: InvoiceComponent, resolve: { invoices: InvoiceResolver }, data: { title: extract('Invoice') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmployeeRoutingModule {}
