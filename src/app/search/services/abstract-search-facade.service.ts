import { Observable } from 'rxjs';
import { FhirSearchFn, IFhirPatient, IFhirPractitioner, IFhirSearchResponse } from '@red-probeaufgabe/types';

export abstract class AbstractSearchFacadeService {
  abstract search(type: FhirSearchFn, query: string): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>>;

  abstract searchPatients(query: string): Observable<IFhirSearchResponse<IFhirPatient>>;

  abstract findPatientById(id: string): Observable<IFhirPatient>;

  abstract searchPractitioners(query: string): Observable<IFhirSearchResponse<IFhirPractitioner>>;

  abstract findPractitionerById(id: string): Observable<IFhirPractitioner>;

  abstract searchAll(query: string): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>>;

  protected mergeArrays(arr1: any[], arr2: any[]) {
    const result = [];
    const min: number = Math.min(arr1.length, arr2.length);

    for (let i = 0; i < min; i++) {
      result.push(arr1[i], arr2[i]);
    }
    result.push(...arr1.slice(min), ...arr2.slice(min));
    return result;
  }
}
