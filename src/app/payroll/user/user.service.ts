import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddUserDTO, PasswordDTO } from '@app/shared/dto';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  disableUser(userId: string): Observable<Object> {
    return this.httpClient.skipErrorHandler().put(`/auth/auth/disableuser?userId=${userId}`, null);
  }

  addUser(addUser: AddUserDTO): Observable<PasswordDTO> {
    return this.httpClient.post(`/auth/auth/adduser`, addUser).pipe(map((response: PasswordDTO) => response));
  }
}
