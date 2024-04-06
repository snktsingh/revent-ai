export interface IUserResponse {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: Date | null;
  lastModifiedBy: string;
  lastModifiedDate: Date | null;
  authorities: string[];
}

export interface IUserDetails {
  userDetails: IUserResponse | null;
}
