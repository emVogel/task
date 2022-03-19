import { Injectable } from '@angular/core';
import {
  FhirResourceType,
  IFhirPatient,
  IFhirPractitioner,
  IFhirResourceAddress,
  IFhirResourceHumanName,
  IFhirResourceTelecom,
  IPreparedIFhirPatient,
  IPreparedIFhirPractitioner,
  PreparedFhirData,
} from '@red-probeaufgabe/types';
import { IPatientDetailData, IPractitionerDetailData, PatientLabel, PractitionerLabel } from 'app/ui/models';
import { SearchModule } from '../search.module';

@Injectable({ providedIn: SearchModule })
export class FhirUtilService {
  private static getFhirNameRepresentation(name: IFhirResourceHumanName): string {
    const family = name.family ? `${name.family},` : '';
    const prefix = name.prefix ? ` ${name.prefix.join(' ')}` : '';
    const given = name.given ? ` ${name.given.join(' ')}` : '';
    const suffix = name.suffix ? ` ${name.suffix.join(' ')}` : '';

    return `${family}${prefix}${given}${suffix}`;
  }

  private static getFhirAddressRepresentation(address: IFhirResourceAddress): string {
    const line = address.line ? `${address.line}\n` : '';
    const city = address.city ? `${address.city}\n` : '';
    const postalCode = address.postalCode ? `${address.postalCode}\n` : '';
    const state = address.state ? `${address.state}` : '';

    return `${line}${city}${postalCode}${state}`;
  }

  private static getFhirTelecomRepresentation(telecom: IFhirResourceTelecom[]): string[] | null {
    return telecom?.map(
      (entry) => `
    ${entry?.rank || ''}  ${entry?.system + ':' ?? ''} ${entry?.value ?? ''} ${entry.use ? '(' + entry.use + ')' : ''}`,
    );
  }

  /** returns the shared details of patiens and practitioners */
  static getCommonDetailData(
    prepData: IPreparedIFhirPatient | IPreparedIFhirPractitioner,
  ): Pick<IPreparedIFhirPatient | IPreparedIFhirPractitioner, 'resourceType' | 'id'> & { name: string } {
    return {
      resourceType: prepData.resourceType,
      id: prepData.id,
      name: prepData.name[0],
    };
  }
  /** returns shared labels */
  static get commonLabels(): { [key: string]: string } {
    return {
      id: 'Id',
      name: 'Name',
      resourceType: 'Resource Type',
    };
  }

  /**
   * Prepare FHIR data for detail view
   * @param data
   */
  prepareData(data: IFhirPatient | IFhirPractitioner): IPreparedIFhirPatient | IPreparedIFhirPractitioner {
    const address = data.address?.map((resourceAddress: IFhirResourceAddress) =>
      FhirUtilService.getFhirAddressRepresentation(resourceAddress),
    );
    const name = data.name?.map((humanName: IFhirResourceHumanName) =>
      FhirUtilService.getFhirNameRepresentation(humanName),
    );

    const telecom = FhirUtilService.getFhirTelecomRepresentation(data?.telecom);

    return { ...data, address, name, telecom };
  }

  /** returns the detail data */
  public getDetailData(data: IFhirPatient | IFhirPractitioner): IPatientDetailData | IPractitionerDetailData {
    const prepData = this.prepareData(data);
    const commonDetails = FhirUtilService.getCommonDetailData(prepData);

    return prepData.resourceType === FhirResourceType.Patient
      ? {
          ...commonDetails,
          address: prepData?.address?.join('') || 'No Information available',
          birthDate: prepData?.birthDate,
          gender: prepData?.gender,
        }
      : { ...commonDetails, telecom: prepData?.telecom?.join(', ') ?? 'No Data Available' };
  }

  public getLabels(isPatient: boolean): PatientLabel | PractitionerLabel {
    return isPatient
      ? ({
          ...FhirUtilService.commonLabels,
          address: 'Adresse',
          birthDate: 'Birthdate',
          gender: 'Sex',
        } as PatientLabel)
      : ({
          ...FhirUtilService.commonLabels,
          telecom: 'Telecom',
        } as PractitionerLabel);
  }
}
