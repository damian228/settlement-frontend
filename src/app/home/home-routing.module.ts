import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { BillComponent } from '@app/home/bill/bill.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'employee', redirectTo: 'employee/home', pathMatch: 'full' },
    { path: 'employee/home', component: HomeComponent, data: { title: extract('Home') } },
    { path: 'employee/bill', component: BillComponent, data: { title: extract('Bill') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule {}
