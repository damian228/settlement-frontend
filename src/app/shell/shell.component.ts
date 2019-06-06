import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatSidenav } from '@angular/material';
import { filter } from 'rxjs/operators';

import { untilDestroyed } from '@app/core';
import { DialogSalary } from '@app/employee/salary/dialog-salary/dialog-salary';
import { SalaryService } from '@app/employee/salary/salary.service';
import { DialogAccountNumber } from '@app/employee/accout-number/dialog-account-number/dialog-account-number';
import { LoggedUserService } from '@app/core/logged-user.service';
import { Constants } from '@app/shared/constants';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  constants = Constants;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private dialog: MatDialog,
    private salaryService: SalaryService,
    private media: MediaObserver,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media.media$
      .pipe(
        filter((change: MediaChange) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm'),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());
  }

  hasRole(role: string): boolean {
    return this.loggedUserService.hasRole(role);
  }

  showSalary(): void {
    this.salaryService.getHours().subscribe(salary => this.showSalaryDialog(salary));
  }

  showSalaryDialog(salary: number) {
    this.dialog.open(DialogSalary, {
      width: '250px',
      data: salary
    });
  }

  showAccountNumber(): void {
    this.dialog.open(DialogAccountNumber, {
      width: '350px'
    });
  }

  ngOnDestroy() {
    // Needed for automatic unsubscribe with untilDestroyed
  }
}
