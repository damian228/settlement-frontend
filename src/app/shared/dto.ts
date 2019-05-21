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

export class TokenDTO {
  value: string;
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
  count: number;
  task: string;
  day: number;

  constructor(day: number) {
    this.day = day;
  }
}
