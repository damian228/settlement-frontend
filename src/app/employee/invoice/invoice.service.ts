import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddInvoiceDTO, FileDTO, InvoiceDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { map } from 'rxjs/operators';

@Injectable()
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  getAttachment(id: number): Observable<FileDTO> {
    return this.httpClient.get(`/employee/invoice/${id}/attachment`).pipe(map((file: FileDTO) => file));
  }

  addInvoice(addInvoiceDTO: AddInvoiceDTO): Observable<number> {
    return this.httpClient.post(`/employee/invoice/add`, addInvoiceDTO).pipe(map((response: number) => response));
  }

  editInvoice(id: number, addInvoiceDTO: AddInvoiceDTO): Observable<Object> {
    return this.httpClient.put(`/employee/invoice/${id}/edit`, addInvoiceDTO);
  }

  getActive(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<InvoiceDTO>> {
    return this.httpClient
      .skipErrorHandler()
      .post('/employee/invoice/actual', pageableFilterDTO)
      .pipe(map((response: ListChunk<InvoiceDTO>) => response));
  }

  getArchived(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<InvoiceDTO>> {
    return this.httpClient.post('/employee/invoice/archived', pageableFilterDTO).pipe(map((response: ListChunk<InvoiceDTO>) => response));
  }
}
