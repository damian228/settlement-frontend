import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/core';
import { NgModule } from '@angular/core';
import { BillComponent } from '@app/payroll/bill/bill.component';
import { PayrollGuard } from '@app/payroll/payroll.guard';
import { BillResolver } from '@app/payroll/bill/bill.resolver';
import { InvoiceComponent } from '@app/payroll/invoice/invoice.component';
import { InvoiceResolver } from '@app/payroll/invoice/invoice.resolver';
import { SalaryComponent } from '@app/payroll/salary/salary.component';
import { SalaryResolver } from '@app/payroll/salary/salary.resolver';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'payroll', redirectTo: 'payroll/bill', pathMatch: 'full' },
    {
      path: 'payroll/bill',
      component: BillComponent,
      resolve: { bills: BillResolver },
      data: { title: extract('Bill') },
      canActivate: [PayrollGuard]
    },
    {
      path: 'payroll/invoice',
      component: InvoiceComponent,
      resolve: { invoices: InvoiceResolver },
      data: { title: extract('Invoice') },
      canActivate: [PayrollGuard]
    },
    {
      path: 'payroll/salary',
      component: SalaryComponent,
      resolve: { salaries: SalaryResolver },
      data: { title: extract('Salary') },
      canActivate: [PayrollGuard]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PayrollGuard]
})
export class PayrollRoutingModule {}
