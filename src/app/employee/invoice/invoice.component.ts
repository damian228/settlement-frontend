import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '@app/employee/invoice/invoice.service';
import { InvoiceDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { PageEvent } from '@angular/material';
import { Constants } from '@app/shared/constants';
import { finalize } from 'rxjs/operators';
import { FileUtilsService } from '@app/shared/file-utils.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  activeInvoices: ListChunk<InvoiceDTO>;
  activeShowColumns: string[] = Constants.EMPLOYEE_ACTIVE_INVOICES_COLUMNS;
  showAttachmentEl = false;

  @ViewChild('attachmentEl') attachmentEl: ElementRef;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fileService: FileUtilsService
  ) {}

  ngOnInit() {
    this.activeInvoices = this.route.snapshot.data['invoices'];
  }

  fetchActiveInvoices(filter: PageableFilterDTO): void {
    this.invoiceService.getArchived(filter).subscribe(invoices => (this.activeInvoices = invoices));
  }

  onPagerChane(pageEvent: PageEvent): void {
    this.fetchActiveInvoices({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }

  onEdit(invoiceId: number): void {}

  onDownload(invoiceId: number): void {
    this.showAttachmentEl = true;
    this.invoiceService
      .getAttachment(invoiceId)
      .pipe(finalize(() => (this.showAttachmentEl = false)))
      .subscribe(file => {
        this.fileService.downloadFile(file, this.attachmentEl);
      });
  }
}
