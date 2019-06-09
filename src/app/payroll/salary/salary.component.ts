import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalaryService } from '@app/payroll/salary/salary.service';
import { InvoiceDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Constants } from '@app/shared/constants';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  salaryList: ListChunk<InvoiceDTO>;
  salaryShowColumns: string[] = Constants.PAYROLL_SALARY_COLUMNS;
  salaryFilter: PageableFilterDTO = Constants.INITIAL_SALARY_FILTER;

  constructor(
    private dialog: MatDialog,
    private salaryService: SalaryService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.salaryList = this.route.snapshot.data['salaries'];
    console.log('Salaries', this.salaryList);
  }
}
