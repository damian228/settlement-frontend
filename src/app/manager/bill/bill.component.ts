import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillDTO, ListChunk } from '@app/shared/dto';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  activeBills: ListChunk<BillDTO>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.activeBills = this.route.snapshot.data['bills'];
    console.log('Bills', this.activeBills);
  }
}
