import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { ManagerRoutingModule } from '@app/manager/manager-routing.module';
import { InfoService } from '@app/manager/info/info.service';
import { InfoResolver } from '@app/manager/info/info.resolver';
import { BillComponent } from './bill/bill.component';
import { BillResolver } from '@app/manager/bill/bill.resolver';
import { BillService } from '@app/manager/bill/bill.service';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceService } from '@app/manager/invoice/invoice.service';
import { InvoiceResolver } from '@app/manager/invoice/invoice.resolver';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    ManagerRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [InfoComponent, BillComponent, InvoiceComponent],
  providers: [InfoService, InfoResolver, BillService, BillResolver, InvoiceService, InvoiceResolver]
})
export class ManagerModule {}
