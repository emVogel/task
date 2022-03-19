import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFhirPatient, IFhirSearchResourceEntry, IFhirSearchResponse } from '@red-probeaufgabe/types';
import { AbstractBaseFhirSearchService } from './abstract-base-fhir-search.service';
import { PractitionerSearchService } from './practitioner-search.service';

@Injectable()
export class PatientSearchService extends AbstractBaseFhirSearchService<IFhirPatient> {
  private static readonly url = `${AbstractBaseFhirSearchService.baseUrl}/Patient`;

  constructor(private http: HttpClient) {
    super();
  }

  search(query: string, count = 50): Observable<IFhirSearchResponse<IFhirPatient>> {
    const url = `${PatientSearchService.url}?${PatientSearchService.defaultMimeType}&_count=${count}&name=${query}`;

    return this.http
      .get<IFhirSearchResponse<IFhirSearchResourceEntry<IFhirPatient>>>(url)
      .pipe(
        map((data: IFhirSearchResponse<IFhirSearchResourceEntry<IFhirPatient>>) => this.mapToFhirSearchResource(data)),
      );
  }

  findById(id: string): Observable<IFhirPatient> {
    const url = `${PatientSearchService.url}/${id}?${PractitionerSearchService.defaultMimeType}`;
    return this.http.get<IFhirPatient>(url);
  }
}
