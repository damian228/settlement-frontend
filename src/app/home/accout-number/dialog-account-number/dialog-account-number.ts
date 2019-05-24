import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AccountNumberDTO } from '@app/shared/dto';
import { AccountNumberService } from '@app/home/accout-number/account-number.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-account-number',
  templateUrl: './dialog-account-number.html',
  styleUrls: ['./dialog-account-number.scss']
})
export class DialogAccountNumber implements OnInit {
  private accountNumber: AccountNumberDTO = { value: null };
  private isLoading: boolean = false;

  @ViewChild('numberInput') numberInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DialogAccountNumber>,
    private accountNumberService: AccountNumberService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.accountNumberService
      .getAccountNumber()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(account => (this.accountNumber = account), err => this.toastrService.error('Error while getting account number'));
  }

  closeWithoutSave(): void {
    this.toastrService.info('Closed without save');
    this.dialogRef.close();
  }

  save(): void {
    this.isLoading = true;
    this.accountNumberService
      .saveAccountNumber(this.accountNumber)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.dialogRef.close();
        })
      )
      .subscribe(
        () => this.toastrService.success('Account number saved successfully'),
        err => this.toastrService.error('Error, failed to save')
      );
  }

  isValid(): boolean {
    return this.numberInput.nativeElement.validity.valid;
  }
}
