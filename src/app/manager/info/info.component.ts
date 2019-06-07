import { Component, OnInit } from '@angular/core';
import { InfoService } from '@app/manager/info/info.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { EmployeeInfoDTO, SummaryDTO } from '@app/shared/dto';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  employees: EmployeeInfoDTO[];
  summary: SummaryDTO;

  constructor(private infoService: InfoService, private toastrService: ToastrService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.employees = this.route.snapshot.data['employees'];
    this.initSummary();
  }

  initSummary() {
    this.infoService.getSummary().subscribe(summary => (this.summary = summary));
  }
}
