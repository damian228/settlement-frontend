import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BillDTO, ListChunk } from '@app/shared/dto';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {
  @Input()
  set billList(billList: ListChunk<BillDTO>) {
    this.dataSource = new MatTableDataSource<BillDTO>(billList.list);
    this.paginator.length = billList.count;
  }

  @Input()
  displayedColumns: string[];

  @Output()
  pagerChange: EventEmitter<PageEvent> = new EventEmitter();
  @Output()
  accept: EventEmitter<number> = new EventEmitter();
  @Output()
  reject: EventEmitter<number> = new EventEmitter();

  dataSource: MatTableDataSource<BillDTO> = new MatTableDataSource<BillDTO>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {}

  onPageEvent(pageEvent: PageEvent) {
    this.pagerChange.emit(pageEvent);
  }

  onAccept(billId: number) {
    this.accept.emit(billId);
  }

  onReject(billId: number) {
    this.reject.emit(billId);
  }
}
