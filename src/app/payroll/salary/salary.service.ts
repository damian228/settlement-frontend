import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListChunk, PageableFilterDTO, SalaryDTO } from '@app/shared/dto';
import { map } from 'rxjs/operators';

@Injectable()
export class SalaryService {
  constructor(private httpClient: HttpClient) {}

  saveSalary(salary: SalaryDTO): Observable<Object> {
    return this.httpClient.put(`/payroll/salary/define?employeeId=${salary.employeeId}&salary=${salary.salary}`, null);
  }

  getSalaryList(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<SalaryDTO>> {
    return this.httpClient
      .skipErrorHandler()
      .post('/payroll/salary/list', pageableFilterDTO)
      .pipe(map((response: ListChunk<SalaryDTO>) => response));
  }
}
