export interface InviteFormData {
  firstName: string;
  surname: string;
  businessEmail: string;
  receiveMarketing: boolean;
}

export interface InviteDetails {
  inviterName: string;
  businessName: string;
  logoImageUrl: string;
  createdDate: string;
  defaultEmail: string;
  isVerified: boolean;
}

export type FormStep = 1 | 2 | 3 | "done";
