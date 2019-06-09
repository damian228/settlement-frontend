import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SalaryDTO } from '@app/shared/dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-add-salary',
  templateUrl: './dialog-add-salary.html',
  styleUrls: ['./dialog-add-salary.scss']
})
export class DialogAddSalary {
  disableEmployeeId = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddSalary>,
    @Inject(MAT_DIALOG_DATA) public data: SalaryDTO,
    private toastrService: ToastrService
  ) {
    if (data.employeeId) {
      this.disableEmployeeId = true;
    }
  }

  closeWithoutSave(): void {
    this.toastrService.info('Closed without save');
    this.dialogRef.close();
  }
}
