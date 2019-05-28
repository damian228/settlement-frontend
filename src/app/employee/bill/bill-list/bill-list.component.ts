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

  @Output()
  pagerChange: EventEmitter<PageEvent> = new EventEmitter();

  displayedColumns: string[] = [
    'id',
    'settlementNumber',
    'from',
    'to',
    'employeeId',
    'brutto',
    'netto',
    'incomeCosts',
    'tax',
    'salary',
    'hours'
  ];
  dataSource: MatTableDataSource<BillDTO> = new MatTableDataSource<BillDTO>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {}

  onPageEvent(pageEvent: PageEvent) {
    this.pagerChange.emit(pageEvent);
  }
}
