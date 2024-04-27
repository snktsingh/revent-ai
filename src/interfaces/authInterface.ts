export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserAccountDetails {
  id: number | null;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  authorities: string[];
  linkedIn: string;
  phone: string;
  companyName: string;
  companySize: string;
  companyRole: string;
  termsConditionId: number | null;
  userCredit: number | null;
}