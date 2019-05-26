import { Component, Input, OnInit } from '@angular/core';
import { BillDetailsDTO } from '@app/shared/dto';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  @Input()
  billDetails: BillDetailsDTO;
  @Input()
  readonly: boolean;

  constructor() {}

  ngOnInit() {}
}
