import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { MatDialog } from '@angular/material';
import { DialogAddHours } from '@app/home/hours/dialog-add-hours/dialog-add-hours';
import { HoursDTO } from '@app/shared/dto';
import { HoursService } from '@app/home/hours/hours.service';
import { ToastrService } from 'ngx-toastr';
import { isSameMonth } from 'ngx-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  today: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
    { id: 8, start: new Date(2019, 4, 18), title: 'Nauka springa', allDay: true },
    { id: 8, start: new Date(2019, 4, 17), title: 'Nauka angulara', allDay: true }
  ];

  constructor(private dialog: MatDialog, private hoursService: HoursService, private toastr: ToastrService) {}

  ngOnInit() {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (!isSameMonth(this.today, date)) {
      this.toastr.error('Cannot add hours to past or upcoming month');
      return;
    }

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

  onMonthChange() {}
}
