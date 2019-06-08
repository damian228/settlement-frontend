import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeInfoDTO, SummaryDTO } from '@app/shared/dto';

@Injectable()
export class InfoService {
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<EmployeeInfoDTO[]> {
    return this.httpClient.get('/manager/info/employees').pipe(map((res: EmployeeInfoDTO[]) => res));
  }

  getSummary(): Observable<SummaryDTO> {
    return this.httpClient.get('/manager/info/summary').pipe(map((res: SummaryDTO) => res));
  }
}
