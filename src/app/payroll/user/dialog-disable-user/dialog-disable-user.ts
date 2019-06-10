import { Component, OnInit } from '@angular/core';
import { AccountNumberDTO } from '@app/shared/dto';

@Component({
  selector: 'app-dialog-disable-user',
  templateUrl: './dialog-disable-user.html',
  styleUrls: ['./dialog-disable-user.scss']
})
export class DialogDisableUser implements OnInit {
  userId: string;
  isLoading: boolean = false;

  constructor() {}

  ngOnInit() {}
}
