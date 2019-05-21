import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { MatDialog } from '@angular/material';
import { DialogAddHours } from '@app/home/hours/dialog-add-hours/dialog-add-hours';
import { HoursDTO } from '@app/shared/dto';
import { HoursService } from '@app/home/hours/hours.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  constructor(private dialog: MatDialog, private hoursService: HoursService, private toastr: ToastrService) {}

  ngOnInit() {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const dialogRef = this.dialog.open(DialogAddHours, {
      width: '350px',
      data: new HoursDTO(date.getTime())
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.hoursService
          .reportHours(result)
          .subscribe(res => this.toastr.success('Saved successfully'), err => this.toastr.error('Error, failed to save'));
      }
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('Action', action);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
