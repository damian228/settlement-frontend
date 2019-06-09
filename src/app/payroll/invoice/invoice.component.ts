import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InvoiceDetailsDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Constants } from '@app/shared/constants';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUtilsService } from '@app/shared/file-utils.service';
import { finalize } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
import { InvoiceService } from '@app/payroll/invoice/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  activeInvoices: ListChunk<InvoiceDetailsDTO>;
  activeShowColumns: string[] = Constants.PAYROLL_ACTIVE_INVOICES_COLUMNS;
  showAttachmentEl = false;
  archivedInvoices: ListChunk<InvoiceDetailsDTO>;
  archivedShowColumns: string[] = Constants.PAYROLL_ARCHIVE_INVOICES_COLUMNS;
  showArchived = false;

  @ViewChild('attachmentEl') attachmentEl: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
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

  onMarkProcessed(invoiceId: number): void {
    this.invoiceService.markInvoiceProcessed(invoiceId).subscribe(() => {
      this.fetchActiveInvoices(Constants.INITIAL_INVOICE_FILTER);
      if (this.showArchived) {
        this.fetchArchivedInvoices(Constants.INITIAL_INVOICE_FILTER);
      }
      this.toastrService.success('Invoice marked as processed');
    });
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

  onShowArchived(): void {
    this.fetchArchivedInvoices(Constants.INITIAL_INVOICE_FILTER);
  }

  onActivePagerChane(pageEvent: PageEvent): void {
    this.fetchActiveInvoices({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }

  onArchivedPagerChane(pageEvent: PageEvent): void {
    this.fetchArchivedInvoices({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }
}
