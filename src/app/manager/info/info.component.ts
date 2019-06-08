import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoService } from '@app/manager/info/info.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { EmployeeInfoDTO, SummaryDTO } from '@app/shared/dto';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Constants } from '@app/shared/constants';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  summary: SummaryDTO;
  employees: MatTableDataSource<EmployeeInfoDTO>;
  displayedColumns: string[] = Constants.MANAGER_INFO_COLUMNS;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private infoService: InfoService, private toastrService: ToastrService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.employees = new MatTableDataSource<EmployeeInfoDTO>(this.route.snapshot.data['employees']);
    this.employees.paginator = this.paginator;
    this.employees.sort = this.sort;
    this.initSummary();
  }

  initSummary() {
    this.infoService.getSummary().subscribe(summary => (this.summary = summary));
  }
}
