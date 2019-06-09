export interface LoginContext {
  login: string;
  password: string;
  remember?: boolean;
}

export class LoginContextDTO {
  login: string;
  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}

export interface TokenDTO {
  value: string;
  exp?: number;
}

export class UserFront {
  userId: string;
  role: string;
  forename: string;
  surname: string;

  constructor(userId: string, role: string, forename: string, surname: string) {
    this.userId = userId;
    this.role = role;
    this.forename = forename;
    this.surname = surname;
  }
}

export class HoursDTO {
  count?: number;
  task?: string;
  day: number;
}

export interface PeriodDTO {
  from: number;
  to: number;
}

export interface AccountNumberDTO {
  value: string;
}

export interface BillDetailsDTO {
  id: number;
  employeeId: string;
  brutto: number;
  netto: number;
  incomeCosts: number;
  tax: number;
  hours: number;
  salary: number;
  status: string;
}

export interface CreateBillDTO {
  settlementNumber: string;
  from: number | Date;
  to: number | Date;
}

export interface BillDTO extends BillDetailsDTO, CreateBillDTO {}

export interface BillAccountNumberDTO extends BillDTO {
  accountNumber: string;
}

export interface PageableFilterDTO {
  pageNumber: number;
  pageSize: number;
}

export interface ListChunk<T> {
  count: number;
  hasNext: boolean;
  list: T[];
}

export class InvoiceDTO {
  id: number;
  settlementNumber: string;
  employeeId: string;
  amount: number;
  status: string;
}

export class FileDTO {
  content: string;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export interface AddInvoiceDTO {
  settlementNumber: string;
  amount: number;
  fileDto?: FileDTO;
}

export interface EmployeeInfoDTO {
  employeeId: string;
  hours: number;
  remuneration: number;
}

export interface SummaryDTO {
  billCount: number;
  employeesCount: number;
  invoicesCount: number;
}
