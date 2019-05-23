export class Constants {
  public static TOKEN_KEY = 'token';
  public static AUTH_HEADER_KEY = 'X-AUTH-TOKEN';

  // routes
  public static ROOT_ROUTE = '/';
  public static LOGIN_ROUTE = Constants.ROOT_ROUTE + 'login';

  // user roles
  public static PAYROLL_ROLE = 'PAYROLL';
  public static MANAGER_ROLE = 'MANAGER';
  public static EMPLOYEE_ROLE = 'EMPLOYEE';
  public static ANONYMOUS_ROLE = 'ANONYMOUS';
}
