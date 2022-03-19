import { FhirSearchFn } from './fhir-search-fn.enum';

export interface ISearchFormData {
  searchText: string;
  searchFuncSelect: FhirSearchFn;
}
