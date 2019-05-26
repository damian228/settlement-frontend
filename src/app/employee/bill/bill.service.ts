import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillDTO, CreateBillDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BillService {
  constructor(private httpClient: HttpClient) {}

  generateBill(createBillDTO: CreateBillDTO): Observable<BillDTO> {
    return this.httpClient
      .post('/employee/bill/generate', this.mapDateToTimestamp(createBillDTO))
      .pipe(map((bill: BillDTO) => this.mapTimestampToDate(bill)));
  }

  updateBill(billId: number, createBillDTO: CreateBillDTO): Observable<BillDTO> {
    return this.httpClient
      .put(`/employee/bill/${billId}/update`, createBillDTO)
      .pipe(map((bill: BillDTO) => this.mapTimestampToDate(bill)));
  }

  sendBill(billId: number): Observable<Object> {
    return this.httpClient.put(`/employee/bill/${billId}/send`, null);
  }

  getActual(): Observable<BillDTO> {
    return this.httpClient
      .skipErrorHandler()
      .get('/employee/bill/actual')
      .pipe(
        map((bill: BillDTO) => {
          return this.mapTimestampToDate(bill);
        })
      );
  }

  getBill(billId: number): Observable<BillDTO> {
    return this.httpClient
      .skipErrorHandler()
      .get(`/employee/bill/${billId}/show`)
      .pipe(
        map((bill: BillDTO) => {
          return this.mapTimestampToDate(bill);
        })
      );
  }

  getArchived(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<BillDTO>> {
    return this.httpClient.post('/employee/bill/archived', pageableFilterDTO).pipe(map((response: ListChunk<BillDTO>) => response));
  }

  mapDateToTimestamp(bill: CreateBillDTO): CreateBillDTO {
    return { ...bill, to: bill.to.valueOf(), from: bill.from.valueOf() };
  }

  mapTimestampToDate(bill: BillDTO) {
    return { ...bill, from: new Date(bill.from), to: new Date(bill.to) };
  }
}
