import { Observable } from 'rxjs';
import { IFhirResource, IFhirSearchResourceEntry, IFhirSearchResponse } from '@red-probeaufgabe/types';

/**
 * Variety of open FHRI APIs.
 * @see https://confluence.hl7.org/display/FHIR/Connectathon+Test+Servers
 */
const serverUrls = [
  'https://wildfhir4.aegis.net/fhir4-0-1',
  'http://sqlonfhir-r4.azurewebsites.net/fhir',
  'https://cds-sandbox.alphora.com/cqf-ruler-r4/fhir',
];

export abstract class AbstractBaseFhirSearchService<T extends IFhirResource> {
  protected static readonly defaultMimeType = '_format=application/fhir+json';
  protected static readonly baseUrl = serverUrls[0];

  abstract search(query: string): Observable<IFhirSearchResponse<T>>;

  abstract findById(id: string): Observable<T>;

  mapToFhirSearchResource(data: IFhirSearchResponse<IFhirSearchResourceEntry<T>>): IFhirSearchResponse<IFhirResource> {
    const dataArray = data.entry
      ? data.entry
          .filter((e: IFhirSearchResourceEntry<IFhirResource>) => !!e && e.resource.resourceType !== 'OperationOutcome')
          .map((el: IFhirSearchResourceEntry<IFhirResource>) => el.resource)
      : [];

    return {
      ...data,
      total: dataArray.length,
      entry: dataArray,
    };
  }
}
