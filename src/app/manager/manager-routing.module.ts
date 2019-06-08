import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/core';
import { NgModule } from '@angular/core';
import { InfoComponent } from '@app/manager/info/info.component';
import { ManagerGuard } from '@app/manager/manager.guard';
import { InfoResolver } from '@app/manager/info/info.resolver';
import { BillComponent } from '@app/manager/bill/bill.component';
import { BillResolver } from '@app/manager/bill/bill.resolver';
import { InvoiceComponent } from '@app/manager/invoice/invoice.component';
import { InvoiceResolver } from '@app/manager/invoice/invoice.resolver';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'manager', redirectTo: 'manager/info', pathMatch: 'full' },
    {
      path: 'manager/info',
      component: InfoComponent,
      resolve: { employees: InfoResolver },
      data: { title: extract('Info') },
      canActivate: [ManagerGuard]
    },
    {
      path: 'manager/bill',
      component: BillComponent,
      resolve: { bills: BillResolver },
      data: { title: extract('Bill') },
      canActivate: [ManagerGuard]
    },
    {
      path: 'manager/invoice',
      component: InvoiceComponent,
      resolve: { invoices: InvoiceResolver },
      data: { title: extract('Invoice') },
      canActivate: [ManagerGuard]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ManagerGuard]
})
export class ManagerRoutingModule {}
