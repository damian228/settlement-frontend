import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './hours/calendar/calendar.component';
import { DialogAddHours } from './hours/dialog-add-hours/dialog-add-hours';
import { FormsModule } from '@angular/forms';
import { HoursService } from '@app/home/hours/hours.service';
import { BillComponent } from '@app/home/bill/bill.component';
import { DialogSalary } from './salary/dialog-salary/dialog-salary';
import { SalaryService } from '@app/home/salary/salary.service';
import { AccountNumberService } from '@app/home/accout-number/account-number.service';
import { DialogAccountNumber } from './accout-number/dialog-account-number/dialog-account-number';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule
  ],
  declarations: [HomeComponent, CalendarComponent, DialogAddHours, BillComponent, DialogSalary, DialogAccountNumber],
  entryComponents: [DialogAddHours, DialogSalary, DialogAccountNumber],
  providers: [QuoteService, HoursService, SalaryService, AccountNumberService]
})
export class HomeModule {}
