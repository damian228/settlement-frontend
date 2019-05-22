import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { MatDialog } from '@angular/material';
import { DialogAddHours } from '@app/home/hours/dialog-add-hours/dialog-add-hours';
import { HoursDTO } from '@app/shared/dto';
import { HoursService } from '@app/home/hours/hours.service';
import { ToastrService } from 'ngx-toastr';
import { endOfMonth, startOfMonth, isSameMonth } from 'date-fns';

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
  events: CalendarEvent[] = [];

  constructor(private dialog: MatDialog, private hoursService: HoursService, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchHoursWorking();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (!isSameMonth(this.today, date)) {
      this.toastr.error('Cannot add hours to past or upcoming month');
      return;
    }

    const dialogRef = this.dialog.open(DialogAddHours, {
      width: '350px',
      data: this.mapEventsToHour(date, events)
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.hoursService.reportHours(result).subscribe(
          () => {
            events[0] = this.mapHourToEvent(result);
            this.toastr.success('Saved successfully');
          },
          err => this.toastr.error('Error, failed to save')
        );
      }
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('Action', action);
  }

  fetchHoursWorking() {
    this.events = [];
    console.log('Starting date', startOfMonth(this.viewDate));
    console.log('Ending date', endOfMonth(this.viewDate)); // add loader
    this.hoursService
      .getHours({
        from: startOfMonth(this.viewDate).getTime(),
        to: endOfMonth(this.viewDate).getTime()
      })
      .subscribe(
        hours => {
          this.events = this.mapHoursToEvents(hours);
        },
        err => this.toastr.error('Error while getting hours')
      );
  }

  mapHoursToEvents(hours: HoursDTO[]): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    hours.forEach(h => events.push(this.mapHourToEvent(h)));
    return events;
  }

  mapHourToEvent(h: HoursDTO): CalendarEvent {
    return { id: h.count, start: new Date(h.day), title: h.task, allDay: true };
  }

  mapEventsToHour(date: Date, events: CalendarEvent[]): HoursDTO {
    return events.length > 0
      ? {
          day: date.getTime(),
          count: Number(events[0].id),
          task: events[0].title
        }
      : { day: date.getTime() };
  }

  onMonthChange() {
    this.fetchHoursWorking();
  }
}
