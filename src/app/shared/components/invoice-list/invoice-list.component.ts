import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InvoiceDTO, ListChunk } from '@app/shared/dto';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Constants } from '@app/shared/constants';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @Input()
  set invoiceList(invoiceList: ListChunk<InvoiceDTO>) {
    this.dataSource = new MatTableDataSource<InvoiceDTO>(invoiceList.list);
    this.paginator.length = invoiceList.count;
  }

  @Input()
  displayedColumns: string[];

  @Output()
  pagerChange: EventEmitter<PageEvent> = new EventEmitter();
  @Output()
  download: EventEmitter<number> = new EventEmitter();
  @Output()
  edit: EventEmitter<InvoiceDTO> = new EventEmitter();
  @Output()
  accept: EventEmitter<number> = new EventEmitter();
  @Output()
  reject: EventEmitter<number> = new EventEmitter();

  dataSource: MatTableDataSource<InvoiceDTO> = new MatTableDataSource<InvoiceDTO>();
  constants = Constants;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {}

  onPageEvent(pageEvent: PageEvent) {
    this.pagerChange.emit(pageEvent);
  }

  onDownload(id: number) {
    this.download.emit(id);
  }

  onEdit(invoice: InvoiceDTO) {
    this.edit.emit(invoice);
  }

  onAccept(billId: number) {
    this.accept.emit(billId);
  }

  onReject(billId: number) {
    this.reject.emit(billId);
  }
}
