import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/core';
import { NgModule } from '@angular/core';
import { BillComponent } from '@app/payroll/bill/bill.component';
import { PayrollGuard } from '@app/payroll/payroll.guard';
import { BillResolver } from '@app/payroll/bill/bill.resolver';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'payroll', redirectTo: 'payroll/bill', pathMatch: 'full' },
    {
      path: 'payroll/bill',
      component: BillComponent,
      resolve: { bills: BillResolver },
      data: { title: extract('Bill') },
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
