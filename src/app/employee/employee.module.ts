import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './hours/calendar/calendar.component';
import { DialogAddHours } from './hours/dialog-add-hours/dialog-add-hours';
import { FormsModule } from '@angular/forms';
import { HoursService } from '@app/employee/hours/hours.service';
import { BillComponent } from '@app/employee/bill/bill.component';
import { DialogSalary } from './salary/dialog-salary/dialog-salary';
import { SalaryService } from '@app/employee/salary/salary.service';
import { AccountNumberService } from '@app/employee/accout-number/account-number.service';
import { DialogAccountNumber } from './accout-number/dialog-account-number/dialog-account-number';
import { BillDetailsComponent } from './bill/bill-details/bill-details.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    EmployeeRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule
  ],
  declarations: [
    EmployeeComponent,
    CalendarComponent,
    DialogAddHours,
    BillComponent,
    DialogSalary,
    DialogAccountNumber,
    BillDetailsComponent,
    BillListComponent
  ],
  entryComponents: [DialogAddHours, DialogSalary, DialogAccountNumber],
  providers: [HoursService, SalaryService, AccountNumberService]
})
export class EmployeeModule {}
