import { IFhirPatient, IFhirPractitioner } from '@red-probeaufgabe/types';

type IFhirPatientDetail = Partial<IFhirPatient>;

type IFhirPractitionerDetail = Partial<IFhirPractitioner>;

export interface IDialogData {
  label: string[];
  data: IFhirPatientDetail | IFhirPractitionerDetail;
}
