import { Injectable } from '@angular/core';
import { UserFront } from '@app/shared/dto';

@Injectable()
export class CommonStorageService {
  private _userFront: UserFront | null = null;

  get userFront(): UserFront {
    return this._userFront;
  }

  setUserFront(userFront?: UserFront) {
    this._userFront = userFront;
  }
}
