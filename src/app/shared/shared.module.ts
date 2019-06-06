import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { FileUtilsService } from '@app/shared/file-utils.service';
import { BillListComponent } from '@app/shared/components/bill-list/bill-list.component';
import { InvoiceListComponent } from '@app/shared/components/invoice-list/invoice-list.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, BillListComponent, InvoiceListComponent],
  exports: [LoaderComponent, BillListComponent, InvoiceListComponent],
  providers: [FileUtilsService]
})
export class SharedModule {}
