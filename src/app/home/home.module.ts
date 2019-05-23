import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './hours/calendar/calendar.component';
import { DialogAddHours } from './hours/dialog-add-hours/dialog-add-hours';
import { FormsModule } from '@angular/forms';
import { HoursService } from '@app/home/hours/hours.service';
import { AboutModule } from '@app/about/about.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AboutModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule
  ],
  declarations: [HomeComponent, CalendarComponent, DialogAddHours],
  entryComponents: [DialogAddHours],
  providers: [QuoteService, HoursService]
})
export class HomeModule {}
