export interface ICompany {
  id: string;
  title: string;
  employees: number;
  address: string;
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  companyId: string;
}
