export interface StaffI {
  comment: string;
  data: staffItem[];
  message: string;
  status: number;
}

export interface staffItem {
  confirmationToken: string;
  email: string;
  firstName: string;
  fullName: string;
  id: 2;
  idSex: null;
  lastLogin: null;
  lastName: string;
  phone: string;
}
