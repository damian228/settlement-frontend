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

export interface BillDTO extends CreateBillDTO {
  id: number;
  employeeId: string;
  brutto: number;
  netto: number;
  incomeCosts: number;
  tax: number;
  hours: number;
  salary: number;
}

export interface CreateBillDTO {
  settlementNumber: string;
  from: number;
  to: number;
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
