import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FhirSearchFn, IFhirPatient, IFhirPractitioner, IFhirSearchResponse } from '@red-probeaufgabe/types';
import { AbstractSearchFacadeService } from './abstract-search-facade.service';
import { PatientSearchService } from './patient-search.service';
import { PractitionerSearchService } from './practitioner-search.service';

@Injectable()
export class SearchFacadeService extends AbstractSearchFacadeService {
  private readonly functionMap = {
    [FhirSearchFn.SearchAll]: this.searchAll.bind(this),
    [FhirSearchFn.SearchPatients]: this.searchPatients.bind(this),
    [FhirSearchFn.SearchPractitioners]: this.searchPractitioners.bind(this),
  };

  constructor(
    private patientSearchService: PatientSearchService,
    private practitionerService: PractitionerSearchService,
  ) {
    super();
  }

  search(type: FhirSearchFn, query: string): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return this.functionMap[type](query);
  }

  searchPatients(query: string): Observable<IFhirSearchResponse<IFhirPatient>> {
    return this.patientSearchService.search(query);
  }

  searchPractitioners(query: string): Observable<IFhirSearchResponse<IFhirPractitioner>> {
    return this.practitionerService.search(query);
  }

  searchAll(query: string): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return combineLatest([this.searchPatients(query), this.searchPractitioners(query)]).pipe(
      map((res: [IFhirSearchResponse<IFhirPatient>, IFhirSearchResponse<IFhirPractitioner>]) => {
        const patients = res[0].entry;
        const practitioners = res[1].entry;
        const entry: (IFhirPatient | IFhirPractitioner)[] = this.mergeArrays(patients, practitioners);
        const total = patients.length + practitioners.length;

        return { total, entry };
      }),
    );
  }

  findPatientById(id: string): Observable<IFhirPatient> {
    return this.patientSearchService.findById(id);
  }

  findPractitionerById(id: string): Observable<IFhirPractitioner> {
    return this.practitionerService.findById(id);
  }
}
