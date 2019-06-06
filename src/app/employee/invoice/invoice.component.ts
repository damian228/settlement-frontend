import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '@app/employee/invoice/invoice.service';
import { AddInvoiceDTO, InvoiceDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { MatDialog, PageEvent } from '@angular/material';
import { Constants } from '@app/shared/constants';
import { finalize } from 'rxjs/operators';
import { FileUtilsService } from '@app/shared/file-utils.service';
import { DialogAddInvoice } from '@app/employee/invoice/dialog-add-invoice/dialog-add-invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  activeInvoices: ListChunk<InvoiceDTO>;
  activeShowColumns: string[] = Constants.EMPLOYEE_ACTIVE_INVOICES_COLUMNS;
  showAttachmentEl = false;
  activeFilter: PageableFilterDTO = Constants.INITIAL_INVOICE_FILTER;
  archivedInvoices: ListChunk<InvoiceDTO>;
  archivedShowColumns: string[] = Constants.EMPLOYEE_ARCHIVED_INVOICES_COLUMNS;
  showArchived = false;

  @ViewChild('attachmentEl') attachmentEl: ElementRef;

  constructor(
    private dialog: MatDialog,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private fileService: FileUtilsService
  ) {}

  ngOnInit() {
    this.activeInvoices = this.route.snapshot.data['invoices'];
  }

  fetchActiveInvoices(filter: PageableFilterDTO): void {
    this.invoiceService.getActive(filter).subscribe(invoices => (this.activeInvoices = invoices));
  }

  fetchArchivedInvoices(filter: PageableFilterDTO): void {
    this.invoiceService.getArchived(filter).subscribe(invoices => {
      this.archivedInvoices = invoices;
      this.showArchived = true;
    });
  }

  editInvoice(id: number, invoice: AddInvoiceDTO) {
    this.invoiceService.editInvoice(id, invoice).subscribe(() => {
      this.fetchActiveInvoices(this.activeFilter);
      this.toastrService.success('Invoice saved successfully');
    });
  }

  addInvoice(addInvoice: AddInvoiceDTO) {
    this.invoiceService.addInvoice(addInvoice).subscribe(() => {
      this.resetActiveFilter();
      this.fetchActiveInvoices(this.activeFilter);
      this.toastrService.success('Invoice added successfully');
    });
  }

  showDialog(invoice: InvoiceDTO) {
    const dialogRef = this.dialog.open(DialogAddInvoice, {
      width: '350px',
      data: { amount: invoice.amount, settlementNumber: invoice.settlementNumber }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        if (invoice.id) {
          this.editInvoice(invoice.id, result);
        } else {
          this.addInvoice(result);
        }
      }
    });
  }

  resetActiveFilter(): void {
    this.activeFilter = Constants.INITIAL_INVOICE_FILTER;
  }

  onShowArchived(): void {
    this.fetchArchivedInvoices(Constants.INITIAL_INVOICE_FILTER);
  }

  onAddInvoice(): void {
    this.showDialog(new InvoiceDTO());
  }

  onEdit(invoice: InvoiceDTO): void {
    this.showDialog(invoice);
  }

  onDownload(invoiceId: number): void {
    this.showAttachmentEl = true;
    this.invoiceService
      .getAttachment(invoiceId)
      .pipe(finalize(() => (this.showAttachmentEl = false)))
      .subscribe(file => {
        this.fileService.downloadFile(file, this.attachmentEl);
      });
  }

  onActivePagerChane(pageEvent: PageEvent): void {
    this.activeFilter = { pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize };
    this.fetchActiveInvoices(this.activeFilter);
  }

  onArchivedPagerChane(pageEvent: PageEvent): void {
    this.fetchActiveInvoices({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }
}
