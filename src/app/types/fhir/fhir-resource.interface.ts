export enum FhirGender {
  Maennlich = 'male',
  Weiblich = 'female',
  Unbekannt = 'unknown',
  Divers = 'other',
}

export interface IFhirResourceSecurity {
  system: string;
  code: string;
  display: string;
}

export interface IFhirResourceMeta {
  versionId: string;
  lastUpdated: string;
  security: IFhirResourceSecurity[];
}

export interface IFhirResourceText {
  text: string;
  div: string;
}

export interface IFhirResourceIdentifier {
  use?: string;
  type?: IFhirCodeableConcept;
  system?: string;
  value?: string;
  period?: IFhirPeriod;
  assigner?: any;
}

export interface IFhirResourceHumanName {
  use?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: IFhirPeriod;
}

export interface IFhirPeriod {
  origin: IFhirSimpleQuantity;
  period: number;
  factor?: number;
  lowerLimit?: number;
  upperLimit?: number;
  dimensions: number;
  data?: string;
}

export interface IFhirResourceTelecom {
  system?: string;
  value?: string;
  use?: string;
  rank?: number;
  period?: IFhirPeriod;
}

export interface IFhirSimpleQuantity {
  value: number;
  currency: string;
}

export interface IFhirResourceAddress {
  use?: string;
  type?: string;
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: string;
}

export interface IFhirCoding {
  system?: string;
  version?: string;
  code?: string;
  display?: string;
  userSelected?: boolean;
}

export interface IFhirCodeableConcept {
  coding: IFhirCoding;
  text: string;
}

export interface IFhirResourceAttachment {
  contentType?: string;
  language?: string;
  data?: string;
  url?: string;
  size?: number;
  hash?: string;
  title?: string;
  creation?: string;
}

export interface IFhirResourceReference {
  reference?: string;
  type?: string;
  identifier?: IFhirResourceIdentifier;
  display?: string;
}

export interface IFhirResource {
  resourceType: string;
  id: string;
  meta: IFhirResourceMeta;
  text: IFhirResourceText;
  extension: any[];
}

export interface IFhirSearchResourceEntry<T> {
  fullUrl: string;
  resource: T;
}
