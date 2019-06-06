import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/core';
import { NgModule } from '@angular/core';
import { InfoComponent } from '@app/manager/info/info.component';
import { ManagerGuard } from '@app/manager/manager.guard';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'manager', redirectTo: 'manager/info', pathMatch: 'full' },
    { path: 'manager/info', component: InfoComponent, data: { title: extract('Info') }, canActivate: [ManagerGuard] }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ManagerGuard]
})
export class ManagerRoutingModule {}
