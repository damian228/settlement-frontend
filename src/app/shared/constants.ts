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

  public static EMPLOYEE_ARCHIVE_BILLS_COLUMNS = [
    'id',
    'settlementNumber',
    'from',
    'to',
    'employeeId',
    'brutto',
    'netto',
    'incomeCosts',
    'tax',
    'salary',
    'hours'
  ];

  public static EMPLOYEE_ACTIVE_INVOICES_COLUMNS = ['id', 'amount', 'employeeId', 'settlementNumber', 'status', 'download', 'edit'];

  public static FILE_TYPE_PDF = 'data:application/pdf;base64,';
  public static FILE_TYPE_JPG = 'data:image/jpg;base64,';
}
