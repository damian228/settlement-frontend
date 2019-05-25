import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillDTO, CreateBillDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BillService {
  constructor(private httpClient: HttpClient) {}

  generateBill(createBillDTO: CreateBillDTO): Observable<BillDTO> {
    return this.httpClient.post('/employee/bill/generate', createBillDTO).pipe(map((bill: BillDTO) => bill));
  }

  updateBill(billId: number, createBillDTO: CreateBillDTO): Observable<BillDTO> {
    return this.httpClient.put(`/employee/bill/${billId}/update`, createBillDTO).pipe(map((bill: BillDTO) => bill));
  }

  sendBill(billId: number): Observable<Object> {
    return this.httpClient.put(`/employee/bill/${billId}/send`, null);
  }

  getActual(): Observable<BillDTO> {
    return this.httpClient.get('/employee/bill/actual').pipe(map((bill: BillDTO) => bill));
  }

  getArchived(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<BillDTO>> {
    return this.httpClient.post('/employee/bill/archived', pageableFilterDTO).pipe(map((response: ListChunk<BillDTO>) => response));
  }
}
