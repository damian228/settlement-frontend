import { Component, OnInit } from '@angular/core';
import { BillAccountNumberDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Constants } from '@app/shared/constants';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material';
import { BillService } from '@app/payroll/bill/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  activeBills: ListChunk<BillAccountNumberDTO>;
  activeShowColumns: string[] = Constants.PAYROLL_ACTIVE_BILLS_COLUMNS;
  archivedBills: ListChunk<BillAccountNumberDTO>;
  archivedShowColumns: string[] = Constants.PAYROLL_ARCHIVE_BILLS_COLUMNS;
  showArchived = false;

  constructor(private route: ActivatedRoute, private billService: BillService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.activeBills = this.route.snapshot.data['bills'];
    console.log('Bills', this.activeBills);
  }

  fetchActiveBills(filter: PageableFilterDTO): void {
    this.billService.getActual(filter).subscribe(bills => (this.activeBills = bills));
  }

  fetchArchivedBills(filter: PageableFilterDTO): void {
    this.billService.getArchived(filter).subscribe(bills => {
      this.archivedBills = bills;
      this.showArchived = true;
    });
  }

  onMarkProcessed(billId: number): void {
    this.billService.markBillProcessed(billId).subscribe(() => {
      this.fetchActiveBills(Constants.INITIAL_BILL_FILTER);
      if (this.showArchived) {
        this.fetchArchivedBills(Constants.INITIAL_BILL_FILTER);
      }
      this.toastrService.success('Bill marked as processed');
    });
  }

  onShowArchived(): void {
    this.fetchArchivedBills(Constants.INITIAL_BILL_FILTER);
  }

  onActivePagerChane(pageEvent: PageEvent): void {
    this.fetchActiveBills({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }

  onArchivedPagerChane(pageEvent: PageEvent) {
    this.fetchArchivedBills({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }
}
