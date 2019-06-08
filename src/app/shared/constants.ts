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

  // bill statuses
  public static BILL_STATUS_SAVED = 'SAVED';
  public static BILL_STATUS_SENT = 'SENT';
  public static BILL_STATUS_REJECTED = 'REJECTED';
  public static BILL_STATUS_ACCEPTED = 'ACCEPTED';
  public static BILL_STATUS_PROCESSED = 'PROCESSED';

  // invoice statuses
  public static INVOICE_STATUS_SENT = 'SENT';
  public static INVOICE_STATUS_REJECTED = 'REJECTED';
  public static INVOICE_STATUS_ACCEPTED = 'ACCEPTED';
  public static INVOICE_STATUS_PROCESSED = 'PROCESSED';

  public static ARCHIVE_BILLS_COLUMNS = [
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
    'hours',
    'status'
  ];

  public static MANAGER_ACTIVE_BILLS_COLUMNS = [
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
    'hours',
    'status',
    'accept',
    'reject'
  ];

  public static EMPLOYEE_ACTIVE_INVOICES_COLUMNS = ['id', 'amount', 'employeeId', 'settlementNumber', 'status', 'download', 'edit'];
  public static EMPLOYEE_ARCHIVED_INVOICES_COLUMNS = ['id', 'amount', 'employeeId', 'settlementNumber', 'status'];

  public static MANAGER_INFO_COLUMNS = ['employeeId', 'hours', 'remuneration'];

  public static FILE_TYPE_PDF = 'data:application/pdf;base64,';
  public static FILE_TYPE_JPG = 'data:image/jpg;base64,';

  public static INITIAL_INVOICE_FILTER = { pageNumber: 0, pageSize: 5 };
  public static INITIAL_BILL_FILTER = { pageNumber: 0, pageSize: 5 };
}
