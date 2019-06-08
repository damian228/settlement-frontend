import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '@app/manager/invoice/invoice.service';
import { InvoiceDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Constants } from '@app/shared/constants';
import { PageEvent } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { FileUtilsService } from '@app/shared/file-utils.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  activeInvoices: ListChunk<InvoiceDTO>;
  activeShowColumns: string[] = Constants.MANAGER_ACTIVE_INVOICES_COLUMNS;
  showAttachmentEl = false;
  archivedInvoices: ListChunk<InvoiceDTO>;
  archivedShowColumns: string[] = Constants.ARCHIVED_INVOICES_COLUMNS;
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

  onAccept(invoiceId: number): void {
    this.invoiceService.acceptInvoice(invoiceId).subscribe(() => this.handleResult('Bill accepted successfully'));
  }

  onReject(invoiceId: number) {
    this.invoiceService.rejectInvoice(invoiceId).subscribe(() => this.handleResult('Bill rejected successfully'));
  }

  private handleResult(message: string) {
    this.fetchActiveInvoices(Constants.INITIAL_BILL_FILTER);
    if (this.showArchived) {
      this.fetchArchivedInvoices(Constants.INITIAL_INVOICE_FILTER);
    }
    this.toastrService.success(message);
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
