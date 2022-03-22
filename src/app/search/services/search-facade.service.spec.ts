import { TestBed } from '@angular/core/testing';
import { PatientSearchService } from './patient-search.service';
import { PractitionerSearchService } from './practitioner-search.service';
import { SearchFacadeService } from './search-facade.service';
import { IFhirPatient, IFhirPractitioner, IFhirSearchResponse } from '../../types';
import { of } from 'rxjs';
/**
 * Optionale Zusatzaufgabe
 */

const patient = {
  entry: [
    {
      resourceType: 'Patient',
      name: [{ family: 'Heisenberg' }],
      id: '1',
      meta: {},
      text: {},
      extension: [],
    },
  ],
  total: 1,
} as IFhirSearchResponse<IFhirPatient>;

const practitioner = {
  entry: [
    {
      resourceType: 'Practitioner',
      name: [{ family: 'Flemming' }],
      id: '1',
      meta: {},
      text: {},
      extension: [],
    },
  ],
  total: 1,
} as IFhirSearchResponse<IFhirPractitioner>;

const all = {
  entry: [patient.entry[0], practitioner.entry[0]],
  total: 2,
};
const patientServiceMock = {
  search: jest.fn().mockReturnValue(of(patient)),
  findById: jest.fn(),
} as unknown as PatientSearchService;

const practitionerServiceMock = {
  search: jest.fn().mockReturnValue(of(practitioner)),
  findById: jest.fn(),
} as unknown as PractitionerSearchService;

describe('SearchFacadeService', () => {
  let searchFacadeService: SearchFacadeService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SearchFacadeService,
        { provide: PatientSearchService, useValue: patientServiceMock },
        { provide: PractitionerSearchService, useValue: practitionerServiceMock },
      ],
    });
    searchFacadeService = TestBed.inject<SearchFacadeService>(SearchFacadeService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  // tslint:disable:no-empty
  test('should init', () => {
    expect(searchFacadeService).toBeDefined();
  });

  test('should find patients', () => {
    const result$ = searchFacadeService.searchPatients('Heisenberg');
    expect(patientServiceMock.search).toHaveBeenCalledWith('Heisenberg');
    result$.subscribe((res) => expect(res).toBe(patient));
  });

  test('should find practitioners', () => {
    const result$ = searchFacadeService.searchPractitioners('Flemming');
    expect(practitionerServiceMock.search).toHaveBeenCalledWith('Flemming');
    result$.subscribe((res) => expect(res).toBe(practitioner));
  });

  test('should find both', () => {
    // searchFacadeService.searchPatients('Heisenberg');
    // searchFacadeService.searchPractitioners('Heisenberg');
    const patientSpy = jest.spyOn(searchFacadeService, 'searchPatients');
    const practitionerSpy = jest.spyOn(searchFacadeService, 'searchPractitioners');
    const result$ = searchFacadeService.searchAll('Heisenberg');
    expect(patientSpy).toHaveBeenCalledWith('Heisenberg');
    expect(practitionerSpy).toHaveBeenCalledWith('Heisenberg');
    result$.subscribe((res) => expect(res).toBe(all));
  });

  test('merge arrays', () => {
    const practitionerToMerge = [
      ...practitioner.entry,
      {
        resourceType: 'Practitioner',
        name: [{ family: 'Hund' }],
        id: '2',
        meta: {},
        text: {},
        extension: [],
      },
    ] as IFhirPractitioner[];

    const expectedResult = [...patient.entry, ...practitionerToMerge];
    console.log(expectedResult);
    const result: (IFhirPatient | IFhirPractitioner)[] = (searchFacadeService as any).mergeArrays(
      patient.entry,
      practitionerToMerge,
    );
    expect(result.length).toBe(3);

    expect(result).toEqual(expectedResult);
  });
});
