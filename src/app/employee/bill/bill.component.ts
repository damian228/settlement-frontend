import { Component, OnInit } from '@angular/core';
import { BillService } from '@app/employee/bill/bill.service';
import { ActivatedRoute } from '@angular/router';
import { BillDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material';
import { Constants } from '@app/shared/constants';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  currentBill: BillDTO;
  billCreateValid: boolean;
  isLoading = false;
  archivedBills: ListChunk<BillDTO>;
  showColumns = Constants.ARCHIVE_BILLS_COLUMNS;
  constants = Constants;

  constructor(private billService: BillService, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit() {
    this.currentBill = this.route.snapshot.data['bill'];
    this.billCreateValid = this.initBillCreateValidation();
    this.fetchArchivedBills(Constants.INITIAL_BILL_FILTER);
  }

  initBillCreateValidation(): boolean {
    return (
      this.currentBill.from &&
      this.currentBill.to &&
      this.currentBill.settlementNumber &&
      this.currentBill.settlementNumber.trim().length > 0
    );
  }

  fetchArchivedBills(filter: PageableFilterDTO): void {
    this.billService.getArchived(filter).subscribe(bills => (this.archivedBills = bills));
  }

  refreshCurrentBill() {
    this.isLoading = true;
    this.billService
      .getBill(this.currentBill.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(bill => (this.currentBill = bill));
  }

  generateBill() {
    this.isLoading = true;
    this.billService
      .generateBill(this.currentBill)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(bill => (this.currentBill = bill));
  }

  updateBill() {
    this.isLoading = true;
    this.billService
      .updateBill(this.currentBill.id, this.currentBill)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(bill => {
        this.toastr.success('Bill updated successfully');
        this.currentBill = bill;
      });
  }

  sendBill() {
    this.isLoading = true;
    this.billService
      .sendBill(this.currentBill.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.toastr.success('Bill has been sent to manager');
        this.refreshCurrentBill();
      });
  }

  onPagerChane(pageEvent: PageEvent): void {
    this.fetchArchivedBills({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize });
  }

  onValidate(isValid: boolean) {
    this.billCreateValid = isValid;
  }
}
