import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateBillDTO } from '@app/shared/dto';

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.scss']
})
export class BillCreateComponent implements OnInit {
  @Input()
  billCreate: CreateBillDTO;
  @Input()
  readonly: boolean;

  @Output() valid: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onModelChanges(valid: boolean): void {
    this.valid.emit(valid);
  }
}
