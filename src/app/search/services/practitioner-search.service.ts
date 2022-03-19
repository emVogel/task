import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFhirPractitioner, IFhirSearchResourceEntry, IFhirSearchResponse } from '@red-probeaufgabe/types';
import { AbstractBaseFhirSearchService } from './abstract-base-fhir-search.service';

@Injectable()
export class PractitionerSearchService extends AbstractBaseFhirSearchService<IFhirPractitioner> {
  private static readonly url = `${AbstractBaseFhirSearchService.baseUrl}/Practitioner`;

  constructor(private http: HttpClient) {
    super();
  }

  search(query: string, count = 50): Observable<IFhirSearchResponse<IFhirPractitioner>> {
    const url = `${PractitionerSearchService.url}?${PractitionerSearchService.defaultMimeType}&_count=${count}&name=${query}`;

    return this.http
      .get<IFhirSearchResponse<IFhirSearchResourceEntry<IFhirPractitioner>>>(url)
      .pipe(
        map((data: IFhirSearchResponse<IFhirSearchResourceEntry<IFhirPractitioner>>) =>
          this.mapToFhirSearchResource(data),
        ),
      );
  }

  findById(id: string): Observable<IFhirPractitioner> {
    const url = `${PractitionerSearchService.url}/${id}?${PractitionerSearchService.defaultMimeType}`;
    return this.http.get<IFhirPractitioner>(url);
  }
}
