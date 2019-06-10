import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserService } from '@app/payroll/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { AddUserDTO, PasswordDTO, Role } from '@app/shared/dto';
import { finalize } from 'rxjs/operators';
import { Constants } from '@app/shared/constants';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.html',
  styleUrls: ['./dialog-add-user.scss']
})
export class DialogAddUser {
  addUser: AddUserDTO = new AddUserDTO();
  isLoading: boolean = false;
  addSuccess: boolean = false;
  password: PasswordDTO;

  roles: Role[] = [
    { value: Constants.EMPLOYEE_ROLE, label: 'Employee' },
    { value: Constants.MANAGER_ROLE, label: 'Manager' },
    { value: Constants.PAYROLL_ROLE, label: 'Payroll' }
  ];

  constructor(public dialogRef: MatDialogRef<DialogAddUser>, private userService: UserService, private toastrService: ToastrService) {}

  closeWithoutSave(): void {
    this.dialogRef.close();
  }

  onAddUser(): void {
    this.isLoading = true;
    this.userService
      .addUser(this.addUser)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(password => {
        this.password = password;
        this.addSuccess = true;
        this.toastrService.success('User has been added');
      });
  }
}
