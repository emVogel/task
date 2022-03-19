import {
  FhirGender,
  IFhirCodeableConcept,
  IFhirPeriod,
  IFhirResource,
  IFhirResourceAddress,
  IFhirResourceAttachment,
  IFhirResourceHumanName,
  IFhirResourceIdentifier,
  IFhirResourceTelecom,
} from './fhir-resource.interface';

export interface IFhirPractitioner extends IFhirResource {
  identifier?: IFhirResourceIdentifier[];
  active?: boolean;
  name?: IFhirResourceHumanName[];
  telecom?: IFhirResourceTelecom[];
  address?: IFhirResourceAddress[];
  gender?: FhirGender;
  birthDate?: string;
  photo?: IFhirResourceAttachment[];
  qualification?: {
    identifier?: IFhirResourceIdentifier[];
    code: IFhirCodeableConcept;
    period?: IFhirPeriod;
    issuer?: string;
  };
  communication?: IFhirCodeableConcept[];
}
