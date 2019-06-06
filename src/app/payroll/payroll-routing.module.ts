import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/core';
import { NgModule } from '@angular/core';
import { BillComponent } from '@app/payroll/bill/bill.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'payroll', redirectTo: 'payroll/bill', pathMatch: 'full' },
    { path: 'payroll/bill', component: BillComponent, data: { title: extract('Bill') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PayrollRoutingModule {}
