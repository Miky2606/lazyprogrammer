export interface IMethods {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

export interface IStatus {
  code: number;
  msg: string;
}
