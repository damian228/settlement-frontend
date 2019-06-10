import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PayrollRoutingModule } from '@app/payroll/payroll-routing.module';
import { BillComponent } from './bill/bill.component';
import { BillService } from '@app/payroll/bill/bill.service';
import { BillResolver } from '@app/payroll/bill/bill.resolver';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceResolver } from '@app/payroll/invoice/invoice.resolver';
import { InvoiceService } from '@app/payroll/invoice/invoice.service';
import { SalaryComponent } from './salary/salary.component';
import { SalaryService } from '@app/payroll/salary/salary.service';
import { SalaryResolver } from '@app/payroll/salary/salary.resolver';
import { DialogAddSalary } from './salary/dialog-add-salary/dialog-add-salary';
import { DialogDisableUser } from './user/dialog-disable-user/dialog-disable-user';
import { UserService } from '@app/payroll/user/user.service';
import { DialogAddUser } from './user/dialog-add-user/dialog-add-user';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    PayrollRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [BillComponent, InvoiceComponent, SalaryComponent, DialogAddSalary, DialogDisableUser, DialogAddUser],
  entryComponents: [DialogAddSalary, DialogDisableUser, DialogAddUser],
  providers: [BillService, BillResolver, InvoiceService, InvoiceResolver, SalaryService, SalaryResolver, UserService]
})
export class PayrollModule {}
