import { IFhirPatient } from './patient.interface';
import { IFhirPractitioner } from './practitioner.interface';

export interface PreparedFhirData {
  address: string[];
  name: string[];
}

export type IPreparedIFhirPatient = Omit<IFhirPatient, 'address' | 'name'> & PreparedFhirData;
export type IPreparedIFhirPractitioner = Omit<IFhirPractitioner, 'address' | 'name'> & PreparedFhirData;
