import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoursDTO } from '@app/shared/dto';

@Injectable()
export class HoursService {
  constructor(private httpClient: HttpClient) {}

  reportHours(hoursDTO: HoursDTO): Observable<Object> {
    return this.httpClient.post('/employee/hours/report', hoursDTO);
  }
}
