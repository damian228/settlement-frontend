import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddInvoiceDTO, AddUserDTO, FileDTO, InvoiceDetailsDTO, ListChunk, PageableFilterDTO, PasswordDTO } from '@app/shared/dto';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  disableUser(id: number): Observable<Object> {
    return this.httpClient.put(`/payroll/auth/disableuser?userId=${id}`, null);
  }

  addUser(addUser: AddUserDTO): Observable<PasswordDTO> {
    return this.httpClient.post(`/payroll/auth/adduser`, addUser).pipe(map((response: PasswordDTO) => response));
  }
}
