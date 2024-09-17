export interface User {
  userId: string;
  displayName: string;
  email: string;
  surname: string;
  jobTitle: string;
  officeLocation: string | null;
  departmentId: string | null;
  departmentName: string | null;
}
