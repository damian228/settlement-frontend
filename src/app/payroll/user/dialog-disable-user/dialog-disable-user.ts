import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@app/payroll/user/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-disable-user',
  templateUrl: './dialog-disable-user.html',
  styleUrls: ['./dialog-disable-user.scss']
})
export class DialogDisableUser {
  userId: string;
  isLoading: boolean = false;

  @ViewChild('userInput') userInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<DialogDisableUser>, private userService: UserService, private toastrService: ToastrService) {}

  closeWithoutSave(): void {
    this.dialogRef.close();
  }

  disableUser(): void {
    this.isLoading = true;
    this.userService
      .disableUser(this.userId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        () => {
          this.toastrService.success('User has been disabled');
          this.dialogRef.close();
        },
        error => {
          if (error.status === 400 && error.error && error.error.message) {
            this.toastrService.error(error.error.message);
          } else {
            throw error;
          }
        }
      );
  }

  isValid(): boolean {
    return this.userInput.nativeElement.validity.valid;
  }
}
