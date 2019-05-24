import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountNumberDTO } from '@app/shared/dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountNumberService {
  constructor(private httpClient: HttpClient) {}

  saveAccountNumber(accountNumber: AccountNumberDTO): Observable<Object> {
    return this.httpClient.post('/employee/accountnumber?number=' + accountNumber.value, null);
  }

  getAccountNumber(): Observable<AccountNumberDTO> {
    return this.httpClient.get('/employee/accountnumber').pipe(map((ac: AccountNumberDTO) => ac));
  }
}
