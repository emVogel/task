import {
  FhirGender,
  IFhirCodeableConcept,
  IFhirPeriod,
  IFhirResource,
  IFhirResourceAddress,
  IFhirResourceAttachment,
  IFhirResourceHumanName,
  IFhirResourceIdentifier,
  IFhirResourceReference,
  IFhirResourceTelecom,
} from './fhir-resource.interface';

export interface IFhirPatient extends IFhirResource {
  identifier?: IFhirResourceIdentifier[];
  active?: boolean;
  name?: IFhirResourceHumanName[];
  telecom?: IFhirResourceTelecom[];
  gender?: FhirGender;
  birthDate?: string;
  deceased?: {
    deceasedBoolean: boolean;
    deceasedDateTime: string;
  };
  address?: IFhirResourceAddress[];
  maritalStatus?: IFhirCodeableConcept;
  multipleBirth?: {
    multipleBirthBoolean: boolean;
    multipleBirthInteger: number;
  };
  photo?: IFhirResourceAttachment[];
  contact?: {
    relationship: IFhirCodeableConcept;
    name?: IFhirResourceHumanName;
    telecom?: IFhirResourceTelecom[];
    address?: IFhirResourceAddress[];
    gender?: FhirGender;
    organization?: string;
    period?: IFhirPeriod;
  }[];
  communication?: {
    language: IFhirCodeableConcept[];
    preferred?: boolean;
  }[];
  generalPractitioner?: IFhirResourceReference[];
  managingOrganization?: IFhirResourceReference;
  link?: {
    other: IFhirResourceReference;
    type: string;
  }[];
}
