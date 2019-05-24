import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SalaryService {
  constructor(private httpClient: HttpClient) {}

  getHours(): Observable<number> {
    return this.httpClient.get('/employee/salary').pipe(map((salary: number) => salary));
  }
}
