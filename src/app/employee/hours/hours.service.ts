import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { HoursDTO, PeriodDTO } from '@app/shared/dto';
import { map } from 'rxjs/operators';

@Injectable()
export class HoursService {
  constructor(private httpClient: HttpClient) {}

  reportHours(hoursDTO: HoursDTO): Observable<Object> {
    return this.httpClient.post('/employee/hours/report', hoursDTO);
  }

  getHours(periodDTO: PeriodDTO): Observable<HoursDTO[]> {
    return this.httpClient.post('/employee/hours/find', periodDTO).pipe(map((hours: HoursDTO[]) => hours));
  }
}
