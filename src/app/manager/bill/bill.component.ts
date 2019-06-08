import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillDTO, InvoiceDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Constants } from '@app/shared/constants';
import { PageEvent } from '@angular/material';
import { BillService } from '@app/manager/bill/bill.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  activeBills: ListChunk<BillDTO>;
  activeShowColumns: string[] = Constants.MANAGER_ACTIVE_BILLS_COLUMNS;
  archivedBills: ListChunk<BillDTO>;
  archivedShowColumns: string[] = Constants.ARCHIVE_BILLS_COLUMNS;
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

  onActivePagerChane(pageEvent: PageEvent): void {
    this.fetchActiveBills({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }

  onAccept(billId: number): void {
    this.billService.acceptBill(billId).subscribe(() => {
      this.fetchActiveBills(Constants.INITIAL_BILL_FILTER);
      this.toastrService.success('Bill accepted successfully');
    });
  }

  onReject(billId: number) {
    this.billService.rejectBill(billId).subscribe(() => {
      this.fetchActiveBills(Constants.INITIAL_BILL_FILTER);
      this.toastrService.success('Bill rejected successfully');
    });
  }

  onShowArchived(): void {
    this.fetchArchivedBills(Constants.INITIAL_BILL_FILTER);
  }

  onArchivedPagerChane(pageEvent: PageEvent) {
    this.fetchArchivedBills({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }
}
