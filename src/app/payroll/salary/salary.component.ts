import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalaryService } from '@app/payroll/salary/salary.service';
import { ListChunk, PageableFilterDTO, SalaryDTO } from '@app/shared/dto';
import { Constants } from '@app/shared/constants';
import { DialogAddSalary } from '@app/payroll/salary/dialog-add-salary/dialog-add-salary';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  salaryList: MatTableDataSource<SalaryDTO> = new MatTableDataSource<SalaryDTO>();
  salaryShowColumns: string[] = Constants.PAYROLL_SALARY_COLUMNS;
  salaryFilter: PageableFilterDTO = Constants.INITIAL_SALARY_FILTER;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private salaryService: SalaryService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.assignNewList(this.route.snapshot.data['salaries']);
  }

  fetchSalaries(filter: PageableFilterDTO): void {
    this.salaryService.getSalaryList(filter).subscribe(salaries => this.assignNewList(salaries));
  }

  saveSalary(salary: SalaryDTO): void {
    this.salaryService.saveSalary(salary).subscribe(() => {
      this.fetchSalaries(this.salaryFilter);
      this.toastrService.success('Salary saved successfully');
    });
  }

  private assignNewList(salaries: ListChunk<SalaryDTO>) {
    this.salaryList = new MatTableDataSource<SalaryDTO>(salaries.list);
    this.paginator.length = salaries.count;
  }

  showDialog(salary: SalaryDTO, isNew: boolean) {
    const dialogRef = this.dialog.open(DialogAddSalary, {
      width: '350px',
      data: { employeeId: salary.employeeId, salary: salary.salary }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        if (isNew) {
          this.salaryFilter = Constants.INITIAL_SALARY_FILTER;
        }
        this.saveSalary(result);
      }
    });
  }

  onAddSalary() {
    this.showDialog(new SalaryDTO(), true);
  }

  onEdit(salary: SalaryDTO) {
    this.showDialog(salary, false);
  }

  onPagerChane(pageEvent: PageEvent): void {
    this.salaryFilter = { pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize };
    this.fetchSalaries(this.salaryFilter);
  }
}
