export interface IResponse {
  data?: {
    [propName: string]: any
  },
  code?: string,
  msg?: string,
  errMsg?: string,
  errCause?: string,
};