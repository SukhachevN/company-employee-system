export interface Company {
  id: string;
  title: string;
  employees: number;
  address: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  companyId: string;
}
