import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDTO, InvoiceDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  getAttachment(id: number): Observable<FileDTO> {
    return this.httpClient.get(`/manager/invoice/${id}/attachment`).pipe(map((file: FileDTO) => file));
  }

  getInvoice(id: number): Observable<InvoiceDTO> {
    return this.httpClient
      .skipErrorHandler()
      .get(`/manager/invoice/${id}/show`)
      .pipe(map((invoice: InvoiceDTO) => invoice));
  }

  acceptInvoice(id: number): Observable<Object> {
    return this.httpClient.put(`/manager/invoice/${id}/accept`, null);
  }

  rejectInvoice(id: number): Observable<Object> {
    return this.httpClient.put(`/manager/invoice/${id}/reject`, null);
  }

  getActive(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<InvoiceDTO>> {
    return this.httpClient
      .skipErrorHandler()
      .post('/manager/invoice/actual', pageableFilterDTO)
      .pipe(map((response: ListChunk<InvoiceDTO>) => response));
  }

  getArchived(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<InvoiceDTO>> {
    return this.httpClient.post('/manager/invoice/archived', pageableFilterDTO).pipe(map((response: ListChunk<InvoiceDTO>) => response));
  }
}
