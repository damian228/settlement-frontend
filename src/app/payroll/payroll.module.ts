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
  declarations: [BillComponent, InvoiceComponent, SalaryComponent],
  providers: [BillService, BillResolver, InvoiceService, InvoiceResolver, SalaryService, SalaryResolver]
})
export class PayrollModule {}
