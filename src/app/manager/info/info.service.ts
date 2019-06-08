import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeInfoDTO, SummaryDTO } from '@app/shared/dto';

@Injectable()
export class InfoService {
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<EmployeeInfoDTO[]> {
    //return this.httpClient.get('/manager/info/employees').pipe(map((res: EmployeeInfoDTO[]) => res));
    return of([
      { employeeId: 'admin', hours: 45, remuneration: 450 },
      { employeeId: 'admin1', hours: 45, remuneration: 950 },
      { employeeId: 'admin2', hours: 55, remuneration: 450 },
      { employeeId: 'admin3', hours: 75, remuneration: 850 },
      { employeeId: 'admin4', hours: 95, remuneration: 4150 }
    ]);
  }

  getSummary(): Observable<SummaryDTO> {
    return this.httpClient.get('/manager/info/summary').pipe(map((res: SummaryDTO) => res));
  }
}
