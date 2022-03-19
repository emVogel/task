export interface IFhirSearchResponse<T> {
  type?: string;
  total: number;
  entry: T[];
}
