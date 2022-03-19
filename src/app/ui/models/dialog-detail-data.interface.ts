import { IFhirPatient, IFhirPractitioner } from '@red-probeaufgabe/types';

type IFhirPatientDetail = Pick<IFhirPatient, 'id' | 'birthDate' | 'resourceType' | 'gender'>;

export interface IPatientDetailData extends IFhirPatientDetail {
  address: string;
  name: string;
}

export type IFhirPractitionerDetail = Pick<IFhirPractitioner, 'id' | 'resourceType'>;

export interface IPractitionerDetailData extends IFhirPractitionerDetail {
  name: string;
  telecom: string[] | string;
}

type DialogPractitionerLabels = 'Resource Type' | 'Id' | 'Telecom' | 'Name';

type DialogPatientLabels = 'Resource Type' | 'Id' | 'Adresse' | 'Name' | 'Birthdate' | 'Sex';

export type PatientLabel = Record<keyof IPatientDetailData, DialogPatientLabels>;

export type PractitionerLabel = Record<keyof IPractitionerDetailData, DialogPractitionerLabels>;

export interface IDialogData {
  label: PatientLabel | PractitionerLabel;
  detail: IPatientDetailData | IPractitionerDetailData;
}
