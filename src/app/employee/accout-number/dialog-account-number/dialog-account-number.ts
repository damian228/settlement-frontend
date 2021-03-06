import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AccountNumberDTO } from '@app/shared/dto';
import { AccountNumberService } from '@app/employee/accout-number/account-number.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-account-number',
  templateUrl: './dialog-account-number.html',
  styleUrls: ['./dialog-account-number.scss']
})
export class DialogAccountNumber implements OnInit {
  accountNumber: AccountNumberDTO = { value: null };
  isLoading: boolean = false;

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
        })
      )
      .subscribe(
        () => {
          this.toastrService.success('Account number saved successfully');
          this.dialogRef.close();
        },
        err => {
          if (err.status !== 400) {
            this.toastrService.error('Error, failed to save');
          }
        }
      );
  }

  isValid(): boolean {
    return this.numberInput.nativeElement.validity.valid;
  }
}
