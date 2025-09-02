export interface IBaseResponse<T> {
  body: T | null;
  message: string;
  error?: string;
}

export interface IBaseResponseArray<T> {
  body: T[] | null;
  message: string;
  error?: string;
}
